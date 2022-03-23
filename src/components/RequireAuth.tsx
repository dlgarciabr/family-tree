import React, { memo, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { AuthenticationContext } from 'context/Authentication';
import { Routes } from 'components/AppRoutes';

// TODO revisar
interface Props {
  children: JSX.Element;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
  const sessionStorageCredentials = sessionStorage.getItem('credentials');
  const {
    state: { user },
    operations: { validateToken }
  } = React.useContext(AuthenticationContext);
  const location = useLocation();

  useEffect(() => {
    if (!user && sessionStorageCredentials) {
      (async () => {
        validateToken(sessionStorageCredentials, location.pathname);
      })();
    }
  }, []);

  if (user) {
    return children;
  } else {
    if (!user && !sessionStorageCredentials) {
      return <Navigate to={Routes.SIGN_IN} state={{ from: location }} replace />;
    } else {
      return <div>loading</div>;
    }
  }
};

export default memo(RequireAuth);