import * as Yup from 'yup';

const generateSchema = (formatMessage: Function) => (Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required(formatMessage({ id: 'signup.first.name.required.message' })),
  lastName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required(formatMessage({ id: 'signup.last.name.required.message' })),
  email: Yup.string()
    .email(formatMessage({ id: 'signup.email.invalid.message' }))
    .required(formatMessage({ id: 'signup.email.required.message' })),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(10, 'Too Long!')
    .required(formatMessage({ id: 'signup.password.required.message' })),
  confirmPassword: Yup.string()
    .min(8, 'Too Short!')
    .max(10, 'Too Long!')
    .required(formatMessage({ id: 'signup.confirmPassword.required.message' }))
    .oneOf([Yup.ref('password'), null], formatMessage({ id: 'signup.confirmPassword.not.match.message' })),
}));

export default generateSchema;