import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from '../Spinner';
import { Button } from '../../Button/Button';

describe('Spinner', () => {
  it('should render spinner if loading', () => {
    const wrapper = shallow(<Spinner loading text="" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render button with text if not loading', () => {
    const text = 'Any text';
    const wrapper = shallow(<Spinner loading={false} text={text} />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).first().childAt(0).text()).toBe(text);
  });
});
