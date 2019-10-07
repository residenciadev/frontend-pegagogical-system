import styled, { css } from 'styled-components';

const dragActive = css`
  border-color: #78e5d5;
`;
const dragReject = css`
  border-color: #e57878;
`;

const backgroundColor = {
  default: '#F4F4F4',
  download: 'aliceblue',
  thumbnail: 'ghostwhite',
};

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease;
  margin: auto;
  display: flex;
  height: 115px;
  width: 100%;
  background-color: ${props =>
    backgroundColor[props.backgroundColor || 'default']};
  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const messageColors = {
  default: '#000',
  error: '#e57878',
  success: '#78e5d5',
};

export const UploadMessage = styled.p`
  width: 100%;
  color: ${props => messageColors[props.type || 'default']};
  margin-bottom: 0;
  text-align: center;
`;
