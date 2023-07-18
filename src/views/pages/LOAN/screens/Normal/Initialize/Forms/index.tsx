import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useBackdrop from 'app/hooks/useBackdrop';
import useNotify from 'app/hooks/useNotify';
import clsx from 'clsx';
import { fetchDataGuideState } from 'features/loan/normal';
import { getCollateralIgnore } from 'features/loan/normal/storage/collateralV2/selector';
import { getInitialCreditTerm, getTemplateLOANNormal, saveLOANNormalStorageCreditTerm } from 'features/loan/normal/storage/forms/actions';
import { getLOANNormalCreditTerm } from 'features/loan/normal/storage/forms/selectors';
import { isExistNormalICR } from 'features/loan/normal/storage/icr/selector';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';
import {
  callApprovalAcceptOfficial,
  callApprovalAcceptUnOfficial,
  callApprovalApprove,
  callApprovalDenyOfficial,
  callApprovalDenyUnOfficial,
  callApprovalReturnControl,
  callColtrolApply,
  callColtrolApprovedOfficial,
  callColtrolClose,
  callControlComfirm,
  callControlReject,
  callControlReturnInit,
  callDisApproved,
  callDisConfirm,
  callInitApply
} from 'features/loan/normal/storageControl/action';
import { ETypeButton, ETypeButtonBarRole } from 'features/loan/normal/storageControl/case';
import {
  checkRoleButtonBar,
  userReturnControl,
  userReturnInit
} from 'features/loan/normal/storageGuide/selector';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ILOANURLParams } from 'types/models/loan';
import { IConditions } from 'types/models/loan/normal/storage/Forms';
import { IApplyLos, IApprovedLos } from 'types/models/loan/normal/storageControl';
import ButtonBarRole from 'views/components/layout/ButtonBarRole';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import FormsMetadata from 'views/pages/LOAN/widgets/Forms/Metadata';
import FormsPDFViewer from 'views/pages/LOAN/widgets/Forms/PDFViewer';
import ModalAcceptOfficial, { IModalAcceptOfficialRef } from 'views/pages/LOAN/widgets/ModalAcceptOfficial';
import ModalApproval, { IModalApprovalRef } from 'views/pages/LOAN/widgets/ModalApproval';
import ModalCheckApprovalConfirm from 'views/pages/LOAN/widgets/ModalCheckApprovalConfirm';
import ModalCheckConfirm from 'views/pages/LOAN/widgets/ModalCheckConfirm';
import ModalCreditTerm from 'views/pages/LOAN/widgets/ModalCreditTerm';
import ModalDecision, { IModalDecisionOfficialRef } from 'views/pages/LOAN/widgets/ModalDecision';
import ModalReturnInit, { IModalReturnInitRef } from 'views/pages/LOAN/widgets/ModalReturnInit';
import Category from './Category';
import formsStyle from './style';

const Forms: FC = () => {

  const classes = formsStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = useNotify();
  const { showBackdrop, closeBackdrop } = useBackdrop();
  const params = useParams() as ILOANURLParams;

  const [isConfim, setIsConfirm] = useState<string | null>(null);
  const [isModalApproval, setIsModalApproval] = useState<boolean>(false);
  const [isModalDecision, setIsModalDecision] = useState<boolean>(false);
  const [isModalAcceptOfficial, setIsModalAcceptOfficial] = useState<boolean>(false);
  const [isModalCheckConfirm, setIsModalCheckConfirm] = useState<boolean>(false);
  const [isModalCheckAprrovalConfirm, setIsModalCheckApprovalConfirm] = useState<boolean>(false);
  const [acceptType, setAcceptType] = useState("")
  const [isUserName, setIsUsername] = useState<string | null>(null);
  const [modalReturnInit, setModalReturnInit] = useState<string | null>(null);
  const [openCreditTermModal, setOpenCreditTermModal] = useState<boolean>(false)

  const [checkConfirm, setCheckConfirm] = useState<boolean>(false)
  const [checkApprovalConfirm, setCheckApprovalConfirm] = useState<boolean>(false)

  const userNameReturnInit = useSelector(userReturnInit);
  const userNameReturnControl = useSelector(userReturnControl);
  const existICRFull = useSelector(isExistNormalICR)
  const checkStateGuide = useSelector(checkRoleButtonBar)
  const ignoreCollateral = useSelector(getCollateralIgnore);
  const creditTermData = useSelector(getLOANNormalCreditTerm) 
  const los_id = useSelector(getLOANNormalLOSId)

  const refModaApprovalRef = useRef<IModalApprovalRef>(null);
  const refModalAcceptOfficial = useRef<IModalAcceptOfficialRef>(null);
  const refModalReturnInit = useRef<IModalReturnInitRef>(null);
  const refModalDecision = useRef<IModalDecisionOfficialRef>(null);

  const dataBodyApply = () => refModaApprovalRef.current?.getValue() as IApplyLos
  const dataBodyReturnInit = () => refModalReturnInit.current?.getValue() as IApplyLos
  const dataBodyModalAcceptOfficial = () => refModalAcceptOfficial.current?.getValue() as IApprovedLos

  const onHandleCloseApproval = () => setIsModalApproval(false);
  const onHandleCloseReturnInnit = () => setModalReturnInit(null);
  const onHandleCloseAcceptOfficial = () => setIsModalAcceptOfficial(false);
  const onHandleCloseModalCheckConfirm = () => setIsModalCheckConfirm(false);
  const onHandleCloseModalCheckApprovalConfirm = () => setIsModalCheckApprovalConfirm(false);
  const onHandleCloseModalDecision = () => setIsModalDecision(false);

  useEffect(() => {
    if(checkConfirm){
      if( checkStateGuide?.is_satisfied === null){
        showBackdrop(true);
      }
      else if(checkStateGuide?.is_satisfied === false){
        closeBackdrop();
        setIsModalCheckConfirm(true);
        setCheckConfirm(false)
        notify("Vui lòng kiểm soát đủ các trang", "warning")
      }
      else if(checkStateGuide?.is_satisfied === true){
        closeBackdrop();
        setCheckConfirm(false)
        setIsModalApproval(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[checkConfirm, checkStateGuide])

  useEffect(() => {
    if(checkApprovalConfirm){
      if( checkStateGuide?.is_satisfied === null){
        showBackdrop(true);
      }
      else if(checkStateGuide?.is_satisfied === false){
        closeBackdrop();
        setIsModalCheckApprovalConfirm(true);
        setCheckApprovalConfirm(false)
        notify("Vui lòng phê duyệt đủ các trang", "warning")
      }
      else if(checkStateGuide?.is_satisfied === true){
        closeBackdrop();
        setCheckApprovalConfirm(false)
        setIsModalDecision(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[checkApprovalConfirm, checkStateGuide])

  useEffect(() => {
    params.stage === "init" &&  dispatch(fetchDataGuideState({ los_id, position: ETypeButtonBarRole.FORM }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params["*"]])

  useEffect(() => {
    if (params.id !== "-") {
      dispatch(getTemplateLOANNormal(params.id ?? ""));
      dispatch(getInitialCreditTerm())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const isDisabledClose = checkStateGuide?.current_state_id === "close"

  const onClickApply = (item: string) => {
    switch (item) {
      case ETypeButton.apply_control:
        existICRFull ? setIsModalApproval(true) : notify("Vui lòng xếp hạng tín dụng nội bộ", "warning")
        break;
      case ETypeButton.approve:
        showBackdrop(true);
        dispatch(callApprovalApprove({ position: ETypeButtonBarRole.FORM, title: "" }));
        break;
      case ETypeButton.confirm:
        showBackdrop(true);
        dispatch(callControlComfirm({ position: ETypeButtonBarRole.FORM, title: "" }));
        break;
      case ETypeButton.close:
        setIsConfirm(ETypeButton.close);
        break;
      case ETypeButton.apply_approve:
          setCheckConfirm(true)
        break;
      case ETypeButton.reject:
        setIsConfirm(ETypeButton.reject);
        break;
      case ETypeButton.return_init:
        setModalReturnInit("RETURN_INIT")
        setIsUsername(userNameReturnInit ?? "")
        break;
      case ETypeButton.deny_unofficial:
        setIsConfirm(ETypeButton.deny_unofficial);
        break;
      case ETypeButton.accept_unofficial:
        setIsConfirm(ETypeButton.accept_unofficial);
        break;
      case ETypeButton.apply_headquarter_official:
        setAcceptType(ETypeButton.apply_headquarter_official)
        setIsModalAcceptOfficial(true);
        break;
      case ETypeButton.apply_headquarter_unofficial:
        setAcceptType(ETypeButton.apply_headquarter_unofficial)
        setIsModalAcceptOfficial(true);
        break;
      case ETypeButton.return_pre_control:
        setModalReturnInit("RETURN_CONTROL")
        setIsUsername(userNameReturnControl ?? "")
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true);
        dispatch(callDisConfirm({ title: "", position: ETypeButtonBarRole.FORM }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true);
        dispatch(callDisApproved({ title: "", position: ETypeButtonBarRole.FORM }));
        break;
    }
  }

  const generaterTitleConfirm = (nameAction: string | null) => {
    let nameDefault: string | null = null;
    switch (nameAction) {
      case ETypeButton.close:
        nameDefault = "Bạn có chắc chắn muốn đóng hồ sơ này"
        break;
      case ETypeButton.reject:
        nameDefault = "Bạn có chắc chắn muốn từ chối hồ sơ này"
        break;
      case ETypeButton.apply:
        nameDefault = "Bạn có chắc chắn muốn trình hồ sơ này"
        break;
      case ETypeButton.accept_unofficial:
        nameDefault = "Bạn có chắc chắn muốn phê duyệt nguyên tắc hồ sơ này"
        break;
      case ETypeButton.accept_official:
        nameDefault = "Bạn có chắc chắn muốn phê duyệt chính thức hồ sơ này"
        break;
      case ETypeButton.deny_official:
        nameDefault = "Bạn có chắc chắn muốn từ chối chính thức hồ sơ này"
        break;
      case ETypeButton.deny_unofficial:
        nameDefault = "Bạn có chắc chắn muốn từ chối nguyên tắc hồ sơ này"
        break;
    }
    return nameDefault;
  }

  const onHanleIgnore = () => { // tạm thời
    if (checkStateGuide?.current_state_group === "CONTROLLER_BRANCH") {
      setIsModalCheckConfirm(false);
      setIsModalApproval(true);
    }
    if (checkStateGuide?.current_state_group === "APPROVER_BRANCH") {
      setIsModalCheckConfirm(false);
      setIsModalAcceptOfficial(true);
    }
    if (checkStateGuide?.current_state_group === "INITIALIZER") {
      setIsModalCheckConfirm(false);
      setIsModalAcceptOfficial(true);
    }
  };

  const onHandleCancelConfirm = () => setIsConfirm(null);
  const onBack = () => navigate(`/loan/normal/init/${params.id}/internal-credit-rating`)

  const onHandleConfirm = () => {
    switch (isConfim) {
      case ETypeButton.close:
        dispatch(callColtrolClose({ title: "", position: ETypeButtonBarRole.FORM }))
        break;
      case ETypeButton.reject:
        dispatch(callControlReject({ title: "", position: ETypeButtonBarRole.FORM }))
        break;
      case ETypeButton.apply: // trình cấp  kiểm soát
        dispatch(callInitApply({ title: "", position: ETypeButtonBarRole.FORM, body: dataBodyApply() }))
        break;
    }
    setIsConfirm(null)
  };

  const onHandleSaveApproval = () => {
    if (!refModaApprovalRef.current?.validate()) {
      setIsModalApproval(true);
      return;
    }
    if (checkStateGuide?.current_state_group === "INITIALIZER") {
      dispatch(callInitApply({ title: "", position: ETypeButtonBarRole.FORM, body: dataBodyApply() }))
      setIsModalApproval(false);
    }
    if (checkStateGuide?.current_state_group === "CONTROLLER_BRANCH") {
      dispatch(callColtrolApply({ title: "", position: ETypeButtonBarRole.FORM, body: dataBodyApply() }))
      setIsModalApproval(false);
    }
  }

  const onHandleSaveReturnInit = () => {
    if (!refModalReturnInit.current?.validate()) {
      setModalReturnInit(null);
      return;
    }
    if (modalReturnInit === "RETURN_INIT") {
      dispatch(callControlReturnInit({ title: "", position: ETypeButtonBarRole.FORM, body: dataBodyReturnInit() }))
      setModalReturnInit(null);
    }
    if (modalReturnInit === "RETURN_CONTROL") {
      dispatch(callApprovalReturnControl({ title: "", position: ETypeButtonBarRole.FORM, body: dataBodyReturnInit() }))
      setModalReturnInit(null);
    }
  }

  const onHandleSaveAcceptOfficial = () => {
    if (!refModalAcceptOfficial.current?.validate()) {
      setIsModalAcceptOfficial(true);
      return;
    }
    dispatch(callColtrolApprovedOfficial({ title: acceptType, position: ETypeButtonBarRole.FORM, body: dataBodyModalAcceptOfficial() }))
    setIsModalAcceptOfficial(false);
  }

  const onHandleSaveDecision = () => {
    const dataDecSion = () => refModalDecision.current?.getValue().optionsCheck
    if(!refModalDecision.current?.validate()){
      return;
    }
    if (!ignoreCollateral && dataDecSion() === "Y"){ // phe duyệt chính thức TSDB KHONG 
      dispatch(callApprovalAcceptOfficial({title:"",position:ETypeButtonBarRole.FORM,body:refModalDecision.current?.getValue()}))
      setIsModalDecision(false);
    }
    else if(!ignoreCollateral && dataDecSion() === "N"){ // từ chối chính thức TSDB KHONG 
      dispatch(callApprovalDenyOfficial({title:"",position:ETypeButtonBarRole.FORM,body:refModalDecision.current?.getValue()}))
      setIsModalDecision(false);
      return
    }
    else if(ignoreCollateral && dataDecSion() === "Y"){ // phe duyệt nguyên tắc TSDB CO 
      dispatch(callApprovalAcceptUnOfficial({title:"",position:ETypeButtonBarRole.FORM,body:refModalDecision.current?.getValue()}))
      setIsModalDecision(false);
      return
    }
    else if(ignoreCollateral && dataDecSion() === "N"){ // từ chối nguyên tắc TSDB CO 
      dispatch(callApprovalDenyUnOfficial({title:"",position:ETypeButtonBarRole.FORM,body:refModalDecision.current?.getValue()}))
      setIsModalDecision(false);
      return
    }
  }

  const onHandleDecision = () => {
    setCheckApprovalConfirm(true)
  }

  const onHandleIgnoreAprroval = () => {
    setIsModalCheckApprovalConfirm(false);
    setIsModalDecision(true)
  }
  
  const handleOpenCreditTermModal = () => {
    setOpenCreditTermModal(true)
  }
  const handleCloseCreditTermModal = () => {
    setOpenCreditTermModal(false)
  }
  const handleSaveCreditTermModal = (data : IConditions, role: string) => {
    dispatch(saveLOANNormalStorageCreditTerm("", {data, role}))
  }
  // const handle
  const onExit = () => {
    navigate(`/`)
  }

  return <Box className={clsx(classes.root, 'mt-6 pb-5')}>
    <Box className="flex justify-between">
      <Category />
      {/* <FormsCategory /> */}
      <FormsPDFViewer />
      <FormsMetadata />
    </Box>
    <Box className='mt-5 relative'>
      {checkStateGuide?.current_state_group !== 'INITIALIZER'  && <Button 
        className={clsx(classes.creditTermBtn, "absolute rounded-0")}
        onClick={handleOpenCreditTermModal}
        >
        Điều kiện CTD
      </Button>}
      <ButtonBarRole
        isApply={false}
        hideContinue={true}
        hideSave={false}
        hideBack={!isDisabledClose}
        hideDelete={isDisabledClose}
        onDecision={onHandleDecision}
        // hideExit={isDisabledClose}
        onExit={onExit}
        positionCode={ETypeButtonBarRole.FORM}
        onBtnMenu={onClickApply}
        onBack={onBack}
      />
    </Box>
    <ModalAcceptOfficial
      open={isModalAcceptOfficial}
      onClose={onHandleCloseAcceptOfficial}
      onSave={onHandleSaveAcceptOfficial}
      ref={refModalAcceptOfficial}
    />
    <ModalApproval   // s1 to s2 
      open={isModalApproval}
      onClose={onHandleCloseApproval}
      onSave={onHandleSaveApproval}
      ref={refModaApprovalRef}
    />
    <ModalCheckConfirm
      open={isModalCheckConfirm}
      onClose={onHandleCloseModalCheckConfirm}
      onSave={onHandleCloseModalCheckConfirm}
      onIgnore={onHanleIgnore}
    />
    <ModalCheckApprovalConfirm
      open={isModalCheckAprrovalConfirm}
      onClose={onHandleCloseModalCheckApprovalConfirm}
      onSave={onHandleCloseModalCheckApprovalConfirm}
      onIgnore={onHandleIgnoreAprroval}
    />
    <ModalReturnInit   // return init and control
      open={Boolean(modalReturnInit)}
      onClose={onHandleCloseReturnInnit}
      onSave={onHandleSaveReturnInit}
      ref={refModalReturnInit}
      userNameReturn={isUserName ?? ""}

    />

    <ModalDecision
      open={isModalDecision}
      ref={refModalDecision}
      onClose={onHandleCloseModalDecision}
      onSave={onHandleSaveDecision}
    />
    <ModalConfirm
      open={isConfim !== null}
      onClose={onHandleCancelConfirm}
      onConfirm={onHandleConfirm}
    >
      {
        (() => {
          const titleConfirm = generaterTitleConfirm(isConfim);
          return (
            <>
              <Box className="text-18 font-medium text-primary text-center">
                {titleConfirm}
              </Box>
              {
                isConfim !== ETypeButton.close &&
                isConfim !== ETypeButton.apply &&
                isConfim !== ETypeButton.accept_unofficial &&
                isConfim !== ETypeButton.accept_official &&
                isConfim !== ETypeButton.deny_official &&
                isConfim !== ETypeButton.deny_unofficial &&
                <Box className="text-14 text-secondary text-center" sx={{ fontStyle: "italic" }}>
                </Box>
              }
            </>
          )
        })()
      }
    </ModalConfirm>
    {
      checkStateGuide?.current_state_group !== 'INITIALIZER' && openCreditTermModal && <ModalCreditTerm 
      data={creditTermData}
      open={openCreditTermModal}
      onClose={handleCloseCreditTermModal}
      onSave={handleSaveCreditTermModal}
      role={checkStateGuide?.current_state_group}
    />
    }
    
  </Box>
}

export default Forms;