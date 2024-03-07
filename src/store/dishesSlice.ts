import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {DishesWithId} from '../types';
import {getDishesList} from './dishesThunk';

interface ContactsState {
  dishesList: DishesWithId[],
  dishesLoading: boolean
}

const initialState: ContactsState = {
  dishesList: [],
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
      console.log(dishesList);
    }).addCase(getDishesList.rejected, (state) => {
      state.dishesLoading = false;
    });
  }
});

export const dishesReducer = dishesSlice.reducer;
export const selectDishesList = (state: RootState) => state.dishes.dishesList;
export const selectDishesListLoading = (state: RootState) => state.dishes.dishesLoading;