import {
  useEffect,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle
} from "react";
import Grid from "@mui/material/Grid";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ModalAddress from "views/pages/LOAN/widgets/ModalAddress";
import SelectResident from "views/components/widgets/SelectResident";
import SelectLocation, { SelectLocationValue } from "views/components/widgets/SelectLocation";
import IconCopy from "views/components/layout/IconCopy";
import { useDispatch, useSelector } from 'react-redux';
import {
  ILOANNormalStorageAddress,
  ILOANNormalStorageLegalDeclareAddress,
} from "types/models/loan/normal/storage/Legal";
import { AddressType, generateEmptyAddress } from "views/pages/LOAN/utils";
import { 
  addLOANNormalStorageLegalDeclareAddress, 
  setLegalDeclareAddress, 
  setLegalValidate, 
  updateLOANNormalStorageLegalDeclareAddress 
} from "features/loan/normal/storage/legal/actions";
import { getAddressLegal } from "features/loan/normal/storage/legal/selectors";
import { generateUUID } from "utils";
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import useNormalLegalMessage from "app/hooks/useNormalLegalMessage";
import ModalAddressCopy from "views/pages/LOAN/widgets/ModalAddressCopy";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";


export interface IBorrowerAddressRef {
  validate(): boolean;
}

export interface IBorrowerAddressPros{}

type BorrowerAddressComponent = ForwardRefRenderFunction<
  IBorrowerAddressRef, 
  IBorrowerAddressPros
>

const BorrowerAddress: BorrowerAddressComponent = (props, ref) => {

  const dispatch = useDispatch();
  const SCREEN = ELegalTypeScreen.BORROWER;
  const getMessage = useNormalLegalMessage();

  const { address, location, resident } = useSelector(getAddressLegal(SCREEN));
  const ruleDisabled = useSelector(getRuleDisbled)


  const [openModal, setOpenModal] = useState(false);
  const [OpenModalCopyAddress, setOpenModalCopyAddress] = useState(false);

  const [modalAdd, setModalAdd] = useState<boolean | null>(null);
  const [modalCoppy, setModalCoppy] = useState<boolean | null>(null);
  const [permanentAddress, setPermanentAddrees] = useState<ILOANNormalStorageAddress>(generateEmptyAddress());
  const [mailingAddress, setMailingAddrees] = useState<ILOANNormalStorageAddress>(generateEmptyAddress())
  const [addresses, setAddresses] = useState<ILOANNormalStorageAddress[]>(address ?? []);
  const [coppyType, setCoppyType] = useState<string | null>(null);


  useEffect(() => {
    setAddresses(address);
    address.map(ad => {
      if(ad.type === AddressType.PERMANENT && ad.primaryFlag){
        setPermanentAddrees(ad)
      }
      if (ad.type === AddressType.TEMP && ad.primaryFlag){
        setMailingAddrees(ad)
      }
      return null;
    })
    address?.length === 0 &&  setPermanentAddrees(generateEmptyAddress())
    address?.length === 0 &&  setMailingAddrees(generateEmptyAddress())

  },[address])

  useEffect(() => {
    setOpenModal(modalAdd !== null);
  }, [modalAdd]);

  useEffect(() => {
    setOpenModal(modalCoppy !== null);
  }, [modalCoppy]);


  useImperativeHandle(ref, () => ({
    validate: () => ValidateFormAddress()
  }))

  const ValidateFormAddress = () => {
    let isValid = { valid: true, field: '', role: '', declare: ""};

    if(!location || location?.length === 0){
      return true;
    }

    if (permanentAddress.apartment.length === 0){
      isValid = { valid: false, field: 'permanent_apartment', role: 'empty', declare: SCREEN};
      dispatch(setLegalValidate(isValid))
      return isValid.valid;
    }

    if (permanentAddress.province.length === 0){
      isValid = { valid: false, field: 'permanent_province', role: 'empty', declare: SCREEN};
      dispatch(setLegalValidate(isValid))
      return isValid.valid;
    }

    if (permanentAddress.district.length === 0){
      isValid = { valid: false, field: 'permanent_district', role: 'empty', declare: SCREEN};
      dispatch(setLegalValidate(isValid))
      return isValid.valid;
    }

    if (permanentAddress.ward.length === 0){
      isValid = { valid: false, field: 'permanent_ward', role: 'empty', declare: SCREEN};
      dispatch(setLegalValidate(isValid))
      return isValid.valid;
    }

    if (mailingAddress.apartment.length === 0){
      isValid = { valid: false, field: 'mailing_apartment', role: 'empty', declare: SCREEN};
      dispatch(setLegalValidate(isValid))
      return isValid.valid;
    }

    if (mailingAddress.province.length === 0){
      isValid = { valid: false, field: 'mailing_province', role: 'empty', declare: SCREEN};
      dispatch(setLegalValidate(isValid))
      return isValid.valid;
    }

    if (mailingAddress.district.length === 0){
      isValid = { valid: false, field: 'mailing_district', role: 'empty', declare: SCREEN};
      dispatch(setLegalValidate(isValid))
      return isValid.valid;
    }

    if (mailingAddress.ward.length === 0){
      isValid = { valid: false, field: 'mailing_ward', role: 'empty', declare: SCREEN};
      dispatch(setLegalValidate(isValid))
      return isValid.valid;
    }

    isValid = { valid: true, field: '', role: '', declare: SCREEN};
    dispatch(setLegalValidate(isValid))

    return isValid.valid;
  }

  const onHandleChangeKey = (
    value: ILOANNormalStorageAddress[] | string | number | null, 
    key: keyof ILOANNormalStorageLegalDeclareAddress
  ) => {
    dispatch(setLegalDeclareAddress(value, {declare: SCREEN, key: key}));
  }

  const clickList = () => {
    setModalAdd(false);
    setModalCoppy(false);
    setCoppyType(null);
  };

  const clickAddAddress = () => {
    setModalAdd(true);
  };

  const onClose = () => {
    setModalAdd(null);
    setModalCoppy(null);
    setCoppyType(null)
  };

 
  const onCloseModalAddressCopy = () =>  setOpenModalCopyAddress(false);

  const onChangePermanentAddress = (value: SelectLocationValue, apartment: string) => {
    const { country, ...remain } = value;

    const _permanentAddress = {
      ...permanentAddress,
      apartment: apartment,
      province: value.province,
      district: value.district,
      ward: value.ward
    }

    setPermanentAddrees({ ..._permanentAddress, ...remain });

    if(permanentAddress.uuid.length > 0){

      const permanentAddressUp = {
        ..._permanentAddress, 
        apartment: apartment
      }

      dispatch(updateLOANNormalStorageLegalDeclareAddress( permanentAddressUp , {declare: SCREEN}));
    }
    else{

      /**
       * Trường hợp nhập dữ liệu từ form trống
       * Thêm dữ liệu vào stored
       */
      if(
        _permanentAddress.apartment.length > 0 &&
        _permanentAddress.district.length > 0 &&
        _permanentAddress.ward.length > 0 &&
        _permanentAddress.province.length > 0
      ){
        const permanentAddressNew =  {
          ..._permanentAddress, 
          uuid: generateUUID(), 
          type: AddressType.PERMANENT,
          primaryFlag: true,
          apartment: apartment
        }

        dispatch(addLOANNormalStorageLegalDeclareAddress(
          permanentAddressNew,
          {declare: SCREEN}
        ));
      }
    }
  }

  const onChangeMailingAddress = (value: SelectLocationValue, apartment: string) => {
    const { country, ...remain } = value;

    const _mailingAddress = {
      ...mailingAddress,
      apartment: apartment,
      province: value.province,
      district: value.district,
      ward: value.ward
    }

    setMailingAddrees({ ..._mailingAddress, ...remain });

    if(mailingAddress.uuid.length > 0){

      const mailingAddressUp = {
        ..._mailingAddress, 
        apartment: apartment
      }

      dispatch(updateLOANNormalStorageLegalDeclareAddress( mailingAddressUp , {declare: SCREEN}));
    }
    else{

      /**
       * Trường hợp nhập dữ liệu từ form trống
       * Thêm dữ liệu vào stored
       */
      if(
        _mailingAddress.apartment.length > 0 &&
        _mailingAddress.district.length > 0 &&
        _mailingAddress.ward.length > 0 &&
        _mailingAddress.province.length > 0
      ){
        const mailingAddressNew =  {
          ..._mailingAddress, 
          uuid: generateUUID(), 
          type: AddressType.TEMP,
          primaryFlag: true,
          apartment: apartment
        }

        dispatch(addLOANNormalStorageLegalDeclareAddress(
          mailingAddressNew,
          {declare: SCREEN}
        ));
      }
    }
  }

  const onHandleCoppyAddressPermanent = async () => {
    await setOpenModalCopyAddress(true);
    await setCoppyType("PERMANENT")
  }

  const onHandleCoppyAddressMailingAddress = async () => {
    await setOpenModalCopyAddress(true);
    await setCoppyType("TEMP")
  }


  const handleChangeCopyAddress = (data: any) => {
    if(coppyType === "PERMANENT"){
      onChangePermanentAddress({
        country: 'VN',
        province: data?.province,
        district: data?.district,
        ward: data.ward
      }, data.apartment)
    } else {
      onChangeMailingAddress({
        country: 'VN',
        province: data?.province,
        district: data?.district,
        ward: data.ward
      }, data.apartment)
    }
  }

  return (
    <CardInside
      title="IV. Thông tin địa chỉ"
      classBody="h-full p-6"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16"
    >
      <Box className="flex-column h-full justify-between">
        <Box>
          <Grid container spacing={3}>
            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
              <SelectResident
                label="1. Cư trú"
                required
                onChange={(val) => onHandleChangeKey(val, "resident")}
                value={resident ?? ""}
                message={getMessage(SCREEN, 'resident')}
                disabled={ruleDisabled}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
              <Input
                label="2. Location"
                required
                onDebounce={(val) => onHandleChangeKey(val, "location")}
                message={getMessage(SCREEN, 'location')}
                value={location ?? ""}
                disabled={ruleDisabled}
              />
            </Grid>
          </Grid>
          <Divider className="my-3" />
          <SelectLocation
            sx={{
              "& .icon-copy": {
                zIndex: "1000",
                position: "absolute",
              },
            }}
            disabled={ruleDisabled}
            before={
              <Grid
                item xl={6} lg={6} md={12} sm={12} xs={12}
                sx={{
                  display: 'flex',
                  flexFlow: 'row-reverse'
                }}
              >
                <Input
                  label="1. Địa chỉ thường trú"
                  value={address?.length > 0 ? permanentAddress.apartment : ""}
                  required
                  message={getMessage(SCREEN, 'permanent_apartment')}
                  disabled={ruleDisabled}
                  onDebounce={
                    (val) => onChangePermanentAddress( 
                      {
                        country: "VN", 
                        district: permanentAddress.district, 
                        province: permanentAddress.province, 
                        ward: permanentAddress.ward
                      },
                      val
                    )
                  }
                />
                <IconCopy 
                  className="icon-copy" 
                  onClick={onHandleCoppyAddressPermanent}
                />
              </Grid>
            }
            label={["2. Tỉnh/TP", "3. Quận/huyện", "4. Phường/xã"]}
            required={[true, true, true]}
            col={6}
            value={{
              country: 'VN',
              province: permanentAddress.province ?? "",
              district: permanentAddress.district ?? "",
              ward:  permanentAddress.ward ?? "",
            }}
            message={[
              getMessage(SCREEN, "permanent_province"),
              getMessage(SCREEN, "permanent_district"),
              getMessage(SCREEN, "permanent_ward")
            ]}
            onChange={(val) => onChangePermanentAddress(val, permanentAddress.apartment)}
          />
          <Divider className="my-3" />
          <SelectLocation
            sx={{
              "& .icon-copy": {
                zIndex: "1000",
                position: "absolute",
              },
            }}
            disabled={ruleDisabled}
            before={
              <Grid
                item xl={6} lg={6} md={12} sm={12} xs={12}
                sx={{
                  display: 'flex',
                  flexFlow: 'row-reverse'
                }}
              >
                <Input
                  label="1. Địa chỉ liên hệ"
                  value={address?.length > 0 ? mailingAddress.apartment : ""}
                  disabled={ruleDisabled}
                  required
                  message={getMessage(SCREEN, 'mailing_apartment')}
                  onDebounce={(val) => onChangeMailingAddress( 
                      {
                        country: "VN", 
                        district: mailingAddress.district, 
                        province: mailingAddress.province,
                        ward: mailingAddress.ward
                      },
                      val
                    )
                  }
                />
                <IconCopy 
                  className="icon-copy" 
                  onClick={onHandleCoppyAddressMailingAddress}
                />
              </Grid>
            }
            label={["2. Tỉnh/TP", "3. Quận/huyện", "4. Phường/xã"]}
            required={[true, true, true]}
            col={6}
            value={{
              country: 'VN',
              province: mailingAddress.province ?? "",
              district: mailingAddress.district ?? "",
              ward: mailingAddress.ward ?? "",
            }}
            message={[
              getMessage(SCREEN, "mailing_province"),
              getMessage(SCREEN, "mailing_district"),
              getMessage(SCREEN, "mailing_ward")
            ]}
            onChange={(val) => onChangeMailingAddress(val, mailingAddress.apartment)}
          />
        </Box>
        <Box className="pt-6 text-right">
          <Button
            variant="contained"
            sx={{ borderRadius: 0, textTransform: "revert", boxShadow: 'unset' }}
            className={ruleDisabled ? '' : "mr-6"}
            onClick={clickList}
          >
            Danh sách
          </Button>
          {ruleDisabled ? null : <Button
            variant="outlined"
            sx={{ borderRadius: 0, textTransform: "revert" ,  boxShadow: '0 3px 6px 0 rgba(24, 37, 170, 0.2)'}}
            startIcon={<AddIcon />}
            onClick={clickAddAddress}
          >
            Thêm địa chỉ
          </Button>}
          
        </Box>
      </Box>
      
      <ModalAddress
        open={openModal}
        add={!!modalAdd}
        onClose={onClose}
        addresses={addresses}
        tool={true}
        country={'VN'}
        screen={SCREEN}
        // coppy={!!modalCoppy}
        coppyType={coppyType}
      />

      <ModalAddressCopy
        open={OpenModalCopyAddress}
        onClose={onCloseModalAddressCopy}
        onSave={(data) => handleChangeCopyAddress(data)}
      />

    </CardInside>
  );
};

export default forwardRef(BorrowerAddress);
