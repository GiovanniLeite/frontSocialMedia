import { all, call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import axios from '../../../services/axios';

import { authActions } from './slice';
import * as actions from './actions';

export function* registerRequest(action) {
  try {
    const { data } = yield call(axios.post, '/users/register', action.payload);
    const { jwt: token, user } = data;

    yield put(authActions.loginSuccess({ token, user }));
  } catch (e) {
    let errors = get(e, 'response.data.errors', []);
    // console.error(errors);

    if (errors[0] !== 'Esse endereço de email já está em uso.') {
      errors = ['Houve um erro, tente novamente mais tarde'];
    }

    yield put(authActions.logout({ errors }));
  }
}

export function* loginRequest(action) {
  try {
    const { data } = yield call(axios.post, '/tokens/login', action.payload);
    const { jwt: token, user } = data;

    yield put(authActions.loginSuccess({ token, user }));
  } catch (e) {
    const status = get(e, 'response.status', 0);
    let errors = get(e, 'response.data.errors', []);
    // console.error(errors);

    if (status === 500 || errors.length === 0) {
      errors = ['Houve um erro, tente novamente mais tarde'];
    }

    yield put(authActions.logout({ errors }));
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
