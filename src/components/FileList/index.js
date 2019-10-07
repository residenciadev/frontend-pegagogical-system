import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import { Container, FileInfo, Preview } from './styles';
import DefaultImg from '../../assets/default.jpeg';

function changeUrlPreview(url) {
  if (url.search(/(png|jpeg|jpg)/) === -1) {
    return DefaultImg;
  }
  return url;
}

const FileList = ({ files, onDelete }) => (
  <Container>
    {files.map(uploadedFile => (
      <li key={uploadedFile.id}>
        <FileInfo>
          <Preview src={changeUrlPreview(uploadedFile.preview)} />
          <div>
            <strong>{uploadedFile.name}</strong>
            <span>
              {uploadedFile.readableSize}{' '}
              {!!uploadedFile.url && (
                <button type="button" onClick={() => onDelete(uploadedFile.id)}>
                  Excluir
                </button>
              )}
            </span>
          </div>
        </FileInfo>
        <div>
          {!uploadedFile.uploaded && !uploadedFile.error && (
            <CircularProgressbar
              styles={{
                root: { width: 24 },
                path: { stroke: '#7159c1' },
              }}
              strokeWidth={10}
              percentage={uploadedFile.progress}
            />
          )}
          {uploadedFile.url && (
            <a
              href={uploadedFile.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
          )}
          {uploadedFile.uploaded && uploadedFile.id && (
            <MdCheckCircle size={24} color="#78e5d5" />
          )}
          {!uploadedFile.id && <span>Falhou verifique sua internet</span>}
          {!uploadedFile.id && <MdError size={24} color="#e57878" />}
          {uploadedFile.error && <MdError size={24} color="#e57878" />}
        </div>
      </li>
    ))}
  </Container>
);

FileList.propTypes = {
  files: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FileList;
