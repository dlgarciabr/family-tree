import React from 'react';
import { Props } from 'types';

const Dummy: React.FC<Props> = () => (<div>dummy component</div>);

export default React.memo(Dummy);