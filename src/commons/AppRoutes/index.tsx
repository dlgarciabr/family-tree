import React, { memo } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';

import RequireAuth from 'commons/RequireAuth';
import MainArea from 'views/MainArea';
import Login from 'views/Login';
import Dummy from 'views/Dummy';
import SignUp from 'views/SignUp';
import { Props } from 'types';

export const Routes = {
  HOME: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  DUMMY: '/dummy'
};

const AppRoutes: React.FC<Props> = () => (
  <ReactRoutes>
    <Route path={Routes.HOME} key="HOME" element={<RequireAuth><MainArea /></RequireAuth>} />,
    <Route path={Routes.SIGN_IN} key="SIGN_IN" element={<Login />} />,
    <Route path={Routes.SIGN_UP} key="SIGN_UP" element={<SignUp />} />,
    <Route path={Routes.DUMMY} key="DUMMY" element={<RequireAuth><Dummy /></RequireAuth>} />
  </ReactRoutes>
);

export default memo(AppRoutes);