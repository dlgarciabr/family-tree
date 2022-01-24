import React, { ChangeEvent, useState, useEffect } from 'react';

// import { makeStyles } from "@material-ui/core/styles";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Paper from "@material-ui/core/Paper";

import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom';

import { Props } from 'types';
// const useStyles = makeStyles((theme) => ({}));
import { AuthenticationContext } from 'context/Authentication';

const LoginForm: React.FC<Props> = () => {
  const sessionStorageCredentials = sessionStorage.getItem('credentials');
  const {
    state: { user },
    operations: { signin, validateToken }
  } = React.useContext(AuthenticationContext);

  const navigate = useNavigate();
  const location = useLocation();

  // const classes = useStyles();
  const { formatMessage } = useIntl();

  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });

  const handleClickSignin = () => {
    const from = (location as any).state?.from?.pathname || '/';
    signin({ ...userCredentials }, () => navigate(from, { replace: true }));
  };

  const handleClickSignup = () => {
    const from = (location as any).state?.from?.pathname || '/';
    signin({ ...userCredentials }, () => navigate(from, { replace: true }));
  };

  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'email') {
      setUserCredentials({ ...userCredentials, email: e.currentTarget.value });
    } else if (e.target.name === 'password') {
      setUserCredentials({ ...userCredentials, password: e.currentTarget.value });
    }
  };

  useEffect(() => {
    if (!user && sessionStorageCredentials) {
      (async () => {
        validateToken(sessionStorageCredentials, '/');
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
            <FormattedMessage id="login.title" />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={formatMessage({ id: 'login.email.label' })}
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
            label={formatMessage({ id: 'login.password.label' })}
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
          {formatMessage({ id: 'login.button.label' })}
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

export default LoginForm;