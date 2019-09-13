import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import useReactRouter from 'use-react-router';
import { toast } from 'react-toastify';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import api from '../../services/api';
import Table from './tableUsers';

import {
  Container,
  Wrapper,
  ButtonFolder,
  ModalContainer,
  ButtonCreate,
  ModalContent,
} from './styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Users() {
  const [modalStyle] = useState(getModalStyle);
  const { match } = useReactRouter();
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);

  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const handleOpenClose = () => {
    setOpen(!open);
    setValues({ name: '', surname: '', email: '', password: '' });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, surname, email, password } = values;

    try {
      const response = await api.post('/users', {
        name,
        surname,
        email,
        password,
      });

      setData([response.data, ...data]);

      toast.success('Usuário criado com sucesso!');
    } catch (error) {
      toast.error('Não foi possível criar o usuário!');
    }

    handleOpenClose();
  };
  async function loadData() {
    const response = await api.get(`/users`);
    setData(response.data);
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Container>
        <h1>{match.params.title}</h1>
        <div>
          <ButtonFolder
            color="primary"
            aria-label="add"
            variant="outlined"
            onClick={handleOpenClose}
          >
            Cadastrar Usuário
          </ButtonFolder>
        </div>
      </Container>
      {/* MODAL - CRIAR PASTA */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleOpenClose}
      >
        <ModalContainer style={modalStyle}>
          <h2 id="simple-modal-title">Cadastrar Usuário</h2>
          <ModalContent>
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-bare-nome"
                fullWidth
                placeholder="Nome"
                margin="normal"
                inputProps={{ 'aria-label': 'bare' }}
                value={values.name}
                onChange={handleChange('name')}
                label="Nome"
              />
              <TextField
                id="outlined-bare-sobrenome"
                fullWidth
                placeholder="Sobrenome"
                margin="normal"
                inputProps={{ 'aria-label': 'bare' }}
                value={values.surname}
                onChange={handleChange('surname')}
                label="Sobrenome"
              />
              <TextField
                id="outlined-bare-email"
                fullWidth
                placeholder="E-mail"
                margin="normal"
                inputProps={{ 'aria-label': 'bare' }}
                value={values.email}
                onChange={handleChange('email')}
                type="email"
                label="E-mail"
              />
              <FormControl fullWidth>
                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                <Input
                  id="adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <div>
                <ButtonCreate variant="contained" color="primary" type="submit">
                  CRIAR
                </ButtonCreate>
                <Button
                  variant="outlined"
                  color="default"
                  onClick={handleOpenClose}
                  type="button"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </ModalContent>
        </ModalContainer>
      </Modal>
      <Wrapper>
        <Table data={data} loadData={() => loadData()} />
      </Wrapper>
    </>
  );
}
