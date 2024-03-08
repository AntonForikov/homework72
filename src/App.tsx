import {Route, Routes} from 'react-router-dom';
import Dishes from './components/AdminPart/AdminDishes/Dishes';
import Orders from './components/AdminPart/Orders/Orders';
import AddEditDish from './components/AdminPart/AddEditDish/AddEditDish';
import AdminNavBar from './components/AdminPart/AdminNavBar/AdminNavBar';
import Cart from './components/ClientPart/Cart/Cart';
import Home from './container/Home/Home';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>

        <Route path="/admin" element={<AdminNavBar/>}>
          <Route path="dishes" element={<Dishes/>}/>
          <Route path="orders" element={<Orders/>}/>
          <Route path="new-dish" element={<AddEditDish/>}/>
          <Route path="edit/:id" element={<AddEditDish edit={true}/>}/>
        </Route>
        <Route path="*" element={<h1>Not found</h1>}/>
      </Routes>
    </>
  );
}

export default App;
