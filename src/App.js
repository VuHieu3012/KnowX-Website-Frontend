/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React, { Suspense } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication';
import NotFound from './components/NotFound';
// const Authentication = React.lazy(() => import('.pages/Authentication/index.js'));
function App() {
  return (
    <div className="KnowX-Website">
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/auth" />
          <Route path="/auth" component={Authentication} />
          <Route path="/homepage" component={Authentication} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
