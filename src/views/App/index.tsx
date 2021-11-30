import React, { useEffect } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
// import ReactDOM from 'react-dom';
// import { useSelector, useDispatch } from 'react-redux';

import { AppContext, actions } from '../../context/App';
import { loadLocaleMessages, locales } from '../../utils/i18n';
import useNotification from '../../hooks/notificationHandler';
import { Props } from '../../types';
import logo from '../../logo.svg';
import './style.css';
import Dummy from '../Dummy';
import notifierEffect from './notifierEffect';
import { SnackbarKey, useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/reduxStore';

// import { useGetUserByNameQuery } from '../../services/user';
import { useGetRelativeNodeByNameQuery } from '../../services/relativeNode';

const App: React.FC<Props> = () => {
  // const reduxDispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { showSuccessMessage, showInfoMessage, showErrorMessage } = useNotification();
  const { appSettings: { messages, locale, name, loadInitialData }, dispatch: contextDispatch } = React.useContext(AppContext);
  const { data, error, isLoading, } = useGetRelativeNodeByNameQuery("sdasd");


  const { notifications } = useSelector(
    (state: RootState) => state.notification
  );

  const changeLanguage = async (newLocale: string) => {
    const newMessages = await loadLocaleMessages(newLocale);
    contextDispatch({
      type: actions.LOCALE_CHANGED,
      messages: newMessages,
      locale: newLocale
    });
  };


  if (isLoading) {
    console.log("isLoading ", isLoading)
  } else {
    // console.log("data ", data)
    // showErrorMessage();
  }

  notifierEffect();

  // useEffect(() => {
  //   notifications.forEach(({
  //     key, message, options = {}, dismissed = false
  //   }) => {


  //     enqueueSnackbar(message, {
  //       key,
  //       ...options
  //     });

  //   });
  // }, [notifications]);

  useEffect(() => {
    contextDispatch({
      type: actions.INITIAL_DATA_LOADED
    });
  }, []);

  useEffect(() => {
    if (!loadInitialData) {
      showInfoMessage("locale changed");
    }
  }, [locale]);

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