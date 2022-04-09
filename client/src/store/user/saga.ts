import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  changeUserPasswordAction,
  loginUserAction,
  logoutUserAction,
  registerUserAction,
  resetUserPasswordAction,
} from './actions';
import { authUser } from './slice';
import {
  changeUserPassword,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
} from '../../api/user/requests';
import { LoginFormValues } from '../../components/common/forms/login/types';
import { User } from '../../types/user';
import { setRecommended, setSubscriptions } from '../subscribers/slice';
import { ChangePasswordValues, RegisterUserValues } from '../../api/user/types';
import { SagaPayload } from '../types';

function* resetPasswordWorker({ payload }: SagaPayload<string>) {
  try {
    yield call(forgotPassword, payload);
  } catch (e) {
    console.error("Can't reset password");
  }
}

function* loginUserWorker({ payload }: SagaPayload<LoginFormValues>) {
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

function* registerUserWorker({ payload }: SagaPayload<RegisterUserValues>) {
  try {
    yield call(registerUser, payload);
  } catch (e) {
    console.error("Can't register user", e);
  }
}

function* changeUserPasswordWorker({
  payload,
}: SagaPayload<ChangePasswordValues>) {
  try {
    yield call(changeUserPassword, payload);
  } catch (e) {
    console.error("Can't change user password");
  }
}

function* logoutUserWorker() {
  try {
    yield call(logoutUser);
  } catch (e) {
    console.error("Can't logout user", e);
  }
}

function* resetPasswordWatcher() {
  yield takeLatest(resetUserPasswordAction, resetPasswordWorker);
}

function* loginUserWatcher() {
  yield takeLatest(loginUserAction, loginUserWorker);
}

function* registerUserWatcher() {
  yield takeLatest(registerUserAction, registerUserWorker);
}

function* changeUserPasswordWatcher() {
  yield takeLatest(changeUserPasswordAction, changeUserPasswordWorker);
}

function* logoutUserWatcher() {
  yield takeLatest(logoutUserAction, logoutUserWorker);
}

export function* watchUserSaga() {
  yield all([
    loginUserWatcher(),
    logoutUserWatcher(),
    registerUserWatcher(),
    resetPasswordWatcher(),
    changeUserPasswordWatcher(),
  ]);
}
