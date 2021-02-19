import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Fade, Modal, Backdrop} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    likes: {
        margin: '0 0 0 1rem',
        fontWeight: 'bold',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    'all-likes': {
        minWidth: '250px',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        padding: '1rem 0',
        '&:focus': {
            outline: 'none'
        }
    },
    'all-likes__list': {
        maxHeight: '12rem',
        overflowX: 'hidden',
        padding: '0 2rem'
    },
    'all-likes__title': {
        textAlign: 'center',
        fontWeight: 'bold',
        position: 'sticky',
        paddingBottom: '1rem',
        top: 0,
        borderBottom: '2px solid black'
    },
    'all-likes__close-btn': {
        position: 'absolute',
        top: 0,
        right: '1rem',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    '@media (min-width: 600px)': {
        'all-likes': {
            minWidth: '400px'
        }
    }
}))


const Likes = (props) => {

    const {likes} = props;

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <p onClick={handleOpen} className={classes.likes}>{likes.length} отметок "Нравится"</p>
            <Modal
                disableAutoFocus
                disableEnforceFocus
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes['all-likes']}>
                        <div className={classes['all-likes__title']}>Отметки "Нравится"
                            <CloseIcon onClick={handleClose}
                                       className={classes['all-likes__close-btn']}/>
                        </div>
                        <div className={classes['all-likes__list']}>
                            {likes.map((item, index) => <Link style={{
                                textDecoration: 'none',
                                marginTop: '1rem',
                                display: 'block',
                                fontWeight: 'bold',
                                color: 'inherit'
                            }} key={index} to={'/profile/' + item.owner}>{item.owner}</Link>)}
                            {!likes.length && <div>Лайков пока что нет</div>}
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default Likes;