import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {ContactWithId} from '../types';

interface ContactsState {
  contactsList: ContactWithId[],
}

const initialState: ContactsState = {
  contactsList: [],
};

const dishesSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
});

export const contactsReducer = dishesSlice.reducer;
export const selectContactsList = (state: RootState) => state.contacts.contactsList;