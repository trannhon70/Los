import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useNormalIncomeApprovalMessage from "app/hooks/useNormalIncomeApprovalMessage";
import useNotify from "app/hooks/useNotify";
import { getCodeDocumentTypeChildListIncome } from "features/loan/normal/configs/document-type/selectors";
import { setIncomeSourceApprovalOtherActive, setIncomeSourceApprovalStockActive, setIncomeSourceApprovalStockChangeFREQ, setIncomeSourceApprovalStockData, setIncomeSourceApprovalStockDataTotal, setTotalIncomeNVTTD } from "features/loan/normal/storageApproval/income/action";
import { getLOANNormalStorageIncomeSourceList, getLOANNormalStorageIncomeSourceListStockActive } from "features/loan/normal/storageApproval/income/selector";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { Document, ILOANNormalStorageIncomeDeclare, ILOANNormalStorageIncomeDeclareSalary, ILOANNormalStorageIncomeStock } from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import { formatNumber, pathKeyStore } from "utils";
import { timestampToDate } from "utils/date";
import Input from "views/components/base/Input";
import Label from "views/components/base/Label";
import TextArea from "views/components/base/TextArea";
import GroupListBase, { IGroupListBase } from "views/components/layout/GroupListBase";
import ModalConfirm from "views/components/layout/ModalConfirm";
import TitleSquare from "views/components/layout/TitleSquare";
import SelectFrequence from "views/components/widgets/SelectFrequence";
import { urlToDeclare, urlToIncomeSource } from "views/pages/LOAN/utils";
import IncomeAttachment from "../Attachment";
import { SxInputDisabled, SxInputRedDisabled, SxSelectDisabled } from "../style";
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
const IncomeFormStock: FC = () => {
  const params = useParams() as ILOANURLParams;
  const incomeTypeURL = params['*'];
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const notify = useNotify();
  // const getMessage = useNormalIncomeMessage();
  const getMessage = useNormalIncomeApprovalMessage();
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeStock = useSelector(getLOANNormalStorageIncomeSourceListStockActive(declareType, params.uuid ?? '', data?.stock?.activeStock ?? ''));
  const disabled = !activeStock?.uuid;
  const ChildListIncome = useSelector(getCodeDocumentTypeChildListIncome(pathKeyStore({document_group_type: "NGUON_THU", type_loan: "Loan"}), "stock"))
  const [onBlurError, setOnBlurError] = useState('');
  const [ deleteIdStock, setDeleteIdStock ] = useState<ILOANNormalStorageIncomeStock | null>(null);
  const [yearRecieveStock, setYearRecieveStock] = useState('');
  const [numberRecieveStock, setNumberRecieveStock] = useState('');
  const ruleDisabled = useSelector(getRuleDisbledReappraise)

  useEffect(()=>{
    dispatch(setIncomeSourceApprovalOtherActive('stock', { declare: declareType as keyof ILOANNormalStorageIncomeDeclare }));
  },[]);

  const optionsData: IGroupListBase[] = data?.stock.data.map((__, i) => ({
    value: i + 1,
    label: `Cổ tức lợi nhuận ${i + 1}`,
    key: i + 1,
  })) ?? [];

  const optionsDataPos = (data?.stock.data?.findIndex(d => d.uuid === activeStock?.uuid) ?? 0) + 1;

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = data?.stock.data[current].uuid ?? ''
    dispatch(setIncomeSourceApprovalStockActive(currentActive, { declare: declareType }))
  }

  const onChangeDataStock = (value: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomeStock) => {
    dispatch(setIncomeSourceApprovalStockData(value, { declare: declareType, key }));
  }

  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceApprovalStockChangeFREQ(value, { declare: declareType }));
  }

  const onChangeDataTotal = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Thu nhập bình quân theo tháng (VND) phải lớn hơn 0'): setOnBlurError('');
    dispatch(setIncomeSourceApprovalStockDataTotal(+value, { declare: declareType }))
  }

  const calculateFrequencyType = (type: string | undefined) => {
    let cal = '';
    switch (type) {
      case 'FREQ':
        cal = ((activeStock?.profit ?? 0) * 1).toString();
        break;
      case 'INFREQ':
        cal = ((activeStock?.profit ?? 0) * 0.3).toString();
        break;
    
      default:
        break;
    }
    return cal;
  }

  const onChangeTotalInComeNVTTD = (value: string) =>{
    dispatch(setTotalIncomeNVTTD(+value, { declare: declareType }));
  }

  return (
    <Box>
      <Grid container spacing={3} sx={{
          '& .Mui-disabled input': { 
            color: 'var(--mscb-danger)!important', 
            WebkitTextFillColor: 'var(--mscb-danger)!important',
            fontWeight: 'bold' 
          }
        }}>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="1. Tổng thu nhập từ cổ tức/ lợi nhuận (VND)"
            disabled
            sx={SxInputRedDisabled}
            value={formatNumber(data?.stock.total_income_from_stocks?.toString() ?? '')}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="2. Tổng thu nhập thường xuyên (VND)"
            disabled
            sx={SxInputRedDisabled}
            value={formatNumber(data?.stock.permanent_income_amount?.toString() ?? '')}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="3. Tổng thu nhập không thường xuyên (VND)"
            disabled
            sx={SxInputRedDisabled}
            value={formatNumber(data?.stock.occasional_income_amount?.toString() ?? '')}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-3">
        <Grid
          item
          className="mscb-group-list-col"
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={2}
        >
          <Label bold className="mb-3">
            4. Chọn Cổ tức/ Lợi nhuận
          </Label>
          <GroupListBase
            isAdd={true}
            options={optionsData}
            activeId={optionsDataPos}
            onSelected={onSelectGroupList}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={8} sm={10} xs={10}>
          <TitleSquare>Thông tin cổ tức/ lợi nhuận</TitleSquare>
          <Box className="mt-3">
            <Grid container spacing={3}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                required
                type="number"
                label="1. Số năm nhận thu nhập từ cổ tức/lợi nhuận"
                onDebounce={(val) => onChangeDataStock(val, 'year')}
                value={activeStock?.year?.toString()}
                disabled={ruleDisabled}
                message={getMessage(declareType, incomeType, 'year', {position: activeStock?.uuid ?? ""})}

                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input 
                required
                label="2. Số lần nhận thu nhập cổ tức/lợi nhuận trong năm"
                type='number'
                onDebounce={(val) => onChangeDataStock(val, 'count')}
                value={activeStock?.count?.toString()}
                disabled={ruleDisabled}
                message={getMessage(declareType, incomeType, 'count', {position: activeStock?.uuid ?? ""})}

                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input 
                  label="3. Mô tả nguồn"
                  disabled={ruleDisabled}
                  value={(activeStock?.description_source ?? 0).toString()}
                  onDebounce={(val) => onChangeDataStock(val, 'description_source')}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectFrequence
                required
                  disabled={disabled || ruleDisabled}
                  label="4. Tần suất thu nhập"
                  onChange={onChangeFreq}
                  value={activeStock?.frequency}
                  sx={SxSelectDisabled}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                required
                  disabled
                  label="5. Tỉ lệ nguồn thu nhập (%)"
                  type="number"
                  format
                  value={activeStock?.frequency === 'FREQ' ? '100' : activeStock?.frequency === 'INFREQ' ? '30' : ''}
                  sx={SxInputDisabled}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input 
                required
                  label="6. Thu nhập bình quân theo tháng (VND)" 
                  type="number"
                  format
                  disabled={ruleDisabled}
                  onDebounce={onChangeDataTotal}
                  value={(activeStock?.profit ?? '').toString()}
                  message={getMessage(declareType, incomeType, 'profit', {position: activeStock?.uuid ?? ""})}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{
                  '& .Mui-disabled input': { 
                    color: 'var(--mscb-danger)!important', 
                    WebkitTextFillColor: 'var(--mscb-danger)!important',
                    fontWeight: 'bold' 
                  }
                }}>
                <Input
                required
                  type="number"
                  format
                  disabled
                  sx={SxInputRedDisabled}
                  label="7. Thu nhập từ cổ tức/lợi nhuận (VND)"
                  value={activeStock?.frequency ? calculateFrequencyType(activeStock?.frequency) : '0'}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  type="number"
                  label="8. Thu nhập theo đánh giá của NVTTĐ"
                  format
                  disabled={ruleDisabled}
                  value={(activeStock?.income_according_to_staff_rating ?? 0).toString()}
                  // onDebounce={(val) => onChangeDataStock(Number(val), 'income_according_to_staff_rating')}
                  onDebounce={onChangeTotalInComeNVTTD}
                />
              </Grid>
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{ position: "relative" }}
              >
               {
                activeStock?.update_at && <span
                style={{
                  position: "absolute",
                  right: 5,
                }}
              >
                <i style={{ fontSize: "12px", color: "#707070" }}>
                  {`Cập nhật: `}
                </i>
                <i style={{ fontSize: "12px", color: "#1825aa" }}>
                  {`${activeStock.full_name} - ${timestampToDate(activeStock.update_at, "HH:mm - DD/MM/YYYY") }`}
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
                      marginBottom: "23px!important",
                      backgroundColor: "#f2f3f9",
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
                  label="9. Ghi chú"
                  placeholder="Ghi chú khác"
                  value={(activeStock?.description ?? 0).toString()}
                  onDebounce={(val) => onChangeDataStock(val, 'description')}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <IncomeAttachment isTitle={true} />
        </Grid>
      </Grid>

      <ModalConfirm>
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa cổ tức lợi nhuận ?
        </Box>
      </ModalConfirm>
    </Box>
  );
};

export default IncomeFormStock;
