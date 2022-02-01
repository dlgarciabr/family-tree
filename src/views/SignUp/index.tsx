import React, { ChangeEvent, useState, useEffect } from 'react';

import { LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
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

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
  });

  return (
    <div>
      <Form
        onClickSubmit={signUp}
        initialValues={userData}
        validationSchema={validationSchema}
        onClickBackButton={() => console.log("redirect to login page")}
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
              label={formatMessage({ id: 'signup.password.label' })}
            />
          </Grid>
        </Grid>
        {/* <form className={classes.form} noValidate> */}
        {/* <Grid item xs={6}> */}
        {/* <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
            disabled={isSubmitting}
            onClick={submitForm}
          >
            {formatMessage({ id: 'signup.submit.button.label' })}
          </Button> */}
        {/* </Grid> */}
        {/* <Grid item xs={6}> */}
        {/* <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {formatMessage({ id: 'back.button.label' })}
          </Button> */}
        {/* </Grid> */}
      </Form>
    </div>
  );
};

export default SignUpForm;