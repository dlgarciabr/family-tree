import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './context/App';
import AuthenticationProvider from './context/Authentication';
import './index.css';
import App from './views/App';
import { store } from './utils/reduxStore';
import reportWebVitals from './reportWebVitals';
import AppRoutes from 'commons/AppRoutes';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
          <AuthenticationProvider>
            <AppProvider>
              <App>
                <AppRoutes />
              </App>
            </AppProvider>
          </AuthenticationProvider>
        </Provider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
