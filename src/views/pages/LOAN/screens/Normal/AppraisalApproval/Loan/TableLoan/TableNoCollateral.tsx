import { TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import useApprovalLOANMessage from "app/hooks/useApprovalLOANMessage";
import { onchaneLOANNote, onChangeLoanLimitTotalCostOption3 } from "features/loan/normal/storageApproval/loan/action";
import { getApprovalLOANCapitalNeedOption } from "features/loan/normal/storageApproval/loan/selectors";
import { getLOANApprovalUserFullName } from "features/loan/normal/storageApproval/selectors";
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IApprovalLOANCapitalNeedFull, ITurnOverOption3 } from "types/models/loan/normal/storageApproval/LoanInfoForm";
import { formatNumber, formatRoundNumber } from "utils";
import { timestampToDate } from "utils/date";
import Numberbox from "views/components/base/Numberbox";
import TextArea from "views/components/base/TextArea";
import TableSticky from "views/components/layout/TableSticky";
import { SxHeaderRow, SxTable } from "./style";
const TableNoCollateral: FC = () => {

  const dispatch = useDispatch();
  const getMessage = useApprovalLOANMessage();
  const fullname = useSelector(getLOANApprovalUserFullName)
  const ruleDisabled = useSelector(getRuleDisbledReappraise)

  const dataOption3Table = useSelector(getApprovalLOANCapitalNeedOption)

  const onChangeLoanTotalCostData = (value: string | number | null, key: keyof ITurnOverOption3,
    keyOptions: keyof Omit<IApprovalLOANCapitalNeedFull, 'sequence_uuid' | 'plan_effect' | 'loan_limit' | 'document_groups' | 'note' | 'document_info_list'>) => {
    dispatch(onChangeLoanLimitTotalCostOption3(value, { key: key, keyOptions: keyOptions }))
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
        BẢNG XÁC ĐỊNH NHU CẦU CẤP TÍNH DỤNG 3
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
            <TableCell className="text-center">
              Đơn vị kinh doanh
              <span className="font-normal"> (VNĐ)</span>
            </TableCell>
            <TableCell className="text-center">
              NV TÁI THẨM ĐỊNH
              <span className="font-normal"> (VNĐ)</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className="mscb-table-row-title" sx={SxHeaderRow}>
            <TableCell align="center" className="">
              A
            </TableCell>
            <TableCell colSpan={3} className="">
              THÔNG TIN KHOẢN VAY
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">1</TableCell>
            <TableCell align="left" className="font-medium">Tổng nhu cầu vốn (1)</TableCell>
            <TableCell align="right">
              {formatNumber(dataOption3Table?.total_capital_need?.business_unit?.toString()) ?? ""}
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanTotalCostData(+val, 'evaluation_staff', 'total_capital_need') }}
                value={dataOption3Table?.total_capital_need?.evaluation_staff?.toString() ?? ""}
                message={getMessage('evaluation_staff_t', { group: 'total_capital_need' })}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">2</TableCell>
            <TableCell align="left" className="font-medium">Vốn tự có (2)</TableCell>

            <TableCell align="right">
              {formatNumber(dataOption3Table?.equity_capital?.business_unit?.toString()) ?? ""}
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => { onChangeLoanTotalCostData(+val, 'evaluation_staff', 'equity_capital') }}
                value={dataOption3Table?.equity_capital?.evaluation_staff?.toString() ?? ""}
                message={getMessage('evaluation_staff_t', { group: 'equity_capital' })}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">3</TableCell>
            <TableCell align="left" className="font-medium">Nhu cầu vay vốn tại SCB (3) = (1) - (2)</TableCell>
            <TableCell align="right">
              {formatNumber(dataOption3Table?.loan_need_scb?.business_unit?.toString()) ?? ""}
              {getMessage('business_unit', { group: 'loan_need_scb' }) ? <p className="my-0 text-danger text-12 font-normal">{getMessage('business_unit', { group: 'loan_need_scb' })}</p> : null}
            </TableCell>
            <TableCell align="right" className="text-danger pr-7">
              {formatNumber(dataOption3Table?.loan_need_scb?.evaluation_staff?.toString()) ?? ""}
              {getMessage('evaluation_staff', { group: 'loan_need_scb' }) ? <p className="my-0 text-danger text-12 font-normal">{getMessage('evaluation_staff', { group: 'loan_need_scb' })}</p> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="">4</TableCell>
            <TableCell align="left" className="font-medium">Tỉ lệ % SCB tài trợ (4) = (3)/(1)</TableCell>
            <TableCell align="right">
              {formatNumber(dataOption3Table?.ratio_scb?.business_unit?.toString()) ?? ""}
            </TableCell>
            <TableCell align="right" className="text-danger pr-7">
              {formatRoundNumber(dataOption3Table?.ratio_scb?.evaluation_staff ?? 0)?.toString() ?? ""}
            </TableCell>

          </TableRow>
        </TableBody>
      </TableSticky>
      <div style={{ position: "relative" }} className="mt-6">
        {dataOption3Table?.note?.content && dataOption3Table?.note?.updated_by && <span style={{ position: "absolute", right: 10 }}>
          <i style={{ fontSize: "12px", color: "#707070" }}>Cập nhật : </i>
          <i style={{ fontSize: "12px", color: "#1825aa" }}>
            {`${dataOption3Table?.note?.updated_by ?? ''} - ${dataOption3Table?.note?.updated_at ? timestampToDate(dataOption3Table?.note?.updated_at ?? 0, "HH:mm - DD/MM/YYYY") : ''}`}
          </i>
        </span>}
        <TextArea
          label="1. Ghi chú"
          placeholder="Nhập nội dung"
          value={dataOption3Table?.note?.content ?? ""}
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

export default TableNoCollateral;
