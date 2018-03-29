import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ImageTile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isError: false,
    };

    this.image = null;

    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.handleImageError = this.handleImageError.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.image = new Image();
    this.image.addEventListener('load', this.handleImageLoad);
    this.image.addEventListener('error', this.handleImageError);
    this.image.src = this.props.image.urls.small;
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
        className="image-tile"
        style={{ backgroundColor: this.props.image.color ,flexBasis: this.state.width, height: this.props.tileHeight }}
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

ImageTile.defaultProps = {
  tileHeight: 200,
};

ImageTile.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
      regular: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleSelect: PropTypes.func.isRequired,
  tileHeight: PropTypes.number,
};

export default ImageTile;
