import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fetchApprovalSourceIncome } from "features/loan/normal";
import { getLOANNormalLOSId } from "features/loan/normal/storage/selectors";
import { setIncomeSourceApprovalBalanceData } from "features/loan/normal/storageApproval/income/action";
import * as selector from "features/loan/normal/storageApproval/income/selector";
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timestampToDate } from "utils/date";
import TextArea from "views/components/base/TextArea";
import Empty from "views/components/layout/Empty";
import TableSticky from "views/components/layout/TableSticky";
import TotalCostSection from "./IncomeCostSection";
import TotalIncomeSection from "./IncomeTotalSection";


const IncomeBalance: FC = () => {
  const balanceData = useSelector(selector.getSourceApprovalIncomeBalanceData);
  const dispatch = useDispatch();
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
  // balanceData.financial_situation_of_customer.total_income
  const onChangeBalanceEvaluate = (value: string) => {
    dispatch(setIncomeSourceApprovalBalanceData(value, { key: "evaluate" }));
  };
  const los_id = useSelector(getLOANNormalLOSId);
  useEffect(() => {
    dispatch(fetchApprovalSourceIncome(los_id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if(balanceData.uuid === null){
  //   return <Empty sx={{
  //     minHeight: 400,
  //     "& img": {
  //       width: "23%"
  //     },
  //     fontSize: '20px',
  //     fontWeight: 300,
  //     // fontStyle: 'italic',
  //   }}>
  //     Chưa có dữ liệu
  //   </Empty>
  // }

  return (
    <Box className="mscb-input-table mscb-input-right">
      <Typography
        variant="h4"
        component="h4"
        className="font-bold text-upper mt-6 mb-3"
        sx={{
          fontSize: "19px",
        }}
      >
        Tình hình tài chính của khách hàng
      </Typography>
      <TableSticky className="mscb-table mscb-table-border">
        <TableHead>
          <TableRow>
            <TableCell className="text-center" width="3%">
              STT
            </TableCell>
            <TableCell className="text-center" width="35%">
              CHỈ TIÊU
            </TableCell>
            <TableCell className="text-center" width="24%">
              THÔNG TIN CHI TIẾT
            </TableCell>
            <TableCell className="text-center"  width="18%">
              Giá trị theo ĐVKD (VND)
            </TableCell>
            <TableCell rowSpan={2} className="text-center" width="18%">
              Giá trị theo CVTĐ (VND)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TotalIncomeSection
            data={balanceData.financial_situation_of_customer.total_income}
            disabled={ruleDisabled}
          />
          <TotalCostSection
            data={balanceData.financial_situation_of_customer.total_cost}
            disabled={ruleDisabled}
          />
        </TableBody>
      </TableSticky>
      <Box style={{ position: "relative", marginTop: "25px" }}>
        {
          balanceData?.update_at && <span
          style={{
            position: "absolute",
            right: 5,
          }}
        >
          <i style={{ fontSize: "12px", color: "#707070" }}>
            {`Cập nhật: `}
          </i>
          <i style={{ fontSize: "12px", color: "#1825aa" }}>
            {`${balanceData.full_name} - ${timestampToDate(balanceData.update_at, "HH:mm - DD/MM/YYYY") }`}
          </i>
        </span>
        }
        <TextArea
          disabled={ruleDisabled}
          sx={{
            "& textarea": {
              padding: "10px",
              height: "100px !important",
              overflowY: "scroll!important ",
              overflowX: "hidden!important",
              backgroundColor: "#f2f3f9",
              marginBottom: "unset !important",
              border: "none",
              resize: "none",
              fontSize: "14px",
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            },
            "& textarea::-webkit-scrollbar": {
              width: "5px",
              "border-radius": "50px",
            },
            "& textarea::-webkit-scrollbar-thumb": {
              background: "#d5d5d5",
              "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)",
            },
            "& textarea:focus": {
              outline: "none",
            },
          }}
          label="Đánh giá đề xuất"
          value={balanceData.evaluate ?? ""}
          onDebounce={onChangeBalanceEvaluate}
        />
      </Box>
    </Box>
  );
};

export default IncomeBalance;
