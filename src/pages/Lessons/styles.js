import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 1520px;

  .content-form {
    display: flex;
    margin: 20px 10px 10px 10px;
    min-height: 200px;

    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    div {
      margin-right: 20px;
    }
  }
  .content-text {
    max-width: 400px;
    text-align: justify;
  }
`;
