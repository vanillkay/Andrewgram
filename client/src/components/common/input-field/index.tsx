import { FieldHookConfig, useField } from 'formik';
import TextField from '@material-ui/core/TextField';

import { FormikInputFiledProps } from './types';

const FormikInputField = ({
  label = 'Test',
  variant = 'filled',
  ...props
}: FormikInputFiledProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      label={label}
      variant={variant}
      helperText={meta.error}
      error={Boolean(meta.error)}
      {...field}
    />
  );
};

export default FormikInputField;
