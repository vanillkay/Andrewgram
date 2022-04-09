import { select, call, put, takeLatest, all } from 'redux-saga/effects';

import {
  loadPostsAction,
  toggleLikePostAction,
  publishPostCommentAction,
} from './actions';
import { User } from '../../types/user';
import { getUserInfo } from '../user/selectors';
import {
  likePost,
  loadPosts,
  publishPostComment,
} from '../../api/posts/requests';
import {
  setAllPosts,
  toggleCommentLoading,
  toggleLikeLoading,
  toggleLikePost,
  writeNewComment,
} from './slice';
import { getPosts } from './selectors';
import { Post } from '../../types/post';
import { SagaPayload } from '../types';
import { PublishComment } from '../../api/posts/types';

function* toggleLikePostWorker({ payload }: SagaPayload<string>) {
  try {
    yield put(toggleLikeLoading());
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
    yield put(toggleLikeLoading());
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

function* publishPostCommentWorker({ payload }: SagaPayload<PublishComment>) {
  try {
    yield put(toggleCommentLoading());
    yield call(publishPostComment, payload);
    yield put(
      writeNewComment({
        isUserPost: false,
        postId: payload.id,
        comment: payload.comment,
      })
    );
  } catch (e) {
    console.error("Can't publish comment", e);
  } finally {
    yield put(toggleCommentLoading());
  }
}

function* toggleLikePostWatcher() {
  yield takeLatest(toggleLikePostAction, toggleLikePostWorker);
}

function* loadPostsWatcher() {
  yield takeLatest(loadPostsAction, loadPostsWorker);
}

function* publishPostCommentWatcher() {
  yield takeLatest(publishPostCommentAction, publishPostCommentWorker);
}

export function* watchPostsSaga() {
  yield all([
    loadPostsWatcher(),
    toggleLikePostWatcher(),
    publishPostCommentWatcher(),
  ]);
}
