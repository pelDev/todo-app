import React from 'react';
import WebFont from 'webfontloader';
import Appbar from './components/Appbar';
import Actionbar from './components/Actionbar';

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Work Sans', 'Inter']
      }
    });
  }, []);

  return (
    <>
      <Appbar />

      <div className="container-fluid p-4">
        <Actionbar />
      </div>
    </>
  );
}

export default App;
