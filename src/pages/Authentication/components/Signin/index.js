/* eslint-disable no-shadow */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
// eslint-disable-next-line object-curly-newline
import { TextField, Button, Box, Stack } from "@material-ui/core";
import { Container } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import "./signin.scss";
import AuthRight from "../../../../components/AuthRight";
import images from "../../../../assets/images";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00358E",
    },
  },
});

const Signin = () => {
  const [toSignUp, setToSignUp] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [hidden, setHidden] = useState(true);
  const [errMsgEmail, setErrMsgEmail] = useState("");
  const [errMsgPassword, setErrMsgPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const onChangeHandler = (e) => {
    const tmpLogin = { ...loginData };
    tmpLogin[e.target.name] = e.target.value;
    setLoginData(tmpLogin);
  };

  const onSubmitHandler = () => {
    const formdata = new FormData();
    formdata.append("email", loginData.email);
    formdata.append("password", loginData.password);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/api/user/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("status: ", result);
        if (result.status === "success") {
          setAccessToken(result.token);
          sessionStorage.setItem("token", result.token);
          sessionStorage.setItem("userName", loginData.email);
          sessionStorage.setItem("isLoggedIn", true);
        }
        if (result.status === "failed") {
          setErrMsg(result.message);
        }
        if (result.status === "error") {
          setError(true);
          setErrMsgEmail(result.validation_errors.email[0]);
          setErrMsgPassword(result.validation_errors.password[0]);
        }
        if (result.error === false) {
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.log("errro", error);
      });
  };

  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  if (redirect) {
    return <Redirect to="/homepage" />;
  }

  if (isLoggedIn) {
    return <Redirect to="/homepage" />;
  }

  if (toSignUp) {
    return <Redirect to="/auth/sign-up" />;
  }

  const isSignUp = () => {
    setToSignUp(true);
  };

  return (
    <>
      <Container className="themed-container mt-2" fluid="sm">
        <ThemeProvider theme={theme}>
          <div className="wrapper">
            <div className="logo">
              <img src={images.knowXLogo} alt="logo" />
            </div>
            <Box sx={{ textAlign: "center", m: 1, fontSize: 22 }}>
              Sign in with
            </Box>
            <div className="signin-wrapper">
              <TextField
                error={error}
                helperText={loginData.email === "" ? error : errMsgEmail}
                label="Email"
                type="text"
                name="email"
                fullWidth
                variant="outlined"
                value={loginData.email}
                onChange={onChangeHandler}
              />
              <div className="show-hide-pwd-wrapper">
                <TextField
                  error={error}
                  helperText={
                    loginData.password === "" ? error : errMsgPassword
                  }
                  label="Password"
                  name="password"
                  type={hidden ? "password" : "text"}
                  fullWidth
                  variant="outlined"
                  value={loginData.password}
                  onChange={onChangeHandler}
                />
              </div>
              <p to="/forgot" className="dont-have-txt ">
                <Link to="/auth/forgot" className="forgot-txt ">
                  Forgot password?
                </Link>
              </p>
              <p className="errMsgStyl">{errMsg}</p>
              <Stack
                width="100%"
                direction="row"
                justifyContent="space-between"
              >
                <Button
                  sx={{ p: 1, width: "45%" }}
                  variant="outlined"
                  onClick={isSignUp}
                >
                  SIGN UP
                </Button>
                <Button
                  sx={{ p: 1, width: "45%" }}
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={onSubmitHandler}
                  disabled={!loginData.email || !loginData.password}
                >
                  SIGN IN
                </Button>
              </Stack>
            </div>
          </div>
        </ThemeProvider>
      </Container>
      <AuthRight />
    </>
  );
};
export default Signin;
