import React, { useEffect } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
// import ReactDOM from 'react-dom';
// import { useSelector, useDispatch } from 'react-redux';

import { AppContext, actions } from '../../context/App';
import { loadLocaleMessages, locales } from '../../utils/i18n';
import useNotification from '../../hooks/notificationHandler';
import { Props, RelativeNode } from '../../types';
import logo from '../../logo.svg';
import './style.css';
import Dummy from '../Dummy';
import notifierEffect from './notifierEffect';
import { SnackbarKey, useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/reduxStore';

// import { useGetUserByNameQuery } from '../../services/user';
import { useGetRelativeByNameQuery, useSaveNodeMutation, GetRelativeByNameApiArg, User } from '../../services/relativeNodeApi';

const App: React.FC<Props> = () => {
  // const reduxDispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { showSuccessMessage, showInfoMessage, showErrorMessage } = useNotification();
  const { appSettings: { messages, locale, name, loadInitialData }, dispatch: contextDispatch } = React.useContext(AppContext);
  const { data, error, isLoading } = useGetRelativeByNameQuery({ name: "qwew" });
  const { 0: saveNode } = useSaveNodeMutation();
  // const { updateRelativeNode } = useUpdateRelativeNodeMutation();

  const changeLanguage = async (newLocale: string) => {
    const newMessages = await loadLocaleMessages(newLocale);
    contextDispatch({
      type: actions.LOCALE_CHANGED,
      messages: newMessages,
      locale: newLocale
    });
  };

  const createRelative = async () => {
    const newRelativeNode = {
      'id': 0,
      'username': 'string',
      'firstName': 'string',
      'lastName': 'string',
      'email': 'string',
      'password': 'string',
      'phone': 'string',
      'userStatus': 0
    } as User;

    // saveNodeMutation({ user: newRelativeNode });
    saveNode({ user: newRelativeNode });
  };

  if (isLoading) {
    console.log("loading")
  } else {
    console.log(data);
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
      showInfoMessage('locale changed');
    }
  }, [locale]);

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
    >
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            App:
            {name}
          </p>
          <p>
            Selected locale:
            {locale}
          </p>
          <p><FormattedMessage id='app-title' /></p>
          <button type='button' onClick={() => changeLanguage(locales.EN)}>En</button>
          <button type='button' onClick={() => changeLanguage(locales.ES)}>Es</button>
          <button type='button' onClick={() => changeLanguage(locales.PT_BR)}>Pt-Br</button>
          <button type='button' onClick={() => changeLanguage(locales.PT)}>Pt</button>
          <button type='button' onClick={() => createRelative()}>Create node</button>
          <Dummy />
        </header>
      </div>
    </IntlProvider>

  );
};

export default App;