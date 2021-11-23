import React, { useState } from 'react';

import { getUserLanguage, loadLocaleMessages } from '../utils/i18n';
import { Props, AppContextInterface } from '../global';

const userLanguage = getUserLanguage();

const appContext: AppContextInterface = {
  appSettings: {
    loadInitialData: true,
    name: 'React Typescript App',
    locale: userLanguage,
    messages: loadLocaleMessages(userLanguage)
  },
  setAppSettings: ({ }) => {
  }
};

export const AppContext = React.createContext<AppContextInterface>(appContext);

const AppProvider: React.FC<Props> = ({ children }) => {
  const [appSettings, setAppSettings] = useState({ ...appContext.appSettings });

  return (
    <AppContext.Provider value={{ appSettings, setAppSettings }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;