import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import CloseIcon from '@material-ui/icons/Close';
import { Container, MdModal } from './styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Modal({ open, handleClose, children, title }) {
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <Container>
      <MdModal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className="paper">
          <div className="content-title">
            <h1>{title}</h1>
            <Icon className="icon-close" onClick={handleClose}>
              <CloseIcon />
            </Icon>
          </div>

          <hr />
          {children}
        </div>
      </MdModal>
    </Container>
  );
}

Modal.defaultProps = {
  handleClose: () => {},
  title: '',
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};
