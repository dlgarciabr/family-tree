import React, { createContext, useReducer } from 'react';

import { getUserLanguage, loadLocaleMessages } from '../../utils/i18n';
import { Props, AppContextInterface, AppSettings } from '../../types';

export const actions = {
  LOCALE_CHANGED: 'LOCALE_CHANGED',
  INITIAL_DATA_LOADED: 'INITIAL_DATA_LOADED',
  USER_LOGGED_IN: 'USER_LOGGED_IN'
};

const userLanguage = getUserLanguage();

const initialAppSettings: AppSettings = {
  loadInitialData: true,
  name: 'React Typescript App',
  locale: userLanguage,
  messages: loadLocaleMessages(userLanguage),
  user: null
};

export const AppContext = createContext<AppContextInterface>({} as AppContextInterface);

const AppProvider: React.FC<Props> = ({ children }) => {
  const [appSettings, dispatch] = useReducer((state: AppSettings, action: any) => {
    switch (action.type) {
      case 'RESET_STATE':
        return { ...state };
      case actions.LOCALE_CHANGED:
        return {
          ...state,
          messages: action.messages,
          locale: action.locale
        };
      case actions.INITIAL_DATA_LOADED:
        return {
          ...state,
          loadInitialData: false
        };
      case actions.USER_LOGGED_IN:
        return {
          ...state,
          user: action.data
        };
      default:
        throw new Error();
    }
  }, initialAppSettings);

  return (
    <AppContext.Provider value={{ appSettings, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;