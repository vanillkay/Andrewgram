import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import {Button} from "@material-ui/core";
import {useHttp} from "../../hooks/http.hook";
import {useHistory} from "react-router-dom";


const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const useStyles = makeStyles(theme => ({
    'forgot-form': {
        minWidth: '300px',
        maxWidth: '500px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    'forgot-form__title': {
        marginBottom: '2rem'
    },
    'forgot-form__action': {
        marginTop: '1.5rem',
        minWidth: '200px'
    },
    'forgot-form__resp': {
        marginTop: '1rem',
        textAlign: 'center'

    },
    'forgot-form__resp-success': {
        color: theme.colors.success,
        fontSize: '1.2rem'
    },
    'forgot-form__resp-error': {
        color: theme.colors.error
    }
}));

const ForgotPassword = (props) => {

    const {setIsAppear} = props;

    const [email, setEmail] = useState('');
    const [inputError, setInputError] = useState(false);
    const [inputErrorText, setInputErrorText] = useState('');
    const [response, setResponse] = useState({ready: false, success: false});
    const {loading, request} = useHttp();
    const classes = useStyles();
    const history = useHistory();


    const handleInput = (e) => {
        if (inputError) {
            setInputErrorText('');
            setInputError(false);
        }
        setEmail(e.target.value);
    }

    const handleForm = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setInputError(true);
            setInputErrorText('Введите корректный email');
            return;
        } else {
            if (inputError) {
                setInputErrorText('');
                setInputError(false);
            }
            const resp = await request('/auth/reset', 'post', {email});
            if (resp.success) {
                setEmail('');
                setResponse({ready: true, success: true});
            } else {
                setResponse({ready: true, success: false});
            }
            console.log(resp);
        }
    };

    const goAuth = () => {
        setIsAppear(false);
        setTimeout(() => {
            history.push('/auth')
        }, 500);
    }


    return (
        <form className={classes["forgot-form"]}>
            <div className={classes['forgot-form__title']}>Введите ваш email</div>
            <TextField
                error={inputError}
                id="filled-error-helper-text9"
                label="Email"
                onChange={handleInput}
                helperText={inputErrorText}
                variant="filled"
                name={'email'}
                value={email}
            />
            <div className={classes["forgot-form__resp"]}>
                {response.ready && (response.success ?
                    <div className={classes['forgot-form__resp-success']}>На вашу почту отправлено письмо с
                        инструкцией. Если письма нету – проверьте спам</div> :
                    <div className={classes['forgot-form__resp-error']}>Что-то пошло не так, повторите попытку
                        позже</div>)}
            </div>
            <Button onClick={handleForm} className={classes['forgot-form__action']} disabled={loading}
                    type={'submit'} variant="contained"
                    color="primary">
                Отправить письмо
            </Button>
            <Button onClick={goAuth} className={classes['forgot-form__action']} disabled={loading}
                    variant="contained"
                    color="primary">
                Авторизоваться
            </Button>
        </form>
    );
};

export default ForgotPassword;