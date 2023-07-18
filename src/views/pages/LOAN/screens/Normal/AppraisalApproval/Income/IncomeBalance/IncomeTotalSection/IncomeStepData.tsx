import {  Fragment } from "react";
import { TableCell, TableRow } from "@mui/material";
import * as IncomeApprovalType from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import incomeStyle from "../../style";
import TotalIncomeBalanceItem from "./TotalIncomeBalanceItem";
import GroupTotalIncomeBalance from "./GroupTotalIncomeBalance";

interface IncomeStepDataProps {
  data: IncomeApprovalType.TotalIncomeBalanceDeclare | null | undefined;
}
const IncomeStepData = ({ data }: IncomeStepDataProps) => {
  const {
    income_asset_rent = null,
    income_business_household = null,
    income_companies = null,
    income_deposit = null,
    income_other = null,
    income_pension = null,
    income_salaries = null,
    income_stock = null,
  } = data as IncomeApprovalType.TotalIncomeBalanceDeclare;
  return (
    <Fragment>
      {income_salaries && (
        <GroupTotalIncomeBalance
          label={`lương`}
          node={1}
          data={income_salaries}
        />
      )}
      {income_asset_rent && (
        <GroupTotalIncomeBalance
          isAssetRent
          label={`cho thuê tài sản`}
          node={2}
          data={income_asset_rent}
        />
      )}
      {income_business_household && (
        <GroupTotalIncomeBalance
          label={`hoạt động KD`}
          node={3}
          data={income_business_household}
        />
      )}
      {income_companies && (
        <GroupTotalIncomeBalance
          label={`doanh nghiệp`}
          node={4}
          data={income_companies}
        />
      )}
      {income_stock && (
        <GroupTotalIncomeBalance
          label={`cổ túc, lợi nhuận`}
          node={5}
          data={income_stock}
        />
      )}
      {income_deposit && (
        <GroupTotalIncomeBalance
          label={`lãi tiền gửi, GTCG`}
          node={6}
          data={income_deposit}
        />
      )}
      {income_pension && (
        <GroupTotalIncomeBalance
          label={`lương hưu trí`}
          node={7}
          data={income_pension}
        />
      )}
      {income_other && (
        <GroupTotalIncomeBalance label={`khác`} node={8} data={income_other} />
      )}
    </Fragment>
  );
};


export default IncomeStepData;