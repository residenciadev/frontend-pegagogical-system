/* eslint-disable camelcase */
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
import { toast } from 'react-toastify';
import useReactRouter from 'use-react-router';
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
  alert: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    color: theme.palette.secondary.main,
  },

  content: {
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: '1208px',
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
  const { history } = useReactRouter();
  const [activeStep, setActiveStep] = useState(0);
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);
  const [values, setValues] = useState({
    theme: '',
    skills: '',
    links: '',
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
  const [modulesOptions, setModulesOptions] = useState([]);
  const [modulesSelected, setModulesSelected] = useState();
  const [lessonSelected, setLessonSelected] = useState();
  const [message, setMessage] = useState('');

  const steps = getSteps();
  const [state, setState] = useState({
    dropbox: true,
    linkexterno: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    slide: [],
    materialComplementary: [],
    images: [],
    backgroundImages: [],
    videos: [],
  });

  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();

  // const [loading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    dispatch(getUserRequest());
    // setLoading(false);
  }, [dispatch]);

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

    []
  );

  const fixedLessons = useCallback(lessons => {
    setLessonsOptions(prevState => {
      // eslint-disable-next-line no-return-assign
      lessons.forEach(element => {
        prevState.map(option => {
          if (option.value === element.title) {
            option.disabled = true;
          }
        });
      });

      return [...prevState];
    });
    setIsDisabled(false);
  }, []);

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
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const module_id = modulesSelected.id;
      const status = 'waiting_for_the_pedagogical';
      const title = lessonSelected.value;
      const { theme, skills, links } = values;
      const {
        slide,
        materialComplementary,
        images,
        backgroundImages,
        videos,
      } = uploadedFiles;
      const data = slide.concat(
        materialComplementary,
        images,
        backgroundImages,
        videos
      );

      const dropbox = data
        .filter(element => element.id !== undefined)
        .map(element => element.id);

      if (activeStep === 1) {
        if (
          slide.length >= 1 &&
          materialComplementary.length >= 1 &&
          dropbox.length >= 10 &&
          backgroundImages.length >= 1 &&
          videos.length >= 1 &&
          !!questions &&
          !!answers
        ) {
          const responseLesson = await api.post('lessons', {
            module_id,
            status,
            title,
          });
          console.log(answers);
          await api.post(`lessons/${responseLesson.data.id}/content`, {
            theme,
            skills,
            slide: true,
            material: true,
            material_complementary: true,
            images: true,
            images_background: true,
            video: true,
            links,
            dropbox,
            questions,
            answers,
          });

          toast.success(
            'Aula criada com sucesso, aguarde a aprovação do pedagógico'
          );

          history.push('/');
        } else {
          setMessage(
            'Você precisa preencher todos os campos !! Lembrando Imagens são no mínimo 10'
          );

          setTimeout(() => {
            setMessage('');
          }, 5000);
          throw new Error('oops');
        }
      }
    } catch (error) {
      toast.error('Não foi possível criar a aula, verifique todos os campos');
    }
  }

  function handleNext() {
    if (activeStep === 0) {
      if (
        !values.title &&
        !values.skills &&
        !modulesSelected &&
        !lessonSelected
      ) {
        setMessage('Você precisa preencher todos os campos !!');

        setTimeout(() => {
          setMessage('');
        }, 5000);
      } else {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    }
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

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

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Step01
            loading={loading}
            modules={profile.modules}
            values={values}
            lessonsOptions={lessonsOptions}
            lessonSelected={lessonSelected}
            modulesOptions={modulesOptions}
            modulesSelected={modulesSelected}
            handleSelectLesson={handleSelectLesson}
            handleSelectModule={handleSelectModule}
            fixedModules={fixedModules}
            loadLessonsDone={loadLessonsDone}
            isDisabled={isDisabled}
            handleChange={handleChange}
          />
        );
      case 1:
        return (
          <Step02
            handleDeleteFileDownload={handleDeleteFileDownload}
            handleUpload={handleUpload}
            uploadedFiles={uploadedFiles}
            handleChangeQuestions={handleChangeQuestions}
            questions={questions}
            answers={answers}
            values={values}
            handleChange={handleChange}
          />
        );

      default:
        return 'Uknown stepIndex';
    }
  }
  console.log(profile);
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {loading && <h1>Carregando...</h1>}
      {!loading && profile && (
        <form onSubmit={e => handleSubmit(e)}>
          <>{getStepContent(activeStep)}</>
          <div className={classes.content}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
              type="button"
            >
              Voltar
            </Button>

            {activeStep === steps.length - 2 && (
              <Button type="submit" variant="contained" color="primary">
                Finalizar
              </Button>
            )}
            {activeStep !== steps.length - 2 && (
              <Button
                variant="contained"
                type="button"
                color="primary"
                onClick={handleNext}
              >
                Próximo
              </Button>
            )}
            <span className={classes.alert}>{message}</span>
          </div>
        </form>
      )}
    </div>
  );
}
