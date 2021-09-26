/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/no-named-as-default-member */
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Signin from "./components/Signin";
import Signout from "./components/Signout";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";

function Authentication(props) {
  // const match = props =useRouteMatch();
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url} component={Signin} />
      <Route path={"${match.url}/signout"} component={Signout} />
      <Route path={"${match.url}/forgot"} component={ForgotPassword} />
    </Switch>
  );
}
export default Authentication;
