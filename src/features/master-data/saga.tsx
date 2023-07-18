import { all } from "redux-saga/effects";
import rootMasterDataSaga from "./rootSaga";


export default function* masterDataSaga(){
  yield all([
    rootMasterDataSaga(),
  ]);
}