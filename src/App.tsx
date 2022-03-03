import React from 'react';
import { IntlProvider } from 'react-intl';

import { AppContext } from 'context/App';
import AuthenticationProvider from 'context/Authentication';

import { Props } from 'types';
import notifierEffect from './utils/notifierEffect';
import TopBar from 'components/TopBar';

const App: React.FC<Props> = ({ children }) => {
  const {
    appSettings: {
      messages, locale
    }
  } = React.useContext(AppContext);

  notifierEffect();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
    >
      <AuthenticationProvider>
        <div className="App">
          <TopBar />
          {children}
        </div>
      </AuthenticationProvider>
    </IntlProvider>
  );
};

export default App;