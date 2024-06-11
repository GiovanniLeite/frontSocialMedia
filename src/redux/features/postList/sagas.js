import { all, call, put, takeLatest } from 'redux-saga/effects';

import axios from '../../../services/axios';
import { handleApiErrorMessages } from '../../../services/handleApiErrors';
import { NO_DATA_ERROR } from '../../../constants/messages';
import { POST_NOT_FOUND_ERROR, USER_NOT_FOUND_ERROR } from '../../../constants/apiErrorMessages';

import { postListActions as actions } from './slice';

export function* getPostList(action) {
  const { userId } = action.payload;

  try {
    const { data } = yield call(axios.get, `/posts/${userId ? userId : undefined}`);
    const errors = data.length === 0 ? [NO_DATA_ERROR] : [];

    yield put(actions.setPostList({ posts: data, errors }));
  } catch (e) {
    const errors = handleApiErrorMessages(e, USER_NOT_FOUND_ERROR);

    yield put(actions.setPostList({ posts: [], errors }));
  }
}

export function* toggleLike(action) {
  try {
    const { data } = yield call(axios.patch, `/posts/toggleLike/${action.payload.postId}`);

    yield put(actions.setPost({ post: data, errors: [] }));
  } catch (e) {
    const errors = handleApiErrorMessages(e, POST_NOT_FOUND_ERROR);

    yield put(actions.setPost({ errors }));
  }
}

export default function* postListSaga() {
  yield all([takeLatest(actions.getPostList.type, getPostList), takeLatest(actions.toggleLike.type, toggleLike)]);
}
