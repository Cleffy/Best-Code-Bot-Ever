import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  
  const [menuOpen, setMenuOpen] = useState(false);

  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  
  return (
    <div className="menu">
      <button onClick={toggleMenu}>Menu</button>
      {menuOpen && (
        <ul>
          <li>
            <Link to="/new-chat">New Chat</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
          <li>
            <Link to="/sign-out">Sign Out</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;


