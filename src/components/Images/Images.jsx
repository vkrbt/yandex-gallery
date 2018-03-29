import React from 'react';
import PropTypes from 'prop-types';
import ImageTile from '../ImageTile/ImageTile';

const Images = props => (
  <div className="images">{props.images.map(image => <ImageTile key={image.id} image={image} {...props} />)}</div>
);

Images.propTypes = {
  images: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Images;
