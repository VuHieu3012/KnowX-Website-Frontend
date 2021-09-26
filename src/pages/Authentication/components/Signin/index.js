/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Container } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import "./styles.scss";
import AuthRight from "../../../../components/AuthRight";
import knowX_logo from "./knowX_logo.png";

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
            <img src={knowX_logo} alt="logo" />
            <div className="text-center">
              <div className="text-color">Sign in with</div>
              <div className="hr" />
            </div>
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
              <p to="/sign-up" className="dont-have-txt ">
                <Link to="/forgot" className="signup-txt ">
                  Forgot password?
                </Link>
              </p>
              <Button
                variant="contained"
                // color="primary"
                // onClick={onSubmitHandler}
                // disabled={!loginData.email || !loginData.password}
              >
                SIGN UP
              </Button>
              <Button
                variant="contained"
                color="primary"
                // onClick={onSubmitHandler}
                // disabled={!loginData.email || !loginData.password}
              >
                SIGN IN
              </Button>
            </div>
          </div>
        </ThemeProvider>
      </Container>
      <AuthRight />
    </>
  );
};
export default Signin;
