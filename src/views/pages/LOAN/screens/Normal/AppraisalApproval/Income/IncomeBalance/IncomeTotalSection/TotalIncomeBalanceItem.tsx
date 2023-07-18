import {  Fragment } from "react";
import { TableCell, TableRow } from "@mui/material";
import * as IncomeApprovalType from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import incomeStyle from "../../style";
import { getFormatNumber } from "utils";

interface TotalIncomeBalanceItemProps {
  data: IncomeApprovalType.IncomeInfo | null | undefined;
  label?: string;
  node?:string | number;
}
const TotalIncomeBalanceItem = ({
  data,
  label = "",
  node = "",
}: TotalIncomeBalanceItemProps) => {
  const classes = incomeStyle();
  const {
    detail = "",
    value_by_business_household = 0,
    value_by_staff = 0,
  } = data as IncomeApprovalType.IncomeInfo;
  return (
    <TableRow className={classes.rowDetail}>
      <TableCell align="center">{node}</TableCell>
      <TableCell align="left" className="row-detail-title">
        {/* Chi tiết nguồn thu từ lương (1.1) */}
        {label}
      </TableCell>
      <TableCell align="left">{detail}</TableCell>
      <TableCell align="right" className="font-medium">{getFormatNumber(value_by_business_household)}</TableCell>
      <TableCell align="right" className="pr-7 font-medium">{getFormatNumber(value_by_staff)}</TableCell>
    </TableRow>
  );
};

export default TotalIncomeBalanceItem;