import { Outlet } from 'react-router-dom';
import logo from '../assets/NueralNetworkIcon.svg';

function HomeLayout() {

  return (
    <div>
      <header>
        <object type="image/svg+xml" data={logo}>
          <img src={logo} alt="Nueral Network Icon" />
        </object>
      </header>
      <Outlet />
    </div>
  );
}

export default HomeLayout;