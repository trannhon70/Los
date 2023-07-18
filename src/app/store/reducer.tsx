import { AnyAction, ReducersMapObject } from "@reduxjs/toolkit";
import { RootState } from "types";

import AuthReducer from "features/auth/store/slice";
import AppReducer from "features/app/store/slice";
import LOANCardReducer from "features/loan/card";
import DashboardReducer from "features/dashboard/store/slice";
import LOANNormalReducer from "features/loan/normal";
import MasterDataReducer from "features/master-data/slice";
import CorrdinatorReducer from "features/corrdinator/slice";
import CorrdinatorLOANReducer from "features/loan/corrdinator/slice";

const reducer: ReducersMapObject<RootState, AnyAction> = {
  app: AppReducer,
  auth: AuthReducer,
  LOANCard: LOANCardReducer,
  dashboard: DashboardReducer,
  corrdinatorLOAN: CorrdinatorLOANReducer,
  corrdinator: CorrdinatorReducer,
  LOANNormal: LOANNormalReducer,
  masterData: MasterDataReducer
};

export default reducer;
