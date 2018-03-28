import { GET_PHOTOS_LIST_SENT, GET_PHOTOS_LIST_RECEIVED, GET_PHOTOS_LIST_ERROR } from './types';

const defaultState = {
  loading: false,
  success: false,
  items: [],
};

export const images = (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_PHOTOS_LIST_SENT:
      return {
        loading: true,
        success: false,
        ...state,
      };
    case GET_PHOTOS_LIST_RECEIVED:
      return {
        ...state,
        loading: false,
        success: true,
        items: [
          ...payload,
        ]
      };
    case GET_PHOTOS_LIST_ERROR:
      return {
        loading: false,
        success: false,
        ...state,
      };
    default:
      return state;
  }
};
