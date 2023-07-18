import { all } from "redux-saga/effects";    
import configSaga from "./configs/saga";
import storageCICSaga from "./storage/cic/saga";
import storageCollateralSaga from "./storage/collateral/saga";
import storageCollateralsSaga from "./storage/collateralV2/saga";
import storageFormsSaga from "./storage/forms/saga";
import storageINCOMESaga from "./storage/income/saga";
import storageLegalSaga from "./storage/legal/saga";
import storageLOANSaga from "./storage/loan/saga";
import storageOtherSaga from "./storage/other/saga";
import storageProductSaga from "./storage/product/saga";
import storageSaga from "./storage/saga";
import storageICRSaga from "./storage/icr/saga";
import storageApprovalSaga from "./storageApproval/saga";
import storageOtherApprovalSaga from "./storageApproval/Other/saga";
import storageGuideStateSaga from "./storageGuide/saga";
import storageControlStateSaga from "./storageControl/saga";
import storageHistoryLogSaga from "./storage/historyLogs/saga";
import storageICRApprovalSaga from "./storageApproval/icr/saga";
import storageCICApprovalSaga from "./storageApproval/cic/saga"
import storageApprovalLOANSaga from "./storageApproval/loan/saga";
import storageINCOMESagaApproval from "./storageApproval/income/saga";
import storageCollateralApprovalSaga from "./storageApproval/collateral/saga";
import storageAdditionalAppraisalSaga from "./storageApproval/additionalApproval/saga";
import storageDedupeApprovalSaga from "./storageApproval/dedupe/saga";
import storageCustomerSaga from "./storage/customer/saga";
import storageFileDocumentSaga from "./storage/ProfileDocument/saga";

export default function* LOANNormalSaga(){
  yield all([
    configSaga(),
    storageProductSaga(),
    storageLegalSaga(),
    storageCICSaga(),
    storageCollateralSaga(),
    storageSaga(),
    storageLOANSaga(),
    storageINCOMESaga(),
    storageFormsSaga(),
    storageOtherSaga(),
    storageCollateralsSaga(),
    storageICRSaga(),
    storageCustomerSaga(),
    // approval
    storageApprovalSaga(),
    storageOtherApprovalSaga(),
    storageGuideStateSaga(),
    storageControlStateSaga(),
    storageHistoryLogSaga(),
    storageICRApprovalSaga(),
    storageCICApprovalSaga(),
    storageApprovalLOANSaga(),
    storageINCOMESagaApproval(),
    storageCollateralApprovalSaga(),
    storageDedupeApprovalSaga(),
    storageAdditionalAppraisalSaga(),
    storageFileDocumentSaga(),
  ]);
}