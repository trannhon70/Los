import { Fragment } from 'react';
import { TableCell, TableRow } from '@mui/material';
import * as IncomeApprovalType from 'types/models/loan/normal/storageApproval/SourceIncomeForm';
import incomeStyle from '../../style';
import IncomeStepData from './IncomeStepData';
import DeclareTotalIncome from './DeclareTotalIncome';
import { getFormatNumber } from 'utils';

interface CoGroupTotalIncomeBalanceProps {
  data: IncomeApprovalType.TotalIncomeBalanceDeclare | null | undefined;
  index: number;
}
const CoGroupTotalIncomeBalance = ({
  data,
  index,
}: CoGroupTotalIncomeBalanceProps) => {
  const classes = incomeStyle();
  const {
    name = '',
    total_income_business = 0,
    total_income_staff = 0,
  } = data as IncomeApprovalType.TotalIncomeBalanceDeclare;
  return (
    <Fragment>
      <TableRow className={classes.rowChild}>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell
          align="left"
          colSpan={2}
          className="row-child-title text-primary"
        >
          {name}
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

export default CoGroupTotalIncomeBalance;
