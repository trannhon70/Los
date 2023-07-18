import { CorrdinatorUserStoredCase } from "./corrdinatorUser/case";
import { CorrdinatorProfileStoredCase } from "./profile/case";

export const StorageCorrdinatorCase = {
  ...CorrdinatorProfileStoredCase,
  ...CorrdinatorUserStoredCase
}
