import { Fragment } from "react";
import { TableCell, TableRow } from "@mui/material";
import incomeStyle, { SxHeaderRow } from "../../style";
import * as IncomeApprovalType from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import { useDispatch } from "react-redux";
import {
  setIncomeSourceApprovalBalanceDataOtherCostDeclare,
  updateOtherCostByStaff,
} from "features/loan/normal/storageApproval/income/action";
import { getFormatNumber, intToRoman } from "utils";
import DeclareTotalCost from "./DeclareTotalCost";
import CoDeclareTotalCost from "./CoDeclareTotalCost";
import Input from "views/components/base/Input";
import Empty from "views/components/layout/Empty";
const PREFIX = "<PREFIX>";
interface TotalCostSectionProps {
  data: IncomeApprovalType.TotalCost | null | undefined;
  disabled?: boolean;
}
//
const TotalCostSection = ({ data, disabled }: TotalCostSectionProps) => {
  const classes = incomeStyle();
  const dispatch = useDispatch();
  if (!data) return (
    <Fragment>
      <TableRow sx={SxHeaderRow}>
        <TableCell align="center">B</TableCell>
        <TableCell align="left" colSpan={2}>
        TỔNG CHI PHÍ (B)
        </TableCell>
        <TableCell align="right" className="text-danger">0</TableCell>
        <TableCell align="right" className="text-danger pr-7">0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5}>
          <Empty
            sx={{
              minHeight: 300,
              "& img": {
                width: "23%",
              },
              fontSize: "20px",
              fontWeight: 300,
              // fontStyle: 'italic',
            }}
          >
            Chưa có dữ liệu
          </Empty>
        </TableCell>
      </TableRow>
    </Fragment>
  );
  const {
    borrower = null,
    co_borrower = null,
    // co_payer = null,
    marriage = null,
    value_by_business_household = 0,
    value_by_staff = 0,
    other_cost_by_business_household = 0,
    other_cost_by_staff = 0,
  } = data as IncomeApprovalType.TotalCost;

  const onChangeOtherCost =
    (declare: keyof IncomeApprovalType.TotalCost) => (val: string) => {
      const [customer_uuid = "", value = ""] = val.split(PREFIX);
      dispatch(
        setIncomeSourceApprovalBalanceDataOtherCostDeclare(+value, {
          customer_uuid,
          declare,
        })
      );
    };

  const countOtherCostNode = () => {
    let count = 1;
    borrower === null || count++;
    marriage === null || count++;
    co_borrower === null || count++;
    // co_payer === null || count++;
    return count;
  };
  const countNode = countOtherCostNode();

  const generateTotalCostTitle = () => {
    let listNode = [];
    for (let i = 0; i < countNode; i++) {
      listNode.push(intToRoman(i + 1));
    }
    return `TỔNG CHI PHÍ (B) = ${listNode
      .map((e) => "(" + e + ")")
      .join(" + ")}`;
  };

  const handleUpdateOtherCostByStaff = (value: string) => {
    dispatch(updateOtherCostByStaff(Number(value)));
  };

  const getNodeLabel = (position: string) => {
    switch (position) {
      case "marriage":
        {
          let count = 1;
          borrower === null || count++;
          return count;
        }
      case "co_borrower":
        {
          let count = 1;
          borrower === null || count++;
          marriage === null || count++;
          return count;
        }
      // case "co_payer":
      //   {
      //     let count = 1;
      //     borrower === null || count++;
      //     marriage === null || count++;
      //     co_borrower === null || count++;
      //     return count;
      //   }
      default:
        return 1;
    }
  }


  return (
    <Fragment>
      <TableRow sx={SxHeaderRow}>
        <TableCell align="center">B</TableCell>
        <TableCell align="left" colSpan={2}>
          {generateTotalCostTitle()}
        </TableCell>
        <TableCell align="right" className="text-danger">
          {getFormatNumber(value_by_business_household)}
        </TableCell>
        <TableCell align="right" className="text-danger pr-7">
          {getFormatNumber(value_by_staff)}
        </TableCell>
      </TableRow>
      {(() => {
        if (
          borrower === null 
          && co_borrower === null 
          // && co_payer === null 
          && marriage === null 
          // !value_by_business_household 
          // && !value_by_staff 
          // && !other_cost_by_business_household 
          // && !other_cost_by_staff
        ) {
          return (
            <TableRow>
              <TableCell colSpan={5}>
                <Empty
                  sx={{
                    minHeight: 300,
                    "& img": {
                      width: "23%",
                    },
                    fontSize: "20px",
                    fontWeight: 300,
                    // fontStyle: 'italic',
                  }}
                >
                  Chưa có dữ liệu
                </Empty>
              </TableCell>
            </TableRow>
          );
        } else {
          return (
            <Fragment>
              <DeclareTotalCost
                node="I"
                label={"KHÁCH HÀNG VAY"}
                declare={"borrower"}
                disabled={disabled}
                data={borrower}
                input={{
                  value: borrower?.other_cost?.value_by_staff?.toString() ?? "",
                  onChange: onChangeOtherCost("borrower"),
                }}
              />
              <DeclareTotalCost
                node={intToRoman(getNodeLabel("marriage"))}
                label={"NGƯỜI HÔN PHỐI"}
                declare={"marriage"}
                data={marriage}
                disabled={disabled}
                input={{
                  value: marriage?.other_cost?.value_by_staff?.toString() ?? "",
                  onChange: onChangeOtherCost("marriage"),
                }}
              />
              <CoDeclareTotalCost
                node={intToRoman(getNodeLabel("co_borrower"))}
                label={"NGƯỜI ĐỒNG VAY"}
                data={co_borrower}
                declare={"co_borrower"}
                disabled={disabled}
                onChange={onChangeOtherCost("co_borrower")}
              />
              {/* <CoDeclareTotalCost
                node={intToRoman(getNodeLabel("co_payer"))}
                label={"NGƯỜI ĐỒNG TRẢ NỢ"}
                declare={"co_payer"}
                data={co_payer}
                disabled={disabled}
                onChange={onChangeOtherCost("co_payer")}
              /> */}
              <TableRow className={classes.rowParent}>
                <TableCell align="center">{intToRoman(countNode)}</TableCell>
                <TableCell align="left" colSpan={2}>
                  Chi phí khác
                </TableCell>
                <TableCell align="right" className="text-danger">
                  {getFormatNumber(other_cost_by_business_household)}
                </TableCell>
                <TableCell align="right" className="text-danger pr-7">
                  <Input
                    disabled={disabled}
                    format
                    type="number"
                    value={other_cost_by_staff?.toString() ?? ""}
                    onDebounce={handleUpdateOtherCostByStaff}
                  />
                  {/* {getFormatNumber(other_cost_by_staff)} */}
                </TableCell>
              </TableRow>
            </Fragment>
          );
        }
      })()}
    </Fragment>
  );
};

export default TotalCostSection;
