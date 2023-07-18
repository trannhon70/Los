import { TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import useApprovalLOANMessage from "app/hooks/useApprovalLOANMessage";
import { onchaneLOANNote, onChangeLoanCaptitalTurnOverEffect, onChangeLoanCaptitalTurnOverLimit, onChangeLoanLimitTotalCost } from "features/loan/normal/storageApproval/loan/action";
import { getApprovalLOANCapitalNeedOption } from "features/loan/normal/storageApproval/loan/selectors";
import { getLOANApprovalUserFullName } from "features/loan/normal/storageApproval/selectors";
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ILOANLimit, IPlanEffectOptionFull, IPlanEffectTotalCost, ITurnOver } from "types/models/loan/normal/storageApproval/LoanInfoForm";
import { formatNumber } from "utils";
import { timestampToDate } from "utils/date";
import Numberbox from "views/components/base/Numberbox";
import TextArea from "views/components/base/TextArea";
import TableSticky from "views/components/layout/TableSticky";
import { SxHeaderRow, SxTable } from "./style";
const TableCredit2: FC = () => {
  const dispatch = useDispatch();
  const getMessage = useApprovalLOANMessage();
  const ruleDisabled = useSelector(getRuleDisbledReappraise)

  const dataOption2Table = useSelector(getApprovalLOANCapitalNeedOption)
  const fullname = useSelector(getLOANApprovalUserFullName)

  const onChangeDataTurnOver = (value: string | number | null, key: keyof ITurnOver, keyOptions: keyof Omit<IPlanEffectOptionFull, "total_cost">) => {
    dispatch(onChangeLoanCaptitalTurnOverEffect(value, { key: key, keyOptions: keyOptions }))
  }

  const onChangeLoanLimitTotalCostData = (value: string | number | null, key: keyof ITurnOver, keyOptions: keyof ILOANLimit) => {
    dispatch(onChangeLoanLimitTotalCost(value, { key: key, keyOptions: keyOptions }))
  }

  const onChangeLoanTotalCostData = (value: string | number | null, key: keyof ITurnOver, keyOptions: keyof Omit<IPlanEffectTotalCost, 'business_unit_period_t' | 'business_unit_period_t1' | 'evaluation_staff_t' | 'evaluation_staff_t1'>) => {
    dispatch(onChangeLoanCaptitalTurnOverLimit(value, { key: key, keyOptions: keyOptions }))
  }

  const onChangeNote = (value: string) =>{
    dispatch(onchaneLOANNote(value, {username: fullname}))
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
        BẢNG XÁC ĐỊNH NHU CẦU CẤP TÍNH DỤNG 2
      </Typography>
      <TableSticky className="mscb-table mscb-table-border" sx={SxTable}>
        <TableHead>
          <TableRow>
            <TableCell rowSpan={2} className="text-center" width={60}>
              STT
            </TableCell>
            <TableCell rowSpan={2} className="text-center" width={600}>
              CHỈ TIÊU
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
            <TableCell align="right">{formatNumber(dataOption2Table?.plan_effect?.turn_over?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.plan_effect?.turn_over?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeDataTurnOver(+val, 'evaluation_staff_t', 'turn_over') }}
                value={dataOption2Table?.plan_effect?.turn_over?.evaluation_staff_t?.toString()}
                message={getMessage('evaluation_staff_t',{group:'turn_over'})}

              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeDataTurnOver(+val, 'evaluation_staff_t1', 'turn_over') }}
                value={dataOption2Table?.plan_effect?.turn_over?.evaluation_staff_t1?.toString()}
                message={getMessage('evaluation_staff_t1',{group:'turn_over'})}

              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">2</TableCell>
            <TableCell align="left" className="font-medium" >Tổng chi phí (2) = (2.1) + (2.2) + (2.3) + (2.4)</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.plan_effect?.total_cost?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.plan_effect?.total_cost?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber(dataOption2Table?.plan_effect?.total_cost?.evaluation_staff_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber(dataOption2Table?.plan_effect?.total_cost?.evaluation_staff_t1?.toString()) ?? ""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="font-normal">2.1</TableCell>
            <TableCell align="left" className="font-normal">Giá vốn hàng bán (2.1)</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.plan_effect?.total_cost?.price_product?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.plan_effect?.total_cost?.price_product?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanTotalCostData(+val, 'evaluation_staff_t', 'price_product') }}
                value={dataOption2Table?.plan_effect?.total_cost?.price_product?.evaluation_staff_t?.toString()}
                message={getMessage('evaluation_staff_t',{group:'price_product'})}

              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanTotalCostData(+val, 'evaluation_staff_t1', 'price_product') }}
                value={dataOption2Table?.plan_effect?.total_cost?.price_product?.evaluation_staff_t1?.toString()}
                message={getMessage('evaluation_staff_t1',{group:'price_product'})}

              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="font-normal">2.2</TableCell>
            <TableCell align="left" className="font-normal">Chi phí quản lý HĐKD (2.2)</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.plan_effect?.total_cost?.management_cost?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.plan_effect?.total_cost?.management_cost?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-normal">
            <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanTotalCostData(+val, 'evaluation_staff_t', 'management_cost') }}
                value={dataOption2Table?.plan_effect?.total_cost?.management_cost?.evaluation_staff_t?.toString()}
                message={getMessage('evaluation_staff_t',{group:'management_cost'})}

              />
            </TableCell>
            <TableCell align="right" className="text-normal">
            <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanTotalCostData(+val, 'evaluation_staff_t1', 'management_cost') }}
                value={dataOption2Table?.plan_effect?.total_cost?.management_cost?.evaluation_staff_t1?.toString()}
                message={getMessage('evaluation_staff_t1',{group:'management_cost'})}

              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="font-normal">2.3</TableCell>
            <TableCell align="left" className="font-normal">Chi phí lãi vay (2.3)</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.plan_effect?.total_cost?.loan_cost?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.plan_effect?.total_cost?.loan_cost?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanTotalCostData(+val, 'evaluation_staff_t', 'loan_cost') }}
                value={dataOption2Table?.plan_effect?.total_cost?.loan_cost?.evaluation_staff_t?.toString()}
                message={getMessage('evaluation_staff_t',{group:'loan_cost'})}

              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanTotalCostData(+val, 'evaluation_staff_t1', 'loan_cost') }}
                value={dataOption2Table?.plan_effect?.total_cost?.loan_cost?.evaluation_staff_t1?.toString()}
                message={getMessage('evaluation_staff_t1',{group:'loan_cost'})}

              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="font-normal">2.4</TableCell>
            <TableCell align="left" className="font-normal">Chi phí khác (2.4)</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.plan_effect?.total_cost?.other_cost?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.plan_effect?.total_cost?.other_cost?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanTotalCostData(+val, 'evaluation_staff_t', 'other_cost') }}
                value={dataOption2Table?.plan_effect?.total_cost?.other_cost?.evaluation_staff_t?.toString()}
                message={getMessage('evaluation_staff_t',{group:'other_cost'})}

              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanTotalCostData(+val, 'evaluation_staff_t1', 'other_cost') }}
                value={dataOption2Table?.plan_effect?.total_cost?.other_cost?.evaluation_staff_t1?.toString()}
                message={getMessage('evaluation_staff_t1',{group:'other_cost'})}

              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">3</TableCell>
            <TableCell align="left" className="font-medium">Lợi nhuận (3) = (1) - (2)</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.plan_effect?.profit?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.plan_effect?.profit?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber(dataOption2Table?.plan_effect?.profit?.evaluation_staff_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber(dataOption2Table?.plan_effect?.profit?.evaluation_staff_t1?.toString()) ?? ""}</TableCell>

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
            <TableCell align="left" className="font-medium">Tổng nhu cầu vốn (4) = (2)</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.loan_limit?.total_capital_need?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.loan_limit?.total_capital_need?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="pr-7">{formatNumber(dataOption2Table?.loan_limit?.total_capital_need?.evaluation_staff_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="pr-7">{formatNumber(dataOption2Table?.loan_limit?.total_capital_need?.evaluation_staff_t1?.toString()) ?? ""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">5</TableCell>
            <TableCell align="left" className="font-medium">Vốn tự có (5)</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.loan_limit?.equity_capital?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.loan_limit?.equity_capital?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-normal" sx={{
              '& .MuiInputBase-root':{
                color: 'var(--mscb-danger)'
              }
            }}>
              <Numberbox
                integer
                comma
                className="text-danger"
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanLimitTotalCostData(+val, 'evaluation_staff_t', 'equity_capital') }}
                value={dataOption2Table?.loan_limit?.equity_capital?.evaluation_staff_t?.toString()}
                message={getMessage('evaluation_staff_t',{group:'equity_capital'})}

              />
            </TableCell>
            <TableCell align="right" className="text-normal" sx={{
              '& .MuiInputBase-root':{
                color: 'var(--mscb-danger)'
              }
            }}>
              <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanLimitTotalCostData(+val, 'evaluation_staff_t1', 'equity_capital') }}
                value={dataOption2Table?.loan_limit?.equity_capital?.evaluation_staff_t1?.toString()}
                message={getMessage('evaluation_staff_t1',{group:'equity_capital'})}

              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">6</TableCell>
            <TableCell align="left" className="font-medium">Vốn vay tổ chức tín dụng khác hoặc huy động khác (6)</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.loan_limit?.credit_capital?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.loan_limit?.credit_capital?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanLimitTotalCostData(+val, 'evaluation_staff_t', 'credit_capital') }}
                value={dataOption2Table?.loan_limit?.credit_capital?.evaluation_staff_t?.toString()}
                message={getMessage('evaluation_staff_t',{group:'credit_capital'})}

              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanLimitTotalCostData(+val, 'evaluation_staff_t1', 'credit_capital') }}
                value={dataOption2Table?.loan_limit?.credit_capital?.evaluation_staff_t1?.toString()}
                message={getMessage('evaluation_staff_t1',{group:'credit_capital'})}

              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">7</TableCell>
            <TableCell align="left" className="font-medium">Vốn vay SCB (7) = (4) - (5) - (6)</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.loan_limit?.loan_scb?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">
              {formatNumber(dataOption2Table?.loan_limit?.loan_scb?.business_unit_period_t1?.toString()) ?? ""}
              {getMessage('business_unit_period_t1',{group:'loan_scb'}) && <p className="my-0 text-danger text-12 font-normal">{getMessage('business_unit_period_t1',{group:'loan_scb'})}</p>}
              </TableCell>

            <TableCell align="right" className="text-danger pr-7">
              {formatNumber(dataOption2Table?.loan_limit?.loan_scb?.evaluation_staff_t?.toString()) ?? ""}
              {getMessage('evaluation_staff_t',{group:'loan_scb'}) ? <p className="my-0 text-danger text-12 font-normal">{getMessage('evaluation_staff_t',{group:'loan_scb'})}</p> : null}
              </TableCell>
            <TableCell align="right" className="text-danger pr-7">
              {formatNumber(dataOption2Table?.loan_limit?.loan_scb?.evaluation_staff_t1?.toString()) ?? ""}
              {getMessage('evaluation_staff_t1',{group:'loan_scb'}) ? <p className="my-0 text-danger text-12 font-normal">{getMessage('evaluation_staff_t1',{group:'loan_scb'})}</p> : null}
            </TableCell>

            {/* <TableCell align="right" className="text-normal">
              <Input
                type="number"
                format
                isMinus
                value={dataOption2Table?.loan_limit?.loan_scb?.evaluation_staff_t?.toString()}
                // value={loan_scb_t.toString() ?? ""}
                disabled
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Input
                type="number"
                format
                isMinus
                value={dataOption2Table?.loan_limit?.loan_scb?.evaluation_staff_t1?.toString()}
                message={getMessage('evaluation_staff_t1',{group:'loan_scb'})}
                // value={loan_scb_t1.toString() ?? ""}
                disabled
              />
            </TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell align="center" className=""> 8 </TableCell>
            <TableCell align="left" className="font-medium">Tỉ lệ % SCB tài trợ (8) = (7)/(4)</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.loan_limit?.scb_sponsor_ratio?.business_unit_period_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right">{formatNumber(dataOption2Table?.loan_limit?.scb_sponsor_ratio?.business_unit_period_t1?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber(dataOption2Table?.loan_limit?.scb_sponsor_ratio?.evaluation_staff_t?.toString()) ?? ""}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber(dataOption2Table?.loan_limit?.scb_sponsor_ratio?.evaluation_staff_t1?.toString()) ?? ""}</TableCell>
            
          </TableRow>

        </TableBody>
      </TableSticky>
      <div style={{ position: "relative" }} className="mt-6">
        {dataOption2Table?.note?.content && dataOption2Table?.note?.updated_by && <span style={{ position: "absolute", right: 10 }}>
          <i style={{ fontSize: "12px", color: "#707070" }}>Cập nhật : </i>
          <i style={{ fontSize: "12px", color: "#1825aa" }}>
          {`${dataOption2Table?.note?.updated_by ?? ''} - ${dataOption2Table?.note?.updated_at ? timestampToDate(dataOption2Table?.note?.updated_at ?? 0, "HH:mm - DD/MM/YYYY"): ''}`}
          </i>
        </span>}
        <TextArea
          label="1. Ghi chú"
          placeholder="Nhập nội dung"
          onDebounce={(val) =>{onChangeNote(val)}}
          disabled={ruleDisabled}
          value={dataOption2Table?.note?.content}
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

export default TableCredit2;
