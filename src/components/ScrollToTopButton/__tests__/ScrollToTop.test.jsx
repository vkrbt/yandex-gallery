import React from 'react';
import { shallow } from 'enzyme';
import { ScrollToTopButton } from '../ScrollToTopButton';
import { Button } from '../../Button/Button';

describe('ScrollToTopButton', () => {
  it('should being rendered normally', () => {
    const wrapper = shallow(<ScrollToTopButton />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('should add extra class to show button', () => {
    const wrapper = shallow(<ScrollToTopButton />);
    wrapper.setState({ isShowed: true });
    expect(
      wrapper
        .find(Button)
        .first()
        .hasClass('to-top--showed'),
    ).toBeTruthy();
  });
});
