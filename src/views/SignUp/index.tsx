import React, { ChangeEvent, useState, useEffect } from 'react';

import { LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { FormattedMessage, useIntl } from 'react-intl';

import { Props, User } from 'types';
import { AuthenticationContext } from 'context/Authentication';

const SignUpForm: React.FC<Props> = () => {
  const {
    operations: { signUp }
  } = React.useContext(AuthenticationContext);

  // const classes = useStyles();
  const { formatMessage } = useIntl();

  const [userData, setUserData] = useState<User>({
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  });

  useEffect(() => {
  }, []);

  return (
    <div>
      <Formik
        initialValues={userData}
        validate={(values) => {
          const errors: Partial<User> = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          signUp(values);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
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
                {/* <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label={formatMessage({ id: 'signup.first.name.label' })}
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  value={userData.firstName}
                  onChange={handleChangeField}
                /> */}
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  name="lastName"
                  label={formatMessage({ id: 'signup.last.name.label' })}
                />
                {/* <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label={formatMessage({ id: 'signup.last.name.label' })}
                  name="lastName"
                  autoComplete="lastName"
                  autoFocus
                  value={userData.lastName}
                  onChange={handleChangeField}
                /> */}
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label={formatMessage({ id: 'signup.email.label' })}
                />
                {/* <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={formatMessage({ id: 'signup.email.label' })}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={userData.email}
                  onChange={handleChangeField}
                /> */}
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  name="password"
                  type="password"
                  label={formatMessage({ id: 'signup.password.label' })}
                />
                {/* <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={formatMessage({ id: 'signup.password.label' })}
                  type="password"
                  id="password"
                  data-testid="password"
                  autoComplete="current-password"
                  value={userData.password}
                  onChange={handleChangeField}
                /> */}
              </Grid>
            </Grid>
            {/* <form className={classes.form} noValidate> */}
            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                // className={classes.submit}
                disabled={isSubmitting}
                onClick={submitForm}
              >
                {formatMessage({ id: 'signup.submit.button.label' })}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {formatMessage({ id: 'back.button.label' })}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;