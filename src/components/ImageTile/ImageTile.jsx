import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Img } from '../Img/Img';
import { calculateRatio, calculateWidth } from '../../helpers/image';

export class ImageTile extends PureComponent {
  constructor(props) {
    super(props);

    const imageRatio = calculateRatio(props.image.width, props.image.height);

    this.state = {
      isError: false,
      width: calculateWidth(props.tileHeight, imageRatio),
    };

    this.handleImageError = this.handleImageError.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleImageError() {
    this.setState({
      isError: true,
    });
  }

  handleSelect() {
    this.props.handleSelect(this.props.image);
  }

  render() {
    const { isError } = this.state;
    return !isError ? (
      <div
        role="button"
        tabIndex="0"
        className="image-tile"
        style={{ backgroundColor: this.props.image.color, flexBasis: this.state.width }}
        onClick={this.handleSelect}
        onKeyPress={this.handleSelect}
      >
        <Img className="image-tile__image" src={this.props.image.urls.small} onImageError={this.handleImageError} />
        <div />
      </div>
    ) : null;
  }
}

ImageTile.defaultProps = {
  tileHeight: 200,
};

ImageTile.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
      regular: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleSelect: PropTypes.func.isRequired,
  tileHeight: PropTypes.number,
};
