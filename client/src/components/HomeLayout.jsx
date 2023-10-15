import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/NueralNetworkIcon.svg';
import Auth from '../utils/auth';
import Menu from './menu';

function MainLayout() {
  const navigate= useNavigate();
  return (
    <div id="layoutBody">
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

export default MainLayout;