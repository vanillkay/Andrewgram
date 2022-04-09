import { FC } from 'react';

import { Nullable } from 'types/utils';

import { useStyles } from './styles';

const ServerError: FC<{ serverError: Nullable<string> }> = ({
  serverError,
}) => {
  const classes = useStyles();

  if (!serverError) {
    return null;
  }
  return <p className={classes['register-error']}>{serverError}</p>;
};

export { ServerError };
