import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
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
}));

export default function EditLessons() {
  const { match } = useReactRouter();
  const classes = useStyles();
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
  useEffect(() => {
    const { id: contentId } = match.params;
    async function loadData(id) {
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
      setUploadedFiles(prevState => {
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
      setLoading(false);
    }
    loadData(contentId);
  }, [match]);
  console.log(dataContent);

  return (
    <>
      {loading && <h1>Carregando...</h1>}
      <Container>
        {!loading && dataContent && (
          <ul>
            <li className="item">
              <div className="left-column box">
                <h2 style={{ textTransform: 'capitalize' }}>
                  {dataContent.lesson.title}
                </h2>
              </div>
              <div className="center-column box" />
            </li>
            <li className="item">
              <div className="left-column box">
                <h2>1. Tema*</h2>
                <p>Indique o título que contenha o tema principal da aula</p>
                <p>conteúdo escrito (1 linha)</p>
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
                <h2>2. Competências*</h2>
                <p>O que o aluno irá aprender com a aula?</p>
                <p>Quais os conhecimentos que serão adquiridos?</p>
                <p>Conteúdo escrito (Mínimo de 3 linhas)</p>
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
                  disabled
                />
              </div>
            </li>
            <li className="item">
              <div className="left-column box">
                <h2>3. Material Didático Digital*</h2>
                <p>Slides</p>
                <p>Arquivo em pptx</p>
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
                  disabled
                />
              </div>
            </li>
            <li className="item">
              <div className="left-column box">
                <h2>4. Material Didático Complementar*</h2>
                <p>
                  Parte escrita do conteúdo em no mínimo 3 laudas. Pode-se
                  entender como um resumo/guia de aula que auxiliará o aluno no
                  seu processo de aprendizagem. Isto não impede que você realize
                  indicações de artigos, livros ou apostilas, caso deseje
                </p>
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
                  label="Material Didático Digital - Observações"
                  variant="outlined"
                  multiline
                  rowsMax="4"
                  rows="4"
                  className={classes.textField}
                  value={values.materialComplementary_obs}
                  onChange={handleChange('materialComplementary_obs')}
                  style={{ zIndex: 0 }}
                  required
                  disabled
                />
              </div>
            </li>
            <li className="item">
              <div className="left-column box">
                <h2>5. Imagens*</h2>
                <p>Adicione as imagens que serão utilizadas em sua aula</p>
                <p>Imagens(mínimo de 10) e GIFs</p>
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
                  label="Material Didático Digital - Observações"
                  variant="outlined"
                  multiline
                  rowsMax="4"
                  rows="4"
                  className={classes.textField}
                  value={values.images_obs}
                  onChange={handleChange('images_obs')}
                  style={{ zIndex: 0 }}
                  required
                  disabled
                />
              </div>
            </li>
            <li className="item">
              <div className="left-column box">
                <h2>6. Planos de Fundo*</h2>
                <p>Adicione as imagens que serão utilizadas no fundo da</p>
                <p>2 Imagens</p>
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
                  label="Material Didático Digital - Observações"
                  variant="outlined"
                  multiline
                  rowsMax="4"
                  rows="4"
                  className={classes.textField}
                  value={values.backgroundImages_obs}
                  onChange={handleChange('backgroundImages_obs')}
                  style={{ zIndex: 0 }}
                  required
                  disabled
                />
              </div>
            </li>
            <li className="item">
              <div className="left-column box">
                <h2>7. Vídeos*</h2>
                <p>
                  Adicione os vídeos que serão utilizados em sua aula Cole os
                  links
                </p>
                <p>
                  no campo de texto ao lado ou envie arquivos de vídeo abaixo
                </p>
                <p>Links e/ou arquivos de vídeo</p>
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
                  <p>OU</p>
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
                  label="Material Didático Digital - Observações"
                  variant="outlined"
                  multiline
                  rowsMax="4"
                  rows="4"
                  className={classes.textField}
                  value={values.videos_obs}
                  onChange={handleChange('videos_obs')}
                  style={{ zIndex: 0 }}
                  required
                  disabled
                />
              </div>
            </li>
            <li className="question-item">
              <div className="left-column box">
                <h2 className="title-question">Questões</h2>
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
                  style={{ zIndex: 0 }}
                  required
                  disabled
                />
              </div>
            </li>
            <li className="question-item">
              <div className="left-column box">
                <h2 className="title-question">Gabarito</h2>
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
                  style={{ zIndex: 0 }}
                  required
                  disabled
                />
              </div>
            </li>
          </ul>
        )}
      </Container>
    </>
  );
}
