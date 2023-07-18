import { FC, Fragment, useEffect, useState } from 'react';
import { LegalValidate } from 'views/pages/LOAN/utils/validate';
import { ValidateMessage } from 'views/pages/LOAN/utils/message';
import { diffArray } from 'utils';
import { DeclareName, generateEmptyAddress } from 'views/pages/LOAN/utils';
import {
  ILOANNormalStorageAddress,
  ILOANNormalStorageLegalDeclareAddress,
  ILOANNormalStorageLegalValidate 
} from 'types/models/loan/normal/storage/Legal';
import { generateUUID } from "utils";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Input from 'views/components/base/Input';
import Label from 'views/components/base/Label';
import Modal from 'views/components/layout/Modal';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import SelectAddressType from '../../../../components/widgets/SelectAddressType';
import SelectLocation, { SelectLocationValue } from 'views/components/widgets/SelectLocation';
import { SxSelectDisabled } from '../../screens/Normal/Initialize/Legal/style';
import ListDataAddress from './LIstDataAdress';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveLegalBorrower,
  saveLegalCoBorrower,
  saveLegalContact,
  saveLegalCoPayer,
  saveLegalMarriage,
  saveLegalOther,
  saveLegalRelated,
  setLegalDeclareAddress
} from 'features/loan/normal/storage/legal/actions';
import useNotify from 'app/hooks/useNotify';
import { getLoanLegalUseListActive, isCheckPersionUuid } from 'features/loan/normal/storage/legal/selectors';
import useStorage from '../../screens/Normal/Initialize/Legal/useStorage';
import { ILOANURLParams } from 'types/models/loan';
import { useParams } from 'react-router';
import useMasterData from 'app/hooks/useMasterData';

export interface ModalAddressProps{
  add?: boolean;
  open?: boolean;
  onClose?(): void;
  onSave?(): void;
  onUpdate?(address: ILOANNormalStorageAddress): void;
  addresses?: ILOANNormalStorageAddress[];
  tool?: boolean;
  country?: string;
  screen?: string;
  coppy?: boolean;
  coppyType?: string | null;
}

const ModalIdentity: FC<ModalAddressProps> = props => {

  const {
    open = false,
    add = false,
    onClose,
    addresses = [],
    country = '',
    screen = '',
    coppy = false,
    coppyType = null
  } = props;
  const dispatch = useDispatch();
  const notify = useNotify();
  const { allAddress } = useStorage(screen);
  const params = useParams() as ILOANURLParams;
  const { register } = useMasterData();

  const [ CurrentCountry, setCurrentCountry ] = useState<string>(country);
  const [ NewAddress, setNewAddress ] = useState<ILOANNormalStorageAddress>(generateEmptyAddress());
  const [ DeleteId, setDeleteId ] = useState<ILOANNormalStorageAddress | null>(null);
  const [ Message, setMessage ] = useState<ILOANNormalStorageLegalValidate>({ valid: true });
  const [ isOpen, setIsOpen ] = useState<boolean>(open);
  const [ isAdd, setIsAdd ] = useState<boolean>(add);
  const [ isEdit, setIsEdit ] = useState(false);
  const [ isPrimary, setPrimary ] = useState(false);
  const [ isCoppy, setIsCoppy ] = useState<boolean>(coppy);
  const [ isDisiableInput, setIsDisiableInput ] = useState<boolean>(true);
  const [ typeAddress, setTypeAddress ] = useState<string | null>(coppyType);
  const [ CurrentAddresses, setCurrentAddresses ] = useState<ILOANNormalStorageAddress[]>(addresses);

  const isCheckPersion = useSelector(isCheckPersionUuid(screen));
  const activePersionUuid = useSelector(getLoanLegalUseListActive(screen));

  useEffect(() => {
    setCurrentCountry(country);
  }, [ country ]);

  useEffect(() => {
    open === isOpen || setIsOpen(open);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ open ]);

  useEffect(() => {
    add === isAdd || setIsAdd(add);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ add ]);

  useEffect(() => {
    coppy === isCoppy || setIsCoppy(coppy);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ coppy ])

  useEffect(() => {
    if (coppyType !== typeAddress){
      setTypeAddress(coppyType);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ coppyType ])

  useEffect(() => {
    if(isCoppy){
      setCurrentAddresses(allAddress.length > 0 ? allAddress.filter(data => data.type === typeAddress) : []);
    }else{
      diffArray(addresses, CurrentAddresses) && setCurrentAddresses(addresses);
    }
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ addresses, isCoppy, typeAddress, isOpen ]);

  useEffect(() => {
    if(isOpen){
      for(let i = 0; i < CurrentAddresses.length; i++){
        register("district", CurrentAddresses[i].province)
        register("ward", CurrentAddresses[i].district)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentAddresses, isOpen])

  const changeType = (value: string) => {
    setNewAddress({ ...NewAddress, type: value });
  }
  const changeApartment = (value: string) => setNewAddress({ ...NewAddress, apartment: value });
  const changeLocation = (value: SelectLocationValue) => {
    const { country, ...remain } = value;
    setNewAddress({ ...NewAddress, ...remain });
  }

  const onHandleChangeKey = (
    value: ILOANNormalStorageAddress[] | string | number | null, 
    key: keyof ILOANNormalStorageLegalDeclareAddress
  ) => {
    dispatch(setLegalDeclareAddress(value, {declare: screen, key: key, uuid_persion: activePersionUuid}));
  }

  const getMessage = (field: string) => {
    if (Message.valid || field !== Message.field) return '';
    const fieldMessage = ValidateMessage[Message.field as keyof typeof ValidateMessage];
    const role = Message.role as string;
    return (fieldMessage ? fieldMessage[role as keyof typeof fieldMessage] : '') ?? '';
  }

  const clickButtonForm =  () => {
    setIsDisiableInput(false);
    setNewAddress(generateEmptyAddress());
  }

  const onCloseDelelte = () => setDeleteId(null);

  const onCloseBtn = () => {
    onClose && onClose();
    setIsAdd(false);
    setIsCoppy(false);
    setIsDisiableInput(true);
    setNewAddress(generateEmptyAddress());
  }
  
  const handleSaveBtn = () => {
    setMessage({ valid: true });

    if(isEdit && !isPrimary){
      const validate = LegalValidate.common.address.group(NewAddress);

      if(!validate.valid){
        setMessage(validate);
      }

      const adddresUpdate = addresses.map(adu => {
        if ( adu.uuid === NewAddress.uuid 
          && adu.type === NewAddress.type
        ){
          adu = NewAddress;
        }
        return adu;
      })

      // Change Address Stored
      onHandleChangeKey(adddresUpdate, "address");

      // Change State Address
      setCurrentAddresses(adddresUpdate);

      // Nếu đã có persion call api update
      isCheckPersion && callApiUpdate();

      // Clear input form 
      setNewAddress(generateEmptyAddress());

      setIsDisiableInput(true)

      notify("Cập nhật địa chỉ thành công", "success");

      setIsEdit(false);

      return;
    }

    if(isPrimary){
      onHandleChangeKey([
        ...CurrentAddresses, 
      ], "address");
      isCheckPersion && callApiUpdate();

      // Clear input form 
      setNewAddress(generateEmptyAddress());

      setIsDisiableInput(true)

      notify("Cập nhật địa chỉ thành công", "success");

      setIsEdit(false);
      setPrimary(false);
      return;

    }else if (!isEdit && !isDisiableInput){
      const validate = LegalValidate.common.address.group(NewAddress);
      const checkTypeTEMP = CurrentAddresses.filter(item=>item.type === 'TEMP')
      const checkTypePERMANENT = CurrentAddresses.filter(item=>item.type === 'PERMANENT')

      if (validate.valid){
        if(checkTypeTEMP?.length === 0 && NewAddress.type === 'TEMP'){
          setNewAddress(generateEmptyAddress());
          onHandleChangeKey([
            ...addresses, 
            { 
              ...NewAddress, 
              uuid: NewAddress.uuid.length === 0 ? generateUUID() : NewAddress.uuid,
              primaryFlag:true,
            }
          ], "address");
  
          setIsDisiableInput(true);
        }
        else if(checkTypePERMANENT?.length === 0 && NewAddress.type === 'PERMANENT'){
          setNewAddress(generateEmptyAddress());
          onHandleChangeKey([
            ...addresses, 
            { 
              ...NewAddress, 
              uuid: NewAddress.uuid.length === 0 ? generateUUID() : NewAddress.uuid,
              primaryFlag:true,
            }
          ], "address");
  
          setIsDisiableInput(true);
        }
        else{
          setNewAddress(generateEmptyAddress());
          onHandleChangeKey([
            ...addresses, 
            { 
              ...NewAddress, 
              uuid: NewAddress.uuid.length === 0 ? generateUUID() : NewAddress.uuid,
            }
          ], "address");
  
          setIsDisiableInput(true);
        }

        /**
         * Nếu persion_uuid đã có thì sẻ call api update form
         * 
         */
        if(isCheckPersion){
          callApiUpdate();
        }
      }
      else {
        setMessage(validate);
      }

      notify("Lưu địa chỉ thành công", "success");
    }
    else {
      onHandleChangeKey([
        ...CurrentAddresses, 
      ], "address");

      isCheckPersion && callApiUpdate();
    }
  }

  const callApiUpdate = () => {
    const current = DeclareName.indexOf(params["*"]);
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
  const onHadnleUpdate = async (val: string) => {
    const currentDefaut = await CurrentAddresses.find(cad => cad.uuid === val);

    if(currentDefaut){
      await setIsAdd(true);
      await setIsEdit(true);
      await setIsDisiableInput(false);
      await setNewAddress(currentDefaut);
    }
  }

  const onHandleChangePrimary = (val: string, type: string) => {
    setIsEdit(false);
    setPrimary(true);
    const currentDefaut = CurrentAddresses.find(cad => cad.uuid === val && cad.type === type);
    if(isCoppy){
      
      const dataIvalid = addresses.find(d =>  
        d.district === currentDefaut?.district &&
        d.province === currentDefaut.province &&
        d.ward === currentDefaut.ward &&
        d.apartment === currentDefaut?.apartment
      );

      if(dataIvalid){
        return
      }
     
      if (currentDefaut){
        const newAddressesCoppy = [...addresses, {...currentDefaut}].map(
          (item) => {
            if (item.type !== currentDefaut?.type){
              return {...item}
            } else{
              if (item.uuid === currentDefaut.uuid) {
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
            }
            return {...item}
          }
        );

        if(!isAdd){
          onHandleChangeKey([...newAddressesCoppy].filter(d => d.type.length > 0) , "address");
          notify('Cập nhật địa chỉ thành công', 'success');
        }
      }
    }

    if (currentDefaut){
      const newAddresses = [...CurrentAddresses].map(
        (item) => {
          if (item.type !== currentDefaut.type){
            return {...item}
          } else{
            if (item.uuid === val) {
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
          }
          return {...item}
        }
      );

      setCurrentAddresses(newAddresses);
      !isAdd && setIsAdd(true);
      return;
    }
  }

  const onHandleDeletePrimary = (val: string, type: string) => {
    const currentDefault = CurrentAddresses.find(cad => cad.uuid === val && cad.type === type);
    if (currentDefault){
      setDeleteId(currentDefault)
    }
  }

  const onConfirmDelete = () => {
    if(DeleteId){
      const newAddresses = [...CurrentAddresses].filter(
        cdd => cdd.uuid !== DeleteId.uuid
      );

      onHandleChangeKey([...newAddresses] , "address");
      
      setCurrentAddresses(newAddresses);

      setDeleteId(null);
      
      notify("Xóa địa chỉ thành công", "success")

      // Nếu đã có persion call api update
      isCheckPersion && callApiUpdate();
    }
    else {
      notify("Xóa địa chỉ thất bại", "error")
    }
  }

  const MappingListAddress: Record<string, ILOANNormalStorageAddress[]> = {};

  if (isCoppy){
    CurrentAddresses.forEach(address => {
      if (!MappingListAddress[address.type]){
        MappingListAddress[address.type] = [ address ];
      }
      else{
        MappingListAddress[address.type].push(address);
      }
    });
  }
  else{
    CurrentAddresses.forEach(address => {
      if (!MappingListAddress[address.type]){
        MappingListAddress[address.type] = [ address ];
      }
      else{
        MappingListAddress[address.type].push(address);
      }
    });
  }

  const FormAdd = () => {
    return (
      <Fragment>
        <Typography variant="h5" component="div" className="text-upper text-primary font-medium text-18 pb-3">
          Thêm địa chỉ
        </Typography>
        <SelectLocation
          before={
            <Fragment>
              <Grid item xl={ 4 }>
                <SelectAddressType
                  label="1. Loại địa chỉ"
                  required
                  onChange={ changeType }
                  value={ NewAddress.type }
                  message={ getMessage('addressType') }
                  disabled={isDisiableInput}
                  sx={SxSelectDisabled}
                />
              </Grid>
              <Grid item xl={ 4 }>
                <Input
                  label="2. Địa chỉ"
                  required
                  onDebounce={ changeApartment }
                  value={ NewAddress.apartment }
                  message={ getMessage('addressApartment') }
                  disabled={isDisiableInput}
                />
              </Grid>
            </Fragment>
          }
          after={
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
          }
          value={{
            country: CurrentCountry,
            province: NewAddress.province,
            district: NewAddress.district,
            ward: NewAddress.ward
          }}
          label={[
            "3. Tỉnh/TP",
            "4. Quận/huyện",
            "5. Phường/xã"
          ]}
          message={[
            getMessage('addressProvince'),
            getMessage('addressDistrict'),
            getMessage('addressWard')
          ]}
          disabled={isDisiableInput}
          required={[ true, true, true ]}
          className="mb-6"
          onChange={ changeLocation }
        />
      </Fragment>
    )
  }

  return <Fragment>
    <Modal
      open={ isOpen }
      onClose={ onClose }
      isStatic
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
      sx={{
        '& .MuiPaper-root': {
          minWidth: '60%',
          position: 'relative' ,
          borderRadius: 0
        }
      }}
    >
      <IconButton 
        onClick={ onCloseBtn } 
        color="error" 
        sx={{ position: 'absolute', right: '0.8rem', top: '0.5rem' }}
      >
        <CloseIcon />
      </IconButton>
        <Fragment>

          {
            isAdd && !coppy && FormAdd()
          }

          <ListDataAddress
            isCoppy={isCoppy}
            dataAdress={CurrentAddresses}
            onEdit={(val) => onHadnleUpdate(val)}
            onChanePrimary={(val, type) => onHandleChangePrimary(val, type)}
            onDelete={(val, type) =>  onHandleDeletePrimary(val, type)}
          />
        </Fragment>
    </Modal>

    <ModalConfirm open={ DeleteId !== null } onClose={ onCloseDelelte } onConfirm={ onConfirmDelete }>
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc muốn xoá địa chỉ?
      </Box>
    </ModalConfirm>
  </Fragment>
}

export default ModalIdentity;