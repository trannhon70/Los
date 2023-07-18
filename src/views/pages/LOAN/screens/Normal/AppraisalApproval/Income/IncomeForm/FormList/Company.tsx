import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useNormalIncomeApprovalMessage from "app/hooks/useNormalIncomeApprovalMessage";
import { setIncomeSourceApprovalCompanyActive, setIncomeSourceApprovalCompanyChangeFREQ, setIncomeSourceApprovalCompanyData, setIncomeSourceApprovalCompanyDataTotal, setTotalIncomeNVTTD } from "features/loan/normal/storageApproval/income/action";
import { getLOANNormalStorageIncomeSourceList, getLOANNormalStorageIncomeSourceListCompanyActive } from "features/loan/normal/storageApproval/income/selector";
import moment from 'moment';
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { Document, ILOANNormalStorageIncomeCompany, ILOANNormalStorageIncomeDeclare, ILOANNormalStorageIncomeDeclareSalary } from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import { formatNumber } from "utils";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import Label from "views/components/base/Label";
import Empty from "views/components/layout/Empty";
import GroupListBase, { IGroupListBase } from "views/components/layout/GroupListBase";
import ModalConfirm from "views/components/layout/ModalConfirm";
import TitleSquare from "views/components/layout/TitleSquare";
import SelectBussniessTypeIncome from "views/components/widgets/SelectBussniessTypeIncome";
import SelectFrequence from "views/components/widgets/SelectFrequence";
import { urlToDeclare, urlToIncomeSource } from "views/pages/LOAN/utils";
import IncomeAttachment from "../Attachment";
import { SxInputDisabled, SxInputRedDisabled, SxSelectDisabled } from "../style";
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
const IncomeFormCompany: FC = () => {
  const params = useParams() as ILOANURLParams;
  const incomeTypeURL = params['*'];
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const getMessage = useNormalIncomeApprovalMessage();
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeCompany = useSelector(getLOANNormalStorageIncomeSourceListCompanyActive(declareType, params.uuid ?? '', data?.company?.activeCompany ?? ''));
  const disabled = !activeCompany?.uuid;
  const [visibleModal,setVisibleModal]=useState<{message:string}|null>(null);
  const [dateRegister, setDateRegister] = useState('');
  const [onBlurError, setOnBlurError] = useState('');
  const ruleDisabled = useSelector(getRuleDisbledReappraise)

  const optionsData: IGroupListBase[] = data?.company.data.map((__, i) => ({
    value: i + 1,
    label: `Doanh nghiệp ${i + 1}`,
    key: i + 1,
  })) ?? [];

  const optionsDataPos = (data?.company.data?.findIndex(d => d.uuid === activeCompany?.uuid) ?? 0) + 1;

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = data?.company.data[current].uuid ?? ''
    dispatch(setIncomeSourceApprovalCompanyActive(currentActive, { declare: declareType }))
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
    dispatch(setIncomeSourceApprovalCompanyData(value, { declare: declareType, key }));
  }

  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceApprovalCompanyChangeFREQ(value, { declare: declareType }));
  }

  const onChangeDataTotal = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Lợi nhuận bình quân theo tháng (VND) phải lớn hơn 0'): setOnBlurError('');
    dispatch(setIncomeSourceApprovalCompanyDataTotal(+value, { declare: declareType }));
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
            value={formatNumber(data?.company.total_income_from_company?.toString() ?? '')}
            sx={SxInputRedDisabled}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="2. Tổng thu nhập thường xuyên (VND)"
            sx={SxInputRedDisabled}
            disabled
            value={formatNumber(data?.company.permanent_income_amount?.toString() ?? '')}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="3. Tổng thu nhập không thường xuyên (VND)"
            disabled
            sx={SxInputRedDisabled}
            value={formatNumber(data?.company.occasional_income_amount?.toString() ?? '')}
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
            4. Chọn doanh nghiệp
          </Label>
          <GroupListBase
            options={optionsData}
            activeId={optionsDataPos}
            isAdd={true}
            onSelected={onSelectGroupList}
          />
        </Grid>

        {optionsData.length === 0 ? (
          <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
            <Empty>Không có dữ liệu</Empty>
          </Grid>
        ) : (
          <>
            <Grid item xl={6} lg={6} md={8} sm={10} xs={10}>
              <TitleSquare>
                Thông tin DOANH NGHIỆP DO KHÁCH HÀNG LÀM CHỦ
              </TitleSquare>
              <Box className="mt-3">
                <Grid container spacing={3}>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <SelectBussniessTypeIncome
                      disabled={disabled || ruleDisabled}
                      required
                      label="1. Loại hình Doanh nghiệp"
                      sx={SxSelectDisabled}
                      onChange={(val) => onChangeDataCompany(val, 'type')}
                      value={activeCompany?.type ?? ""}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Input 
                    required
                      disabled={disabled || ruleDisabled}
                      label="2. Tên Doanh nghiệp"
                      onDebounce={(val) => onChangeDataCompany(val, 'name')}
                      value={activeCompany?.name}
                      message={getMessage(declareType, incomeType, 'businessName', {position: activeCompany?.uuid ?? ""})}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Input 
                    required
                      disabled={disabled || ruleDisabled}
                      label="3. Mã số thuế" 
                      onDebounce={(val) => onChangeDataCompany(val, 'tax')}
                      value={activeCompany?.tax}
                      message={getMessage(declareType, incomeType, 'tax', {position: activeCompany?.uuid ?? ""})}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Input
                      disabled={disabled || ruleDisabled}
                      required
                      label="4. Số điện thoại liên lạc"
                      maxlength={12}
                      onDebounce={(val) => onChangeDataCompany(val, 'phone')}
                      value={activeCompany?.phone}
                      message={getMessage(declareType, incomeType, 'phone', {position: activeCompany?.uuid ?? ""})}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <InputDate
                    required
                       disabled={disabled || ruleDisabled}
                      label="5. Ngày đăng ký hoạt động của Doanh nghiệp"
                      onChange={(val) => onChangeDataCompany(val, 'licenseDate')}
                      value={activeCompany?.licenseDate}
                      message={getMessage(declareType, incomeType, 'licenseDate', {position: activeCompany?.uuid ?? ""})}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Input
                    required
                      disabled={disabled || ruleDisabled}
                      type="number"
                      label="6. Lợi nhuận bình quân theo tháng (VND)"
                      format
                      onDebounce={onChangeDataTotal}
                      value={(activeCompany?.profit ?? '').toString()}
                      message={getMessage(declareType, incomeType, 'profit', {position: activeCompany?.uuid ?? ""})}

                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <SelectFrequence
                      required
                      disabled={disabled || ruleDisabled}
                      label="7. Tần suất thu nhập"
                      sx={SxSelectDisabled}
                      onChange={onChangeFreq}
                      value={activeCompany?.frequency}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Input 
                    required
                      label="8. Tỉ lệ nguồn thu nhập (%)" 
                      disabled 
                      value={activeCompany?.frequency === 'FREQ' ? '100' : activeCompany?.frequency === 'INFREQ' ? '30' : ''}
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
                      format
                      required
                      label="9. Thu nhập từ doanh nghiệp do KH làm chủ (VND)"
                      type="number"
                      disabled
                      sx={SxInputRedDisabled}
                      value={activeCompany?.frequency ? calculateFrequencyType(activeCompany?.frequency) : '0'}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Input
                      disabled={disabled || ruleDisabled}
                      format
                      label="10. Thu nhập theo đánh giá của NVTTĐ"
                      type="number"
                      value={(activeCompany?.income_according_to_staff_rating ?? 0).toString()}
                      // onDebounce={(val) => onChangeDataCompany(Number(val), 'income_according_to_staff_rating')}
                      onDebounce={onChangeTotalInComeNVTTD}

                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
              <IncomeAttachment 
                isTitle={true} 
                onChangeFile={(value) => (onChangeDataCompany(value, 'documents'))}
              />
            </Grid>

            <ModalConfirm >
              <Box className="text-18 font-medium text-primary text-center">
                Bạn có chắc chắn muốn xóa doanh nghiệp ?
              </Box>
            </ModalConfirm>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default IncomeFormCompany;
