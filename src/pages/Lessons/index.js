import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Step01 from './Step01';
import Step02 from './Step02';

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
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    height: '56px',
    width: '100%',
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
      return <Step01 />;
    case 1:
      return <Step02 />;
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
