import React from 'react';
import PropTypes from 'prop-types';

export const Img = (props) => <img className={props.className} src={props.src} alt={props.alt} />;

Img.defaultProps = {
  alt: '',
};

Img.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  alt: PropTypes.string,
};
