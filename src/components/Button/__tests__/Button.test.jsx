import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '../Button';

describe('Button', () => {
  it('should being rendered normally', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should has className if it provided', () => {
    const className = 'wonderfulClassName';
    const wrapper = shallow(<Button className={className} />);
    expect(wrapper.hasClass(className)).toBeTruthy();
  });
});
