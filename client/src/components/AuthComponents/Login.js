import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import {Button} from "@material-ui/core";
import {checkFieldValue} from './authUtils/validators';


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
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    "form-title": {
        textAlign: "center",
        fontSize: '1.5rem'
    },
    form: {
        '& .MuiFormHelperText-root	': {
            fontSize: '1rem'
        },
    }
}));

const Login = () => {
    const [error, setError] = useState({login: false, password: false});
    const [errorText, setErrorText] = useState({login: "", password: ""});
    const [inputs, setInputs] = useState({login: "", password: ""});
    const [isLogin, setIsLogin] = useState(false);



    const handleInputs = (e) => {
        if (e.target.name === 'login') {
            checkFieldValue(e.target, 5, 'Минимальная длина 5 символов', setError, setErrorText);
        }
        if (e.target.name === 'password') {
            checkFieldValue(e.target, 7, 'Минимальная длина 7 символов', setError, setErrorText);
        }
        return setInputs(prevInput => ({...prevInput, [e.target.name]: e.target.value}))
    }


    const handleForm = (e) => {
        e.preventDefault();
        if (error.login || error.password){
            return;
        }
        const loginCheck = checkFieldValue({name: 'login', value: inputs.login}, 5, "Введите логин", setError, setErrorText);
        const passwordCheck = checkFieldValue({name: 'password', value: inputs.password}, 7, "Введите пароль", setError, setErrorText);
        if (loginCheck || passwordCheck) {
            return
        }
        console.log(error);
        console.log(inputs)
    }


    const classes = useStyles();
    return (
        <div>
            <div className={classes["form-title"]}>Введите данные</div>
            <form className={classes.form}>
                <div className={classes.inputs}>
                    <TextField
                        className={classes.input}
                        error={error.login}
                        id="filled-error-helper-text"
                        label="Логин"
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
                        label="Пароль"
                        onChange={handleInputs}
                        helperText={errorText.password}
                        variant="filled"
                        name={'password'}
                        value={inputs.password}
                    />
                </div>
                <div className={classes["form-actions"]}>
                    <Button onClick={handleForm} disabled={isLogin} type={'submit'} variant="contained" color="primary">
                        Войти
                    </Button>
                    <Button variant="contained" disabled={isLogin} color="primary">
                        Забыли пароль
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;