import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import Button from '@material-ui/core/Button';

import storage from 'redux-persist/lib/storage';
import useReactRouter from 'use-react-router';
import { updateProfileRequest } from '../../store/modules/user/actions';
import { Container, useStyles } from './styles';
import AvatarInput from './AvatarInput';

export default function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = useReactRouter();
  const profile = useSelector(state => state.user.profile);

  function handleLeave() {
    storage.removeItem('persist:pedagogical');
    history.go('/signIn');
  }

  function handleSubmit(data) {
    const { id } = profile;

    dispatch(updateProfileRequest(data, id));
  }
  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="dropbox_id" />
        <h1>Alterar Dados</h1>
        <Input name="name" type="text" placeholder="Nome" />
        <Input name="surname" type="text" placeholder="Sobrenome" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="cellphone" type="text" placeholder="Telefone celular" />
        <Input name="formation" type="text" placeholder="Graduação" />
        <hr />
        <h2>Alterar Senha</h2>
        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha antiga"
        />
        <Input name="password" type="password" placeholder="Nova Senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confimação de senha"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
          type="submit"
        >
          Atualizar Perfil
        </Button>
      </Form>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        className={classes.button}
        onClick={handleLeave}
      >
        Sair do sistema
      </Button>
    </Container>
  );
}
