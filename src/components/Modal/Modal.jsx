import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalStyle } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl } = this.props;

    return (
      <ModalStyle.Overlay onClick={this.handleOverlayClick}>
        <ModalStyle.Modal>
          <img src={imageUrl} alt="" />
        </ModalStyle.Modal>
      </ModalStyle.Overlay>
    );
  }
}

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
