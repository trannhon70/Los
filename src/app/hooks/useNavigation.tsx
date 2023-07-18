import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAppNavigate, setAppNavigate } from "features/app/store/slice";
import { useEffect } from "react";

const useNavigation = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = useSelector(getAppNavigate);

  useEffect(() => {
    if (url !== null){
      navigate(url);
      dispatch(setAppNavigate(null));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ url ]);

}

export default useNavigation;