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
  }

  handleOpen() {
    this.setState({ isOpened: true });
  }

  handleClose() {
    this.setState({ isOpened: false });
  }

  render() {
    if (!this.state.isOpened) {
      return null;
    }
    return ReactDOM.createPortal(
      <div className="modal-overlay">
        <div
          tabIndex="0"
          role="button"
          onClick={this.handleClose}
          onKeyPress={this.handleClose}
          className="modal-shadow"
        />
        <div role="dialog">{this.props.children}</div>
      </div>,
      document.getElementById('root'),
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
