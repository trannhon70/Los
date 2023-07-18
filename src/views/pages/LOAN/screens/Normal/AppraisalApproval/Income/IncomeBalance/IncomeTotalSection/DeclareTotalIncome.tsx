import {  Fragment } from "react";
import { TableCell, TableRow } from "@mui/material";
import * as IncomeApprovalType from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import incomeStyle from "../../style";
import TotalIncomeBalanceItem from "./TotalIncomeBalanceItem";
import GroupTotalIncomeBalance from "./GroupTotalIncomeBalance";
import IncomeStepData from "./IncomeStepData";
import { getFormatNumber } from "utils";

interface DeclareTotalIncomeProps {
  data: IncomeApprovalType.TotalIncomeBalanceDeclare | null | undefined;
  label?: string;
  node?:string;
}
const DeclareTotalIncome = ({ data, label = "",node = "" }: DeclareTotalIncomeProps) => {
  const classes = incomeStyle();
  const { total_income_business = 0, total_income_staff = 0 } =
    data as IncomeApprovalType.TotalIncomeBalanceDeclare;
  return (
    <Fragment>
      <TableRow className={classes.rowParent}>
        <TableCell align="center">{node}</TableCell>
        <TableCell align="left" colSpan={2}>
          {label}
        </TableCell>
        <TableCell align="right" className="text-danger">
          {getFormatNumber(total_income_business)}
        </TableCell>
        <TableCell align="right" className="text-danger pr-7">
          {getFormatNumber(total_income_staff)}
        </TableCell>
      </TableRow>
      <IncomeStepData data={data} />
    </Fragment>
  );
};

export default DeclareTotalIncome;