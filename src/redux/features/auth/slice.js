import { createSlice } from '@reduxjs/toolkit';

import axios from '../../../services/axios';

const initialState = {
  isLoggedIn: false,
  token: '',
  user: undefined,
  mode: 'light',
  isLoading: false,
  errors: [],
};

// to be used for slice or mockStore
export const reducersObj = {
  registerRequest(state, action) {
    state.isLoading = true;
    state.errors = [];
  },
  updateRequest(state, action) {
    state.isLoading = true;
    state.errors = [];
  },
  updateSuccess(state, action) {
    state.user = action.payload;
    state.isLoading = false;
    state.errors = [];
  },
  loginRequest(state, action) {
    state.isLoading = true;
    state.errors = [];
  },
  loginSuccess(state, action) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
    state.isLoggedIn = true;
    state.token = action.payload.token;
    state.user = action.payload.user;
    state.isLoading = false;
    state.errors = [];
  },
  logout(state, action) {
    delete axios.defaults.headers.common['Authorization'];
    state.isLoggedIn = false;
    state.token = '';
    state.user = undefined;
    state.isLoading = false;
    state.errors = action.payload.errors;
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
