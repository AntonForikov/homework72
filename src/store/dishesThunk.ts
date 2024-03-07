import {createAsyncThunk} from '@reduxjs/toolkit';
import {DishesFromApi, DishesWithId, DishToSend} from '../types';
import axiosApi from '../axiosApi';

export const addNewDish = createAsyncThunk<void, DishToSend> (
  'dish/add',
  async (dish) => {
    await axiosApi.post('/dishes.json', dish);
  }
);

export const getDishesList = createAsyncThunk<DishesWithId[]> (
  'dish/list',
  async () => {
    const {data} = await axiosApi.get<DishesFromApi | null>('/dishes.json');
    if (data) {
      return Object.keys(data).map(id => ({
        id: id,
        ...data[id],
      }));
    } else {
      return [];
    }
  }
);

// export const getContactsById = createAsyncThunk (
//   'contacts/getById',
//   async (contactId: string | undefined) => {
//     const {data} = await axiosApi.get<ContactWithId | null>(`/contacts/${contactId}.json`);
//     if (data) {
//       return {...data, id: contactId};
//     } else {
//       return null;
//     }
//   }
// );

// export const updateContact = createAsyncThunk<void, ContactWithId> (
//   'contacts/update',
//   async (contact) => {
//     const contactToSend: ContactToSend = {
//       name: contact.name,
//       email: contact.email,
//       phone: contact.phone,
//       photo: contact.photo
//     };
//     await axiosApi.put(`/contacts/${contact.id}.json`, contactToSend);
//   }
// );

export const deleteContact = createAsyncThunk<void, string> (
  'contacts/delete',
  async (id) => {
    const confirmation = confirm('Are you sure?');
    if (confirmation) await axiosApi.delete(`/contacts/${id}.json`);
  }
);