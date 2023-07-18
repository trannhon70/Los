import Box from '@mui/material/Box';
import { FC, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Input from 'views/components/base/Input';
import TitleSquare from 'views/components/layout/TitleSquare';
import IncomeAttachment from '../Attachment';
import SelectFrequence from 'views/components/widgets/SelectFrequence';
import Label from 'views/components/base/Label';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import {
  Document,
  ILOANNormalStorageIncomeBusiness,
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary,
}
  from 'types/models/loan/normal/storage/Income';
import {
  getLOANNormalStorageIncomeSourceList,
  getLOANNormalStorageIncomeSourceListBussniessActive,
}
  from 'features/loan/normal/storage/income/selector';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  addIncomeSourceType,
  removeIncomeSourceType,
  setIncomeSourceActive,
  setIncomeSourceBusinessChangeFREQ,
  setIncomeSourceBusinessDataCost,
  setIncomeSourceBusinessDataTurnover,
  setIncomeSourceBussinessActive,
  setIncomeSourceBussinessData
} from 'features/loan/normal/storage/income/action';
import { formatNumber, pathKeyStore } from 'utils';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import useNotify from 'app/hooks/useNotify';
import useNormalIncomeMessage from 'app/hooks/useNormalIncomeMessage';
import SelectBusinessRepresentation from 'views/components/widgets/SelectBusinessRepresentation';
import { SxSelectDisiable } from '../style';
import { getCodeDocumentTypeChildListIncome } from 'features/loan/normal/configs/document-type/selectors';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';

const IncomeFormBusiness: FC = () => {

  const params = useParams() as ILOANURLParams;
  const incomeTypeURL = params['*'];
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const notify = useNotify();
  const getMessage = useNormalIncomeMessage();
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''));
  const activeBuss = useSelector(getLOANNormalStorageIncomeSourceListBussniessActive(declareType, params.uuid ?? '', data?.business?.activeBusiness ?? ''));
  const disabled = !activeBuss?.uuid;
  const ChildListIncome = useSelector(getCodeDocumentTypeChildListIncome(pathKeyStore({document_group_type: "NGUON_THU", type_loan: "Loan"}), "business"))
  const [onBlurError, setOnBlurError] = useState('');
  const [onBlurErrorFee, setOnBlurErrorFee] = useState('');
  const [actualTime, setActualTime] = useState('');
  const ruleDisabled = useSelector(getRuleDisbled)


  const [ deleteIdBusiness, setDeleteIdBusiness ] = useState<ILOANNormalStorageIncomeBusiness | null>(null);
  const handleAddBussiness = () => {
    const incomeDocument: Document[] = ChildListIncome?.map(cl => ({
      data_file: [],
      document_id: Number(cl.id),
      document_name: cl.name.toString(),
      document_type: cl.type.toString()
    }))
    dispatch(addIncomeSourceType('', { declare: declareType, incomeSource: incomeType,incomeDocument: incomeDocument }))
  }

  const optionsData: IGroupListBase[] = data?.business.data.map((__, i) => ({
    value: i + 1,
    label: `Hộ kinh doanh ${i + 1}`,
    key: i + 1,
  })) ?? []

  const optionsDataPos = (data?.business.data?.findIndex(d => d.uuid === activeBuss?.uuid) ?? 0) + 1;

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = data?.business.data[current].uuid ?? ''
    dispatch(setIncomeSourceBussinessActive(currentActive, { declare: declareType }))
  }
  useEffect(()=>{
    dispatch(setIncomeSourceActive('business', { declare: declareType as keyof ILOANNormalStorageIncomeDeclare }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const onChangeDataBus = (value: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomeBusiness) => {
    if (key ==="workingTime"){
      if(Number(value) === 0 ){
        setActualTime('Thời gian kinh doanh thực tế (tháng) phải lớn hơn không');
      }
       else {
        setActualTime('');
      }
    }
    dispatch(setIncomeSourceBussinessData(value, { declare: declareType, key }))
  }
  const alertConfirm = (value: string, key: keyof ILOANNormalStorageIncomeBusiness) =>{
    // if (key ==="workingTime" && value){
    //   if(Number(value) < 12){
    //     setVisibleModal({message: "Cảnh báo ngoại lệ, thời gian kinh doanh thức tế dưới 1 năm"});
    //   }
    // }
    // if(key === "name"){
    //   if(declareType === 'borrower'){
    //     if(activeBuss?.representative === "SELF" && dataLegalBorrower !== value){
    //       setVisibleModal({message: "Cảnh báo ngoại lệ, người đại diện kinh doanh không giống với người vay"});
    //     }
    //     if(activeBuss?.representative === "MARRIAGE" && dataNameLegalMarriage !== value){
    //       setVisibleModal({message: "Cảnh báo ngoại lệ, người đại diện kinh doanh không giống với người hôn phối"});
    //     }
    //   }
    //   if(declareType === 'marriage'){
    //     if(activeBuss?.representative === "SELF" && dataNameLegalMarriage !== value){
    //       setVisibleModal({message: "Cảnh báo ngoại lệ, người đại diện kinh doanh không giống với người vay"});
    //     }
    //     if(activeBuss?.representative === "MARRIAGE" && dataLegalBorrower !== value){
    //       setVisibleModal({message: "Cảnh báo ngoại lệ, người đại diện kinh doanh không giống với người hôn phối"});
    //     }
    //   }
    // }
    if(key === "cost" && Number(value?.split('.').join('')) > Number(activeBuss?.turnover)){
      setVisibleModal({message: "Cảnh báo, Chi phí bình quân tháng đang lớn hơn Doanh thu bình quân tháng"});
    }
  }

  const onChangeDataTurnover = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Doanh thu bình quân tháng (VND) phải lớn hơn 0') : setOnBlurError('');
    setOnBlurErrorFee('');
    dispatch(setIncomeSourceBusinessDataTurnover(+value, { declare: declareType }))
  }
  const handleOnCloseModal =()=>{
    setVisibleModal(null);
  }
  const onChangeDataCost = (value: string) => {
    Number(value) === 0 ? setOnBlurErrorFee('Chi phí bình quân tháng (VND) phải lớn hơn 0') : setOnBlurErrorFee('');
    setOnBlurError('');
    dispatch(setIncomeSourceBusinessDataCost(+value, { declare: declareType }))
  }
  const onChangeFreq = (value: string) => {

    dispatch(setIncomeSourceBusinessChangeFREQ(value, { declare: declareType }))
  }
  const handleDeleteGroupListBase = (value: IGroupListBase,position:number) => {
    const business = data?.business.data?.find((__, index) => index === position);
    business && setDeleteIdBusiness(business)
  }

  const handleCancelConfirmBusiness = () => setDeleteIdBusiness(null);

  const handleConfirmBussiness = () => {
    const uuidDelete = deleteIdBusiness?.uuid;
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }else{
      dispatch(removeIncomeSourceType(uuidDelete, { declare: declareType, incomeSource: incomeType }))
      handleCancelConfirmBusiness()
    }
  }
  const [visibleModal,setVisibleModal]=useState<{message:string}|null>(null);

 
  return <Box>
    <Grid container spacing={3}>
      <Grid item xl={3.5} lg={4} md={6} sm={12} xs={12}>
        <Input
          label="1. Tổng thu nhập từ hoạt động kinh doanh của HKD (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.business.total_income_from_business_activities?.toString() ?? '0')}
        />
      </Grid>
      <Grid item xl={3.5} lg={4} md={6} sm={12} xs={12}>
        <Input
          label="2. Tổng thu nhập HĐ của HKD thường xuyên (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.business.permanent_income_amount?.toString() ?? '0')}
        />
      </Grid>
      <Grid item xl={3.5} lg={4} md={6} sm={12} xs={12}>
        <Input
          label="3. Tổng thu nhập HĐ của HKD không thường xuyên (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.business.occasional_income_amount?.toString() ?? '0')}
        />
      </Grid>
    </Grid>
    <Label bold className="mt-4 mb-3">4. Chọn hộ kinh doanh</Label>
    <Grid container spacing={3}>
      <Grid item className="mscb-group-list-col" xl={2} lg={2} md={2} sm={2} xs={2}>
        <GroupListBase
          labelAdd='Thêm hộ kinh doanh'
          onAdd={handleAddBussiness}
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
          Thông tin HỘ KINH DOANH
        </TitleSquare>
        <Box className="mt-3">
          <Grid container spacing={3}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <SelectBusinessRepresentation 
                required
                disabled={disabled || ruleDisabled}
                label="1. Người đại diện hộ kinh doanh"
                onChange={(val) => onChangeDataBus(val, 'representative')}
                value={activeBuss?.representative}
                message={getMessage(declareType, incomeType, 'representative', {position: activeBuss?.uuid ?? ""})}
                sx={{
                  ...SxSelectDisiable,
                  "& label":{
                    color: "var(--mscb-secondary) !important"
                  }
                }}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                label="2. Họ và tên"
                disabled={disabled || ruleDisabled}
                onDebounce={(val) => onChangeDataBus(val, 'name')}
                value={activeBuss?.name}
                message={getMessage(declareType, incomeType, 'name', {position: activeBuss?.uuid ?? ""})}
                onBlur={(e) => alertConfirm(e.target.value, 'name')}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                disabled={disabled || ruleDisabled}
                label="3. Thời gian kinh doanh thực tế (tháng)"
                onDebounce={(val) => onChangeDataBus(val, 'workingTime')}
                value={activeBuss?.workingTime?.toString()}
                type='number'
                message={getMessage(declareType, incomeType, 'workingTime', {position: activeBuss?.uuid ?? ""}) || actualTime}
                // onBlur ={(e) => alertConfirm(e.target.value, 'workingTime')}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <SelectFrequence
                required
                disabled={disabled || ruleDisabled}
                label="4. Tần suất thu nhập"
                onChange={onChangeFreq}
                value={activeBuss?.frequency}
                message={getMessage(declareType, incomeType, 'frequency', {position: activeBuss?.uuid ?? ""})}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                disabled
                label="5. Tỉ lệ nguồn thu nhập (%)"
                value={activeBuss?.frequency === 'FREQ' ? '100' : activeBuss?.frequency === 'INFREQ' ? '30' : ''}
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'var(--mscb-disable)',
                  },
                  '& .Mui-disabled':{
                    WebkitTextFillColor: 'var(--mscb-disable)',
                  }
                }}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required={activeBuss?.frequency.length === 0 ? false : true}
                disabled={!activeBuss?.frequency || ruleDisabled}
                // regex={/-?[0-9]*\.?[0-9]+/g}
                label="6. Doanh thu bình quân tháng (VND)"
                onDebounce={onChangeDataTurnover}
                value={(activeBuss?.turnover ?? '').toString()}
                format
                type='number'
                message={getMessage(declareType, incomeType, 'turnover', {position: activeBuss?.uuid ?? ""}) || onBlurError}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required={activeBuss?.frequency.length === 0 ? false : true}
                disabled={!activeBuss?.frequency || ruleDisabled}
                onDebounce={onChangeDataCost}
                regex={/-?[0-9]*\.?[0-9]+/g}
                label="7. Chi phí bình quân tháng (VND)"
                format
                type='number'
                value={(activeBuss?.cost ?? '').toString()}
                message={getMessage(declareType, incomeType, 'cost', {position: activeBuss?.uuid ?? ""}) || onBlurErrorFee}
                onBlur ={(e) => alertConfirm(e.target.value, 'cost')}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                disabled
                onDebounce={(val) => onChangeDataBus(val, 'profit')}
                className="input-red"
                label="8. Lợi nhuận bình quân theo tháng (VND)"
                value={formatNumber((activeBuss?.profit??0).toString())}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                disabled
                onDebounce={(val) => onChangeDataBus(val, 'profit')}
                className="input-red"
                label="9. Tổng thu nhập từ hoạt động của hộ kinh doanh(VND)"
                value={formatNumber((activeBuss?.income_business_activities??0).toString())}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
        <IncomeAttachment 
          isTitle={true}
          onChangeFile={(value) => (onChangeDataBus(value, 'documents'))}
          isDisabled={disabled}
        />
      </Grid>
    </Grid>
    <ModalConfirm open={ deleteIdBusiness !== null } onClose={ handleCancelConfirmBusiness } onConfirm={ handleConfirmBussiness }>
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc chắn muốn xóa hộ kinh doanh ?
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

export default IncomeFormBusiness;