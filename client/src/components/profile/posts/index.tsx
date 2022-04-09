import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfilePost from 'components/profile/posts/post';
import { Backdrop, Modal } from '@material-ui/core';

import { User } from 'types/user';
import { Post } from 'components/post';
import { getUserPosts } from 'store/posts/selectors';

import { useStyles } from './styles';

const ProfilePostsGrid: FC<{ user: User; isLoading: boolean }> = ({
  isLoading,
  user,
}) => {
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const classes = useStyles();

  const posts = useSelector(getUserPosts);

  const handleClose = () => {
    setIsPostOpen(false);
  };
  // @ts-ignore
  const openModal = (info) => {
    setModalInfo(info);
    setIsPostOpen(true);
  };

  const loadingPostsArr = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <div className={classes.profile__posts}>
        {!isLoading &&
          // @ts-ignore
          posts.map((item) => (
            <ProfilePost
              key={item._id}
              id={item._id}
              avatar={user.avatar}
              imgSrc={item.imageSrc}
              info={item.info}
              created={item.created}
              // @ts-ignore
              isLiked={item.isLiked}
              comments={item.comments}
              likes={item.likes}
              ownerLogin={item.ownerLogin}
              open={openModal}
            />
          ))}
        {!isLoading && !posts.length && (
          <div className={classes['profile__posts-exist']}>Постов нету</div>
        )}
        {isLoading &&
          loadingPostsArr.map((item, index) => (
            <ProfilePost key={index} isLoading />
          ))}
      </div>
      {isPostOpen && (
        <Modal
          disableAutoFocus
          disableEnforceFocus={true}
          disableRestoreFocus={true}
          disablePortal={true}
          className={classes.modal}
          open={isPostOpen}
          onClose={handleClose}
          onClick={(event) => {
            // @ts-ignore
            if (event.target.tagName === 'A') {
              handleClose();
            }
          }}
          closeAfterTransition
          disableScrollLock={true}
          BackdropComponent={Backdrop}
        >
          <div className={classes['profile__modal-post']}>
            <Post
              isUserPost={true}
              handleClose={handleClose}
              setModalInfo={setModalInfo}
              // @ts-ignore
              info={modalInfo}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProfilePostsGrid;
