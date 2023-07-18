import { FC, Fragment, ReactNode, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, Navigate, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { decodeToken } from "utils";
import {
  accessToken,
  getIsAuth,
  getIsFetched,
  getIsFetching,
  getIsInitial,
  initial
} from "features/auth/store/slice";
import Loading from "views/components/base/Loading";
import useNotification from "app/hooks/useNotification";
import useNavigation from "app/hooks/useNavigation";
import useRefreshToken from "app/hooks/useRefreshToken";

export interface AuthContextProps {
  children?: ReactNode;
}

const AuthContext: FC<AuthContextProps> = (props) => {
  const isAuth = useSelector(getIsAuth);
  const isInitial = useSelector(getIsInitial);
  const isFetching = useSelector(getIsFetching);
  const isFetched = useSelector(getIsFetched);
  const dispatch = useDispatch();
  const location = useLocation();

  const { children } = props;
  const { t } = useTranslation();

  useNotification();
  useNavigation();
  useRefreshToken();
  // useEffect(() => {
  //   document.title = t('App.Name');
  // });

  useEffect(() => {
    try {
      if (!isAuth) {
        if (!isFetched){
          const { token, userid } = decodeToken();

          if (token && userid) {
            isFetching || dispatch(accessToken({token: token, userid: userid}));
          } else {
            dispatch(initial({ isAuth: false }));
          }
        }
        else{
        isFetched || dispatch(initial({ isAuth: false }));
        }
      } else {
        isInitial || dispatch(initial({ isAuth: true }));
      }
    } catch (e) {
      dispatch(initial({ isAuth: false }));
    }
  });

  if (!isInitial) {
    return <Loading />;
  }

  if (isAuth && matchPath('/login', location.pathname)){
    return <Navigate to="" />
  }

  return <Fragment>
    {children}
  </Fragment>;
};

export default memo(AuthContext);
