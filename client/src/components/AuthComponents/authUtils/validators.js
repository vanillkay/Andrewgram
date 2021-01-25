export const checkFieldValue = (field, min, error, setError, setErrorText) => {

    if (field.value.length < min) {
        setError(prevState => ({...prevState, [field.name]: true}));
        setErrorText(prevState => ({...prevState, [field.name]: error}))
        return true;
    } else if (field.value.length >= min) {
        setError(prevState => ({...prevState, [field.name]: false}));
        setErrorText(prevState => ({...prevState, [field.name]: ''}))
        return false;
    }
}