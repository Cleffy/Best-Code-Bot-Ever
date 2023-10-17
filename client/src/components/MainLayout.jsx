import { Outlet } from 'react-router-dom';
import logo from '../assets/NueralNetworkIcon.svg';
import Menu from './menu';

/**
 * Adds the header and navigation to most pages
 * Determines what navigation is displayed based on if user is logged in
 * @returns Main layout for most pages
 */
function MainLayout() {
  return (
    <div className= 'layout'>
      <header>
          <object  type="image/svg+xml" data={logo}>
            <img style={{ objectFit: 'contain' }} src={logo} alt="Nueral Network Icon" />
          </object>
          <div className='title'>
            <h1>Code-E</h1>
          </div>
      </header>
      <main>
        <Menu />
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;