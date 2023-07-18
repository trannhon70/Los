import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  useEffect,
  useState,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef
} from "react";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";
import ModalIdentity from "views/pages/LOAN/widgets/ModalIdentity";
import { ILOANNormalStorageIdentity } from "types/models/loan/normal/storage/Legal";
import { generateEmptyIndenty } from "views/pages/LOAN/utils";
import { useDispatch, useSelector } from 'react-redux';
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import { 
  getDeclareLegalBorr,
  getLoanLegalUseListActive, 
  getLoanLegalUseListData, 
  getLOANNormalIdenAll,
  getLOANNormalIdenForm, 
  validateLOANNormalStorageLegal
} from "features/loan/normal/storage/legal/selectors";
import {
  addLOANNormalStorageLegalDeclareIdentity,
  setLegalValidate
} from "features/loan/normal/storage/legal/actions";
import { generateUUID } from "utils";
import { ValidateLegal } from "features/loan/normal/storage/legal/validate";
import useNormalLegalMessage from "app/hooks/useNormalLegalMessage";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import useNotify from "app/hooks/useNotify";

export interface IOtherIdentityRef{
  validate(): boolean;
}

export interface IOtherIdentityProps{}

type TOtherIdentityComponent = ForwardRefRenderFunction<
  IOtherIdentityRef,
  IOtherIdentityProps
>

const OtherIdentity: TOtherIdentityComponent = (props, ref) => {

  const dispatch = useDispatch();
  const getMessage = useNormalLegalMessage(); 
  const SCREEN = ELegalTypeScreen.OTHER;
  const notify = useNotify();

  const activePersionUuid = useSelector(getLoanLegalUseListActive(SCREEN));
  const IdenData = useSelector(getLOANNormalIdenForm(SCREEN, activePersionUuid));
  const IdenAllData = useSelector(getLOANNormalIdenAll(SCREEN, activePersionUuid));
  const dataUseList = useSelector(getLoanLegalUseListData(SCREEN, activePersionUuid));
  const ruleDisabled = useSelector(getRuleDisbled)


  const [openModal, setOpenModal] = useState(false);
  const [modalAdd, setModalAdd] = useState<boolean | null>(null);
  const [identity, setIdentity] = useState<ILOANNormalStorageIdentity>(IdenData ?? generateEmptyIndenty())

  useEffect(() => {
    setOpenModal(modalAdd !== null);
  }, [modalAdd]);

  useEffect(() => {
    if(!IdenData){
      setIdentity(generateEmptyIndenty())
    }
    else{
      if (IdenData?.num !== identity.num){
        setIdentity(IdenData )
      }
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [IdenData, activePersionUuid])

  useImperativeHandle(ref, () => ({
    validate: () => isValidate()
  }))

  const validateMessage = (data: ILOANNormalStorageIdentity) => {
    let isValid = { valid: true, field: '', role: '', declare: "", position: ""};

    const lenghtRelationship = dataUseList?.basic?.relationship ?? "";

    if( lenghtRelationship.length === 0 ){
      return isValid = { 
        valid: true, 
        field: '', 
        role: '', 
        declare: "", 
        position: activePersionUuid
      };
    }

    const vNum = ValidateLegal.num(data.num, "CIF_ID_TYPE", []);
    if (!vNum.valid) return isValid = {...vNum, declare: SCREEN, position: activePersionUuid };

    const vIssuedDate = ValidateLegal.issuedDate(
      data.issuedDate === 0 ? null : data.issuedDate
    );
    if (!vIssuedDate.valid) return isValid = {
      ...vIssuedDate, 
      declare: SCREEN, 
      position: activePersionUuid 
    };

    const vExpiredDate = ValidateLegal.expiredDate(
      data.expiredDate === 0 ? null : data.expiredDate,
      data.issuedDate
    );
    if (!vExpiredDate.valid) return isValid = {
      ...vExpiredDate, 
      declare: SCREEN, 
      position: activePersionUuid 
    };


    const vPlaceOfIssue = ValidateLegal.placeOfIssue(data.placeOfIssue);
    if (!vPlaceOfIssue.valid) return isValid = {
      ...vPlaceOfIssue, 
      declare: SCREEN, 
      position: activePersionUuid 
    };
    
    return isValid;
  }
  
  const isValidate = () => {
    const message = validateMessage(identity);
    dispatch(setLegalValidate(message));

    return message.valid;
  }

  const validateLegal = useSelector(validateLOANNormalStorageLegal(SCREEN))

  const clickList = () => {
    if(dataUseList?.basic?.person_uuid && !ruleDisabled){
      dispatch(setLegalValidate(validateLegal))
      if(validateLegal.valid){
        setModalAdd(false);
      }
      else {
        notify('Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.','error')
      }
    }
    else {
      setModalAdd(false);
    }
    
  };

  const clickAddIdentity = () => {
    if(dataUseList?.basic?.person_uuid){
      dispatch(setLegalValidate(validateLegal))
      if(validateLegal.valid){
        setModalAdd(true);
      }
      else {
        notify('Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.','error')
      }
    }
    else {
      setModalAdd(true);
    }
  };

  const onClose = () => {
    setModalAdd(null);
    const idenUp = IdenAllData?.find(item => item.primaryFlag);

    if (idenUp){
      setIdentity(idenUp);
    }
  };

  const onHandleChangeIdenLegal = (val: string | number | null, key: keyof ILOANNormalStorageIdentity) =>  {
    let idenNewEdit: ILOANNormalStorageIdentity = {
      ...identity,
      type: identity.type?.length > 0 ? identity.type : "CIF_ID_TYPE", // Nếu thêm ngoài form mặc định sẻ là CMND
      uuid:  "",
      uuidRemote: identity.uuidRemote?.length > 0 ? identity.uuidRemote : "",
      primaryFlag: true
    };

    let isExistNum: ILOANNormalStorageIdentity | undefined;

    switch (key) {
      case "num":
        isExistNum = IdenAllData.find(is => is.num === val?.toString() ?? "");
        if (!isExistNum){
          idenNewEdit.num = val?.toString() ?? ""
        }
        break;
      case "expiredDate":
        idenNewEdit.expiredDate = val === null  ? null : +val
        break;
      case "issuedDate":
        idenNewEdit.issuedDate = val === null  ? null : +val
        break;
      case "placeOfIssue":
        idenNewEdit.placeOfIssue = val?.toString() ?? ""
        break;
      default:
        break;
    }

    // Giấy tờ định danh đã có trong danh sách
    if(idenNewEdit.uuidRemote.length > 0){
      const idens: ILOANNormalStorageIdentity[] = IdenAllData.map(iden => {
        if (iden.uuidRemote === idenNewEdit.uuidRemote){
          iden = idenNewEdit
        }
        return {...iden}
      })
      dispatch(
        addLOANNormalStorageLegalDeclareIdentity(
          idens, 
          {
            declare : SCREEN,
            uuid_persion: activePersionUuid
          }
        )
      );  
      return
    }

    /**
     * Nhập dữ liệu từ form
     * Giấy tờ định danh đã có trong danh sách
     * Lấy giấy tờ định danh trong danh sách làm giấy tờ chính
     * 
     */
    if(isExistNum){
      if(idenNewEdit.uuidRemote.length > 0 ){
      setIdentity({
        ...isExistNum,
        primaryFlag: true
      });

      const idens: ILOANNormalStorageIdentity[] = IdenAllData.map(iden => {
        if (iden.uuidRemote === isExistNum?.uuidRemote){
          iden = Object.assign(
            {},
            iden, 
            {
              ...iden, 
              primaryFlag: true
            }
          );
          return {...iden}
        }
        else{
          iden = {
            ...iden,
            primaryFlag: false,
          } 
        }
        return {...iden}
      })

      dispatch(addLOANNormalStorageLegalDeclareIdentity(
        idens, 
        {
          declare : SCREEN,
          uuid_persion: activePersionUuid,
        }
      ));
      }
      return 
    }else{
      setIdentity(idenNewEdit);
    }

    /**
     * Trường hợp giấy tờ định danh nhập từ form
     * Trong danh sách không tồn tại giấy tờ định danh
     * Sẻ thêm vào danh sách và làm giấy tờ chình 
     * => primaryFlag true
     * 
     */
    if (
      idenNewEdit.num.length > 0 &&
      idenNewEdit.expiredDate !== null && idenNewEdit.expiredDate > 0 &&
      idenNewEdit.issuedDate !== null &&  idenNewEdit.issuedDate > 0 &&
      idenNewEdit.placeOfIssue.length > 0
    ){
      const idenPrimary = IdenAllData.find(d => d.primaryFlag);
      if(idenPrimary){
        const idensUpdate: ILOANNormalStorageIdentity[] = IdenAllData.map(iden => {
          if(iden.uuidRemote === idenPrimary.uuidRemote){
            iden = {
              ...iden,
              num: idenNewEdit.num,
              expiredDate: idenNewEdit.expiredDate,
              issuedDate: idenNewEdit.issuedDate,
              placeOfIssue: idenNewEdit.placeOfIssue
            }
          }
          return {...iden}
        })

        dispatch(addLOANNormalStorageLegalDeclareIdentity(
          idensUpdate, 
          {
            declare : SCREEN, 
            uuid_persion: activePersionUuid
          }
        ));  
      }else
      {
      const idens: ILOANNormalStorageIdentity[] = IdenAllData.map(iden => {
        iden = Object.assign(
          {},
          iden, 
          {
            ...iden, 
            primaryFlag: false,
            uuidRemote: generateUUID()
          }
        );
        return {...iden}
      })

      dispatch(addLOANNormalStorageLegalDeclareIdentity(
        [...idens, {...idenNewEdit}], 
        {
          declare : SCREEN, 
          uuid_persion: activePersionUuid 
        }
      ));  
    }
  }
  }
  const disabledForm = useSelector(getDeclareLegalBorr(SCREEN))

  return (
    <CardInside
      title="II. Giấy tờ định danh"
      classBody="h-full p-6"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16"
    >
      <Box className="flex-column h-full justify-between">
        <Box>
          <Grid container spacing={3}>
            <Grid item xl={8} lg={6} md={12} sm={12} xs={12}>
              <Input
                label="1. Số CMND/CCCD/Hộ chiếu"
                value={identity.num}
                required
                onDebounce={(val) => onHandleChangeIdenLegal(val, "num")}
                disabled={disabledForm || !activePersionUuid || ruleDisabled}
                message={getMessage(SCREEN, 'num', { position: dataUseList?.uuidActiveLocal ?? "" })}
              />
            </Grid>
            <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
              <InputDate
                label="2. Ngày cấp"
                value={identity.issuedDate}
                required
                onChange={(val) => onHandleChangeIdenLegal(val, "issuedDate")}
                disabled={disabledForm || !activePersionUuid || ruleDisabled}
                message={getMessage(SCREEN, 'issuedDate', { position: dataUseList?.uuidActiveLocal ?? "" })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className="mt-0">
            <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
              <InputDate
                label="3. Ngày hết hạn"
                value={identity.expiredDate}
                required
                onChange={(val) => onHandleChangeIdenLegal(val, "expiredDate")}
                disabled={disabledForm || !activePersionUuid || ruleDisabled}
                message={getMessage(SCREEN, 'expiredDate', { position: dataUseList?.uuidActiveLocal ?? "" })}
              />
            </Grid>
            <Grid item xl={8} lg={6} md={12} sm={12} xs={12}>
              <Input
                label="4. Nơi cấp"
                value={identity.placeOfIssue}
                required
                disabled={disabledForm || !activePersionUuid || ruleDisabled}
                onDebounce={(val) => onHandleChangeIdenLegal(val, "placeOfIssue")}
                message={getMessage(SCREEN, 'placeOfIssue', { position: dataUseList?.uuidActiveLocal ?? "" })}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className="pt-6 text-right">
          <Button
            variant="contained"
            sx={{ borderRadius: 0, textTransform: "revert", boxShadow: 'unset' }}
            className={ruleDisabled ? '' : "mr-6"}
            onClick={clickList}
            disabled={disabledForm || !activePersionUuid}
          >
            Danh sách
          </Button>
          {
            ruleDisabled ? null :  <Button
            variant="outlined"
            sx={{ borderRadius: 0, textTransform: "revert", boxShadow: '0 3px 6px 0 rgba(24, 37, 170, 0.2)' }}
            startIcon={<AddIcon />}
            onClick={clickAddIdentity}
            disabled={disabledForm || !activePersionUuid}
          >
            Thêm giấy tờ định danh
          </Button>
          }
        </Box>
      </Box>

      <ModalIdentity
        open={openModal}
        add={!!modalAdd}
        identities={IdenAllData ?? []}
        onClose={onClose}
        screen={SCREEN}
      />
    </CardInside>
  );
};

export default forwardRef(OtherIdentity);
