import { getPhotosList as getPhotosListService } from '../../../api/photos';
import { GET_PHOTOS_LIST_SENT, GET_PHOTOS_LIST_RECEIVED, GET_PHOTOS_LIST_ERROR } from './types';

export const getNextPhotos = () => async (dispatch, getState) => {
  const currentPage = getState().images.page;
  dispatch({ type: GET_PHOTOS_LIST_SENT });
  try {
    const photoList = await getPhotosListService(currentPage, 50);
    dispatch({ type: GET_PHOTOS_LIST_RECEIVED, payload: { items: photoList, page: currentPage + 1 } });
  } catch (err) {
    dispatch({ type: GET_PHOTOS_LIST_ERROR });
  }
};
