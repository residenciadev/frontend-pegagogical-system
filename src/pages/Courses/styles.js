import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const Container = styled.div`
  display: flex;
  width: 100%;

  .content-right {
    width: 50%;
    margin-left: 24px;
    border-left: 1px solid #e0e0e0;
  }
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const ContentSelect = styled.div`
  max-width: 500px;
  min-width: 500px;
  .content {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
  }
  .basic-single {
    width: 100%;
  }
`;

export const MdButton = styled(Button)`
  border-radius: 4px;
  height: 38px;

  &.MuiButton-contained {
    margin-right: 8px;
    box-shadow: none;

    &:hover {
      box-shadow: none;
    }
  }
  &.MuiButton-outlined {
    border: 1px solid '#2196f3';
    box-sizing: border-box;
    background: '#063057';
    border-radius: 4px;
    span {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      text-align: center;
      text-transform: uppercase;
      color: '#2196f3';
    }
    &:hover {
      background: '#063057';
    }
  }
`;
