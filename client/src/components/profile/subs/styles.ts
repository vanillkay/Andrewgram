import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  'profile__subs-title': {
    marginTop: '1rem',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'all-subs': {
    minWidth: '250px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: '1rem 0',
    position: 'relative',
    '&:focus': {
      outline: 'none',
    },
  },
  'all-subs__list': {
    maxHeight: '12rem',
    overflowX: 'hidden',
    padding: '0 2rem',
  },
  'all-subs__list-item': {
    display: 'flex',
    margin: '1rem 0',
    alignItems: 'center',
  },
  'all-subs__title': {
    textAlign: 'center',
    fontWeight: 'bold',
    position: 'relative',
    paddingBottom: '1rem',
    top: 0,
    borderBottom: '2px solid black',
  },
  'all-subs__close-btn': {
    position: 'absolute',
    top: '-3px',
    right: '1rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  'all-subs__item-avatar': {
    width: '3rem',
    height: '3rem',
  },
  'all-subs__list-empty': {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  '@media (min-width: 600px)': {
    'profile__subs-title': {
      marginTop: 0,
    },
    'all-subs': {
      minWidth: '400px',
    },
  },
}));
