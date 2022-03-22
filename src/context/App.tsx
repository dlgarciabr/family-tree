import React, { createContext, useReducer } from 'react';

import { getUserLanguage, locales } from '../utils/i18n';
import { Props, AppContextType, AppSettings } from '../types';

export const actions = {
  LOCALE_CHANGED: 'LOCALE_CHANGED',
  INITIAL_DATA_LOADED: 'INITIAL_DATA_LOADED',
  TOKEN_VALIDATION_STARDED: 'TOKEN_VALIDATION_STARDED',
  TOKEN_VALIDATION_FINISHED: 'TOKEN_VALIDATION_FINISHED'
};

const userLanguage = getUserLanguage();
const userLocale = Object.values(locales).find((locale) => locale.value === userLanguage);

const initialAppSettings: AppSettings = {
  loadInitialData: true,
  locale: userLocale || locales.EN
};

export const AppContext = createContext<AppContextType>({} as AppContextType);
AppContext.displayName = 'AppContext';

const AppProvider: React.FC<Props> = ({ children }) => {
  const [appSettings, dispatch] = useReducer((state: AppSettings, action: any) => {
    switch (action.type) {
      case 'RESET_STATE':
        return { ...state };
      case actions.LOCALE_CHANGED:
        return {
          ...state,
          locale: action.locale
        };
      default:
        throw new Error();
    }
  }, {
    ...initialAppSettings
  });

  return (
    <AppContext.Provider value={{ appSettings, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;