import ClientNavBar from '../../components/ClientPart/ClientNavBar/ClientNavBar';
import ClientDishItem from '../../components/ClientPart/ClientDishItem/ClientDishItem';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDishesList, selectDishesListLoading} from '../../store/dishesSlice';
import Spinner from '../../components/Spinner/Spinner';
import {useEffect} from 'react';
import {getDishesList} from '../../store/dishesThunk';
import {useNavigate} from 'react-router-dom';
import {selectCartDishes} from '../../store/cartSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishesList);
  const cartDishes = useAppSelector(selectCartDishes);
  const loading = useAppSelector(selectDishesListLoading);
  const disabler = useAppSelector(selectCartDishes);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDishesList());
  }, [dispatch]);

  const checkout = () => {
    navigate('/cart');
  };

  const orderTotal = cartDishes.reduce((sum, dish) =>{
    return sum + (dish.price * dish.amount);
  }, 0);

  return (
    <>
      <ClientNavBar/>
      <div className='w-50 mx-auto'>
        {loading
          ? <div className='d-flex justify-content-center'><Spinner/></div>
          : dishes.length < 1 && !loading
            ? <div className="alert alert-danger mx-3 mt-3" role="alert">There is no dishes in Database!</div>
            : dishes.map(dish => {
              return <ClientDishItem
                key={dish.id}
                id={dish.id}
                title={dish.title}
                image={dish.image}
                price={dish.price}
              />;
            })
        }
        <div className='d-flex justify-content-between align-items-center'>
          <span>Order total: {orderTotal} KGS</span>
          <button className='btn btn-primary' type='button' onClick={checkout} disabled={disabler.length < 1}>Checkout</button>
        </div>
      </div>
    </>
  );
};

export default Home;