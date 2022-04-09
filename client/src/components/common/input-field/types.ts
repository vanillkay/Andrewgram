import { FieldHookConfig } from 'formik';

export type FormikInputFiledProps = FieldHookConfig<string> & {
  variant?: 'filled' | 'outlined' | 'standard';
  label?: string;
};
