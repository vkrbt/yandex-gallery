import { connect } from 'react-redux';
import { Gallery } from './Gallery';
import { getNextPhotos } from './redux/action';

const mapStateToProps = state => ({
  images: state.images,
});

const mapDispatchToProps = {
  getNextPhotos,
};

export const GalleryContainer = connect(mapStateToProps, mapDispatchToProps)(Gallery);
