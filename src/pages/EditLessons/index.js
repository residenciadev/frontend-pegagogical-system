import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Upload from '../../components/Upload';
import FileList from '../../components/FileList';
import correctUrl from '../../utils/correctUrl';
import TextEditor from '../../components/TextEditor';

import { Container } from './styles';
import api from '../../services/api';

const useStyles = makeStyles(theme => ({
  textField: {
    height: '56px',
    width: '100%',
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: '1208px',
    marginTop: '10px',
  },
  btnSubmit: {
    marginLeft: '10px',
  },
  typographyH2: {
    fontSize: '20px',
  },
  typographyP: {
    fontSize: '14px',
    marginTop: '16px',
    opacity: 0.6,
  },
  color: {
    color: [
      theme.palette.type === 'dark' ? '#FFF' : theme.palette.background.dark,
    ],
  },
}));

export default function EditLessons() {
  const { match, history } = useReactRouter();
  const classes = useStyles();
  const profile = useSelector(state => state.user.profile);
  const [dataContent, setDataContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    theme: '',
    skills: '',
  });
  const [state, setState] = useState({
    dropbox: true,
    linkexterno: false,
  });

  const [questions, setQuestions] = useState('');
  const [answers, setAnswers] = useState('');
  const [isPedagogical, setIsPedagogical] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState({
    slide: [],
    materialComplementary: [],
    images: [],
    backgroundImages: [],
    videos: [],
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function updateFile(id, type, data) {
    setUploadedFiles(prevState => {
      const newValue = prevState[type].map(value => {
        return id === value.id ? { ...value, ...data } : value;
      });

      return {
        ...prevState,
        [type]: newValue,
      };
    });
  }

  function processUpload(upFile, type) {
    const data = new FormData();

    data.append('file', upFile.file, upFile.name);

    api
      .post(`dropbox?type=${type}`, data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total), 10);

          updateFile(upFile.id, type, {
            progress,
          });
        },
      })
      .then(response => {
        updateFile(upFile.id, type, {
          uploaded: true,
          id: response.data.id,
          url: response.data.url,
          type,
        });
      })
      .catch(response => {
        console.log('err', response);
        updateFile(upFile.id, type, {
          error: true,
        });
      });
  }

  function handleUpload(files, type) {
    const uploaded = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
      type,
    }));
    setUploadedFiles(prevState => {
      return {
        ...prevState,
        [type]: uploadedFiles[type].concat(uploaded),
      };
    });
    uploaded.forEach(e => processUpload(e, type));
  }

  async function handleDeleteFileDownload(id, type) {
    await api.delete(`dropbox/${id}`);

    setUploadedFiles(prevState => {
      const removeValue = prevState[type].filter(value => id !== value.id);
      return {
        ...prevState,
        [type]: removeValue,
      };
    });
  }

  function handleChangeQuestions(content, type) {
    if (type === 'questions') {
      setQuestions(prevState => {
        return {
          ...prevState,
          content,
        };
      });
    }
    if (type === 'answers') {
      setAnswers(prevState => {
        return {
          ...prevState,
          content,
        };
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
  }
  useEffect(() => {
    const { id: contentId } = match.params;
    async function loadData(id) {
      const { type: userType } = profile;

      const response = await api.get(`lessons/${id}/content`);
      setDataContent(response.data);
      setValues({
        theme: response.data.theme,
        skills: response.data.skills,
        material_obs: response.data.material_obs || '',
        materialComplementary_obs:
          response.data.materialComplementary_obs || '',
        images_obs: response.data.images_obs || '',
        backgroundImages_obs: response.data.backgroundImages_obs || '',
        videos_obs: response.data.videos_obs || '',
      });
      setUploadedFiles(() => {
        const dropboxUploaded = response.data.dropbox.map(element => ({
          ...element,
          uploaded: true,
          preview: correctUrl(element.url),
        }));

        return {
          slide: dropboxUploaded.filter(element => element.type === 'slide'),
          materialComplementary: dropboxUploaded.filter(
            element => element.type === 'materialComplementary'
          ),
          images: dropboxUploaded.filter(element => element.type === 'images'),
          backgroundImages: dropboxUploaded.filter(
            element => element.type === 'backgroundImages'
          ),
          videos: dropboxUploaded.filter(element => element.type === 'videos'),
        };
      });
      const questionsParse = JSON.parse(response.data.questions);
      const answersParse = JSON.parse(response.data.questions_feedback);
      setQuestions(questionsParse.content);
      setAnswers(answersParse.content);
      setIsPedagogical(!(userType === 'pedagogical'));
      setLoading(false);
    }
    loadData(contentId);
  }, [match, profile]);
  // console.log(dataContent);
  console.log('up', uploadedFiles);

  return (
    <>
      {loading && <h1>Carregando...</h1>}
      <Container>
        {!loading && dataContent && (
          <form onSubmit={handleSubmit}>
            <ul>
              <li className="item">
                <div className="left-column box">
                  <Typography
                    variant="h2"
                    style={{ textTransform: 'capitalize' }}
                    color="textPrimary"
                  >
                    {dataContent.lesson.title}
                  </Typography>
                </div>
                <div className="center-column box" />
              </li>
              <li className="item">
                <div className="left-column box">
                  <Typography variant="h2" color="textPrimary">
                    1. Tema*
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    Indique o título que contenha o tema principal da aula
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    conteúdo escrito (1 linha)
                  </Typography>
                </div>
                <div className="center-column box">
                  <TextField
                    id="outlined-bare"
                    className={classes.textField}
                    placeholder="Digite o tema"
                    label="Tema"
                    margin="normal"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'bare' }}
                    rowsMax="1"
                    rows="1"
                    multiline
                    fullWidth
                    value={values.theme}
                    onChange={handleChange('theme')}
                    style={{ zIndex: 0 }}
                    required
                  />
                </div>
              </li>
              <li className="item">
                <div className="left-column box">
                  <Typography variant="h2" color="textPrimary">
                    2. Competências*
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    O que o aluno irá aprender com a aula?
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    Quais os conhecimentos que serão adquiridos?
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    Conteúdo escrito (Mínimo de 3 linhas)
                  </Typography>
                </div>
                <div className="center-column box">
                  <TextField
                    id="standard-multiline-static"
                    label="Competências"
                    variant="outlined"
                    multiline
                    rowsMax="4"
                    rows="4"
                    placeholder="O que o aluno irá aprender com a aula?"
                    className={classes.textField}
                    value={values.skills}
                    onChange={handleChange('skills')}
                    style={{ zIndex: 0 }}
                    required
                  />
                </div>
                <div className="right-column box">
                  <TextField
                    id="standard-multiline-static"
                    label="Competências - Observações"
                    variant="outlined"
                    multiline
                    rowsMax="4"
                    rows="4"
                    placeholder="O que o aluno irá aprender com a aula?"
                    className={classes.textField}
                    value={values.skills}
                    onChange={handleChange('skills')}
                    style={{ zIndex: 0 }}
                    required
                    disabled={isPedagogical}
                  />
                </div>
              </li>
              <li className="item">
                <div className="left-column box">
                  <Typography variant="h2" color="textPrimary">
                    3. Material Didático Digital*
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    Slides
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    Arquivo em pptx
                  </Typography>
                </div>
                <div className="center-column box">
                  {!!uploadedFiles.slide.length < 5 && state.dropbox && (
                    <Upload
                      onUpload={e => handleUpload(e, 'slide')}
                      message="Clique ou arraste aqui para enviar"
                      backgroundColor="download"
                      accept="application/*"
                    />
                  )}

                  {!!uploadedFiles.slide.length && (
                    <FileList
                      files={uploadedFiles.slide}
                      onDelete={e => handleDeleteFileDownload(e, 'slide')}
                    />
                  )}
                </div>
                <div className="right-column box">
                  <TextField
                    id="standard-multiline-static"
                    label="Material Didático Digital - Observações"
                    variant="outlined"
                    multiline
                    rowsMax="4"
                    rows="4"
                    className={classes.textField}
                    value={values.material_obs}
                    onChange={handleChange('material_obs')}
                    style={{ zIndex: 0 }}
                    required
                    disabled={isPedagogical}
                  />
                </div>
              </li>
              <li className="item">
                <div className="left-column box">
                  <Typography variant="h2" color="textPrimary">
                    4. Material Didático Complementar*
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    Parte escrita do conteúdo em no mínimo 3 laudas. Pode-se
                    entender como um resumo/guia de aula que auxiliará o aluno
                    no seu processo de aprendizagem. Isto não impede que você
                    realize indicações de artigos, livros ou apostilas, caso
                    deseje
                  </Typography>
                </div>
                <div className="center-column box">
                  {!!uploadedFiles.materialComplementary.length < 5 &&
                    state.dropbox && (
                      <Upload
                        onUpload={e => handleUpload(e, 'materialComplementary')}
                        message="Clique ou arraste aqui para enviar"
                        backgroundColor="download"
                        accept="application/*"
                      />
                    )}

                  {!!uploadedFiles.materialComplementary.length && (
                    <FileList
                      files={uploadedFiles.materialComplementary}
                      onDelete={e =>
                        handleDeleteFileDownload(e, 'materialComplementary')
                      }
                    />
                  )}
                </div>
                <div className="right-column box">
                  <TextField
                    id="standard-multiline-static"
                    label="Material Didático Complementar - Observações"
                    variant="outlined"
                    multiline
                    rowsMax="4"
                    rows="4"
                    className={classes.textField}
                    value={values.materialComplementary_obs}
                    onChange={handleChange('materialComplementary_obs')}
                    style={{ zIndex: 0 }}
                    required
                    disabled={isPedagogical}
                  />
                </div>
              </li>
              <li className="item">
                <div className="left-column box">
                  <Typography variant="h2" color="textPrimary">
                    5. Imagens*
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    Adicione as imagens que serão utilizadas em sua aula
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    Imagens(mínimo de 10) e GIFs
                  </Typography>
                </div>
                <div className="center-column box">
                  {!!uploadedFiles.images.length < 10 && state.dropbox && (
                    <Upload
                      onUpload={e => handleUpload(e, 'images')}
                      message="Clique ou arraste aqui para enviar"
                      backgroundColor="download"
                      accept="application/*, image/*, pdf/*"
                    />
                  )}

                  {!!uploadedFiles.images.length && state.dropbox && (
                    <FileList
                      files={uploadedFiles.images}
                      onDelete={e => handleDeleteFileDownload(e, 'images')}
                    />
                  )}
                </div>
                <div className="right-column box">
                  <TextField
                    id="standard-multiline-static"
                    label="Imagens - Observações"
                    variant="outlined"
                    multiline
                    rowsMax="4"
                    rows="4"
                    className={classes.textField}
                    value={values.images_obs}
                    onChange={handleChange('images_obs')}
                    style={{ zIndex: 0 }}
                    required
                    disabled={isPedagogical}
                  />
                </div>
              </li>
              <li className="item">
                <div className="left-column box">
                  <Typography variant="h2" color="textPrimary">
                    6. Planos de Fundo*
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    Adicione as imagens que serão utilizadas no fundo da
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    2 Imagens
                  </Typography>
                </div>
                <div className="center-column box">
                  {!!uploadedFiles.backgroundImages.length < 10 &&
                    state.dropbox && (
                      <Upload
                        onUpload={e => handleUpload(e, 'backgroundImages')}
                        message="Clique ou arraste aqui para enviar"
                        backgroundColor="download"
                        accept="image/jpeg, image/png"
                      />
                    )}

                  {!!uploadedFiles.backgroundImages.length && state.dropbox && (
                    <FileList
                      files={uploadedFiles.backgroundImages}
                      onDelete={e =>
                        handleDeleteFileDownload(e, 'backgroundImages')
                      }
                    />
                  )}
                </div>
                <div className="right-column box">
                  <TextField
                    id="standard-multiline-static"
                    label="Planos de Fundo - Observações"
                    variant="outlined"
                    multiline
                    rowsMax="4"
                    rows="4"
                    className={classes.textField}
                    value={values.backgroundImages_obs}
                    onChange={handleChange('backgroundImages_obs')}
                    style={{ zIndex: 0 }}
                    required
                    disabled={isPedagogical}
                  />
                </div>
              </li>
              <li className="item">
                <div className="left-column box">
                  <Typography variant="h2" color="textPrimary">
                    7. Vídeos*
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    Adicione os vídeos que serão utilizados em sua aula Cole os
                    links
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    no campo de texto ao lado ou envie arquivos de vídeo abaixo
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className={classes.typographyP}
                    color="textPrimary"
                  >
                    Links e/ou arquivos de vídeo
                  </Typography>
                </div>
                <div className="center-column box">
                  <TextField
                    id="standard-multiline-static"
                    label="Vídeos"
                    variant="outlined"
                    placeholder="Adicione os vídeos que serão utilizados em sua aula Cole os
                links aqui"
                    multiline
                    rows="4"
                    className={classes.textField}
                    component="span"
                  />
                  <div className="divider">
                    <Typography
                      variant="body1"
                      paragraph
                      className={classes.typographyP}
                      color="textPrimary"
                    >
                      OU
                    </Typography>
                  </div>
                  {!!uploadedFiles.videos.length < 10 && state.dropbox && (
                    <Upload
                      onUpload={e => handleUpload(e, 'videos')}
                      message="Clique ou arraste aqui para enviar"
                      backgroundColor="download"
                      accept="video/*"
                    />
                  )}

                  {!!uploadedFiles.videos.length && state.dropbox && (
                    <FileList
                      files={uploadedFiles.videos}
                      onDelete={e => handleDeleteFileDownload(e, 'videos')}
                    />
                  )}
                </div>
                <div className="right-column box">
                  <TextField
                    id="standard-multiline-static"
                    label="Vídeos - Observações"
                    variant="outlined"
                    multiline
                    rowsMax="4"
                    rows="4"
                    className={classes.textField}
                    value={values.videos_obs}
                    onChange={handleChange('videos_obs')}
                    style={{ zIndex: 0 }}
                    required
                    disabled={isPedagogical}
                  />
                </div>
              </li>
              <li className="question-item">
                <div className="left-column box">
                  <Typography
                    variant="h2"
                    className="title-question"
                    color="textPrimary"
                  >
                    Questões
                  </Typography>
                  <TextEditor
                    handleChange={e => handleChangeQuestions(e, 'questions')}
                    value={questions}
                  />
                </div>
                <div className="right-column box">
                  <TextField
                    id="standard-multiline-static"
                    label="Questões - Observações"
                    variant="outlined"
                    multiline
                    rowsMax="4"
                    rows="4"
                    className={classes.textField}
                    value={values.questions_obs}
                    onChange={handleChange('questions_obs')}
                    style={{ zIndex: 0, marginTop: '33px' }}
                    required
                    disabled={isPedagogical}
                  />
                </div>
              </li>
              <li className="question-item">
                <div className="left-column box">
                  <Typography
                    variant="h2"
                    className="title-question"
                    color="textPrimary"
                  >
                    Gabarito
                  </Typography>
                  <TextEditor
                    value={answers}
                    handleChange={e => handleChangeQuestions(e, 'answers')}
                  />
                </div>
                <div className="right-column box">
                  <TextField
                    id="standard-multiline-static"
                    label="Respostas - Observações"
                    variant="outlined"
                    multiline
                    rowsMax="4"
                    rows="4"
                    className={classes.textField}
                    value={values.questions_feedback_obs}
                    onChange={handleChange('questions_feedback_obs')}
                    style={{ zIndex: 0, marginTop: '33px' }}
                    required
                    disabled={isPedagogical}
                  />
                </div>
              </li>
            </ul>
            <div className={classes.content}>
              <Button
                onClick={() => history.push('/dashboard')}
                className={classes.backButton}
                variant="outlined"
                color="secondary"
                type="button"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.btnSubmit}
              >
                Finalizar
              </Button>
            </div>
          </form>
        )}
      </Container>
    </>
  );
}
