import { all, call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import axios from '../../../services/axios';

import { authActions } from './slice';
import * as actions from './actions';

export function* registerRequest(action) {
  try {
    const { data } = yield call(axios.post, '/users/register', action.payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const { jwt: token, user } = data;

    yield put(authActions.loginSuccess({ token, user }));
  } catch (error) {
    console.log(error);
  }
}

export function* loginRequest(action) {
  try {
    const { data } = yield call(axios.post, '/tokens/login', action.payload);
    const { jwt: token, user } = data;

    yield put(authActions.loginSuccess({ token, user }));
  } catch (error) {
    console.log(error);
  }
}

function persistRehydrate(action) {
  const token = get(action, 'payload.auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default function* authSaga() {
  yield all([
    takeLatest(authActions.registerRequest.type, registerRequest),
    takeLatest(authActions.loginRequest.type, loginRequest),
    takeLatest(actions.persistRehydrate.type, persistRehydrate),
  ]);
}
