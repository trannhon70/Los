import {  Fragment } from "react";
import { TableCell, TableRow } from "@mui/material";
import * as IncomeApprovalType from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import incomeStyle, { SxHeaderRow } from "../../style";
import DeclareTotalIncome from "./DeclareTotalIncome";
import CoDeclareTotalIncome from "./CoDeclareTotalIncome";
import { getFormatNumber, intToRoman } from "utils";
import Empty from "views/components/layout/Empty";

interface TotalIncomeSectionProps {
  data: IncomeApprovalType.TotalIncome | null;
  disabled?:boolean
}
const TotalIncomeSection = ({ data , disabled}: TotalIncomeSectionProps) => {
  const classes = incomeStyle();
  if(!data) return (
    <Fragment>
      <TableRow sx={SxHeaderRow}>
        <TableCell align="center">A</TableCell>
        <TableCell align="left" colSpan={2}>
          {/* Tổng thu nhập (A) = (1)+(2)+(3)+(4)+(5)+(6)+(8) */}
          Tổng thu nhập (A)
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
    co_payer = null,
    marriage = null,
    total_income_business = 0,
    total_income_staff = 0,
  } = data as IncomeApprovalType.TotalIncome;
  
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
      case "co_payer":
        {
          let count = 1;
          borrower === null || count++;
          marriage === null || count++;
          co_borrower === null || count++;
          return count;
        }
      default:
        return 1;
    }
  }


  return (
    <Fragment>
      <TableRow sx={SxHeaderRow}>
        <TableCell align="center">A</TableCell>
        <TableCell align="left" colSpan={2}>
          {/* Tổng thu nhập (A) = (1)+(2)+(3)+(4)+(5)+(6)+(8) */}
          Tổng thu nhập (A)
        </TableCell>
        <TableCell align="right" className="text-danger">
          {getFormatNumber(total_income_business)}
        </TableCell>
        <TableCell align="right" className="text-danger pr-7">
          {getFormatNumber(total_income_staff)}
        </TableCell>
      </TableRow>
      {(()=>{
          if(
            borrower === null
            && co_borrower === null
            && co_payer === null
            && marriage === null
            // !total_income_business 
            // && !total_income_staff 
            ){
              return  <TableRow>
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
          }else {
            return <Fragment>
              {borrower && (
                <DeclareTotalIncome node={"I"} label={"KHÁCH HÀNG VAY"} data={borrower}/>
              )}
              {marriage && (
                <DeclareTotalIncome node={intToRoman(getNodeLabel("marriage"))} label={"NGƯỜI HÔN PHỐI"} data={marriage} />
              )}
              {co_borrower && (
                <CoDeclareTotalIncome node={intToRoman(getNodeLabel("co_borrower"))} label={"NGƯỜI ĐỒNG VAY"} data={co_borrower} />
              )}
              {co_payer && (
                <CoDeclareTotalIncome node={intToRoman(getNodeLabel("co_payer"))} label={"NGƯỜI ĐỒNG TRẢ NỢ"} data={co_payer} />
              )}
                    </Fragment>
                  }
              })()}
    </Fragment>
  );
}; 

export default TotalIncomeSection;
