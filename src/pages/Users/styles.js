import styled from 'styled-components';
import { styled as materialStyle } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 10px;
  button {
    margin: 0px 8px;
    align-items: center;

    img {
      margin-right: 10px;
      text-align: center;
    }
  }
`;

export const ModalContainer = styled.div`
  position: absolute;
  align-self: center;
  width: 100%;
  max-width: 700px;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 24px;

  h2 {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    button {
      margin: 10px 0px 10px 10px;
    }
    &:first-child {
      margin-top: 10px;
    }
  }
  p {
    margin: 30px 0;
  }
  .btn-content {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
  }
  button {
    margin: 10px 0px 10px 10px;
  }
  @media (max-width: 425px) {
    width: 100%;
  }
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const ButtonFolder = materialStyle(Button)({
  color: '#2196f3',
  borderColor: '#2196f3',
  '&:hover': {
    borderColor: '#2196f3',
  },
});

export const ButtonCreate = materialStyle(Button)({
  color: '#fff',
  backgroundColor: '#2196f3',
  borderColor: '#2196f3',
  '&:hover': {
    borderColor: '#2196f3',
    backgroundColor: '#2199f9',
  },
});
