import { useDispatch, useSelector } from "react-redux"
import { 
  closeAppBackdrop, 
  getBackdropOptions, 
  showAppBackdrop 
} from "features/app/store/slice";

const useBackdrop = () => {

  const dispatch = useDispatch();
  const options = useSelector(getBackdropOptions);

  const closeBackdrop = () => {
    dispatch(closeAppBackdrop());
  }

  const showBackdrop = (isStatic?: boolean) => {
    dispatch(showAppBackdrop(isStatic));
  }
  
  return { options, closeBackdrop, showBackdrop };
}

export default useBackdrop;