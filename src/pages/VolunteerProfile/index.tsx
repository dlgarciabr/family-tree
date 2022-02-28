import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Props } from 'types';
import { RootState } from 'redux/reduxStore';
import {
  useLazyGetUserByIdQuery
} from 'services/volunteerHubApi';

const VolunteerProfile: React.FC<Props> = () => {
  const { id } = useSelector((state: RootState) => state.myProfile);

  const [getUserById] = useLazyGetUserByIdQuery();

  useEffect(() => {
    (
      async () => {
        if (id) {
          await getUserById({ id });
          // TODO: send to redux store
        }
      }
    )();
  }, []);

  return (
    <>
      <p>
        My profile
      </p>
      <Link to="/">Main area</Link>
    </>
  );
};
export default React.memo(VolunteerProfile);