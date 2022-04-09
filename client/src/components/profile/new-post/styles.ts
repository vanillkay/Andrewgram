import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat',
  },
  'new-post': {
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
  'new-post__title': {
    marginBottom: '1rem',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  'new-post__close-btn': {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
  },
  'new-post__info': {
    alignSelf: 'flex-start',
    width: '100%',
  },
  'new-post__load-btn': {
    marginTop: '1rem',
  },
  'new-post__input-file': {
    width: '100%',
    marginBottom: '2rem',
  },
  'new-post__input-title': {
    fontSize: '1.2rem',
    marginBottom: '1rem',
  },
  'new-post__error': {
    // @ts-ignore
    color: theme.colors.error,
    fontWeight: 'bold',
    marginTop: '1rem',
  },
}));
