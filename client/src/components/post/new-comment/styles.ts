import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  'new-comment': {
    position: 'relative',
  },
  'new-comment-loader': {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'new-comment-field': {
    marginTop: '1rem',
    flexWrap: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'new-comment-input': {
    padding: '1rem',
    boxSizing: 'border-box',
  },
  'comment-btn': {
    fontSize: '.7rem',
    wordWrap: 'break-word',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0)',
    },
  },
  'comment-error': {
    //TODO FIx problems with theme
    // @ts-ignore
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: '1rem',
  },
  '@media (min-width: 600px)': {
    'new-comment-input': {
      width: '100%',
      boxSizing: 'border-box',
      marginLeft: '0.5rem',
    },
    'new-comment-field': {
      flexWrap: 'nowrap',
    },
    'comment-btn': {
      fontSize: '.8rem',
    },
  },
}));
