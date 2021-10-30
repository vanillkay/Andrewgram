import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  like: {},
  'like-active': {
    // @ts-ignore
    color: theme.colors.like,
  },
}));
