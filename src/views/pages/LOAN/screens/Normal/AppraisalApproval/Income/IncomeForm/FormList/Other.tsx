import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useNormalIncomeApprovalMessage from "app/hooks/useNormalIncomeApprovalMessage";
import { getCodeDocumentTypeChildListIncome } from "features/loan/normal/configs/document-type/selectors";
import {
  setIncomeSourceApprovalActive,
  setIncomeSourceApprovalOtherActive,
  setIncomeSourceApprovalOtherChangeFREQ,
  setIncomeSourceApprovalOtherData,
  setIncomeSourceApprovalOtherDataTotal,
  setTotalIncomeNVTTD
} from "features/loan/normal/storageApproval/income/action";
import {
  getLOANNormalStorageIncomeSourceList,
  getLOANNormalStorageIncomeSourceListOtherActive
} from "features/loan/normal/storageApproval/income/selector";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import {
  Document, ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary,
  ILOANNormalStorageIncomeOther
} from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import { formatNumber, pathKeyStore } from "utils";
import { timestampToDate } from "utils/date";
import Input from "views/components/base/Input";
import Label from "views/components/base/Label";
import TextArea from "views/components/base/TextArea";
import GroupListBase, { IGroupListBase } from "views/components/layout/GroupListBase";
import TitleSquare from "views/components/layout/TitleSquare";
import SelectFrequence from "views/components/widgets/SelectFrequence";
import SelectMethodOfReceivingSalary from "views/components/widgets/SelectMethodOfReceivingSalary";
import { urlToDeclare, urlToIncomeSource } from "views/pages/LOAN/utils";
import IncomeAttachment from "../Attachment";
import { SxInputDisabled, SxInputRedDisabled, SxSelectDisabled } from '../style';
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';


const IncomeFormOther: FC = () => { 

  const params = useParams() as ILOANURLParams;
  const incomeTypeURL = params['*'];
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const getMessage = useNormalIncomeApprovalMessage();
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeOther = useSelector(getLOANNormalStorageIncomeSourceListOtherActive(declareType, params.uuid ?? '', data?.other?.activeOther ?? ''));

  
  const ChildListIncome = useSelector(getCodeDocumentTypeChildListIncome(pathKeyStore({document_group_type: "NGUON_THU", type_loan: "Loan"}), "other"))
  const [onBlurError, setOnBlurError] = useState('');
  const ruleDisabled = useSelector(getRuleDisbledReappraise)

  useEffect(()=>{
    dispatch(setIncomeSourceApprovalActive('other', { declare: declareType as keyof ILOANNormalStorageIncomeDeclare }));
  },[]);

  const optionsData: IGroupListBase[] = data?.other.data.map((__, i) => ({
    value: i + 1,
    label: `Nguồn thu ${i + 1}`,
    key: i + 1,
  })) ?? [];

  const optionsDataPos = (data?.other.data?.findIndex(d => d.uuid === activeOther?.uuid) ?? 0) + 1;

  const onSelectGroupList = (value: IGroupListBase) => {
      const current = +value.key - 1;
      const currentActive = data?.other.data[current].uuid ?? ''
      dispatch(setIncomeSourceApprovalOtherActive(currentActive, { declare: declareType }))
  }

 
  const onChangeDataOther = (value: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomeOther) => {
    dispatch(setIncomeSourceApprovalOtherData(value, { declare: declareType, key }));
  }

  const onChangeDataTotal = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Thu nhập thực nhận bình quân (VND) phải lớn hơn 0'): setOnBlurError('');
    dispatch(setIncomeSourceApprovalOtherDataTotal(+value, { declare: declareType }));
  }

  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceApprovalOtherChangeFREQ(value, { declare: declareType }));
  }


  const calculateFrequencyType = (type: string | undefined) => {
    let cal = '';
    switch (type) {
      case 'FREQ':
        cal = ((activeOther?.profit ?? 0) * 1).toString();
        break;
      case 'INFREQ':
        cal = ((activeOther?.profit ?? 0) * 0.3).toString();
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
            label="1. Tổng thu nhập từ nguồn lương (VND)"
            disabled
            sx={SxInputRedDisabled}
            value={formatNumber(data?.other.total_income_from_other_sources?.toString() ?? '0')}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="2. Tổng thu nhập thường xuyên (VND)"
            disabled
            sx={SxInputRedDisabled}
            value={formatNumber(data?.other.permanent_income_amount?.toString() ?? '0')}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="3. Tổng thu nhập không thường xuyên (VND)"
            disabled
            sx={SxInputRedDisabled}
            value={formatNumber(data?.other.occasional_income_amount?.toString() ?? '0')}
          />
        </Grid>
      </Grid>
      <Label bold className="mt-4 mb-3">4. Chọn nguồn thu</Label>
      <Grid container spacing={3}>
        <Grid item className="mscb-group-list-col" xl={2} lg={2} md={2} sm={2} xs={2}>
          <GroupListBase
            labelAdd='Hộ kinh doanh'
            isAdd={true}
            options={optionsData}
            // activeId={optionsDataPos}
            activeId={optionsDataPos ? optionsDataPos : 1}
            onSelected={onSelectGroupList}
            
          />
          
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={10} xs={10}>
          <TitleSquare>Thông tin nguồn thu khác</TitleSquare>
          <Box className="mt-3">
            <Grid container spacing={3}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
              required
                label="1. Số lần nhận thu nhập theo năm"
                type="number"
                disabled={ruleDisabled}
                onDebounce={(val) => onChangeDataOther(Number(val), 'frequencyYear')}
                value={activeOther?.frequencyYear?.toString()}
                message={getMessage(declareType, incomeType, 'frequencyYear', {position: activeOther?.uuid ?? ""})}
              />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectMethodOfReceivingSalary
                  required
                  disabled={ruleDisabled}
                  label="2. Phương thức nhận thu nhập"
                  onChange={(val) => onChangeDataOther(val, 'paymentMethod')}
                  value={activeOther?.paymentMethod}
                  message={getMessage(declareType, incomeType, 'receivedMethod', {position: activeOther?.uuid ?? ""})}
                  sx={SxSelectDisabled}
              />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                required
                  label="3. Thu nhập thực nhận bình quân (VND)"
                  type="number"
                  format
                  disabled={ruleDisabled}
                  onDebounce={onChangeDataTotal}
                  value={(activeOther?.profit ?? '').toString()}
                  message={getMessage(declareType, incomeType, 'profit', {position: activeOther?.uuid ?? ""}) || onBlurError}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                 <Input
                 required
                 disabled={ruleDisabled}
                    label="4.  Mô tả nguồn thu nhập"
                    onDebounce={(val) => onChangeDataOther(val, 'note')}
                    value={activeOther?.note}
                    message={getMessage(declareType, incomeType, 'note', {position: activeOther?.uuid ?? ""})}
                  />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectFrequence
                required
                disabled={ruleDisabled}
                  label="5. Tần suất thu nhập"
                  onChange={onChangeFreq}
                  value={activeOther?.frequency}
                  message={getMessage(declareType, incomeType, 'frequency', {position: activeOther?.uuid ?? ""})}
                  sx={SxSelectDisabled}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input 
                  disabled 
                  required
                  label="6. Tỉ lệ nguồn thu nhập (%)"
                  value={activeOther?.frequency === 'FREQ' ? '100' :
                  activeOther?.frequency === 'INFREQ' ? '30' : ''}
                  sx={SxInputDisabled}
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
                  disabled
                  required
                  label="7. Thu nhập khác (VND)"
                  type="number"
                  sx={SxInputRedDisabled}
                  format
                  value={activeOther?.frequency ? calculateFrequencyType(activeOther?.frequency) : '0'}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="8. Thu nhập theo đánh giá của NVTTĐ"
                  type="number"
                  format
                  disabled={ruleDisabled}
                  value={(activeOther?.income_according_to_staff_rating ?? '').toString()}
                  // onDebounce={(val) => onChangeDataOther(Number(val), 'income_according_to_staff_rating')}
                  onDebounce={onChangeTotalInComeNVTTD}

                />
              </Grid>
              <Grid item xl={12}lg={12} md={12} sm={12} xs={12}
                style={{ position: "relative" }}
              >
                {
                  activeOther?.update_at && <span
                  style={{
                    position: "absolute",
                    right: 5,
                  }}
                >
                  <i style={{ fontSize: "12px", color: "#707070" }}>
                    {`Cập nhật: `}
                  </i>
                  <i style={{ fontSize: "12px", color: "#1825aa" }}>
                    {`${activeOther.full_name} - ${timestampToDate(activeOther.update_at, "HH:mm - DD/MM/YYYY") }`}
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
                  value={(activeOther?.description  )?.toString()}
                  onDebounce={(val) => onChangeDataOther(val, 'description')}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <IncomeAttachment isTitle={true} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default IncomeFormOther;
