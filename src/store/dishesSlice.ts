import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {DishToSend, DishWithId} from '../types';
import {getDishById, getDishesList} from './dishesThunk';

interface ContactsState {
  dishesList: DishWithId[],
  dishToUpdate: DishToSend | null,
  dishesLoading: boolean
}

const initialState: ContactsState = {
  dishesList: [],
  dishToUpdate: null,
  dishesLoading: false
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDishesList.pending, (state) => {
      state.dishesLoading = true;
    }).addCase(getDishesList.fulfilled, (state, {payload: dishesList}) => {
      state.dishesLoading = false;
      state.dishesList = dishesList;
    }).addCase(getDishesList.rejected, (state) => {
      state.dishesLoading = false;
    });

    builder.addCase(getDishById.fulfilled, (state, action) => {
      state.dishToUpdate = action.payload;
    });
  }
});

export const dishesReducer = dishesSlice.reducer;
export const selectDishesList = (state: RootState) => state.dishes.dishesList;
export const selectDishesListLoading = (state: RootState) => state.dishes.dishesLoading;
export const selectDishToUpdate = (state: RootState) => state.dishes.dishToUpdate;