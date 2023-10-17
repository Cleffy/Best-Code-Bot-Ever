import { Link } from "react-router-dom";
import Auth from '../utils/auth';

/**
 * Home - return to homepage
 * Chat - go to chat page
 * History - go to history page
 * Sign Out - sign out of account and return to homepage
 * @returns Menu dropdown for navigation
 */
const Menu = () => {
  return (
    <aside id="menuAside">
      {Auth.loggedIn() &&
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/history">History</Link>
          <Link onClick= {Auth.logout} to="/">Sign Out</Link>
        </div>
      }
      {!Auth.loggedIn() &&
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/login">Log In</Link>
          <Link to="/register">Sign Up</Link>
        </div>
      }
    </aside>
  );
};

export default Menu;