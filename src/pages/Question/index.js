import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CreateQuestion from "./CreateQuestion/CreateQuestion";
import Homepage from "../Homepage/Homepage";
import FollowingQuestion from "./FollowingQuestion/FollowingQuestion";
// import DetailPost from "./DetailPost/DetailPost";

function Question(props) {
  const match = useRouteMatch();
  console.log(match);
  return (
    <Switch>
      <Route exact path={match.url} component={Homepage} />
      <Route path={`${match.url}/create`} component={CreateQuestion} />
      <Route path={`${match.url}/following`} component={FollowingQuestion} />
      {/* <Route path={`${match.url}/detail`} component={DetailPost} /> */}
    </Switch>
  );
}
export default Question;
