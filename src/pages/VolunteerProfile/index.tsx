import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { Props } from 'types';
import { RootState } from 'redux/reduxStore';
import {
  useLazyGetUserByIdQuery
} from 'services/volunteerHubApi';

const VolunteerProfile: React.FC<Props> = () => {
  const { id } = useSelector((state: RootState) => state.myProfile);

  const [getUserById, state] = useLazyGetUserByIdQuery();

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
      <h3>
        <FormattedMessage id="myprofile.title" />
      </h3>
      <p>loading: {state.isFetching.toString()}</p>
    </>
  );
};
export default React.memo(VolunteerProfile);