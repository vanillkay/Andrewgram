import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<
  Theme,
  { isPage: boolean; isList: boolean; type: 'subscription' | 'recommended' }
>((theme) => ({
  profile: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: (props) => (props.isPage ? 'column' : 'row'),
    justifyContent: 'space-between',
    width: '100%',
    marginTop: (props) => (props.isList ? '1rem' : ''),
  },
  profile__info: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
  },
  profile__avatar: {
    width: '4rem',
    height: '4rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  profile__name: {
    marginLeft: '1rem',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  'profile__sbsc-btn': {
    fontSize: '1rem',
    marginRight: '.5rem',
    textTransform: 'none', // @ts-ignore
    color: (props) => (props.type === 'subscription' ? '' : theme.colors.main),
    '&:hover': {
      background: 'none',
    },
  },
  'profile__logout-btn': {
    minWidth: '5rem',
    minHeight: '2rem',
    marginTop: '1rem',
  },
  'profile__subs-list': {
    marginTop: '1rem',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  '@media (min-width: 600px)': {
    profile: {
      flexDirection: () => 'row',
    },
    'profile__logout-btn': {
      marginTop: '0',
    },
    'profile__sbsc-btn': {
      fontSize: '.8rem',
    },
    'profile__subs-list': {
      marginTop: 0,
    },
  },
}));
