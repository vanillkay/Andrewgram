import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  comments: {
    marginLeft: '1rem',
  },
  'show-all-comment-btn': {
    marginTop: '5px',
    paddingLeft: 0,
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  comment: {
    '& a': {
      color: 'black',
      fontWeight: 'bold',
      marginRight: '0.5rem',
      textDecoration: 'none',
      transition: '.3s',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '&:last-of-type': {
      marginBottom: '0',
    },
  },
});
