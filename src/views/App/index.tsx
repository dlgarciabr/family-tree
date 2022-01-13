import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';

import MainArea from '../MainArea';
import { AppContext, actions } from '../../context/App';
import useNotification from '../../hooks/notificationHandler';
import { Props } from '../../types';
// import logo from '../../logo.svg';
// import './style.css';
import notifierEffect from './notifierEffect';
import { useLazyValidateTokenQuery } from '../../services/familyTreeApi';

import Login from '../Login';

const App: React.FC<Props> = () => {
  const storageCredentials = sessionStorage.getItem('credentials');
  const { showInfoNotification } = useNotification();

  const {
    appSettings: {
      messages, locale, user, loadInitialData
    },
    dispatch: contextDispatch
  } = React.useContext(AppContext);

  const [validateToken, validationTokenResult] = useLazyValidateTokenQuery();

  notifierEffect();

  useEffect(() => {
    if (user === null && storageCredentials) {
      const credentials = JSON.parse(storageCredentials);
      if (credentials) {
        validateToken({ token: credentials.token });
      }
    }
  }, []);

  useEffect(() => {
    if (!loadInitialData) {
      showInfoNotification(`locale changed to ${locale}`);
    }
  }, [locale]);

  useEffect(() => {
    if (storageCredentials && validationTokenResult.data) {
      if (validationTokenResult.data?.valid) {
        const credentials = JSON.parse(storageCredentials as string);
        contextDispatch({
          type: actions.USER_LOGGED_IN,
          data: { ...credentials }
        });
      } else {
        sessionStorage.removeItem('credentials');
      }
    }
  }, [validationTokenResult.data]);

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
    >
      <div className="App">
        {user ? <MainArea /> : <Login />}
        {/* <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            App:
            {name}
          </p>
          <p>
            Selected locale:
            {locale}
          </p>
          <button type='button' onClick={() => createRelative()}>Create node</button>
          <Dummy />
        </header> */}
      </div>
    </IntlProvider>

  );
};

export default App;