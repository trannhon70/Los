import {  Fragment } from "react";
import { TableCell, TableRow } from "@mui/material";
import * as IncomeApprovalType from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import incomeStyle from "../../style";
import TotalIncomeBalanceItem from "./TotalIncomeBalanceItem";
import { getFormatNumber } from "utils";

const getLabelTotalIncomeStep = (
  num: number | string,
  array: IncomeApprovalType.IncomeInfo[]
) => {
  let string = "";

  array.forEach((item, index) => {
    string += `(${num}.${index + 1}) ${
      array.length - 1 !== index ? " + " : ""
    }`;
  });

  return string;
};
interface GroupTotalIncomeBalanceProps {
  data: IncomeApprovalType.TotalIncomeBalanceStep | null | undefined;
  label?: string;
  isAssetRent?: boolean;
  node: number | string;
}
const GroupTotalIncomeBalance = ({
  data,
  label = "",
  node = "",
  isAssetRent
}: GroupTotalIncomeBalanceProps) => {
  const classes = incomeStyle();
  const {
    income_info = [],
    value_by_business_household = 0,
    value_by_staff = 0,
  } = data as IncomeApprovalType.TotalIncomeBalanceStep;
  const groupLabel = `Thu nhập từ ${label}: (${node}) = ${getLabelTotalIncomeStep(
    node,
    income_info
  )}`;
  return (
    <Fragment>
      <TableRow className={classes.rowChild}>
        <TableCell align="center">{node}</TableCell>
        <TableCell align="left" colSpan={2} className="row-child-title">
          {groupLabel}
        </TableCell>
        <TableCell align="right" className="text-danger">
          {getFormatNumber(value_by_business_household)}
        </TableCell>
        <TableCell align="right" className="text-danger pr-7">
          {getFormatNumber(value_by_staff)}
        </TableCell>
      </TableRow>
      {income_info.map((incomeDetail, index) => (
        <TotalIncomeBalanceItem
          key={index}
          node={`${node}.${index+1}`}
          label={`${!!isAssetRent ? incomeDetail.name : `Chi tiết nguồn thu từ ${label}`} (${node}.${index + 1})`}
          data={incomeDetail}
        />
      ))}
    </Fragment>
  );
};

export default GroupTotalIncomeBalance;