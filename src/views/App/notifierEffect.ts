import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarKey, useSnackbar } from 'notistack';
import { RootState } from 'utils/reduxStore';
// import { removeSnackbar } from './redux/actions';

let displayed: SnackbarKey[] = [];

const useNotifier = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { notifications } = useSelector(
    (state: RootState) => state.notification
  );

  const storeAlreadyDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  useEffect(() => {
    notifications.forEach(({
      key, message, options = {}, dismissed = false
    }) => {
      if (dismissed) {
        closeSnackbar(key);
        return;
      }

      const messageIsAlreadyDisplayed = displayed.includes(key);
      if (messageIsAlreadyDisplayed) {
        return;
      }

      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          // TODO
          // dispatch(removeSnackbar(myKey));
          removeDisplayed(myKey);
        },
      });

      storeAlreadyDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
};

export default useNotifier;
