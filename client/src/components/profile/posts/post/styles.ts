import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  'profile-post': {
    height: '10rem',
    overflowY: 'hidden',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover $profile-post__hover': {
      visibility: 'visible',
    },
  },
  'profile-post__img': {
    width: '100%',
    height: 'auto',
  },
  'profile-post__hover': {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0, .5)',
    color: 'white',
    fontSize: '1.5rem',
    transition: '.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    visibility: 'hidden',
  },
  'profile-post__icons-prev': {
    width: '2rem',
    height: '2rem',
    color: 'white',
    display: 'flex',
    marginRight: '3px',
    '&:last-child': {
      marginLeft: '1rem',
    },
  },
  '@media (min-width: 600px)': {
    'profile-post': {
      height: '20rem',
    },
  },
});
