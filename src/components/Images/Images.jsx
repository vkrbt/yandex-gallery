import React from 'react';
import PropTypes from 'prop-types';
import ImageTile from '../ImageTile/ImageTile';

const Images = props => props.images.map(image => <ImageTile key={image.id} image={image} {...props} />);

Images.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Images;
