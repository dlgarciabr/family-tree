import { useDispatch } from 'react-redux';

import { enqueueNotification } from '../views/App/notificationSlice';

// TODO recover messages from i18n
export const messages = {
  OPERATION_SUCCESSFULL: 'Operation sucessfull',
  OPERATION_ERROR: 'An error has occurred!'
};

export const useShowInfoMessage = () => {
  const dispatch = useDispatch();
  return (message = 'info message is empty') => {
    dispatch(enqueueNotification({
      key: new Date().getTime(),
      message,
      dismissed: false,
      options: { variant: 'info' }
    }));
  };
};

export const useShowSuccessMessage = () => {
  const dispatch = useDispatch();
  return (message = messages.OPERATION_SUCCESSFULL) => {
    dispatch(enqueueNotification({
      key: new Date().getTime(),
      message,
      dismissed: false,
      options: { variant: 'success' }
    }));
  };
};

export const useShowErrorMessage = () => {
  const dispatch = useDispatch();
  return (message = messages.OPERATION_ERROR) => {
    dispatch(enqueueNotification({
      key: new Date().getTime(),
      message,
      dismissed: false,
      options: { variant: 'error' }
    }));
  };
};
