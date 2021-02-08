import React, {useState} from 'react';
import {Skeleton} from "@material-ui/lab";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    makeStyles, Slide,
} from "@material-ui/core";
import PostComments from "../PostComments/PostComments";
import * as postsActions from "../../../../../store/posts/actions";
import {useDispatch, useSelector} from "react-redux";
import Likes from "../Likes/Likes";
import PostIcons from "../PostIcons/PostIcons";
import NewComment from "../NewComment/NewComment";
import {getUserInfo} from "../../../../../store/user/selectors";


const useStyles = makeStyles((theme) => ({
    post: {
        width: '100%',
        marginBottom: '2rem',
        border: '1px solid rgb(219, 219, 219)',
        borderRadius: '3px'
    },
    media: {
        '& img': {
            width: '100%',
            height: 'auto',
        }
    }
}));


const Post = (props) => {

    const {
        isLiked = false,
        likes = [],
        serverComments = [],
        loading = false,
        id
    } = props;


    const [isComment, setIsComment] = useState(false);

    const [animationSide, setAnimationSide] = useState('right');

    const [isLoading, setIsLoading] = useState(false);

    const classes = useStyles();

    const dispatch = useDispatch();

    const userInfo = useSelector(getUserInfo)
    const toggleLike = () => {
        dispatch(postsActions.toggleLike(id, userInfo.login));
    }

    const toggleComment = () => {
        setIsComment(prevState => !prevState);
    }

    const loadComment = (comment) => {

        dispatch(postsActions.writeNewComment(id, {owner: 'andrew', comment}))
        setAnimationSide('left');
        setIsComment(false);
        setTimeout(() => {
            setAnimationSide('right');
        }, 500)

    }


    return (
        <Card className={classes.post}>
            <CardHeader
                avatar={
                    loading ? (
                        <Skeleton animation="wave" variant="circle" width={40} height={40}/>
                    ) : (
                        <Avatar
                            alt="Ted talk"
                            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                        />
                    )
                }
                title={
                    loading ? (
                        <Skeleton animation="wave" height={10} width="80%" style={{marginBottom: 6}}/>
                    ) : (
                        'Ted'
                    )
                }
                subheader={loading ? <Skeleton animation="wave" height={10} width="40%"/> : '5 hours ago'}
            />
            {loading ? (
                <Skeleton animation="wave" variant="rect" className={classes.media}/>
            ) : (
                <div className={classes.media}>
                    <CardMedia
                        component={"img"}
                        title="Ted talk"
                        src="http://images.unsplash.com/photo-1430116267665-e7f6b3dafce3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
                        data-type={'post'}
                        data-info={id}
                    />
                </div>
            )}

            <CardContent>
                {loading ? (
                    <>
                        <Skeleton animation="wave" height={10} style={{marginBottom: 6}}/>
                        <Skeleton animation="wave" height={10} width="80%"/>
                    </>
                ) : (
                    <>
                        <PostIcons isLoading={isLoading} isComment={isComment} isLiked={isLiked} toggleLike={toggleLike}
                                   toggleComment={toggleComment}/>
                        <Likes likes={likes}/>
                        <PostComments comments={serverComments}/>
                        <Slide in={isComment} direction={animationSide} mountOnEnter
                               unmountOnExit>
                            <NewComment loadComment={loadComment} isLoading={isLoading}/>
                        </Slide>
                    </>
                )}
            </CardContent>
        </Card>
    )
}


export default Post;