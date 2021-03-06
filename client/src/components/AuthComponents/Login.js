import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import {Button} from "@material-ui/core";
import {useHttp} from "../../hooks/http.hook";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authUser} from "../../store/user/actions";
import {setRecommended, setSubscriptions} from "../../store/subscribers/actions";


const useStyles = makeStyles((theme) => ({
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '60%',
        marginTop: '20px'
    },
    "form-actions": {
        width: '100%',
        maxWidth: '200px',
        margin: '2rem auto 0',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column'
    },
    "form-title": {
        textAlign: "center",
        fontSize: '1.5rem'
    },
    form: {
        '& .MuiFormHelperText-root	': {
            fontSize: '1rem'
        },
    },
    'login-error': {
        color: theme.colors.error,
        fontWeight: 'bold',
        textAlign: 'center'
    }
}));

const Login = (props) => {
    const [error, setError] = useState({login: false, password: false});
    const [errorText, setErrorText] = useState({login: "", password: ""});
    const [inputs, setInputs] = useState({login: "", password: ""});

    const [isServerError, setIsServerError] = useState(false);
    const [serverErrorText, setServerErrorText] = useState('')

    const {loading, request} = useHttp();

    const history = useHistory();

    const dispatch = useDispatch();

    const {setIsAppear} = props;


    const handleInputs = (e) => {
        if (error[e.target.name]) {
            setError(prevState => ({...prevState, [e.target.name]: false}))
            setErrorText(prevState => ({...prevState, [e.target.name]: ""}))
        }
        if (!e.target.value) {
            setError(prevState => ({...prevState, [e.target.name]: true}))
            setErrorText(prevState => ({...prevState, [e.target.name]: "?????????????? ????????????????"}))
        }
        return setInputs(prevInput => ({...prevInput, [e.target.name]: e.target.value}))
    }


    const handleForm = async (e) => {
        e.preventDefault();
        try {
            if (error.login || error.password) {
                if (!inputs.login || !inputs.password) {
                    return;
                }
            }
            let isValid = true;
            for (let value in inputs) {
                if (!inputs[value]) {
                    setError(prevState => ({
                        ...prevState, [value]: true,
                    }))
                    setErrorText(prevState => ({
                        ...prevState, [value]: '?????????????? ????????????????',
                    }))
                    isValid = false;
                }
            }

            if (!isValid) return;


            const user = await request('/auth/login', 'post', inputs);

            if (!user.userInfo) {
                throw new Error('???????????? ???????????????????????? ????????')
            } else {
                if (isServerError) {
                    setIsServerError(false);
                }
                setIsAppear(false);
                setTimeout(() => {
                    history.push('/app');
                }, 700)
            }

            dispatch(authUser(user));
            dispatch(setSubscriptions(user.userInfo.subscriptions));
            dispatch(setRecommended(user.userInfo.recommended));
        } catch (e) {
            if (e.message.toLowerCase().includes('????????????')) {
                setError(prevState => ({...prevState, password: true}))
            } else if (e.message.toLowerCase().includes('????????????????????????')) {
                setError(prevState => ({...prevState, login: true}))
            }
            setIsServerError(true);
            setServerErrorText(e.message);

        }
    }

    const forgotPasswordHandle = () => {
        setIsAppear(false);
        setTimeout(() => {
            history.push('/auth/reset');
        }, 700)
    }

    const classes = useStyles();
    return (
        <div>
            <div className={classes["form-title"]}>?????????????? ????????????</div>
            <form className={classes.form}>
                <div className={classes.inputs}>
                    <TextField
                        className={classes.input}
                        error={error.login}
                        id="filled-error-helper-text"
                        label="??????????"
                        onChange={handleInputs}
                        helperText={errorText.login}
                        variant="filled"
                        name={'login'}
                        value={inputs.login}
                    />
                    <TextField
                        className={classes.input}
                        error={error.password}
                        type='password'
                        id="filled-error-helper-text1"
                        label="????????????"
                        onChange={handleInputs}
                        helperText={errorText.password}
                        variant="filled"
                        name={'password'}
                        value={inputs.password}
                    />
                </div>
                {isServerError && <p className={classes['login-error']}>{serverErrorText}</p>}
                <div className={classes["form-actions"]}>
                    <Button onClick={handleForm} disabled={loading} type={'submit'} variant="contained" color="primary">
                        ??????????
                    </Button>
                    <Button onClick={forgotPasswordHandle} variant="contained" style={{marginTop: '20px'}} disabled={loading} color="primary">
                        ???????????? ????????????
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;