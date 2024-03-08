import {NavLink} from 'react-router-dom';

const ClientNavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-md">
          <NavLink className="navbar-brand mx-auto" to="/">Turtle Pizza</NavLink>
        </div>
      </nav>
    </>
  );
};

export default ClientNavBar;