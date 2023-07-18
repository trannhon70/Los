import { Fragment} from "react";
import {  TableCell, TableRow } from "@mui/material";
import incomeStyle from "../../style";
import * as IncomeApprovalType from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import { getFormatNumber } from "utils";
import { DeclareTotalCostProps } from "./types";
import GroupTotalCost from "./GroupTotalCost";

const DeclareTotalCost = (props: DeclareTotalCostProps) => {
  const { data, label = "", input = null, node = "",disabled } = props;
  if (!data) return null;
  const classes = incomeStyle();
  const {
    value_by_business_household = 0,
    value_by_staff = 0,
  } = data as IncomeApprovalType.TotalCostDeclare;
  return (
    <Fragment>
      <TableRow className={classes.rowParent}>
        <TableCell align="center">{node}</TableCell>
        <TableCell align="left" colSpan={2}>
          {label}
        </TableCell>
        <TableCell align="right" className="text-danger">
          {getFormatNumber(value_by_business_household)}
        </TableCell>
        <TableCell align="right" className="text-danger pr-7">
          {getFormatNumber(value_by_staff)}
        </TableCell>
      </TableRow>
      <GroupTotalCost {...props} />
    </Fragment>
  );
}; 

export default DeclareTotalCost;
