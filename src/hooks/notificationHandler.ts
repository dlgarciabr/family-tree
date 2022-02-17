import { VariantType } from 'notistack';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { useIntl } from 'react-intl';

import { enqueueNotification, StackedNotification } from '../redux/notificationSlice';

const messageType = {
  INFO: 'info' as VariantType,
  SUCCESS: 'success' as VariantType,
  ERROR: 'error' as VariantType
};

const createNotification = (message: string, variant: VariantType): StackedNotification => ({
  key: new Date().getTime(),
  message,
  dismissed: false,
  options: { variant }
});

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
  const { formatMessage } = useIntl();
  const defaultSuccessMessage = formatMessage({ id: 'message.success' });
  const defaultErrorMessage = formatMessage({ id: 'message.error' });

  return {
    showInfoNotification: (message: string) => {
      dispatchInfoNotification(dispatch, message);
    },
    showSuccessNotification: (message?: string) => {
      dispatchSuccessNotification(dispatch, message || defaultSuccessMessage);
    },
    showErrorNotification: (message?: string) => {
      dispatchErrorNotification(dispatch, message || defaultErrorMessage);
    }
  };
};

export default useNotification;