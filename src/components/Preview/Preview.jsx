import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const defaultState = {
  transform: 'translateX(0)',
  transitionDuration: 0,
}
class Preview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imagePos: null,
      ...defaultState,
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
    this.handleImageNotChanged = this.handleImageNotChanged.bind(this);
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
        transitionDuration: this.props.transitionDuration,
        transform: `translateX(100%)`,
      });
      setTimeout(() => {
        this.setState({
          isPrevImageExist,
          imagePos: this.state.imagePos - 1,
          isNextImageExist: true,
          ...defaultState,
        });
      }, this.props.transitionDuration);
    } else {
      this.handleImageNotChanged();
    }
  }

  handleNextImage() {
    if (this.props.images[this.state.imagePos + 1]) {
      const isNextImageExist = !!this.props.images[this.state.imagePos + 2];
      this.setState({
        transitionDuration: this.props.transitionDuration,
        transform: `translateX(-100%)`,
      });
      setTimeout(() => {
        this.setState({
          isPrevImageExist: true,
          imagePos: this.state.imagePos + 1,
          isNextImageExist,
          ...defaultState
        });
      }, this.props.transitionDuration);
    } else {
      this.handleImageNotChanged();
    }
  }

  handleImageNotChanged() {
    this.setState({
      transitionDuration: this.props.transitionDuration,
      transform: `translateX(0)`,
    });
    setTimeout(() => {
      this.setState({
        transitionDuration: 0,
      });
    }, this.props.transitionDuration);
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
      this.setState({
        transform: `translateX(${translatePosition}px)`,
      });
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
    if (this.lastTouch) {
      this.touchIsVertical = false;
      const shouldImageBeChanged = Math.abs(this.firstTouch.clientX - this.lastTouch.clientX) > 100;
      if (shouldImageBeChanged) {
        if (this.firstTouch.clientX < this.lastTouch.clientX) {
          this.handlePrevImage();
        } else {
          this.handleNextImage();
        }
      } else {
        this.handleImageNotChanged();
      }
    }
    this.lastTouch = null;
  }

  createTrackRef(track) {
    this.track = track;
  }

  render() {
    const currentImage = this.state.imagePos !== null ? this.props.images[this.state.imagePos] : null;
    const { isPrevImageExist, isNextImageExist, transform, transitionDuration } = this.state;
    const trackStyle = { transitionDuration: `${transitionDuration}ms`, transform };
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
          style={trackStyle}
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

Preview.defaultProps = {
  transitionDuration: 200,
};

Preview.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentId: PropTypes.number,
  transitionDuration: PropTypes.number,
};

export default Preview;
