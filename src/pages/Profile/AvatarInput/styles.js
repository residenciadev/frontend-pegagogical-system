import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  align-self: center;
  margin-bottom: 15px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
    .avatarImg {
      width: 150px;
      height: 150px;
      background-color: '#fafafa';

      &:hover {
        opacity: 0.5;
      }
    }
  }

  input {
    display: none;
  }
`;
