import { createSlice } from '@reduxjs/toolkit';

import axios from '../../../services/axios';

const initialState = {
  isLoggedIn: false,
  token: '',
  user: undefined,
  mode: 'light',
  isLoading: false,
};

// to be used for slice or mockStore
export const reducersObj = {
  logout(state) {
    delete axios.defaults.headers.common['Authorization'];
    state.isLoggedIn = false;
    state.token = '';
    state.user = undefined;
    state.mode = 'light';
    state.isLoading = false;
  },
  toggleMode(state) {
    state.mode = state.mode === 'light' ? 'dark' : 'light';
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: reducersObj,
});

// Actions
export const authActions = authSlice.actions;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
