import { FC, Fragment, useEffect, useState, memo } from 'react';
import { LegalValidate } from 'views/pages/LOAN/utils/validate';
import { ValidateMessage } from 'views/pages/LOAN/utils/message';
import {
  diffArray,
  generateLOCALUUID,
} from 'utils';
import {
  ILOANNormalStorageIdentity,
  ILOANNormalStorageLegalValidate
} from 'types/models/loan/normal/storage/Legal';
import { SxSelectDisabled } from '../../screens/Normal/Initialize/Legal/style';
import SelectCifIdType from 'views/components/widgets/SelectCifIdType';
import Typography from '@mui/material/Typography';
import Modal from 'views/components/layout/Modal';
import Grid from '@mui/material/Grid';
import Input from 'views/components/base/Input';
import InputDate from 'views/components/base/InputDate';
import Label from 'views/components/base/Label';
import Button from '@mui/material/Button';
import useNotify from 'app/hooks/useNotify';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import ListDataIdentity from './ListDataIdentity';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLOANNormalStorageLegalDeclareIdentity,
  saveLegalBorrower,
  saveLegalCoBorrower,
  saveLegalContact,
  saveLegalCoPayer,
  saveLegalMarriage,
  saveLegalOther,
  saveLegalRelated,
} from 'features/loan/normal/storage/legal/actions';
import { checkExistIdentityDataInCIC, getLoanLegalUseListActive, isCheckPersionUuid } from 'features/loan/normal/storage/legal/selectors';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { DeclareName } from "views/pages/LOAN/utils";
import useStorage from '../../screens/Normal/Initialize/Legal/useStorage';


export interface ModalIdentityProps{
  add?: boolean;
  open?: boolean;
  onClose?(): void;
  onSave?(): void;
  identities?: ILOANNormalStorageIdentity[];
  screen?: string;
}

const generateEmptyIdentity = () => {
  return {
    type: '',
    num: '',
    issuedDate: null,
    expiredDate: null,
    placeOfIssue: '',
    primaryFlag: false,
    uuid: '',
    uuidRemote: generateLOCALUUID(),
  }
}

const ModalIdentity: FC<ModalIdentityProps> = props => {

  const { 
    open = false, 
    add = false, 
    onClose, 
    onSave,
    identities = [], 
    screen = ""
  } = props;

  const params = useParams() as ILOANURLParams;
  const current = DeclareName.indexOf(params["*"]);
  const { allIdentity } = useStorage(screen);

  const isCheckPersion = useSelector(isCheckPersionUuid(screen));
  const activePersionUuid = useSelector(getLoanLegalUseListActive(screen))
  
  const [ CurrentIdentities, setCurrentIdentities ] = useState<ILOANNormalStorageIdentity[]>(identities);
  const [ NewIdentity, setNewIdentity ] = useState<ILOANNormalStorageIdentity>(generateEmptyIdentity());
  const [ DeleteId, setDeleteId ] = useState<ILOANNormalStorageIdentity | null>(null);
  const [ Message, setMessage ] = useState<ILOANNormalStorageLegalValidate>({ valid: true });
  const [ isOpen, setIsOpen ] = useState<boolean>(open);
  const [ isAdd, setIsAdd ] = useState<boolean>(add);
  const [ isEdit, setIsEdit ] = useState(false);
  const [ isDisiableInput, setIsDisiableInput ] = useState<boolean>(true);

  const notify = useNotify();
  const dispatch = useDispatch();

  useEffect(() => {
    open === isOpen || setIsOpen(open);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ open ]);

  useEffect(() => {
    add === isAdd || setIsAdd(add);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ add ]);

  useEffect(() => {
    diffArray(identities, CurrentIdentities) && setCurrentIdentities(identities);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ identities, isOpen ]);

  const changeType = (value: string) => setNewIdentity({ ...NewIdentity, type: value });
  const changeNum = (value: string) => setNewIdentity({ ...NewIdentity, num: value });
  const changeIssued = (value: number | null) => setNewIdentity({ ...NewIdentity, issuedDate: value });
  const changeExpired = (value: number | null) => setNewIdentity({ ...NewIdentity,  expiredDate: value });
  const changePlace = (value: string) => setNewIdentity({ ...NewIdentity,  placeOfIssue: value });

  const getMessage = (field: string) => {
    if (Message.valid || field !== Message.field) return '';
    const fieldMessage = ValidateMessage[Message.field as keyof typeof ValidateMessage];
    const role = Message.role as string;
    return (fieldMessage ? fieldMessage[role as keyof typeof fieldMessage] : '') ?? '';
  }

  const clickButtonForm = () => {
    setIsDisiableInput(false);
    // if(isEdit){
    //   setMessage({ valid: true });
    //   const validate = LegalValidate.common.identity.group(NewIdentity);
      
    //   const valueIndenNum = allIdentity.map((item)=>{ return item.num });
    //   const checkDuplicateIdentity = valueIndenNum.some((val,idx)=>{
    //     return valueIndenNum.indexOf(NewIdentity.num) !== -1 ? true : false; 
    //   })

    //   if(checkDuplicateIdentity){
    //     notify('Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại', 'warning');
    //     return
    //   }

    //   if (validate.valid){
        
    //     setIsEdit(false);
    //     onSave && onSave();
    //     setNewIdentity(generateEmptyIdentity());

    //     const identityNewData = identities.map(ad => {
    //       if(ad.uuidRemote === NewIdentity.uuidRemote){
    //         ad = NewIdentity
    //         ad.primaryFlag = true
    //       }

    //       return {...ad}
    //     });

    //     dispatch(addLOANNormalStorageLegalDeclareIdentity(identityNewData, {declare : screen, uuid_persion: activePersionUuid}));
    //     setIsDisiableInput(true);
    //   }
    //   else{
    //     setMessage(validate);
    //   }
    // }
  }

  const onHandleChangePrimary = (val: string) => {
    //setIsEdit(false);
    setIsAdd(true);
    const currentDefaut = CurrentIdentities.find(cad => cad.uuidRemote === val);
    if (currentDefaut){
      const newIdentity = [...CurrentIdentities].map(
        (item) => {
          if (item.uuidRemote === val) {
            item = Object.assign(
              {},
              item, 
              {
                ...item, 
                primaryFlag: true
              }
            );
          }
          else {
            item = Object.assign(
              {},
              item, 
              {
                ...item, 
                primaryFlag: false
              }
            );
          }

          return {...item}
        }
      );
  
      setCurrentIdentities(newIdentity);
      const newValue = newIdentity.find(o=>o.uuidRemote === NewIdentity.uuidRemote)
      if(newValue){
        setNewIdentity({...newValue, primaryFlag: false})
      }
      return;
    }
  }

  const onCloseBtn = () => {
    onClose && onClose();
    setIsEdit(false);
    setIsAdd(false);
    setNewIdentity(generateEmptyIdentity());
    setIsDisiableInput(true);
  }

  const callApiUpdateIdentity = () => {
    switch (DeclareName[current]) {
      case 'borrower':
        dispatch(saveLegalBorrower(false));
        break;
      case 'marriage':
        dispatch(saveLegalMarriage(false));
        break;
      case 'co-borrower':
        dispatch(saveLegalCoBorrower(false));
        break;
      case 'co-payer':
        dispatch(saveLegalCoPayer(false));
        break;
      case 'legal-related':
        dispatch(saveLegalRelated(false));
        break;
      case 'contact':
        dispatch(saveLegalContact(false));
        break;
      case 'other':
        dispatch(saveLegalOther(false));
        break;
      default:
        break;
    }
  }

  const validateIdentityForm = () => {
    let isValid = { valid: true, field: '', role: ''};

    const validate = LegalValidate.common.identity.group(NewIdentity, null, CurrentIdentities);

    const valueIndenNumScreenCurrent = identities.find(
      (item)=> item.num === NewIdentity.num && item.uuidRemote === NewIdentity.uuidRemote
    );

    const valueIndenNum = allIdentity.map((item)=>{ return item.num });
    const checkDuplicateIdentity = valueIndenNum.some((val,idx)=>{
      return valueIndenNum.indexOf(NewIdentity.num) !== -1 ? true : false; 
    })

    if(checkDuplicateIdentity && !valueIndenNumScreenCurrent){
      notify('Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại', 'warning');

      return isValid = { valid: false, field: '', role: ''};
    }

    isValid = {
      field: validate?.field ?? "",
      role: validate?.role ?? "",
      valid: validate.valid
    };

    return isValid;
  }

 
  const handleSaveBtn = () => {
    setMessage({ valid: true });
    // case edit
    if (isEdit){
      

      const isValidateFormIdentity = validateIdentityForm();

      if(!isValidateFormIdentity.valid){
        setMessage(isValidateFormIdentity);
        return
      }

      const identityUpdates = CurrentIdentities.map(i => {
        if(i.uuidRemote === NewIdentity.uuidRemote){
          i = {
            ...NewIdentity,
            primaryFlag: i.primaryFlag
          }
        }
        return i
      })
      const today = Date.now()
      const ruleExpiredDate = identityUpdates.some(i=>i.primaryFlag === true && Number(i.expiredDate) < today)
      if(!ruleExpiredDate){
        dispatch(addLOANNormalStorageLegalDeclareIdentity(
          [...identityUpdates],
          {
            declare : screen,
            uuid_persion: activePersionUuid
          }
        ));
  
        /**
         * Nếu persion_uuid đã có thì sẻ call api update form
         * 
         */
        isCheckPersion && callApiUpdateIdentity();
  
        setIsEdit(false);
        setIsDisiableInput(true);
        setNewIdentity(generateEmptyIdentity());
        return
      }else{
        return notify("Ngày hết hạn giấy tờ chính phải lớn hơn ngày hiện tại", "warning") 
      }
    }
    if (!isEdit && !isDisiableInput){
      const isValidateFormIdentity = validateIdentityForm();

      if (isValidateFormIdentity.valid){
        setIsEdit(false);
        if(identities?.length === 0){
          dispatch(addLOANNormalStorageLegalDeclareIdentity([
            ...identities, 
            {
              ...NewIdentity, 
              // uuid:"",
              // uuidRemote: NewIdentity.uuidRemote.length === 0 ?  generateLOCALUUID() : NewIdentity.uuid,
              primaryFlag: true
            }
          ], {declare : screen, uuid_persion: activePersionUuid}));
  
          setNewIdentity(generateEmptyIdentity());
  
          setIsDisiableInput(true);
          onSave && onSave();
          notify("Lưu giấy tờ định danh thành công", "success")
        }
        else{

          dispatch(addLOANNormalStorageLegalDeclareIdentity([
            ...identities, 
            {
              ...NewIdentity, 
              uuid:"",
              uuidRemote: NewIdentity.uuidRemote.length === 0 ?  generateLOCALUUID() : NewIdentity.uuidRemote,
            }
          ], {declare : screen, uuid_persion: activePersionUuid}));
          setNewIdentity(generateEmptyIdentity());
          setIsDisiableInput(true);
          onSave && onSave();
          notify("Lưu giấy tờ định danh thành công", "success")
        }
        /**
         * Nếu persion_uuid đã có thì sẻ call api update form
         * 
         */
        isCheckPersion && callApiUpdateIdentity();
      }
      else {
        setMessage(isValidateFormIdentity);
      }
    }
    else {
      const today = Date.now()
      const ruleExpiredDate = CurrentIdentities.some(i=>i.primaryFlag === true && Number(i.expiredDate) < today)
      if(!ruleExpiredDate){
        setNewIdentity(generateEmptyIdentity());
        dispatch(addLOANNormalStorageLegalDeclareIdentity([...CurrentIdentities], { declare: screen, uuid_persion: activePersionUuid }))
        if (!isCheckPersion) {
          notify("Lưu giấy tờ định danh thành công", "success")
        }
        else {
          callApiUpdateIdentity();
        }
      }else{
          return notify("Ngày hết hạn giấy tờ chính phải lớn hơn ngày hiện tại", "warning") 
      }
    }
  }


  const onHandleDelete = (val: string) => {
    const currentDefaut = CurrentIdentities.find(cad => cad.uuidRemote === val);
    if (currentDefaut){
      setDeleteId(currentDefaut);
    }
  }

  const onCloseDelelte = () => setDeleteId(null);
  
  const CheckExistIdentityDataInCIC = useSelector(checkExistIdentityDataInCIC(screen, activePersionUuid, DeleteId?.num ?? ""))
  
  const onConfirmDelete = () => {
    if(DeleteId){
      if(CheckExistIdentityDataInCIC){
        notify("Tồn tại thông tin CIC của giấy tờ định danh này", "error")
        setDeleteId(null);
      }
      else {
        const newIdentity = CurrentIdentities.filter(
          cdd => cdd.uuidRemote !== DeleteId.uuidRemote
        );
        
        // notify("Xóa giấy tờ định danh thành công", "success")
        setCurrentIdentities(newIdentity);
        setDeleteId(null);
        dispatch(addLOANNormalStorageLegalDeclareIdentity(newIdentity ,{declare : screen, uuid_persion: activePersionUuid}));
        /**
         * Nếu persion_uuid đã có thì sẻ call api update form
         * 
         */
        isCheckPersion && callApiUpdateIdentity();
      }
    }
    else {
      notify("Xóa giấy tờ định danh thất bại", "error")
    }
  }

  const onHandleEdit = (val: string) => {
    
    const currentDefaut = [...CurrentIdentities].find(ci => ci.uuidRemote === val);

    if(currentDefaut){
      setIsAdd(true);
      setMessage({valid: true});
      setIsEdit(true);
      setIsDisiableInput(false);
      setNewIdentity(currentDefaut);
    }
  }

  const FormAdd = () => {
    return (
      <Fragment>
        <Typography variant="h5" component="div" className="text-upper text-primary font-medium text-18 pb-3">
          Thêm mới giấy tờ định danh
        </Typography>
        <Grid container spacing={ 3 }>
          <Grid item xl={ 4 }>
            <SelectCifIdType
              label="1. Loại giấy tờ"
              required
              onChange={ changeType }
              value={ NewIdentity.type }
              message={ getMessage('identityType') }
              disabled={isDisiableInput}
              sx={SxSelectDisabled}
            />
          </Grid>
          <Grid item xl={ 4 }>
            <Input 
              label="2. Số định danh" 
              required 
              onDebounce={ changeNum }
              value={ NewIdentity.num }
              message={ getMessage('identityNum') }
              disabled={isDisiableInput}
              type={ NewIdentity.type === 'PASSPORT' ? 'text' : 'number' }
            />
          </Grid>
          <Grid item xl={ 4 }>
            <InputDate 
              label="3. Ngày cấp" 
              required 
              onChange={ changeIssued }
              value={ NewIdentity.issuedDate }
              message={ getMessage('identityIssuedDate') }
              disabled={isDisiableInput}
            />
          </Grid>
        </Grid>
        <Grid container spacing={ 3 } className="mt-0 mb-6">
          <Grid item xl={ 4 }>
            <InputDate 
              label="4. Ngày hết hạn" 
              required= { NewIdentity.primaryFlag }
              onChange={ changeExpired }
              value={ NewIdentity.expiredDate }
              message={ getMessage('identityExpiredDate') }
              disabled={isDisiableInput}
            />
          </Grid>
          <Grid item xl={ 4 }>
            <Input 
              label="5. Nơi cấp" 
              required 
              onChange={ changePlace }
              value={ NewIdentity.placeOfIssue }
              message={ getMessage('identityPlaceOfIssued') }
              disabled={isDisiableInput}
            />
          </Grid>
          <Grid item xl={ 4 }>
            <Label className="block mb-2">{ ' ' }</Label>
            <Button 
              variant="contained" 
              sx={{ borderRadius: 0 }}
              onClick={ clickButtonForm }
              disabled={!isDisiableInput}
            >
              Thêm mới
            </Button>
          </Grid>
        </Grid>
      </Fragment>
    )
  }

  return <Fragment>
    <Modal 
      open={ isOpen } 
      onClose={ onCloseBtn } 
      isStatic 
      sx={{ 
        '& .MuiPaper-root': { 
          minWidth: '60%',
          position: 'relative' ,
          borderRadius: 0
        },
      }}
      footer={
        isAdd ? 
        <Box className="pt-2 pb-2 pr-4">
          <Button
            variant="contained"
            color="error"
            className={`mr-3`}
            style={{ borderRadius: 'unset', width: '99px' }}
            onClick={onCloseBtn}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: 'unset', width: '99px' }}
            onClick={handleSaveBtn}
          >
            Lưu
          </Button>
        </Box> 
        :
        null
      }
    >
      <IconButton 
        onClick={ onCloseBtn } 
        color="error" 
        sx={{ position: 'absolute', right: '0.8rem', top: '0.5rem' }}
      >
        <CloseIcon />
      </IconButton>

      {
        isAdd && FormAdd()
      }

      <ListDataIdentity 
        dataIdentity={CurrentIdentities}
        onChanePrimary={(val) => onHandleChangePrimary(val)}
        onDelete={(val) => onHandleDelete(val)}
        onEdit={(val) => onHandleEdit(val)}
      />

    </Modal>
    <ModalConfirm open={ DeleteId !== null } onClose={ onCloseDelelte } onConfirm={ onConfirmDelete }>
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc muốn xoá giấy tờ định danh?
      </Box>
    </ModalConfirm>
  </Fragment>
}

export default memo(ModalIdentity);