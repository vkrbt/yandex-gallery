import React from 'react';
import PropTypes from 'prop-types';
import { ImageTile } from '../ImageTile/ImageTile';

export const ImagesList = props => (
  <div className="images">{props.images.map(image => <ImageTile key={image.id} image={image} {...props} />)}</div>
);

ImagesList.propTypes = {
  images: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
