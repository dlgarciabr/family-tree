import React from 'react';

import {
  Grid, Typography
} from '@mui/material';
import { Field } from 'formik';
import { TextField } from 'formik-mui';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';

import { Props } from 'types';
import { AuthenticationContext } from 'context/Authentication';
import Form from 'commons/Form';

const SignUpForm: React.FC<Props> = () => {
  const {
    operations: { signUp }
  } = React.useContext(AuthenticationContext);

  const { formatMessage } = useIntl();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required(formatMessage({ id: 'signup.first.name.required.message' })),
    lastName: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required(formatMessage({ id: 'signup.last.name.required.message' })),
    email: Yup.string()
      .email('Invalid email')
      .required(formatMessage({ id: 'signup.email.required.message' })),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(10, 'Too Long!')
      .required(formatMessage({ id: 'signup.password.required.message' })),
    confirmPassword: Yup.string()
      .min(8, 'Too Short!')
      .max(10, 'Too Long!')
      .required(formatMessage({ id: 'signup.confirmPassword.required.message' })),
  });

  return (
    <div>
      <Form
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          confirmPassword: ''
        }}
        onClickSubmit={signUp}
        onClickBackButton={() => console.log("redirect to login page")}
        validationSchema={validationSchema}
      >
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="h5">
              <FormattedMessage id="signin.title" />
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Field
              component={TextField}
              name="firstName"
              label={formatMessage({ id: 'signup.first.name.label' })}
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              component={TextField}
              name="lastName"
              label={formatMessage({ id: 'signup.last.name.label' })}
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              component={TextField}
              name="email"
              type="email"
              label={formatMessage({ id: 'signup.email.label' })}
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              component={TextField}
              name="password"
              type="password"
              data-testid="password"
              label={formatMessage({ id: 'signup.password.label' })}
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              component={TextField}
              name="confirmPassword"
              type="password"
              data-testid="confirmPassword"
              label={formatMessage({ id: 'signup.confirmPassword.label' })}
            />
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};

export default SignUpForm;