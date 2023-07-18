import { FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import ICRTargets from './Targets';
import ICRResults from './Results';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { saveLOANApprovalICR } from 'features/loan/normal/storageApproval/icr/actions';
import useBackdrop from 'app/hooks/useBackdrop';
import { fetchDataGuideState } from 'features/loan/normal';
import { useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { ETypeButton, ETypeButtonBarRole } from 'features/loan/normal/storageControl/case';
import ButtonBarRole from 'views/components/layout/ButtonBarRole';
import { callApprovalApprove, callControlComfirm, callDisApproved, callDisConfirm } from 'features/loan/normal/storageControl/action';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';

const InternalCreditRating: FC = () => {
  const { showBackdrop } = useBackdrop()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const params = useParams() as ILOANURLParams;
  const los_id = useSelector(getLOANNormalLOSId)

  const handleSaveICR = () => {
    showBackdrop()
    dispatch(saveLOANApprovalICR(''))
  }

  useEffect(() => {
    params.stage === "appraisal-approval" && dispatch(fetchDataGuideState({ los_id, position: ETypeButtonBarRole.LOAN_S2_ICR }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']])


  const onSaveMenu = (item: string) => {
    switch (item) {
      case ETypeButton.appraise: // phê duyệt
        handleSaveICR();
        break;
      case ETypeButton.confirm:
        showBackdrop(true)
        dispatch(callControlComfirm({ position: ETypeButtonBarRole.LOAN_S2_ICR, title: "" }));
        break;
      case ETypeButton.approve:
        showBackdrop(true)
        dispatch(callApprovalApprove({ position: ETypeButtonBarRole.LOAN_S2_ICR, title: "" }));
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true)
        dispatch(callDisConfirm({ title: "", position: ETypeButtonBarRole.LOAN_S2_ICR }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true)
        dispatch(callDisApproved({ title: "", position: ETypeButtonBarRole.LOAN_S2_ICR }));
        break;
    }
  }

  const onContinue = () => {
    navigate(`/loan/normal/appraisal-approval/${params.id}/dedupe-blacklist/dedupe`);
    return;
   }
  const onExit = () => { 
    navigate("/");
  }
  const onBack = () => {
    navigate(`/loan/normal/appraisal-approval/${params.id}/other/approval-risk`);
    return;
   }

  return <Box className="mt-6">
    <ICRTargets />
    <ICRResults />
    <Divider className="my-6" />
    <ButtonBarRole
      hideSave={false}
      hideContinue={false}
      hideDelete={false}
      isApply={true}
      onBtnMenu={(item) => onSaveMenu(item)}
      disableContinue={false} // check rule continue
      onExit={onExit}
      onContinue={onContinue}
      onBack={onBack}
      className="mb-6"
      positionCode={ETypeButtonBarRole.LOAN_S2_ICR}
    />
    {/* <ButtonBar onSave={handleSaveICR} className="mb-6" /> */}
  </Box>

}

export default InternalCreditRating;