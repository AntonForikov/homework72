import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import CartItem from './CartItem';
import {clearCart, selectCartDishes} from '../../../store/cartSlice';
import {useNavigate} from 'react-router-dom';
import {addOrder} from '../../../store/ordersThunk';
import {Order} from '../../../types';
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedDishes = useAppSelector(selectCartDishes);
  const delivery = 150;

  const total = selectedDishes.reduce((sum, cartDish) => {
    return sum + cartDish.price * cartDish.amount;
  }, 0);

  const placeOrder = () => {
    const newOrder = selectedDishes.reduce((accum: Order, dish) => {
      accum[dish.id] = dish.amount.toString();
      return accum;
    }, {});
    dispatch(addOrder(newOrder));
    dispatch(clearCart());
    navigate('/');
  };
  return (
    <div className='w-50 mx-auto mt-5'>
      <h3>Your Order</h3>
      {selectedDishes.map(dish => {
        return <CartItem
          key={dish.id}
          id={dish.id}
          title={dish.title}
          price={dish.price}
          amount={dish.amount}/>;
      })}
      <div><h4>Delivery: {delivery} KGS</h4></div>
      <div><h3>Total: {total + delivery}</h3></div>
      <div className='d-flex justify-content-end'>
        <button type='button' className='btn btn-warning me-3' onClick={() => navigate('/')}>Cancel</button>
        <button type='button' className='btn btn-success' onClick={placeOrder} disabled={!selectedDishes.length}>Order</button>
      </div>
    </div>
  );
};

export default Cart;