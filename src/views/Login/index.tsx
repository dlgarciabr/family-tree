import React, { useState } from "react";
// import { useDispatch } from "react-redux";


import { Props } from '../../types';
// import { useHistory } from "react-router-dom";

// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Paper from "@material-ui/core/Paper";

import { FormattedMessage, useIntl } from 'react-intl';

// import { useShowErrorMessage } from "../../../hooks/messageHandler";
// import { doLogin } from "../apis";
// import { userLoggedIn } from "../../app/ducks";

// const useStyles = makeStyles((theme) => ({}));

import useNotification from '../../hooks/notificationHandler';

const LoginForm: React.FC<Props> = () => {
  // const showErrorMessage = useShowErrorMessage();
  // const dispatch = useDispatch();
  // const history = useHistory();

  // const classes = useStyles(); 
  const { formatMessage } = useIntl();
  const { showSuccessNotification, showInfoNotification, showErrorNotification } = useNotification();
  // const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleClickSignin = async () => {
    // const loginResponse = await doLogin({
    //   email: credentials.email,
    //   password: credentials.password,
    // });

    // if (loginResponse.token) {
    //   sessionStorage.setItem(
    //     "credentials",
    //     JSON.stringify({ ...loginResponse })
    //   );
    //   dispatch(userLoggedIn(loginResponse));
    //   history.push("/");
    // } else {
    showErrorNotification(formatMessage({ id: "login.wrong-credentials" }));
    // }
  };

  // const handleChangeField = (e) => {
  //   if (e.target.name === "email") {
  //     setCredentials({ ...credentials, email: e.target.value });
  //   } else if (e.target.name === "password") {
  //     setCredentials({ ...credentials, password: e.target.value });
  //   }
  // };

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
        label={formatMessage({ id: "login.email.label" })}
        name="email"
        autoComplete="email"
        autoFocus
      // value={credentials.email}
      // onChange={handleChangeField}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label={formatMessage({ id: "login.password.label" })}
        type="password"
        id="password"
        data-testid="password"
        autoComplete="current-password"
      // value={credentials.password}
      // onChange={handleChangeField}
      />
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        // className={classes.submit}
        onClick={handleClickSignin}
      >
        {formatMessage({ id: "login.button.label" })}
      </Button>

    </div >
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
