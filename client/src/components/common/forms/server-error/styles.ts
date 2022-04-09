import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  'register-error': {
    // @ts-ignore
    color: theme.colors.error,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));
