/* eslint-disable vars-on-top */
/* eslint-disable radix */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import { TextField, Button, Stack } from "@material-ui/core";
import { Container } from "reactstrap";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import "./signup.scss";
import AuthRight from "../../../../components/AuthRight";
import images from "../../../../assets/images";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00358E",
    },
  },
});
const Signup = () => {
  const [signupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
    full_name: "",
  });

  const [hidden, setHidden] = useState(true);
  const [errMsgFirstName, setErrMsgFistName] = useState("");
  const [errMsgLastName, setErrMsgLastName] = useState("");
  const [errMsgPhone, setErrMsgPhone] = useState("");
  const [errMsgEmail, setErrMsgEmail] = useState("");
  const [errMsgPassword, setErrMsgPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState(false);

  const toggleShow = () => {
    setHidden(!hidden);
  };

  const onChangeHandler = (e, key) => {
    let tmpSignup = { ...signupData };
    tmpSignup[e.target.name] = e.target.value.trim();
    setSignupData(tmpSignup);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("first_name", signupData.first_name);
    formdata.append("last_name", signupData.last_name);
    formdata.append("email", signupData.email);
    formdata.append("password", signupData.password);
    formdata.append("password_confirmation", signupData.password_confirmation);
    formdata.append("phone", signupData.phone);
    // eslint-disable-next-line vars-on-top
    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch("http://127.0.0.1:8000/api/user/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setSignupData({
            first_name: "",
            last_name: "",
            password: "",
            password_confirmation: "",
            email: "",
            phone: "",
          });
          setErrMsgFistName("");
          setErrMsgLastName("");
          setErrMsgPhone("");
          setErrMsgEmail("");
          setSuccessMsg("");
          setErrMsgPassword("");
          setError(false);
        }
        setTimeout(() => {
          setSuccessMsg(result.message);
        }, 1000);
        if (result.status === "error" && result.validation_errors.first_name) {
          setError(true);
          setErrMsgFistName(result.validation_errors.first_name[0]);
        }
        if (result.status === "error" && result.validation_errors.last_name) {
          setError(true);
          setErrMsgLastName(result.validation_errors.last_name[0]);
        }
        if (result.status === "error" && result.validation_errors.phone) {
          setError(true);
          setErrMsgPhone(result.validation_errors.phone[0]);
        }
        if (result.status === "error" && result.validation_errors.email) {
          setError(true);
          setErrMsgEmail(result.validation_errors.email[0]);
        }
        if (result.status === "error" && result.validation_errors.password) {
          setError(true);
          setErrMsgPassword(result.validation_errors.password[0]);
        }
      })
      // eslint-disable-next-line no-shadow
      .catch((error) => {
        console.log(error);
        console.log("env:", process.env.REACT_APP_API_URL);
      });
  };
  return (
    <>
      <Container className="themed-container mt-2" fluid="sm">
        <ThemeProvider theme={theme}>
          <div className="wrapper">
            <div className="logo_signup">
              <img src={images.knowXLogo} alt="logo" />
            </div>
            <div className="signup-wrapper">
              <TextField
                error={error}
                label="First name"
                type="text"
                name="first_name"
                fullWidth
                variant="outlined"
                value={signupData.first_name}
                onChange={onChangeHandler}
                helperText={errMsgFirstName}
              />
              <TextField
                error={error}
                label="Last name"
                type="text"
                name="last_name"
                fullWidth
                variant="outlined"
                value={signupData.last_name}
                onChange={onChangeHandler}
                helperText={errMsgLastName}
              />
              <TextField
                error={error}
                name="phone"
                label="Phone"
                type="number"
                fullWidth
                variant="outlined"
                value={signupData.phone}
                onChange={onChangeHandler}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
                min={0}
                helperText={errMsgPhone}
              />
              <TextField
                error={error}
                label="Your email"
                type="email"
                name="email"
                fullWidth
                variant="outlined"
                value={signupData.email}
                onChange={onChangeHandler}
                helperText={errMsgEmail}
              />
              <TextField
                error={error}
                label="Password"
                type={hidden ? "password" : "text"}
                name="password"
                fullWidth
                variant="outlined"
                value={signupData.password}
                onChange={onChangeHandler}
                helperText={errMsgPassword}
              />
              <div className="show-hide-pwd-wrapper">
                <TextField
                  error={error}
                  label="Confirm password"
                  name="password_confirmation"
                  type={hidden ? "password" : "text"}
                  fullWidth
                  variant="outlined"
                  value={signupData.password_confirmation}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="alert alert-success">{successMsg}</div>
              <Stack width="100%" direction="row" justifyContent="center">
                <Button
                  sx={{ p: 1, width: "35%" }}
                  variant="contained"
                  color="primary"
                  onClick={onSubmitHandler}
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
