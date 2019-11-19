import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;

  hr {
    border: 0;
    height: 1px;
    margin-bottom: 10px;
    background: rgba(0, 0, 0, 0.1);
  }

  h1 {
    align-self: center;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 24px;

    display: flex;
    align-items: center;
    letter-spacing: 0.15px;
    margin-top: 32px;

    margin-bottom: 24px;
  }
`;

export const ListNotification = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  a {
    color: rgba(0, 0, 0, 0.1);
  }
  li {
    display: flex;
    padding: 16px 8px;
    width: 100%;
    justify-content: space-between;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    background-color: #ededed;
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }
    small {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 24px;
    }
    :hover {
      background-color: #e0e0e0;
    }
  }
  .read {
    background-color: #fff;
    :hover {
      background-color: #fafafa;
    }
  }
`;
