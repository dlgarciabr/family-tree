import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

import { Props } from '../../types';
import { AppContext, actions } from '../../context/App';
import { loadLocaleMessages, locales } from '../../utils/i18n';

const MainArea: React.FC<Props> = () => {
  const { dispatch: contextDispatch } = React.useContext(AppContext);

  const changeLanguage = (newLocale: string) => {
    const newMessages = loadLocaleMessages(newLocale);
    contextDispatch({
      type: actions.LOCALE_CHANGED,
      messages: newMessages,
      locale: newLocale
    });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <FormattedMessage id="app-title" />
            </Typography>
            <button type="button" onClick={() => changeLanguage(locales.EN)}>En</button>
            <button type="button" onClick={() => changeLanguage(locales.ES)}>Es</button>
            <button type="button" onClick={() => changeLanguage(locales.PT_BR)}>Pt-Br</button>
            <button type="button" onClick={() => changeLanguage(locales.PT)}>Pt</button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default MainArea;