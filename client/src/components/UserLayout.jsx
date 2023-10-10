import { Outlet } from 'react-router-dom';

function UserLayout() {
  return (
    <div id="layoutBody">
        <header>
            {/*<img src="" alt="Code Bot Logo" />*/}
            <h1>Code Bot</h1>
            <div id="deadSpace">
                
            </div>
        </header>
        <Outlet />
    </div>
  );
}

export default UserLayout;