import { Outlet, Link } from 'react-router-dom';
import logo from '../assets/NueralNetworkIcon.svg';
import Auth from '../utils/auth';
import backgroundImage from '../assets/HomeBackground.png';

/**
 * Adds the header, navigation, and background to homepage
 * Determines what navigation is displayed based on if user is logged in
 * @returns Home layout
 */
function HomeLayout() {
  return (
    <div className='layout' style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
    }}>
        <header>
            <object  type="image/svg+xml" data={logo}>
              <img style={{ objectFit: 'contain' }} src={logo} alt="Nueral Network Icon" />
            </object>
          {!Auth.loggedIn() &&
            <div className='homeNav'>
              <Link to="/login">Log In</Link>
              <Link to="/register">Sign Up</Link>
            </div>
          }
          {Auth.loggedIn() &&
            <div className='homeNav'>
              <Link to="/chat">Chat</Link>
              <Link to="/history">History</Link>
              <Link onClick= {Auth.logout} to="/">Sign Out</Link>
            </div>
          }
        </header>
        <main>
          <Outlet />
        </main>
    </div>
  );
}

export default HomeLayout;