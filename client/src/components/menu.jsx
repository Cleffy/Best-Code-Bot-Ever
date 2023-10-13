import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Menu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="menu">
      <button onClick={toggleDropdown}>Menu</button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <Link to="/new-chat">New Chat</Link>
          <Link to="/history">History</Link>
          <Link to="/sign-out">Sign Out</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
