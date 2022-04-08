import { all } from 'redux-saga/effects';
import { watchPostsSaga } from '../posts/postsSaga';
import { watchUserSaga } from '../user/userSaga';

export function* rootWatcher() {
  yield all([watchPostsSaga(), watchUserSaga()]);
}
