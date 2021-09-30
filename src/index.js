/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Test from './test';

ReactDOM.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();
