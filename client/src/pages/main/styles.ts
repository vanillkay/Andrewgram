import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: 'auto',
    minHeight: '97vh',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '4rem',
  },
  main__posts: {
    width: '100%',
  },
  'main__profile-info': {
    width: '100%',
  },
  '@media (min-width: 600px)': {
    main: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    main__posts: {
      width: '40%',
      maxWidth: '700px',
    },
    'main__profile-info': {
      width: '20%',
      marginLeft: '2rem',
      position: 'sticky',
      top: 'calc(4rem + 10px)',
      minWidth: '300px',
    },
  },
}));
