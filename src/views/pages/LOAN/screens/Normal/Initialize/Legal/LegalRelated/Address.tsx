import {
  FC,
  useEffect,
  useState
} from "react";
import Grid from "@mui/material/Grid";
import Input from "views/components/base/Input";
import ModalAddress from "views/pages/LOAN/widgets/ModalAddress";
import CardInside from "views/components/layout/CardInside";
import SelectLocation, { SelectLocationValue } from "views/components/widgets/SelectLocation";
import IconCopy from "views/components/layout/IconCopy";
import { useDispatch, useSelector } from "react-redux";
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import { getAddressLegal, getDeclareLegalBorr, getLoanLegalUseListActive } from "features/loan/normal/storage/legal/selectors";
import { ILOANNormalStorageAddress } from "types/models/loan/normal/storage/Legal";
import { 
  setLocation
} from "features/loan/normal/storage/legal/actions";
import { generateEmptyAddress } from "views/pages/LOAN/utils";
import ModalAddressCopy from "views/pages/LOAN/widgets/ModalAddressCopy";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";


const LegalRelatedAddress: FC = (props, ref) => {

  const dispatch = useDispatch();
  const SCREEN = ELegalTypeScreen.LAW_RLT;

  const disabledForm = useSelector(getDeclareLegalBorr(SCREEN))
  const activePersionUuid = useSelector(getLoanLegalUseListActive(SCREEN))
  const { address } = useSelector(getAddressLegal(SCREEN, activePersionUuid));
  const ruleDisabled = useSelector(getRuleDisbled)

  const [OpenModalCopyAddress, setOpenModalCopyAddress] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [modalCoppy, setModalCoppy] = useState<boolean | null>(null);
  const [coppyType, setCoppyType] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<ILOANNormalStorageAddress[]>(address ?? []);

  const [addressesDefault, setAddressesDefault] = useState<ILOANNormalStorageAddress>(
    address ? address[0] : generateEmptyAddress()
  );

  useEffect(() => {
    setAddresses(address);
  },[address])

  useEffect(() => {
    if(address){
      address?.map(ad => {
        setAddressesDefault(ad)
        return null;
      })
    }
    if(address === undefined){
      setAddressesDefault(generateEmptyAddress())
    }
  
  },[address, activePersionUuid])


  
  useEffect(() => {
    setOpenModal(modalCoppy !== null);
  }, [modalCoppy]);

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

  const onClose = () => {
    setModalCoppy(null);
    setCoppyType(null)
  };

  const onHandleCoppyAddressMailingAddress = async () => {
    await setOpenModalCopyAddress(true);
    await setCoppyType("TEMP")
  }

  const onCloseModalAddressCopy = () =>  setOpenModalCopyAddress(false);

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
              value={ addressesDefault.apartment ?? ""}
              onDebounce={(val) => onChangeDefaultAddress( 
                {
                  country: "VN", 
                  district: addressesDefault.district, 
                  province: addressesDefault.province,
                  ward: addressesDefault.ward
                },
                val
              )
            }
            disabled={disabledForm || !activePersionUuid || ruleDisabled}
            />
            <IconCopy 
              className="icon-copy" 
              onClick={onHandleCoppyAddressMailingAddress}
            />
          </Grid>
        }
        label={["2. Tỉnh/TP", "3. Quận/huyện", "4. Phường/xã"]}
        col={6}
        onChange={(val) => onChangeDefaultAddress(val, addressesDefault?.apartment ?? "")}
        value={{
          country: 'VN',
          province:  addressesDefault.province ?? "",
          district:  addressesDefault.district ?? "",
          ward:  addressesDefault.ward ?? "",
        }}
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

export default LegalRelatedAddress;
