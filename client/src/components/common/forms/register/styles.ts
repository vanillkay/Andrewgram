import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '60%',
    marginTop: '20px',
  },
  'form-actions': {
    width: '100%',
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  'form-title': {
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  form: {
    '& .MuiFormHelperText-root	': {
      fontSize: '1rem',
    },
  },
  'register-error': {
    // @ts-ignore
    color: theme.colors.error,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  'register-success': {
    // @ts-ignore
    color: theme.colors.success,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
}));
