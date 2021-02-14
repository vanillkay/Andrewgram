import React, {useState} from 'react';
import {Avatar, Button, CircularProgress, FormControl, Grid, Input, InputAdornment} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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
        marginTop: '0.5rem',
        flexWrap: 'wrap',
    },
    'new-comment-input': {
        padding: '1rem',
        boxSizing: 'border-box',
    },
    'comment-btn': {
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0)',
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
}))

const NewComment = React.forwardRef((props, forwardRef) => {

    const {isLoading, loadComment, avatar} = props;

    const [comment, setComment] = useState('');


    const handleCommentInput = (e) => {
        setComment(e.target.value);
    }

    const addComment = () => {
        loadComment(comment);
    }

    const classes = useStyles();
    return (
        <div className={classes['new-comment']} ref={forwardRef}>
            <Grid container className={classes['new-comment-field']} spacing={1}
                  alignItems="flex-end">
                <Grid item>
                    <Button disabled={isLoading} className={classes['comment-btn']} disableRipple
                            onClick={() => alert('hello')}>
                        <Avatar
                            alt="Avatar"
                            src={'/' + avatar}
                        />
                    </Button>
                </Grid>
                <Grid className={classes['new-comment-input']} item>
                    <FormControl fullWidth variant="outlined">
                        <Input
                            disabled={isLoading}
                            variant={'outlined'}
                            value={comment}
                            onChange={handleCommentInput}
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
    );
});

export default NewComment;