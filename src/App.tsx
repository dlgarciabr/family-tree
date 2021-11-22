import React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { AppContext } from './context/appContext';
import { loadLocaleMessages } from './utils/i18n';
import { Props } from './types/global';
import logo from './logo.svg';
import './App.css';

const App: React.FC<Props> = () => {
  const appContext = React.useContext(AppContext);
  if (!appContext) {
    return null;
  }

  const { appSettings: { messages, locale, name }, appSettings, updateAppContext } = appContext;

  const changeLocale = async (newLocale: string) => {
    const newMessages = await loadLocaleMessages(newLocale);
    updateAppContext({
      ...appSettings,
      messages: newMessages
    });
  };

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
    >
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{name}</p>
          <p><FormattedMessage id="app-title" /></p>
          <button type="button" onClick={() => changeLocale('en')}>En</button>
          <button type="button" onClick={() => changeLocale('es')}>Es</button>
          <button type="button" onClick={() => changeLocale('pt-br')}>Pt-Br</button>
          <button type="button" onClick={() => changeLocale('pt')}>Pt</button>
        </header>
      </div>
    </IntlProvider>
  );
};

export default App;