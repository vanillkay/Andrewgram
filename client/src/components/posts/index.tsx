import { FC, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Post } from 'components/post';
import { getPosts } from 'store/posts/selectors';
import { loadPostsAction, toggleLikePostAction } from 'store/posts/actions';

const PostsList: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const serverPosts = useSelector(getPosts);

  const dispatch = useDispatch();

  const [isAllPosts, setIsAllPosts] = useState(false);

  // @ts-ignore
  const toggleLikePost = (e) => {
    const targetData = e.target.dataset;
    if (targetData.type === 'post' && targetData.info) {
      dispatch(toggleLikePostAction(targetData.info));
    }
  };

  const loadPosts = async () => {
    dispatch(loadPostsAction());
    if (false) {
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
        // @ts-ignore
        loading.map((item, index) => <Post key={index} isLoadingPost={true} />)
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
            // @ts-ignore
            <Post
              info={{
                // @ts-ignore
                isLiked: !!item.isLiked,
                likes: item.likes,
                comments: item.comments,
                id: item._id,
                // @ts-ignore
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
