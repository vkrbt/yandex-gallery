import { GET_PHOTOS_LIST_SENT, GET_PHOTOS_LIST_RECEIVED, GET_PHOTOS_LIST_ERROR, CLEAR_PHOTOS } from './types';

const defaultState = {
  loading: false,
  success: false,
  items: [],
  page: 1,
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
        page: payload.page,
        items: [...state.items, ...payload.items],
      };
    case GET_PHOTOS_LIST_ERROR:
      return {
        loading: false,
        success: false,
        ...state,
      };
    case CLEAR_PHOTOS:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
};
