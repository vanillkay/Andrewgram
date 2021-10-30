import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { isModal: boolean }>(() => ({
  post: {
    width: '100%',
    marginBottom: (props) => (props.isModal ? '' : '2rem'),
    border: '1px solid rgb(219, 219, 219)',
    borderRadius: '3px',
  },
  post__profile__name: {
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  media: {
    minHeight: '60vh',
    maxHeight: '60vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  'post-info': {
    margin: '1rem 0 0 1rem',
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
      fontWeight: 'bold',
      marginRight: '.3rem',
    },
  },
  'post-line': {
    height: '3px',
    margin: '1rem 0 1rem 1rem',
    backgroundColor: 'rgb(219, 219, 219)',
  },
}));
