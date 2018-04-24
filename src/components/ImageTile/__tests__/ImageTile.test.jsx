import React from 'react';
import { shallow } from 'enzyme';
import { ImageTile } from '../ImageTile';

const image = {
  id: 'id',
  width: 500,
  height: 800,
  color: '#FFF',
  urls: {
    small: 'some url',
    regular: 'some url',
  },
  user: {
    name: 'name',
    username: 'username',
  },
};
const props = {
  image,
  handleSelect: jest.fn(),
};

describe('ImageTile', () => {
  it('should being rendered normally', () => {
    const wrapper = shallow(<ImageTile {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
