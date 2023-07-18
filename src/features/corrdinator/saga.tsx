import { all } from "redux-saga/effects";
import corrdinatorUserSaga from "./corrdinatorUser/saga";
import corrdinatorDocumentSaga from "./profile/saga";


export default function* CorrdinatorSaga(){
  yield all([
    corrdinatorDocumentSaga(),
    corrdinatorUserSaga()
  ]);
}