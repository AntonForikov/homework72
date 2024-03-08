import DishItem from './DishItem';
import {Link} from 'react-router-dom';
import {selectDishesList, selectDishesListLoading} from '../../../store/dishesSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useEffect} from 'react';
import {getDishesList} from '../../../store/dishesThunk';
import Spinner from '../../Spinner/Spinner';

const Dishes = () => {
  const dishes = useAppSelector(selectDishesList);
  const loading = useAppSelector(selectDishesListLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDishesList());
  }, [dispatch]);
  return (
    <>
      <div className='d-flex justify-content-between align-items-center p-3'>
        <h1 className='m-0'>Dishes</h1>
        <Link to='/admin/new-dish' className='btn btn-success'>Add new Dish</Link>
      </div>
      {loading
        ? <div className="d-flex justify-content-center mt-3"><Spinner/></div>
        : dishes.length < 1 && !loading
          ? <div className="alert alert-danger mx-3" role="alert">There is no dishes in Database!</div>
          : dishes.map((dish) => {
            return <DishItem
              key={dish.id}
              id={dish.id}
              title={dish.title}
              image={dish.image}
              price={dish.price}
            />;
          })}
     </>
  );
};

export default Dishes;