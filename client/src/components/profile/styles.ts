import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  'profile-info': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  'profile-loading': {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    '& span:last-of-type': {
      marginTop: '1rem',
    },
  },
  '@media (min-width: 600px)': {
    'profile-info': {
      paddingLeft: '10rem',
      flexDirection: 'column',
    },
    'profile-loading': {
      flexDirection: 'row',
      '& span:last-of-type': {
        marginTop: 0,
      },
    },
  },
});
