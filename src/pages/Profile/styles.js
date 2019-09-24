import styled from 'styled-components';
import { styled as materialStyle } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const Container = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 100%;

    hr {
      border: 0;
      height: 1px;
      margin-bottom: 10px;
      background: rgba(0, 0, 0, 0.8);
    }

    input {
      background: rgba(0, 0, 0, 0.8);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 16px;
      color: #fff;
      margin: 0 0 10px;
      width: 100%;

      &::placeholder {
        color: #fff;
      }
    }
  }
`;

export const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: theme.palette.primary,
    color: '#FFF',
  },
  input: {
    display: 'none',
  },
}));
