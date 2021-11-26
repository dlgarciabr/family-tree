import { useDispatch } from "react-redux";

import { enqueueSnackbar } from '../views/App/notificationSlice';

export const messages = {
  OPERATION_SUCCESSFULL: "Operation sucessfull",
  OPERATION_ERROR: "An error has occurred!"
};

//TODO recover messages from i18n

export const useShowInfoMessage = () => {
  const dispatch = useDispatch();
  return (message = "info message is empty") => {
    dispatch(enqueueSnackbar({
      key: new Date().getTime(), message, options: { variant: 'info' }
    }))
  };
};

export const useShowSuccessMessage = () => {
  const dispatch = useDispatch();
  return (message = messages.OPERATION_SUCCESSFULL) => {
    dispatch(enqueueSnackbar({
      key: new Date().getTime(), message, options: { variant: 'success' }
    }))
  };
};

export const useShowErrorMessage = () => {
  const dispatch = useDispatch();
  return (message = messages.OPERATION_ERROR) => {
    dispatch(enqueueSnackbar({
      key: new Date().getTime(), message, options: { variant: 'error' }
    }))
  };
};
