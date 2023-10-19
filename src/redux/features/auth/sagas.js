import { all, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import axios from '../../../services/axios';

import * as actions from './actions';

function persistRehydrate(action) {
  const token = get(action, 'payload.auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default function* authSaga() {
  yield all([takeLatest(actions.persistRehydrate.type, persistRehydrate)]);
}
