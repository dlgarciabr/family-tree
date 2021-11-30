import { MessageFormatElement } from 'intl-messageformat-parser';

export interface Props {
  children?: JSX.Element | string;
};

export interface AppSettings {
  loadInitialData: boolean,
  name: string;
  locale: string;
  messages: Record<string, MessageFormatElement[]>
}

export interface AppContextInterface {
  appSettings: AppSettings,
  dispatch: React.Dispatch<any>
}

export interface User {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string,
  userStatus: number
}

export interface RelativeNode {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string,
  userStatus: number
}