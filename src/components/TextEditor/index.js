import React from 'react';
import ReactQuill from 'react-quill';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  color: {
    color: [theme.palette.type === 'dark' ? '#FFF' : '#000'],
  },
}));

export default function Question({ handleChange, value }) {
  const classes = useStyles();
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

  return (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        className={classes.color}
        defaultValue={value}
        onChange={(e, type) => handleChange(e, type)}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
