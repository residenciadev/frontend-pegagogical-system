import React from 'react';

import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';

import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

import * as Yup from 'yup';
import logo from '../../assets/icon-qr.svg';
import { signInRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SingIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="icon" />
      <h1>Login</h1>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="email" name="email" label="E-mail" className="email" />

        <Input type="password" name="password" label="Senha" />
        <Button color="primary" variant="contained" type="submit">
          {loading ? 'Carregando...' : 'Entrar'}
        </Button>
      </Form>
      {/* <Link to="/esqueci-minha-senha" className="forgotten-password">
        Esqueci minha senha
      </Link> */}
    </>
  );
}
