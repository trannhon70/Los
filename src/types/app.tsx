import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { SxProps, Theme } from "@mui/system";

export interface ISidebar{
  show: boolean;
}

export interface ITopbar{
  title: string;
}

export interface INotification {
  message: SnackbarMessage;
  options?: OptionsObject;
  key: SnackbarKey;
  dismissed?: boolean;
}

export interface IBackdrop{
  open: boolean;
  isStatic: boolean;
}
export interface IAppState{
  sidebar: ISidebar;
  notification: INotification[];
  topbar: ITopbar;
  backdrop: IBackdrop;
  navigate: string | null;
  scrollToBottom: boolean;
}

export type SxBaseApp = SxProps<Theme>;