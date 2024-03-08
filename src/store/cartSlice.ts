import {CartDish, DishWithId} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';

interface CartState {
  cartDishes: CartDish[];
}

const initialState: CartState = {
  cartDishes: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, {payload: dish}: PayloadAction<DishWithId>) => {
      const index = state.cartDishes.findIndex(cartDish => cartDish.id === dish.id);

      if (index !== -1) {
        state.cartDishes[index].amount++;
      } else {
        state.cartDishes.push({
          ...dish,
          amount: 1,
        });
      }
    },
    deleteDish: (state, {payload: dishId}: PayloadAction<string>) => {
      const index = state.cartDishes.findIndex(cartDish => cartDish.id === dishId);

      if (index === -1) {
        return;
      }
      if (state.cartDishes[index].amount === 1) {
        state.cartDishes = state.cartDishes.filter((cartDish) => cartDish.id !== dishId);
      } else {
        state.cartDishes[index].amount--;
      }
    },
    clearCart: (state) => {
      state.cartDishes = [];
    },
    updateDishes: (state, {payload: dishes}: PayloadAction<DishWithId[]>) => {
      const newCartDishes: CartDish[] = [];

      state.cartDishes.forEach(cartDish => {
        const existingDish = dishes.find(dish => cartDish.id === dish.id);

        if (!existingDish) {
          return;
        }

        newCartDishes.push({
          ...existingDish,
          amount: cartDish.amount
        });
      });

      state.cartDishes = newCartDishes;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addDish,
  clearCart,
  updateDishes,
  deleteDish
} = cartSlice.actions;

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;