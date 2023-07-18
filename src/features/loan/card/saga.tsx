import { all } from "redux-saga/effects";
import configSaga from "./configs/saga";
import storageProductSagaCard from "./storage/products/saga";

export default function* LOANCardSaga() {
    yield all([
        configSaga(),
        storageProductSagaCard(),
    ]);
}