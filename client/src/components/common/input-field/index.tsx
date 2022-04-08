import React from 'react';
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
      error={Boolean(meta.error)}
      id="filled-error-helper-text9"
      helperText={meta.error}
      variant={variant}
      label={label}
      {...field}
    />
  );
};

export default FormikInputField;
