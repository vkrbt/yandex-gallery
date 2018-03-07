import * as React from 'react';
import images from './data/images/index';

export interface Props {
  children?: React.ReactNode;
}

export interface State {
}

export default class Gallery extends React.Component<Props, State> {
  images: HTMLImageElement[] = [];
  imageRows: HTMLImageElement[][] = [];

  constructor(props: Props) {
    super(props);
    this.sortImagesByRows = this.sortImagesByRows.bind(this);
    this.alingImagesByWidth = this.alingImagesByWidth.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.sortImagesByRows);
  }

  setRef(position: number) {
    return (element: HTMLImageElement) => {
      this.images[position] = element;
    };
  }

  alingImagesByWidth() {
    this.imageRows.forEach((row) => {
      const parent: HTMLElement | null = row[0].parentElement as HTMLElement;
      const imagesWidth: number = row.reduce(
        (sumWidth: number, image: HTMLImageElement) => {
          return sumWidth + image.offsetWidth;
        },
        0,
      );
      const rowWidth: number = parent.offsetWidth;
      const scaleIndex: number = rowWidth / imagesWidth;
      row.forEach((image: HTMLImageElement) => {
        const height = image.offsetHeight;
        const width = image.offsetWidth;
        image.style.height = `${height * scaleIndex}px`;
        image.style.width = `${width * scaleIndex}px`;
        image.style.maxHeight = 'none';
      });
    });
  }

  sortImagesByRows() {
    this.imageRows.push([this.images[0]]);
    this.images.shift();

    this.images.forEach((image: HTMLImageElement, i: number) => {
      const lastRow: HTMLImageElement[] = this.imageRows[this.imageRows.length - 1];
      const lastImage: HTMLImageElement = lastRow[lastRow.length - 1];
      if (image.offsetTop === lastImage.offsetTop) {
        lastRow.push(image);
      } else {
        this.imageRows.push([image]);
      }
    });
    window.removeEventListener('load', this.sortImagesByRows);
    this.alingImagesByWidth();
  }

  render() {
    return (
      <div className="images-container">
        {images.map((image, i) => (
          <img ref={this.setRef(i)} className="image" key={image} src={image} />)
        )}
      </div>
    );
  }
}
