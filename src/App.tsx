import * as React from 'react';
import Gallery from './components/Gallery';
import 'reset-css/reset.css';
import './index.css';

class App extends React.Component<object, {}> {
  render() {
    return (
      <div>
        <Gallery />
      </div>
    );
  }
}

export default App;
