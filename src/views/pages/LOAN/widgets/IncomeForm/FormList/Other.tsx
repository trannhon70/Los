import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from 'views/components/base/Input';
import TitleSquare from 'views/components/layout/TitleSquare';
import IncomeAttachment from '../Attachment';
import SelectFrequence from 'views/components/widgets/SelectFrequence';
import SelectMethodOfReceivingSalary from 'views/components/widgets/SelectMethodOfReceivingSalary';
import Label from 'views/components/base/Label';
import GroupListBase from 'views/components/layout/GroupListBase';
import { IGroupListBase } from 'views/components/layout/GroupListBase';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import {
  Document,
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary,
  ILOANNormalStorageIncomeOther,
}
  from 'types/models/loan/normal/storage/Income';
import {
  getLOANNormalStorageIncomeSourceList,
  getLOANNormalStorageIncomeSourceListOtherActive,
}
  from 'features/loan/normal/storage/income/selector';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  addIncomeSourceType,
  removeIncomeSourceType,
  setIncomeSourceActive,
  setIncomeSourceOtherActive,
  setIncomeSourceOtherChangeFREQ,
  setIncomeSourceOtherData,
  setIncomeSourceOtherDataTotal,
} from 'features/loan/normal/storage/income/action';
import { formatNumber, pathKeyStore } from 'utils';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import useNotify from 'app/hooks/useNotify';
import useNormalIncomeMessage from 'app/hooks/useNormalIncomeMessage';
import { SxSelectDisiable } from '../style';
import { getCodeDocumentTypeChildListIncome } from 'features/loan/normal/configs/document-type/selectors';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';

const IncomeFormOther: FC = () => {

  const params = useParams() as ILOANURLParams;
  const incomeTypeURL = params['*'];
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const notify = useNotify();
  const getMessage = useNormalIncomeMessage();
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeOther = useSelector(getLOANNormalStorageIncomeSourceListOtherActive(declareType, params.uuid ?? '', data?.other?.activeOther ?? ''));
  const disabled = !activeOther?.uuid;
  const ChildListIncome = useSelector(getCodeDocumentTypeChildListIncome(pathKeyStore({document_group_type: "NGUON_THU", type_loan: "Loan"}), "other"))
  const [onBlurError, setOnBlurError] = useState('');
  const [ deleteIdOther, setDeleteIdOther ] = useState<ILOANNormalStorageIncomeOther | null>(null);
  const ruleDisabled = useSelector(getRuleDisbled)

  useEffect(()=>{
    dispatch(setIncomeSourceActive('other', { declare: declareType as keyof ILOANNormalStorageIncomeDeclare }));
  },[]);

  const handleAddOther = () => {
    const incomeDocument: Document[] = ChildListIncome?.map(cl => ({
      data_file: [],
      document_id: Number(cl.id),
      document_name: cl.name.toString(),
      document_type: cl.type.toString()
    }))
    dispatch(addIncomeSourceType('', { declare: declareType, incomeSource: incomeType,incomeDocument: incomeDocument}))
  }

  const optionsData: IGroupListBase[] = data?.other.data.map((__, i) => ({
    value: i + 1,
    label: `Nguồn thu ${i + 1}`,
    key: i + 1,
  })) ?? []

  const optionsDataPos = (data?.other.data?.findIndex(d => d.uuid === activeOther?.uuid) ?? 0) + 1;

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = data?.other.data[current].uuid ?? ''
    dispatch(setIncomeSourceOtherActive(currentActive, { declare: declareType }))
  }

  const onChangeDataOther = (value: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomeOther) => {
    dispatch(setIncomeSourceOtherData(value, { declare: declareType, key }));
  }

  const onChangeDataTotal = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Thu nhập thực nhận bình quân (VND) phải lớn hơn 0'): setOnBlurError('');
    dispatch(setIncomeSourceOtherDataTotal(+value, { declare: declareType }));
  }
  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceOtherChangeFREQ(value, { declare: declareType }));
  }

  const handleDeleteGroupListBase = (value: IGroupListBase,position:number) => {
    const other = data?.other.data?.find((__, index) => index === position);
    other && setDeleteIdOther(other)
  }

  const handleCancelConfirmOther = () => setDeleteIdOther(null);

  const handleConfirmOther = () => {
    const uuidDelete = deleteIdOther?.uuid;
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }else{
      dispatch(removeIncomeSourceType(uuidDelete, { declare: declareType, incomeSource: incomeType }))
      handleCancelConfirmOther()
    }
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

  return <Box>
    <Grid container spacing={3}>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="1. Tổng thu nhập từ nguồn thu khác (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.other.total_income_from_other_sources?.toString() ?? '0')}
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="2. Tổng thu nhập thường xuyên (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.other.permanent_income_amount?.toString() ?? '0')}
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="3. Tổng thu nhập không thường xuyên (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.other.occasional_income_amount?.toString() ?? '0')}
        />
      </Grid>
    </Grid>
    <Label bold className="mt-4 mb-3">4. Chọn nguồn thu</Label>
    <Grid container spacing={3}>
      <Grid item className="mscb-group-list-col" xl={2} lg={2} md={2} sm={2} xs={2} >
        <GroupListBase
          labelAdd='Thêm nguồn thu'
          onAdd={handleAddOther}
          options={optionsData}
          activeId={optionsDataPos}
          onSelected={onSelectGroupList}
          isDelete={!ruleDisabled}
          isAdd={ruleDisabled}
          onDelete={handleDeleteGroupListBase}
        />
      </Grid>
      <Grid item xl={6} lg={6} md={6} sm={10} xs={10}>
        <TitleSquare>
          Thông tin nguồn thu khác
        </TitleSquare>
        <Box className="mt-3">
          <Grid container spacing={3}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                label="1. Số lần nhận thu nhập theo năm"
                type="number"
                onDebounce={(val) => onChangeDataOther(val, 'frequencyYear')}
                value={activeOther?.frequencyYear?.toString()}
                disabled={disabled || ruleDisabled}
                message={getMessage(declareType, incomeType, 'frequencyYear', {position: activeOther?.uuid ?? ""})}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <SelectMethodOfReceivingSalary
                required
                label="2. Phương thức nhận"
                onChange={(val) => onChangeDataOther(val, 'paymentMethod')}
                value={activeOther?.paymentMethod}
                disabled={disabled || ruleDisabled}
                message={getMessage(declareType, incomeType, 'receivedMethod', {position: activeOther?.uuid ?? ""})}
                sx={SxSelectDisiable}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                label="3. Thu nhập thực nhận bình quân (VND)"
                type="number"
                // regex={/-?[0-9]*\.?[0-9]+/g}
                format
                onDebounce={onChangeDataTotal}
                value={(activeOther?.profit ?? '').toString()}
                disabled={disabled || ruleDisabled}
                message={getMessage(declareType, incomeType, 'profit', {position: activeOther?.uuid ?? ""}) || onBlurError}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                label="4. Mô tả"
                onDebounce={(val) => onChangeDataOther(val, 'note')}
                value={activeOther?.note}
                disabled={disabled || ruleDisabled}
                message={getMessage(declareType, incomeType, 'note', {position: activeOther?.uuid ?? ""})}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <SelectFrequence
                required
                label="5. Tần suất thu nhập"
                onChange={onChangeFreq}
                value={activeOther?.frequency}
                disabled={disabled || ruleDisabled}
                message={getMessage(declareType, incomeType, 'frequency', {position: activeOther?.uuid ?? ""})}
                sx={SxSelectDisiable}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                disabled
                label="6. Tỉ lệ nguồn thu nhập (%)"
                value={activeOther?.frequency === 'FREQ' ? '100' :
                  activeOther?.frequency === 'INFREQ' ? '30' : ''}
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
                disabled
                label="7. Thu nhập khác (VND)"
                type="number"
                className="input-red"
                format
                value={activeOther?.frequency ? calculateFrequencyType(activeOther?.frequency) : '0'}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
        <IncomeAttachment 
          isTitle={true}
          onChangeFile={(value) => (onChangeDataOther(value, 'documents'))}
          isDisabled={disabled}
        />
      </Grid>
    </Grid>
    <ModalConfirm open={ deleteIdOther !== null } onClose={ handleCancelConfirmOther } onConfirm={ handleConfirmOther }>
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa nguồn thu ?
        </Box>
      </ModalConfirm>
  </Box>

}

export default IncomeFormOther;