import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import Preview from '../Preview/Preview';

class Gallery extends PureComponent {
  constructor() {
    super();
    this.state = {
      currentImageId: null,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.createModalRef = this.createModalRef.bind(this);
  }

  handleOpenModal = image => () => {
    this.setState({ currentImageId: image.id }, this.modal.handleOpen);
  };

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
            onClick={this.handleOpenModal(image)}
            onKeyPress={this.handleOpenModal(image)}
          >
            <img className="image-tile__image" src={image.src} alt="" />
          </div>
        ))}
        <Modal ref={this.createModalRef}>
          <Preview images={this.props.images} currentId={this.state.currentImageId} />
        </Modal>
      </div>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Gallery;
