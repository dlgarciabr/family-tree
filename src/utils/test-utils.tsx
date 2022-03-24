import { render as originalRender, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from "react-router-dom";

import { locales } from 'utils/i18n';
import AppProvider from '../context/App';
import App from '../App';
import { Props } from '../types';
import { store } from '../redux/reduxStore';
import AppRoutes, { Routes } from 'components/AppRoutes';

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

// const customRender = (ui: any, options?: any) => {
//   console.log('>>>> before:', location.pathname)
//   const renderResult = originalRender(ui, { wrapper: Providers, ...options });
//   console.log('>>>> after:', location.pathname)
//   return renderResult;
// }

const customRender = (ui: any, options?: any) => originalRender(ui, { wrapper: Providers, ...options });

const navigateTo = async (path: string) => {
  const hiddenInput = screen.getByTestId('PATH_HIDDEN_INPUT');
  userEvent.type(hiddenInput, path);
  const hiddenPath = screen.getByTestId('PATH_HIDDEN_BUTTON');
  userEvent.click(hiddenPath);
  await waitFor(() =>
    expect(
      location.pathname
    ).toBe(path)
  );
}

const navigateToHome = async () => {
  // const mainAreaTitle = locales.EN.getMessage('main.area.title');
  const currentPath = location.pathname;
  if (currentPath != Routes.HOME) {
    await navigateTo(Routes.HOME);
  }

  // const appTitle = locales.EN.getMessage('app.title');
  // await waitFor(() =>
  //   expect(
  //     screen.queryByRole('link', { name: appTitle })
  //   ).toBeInTheDocument()
  // );
  // const homeButton = screen.getByRole('link', { name: appTitle });
  // userEvent.click(homeButton);
};

const roles = {
  BUTTON: 'button',
  HEADING: 'heading',
  LINK: 'link',
  TEXTBOX: 'textbox'
}

export * from "@testing-library/react";

export { customRender as render, navigateTo, navigateToHome, roles };