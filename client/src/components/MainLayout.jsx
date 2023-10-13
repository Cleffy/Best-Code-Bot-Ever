import { Outlet } from 'react-router-dom';
import { Menu } from 'Menu';

function MainLayout() {
  return (
    <div id="layoutBody">
        <header>
            {/*<img src="" alt="Code Bot Logo" />*/}
            <h1>Code Bot</h1>
            <Menu />
        </header>
        <Outlet />
    </div>
  );
}

export default MainLayout;