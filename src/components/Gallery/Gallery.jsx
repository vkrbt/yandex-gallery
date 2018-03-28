import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import Preview from '../Preview/Preview';
import Images from '../Images/Images';
import images from './images';

class Gallery extends PureComponent {
  constructor() {
    super();
    this.state = {
      currentImageId: null,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.createModalRef = this.createModalRef.bind(this);
  }

  componentDidMount() {
    this.props.getPhotosList();
  }

  handleOpenModal(image) {
    this.setState({ currentImageId: image.id }, this.modal.handleOpen);
  }

  createModalRef(modal) {
    this.modal = modal;
  }

  render() {
    return (
      <div className="gallery">
        <Images images={images} handleSelect={this.handleOpenModal} />
        <Modal ref={this.createModalRef}>
          <Preview images={images} currentId={this.state.currentImageId} />
        </Modal>
      </div>
    );
  }
}

Gallery.propTypes = {
  getPhotosList: PropTypes.func.isRequired,
};

export default Gallery;
