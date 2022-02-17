import React, { memo } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';

import RequireAuth from 'commons/RequireAuth';
import MainArea from 'views/MainArea';
import SignIn from 'views/SignIn';
import VolunteerProfile from 'views/VolunteerProfile';
import SignUp from 'views/SignUp';
import { Props } from 'types';

export const Routes = {
  HOME: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  VOLUNTEER_PROFILE: '/volunteerProfile'
};

const AppRoutes: React.FC<Props> = () => (
  <ReactRoutes>
    <Route path={Routes.SIGN_IN} key="SIGN_IN" element={<SignIn />} />
    <Route path={Routes.SIGN_UP} key="SIGN_UP" element={<SignUp />} />
    <Route path={Routes.HOME} key="HOME" element={<RequireAuth><MainArea /></RequireAuth>} />
    <Route path={Routes.VOLUNTEER_PROFILE} key="VOLUNTEER_PROFILE" element={<RequireAuth><VolunteerProfile /></RequireAuth>} />
  </ReactRoutes>
);

export default memo(AppRoutes);