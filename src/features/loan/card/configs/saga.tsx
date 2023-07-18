import { all } from "@redux-saga/core/effects";
import configProductCategoryCardSaga from "./products/category/saga";
import configCardProductPartnerCodeSaga from "./products/partner-code/saga";
import configCardProductPartnerProductSaga from "./products/partner-product/saga";

export default function* configSaga(){
    yield all([
      configProductCategoryCardSaga(),
      configCardProductPartnerCodeSaga(),
      configCardProductPartnerProductSaga(),
    ]);
  }