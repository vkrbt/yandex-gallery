import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '../Spinner/Spinner';

export class Img extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.loadImage = this.loadImage.bind(this);
  }

  componentDidMount() {
    this.loadImage(this.props.src);
  }

  loadImage(src) {
    this.setState({ isLoaded: false });
    this.image = new Image();
    this.image.addEventListener('load', this.handleImageLoaded);
    this.image.addEventListener('error', this.props.onImageError);
    this.image.src = src;
  }

  handleImageLoaded() {
    this.setState({
      isLoaded: true,
    });
  }

  render() {
    return this.state.isLoaded ? (
      <img className={this.props.className} src={this.image.src} alt={this.props.alt} />
    ) : (
      <Spinner loading={!this.state.isLoaded} text="Retry" action={this.loadImage} />
    );
  }
}

Img.defaultProps = {
  alt: '',
};

Img.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onImageError: PropTypes.func,
};
