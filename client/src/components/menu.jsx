import React, { useState } from 'react';

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
          <a href="/new-chat">New Chat</a>
          <a href="/history">History</a>
          <a href="/sign-out">Sign Out</a>
        </div>
      )}
    </div>
  );
};

export default Menu;
