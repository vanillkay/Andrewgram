import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
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
    maxWidth: '200px',
    margin: '2rem auto 0',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
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
});
