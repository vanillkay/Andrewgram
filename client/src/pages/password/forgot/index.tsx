import { useState } from 'react';
import { Slide } from '@material-ui/core';

import { ResetPasswordForm } from 'components/common/forms/reset-password';

import { useStyles } from './styles';

const ForgotPasswordPage = () => {
  const [isAppear, setIsAppear] = useState<boolean>(true);

  const classes = useStyles();

  return (
    <Slide in={isAppear} timeout={{ enter: 1000, exit: 500 }}>
      <div className={classes['forgot-page']}>
        <ResetPasswordForm setIsAppear={setIsAppear} />
      </div>
    </Slide>
  );
};

export { ForgotPasswordPage };
