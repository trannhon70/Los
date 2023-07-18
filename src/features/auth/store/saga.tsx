import { PayloadAction } from "@reduxjs/toolkit";
import history from "app/history";
import PAGE_URL from "app/PageURL";
import { closeAppBackdrop, showAppBackdrop } from "features/app/store/slice";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types";
import { IAccessTokenBody, ILoginForm, ILoginResponse, IUser } from "types/models/Account";
import { encodeToken, getStorage, removeLocalItem, setLocalItem } from "utils";
import { APP_TOKEN_NAME, ON_FETCH_ERROR, ON_FETCH_ERROR_MSG } from "utils/constants";
import { authLogin, authToken, refreshTokenApi } from "../models";
import { accessToken, getCurrentUser, login, loginFailure, loginSuccess, refreshToken, setSessionStartTime } from "./slice";

function* handleAccessToken(action: PayloadAction<IAccessTokenBody>){
  try{
    const sessionData = getStorage(APP_TOKEN_NAME);
    if(sessionData !== null){
      const response: IApiResponse<any> = yield call(authToken, action.payload.userid);
      // const dataSessionStored =  Buffer.Buffer.from(sessionData, "base64").toString().split(".");
      // const decodeBase64 = JSON.parse(atob(dataSessionStored[1])) as IDecodeToken;
      yield put(loginSuccess(response.data));
      yield put(refreshToken())
    }
    else{
      yield call(removeLocalItem, APP_TOKEN_NAME);
      yield call(history.push, PAGE_URL.Login);
    }
    
    // 


    // if (response.success){
    //   yield put(loginSuccess(response.data as IUser));
    // }
    // else{
    //   yield call(removeLocalItem, APP_TOKEN_NAME);
    //   yield call(history.push, PAGE_URL.Login);
    // }
  }
  catch(e){
    // yield call(removeLocalItem, APP_TOKEN_NAME);
    yield put(loginFailure(ON_FETCH_ERROR));
    yield call(history.push, PAGE_URL.Login);
  }
}

function* handleLogin(action: PayloadAction<ILoginForm>) {
  try {
    yield put(showAppBackdrop())
    const response: IApiResponse<ILoginResponse> = yield call(
      authLogin,
      action.payload
    );

    if (response.success) {
      yield put(loginSuccess(response.data));
      if (action.payload.remember) {
        setLocalItem(
          APP_TOKEN_NAME,
          encodeToken({
            token: response.data?.access_token as string,
            userid: response.data?.user_info?.user_id as string
          })
        );
       
      }
      else {
        setLocalItem(
          APP_TOKEN_NAME,
          encodeToken({
            token: response.data?.access_token as string,
            userid: response.data?.user_info?.user_id as string
          })
        )
      }

      const state = action.payload.state as Record<string, any>;
      const ru = typeof state?.from?.pathname === 'string' && state?.from?.pathname.length
        ? state.from.pathname
        : PAGE_URL.Dashboard

      yield call(history.push, ru);  
    } else {
      yield put(loginFailure(ON_FETCH_ERROR_MSG));
    }
  } catch (e) {
    console.log(e);
    yield put(loginFailure(ON_FETCH_ERROR));

  } finally {
    yield put(closeAppBackdrop())
  }
}

function* handleRefreshToken() {
  try {
    const user : IUser = yield select(getCurrentUser)
    const response: IApiResponse<any> = yield call(
      refreshTokenApi,
    );
    
    if (response.success) {
        // removeLocalItem(APP_TOKEN_NAME);
        setLocalItem(APP_TOKEN_NAME,
          encodeToken({
            token: response.data?.access_token as string,
            userid: user?.user_id
          })
        );
        yield put(setSessionStartTime(new Date().getTime()))
    } else {
      
    }
  } catch (e) {
    console.log(e)
  }
}

// function* handleLoginS2(action: PayloadAction<ILoginForm>) {
//   try {
//     const response: IApiResponse<ILoginResponse> = yield call(
//       authLoginS2,
//       action.payload
//     );

//     if (response.success) {
//       yield put((response.data?.user_info as IUser));
//       if (action.payload.remember) {
//         setLocalItem(
//           APP_TOKEN_NAME,
//           encodeToken({
//             token: response.data?.access_token as string,
//             userid: response.data?.user_info?.user_id as string
//           })
//         );
//       }
//       else {
//         setSessionItem(
//           APP_TOKEN_NAME,
//           encodeToken({
//             token: response.data?.access_token as string,
//             userid: response.data?.user_info?.user_id as string
//           })
//         )
//       }

//       const state = action.payload.state as Record<string, any>;
//       const ru = typeof state?.from?.pathname === 'string' && state?.from?.pathname.length
//         ? state.from.pathname
//         : PAGE_URL.Dashboard

//       yield call(history.push, ru);      
//     } else {
//       yield put(loginFailure(response.errors));
//     }
//   } catch (e) {
//     yield put(loginFailure(ON_FETCH_ERROR));
//   }
// }


export default function* authSaga() {
  yield takeEvery(accessToken.type, handleAccessToken);
  yield takeEvery(login.type, handleLogin);
  yield takeEvery(refreshToken.type, handleRefreshToken);
  
  // yield takeEvery(login.type, handleLoginS2);
}
