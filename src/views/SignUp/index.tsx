import React, { ChangeEvent, useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom';

import { Props } from 'types';
import { AuthenticationContext } from 'context/Authentication';

const SignUpForm: React.FC<Props> = () => {
  // const sessionStorageCredentials = sessionStorage.getItem('credentials');
  const {
    state: { user },
    operations: { signin, validateToken }
  } = React.useContext(AuthenticationContext);

  const navigate = useNavigate();
  const location = useLocation();

  // const classes = useStyles();
  const { formatMessage } = useIntl();

  const [userData, setUserData] = useState({
    email: '',
    name: '',
    password: ''
  });

  // const handleClickSignin = () => {
  //   const from = (location as any).state?.from?.pathname || '/';
  //   signin({ ...userCredentials }, () => navigate(from, { replace: true }));
  // };

  const handleClickSubmit = () => {
    const from = (location as any).state?.from?.pathname || '/';
    // signin({ ...userCredentials }, () => navigate(from, { replace: true }));
  };

  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    // if (e.currentTarget.name === 'email') {
    // setUserCredentials({ ...userCredentials, email: e.currentTarget.value });
    // } else if (e.target.name === 'password') {
    //   setUserCredentials({ ...userCredentials, password: e.currentTarget.value });
    // }
  };

  useEffect(() => {
  }, []);

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography variant="h5">
            <FormattedMessage id="signin.title" />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label={formatMessage({ id: 'signup.name.label' })}
            name="name"
            autoComplete="name"
            autoFocus
            value={userData.name}
            onChange={handleChangeField}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={formatMessage({ id: 'signin.password.label' })}
            type="password"
            id="password"
            data-testid="password"
            autoComplete="current-password"
            value={userCredentials.password}
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
          onClick={handleClickSubmit}
        >
          {formatMessage({ id: 'signin.button.label' })}
        </Button>
      </Grid>
      <Grid item xs={6}>
        {/* <Button
          type="button"
          fullWidth 
          variant="contained"
          color="primary"
          // className={classes.submit}
          onClick={handleClickSignup}
        >
          {formatMessage({ id: 'signup.button.label' })}
        </Button> */}
      </Grid>
    </div>
  );
};

export default SignUpForm;