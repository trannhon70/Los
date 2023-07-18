import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import useBackdrop from 'app/hooks/useBackdrop';
import useNotify from 'app/hooks/useNotify';
import { fetchCorrdinatorUserList } from 'features/corrdinator/corrdinatorUser/action';
import { fetchDataGuideState } from 'features/loan/normal';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';
import {
  fetchApprovalAdditional,
  saveAANotice,
  saveAAStatement,
  saveAATemplate,
} from 'features/loan/normal/storageApproval/additionalApproval/actions';
import { getRuleDisabledNotice } from 'features/loan/normal/storageApproval/Other/selectors';
import {
  callApprovalAcceptOfficial,
  callApprovalApprove,
  callApprovalControl1ApplyApproveHQ,
  callApprovalControlToHQ,
  callApprovalDenyOfficial,
  callApprovalReturnControlHQ,
  callApprovalReturnReAppraise,
  callControlComfirm,
  callDisApproved,
  callDisConfirm,
} from 'features/loan/normal/storageControl/action';
import { ETypeButton } from 'features/loan/normal/storageControl/case';
import { getPositionLoanS2Params } from 'features/loan/normal/storageGuide/generateTypeStateGuide';
import { checkRoleButtonBar } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { ILOANURLParams } from 'types/models/loan';
import {
  ApplyControl1,
  IApplyLos,
} from 'types/models/loan/normal/storageControl';
import ButtonBarRole from 'views/components/layout/ButtonBarRole';
import Steps from 'views/components/layout/Steps';
import { AppraisalNormalAA } from 'views/pages/LOAN/utils';
import ModalCheckConfirm from 'views/pages/LOAN/widgets/ModalCheckConfirm';
import ModalDecision, {
  IModalDecisionOfficialRef,
} from 'views/pages/LOAN/widgets/ModalDecision';
import FormComponent from './FormComponent';
import ModalControlHeadquarter, {
  IModalControlHeadquarterRef,
} from './ModalControl/ModalControlHeadquarter';
import ModalReturnHq, { IModalReturnHQRef } from './ModalControl/ModalReturnHq';
import Notice from './Notice';
import ReportPage from './ReportPage';
import AppraisalAddStyle from './style';

const AppraisalAdd: FC = () => {
  const classes = AppraisalAddStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useNotify();
  const { showBackdrop, closeBackdrop } = useBackdrop();

  const params = useParams() as ILOANURLParams;
  const current = AppraisalNormalAA.indexOf(params['*']);
  const dataPosition = getPositionLoanS2Params(`${params['*']}`) ?? '';
  const los_id = useSelector(getLOANNormalLOSId);
  const [isModalControlHead, setIsModalControlHead] = useState<string | null>(
    null
  );
  const ruleDisabledNotice = useSelector(getRuleDisabledNotice);
  const refModalControlHead = useRef<IModalControlHeadquarterRef>(null);
  const refModalReturnHQ = useRef<IModalReturnHQRef>(null);
  const refModalDecision = useRef<IModalDecisionOfficialRef>(null);
  
  const [checkConfirm, setCheckConfirm] = useState<boolean>(false);
  const [checkApprovalConfirm, setCheckApprovalConfirm] =
    useState<boolean>(false);

  const checkStateGuide = useSelector(checkRoleButtonBar);

  const onHandleCloseModalControlHead = () => setIsModalControlHead(null);

  const beforeChange = (_: number, next: number) => {
    const step = AppraisalNormalAA[next];
    navigate(
      `/loan/normal/appraisal-approval/${params.id}/appraisal-add/` + step
    );
    return true;
  };

  useEffect(() => {
    params.stage === 'appraisal-approval' &&
      dispatch(fetchDataGuideState({ los_id, position: dataPosition }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']]);
  useEffect(() => {
    dispatch(fetchApprovalAdditional());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(fetchCorrdinatorUserList({ is_same_branch: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (checkConfirm) {
      if (checkStateGuide?.is_satisfied === null) {
        showBackdrop(true);
      } else if (checkStateGuide?.is_satisfied === false) {
        closeBackdrop();
        setIsModalControlHead('is_satisfied');
        setCheckConfirm(false);
        notify('Vui lòng kiểm soát đủ các trang', 'warning');
      } else if (checkStateGuide?.is_satisfied === true) {
        closeBackdrop();
        setCheckConfirm(false);
        setIsModalControlHead('apply_control_hq');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkConfirm, checkStateGuide]);

  useEffect(() => {
    if (checkApprovalConfirm) {
      if (checkStateGuide?.is_satisfied === null) {
        showBackdrop(true);
      } else if (checkStateGuide?.is_satisfied === false) {
        closeBackdrop();
        setIsModalControlHead('is_satisfied');
        setCheckApprovalConfirm(false);
        notify('Vui lòng phê duyệt đủ các trang', 'warning');
      } else if (checkStateGuide?.is_satisfied === true) {
        closeBackdrop();
        setCheckApprovalConfirm(false);
        setIsModalControlHead('decision');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkApprovalConfirm, checkStateGuide]);

  const onSave = () => {
    if (current === 0) {
      dispatch(saveAAStatement());
    } else if (current === 1) {
      dispatch(saveAANotice());
    } else {
      dispatch(saveAATemplate());
    }
  };

  const onSaveMenu = (item: string) => {
    switch (item) {
      case ETypeButton.appraise:
        onSave();
        break;
      case ETypeButton.apply_control_hq:
        if(checkStateGuide?.current_state_group === 'CONTROLLER_HEADQUARTER'){
          setCheckConfirm(true);
        }
        else {
          setIsModalControlHead('apply_control_hq');
        }
        break;
      case ETypeButton.confirm:
        showBackdrop(true);
        dispatch(callControlComfirm({ position: dataPosition, title: '' }));
        break;
      case ETypeButton.approve:
        showBackdrop(true);
        dispatch(callApprovalApprove({ position: dataPosition, title: '' }));
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true);
        dispatch(callDisConfirm({ title: '', position: dataPosition }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true);
        dispatch(callDisApproved({ title: '', position: dataPosition }));
        break;
      case ETypeButton.return_control_hq:
        setIsModalControlHead('return_control_hq');
        break;
      case ETypeButton.return_reappraise:
        setIsModalControlHead('return_reappraise');
        break;
    }
  };

  const onContinue = () => {
    if (current < AppraisalNormalAA.length - 1) {
      if (current === 0 && ruleDisabledNotice) {
        navigate(
          `/loan/normal/appraisal-approval/${params.id}/appraisal-add/` +
            AppraisalNormalAA[current + 2]
        );
      } else {
        navigate(
          `/loan/normal/appraisal-approval/${params.id}/appraisal-add/` +
            AppraisalNormalAA[current + 1]
        );
      }
    }
  };
  const onBack = () => {
    if (current === 0) {
      navigate(
        `/loan/normal/appraisal-approval/${params.id}/dedupe-blacklist/dedupe`
      );
    } else if (current > 0 && ruleDisabledNotice) {
      navigate(
        `/loan/normal/appraisal-approval/${params.id}/appraisal-add/` +
          AppraisalNormalAA[current - 2]
      );
    } else {
      navigate(
        `/loan/normal/appraisal-approval/${params.id}/appraisal-add/` +
          AppraisalNormalAA[current - 1]
      );
    }
  };
  const onExit = () => navigate(`/`);

  const onSaveApplyControl = () => {
    const dataBodyControlHead = () => refModalControlHead.current?.getValue() as ApplyControl1;
    if (!refModalControlHead.current?.validate()) {
      return;
    }
    if (dataBodyControlHead().approval_level === 'CONTROL') {
      // reappraise to control
      dispatch(
        callApprovalControlToHQ({
          title: '',
          position: dataPosition,
          body: dataBodyControlHead(),
        })
      );
      setIsModalControlHead(null);
      return;
    }
    if (dataBodyControlHead().approval_level === 'APPROVAL') {
      // control to approval
      dispatch(
        callApprovalControl1ApplyApproveHQ({
          title: '',
          position: dataPosition,
          body: dataBodyControlHead(),
        })
      );
      setIsModalControlHead(null);
      return;
    }
  };

  const onSaveReturnHQ = () => {
    const dataBodyReturnHQ = () =>
      refModalReturnHQ.current?.getValue() as IApplyLos;
    if (!refModalReturnHQ.current?.validate()) {
      return;
    }
    if (isModalControlHead === ETypeButton.return_control_hq) {
      dispatch(
        callApprovalReturnControlHQ({
          title: '',
          position: dataPosition,
          body: dataBodyReturnHQ(),
        })
      );
      setIsModalControlHead(null);
      return;
    }
    if (isModalControlHead === ETypeButton.return_reappraise) {
      dispatch(
        callApprovalReturnReAppraise({
          title: '',
          position: dataPosition,
          body: dataBodyReturnHQ(),
        })
      );
      setIsModalControlHead(null);
      return;
    }
  };

  const onHanleIgnore = () => setIsModalControlHead('apply_control_hq');
  const onHandleDecision = () => {
    setCheckApprovalConfirm(true);
  };
  const onHandleSaveDecision = () => {
    const dataDecSion = () => refModalDecision.current?.getValue().optionsCheck;
    if (!refModalDecision.current?.validate()) {
      return;
    }
    if (dataDecSion() === 'Y') {
      // phe duyệt chính thức TSDB KHONG
      dispatch(
        callApprovalAcceptOfficial({
          title: '',
          position: dataPosition,
          body: refModalDecision.current?.getValue(),
        })
      );
      setIsModalControlHead(null);
    } else if (dataDecSion() === 'N') {
      // từ chối chính thức TSDB KHONG
      dispatch(
        callApprovalDenyOfficial({
          title: '',
          position: dataPosition,
          body: refModalDecision.current?.getValue(),
        })
      );
      setIsModalControlHead(null);
      return;
    }
  };

  return (
    <Box>
      <Steps
        className={classes.root}
        current={!!~current ? current : 0}
        onChange={beforeChange}
        steps={[
          { label: 'tờ trình', node: 'A' },
          {
            label: 'thông báo phê duyệt',
            node: 'B',
            disabled: ruleDisabledNotice,
          },
          { label: 'Biểu mẫu', node: 'C' },
        ]}
      >
        <Routes>
          <Route path="report" element={<ReportPage />} />
        </Routes>
        <Routes>
          <Route path="notice" element={<Notice />} />
        </Routes>
        <Routes>
          <Route path="form" element={<FormComponent />} />
        </Routes>
      </Steps>
      <Fragment>
        <Divider className="my-6" />
        <ButtonBarRole
          hideSave={false}
          hideContinue={false}
          hideDelete={false}
          hideDecision={current !== 2}
          onBtnMenu={(item) => onSaveMenu(item)}
          disableContinue={false} // check rule continue
          onExit={onExit}
          onContinue={onContinue}
          onDecision={onHandleDecision}
          onBack={onBack}
          className="my-6"
          positionCode={dataPosition}
        />
      </Fragment>
      <ModalControlHeadquarter // apply to control or to approval
        open={Boolean(isModalControlHead === ETypeButton.apply_control_hq)}
        ref={refModalControlHead}
        onClose={onHandleCloseModalControlHead}
        onSave={onSaveApplyControl}
      />
      <ModalReturnHq // return control HQ and appraise
        open={Boolean(
          isModalControlHead === ETypeButton.return_control_hq ||
            isModalControlHead === ETypeButton.return_reappraise
        )}
        ref={refModalReturnHQ}
        onClose={onHandleCloseModalControlHead}
        onSave={onSaveReturnHQ}
      />

      <ModalCheckConfirm
        open={Boolean(isModalControlHead === 'is_satisfied')}
        onClose={onHandleCloseModalControlHead}
        onSave={onHandleCloseModalControlHead}
        onIgnore={onHanleIgnore}
        currentState={checkStateGuide?.current_state_group}
      />

      <ModalDecision
        open={Boolean(isModalControlHead === 'decision')}
        ref={refModalDecision}
        onClose={onHandleCloseModalControlHead}
        onSave={onHandleSaveDecision}
      />
    </Box>
  );
};

export default AppraisalAdd;
