import React, { useState, useEffect, useCallback } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '../styles';
import ImgDropAndCrop from '../../../components/ImgDropCrop';
import FileList from '../../../components/FileList';
import Question from '../../../components/Question';
import api from '../../../services/api';

const useStyles = makeStyles(theme => ({
  textField: {
    height: '56px',
    width: '100%',
  },
}));

export default function Step02({ handleDeleteFileDownload }) {
  const classes = useStyles();
  const [state, setState] = useState({
    dropbox: true,
    linkexterno: false,
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    slides: [],
    material: [],
  });
  const [values, setValues] = useState({
    themeLesson: '',
    competencia: '',
  });

  const updateFile = useCallback(
    (id, data) => {
      const value = uploadedFiles.slides.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      });

      console.log('value', value);
      console.log('uploadedFilesOnFunction', uploadedFiles);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uploadedFiles.slides]
  );

  function processUpload(upFile, type) {
    const data = new FormData();

    data.append('file', upFile.file, upFile.name);

    api
      .post('dropbox', data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total), 10);

          updateFile(upFile.id, {
            progress,
          });
        },
      })
      .then(response => {
        updateFile(upFile.id, {
          uploaded: true,
          id: response.data.id,
          url: response.data.url,
          type,
        });
      })
      .catch(response => {
        updateFile(upFile.id, {
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
    setUploadedFiles(uploadedFiles => ({
      slides: uploadedFiles.slides.concat(uploaded),
    }));
    uploaded.forEach(e => processUpload(e, type));
  }

  // useEffect(() => {
  //   updateFile();
  // }, [updateFile, uploadedFiles]);

  console.log('slides', uploadedFiles);
  return (
    <Container>
      <ul>
        <li className="item">
          <div className="left-column box">
            <h2>3. Material Didático Digital*</h2>
            <p>Slides</p>
            <p>Arquivo em pptx</p>
          </div>
          <div className="center-column box">
            {!!uploadedFiles.slides.length < 5 && state.dropbox && (
              <ImgDropAndCrop
                onUpload={e => handleUpload(e, 'slides')}
                message="Clique ou arraste aqui para enviar"
                backgroundColor="upload"
                accept="application/*"
              />
            )}

            {!!uploadedFiles.slides.length && (
              <FileList
                files={uploadedFiles.slides}
                onDelete={handleDeleteFileDownload}
              />
            )}
          </div>
        </li>
        <li className="item">
          <div className="left-column box">
            <h2>4. Imagens*</h2>
            <p>Adicione as imagens que serão utilizadas em sua aula</p>
            <p>Imagens(mínimo de 10) e GIFs</p>
          </div>
          <div className="center-column box">
            {!!uploadedFiles.length < 1 && state.dropbox && (
              <ImgDropAndCrop
                onUpload={() => {}}
                message="Clique ou arraste aqui para enviar"
                backgroundColor="download"
                accept="application/*, image/*, pdf/*"
              />
            )}

            {/* {!!uploadedFiles.length && state.dropbox && (
              <FileList files={() => {}} onDelete={() => {}} />
            )} */}
          </div>
        </li>
        <li className="item">
          <div className="left-column box">
            <h2>5. Planos de Fundo*</h2>
            <p>Adicione as imagens que serão utilizadas no fundo da</p>
            <p>2 Imagens</p>
          </div>
          <div className="center-column box">
            {!!uploadedFiles.length < 1 && state.dropbox && (
              <ImgDropAndCrop
                onUpload={() => {}}
                message="Clique ou arraste aqui para enviar"
                backgroundColor="download"
                accept="application/*, image/*, pdf/*"
              />
            )}

            {/* {!!uploadedFiles.length && state.dropbox && (
              <FileList files={() => {}} onDelete={() => {}} />
            )} */}
          </div>
        </li>
        <li className="item">
          <div className="left-column box">
            <h2>6. Vídeos*</h2>
            <p>
              Adicione os vídeos que serão utilizados em sua aula Cole os links
            </p>
            <p>no campo de texto ao lado ou envie arquivos de vídeo abaixo</p>
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
            {!!uploadedFiles.length < 1 && state.dropbox && (
              <ImgDropAndCrop
                onUpload={() => {}}
                message="Clique ou arraste aqui para enviar"
                backgroundColor="download"
                accept="application/*, image/*, pdf/*"
              />
            )}

            {/* {!!uploadedFiles.length && state.dropbox && (
              <FileList files={() => {}} onDelete={() => {}} />
            )} */}
          </div>
        </li>
        <li className="question-item">
          <div className="left-column box">
            <h2 className="title-question">Questões</h2>
            <Question />

            <h2 className="title-question">Gabarito</h2>
            <Question />
          </div>
        </li>
      </ul>
    </Container>
  );
}
