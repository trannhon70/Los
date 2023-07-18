import { TableCell, TableRow } from "@mui/material";
import useMasterData from "app/hooks/useMasterData";
import { updateBusinessCostDetail } from "features/loan/normal/storageApproval/income/action";
import { getRuleDisbledReappraise } from "features/loan/normal/storageGuide/selector";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoanRepaymentCostDetail } from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import { getFormatNumber } from "utils";
import Input from "views/components/base/Input";
import incomeStyle from "../../style";
import { DeclareTotalCostProps } from "./types";
const PREFIX = "<PREFIX>";
const getLabelTotalIncomeStep = (num: number | string, array: any[]) => {
  if (!array) return "";
  let string = "";

  array.forEach((item, index) => {
    string += `(${num}.${index + 1}) ${
      array.length - 1 !== index ? " + " : ""
    }`;
  });

  return string;
};

interface LoanRepaymentCostsProps extends DeclareTotalCostProps {}

const LoanRepaymentCosts = ({ data, node="", declare }: LoanRepaymentCostsProps) => {
  const { CreditInstitution , register } = useMasterData()
  const getRuleDisabled = useSelector(getRuleDisbledReappraise)
  const dispatch = useDispatch()
  useEffect(() => {
    register('creditInstitution')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getNameCreditInstitution = (id: string) => {
    return CreditInstitution.find(e => e.id === id)?.short_name ?? ""
  }
  if (!data || !data.loan_repayment_costs) return null;
  const classes = incomeStyle();
  const {detail = [] ,value_by_business_household = 0,value_by_staff = 0} = data.loan_repayment_costs;
  const groupLabel = getLabelTotalIncomeStep(+node, detail); 

  const handleChangeCost = (cost: LoanRepaymentCostDetail) =>  (value: string) => {
    dispatch(updateBusinessCostDetail(value, {
      declare, 
      customer_uuid: data.customer_uuid, 
      cost_uuid: cost.uuid ?? ""
    }))
  }

  return (
    <Fragment>
      <TableRow className={classes.rowChild}>
        <TableCell align="center">{node}</TableCell>
        <TableCell align="left" colSpan={2} className="row-child-title">
          {/* Chi phí trả nợ vay hiện tại */}
          Chi phí trả nợ vay hiện tại ({node}) = {groupLabel}
        </TableCell>
        <TableCell align="right" className="text-danger">
          {getFormatNumber(value_by_business_household)}
        </TableCell>
        <TableCell align="right" className="text-danger pr-7">
          {getFormatNumber(value_by_staff)}
        </TableCell>
      </TableRow>
      <Fragment>
        {detail?.map(
          (cost, index) =>
            cost && (
              <TableRow className={classes.rowDetail} key={index.toString()}>
                <TableCell align="center">1.{index + 1}</TableCell>
                <TableCell align="left" className="row-detail-title">
                  {cost?.name ?? ""}
                </TableCell>
                <TableCell align="left">{getNameCreditInstitution(cost?.detail ?? "")}</TableCell>
                <TableCell align="right" className="font-medium">
                  <Input 
                    disabled={getRuleDisabled}
                    format
                    type="number"
                    value={cost?.value_by_business_household?.toString() ?? ""}
                    onDebounce={handleChangeCost(cost)}
                  />
                  {/* { !getIsCreditCard(cost.name) ? getFormatNumber(cost?.value_by_business_household) : null} */}
                </TableCell>
                <TableCell align="right" className="pr-7 font-medium">
                  {getFormatNumber(cost?.value_by_staff)}
                </TableCell>
              </TableRow>
            )
        )}
      </Fragment>
    </Fragment>
  );
};

// interface OtherCostProps extends DeclareTotalCostProps {}

// const OtherCost = ({ data, node ="", input = null, disabled }: OtherCostProps) => {
//   if (!data) return null;

//   const classes = incomeStyle();
//   const { other_cost, customer_uuid } = data;
//   return (
//     <TableRow className={classes.rowChild}>
//       <TableCell align="center">{node}</TableCell>
//       <TableCell align="left" colSpan={2} className="row-child-title">
//         Chi phí khác
//       </TableCell>
//       <TableCell align="right" className="text-danger">
//         {getFormatNumber(other_cost?.value_by_business_household)}
//       </TableCell>
//       {input ? (
//         <TableCell align="right" className="text-danger">
//           <Input
//             disabled={disabled}
//             format
//             type="number"
//             value={input.value}
//             onDebounce={(value) =>
//               input.onChange(`${customer_uuid}${PREFIX}${value}`)
//             }
//           />
//         </TableCell>
//       ) : (
//         <TableCell align="right" className="text-danger pr-7">
//           {getFormatNumber(other_cost?.value_by_staff)}
//         </TableCell>
//       )}
//     </TableRow>
//   );
// };

interface GroupTotalCostProps extends DeclareTotalCostProps {}
const GroupTotalCost = ({
  data,
  label = "",
  input = null,
  disabled,
  declare
}: GroupTotalCostProps) => {
  if (!data) return null;
  const { loan_repayment_costs = null  } = data;
  const isHaveLoanRepaymentCost = !!loan_repayment_costs && Boolean(loan_repayment_costs?.detail?.length > 0);
  return (
    <Fragment>
      {isHaveLoanRepaymentCost && <LoanRepaymentCosts node={"1"} data={data} declare={declare} />}
      {/* {other_cost && (
        <OtherCost
          node={isHaveLoanRepaymentCost ? "2" : "1"}
          input={input}
          data={data}
          disabled={disabled}
        />
      )} */}
    </Fragment>
  );
};

export default GroupTotalCost;
