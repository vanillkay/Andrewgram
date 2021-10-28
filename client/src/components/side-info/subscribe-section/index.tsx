import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Subscribes from 'components/side-info/subscribe-section/subscribes';
import { getRecommended, getSubscriptions } from 'store/subscribers/selectors';

const useStyles = makeStyles(() => ({
  'subscribe-section': {
    marginTop: '2rem',
  },
}));

const SubscribeSection = () => {
  const classes = useStyles();

  const subscribed = useSelector(getSubscriptions);

  const recommended = useSelector(getRecommended);

  return (
    <section className={classes['subscribe-section']}>
      <Subscribes subscribers={subscribed} type={'subscription'} />
      <Subscribes subscribers={recommended} type={'recommended'} />
    </section>
  );
};

export default SubscribeSection;