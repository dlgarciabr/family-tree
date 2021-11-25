import React from 'react';

import { Props } from '../../global';

const Dummy: React.FC<Props> = () => (
  <p>
    dummy comp
  </p>
);

export default React.memo(Dummy);