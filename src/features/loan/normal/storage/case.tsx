import { LegalCase } from "./legal/case";
import { CICCase } from "./cic/case";
import { NormalLOANCase } from "./loan/case";
import { ProductCase } from "./product/case";
import { CollateralCase } from './collateral/case';
import { incomeCase } from "./income/case";
import { FORMSCase } from "./forms/case";
import { IRCCase } from "./icr/case";
import { CollateralCaseV2 } from "./collateralV2/case";
import { otherCase } from './other/case';
import { HistoryLogsCase } from "./historyLogs/case";
import { CustomerCase } from "./customer/case";
import { DevToolCICInitCase } from "dev_tool/modules/loan/normal/init/CIC/case";
import { DevToolIncomeCase } from "dev_tool/modules/loan/normal/init/income/case";
import { DevToolCollateralCase } from "dev_tool/modules/loan/normal/init/collateral/case";
import { ProfileDocumentSCase } from "./ProfileDocument/case";

export const StorageCase = {
  ...ProductCase,
  ...LegalCase,
  ...CICCase,
  ...NormalLOANCase,
  ...CollateralCase,
  ...incomeCase,
  ...FORMSCase,
  ...IRCCase,
  ...CollateralCaseV2,
  ...otherCase,
  ...HistoryLogsCase,
  ...CustomerCase,
  ...DevToolCICInitCase, /// tools autoFill
  ...DevToolIncomeCase,
  ...DevToolCollateralCase,
  ...ProfileDocumentSCase,
}