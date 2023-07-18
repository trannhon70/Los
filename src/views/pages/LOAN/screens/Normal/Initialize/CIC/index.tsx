import { Box, Divider } from '@mui/material';
import useBackdrop from 'app/hooks/useBackdrop';
import DevToolLOANNormalInitPanel from "dev_tool/modules/loan/normal/init/PannelFill";
import { fetchDataGuideState } from 'features/loan/normal';
import {
  deleteDataCreditActiveBtnBar, fetchDataCICAfterSave, handleContinueCIC,
  saveLOANNormalCIC, setCICDeclareActive, setCICDeclarePosition,
  setCICOrgan
} from 'features/loan/normal/storage/cic/actions';
import {
  getCompleteCICStep,
  getLegalExistData,
  getLOANNormalStorageCICDeclare,
  getLOANNormalStorageCICPosition
} from 'features/loan/normal/storage/cic/selectors';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';
import { callApprovalApprove, callControlComfirm, callDisApproved, callDisConfirm } from 'features/loan/normal/storageControl/action';
import { ETypeButton, ETypeButtonBarRole } from 'features/loan/normal/storageControl/case';
import { generateTypeParams } from 'features/loan/normal/storageGuide/generateTypeStateGuide';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { ICICDeclareCompleteCheck, ICICOrganCompleteCheck, ILOANNormalStorageCICOther } from 'types/models/loan/normal/storage/CIC';
import ButtonBarRole from "views/components/layout/ButtonBarRole";
import ModalConfirm from 'views/components/layout/ModalConfirm';
import Steps from 'views/components/layout/Steps';
import { cicOrganRouter, cicRouterNormal, stageName } from 'views/pages/LOAN/utils';
import RatingsReview from './Form/RatingsReview';
import CICMain from './Main';
import { CICSteps } from './style';

const CIC: FC = () => {

  const params = useParams() as ILOANURLParams;
  const { showBackdrop } = useBackdrop();


  const organName = params['*'].split('/')[0]; // other/scb

  const declare = params['*'].split('/')[1]; //declare
  const dispatch = useDispatch();

  const current = cicOrganRouter.indexOf(organName);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const lstEnableDeclareLegal = useSelector(getLegalExistData);
  const position = useSelector(getLOANNormalStorageCICPosition(organName as keyof ILOANNormalStorageCICOther, declare));
  const userList = useSelector(getLOANNormalStorageCICDeclare(declare))
  const completeCICStep: ICICOrganCompleteCheck = useSelector(getCompleteCICStep)
  const los_id = useSelector(getLOANNormalLOSId)

  const getCompleteCICOrganStep = (data: ICICDeclareCompleteCheck) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [key, value] of Object.entries(data)) {
      if (value) return true;
    }

    return false
  }

  const navigate = useNavigate();
  const convertDeclareUrl = (declare: string) => {
    switch (declare) {
      case "borrower":
        return "BORROWER";
      case "marriage":
        return "MARRIAGE";
      case "co-brw":
        return "CO_BRW";
      case "co-payer":
        return "CO_PAYER";
      case "law-rlt":
        return "LAW_RLT";
      case "other":
        return "OTHER";
      default:
        return "";
    }
  }

  useEffect(() => {
    if (params.stage === stageName[0]) {
      dispatch(setCICOrgan(organName))

      if (organName === 'other') {
        dispatch(setCICDeclareActive(declare, organName))
      }
      if (convertDeclareUrl(declare) !== '' && !lstEnableDeclareLegal.includes(convertDeclareUrl(declare))) {
        navigate(`/loan/normal/init/${params.id}/cic/${organName}/borrower`);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organName, declare])

  useEffect(()=> {
    if(organName === "rating-review"){
      dispatch(fetchDataCICAfterSave(true))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[organName])

  const beforeChange = (_: number, next: number) => {
    const organ = cicOrganRouter[next];
    if (organ === cicOrganRouter[1]) {
      navigate(`/loan/normal/init/${params.id}/cic/${organ}`);
    } else {
      navigate(`/loan/normal/init/${params.id}/cic/${organ}/borrower`);
    }
    return true;
  }

  const onDelete = () => {
    setIsDelete(!isDelete);
  }

  const dataPosition = generateTypeParams(`cic/${params['*']}`) ?? ""
  const ruleDisabled = useSelector(getRuleDisbled);


  useEffect(() => {
    dispatch(fetchDataGuideState({ los_id, position: dataPosition }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']])

  const onSave = () => {
    dispatch(saveLOANNormalCIC(true, { organ: organName, position: dataPosition }))
  };

  const onExit = () => navigate(`/`);

  const onContinue = () => {
    const currentDeclare = cicRouterNormal.indexOf(declare);
    dispatch(handleContinueCIC(currentDeclare, { organ: organName, position: dataPosition }));
  }

  const onBack = () => {
    const positionActiveIndex = userList.findIndex(e => e.uuid === position)

    if (positionActiveIndex > 0) {
      dispatch(setCICDeclarePosition(userList[positionActiveIndex - 1].uuid, {
        organActive: organName as keyof ILOANNormalStorageCICOther,
        declareActive: declare,
      }))
      return;
    }

    if (current === 1) {
      for (let index = cicRouterNormal.length - 1; index > -1; index--) {
        if (lstEnableDeclareLegal.includes(convertDeclareUrl(cicRouterNormal[index]))) {
          navigate(`/loan/normal/init/${params.id}/cic/${cicOrganRouter[0]}/${cicRouterNormal[index]}`);
          return;
        }
      }
    }
    else {
      const currentDeclare = cicRouterNormal.indexOf(declare);
      for (let index = currentDeclare - 1; index > -1; index--) {
        if (lstEnableDeclareLegal.includes(convertDeclareUrl(cicRouterNormal[index]))) {
          navigate(`/loan/normal/init/${params.id}/cic/${cicOrganRouter[current]}/${cicRouterNormal[index]}`);
          return;
        }
      }
      // if (current === 1) {
      //   for (let index = cicRouterNormal.length - 1; index > -1; index--) {
      //     if (lstEnableDeclareLegal.includes(convertDeclareUrl(cicRouterNormal[index]))) {
      //       navigate(`/loan/normal/init/${params.id}/cic/${cicOrganRouter[current - 1]}/${cicRouterNormal[index]}`);
      //       return;
      //     }
      //   }
      // }
      // else {
        navigate(`/loan/normal/init/${params.id}/legal/borrower`);
        return;
      // }
    }
  };

  const onConfirmDelete = () => {
    dispatch(deleteDataCreditActiveBtnBar());
    setIsDelete(!isDelete);
  }


  const getDataPosition = () => {
    let position = "";
    if (organName === "other") {
      switch (declare) {
        case "borrower":
          position = ETypeButtonBarRole.CIC_OTHER_BORROWER;
          break;
        case "marriage":
          position = ETypeButtonBarRole.CIC_OTHER_MARRIAGE;
          break;
        case "co-brw":
          position = ETypeButtonBarRole.CIC_OTHER_COBORROWER;
          break;
        case "co-payer":
          position = ETypeButtonBarRole.CIC_OTHER_COPAYER;
          break;
        case "law-rlt":
          position = ETypeButtonBarRole.CIC_OTHER_RELATED;
          break;
        case "other":
          position = ETypeButtonBarRole.CIC_OTHER_OTHER;
          break;
      }
    }
    if (organName === "scb") {
      switch (declare) {
        case "borrower":
          position = ETypeButtonBarRole.CIC_SCB_BORROWER;
          break;
        case "marriage":
          position = ETypeButtonBarRole.CIC_SCB_MARRIAGE;
          break;
        case "co-brw":
          position = ETypeButtonBarRole.CIC_SCB_COBORROWER;
          break;
        case "co-payer":
          position = ETypeButtonBarRole.CIC_SCB_COPAYER;
          break;
        case "law-rlt":
          position = ETypeButtonBarRole.CIC_SCB_RELATED;
          break;
        case "other":
          position = ETypeButtonBarRole.CIC_SCB_OTHER;
          break;
      }
    }
    if(organName === "rating-review"){
      position = ETypeButtonBarRole.CIC_U3_SR
    }
    return position;
  }

  const onSaveMenu = (item: string) => {
    switch (item) {
      case ETypeButton.confirm:
        showBackdrop(true);
        dispatch(callControlComfirm({ title: "", position: getDataPosition() }));
        break;
      case ETypeButton.approve:
        showBackdrop(true);
        dispatch(callApprovalApprove({ title: "", position: getDataPosition() }));
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true);
        dispatch(callDisConfirm({ title: "", position: getDataPosition() }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true);
        dispatch(callDisApproved({ title: "", position: getDataPosition() }));
        break;
      case ETypeButton.save:
        onSave();
        break;
    }
  };

  return (
    <Fragment>
      <Steps
        current={!!~current ? current : 0}
        onChange={beforeChange}
        className="my-6 mscb-loan-card-cic"
        sx={CICSteps}
        steps={[
          {
            node: "A",
            label: "THÔNG TIN CIC",
            hasSub: true,
            completed: getCompleteCICOrganStep(completeCICStep.other)
          },
          // {
          //   node: "B",
          //   label: "Khoản vay hiện hữu tại SCB",
          //   hasSub: true,
          //   completed: getCompleteCICOrganStep(completeCICStep.scb)
          // },
          {
            node: "B",
            label: "Tổng hợp điểm xếp hạng",
            hasSub: false,
            completed: getCompleteCICOrganStep(completeCICStep.other) || getCompleteCICOrganStep(completeCICStep.scb)
          },
        ]}
      >
        <Routes>
          <Route path=":organ/*" element={<CICMain organType={'other'} />} />
        </Routes>
        {/* <Routes>
          <Route path=":organ/*" element={<CICMain organType={'scb'} />} />
        </Routes> */}
        <Routes>
          <Route path=":organ/*" element={<RatingsReview />} />
        </Routes>
      </Steps >
      {organName !== "rating-review" && <Divider className="my-6" />}
      {/* <ButtonBar
        className="mb-6"
        onDelete={onDelete}
        onSave={onSave}
        onExit={onExit}
        onContinue={onContinue}
        onBack={onBack}
      /> */}

      <ButtonBarRole
        className="mb-6"
        onSave={onSave}
        onBack={onBack}
        onExit={onExit}
        isApply={true}
        hideDelete={!ruleDisabled}
        hideSave={false}
        hideContinue={false}
        onDelete={onDelete}
        disableDelete={current === 2}
        onContinue={onContinue}
        positionCode={dataPosition}
        onBtnMenu={(val) => onSaveMenu(val)}
      />

      <ModalConfirm open={isDelete} onClose={onDelete} onConfirm={onConfirmDelete}>
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc muốn xoá tổ chức tín dụng này?
        </Box>
        <Box className="text-center">
          Nếu bạn xóa dữ liệu sẽ không thể khôi phục
        </Box>
      </ModalConfirm>


      <DevToolLOANNormalInitPanel/>
    </Fragment>
  );
}

export default CIC;