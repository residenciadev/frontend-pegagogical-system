import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';

import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

import * as Yup from 'yup';

import { forgotPasswordRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email }) {
    dispatch(forgotPasswordRequest(email));
  }

  return (
    <>
      <h1>Recuperar senha</h1>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="email" name="email" label="E-mail" className="email" />
        <Button color="primary" variant="contained" type="submit">
          {loading ? 'Carregando...' : 'Solicitar Recuperação de senha'}
        </Button>
      </Form>
      <Link to="/">Voltar</Link>
    </>
  );
}
