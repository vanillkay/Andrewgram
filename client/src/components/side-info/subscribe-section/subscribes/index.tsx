import { FC } from 'react';
import { useSelector } from 'react-redux';

import { User } from 'types/user';
import ProfileRef from 'components/profile/ref';
import { getLoading } from 'store/subscribers/selectors';

import { useStyles } from './styles';

const Subscribes: FC<{ type: 'subscription' | string; subscribers: User[] }> = (
  type,
  subscribers = ([] = [])
) => {
  const classes = useStyles(type);

  const isLoading = useSelector(getLoading);

  return (
    <div className={classes['subscribe-section']}>
      <span>
        {/*// @ts-ignore*/}
        {type === 'subscription' ? 'Подписки' : 'Рекомендации для вас'}
      </span>
      <div className={classes['subscribe-section__list']}>
        {/*// @ts-ignore*/}
        {subscribers.map((item, index) => (
          <ProfileRef
            key={index}
            type={type}
            avatar={item.avatar}
            isLoading={isLoading}
            avatarClass={classes['subscribe-section__profile']}
            login={item.login}
          />
        ))}
        {!subscribers.length && (
          <div className={classes['subscribe-section__no-subs-text']}>
            {/*// @ts-ignore*/}
            {type === 'subscription'
              ? 'Подписок пока нет'
              : 'Рекомендаций пока нету'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscribes;
