import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import ProfileRef from 'components/profile/ref';
import { getUserInfo } from 'store/user/selectors';
import SubscribeSection from 'components/side-info/subscribe-section';

const useStyles = makeStyles(() => ({
  'profile-info': {
    padding: '.5rem',
  },
}));
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
