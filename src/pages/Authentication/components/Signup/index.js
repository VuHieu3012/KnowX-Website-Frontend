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
import "./signup.scss";
import AuthRight from "../../../../components/AuthRight";
import knowX_logo from "./knowX_logo.png";

const Signup = () => {
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
            <div className="logo_signup">
              <img src={knowX_logo} alt="logo" />
            </div>
            <div className="signup-wrapper">
              <TextField
                label="First name"
                type="text"
                name="firstName"
                fullWidth
                variant="outlined"
                onChange={onChangeHandler}
              />
              <TextField
                label="Last name"
                type="text"
                name="lastName"
                fullWidth
                variant="outlined"
                onChange={onChangeHandler}
              />
              <TextField
                label="Phone number"
                type="number"
                name="phoneNumber"
                fullWidth
                variant="outlined"
                onChange={onChangeHandler}
              />
              <TextField
                label="Your email"
                type="email"
                name="email"
                fullWidth
                variant="outlined"
                value={loginData.email}
                onChange={onChangeHandler}
              />
              <TextField
                label="Password"
                type="text"
                name="email"
                fullWidth
                variant="outlined"
                onChange={onChangeHandler}
              />
              <div className="show-hide-pwd-wrapper">
                <TextField
                  label="Confirm password"
                  name="password"
                  fullWidth
                  variant="outlined"
                  onChange={onChangeHandler}
                />
              </div>
              <Stack width="100%" direction="row" justifyContent="center">
                <Button
                  sx={{ p: 1, width: "35%" }}
                  variant="contained"
                  color="primary"
                >
                  SIGN UP
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
export default Signup;
