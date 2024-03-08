import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import React, {useEffect} from 'react';
import {deleteOrder, getOrderList} from '../../../store/ordersThunk';
import {selectDeleteButtonDisabler, selectOrderList} from '../../../store/ordersSlice';
import {selectDishesList} from '../../../store/dishesSlice';
import {getDishesList} from '../../../store/dishesThunk';
import {CartDish, OrderWithId} from '../../../types';

interface Props {
  order: OrderWithId,
  orderDishes: CartDish[]
}

const OrderItem: React.FC<Props> = ({order, orderDishes}) => {
  const dispatch = useAppDispatch();
  const deleteButtonId = useAppSelector(selectDeleteButtonDisabler);

  const deliveryCost = 150;
  const totalAmount = orderDishes.reduce((sum, dish) => {
    return sum + (dish.price * dish.amount);
  }, 0);

  const onOrderComplete = async () => {
    await dispatch(deleteOrder(order.id));
    await dispatch(getOrderList());
  };

  return (
    <div className='border rounded w-50 mx-auto mt-3'>
      {orderDishes.map((dish) => {
        return <div
          key={`${order.id}-${dish.id}`}
          className="d-flex justify-content-between align-items-center border-bottom p-2 my-3"
        >
          <h5 className="m-0">{dish.title} x {dish.amount}</h5>
          <div className="d-flex align-items-center">
            <h4 className="m-0 me-3">{dish.price * dish.amount} KGS</h4>
          </div>
        </div>;
      })}
      <div className='d-flex justify-content-between align-items-center p-2 my-3'>
        <div>
          <h5>Delivery: {deliveryCost} KGS</h5>
          <h5>Order Total: {totalAmount + deliveryCost} KGS</h5>
        </div>
        <button className="btn btn-danger" onClick={onOrderComplete} disabled={order.id === deleteButtonId}>Complete Order</button>
      </div>
    </div>
  );
};

const Orders = () => {
  const dispatch = useAppDispatch();
  const orderList = useAppSelector(selectOrderList);
  const dishes = useAppSelector(selectDishesList);

  useEffect(() => {
    dispatch(getDishesList());
    dispatch(getOrderList());
  }, [dispatch]);

  const getOrderDishes = (order: OrderWithId) => {
    const orderDishes: CartDish[] = [];
    Object.entries(order).forEach((entries) => {
      const dishId = entries[0];
      const dishAmount = entries[1];
      const dish = dishes.find((dish) => dish.id === dishId);
      if (dish) {
        orderDishes.push({...dish, amount: parseInt(dishAmount)});
      }
    });
    return orderDishes;
  };

  return (
    <div>
      {orderList.map((order) => {
        return <OrderItem key={order.id} order={order} orderDishes={getOrderDishes(order)}/>;
      })}
    </div>
  );
};

export default Orders;