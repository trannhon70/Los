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
  ILOANNormalStorageIncomeStock,
}
  from 'types/models/loan/normal/storage/Income';
import {
  getLOANNormalStorageIncomeSourceList, 
  getLOANNormalStorageIncomeSourceListStockActive,
}
  from 'features/loan/normal/storage/income/selector';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  addIncomeSourceType,
  removeIncomeSourceType,
  setIncomeSourceActive,
  setIncomeSourceStockActive,
  setIncomeSourceStockChangeFREQ,
  setIncomeSourceStockData,
  setIncomeSourceStockDataTotal
} from 'features/loan/normal/storage/income/action';
import { formatNumber, pathKeyStore } from 'utils';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import useNotify from 'app/hooks/useNotify';
import { SxSelectDisiable } from '../style';
import useNormalIncomeMessage from 'app/hooks/useNormalIncomeMessage';
import { getCodeDocumentTypeChildListIncome } from 'features/loan/normal/configs/document-type/selectors';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';


const IncomeFormStock: FC = () => {

  const params = useParams() as ILOANURLParams;
  const incomeTypeURL = params['*'];
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const notify = useNotify();
  const getMessage = useNormalIncomeMessage();
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeStock = useSelector(getLOANNormalStorageIncomeSourceListStockActive(declareType, params.uuid ?? '', data?.stock?.activeStock ?? ''));
  const disabled = !activeStock?.uuid;
  const ChildListIncome = useSelector(getCodeDocumentTypeChildListIncome(pathKeyStore({document_group_type: "NGUON_THU", type_loan: "Loan"}), "stock"))
  const [onBlurError, setOnBlurError] = useState('');
  const [ deleteIdStock, setDeleteIdStock ] = useState<ILOANNormalStorageIncomeStock | null>(null);
  const [yearRecieveStock, setYearRecieveStock] = useState('');
  const [numberRecieveStock, setNumberRecieveStock] = useState('');
  const ruleDisabled = useSelector(getRuleDisbled)
  const handleAddStock = () => {
    const incomeDocument: Document[] = ChildListIncome?.map(cl => ({
      data_file: [],
      document_id: Number(cl.id),
      document_name: cl.name.toString(),
      document_type: cl.type.toString()
    }))
    dispatch(addIncomeSourceType('', { declare: declareType, incomeSource: incomeType ,incomeDocument: incomeDocument }))
  }

  const optionsData: IGroupListBase[] = data?.stock.data.map((__, i) => ({
    value: i + 1,
    label: `Cổ tức lợi nhuận ${i + 1}`,
    key: i + 1,
  })) ?? []
  
  useEffect(()=>{
    dispatch(setIncomeSourceActive('stock', { declare: declareType as keyof ILOANNormalStorageIncomeDeclare }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const optionsDataPos = (data?.stock.data?.findIndex(d => d.uuid === activeStock?.uuid) ?? 0) + 1;

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = data?.stock.data[current].uuid ?? ''
    dispatch(setIncomeSourceStockActive(currentActive, { declare: declareType }))
  }

  const alertMessge = (value: string | number | null ,  key: keyof ILOANNormalStorageIncomeStock) =>{
    if(key === "year"){
      let messageText = '';
      if(Number(value) < 2){
        messageText =  'Số năm nhận cổ thức/lợi nhuận phải lớn hơn hoặc bằng 2';
      } 
      if(String(value)?.length > 2) {
        messageText= 'Số năm nhận cổ tức/lợi nhuận không được nhập số hàng trăm (tối đa 2 số)';
      } 
      setYearRecieveStock(messageText);
    }

    if(key === "count"){
      let messageCount = '';
      if(Number(value) < 1){
        messageCount = 'Số lần nhận thu nhập cổ tức/lợi nhuận trong năm phải lớn hơn hoặc bằng 1';
      }
      if(String(value)?.length > 2) {
        messageCount ='Số lần nhận thu nhập cổ tức/lợi nhuận trong năm không được nhập số hàng trăm (tối đa 2 số)';
      }
      setNumberRecieveStock(messageCount);
    }
  }

  const onChangeDataStock = (value: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomeStock) => {
    dispatch(setIncomeSourceStockData(value, { declare: declareType, key }));
  }

  const onChangeDataTotal = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Thu nhập bình quân theo tháng (VND) phải lớn hơn 0'): setOnBlurError('');
    dispatch(setIncomeSourceStockDataTotal(+value, { declare: declareType }))
  }

  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceStockChangeFREQ(value, { declare: declareType }));
  }

  // const onClickDataAuto = () => {
  //   dispatch(autofillStock('', { declare: declareType }))
  // }

  const onHandleDeleteGroupListBase = (value: IGroupListBase,position:number) => {
    const stock =  data?.stock.data?.find((__, index) => index === position);
    stock && setDeleteIdStock(stock);
  }

  const onHandleCancelConfirmStock = () => setDeleteIdStock(null);

  const onHandleConfirmStock = () => {
    const uuidDelete = deleteIdStock?.uuid;
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }else{
      dispatch(removeIncomeSourceType(uuidDelete, { declare: declareType, incomeSource: incomeType }))
      onHandleCancelConfirmStock()
    } 
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

  return <Box>
    <Grid container spacing={3}>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="1. Tổng thu nhập từ cổ tức/lợi nhuận (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.stock.total_income_from_stocks?.toString() ?? '')}
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="2. Tổng thu nhập thường xuyên (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.stock.permanent_income_amount?.toString() ?? '')}
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="3. Tổng thu nhập không thường xuyên (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.stock.occasional_income_amount?.toString() ?? '')}
        />
      </Grid>
    </Grid>
    <Label bold className="mt-4 mb-3">4. Chọn Cổ tức/ Lợi nhuận</Label>
    <Grid container spacing={3}>
      <Grid item className="mscb-group-list-col" xl={2} lg={2} md={2} sm={2} xs={2}>
        <GroupListBase
          labelAdd='Thêm Cổ tức/ Lợi nhuận'
          onAdd={handleAddStock}
          options={optionsData}
          activeId={optionsDataPos}
          onSelected={onSelectGroupList}
          isDelete={!ruleDisabled}
          isAdd={ruleDisabled}
          onDelete={onHandleDeleteGroupListBase}
        />
      </Grid>
      <Grid item xl={5} lg={5} md={8} sm={10} xs={10}>
        <TitleSquare>
          Thông tin cổ tức/ lợi nhuận
        </TitleSquare>
        <Box className="mt-3">
          <Grid container spacing={3}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                label="1. Số năm nhận (năm)"
                onDebounce={(val) => onChangeDataStock(val, 'year')}
                value={activeStock?.year?.toString()}
                disabled={disabled || ruleDisabled}
                type='number'
                message={getMessage(declareType, incomeType, 'year', {position: activeStock?.uuid ?? ""}) || yearRecieveStock}
                onBlur={(e) => alertMessge(e.target.value, 'year')}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                label="2. Số lần nhận trong năm"
                type='number'
                onDebounce={(val) => onChangeDataStock(val, 'count')}
                value={activeStock?.count?.toString()}
                disabled={disabled || ruleDisabled}
                message={getMessage(declareType, incomeType, 'count', {position: activeStock?.uuid ?? ""}) || numberRecieveStock}
                onBlur={(e) => alertMessge(e.target.value, 'count')}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <SelectFrequence
                required
                disabled={disabled || ruleDisabled}
                label="3. Tần suất thu nhập"
                onChange={onChangeFreq}
                value={activeStock?.frequency}
                sx={SxSelectDisiable}
                message={getMessage(declareType, incomeType, 'frequency', {position: activeStock?.uuid ?? ""})}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                disabled
                label="4. Tỉ lệ nguồn thu nhập (%)"
                value={activeStock?.frequency === 'FREQ' ? '100' : activeStock?.frequency === 'INFREQ' ? '30' : ''}
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
                required
                label="5. Thu nhập bình quân theo tháng (VND)"
                type="number"
                // regex={/-?[0-9]*\.?[0-9]+/g}
                disabled={disabled || ruleDisabled}
                format
                onDebounce={onChangeDataTotal}
                value={(activeStock?.profit ?? '').toString()}
                message={getMessage(declareType, incomeType, 'profit', {position: activeStock?.uuid ?? ""}) || onBlurError}
              // value={formatNumber(activeStock?.profit?.toString())}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                disabled
                className='input-red'
                type='number'
                label="6. Thu nhập từ cổ tức/lợi nhuận (VND)"
                format
                value={activeStock?.frequency ? calculateFrequencyType(activeStock?.frequency) : '0'}
              />
            </Grid>
           
          </Grid>
        </Box>
      </Grid>
      <Grid item xl={5} lg={5} md={12} sm={12} xs={12}>
        <IncomeAttachment 
          isTitle={true}
          onChangeFile={(val) => (onChangeDataStock(val, 'documents'))}
          isDisabled={disabled}
        />
      </Grid>
    </Grid>

    <ModalConfirm open={ deleteIdStock !== null } onClose={ onHandleCancelConfirmStock } onConfirm={ onHandleConfirmStock }>
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc chắn muốn xóa cổ tức lợi nhuận ?
      </Box>
    </ModalConfirm>
  </Box>
}

export default IncomeFormStock;