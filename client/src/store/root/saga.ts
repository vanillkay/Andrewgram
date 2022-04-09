import { all } from 'redux-saga/effects';
import { watchPostsSaga } from '../posts/saga';
import { watchUserSaga } from '../user/saga';

export function* rootWatcher() {
  yield all([watchPostsSaga(), watchUserSaga()]);
}
