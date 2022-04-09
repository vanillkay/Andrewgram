import { useSelector } from 'react-redux';

import Subscribes from 'components/side-info/subscribe-section/subscribes';
import { getRecommended, getSubscriptions } from 'store/subscribers/selectors';

import { useStyles } from './styles';

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
