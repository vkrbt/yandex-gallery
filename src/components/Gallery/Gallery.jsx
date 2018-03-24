import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import Preview from '../Preview/Preview';
import ImageTile from '../ImageTile/ImageTile';

class Gallery extends PureComponent {
  constructor() {
    super();
    this.state = {
      currentImageId: null,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.createModalRef = this.createModalRef.bind(this);
  }

  handleOpenModal(image) {
    this.setState({ currentImageId: image.id }, this.modal.handleOpen);
  };

  createModalRef(modal) {
    this.modal = modal;
  }

  render() {
    return (
      <div className="gallery">
        {this.props.images.map(image => (
          <ImageTile key={image.id} image={image} handleSelect={this.handleOpenModal} />
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
