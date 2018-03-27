import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ImageTile extends PureComponent {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      isError: false,
    };

    this.image = null;

    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.handleImageError = this.handleImageError.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.image = new Image();
    this.image.addEventListener('load', this.handleImageLoad);
    this.image.addEventListener('error', this.handleImageError);
    this.image.src = this.props.image.src;
  }

  handleImageLoad() {
    this.setState({
      isLoaded: true,
    });
  }

  handleImageError() {
    this.setState({
      isError: true,
    });
  }

  handleSelect() {
    this.props.handleSelect(this.props.image);
  }

  render() {
    const { isError, isLoaded } = this.state;
    return !isError ? (
      <div
        role="button"
        tabIndex="0"
        className={`image-tile${isLoaded ? ' image-tile_loaded' : ''}`}
        onClick={this.handleSelect}
        onKeyPress={this.handleSelect}
      >
        {
          isLoaded ? <img className="image-tile__image" src={this.image.src} alt="" /> : null
        }
      </div>
    ) : null;
  }
}

ImageTile.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default ImageTile;
