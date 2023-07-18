import { Divider } from '@mui/material';
import useBackdrop from 'app/hooks/useBackdrop';
import useNotify from 'app/hooks/useNotify';
import clsx from 'clsx';
import { fetchDataGuideState } from 'features/loan/normal';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';
import { onChangeProgramData, saveApprovalLOAN } from 'features/loan/normal/storageApproval/loan/action';
import { getApprovalLoanTableOptionSaved, getLOANApprovalLOANProgramTableType, getLOANApprovalNeedForPlanInfoDocument, getLOANApprovalProductionAndBusiness } from 'features/loan/normal/storageApproval/loan/selectors';
import { getLOANApprovalSourceBorrowerUuid } from 'features/loan/normal/storageApproval/selectors';
import { callApprovalApprove, callControlComfirm, callDisApproved, callDisConfirm } from 'features/loan/normal/storageControl/action';
import { ETypeButton } from 'features/loan/normal/storageControl/case';
import { getPositionLoanS2Params } from 'features/loan/normal/storageGuide/generateTypeStateGuide';
import { checkRoleButtonBar } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import ButtonBarRole from 'views/components/layout/ButtonBarRole';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import ModalConfirmReverse from 'views/components/layout/ModalConfirmReverse';
import Steps from 'views/components/layout/Steps';
import { stageName, stepsLOANAppraisalApproval } from 'views/pages/LOAN/utils';
import AttachmentModalServices from './AttachmentModalServices';
import LOANMethod from './LOANMethod';
import ProductInfo from './ProductInfo';
import ProductionAndBusinessActive from './ProductionAndBusinessActive';
import loanStyle from "./style";
import TableLoan from './TableLoan';

const Loan: FC = () => {
  const classes = loanStyle();
  const dispatch = useDispatch()
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const notify = useNotify()
  const { showBackdrop } = useBackdrop()
  const stepName = params['*'];
  const [isOpen, setOpenAttachment] = useState<boolean>(false);
  const [isContinue, setIsContinue] = useState(false)

  const [alert, setAlert] = useState<boolean>(false)
  const optionSaved = useSelector(getApprovalLoanTableOptionSaved)
  const optionLocal = useSelector(getLOANApprovalLOANProgramTableType)

  let current = stepsLOANAppraisalApproval.indexOf(stepName);
  const dataNeedForPlan = useSelector(getLOANApprovalNeedForPlanInfoDocument);
  const los_id = useSelector(getLOANNormalLOSId)
  const getIsExistProductAndBusiness = useSelector(getLOANApprovalProductionAndBusiness)
  const checkStateGuide = useSelector(checkRoleButtonBar);
  const brw_uuid = useSelector(getLOANApprovalSourceBorrowerUuid)
  useEffect(() => {
    if(params.stage === stageName[1]){
      if(current > 0 && optionSaved === null){
        notify('Chưa chọn Bảng phân tích đánh giá phương án, nhu cầu vốn. Vui lòng kiểm tra lại', 'error');
        navigate(`/loan/normal/appraisal-approval/${params.id}/loan/${stepsLOANAppraisalApproval[0]}`);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params])
  
  const beforeChange = (_: number, next: number) => {

    if(next > 0 && optionSaved === null){
      notify('Chưa chọn Bảng phân tích đánh giá phương án, nhu cầu vốn. Vui lòng kiểm tra lại', 'error')
      return false
      // navigate(`/loan/normal/${stageName[1]}/${params.id}/${tabAppraisalURL[1]}/product`);
    }
    
    navigate(`/loan/normal/appraisal-approval/${params.id}/loan/${stepsLOANAppraisalApproval[next]}`);
  }

  const dataPosition = getPositionLoanS2Params(`${params['*']}`) ?? ""

  useEffect(() => {
    params.stage === "appraisal-approval" && dispatch(fetchDataGuideState({ los_id, position: dataPosition }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']])

  const handleOpenAttach = () => setOpenAttachment(!isOpen)

  const saveLOANApproval = () => {
    setIsContinue(false)
    if(!!optionSaved && optionSaved !== optionLocal){
      setAlert(true)
    }
    else {
      showBackdrop()
      setTimeout(() => {
        dispatch(saveApprovalLOAN([stepName]))
      },500)
    }
  }

  const continueLOANApproval = () => {
    if(checkStateGuide?.current_state_group === "REAPPRAISE_HEADQUARTER"){
      setIsContinue(true)
      if(!!optionSaved && optionSaved !== optionLocal){
        setAlert(true)
      }
      else {
        showBackdrop()
        setTimeout(() => {
          dispatch(saveApprovalLOAN([stepName, 'continue']))
        },500)
        
      }
    }
    else {
      const currentStepIndex = stepsLOANAppraisalApproval.indexOf(stepName)
      if(currentStepIndex === 0 || currentStepIndex === 2){
        navigate(`/loan/normal/appraisal-approval/${params.id}/loan/${stepsLOANAppraisalApproval[currentStepIndex + 1]}`)
      }
      else if(currentStepIndex === 1 && !getIsExistProductAndBusiness){
        navigate(`/loan/normal/appraisal-approval/${params.id}/loan/${stepsLOANAppraisalApproval[currentStepIndex + 2]}`)
      }else{
        navigate(`/loan/normal/appraisal-approval/${params.id}/income/borrower/${brw_uuid}/salary`)
      }
    }
  }

  const handleCancelSave = () => {
    setAlert(false)
    dispatch(onChangeProgramData(optionSaved ?? null, { key: "evaluation_analysis_table" }))
    showBackdrop()
    dispatch(saveApprovalLOAN(isContinue ? [stepName, 'continue'] :[stepName]))
  } 
  const handleConfirmSave = () => {
    setAlert(false)
    showBackdrop()
    dispatch(saveApprovalLOAN(isContinue ? [stepName, 'continue'] :[stepName]))
  }
  const onExit = () => {
    navigate(`/`);
  }

  const onBack = () => {
    const currentStepIndex = stepsLOANAppraisalApproval.indexOf(stepName)
    if(currentStepIndex === 3 && !getIsExistProductAndBusiness){
      navigate(`/loan/normal/appraisal-approval/${params.id}/loan/${stepsLOANAppraisalApproval[currentStepIndex - 2]}`)
    }
    else if(currentStepIndex - 1 >= 0){
      navigate(`/loan/normal/appraisal-approval/${params.id}/loan/${stepsLOANAppraisalApproval[currentStepIndex - 1]}`)
    }else{
      navigate(`/loan/normal/appraisal-approval/${params.id}/cic-app/main/borrower`)
    }
  }
  const onSaveMenu = (item: string) => {
    switch (item) {
      case ETypeButton.appraise: // phê duyệt
        saveLOANApproval();
        break;
      case ETypeButton.confirm:
        showBackdrop(true)
        dispatch(callControlComfirm({ position: dataPosition, title: "" }));
        break;
      case ETypeButton.approve:
        showBackdrop(true)
        dispatch(callApprovalApprove({ position: dataPosition, title: "" }));
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true)
        dispatch(callDisConfirm({ title: "", position: dataPosition }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true)
        dispatch(callDisApproved({ title: "", position: dataPosition }));
        break;
    }
  }

  return (
    <Fragment>
      <Steps
        onChange={beforeChange}
        className={clsx(classes.root)}
        attachLabel="tập tin"
        onAttach={handleOpenAttach}
        current={!!~current ? current : 0}
        steps={[
          {
            node: "A",
            label: "Thông tin sản phẩm chương trình vay",
            hasSub: false
          },
          {
            node: "B",
            label: "nhu cầu vốn và phương án vay vốn",
            hasSub: false,
            attachment: dataNeedForPlan.count ?? 0,

          },
          {
            node: "C",
            label: "Hoạt động sản xuất kinh doanh",
            hasSub: false,
            disabled: !getIsExistProductAndBusiness
          },
          {
            node: "D",
            label: "Phương thức vay vốn",
            hasSub: false,
          },
        ]}
      >
        <Routes>
          <Route path="product" element={<ProductInfo />} />
        </Routes>
        <Routes>
          <Route path="need-and-plan" element={<TableLoan />} />
        </Routes>
        <Routes>
          <Route path="pro-and-bus" element={<ProductionAndBusinessActive />} />
        </Routes>
        <Routes>
          <Route path="loan-method" element={<LOANMethod />} />
        </Routes>
      </Steps >
      <Divider className="my-6" />
      {/* <ButtonBar
        className="mb-6"
        onSave={saveLOANApproval}
        onContinue={continueLOANApproval}
      /> */}
      <ButtonBarRole
        hideSave={false}
        hideContinue={false}
        hideDelete={false}
        onBtnMenu={(item) => onSaveMenu(item)}
        disableContinue={false} // check rule continue
        onExit={onExit}
        onContinue={continueLOANApproval}
        onBack={onBack}
        isApply={true}
        className="mb-6"
        positionCode={dataPosition}
      />
      {/* <AttachmentModalLOAN open={isOpen} onClose={handleOpenAttach} /> */}
      {isOpen && <AttachmentModalServices
        open={Boolean(isOpen)}
        onClose={() => setOpenAttachment(false)}
        dataDocs={dataNeedForPlan.docs}
      />}
      <ModalConfirmReverse 
        open={alert}
        onClose={() => setAlert(false)}
        onCancel={handleCancelSave}
        onConfirm={handleConfirmSave}
        labelCancel='Giữ nguyên'
        labelConfirm='Đồng ý thay đổi'
      >
       Bảng phân tích đánh giá phương án đã bị thay đổi, việc thay đổi này sẽ phải bắt buộc phải nhập lại thông tin bên Nhu cầu và Phương án vay vốn !
      </ModalConfirmReverse>
    </Fragment>
  )
}

export default Loan;