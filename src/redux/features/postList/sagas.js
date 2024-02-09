import { all, call, put, takeLatest } from 'redux-saga/effects';

import axios from '../../../services/axios';
import { handleApiErrorMessages } from '../../../services/handleApiErrors';
import { NO_DATA_ERROR } from '../../../constants/errorMessages';

import { postListActions as actions } from './slice';

export function* getPostList(action) {
  const { userId } = action.payload;
  const query = userId ? `user-posts/${userId}` : 'all-posts';

  try {
    const { data } = yield call(axios.get, `/posts/${query}`);
    const errors = data.length === 0 ? [NO_DATA_ERROR] : [];

    yield put(actions.setPostList({ posts: data, errors }));
  } catch (e) {
    const errors = handleApiErrorMessages(e);

    yield put(actions.setPostList({ posts: [], errors }));
  }
}

export function* toggleLike(action) {
  try {
    const { data } = yield call(axios.patch, `/posts/toggleLike/${action.payload.postId}`);

    yield put(actions.setPost({ post: data, errors: [] }));
  } catch (e) {
    const errors = handleApiErrorMessages(e);

    yield put(actions.setPost({ errors }));
  }
}

export default function* postListSaga() {
  yield all([takeLatest(actions.getPostList.type, getPostList), takeLatest(actions.toggleLike.type, toggleLike)]);
}
