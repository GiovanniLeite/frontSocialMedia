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
    const { list, errors } = action.payload;

    state.list = list;
    state.isLoading = false;
    state.errors = errors;
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
