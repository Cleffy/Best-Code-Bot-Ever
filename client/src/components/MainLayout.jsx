import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div id="layoutBody">
        <header>
            {/*<img src="" alt="Code Bot Logo" />*/}
            <h1>Code Bot</h1>
        </header>
        <Outlet />
    </div>
  );
}

export default MainLayout;