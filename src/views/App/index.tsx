import React, { useEffect, memo } from 'react';
import { IntlProvider } from 'react-intl';

import { AppContext } from 'context/App';
import useNotification from 'hooks/notificationHandler';
import { Props } from 'types';
import notifierEffect from './notifierEffect';
import AppRoutes from 'commons/AppRoutes';

const App: React.FC<Props> = () => {
  const { showInfoNotification } = useNotification();

  const {
    appSettings: {
      messages, locale, loadInitialData
    }
  } = React.useContext(AppContext);

  notifierEffect();

  useEffect(() => {
    if (!loadInitialData) {
      showInfoNotification(`locale changed to ${locale}`);
    }
  }, [locale]);

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
    >
      <div className="App">
        <AppRoutes />
      </div>
    </IntlProvider>
  );
};

export default memo(App);