import {  Fragment } from "react";
import { TableCell, TableRow } from "@mui/material";
import * as IncomeApprovalType from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import incomeStyle from "../../style";
import IncomeStepData from "./IncomeStepData";
import DeclareTotalIncome from "./DeclareTotalIncome";
import CoGroupTotalIncomeBalance from "./CoGroupTotalIncomeBalance";
import { getFormatNumber } from "utils";

interface CoDeclareTotalIncomeProps {
  data: IncomeApprovalType.TotalIncomeCoBalanceDeclare | null | undefined;
  label?: string;
  node?:string;
}
const CoDeclareTotalIncome = ({
  data,
  label = "",
  node = "",
}: CoDeclareTotalIncomeProps) => {
  const classes = incomeStyle();
  const {
    customer_info = [],
    total_income_business = 0,
    total_income_staff = 0,
  } = data as IncomeApprovalType.TotalIncomeCoBalanceDeclare;
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
      {customer_info.map((customer, index) => (
        <CoGroupTotalIncomeBalance
          index={index}
          key={customer.customer_uuid}
          data={customer}
        />
      ))}
    </Fragment>
  );
};

export default CoDeclareTotalIncome;