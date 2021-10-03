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

const Signin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const tmpLogin = { ...loginData };
    tmpLogin[e.target.name] = e.target.value;
    setLoginData(tmpLogin);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00358E",
      },
    },
  });
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
                  label="Password"
                  name="password"
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
              <Stack
                width="100%"
                direction="row"
                justifyContent="space-between"
              >
                <Button sx={{ p: 1, width: "45%" }} variant="outlined">
                  <Link className="sign-up-txt" to="/auth/signup">
                    SIGN UP
                  </Link>
                </Button>
                <Button
                  sx={{ p: 1, width: "45%" }}
                  variant="contained"
                  color="primary"
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
