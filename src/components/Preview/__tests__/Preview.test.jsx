import React from 'react';
import { shallow } from 'enzyme';
import { Preview } from '../Preview';

const images = Array.from({ length: 5 }, (item, i) => ({
  id: `${i + 1}`,
  urls: {
    regular: `url${i + 1}`,
  },
}));
const props = {
  images,
  currentId: images[0].id,
  getNext: jest.fn(),
};

describe('InfiniteScroll', () => {
  it('should being rendered normally', () => {
    const wrapper = shallow(<Preview {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
