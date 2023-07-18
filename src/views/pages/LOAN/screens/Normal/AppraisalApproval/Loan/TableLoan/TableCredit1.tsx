import { TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import useApprovalLOANMessage from "app/hooks/useApprovalLOANMessage";
import { onchaneLOANNote, onChangeLoanCaptitalTotalCost, onChangeLoanCaptitalTurnOverEffect, onChangeLoanLimitTotalCost } from "features/loan/normal/storageApproval/loan/action";
import { getApprovalLOANCapitalNeedOption } from "features/loan/normal/storageApproval/loan/selectors";
import { getLOANApprovalUserFullName } from 'features/loan/normal/storageApproval/selectors';
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ILOANLimit, IPlanEffectOptionFull, ITurnOver } from "types/models/loan/normal/storageApproval/LoanInfoForm";
import { formatNumber } from "utils";
import { timestampToDate } from "utils/date";
import Numberbox from "views/components/base/Numberbox";
import TextArea from "views/components/base/TextArea";
import TableSticky from "views/components/layout/TableSticky";
import { SxHeaderRow, SxTable } from "./style";
const TableCredit1: FC = () => {

  const dispatch = useDispatch();
  const getMessage = useApprovalLOANMessage();
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
  const dataOption1Table = useSelector(getApprovalLOANCapitalNeedOption)
  const fullname = useSelector(getLOANApprovalUserFullName)

  const onChangeDataTurnOver = (value: string | number | null, key: keyof ITurnOver, keyOptions: keyof Omit<IPlanEffectOptionFull, "total_cost">) => {
    dispatch(onChangeLoanCaptitalTurnOverEffect(value, { key: key, keyOptions: keyOptions }))
  }

  const onChangeDataTotalCost = (value: string | number | null, key: keyof ITurnOver) => {
    dispatch(onChangeLoanCaptitalTotalCost(value, { key: key }))
  }

  const onChangeLoanLimitTotalCostData = (value: string | number | null, key: keyof ITurnOver, keyOptions: keyof ILOANLimit) => {
    dispatch(onChangeLoanLimitTotalCost(value, { key: key, keyOptions: keyOptions }))
  }

  const onChangeNote = (value: string) => {
    dispatch(onchaneLOANNote(value, { username: fullname }))
  }



  return (
    <Box className="mscb-input-table mscb-input-right">
      <Typography
        variant="h4"
        component="h4"
        className="font-bold text-upper mt-6 mb-3"
        sx={{
          fontSize: "19px",
          textTransform: "uppercase"
        }}
      >
        BẢNG XÁC ĐỊNH NHU CẦU CẤP TÍNH DỤNG 1
      </Typography>
      <TableSticky className="mscb-table mscb-table-border" sx={SxTable}>
        <TableHead>
          <TableRow>
            <TableCell rowSpan={2} className="text-center" width={60}>
              STT
            </TableCell>
            <TableCell rowSpan={2} className="text-center" width={600}>
              Nội dung
            </TableCell>
            <TableCell colSpan={2} className="text-center">
              Đơn vị kinh doanh
              <span className="font-normal"> (VNĐ)</span>
            </TableCell>
            <TableCell colSpan={2} className="text-center">
              NV TÁI THẨM ĐỊNH (VND)
              <span className="font-normal"> (VNĐ)</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center" width={198}>
              Kỳ T
            </TableCell>
            <TableCell className="text-center" width={198}>
              Kỳ T+1
            </TableCell>
            <TableCell className="text-center" width={198}>
              Kỳ T<span className="text-danger"> (*)</span>
            </TableCell>
            <TableCell className="text-center" width={198}>
              Kỳ T+1<span className="text-danger"> (*)</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className="mscb-table-row-title" sx={SxHeaderRow}>
            <TableCell align="center" className="">
              A
            </TableCell>
            <TableCell colSpan={5} className="">
              HIỆU QUẢ PHƯƠNG ÁN
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">1</TableCell>
            <TableCell align="left" className="font-medium">Doanh thu (1)</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.plan_effect?.turn_over.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.plan_effect?.turn_over.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                comma
                integer
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeDataTurnOver(+val, 'evaluation_staff_t', 'turn_over') }}
                value={dataOption1Table?.plan_effect?.turn_over.evaluation_staff_t?.toString()}
                message={getMessage('evaluation_staff_t', { group: 'turn_over' })}
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                comma
                integer
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeDataTurnOver(+val, 'evaluation_staff_t1', 'turn_over') }}
                value={dataOption1Table?.plan_effect?.turn_over.evaluation_staff_t1?.toString()}
                message={getMessage('evaluation_staff_t1', { group: 'turn_over' })}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">2</TableCell>
            <TableCell align="left" className="font-medium">Tổng chi phí (2)</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.plan_effect?.total_cost.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.plan_effect?.total_cost.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                comma
                integer
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeDataTotalCost(+val, 'evaluation_staff_t') }}
                value={dataOption1Table?.plan_effect?.total_cost.evaluation_staff_t?.toString()}
                message={getMessage('evaluation_staff_t', { group: 'total_cost' })}


              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                comma
                integer
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeDataTotalCost(+val, 'evaluation_staff_t1') }}
                value={dataOption1Table?.plan_effect?.total_cost.evaluation_staff_t1?.toString()}
                message={getMessage('evaluation_staff_t1', { group: 'total_cost' })}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">3</TableCell>
            <TableCell align="left" className="font-medium">Lợi nhuận (3) = (1) - (2)</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.plan_effect?.profit.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.plan_effect?.profit.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber(dataOption1Table?.plan_effect?.profit?.evaluation_staff_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber(dataOption1Table?.plan_effect?.profit?.evaluation_staff_t1?.toString()) ?? ""}</TableCell>
          </TableRow>
          <TableRow className="mscb-table-row-title" sx={SxHeaderRow}>
            <TableCell align="center" className="">
              B
            </TableCell>
            <TableCell colSpan={5} className="">
              XÁC ĐỊNH HẠN MỨC VAY
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">4</TableCell>
            <TableCell align="left" className="font-medium">Vòng quay vốn lưu động (4)</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.loan_limit?.working_capital?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.loan_limit?.working_capital?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanLimitTotalCostData(+val, 'evaluation_staff_t', 'working_capital') }}
                value={dataOption1Table?.loan_limit?.working_capital?.evaluation_staff_t?.toString()}
                message={getMessage('evaluation_staff_t', { group: 'working_capital' })}
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanLimitTotalCostData(+val, 'evaluation_staff_t1', 'working_capital') }}
                value={dataOption1Table?.loan_limit?.working_capital?.evaluation_staff_t1?.toString()}
                message={getMessage('evaluation_staff_t1', { group: 'working_capital' })}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">5</TableCell>
            <TableCell align="left" className="font-medium">Nhu cầu vốn trên mỗi vòng quay VLĐ (5) = (2)/(4)</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.loan_limit?.capital_needs?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.loan_limit?.capital_needs?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber(dataOption1Table?.loan_limit?.capital_needs?.evaluation_staff_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber(dataOption1Table?.loan_limit?.capital_needs?.evaluation_staff_t1?.toString()) ?? ""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">6</TableCell>
            <TableCell align="left" className="font-medium">Vốn lưu động tự có (6)</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.loan_limit?.own_working_capital?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.loan_limit?.own_working_capital?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                comma
                integer
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanLimitTotalCostData(+val, 'evaluation_staff_t', 'own_working_capital') }}
                value={dataOption1Table?.loan_limit?.own_working_capital?.evaluation_staff_t?.toString() ?? ""}
                message={getMessage('evaluation_staff_t', { group: 'own_working_capital' })}
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                comma
                integer
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanLimitTotalCostData(+val, 'evaluation_staff_t1', 'own_working_capital') }}
                value={dataOption1Table?.loan_limit?.own_working_capital?.evaluation_staff_t1?.toString() ?? ""}
                message={getMessage('evaluation_staff_t1', { group: 'own_working_capital' })}

              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">7</TableCell>
            <TableCell align="left" className="font-medium">Phải trả người bán vay mượn khác (7)</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.loan_limit?.payable_to_other_sellers?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.loan_limit?.payable_to_other_sellers?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                comma
                integer
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanLimitTotalCostData(+val, 'evaluation_staff_t', 'payable_to_other_sellers') }}
                value={dataOption1Table?.loan_limit?.payable_to_other_sellers?.evaluation_staff_t?.toString() ?? ""}
                message={getMessage('evaluation_staff_t', { group: 'payable_to_other_sellers' })}
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                comma
                integer
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanLimitTotalCostData(+val, 'evaluation_staff_t1', 'payable_to_other_sellers') }}
                value={dataOption1Table?.loan_limit?.payable_to_other_sellers?.evaluation_staff_t1?.toString() ?? ""}
                message={getMessage('evaluation_staff_t1', { group: 'payable_to_other_sellers' })}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className=""> 8 </TableCell>
            <TableCell align="left" className="font-medium">Vay tổ chức tín dụng khác (8)</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.loan_limit?.other_credit_institutions?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.loan_limit?.other_credit_institutions?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                comma
                integer
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanLimitTotalCostData(+val, 'evaluation_staff_t', 'other_credit_institutions') }}
                value={dataOption1Table?.loan_limit?.other_credit_institutions?.evaluation_staff_t?.toString() ?? ""}
                message={getMessage('evaluation_staff_t', { group: 'other_credit_institutions' })}
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                comma
                integer
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanLimitTotalCostData(+val, 'evaluation_staff_t1', 'other_credit_institutions') }}
                value={dataOption1Table?.loan_limit?.other_credit_institutions?.evaluation_staff_t1?.toString() ?? ""}
                message={getMessage('evaluation_staff_t1', { group: 'other_credit_institutions' })}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className=""> 9 </TableCell>
            <TableCell align="left" className="font-medium">Nhu cầu vay tại SCB (9) = (5) - (6) - (7) - (8)</TableCell>
            <TableCell align="right">
              {formatNumber(dataOption1Table?.loan_limit?.loan_demand_at_scb?.business_unit_period_t?.toString()) ?? ""}
            </TableCell>
            <TableCell align="right">
              {formatNumber(dataOption1Table?.loan_limit?.loan_demand_at_scb?.business_unit_period_t1?.toString()) ?? ""}
              {getMessage('business_unit_period_t1', { group: 'loan_demand_at_scb' }) && <p className="my-0 text-danger text-12 font-normal">{getMessage('business_unit_period_t1', { group: 'loan_demand_at_scb' })}</p>}
            </TableCell>
            <TableCell align="right" className="text-danger pr-7">
              {formatNumber(dataOption1Table?.loan_limit?.loan_demand_at_scb?.evaluation_staff_t?.toString()) ?? ""}
              {getMessage('evaluation_staff_t', { group: 'loan_demand_at_scb' }) ? <p className="my-0 text-danger text-12 font-normal">{getMessage('evaluation_staff_t', { group: 'loan_demand_at_scb' })}</p> : null}
            </TableCell>
            <TableCell align="right" className="text-danger pr-7">
              {formatNumber(dataOption1Table?.loan_limit?.loan_demand_at_scb?.evaluation_staff_t1?.toString()) ?? ""}
              {getMessage('evaluation_staff_t1', { group: 'loan_demand_at_scb' }) ? <p className="my-0 text-danger text-12 font-normal">{getMessage('evaluation_staff_t1', { group: 'loan_demand_at_scb' })}</p> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className=""> 10 </TableCell>
            <TableCell align="left" className="font-medium">Tỉ lệ % SCB tài trợ (10) = (9)/(5)</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.loan_limit?.scb_sponsor_ratio?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption1Table?.loan_limit?.scb_sponsor_ratio?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber(dataOption1Table?.loan_limit?.scb_sponsor_ratio?.evaluation_staff_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber(dataOption1Table?.loan_limit?.scb_sponsor_ratio?.evaluation_staff_t1?.toString()) ?? ""}</TableCell>
          </TableRow>
        </TableBody>
      </TableSticky>
      <div style={{ position: "relative" }} className="mt-6">
        {dataOption1Table?.note?.content && dataOption1Table?.note?.updated_by && <span style={{ position: "absolute", right: 10 }}>
          <i style={{ fontSize: "12px", color: "#707070" }}>Cập nhật : </i>
          <i style={{ fontSize: "12px", color: "#1825aa" }}>
            {`${dataOption1Table?.note?.updated_by ?? '-'} - ${dataOption1Table?.note?.updated_at ? timestampToDate(dataOption1Table?.note?.updated_at ?? 0, "HH:mm - DD/MM/YYYY") : '-'}`}
          </i>
        </span>}
        <TextArea
          label="1. Ghi chú"
          placeholder="Nhập nội dung"
          value={dataOption1Table?.note?.content}
          disabled={ruleDisabled}
          onDebounce={(val) => { onChangeNote(val) }}
          sx={{
            "& textarea": {
              height: "100px !important",
              overflowY: "scroll!important ",
              overflowX: "hidden!important",
              marginBottom: "23px!important",
              border: 'none',
              backgroundColor: '#f2f3f9',
              resize: 'none',
              outline: 0,
              padding: '8px 12px',
              fontSize: 'var(--mscb-fontsize)',
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              // fontStyle: 'italic'
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
            }
          }}
        />
      </div>
    </Box>
  );
};

export default TableCredit1;
