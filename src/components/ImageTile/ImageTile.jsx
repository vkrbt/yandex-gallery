import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Img } from '../Img/Img';
import { calculateRatio, calculateWidth } from '../../helpers/image';
import { stopPropagation } from '../../helpers/events';

const applicationName = 'yandex-gallery';
export class ImageTile extends Component {
  constructor(props) {
    super(props);

    const imageRatio = calculateRatio(props.image.width, props.image.height);

    this.state = {
      width: calculateWidth(props.tileHeight, imageRatio),
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    this.props.handleSelect(this.props.image);
  }

  render() {
    return (
      <div
        role="button"
        tabIndex="0"
        className="image-tile"
        style={{ backgroundColor: this.props.image.color, flexBasis: `${this.state.width}px` }}
        onClick={this.handleSelect}
        onKeyPress={this.handleSelect}
      >
        <Img className="image-tile__image" src={this.props.image.urls.small} />
        <p className="image-tile__description">
          Photo by{' '}
          <a
            onClick={stopPropagation}
            className="image-tile__link"
            href={`https://unsplash.com/@${
              this.props.image.user.username
            }?utm_source=${applicationName}&utm_medium=referral`}
          >
            {this.props.image.user.name}
          </a>{' '}
          on{' '}
          <a
            onClick={stopPropagation}
            className="image-tile__link"
            href={`https://unsplash.com/?utm_source=${applicationName}&utm_medium=referral`}
          >
            Unsplash
          </a>
        </p>
      </div>
    );
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
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleSelect: PropTypes.func.isRequired,
  tileHeight: PropTypes.number,
};
