import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Collapse} from "@material-ui/core";

const useStyles = makeStyles(theme => ({

    comments: {
        marginLeft: '1rem'
    },
    'show-all-comment-btn': {
        marginTop: '5px',
        paddingLeft: 0,
        '&:hover': {
            backgroundColor: 'white'
        }
    },
    comment: {
        '& a': {
            color: 'black',
            fontWeight: 'bold',
            marginRight: '0.5rem',
            textDecoration: 'none',
            transition: '.3s',
            '&:hover':{
                textDecoration: 'underline'
            }
        },
        '&:last-of-type':{
            marginBottom: '0'
        }
    },
}))

const PostComments = (props) => {
    const {comments} = props;

    const [isAllComments, setIsAllComments] = useState(false);

    const classes = useStyles();

    return (
        <div className={classes.comments}>
            {
                comments.length > 1 ?
                    (
                        <>
                            <p className={classes.comment}>
                                <a href={'/' + comments[0].owner}>{comments[0].owner}</a>
                                <span>{comments[0].comment}</span>
                            </p>
                            <Collapse mountOnEnter unmountOnExit in={isAllComments}>
                                {
                                    comments.map((item, index) => {
                                        if (!index) return;
                                        return (<p key={item.owner} className={classes.comment}>
                                            <a href={'/' + item.owner}>{item.owner}</a>
                                            <span>{item.comment}</span>
                                        </p>)

                                    })
                                }
                            </Collapse>
                            <Button
                                disableRipple
                                className={classes['show-all-comment-btn']}
                                onClick={() => setIsAllComments(prevState => !prevState)}>
                                {isAllComments ? 'Скрыть' : `Показать больше (${comments.length - 1 })`}
                            </Button>

                        </>
                    ) :

                    (comments.map(item =>
                        <p key={item.owner} className={classes.comment}>
                            <a href="#">{item.owner}</a>
                            <span>{item.comment}</span>
                        </p>))
            }
        </div>
    );
};

export default PostComments;