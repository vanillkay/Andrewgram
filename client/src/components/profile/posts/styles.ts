import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  profile__posts: {
    display: 'grid',
    marginTop: '2rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gridColumnGap: '2rem',
    gridRowGap: '2rem',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'scroll',
    width: '100vw',
  },
  'profile__modal-post': {
    width: '80%',
    height: 'auto',
    outline: 'none',
    position: 'absolute',
    top: '1rem',
    padding: '1rem 0',
  },
  'profile__posts-exist': {
    textAlign: 'center',
    marginTop: '2rem',
    fontWeight: 'bold',
    fontSize: '2rem',
    gridColumnStart: 1,
    gridColumnEnd: 5,
    gridRowStart: 2,
    gridRowEnd: 3,
  },
  '@media (min-width: 600px)': {
    profile__posts: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(2, 1fr)',
    },
    'profile__modal-post': {
      width: '50%',
      height: 'auto',
      outline: 'none',
      position: 'relative',
    },
  },
});
