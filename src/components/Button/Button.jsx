import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const Button = props => <button {...props} className={classnames('button', props.className)} />;

Button.propTypes = {
  className: PropTypes.string,
}
