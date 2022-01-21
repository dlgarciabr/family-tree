import React from 'react';
import { Link } from 'react-router-dom';
import { Props } from '../../types';

const Dummy: React.FC<Props> = () => (
  <>
    <p>
      dummy comp
    </p>
    <Link to="/">Main area</Link>
  </>
);

export default React.memo(Dummy);