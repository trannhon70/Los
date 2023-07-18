import Box from '@mui/material/Box';
import { FC, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Input from 'views/components/base/Input';
import TitleSquare from 'views/components/layout/TitleSquare';
import IncomeAttachment from '../Attachment';
import InputDate from 'views/components/base/InputDate';
import SelectFrequence from 'views/components/widgets/SelectFrequence';
import Label from 'views/components/base/Label';
import GroupListBase from 'views/components/layout/GroupListBase';
import { IGroupListBase } from 'views/components/layout/GroupListBase';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import {
  Document,
  ILOANNormalStorageIncomeCompany,
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary,
} from 'types/models/loan/normal/storage/Income';
import {
  getLOANNormalStorageIncomeSourceList,
  getLOANNormalStorageIncomeSourceListCompanyActive,
} from 'features/loan/normal/storage/income/selector';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  addIncomeSourceType,
  removeIncomeSourceType,
  setIncomeSourceActive,
  setIncomeSourceCompanyActive,
  setIncomeSourceCompanyChangeFREQ,
  setIncomeSourceCompanyData,
  setIncomeSourceCompanyDataTotal
} from 'features/loan/normal/storage/income/action';
import { formatNumber, pathKeyStore } from 'utils';
import SelectBussniessTypeIncome from 'views/components/widgets/SelectBussniessTypeIncome';
import Empty from 'views/components/layout/Empty';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import useNotify from 'app/hooks/useNotify';
import { SxSelectDisiable } from '../style';
import useNormalIncomeMessage from 'app/hooks/useNormalIncomeMessage';
import { getCodeDocumentTypeChildListIncome } from 'features/loan/normal/configs/document-type/selectors';
import moment from 'moment';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';

const IncomeFormCompany: FC = () => {

  const params = useParams() as ILOANURLParams;
  const incomeTypeURL = params['*'];
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const notify = useNotify();
  const getMessage = useNormalIncomeMessage();
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeCompany = useSelector(getLOANNormalStorageIncomeSourceListCompanyActive(declareType, params.uuid ?? '', data?.company?.activeCompany ?? ''));
  const disabled = !activeCompany?.uuid;
  const ChildListIncome = useSelector(getCodeDocumentTypeChildListIncome(pathKeyStore({document_group_type: "NGUON_THU", type_loan: "Loan"}), "company"))
  const [onBlurError, setOnBlurError] = useState('');
  const ruleDisabled = useSelector(getRuleDisbled)

  const [ deleteIdCompany, setDeleteIdCompany ] = useState<ILOANNormalStorageIncomeCompany | null>(null);
  const [visibleModal,setVisibleModal]=useState<{message:string}|null>(null);
  const [dateRegister, setDateRegister] = useState('');
  
  useEffect(()=>{
    dispatch(setIncomeSourceActive('company', { declare: declareType as keyof ILOANNormalStorageIncomeDeclare }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleAddCompany = () => {
    const incomeDocument: Document[] = ChildListIncome?.map(cl => ({
      data_file: [],
      document_id: Number(cl.id),
      document_name: cl.name.toString(),
      document_type: cl.type.toString()
    }))
    dispatch(addIncomeSourceType('', { declare: declareType, incomeSource: incomeType,incomeDocument: incomeDocument }))
  }

  const optionsData: IGroupListBase[] = data?.company.data.map((__, i) => ({
    value: i + 1,
    label: `Doanh nghiệp ${i + 1}`,
    key: i + 1,
  })) ?? []

  const optionsDataPos = (data?.company.data?.findIndex(d => d.uuid === activeCompany?.uuid) ?? 0) + 1;

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = data?.company.data[current].uuid ?? ''
    dispatch(setIncomeSourceCompanyActive(currentActive, { declare: declareType }))
  }
  const alertMessage = (value: string | number | null,  key: keyof ILOANNormalStorageIncomeCompany) =>{
    const formatted = moment(Number(value)).toDate();
    const dateCurrent = new Date();
    if(key === 'licenseDate' && value && formatted <= dateCurrent){
      const result = moment(dateCurrent).diff(new Date(value), 'year');
      if( result < 1) {
        setVisibleModal({message:'Cảnh báo ngoại lệ, ngày đăng ký doanh nghiệp dưới 1 năm'});
      }
    }
    if(key === 'licenseDate'){
      const dates =  new Date().getTime();
      if((Number(value)) > dates){
        setDateRegister('Ngày đăng ký hoạt động của Doanh nghiệp phải nhỏ hơn ngày hiện tại');
      } else {
        setDateRegister('');
      }
    }
  }
  const onChangeDataCompany = (value: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomeCompany) => {
    const formatted = moment(Number(value)).toDate();
    const dateCurrent = new Date();
    if(key === 'licenseDate' && value && formatted <= dateCurrent){
      const result = moment(dateCurrent).diff(new Date(Number(value)), 'year');
      if( result < 1) {
        setVisibleModal({message:'Cảnh báo ngoại lệ, ngày đăng ký doanh nghiệp dưới 1 năm'});
      }
    }
    if(key === 'licenseDate'){
      const dates =  new Date().getTime();
      if((Number(value)) > dates){
        setDateRegister('Ngày đăng ký hoạt động của Doanh nghiệp phải nhỏ hơn ngày hiện tại');
      } else {
        setDateRegister('');
      }
    }
    dispatch(setIncomeSourceCompanyData(value, { declare: declareType, key }));
  }

  const handleOnCloseModal =()=>{
    setVisibleModal(null);
  }

  const onChangeDataTotal = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Lợi nhuận bình quân theo tháng (VND) phải lớn hơn 0'): setOnBlurError('');
    dispatch(setIncomeSourceCompanyDataTotal(+value, { declare: declareType }));
  }
  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceCompanyChangeFREQ(value, { declare: declareType }));
  }

  const onHandleDeleteGroupListBase = (value: IGroupListBase,position:number) => {
    const company = data?.company.data?.find((__, index) => index === position);
    company && setDeleteIdCompany(company)
  }

  const onHandleCancelConfirmCompany = () => setDeleteIdCompany(null);

  const onHandleConfirmCompany = () => {
    const uuidDelete = deleteIdCompany?.uuid;
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }else{
      dispatch(removeIncomeSourceType(uuidDelete, { declare: declareType, incomeSource: incomeType }));
      onHandleCancelConfirmCompany();
    } 
  }

  const calculateFrequencyType = (type: string | undefined) => {
    let cal = '';
    switch (type) {
      case 'FREQ':
        cal = ((activeCompany?.profit ?? 0) * 1).toString();
        break;
      case 'INFREQ':
        cal = ((activeCompany?.profit ?? 0) * 0.3).toString();
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
          label="1. Tổng thu nhập từ Doanh nghiệp (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.company.total_income_from_company?.toString() ?? '')}
          sx={{
            "& .Mui-disabled": {
              color: "var(--mscb-red)",
              WebkitTextFillColor: "unset"
            }
          }}
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="2. Tổng thu nhập thường xuyên (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.company.permanent_income_amount?.toString() ?? '')}
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="3. Tổng thu nhập không thường xuyên (VND)"
          disabled
          className="input-red"
          value={formatNumber(data?.company.occasional_income_amount?.toString() ?? '')}
        />
      </Grid>
    </Grid>
    <Label bold className="mt-4 mb-3">4. Chọn doanh nghiệp</Label>
    <Grid container spacing={3}>
      <Grid item className="mscb-group-list-col" xl={2} lg={2} md={2} sm={2} xs={2}>
        <GroupListBase
          labelAdd='Thêm doanh nghiệp'
          onAdd={handleAddCompany}
          options={optionsData}
          activeId={optionsDataPos}
          onSelected={onSelectGroupList}
          isDelete={!ruleDisabled}
          isAdd={ruleDisabled}
          onDelete={onHandleDeleteGroupListBase}
        />
      </Grid>

      {
        data?.company.data.length === 0 ?
        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
          <Empty>Không có dữ liệu</Empty>
        </Grid>
        : 
        <>
          <Grid item xl={6} lg={6} md={8} sm={10} xs={10}>
            <TitleSquare>
              Thông tin DOANH NGHIỆP DO KHÁCH HÀNG LÀM CHỦ
            </TitleSquare>
            <Box className="mt-3">
              <Grid container spacing={3}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <SelectBussniessTypeIncome
                    required
                    label="1. Loại hình doanh nghiệp"
                    disabled={disabled || ruleDisabled}
                    onChange={(val) => onChangeDataCompany(val, 'type')}
                    value={activeCompany?.type ?? ""}
                    sx={SxSelectDisiable}
                    message={getMessage(declareType, incomeType, 'type', {position: activeCompany?.uuid ?? ""})}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input
                    required
                    label="2. Tên doanh nghiệp"
                    disabled={disabled || ruleDisabled}
                    onDebounce={(val) => onChangeDataCompany(val, 'name')}
                    value={activeCompany?.name}
                    message={getMessage(declareType, incomeType, 'name', {position: activeCompany?.uuid ?? ""})}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input
                    required
                    label="3. Mã số thuế"
                    disabled={disabled || ruleDisabled}
                    onDebounce={(val) => onChangeDataCompany(val, 'tax')}
                    value={activeCompany?.tax}
                    message={getMessage(declareType, incomeType, 'tax', {position: activeCompany?.uuid ?? ""})}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input
                    required
                    label="4. Số điện thoại liên lạc"
                    maxlength={12}
                    disabled={disabled || ruleDisabled}

                    onDebounce={(val) => onChangeDataCompany(val, 'phone')}
                    value={activeCompany?.phone}
                    message={getMessage(declareType, incomeType, 'phone', {position: activeCompany?.uuid ?? ""})}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <InputDate
                    required
                    label="5. Ngày đăng ký hoạt động của Doanh nghiệp"
                    onChange={(val) => onChangeDataCompany(val, 'licenseDate')}
                    value={activeCompany?.licenseDate}
                    disabled={disabled || ruleDisabled}
                    message={getMessage(declareType, incomeType, 'licenseDate', {position: activeCompany?.uuid ?? ""}) || dateRegister}
                    onAcept={(value) => alertMessage(value, 'licenseDate')}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input
                    required
                    type="number"
                    // regex={/-?[0-9]*\.?[0-9]+/g}
                    label="6. Lợi nhuận bình quân theo tháng (VND)"
                    onDebounce={onChangeDataTotal}
                    format
                    value={(activeCompany?.profit ?? '').toString()}
                    disabled={disabled || ruleDisabled}
                    message={getMessage(declareType, incomeType, 'profit', {position: activeCompany?.uuid ?? ""}) || onBlurError}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <SelectFrequence
                    required
                    label="7. Tần suất thu nhập"
                    onChange={onChangeFreq}
                    disabled={disabled || ruleDisabled}
                    sx={SxSelectDisiable}
                    value={activeCompany?.frequency}
                    message={getMessage(declareType, incomeType, 'frequency', {position: activeCompany?.uuid ?? ""})}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input
                    required
                    label="8. Tỉ lệ nguồn thu nhập (%)"
                    disabled
                    value={activeCompany?.frequency === 'FREQ' ? '100' : activeCompany?.frequency === 'INFREQ' ? '30' : ''}
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
                    label="9. Thu nhập từ DN do KH làm chủ (VND)"
                    type="number"
                    disabled
                    className="input-red"
                    format
                    value={activeCompany?.frequency ? calculateFrequencyType(activeCompany?.frequency) : '0'}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
            <IncomeAttachment 
              isTitle={true}
              onChangeFile={(value) => (onChangeDataCompany(value, 'documents'))}
              isDisabled={disabled}
            />
          </Grid>
          <ModalConfirm open={ deleteIdCompany !== null } onClose={ onHandleCancelConfirmCompany } onConfirm={ onHandleConfirmCompany }>
            <Box className="text-18 font-medium text-primary text-center">
              Bạn có chắc chắn muốn xóa doanh nghiệp ?
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
        </>
      }
    </Grid>
  </Box>

}

export default IncomeFormCompany;