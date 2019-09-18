import React, { Component } from 'react';
import ReactQuill from 'react-quill';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      editorHtml: '',
    };
  }

  modules = {
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

  formats = [
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

  handleChange(html) {
    this.setState({ editorHtml: html });
  }
  render() {
    return (
      <div className="text-editor">
        <ReactQuill
          theme="snow"
          onChange={e => this.handleChange(e)}
          modules={this.modules}
          formats={this.formats}
        ></ReactQuill>
      </div>
    );
  }
}

export default Questions;
