import { FC, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Post } from 'components/post';
import { useHttp } from 'hooks/http.hook';
import { getPosts } from 'store/posts/selectors';
import { getUserInfo } from 'store/user/selectors';
import * as postsActions from 'store/posts/actions';
import { setAllPosts, toggleLoadingLike } from 'store/posts/actions';

const PostsList: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const serverPosts = useSelector(getPosts);

  const dispatch = useDispatch();

  const user = useSelector(getUserInfo);

  const [isAllPosts, setIsAllPosts] = useState(false);

  const { request } = useHttp();

  const toggleLikePost = (e) => {
    const targetData = e.target.dataset;
    if (targetData.type === 'post' && targetData.info) {
      dispatch(toggleLoadingLike());
      request('/post/like', 'post', {
        id: targetData.info,
        likerLogin: user.login,
      })
        .then(() => {
          dispatch(postsActions.toggleLike(targetData.info, user.login));
        })
        .catch(() => {})
        .finally(() => dispatch(toggleLoadingLike()));
    }
  };

  const loadPosts = async () => {
    const res = await request('/posts/all', 'post', {
      login: user.login,
      length: serverPosts.length + 3,
    });
    dispatch(setAllPosts(res.posts, user.login));
    if (res.isAllPosts) {
      setIsAllPosts(true);
    }
  };

  useEffect(() => {
    document.addEventListener('dblclick', toggleLikePost);
    return () => {
      document.removeEventListener('dblclick', toggleLikePost);
    };
  }, []);

  const loading = [1, 2, 3];

  return (
    <>
      {isLoading ? (
        loading.map((item, index) => <Post key={index} loadingPost={true} />)
      ) : (
        <InfiniteScroll
          next={loadPosts}
          hasMore={!isAllPosts}
          loader={
            <CircularProgress
              style={{ margin: '1rem auto', display: 'block' }}
              color="primary"
            />
          }
          dataLength={serverPosts.length}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>На этом все!</b>
            </p>
          }
        >
          {serverPosts.map((item) => (
            <Post
              info={{
                isLiked: !!item.isLiked,
                likes: item.likes,
                comments: item.comments,
                id: item._id,
                avatar: item.avatar,
                imgSrc: item.imageSrc,
                ownerLogin: item.ownerLogin,
                created: item.created,
              }}
              key={item._id}
            />
          ))}
          {!serverPosts.length && (
            <div
              style={{
                fontSize: '2rem',
                textAlign: 'center',
                textTransform: 'uppercase',
                marginTop: '5rem',
              }}
            >
              Публикаций пока что нету
            </div>
          )}
        </InfiniteScroll>
      )}
    </>
  );
};

export default PostsList;
