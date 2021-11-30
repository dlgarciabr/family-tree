import {
  MiddlewareAPI,
  Middleware,
  isRejected
} from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

import { dispatchErrorNotification } from '../hooks/notificationHandler';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (dispatch) =>
  (action: AnyAction) => {
    if (isRejected(action)) {
      if ((action.payload as any).status === 404) {
        dispatchErrorNotification(dispatch, 'try again later');
      } else {
        dispatchErrorNotification(dispatch, 'error not handled');
      }
    }

    return dispatch(action);
  };