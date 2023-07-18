import { FC, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { ILOANURLParams } from 'types/models/loan';
import Box from '@mui/material/Box';
import Steps from 'views/components/layout/Steps';
import OtherException from './Exception';
import OtherRisk from './Risk';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { saveLOANNormalOther, saveOtherControl } from 'features/loan/normal/storage/other/action';
import OtherStyle from './style';
import { checkRoleButtonBar, getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import ButtonBarRole from 'views/components/layout/ButtonBarRole';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import { callApprovalApprove, callControlComfirm, callDisApproved, callDisConfirm } from 'features/loan/normal/storageControl/action';
import { ETypeButtonBarRole } from 'features/loan/normal/storageControl/case';
import { generateTypeParams } from 'features/loan/normal/storageGuide/generateTypeStateGuide';
import { fetchDataGuideState } from 'features/loan/normal';
import useBackdrop from 'app/hooks/useBackdrop';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';

const OtherRoute: FC = () => {

  const classes = OtherStyle()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams() as ILOANURLParams;
  const current = ['exception', 'risk'].indexOf(params['*']);
  const ruleDisabled = useSelector(getRuleDisbled);
  const { showBackdrop } = useBackdrop()
  const los_id = useSelector(getLOANNormalLOSId)

  const [isConfimReject, setIsConfirmReject] = useState<boolean>(false);

  const beforeChange = (_: number, next: number) => {
    const step = next === 1 ? 'risk' : 'exception';
    navigate(`/loan/normal/init/${params.id}/other/` + step);
    return true;
  }

  const stepParams = params['*']

  const currentStateGuide = useSelector(checkRoleButtonBar)

  const dataPosition = generateTypeParams(`other/${params['*']}`) ?? ""

  useEffect(() => {
    params.stage === "init" && dispatch(fetchDataGuideState({ los_id , position: dataPosition }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']])

  const onHandleComfirm = (item: string) => {
    showBackdrop(true)
    switch (stepParams) {
      case "exception":
        if (item === "confirm") {
          dispatch(callControlComfirm({ position: ETypeButtonBarRole.OTHER_EXCEPTION, title: "" }));
        }
        if (item === "approve") {
          dispatch(callApprovalApprove({ position: ETypeButtonBarRole.OTHER_EXCEPTION, title: "" }));
        }
        break;
      case "risk":
        if (item === "confirm") {
          // dispatch(callControlComfirm({ position: ETypeButtonBarRole.OTHER_PROFILE, title: "" }));
          dispatch(saveOtherControl({ currentState: currentStateGuide?.current_state_group ?? "", position: ETypeButtonBarRole.OTHER_PROFILE , item}))
        }
        if (item === "approve") {
          // dispatch(callApprovalApprove({ position: ETypeButtonBarRole.OTHER_PROFILE, title: "" }));
          dispatch(saveOtherControl({ currentState: currentStateGuide?.current_state_group ?? "", position: ETypeButtonBarRole.OTHER_PROFILE , item}))
        }
        break;
    }
  }
  const onHandleDisComfirm = (item: string) => {
    showBackdrop(true)
    switch (stepParams) {
      case "exception":
        if (item === "disconfirm") {
          dispatch(callDisConfirm({ title: "", position: dataPosition }));
        }
        if (item === "disapprove") {
          dispatch(callDisApproved({ title: "", position: dataPosition }));
        }
        break;
      case "risk":
        if (item === "disconfirm") {
          // dispatch(callDisConfirm({ title: "", position: dataPosition }));
          dispatch(saveOtherControl({ currentState: currentStateGuide?.current_state_group ?? "", position: ETypeButtonBarRole.OTHER_PROFILE, item}))
        }
        if (item === "disapprove") {
          // dispatch(callDisApproved({ title: "", position: dataPosition }));
          dispatch(saveOtherControl({ currentState: currentStateGuide?.current_state_group ?? "", position: ETypeButtonBarRole.OTHER_PROFILE, item}))
        }
        break;
    }
  }
  const onSave = () => {
    showBackdrop(true)
    dispatch(saveLOANNormalOther(current, dataPosition));
  }

  const onContinue = () => {
    if (current === 0) {
      !ruleDisabled && dispatch(saveLOANNormalOther(current, dataPosition));
      navigate(`/loan/normal/init/${params.id}/other/risk`);
      return;
    }
    if (current === 1) {
      !ruleDisabled && dispatch(saveLOANNormalOther(current, dataPosition));
      navigate(`/loan/normal/init/${params.id}/internal-credit-rating`);
      return;
    }
  }

  const onBack = () => {

    if (current === 0) {
      navigate(`/loan/normal/init/${params.id}/collateral`);
      return;
    }
    if (current === 1) {
      navigate(`/loan/normal/init/${params.id}/other/exception`);
      return;
    }
  }
  const onExit = () => {
    navigate("/");
  };

  const onSaveMenu = (item: string) => {
    switch (item) {
      case 'confirm':
        onHandleComfirm(item);
        break;
      case 'approve':
        onHandleComfirm(item);
        break;
      case 'save':
        onSave()
        break;
      case 'disconfirm':
        onHandleDisComfirm(item)
        break;
      case 'disapprove':
        onHandleDisComfirm(item)
        break;
    }
  }


  const onHandleCancelConfirmReject = () => setIsConfirmReject(false);

  const onHandleConfirmReject = () => setIsConfirmReject(false);


  return <Box>
    <Steps
      className={classes.root}
      current={!!~current ? current : 0}
      onChange={beforeChange}
      steps={[
        { label: 'Thông tin về ngoại lệ', node: 'A' },
        { label: 'Phân tích và biện pháp hạn chế rủi ro', node: 'B' },
      ]}
    >
      <Routes>
        <Route path="exception" element={<OtherException />} />
      </Routes>
      <Routes>
        <Route path="risk" element={<OtherRisk />} />
      </Routes>
    </Steps>
    <Divider className="mb-6" />

    <ButtonBarRole
      className="mb-6"
      onExit={onExit}
      onSave={onSave}
      onBack={onBack}
      positionCode={dataPosition}
      hideContinue={false}
      isApply={true}
      hideSave={false || currentStateGuide?.current_state_id === undefined}
      hideDelete={!ruleDisabled}
      onBtnMenu={(val) => onSaveMenu(val)}
      onContinue={onContinue}
    />


    <ModalConfirm
      open={isConfimReject}
      onClose={onHandleCancelConfirmReject}
      onConfirm={onHandleConfirmReject}
    >
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc chắn muốn hủy hồ sơ này ?
      </Box>
      <Box className="text-14 text-secondary text-center" sx={{ fontStyle: "italic" }}>
        Nếu bạn hủy dữ liệu sẽ không thể khôi phục
      </Box>
    </ModalConfirm>
  </Box>

}

export default OtherRoute;