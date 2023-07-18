import { all } from "redux-saga/effects";
import corrdinatorLOANUserSaga from "./corrdinatorUser/saga";
import corrdinatorLOANDocumentSaga from "./document/saga";


export default function* CorrdinatorLOANSaga(){
  yield all([
    corrdinatorLOANDocumentSaga(),
    corrdinatorLOANUserSaga()
  ]);
}