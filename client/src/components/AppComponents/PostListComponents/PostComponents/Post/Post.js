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
import {Link} from "react-router-dom";
import {writeNewComment} from "../../../../../store/posts/actions";


const useStyles = makeStyles((theme) => ({
    post: {
        width: '100%',
        marginBottom: '2rem',
        border: '1px solid rgb(219, 219, 219)',
        borderRadius: '3px'
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
    'post-info':{
        margin: '1rem 0 0 1rem',
        '& a':{
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
            marginRight: '.3rem'
        }
    }
}));


const Post = (props) => {

    const {
        info,
        isUserPost = false,
        loading = false,
    } = props;

    const {isLiked, id, likes, text, comments, ownerLogin, avatar = ''} = info;


    const [isComment, setIsComment] = useState(false);

    const [animationSide, setAnimationSide] = useState('right');

    const [isLoading, setIsLoading] = useState(false);

    const classes = useStyles();

    const dispatch = useDispatch();

    const user = useSelector(getUserInfo)

    console.log(id)

    const toggleLike = () => {
        dispatch(postsActions.toggleLike(id, user.login, isUserPost));
    }


    const toggleComment = () => {
        setIsComment(prevState => !prevState);
    }

    const loadComment = (comment) => {
        dispatch(writeNewComment(id, {owner: user.login, comment}))
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
                            alt={text}
                            src={'/' + avatar}
                        />
                    )
                }
                title={
                    loading ? (
                        <Skeleton animation="wave" height={10} width="80%" style={{marginBottom: 6}}/>
                    ) : ownerLogin
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
                        src={'/' + info.imgSrc}
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
                        <div className={classes['post-info']}><Link  to={{pathname: '/profile/' + ownerLogin,
                            state: {
                                fromNotifications: false
                            }}}>{ownerLogin}</Link>{text}</div>
                        <PostComments comments={comments}/>
                        <Slide in={isComment} direction={animationSide} mountOnEnter
                               unmountOnExit>
                            <NewComment avatar={avatar} login={ownerLogin} loadComment={loadComment} isLoading={isLoading}/>
                        </Slide>
                    </>
                )}
            </CardContent>
        </Card>
    )
}


export default Post;