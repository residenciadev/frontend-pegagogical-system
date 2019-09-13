import React from 'react';

import { Form, Input } from '@rocketseat/unform';

import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

import * as Yup from 'yup';
import { resetPasswordRequest } from '../../store/modules/auth/actions';
import useReactRouter from 'use-react-router';

const schema = Yup.object().shape({
  password: Yup.string().required('A senha é obrigatória'),
});

export default function ResetPassword() {
  const { location } = useReactRouter();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ password }) {
    const token = location.search;

    dispatch(resetPasswordRequest(token, password));
  }

  return (
    <>
      <h1>Resetar senha</h1>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="password" name="password" label="Nova Senha" />
        <Button color="primary" variant="contained" type="submit">
          {loading ? 'Carregando...' : 'Resetar senha'}
        </Button>
      </Form>
    </>
  );
}
