import 'whatwg-fetch';
import { getNextPhotos } from '../action';
import { GET_PHOTOS_LIST_SENT, GET_PHOTOS_LIST_RECEIVED, GET_PHOTOS_LIST_ERROR } from '../types';

const initialData = {
  images: {
    page: 1,
  },
};

const getState = jest.fn(() => initialData);

describe('getNextPhotos action creator', () => {
  it('should load data correctly.', async () => {
    const fetchedData = {
      images: [],
    };
    window.fetch = jest.fn(() => Promise.resolve(fetchedData));

    const dispatch = jest.fn();
    await getNextPhotos()(dispatch, getState);
    expect(getState).toBeCalled();
    expect(dispatch).toBeCalledWith({ type: GET_PHOTOS_LIST_SENT });
    expect(dispatch).toBeCalledWith({
      payload: { items: fetchedData, page: initialData.images.page + 1 },
      type: GET_PHOTOS_LIST_RECEIVED,
    });
  });

  it('dispatch error if it occures.', async () => {
    window.fetch = jest.fn(() => Promise.reject());

    const dispatch = jest.fn();
    await getNextPhotos()(dispatch, getState);
    expect(getState).toBeCalled();
    expect(dispatch).toBeCalledWith({ type: GET_PHOTOS_LIST_SENT });
    expect(dispatch).toBeCalledWith({ type: GET_PHOTOS_LIST_ERROR });
  });
});
