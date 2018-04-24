import { images, defaultState } from '../reducer';
import { GET_PHOTOS_LIST_SENT, GET_PHOTOS_LIST_RECEIVED, GET_PHOTOS_LIST_ERROR } from '../types';

describe('images reducer', () => {
  describe('should correctly handle action type', () => {
    it(GET_PHOTOS_LIST_SENT, () => {
      const payload = {items: []};
      const newState = images(defaultState, { type: GET_PHOTOS_LIST_SENT, payload });
      expect(newState.loading).toBeTruthy();
      expect(newState.success).toBeFalsy();
    });

    it(GET_PHOTOS_LIST_RECEIVED, () => {
      const payload = {items: [{}, {}]};
      const newState = images(defaultState, { type: GET_PHOTOS_LIST_RECEIVED, payload });
      expect(newState.loading).toBeFalsy();
      expect(newState.success).toBeTruthy();
      expect(newState.items).toEqual([...defaultState.items, ...payload.items])
    });

    it(GET_PHOTOS_LIST_ERROR, () => {
      const payload = {items: [{}, {}]};
      const newState = images(defaultState, { type: GET_PHOTOS_LIST_ERROR, payload });
      expect(newState.loading).toBeFalsy();
      expect(newState.success).toBeFalsy();
    });
  });
});
