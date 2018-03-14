import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Preview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imagePos: null,
    };
    const imagePos = props.images.findIndex(image => props.currentId === image.id);
    this.state = {
      imagePos,
    };
  }
  componentWillReceiveProps(nextProps) {
    const imagePos = nextProps.images.findIndex(image => nextProps.currentId === image.id);
    this.setState({
      imagePos,
    });
  }
  render() {
    const currentImage = this.state.imagePos !== null ? this.props.images[this.state.imagePos] : null;
    return (
      <div className="preview">
        {currentImage ? <img className="preview__image" src={currentImage.src} alt="" /> : null}
      </div>
    );
  }
}

Preview.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentId: PropTypes.number,
};

export default Preview;
