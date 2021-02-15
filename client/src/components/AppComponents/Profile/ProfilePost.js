import React from 'react';
import {Skeleton} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    'profile-post':{
        height: '20rem',
        overflowY: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    'profile-post__img': {
        width: '100%', height: 'auto',
    }
}))

const ProfilePost = (props) => {

    const {isLoading = false, open, isLiked, imgSrc, info, comments, avatar, ownerLogin, likes, id} = props;

    const classes = useStyles();


    return (
        <>
            {
                isLoading ?
                    <div>
                        <Skeleton animation="wave" variant="rect" style={{width: '20rem', height: '20rem'}}/>
                    </div>
                    :
                    <div className={classes['profile-post']} onClick={() => open({imgSrc, comments, avatar, text: info, ownerLogin, likes, id, isLiked})}>
                        <img className={classes['profile-post__img']} src={"/" + imgSrc} alt={'post-image'}/>
                    </div>
            }
        </>
    );
};

export default ProfilePost;