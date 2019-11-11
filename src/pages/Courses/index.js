import React, { useState, useEffect } from 'react';
import { emphasize, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import Tooltip from '@material-ui/core/Tooltip';
import useReactRouter from 'use-react-router';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal';
import api from '../../services/api';
import { Container, ContentSelect, MdButton } from './styles';
import Table from './table';
import ModalTeachers from './ModalTeachers';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
    color: '#000',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
    color: '#000',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
  title: {
    fontSize: '24px',
  },
}));

export default function Courses() {
  const classes = useStyles();
  const { history } = useReactRouter();
  const [courseSelected, setCourseSelected] = useState(null);
  const [coursesOptions, setCoursesOptions] = useState([
    { id: '', value: '', label: '' },
  ]);
  const [courseLoading, setCourseLoading] = useState(true);

  const [blockSelected, setBlockSelected] = useState(null);
  const [blocksOptions, setBlocksOptions] = useState([
    { id: '', value: '', label: '' },
  ]);
  const [blockLoading, setBlockLoading] = useState(true);

  const [moduleSelected, setModuleSelected] = useState({
    id: '',
    value: '',
    label: '',
  });
  const [modulesOptions, setModulesOptions] = useState([
    { id: '', value: '', label: '' },
  ]);
  const [moduleLoading, setModuleLoading] = useState(true);

  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalData, setModalData] = useState({
    id: '',
    type: '',
    name: '',
  });
  const [disableButton, setDisableButton] = useState({
    courseCreate: false,
    blockCreate: true,
    moduleCreate: true,
    courseEdit: true,
    blockEdit: true,
    moduleEdit: true,
  });

  const [teachers, setTeachers] = useState([]);
  const [modalOpenTeacher, setModalOpenTeacher] = useState(false);

  const handleOpen = (e, id, name, type) => {
    setModalData({ id, name, type });
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleOpenTeacher = () => {
    setModalOpenTeacher(true);
  };
  const handleCloseTeacher = () => {
    setModalOpenTeacher(false);
  };

  const handleOpenEdit = (e, id, name, type) => {
    setModalData({ id, name, type });
    setModalOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setModalOpenEdit(false);
  };

  async function loadTeachers() {
    try {
      const response = await api.get('/users');
      setTeachers(response.data);
    } catch (error) {}
  }

  async function loadCourse() {
    const response = await api.get('/courses');
    const option = response.data.map(e => {
      return { id: e.id, value: e.id, label: e.name };
    });
    setCoursesOptions(option);
    setCourseLoading(false);
  }
  async function loadBlock(courseId) {
    const response = await api.get(`blocks?courseId=${courseId}`);
    const option = response.data.map(e => {
      return { id: e.id, value: e.id, label: e.name };
    });
    setBlocksOptions(option);
    setBlockLoading(false);
  }

  async function loadModules(blockId) {
    const response = await api.get(`modules?blockId=${blockId}`);
    const option = response.data.map(e => {
      return { id: e.id, value: e.id, label: e.name };
    });
    setModulesOptions(option);
    setModuleLoading(false);
  }

  async function loadLessons(moduleId) {
    const response = await api.get(`modules/${moduleId}`);
    setTableData(response.data.lessons);
    setTableLoading(false);
  }

  const handleChangeCourse = value => {
    setCourseSelected(value);
    setBlockSelected([]);
    setModuleSelected([]);
    setDisableButton(prevState => {
      return {
        ...prevState,
        courseCreate: false,
        courseEdit: false,
        blockCreate: false,
      };
    });
    loadBlock(value.id);
  };
  const handleChangeBlock = value => {
    setBlockSelected(value);
    setModuleSelected([]);
    setDisableButton(prevState => {
      return {
        ...prevState,
        courseEdit: false,
        blockCreate: false,
        blockEdit: false,
        moduleCreate: false,
      };
    });
    loadModules(value.id);
  };
  const handleChangeModule = value => {
    setModuleSelected(value);
    setDisableButton(prevState => {
      return {
        ...prevState,
        courseEdit: false,
        blockCreate: false,
        blockEdit: false,
        moduleEdit: false,
      };
    });
    loadLessons(value.id);
  };

  async function handleSubmit(e, type) {
    e.preventDefault();
    if (type === 'course') {
      try {
        api.post('courses', {
          name: title,
        });
        toast.success('Curso criado com sucesso!');
        loadCourse();
        setModalOpen(false);
      } catch (error) {
        setModalOpen(false);
        toast.error('Falha ao criar!');
      }
    }
    if (type === 'block') {
      try {
        api.post('blocks', {
          name: title,
          course_id: courseSelected.id,
        });
        toast.success('Bloco criado com sucesso!');

        setModalOpen(false);
        loadBlock(courseSelected.id);
      } catch (error) {
        setModalOpen(false);
        toast.error('Falha ao criar!');
      }
    }
    if (type === 'module') {
      try {
        api.post('modules', {
          name: title,
          block_id: blockSelected.id,
        });
        toast.success('Disciplina criada com sucesso!');
        setModalOpen(false);
        loadModules(blockSelected.id);
      } catch (error) {
        setModalOpen(false);
        toast.error('Falha ao criar!');
      }
    }
  }

  async function handleEdit(e, type) {
    e.preventDefault();
    if (type === 'course') {
      try {
        api.put(`courses/${courseSelected.id}`, {
          name: title,
        });
        toast.success('Curso editado com sucesso!');
        setTimeout(() => {
          history.go('/courses');
        }, 1000);
        setModalOpenEdit(false);
      } catch (error) {
        setModalOpenEdit(false);
        toast.error('Falha ao editar!');
      }
    }
    if (type === 'block') {
      try {
        api.put(`blocks/${blockSelected.id}`, {
          name: title,
        });
        toast.success('Bloco editado com sucesso!');

        setModalOpenEdit(false);
        setTimeout(() => {
          history.go('/courses');
        }, 1000);
      } catch (error) {
        setModalOpenEdit(false);
        toast.error('Falha ao editar!');
      }
    }
    if (type === 'module') {
      try {
        api.put(`modules/${moduleSelected.id}`, {
          name: title,
        });
        toast.success('Disciplina editado com sucesso!');
        setModalOpenEdit(false);
        setTimeout(() => {
          history.go('/courses');
        }, 1000);
        loadModules(blockSelected.id);
      } catch (error) {
        setModalOpenEdit(false);
        toast.error('Falha ao editar!');
      }
    }
  }

  useEffect(() => {
    async function load() {
      const response = await api.get('/courses');
      const option = response.data.map(e => {
        return { id: e.id, value: e.id, label: e.name };
      });
      setCoursesOptions(option);
      setCourseLoading(false);
    }
    load();
    loadLessons(1);
  }, []);

  return (
    <>
      <Container>
        <ContentSelect>
          <Typography className={classes.title} variant="h1" component="h2">
            Curso/Bloco/Disciplina
          </Typography>
          {!courseLoading && (
            <div className="content">
              <Select
                className="basic-single"
                classNamePrefix="select"
                inputId="react-select-multiple"
                placeholder="Selecione um Curso"
                isLoading={courseLoading}
                options={coursesOptions}
                value={courseSelected}
                onChange={handleChangeCourse}
              />
              <Tooltip title="Criar curso">
                <span>
                  <IconButton
                    color="primary"
                    id="create-course"
                    disabled={disableButton.courseCreate}
                    onClick={e => handleOpen(e, '', 'Curso', 'course')}
                  >
                    <AddIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Editar curso">
                <span>
                  <IconButton
                    id="edit-course"
                    disabled={disableButton.courseEdit}
                    onClick={e => {
                      handleOpenEdit(e, '', 'Curso', 'course');
                      setTitle(courseSelected.label);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          )}

          <div className="content">
            <Select
              className="basic-single"
              classNamePrefix="select"
              inputId="react-select-multiple"
              placeholder="Selecione um Bloco"
              options={blocksOptions}
              value={blockSelected}
              onChange={handleChangeBlock}
              isDisabled={blockLoading}
            />
            <Tooltip title="Criar bloco">
              <span>
                <IconButton
                  color="primary"
                  id="create-block"
                  disabled={disableButton.blockCreate}
                  onClick={e => handleOpen(e, '', 'Bloco', 'block')}
                >
                  <AddIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Editar bloco">
              <span>
                <IconButton
                  id="edit-block"
                  disabled={disableButton.blockEdit}
                  onClick={e => {
                    handleOpenEdit(e, '', 'Bloco', 'block');
                    setTitle(blockSelected.label);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>

          <div className="content">
            <Select
              className="basic-single"
              classNamePrefix="select"
              inputId="react-select-multiple"
              placeholder="Selecione uma Disciplina"
              options={modulesOptions}
              value={moduleSelected}
              onChange={handleChangeModule}
              isDisabled={moduleLoading}
            />
            <Tooltip title="Criar Disciplina">
              <span>
                <IconButton
                  color="primary"
                  id="create-module"
                  disabled={disableButton.moduleCreate}
                  onClick={e => handleOpen(e, '', 'Disciplina', 'module')}
                >
                  <AddIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Editar Disciplina">
              <span>
                <IconButton
                  id="edit-module"
                  disabled={disableButton.moduleEdit}
                  onClick={e => {
                    handleOpenEdit(e, '', 'Disciplina', 'module');
                    setTitle(moduleSelected.label);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Adicionar professor a disciplina">
              <span>
                <IconButton
                  id="edit-module"
                  disabled={disableButton.moduleEdit}
                  onClick={e => {
                    loadTeachers();
                    handleOpenTeacher(e, '', 'Disciplina', 'module');
                  }}
                >
                  <PersonAddIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
          {!tableLoading && tableData && <Table data={tableData} />}
        </ContentSelect>
        <div className="content-right" show={`${modalOpenTeacher}`}>
          <ModalTeachers
            open={modalOpenTeacher}
            handleClose={handleCloseTeacher}
            teachers={teachers.filter(t => t.type === 'teacher')}
            moduleId={moduleSelected.id || 0}
          />
        </div>
      </Container>
      <Modal
        open={modalOpen}
        handleClose={handleClose}
        title={`Digite o nome do ${modalData.name}`}
      >
        <form
          action="post"
          method="post"
          onSubmit={e => handleSubmit(e, modalData.type)}
        >
          <input
            placeholder={`Digite o nome do ${modalData.name}`}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <hr />
          <div className="content-btn">
            <MdButton variant="contained" color="primary" type="submit">
              Criar
            </MdButton>
            <MdButton
              variant="outlined"
              color="primary"
              type="button"
              onClick={handleClose}
            >
              Cancelar
            </MdButton>
          </div>
        </form>
      </Modal>
      <Modal
        open={modalOpenEdit}
        handleClose={handleCloseEdit}
        title={`Digite o nome do ${modalData.name}`}
      >
        <form
          action="put"
          method="put"
          onSubmit={e => handleEdit(e, modalData.type)}
        >
          <input
            placeholder={`Digite o nome do ${modalData.name}`}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <hr />
          <div className="content-btn">
            <MdButton variant="contained" color="primary" type="submit">
              Editar
            </MdButton>
            <MdButton
              variant="outlined"
              color="primary"
              type="button"
              onClick={handleCloseEdit}
            >
              Cancelar
            </MdButton>
          </div>
        </form>
      </Modal>
    </>
  );
}
