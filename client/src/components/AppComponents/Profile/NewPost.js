import React, {useRef, useState} from 'react';
import {Backdrop, Button, Input, Modal} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Montserrat',

    },
    'new-post': {
        fontFamily: 'Montserrat',
        minWidth: '500px',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        padding: '3rem',
        '&:focus': {
            outline: 'none'
        }
    },
    'new-post__title': {
        marginBottom: '1rem'
    }
}))

const NewPost = () => {
    const [isNewPost, setIsNewPost] = useState(false);

    const classes = useStyles();

    const fileInput = useRef();

    const handleOpen = () => {
        setIsNewPost(true)
    }

    const handleClose = () => {
        setIsNewPost(false)
    }

    const download = () => {
        let formData = new FormData()
        formData.append('avatar', fileInput.current.files[0]);

        console.log(fileInput.current.files[0])
        console.log(formData);

        fetch('/post/new', {
            method: 'post',
            body: formData
        }).then(res =>res.json())
            .then(data => console.log(data))
        // console.log(fileInput.current.files)
    }

    return (
        <div style={{textAlign: 'center', marginTop: '1rem'}}>
            <Button onClick={handleOpen}>Создать пост</Button>
            <Modal
                disableAutoFocus
                disableEnforceFocus
                className={classes.modal}
                open={isNewPost}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}>
                <div className={classes['new-post']}>
                    <div className={classes['new-post__title']}>Создание нового поста</div>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        name={'avatar'}
                        ref={fileInput}
                    />
                    <Button onClick={download}>загрузить</Button>
                </div>
            </Modal>
        </div>
    );
};

export default NewPost;