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
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.createTrackRef = this.createTrackRef.bind(this);
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

  handleTouchStart(e) {
    [this.firstTouch] = e.touches;
  }

  handleTouchMove(e) {
    const [currentTouch] = e.touches;
    this.lastTouch = currentTouch;
    if (this.touchIsVertical) {
      e.stopPropagation();
      e.preventDefault();
      const translatePosition = currentTouch.clientX - this.firstTouch.clientX;
      this.track.style.transform = `translateX(${translatePosition}px)`;
      return;
    }
    const horizontalDistance = Math.abs(currentTouch.clientX - this.firstTouch.clientX);
    const verticalDistance = Math.abs(currentTouch.clientY - this.firstTouch.clientY);
    if (verticalDistance < horizontalDistance) {
      e.stopPropagation();
      e.preventDefault();
      this.touchIsVertical = true;
    }
  }

  handleTouchEnd() {
    this.track.style.transform = `translateX(0)`;
    if (this.lastTouch) {
      this.touchIsVertical = false;
      if (this.lastTouch.clientX - this.firstTouch.clientX > 100) {
        this.handlePrevImage();
      }
      if (this.lastTouch.clientX - this.firstTouch.clientX < -100) {
        this.handleNextImage();
      }
    }
  }

  createTrackRef(track) {
    this.track = track;
  }

  render() {
    const currentImage = this.state.imagePos !== null ? this.props.images[this.state.imagePos] : null;
    const { isPrevImageExist, isNextImageExist } = this.state;
    return (
      <div className="preview">
        {isPrevImageExist ? (
          <button className="preview__control preview__control_prev" onClick={this.handlePrevImage} />
        ) : null}
        <div
          className="preview__track"
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={this.handleTouchEnd}
          ref={this.createTrackRef}
        >
          {isPrevImageExist ? (
            <div className="preview__image-wrapper_prev">
              <img className="preview__image_prev" src={this.props.images[this.state.imagePos - 1].src} alt="" />
            </div>
          ) : null}
          {currentImage ? <img className="preview__image" src={currentImage.src} alt="" /> : null}
          {isNextImageExist ? (
            <div className="preview__image-wrapper_next">
              <img className="preview__image_next" src={this.props.images[this.state.imagePos + 1].src} alt="" />
            </div>
          ) : null}
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
