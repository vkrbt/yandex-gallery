import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';

export const Spinner = props => (
  <div className="loading-wrapper">
    {props.loading ? (
      <div className="spinner" />
    ) : (
      <Button onClick={props.action} className="load-more">
        {props.text}
      </Button>
    )}
  </div>
);

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.func,
}
