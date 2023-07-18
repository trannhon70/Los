import { all } from "redux-saga/effects";

import appSaga from "features/app/store/saga";
import authSaga from "features/auth/store/saga";
import dashboardSaga from "features/dashboard/store/saga";
import LOANNormalSaga from "features/loan/normal/saga";
import devToolSaga from "dev_tool/modules/saga";
import LOANCardSaga from "features/loan/card/saga";
import masterDataSaga from "features/master-data/saga";
import CorrdinatorSaga from "features/corrdinator/saga";
import CorrdinatorLOANSaga from "features/loan/corrdinator/saga";

export default function* rootSaga() {
  yield all([
    devToolSaga(),
    appSaga(),
    authSaga(),
    dashboardSaga(),
    CorrdinatorSaga(),
    masterDataSaga(),
    LOANNormalSaga(),
    LOANCardSaga(),
    CorrdinatorLOANSaga()
  ]);
}
