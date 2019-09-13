import styled from 'styled-components';
import Background from '../../../assets/background.jpg';

export const Wrapper = styled.div`
  height: 100%;
  /* background-color: #2196f3; */
  background: url(${Background}) no-repeat;
  background-size: cover;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 437px;
  text-align: center;
  background: #fff;
  padding: 32px;
  border-radius: 4px;
  h1 {
    margin-top: 32px;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    label {
      text-align: left;
      font-size: 12px;
      line-height: 12px;
      color: rgba(0, 0, 0, 0.54);
    }
    input {
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.36);
      padding-top: 5px;
    }
    span {
      color: #f54c75;
      align-self: flex-start;
      font-size: 10px;
      margin-bottom: 5px;
      font-weight: bold;
    }
    button {
      margin: 24px 0;
      background-color: #2196f3;
      span {
        color: #fff;
        font-size: 12px;
        align-self: center;
        margin-bottom: 0px;
        font-weight: normal;
      }

      &:hover {
        background-color: #2199f9;
      }
    }
  }
  .forgotten-password {
    text-decoration: none;
    color: black;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
  .email {
    margin-bottom: 24px;
  }
  .token {
    mari
  }

  @media (max-width: 425px) {
    height: 100%;
  }
`;
