import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useMasterData from 'app/hooks/useMasterData';
import useNormalIncomeApprovalMessage from "app/hooks/useNormalIncomeApprovalMessage";
import { 
  setIncomeSourceApprovalSalaryActive,           
  setIncomeSourceApprovalSalaryChangeFREQ, 
  setIncomeSourceApprovalSalaryData, 
  setIncomeSourceApprovalSalaryDataTitleCompany, 
  setIncomeSourceApprovalSalaryDataTotal,
  setTotalIncomeNVTTD 
} from "features/loan/normal/storageApproval/income/action";
import {
  getLOANNormalStorageIncomeSourceList,
  getLOANNormalStorageIncomeSourceListSalaryActive
} from "features/loan/normal/storageApproval/income/selector";
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
import moment from 'moment';
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import {
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary,
  ILOANNormalStorageIncomeSalary
} from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import Label from "views/components/base/Label";
import GroupListBase, {
  IGroupListBase
} from "views/components/layout/GroupListBase";
import ModalConfirm from 'views/components/layout/ModalConfirm';
import TitleSquare from "views/components/layout/TitleSquare";
import SelectBussniessTypeSh from "views/components/widgets/SelectBussniessTypeSh";
import SelectCareer from "views/components/widgets/SelectCareer";
import SelectContractTerm from "views/components/widgets/SelectContractTerm";
import SelectFrequence from "views/components/widgets/SelectFrequence";
import SelectMethodOfReceivingSalary from "views/components/widgets/SelectMethodOfReceivingSalary";
import SelectTypeBusinessSh from "views/components/widgets/SelectTypeBusinessSh";
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import IncomeAttachment from "../Attachment";
import { SxSelectDisabled } from "../style";


const IncomeFormSalary: FC = () => {
  const params = useParams() as ILOANURLParams;
  const incomeTypeURL = params['*'];
  const declareTypeURL = params.declare ?? "";

  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;

  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const ruleDisabled = useSelector(getRuleDisbledReappraise)

  const dispatch = useDispatch();
  const getMessage = useNormalIncomeApprovalMessage();  
  const {BusinessType, register} = useMasterData();
    
  useEffect(() => {
    register('businessType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const [visibleModal,setVisibleModal]=useState<{message:string}|null>(null);
  const [onBlurError, setOnBlurError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [workExperience, setWorkExperience] = useState('');


  const handleOnCloseModal = () => setVisibleModal(null);


  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ""));
  const activeSala = useSelector(
    getLOANNormalStorageIncomeSourceListSalaryActive(
      declareType,
      params?.uuid ?? "",
      data?.salary.activeSalary ?? ""
    )
  );
 
  
  const optionsDataPos =
    (data?.salary.data?.findIndex((d) => d.uuid === activeSala?.uuid) ?? 0) + 1;
  
    

  const optionsData: IGroupListBase[] =
    data?.salary?.data?.map((__, i) => ({
      value: i + 1,
      label: `Nguồn lương ${i + 1}`,
      key: i + 1,
    })) ?? [];

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    if(data?.salary?.data){
      const currentActive = data?.salary?.data[current]?.uuid ?? "";
      dispatch(
        setIncomeSourceApprovalSalaryActive(currentActive, { declare: declareType })
      );
    }
  };
  
  const onChangeDataCompany = (val: string) => {
    const gg = BusinessType[activeSala?.areaActivity ?? ""]?.data?.find(item=>item.code === activeSala?.companyType)?.name;
    const titleCompany = gg + " " + val;
    dispatch(setIncomeSourceApprovalSalaryDataTitleCompany(val, { declare: declareType, full_name: titleCompany }));
  }

  const alertMessage = (value: string | number, key: keyof ILOANNormalStorageIncomeSalary) =>{
    if(key === 'years' && Number(value) < 1  && (Number(value) !== 0)){
        setVisibleModal({message:'Cảnh báo ngoại lệ, kinh nghiệm làm việc nhỏ hơn 1 năm'});
    }
    if(key === 'years' && Number(value) <= 0){
      setWorkExperience("Kinh nghiệm công tác tại lĩnh vực chuyên môn phải lớn hơn 0");
    }
    if(key === 'startDate' && value){
      const dates =  new Date().getTime();
      if((Number(value)) > dates){
        setStartDate('Ngày bắt đầu làm việc phải nhỏ hơn ngày hiện tại');
      } else {
        const result = moment(new Date()).diff(new Date(value), 'month');
        if(result < 3) {
          setVisibleModal({message:'Cảnh báo ngoại lệ, ngày bắt đầu làm việc trong 3 tháng'});
        }
        setStartDate('');
      }
    }
    if(key === 'startDate' && !value){
      setStartDate('Vui lòng nhập ngày bắt đầu làm việc');
    }
    if( key === 'years' && Number(value) >= 1){
      setWorkExperience('');
    }
  }


    const onChangeDataSal = (value: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomeSalary, keyboardInputValue?: string | null ) => {
    if(key === "receivedMethod" && value ==="CASH"){
      setVisibleModal({message:'Cảnh báo ngoại lệ, phương thức nhận lương bằng tiền mặt'});
    }
    if(key === "startDate" && value){
      const dates =  new Date().getTime();
      if((Number(value)) > dates){
        setStartDate('Ngày bắt đầu làm việc phải nhỏ hơn ngày hiện tại');
      } else {
        const result = moment(new Date()).diff(new Date(Number(value)), 'month');
        if(result < 3) {
          setVisibleModal({message:'Cảnh báo ngoại lệ, ngày bắt đầu làm việc trong 3 tháng'});
        }
        setStartDate('');
      }
    }
    dispatch(setIncomeSourceApprovalSalaryData(value, { declare: declareType, key }))
  }


  const onChangeTotalInComeNVTTD = (value: string) =>{
    dispatch(setTotalIncomeNVTTD(+value, { declare: declareType }));
  }

  const onChangeDataTotal = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Thu nhập lương và các khoản phụ cấp (VND) phải lớn hơn 0') : setOnBlurError('');
    dispatch(setIncomeSourceApprovalSalaryDataTotal(+value, { declare: declareType }))
  }
  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceApprovalSalaryChangeFREQ(value, { declare: declareType }))
  }
  return (
    <Box>
      <Grid container spacing={3}  sx={{
          '& .Mui-disabled input': { 
            color: 'var(--mscb-danger)!important', 
            WebkitTextFillColor: 'var(--mscb-danger)!important',
            fontWeight: 'bold' 
          }
        }}>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12} >
          <Input
            label="1. Tổng thu nhập từ nguồn lương (VND)"
            disabled
            type="number"
            format
            className="input-red"
            value={
              data?.salary.total_income_from_salary_NVTTD?.toString() ?? ""
            }
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="2. Tổng thu nhập thường xuyên (VND)"
            disabled
            type="number"
            format
            className="input-red"
            value={data?.salary.permanent_income_amount?.toString() ?? ""}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="3. Tổng thu nhập không thường xuyên (VND)"
            disabled
            type="number"
            format
            className="input-red"
            value={data?.salary.occasional_income_amount?.toString() ?? ""}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-5">
        <Grid
          item
          className="mscb-group-list-col"
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={2}
          sx={{
            "& .wh-full": {
              height: "calc(100 % -20px)!important",
            },
          }}
        >
          <Label bold className="mb-3">
            4. Chọn nguồn lương
          </Label>
          <GroupListBase
            options={optionsData}
            activeId={optionsDataPos}
            onSelected={onSelectGroupList}
            // your property is not good, is add = true is component hide button add
            isAdd={true}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={8} sm={10} xs={10}>
          <TitleSquare>
            Thông tin Tổ chức/Công ty/Đơn vị công tác hiện tại
          </TitleSquare>

          <Box className="mt-3">
            <Grid container spacing={3}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectTypeBusinessSh
                  label="1. Loại hình doanh nghiệp"
                  required
                  disabled={ruleDisabled}
                  typeBusiness={activeSala?.areaActivity}
                  value={activeSala?.companyType}
                  sx={SxSelectDisabled}
                  onChange={(val) => (onChangeDataSal(val, 'companyType'))}
                  message={getMessage(declareType, incomeType, 'companyType', {position: activeSala?.uuid ?? ""})}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  required
                  label="2. Tên doanh nghiệp"
                  onDebounce={onChangeDataCompany}
                  disabled={ruleDisabled}
                  value={activeSala?.companyName}
                  message={getMessage(declareType, incomeType, 'companyName', {position: activeSala?.uuid ?? ""})}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  required
                  label="3. Tổ chức/Công ty/Đơn vị công tác hiện tại"
                  value={activeSala?.companyCate}
                  disabled={ruleDisabled}
                  onDebounce={(val) => {
                    onChangeDataSal(val, 'companyCate');
                  }}
                  message={getMessage(declareType, incomeType, 'companyCate', {position: activeSala?.uuid ?? ""})}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input required 
                  label="4. Mã số thuế công ty"
                  value={activeSala?.tax?? ''}
                  disabled={ruleDisabled}
                  onDebounce={(val) => {
                    onChangeDataSal(val, 'tax');
                  }}
                  message={getMessage(declareType, incomeType, 'tax', {position: activeSala?.uuid ?? ""})}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectBussniessTypeSh
                  required
                  label="5. Khu vực hoạt động"
                  disabled={ruleDisabled}
                  value={activeSala?.areaActivity}
                  sx={SxSelectDisabled}
                  onChange={(val) => {
                    onChangeDataSal(val, 'areaActivity');
                  }}
                  message={getMessage(declareType, incomeType, 'areaActivity', {position: activeSala?.uuid ?? ""})}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input required 
                  label="6. Số điện thoại công ty" 
                  disabled={ruleDisabled}
                  value={activeSala?.phone?? ''}
                  onDebounce={(val) => {
                    onChangeDataSal(val, 'phone');
                  }}
                  message={getMessage(declareType, incomeType, 'phone', {position: activeSala?.uuid ?? ""})}
                  
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectCareer
                required
                  label="7. Lãnh vực chuyên môn"
                  disabled={ruleDisabled}
                  value={activeSala?.career}
                  sx={SxSelectDisabled}
                  message={getMessage(declareType, incomeType, 'career', {position: activeSala?.uuid ?? ""})}
                  onChange={(val) => {
                    onChangeDataSal(val, 'career');
                  }}

                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input 
                  label="8. Chức danh công tác"
                  value={activeSala?.title}
                  disabled={ruleDisabled}
                  onDebounce={(val) => {
                    onChangeDataSal(val, 'title');
                  }}
                 />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                disabled={ruleDisabled}
                label="9. KN công tác tại lĩnh vực chuyên môn (năm)"
                type="text"
                // disabled={disabled || ruleDisabled}
                regex={/^[+-]?\d+(\,\d{0,1})?$/}
                onDebounce={(value)=>{
                  onChangeDataSal(value? Number(value?.toString().replace(/,/g,'.')):0, 'years')
                }}
                value={activeSala?.years?.toString()?.split('.').join(',')}
                message={workExperience || getMessage(declareType, incomeType, 'yearExperience', {position: activeSala?.uuid ?? ""}) }
                onBlur={(e)=> alertMessage(e.target.value ? Number(e.target.value?.toString().replace(/,/g,'.')):0, 'years')}
              />  
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <InputDate
                required
                disabled={ruleDisabled}
                  label="10. Ngày bắt đầu làm việc"
                  value={activeSala?.startDate}
                  onChange={(val) => {
                    onChangeDataSal(val, 'startDate');
                  }}
                  message={getMessage(declareType, incomeType, 'startDateWork', {position: activeSala?.uuid ?? ""}) || startDate}
                  onAcept={(value) => alertMessage(value, 'startDate')}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectContractTerm
                required
                disabled={ruleDisabled}
                  // disabled={disabled || ruleDisabled}
                  label="11. Loại hợp đồng lao động"
                  onChange={(value) => (onChangeDataSal(value, 'contractType'))}
                  value={activeSala?.contractType}
                  sx={SxSelectDisabled}
                  message={getMessage(declareType, incomeType, 'contractType', {position: activeSala?.uuid ?? ""})}
              />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                 <SelectMethodOfReceivingSalary
                 required
                 disabled={ruleDisabled}
                  label="12. Phương thức nhận lương"
                  // disabled={disabled || ruleDisabled}
                  onChange={(value) => (onChangeDataSal(value, 'receivedMethod'))}
                  value={activeSala?.receivedMethod}
                  sx={SxSelectDisabled}
                  message={getMessage(declareType, incomeType, 'receivedMethod', {position: activeSala?.uuid ?? ""})}
              />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectFrequence
                required
                disabled={ruleDisabled}
                label="13. Tần suất thu nhập"
                // disabled={disabled || ruleDisabled}
                onChange={onChangeFreq}
                value={activeSala?.frequency}
                sx={SxSelectDisabled}
                message={getMessage(declareType, incomeType, 'frequency', {position: activeSala?.uuid ?? ""})}
              />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                required
                  label="14. Tỉ lệ nguồn thu nhập (%)"
                  disabled
                  value={
                    activeSala?.frequency === "FREQ"
                      ? "100"
                      : activeSala?.frequency === "INFREQ"
                      ? "30"
                      : ""
                  }
                  sx={{
                    "& .MuiInputBase-input": {
                      color: "var(--mscb-disable)",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "var(--mscb-disable)",
                      fontWeight: 500
                    },
                  }}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                required
                disabled={ruleDisabled}
                  label="15. Thu nhập lương và các khoản phụ cấp (VND)"
                  type="number"
                  format
                  onDebounce={onChangeDataTotal}
                  value={(activeSala?.salary ?? '').toString()}
                  message={getMessage(declareType, incomeType, 'income', {position: activeSala?.uuid ?? ""}) || onBlurError}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}  sx={{
                  '& .Mui-disabled input': { 
                    color: 'var(--mscb-danger)!important', 
                    WebkitTextFillColor: 'var(--mscb-danger)!important',
                    fontWeight: 'bold' 
                  }
                }}>
                <Input
                  required
                  label="16. Thu nhập từ lương (VND)"
                  disabled
                  type="number"
                  className="input-red"
                  format
                  value={
                    activeSala?.frequency === "FREQ"
                      ? ((activeSala?.salary || 0) * 1).toString()
                      : ((activeSala?.salary || 0) * 0.3).toString()
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input label="17. Thu nhập theo đánh giá của NVTTĐ" 
                  format
                  disabled={ruleDisabled}
                  type="number"
                  value={String(activeSala?.income_according_to_staff_rating)}
                  // onChange={(value) => (onChangeDataSal(value, 'income_according_to_staff_rating'))}
                  onDebounce={onChangeTotalInComeNVTTD}
                 />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <IncomeAttachment isTitle={true} />
        </Grid>
      </Grid>

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
  );
};

export default IncomeFormSalary;
