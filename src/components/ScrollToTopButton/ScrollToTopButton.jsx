import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { Button } from '../Button/Button';

const handleScrollClick = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
};

export class ScrollToTopButton extends PureComponent {
  constructor() {
    super();
    this.state = {
      isShowed: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.scrollY > 0) {
      this.setState({ isShowed: true });
    } else {
      this.setState({ isShowed: false });
    }
  }

  render() {
    const classNames = classnames('to-top', {
      'to-top--showed': this.state.isShowed,
    });
    return <Button className={classNames} onClick={handleScrollClick} />;
  }
}
