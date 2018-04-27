import React from 'react';
import { shallow } from 'enzyme';
import { ImagesList } from '../ImagesList';

describe('ImagesList', () => {
  it('should being rendered normally', () => {
    const images = Array.from({ length: 5 }, (item, i) => ({
      id: `${i + 1}`,
    }));
    const wrapper = shallow(<ImagesList images={images} />);
    expect(wrapper.children().length).toBe(images.length);
  });
});
