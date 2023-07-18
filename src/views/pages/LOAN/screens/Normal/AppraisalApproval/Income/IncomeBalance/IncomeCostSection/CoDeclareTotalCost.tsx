import { Fragment } from "react";
import { TableCell, TableRow } from "@mui/material";
import incomeStyle from "../../style";
import * as IncomeApprovalType from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import { getFormatNumber } from "utils";
import GroupTotalCost from "./GroupTotalCost";
interface CoDeclareTotalCostProps {
  data: IncomeApprovalType.CoTotalCostDeclare | null | undefined;
  label?: string;
  onChange?: ((value: string) => void) | null;
  node?: string;
  disabled?: boolean;
  declare: string
}

const CoDeclareTotalCost = ({
  data,
  label = "",
  onChange = null,
  node = "",
  disabled,
  declare
}: CoDeclareTotalCostProps) => {
  if (!data) return null;
  const classes = incomeStyle();
  const {
    customer_info = [],
    value_by_business_household = 0,
    value_by_staff = 0,
  } = data as IncomeApprovalType.CoTotalCostDeclare;

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
      {customer_info.map((customer, index) => (
        <Fragment key={customer.customer_uuid}>
          <TableRow className={classes.rowChild}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="left" colSpan={2} className="row-child-title text-primary">
              {customer.customer_name}
            </TableCell>
            <TableCell align="right" className="text-danger">
              {getFormatNumber(customer.value_by_business_household)}
            </TableCell>
            <TableCell align="right" className="text-danger pr-7">
              {getFormatNumber(customer.value_by_staff)}
            </TableCell>
          </TableRow>
          <GroupTotalCost
            disabled={disabled}
            data={customer} 
            label={customer.customer_name}
            declare={declare}
          />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default CoDeclareTotalCost;
