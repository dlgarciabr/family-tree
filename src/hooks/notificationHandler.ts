import { VariantType } from 'notistack';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { AppContext } from '../context/App';
import { enqueueNotification, StackedNotification } from '../views/App/notificationSlice';

const messageType = {
  INFO: 'info' as VariantType,
  SUCCESS: 'success' as VariantType,
  ERROR: 'error' as VariantType
};

const createNotification = (message: string, variant: VariantType): StackedNotification => {
  return {
    key: new Date().getTime(),
    message,
    dismissed: false,
    options: { variant }
  }
};

export const dispatchInfoNotification = (dispatch: Dispatch<any>, message: string) => {
  const notification = createNotification(message, messageType.INFO);
  dispatch(enqueueNotification(notification));
};

export const dispatchSuccessNotification = (dispatch: Dispatch<any>, message: string) => {
  const notification = createNotification(message, messageType.SUCCESS);
  dispatch(enqueueNotification(notification));
};

export const dispatchErrorNotification = (dispatch: Dispatch<any>, message: string) => {
  const notification = createNotification(message, messageType.ERROR);
  dispatch(enqueueNotification(notification));
};

const useNotification = () => {
  const dispatch = useDispatch();
  const { appSettings: { messages } } = useContext(AppContext);

  return {
    showInfoNotification: (message: string | undefined = 'info message is empty') => {
      dispatchInfoNotification(dispatch, message);
    },
    showSuccessNotification: (message: string | undefined = undefined) => {
      const defaultMessage = messages['message.success'].map((t: any) => t.value)[0];
      dispatchSuccessNotification(dispatch, message || defaultMessage);
    },
    showErrorNotification: (message: string | undefined = undefined) => {
      const defaultMessage = messages['message.error'].map((t: any) => t.value)[0];
      dispatchErrorNotification(dispatch, message || defaultMessage);
    }
  };
};

export default useNotification;