/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React, { Suspense } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect, Link,
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="KnowX-Website">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/" />
            <Route path="" />
            <Route path="" />
          </Switch>
        </BrowserRouter>
      </Suspense>
      Hello
    </div>
  );
}

export default App;
