import React, { useEffect, memo } from 'react';
import { IntlProvider } from 'react-intl';
import { Routes, Route } from 'react-router-dom';

import { AppContext } from 'context/App';
import useNotification from 'hooks/notificationHandler';
import { Props } from 'types';
import RequireAuth from 'commons/RequireAuth';
import MainArea from 'views/MainArea';
import Login from 'views/Login';
import Dummy from 'views/Dummy';
import notifierEffect from './notifierEffect';

const App: React.FC<Props> = () => {
  const { showInfoNotification } = useNotification();

  const {
    appSettings: {
      messages, locale, loadInitialData
    }
  } = React.useContext(AppContext);

  notifierEffect();

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (!loadInitialData) {
      showInfoNotification(`locale changed to ${locale}`);
    }
  }, [locale]);

  const routeList = [
    <Route path="/" key="HOME" element={<RequireAuth><MainArea /></RequireAuth>} />,
    <Route path="/login" key="LOGIN" element={<Login />} />,
    <Route path="/dummy" key="DUMMY" element={<RequireAuth><Dummy /></RequireAuth>} />
  ];

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
    >
      <div className="App">
        {/* {user ? <MainArea /> : <Login />} */}
        <Routes>
          {routeList}
        </Routes>
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

export default memo(App);