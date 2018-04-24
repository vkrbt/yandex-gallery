import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '../Spinner/Spinner';

export class Img extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
    };

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleImageError = this.handleImageError.bind(this);
    this.loadImage = this.loadImage.bind(this);
  }

  componentDidMount() {
    this.loadImage(this.props.src);
  }

  loadImage(src) {
    this.setState({ isLoaded: false });
    this.image = new Image();
    this.image.addEventListener('load', this.handleImageLoaded);
    this.image.addEventListener('error', this.handleImageError);
    this.image.src = src;
  }

  handleImageLoaded() {
    this.setState({
      isLoaded: true,
    });
  }

  handleImageError(error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return null;
    }
    return this.state.isLoaded ? (
      <img className={this.props.className} src={this.image.src} alt={this.props.alt} />
    ) : (
      <Spinner loading={!this.state.isLoaded} text="Retry" action={this.loadImage} />
    );
  }
}

Img.defaultProps = {
  alt: '',
  className: '',
};

Img.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  alt: PropTypes.string,
};
