import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Loader } from 'components/common/loader';
import { checkChangePasswordToken } from 'store/user/actions';
import { ChangePasswordForm } from 'components/common/forms/change-password';

import { useStyles } from './styles';

const ChangePasswordPage = () => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    dispatch(
      checkChangePasswordToken({
        token,
        onSuccess: () => setIsValid(true),
        onError: () => history.push('/auth'),
      })
    );
  }, []);

  if (!isValid) return <Loader />;

  return (
    <div className={classes['reset-page']}>
      {isValid && <ChangePasswordForm token={token} />}
    </div>
  );
};

export { ChangePasswordPage };
