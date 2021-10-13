import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CreatePost from "./CreatePost/CreatePost";
import Homepage from "../Homepage/Homepage";
import DetailPost from "./DetailPost/DetailPost";

function Post(props) {
  const match = useRouteMatch();
  console.log(match);
  return (
    <Switch>
      <Route exact path={match.url} component={Homepage} />
      <Route path={`${match.url}/create`} component={CreatePost} />
      <Route path={`${match.url}/detail`} component={DetailPost} />
    </Switch>
  );
}
export default Post;
