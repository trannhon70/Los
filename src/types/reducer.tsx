import { PayloadAction } from "@reduxjs/toolkit";
import { IListCode } from "./api";
import { IAppState } from "./app";
import { IAccountState } from "./models/Account";
import { ILOANCardState } from "./models/loan/card";
import { IDashboardState } from "./models/dashboard";
import { ILOANNormalState } from "./models/loan/normal";
import { IMasterData } from "./models/master-data";
import { ICorrdinatorState } from "./models/corrdinator";
import { ICorrdinatorLOANState } from "./models/loan/corrdinator";

export interface RootState {
  app: IAppState;
  auth: IAccountState;
  LOANCard: ILOANCardState;
  dashboard: IDashboardState;
  corrdinatorLOAN: ICorrdinatorLOANState;
  corrdinator: ICorrdinatorState;
  LOANNormal: ILOANNormalState;
  masterData: IMasterData;
}

export type PAListCode<T> = PayloadAction<IListCode<T>>;
