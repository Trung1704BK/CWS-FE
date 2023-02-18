import { FormikProps, FormikTouched } from "formik";

export const getIsInvalid = <T>(
  formik: FormikProps<T>,
  field: keyof FormikTouched<T>
): boolean => {
  return (
    (!!formik.touched[field] as boolean) && (!!formik.errors[field] as boolean)
  );
};
