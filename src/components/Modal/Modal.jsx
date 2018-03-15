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
  }

  handleOpen() {
    this.setState({ isOpened: true });
  }

  handleClose() {
    this.setState({ isOpened: false });
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

  handleTouchEnd() {
    const transitionDuration = 300;
    if (!this.lastTouch) {
      return;
    }
    if (Math.abs(this.swipeStartY - this.lastTouch.clientY) > this.overlay.clientHeight / 4) {
      const scrollDirection = this.swipeStartY - this.lastTouch.clientY > 0 ? '-' : '';
      this.overlay.style.opacity = '0';
      this.overlay.style.transitionDuration = `${transitionDuration}ms`;
      this.overlay.style.transform = `translateY(${scrollDirection}100%)`;
      setTimeout(this.handleClose, transitionDuration);
    } else {
      this.overlay.style.opacity = '1';
      this.overlay.style.transitionDuration = `${transitionDuration}ms`;
      this.overlay.style.transform = 'translateY(0)';
      setTimeout(() => {
        this.overlay.style.transitionDuration = '0ms';
      }, transitionDuration);
    }
  }

  createOverlayRef(everlay) {
    this.overlay = everlay;
  }

  render() {
    if (!this.state.isOpened) {
      return null;
    }
    return ReactDOM.createPortal(
      <div
        className="modal-overlay"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        ref={this.createOverlayRef}
      >
        {/* eslint-disable jsx-a11y/no-static-element-interactions */}
        <div onClick={this.handleClose} onKeyPress={this.handleClose} className="modal-shadow" />
        {/* eslint-enable jsx-a11y/no-static-element-interactions */}
        <div tabIndex="0" role="button" onClick={this.handleClose} onKeyPress={this.handleClose} className="cross" />
        <div className="modal-body" role="dialog">
          {this.props.children}
        </div>
      </div>,
      document.getElementById('root'),
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
