import {NavLink, Outlet} from 'react-router-dom';

const AdminNavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-md">
          <NavLink className="navbar-brand" to="/admin">Turtle Pizza Admin</NavLink>
        </div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to='/admin/dishes' className='nav-link'>Dishes</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/admin/orders' className='nav-link'>Orders</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet/>
    </>
  );
};

export default AdminNavBar;