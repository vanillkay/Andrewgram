import { Slide } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { ForgotPasswordForm } from 'components/common/forms/forgot-password';
import { useStyles } from './styles';

const ForgotPasswordPage = () => {
  const [isAppear, setIsAppear] = useState<boolean>(false);

  const classes = useStyles();

  useEffect(() => setIsAppear(true), []);

  return (
    <Slide in={isAppear} timeout={{ enter: 1000, exit: 500 }}>
      <div className={classes['forgot-page']}>
        <ForgotPasswordForm setIsAppear={setIsAppear} />
      </div>
    </Slide>
  );
};

export { ForgotPasswordPage };
