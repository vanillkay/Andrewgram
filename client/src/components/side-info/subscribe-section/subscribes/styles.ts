import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { type: 'recommended' | string }>({
  'subscribe-section': {
    marginTop: ({ type }) => (type === 'recommended' ? '2rem' : 0),
    border: '1px solid rgb(219, 219, 219)',
    backgroundColor: '2px solid black',
    borderRadius: '3px',
    padding: '1rem 0 1rem 1rem',
    boxShadow:
      '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  'subscribe-section__list': {
    marginTop: '1rem',
    overflowX: 'hidden',
    maxHeight: '200px',
    fontSize: '1rem',
    '& div': {
      marginBottom: '.5rem',
    },
  },
  'subscribe-section__no-subs-text': {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '1rem 1rem 0 0',
  },
  'subscribe-section__profile': {
    width: '3rem',
    height: '3rem',
  },
});
