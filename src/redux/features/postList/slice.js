import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  isLoading: false,
  errors: [],
};

// to be used for slice or mockStore
export const reducersObj = {
  getPostList(state, action) {
    state.isLoading = true;
    state.errors = [];
  },
  setPostList(state, action) {
    const { posts, errors } = action.payload;

    if (posts) state.posts = posts;

    state.isLoading = false;
    state.errors = errors;
  },
  toggleLike(state, action) {
    // state.isLoading = true;
    state.errors = [];
  },
  setPost(state, action) {
    const { post, errors } = action.payload;

    if (post) state.posts = state.posts.map((p) => (p._id === post._id ? post : p));

    // state.isLoading = false;
    state.errors = errors;
  },
};

const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: reducersObj,
});

// Actions
export const postListActions = postListSlice.actions;

// Reducer
const postListReducer = postListSlice.reducer;
export default postListReducer;
