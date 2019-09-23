import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import Step01 from './Step01';
import Step02 from './Step02';
import { getUserRequest } from '../../store/modules/user/actions';
import api from '../../services/api';

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

export default function Lessons() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const profile = useSelector(state => state.user.profile);
  const [values, setValues] = useState({
    themeLesson: '',
    competencia: '',
  });
  const [lessonsOptions, setLessonsOptions] = useState([
    { value: 'aula-01', label: 'Aula 01', disabled: false },
    { value: 'aula-02', label: 'Aula 02', disabled: false },
    { value: 'aula-03', label: 'Aula 03', disabled: false },
    { value: 'aula-04', label: 'Aula 04', disabled: false },
    { value: 'aula-05', label: 'Aula 05', disabled: false },
    { value: 'aula-06', label: 'Aula 06', disabled: false },
    { value: 'aula-07', label: 'Aula 07', disabled: false },
    { value: 'aula-08', label: 'Aula 08', disabled: false },
    { value: 'aula-09', label: 'Aula 09', disabled: false },
  ]);
  const [modulesOptions, setModulesOptions] = useState();
  const [modulesSelected, setModulesSelected] = useState();
  const [lessonSelected, setLessonSelected] = useState();

  const [uploadedFiles1, setuploadedFiles1] = useState([]);
  const [uploadedFiles1lides, setuploadedFiles1lides] = useState([]);

  const steps = getSteps();
  const [state, setState] = useState({
    dropbox: true,
    linkexterno: false,
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const fixedModules = useCallback(
    modules => {
      const obj = modules.map(module => ({
        id: module.id,
        value: module.slug,
        label: module.name,
        block: module.blocks.name,
      }));
      setModulesOptions(obj);
    },
    [setModulesOptions]
  );

  const fixedLessons = useCallback(
    lessons => {
      for (let i = 0; i < lessonsOptions.length; i++) {
        if (lessons.length <= 0) {
          lessonsOptions[i].disabled = false;
        }
        for (let j = 0; j < lessons.length; j++) {
          if (lessonsOptions[i].label === lessons[0].title) {
            lessonsOptions[i].disabled = true;
          } else {
            lessonsOptions[i].disabled = false;
          }
        }
      }
      setIsDisabled(false);
    },
    [lessonsOptions]
  );

  const loadLessonsDone = useCallback(
    async modulesSelected => {
      const response = await api.get(
        `modules/${modulesSelected.id}/lesson-done`
      );
      fixedLessons(response.data);
    },
    [fixedLessons]
  );

  function handleSelectModule(e) {
    setModulesSelected(e);
    loadLessonsDone(e);
  }

  function handleSelectLesson(e) {
    setLessonSelected(e);
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDeleteFileDownload = async id => {
    await api.delete(`dropbox/${id}`);
    setuploadedFiles1([]);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Step01
            modules={profile[0].modules}
            values={values}
            setValues={setValues}
            lessonsOptions={lessonsOptions}
            setLessonsOptions={setLessonsOptions}
            lessonSelected={lessonSelected}
            setLessonSelected={setLessonSelected}
            modulesOptions={modulesOptions}
            setModulesOptions={setModulesOptions}
            modulesSelected={modulesSelected}
            setModulesSelected={setModulesSelected}
            handleSelectLesson={handleSelectLesson}
            handleSelectModule={handleSelectModule}
            fixedModules={fixedModules}
            loadLessonsDone={loadLessonsDone}
            isDisabled={isDisabled}
            handleChange={handleChange}
          />
        );
      case 1:
        return <Step02 handleDeleteFileDownload={handleDeleteFileDownload} />;
      case 2:
        return 'Finalize e aguarde a aprovação do pedagógico';
      default:
        return 'Uknown stepIndex';
    }
  }

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  useEffect(() => {
    dispatch(getUserRequest());
  }, [dispatch]);

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
              Todas as etapas foram concluídas
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <>{getStepContent(activeStep)}</>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Voltar
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
