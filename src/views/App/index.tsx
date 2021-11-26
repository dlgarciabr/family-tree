import React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
// import ReactDOM from 'react-dom';
// import { useSelector, useDispatch } from 'react-redux';

import { AppContext, actions } from '../../context/App';
import { loadLocaleMessages, locales } from '../../utils/i18n';
import { useShowSuccessMessage, useShowErrorMessage, useShowInfoMessage } from "../../hooks/messageHandler";
import { Props } from '../../global';
import logo from '../../logo.svg';
import './style.css';
import Dummy from '../Dummy';
import useNotifier from 'utils/useNotifier';

const App: React.FC<Props> = () => {
  useNotifier();
  const appContext = React.useContext(AppContext);
  // const reduxDispatch = useDispatch();

  const showSuccessMessage = useShowSuccessMessage();
  const showErrorMessage = useShowErrorMessage();
  const showInfoMessage = useShowInfoMessage();

  const { appSettings: { messages, locale, name }, dispatch: contextDispatch } = appContext;

  const changeLanguage = async (newLocale: string) => {
    const newMessages = await loadLocaleMessages(newLocale);
    contextDispatch({
      type: actions.LOCALE_CHANGED,
      messages: newMessages,
      locale: newLocale
    });
    showSuccessMessage("asdasdasdasdasd");
    showErrorMessage("asdasd");
    // showInfoMessage("info");
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