import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/userContext';

const domain: string = process.env.REACT_APP_AUTH0_DOMAIN || '';
const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
console.log(`${window.location.origin}/user-validation`);
ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={`${window.location.origin}/user-validation`}
  >
    <UserProvider value={{}}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
