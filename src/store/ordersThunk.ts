import {createAsyncThunk} from '@reduxjs/toolkit';
import {Order, OrderFromApi, OrderWithId} from '../types';
import axiosApi from '../axiosApi';


export const addOrder = createAsyncThunk<void, Order>(
  'order/add',
  async (order) => {
    await axiosApi.post('/orders.json', order);
  }
);

export const getOrderList = createAsyncThunk<OrderWithId[]>(
  'order/list',
  async ()  => {
    const {data} = await axiosApi.get<OrderFromApi | null>('/orders.json');

    if (data) {
      return Object.keys(data).map((id) : OrderWithId => ({
        id: id,
        ...data[id],
      }));
    }
    return [];
  }
);

export const deleteOrder = createAsyncThunk<void, string>(
  'order/delete',
  async (id) => {
    await axiosApi.delete(`/orders/${id}.json`);
  }
);
