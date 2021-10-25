import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Fade } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  entry__title: {
    fontSize: '2.5rem',
  },
  entry__actions: {
    marginTop: '50px',
    textAlign: 'center',
  },
}));

const Entry = () => {
  const history = useHistory();
  const classes = useStyles();

  const [isAppear, setIsAppear] = useState({ title: false, actions: false });

  useEffect(() => {
    setTimeout(() => {
      setIsAppear((prevState) => ({ ...prevState, title: true }));
    }, 500);
    setTimeout(() => {
      setIsAppear((prevState) => ({ ...prevState, actions: true }));
    }, 1000);
  }, []);

  const startApp = () => {
    setTimeout(() => {
      setIsAppear((prevState) => ({ ...prevState, title: false }));
    }, 0);
    setTimeout(() => {
      setIsAppear((prevState) => ({ ...prevState, actions: false }));
    }, 0);
    setTimeout(() => {
      history.push('/auth');
    }, 500);
  };

  return (
    <div className={classes.entry__content}>
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

export default Entry;
