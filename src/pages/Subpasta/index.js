import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';

import Folder from '@material-ui/icons/Folder';
import Button from '@material-ui/core/Button';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

import { toast } from 'react-toastify';
import api from '../../services/api';

import {
  getSubcategoryRequest,
  createSubcategoryRequest,
} from '../../store/modules/subcategory/actions';

import {
  Container,
  Wrapper,
  ButtonFolder,
  ModalContainer,
  ButtonCreate,
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

export default function Subpasta() {
  const dispatch = useDispatch();
  const [modalStyle] = useState(getModalStyle);
  const { match } = useReactRouter();
  const data = useSelector(state => state.subcategory.data);
  const loading = useSelector(state => state.subcategory.loading);
  const [active, setActive] = useState();
  const [modalName, setModalName] = useState('');
  const [modalRemove, setModalRemove] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalRenomear, setModalRenomear] = useState(false);

  const [values, setValues] = useState({
    subcategory: '',
  });

  const handleOpenClose = () => {
    setOpen(!open);
    setValues({ subcategory: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { subcategory } = values;
    dispatch(createSubcategoryRequest(subcategory, match.params.id));

    handleOpenClose();
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleRightClick(e, subcategory, name) {
    e.preventDefault();
    setActive(subcategory);
    setModalName(name);
    setValues({ renomear: name });
  }

  const handleModalRemove = () => {
    setModalRemove(!modalRemove);
  };

  const handleModalRenomear = () => {
    setModalRenomear(!modalRenomear);
  };

  async function handleRenomear(e) {
    e.preventDefault();
    const actived = active;
    const { id } = match.params;
    const { renomear } = values;
    try {
      await api.put(`/subcategory/${actived}`, {
        name: renomear,
      });
      toast.success('Pasta renomeada com sucesso!');
      handleModalRenomear();
      setActive();
      dispatch(getSubcategoryRequest(id));
    } catch (error) {
      toast.error('Não foi possivel renomear a pasta!');
    }
  }

  async function handleDelete() {
    const actived = active;
    const { id } = match.params;
    try {
      await api.delete(`/subcategory/${actived}`);
      toast.success('Subpasta Removida com sucesso!');
      handleModalRemove();
      dispatch(getSubcategoryRequest(id));
    } catch (error) {
      toast.error('Não foi possivel remover a subpasta!');
    }
  }

  useEffect(() => {
    const { id } = match.params;
    if (id) {
      dispatch(getSubcategoryRequest(id));
    }
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
            <CreateNewFolder />
            Nova subpasta
          </ButtonFolder>
          <Tooltip title="Selecione com o botão direito do mouse uma pasta para renomear">
            <span>
              <ButtonFolder
                color="primary"
                aria-label="add"
                variant="outlined"
                disabled={!active}
                onClick={handleModalRenomear}
              >
                <EditIcon />
                Renomear subpasta
              </ButtonFolder>
            </span>
          </Tooltip>
          <Tooltip title="Selecione com o botão direito do mouse uma pasta para remover">
            <span>
              <Button
                aria-label="delete"
                variant="outlined"
                disabled={!active}
                color="secondary"
                onClick={handleModalRemove}
              >
                <DeleteIcon />
                Excluir pasta
              </Button>
            </span>
          </Tooltip>
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
          <h2 id="simple-modal-title">Nova subpasta</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-bare"
              fullWidth
              placeholder="Nome da subpasta"
              margin="normal"
              variant="outlined"
              inputProps={{ 'aria-label': 'bare' }}
              value={values.subcategory}
              onChange={handleChange('subcategory')}
            />
            <div>
              <Button
                variant="outlined"
                color="default"
                onClick={handleOpenClose}
                type="button"
              >
                Cancelar
              </Button>
              <ButtonCreate variant="contained" color="primary" type="submit">
                CRIAR
              </ButtonCreate>
            </div>
          </form>
        </ModalContainer>
      </Modal>
      {/* MODAL - Renomear PASTA */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalRenomear}
        onClose={handleModalRenomear}
      >
        <ModalContainer style={modalStyle}>
          <h2 id="simple-modal-title">Renomear subpasta</h2>

          <TextField
            id="outlined-bare"
            fullWidth
            placeholder="Renomear"
            margin="normal"
            variant="outlined"
            inputProps={{ 'aria-label': 'bare' }}
            value={values.renomear}
            onChange={handleChange('renomear')}
          />
          <div>
            <Button
              variant="outlined"
              color="default"
              onClick={handleModalRenomear}
              type="button"
            >
              Cancelar
            </Button>
            <ButtonCreate
              variant="contained"
              color="primary"
              type="button"
              onClick={handleRenomear}
            >
              Salvar
            </ButtonCreate>
          </div>
        </ModalContainer>
      </Modal>
      {/* MODAL - EXCLuir PASTA */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalRemove}
        onClose={handleModalRemove}
      >
        <ModalContainer style={modalStyle}>
          <h2 id="simple-modal-title">
            Deseja remover essa subpasta -{' '}
            <span>
              <strong>{modalName}</strong>
            </span>{' '}
            ?
          </h2>
          <div>
            <p>Todos os qrcode serão apagados!</p>
          </div>
          <div className="btn-content">
            <Button
              variant="outlined"
              color="default"
              onClick={handleModalRemove}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={handleDelete}
            >
              Sim
            </Button>
          </div>
        </ModalContainer>
      </Modal>
      <Wrapper>
        {!loading &&
          data &&
          data.map(subcategory => (
            <Link
              key={subcategory.id}
              to={`/qrcode/${subcategory.id}/${subcategory.name}`}
            >
              <Button
                variant="outlined"
                color={active === subcategory.id ? 'primary' : 'default'}
                className={`${active === subcategory.id && 'btn-active'}`}
                onContextMenu={e =>
                  handleRightClick(e, subcategory.id, subcategory.name)
                }
              >
                <Folder />
                {subcategory.name}
              </Button>
            </Link>
          ))}
      </Wrapper>
    </>
  );
}
