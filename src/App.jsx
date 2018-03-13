import React from 'react';
import Gallery from './components/Gallery/Gallery';
import images from './components/Gallery/images';

const App = () => (
  <React.Fragment>
    <Gallery images={images} />
  </React.Fragment>
);

export default App;
