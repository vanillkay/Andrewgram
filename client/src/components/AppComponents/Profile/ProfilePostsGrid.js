import React, {useState} from 'react';
import ProfilePost from "./ProfilePost";
import {makeStyles} from "@material-ui/core/styles";
import {Backdrop, Modal} from "@material-ui/core";
import Post from "../PostListComponents/PostComponents/Post/Post";
import {useSelector} from "react-redux";
import {getUserPosts, getUserPostsLoaded} from "../../../store/posts/selectors";

const useStyles = makeStyles(theme => ({
    'profile__posts': {
        display: 'grid',
        marginTop: '2rem',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gridColumnGap: '2rem',
        gridRowGap: '2rem'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        overflowY: 'visible',
        position: 'absolute'


    },
    'profile__modal-post': {
        width: '50%',
        height: 'auto',
        outline: 'none',
        position: 'relative'
    },
    'profile__posts-exist': {
        textAlign: 'center',
        marginTop: '2rem',
        fontWeight: 'bold',
        fontSize: '2rem',
        gridColumnStart: 1,
        gridColumnEnd: 5,
        gridRowStart: 2,
        gridRowEnd: 3,
    }
}))

const ProfilePostsGrid = (props) => {

    const [isPostOpen, setIsPostOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState(false);
    const classes = useStyles();

    const {user, isLoading} = props;

    const posts = useSelector(getUserPosts);

    const isLoaded = useSelector(getUserPostsLoaded);


    const handleClose = () => {
        setIsPostOpen(false);
    }


    const openModal = (info) => {
        setModalInfo(info);
        setIsPostOpen(true);
    }

    const loadingPostsArr = [1, 2, 3, 4, 5, 6];


    return (
        <>
            <div className={classes['profile__posts']}>
                {!isLoading && posts.map(item => <ProfilePost key={item._id}
                                                              id={item._id} avatar={user.avatar} imgSrc={item.imageSrc}
                                                              info={item.info}
                                                              isLiked={item.isLiked}
                                                              comments={item.comments} likes={item.likes}
                                                              ownerLogin={item.ownerLogin} open={openModal}/>)}
                {!isLoading && !posts.length && <div className={classes['profile__posts-exist']}>Постов нету</div>}
                {isLoading && loadingPostsArr.map((item, index) => <ProfilePost key={index} isLoading/>)}
            </div>
            {
                isPostOpen &&
                <Modal
                    disableAutoFocus
                    disableEnforceFocus
                    className={classes.modal}
                    open={isPostOpen}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}>
                    <div className={classes['profile__modal-post']}>
                        <Post isUserPost={true} handleClose={handleClose} setModalInfo={setModalInfo} info={modalInfo}/>
                    </div>
                </Modal>
            }
        </>
    );
};

export default ProfilePostsGrid;