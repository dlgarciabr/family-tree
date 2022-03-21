import React, { memo } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';

import RequireAuth from 'components/RequireAuth';
import MainArea from 'pages/MainArea';
import SignIn from 'pages/SignIn';
import VolunteerProfile from 'pages/VolunteerProfile';
import SignUp from 'pages/SignUp';
import { Props } from 'types';
import Dummy from 'pages/Dummy';

export const Routes = {
  HOME: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  PROTECTED_DUMMY: '/protectedDummy',
  VOLUNTEER_PROFILE: '/volunteerProfile/'
};

const AppRoutes: React.FC<Props> = () => (
  <ReactRoutes>
    <Route path={Routes.SIGN_IN} key="SIGN_IN" element={<SignIn />} />
    <Route path={Routes.SIGN_UP} key="SIGN_UP" element={<SignUp />} />
    <Route path={Routes.HOME} key="HOME" element={<RequireAuth><MainArea /></RequireAuth>} />
    <Route path={Routes.PROTECTED_DUMMY} key="PROTECTED_DUMMY" element={<RequireAuth><Dummy /></RequireAuth>} />
    <Route path={`${Routes.VOLUNTEER_PROFILE}:id`} key="VOLUNTEER_PROFILE" element={<RequireAuth><VolunteerProfile /></RequireAuth>} />
  </ReactRoutes>
);

export default memo(AppRoutes);