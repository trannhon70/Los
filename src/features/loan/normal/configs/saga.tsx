import { all } from "@redux-saga/core/effects";
import configAttachFileSaga from "./attach-file/saga";
import configDocumentTypeSaga from "./document-type/saga";
import configFinanceMetadataSaga from "./finance-metadata/saga";
import configGenderSaga from "./gender/saga";
import configMetadataConstantSaga from "./metadata/saga";
import configPolicyDetailSaga from "./policy-detail/saga";
import configProductCategorySaga from "./product/category/saga";
import configProductPartnerCodeSaga from "./product/partner-code/saga";
import configProductPartnerProductSaga from "./product/partner-product/saga";
import configValidateDateTypeSaga from "./validate-date-type/saga";
import configVehicleDetailSaga from "./vehicle-detail/saga";

export default function* configSaga(){
  yield all([
    configProductCategorySaga(),
    configProductPartnerCodeSaga(),
    configProductPartnerProductSaga(),
    configGenderSaga(),
    configFinanceMetadataSaga(),
    configPolicyDetailSaga(),
    configDocumentTypeSaga(),
    configVehicleDetailSaga(),
    configAttachFileSaga(),
    configValidateDateTypeSaga(),
    configMetadataConstantSaga()
  ]);
}