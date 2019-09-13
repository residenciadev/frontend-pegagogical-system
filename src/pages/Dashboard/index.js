import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Components MD
import Folder from '@material-ui/icons/Folder';
import Button from '@material-ui/core/Button';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { toast } from 'react-toastify';
import api from '../../services/api';
import {
  getCategoryRequest,
  createCategoryRequest,
} from '../../store/modules/category/actions';

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

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [modalRemove, setModalRemove] = useState(false);
  const [modalRenomear, setModalRenomear] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const dispatch = useDispatch();
  const data = useSelector(state => state.category.data);
  const loading = useSelector(state => state.auth.loading);
  const [active, setActive] = useState();
  const [modalName, setModalName] = useState('');

  const [values, setValues] = useState({
    category: '',
  });

  const handleOpenClose = () => {
    setOpen(!open);
    setValues({ category: '' });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { category } = values;
    dispatch(createCategoryRequest(category));
    handleOpenClose();
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleRightClick(e, id, name) {
    e.preventDefault();
    setActive(id);
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
    const id = active;
    const { renomear } = values;
    try {
      await api.put(`/category/${id}`, {
        name: renomear,
      });
      toast.success('Pasta renomeada com sucesso!');
      handleModalRenomear();
      setActive();
      dispatch(getCategoryRequest());
    } catch (error) {
      toast.error('Não foi possivel renomear a pasta!');
    }
  }

  async function handleDelete() {
    const id = active;

    try {
      await api.delete(`/category/${id}`);
      toast.success('Pasta Removida com sucesso!');
      handleModalRemove();
      dispatch(getCategoryRequest());
    } catch (error) {
      toast.error('Não foi possivel remover a pasta!');
    }
  }

  useEffect(() => {
    if (!loading) {
      dispatch(getCategoryRequest());
    }
  }, [dispatch, loading]);

  return (
    <>
      <Container>
        <h1>Cursos</h1>
        <div>
          <ButtonFolder
            color="primary"
            aria-label="add"
            variant="outlined"
            onClick={handleOpenClose}
          >
            <CreateNewFolder />
            Nova pasta
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
                Renomear pasta
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
          <h2 id="simple-modal-title">Nova pasta</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-bare"
              fullWidth
              placeholder="Nome da pasta"
              margin="normal"
              variant="outlined"
              inputProps={{ 'aria-label': 'bare' }}
              value={values.category}
              onChange={handleChange('category')}
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
          <h2 id="simple-modal-title">Renomear pasta</h2>

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
      {/* MODAL - EXCLUIR PASTA */}
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
            <p>Todos os qrcode serão apagados juntos!</p>
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
          data.map(category => (
            <Link
              key={category.id}
              to={`/subpasta/${category.id}/${category.name}`}
            >
              <Button
                variant="outlined"
                color={active === category.id ? 'primary' : 'default'}
                className={`${active === category.id && 'btn-active'}`}
                onContextMenu={e =>
                  handleRightClick(e, category.id, category.name)
                }
              >
                <Folder />
                {category.name}
              </Button>
            </Link>
          ))}
      </Wrapper>
    </>
  );
}
