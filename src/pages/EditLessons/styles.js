import styled from 'styled-components';
// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  max-width: 1208px;
  box-sizing: border-box;
  margin: auto;
  margin-bottom: 24px;
  padding: 0 24px;

  .item {
    padding: 24px 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 24px;
    grid-auto-flow: row;
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
  }

  .box h2 {
    font-size: 20px;
  }

  .box p {
    font-size: 14px;
    margin-top: 16px;
    opacity: 0.6;
  }

  .box p:nth-child(3) {
    font-weight: 700;
  }

  .center-column {
    input {
      height: 56px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }
  }
  .divider {
    margin-top: 70px;
    margin-bottom: 10px;
    text-align: center;
  }

  .question-item {
    padding: 24px 0;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 24px;
    grid-auto-flow: row;
    border-bottom: 1px solid #e0e0e0;
    .title-question {
      margin-top: 10px;
      margin-bottom: 10px;
      &:first-child {
        margin-top: 0px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    .item {
      grid-template-columns: minmax(312px, 1fr);
    }
  }
`;
