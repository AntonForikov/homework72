import React from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {deleteDish, getDishesList} from '../../store/dishesThunk';

interface Props {
  id: string,
  title: string,
  image: string,
  price: number
}

const DishItem: React.FC<Props> = ({id, title,image, price }) => {
  // const deleteButtonDisabler = useAppSelector(selectDeleteLoading);
  const dispatch = useAppDispatch();

  const onDelete = async () => {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      await dispatch(deleteDish(id));
      dispatch(getDishesList());
    }
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center border rounded m-3'>
        <div className='d-flex align-items-center'>
          <img
            className='rounded'
            src={image === ''
              ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
              : image
            }
            alt={title}
            width={100}
          />
          <h4 className='ms-3'>{title}</h4>
        </div>
        <div className='d-flex align-items-center me-3'>
          <h4 className='m-0'>{price} KGS</h4>
          <Link to={`/admin/edit/${id}`} className='btn btn-primary mx-3'>Edit</Link>
          <button className='btn btn-danger' onClick={onDelete}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default DishItem;