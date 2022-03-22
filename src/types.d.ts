export interface Props {
  children?: JSX.Element | string;
};

export interface IndexedType {
  [key: string]: string;
}

export interface Locale {
  value: string;
  name: string;
  messages: Record<string, string>;
  getMessage: (key: string) => string;
}

export interface AppSettings {
  loadInitialData: boolean;
  locale: Locale;
}

export interface AppContextType {
  appSettings: AppSettings;
  dispatch: React.Dispatch<any>;
}

export interface AuthContextState {
  user?: User;
  token?: string;
}

export interface AuthContextType {
  state: AuthContextState,
  operations: {
    signIn: (credentials: AuthCredentials, callback: VoidFunction) => void;
    signOut: (callback?: VoidFunction) => void;
    signUp: (userData: User) => void;
    validateToken: (storageCredentials: string, nextLocation: string) => void;
  }
}

export interface AuthCredentials extends IndexedType {
  email: string;
  password: string;
}

//TODO review to change fields to required
export interface User extends IndexedType {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  userStatus?: number;
}

export interface Volunteer extends User {
  preferedSupportLanguages: string;
  preferedSupportType: PreferedSupportType;
  title?: string;
  coverLetter?: string;
  photo?: string;
  phone?: string;
}

export type PreferedSupportType = 'PRESENTIAL' | 'REMOTE' | 'BOTH';