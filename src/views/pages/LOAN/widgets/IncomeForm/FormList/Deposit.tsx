import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from 'views/components/base/Input';
import TitleSquare from 'views/components/layout/TitleSquare';
import IncomeAttachment from '../Attachment';
import SelectFrequence from 'views/components/widgets/SelectFrequence';
import Label from 'views/components/base/Label';
import GroupListBase from 'views/components/layout/GroupListBase';
import { IGroupListBase } from 'views/components/layout/GroupListBase';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import {
  Document,
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary,
  ILOANNormalStorageIncomeDeposit,
}
  from 'types/models/loan/normal/storage/Income';
import {
  getLOANNormalStorageIncomeSourceList,
  getLOANNormalStorageIncomeSourceListDepositActive,
}
  from 'features/loan/normal/storage/income/selector';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  addIncomeSourceType,
  removeIncomeSourceType,
  setIncomeSourceActive,
  setIncomeSourceDepositActive,
  setIncomeSourceDepositChangeFREQ,
  setIncomeSourceDepositData,
  setIncomeSourceDepositDataTotal
} from 'features/loan/normal/storage/income/action';
import SelectCurrencyType from 'views/components/widgets/SelectCurrencyType';
import { formatNumber, pathKeyStore } from 'utils';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import useNotify from 'app/hooks/useNotify';
import useNormalIncomeMessage from 'app/hooks/useNormalIncomeMessage';
import SelectIssuer from 'views/components/widgets/SelectIssuer';
import { SxSelectDisiable } from '../style';
import AcceptStatusCheck from 'views/components/widgets/AcceptStatusCheck';
import { getCodeDocumentTypeChildListIncome } from 'features/loan/normal/configs/document-type/selectors';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';

const IncomeFormDeposit: FC = () => {

  const params = useParams() as ILOANURLParams;
  const incomeTypeURL = params['*'];
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const notify = useNotify();
  const getMessage = useNormalIncomeMessage();
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeDeposit = useSelector(getLOANNormalStorageIncomeSourceListDepositActive(declareType, params.uuid ?? '', data?.deposit?.activeDeposit ?? ''));
  const disabled = !activeDeposit?.uuid;
  const [ deleteIdDesposit, setDeleteIdDesposit ] = useState<ILOANNormalStorageIncomeDeposit | null>(null);
  const [onBlurError, setOnBlurError] = useState('');
  const ChildListIncome = useSelector(getCodeDocumentTypeChildListIncome(pathKeyStore({document_group_type: "NGUON_THU", type_loan: "Loan"}), "deposit"))
  const [visibleModal,setVisibleModal]=useState<{message:string}|null>(null);
  const ruleDisabled = useSelector(getRuleDisbled)


  const alertMessge = (value: string | number | null ,  key: keyof ILOANNormalStorageIncomeDeposit) =>{
    if(key === "term"){
      if(Number(value) < 3){
        setVisibleModal({message: 'Cảnh báo ngoại lệ, Thời gian duy trì liên tục số dư TG/GTCG dưới 3 tháng' });
      }
    }
  }

  useEffect(()=>{
    dispatch(setIncomeSourceActive('deposit', { declare: declareType as keyof ILOANNormalStorageIncomeDeclare }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleOnCloseModal =()=>{
    setVisibleModal(null);
  }

  const handleAddDeposit = () => {
    const incomeDocument: Document[] = ChildListIncome?.map(cl => ({
      data_file: [],
      document_id: Number(cl.id),
      document_name: cl.name.toString(),
      document_type: cl.type.toString()
    }))
    dispatch(addIncomeSourceType('', { declare: declareType, incomeSource: incomeType,incomeDocument:incomeDocument }))
  }

  const optionsData: IGroupListBase[] = data?.deposit.data.map((__, i) => ({
    value: i + 1,
    label: `Lãi tiền gửi/GTCG ${i + 1}`,
    key: i + 1,
  })) ?? []

  const optionsDataPos = (data?.deposit.data?.findIndex(d => d.uuid === activeDeposit?.uuid) ?? 0) + 1;

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = data?.deposit.data[current].uuid ?? ''
    dispatch(setIncomeSourceDepositActive(currentActive, { declare: declareType }))
  }

  const onChangeDataDeposit = (value: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomeDeposit) => {
    dispatch(setIncomeSourceDepositData(value, { declare: declareType, key }))
  }

  const onChangeDataTotal = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Lãi bình quân theo tháng (VND) phải lớn hơn 0'): setOnBlurError('');
    dispatch(setIncomeSourceDepositDataTotal(+value, { declare: declareType }));
  }
  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceDepositChangeFREQ(value, { declare: declareType }));
  }
  // const onClickDataAuto = () => {
  //   dispatch(autofillDeposit('', { declare: declareType }))
  // }

  const handleDeleteGroupListBase = (value: IGroupListBase,position:number) => {
    const deposit = data?.deposit.data?.find((__, index) => index === position);
    deposit && setDeleteIdDesposit(deposit)
  }

  const handleCancelConfirmDeposit = () => setDeleteIdDesposit(null);

  const handleConfirmDeposit = () => {
    const uuidDelete = deleteIdDesposit?.uuid;
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }else{
      dispatch(removeIncomeSourceType(uuidDelete, { declare: declareType, incomeSource: incomeType }))
      handleCancelConfirmDeposit()
    }
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

  return <Box>
    <Grid container spacing={3}>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="1. Tổng thu nhập từ Lãi tiền gửi/GTCG (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.deposit.total_income_from_deposits?.toString() ?? '0')}
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="2. Tổng thu nhập thường xuyên (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.deposit.permanent_income_amount?.toString() ?? '0')}
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="3. Tổng thu nhập không thường xuyên (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.deposit.occasional_income_amount?.toString() ?? '0')}
        />
      </Grid>
    </Grid>
    <Label bold className="mt-4 mb-3">4. Chọn Lãi tiền gửi/GTCG</Label>
    <Grid container spacing={3}>
      <Grid item className="mscb-group-list-col" xl={2} lg={2} md={2} sm={2} xs={2}>
        <GroupListBase
          labelAdd='Thêm Lãi tiền gửi/GTCG'
          onAdd={handleAddDeposit}
          options={optionsData}
          activeId={optionsDataPos}
          onSelected={onSelectGroupList}
          isDelete={!ruleDisabled}
          isAdd={ruleDisabled}
          onDelete={handleDeleteGroupListBase}
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
                disabled={disabled || ruleDisabled}
                label="1. Đơn vị phát hành"
                onChange={(val) => onChangeDataDeposit(val, "publish_unit_id")}
                value={activeDeposit?.publish_unit_id ?? ""}
                message={getMessage(declareType, incomeType, 'publish_unit_id', {position: activeDeposit?.uuid ?? ""})}
                sx={SxSelectDisiable}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                disabled={disabled || ruleDisabled}
                label="2. Số Tài khoản tiền gửi/giấy tờ có giá"
                onDebounce={(val) => onChangeDataDeposit(val, 'account')}
                value={activeDeposit?.account}
                message={getMessage(declareType, incomeType, 'account', {position: activeDeposit?.uuid ?? ""})}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <SelectCurrencyType
                disabled={disabled || ruleDisabled}
                label="3. Loại tiền"
                onChange={(val) => onChangeDataDeposit(val, 'currency')}
                value={activeDeposit?.currency}
                message={getMessage(declareType, incomeType, 'currency', {position: activeDeposit?.uuid ?? ""})}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                disabled={disabled || ruleDisabled}
                format
                type='number'
                label="4. Số dư tiền gửi/giấy tờ có giá (VND)"
                onDebounce={(val) => onChangeDataDeposit(val, 'balance')}
                value={(activeDeposit?.balance ?? '').toString()}
                message={getMessage(declareType, incomeType, 'balance', {position: activeDeposit?.uuid ?? ""})}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <AcceptStatusCheck 
                label="5. Đồng ý phong tỏa"
                disabled={disabled || ruleDisabled}
                onChange={(val) => onChangeDataDeposit(val, "accept_blocked_account")}
                value={activeDeposit?.accept_blocked_account?.toString()}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                disabled={disabled || ruleDisabled}
                type="number"
                label="6. TG duy trì liên tục số dư TG/GTCG (tháng)"
                onDebounce={(val) => onChangeDataDeposit(val, 'term')}
                value={activeDeposit?.term?.toString()}
                message={getMessage(declareType, incomeType, 'term', {position: activeDeposit?.uuid ?? ""})}
                onBlur={(e) => alertMessge(e.target.value, 'term')}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                type='number'
                // regex={/-?[0-9]*\.?[0-9]+/g}
                format
                disabled={disabled || ruleDisabled}
                label="7. Lãi bình quân theo tháng (VND)"
                onDebounce={onChangeDataTotal}
                value={(activeDeposit?.profit ?? '').toString()}
                message={getMessage(declareType, incomeType, 'profit', {position: activeDeposit?.uuid ?? ""}) || onBlurError}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <SelectFrequence
                required
                disabled={disabled || ruleDisabled}
                label="8. Tần suất thu nhập"
                onChange={onChangeFreq}
                value={activeDeposit?.frequency}
                message={getMessage(declareType, incomeType, 'frequency', {position: activeDeposit?.uuid ?? ""})}
                sx={SxSelectDisiable}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                label="9. Tỉ lệ nguồn thu nhập (%)"
                disabled
                value={activeDeposit?.frequency === 'FREQ' ? '100' : activeDeposit?.frequency === 'INFREQ' ? '30' : ''}
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'var(--mscb-secondary)',
                  },
                  '& .Mui-disabled':{
                    WebkitTextFillColor: 'var(--mscb-secondary)',
                  }
                }}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                disabled
                type='number'
                format
                className='input-red'
                label="10. Thu nhập từ lãi (VND)"
                value={activeDeposit?.frequency ? calculateFrequencyType(activeDeposit?.frequency) : '0'}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
        <IncomeAttachment 
          isTitle={true}
          onChangeFile={(value) => (onChangeDataDeposit(value, 'documents'))}
          isDisabled={disabled}
        />
      </Grid>
    </Grid>
    <ModalConfirm open={ deleteIdDesposit !== null } onClose={ handleCancelConfirmDeposit } onConfirm={ handleConfirmDeposit }>
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc chắn muốn xóa lãi tiền gửi/GTCG ?
      </Box>
    </ModalConfirm>
    
    <ModalConfirm
        open={Boolean(visibleModal)}
        disabledActions={["close"]}
        onClose={handleOnCloseModal}
        onConfirm={handleOnCloseModal}
        labelConfirm="OK"
      >
        <Box className="text-18 font-medium text-primary text-center">
        {Boolean(visibleModal?.message)?visibleModal?.message :" "}
        </Box>
    </ModalConfirm>
  </Box>

}

export default IncomeFormDeposit;