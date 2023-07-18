import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useNormalIncomeApprovalMessage from 'app/hooks/useNormalIncomeApprovalMessage';
import { setIncomeSourceApprovalActive, setIncomeSourceApprovalDepositActive, setIncomeSourceApprovalDepositChangeFREQ, setIncomeSourceApprovalDepositData, setIncomeSourceApprovalDepositDataTotal, setTotalIncomeNVTTD } from 'features/loan/normal/storageApproval/income/action';
import { getLOANNormalStorageIncomeSourceList, getLOANNormalStorageIncomeSourceListDepositActive } from 'features/loan/normal/storageApproval/income/selector';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { Document, ILOANNormalStorageIncomeDeclare, ILOANNormalStorageIncomeDeclareSalary, ILOANNormalStorageIncomeDeposit } from 'types/models/loan/normal/storageApproval/SourceIncomeForm';
import { formatNumber } from 'utils';
import { timestampToDate } from 'utils/date';
import Input from 'views/components/base/Input';
import Label from 'views/components/base/Label';
import TextArea from 'views/components/base/TextArea';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import TitleSquare from 'views/components/layout/TitleSquare';
import AcceptStatusCheck from 'views/components/widgets/AcceptStatusCheck';
import SelectCurrencyType from 'views/components/widgets/SelectCurrencyType';
import SelectFrequence from 'views/components/widgets/SelectFrequence';
import SelectIssuer from 'views/components/widgets/SelectIssuer';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import IncomeAttachment from '../Attachment';
import { SxInputDisabled, SxInputRedDisabled } from '../style';
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';

const IncomeFormDeposit: FC = () => {
  const params = useParams() as ILOANURLParams;
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const incomeTypeURL = params['*'];
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const dispatch = useDispatch();
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''));
  const activeDeposit = useSelector(getLOANNormalStorageIncomeSourceListDepositActive(declareType, params.uuid ?? '', data?.deposit?.activeDeposit ?? ''));
  const [onBlurError, setOnBlurError] = useState('');
  const getMessage = useNormalIncomeApprovalMessage();
  const ruleDisabled = useSelector(getRuleDisbledReappraise)

  useEffect(()=>{
    dispatch(setIncomeSourceApprovalActive('deposit', { declare: declareType as keyof ILOANNormalStorageIncomeDeclare }));
  },[]);

  const optionsData: IGroupListBase[] = data?.deposit.data.map((__, i) => ({
    value: i + 1,
    label: `Lãi tiền gửi/GTCG ${i + 1}`,
    key: i + 1,
  })) ?? [];

  const optionsDataPos = (data?.deposit.data?.findIndex(d => d.uuid === activeDeposit?.uuid) ?? 0) + 1;

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = data?.deposit.data[current].uuid ?? ''
    dispatch(setIncomeSourceApprovalDepositActive(currentActive, { declare: declareType }))
  }

  const onChangeDataDeposit = (value: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomeDeposit) => {
    dispatch(setIncomeSourceApprovalDepositData(value, { declare: declareType, key }))
  }

  const onChangeDataTotal = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Lãi bình quân theo tháng (VND) phải lớn hơn 0'): setOnBlurError('');
    dispatch(setIncomeSourceApprovalDepositDataTotal(+value, { declare: declareType }));
  }

  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceApprovalDepositChangeFREQ(value, { declare: declareType }));
  }

  const calculateFrequencyType = (type: string | undefined) => {
    let cal = '';
    switch (type) {
      case 'FREQ':
        cal = ((activeDeposit?.profit ?? 0) * 1).toString();
        break;
      case 'INFREQ':
        cal = ((activeDeposit?.profit ?? 0) * 0.3).toString();
        break;
    
      default:
        break;
    }
    return cal;
  }

  const onChangeTotalInComeNVTTD = (value: string) =>{
    dispatch(setTotalIncomeNVTTD(+value, { declare: declareType }));
  }
  return <Box>
    <Grid container spacing={3} sx={{
          '& .Mui-disabled input': { 
            color: 'var(--mscb-danger)!important', 
            WebkitTextFillColor: 'var(--mscb-danger)!important',
            fontWeight: 'bold' 
          }
        }}>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="1. Tổng thu nhập từ Lãi tiền gửi/GTCG (VND)"
          disabled
          sx={SxInputRedDisabled}
          value={formatNumber(data?.deposit.total_income_from_deposits?.toString() ?? '0')}
          
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="2. Tổng thu nhập thường xuyên (VND)"
          disabled
          sx={SxInputRedDisabled}
          value={formatNumber(data?.deposit.permanent_income_amount?.toString() ?? '0')}
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="3. Tổng thu nhập không thường xuyên (VND)"
          disabled
          sx={SxInputRedDisabled}
          value={formatNumber(data?.deposit.occasional_income_amount?.toString() ?? '0')}
        />
      </Grid>
    </Grid>
    <Grid container spacing={3} className='mt-3'>
      <Grid item className="mscb-group-list-col" xl={2} lg={2} md={2} sm={2} xs={2}>
        <Label bold className="mb-3">4. Chọn Lãi tiền gửi/GTCG</Label>
        <GroupListBase
          options={optionsData}
          activeId={optionsDataPos}
          onSelected={onSelectGroupList}
          isAdd={true}
        />
      </Grid>
      <Grid item xl={6} lg={6} md={8} sm={10} xs={10}>
        <TitleSquare>
          Thông tin LÃI TIỀN GỬI/ GTCG
        </TitleSquare>
        <Box className="mt-3">
          <Grid container spacing={3}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <SelectIssuer
              required
              disabled={ruleDisabled}
                label="1. Đơn vị phát hành"
                onChange={(val) => onChangeDataDeposit(val, "publish_unit_id")}
                value={activeDeposit?.publish_unit_id ?? ""}
                message={getMessage(declareType, incomeType, 'publish_unit_id', {position: activeDeposit?.uuid ?? ""})}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
              required
              disabled={ruleDisabled}
                label="2. Số Tài khoản tiền gửi/giấy tờ có giá"
                onDebounce={(val) => onChangeDataDeposit(val, 'account')}
                value={activeDeposit?.account}
                message={getMessage(declareType, incomeType, 'account', {position: activeDeposit?.uuid ?? ""})}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <SelectCurrencyType
              required
              disabled={ruleDisabled}
                label="3. Loại tiền"
                onChange={(val) => onChangeDataDeposit(val, 'currency')}
                value={activeDeposit?.currency}
                message={getMessage(declareType, incomeType, 'currency', {position: activeDeposit?.uuid ?? ""})}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                format
                disabled={ruleDisabled}
                type='number'
                label="4. Số dư tiền gửi/giấy tờ có giá (VND)"
                onDebounce={(val) => onChangeDataDeposit(val, 'balance')}
                value={(activeDeposit?.balance ?? '').toString()}
                message={getMessage(declareType, incomeType, 'balance', {position: activeDeposit?.uuid ?? ""})}

              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
              required
              disabled={ruleDisabled}
                type='number'
                label="5. TG duy trì liên tục số dư TG/GTCG (tháng)"
                onDebounce={(val) => onChangeDataDeposit(Number(val), 'term')}
                value={activeDeposit?.term?.toString()}
                message={getMessage(declareType, incomeType, 'term', {position: activeDeposit?.uuid ?? ""})}

              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
              required
              disabled={ruleDisabled}
                format
                type='number'
                label="6. Lãi bình quân theo tháng (VND)"
                onDebounce={onChangeDataTotal}
                value={(activeDeposit?.profit ?? '').toString()}
                message={getMessage(declareType, incomeType, 'profit', {position: activeDeposit?.uuid ?? ""})}

              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
               <AcceptStatusCheck 
               required
               disabled={ruleDisabled}
                label="7. Đồng ý phong tỏa"
                onChange={(val) => onChangeDataDeposit(val, "accept_blocked_account")}
                value={activeDeposit?.accept_blocked_account?.toString()}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
               <SelectFrequence
               required
               disabled={ruleDisabled}
                label="8. Tần suất thu nhập"
                onChange={onChangeFreq}
                value={activeDeposit?.frequency}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
              required
                disabled
                type='number'
                format
                label="9. Tỉ lệ nguồn thu nhập (%)"
                value={activeDeposit?.frequency === 'FREQ' ? '100' : activeDeposit?.frequency === 'INFREQ' ? '30' : ''}
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
              required
                disabled
                type='number'
                format
                sx={SxInputRedDisabled}
                label="10. Thu nhập từ lãi (VND)"
                value={activeDeposit?.frequency ? calculateFrequencyType(activeDeposit?.frequency) : '0'}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Input
                format
                disabled={ruleDisabled}
                type='number'
                label="11. Thu nhập theo đánh giá của NVTTĐ"
                // onChange={(val) => onChangeDataDeposit(Number(val), "income_according_to_staff_rating")}
                value={activeDeposit?.income_according_to_staff_rating?.toString()}
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
                activeDeposit?.update_at && <span
                style={{
                  position: "absolute",
                  right: 5,
                }}
              >
                <i style={{ fontSize: "12px", color: "#707070" }}>
                  {`Cập nhật: `}
                </i>
                <i style={{ fontSize: "12px", color: "#1825aa" }}>
                  {`${activeDeposit.full_name} - ${timestampToDate(activeDeposit.update_at, "HH:mm - DD/MM/YYYY") }`}
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
                label="12. Ghi chú"
                disabled={ruleDisabled}
                placeholder="Ghi chú khác"
                onChange={(val) => onChangeDataDeposit(val, "description")}
                value={activeDeposit?.description?.toString()}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
        <IncomeAttachment isTitle={true} />
      </Grid>
    </Grid>
  </Box>

}

export default IncomeFormDeposit;