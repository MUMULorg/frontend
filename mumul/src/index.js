import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider} from "@react-oauth/google";
import HttpsRedirect from 'react-https-redirect';

// const root = ReactDOM.create(document.getElementById('root'));
ReactDOM.render(
  <HttpsRedirect>
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
  </HttpsRedirect>
  , document.getElementById('root')
);

reportWebVitals();
