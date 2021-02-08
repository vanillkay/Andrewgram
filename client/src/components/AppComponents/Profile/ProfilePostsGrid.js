import React, {useState} from 'react';
import ProfilePost from "./ProfilePost";
import {makeStyles} from "@material-ui/core/styles";
import {Backdrop, Modal} from "@material-ui/core";
import Post from "../PostListComponents/PostComponents/Post/Post";

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
    }
}))

const ProfilePostsGrid = () => {

const [isPostOpen, setIsPostOpen] = useState(true);
const classes = useStyles();

const posts = []

    const handleClose = () => {
        setIsPostOpen(false);
    }

    const openModal = () => {
        setIsPostOpen(true)
    }

    return (
        <>
            <div className={classes['profile__posts']}>
                {posts.map((item, index) => <ProfilePost key={index} open={openModal}/>)}
                {!posts.length && <div>Постов нету</div>}
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
                    <Post/>
                </div>
            </Modal>
            }
        </>
    );
}
;

export default ProfilePostsGrid;