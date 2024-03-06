import Dishes from '../../components/Dishes/Dishes';
import AdminNavBar from '../../components/AdminNavBar/AdminNavBar';
import {Route, Routes} from 'react-router-dom';
import Orders from '../../components/Orders/Orders';
import AddEditDish from '../../components/AddEditDish/AddEditDish';

const AdminLayout = () => {
  return (
    <>
      <AdminNavBar/>
      <Routes>
        <Route path='admin/dishes' element={<Dishes />} />
        <Route path='admin/orders' element={<Orders/> } />
        <Route path='admin/new-dish' element={<AddEditDish /> } />
        <Route path='*' element={<h1>Not found</h1> } />
      </Routes>
    </>
  );
};

export default AdminLayout;