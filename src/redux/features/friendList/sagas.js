import { all, call, put, takeLatest } from 'redux-saga/effects';

import axios from '../../../services/axios';
import { handleApiErrorMessages } from '../../../services/handleApiErrors';
import { NO_DATA_ERROR } from '../../../constants/messages';
import { USER_NOT_FOUND_ERROR } from '../../../constants/apiErrorMessages';

import { friendListActions as actions } from './slice';

export function* getFriendList(action) {
  try {
    const { data } = yield call(axios.get, `/users/${action.payload}/friends`);
    const errors = data.length === 0 ? [NO_DATA_ERROR] : [];

    yield put(actions.setFriendList({ list: data, errors }));
  } catch (e) {
    const errors = handleApiErrorMessages(e, USER_NOT_FOUND_ERROR);

    yield put(actions.setFriendList({ list: [], errors }));
  }
}

export default function* friendListSaga() {
  yield all([takeLatest(actions.getFriendList.type, getFriendList)]);
}
