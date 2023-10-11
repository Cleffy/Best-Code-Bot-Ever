import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/routes'; 

const App = () => {
  return (
    <Router>
      <div className="app">
        {}
        {}
        {}
        <Menu />
        <Routes /> {}
      </div>
    </Router>
  );
};

export default App;

