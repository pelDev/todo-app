import React from 'react';
import WebFont from 'webfontloader';
import Appbar from './components/Appbar';
import Actionbar from './components/Actionbar';
import AppContent from './components/AppContent';
import { useTodoActionController } from './hooks/useTodoActionController';
import "./App.scss";

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Work Sans', 'Inter']
      }
    });
  }, []);

  const todoController = useTodoActionController();

  return (
    <div className='App'>
      <Appbar />

      <div className="container-fluid p-4">
        <Actionbar todoController={todoController} />

        <AppContent todoController={todoController} />
      </div>
    </div>
  );
}

export default App;
