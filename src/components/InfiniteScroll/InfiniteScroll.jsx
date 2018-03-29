import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';

class InfiniteScroll extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
    this.handleScrollEnd = this.handleScrollEnd.bind(this);
    this.handleLoadingEnd = this.handleLoadingEnd.bind(this);
  }

  componentDidMount() {
    this.props.getNext();
    document.addEventListener('scroll', this.handleScrollEnd);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScrollEnd);
  }

  handleScrollEnd(e) {
    if (!this.state.loading) {
      const windowHeight = window.innerHeight;
      const currentScroll = e.target.documentElement.scrollTop;
      const maxScroll = e.target.documentElement.offsetHeight - windowHeight;
      if (currentScroll + windowHeight > maxScroll) {
        this.setState({ loading: true });
        this.props.getNext().finnaly(this.handleLoadingEnd);
      }
    }
  }

  handleLoadingEnd() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        {this.props.children}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

InfiniteScroll.propTypes = {
  getNext: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default InfiniteScroll;
