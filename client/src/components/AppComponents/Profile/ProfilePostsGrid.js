import React, {useState} from 'react';
import ProfilePost from "./ProfilePost";
import {makeStyles} from "@material-ui/core/styles";
import {Backdrop, Modal} from "@material-ui/core";
import Post from "../PostListComponents/PostComponents/Post/Post";
import {useSelector} from "react-redux";
import {getPosts} from "../../../store/posts/selectors";
import {getUserPosts} from "../../../store/user/selectors";

const useStyles = makeStyles(theme => ({
    'profile__posts': {
        display: 'grid',
        marginTop: '2rem',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gridColumnGap: '2rem',
        gridRowGap: '2rem'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    'profile__modal-post': {
        width: '70%',
        height: 'auto',
        outline: 'none'
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

const ProfilePostsGrid = () => {

    const [isPostOpen, setIsPostOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState(false);
    const classes = useStyles();

    const posts = useSelector(getUserPosts);

    console.log(posts);

    const handleClose = () => {
        setIsPostOpen(false);
    }

    const openModal = (info) => {
        setIsPostOpen(true);
        setModalInfo(info);
    }

    return (
        <>
            <div className={classes['profile__posts']}>
                {posts.map((item, index) => <ProfilePost key={index} imgSrc={item.imageSrc} info={item.info} open={openModal}/>)}
                {!posts.length && <div className={classes['profile__posts-exist']}>Постов нету</div>}
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
                        <Post info={modalInfo}/>
                    </div>
                </Modal>
            }
        </>
    );
};

export default ProfilePostsGrid;