import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/NueralNetworkIcon.svg';
import Auth from '../utils/auth';
import Menu from './menu';

function MainLayout() {
  const navigate= useNavigate();
  return (
    <div id="layoutBody">
        <header>
          <object style={{ width: '15%' }} type="image/svg+xml" data={logo}>
            <img style={{ objectFit: 'contain' }} src={logo} alt="Nueral Network Icon" />
          </object>
          <h1>Code Bot</h1>
          {Auth.loggedIn() &&
            <div className='nav'>
              <button onClick= {()=> {navigate('/register')}}>Sign Up</button>
              <button onClick= {() => {navigate('/login')}}>Log In</button>
            </div>
          }
          {!Auth.loggedIn() &&
            <div className='nav'>
              <Menu />
              <button onClick= {Auth.logout} >Log Out</button> 
            </div>
          }
        </header>
        <Outlet />
    </div>
  );
}

export default MainLayout;