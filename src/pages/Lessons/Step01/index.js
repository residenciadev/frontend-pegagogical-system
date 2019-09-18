import React from 'react';

import { Container } from '../styles';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    height: '56px',
    width: '100%',
  },
}));

export default function Step01() {
  const classes = useStyles();
  const options = [
    { value: 'aula-01', label: 'Aula 01' },
    { value: 'aula-02', label: 'Aula 02' },
    { value: 'aula-03', label: 'Aula 03' },
    { value: 'aula-04', label: 'Aula 04' },
    { value: 'aula-05', label: 'Aula 05' },
    { value: 'aula-06', label: 'Aula 06' },
    { value: 'aula-07', label: 'Aula 07' },
    { value: 'aula-08', label: 'Aula 08' },
    { value: 'aula-09', label: 'Aula 09' },
  ];

  const modules = [
    { value: 'saude-1', label: 'Saúde da Mulher' },
    { value: 'saude-2', label: 'Saúde Pública' },
  ];
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
                className="basic-single"
                classNamePrefix="select"
                isSearchable
                name="color"
                options={modules}
              />
            </div>
          </li>
          <li className="item">
            <div className="left-column box">
              <h2>1. Selecione o numero da aula*</h2>
            </div>
            <div className="center-column box">
              <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable
                name="color"
                options={options}
              />
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
                multiline
                rowsMax="4"
                fullWidth
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
                rows="4"
                placeholder="O que o aluno irá aprender com a aula?"
                className={classes.textField}
              />
            </div>
          </li>
        </ul>
      </Container>
    </>
  );
}
