import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useEffect} from 'react';
import {getOrderList} from '../../../store/ordersThunk';
import {selectOrderList} from '../../../store/ordersSlice';

const Orders = () => {
  const dispatch = useAppDispatch();
  const orderList = useAppSelector(selectOrderList);

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);
  return (
    <div>
      {orderList.length}
    </div>
  );
};

export default Orders;