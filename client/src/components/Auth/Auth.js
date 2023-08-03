import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Button,
  Grid,
  Typography,
  Avatar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import { GoogleLogin } from "react-google-login";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "./input";
import Icon from "./Icon";
import useStyles from "./styles";
const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const switchMode = () => {
    setIsSignup(!isSignup);
    handleShowPassword(false);
  };
  const handleSumbit = () => {};
  const handleChange = () => {};

  const googleSuccess = async (res) => {
    console.log(res);
    // const result = res?.profileObj;
    const token = res?.clientId;
    const result = jwt_decode(res.credential);
    console.log(token);

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("google sign in unsuccesfull. Try Again Later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSumbit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                  autoFocus
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  autoFocus
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleOAuthProvider clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID }>
            {/* <GoogleLogin
                children={
                  <Button
                    className={classes.googleButton}
                    color="primary"
                    fullWidth
                    // onClick={renderProps.onClick}
                    // disabled={renderProps.disabled}
                    startIcon={<Icon />}
                    variant="contained"
                  >
                    Google Sign In
                  </Button>
                }
              onSuccess={googleSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
            /> */}
            <GoogleLogin
              children={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>

          {/* <GoogleLogin
            clientId=
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onError={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have account Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
