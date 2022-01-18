import React from 'react';

import { Props } from '../../types';

const Dummy: React.FC<Props> = () => {
  return (
    <p>
      dummy comp
    </p>
  )
};

export default React.memo(Dummy);