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

const ChangePassword = () => {
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
            <img src="../../../assets/images/knowX_logo.png" alt="logo" />
            <div className="text-center">
              <div className="text-color"> </div>
              <div className="hr" />
            </div>
            <div className="signin-wrapper">
              <TextField
                label="Your Email"
                type="text"
                name="email"
                fullWidth
                variant="outlined"
                value={loginData.email}
                onChange={onChangeHandler}
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                // onClick={onSubmitHandler}
                // disabled={!loginData.email || !loginData.password}
              >
                SEND TO EMAIL
              </Button>
            </div>
          </div>
        </ThemeProvider>
      </Container>
      <AuthRight />
    </>
  );
};
export default ChangePassword;
