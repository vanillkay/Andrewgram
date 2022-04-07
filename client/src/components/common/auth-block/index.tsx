import { FC, useState } from 'react';
import { Slide } from '@material-ui/core';

import { useStyles } from './styles';
import { FullWidthTabs } from './tabs';

const AuthBlock: FC = () => {
  const classes = useStyles();
  const [isAppear, setIsAppear] = useState<boolean>(true);

  return (
    <Slide in={isAppear} timeout={{ enter: 1000, exit: 500 }}>
      <div className={classes['auth-page']}>
        <div className={classes['auth-page__auth-block']}>
          <FullWidthTabs setIsAppear={setIsAppear} />
        </div>
      </div>
    </Slide>
  );
};

export { AuthBlock };
