import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarKey, SnackbarMessage } from "notistack";
import { IAppState, INotification } from "types/app";
import { RootState } from "types";

const initialState: IAppState = {
  sidebar: {
    show: true
  },
  topbar: {
    title: ''
  },
  notification: [],
  backdrop: {
    open: false,
    isStatic: false
  },
  navigate: null,
  scrollToBottom: false
}

const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNavigate(state, action: PayloadAction<string | null>){
      state.navigate = action.payload;
    },
    toggleSidebar(state){
      state.sidebar.show = !state.sidebar.show;
    },
    setTitlePage(state, action: PayloadAction<string>){
      state.topbar.title = action.payload;
    },
    removeNotification(state, action: PayloadAction<SnackbarKey>){
      state.notification = [
        ...state.notification.filter(noti => noti.key !== action.payload)
      ]
    },
    closeNotification: {
      reducer(state, action: PayloadAction<SnackbarKey, string, boolean | undefined>){
        state.notification = state.notification.map(noti => (
          action.meta || action.payload === noti.key
            ? { ...noti, dismissed: true }
            : { ...noti }
        )) as typeof state.notification;
      },
      prepare(payload: SnackbarKey, meta?: boolean){
        return { payload, meta };
      }
    },
    notify: {
      reducer(state, action: PayloadAction<SnackbarMessage, string, Partial<INotification> | undefined>){
        state.notification = [ 
          ...state.notification, 
          { 
            ...action.meta,
            key: new Date().getTime() + Math.random(),
            message: action.payload
          } 
        ] as typeof state.notification;
      },
      prepare(payload: SnackbarMessage, meta?: Partial<INotification>){
        return { payload, meta };
      }
    },
    showBackdrop(state, action: PayloadAction<boolean | undefined>){
      state.backdrop.open = true;
      state.backdrop.isStatic = !!action.payload;
    },
    closeBackdrop(state){
      state.backdrop.open = false;
      state.backdrop.isStatic = true;
    },
    setScrollToBottom(state, action: PayloadAction<boolean>){
      state.scrollToBottom = action.payload
    }
  }
});

// Actions
export const toggleSidebar = AppSlice.actions.toggleSidebar;
export const setTitlePage = AppSlice.actions.setTitlePage;
export const removeNotification = AppSlice.actions.removeNotification;
export const closeNotification = AppSlice.actions.closeNotification;
export const notify = AppSlice.actions.notify;
export const showAppBackdrop = AppSlice.actions.showBackdrop;
export const closeAppBackdrop = AppSlice.actions.closeBackdrop;
export const setAppNavigate = AppSlice.actions.setNavigate;
export const setScrollToBottom = AppSlice.actions.setScrollToBottom;
// Selectors
export const getShowSidebar = (state: RootState) => state.app.sidebar.show;
export const getAppNotification = (state: RootState) => state.app.notification;
export const getTitlePage = (state: RootState) => state.app.topbar.title;
export const getBackdropOptions = (state: RootState) => state.app.backdrop;
export const getAppNavigate = (state: RootState) => state.app.navigate;
export const getScrollToBottom = (state: RootState) => state.app.scrollToBottom;
// Reducer
const AppReducer = AppSlice.reducer;
export default AppReducer;