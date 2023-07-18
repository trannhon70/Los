import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  useEffect,
  useState,
  useLayoutEffect,
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
import { generateLOCALUUID } from "utils";
import { 
  getLOANNormalIdenForm, 
  getLOANNormalIdenAll, 
  getDeclareLegalBorr,
  getLoanLegalBasic,
  validateLOANNormalStorageLegal,
  // getMobieAll,
  // getIdentityAll
} from "features/loan/normal/storage/legal/selectors";
import {
  addLOANNormalStorageLegalDeclareIdentity,
  setLegalValidate
} from "features/loan/normal/storage/legal/actions";
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import useNormalLegalMessage from "app/hooks/useNormalLegalMessage";
import { ValidateLegal } from "features/loan/normal/storage/legal/validate";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import useNotify from "app/hooks/useNotify";


export interface IMarriageIdentityRef{
  validate(): boolean;
}

export interface IMarriageIdentityProps{}

type IMarriageIdentityComponent = ForwardRefRenderFunction<
  IMarriageIdentityRef,
  IMarriageIdentityProps
>


const MarriageIdentity: IMarriageIdentityComponent = (props, ref) => {
  const dispatch = useDispatch();
  const SCREEN = ELegalTypeScreen.MARRIAGE;
  const getMessage = useNormalLegalMessage();
  const notify = useNotify();

  const dataBasic = useSelector(getLoanLegalBasic(SCREEN));
  const IdenData = useSelector(getLOANNormalIdenForm(SCREEN));
  const IdenAllData = useSelector(getLOANNormalIdenAll(SCREEN));
  const disabledForm = useSelector(getDeclareLegalBorr(SCREEN));
  const ruleDisabled = useSelector(getRuleDisbled)
  // const MobieAll = useSelector(getMobieAll(SCREEN));
  // const DataCheckExistIdentity = useSelector(getIdentityAll(SCREEN));

  const [openModal, setOpenModal] = useState(false);
  const [modalAdd, setModalAdd] = useState<boolean | null>(null);
  const [identity, setIdentity] = useState<ILOANNormalStorageIdentity>(generateEmptyIndenty())
  const [identities, setIdentities] = useState<ILOANNormalStorageIdentity[]>(IdenAllData ?? [])

  useEffect(() => {
    setOpenModal(modalAdd !== null);
  }, [modalAdd]);

  useLayoutEffect(() => {
    setIdentities(IdenAllData ?? [])
  }, [IdenAllData])

  useEffect(() => {
    setIdentity(IdenData ?? generateEmptyIndenty())
  }, [IdenData])

  useImperativeHandle(ref, () => ({
    validate: () => isValidate()
  }))

  const validateMessage = (data: ILOANNormalStorageIdentity) => {
    let isValid = { valid: true, field: '', role: '', declare: ""};

    if(
      !dataBasic[0].basic.mobile || 
      dataBasic[0]?.basic?.mobile?.length === 0
    ){
      return isValid = { valid: true, field: '', role: '', declare: ""};
    }

    const validMobie = ValidateLegal.mobile(dataBasic[0]?.basic?.mobile, []);
    if (!validMobie.valid) return isValid = { ...validMobie, declare: SCREEN };

    const vNum = ValidateLegal.num(data.num, data.type, []);
    if (!vNum.valid) return isValid = {...vNum, declare: SCREEN };

    const vIssuedDate = ValidateLegal.issuedDate(
      data.issuedDate === 0 ? null : data.issuedDate
    );
    if (!vIssuedDate.valid) return isValid = {...vIssuedDate, declare: SCREEN };

    const vExpiredDate = ValidateLegal.expiredDate(
      data.expiredDate === 0 ? null : data.expiredDate,
      data.issuedDate
    );
    if (!vExpiredDate.valid) return isValid = {...vExpiredDate, declare: SCREEN };


    const vPlaceOfIssue = ValidateLegal.placeOfIssue(data.placeOfIssue);
    if (!vPlaceOfIssue.valid) return isValid = {...vPlaceOfIssue, declare: SCREEN};
    
    return isValid;
  }

  const isValidate = () => {
    const message = validateMessage(identity);
    dispatch(setLegalValidate(message));

    return message.valid;
  }

  const validateLegal = useSelector(validateLOANNormalStorageLegal(SCREEN))

  const clickList = () => {
    if(dataBasic[0]?.basic?.person_uuid && !ruleDisabled){
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
    if(dataBasic[0]?.basic?.person_uuid){
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
    const idenUp: ILOANNormalStorageIdentity[] = identities.map((item, i) => {
      if(item.primaryFlag){
        setIdentity(identities[i]);
      }
      
      return {...item};
    });

    dispatch(addLOANNormalStorageLegalDeclareIdentity(idenUp, {declare : SCREEN}));
  };
  
  const onHandleChangeIdenLegal = (val: string | number | null, key: keyof ILOANNormalStorageIdentity) =>  {
    let idenNewEdit: ILOANNormalStorageIdentity = identity?.uuid?.length > 0 ? {...identity} : {
      ...identity,
      type: identity.type?.length > 0 ? identity.type : "CIF_ID_TYPE", // Nếu thêm ngoài form mặc định sẻ là CMND
      uuidRemote: identity.uuidRemote?.length > 0 ? identity.uuidRemote : "",
      primaryFlag: true
    };

    let isExistNum: ILOANNormalStorageIdentity | undefined;

    switch (key) {
      case "num":
        isExistNum = identities.find(is => is.num === val?.toString() ?? "");
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
      const idens: ILOANNormalStorageIdentity[] = identities.map(iden => {
        if (iden.uuidRemote === idenNewEdit.uuidRemote){
          iden = idenNewEdit
        }
        return {...iden}
      })
      dispatch(
        addLOANNormalStorageLegalDeclareIdentity(
          idens, 
          {declare : SCREEN}
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
      setIdentity({
        ...isExistNum,
        primaryFlag: true
      });

      const idens: ILOANNormalStorageIdentity[] = identities.map(iden => {
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
            primaryFlag: false
          } 
        }
        return {...iden}
      })

      dispatch(addLOANNormalStorageLegalDeclareIdentity(idens, {declare : SCREEN}));

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

      // const isExixtVlaid: boolean = DataCheckExistIdentity.indexOf(idenNewEdit.num) >= 0 ? true : false;

      // if (isExixtVlaid){
      //   dispatch(setLegalValidate({ 
      //     valid: false, 
      //     field: 'num', 
      //     role: 'exist_valid', 
      //     position: "",
      //     declare: SCREEN 
      //   }));

      //   return
      // }
      
      const idens: ILOANNormalStorageIdentity[] = identities.map(iden => {
        iden = Object.assign(
          {},
          iden, 
          {
            ...iden, 
            primaryFlag: false
          }
        );
        return {...iden}
      })

      dispatch(addLOANNormalStorageLegalDeclareIdentity([...idens, {...idenNewEdit, uuidRemote: generateLOCALUUID()}], {declare : SCREEN}));  
    }
  }
  
  
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
                onDebounce={(val) => onHandleChangeIdenLegal(val, "num")}
                required
                disabled={disabledForm || ruleDisabled}
                message={getMessage(SCREEN, 'num')}
              />
            </Grid>
            <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
              <InputDate
                label="2. Ngày cấp"
                value={identity.issuedDate}
                onChange={(val) => onHandleChangeIdenLegal(val, "issuedDate")}
                required
                disabled={disabledForm || ruleDisabled}
                message={getMessage(SCREEN, 'issuedDate')}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className="mt-0">
            <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
              <InputDate
                label="3. Ngày hết hạn"
                value={identity.expiredDate}
                onChange={(val) => onHandleChangeIdenLegal(val, "expiredDate")}
                required
                disabled={disabledForm || ruleDisabled}
                message={getMessage(SCREEN, 'expiredDate')}
              />
            </Grid>
            <Grid item xl={8} lg={6} md={12} sm={12} xs={12}>
              <Input
                label="4. Nơi cấp"
                value={identity.placeOfIssue}
                onDebounce={(val) => onHandleChangeIdenLegal(val, "placeOfIssue")}
                required
                disabled={disabledForm || ruleDisabled}
                message={getMessage(SCREEN, 'placeOfIssue')}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className="pt-6 text-right">
          <Button
            variant="contained"
            sx={{ borderRadius: 0, textTransform: "revert", boxShadow: 'unset' }}
            className={ruleDisabled? ' ': "mr-6"}
            onClick={clickList}
            disabled={disabledForm}
          >
            Danh sách
          </Button>
          {
            ruleDisabled ? null :           <Button
            variant="outlined"
            sx={{ borderRadius: 0, textTransform: "revert", boxShadow: '0 3px 6px 0 rgba(24, 37, 170, 0.2)' }}
            startIcon={<AddIcon />}
            onClick={clickAddIdentity}
            disabled={disabledForm}
          >
            Thêm giấy tờ định danh
          </Button>
          }
        </Box>
      </Box>
      <ModalIdentity
        open={openModal}
        add={!!modalAdd}
        identities={identities}
        onClose={onClose}
        screen={SCREEN}
      />
    </CardInside>
  );
};

export default forwardRef(MarriageIdentity);
