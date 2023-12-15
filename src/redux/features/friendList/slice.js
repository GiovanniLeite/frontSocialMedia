import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  isLoading: false,
  errors: [],
};

// to be used for slice or mockStore
export const reducersObj = {
  getFriendList(state, action) {
    state.isLoading = true;
    state.errors = [];
  },
  setFriendList(state, action) {
    state.list = action.payload.list;
    state.isLoading = false;
    state.errors = action.payload.errors;
  },
};

const friendListSlice = createSlice({
  name: 'friendList',
  initialState,
  reducers: reducersObj,
});

// Actions
export const friendListActions = friendListSlice.actions;

// Reducer
const friendListReducer = friendListSlice.reducer;
export default friendListReducer;
