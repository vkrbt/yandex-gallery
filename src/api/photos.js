import { toJson } from 'unsplash-js';
import { unsplash } from './';

export const getPhotosList = async (page, perPage) => {
  const photos = await unsplash.photos.listPhotos(page, perPage);
  return toJson(photos);
};

export const getPhoto = async (id) => {
  const photos = await unsplash.photos.getPhoto(id);
  return toJson(photos);
};
