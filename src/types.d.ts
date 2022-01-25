export interface Props {
  children?: JSX.Element | string;
};

export interface AppSettings {
  loadInitialData: boolean;
  locale: string;
  messages: Record<string, string>;
}

export interface AppContextType {
  appSettings: AppSettings;
  dispatch: React.Dispatch<any>;
}

export interface AuthContextState {
  user: User | null;
  token: string | null;
}

export interface AuthContextType {
  state: AuthContextState,
  operations: {
    signin: (credentials: AuthCredentials, callback: VoidFunction) => void;
    signout: (callback?: VoidFunction) => void;
    validateToken: (storageCredentials: string, nextLocation: string) => void;
  }
}

export interface AuthCredentials {
  email: string;
  password: string
}

export interface User {
  id: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  userStatus?: number
}