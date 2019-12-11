import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';

export const Container = styled.div``;

export const MdModal = styled(Modal)`
  .paper {
    position: absolute;
    background-color: #fff;
    border: 1px solid #e5e9ed;
    box-sizing: border-box;
    border-radius: 4px;
  }
  hr {
    border: none;
    height: 1px;
    background: #e5e9ed;
    margin: 16px 0;
    width: 100%;
  }
  .content-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 16px 0 16px;
    h1 {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 25px;
      color: #000000;
    }
  }

  h2 {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    padding: 0 16px;
    color: #e5e9ed;
    span {
      color: #f44336;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    div.content-btn {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      padding: 0px 16px 16px 16px;
    }
    input {
      background: #fff;
      border: 1px solid #e5e9ed;
      box-sizing: border-box;
      border-radius: 4px;
      width: 289px;
      height: 38px;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      color: #000000;
      line-height: 18px;
      padding: 10px 8px;
      margin: 0px 16px;

      ::placeholder {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #e5e9ed;
      }
    }
  }
`;
