import React, {useRef, useState} from 'react';
import {Backdrop, Button, Input, Modal, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

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
        position: 'relative',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '&:focus': {
            outline: 'none'
        }
    },
    'new-post__title': {
        marginBottom: '1rem',
        fontWeight: 'bold',
        fontSize: '1.5rem'
    },
    'new-post__close-btn': {
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem'
    },
    'new-post__info': {
        alignSelf: 'flex-start',
        width: '100%',
    },
    'new-post__load-btn': {
        marginTop: '1rem'
    },
    'new-post__input-file': {
        width: '100%',
        marginBottom: '2rem'
    },
    'new-post__input-title': {
        fontSize: '1.2rem',
        marginBottom: '1rem'
    },
    'new-post__error': {
        color: theme.colors.error,
        fontWeight: 'bold',
        marginTop: '1rem'
    }
}))

const NewPost = () => {
    const [isNewPost, setIsNewPost] = useState(false);

    const [newPostInfo, setNewPostInfo] = useState('');

    const [isError, setIsError] = useState(false)

    const handleInput = (e) => {
        setNewPostInfo(e.target.value);
    }

    const classes = useStyles();

    const fileInput = useRef();



    const handleOpen = () => {
        setIsNewPost(true)
    }

    const handleClose = () => {
        setIsNewPost(false)
    }

    const download = async () => {
        try{
            if (!fileInput.current.files[0]) {
                setIsError(true);
                return
            }
            if (isError) setIsError(false);

            let formData = new FormData()
            formData.append('avatar', fileInput.current.files[0]);
            formData.set('user', 'andrew');
            formData.set('info', newPostInfo);


            // console.log(formData);

            const res = await fetch('/post/new', {
                method: 'post',
                body: formData
            })

            const data = await res.json();

            if (data.post){
                setIsNewPost(false);
                setNewPostInfo('');
            }

        }catch (e) {

        }

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
                    <CloseIcon onClick={handleClose}
                               className={classes['new-post__close-btn']}/>
                    <div className={classes['new-post__title']}>Создание нового поста</div>
                    <div className={classes['new-post__input-title']}>Фото поста</div>
                    <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        className={classes['new-post__input-file']}
                        type="file"
                        name={'avatar'}
                        inputRef={fileInput}

                    />
                    <div className={classes['new-post__input-title']}>Информация о посте</div>
                    <TextField
                        className={classes['new-post__info']}
                        id="standard-textarea"
                        placeholder="Информация"
                        multiline
                        onChange={handleInput}
                        value={newPostInfo}
                    />
                    {isError && <div className={classes['new-post__error']}>Сначала загрузите фото</div>}
                    <Button className={classes['new-post__load-btn']} variant={'contained'} color={'primary'}
                            onClick={download}>загрузить</Button>
                </div>
            </Modal>
        </div>
    );
};

export default NewPost;