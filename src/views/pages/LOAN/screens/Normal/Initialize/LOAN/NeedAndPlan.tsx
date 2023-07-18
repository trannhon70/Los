import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useNormalLoanMessage from 'app/hooks/useNormalLoanMessage';
import {
  setLOANNormalStorageLOANNeedAndPlan, setLOANNormalStorageLOANNeedAndPlanExpiredCredit, setLOANNormalStorageLOANNeedAndPlanNeed, setLOANNormalStorageLOANNeedAndPlanOwnCaptital
} from 'features/loan/normal/storage/loan/actions';
import { getLOANNormalStorageLOANNeedAndPlan, getLOANNormalStorageLOANProduct } from 'features/loan/normal/storage/loan/selectors';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalStorageLOANNeedAndPlan } from 'types/models/loan/normal/storage/LOAN';
import Input from 'views/components/base/Input';
import Numberbox from 'views/components/base/Numberbox';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import SelectCurrencyType from 'views/components/widgets/SelectCurrencyType';
import SelectDebursement from 'views/components/widgets/SelectDebursement';
import SelectInterestPaymentMethod from 'views/components/widgets/SelectInterestPaymentMethod';
import SelectLendingMethod from 'views/components/widgets/SelectLendingMethod';
import SelectLOANInterestRate from 'views/components/widgets/SelectLOANInterestRate';
import SelectScheduleUnit from 'views/components/widgets/SelectScheduleUnit';

const LOANNeedAndPlain: FC = () => {

  const dispatch = useDispatch();
  const LOANNAP = useSelector(getLOANNormalStorageLOANNeedAndPlan);
  const LOANProduct = useSelector(getLOANNormalStorageLOANProduct);
  const ruleDisabled = useSelector(getRuleDisbled)

  const getMessage = useNormalLoanMessage();
  // const [isOpenModal, setIsOpenModal] = useState<Boolean>(false)
  const [ message, setMessage] = useState('');
  const [ totalMessage, setTotalMessage] = useState('');
  const [warningModal, setWarningModal]=useState<{message:string}|null>(null);


  const changeNAP = (name: keyof ILOANNormalStorageLOANNeedAndPlan) => (value: string | number | null) => {
    dispatch(setLOANNormalStorageLOANNeedAndPlan(value, name));
  }

  const changeNAPNeed = () => (value: number | null) => {

    dispatch(setLOANNormalStorageLOANNeedAndPlanNeed(value));
  }
  const changeNAPOwnCaptital = () => (value: number | null) => {
    if (LOANProduct.loanType === 'SHORT' && value !== null) {
      if (value < ((Number(LOANNAP.need) * 10) / 100)) {
        setMessage("Tối thiểu tối thiểu 10% đối với vay Ngắn hạn")
      } else {
        setMessage('')
      }
    } else if (LOANProduct.loanType === 'OTHER') {
      setMessage('')
    }
    else {
      if (value !== null && LOANNAP.need !== null && value < ((LOANNAP.need * 20) / 100)) {
        setMessage('Tối thiểu 20 % đối với vay Trung hạn hoặc Dài hạn')
      } else {
        setMessage('')
      }
    }
    if(value !== null && LOANNAP.need !== null && value >= LOANNAP.need){
      setTotalMessage('Số tiền cần vay phải lớn hơn 0, đề nghị điều chỉnh lại!')
    }else{
      setTotalMessage('')
    }
    dispatch(setLOANNormalStorageLOANNeedAndPlanOwnCaptital(value));
  }

  const changeNAPExpiredCredit = () => (value: number | null) => {
    dispatch(setLOANNormalStorageLOANNeedAndPlanExpiredCredit(value));
  }

  // const autoFill = () => {
  //   dispatch(autoFillNeedAndPlan(''))
  // }
  // const checkNeed = ()=>{
  //     // vốn tự có lớn hơn nhu cầu vay
  //     if(Number(LOANNAP.ownCaptital) > Number(LOANNAP.need)){
  //       setIsOpenModal(!isOpenModal)
  //     }
  // }
  const handleOnCloseModal = () =>{
    setWarningModal(null);
  }

  const alertMessageWarning = () =>{

    if (LOANProduct.loanType === 'SHORT' && LOANNAP.ownCaptital !== null ) {
      if (LOANNAP.ownCaptital < ((Number(LOANNAP.need) * 10) / 100)) {
        setWarningModal({message:'Cảnh báo ngoại lệ, Số vốn tự có phải tối thiểu 10 % Tổng nhu cầu đối với vay Ngắn hạn'});
      }
    } 
    if(LOANProduct.loanType === 'MEDIUM' && LOANNAP.ownCaptital !== null) {
      if (LOANNAP.need !== null && LOANNAP.ownCaptital < ((LOANNAP.need * 20) / 100)) {
        setWarningModal({message:'Cảnh báo ngoại lệ, Số vốn tự có phải tối thiểu 20 % Tổng nhu cầu đối với vay Trung hạn hoặc Dài hạn' })
      } 
    }
    if(LOANProduct.loanType === 'LONG' && LOANNAP.ownCaptital !== null ) {
      if (LOANNAP.need !== null && LOANNAP.ownCaptital < ((LOANNAP.need * 20) / 100)) {
        setWarningModal({message:'Tối thiểu 20% đối với "Trung hạn" và "Dài hạn"'})
      } 
    }
    if(LOANNAP.ownCaptital !== null && LOANNAP.need !== null && LOANNAP.ownCaptital >= LOANNAP.need){
      setWarningModal({message:'Số tiền cần vay phải lớn hơn 0, đề nghị điều chỉnh lại!'})
    }

  }

  return <Box className="mt-6">
    <Grid container spacing={6}>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Box className="mscb-form-row">
          <SelectCurrencyType
            label="1. Loại tiền cho vay"
            onChange={changeNAP('currency')}
            value={LOANNAP.currency}
            required
            message={getMessage('need-and-plan', 'currency')}
            disabled={ ruleDisabled }
          />
        </Box>
        <Box className="mscb-form-row">
          <Numberbox
            integer
            comma
            label="2. Tổng nhu cầu vốn (A)"
            type="number"
            format
            onDebounce={value => changeNAPNeed()(value === '' ? null : +value)}
            value={(LOANNAP.need ?? '').toString()}
            required
            message={getMessage('need-and-plan', 'need')}
            onBlur={alertMessageWarning}
            disabled={ ruleDisabled }
          />
        </Box>
        <Box className="mscb-form-row">
          <Numberbox
            integer
            comma
            label="3. Vốn tự có (B)"
            required
            type="number"
            format
            onDebounce={value => changeNAPOwnCaptital()(value === '' ? null : +value)}
            value={(LOANNAP.ownCaptital ?? '').toString()}
            message={getMessage('need-and-plan', 'ownCaptital') || message}
            onBlur={ alertMessageWarning}
            disabled={ ruleDisabled }

          />
        </Box>
        <Box className="mscb-form-row">
          <Numberbox
            integer
            comma
            label="4. Số tiền cần vay SCB (=A-B) = C"
            type="number"
            format
            disabled
            value={(LOANNAP.loanAmount ?? 0).toString()}
            required
            sx={{
              '& .Mui-disabled input': {
                color: 'var(--mscb-danger)!important',
                WebkitTextFillColor: 'var(--mscb-danger)!important',
                fontWeight: 'bold'
              }
            }}
            message={totalMessage}
          />
        </Box>
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12} className="relative b-line">
        <Box className="mscb-form-row">
          <SelectLendingMethod
            label="5. Phương thức đề nghị cấp tín dụng"
            required
            onChange={changeNAP('method')}
            value={LOANNAP.method}
            message={getMessage('need-and-plan', 'method')}
            disabled={ ruleDisabled }
          />
        </Box>
        <Box className="mscb-form-row">
          <Input
            label="6. Thời hạn đề nghị CTD/duy trì HMTD (tháng)"
            type="number"
            disabedNegative
            format
            onDebounce={value => changeNAPExpiredCredit()(value === '' ? null : +value)}
            required
            value={(LOANNAP.expiredCredit ?? '').toString()}
            message={getMessage('need-and-plan', 'expiredCredit')}
            disabled={ ruleDisabled }

          />
        </Box>
        <Box className="mscb-form-row">
          <Input
            label="7. Thời hạn từng lần rút vốn (tháng)"
            required
            type="number"
            disabedNegative
            format
            onDebounce={value => changeNAP('expiredWithdraw')(value === '' ? null : +value)}
            value={(LOANNAP.expiredWithdraw ?? '').toString()}
            message={getMessage('need-and-plan', 'expiredWithdraw')}
            disabled={ ruleDisabled }
          />
        </Box>
        <Box className="mscb-form-row">
          <Input
            label="8. Thời hạn ân hạn gốc (tháng)"
            type="number"
            disabedNegative
            format
            onDebounce={value => changeNAP('graceOrigin')(value === '' ? null : +value)}
            // required
            value={(LOANNAP.graceOrigin ?? '').toString()}
            message={getMessage('need-and-plan', 'graceOrigin')}
            disabled={ ruleDisabled }
          />
        </Box>
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12} className="relative b-line">
        <Box className="mscb-form-row">
          <Input
            label="9. Tỷ lệ tài trợ của SCB (%)"
            required
            disabled
            isMinus
            type="number"
            format
            value={(LOANNAP.scb_percentage ?? '').toString()}
            sx={{
              '& .Mui-disabled input': {
                color: 'var(--mscb-danger)!important',
                WebkitTextFillColor: 'var(--mscb-danger)!important',
                fontWeight: 'bold'
              }
            }}
          />
        </Box>
        <Box className="mscb-form-row">
          <Input
            label="10. Lãi suất cho vay (%/năm)"
            type="number"
            disabedNegative
            format
            value={(LOANNAP.interestRate ?? '').toString()}
            onDebounce={value => changeNAP('interestRate')(value === '' ? null : +value)}
            required
            message={getMessage('need-and-plan', 'interestRate')}
            disabled={ ruleDisabled }
          />
        </Box>
        <Box className="mscb-form-row">
          <SelectLOANInterestRate
            label="11. Định kỳ điều chỉnh lãi suất cho vay (%)"
            required
            value={LOANNAP.periodAdjust ?? ""}
            onChange={changeNAP('periodAdjust')}
            message={getMessage('need-and-plan', 'periodAdjust')}
            disabled={ ruleDisabled }
          />
        </Box>
        <Box className="mscb-form-row">
          <Input
            label="12. Biên độ điều chỉnh lãi suất cho vay (%)"
            type="number"
            disabedNegative
            format
            value={(LOANNAP.marginAdjust ?? '').toString()}
            onDebounce={value => changeNAP('marginAdjust')(value === '' ? null : +value)}
            required
            message={getMessage('need-and-plan', 'marginAdjust')}
            disabled={ ruleDisabled }
          />
        </Box>
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12} className="relative b-line">
        <Box className="mscb-form-row">
          <SelectDebursement
            label="13. Phương thức giải ngân"
            required
            value={LOANNAP.disbursementMethod}
            onChange={changeNAP('disbursementMethod')}
            message={getMessage('need-and-plan', 'disbursementMethod')}
            disabled={ ruleDisabled }
          />
        </Box>
        <Box className="mscb-form-row">
          <SelectScheduleUnit
            label="14. Phương thức trả nợ gốc"
            required
            value={LOANNAP.repayOriginMethod}
            onChange={changeNAP('repayOriginMethod')}
            message={getMessage('need-and-plan', 'repayOriginMethod')}
            disabled={ ruleDisabled }
          />
        </Box>
        <Box className="mscb-form-row">
          <SelectInterestPaymentMethod
            label="15. Phương thức trả nợ lãi"
            required
            value={LOANNAP.repayinterestMethod}
            onChange={changeNAP('repayinterestMethod')}
            message={getMessage('need-and-plan', 'repayinterestMethod')}
            disabled={ ruleDisabled }
          />
        </Box>
        <Box className="mscb-form-row">
          <Numberbox
            integer
            comma
            label="16. Số tiền gốc dự kiến trả mỗi kỳ (VNĐ)"
            required
            type="number"
            format
            value={(LOANNAP?.amountPaidEachPeriod ?? 0).toString()}
            onDebounce={value => changeNAP('amountPaidEachPeriod')(value === '' ? null : +value)}
            message={getMessage('need-and-plan', 'amountPaidEachPeriod')}
            disabled={ ruleDisabled }
          />
        </Box>
      </Grid>
      {/* <ModalConfirm
        open={Boolean(isOpenModal)}
        onConfirm={handleOnCloseModal}
        disabledActions={["close"]}
        labelConfirm="OK"
      >
        <Box className="text-18 font-medium text-primary text-center">
          Số tiền cần vay phải lớn hơn 0, đề nghị điều chỉnh lại!
        </Box>
      </ModalConfirm> */}
      <ModalConfirm
        open={warningModal !== null? true : false}
        disabledActions={["close"]}
        onClose={handleOnCloseModal}
        onConfirm={handleOnCloseModal}
        labelConfirm="OK"
      >
        <Box className="text-18 font-medium text-primary text-center">
          {Boolean(warningModal?.message) ? warningModal?.message : " "}
        </Box>
      </ModalConfirm>
    </Grid>
    {/* <Button onClick={autoFill}>AutoFill</Button> */}
  </Box>

}

export default LOANNeedAndPlain;