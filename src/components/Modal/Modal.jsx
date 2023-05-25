import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalStyle } from './Modal.styled';

const Modal = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalStyle.Overlay onClick={handleOverlayClick}>
      <ModalStyle.Modal>
        <img src={imageUrl} alt="" />
      </ModalStyle.Modal>
    </ModalStyle.Overlay>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

