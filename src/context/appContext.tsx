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

interface UpdateAppContext {
  (newSettings: AppSettings): void;
}

interface AppContextInterface {
  appSettings: AppSettings,
  updateAppContext: UpdateAppContext
}

const userLanguage = getUserLanguage();

const appContext: AppContextInterface = {
  appSettings: {
    loadInitialData: true,
    name: 'React Typescript App',
    locale: userLanguage,
    messages: loadLocaleMessages(userLanguage)
  },
  updateAppContext: ({ }) => {
  }
};

export const AppContext = React.createContext<AppContextInterface | null>(appContext);

const AppProvider: React.FC<Props> = ({ children }) => {
  const [appSettings, setAppSettings] = useState({ ...appContext.appSettings });

  const updateAppContext = (newSettings: AppSettings) => {
    setAppSettings({ ...appSettings, ...newSettings });
  };

  return (
    <AppContext.Provider value={{ appSettings, updateAppContext }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;