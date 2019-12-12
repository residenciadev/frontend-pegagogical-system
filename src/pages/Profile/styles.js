import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

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
      background: rgba(0, 0, 0, 0.1);
    }
    h1,
    h2 {
      margin: 16px 0;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 24px;

      display: flex;
      align-items: center;
      letter-spacing: 0.15px;
    }

    input {
      background: #f8f8f8;
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 16px;
      color: rgba(0, 0, 0, 0.8);
      margin: 0 0 10px;
      width: 100%;

      &::placeholder {
        color: rgba(0, 0, 0, 0.8);
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
    height: '38px',
  },
  input: {
    display: 'none',
  },
}));
