import { ILOANNormalStorageState } from "types/models/loan/normal/storage";
import { cicState } from "./cic/state";
import { collateralState } from "./collateral/state";
import { collaretalState_v2 } from "./collateralV2/state";
import { customerState } from "./customer/state";
import { formsState } from "./forms/state";
import { historyLogState } from "./historyLogs/state";
import { icrState } from "./icr/state";
import { incomeState } from "./income/state";
import { legalState } from "./legal/state";
import { loanState } from "./loan/state";
import { otherState } from "./other/state";
import { productState } from "./product/state";
import { ProfileDocumentState } from "./ProfileDocument/state";

export const storageState: ILOANNormalStorageState = {
  full: {
    fetched: false,
    fetching: false,
    starting: false,
    data: null
  },
  product: productState,
  legal: legalState,
  cic: cicState,
  loan: loanState,
  collateral: collateralState,
  collateral_v2: collaretalState_v2,
  income:incomeState,
  forms: formsState,
  icr:icrState,
  other:otherState,
  logs: historyLogState,
  customer: customerState,
  profileDocument: ProfileDocumentState,
}