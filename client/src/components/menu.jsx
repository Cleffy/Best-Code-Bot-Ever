import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Auth from '../utils/auth';

const Menu = () => {
  const navigate= useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="menu">
      <button onClick={toggleDropdown}>Menu</button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <button onClick= {()=> {navigate('/')}}>Home</button>
          <button onClick= {()=> {navigate('/chat')}}>Chat</button>
          <button onClick= {() => {navigate('/history')}}>History</button>
          <button onClick= {Auth.logout} >Log Out</button> 
        </div>
      )}
    </div>
  );
};

export default Menu;
