import Dishes from '../../components/Dishes/Dishes';
import AdminNavBar from '../../components/AdminNavBar/AdminNavBar';
import {Route, Routes} from 'react-router-dom';
import Orders from '../../components/Orders/Orders';

const AdminLayout = () => {
  return (
    <>
      <AdminNavBar/>
      <Routes>
        <Route path='admin/dishes' element={<Dishes />} />
        <Route path='admin/orders' element={<Orders/> } />
      </Routes>
    </>
  );
};

export default AdminLayout;