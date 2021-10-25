import React, { useEffect, useState } from 'react';
import ForgotPassword from '../components/AuthComponents/ForgotPassword';
import { Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  'forgot-page': {
    width: '100%',
    height: '50vh',
    fontSize: '1.5rem',
    paddingTop: '4rem',
  },
}));

const ForgotPasswordPage = () => {
  const [isAppear, setIsAppear] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setIsAppear(true);
  }, []);
  return (
    <Slide in={isAppear} timeout={{ enter: 1000, exit: 500 }}>
      <div className={classes['forgot-page']}>
        <ForgotPassword setIsAppear={setIsAppear} />
      </div>
    </Slide>
  );
};

export default ForgotPasswordPage;
