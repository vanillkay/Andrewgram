import React, { useEffect, useState } from 'react';
import ResetPassword from '../components/AuthComponents/ResetPassword';
import Loader from '../components/Loaders/Loader';
import { useParams, useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  'reset-page': {
    width: '100%',
    height: '50vh',
    fontSize: '1.5rem',
    paddingTop: '6rem',
  },
}));

const ResetPasswordPage = () => {
  const [isValid, setIsValid] = useState(false);
  const { loading, request } = useHttp();
  const { token } = useParams();
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

  return (
    <div className={classes['reset-page']}>
      {loading && <Loader />}
      {isValid && <ResetPassword token={token} />}
    </div>
  );
};

export default ResetPasswordPage;
