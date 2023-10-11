import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes'; 

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Include any layout components, headers, or menus here */}
        {/* These components may be used to provide a common layout for all routes. */}
        {/* For example, you mentioned a menu component. You can include it here. */}
        <Menu />
        <Routes /> {/* Render your routes */}
      </div>
    </Router>
  );
};

export default App;

