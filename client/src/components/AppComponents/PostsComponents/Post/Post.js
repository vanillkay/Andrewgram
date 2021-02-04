import React, {useEffect, useState} from 'react';
import {Skeleton} from "@material-ui/lab";
import {
    Avatar, Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia, CircularProgress, FormControl,
    Grid,
    IconButton, Input, InputAdornment,
    makeStyles, Slide,
} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PostComments from "../PostComments/PostComments";


const useStyles = makeStyles((theme) => ({
    post: {
        width: '100%',
        marginBottom: '2rem'
    },
    media: {
        minHeight: '300px',
        height: 'auto',
        '& img': {
            width: '100%',
            height: 'auto',
        }
    },
    like: {},
    'like-active': {
        color: theme.colors.like,

    },
    'new-comment': {
        position: 'relative'
    },
    'new-comment-loader': {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    'new-comment-field': {
        marginTop: '0.5rem',
        flexWrap: 'wrap',
    },
    'new-comment-input': {
        padding: '1rem',
        boxSizing: 'border-box',
    },
    'comment-btn': {
        '&:hover': {
            backgroundColor: 'white'
        }
    },
    '@media (min-width: 600px)': {
        'new-comment-input': {
            width: '100%',
            boxSizing: 'border-box',
            marginLeft: '0.5rem'
        },
        'new-comment-field': {
            flexWrap: 'nowrap',
        }
    }
}));


const Post = (props) => {

    const {
        liked = false,
        howManyLikes = 0,
        serverComments =
            [
                {owner: 'vadim', comment: 'ti pidor'},
                {owner: 'oleg', comment: 'ya pidor?'},
                {owner: 'vova', comment: 'a mozhet ti pidor?'}
            ],
        loading = false,
        id
    } = props;



    const [isComment, setIsComment] = useState(false);

    const [comments, setComments] = useState(serverComments);

    const [isLoading, setIsLoading] = useState(false);

    const classes = useStyles();

    const toggleLike = () => {

    }

    const toggleComment = () => {
        setIsComment(prevState => !prevState);
    }

    const addComment = () => {
        setIsLoading(true);
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
                        src="https://cdn.auth0.com/blog/react-js/react.png"
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
                        <IconButton disabled={isLoading} onClick={toggleLike} aria-label="add to favorites">
                            {liked ? <FavoriteIcon className={classes['like-active']}/> :
                                <FavoriteBorderOutlinedIcon className={classes.like}/>}
                        </IconButton>
                        <IconButton disabled={isLoading} onClick={toggleComment} aria-label="add comment">
                            {isComment ? <ChatBubbleIcon color={'action'}/> : <ChatBubbleOutlineOutlinedIcon/>}
                        </IconButton>
                        <PostComments comments={serverComments}/>
                        <Slide in={isComment} direction={'right'} mountOnEnter={true}
                               unmountOnExit={true}>
                            <div className={classes['new-comment']}>
                                <Grid container className={classes['new-comment-field']} spacing={1}
                                      alignItems="flex-end">
                                    <Grid item>
                                        <Button disabled={isLoading} className={classes['comment-btn']} disableRipple
                                                onClick={() => alert('hello')}>
                                            <Avatar
                                                alt="Ted talk"
                                                src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                                            />
                                        </Button>
                                    </Grid>
                                    <Grid className={classes['new-comment-input']} item>
                                        <FormControl fullWidth variant="outlined">
                                            <Input
                                                disabled={isLoading}
                                                variant={'outlined'}
                                                multiline
                                                style={{width: '100%'}}
                                                id="filled-adornment-password"
                                                placeholder="Добавьте комментарий..."
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <Button disabled={isLoading} onClick={addComment}
                                                                className={classes['comment-btn']}
                                                                disableRipple>Опубликовать</Button>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                    </Grid>
                                </Grid>
                                {isLoading && <div className={classes['new-comment-loader']}><CircularProgress/></div>}
                            </div>
                        </Slide>
                    </>
                )}
            </CardContent>
        </Card>
    );
}


export default Post;