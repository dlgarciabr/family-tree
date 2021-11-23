import React, { useState } from 'react';
import { MessageFormatElement } from 'intl-messageformat-parser';

import { getUserLanguage, loadLocaleMessages } from '../utils/i18n';
import { Props } from '../types/global';

interface AppSettings {
  loadInitialData: boolean,
  name: string;
  locale: string;
  messages: Record<string, MessageFormatElement[]>
}

interface AppContextInterface {
  appSettings: AppSettings,
  setAppSettings: React.Dispatch<React.SetStateAction<AppSettings>>
}

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