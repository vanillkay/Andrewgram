import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  changeUserPassword,
  checkUserToken,
} from 'api/user/requests';
import { UserToken, User } from 'types/user';
import { SagaPayload } from 'store/types';
import { setSubscriptions } from 'store/subscribers/slice';
import { getErrorMessage, withSagaHelpers } from 'store/utils';
import { LoginFormValues } from 'components/common/forms/login/types';
import { ChangePasswordValues, RegisterUserValues } from 'api/user/types';
import { ForgotPasswordFormValues } from 'components/common/forms/reset-password/types';

import {
  loginUserAction,
  logoutUserAction,
  registerUserAction,
  resetUserPasswordAction,
  changeUserPasswordAction,
  checkChangePasswordToken,
} from './actions';
import { authUser } from './slice';

function* resetPasswordWorker({
  payload,
}: SagaPayload<ForgotPasswordFormValues>) {
  try {
    yield call(resetPassword, payload.email);
  } catch (e) {
    console.error("Can't reset password");
    throw new Error(getErrorMessage(e));
  }
}

function* loginUserWorker({ payload }: SagaPayload<LoginFormValues>) {
  try {
    const user: User = yield call(loginUser, payload);
    yield put(authUser(user));
    yield put(setSubscriptions(user.subscriptions));
    // @ts-ignore
    // yield put(setRecommended(user.userInfo.recommended));
  } catch (e) {
    console.error("Can't login user", e);
    throw new Error(getErrorMessage(e));
  }
}

function* registerUserWorker({ payload }: SagaPayload<RegisterUserValues>) {
  try {
    const user: User = yield call(registerUser, payload);
    yield put(authUser(user));
    yield put(setSubscriptions(user.subscriptions));
  } catch (e) {
    console.error("Can't register user", e);
    throw new Error(getErrorMessage(e));
  }
}

function* changeUserPasswordWorker({
  payload,
}: SagaPayload<ChangePasswordValues>) {
  try {
    yield call(changeUserPassword, payload);
  } catch (e) {
    console.error("Can't change user password", e);
    throw new Error(getErrorMessage(e));
  }
}

function* checkChangePasswordTokenWorker({ payload }: SagaPayload<UserToken>) {
  try {
    yield call(checkUserToken, { token: payload.token });
  } catch (e) {
    console.error("Can't check change password token", e);
    throw new Error(getErrorMessage(e));
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
  yield takeLatest(
    resetUserPasswordAction,
    withSagaHelpers(resetPasswordWorker)
  );
}

function* loginUserWatcher() {
  yield takeLatest(loginUserAction, withSagaHelpers(loginUserWorker));
}

function* registerUserWatcher() {
  yield takeLatest(registerUserAction, withSagaHelpers(registerUserWorker));
}

function* changeUserPasswordWatcher() {
  yield takeLatest(
    changeUserPasswordAction,
    withSagaHelpers(changeUserPasswordWorker)
  );
}

function* logoutUserWatcher() {
  yield takeLatest(logoutUserAction, logoutUserWorker);
}

function* checkChangePasswordTokenWatcher() {
  yield takeLatest(
    checkChangePasswordToken,
    withSagaHelpers(checkChangePasswordTokenWorker)
  );
}

export function* watchUserSaga() {
  yield all([
    loginUserWatcher(),
    logoutUserWatcher(),
    registerUserWatcher(),
    resetPasswordWatcher(),
    changeUserPasswordWatcher(),
    checkChangePasswordTokenWatcher(),
  ]);
}
