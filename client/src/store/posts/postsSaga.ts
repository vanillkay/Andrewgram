import { select, call, put, takeLatest, all } from 'redux-saga/effects';

import {
  loadPostsAction,
  toggleLoadingLike,
  toggleLikePostAction,
} from './actions';
import { User } from '../../types/user';
import { getUserInfo } from '../user/selectors';
import { likePost, loadPosts } from '../../api/posts/requests';
import { setAllPosts, toggleLikePost } from './slice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { getPosts } from './selectors';
import { Post } from '../../types/post';

function* toggleLikePostWorker({
  payload,
}: ReturnType<ActionCreatorWithPayload<number>>) {
  try {
    yield put(toggleLoadingLike());
    const user: User = yield select(getUserInfo);
    yield call(likePost, { likerLogin: user.login, id: payload });
    yield put(
      toggleLikePost({
        id: payload,
        isUserPost: false,
        likeOwner: user.login,
      })
    );
  } catch (e) {
    console.error('Cant toggle like', e);
  } finally {
    yield put(toggleLoadingLike());
  }
}

function* loadPostsWorker() {
  try {
    const user: User = yield select(getUserInfo);
    const posts: Post[] = yield select(getPosts);
    const newPosts: Post[] = yield call(loadPosts, {
      login: user.login,
      count: posts.length + 3,
    });
    yield put(setAllPosts({ posts: newPosts, login: user.login }));
  } catch (e) {
    console.error("Can't load posts", e);
  }
}

function* toggleLikePostWatcher() {
  yield takeLatest(toggleLikePostAction, toggleLikePostWorker);
}

function* loadPostsWatcher() {
  yield takeLatest(loadPostsAction, loadPostsWorker);
}

export function* watchPostsSaga() {
  yield all([toggleLikePostWatcher(), loadPostsWatcher()]);
}
