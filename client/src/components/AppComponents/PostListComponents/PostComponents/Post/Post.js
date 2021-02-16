import React, {useEffect, useState} from 'react';
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
import {Link} from "react-router-dom";
import {toggleLoadingLike, toggleLoadingPost, writeNewComment} from "../../../../../store/posts/actions";
import {useHttp} from "../../../../../hooks/http.hook";


const useStyles = makeStyles((theme, props) => ({
    post: {
        width: '100%',
        marginBottom: props => props.isModal === true ? '' : '2rem',
        border: '1px solid rgb(219, 219, 219)',
        borderRadius: '3px'
    },
    'post__profile__name': {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    media: {
        maxHeight: '60vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': {
            width: '100%',
            height: '100%',
        }
    },
    'post-info': {
        margin: '1rem 0 0 1rem',
        '& a': {
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
            marginRight: '.3rem'
        }
    },
    'post-line': {
        height: '3px',
        // width: '50%',
        margin: '1rem 0 1rem 1rem',
        backgroundColor: 'rgb(219, 219, 219)'
    }
}));


const Post = (props) => {

    const {
        setModalInfo,
        handleClose,
        info,
        isUserPost = false,
        loadingPost = false,
    } = props;

    const {isLiked, id, imgSrc, likes, text, comments, ownerLogin, avatar = ''} = info;


    const [isComment, setIsComment] = useState(false);

    const [animationSide, setAnimationSide] = useState('right');

    const [isLoading, setIsLoading] = useState(false);

    const classes = useStyles({isModal: !!setModalInfo});

    const dispatch = useDispatch();

    const user = useSelector(getUserInfo);

    const {request} = useHttp()


    const toggleLike = () => {
        dispatch(toggleLoadingLike());
        request('/post/like', 'post', {id, likerLogin: user.login})
            .then(res => {
                if (isUserPost) setModalInfo(prevState => ({...prevState, isLiked: !prevState.isLiked}))
                dispatch(postsActions.toggleLike(id, user.login, isUserPost));
            })
            .finally(() => dispatch(toggleLoadingLike()))
    }


    const toggleComment = () => {
        setIsComment(prevState => !prevState);
    }

    const loadComment = (comment) => {
        dispatch(toggleLoadingPost())
        request('/post/comment', 'post', {id, owner: user.login, comment})
            .then(res => {
                dispatch(writeNewComment(isUserPost, id, {...res.comment}))
                setAnimationSide('left');
                setIsComment(false);
                setTimeout(() => {
                    setAnimationSide('right');
                }, 500)
            }).finally(() => dispatch(toggleLoadingPost()))

    }


    const toggleLikePost = e => {
        const targetData = e.target.dataset;
        if (targetData.type === 'post' && targetData.info) {
            toggleLike()
        }
    }

    useEffect(() => {
        if (isUserPost) {
            document.addEventListener('dblclick', toggleLikePost);
            return () => {
                document.removeEventListener('dblclick', toggleLikePost);
            }
        }
    }, [])


    return (
        <Card className={classes.post}>
            <CardHeader
                avatar={
                    loadingPost ? (
                        <Skeleton animation="wave" variant="circle" width={40} height={40}/>
                    ) : (
                        <Avatar
                            alt={text}
                            src={'/' + avatar}
                        />
                    )
                }
                title={
                    loadingPost ? (
                        <Skeleton animation="wave" height={10} width="80%" style={{marginBottom: 6}}/>
                    ) : <Link className={classes['post__profile__name']} to={'/profile/' + ownerLogin}>
                        {ownerLogin}
                    </Link>
                }
                // subheader={loadingPost ? <Skeleton animation="wave" height={10} width="40%"/> : '5 hours ago'}
            />
            {loadingPost ? (
                <Skeleton animation="wave" variant="rect" className={classes.media}/>
            ) : (
                <div className={classes.media}>
                    <CardMedia
                        component={"img"}
                        title="Ted talk"
                        src={'/' + imgSrc}
                        data-type={'post'}
                        data-info={id}
                    />
                </div>
            )}

            <CardContent>
                {loadingPost ? (
                    <>
                        <Skeleton animation="wave" height={10} style={{marginBottom: 6}}/>
                        <Skeleton animation="wave" height={10} width="80%"/>
                    </>
                ) : (
                    <>
                        <PostIcons isLoading={isLoading} isComment={isComment} isLiked={isLiked} toggleLike={toggleLike}
                                   toggleComment={toggleComment}/>
                        <Likes likes={likes}/>
                        <div className={classes['post-info']}><Link to={{
                            pathname: '/profile/' + ownerLogin,
                            state: {
                                fromNotifications: false
                            }
                        }}>{ownerLogin}</Link>{text}</div>
                        <div className={classes['post-line']}/>
                        <PostComments comments={comments}/>
                        <Slide in={isComment} direction={animationSide} mountOnEnter
                               unmountOnExit>
                            <NewComment avatar={user.avatar} login={ownerLogin} loadComment={loadComment}
                                        isLoading={isLoading}/>
                        </Slide>
                    </>
                )}
            </CardContent>
        </Card>
    )
};


export default Post;