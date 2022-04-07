import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  'auth-page': {
    margin: '0 auto',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'auth-page__auth-block': {
    width: '100%',
    maxWidth: '700px',
    boxSizing: 'border-box',
    borderRadius: '20px',
    paddingTop: '3rem',
  },
});
