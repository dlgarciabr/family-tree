import React, { ChangeEvent, useEffect, useState } from 'react';
// import { useDispatch } from "react-redux";

// import { useHistory } from "react-router-dom";

// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Paper from "@material-ui/core/Paper";

import { FormattedMessage, useIntl } from 'react-intl';

import { Props } from '../../types';
// const useStyles = makeStyles((theme) => ({}));

// import useNotification from '../../hooks/notificationHandler';

import { useLoginMutation } from '../../services/familyTreeApi';

import { AppContext, actions } from '../../context/App';

const LoginForm: React.FC<Props> = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();

  // const classes = useStyles();
  const { formatMessage } = useIntl();
  // const { showErrorNotification } = useNotification();

  const {
    dispatch: contextDispatch
  } = React.useContext(AppContext);

  const [fetchToken, { data: resultData }] = useLoginMutation();
  // const { data, error, isLoading } = useLoginUserQuery({ email: 'asas', password: '343434' });
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleClickSignin = async () => {
    fetchToken({ userLoginData: credentials });
  };

  useEffect(() => {
    if (resultData?.token) {
      contextDispatch({
        type: actions.USER_LOGGED_IN,
        data: resultData
      });
      // console.log(tokenResult?.token);
      // sessionStorage.setItem(
      //   "credentials",
      //   JSON.stringify({ ...loginResponse })
      // );
      // dispatch(userLoggedIn(loginResponse));
      // history.push("/");
    }
  }, [resultData?.token]);

  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'email') {
      setCredentials({ ...credentials, email: e.currentTarget.value });
    } else if (e.target.name === 'password') {
      setCredentials({ ...credentials, password: e.currentTarget.value });
    }
  };

  return (
    // <Grid container justify="center">
    //   <Grid item xs={6}>
    //     <Paper elevation={3}>
    <div>
      <Typography variant="h5">
        <FormattedMessage id="login.title" />
      </Typography>
      {/* <form className={classes.form} noValidate> */}
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
        value={credentials.email}
        onChange={handleChangeField}
      />
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
        value={credentials.password}
        onChange={handleChangeField}
      />
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
