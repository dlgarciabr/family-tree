import { VariantType } from 'notistack';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { AppContext } from '../context/App';
import { enqueueNotification } from '../views/App/notificationSlice';

const useMessage = () => {
  const dispatch = useDispatch();
  const { appSettings: { messages } } = useContext(AppContext);

  const dispatchNotification = (message: string, variant: VariantType) => {
    dispatch(enqueueNotification({
      key: new Date().getTime(),
      message,
      dismissed: false,
      options: { variant }
    }));
  }

  return {
    showInfoMessage: (message = 'info message is empty') => {
      dispatchNotification(message, 'info');
    },
    showSuccessMessage: (message = undefined) => {
      const defaultMessage = messages['message.success'].map((t: any) => t['value'])[0];
      dispatchNotification(message || defaultMessage, 'success');
    },
    showErrorMessage: (message = undefined) => {
      const defaultMessage = messages['message.error'].map((t: any) => t['value'])[0];
      dispatchNotification(message || defaultMessage, 'error');
    }
  }
};

export default useMessage;