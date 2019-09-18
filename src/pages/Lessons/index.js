import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Container } from './styles';
import ImgDropAndCrop from '../../components/ImgDropCrop';
import FileList from '../../components/FileList';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: theme.spacing(3),
    background: [
      theme.palette.type === 'dark'
        ? theme.palette.paper.dark
        : theme.palette.paper.light,
    ],
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    background: [
      theme.palette.type === 'dark'
        ? theme.palette.paper.dark
        : theme.palette.paper.light,
    ],
  },

  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    'Selecione o Módulo do curso',
    'Adicione todos os conteúdos',
    'Finalize e aguarde a aprovação do pedagógico',
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Selecione o Módulo do curso';
    case 1:
      return 'Cadastre todo o conteúdo necessario!';
    case 2:
      return 'Finalize e aguarde a aprovação do pedagógico';
    default:
      return 'Uknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = getSteps();
  const [state, setState] = useState({
    dropbox: true,
    linkexterno: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Container>
        <div className="content-form">
          <div className="content-text">
            <h1>1. Tema*</h1>
            <p>Indique o título que contenha o tema principal da aula</p>
            <p>conteúdo escrito (1 linha)</p>
          </div>
          <div>
            <TextField
              id="outlined-bare"
              className={classes.textField}
              placeholder="Digite o tema"
              margin="normal"
              variant="outlined"
              inputProps={{ 'aria-label': 'bare' }}
              multiline
              rowsMax="4"
              fullWidth
            />
          </div>
        </div>
        <div className="content-form">
          <div className="content-text">
            <h1>2. Competências*</h1>
            <p>O que o aluno irá aprender com a aula?</p>
            <p>Quais os conhecimentos que serão adquiridos?</p>
            <p>Conteúdo escrito (Mínimo de 3 linhas)</p>
          </div>
          <div>
            <TextField
              id="standard-multiline-static"
              label="Multiline"
              variant="outlined"
              multiline
              rows="4"
              defaultValue="Default Value"
              className={classes.textField}
              margin="normal"
            />
          </div>
        </div>
        <div className="content-form">
          <div className="content-text">
            <h1>3. Material Didático Digital*</h1>
            <p>Slides</p>
            <p>Arquivo em pptx</p>
          </div>
          <div>
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
        </div>
        <div className="content-form">
          <div className="content-text">
            <h1>4. Imagens*</h1>
            <p>Adicione as imagens que serão utilizadas em sua aula</p>
            <p>Imagens(mínimo de 10) e GIFs</p>
          </div>
          <div>
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
        </div>
        <div className="content-form">
          <div className="content-text">
            <h1>5. Planos de Fundo*</h1>
            <p>Adicione as imagens que serão utilizadas no fundo da</p>
            <p>2 Imagens</p>
          </div>
          <div>
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
        </div>
        <div className="content-form">
          <div className="content-text">
            <h1>6. Vídeos*</h1>
            <p>
              Adicione os vídeos que serão utilizados em sua aula Cole os links
            </p>
            <p>no campo de texto ao lado ou envie arquivos de vídeo abaixo</p>
            <p>Links e/ou arquivos de vídeo</p>
          </div>
          <div>
            <div>
              <TextField
                id="standard-multiline-static"
                label="Multiline"
                variant="outlined"
                multiline
                rows="4"
                defaultValue="Default Value"
                className={classes.textField}
                margin="normal"
              />
            </div>
            <span>OU</span>
            <div>
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
          </div>
        </div>
        <div className="content-form">
          <div className="content-text">
            <h1>7. Material Complementar*</h1>
            <p>Parte escrita do conteúdo em no mínimo 3 laudas.</p>
            <p>Pode-se entender como um resumo/guia de aula</p>
            <p>que auxiliará o aluno no seu processo de aprendizagem.</p>
            <p>Isto não impede que você realize indicações de artigos,</p>
            <p>livros ou apostilas, caso deseje Arquivos de texto</p>
          </div>
          <div>
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
        </div>
        <div className="content-form">
          <div className="content-text">
            <h1>7. Questões*</h1>
          </div>
        </div>
      </Container>

      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
