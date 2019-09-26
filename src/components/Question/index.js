import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

// import { Container } from './styles';

export default function Question({ handleChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        onChange={(e, type) => handleChange(e, type)}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

Question.propTypes = {
  handleChange: PropTypes.func,
};

Question.defaultProps = {
  handleChange: () => {},
};
