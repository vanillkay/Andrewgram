import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  'reset-form': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: '0 auto',
  },
  'reset-form__input': {
    marginBottom: '1rem',
    minWidth: '250px',
  },
  'reset-form__title': {
    marginBottom: '2rem',
  },
  'reset-form__action': {
    marginTop: '2rem',
  },
  'reset-form__resp': {
    fontSize: '1.2rem',
  },
  'reset-form__resp-success': {
    // @ts-ignore
    color: theme.colors.success,
  },
  'reset-form__resp-error': {
    // @ts-ignore
    color: theme.colors.error,
  },
}));
