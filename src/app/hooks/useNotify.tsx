import { useDispatch } from "react-redux";
import { SnackbarMessage, VariantType } from "notistack";
import { notify } from "features/app/store/slice";

const useNotify = () => {

  const dispatch = useDispatch();

  return (message: SnackbarMessage, variant?: VariantType) => {
    dispatch(notify(message, { options: { variant } }));
  }

}

export default useNotify;