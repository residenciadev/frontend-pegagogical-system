import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Select from 'react-select';
import Checkbox from '@material-ui/core/Checkbox';

import Button from '@material-ui/core/Button';

import { ModalContainer, ButtonCreate, ModalContent } from '../styles';

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
    color: '#000',
    backgroundColor: '#000',
  },
}));

export default function ModalEdit({
  handleOpenClose,
  open,
  values,
  handleChange,
  handleClickShowPassword,
  handleMouseDownPassword,
  handleSubmit,
  state,
  handleChangeCheckbox,
  handleSelectType,
  userSelected,
  userOptions,
}) {
  const [modalStyle] = useState(getModalStyle);
  const classes = useModalStyles();
  return (
    <>
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
              <TextField
                id="outlined-bare-cellphone"
                fullWidth
                placeholder="Telefone"
                margin="normal"
                inputProps={{ 'aria-label': 'bare' }}
                value={values.cellphone}
                onChange={handleChange('cellphone')}
                type="text"
                label="Telefone"
              />
              <TextField
                id="outlined-bare-formation"
                fullWidth
                placeholder="Graduação"
                margin="normal"
                inputProps={{ 'aria-label': 'bare' }}
                value={values.formation}
                onChange={handleChange('formation')}
                type="text"
                label="Graduação"
              />
              <Select
                className={classes.select}
                classNamePrefix="select"
                isSearchable
                name="type"
                placeholder="Selecione o tipo de usuário caso deseja mudar"
                defaultValue={values.type}
                options={userOptions}
                value={userSelected}
                onChange={handleSelectType}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.password}
                    onChange={handleChangeCheckbox('password')}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Deseja editar a senha ?"
              />
              {state.password && (
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
              )}

              <div>
                <ButtonCreate variant="contained" color="primary" type="submit">
                  Atualizar
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
    </>
  );
}

ModalEdit.propTypes = {
  handleOpenClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    email: PropTypes.string,
    type: PropTypes.string,
    showPassword: PropTypes.string,
    password: PropTypes.string,
    formation: PropTypes.string,
    cellphone: PropTypes.string,
  }).isRequired,
  state: PropTypes.shape({
    password: PropTypes.bool,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleMouseDownPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChangeCheckbox: PropTypes.func.isRequired,
  handleSelectType: PropTypes.func.isRequired,
  userOptions: PropTypes.array.isRequired,
  userSelected: PropTypes.func,
};

ModalEdit.defaultProps = {
  userSelected: () => {},
};
