import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
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
import Select from 'react-select';
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

const useModalStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  select: {
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px',
    color: '#000',
  },
  formControlWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /[0-9]/,
        /\d/,
        /\d/,
        ')',
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      // placeholderChar={'\u2000'}
      // showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default function Users() {
  const [modalStyle] = useState(getModalStyle);
  const classes = useModalStyles();
  const { match } = useReactRouter();
  const [data, setData] = useState([]);
  const [userSelected, setUserSelected] = useState('');

  const userOptions = [
    { value: 'teacher', label: 'Professor' },
    { value: 'pedagogical', label: 'Pedagógico' },
    { value: 'revision', label: 'Revisão' },
  ];

  const [open, setOpen] = useState(false);

  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    cellphone: '',
    formation: '',
  });

  const handleOpenClose = () => {
    setOpen(!open);
    setValues({
      name: '',
      surname: '',
      email: '',
      password: '',
      cellphone: '',
      formation: '',
    });
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

  function handleSelectType(e) {
    setUserSelected(e);
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const { name, surname, email, password, cellphone, formation } = values;
    const type = userSelected;

    try {
      const response = await api.post('/users', {
        name,
        surname,
        email,
        password,
        type: type.value,
        cellphone,
        formation,
      });

      setData([response.data, ...data]);

      toast.success('Usuário criado com sucesso!');
    } catch (error) {
      toast.error('Não foi possível criar o usuário!');
    }

    handleOpenClose();
  };

  async function loadData(search) {
    if (search) {
      const response = await api.get(`/users?name=${search}`);
      setData(response.data);
    } else {
      const response = await api.get(`/users`);

      setData(response.data);
    }
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
        <ModalContainer style={modalStyle} className={classes.paper}>
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
                required
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
                required
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
                required
              />

              <Select
                className={classes.select}
                classNamePrefix="select"
                isSearchable
                name="type"
                placeholder="Selecione o tipo de usuário"
                options={userOptions}
                value={userSelected}
                onChange={handleSelectType}
                required
              />
              <FormControl fullWidth>
                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                <Input
                  id="adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  fullWidth
                  required
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
              <FormControl className={classes.formControlWrapper}>
                <InputLabel htmlFor="formatted-text-mask-input" required>
                  Digite o numero do celular
                </InputLabel>
                <Input
                  value={values.cellphone}
                  onChange={handleChange('cellphone')}
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom}
                  fullWidth
                  required
                />
                <TextField
                  id="outlined-bare-formation"
                  fullWidth
                  placeholder="Formação"
                  margin="normal"
                  inputProps={{ 'aria-label': 'bare' }}
                  value={values.formation}
                  onChange={handleChange('formation')}
                  type="text"
                  label="Formação"
                  required
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
        <Table data={data} loadData={e => loadData(e)} />
      </Wrapper>
    </>
  );
}
