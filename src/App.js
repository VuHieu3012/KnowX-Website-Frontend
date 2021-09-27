import React, { Suspense } from "react";
import {
  BrowserRouter, Route, Switch, Redirect,
} from "react-router-dom";
import NotFound from "./components/NotFound";
// import Authentication from './pages/Authentication';

const Authentication = React.lazy(() => import("./pages/Authentication"));

function App() {
  return (
    <div className="KnowX-Website">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/auth" />
            <Route path="/auth" component={Authentication} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
