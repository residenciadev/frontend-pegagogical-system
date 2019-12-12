/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Skeleton from '@material-ui/lab/Skeleton';
import api from '../../../services/api';
import correctUrl from '../../../utils/correctUrl';

import { Container } from './styles';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('dropbox');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'dropbox_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, []);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);
    setLoading(true);
    const response = await api.post('dropbox', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
    setLoading(false);
  }
  return (
    <Container>
      <label htmlFor="dropbox">
        {loading && <Skeleton variant="circle" width={150} height={150} />}
        {preview && !loading && (
          <Avatar className="avatarImg" src={correctUrl(preview)} />
        )}
        {!preview && !loading && (
          <Avatar className="avatarImg">
            <AccountCircle className="avatarImg" />
          </Avatar>
        )}
        <input
          type="file"
          id="dropbox"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
