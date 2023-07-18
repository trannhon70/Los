import { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import ModalAddress from "views/pages/LOAN/widgets/ModalAddress";
import SelectLocation, { SelectLocationValue } from "views/components/widgets/SelectLocation";
import IconCopy from "views/components/layout/IconCopy";
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import { useDispatch, useSelector } from "react-redux";
import { 
  getAddressLegal,
  getDeclareLegalBorr,
  getLoanLegalUseListActive
} from "features/loan/normal/storage/legal/selectors";
import { ILOANNormalStorageAddress } from "types/models/loan/normal/storage/Legal";
import { 
  setLocation
} from "features/loan/normal/storage/legal/actions";
import { generateUUID } from "utils";
import { generateEmptyAddress } from "views/pages/LOAN/utils";
import useNormalLegalMessage from "app/hooks/useNormalLegalMessage";
import ModalAddressCopy from "views/pages/LOAN/widgets/ModalAddressCopy";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";

const ContactAddress: FC = () => {

  const dispatch = useDispatch();
  const getMessage = useNormalLegalMessage();
  const SCREEN = ELegalTypeScreen.REALTED;

  const activePersionUuid = useSelector(getLoanLegalUseListActive(SCREEN))
  const { address } = useSelector(getAddressLegal(SCREEN, activePersionUuid));
  const disabledForm = useSelector(getDeclareLegalBorr(SCREEN))
  const ruleDisabled = useSelector(getRuleDisbled)


  const [OpenModalCopyAddress, setOpenModalCopyAddress] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalCoppy, setModalCoppy] = useState<boolean | null>(null);
  const [coppyType, setCoppyType] = useState<string | null>(null);
  const [addressesDefault, setAddressesDefault] = useState<ILOANNormalStorageAddress>({...generateEmptyAddress(), uuid: generateUUID()});
  const [addresses, setAddresses] = useState<ILOANNormalStorageAddress[]>(address ?? []);
  
 
  useEffect(() => {
    setAddresses(address);
    if(address){
      address?.map(ad => {
        setAddressesDefault(ad)
        return null;
      })
    }
    else {
      const newEmptyAddress = {...generateEmptyAddress(), uuid: generateUUID()}
      setAddressesDefault(newEmptyAddress)
    }
    
  },[address, activePersionUuid])

  useEffect(() => {
    setOpenModal(modalCoppy !== null);
  }, [modalCoppy]);

  const onClose = () => {
    setModalCoppy(null);
    setCoppyType(null)
  };

  const onHandleCoppyAddressMailingAddress = async () => {
    await setOpenModalCopyAddress(true);
    await setCoppyType("TEMP")
  }

  const onCloseModalAddressCopy = () =>  setOpenModalCopyAddress(false);

  const onChangeDefaultAddress = (
    value: SelectLocationValue, 
    apartment: string
  ) => {
    const { country, ...remain } = value;

    const _defaultAddress = {
      ...addressesDefault,
      apartment: apartment,
      province: value.province,
      district: value.district,
      ward: value.ward
    }

    setAddressesDefault({ ..._defaultAddress, ...remain });
    const defaultAddressUp = {
      ..._defaultAddress, 
      apartment: apartment
    }

    dispatch(setLocation(defaultAddressUp, { declare: SCREEN, uuid_persion: activePersionUuid }))
  }

  return (
    <CardInside
      title="II. Thông tin địa chỉ"
      classBody="h-full p-6"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16"
    >
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
              required
              value={address?.length > 0 ? addressesDefault.apartment : ""}
              onDebounce={(val) => onChangeDefaultAddress( 
                  {
                    country: "VN", 
                    district: addressesDefault?.district ?? "", 
                    province: addressesDefault?.province ?? "",
                    ward: addressesDefault?.ward ?? ""
                  },
                  val
                )
              }
              disabled={disabledForm || !activePersionUuid || ruleDisabled}
              message={getMessage(SCREEN, 'mailing_apartment', { position: activePersionUuid ?? "" })}
            />
            <IconCopy 
              className="icon-copy" 
              onClick={onHandleCoppyAddressMailingAddress}
            />
          </Grid>
        }
        label={["2. Tỉnh/TP", "3. Quận/huyện", "4. Phường/xã"]}
        col={6}
        required={[true, true, true]}
        onChange={(val) => onChangeDefaultAddress(val, addressesDefault?.apartment ?? "")}
        value={{
          country: 'VN',
          province: address?.length > 0 ? addressesDefault.province : "",
          district: address?.length > 0 ? addressesDefault.district :"",
          ward: address?.length > 0 ? addressesDefault.ward :"",
        }}
        message={[
          getMessage(SCREEN, "mailing_province", { position: activePersionUuid ?? "" }),
          getMessage(SCREEN, "mailing_district", { position: activePersionUuid ?? "" }),
          getMessage(SCREEN, "mailing_ward", { position: activePersionUuid ?? "" })
        ]}
      />

      <ModalAddress
        open={openModal}
        add={false}
        onClose={onClose}
        addresses={addresses}
        tool={true}
        country={'VN'}
        screen={SCREEN}
        coppy={!!modalCoppy}
        coppyType={coppyType}
      />

      <ModalAddressCopy
        open={OpenModalCopyAddress}
        onClose={onCloseModalAddressCopy}
        onSave={(data) => {
          onChangeDefaultAddress({
            country: 'VN',
            province: data?.province,
            district: data?.district,
            ward: data.ward
          }, data.apartment)
        }}
      />
    </CardInside>
  );
};

export default ContactAddress;
