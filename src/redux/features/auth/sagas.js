import { all, call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import axios from '../../../services/axios';
import { handleApiErrorMessages } from '../../../services/handleApiErrors';

import { authActions } from './slice';
import * as actions from './actions';

export function* registerRequest(action) {
  try {
    const { data } = yield call(axios.post, '/users/register', action.payload);
    const { token, user } = data;

    yield put(authActions.loginSuccess({ token, user }));
  } catch (e) {
    const errors = handleApiErrorMessages(e, 'Esse endereço de email já está em uso');

    yield put(authActions.logout({ errors }));
  }
}

export function* loginRequest(action) {
  try {
    const { data } = yield call(axios.post, '/tokens/login', action.payload);
    const { token, user } = data;

    yield put(authActions.loginSuccess({ token, user }));
  } catch (e) {
    const errors = handleApiErrorMessages(e, [
      'Credenciais inválidas',
      'Email inválido ou Usuário não existe',
      'Senha inválida',
    ]);

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
