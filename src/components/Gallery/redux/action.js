import { getPhotosList as getPhotosListService } from '../../../api/photos';
import { GET_PHOTOS_LIST_SENT, GET_PHOTOS_LIST_RECEIVED, GET_PHOTOS_LIST_ERROR } from './types';

export const getPhotosList = () => async (dispatch) => {
  dispatch({ type: GET_PHOTOS_LIST_SENT });
  try {
    const photoList = await getPhotosListService();
    dispatch({ type: GET_PHOTOS_LIST_RECEIVED, payload: photoList });
  } catch (err) {
    dispatch({ type: GET_PHOTOS_LIST_ERROR });
  }
};
