import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

export default class ImgDropAndCrop extends Component {
  renderDragMessage = (isDragActive, isDragReject) => {
    const { message } = this.props;
    if (!isDragActive) {
      return <UploadMessage>{message}</UploadMessage>;
    }
    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }
    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>;
  };

  render() {
    const { onUpload, backgroundColor, accept } = this.props;
    return (
      <Dropzone accept={accept} onDropAccepted={onUpload} multiple={false}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
            backgroundColor={backgroundColor}
          >
            <input {...getInputProps()} />
            {this.renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    );
  }
}

ImgDropAndCrop.propTypes = {
  message: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  onUpload: PropTypes.func.isRequired,
  accept: PropTypes.string,
};

ImgDropAndCrop.defaultProps = {
  accept: 'image/*',
  backgroundColor: '#999',
};
