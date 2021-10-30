import { Entry } from 'components/common/entry';

import { useStyles } from './styles';

const EntryPage = () => {
  const classes = useStyles();
  return (
    <div className={classes['entry-page']}>
      <Entry />
    </div>
  );
};

export { EntryPage };
