import React from 'react';
import './App.scss';
import WebFont from 'webfontloader';
import Appbar from './components/Appbar';

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Chilanka']
      }
    });
  }, []);

  return (
    <div className="App">
      <Appbar />
    </div>
  );
}

export default App;
