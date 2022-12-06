import * as Yup from 'yup';

export const registrationValidationSchema = Yup.object().shape({
  name: Yup.string().required('Please enter your name'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Please enter a valid email address'),
  password: Yup.string()
    .required('Please enter a password')
    .min(8, 'Your password must contain at least 8 characters'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Your passwords do not match'),
});

export const authenticationValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Please enter a valid email address'),
  password: Yup.string().required('Please enter a password'),
});
