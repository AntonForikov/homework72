import {createAsyncThunk} from '@reduxjs/toolkit';
import {ContactsFromApi, ContactToSend, ContactWithId} from '../types';
import axiosApi from '../axiosApi';

export const addNewContact = createAsyncThunk<void, ContactToSend> (
  'contacts/add',
  async (contact) => {
    await axiosApi.post('/contacts.json', contact);
  }
);

export const getContactsList = createAsyncThunk (
  'contacts/list',
  async () => {
    const {data} = await axiosApi.get<ContactsFromApi | null>('/contacts.json');
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

export const getContactsById = createAsyncThunk (
  'contacts/getById',
  async (contactId: string | undefined) => {
    const {data} = await axiosApi.get<ContactWithId | null>(`/contacts/${contactId}.json`);
    if (data) {
      return {...data, id: contactId};
    } else {
      return null;
    }
  }
);

export const updateContact = createAsyncThunk<void, ContactWithId> (
  'contacts/update',
  async (contact) => {
    const contactToSend: ContactToSend = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      photo: contact.photo
    };
    await axiosApi.put(`/contacts/${contact.id}.json`, contactToSend);
  }
);

export const deleteContact = createAsyncThunk<void, string> (
  'contacts/delete',
  async (id) => {
    const confirmation = confirm('Are you sure?');
    if (confirmation) await axiosApi.delete(`/contacts/${id}.json`);
  }
);