import { useState } from 'react';
import { Link } from "react-router-dom";
import Auth from '../utils/auth';

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
          <Link onClick= {toggleDropdown} to="/">Home</Link>
          <Link onClick= {toggleDropdown} to="/chat">Chat</Link>
          <Link onClick= {toggleDropdown} to="/history">History</Link>
          <Link onClick= {() => {
              Auth.logout();
              toggleDropdown();
            }} to="/">Sign Out</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
