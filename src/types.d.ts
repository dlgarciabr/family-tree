import { PartialLocation } from 'history';
import { MessageFormatElement } from 'intl-messageformat-parser';

export interface Props {
  children?: JSX.Element | string;
};

export interface AppSettings {
  loadInitialData: boolean;
  name: string;
  locale: string;
  messages: Record<string, MessageFormatElement[]>;
  user: User | null
}

export interface AppContextType {
  appSettings: AppSettings;
  dispatch: React.Dispatch<any>;
}

export interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  signin: (credentials: AuthCredentials, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  validateToken: (storageCredentials: string, nextLocation: string) => void;
}

export interface AuthCredentials {
  email: string;
  password: string
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number
}

export interface RelativeNode {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number
}