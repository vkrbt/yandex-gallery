import Unsplash from 'unsplash-js';

export const unsplash = new Unsplash({
  applicationId: process.env.REACT_APP_APP_ACCES_KEY,
  secret: process.env.REACT_APP_APP_SECRET,
  callbackUrl: process.env.REACT_APP_CALLBACK_URL,
});
