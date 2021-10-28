import { Slide } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { useStyles } from './styles';
import { FullWidthTabs } from './tabs';

const AuthBlock = (): JSX.Element => {
  const classes = useStyles();
  const [isAppear, setIsAppear] = useState<boolean>(false);

  useEffect(() => {
    setIsAppear(true);
  }, []);

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
