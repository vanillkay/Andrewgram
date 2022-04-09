import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  'forgot-form': {
    minWidth: '300px',
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'forgot-form__title': {
    marginBottom: '2rem',
  },
  'forgot-form__action': {
    marginTop: '1.5rem',
    minWidth: '200px',
  },
  'forgot-form__resp': {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '1.2rem',
  },
  'forgot-form__resp-success': {
    // @ts-ignore
    color: theme.colors.success,
  },
  'forgot-form__resp-error': {
    // @ts-ignore
    color: theme.colors.error,
  },
}));
