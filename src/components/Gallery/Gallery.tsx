import * as React from 'react';
import images from './data/images/index';

export interface Props {
  children?: React.ReactNode;
}

export interface State {
}

const alingImagesByWidth = (imageRows: HTMLDivElement[][], parent: HTMLDivElement) => {
  imageRows.forEach((row) => {
    const imagesWidth: number = row.reduce(
      (sumWidth: number, image: HTMLDivElement) => {
        return sumWidth + image.offsetWidth;
      },
      0,
    );
    const rowWidth: number = parent.offsetWidth;
    const scaleIndex: number = rowWidth / imagesWidth;
    row.forEach((image: HTMLDivElement) => {
      const height: number = image.offsetHeight;
      const newMaxHeight = `${height * scaleIndex}px`;
      image.style.maxHeight = newMaxHeight;
      const firstChild = image.firstChild as HTMLElement;
      firstChild.style.maxHeight = newMaxHeight;
    });
  });
};

export default class Gallery extends React.Component<Props, State> {
  images: HTMLDivElement[] = [];
  imagesConatiner: HTMLDivElement;

  constructor(props: Props) {
    super(props);
    this.sortImagesByRows = this.sortImagesByRows.bind(this);
    this.setParentRef = this.setParentRef.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.sortImagesByRows);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.sortImagesByRows);
  }

  setImageRefs(position: number) {
    return (image: HTMLDivElement) => {
      this.images[position] = image;
    };
  }

  setParentRef(imageConatiner: HTMLDivElement) {
    this.imagesConatiner = imageConatiner;
  }

  sortImagesByRows() {
    const localImageRefs: HTMLDivElement[] = [...this.images];
    const imageRows: HTMLDivElement[][] = [[localImageRefs[0]]];
    localImageRefs.shift();

    localImageRefs.forEach((image: HTMLDivElement, i: number) => {
      const lastRow: HTMLDivElement[] = imageRows[imageRows.length - 1];
      const lastImage: HTMLDivElement = lastRow[lastRow.length - 1];
      if (image.offsetTop === lastImage.offsetTop) {
        lastRow.push(image);
      } else {
        imageRows.push([image]);
      }
    });
    window.removeEventListener('load', this.sortImagesByRows);
    window.addEventListener('resize', this.sortImagesByRows);
    alingImagesByWidth(imageRows, this.imagesConatiner);
  }

  render() {
    return (
      <div ref={this.setParentRef} className="images-container">
        {images.map((image, i) => (
          <div key={image} className="image-container" ref={this.setImageRefs(i)}>
            <img className="image" src={image} />
          </div>
        ))}
      </div>
    );
  }
}
