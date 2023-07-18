import { getIsAuth, getSessionStartTime, refreshToken, setSessionStartTime } from "features/auth/store/slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimeout } from "timers";


export default function useRefreshToken(){
  const sessionStartTime = useSelector(getSessionStartTime)
  const isAuth = useSelector(getIsAuth)
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(sessionStartTime === null && isAuth){
      dispatch(refreshToken())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStartTime, isAuth]);

  useEffect(() => {
    if(sessionStartTime){
      setTimeout(() => {
        dispatch(setSessionStartTime(null))
      }, 870000)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStartTime])
}