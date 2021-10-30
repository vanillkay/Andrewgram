import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useHttp } from 'hooks/http.hook';
import { Loader } from 'components/common/loader';
import { ResetPassword } from 'components/common/forms/reset-password';
import { useStyles } from './styles';

const ResetPasswordPage = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const { loading, request } = useHttp();
  const { token } = useParams<{ token: string }>();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    request('/auth/reset/check', 'post', { token })
      .then((res) => {
        if (res.success) {
          setIsValid(true);
        } else {
          history.push('/auth');
        }
      })
      .catch(() => {});
  }, []);

  if (loading) return <Loader />;

  return (
    <div className={classes['reset-page']}>
      {isValid && <ResetPassword token={token} />}
    </div>
  );
};

export { ResetPasswordPage };
