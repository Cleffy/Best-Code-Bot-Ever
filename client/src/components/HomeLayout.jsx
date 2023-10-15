import { Outlet } from 'react-router-dom';

function HomeLayout() {
  return (
    <div>
      <header>
      </header>
      <Outlet />
    </div>
  );
}

export default HomeLayout;