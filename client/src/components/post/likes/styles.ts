import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  likes: {
    margin: '0 0 0 1rem',
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
  'all-likes': {
    minWidth: '250px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: '1rem 0',
    '&:focus': {
      outline: 'none',
    },
  },
  'all-likes__list': {
    maxHeight: '12rem',
    overflowX: 'hidden',
    padding: '0 2rem',
  },
  'all-likes__title': {
    textAlign: 'center',
    fontWeight: 'bold',
    position: 'sticky',
    paddingBottom: '1rem',
    top: 0,
    borderBottom: '2px solid black',
  },
  'all-likes__close-btn': {
    position: 'absolute',
    top: 0,
    right: '1rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  'all-likes__no-likes': {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  '@media (min-width: 600px)': {
    'all-likes': {
      minWidth: '400px',
    },
  },
}));
