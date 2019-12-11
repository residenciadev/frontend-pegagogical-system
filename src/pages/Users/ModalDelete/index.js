import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import { ModalContainer } from '../styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useModalStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  select: {
    width: '100%',
    color: '#000',
    backgroundColor: '#000',
  },
}));

export default function ModalRemove({
  handleModalRemove,
  modalRemove,
  modalName,
  handleDelete,
}) {
  const [modalStyle] = useState(getModalStyle);
  const classes = useModalStyles();
  return (
    <>
      {/* MODAL - EXCLuir PASTA */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalRemove}
        onClose={handleModalRemove}
      >
        <ModalContainer style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">
            Deseja remover esse usuário -{' '}
            <span>
              <strong>{modalName}</strong>
            </span>{' '}
            ?
          </h2>
          <div>
            <p>
              Tem certeza que deseja remover - <strong>{modalName}</strong>
            </p>
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
    </>
  );
}

ModalRemove.propTypes = {
  handleModalRemove: PropTypes.func.isRequired,
  modalRemove: PropTypes.bool.isRequired,
  modalName: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
