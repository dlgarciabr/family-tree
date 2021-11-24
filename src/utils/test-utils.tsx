import { render as originalRender } from "@testing-library/react";
import AppProvider from '../context/App';
import App from "../components/App";
import { Props } from "../global"

export const APP_COMPONENT_KEY = "App";

const Providers = ({ children }: Props) => {
  return (
    <AppProvider>
      <App>{children}</App>
    </AppProvider>
  )
}

const customRender = (ui: any, options?: any) =>
  originalRender(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";

export { customRender as render };
