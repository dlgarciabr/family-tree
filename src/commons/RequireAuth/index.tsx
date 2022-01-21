import React, { memo, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { AuthenticationContext } from 'context/Authentication';

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

  if (!user && !sessionStorageCredentials) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default memo(RequireAuth);