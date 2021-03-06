import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '../styles';
import Upload from '../../../components/Upload';
import FileList from '../../../components/FileList';
import TextEditor from '../../../components/TextEditor';

const useStyles = makeStyles(theme => ({
  textField: {
    height: '56px',
    width: '100%',
  },
}));

export default function Step02({
  handleDeleteFileDownload,
  handleUpload,
  uploadedFiles,
  handleChangeQuestions,
  questions,
  answers,
  handleChange,
  values,
}) {
  const classes = useStyles();
  const [state, setState] = useState({
    dropbox: true,
    linkexterno: false,
  });

  return (
    <Container>
      <ul>
        <li className="item">
          <div className="left-column box">
            <h2>3. Material Didático Digital*</h2>
            <p>Slides</p>
            <p className="bold">Arquivo em pptx</p>
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
        </li>
        <li className="item">
          <div className="left-column box">
            <h2>4. Material Didático Complementar*</h2>
            <p>
              Parte escrita do conteúdo em no mínimo 3 laudas. Pode-se entender
              como um resumo/guia de aula que auxiliará o aluno no seu processo
              de aprendizagem. Isto não impede que você realize indicações de
              artigos, livros ou apostilas, caso deseje
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
        </li>
        <li className="item">
          <div className="left-column box">
            <h2>5. Imagens*</h2>
            <p>Adicione as imagens que serão utilizadas em sua aula</p>
            <p className="bold">Imagens(mínimo de 5) e/ou GIFs</p>
          </div>
          <div className="center-column box">
            {!!uploadedFiles.images.length < 5 && state.dropbox && (
              <Upload
                onUpload={e => handleUpload(e, 'images')}
                message="Clique ou arraste aqui para enviar"
                backgroundColor="download"
                accept="application/*, image/*"
              />
            )}

            {!!uploadedFiles.images.length && state.dropbox && (
              <FileList
                files={uploadedFiles.images}
                onDelete={e => handleDeleteFileDownload(e, 'images')}
              />
            )}
          </div>
        </li>
        <li className="item">
          <div className="left-column box">
            <h2>6. Planos de Fundo*</h2>
            <p>Adicione as imagens que serão utilizadas como plano de fundo</p>
            <p className="bold">2 Imagens</p>
          </div>
          <div className="center-column box">
            {!!uploadedFiles.backgroundImages.length < 10 && state.dropbox && (
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
                onDelete={e => handleDeleteFileDownload(e, 'backgroundImages')}
              />
            )}
          </div>
        </li>
        <li className="item">
          <div className="left-column box">
            <h2>7. Vídeos*</h2>
            <p>
              Adicione os vídeos que serão utilizados em sua aula Cole os links
            </p>
            <p>no campo de texto ao lado ou envie arquivos de vídeo abaixo</p>
            <p className="bold">Links e/ou arquivos de vídeo</p>
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
              value={values.links}
              onChange={handleChange('links')}
            />
            <div className="divider">
              <p>OU</p>
            </div>
            {!!uploadedFiles.videos.length < 1 && state.dropbox && (
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
        </li>
        <li className="question-item">
          <div className="left-column box">
            <h2 className="title-question">Questões</h2>
            <TextEditor
              value={questions}
              handleChange={e => handleChangeQuestions(e, 'questions')}
            />

            <h2 className="title-question">Gabarito</h2>
            <TextEditor
              value={answers}
              handleChange={e => handleChangeQuestions(e, 'answers')}
            />
          </div>
        </li>
      </ul>
    </Container>
  );
}

Step02.propTypes = {
  handleDeleteFileDownload: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  handleChangeQuestions: PropTypes.func.isRequired,
  uploadedFiles: PropTypes.shape({
    length: PropTypes.string,
    slide: PropTypes.array,
    material: PropTypes.array,
    images: PropTypes.array,
    videos: PropTypes.array,
    materialComplementary: PropTypes.array,
    backgroundImages: PropTypes.array,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    links: PropTypes.string,
  }).isRequired,
};
