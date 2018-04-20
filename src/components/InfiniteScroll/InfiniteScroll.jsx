import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '../Spinner/Spinner';
import { ScrollToTopButton } from '../ScrollToTopButton/ScrollToTopButton';

export class InfiniteScroll extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleLoadingEnd = this.handleLoadingEnd.bind(this);
    this.handleGetNext = this.handleGetNext.bind(this);
  }

  componentDidMount() {
    this.handleGetNext();
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    const windowHeight = window.innerHeight;
    const currentScroll = e.target.documentElement.scrollTop;
    if (!this.state.loading) {
      const maxScroll = e.target.documentElement.offsetHeight - windowHeight;
      if (currentScroll + windowHeight > maxScroll) {
        this.handleGetNext();
      }
    }
  }

  handleLoadingEnd() {
    this.setState({ loading: false });
  }

  async handleGetNext() {
    this.setState({ loading: true });
    try {
      await this.props.getNext();
    } finally {
      this.handleLoadingEnd();
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
        <Spinner
          loading={this.state.loading}
          action={this.handleGetNext}
          text={this.props.error && !this.state.loading ? 'Retry' : 'Load More'}
        />
        <ScrollToTopButton />
      </React.Fragment>
    );
  }
}

InfiniteScroll.propTypes = {
  getNext: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  error: PropTypes.bool.isRequired,
};
