import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fetchApprovalSourceIncome } from "features/loan/normal";
import { getLOANNormalLOSId } from "features/loan/normal/storage/selectors";
import {
  setIncomeSourceApprovalAbilityEvaluate,
  setIncomeSourceApprovalDataAbilityLoanInfo
} from "features/loan/normal/storageApproval/income/action";
import * as selector from "features/loan/normal/storageApproval/income/selector";
import { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as IncomeApprovalType from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import { formatNumber, getFormatNumber } from "utils";
import { timestampToDate } from "utils/date";
import Input from "views/components/base/Input";
import TextArea from "views/components/base/TextArea";
import TableSticky from "views/components/layout/TableSticky";
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
import { SxHeaderRow, SxHeaderRowTopBorderWhite } from "./style";

interface UnitCellProps extends IncomeApprovalType.UnitCellAbility {
  input?: {
    value: string;
    onChange: (value: string) => void;
    disabled?:boolean;
  } | null;
  disabled?:boolean;
}
const UnitCell = ({ unit = "", value = 0, input = null,disabled }: UnitCellProps) => {
  return (
    <Fragment>
      <TableCell align="center" >{unit}</TableCell>
      {input ? (
        <TableCell>
          <Input
            format
            type="number"
            value={input.value}
            onDebounce={input.onChange}
            disabled={disabled}
          />
        </TableCell>
      ) : (
        <TableCell className="px-7" align="right">{getFormatNumber(value)}</TableCell>
      )}
    </Fragment>
  );
};

const IncomeAbilityRepay: FC = () => {
  const abilityData = useSelector(selector.getSourceApprovalIncomeAbilityData);
  const dispatch = useDispatch();
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
  const onChangeAbilityDataAbilityEvaluate = (
    value: string,
    key: keyof IncomeApprovalType.IApprovalIncomeAbility
  ) => {
    dispatch(
      setIncomeSourceApprovalAbilityEvaluate(value, { key: "evaluate" })
    );
  };

  const onChangeAbilityDataAbilityLoanInfo = (
    value: string,
    key: keyof IncomeApprovalType.LoanInfo
  ) => {
    dispatch(setIncomeSourceApprovalDataAbilityLoanInfo(value, { key: key }));
  };

  const los_id = useSelector(getLOANNormalLOSId);
  useEffect(() => {
    dispatch(fetchApprovalSourceIncome(los_id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        BẢNG TÍNH KHẢ NĂNG TRẢ NỢ CỦA KHÁCH HÀNG
      </Typography>
      <TableSticky className="mscb-table mscb-table-border">
        <TableHead>
          <TableRow>
            <TableCell className="text-center" width="3%">
              STT
            </TableCell>
            <TableCell className="text-center" width="60%">
              NỘI DUNG
            </TableCell>
            <TableCell className="text-center" width="10%">
              ĐƠN VỊ
            </TableCell>
            <TableCell className="text-center" width="27%">
              GIÁ TRỊ
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{
          '& .MuiTableCell-root':{
            fontWeight: 500,
            color: '#353535'
          }
        }}>
          <TableRow className="mscb-table-row-title" sx={SxHeaderRow}>
            <TableCell align="center" >I</TableCell>
            <TableCell align="left" colSpan={3} >
              THÔNG TIN KHOẢN VAY
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">1</TableCell>
            <TableCell align="left">Vốn dự kiến vay SCB (1)</TableCell>
            <UnitCell
              disabled={ruleDisabled}
              {...abilityData?.ability_to_repay_of_customer?.loan_info?.loan_scb}
            />
          </TableRow>
          <TableRow>
            <TableCell align="center">2</TableCell>
            <TableCell align="left">  Vốn dự kiến vay SCB theo đề xuất của nhân viên tái thẩm định (2)</TableCell>
            <UnitCell
              disabled={ruleDisabled}
              {...abilityData?.ability_to_repay_of_customer?.loan_info?.loan_scb_by_staff}
              // input={{
              //   value: (
              //     abilityData?.ability_to_repay_of_customer?.loan_info
              //       ?.loan_scb_by_staff.value ?? 0
              //   ).toString(),
              //   onChange: (value) => {
              //     onChangeAbilityDataAbilityLoanInfo(value, "loan_scb_by_staff");
              //   },
              // }}
            />
          </TableRow>
          <TableRow>
            <TableCell align="center">3</TableCell>
            <TableCell align="left">Thời hạn vay theo đề xuất của nhân viên tái thẩm định (3)</TableCell>
            <UnitCell
              disabled={ruleDisabled}
              {...abilityData?.ability_to_repay_of_customer?.loan_info?.duration_loan}
              // input={{
              //   value: (
              //     abilityData?.ability_to_repay_of_customer?.loan_info
              //       ?.duration_loan?.value ?? 0
              //   ).toString(),
              //   onChange: (value) => {
              //     onChangeAbilityDataAbilityLoanInfo(value, "duration_loan");
              //   },
              // }}
            />
          </TableRow>
          <TableRow>
            <TableCell align="center">4</TableCell>
            <TableCell align="left">LSCV tối đa của SCB hiện hành (4)</TableCell>
            <UnitCell
              disabled={ruleDisabled}
              {...abilityData?.ability_to_repay_of_customer?.loan_info?.lscv_scb}
              unit={"%"}
              // input={{
              //   value: (
              //     abilityData?.ability_to_repay_of_customer?.loan_info?.lscv_scb
              //       ?.value ?? 0
              //   ).toString(),
              //   onChange: (value) => {
              //     onChangeAbilityDataAbilityLoanInfo(value, "lscv_scb");
              //   },
              // }}
            />
          </TableRow>
          <TableRow className="mscb-table-row-title" sx={SxHeaderRow}>
            <TableCell align="center" className="text-primary">II</TableCell>
            <TableCell align="left" colSpan={3} className="text-primary">
              Thu nhập - chi phí
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">5</TableCell>
            <TableCell align="left">Tiền gốc định kỳ (5)</TableCell>
            <UnitCell
              {...abilityData?.ability_to_repay_of_customer?.plan_payment
                ?.periodic_principal}
            />
          </TableRow>
          <TableRow>
            <TableCell align="center">6</TableCell>
            <TableCell align="left">Tiền gốc kỳ cuối cùng (6)</TableCell>
            <UnitCell
              {...abilityData?.ability_to_repay_of_customer?.plan_payment
                ?.last_installment_principal}
            />
          </TableRow>
          <TableRow>
            <TableCell align="center">7</TableCell>
            <TableCell align="left">Tiền lãi + phí (nếu có) kỳ cao nhất (7)</TableCell>
            <UnitCell
              {...abilityData?.ability_to_repay_of_customer?.plan_payment
                ?.interest_and_cost}
            />
          </TableRow>
          <TableRow>
            {/* Chưa có data */}
            <TableCell align="center">8</TableCell>
            <TableCell align="left">Chi phí trả nợ vay hiện tại (8)</TableCell>
            <UnitCell
              {...abilityData?.ability_to_repay_of_customer?.plan_payment
                ?.current_loan_payment_costs}
            />
          </TableRow>
          <TableRow>
            <TableCell align="center">9</TableCell>
            <TableCell align="left">Tổng số tiền phải trả hàng tháng (9) = (5) + (7) + (8)</TableCell>
            <UnitCell
              {...abilityData?.ability_to_repay_of_customer?.plan_payment
                ?.total_monthly_payment}
            />
          </TableRow>
          <TableRow>
            <TableCell align="center">10</TableCell>
            <TableCell align="left">Tổng thu nhập hàng tháng (10)</TableCell>
            <UnitCell
              {...abilityData?.ability_to_repay_of_customer?.plan_payment
                ?.total_income}
            />
          </TableRow>

          <TableRow className="mscb-table-row-title" sx={SxHeaderRow}>
            <TableCell align="center" className="text-primary">III</TableCell>
            <TableCell align="left" className="text-primary">
              Nghĩa vụ trả nợ trên thu nhập (DTI)(III) = (9) / (10)
            </TableCell>
            <TableCell align="center">{abilityData?.ability_to_repay_of_customer?.repayment_on_income?.unit ?? ""}</TableCell>
            <TableCell className="text-danger">{formatNumber(abilityData?.ability_to_repay_of_customer?.repayment_on_income?.value.toString() ?? "")}</TableCell>
          </TableRow>
          <TableRow className="mscb-table-row-title" sx={SxHeaderRowTopBorderWhite}>
            <TableCell align="center" className="text-primary">IV</TableCell>
            <TableCell align="left" colSpan={2} className="text-primary">
              Đánh giá khả năng thanh toán của khách hàng
            </TableCell>
            <TableCell align="left" className="text-danger">
              {abilityData?.ability_to_repay_of_customer?.assess_solvency ===
              "GURANTEE"
                ? "Đảm bảo"
                : "Không đảm bảo"}{" "}
              khả năng thanh toán
            </TableCell>
          </TableRow>
        </TableBody>
      </TableSticky>
      <Box style={{ position: "relative", marginTop: "25px" }}>
        {
          abilityData?.update_at && <span
          style={{
            position: "absolute",
            right: 0,
          }}
        >
          <i style={{ fontSize: "12px", color: "#707070" }}>
            {`Cập nhật: `}
          </i>
          <i style={{ fontSize: "12px", color: "#1825aa" }}>
            {`${abilityData.full_name} - ${timestampToDate(abilityData.update_at, "HH:mm - DD/MM/YYYY") }`}
          </i>
        </span>
        }
        <TextArea
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
          value={abilityData?.evaluate ?? ""}
          label="Đánh giá đề xuất"
          disabled={ruleDisabled}
          onDebounce={(value) =>
            onChangeAbilityDataAbilityEvaluate(value, "evaluate")
          }
        />
      </Box>
    </Box>
  );
};


export default IncomeAbilityRepay;

