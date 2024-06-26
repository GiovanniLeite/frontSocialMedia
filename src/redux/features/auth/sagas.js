import { all, call, put, takeLatest } from 'redux-saga/effects';

import axios from '../../../services/axios';
import { handleApiErrorMessages } from '../../../services/handleApiErrors';
import {
  EMAIL_ALREADY_IN_USE_ERROR,
  INVALID_CREDENTIALS_ERROR,
  INVALID_EMAIL_OR_USER_NOT_EXIST_ERROR,
  INVALID_PASSWORD_ERROR,
} from '../../../constants/apiErrorMessages';

import { authActions } from './slice';

export function* registerRequest(action) {
  try {
    const { data } = yield call(axios.post, '/users/register', action.payload);
    const { token, user } = data;

    yield put(authActions.loginSuccess({ token, user }));
  } catch (e) {
    const errorMessages = handleApiErrorMessages(e, EMAIL_ALREADY_IN_USE_ERROR);

    yield put(authActions.logout({ page: 'register', errorMessages }));
  }
}

export function* loginRequest(action) {
  try {
    const { data } = yield call(axios.post, '/tokens/login', action.payload);
    const { token, user } = data;

    yield put(authActions.loginSuccess({ token, user }));
  } catch (e) {
    const errorMessages = handleApiErrorMessages(e, [
      INVALID_CREDENTIALS_ERROR,
      INVALID_EMAIL_OR_USER_NOT_EXIST_ERROR,
      INVALID_PASSWORD_ERROR,
    ]);

    yield put(authActions.logout({ page: 'login', errorMessages }));
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(authActions.registerRequest.type, registerRequest),
    takeLatest(authActions.loginRequest.type, loginRequest),
  ]);
}
