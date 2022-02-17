import React from 'react';
import { Link } from 'react-router-dom';
import { Props } from '../../types';

const VolunteerProfile: React.FC<Props> = () => (
  <>
    <p>
      My profile
    </p>
    <Link to="/">Main area</Link>
  </>
);

export default React.memo(VolunteerProfile);