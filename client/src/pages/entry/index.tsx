import { makeStyles } from '@material-ui/core/styles';

import Entry from 'components/common/entry';

const useStyles = makeStyles(() => ({
  'entry-page': {
    width: '100%',
    height: '90vh',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const EntryPage = () => {
  const classes = useStyles();
  return (
    <div className={classes['entry-page']}>
      <Entry />
    </div>
  );
};

export { EntryPage };
