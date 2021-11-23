import React from 'react';

import { Props } from '../global';

const Dummy: React.FC<Props> = () => {
    console.log("render memo")
    return <p>dummy comp</p>
}

export default Dummy;