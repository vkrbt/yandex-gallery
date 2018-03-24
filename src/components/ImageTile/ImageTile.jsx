import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ImageTile extends PureComponent {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
    };

    this.image = null;

    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.image = new Image();
    this.image.addEventListener('load', this.handleImageLoad);
    this.image.src = this.props.image.src;
  }

  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleImageLoad);
  }

  handleImageLoad() {
    this.setState({
      isLoaded: true,
    });
  }

  handleSelect() {
    this.props.handleSelect(this.props.image);
  }

  render() {
    return this.state.isLoaded ? (
      <div role="button" tabIndex="0" className="image-tile" onClick={this.handleSelect} onKeyPress={this.handleSelect}>
        <img className="image-tile__image" src={this.image.src} alt="" />
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
