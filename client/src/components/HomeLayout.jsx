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
    <div id="homeBody" style={{
        height: '100vh',
        width: '100vw',
        maxHeight: '100%',
        maxWidth: '100%',
        margin: '0',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
    }}>
        <header style={{
          height: '15vw',
          display: 'flex',
          flexFlow: 'row nowrap',
          left: '0',
          top: '0',
          width: '90%',
          margin: '0 auto',
        }}>
            <object style={{
              width: '25%',
              left: '10%'
              }} type="image/svg+xml" data={logo}>
              <img style={{ objectFit: 'contain' }} src={logo} alt="Nueral Network Icon" />
            </object>
          {!Auth.loggedIn() &&
            <div className='homeNav'>
              <Link to="/login">Log In</Link>
              <Link to="/register">Register</Link>
            </div>
          }
          {Auth.loggedIn() &&
            <div className='homeNav'>
              <Link to="/chat">Chat</Link>
              <Link to="/history">History</Link>
              <Link onClick= {() => { Auth.logout(); }} to="/">Sign Out</Link>
            </div>
          }
        </header>
        <Outlet />
    </div>
  );
}

export default HomeLayout;