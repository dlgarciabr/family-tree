import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Props } from 'types';
import {
  useGetUserQuery
} from 'services/volunteerHubApi';

const VolunteerProfile: React.FC<Props> = () => {

  const { data, isLoading } = useGetUserQuery();

  useEffect(() => {
    //TODO: call service to get volunteer data
    //TODO: send to redux store
  }, []);

  return (
    <>
      <p>
        My profile
      </p>
      <Link to="/">Main area</Link>
    </>
  );
}
export default React.memo(VolunteerProfile);