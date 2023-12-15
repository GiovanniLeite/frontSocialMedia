import { all, call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import axios from '../../../services/axios';
import { NO_FRIENDS_ERROR, USER_NOT_FOUND_ERROR } from '../../../constants/errorMessages';
import { handleApiErrorMessages } from '../../../services/handleApiErrors';

import { friendListActions as actions } from './slice';

export function* getFriendList(action) {
  try {
    const { data } = yield call(axios.get, `/users/${action.payload}/friends`);
    const errors = data.length === 0 ? [NO_FRIENDS_ERROR] : [];

    yield put(actions.setFriendList({ list: data, errors }));
  } catch (e) {
    const errors = handleApiErrorMessages(e, USER_NOT_FOUND_ERROR);

    yield put(actions.setFriendList({ list: [], errors }));
  }
}

export default function* friendListSaga() {
  yield all([takeLatest(actions.getFriendList.type, getFriendList)]);
}
