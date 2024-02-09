import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/sagas';
import friendListSaga from '../features/friendList/sagas';
import postListSaga from '../features/postList/sagas';

export default function* rootSaga() {
  yield all([authSaga(), friendListSaga(), postListSaga()]);
}
