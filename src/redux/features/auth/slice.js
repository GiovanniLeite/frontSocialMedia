import { createSlice } from '@reduxjs/toolkit';

import axios from '../../../services/axios';

const initialState = {
  isLoggedIn: false,
  token: '',
  user: undefined,
  mode: 'light',
  isLoading: false,
  errors: {
    login: [],
    register: [],
  },
};

// to be used for slice or mockStore
export const reducersObj = {
  registerRequest(state, action) {
    state.isLoading = true;
    state.errors.register = [];
  },
  loginRequest(state, action) {
    state.isLoading = true;
    state.errors.login = [];
  },
  loginSuccess(state, action) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
    state.token = action.payload.token;
    state.user = action.payload.user;
    state.errors.login = [];
    state.isLoggedIn = true;
    state.isLoading = false;
  },
  updateUser(state, action) {
    state.user = action.payload;
  },
  logout(state, action) {
    delete axios.defaults.headers.common['Authorization'];
    state.isLoggedIn = false;
    state.token = '';
    state.user = undefined;
    state.isLoading = false;

    const { page, errorMessages } = action.payload;
    state.errors[page === 'login' ? 'login' : 'register'] = errorMessages;
  },
  toggleThemeMode(state) {
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
