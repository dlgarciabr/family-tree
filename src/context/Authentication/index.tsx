import React, {
  createContext,
  memo,
  useReducer
} from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Props, AuthCredentials, AuthContextType, AuthContextState, User
} from 'types';
import {
  useSigninMutation, useSignupMutation, useLazyValidateTokenQuery
} from 'services/volunteerHubApi';

import { Routes } from 'components/AppRoutes';

export const AuthenticationContext = createContext<AuthContextType>({} as AuthContextType);
AuthenticationContext.displayName = 'AuthenticationContext';

export const actions = {
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  USER_LOGGED_UP: 'USER_LOGGED_UP',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT'
};

const AuthenticationProvider: React.FC<Props> = ({ children }) => {
  const [fetchToken] = useSigninMutation();
  const [registerUser] = useSignupMutation();
  const [checkTokenValidity] = useLazyValidateTokenQuery();

  const navigate = useNavigate();

  const initialState = {
    user: null, token: null
  };

  const [currentState, dispatch] = useReducer((state: AuthContextState, action: any) => {
    switch (action.type) {
      case 'RESET_STATE':
        return { ...state };
      case actions.USER_LOGGED_IN:
        return {
          ...state,
          user: { id: action.data.id },
          token: action.data.token
        };
      case actions.USER_LOGGED_UP:
        return {
          ...state,
          user: { id: action.data.id },
        };
      case actions.USER_LOGGED_OUT:
        return {
          ...state,
          user: null,
          token: null
        };
      default:
        throw new Error();
    }
  }, initialState);

  const operations = {
    signIn: async (credentials: AuthCredentials, callback: VoidFunction) => {
      fetchToken({ userSigninData: credentials })
        .then((payload: any) => {
          if (!payload.error) {
            dispatch({ type: actions.USER_LOGGED_IN, data: payload.data });
            sessionStorage.setItem(
              'credentials',
              JSON.stringify({ ...payload.data })
            );
            if (callback) {
              callback();
            }
          }
        })
        .catch(() => {
          // handled by error middleware
        });
    },
    signOut: (callback?: VoidFunction) => {
      dispatch({ type: actions.USER_LOGGED_OUT });
      sessionStorage.clear();
      if (callback) {
        callback();
      }
    },
    signUp: async (userData: User) => {
      registerUser({ userSignupData: userData })
        .then((payload: any) => {
          dispatch({ type: actions.USER_LOGGED_UP, data: payload.data });
          navigate(Routes.HOME);
          // sessionStorage.setItem(
          //   'credentials',
          //   JSON.stringify({ ...payload.data })
          // );
        });
    },
    validateToken: async (storageCredentials: string, nextLocation: string) => {
      if (currentState.user) {
        return;
      }
      const credentials = JSON.parse(storageCredentials);
      const payload = await checkTokenValidity({ token: credentials.token });

      if (payload.data && payload.data.valid) {
        dispatch({ type: actions.USER_LOGGED_IN, data: payload.data });
        navigate(nextLocation);
      } else {
        dispatch({ type: actions.USER_LOGGED_OUT });
        sessionStorage.clear();
        navigate(Routes.SIGN_IN);
      }
    }
  };

  return (
    <AuthenticationContext.Provider value={{ state: currentState, operations }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default memo(AuthenticationProvider);