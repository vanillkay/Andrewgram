import { FormikHelpers, FormikProps } from 'formik';

import { FormikTouched } from 'formik/dist/types';

import { FormikInputField } from '../input-field';
import { FormikInputFiledProps } from '../input-field/types';

export const isAllFieldsTouched = <T,>(
  allFields: T,
  touchedField: FormikTouched<T>
): boolean =>
  Object.keys(allFields).length === Object.keys(touchedField).length &&
  Object.values(touchedField).every((value) => value);

export const setFormikSubmitting = <T,>(
  helpers: FormikHelpers<T>,
  value: boolean = true
) => helpers.setSubmitting(value);

export const isSubmitDisabled = <T,>(
  initialValues: T,
  formikProps: FormikProps<T>
): boolean => {
  const { isSubmitting, isValid, touched } = formikProps;
  return (
    isSubmitting || (!isValid && isAllFieldsTouched(initialValues, touched))
  );
};

export const renderFormFields = (
  formikFields: FormikInputFiledProps[],
  withClass: string = ''
) =>
  formikFields.map((field) => (
    <FormikInputField key={field.name} className={withClass} {...field} />
  ));
