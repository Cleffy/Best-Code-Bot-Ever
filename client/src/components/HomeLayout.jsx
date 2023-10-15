import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/NueralNetworkIcon.svg';
import Auth from '../utils/auth';
import Menu from './menu';
import backgroundImage from '../assets/HomeBackground.png';

/**
 * Adds the header, navigation, and background to homepage
 * Determines what navigation is displayed based on if user is logged in
 * @returns Home layout
 */
function HomeLayout() {
  const navigate= useNavigate();
  return (
    <div id="layoutBody" style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
    }}>
        <header>
          <div className='title'>
            <object style={{ width: '25%' }} type="image/svg+xml" data={logo}>
              <img style={{ objectFit: 'contain' }} src={logo} alt="Nueral Network Icon" />
            </object>
            <h1 style={{ width: '75%' }}></h1>
          </div>
          {!Auth.loggedIn() &&
            <div className='nav'>
              <button onClick= {() => {navigate('/login')}}>Log In</button>
              <button onClick= {()=> {navigate('/register')}}>Sign Up</button>
            </div>
          }
          {Auth.loggedIn() &&
            <div className='nav'>
              <Menu />
            </div>
          }
        </header>
        <Outlet />
    </div>
  );
}

export default HomeLayout;