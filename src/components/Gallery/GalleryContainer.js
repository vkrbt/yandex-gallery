import { connect } from 'react-redux';
import Gallery from './Gallery';
import { getPhotosList } from './redux/action'

const mapStateToProps = (state) => ({
  images: state.images,
});

const mapDispatchToProps = {
  getPhotosList
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
