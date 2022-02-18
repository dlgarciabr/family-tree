import { render as originalRender } from '@testing-library/react';
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from "react-router-dom";

import AppProvider from '../context/App';
import App from '../App';
import { Props } from '../types';
import { store } from '../redux/reduxStore';
import AppRoutes from 'components/AppRoutes';

const Providers = ({ children }: Props) => {
  const isAppChildrenComponent = ((children as any).type as any).type === (App as any).type;
  return (
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <AppProvider>
            {
              isAppChildrenComponent ?
                <App><AppRoutes /></App> :
                <App>{children}</App>
            }
          </AppProvider>
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  )
}

const customRender = (ui: any, options?: any) =>
  originalRender(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";

export { customRender as render };