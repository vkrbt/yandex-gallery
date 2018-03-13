import React from 'react';
import Gallery from './components/Gallery/Gallery';
import images from './components/Gallery/images';

const App = () => (
  <div>
    <Gallery images={images} />
  </div>
);

export default App;
