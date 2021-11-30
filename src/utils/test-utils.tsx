import { render as originalRender } from '@testing-library/react';
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack';

import AppProvider from '../context/App';
import App from '../views/App';
import { Props } from '../types';
import { store } from './reduxStore';

export const APP_COMPONENT_KEY = "App";

const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <AppProvider>
          <App>{children}</App>
        </AppProvider>
      </SnackbarProvider>
    </Provider>
  )
}

const customRender = (ui: any, options?: any) =>
  originalRender(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";

export { customRender as render };
