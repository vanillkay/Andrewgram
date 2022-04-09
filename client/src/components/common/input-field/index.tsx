import { useField } from 'formik';
import TextField from '@material-ui/core/TextField';

import { FormikInputFiledProps } from './types';

const FormikInputField = ({
  label = 'Test',
  variant = 'filled',
  className,
  type,
  ...props
}: FormikInputFiledProps) => {
  const [field, meta] = useField(props);

  const error = meta.touched && meta.error;

  return (
    <TextField
      type={type}
      label={label}
      variant={variant}
      className={className}
      helperText={error}
      error={Boolean(error)}
      {...field}
    />
  );
};

export { FormikInputField };
