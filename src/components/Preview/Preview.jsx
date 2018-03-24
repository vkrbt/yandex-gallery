import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Preview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imagePos: null,
    };
    const imagePos = props.images.findIndex(image => props.currentId === image.id);
    const isPrevImageExist = !!this.props.images[imagePos - 1];
    const isNextImageExist = !!this.props.images[imagePos + 1];
    this.state = {
      isPrevImageExist,
      imagePos,
      isNextImageExist,
    };

    this.handlePrevImage = this.handlePrevImage.bind(this);
    this.handleNextImage = this.handleNextImage.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyUp);
  }

  componentWillReceiveProps(nextProps) {
    const imagePos = nextProps.images.findIndex(image => nextProps.currentId === image.id);
    const isPrevImageExist = !!this.props.images[imagePos - 1];
    const isNextImageExist = !!this.props.images[imagePos + 1];
    this.setState({
      isPrevImageExist,
      imagePos,
      isNextImageExist,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyUp);
  }

  handleKeyUp(e) {
    if (e.key === 'ArrowLeft') {
      this.handlePrevImage();
    }
    if (e.key === 'ArrowRight') {
      this.handleNextImage();
    }
  }

  handlePrevImage() {
    if (this.props.images[this.state.imagePos - 1]) {
      const isPrevImageExist = !!this.props.images[this.state.imagePos - 2];
      this.setState({
        isPrevImageExist,
        imagePos: this.state.imagePos - 1,
        isNextImageExist: true,
      });
    }
  }

  handleNextImage() {
    if (this.props.images[this.state.imagePos + 1]) {
      const isNextImageExist = !!this.props.images[this.state.imagePos + 2];
      this.setState({
        isPrevImageExist: true,
        imagePos: this.state.imagePos + 1,
        isNextImageExist,
      });
    }
  }

  render() {
    const currentImage = this.state.imagePos !== null ? this.props.images[this.state.imagePos] : null;
    const { isPrevImageExist, isNextImageExist } = this.state;
    return (
      <div className="preview">
        {isPrevImageExist ? (
          <button className="preview__control preview__control_prev" onClick={this.handlePrevImage} />
        ) : null}
        <div className="preview__track">
          {currentImage ? <img className="preview__image" src={currentImage.src} alt="" /> : null}
        </div>
        {isNextImageExist ? (
          <button className="preview__control preview__control_next" onClick={this.handleNextImage} />
        ) : null}
      </div>
    );
  }
}

Preview.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentId: PropTypes.number,
};

export default Preview;
