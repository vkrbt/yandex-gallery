import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import { Preview } from '../Preview/Preview';
import { ImagesList } from '../ImagesList/ImagesList';
import { InfiniteScroll } from '../InfiniteScroll/InfiniteScroll';

export class Gallery extends PureComponent {
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
  }

  createModalRef(modal) {
    this.modal = modal;
  }

  render() {
    return (
      <React.Fragment>
        <InfiniteScroll getNext={this.props.getNextPhotos}>
          <ImagesList images={this.props.images.items} handleSelect={this.handleOpenModal} />
        </InfiniteScroll>
        <Modal ref={this.createModalRef}>
          <Preview
            getNext={this.props.getNextPhotos}
            images={this.props.images.items}
            currentId={this.state.currentImageId}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.shape({
    items: PropTypes.array.isRequired,
  }),
  getNextPhotos: PropTypes.func.isRequired,
};
