import React, { PureComponent } from 'react';
import classnames from 'classnames';

export class ScrollToTopButton extends PureComponent {
  constructor() {
    super();
    this.state = {
      isShowed: false,
      lastScroll: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollClick = this.handleScrollClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.scrollY > 0) {
      this.setState({ isShowed: true, lastScroll: this.state.lastScroll ? this.state.lastScroll : 0 });
    } else {
      this.setState({ isShowed: false });
    }
  }

  handleScrollClick() {
    window.scroll({
      top: this.state.lastScroll,
      behavior: 'smooth',
    });
    this.setState({ lastScroll: window.scrollY });
  }

  render() {
    const classNames = classnames('to-top', {
      'to-top--showed': this.state.isShowed || this.state.lastScroll,
      'to-top--to-bottom': this.state.lastScroll,
    });
    return <button className={classNames} onClick={this.handleScrollClick} />;
  }
}
