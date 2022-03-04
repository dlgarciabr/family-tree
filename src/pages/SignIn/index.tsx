import React, { ChangeEvent, useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Button,
  TextField
} from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom';

import { Props, AuthCredentials } from 'types';
import { AuthenticationContext } from 'context/Authentication';
import { Routes } from 'components/AppRoutes';

const SignInForm: React.FC<Props> = () => {
  const {
    state: { user },
    operations: { signIn, validateToken }
  } = React.useContext(AuthenticationContext);

  const navigate = useNavigate();
  const location = useLocation();

  const { formatMessage } = useIntl();

  const [userCredentials, setUserCredentials] = useState<AuthCredentials>({
    email: '',
    password: ''
  });

  const handleClickSignin = () => {
    const from = (location as any).state?.from?.pathname || Routes.HOME;
    signIn(userCredentials, () => navigate(from, { replace: true }));
  };

  const handleClickSignup = () => {
    navigate(Routes.SIGN_UP, { replace: true });
  };

  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const newUserCredentials = {
      ...userCredentials
    };
    newUserCredentials[e.currentTarget.name] = e.currentTarget.value;
    setUserCredentials(newUserCredentials);
  };

  useEffect(() => {
    const sessionStorageCredentials = sessionStorage.getItem('credentials');
    if (!user && sessionStorageCredentials) {
      (async () => {
        validateToken(sessionStorageCredentials, Routes.HOME);
      })();
    }
  }, []);

  return (
    // <Grid container justify="center">
    //   <Grid item xs={6}>
    //     <Paper elevation={3}>
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
            id="email"
            label={formatMessage({ id: 'signin.email.label' })}
            name="email"
            autoComplete="email"
            autoFocus
            value={userCredentials.email}
            onChange={handleChangeField}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
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
          />
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
          onClick={handleClickSignin}
        >
          {formatMessage({ id: 'signin.button.label' })}
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          // className={classes.submit}
          onClick={handleClickSignup}
        >
          {formatMessage({ id: 'signup.button.label' })}
        </Button>
      </Grid>
    </div>
    //         <FormControlLabel
    //           control={<Checkbox value="remember" color="primary" />}
    //           label={fmt({ id: "remember-me-label" })}
    //         />
    //         <Grid container>
    //           <Grid item xs>
    //             <Link href="#" variant="body2">
    //               {fmt({ id: "forgot-password-label" })}
    //             </Link>
    //           </Grid>
    //           <Grid item>
    //             <Link href="#" variant="body2">
    //               {fmt({ id: "signup-label" })}
    //             </Link>
    //           </Grid>
    //         </Grid>
    // </form>
    //     </Paper>
    //   </Grid>
    // </Grid>
  );
};

export default SignInForm;