import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class Modal extends PureComponent {
  constructor() {
    super();
    this.state = {
      isOpened: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.createOverlayRef = this.createOverlayRef.bind(this);
    this.handleCloseWithAnimation = this.handleCloseWithAnimation.bind(this);
    this.handleEscKeypress = this.handleEscKeypress.bind(this);
    this.handleCloseKeyPress = this.handleCloseKeyPress.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKeypress);
  }

  handleOpen() {
    document.addEventListener('keydown', this.handleEscKeypress);
    this.setState({ isOpened: true });
  }

  handleClose() {
    document.removeEventListener('keydown', this.handleEscKeypress);
    this.setState({ isOpened: false });
  }

  handleEscKeypress(e) {
    if (e.key === 'Escape') {
      this.handleCloseWithAnimation();
    }
  }

  handleCloseKeyPress(e) {
    if (['Enter', ''].includes(e.key)) {
      this.handleCloseWithAnimation();
    }
  }

  handleCloseWithAnimation(e, direction = '') {
    this.overlay.style.transitionDuration = `${this.props.transitionDuration}ms`;
    this.overlay.style.transform = `translateY(${direction}100%)`;
    this.overlay.style.opacity = '0';
    setTimeout(this.handleClose, this.props.transitionDuration);
  }

  handleTouchStart(e) {
    this.swipeStartY = e.touches[0].clientY;
  }

  handleTouchMove(e) {
    const currentSwipePosY = e.touches[0].clientY;
    const swipeProgress = 1 - Math.abs(currentSwipePosY - this.swipeStartY) / this.overlay.clientHeight;

    this.overlay.style.transform = `translateY(${currentSwipePosY - this.swipeStartY}px)`;
    this.overlay.style.opacity = `${swipeProgress}`;
    [this.lastTouch] = e.touches;
  }

  handleTouchEnd(e) {
    if (!this.lastTouch) {
      return;
    }
    if (Math.abs(this.swipeStartY - this.lastTouch.clientY) > this.overlay.clientHeight / 4) {
      const scrollDirection = this.swipeStartY - this.lastTouch.clientY > 0 ? '-' : '';
      this.overlay.style.opacity = '0';
      this.handleCloseWithAnimation(e, scrollDirection);
    } else {
      this.overlay.style.opacity = '1';
      this.overlay.style.transitionDuration = `${this.props.transitionDuration}ms`;
      this.overlay.style.transform = 'translateY(0)';
      setTimeout(() => {
        this.overlay.style.transitionDuration = '0ms';
      }, this.props.transitionDuration);
    }
    this.lastTouch = null;
  }

  createOverlayRef(everlay) {
    this.overlay = everlay;
  }

  render() {
    if (!this.state.isOpened) {
      return null;
    }
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    return ReactDOM.createPortal(
      <div
        role="dialog"
        className="modal-overlay"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchEnd}
        ref={this.createOverlayRef}
      >
        {/* eslint-disable jsx-a11y/no-static-element-interactions */}
        <div
          onClick={this.handleCloseWithAnimation}
          onKeyPress={this.handleCloseKeyPress}
          className="modal-shadow"
        />
        {/* eslint-enable jsx-a11y/no-static-element-interactions */}
        <div
          tabIndex="0"
          role="button"
          onClick={this.handleCloseWithAnimation}
          onKeyPress={this.handleCloseKeyPress}
          className="cross"
        />
        <div className="modal-body" role="dialog">
          {this.props.children}
        </div>
      </div>,
      document.getElementById('root'),
    );
  }
}

Modal.defaultProps = {
  transitionDuration: 300,
};

Modal.propTypes = {
  transitionDuration: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default Modal;
