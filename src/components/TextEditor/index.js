import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import { Delta } from 'quill';

export default function Question({ handleChange, value, setValue }) {
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
      ['link'],
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
  ];

  // function onChange(content, delta, source, editor) {
  //   const text = editor.getText(content);
  //   // this.setState({ content: text });
  //   setValue(text);
  // }
  return (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        defaultValue={value}
        onChange={(e, type) => handleChange(e, type)}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

// Question.propTypes = {
//   handleChange: PropTypes.func,
// };

// Question.defaultProps = {
//   handleChange: () => {},
// };
