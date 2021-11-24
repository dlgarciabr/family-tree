import React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
// import ReactDOM from 'react-dom';

import { AppContext } from '../../context/App';
import { loadLocaleMessages } from '../../utils/i18n';
import { Props } from '../../global';
import logo from '../../logo.svg';
import './style.css';
import Dummy from '../Dummy';

const App: React.FC<Props> = () => {
  const appContext = React.useContext(AppContext);

  const { appSettings: { messages, locale, name }, appSettings, setAppSettings } = appContext;

  const changeLocale = async (newLocale: string) => {
    const newMessages = await loadLocaleMessages(newLocale);
    setAppSettings({
      ...appSettings,
      locale: newLocale,
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
          <p>
            App:
            {name}
          </p>
          <p>
            Selected locale:
            {locale}
          </p>
          <p><FormattedMessage id="app-title" /></p>
          <button type="button" onClick={() => changeLocale('en')}>En</button>
          <button type="button" onClick={() => changeLocale('es')}>Es</button>
          <button type="button" onClick={() => changeLocale('pt-br')}>Pt-Br</button>
          <button type="button" onClick={() => changeLocale('pt')}>Pt</button>
          <Dummy></Dummy>
        </header>
      </div>
    </IntlProvider>
  );
};

export default App;