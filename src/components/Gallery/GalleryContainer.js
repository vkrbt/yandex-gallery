import { connect } from 'react-redux';
import Gallery from './Gallery';
import { getNextPhotos } from './redux/action'

const mapStateToProps = (state) => ({
  images: state.images,
});

const mapDispatchToProps = {
  getNextPhotos
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
