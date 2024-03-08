import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {OrderWithId} from '../types';
import {deleteOrder, getOrderList} from './ordersThunk';

interface OrdersState {
  orderList: OrderWithId[],
  ordersLoading: boolean,
  deleteButtonDisabler: boolean,
}

const initialState: OrdersState = {
  orderList: [],
  ordersLoading: false,
  deleteButtonDisabler: false,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderList.pending, (state) => {
      state.ordersLoading = true;
    }).addCase(getOrderList.fulfilled, (state, {payload: ordersList}) => {
      state.ordersLoading = false;
      state.orderList = ordersList;
    }).addCase(getOrderList.rejected, (state) => {
      state.ordersLoading = false;
    });

    builder.addCase(deleteOrder.pending, (state) => {
      state.deleteButtonDisabler = true;
    }).addCase(deleteOrder.fulfilled, (state) => {
      state.deleteButtonDisabler = false;
    }).addCase(deleteOrder.rejected, (state) => {
      state.deleteButtonDisabler = false;
    });
  }
});

export const ordersReducer = orderSlice.reducer;
export const selectOrderList = (state: RootState) => state.orders.orderList;
export const selectOrderListLoading = (state: RootState) => state.orders.ordersLoading;
export const selectDeleteButtonDisabler = (state: RootState) => state.orders.deleteButtonDisabler;