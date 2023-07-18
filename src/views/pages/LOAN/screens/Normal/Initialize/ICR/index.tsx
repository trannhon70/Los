import { FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import ICRTargets from './Targets';
import ICRResults from './Results';
import Divider from '@mui/material/Divider';
import { saveLOANNormalICR } from 'features/loan/normal/storage/icr/actions';
import { useDispatch, useSelector } from 'react-redux';
import { checkRoleButtonBar, getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import ButtonBarRole from 'views/components/layout/ButtonBarRole';
import { callControlComfirm, callApprovalApprove, callDisConfirm, callDisApproved, callICRApprove } from 'features/loan/normal/storageControl/action';
import { ETypeButton, ETypeButtonBarRole } from 'features/loan/normal/storageControl/case';
import { useNavigate, useParams } from 'react-router-dom';
import { ILOANURLParams } from 'types/models/loan';
import { fetchDataGuideState } from 'features/loan/normal';
import useBackdrop from 'app/hooks/useBackdrop';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';

const InternalCreditRating: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const params = useParams() as ILOANURLParams;
  const { showBackdrop } = useBackdrop();
  const los_id = useSelector(getLOANNormalLOSId)

  const handleSaveICR = () => {
  showBackdrop(true);
   setTimeout(()=>{
    dispatch(saveLOANNormalICR(''))
   },1000)
  }
  const ruleDisabled = useSelector(getRuleDisbled);

  useEffect(() => {
    dispatch(fetchDataGuideState({ los_id, position: ETypeButtonBarRole.ICR }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']])


  const onSaveMenu = (item: string) => {
    switch (item) {
      case ETypeButton.confirm:
        showBackdrop(true);
        dispatch(callControlComfirm({ title: "", position:  ETypeButtonBarRole.ICR }));
        break;
      case ETypeButton.approve:
        showBackdrop(true);
        // dispatch(callApprovalApprove({ position: ETypeButtonBarRole.ICR, title: "" }));
        dispatch(callICRApprove({position: ETypeButtonBarRole.ICR, type: ETypeButton.approve }))
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true);
        dispatch(callDisConfirm({ title: "", position:  ETypeButtonBarRole.ICR }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true);
        // dispatch(callDisApproved({ title: "", position:  ETypeButtonBarRole.ICR }));
        dispatch(callICRApprove({position: ETypeButtonBarRole.ICR, type: ETypeButton.disapprove }))
        break;
      case ETypeButton.save:
        handleSaveICR();
        break;
    }
  };

  const onBack = () => {
    navigate(`/loan/normal/init/${params.id}/other/exception`);
    return;
  }
  const onExit = () => {
    navigate("/");
  };
  const onContinue = () => {
    !ruleDisabled &&dispatch(saveLOANNormalICR(''));
    navigate(`/loan/normal/init/${params.id}/forms`);
    return;
  };

  const currentStateGuide = useSelector(checkRoleButtonBar)?.current_state_id === undefined;

  return <Box className="mt-6">
    <ICRTargets />
    <ICRResults />
    <Divider className="my-6" />
    <ButtonBarRole
      className="mb-6"
      onSave={handleSaveICR}
      onBack={onBack}
      onContinue={onContinue}
      onExit={onExit}
      isApply={true}
      positionCode={ETypeButtonBarRole.ICR}
      hideContinue={false}
      isNotForm={true}
      hideDelete={!ruleDisabled}
      hideSave={false || currentStateGuide} 
      onBtnMenu={(val) => onSaveMenu(val)}
    />
  </Box>

}

export default InternalCreditRating;