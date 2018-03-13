import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';

class Gallery extends PureComponent {
  constructor() {
    super();
    this.state = {
      isModalOpened: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.createModalRef = this.createModalRef.bind(this);
  }

  handleOpenModal() {
    this.modal.handleOpen();
  }

  createModalRef(modal) {
    this.modal = modal;
  }
  render() {
    return (
      <div className="gallery">
        {this.props.images.map(image => (
          <div
            role="button"
            tabIndex="0"
            key={image.id}
            className="image-tile"
            onClick={this.handleOpenModal}
            onKeyPress={this.handleOpenModal}
          >
            <img className="image-tile__image" src={image.src} alt="" />
          </div>
        ))}
        <Modal ref={this.createModalRef} isOpen={this.state.isModalOpened}>123</Modal>
      </div>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      src: PropTypes.string,
    }),
  ).isRequired,
};

export default Gallery;
