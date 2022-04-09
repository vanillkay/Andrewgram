import { useSelector } from 'react-redux';

import ProfileRef from 'components/profile/ref';
import { getUserInfo } from 'store/user/selectors';
import SubscribeSection from 'components/side-info/subscribe-section';

import { useStyles } from './styles';

const SideProfileInfo = () => {
  const user = useSelector(getUserInfo);

  const classes = useStyles();
  return (
    <div className={classes['profile-info']}>
      <ProfileRef isOwn avatar={user.avatar} login={user.login} />
      <SubscribeSection />
    </div>
  );
};

export default SideProfileInfo;
