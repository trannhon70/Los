import { all } from "redux-saga/effects";
import devToolLOANNormalCICSaga from "./loan/normal/init/CIC/saga";
import devToolLOANNormalCollateralSaga from "./loan/normal/init/collateral/saga";
import devToolLOANNormalINCOMESaga from "./loan/normal/init/income/saga";
import devToolLOANNormalLegalSaga from "./loan/normal/init/legal/saga";

export default function* devToolSaga(){
  yield all([
    devToolLOANNormalLegalSaga(),
    devToolLOANNormalINCOMESaga(),
    devToolLOANNormalCollateralSaga(),
    devToolLOANNormalCICSaga()
  ]);
}