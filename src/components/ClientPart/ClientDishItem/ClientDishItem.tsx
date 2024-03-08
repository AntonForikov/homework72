import React from 'react';
import {useAppDispatch} from '../../../app/hooks';
import {addDish} from '../../../store/cartSlice';

interface Props {
  id: string,
  title: string,
  image: string,
  price: number
}

const ClientDishItem: React.FC<Props> = ({id, title, image, price}) => {
  const dispatch = useAppDispatch();
  const onSelect = () => {
    dispatch(addDish({id, title, image, price}));
  };
  return (
    <div style={{cursor: 'pointer'}} className="d-flex justify-content-between align-items-center border rounded my-3" onClick={() =>onSelect()}>
      <div className="d-flex align-items-center">
        <img
          className="rounded"
          src={image === ''
            ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
            : image
          }
          alt={title}
          width={100}
        />
        <h4 className="ms-3">{title}</h4>
      </div>
      <div className="d-flex align-items-center me-3">
        <h4 className="m-0">{price} KGS</h4>
      </div>
    </div>
  );
};

export default ClientDishItem;