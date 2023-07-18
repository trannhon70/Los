import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import {
  useEffect,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle
} from "react";
import { 
  ILOANNormalStorageAddress
} from "types/models/loan/normal/storage/Legal";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import IconCopy from "views/components/layout/IconCopy";
import ModalAddress from "views/pages/LOAN/widgets/ModalAddress";
import SelectLocation, { SelectLocationValue } from "views/components/widgets/SelectLocation";
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from 'utils';
import { AddressType, generateEmptyAddress } from "views/pages/LOAN/utils";
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import {
  getAddressLegal, 
  getDeclareLegalBorr, 
  getLoanLegalUseListActive, 
  getLOANNormalIdenForm
} from "features/loan/normal/storage/legal/selectors";
import { 
  addLOANNormalStorageLegalDeclareAddress, 
  setLegalValidate, 
  updateLOANNormalStorageLegalDeclareAddress 
} from "features/loan/normal/storage/legal/actions";
import useNormalLegalMessage from "app/hooks/useNormalLegalMessage";
import { ValidateLegal } from "features/loan/normal/storage/legal/validate";
import ModalAddressCopy from "views/pages/LOAN/widgets/ModalAddressCopy";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";

export interface ICoPayerAddressRef {
  validate(): boolean;
}

export interface ICoPayerAddressProps{}


type TCoPayerAddressComponent = ForwardRefRenderFunction<
  ICoPayerAddressRef, 
  ICoPayerAddressProps
>

const CoPayerAddress: TCoPayerAddressComponent = (props, ref) => {

  const dispatch = useDispatch();
  const getMessage = useNormalLegalMessage();
  const SCREEN = ELegalTypeScreen.CO_PAYER;

  const disabledForm = useSelector(getDeclareLegalBorr(SCREEN))
  const activePersionUuid = useSelector(getLoanLegalUseListActive(SCREEN))
  const { address } = useSelector(getAddressLegal(SCREEN, activePersionUuid));
  const IdenData = useSelector(getLOANNormalIdenForm(SCREEN));
  const ruleDisabled = useSelector(getRuleDisbled)

  const [OpenModalCopyAddress, setOpenModalCopyAddress] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalAdd, setModalAdd] = useState<boolean | null>(null);
  const [modalCoppy, setModalCoppy] = useState<boolean | null>(null);
  const [permanentAddress, setPermanentAddrees] = useState<ILOANNormalStorageAddress>(generateEmptyAddress());
  const [mailingAddress, setMailingAddrees] = useState<ILOANNormalStorageAddress>(generateEmptyAddress())
  const [coppyType, setCoppyType] = useState<string | null>(null);

  useEffect(() => {
    if(address){
      const isPermanentAddress = address?.find(d => d.primaryFlag && AddressType.PERMANENT);
      const isMailingAddress = address?.find(d => d.primaryFlag && AddressType.TEMP);

      if (!isPermanentAddress){
        setPermanentAddrees(generateEmptyAddress())
      }

      if (!isMailingAddress){
        setMailingAddrees(generateEmptyAddress())
      }
      
      address?.map(ad => {
        if(ad.type === AddressType.PERMANENT && ad.primaryFlag){
          setPermanentAddrees(ad)
        }
        if (ad.type === AddressType.TEMP && ad.primaryFlag){
          setMailingAddrees(ad)
        }
        return null;
      })
    }
    if(address === undefined){
      setPermanentAddrees(generateEmptyAddress())
      setMailingAddrees(generateEmptyAddress())
    }
  },[address,activePersionUuid])

  useEffect(() => {
    setOpenModal(modalAdd !== null);
  }, [modalAdd]);

  useEffect(() => {
    setOpenModal(modalCoppy !== null);
  }, [modalCoppy]);

  useImperativeHandle(ref, () => ({
    validate: () => isValidate()
  }))

  const validateMessage = () => {
    let isValid = { valid: true, field: '', role: '', declare: "", position: ''};

    const lenghtPlaceOffIssue = IdenData?.placeOfIssue ? IdenData?.placeOfIssue : "";
    if(lenghtPlaceOffIssue.length === 0){
      return isValid = { valid: true, field: '', role: '', declare: "", position: ''};
    }
      
    const vPermanentAddressApartment = ValidateLegal.apartment(
      permanentAddress.apartment, 
      undefined, "permanent_apartment"
    );
    if (!vPermanentAddressApartment.valid) return isValid = {
      ...vPermanentAddressApartment, 
      declare: SCREEN,
      position: activePersionUuid ?? ""
    };

    const vProvince = ValidateLegal.province(
      permanentAddress.province, 
      undefined, "permanent_province"
    );
    if (!vProvince.valid) return isValid = {
      ...vProvince,
      declare: SCREEN,
      position: activePersionUuid ?? ""
    };

    const vDistrict = ValidateLegal.district(
      permanentAddress.district, 
      undefined, 
      "permanent_district"
      );
    if (!vDistrict.valid) return isValid = {
      ...vDistrict, 
      declare: SCREEN,
      position: activePersionUuid ?? ""
    };

    const vWard = ValidateLegal.ward(
      permanentAddress.ward, 
      undefined, 
      "permanent_ward"
    );
    if (!vWard.valid) return isValid = {
      ...vWard, 
      declare: SCREEN,
      position: activePersionUuid ?? ""
    };

    const vMailingAddressApartment = ValidateLegal.apartment(
      mailingAddress.apartment,
      undefined, 
      "mailing_apartment"
    );
    if (!vMailingAddressApartment.valid) return isValid = {
      ...vMailingAddressApartment,
      declare: SCREEN,
      position: activePersionUuid ?? ""
    };

    const vMailingProvince = ValidateLegal.province(
      mailingAddress.province, 
      undefined, 
      "mailing_province"
    );
    if (!vMailingProvince.valid) return isValid = {
      ...vMailingProvince, 
      declare: SCREEN,
      position: activePersionUuid ?? ""
    };

    const vMailingDistrict = ValidateLegal.district(
      mailingAddress.district, 
      undefined, 
      "mailing_district"
    );
    if (!vMailingDistrict.valid) return isValid = {...vMailingDistrict, declare: SCREEN, position: activePersionUuid ?? ""};

    const vMailingWard = ValidateLegal.ward(mailingAddress.ward, undefined, "mailing_ward");
    if (!vMailingWard.valid) return isValid = {...vMailingWard, declare: SCREEN, position: activePersionUuid ?? ""};

    return isValid;
  }

  const isValidate = () => {
    const message = validateMessage();
    dispatch(setLegalValidate(message));

    return message.valid;
  }

  const onClose = () => {
    setModalAdd(null);
    setModalCoppy(null);
    setCoppyType(null);
  };

  const clickList = () => {
    setModalAdd(false);
    setModalCoppy(false);
    setCoppyType(null);
  };

  const clickAddAddress = () => {
    setModalAdd(true);
  };

  const onChangePermanentAddress = (
    value: SelectLocationValue, 
    apartment: string
  ) => {
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

      dispatch(updateLOANNormalStorageLegalDeclareAddress( 
        permanentAddressUp , 
        {
          declare: SCREEN, 
          uuid_persion: activePersionUuid
        }
      ));
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
          {
            declare: SCREEN, 
            uuid_persion: activePersionUuid
          }
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

      dispatch(updateLOANNormalStorageLegalDeclareAddress( 
        mailingAddressUp , 
        {
          declare: SCREEN, 
          uuid_persion: activePersionUuid
        }
      ));
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
          {
            declare: SCREEN, 
            uuid_persion: activePersionUuid
          }
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

  const onCloseModalAddressCopy = () =>  setOpenModalCopyAddress(false);

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
      title="III. Thông tin địa chỉ"
      classBody="h-full p-6"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16"
    >
      <Box className="flex-column h-full justify-between">
        <Box>
          <SelectLocation
            sx={{
              "& .icon-copy": {
                zIndex: "1000",
                position: "absolute",
              },
            }}
            disabled={disabledForm || !activePersionUuid || ruleDisabled}
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
                  value={permanentAddress.apartment} 
                  required
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
                  message={getMessage(SCREEN, 'permanent_apartment', { position: activePersionUuid ?? "" })}
                  disabled={disabledForm || !activePersionUuid || ruleDisabled}
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
              province: permanentAddress.province,
              district: permanentAddress.district,
              ward: permanentAddress.ward,
            }}
            message={[
              getMessage(SCREEN, "permanent_province", { position: activePersionUuid ?? "" }),
              getMessage(SCREEN, "permanent_district", { position: activePersionUuid ?? "" }),
              getMessage(SCREEN, "permanent_ward", { position: activePersionUuid ?? "" })
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
            disabled={disabledForm || !activePersionUuid || ruleDisabled}
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
                  value={mailingAddress.apartment}
                  required 
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
                  message={getMessage(SCREEN, 'mailing_apartment', { position: activePersionUuid ?? "" })}
                  disabled={disabledForm || !activePersionUuid || ruleDisabled}
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
              province: mailingAddress.province,
              district: mailingAddress.district,
              ward: mailingAddress.ward,
            }}
            message={[
              getMessage(SCREEN, "mailing_province", { position: activePersionUuid ?? "" }),
              getMessage(SCREEN, "mailing_district", { position: activePersionUuid ?? "" }),
              getMessage(SCREEN, "mailing_ward", { position: activePersionUuid ?? "" })
            ]}
            onChange={(val) => onChangeMailingAddress(val, mailingAddress.apartment)}
          />
        </Box>
        <Box className="pt-6 text-right">
          <Button
            variant="contained"
            sx={{ borderRadius: 0, textTransform: "revert", boxShadow: 'unset' }}
            className={ruleDisabled ? ' ' : "mr-6"}
            onClick={clickList}
            disabled={disabledForm || !activePersionUuid}
          >
            Danh sách
          </Button>
          {
            ruleDisabled ? null : <Button
              variant="outlined"
              sx={{ borderRadius: 0, textTransform: "revert", boxShadow: '0 3px 6px 0 rgba(24, 37, 170, 0.2)' }}
              startIcon={<AddIcon />}
              onClick={clickAddAddress}
              disabled={disabledForm || !activePersionUuid}
            >
              Thêm địa chỉ
            </Button>
            }
          
        </Box>
      </Box>

      <ModalAddress
        open={openModal}
        add={!!modalAdd}
        onClose={onClose}
        addresses={address}
        country={'VN'}
        screen={SCREEN}
        coppy={!!modalCoppy}
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

export default forwardRef(CoPayerAddress);