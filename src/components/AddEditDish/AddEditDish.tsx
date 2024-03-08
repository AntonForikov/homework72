import React, {useEffect, useState} from 'react';
import {DishToSend} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {addNewDish, getDishById, updateDish} from '../../store/dishesThunk';
import {useNavigate, useParams} from 'react-router-dom';
import {selectDishToUpdate} from '../../store/dishesSlice';

interface Prop {
  edit?: boolean;
}

const initialState: DishToSend = {
  tittle: '',
  price: 0,
  image: ''
};

const AddEditDish: React.FC<Prop> = ({edit=false}) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dishToUpdate = useAppSelector(selectDishToUpdate);
  const [newDish, setNewDish] = useState(initialState);

  const changeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setNewDish((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (id) dispatch(getDishById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (dishToUpdate && edit) {
      setNewDish(dishToUpdate);
    }
  }, [dishToUpdate, edit]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newDish.tittle.slice()[0] === ' ') {
      alert("Your dish tittle should begin from letter not from whitespace.");
    } else if (!edit) {
      await dispatch(addNewDish(newDish));
      navigate('/admin/dishes');
    } else {
      if (id) await dispatch(updateDish({...newDish, id}));
      navigate('/admin/dishes');
    }
  };
  return (
    <div className='p-3'>
      <h1>{edit ? 'Edit dish' : 'Add new dish'}</h1>
      <form onSubmit={onFormSubmit}>
        <div className="d-flex w-25 align-items-center justify-content-between my-2">
          <label htmlFor="tittle">Tittle:</label>
          <input className="form-control w-75" type="text" name="tittle" id="tittle" value={newDish.tittle} onChange={changeField} required/>
        </div>
        <div className="d-flex w-25 align-items-center justify-content-between my-2">
          <label htmlFor="image">Image:</label>
          <input className="form-control w-75" type="url" name="image" id="image"  value={newDish.image} onChange={changeField} required/>
        </div>
        <div className="d-flex w-25 align-items-center justify-content-between my-2">
          <label htmlFor="price">Price:</label>
          <input className="form-control w-75" type="number" min={1} name="price" id="price" value={newDish.price} onChange={changeField} required/>
        </div>
        <button className='btn btn-primary me-3' type='submit'>Save</button>
      </form>
    </div>
  );
};

export default AddEditDish;