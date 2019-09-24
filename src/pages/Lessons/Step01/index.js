import React, { useEffect } from 'react';

import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '../styles';

const useStyles = makeStyles(theme => ({
  textField: {
    height: '56px',
    width: '100%',
  },
}));

export default function Step01({
  modules,
  values,
  setValues,
  lessonsOptions,
  setLessonsOptions,
  lessonSelected,
  setLessonSelected,
  modulesOptions,
  setModulesOptions,
  modulesSelected,
  setModulesSelected,
  fixedModules,
  handleSelectModule,
  isDisabled,
  handleSelectLesson,
  handleChange,
}) {
  const classes = useStyles();

  useEffect(() => {
    console.log(modules);
    if (modules) {
      fixedModules(modules);
    }
  }, [fixedModules, modules]);

  return (
    <>
      <Container>
        <ul>
          <li className="item">
            <div className="left-column box">
              <h2>1. Selecione o Módulo*</h2>
            </div>
            <div className="center-column box">
              <Select
                classNamePrefix="selecione"
                isSearchable
                name="color"
                options={modulesOptions}
                value={modulesSelected}
                onChange={handleSelectModule}
              />
              {modulesSelected && (
                <span>
                  O módulo selecionado é {modulesSelected.label} do{' '}
                  <strong>BLOCO - {modulesSelected.block}</strong>{' '}
                </span>
              )}
            </div>
          </li>
          <li className="item">
            <div className="left-column box">
              <h2>1. Selecione o numero da aula*</h2>
            </div>
            <div className="center-column box">
              {
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isDisabled={isDisabled}
                  isSearchable
                  name="color"
                  options={lessonsOptions}
                  value={lessonSelected}
                  onChange={handleSelectLesson}
                  isOptionDisabled={option => option.disabled === true}
                />
              }
            </div>
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
                value={values.themeLesson}
                onChange={handleChange('themeLesson')}
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
                value={values.competencia}
                onChange={handleChange('competencia')}
              />
            </div>
          </li>
        </ul>
      </Container>
    </>
  );
}
