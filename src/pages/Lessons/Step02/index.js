import React, { useState } from 'react';

import { Container } from '../styles';
import ImgDropAndCrop from '../../../components/ImgDropCrop';
import FileList from '../../../components/FileList';
import Question from '../../../components/Question';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    height: '56px',
    width: '100%',
  },
}));

export default function Step02() {
  const classes = useStyles();
  const [state, setState] = useState({
    dropbox: true,
    linkexterno: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
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
            {!!uploadedFiles.length < 1 && state.dropbox && (
              <ImgDropAndCrop
                onUpload={() => {}}
                message="Clique ou arraste aqui para enviar"
                backgroundColor="download"
                accept="application/*, image/*, pdf/*"
              />
            )}

            {!!uploadedFiles.length && state.dropbox && (
              <FileList files={() => {}} onDelete={() => {}} />
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

            {!!uploadedFiles.length && state.dropbox && (
              <FileList files={() => {}} onDelete={() => {}} />
            )}
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

            {!!uploadedFiles.length && state.dropbox && (
              <FileList files={() => {}} onDelete={() => {}} />
            )}
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

            {!!uploadedFiles.length && state.dropbox && (
              <FileList files={() => {}} onDelete={() => {}} />
            )}
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
