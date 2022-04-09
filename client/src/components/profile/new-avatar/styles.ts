import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat',
  },
  'new-avatar': {
    fontFamily: 'Montserrat',
    minWidth: '500px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    position: 'relative',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '&:focus': {
      outline: 'none',
    },
  },
  'new-avatar__file-error': {
    marginTop: '1rem',
    textAlign: 'center',
    // @ts-ignore
    color: theme.colors.error,
    fontWeight: 'bold',
  },
  'new-avatar__load-btn': {
    marginTop: '2rem',
  },
}));
