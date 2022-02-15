import React, { useState, useEffect } from 'react';

import {
  Grid, Typography
} from '@mui/material';
import { Field } from 'formik';
import { TextField } from 'formik-mui';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';

import { Props, User } from 'types';
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
      .required('Required'),
    lastName: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
    confirmPassword: Yup.string()
      .min(8, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
  });

  return (
    <div>
      <Form
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
    </div >
  );
};

export default SignUpForm;