import { all, call, put, takeLatest } from 'redux-saga/effects';
import { loginUserAction, resetPasswordAction } from './actions';
import { authUser } from './slice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { forgotPassword, loginUser } from '../../api/user/requests';
import { LoginFormValues } from '../../components/common/forms/login/types';
import { User } from '../../types/user';
import { setRecommended, setSubscriptions } from '../subscribers/slice';

function* resetPasswordWorker({
  payload,
}: ReturnType<ActionCreatorWithPayload<string>>) {
  try {
    yield call(forgotPassword, payload);
  } catch (e) {
    console.error("Can't reset password");
  }
}

function* loginUserWorker({
  payload,
}: ReturnType<ActionCreatorWithPayload<LoginFormValues>>) {
  try {
    const user: User = yield call(loginUser, payload);
    yield put(authUser(user));
    // @ts-ignore
    yield put(setSubscriptions(user.userInfo.subscriptions));
    // @ts-ignore
    yield put(setRecommended(user.userInfo.recommended));
  } catch (e) {
    console.error("Can't login user", e);
  }
}
function* watchResetPassword() {
  yield takeLatest(resetPasswordAction, resetPasswordWorker);
}

function* watchLoginUser() {
  yield takeLatest(loginUserAction, loginUserWorker);
}

export function* watchUserSaga() {
  yield all([watchResetPassword(), watchLoginUser()]);
}
