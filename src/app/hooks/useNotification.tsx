import { useEffect } from "react";
import { SnackbarKey, useSnackbar  } from "notistack"
import { useDispatch, useSelector } from "react-redux";
import { getAppNotification, removeNotification } from "features/app/store/slice";

let displayed: SnackbarKey[] = [];

export default function useNotification(){

  const dispatch = useDispatch();
  const notifications = useSelector(getAppNotification);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [ ...displayed, id ];
  }

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [ ...displayed.filter(key => id !== key) ];
  }

  useEffect(() => {
    notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
      if (dismissed){
        closeSnackbar(key);
        return;
      }

      if (displayed.includes(key)) return;

      enqueueSnackbar(message, {
        key,
        ...options,
        onExited: (_, myKey) => {
          dispatch(removeNotification(myKey));
          removeDisplayed(myKey);
        }
      });

      storeDisplayed(key);
    });
  }, [ notifications, closeSnackbar, enqueueSnackbar, dispatch ]);

}