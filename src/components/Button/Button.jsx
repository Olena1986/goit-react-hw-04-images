import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyle } from './Button.styled';

const Button = ({ onClick }) => {
  return <ButtonStyle.Loader onClick={onClick}>Load more</ButtonStyle.Loader>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
