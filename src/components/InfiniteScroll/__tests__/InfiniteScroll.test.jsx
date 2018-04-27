import React from 'react';
import { shallow } from 'enzyme';
import { InfiniteScroll } from '../InfiniteScroll';

describe('InfiniteScroll', () => {
  it('should being rendered normally', () => {
    const props = {
      getNext: jest.fn(),
      children: <div>children</div>,
      error: false,
    };
    const wrapper = shallow(<InfiniteScroll {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
