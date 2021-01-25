import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useHttp} from "../../hooks/http.hook";

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
        justifyContent: 'center'
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
const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



const Register = () => {
    const [errors, setErrors] = useState({login: false, password: false, name: false, email: false, rePassword: false});
    const [errorText, setErrorText] = useState({login: "", password: "", name: "", email: "", rePassword: ""});
    const [inputs, setInputs] = useState({login: "", password: "", name: "", email: "",  rePassword: ""});

    const {loading, request} = useHttp();

    const checkFieldValue = (field, min, error) => {

        if (field.value.length < min) {
            setErrors(prevState => ({...prevState, [field.name]: true}));
            setErrorText(prevState => ({...prevState, [field.name]: error}))
            return true;
        } else if (field.value.length >= min) {
            setErrors(prevState => ({...prevState, [field.name]: false}));
            setErrorText(prevState => ({...prevState, [field.name]: ''}))
            return false;
        }
    }

    const handleInputs = (e) => {
        if (e.target.name === 'login') {
            checkFieldValue(e.target, 5, 'Минимальная длина 5 символов', setErrors, setErrorText);
        }
        if (e.target.name === 'password') {
            checkFieldValue(e.target, 7, 'Минимальная длина 7 символов', setErrors, setErrorText);
        }
        if (e.target.name === 'email'){
            if (!validateEmail(e.target.value)){
                setErrors(prevState => ({...prevState, email: true}));
                setErrorText(prevState => ({...prevState, email: 'Введите правильный email'}))
            }else {
                setErrors(prevState => ({...prevState, email: false}));
                setErrorText(prevState => ({...prevState, email: ''}))
            }
        }
        if (e.target.name === 'rePassword') {
            if (e.target.value !== inputs.password) {
                setErrors(prevState => ({...prevState, rePassword: true}));
                setErrorText(prevState => ({...prevState, rePassword: 'Пароли не совпадают'}))
            } else if (errors.rePassword) {
                setErrors(prevState => ({...prevState, rePassword: false}));
                setErrorText(prevState => ({...prevState, rePassword: ''}))
            }
        }
        return setInputs(prevInput => ({...prevInput, [e.target.name]: e.target.value}))
    }


    const handleForm = async (e) => {
        e.preventDefault();
        try{
            let isValid = true;
            for (let value in inputs) {
                if (value === 'name') continue;
                if (!inputs[value]) {
                    isValid = false;
                    setErrors(prevState => ({...prevState, [value]: true}))
                    setErrorText(prevState => ({...prevState, [value]: "Введите значение"}))
                }
            }
            if (!isValid) return;
            for (let error in errors) {
                if (error === 'name') continue;
                if (errors[error]) return;
            }

            const userInputs = {...inputs};

            delete userInputs.rePassword;

            const userValues = {...userInputs};


            const data = await request('/auth/register', 'post', userValues);
            console.log(data);
        }catch (e) {
            console.log(e);
        }
    }


    const classes = useStyles();
    return (
        <div>
            <div className={classes["form-title"]}>Введите данные</div>
            <form className={classes.form}>
                <div className={classes.inputs}>
                    <TextField
                        className={classes.input}
                        error={errors.login}
                        id="filled-error-helper-text2"
                        label="Логин"
                        onChange={handleInputs}
                        helperText={errorText.login}
                        variant="filled"
                        name={'login'}
                        value={inputs.login}
                    />
                    <TextField
                        className={classes.input}
                        error={errors.name}
                        id="filled-error-helper-text5"
                        label="Имя"
                        onChange={handleInputs}
                        helperText={errorText.name}
                        variant="filled"
                        name={'name'}
                        value={inputs.name}
                    />
                    <TextField
                        className={classes.input}
                        error={errors.email}
                        id="filled-error-helper-text6"
                        label="Email"
                        onChange={handleInputs}
                        helperText={errorText.email}
                        variant="filled"
                        name={'email'}
                        value={inputs.email}
                    />
                    <TextField
                        className={classes.input}
                        error={errors.password}
                        type='password'
                        id="filled-error-helper-text3"
                        label="Пароль"
                        onChange={handleInputs}
                        helperText={errorText.password}
                        variant="filled"
                        name={'password'}
                        value={inputs.password}
                    />
                    <TextField
                        className={classes.input}
                        error={errors.rePassword}
                        type='password'
                        id="filled-error-helper-text4"
                        label="Пароль ещё раз"
                        onChange={handleInputs}
                        helperText={errorText.rePassword}
                        variant="filled"
                        name={'rePassword'}
                        value={inputs.rePassword}
                    />
                </div>
                <div className={classes["form-actions"]}>
                    <Button onClick={handleForm} disabled={loading} type={'submit'} variant="contained" color="primary">
                        Зарегестривароваться
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Register;