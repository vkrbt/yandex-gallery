import React from 'react';
import { shallow } from 'enzyme';
import { Img } from '../Img';
import { Spinner } from '../../Spinner/Spinner';

describe('Img', () => {
  it('should being Spinner until image not loaded', () => {
    const wrapper = shallow(<Img src="some url" />);
    wrapper.setState({ isLoaded: false, error: null });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });

  it('should not being rendered if error was occured', () => {
    const wrapper = shallow(<Img src="some url" />);
    wrapper.setState({ error: true });
    expect(wrapper.html()).toBe(null);
  });

  it('should render image if image is loaded.', () => {
    const wrapper = shallow(<Img src="some url" />);
    wrapper.setState({ isLoaded: true, error: null });
    expect(wrapper.find('img')).toHaveLength(1);
  });
});
