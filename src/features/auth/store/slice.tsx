import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError, RootState } from "types";
import { IAccessTokenBody, IAccountState, ILoginForm, ILoginResponse, IUser } from "types/models/Account";

const initialState: IAccountState = {
  isAuth: false,
  isInitial: false,
  isFetching: false,
  isFetched: false,
  user: undefined,
  errors: [],
  menu_list: [],
  sessionOut: false,
  sessionStartTime: null
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initial(state, action: PayloadAction<Partial<IAccountState>>) {
      state.isAuth = Boolean(action.payload.isAuth);
      state.isInitial = true;
      state.isFetching = false;
      state.user = undefined;
      state.menu_list = [];
      state.errors = [];
      state.sessionStartTime = null
    },
    accessToken(state, action: PayloadAction<IAccessTokenBody>) {
      state.isInitial = false;
      state.isAuth = false;
      state.user = undefined;
      state.menu_list = [];
      state.isFetching = true;
      state.errors = [];
      state.sessionStartTime = null
    },
    login(state, action: PayloadAction<ILoginForm>) {
      state.isAuth = false;
      state.isInitial = true;
      state.isFetching = true;
      state.isFetched = false;
      state.user = undefined;
      state.menu_list = [];
      state.errors = [];
      state.sessionStartTime = null
    },
    loginSuccess(state, action: PayloadAction<ILoginResponse | null>) {
      state.isAuth = true;
      state.isInitial = true;
      state.isFetching = false;
      state.user = action.payload?.user_info;
      state.menu_list = action.payload?.menu_list ?? [];
      state.errors = [];
      state.sessionStartTime = new Date().getTime()
    },
    loginFailure(state, action: PayloadAction<IError[]>) {
      state.isAuth = false;
      state.isInitial = true;
      state.isFetching = false;
      state.isFetched = true;
      state.user = undefined;
      state.menu_list = [];
      state.errors = action.payload;
      state.sessionStartTime = null
    },
    logout(state) {
      state.isAuth = false;
      state.isInitial = true;
      state.isFetching = false;
      state.user = undefined;
      state.menu_list = [];
      state.errors = [];
      state.sessionStartTime = null
    },
    sessionOut(state){
      state.sessionOut = true;
    },
    setSessionStartTime(state, action: PayloadAction<number | null>) {
      state.sessionStartTime = action.payload
    },
    refreshToken(state) {},
    
  }
});

// Actions
export const initial = AuthSlice.actions.initial;
export const accessToken = AuthSlice.actions.accessToken;
export const login = AuthSlice.actions.login;
export const loginSuccess = AuthSlice.actions.loginSuccess;
export const loginFailure = AuthSlice.actions.loginFailure;
export const logout = AuthSlice.actions.logout;
export const sessionOut = AuthSlice.actions.sessionOut;
export const refreshToken = AuthSlice.actions.refreshToken;
export const setSessionStartTime = AuthSlice.actions.setSessionStartTime;
// Selectors
export const getIsAuth = (state: RootState) => state.auth.isAuth;
export const getIsInitial = (state: RootState) => state.auth.isInitial;
export const getIsFetching = (state: RootState) => state.auth.isFetching;
export const getIsFetched = (state: RootState) => state.auth.isFetched;
export const getCurrentUser = (state: RootState) => state.auth.user;
export const getAuthErrors = (state: RootState) => state.auth.errors;
export const getSesstionStatus = (state: RootState) => state.auth.sessionOut;
export const getSessionStartTime = (state: RootState) => state.auth.sessionStartTime;
export const getMenuList = (state:RootState) => state.auth.menu_list
// Reducer
const AuthReducer = AuthSlice.reducer;
export default AuthReducer;