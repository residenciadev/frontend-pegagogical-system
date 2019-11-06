import React, { useState, useEffect } from 'react';
import { emphasize, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import Tooltip from '@material-ui/core/Tooltip';

import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import api from '../../services/api';
import { Container } from './styles';
import Table from './table';

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
  const [curseSelected, setCurseSelected] = useState(null);
  const [cursesOptions, setCursesOptions] = useState([
    { id: '', value: '', label: '' },
  ]);
  const [courseLoading, setCourseLoading] = useState(true);

  const [blockSelected, setBlockSelected] = useState(null);
  const [blocksOptions, setBlocksOptions] = useState([
    { id: '', value: '', label: '' },
  ]);
  const [blockLoading, setBlockLoading] = useState(true);

  const [moduleSelected, setModuleSelected] = useState(null);
  const [modulesOptions, setModulesOptions] = useState([
    { id: '', value: '', label: '' },
  ]);
  const [moduleLoading, setModuleLoading] = useState(true);

  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);

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
    console.log(response.data);
    setTableData(response.data.lessons);
    setTableLoading(false);
  }

  const handleChangeCourse = value => {
    setCurseSelected(value);
    setBlockSelected([]);
    setModuleSelected([]);
    loadBlock(value.id);
  };
  const handleChangeBlock = value => {
    setBlockSelected(value);
    setModuleSelected([]);
    loadModules(value.id);
  };
  const handleChangeModule = value => {
    setModuleSelected(value);
    loadLessons(value.id);
  };

  useEffect(() => {
    async function load() {
      const response = await api.get('/courses');
      const option = response.data.map(e => {
        return { id: e.id, value: e.id, label: e.name };
      });
      setCursesOptions(option);
      setCourseLoading(false);
    }
    load();
    loadLessons(1);
  }, [setCursesOptions]);

  return (
    <>
      <Container>
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
              options={cursesOptions}
              value={curseSelected}
              onChange={handleChangeCourse}
            />
            <IconButton color="primary">
              <AddIcon />
            </IconButton>
            <IconButton>
              <EditIcon />
            </IconButton>
          </div>
        )}

        <div className="content">
          <Select
            className="basic-single"
            classNamePrefix="select"
            inputId="react-select-multiple"
            placeholder="Selecione o Bloco"
            options={blocksOptions}
            value={blockSelected}
            onChange={handleChangeBlock}
            isDisabled={blockLoading}
          />
          <Tooltip title="Add" aria-label="add">
            <IconButton color="primary">
              <AddIcon />
            </IconButton>
          </Tooltip>
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>

        <div className="content">
          <Select
            className="basic-single"
            classNamePrefix="select"
            inputId="react-select-multiple"
            placeholder="Selecione o Módulo"
            options={modulesOptions}
            value={moduleSelected}
            onChange={handleChangeModule}
            isDisabled={moduleLoading}
          />
          <IconButton color="primary">
            <AddIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
      </Container>
      {!tableLoading && tableData && <Table data={tableData} />}
    </>
  );
}
