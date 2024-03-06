import React from 'react';

interface Prop {
  edit?: boolean;
}

const AddEditDish: React.FC<Prop> = ({edit=false}) => {
  return (
    <div className='p-3'>
      <h1>{edit ? 'Edit dish' : 'Add new dish'}</h1>
      <form>
        <div className="d-flex w-25 align-items-center justify-content-between my-2">
          <label htmlFor="tittle">Tittle:</label>
          <input className="form-control w-75" type="text" name="tittle" id="tittle"  required/>
        </div>
        <div className="d-flex w-25 align-items-center justify-content-between my-2">
          <label htmlFor="image">Image:</label>
          <input className="form-control w-75" type="url" name="image" id="image"  required/>
        </div>
        <div className="d-flex w-25 align-items-center justify-content-between my-2">
          <label htmlFor="price">Price:</label>
          <input className="form-control w-75" type="number" min={1} name="price" id="price" required/>
        </div>
        <button className='btn btn-primary me-3' type='submit'>Save</button>
      </form>
    </div>
  );
};

export default AddEditDish;