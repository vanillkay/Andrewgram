import { useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { getLoading, getRecommended } from 'store/subscribers/selectors';
import Profile from './ref';
import { useStyles } from './styles';
import { FC } from 'react';
import { User } from '../../types/user';

const ProfileInfo: FC<{ isLoading: boolean; isOwn: boolean; user: User }> = ({
  isLoading,
  isOwn,
  user,
}) => {
  const classes = useStyles();

  const recommended = useSelector(getRecommended);

  const isLoadingSubs = useSelector(getLoading);

  // @ts-ignore
  const userProfType = recommended.find((item) => item.login === user.login)
    ? 'recommended'
    : 'subscription';

  return (
    <div className={classes['profile-info']}>
      {!isLoading && (
        <Profile
          type={isOwn ? '' : userProfType}
          isLoading={isLoadingSubs}
          login={user.login}
          avatar={user.avatar || ''}
          isPageComp
          isOwn={isOwn}
        />
      )}
      {isLoading && (
        <div className={classes['profile-loading']}>
          <Skeleton
            animation={'wave'}
            variant="circle"
            height={'5rem'}
            width={'5rem'}
          />
          <Skeleton
            animation={'wave'}
            variant="text"
            height={'4vh'}
            width={'80%'}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
