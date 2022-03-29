import React from 'react';
import { IntlProvider } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { AppContext } from 'context/App';
import AuthenticationProvider from 'context/Authentication';
import { Props } from 'types';
import notifierEffect from 'utils/notifierEffect';
import TopBar from 'components/TopBar';

const App: React.FC<Props> = ({ children }) => {
  const {
    appSettings: {
      locale
    }
  } = React.useContext(AppContext);
  const navigate = useNavigate();

  notifierEffect();

  const navigateToHiddenPath = () => {
    const hiddenInput = document.querySelector('[data-testid=\'PATH_HIDDEN_INPUT\']') as HTMLInputElement;
    navigate(hiddenInput.value.replace('//', '/'));
  };

  return (
    <IntlProvider
      locale={locale.value}
      messages={locale.messages}
    >
      <AuthenticationProvider>
        <div className="App">
          <input type="text" data-testid="PATH_HIDDEN_INPUT" style={{ 'display': 'none' }} />
          <a href="#" data-testid="PATH_HIDDEN_BUTTON" style={{ 'display': 'none' }} onClick={navigateToHiddenPath}></a>
          <TopBar />
          {children}
        </div>
      </AuthenticationProvider>
    </IntlProvider>
  );
};

export default App;