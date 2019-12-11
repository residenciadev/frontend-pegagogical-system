import styled from 'styled-components';

export const Container = styled.div`
  display: ${props => (props.isTeacher ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  /* margin: 20px 10px; */
  button {
    margin: 0px 8px;
    svg {
      margin-right: 10px;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    button {
      margin: 10px 8px 10px 0px;

      svg {
        margin-right: 10px;
      }
    }
  }
`;

export const ModalContainer = styled.div`
  position: absolute;
  width: 560px;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 24px;
  height: 194px;
  h2 {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    button {
      margin: 10px 0px 10px 10px;
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

export const Wrapper = styled.div`
  /* display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex: 1;

  /* button {
    width: 200px;
    min-width: 224px;
    margin: 10px;
    height: 48px;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-color: '#e0e0e0';

    svg {
      margin-right: 10px;
      color: #8f8f8f;
    }
    span {
      text-transform: initial;
      color: black;
    } */
  }

  /* .btn-active {
    background-color: rgba(63, 81, 181, 0.08);
    color: #fff;
  } */
/* 
  @media (max-width: 768px) {
    justify-content: flex-start;
    align-items: stretch;

    margin: 0 auto;
    button {
      margin: 10px 8px;
    }
  } */ 
`;
