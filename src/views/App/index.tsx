import React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
// import ReactDOM from 'react-dom';

import { AppContext, actions } from '../../context/App';
import { loadLocaleMessages, locales } from '../../utils/i18n';
import { Props } from '../../global';
import logo from '../../logo.svg';
import './style.css';
import Dummy from '../Dummy';

const App: React.FC<Props> = () => {
  const appContext = React.useContext(AppContext);

  const { appSettings: { messages, locale, name }, dispatch } = appContext;

  const changeLanguage = async (newLocale: string) => {
    const newMessages = await loadLocaleMessages(newLocale);
    dispatch({
      type: actions.LOCALE_CHANGED,
      messages: newMessages,
      locale: newLocale
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
          <button type="button" onClick={() => changeLanguage(locales.EN)}>En</button>
          <button type="button" onClick={() => changeLanguage(locales.ES)}>Es</button>
          <button type="button" onClick={() => changeLanguage(locales.PT_BR)}>Pt-Br</button>
          <button type="button" onClick={() => changeLanguage(locales.PT)}>Pt</button>
          <Dummy />
        </header>
      </div>
    </IntlProvider>
  );
};

export default App;