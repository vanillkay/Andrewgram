import React, {useState} from 'react';
import {Avatar, Button, CircularProgress, FormControl, Grid, Input, InputAdornment} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {getPostCommentLoading} from "../../../../store/posts/selectors";

const useStyles = makeStyles(theme => ({
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
        marginTop: '1rem',
        flexWrap: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    'new-comment-input': {
        padding: '1rem',
        boxSizing: 'border-box',
    },
    'comment-btn': {
        fontSize: '.7rem',
        wordWrap: 'break-word',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0)',
        }
    },
    'comment-error': {
        color: theme.colors.error,
        textAlign: 'center',
        marginTop: '1rem'
    },
    '@media (min-width: 600px)': {
        'new-comment-input': {
            width: '100%',
            boxSizing: 'border-box',
            marginLeft: '0.5rem'
        },
        'new-comment-field': {
            flexWrap: 'nowrap',
        },
        'comment-btn': {
            fontSize: '.8rem',
        }
    }
}))

const NewComment = React.forwardRef((props, forwardRef) => {

    const {loadComment, avatar} = props;

    const [comment, setComment] = useState('');


    const [isError, setIsError] = useState(false);


    const handleCommentInput = (e) => {
        if (isError) setIsError(false)
        setComment(e.target.value);
    }

    const addComment = () => {
        if (!!!comment.length) {
            setIsError(true);
            return;
        }
        loadComment(comment);
    }

    const isComLoading = useSelector(getPostCommentLoading);

    const classes = useStyles();
    return (
        <div className={classes['new-comment']} ref={forwardRef}>
            <Grid container className={classes['new-comment-field']} spacing={1}
                  alignItems="flex-end">
                <Grid item>
                    <Avatar
                        alt="Avatar"
                        src={'/' + avatar}
                    />
                </Grid>
                <Grid className={classes['new-comment-input']} item>
                    <FormControl fullWidth variant="outlined">
                        <Input
                            disabled={isComLoading}
                            variant={'outlined'}
                            value={comment}
                            onChange={handleCommentInput}
                            multiline
                            style={{width: '100%'}}
                            id="filled-adornment-password"
                            placeholder=""
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button disabled={isComLoading} onClick={addComment}
                                            className={classes['comment-btn']}
                                            disableRipple>Опубликовать</Button>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {isError && <div className={classes['comment-error']}>Введите сначала комментарий</div>}
                </Grid>
                <Grid item>
                </Grid>
            </Grid>
            {isComLoading && <div className={classes['new-comment-loader']}><CircularProgress/></div>}
        </div>
    );
});

export default NewComment;