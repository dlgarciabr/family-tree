import React from 'react';

import { Props } from '../../types';
import { FormattedMessage } from 'react-intl';
import { AppContext, actions } from '../../context/App';
import { loadLocaleMessages, locales } from '../../utils/i18n';

const MainArea: React.FC<Props> = () => {
  const { dispatch: contextDispatch } = React.useContext(AppContext);

  const changeLanguage = async (newLocale: string) => {
    const newMessages = await loadLocaleMessages(newLocale);
    contextDispatch({
      type: actions.LOCALE_CHANGED,
      messages: newMessages,
      locale: newLocale
    });
  };

  return (
    <div>
      <FormattedMessage id='app-title' />
      <div>user area</div>
      <button type='button' onClick={() => changeLanguage(locales.EN)}>En</button>
      <button type='button' onClick={() => changeLanguage(locales.ES)}>Es</button>
      <button type='button' onClick={() => changeLanguage(locales.PT_BR)}>Pt-Br</button>
      <button type='button' onClick={() => changeLanguage(locales.PT)}>Pt</button>
    </div>
  );
};

export default MainArea;