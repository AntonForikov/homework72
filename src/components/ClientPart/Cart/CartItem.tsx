import React from 'react';
import {CartDish} from '../../../types';
import {useAppDispatch} from '../../../app/hooks';
import {deleteDish} from '../../../store/cartSlice';

const CartItem: React.FC<CartDish> = ({title,amount, price, id}) => {
  const dispatch = useAppDispatch();
  const onDelete = () => {
    dispatch(deleteDish(id));
  };
  return (
    <div className="d-flex justify-content-between align-items-center p-2 my-3">
      <h5 className='m-0'>{title} x {amount}</h5>
      <div className="d-flex align-items-center">
        <h4 className="m-0 me-3">{price * amount} KGS</h4>
        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default CartItem;