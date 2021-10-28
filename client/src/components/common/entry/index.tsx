import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Fade } from '@material-ui/core';

import { Appear } from './types';
import { useStyles } from './styles';
import { timeoutAppear } from './helpers';

const Entry = (): JSX.Element => {
  const [isAppear, setIsAppear] = useState<Appear>({
    title: false,
    actions: false,
  });

  const history = useHistory();
  const classes = useStyles();

  const startApp = () => {
    timeoutAppear(setIsAppear, { title: false }, 0);
    timeoutAppear(setIsAppear, { actions: false }, 0);
    setTimeout(() => history.push('/auth'), 500);
  };

  useEffect(() => {
    timeoutAppear(setIsAppear, { title: true }, 500);
    timeoutAppear(setIsAppear, { actions: true }, 1000);
  }, []);

  return (
    <div>
      <Fade in={isAppear.title} timeout={{ enter: 2000, exit: 500 }}>
        <div className={classes.entry__title}>
          Добро пожаловать в Andrewgram
        </div>
      </Fade>
      <div className={classes.entry__actions}>
        <Fade in={isAppear.actions} timeout={{ enter: 1500, exit: 500 }}>
          <Button onClick={startApp} variant="contained" color="primary">
            Войти
          </Button>
        </Fade>
      </div>
    </div>
  );
};

export { Entry };
