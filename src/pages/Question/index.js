import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CreateQuestion from "./CreateQuestion/CreateQuestion";
import Homepage from "../Homepage/Homepage";
import MyQuestions from "./MyQuestions/MyQuestions";
import DetailQuestion from "./DetailQuestion/DetailQuestion";
import EditQuestion from "./EditQuestion/EditQuestion";

function Question(props) {
  const match = useRouteMatch();
  console.log(match);
  return (
    <Switch>
      <Route exact path={match.url} component={Homepage} />
      <Route path={`${match.url}/create`} component={CreateQuestion} />
      <Route path={`${match.url}/myquestions`} component={MyQuestions} />
      <Route
        path={`${match.url}/detail/:questionId`}
        component={DetailQuestion}
      />
      <Route path={`${match.url}/edit/:questionId`} component={EditQuestion} />
    </Switch>
  );
}
export default Question;
