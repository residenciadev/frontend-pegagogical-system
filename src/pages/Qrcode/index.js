import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import useReactRouter from 'use-react-router';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import { toast } from 'react-toastify';
import QRCode from 'qrcode.react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import api from '../../services/api';
import ImgDropAndCrop from '../../components/ImgDropCrop';
import FileList from '../../components/FileList';
import Table from './TableQrcode';
import { getQrcodeRequest } from '../../store/modules/qrcode/actions';

import QrcodeImg from '../../assets/qrcode.svg';

import {
  Container,
  Wrapper,
  ButtonFolder,
  ModalContainer,
  ButtonCreate,
  ModalContent,
} from './styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
export default function Qrcode() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const { match } = useReactRouter();
  const data = useSelector(state => state.qrcode.data);

  const [values, setValues] = useState({
    name: '',
    link: '',
  });
  const [state, setState] = useState({
    dropbox: true,
    linkexterno: false,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  function updateFile(id, value, d) {
    const newUp = [{ ...value, ...d }];

    setUploadedFiles(newUp);
  }

  function processUpload(file) {
    const formdata = new FormData();

    formdata.append('file', file[0].file, file[0].name);

    api
      .post('dropbox', formdata, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total), 10);

          updateFile(file[0].id, file[0], {
            progress,
          });
        },
      })
      .then(response => {
        updateFile(file[0].id, file[0], {
          uploaded: true,
          id: response.data.id,
          url: response.data.url,
        });
        setValues({ ...values, link: response.data.url });
      })
      .catch(response => {
        updateFile(file[0].id, file[0], {
          error: true,
        });
        console.log(response);
      });
  }

  function handleUpload(files) {
    const uploaded = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setUploadedFiles(uploaded);
    processUpload(uploaded);
  }

  const handleDeleteFileDownload = async id => {
    await api.delete(`dropbox/${id}`);
    setUploadedFiles([]);
  };

  const handleOpenClose = () => {
    setOpen(!open);
    setValues({ name: '', link: '' });
    setUploadedFiles([]);
  };

  const downloadQR = filename => {
    const canvas = document.getElementById('qrcode');

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${filename}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, link } = values;
    const { id } = match.params;

    let dbxid;
    if (uploadedFiles[0]) {
      dbxid = uploadedFiles[0].id;
    }
    try {
      await api.post('/qrcode', {
        subcategory_id: match.params.id,
        name,
        link,
        dropbox_id: dbxid,
      });

      dispatch(getQrcodeRequest(id));
      toast.success('QRcode criado com sucesso!');
      downloadQR(name);
    } catch (error) {
      toast.error('Não foi possível criar o QRcode!');
    }
    handleOpenClose();
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleChangeCheckbox = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  useEffect(() => {
    const { id } = match.params;
    dispatch(getQrcodeRequest(id));
  }, [match.params, dispatch]);

  return (
    <>
      <Container>
        <h1>{match.params.title}</h1>
        <div>
          <ButtonFolder
            color="primary"
            aria-label="add"
            variant="outlined"
            onClick={handleOpenClose}
          >
            <img src={QrcodeImg} alt="qrcode" />
            Criar QRcode
          </ButtonFolder>
        </div>
      </Container>
      {/* MODAL - CRIAR PASTA */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleOpenClose}
      >
        <ModalContainer style={modalStyle}>
          <h2 id="simple-modal-title">Criar Qrcode</h2>
          <ModalContent>
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-bare"
                fullWidth
                placeholder="Nome do qrcode"
                margin="normal"
                variant="outlined"
                inputProps={{ 'aria-label': 'bare' }}
                value={values.name}
                onChange={handleChange('name')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.dropbox}
                    onChange={handleChangeCheckbox('dropbox')}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Dropbox"
              />
              {!state.dropbox && (
                <TextField
                  id="outlined-bare"
                  fullWidth
                  placeholder="Link externo"
                  margin="normal"
                  variant="outlined"
                  inputProps={{ 'aria-label': 'bare' }}
                  value={values.link}
                  onChange={handleChange('link')}
                />
              )}
              {!!uploadedFiles.length < 1 && state.dropbox && (
                <ImgDropAndCrop
                  onUpload={e => handleUpload(e)}
                  message="Arraste ou clique aqui para o upload do arquivo "
                  backgroundColor="download"
                  accept="application/*, image/*, pdf/*"
                />
              )}

              {!!uploadedFiles.length && state.dropbox && (
                <FileList
                  files={uploadedFiles}
                  onDelete={handleDeleteFileDownload}
                />
              )}

              <div>
                <ButtonCreate variant="contained" color="primary" type="submit">
                  CRIAR
                </ButtonCreate>
                <Button
                  variant="outlined"
                  color="default"
                  onClick={handleOpenClose}
                  type="button"
                >
                  Cancelar
                </Button>
              </div>
            </form>
            <div>
              <div>
                <QRCode
                  id="qrcode"
                  value={values.link}
                  size={170}
                  level="H"
                  includeMargin
                />
              </div>
            </div>
          </ModalContent>
        </ModalContainer>
      </Modal>
      <Wrapper>
        <Table data={data} />
      </Wrapper>
    </>
  );
}
