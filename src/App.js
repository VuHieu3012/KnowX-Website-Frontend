/* eslint-disable import/no-unresolved */
import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/NotFound";
import FindBuddy from "./pages/Find/FindBuddy/FindBuddy";

const Authentication = React.lazy(() => import("./pages/Authentication"));
const Homepage = React.lazy(() => import("./pages/Homepage/Homepage"));
const Post = React.lazy(() => import("./pages/Post"));
const Question = React.lazy(() => import("./pages/Question"));
const Profile = React.lazy(() => import("./pages/Profile/MyProfile/Profile"));
const OtherProfile = React.lazy(() => import("./pages/Profile/OtherProfile/Profile"));

function App() {
  return (
    <div className="KnowX-Website">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/auth" />
            <Route path="/auth" component={Authentication} />
            <Route path="/post" component={Post} />
            <Route path="/homepage" component={Homepage} />
            <Route path="/question" component={Question} />
            <Route path="/profile" component={Profile} />
            <Route path="/otherprofile/:id" component={OtherProfile} />
            <Route path="/buddy" component={FindBuddy} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
