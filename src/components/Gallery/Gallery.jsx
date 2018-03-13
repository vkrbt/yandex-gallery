import React from 'react';
import PropTypes from 'prop-types';

const Gallery = ({ images }) => (
  <div className="gallery">
    {images.map(image => (
      <div key={image.id} className="image-tile">
        <img className="image-tile__image" src={image.src} alt="" />
      </div>
    ))}
  </div>
);

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      src: PropTypes.string,
    }),
  ).isRequired,
};

export default Gallery;
