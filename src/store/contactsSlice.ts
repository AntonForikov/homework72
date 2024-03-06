import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {addNewContact, deleteContact, getContactsById, getContactsList, updateContact} from './contactsThunk';
import {ContactWithId} from '../types';

interface ContactsState {
  contactsList: ContactWithId[],
  currentContact: ContactWithId | null,
  loading: boolean,
  deleteLoading: boolean,
  addUpdateDisable: boolean
}

const initialState: ContactsState = {
  contactsList: [],
  currentContact: null,
  loading: false,
  deleteLoading: false,
  addUpdateDisable: false
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContactsById.pending, (state) => {
      state.loading = true;
    }).addCase(getContactsById.fulfilled, (state, {payload: contact}) => {
      state.loading = false;
      state.currentContact = contact;
    }).addCase(getContactsById.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(addNewContact.pending, (state) => {
      state.addUpdateDisable = true;
    }).addCase(addNewContact.fulfilled, (state) => {
      state.addUpdateDisable = false;
    }).addCase(addNewContact.rejected, (state) => {
      state.addUpdateDisable = false;
    });

    builder.addCase(updateContact.pending, (state) => {
      state.addUpdateDisable = true;
    }).addCase(updateContact.fulfilled, (state) => {
      state.addUpdateDisable = false;
    }).addCase(updateContact.rejected, (state) => {
      state.addUpdateDisable = false;
    });

    builder.addCase(getContactsList.pending, (state) => {
      state.loading = true;
    }).addCase(getContactsList.fulfilled, (state, {payload: contactList}) => {
      state.loading = false;
      state.contactsList = contactList;
    }).addCase(getContactsList.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteContact.pending, (state) => {
      state.deleteLoading = true;
    }).addCase(deleteContact.fulfilled, (state) => {
      state.deleteLoading = false;
    }).addCase(deleteContact.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const contactsReducer = contactSlice.reducer;
export const selectContactsList = (state: RootState) => state.contacts.contactsList;
export const selectCurrentContact = (state: RootState) => state.contacts.currentContact;
export const selectLoading = (state: RootState) => state.contacts.loading;
export const selectAddUpdateDisable = (state: RootState) => state.contacts.addUpdateDisable;
export const selectDeleteLoading = (state: RootState) => state.contacts.deleteLoading;