import React from 'react';
import {IconButton} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    like: {},
    'like-active': {
        color: theme.colors.like,

    },
}))

const PostIcons = (props) => {

    const {isLoading, isLiked, toggleLike, isComment, toggleComment} = props;


    const classes = useStyles();
    return (
        <>
            <IconButton disabled={isLoading} onClick={toggleLike} aria-label="add to favorites">
                {isLiked ? <FavoriteIcon className={classes['like-active']}/> :
                    <FavoriteBorderOutlinedIcon className={classes.like}/>}
            </IconButton>
            <IconButton disabled={isLoading} onClick={toggleComment} aria-label="add comment">
                {isComment ? <ChatBubbleIcon color={'action'}/> : <ChatBubbleOutlineOutlinedIcon/>}
            </IconButton>
        </>
    );
};

export default PostIcons;