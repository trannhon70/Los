import { FunctionComponent, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@mui/material';
import CardInside from "views/components/layout/CardInside";
import Input from 'views/components/base/Input';
import SelectLocation, { SelectLocationValue } from 'views/components/widgets/SelectLocation';
import {
  setDataLandCTXD,
  setDataLandCTXDLocation,
  setDataLandCTXDLocationCertificate
} from "features/loan/normal/storage/collateralV2/actions";
import {
  getLoanNormalSubTypeItemsActive,
  getLOANormalStoreColalteralLandCTXD,
  getLOANormalStoreColalteralLandCTXDData,
  getLOANormalStoreColalteralLandCTXDGcnQshUuidActive
} from "features/loan/normal/storage/collateralV2/selector";
import { ICTXDLandData } from "types/models/loan/normal/storage/CollaretalV2";
import SelectConstructionPermit from "views/components/widgets/SelectConstructionPermit";
import { SxSelectDisiable } from "views/pages/LOAN/screens/Card/Initialize/Collateral/style";
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import IconButton from '@mui/material/IconButton';
import IconCopy from "views/components/layout/IconCopy";
import ModalCollateralAddress from "views/pages/LOAN/widgets/ModalCollateralAddress";
import useNotify from "app/hooks/useNotify";
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';

export interface InfoGeneralProps {
  uuidData?: string;
  uuidSubType?: string;
}

const InfoGeneral: FunctionComponent<InfoGeneralProps> = (props) => {

  const { uuidData = "", uuidSubType = "" } = props;
  const dispatch = useDispatch()
  const notify = useNotify();
  const ruleDisabled = useSelector(getRuleDisbled)
  const CTXDGcnQshUuidActive = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshUuidActive(uuidData, uuidSubType));
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive(uuidData, uuidSubType));
  const data = useSelector(getLOANormalStoreColalteralLandCTXD(uuidData, uuidSubType, SubTypeItemsActive ?? ''))
  const dataCTXD = useSelector(getLOANormalStoreColalteralLandCTXDData(uuidData,
    uuidSubType,
    SubTypeItemsActive ?? ''))

  const [disabledInput, setDisabledInput] = useState<boolean>(false);
  const [isModalOpenReal,setIsOpenModalReal] = useState<boolean>(false)
  const [isModalOpenGCN,setIsModalOpenGCN] = useState<boolean>(false)

  useEffect(() => {
    const isCheckDisabledInput = CTXDGcnQshUuidActive?.length === 0 ? true : false;
    if (isCheckDisabledInput !== disabledInput) {
      setDisabledInput(isCheckDisabledInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CTXDGcnQshUuidActive])

  const onChangedatCTXD = (value: string | number | null, key: keyof ICTXDLandData) => {
    dispatch(setDataLandCTXD(value, {
      uuidData: uuidData,
      uuidSubType: uuidSubType,
      uuidItems: SubTypeItemsActive ?? '',
      uuidCTXDLand: data?.activeCTXDLand ?? '',
      key
    }))
  }

  const changeLocationCTSX = (dataLocation: SelectLocationValue) => {
    const { country, ...remain } = dataLocation;
    dispatch(setDataLandCTXDLocation(remain, {
      uuidData: uuidData,
      uuidSubType: uuidSubType,
      uuidItems: SubTypeItemsActive ?? '',
      uuidCTXDLand: data?.activeCTXDLand ?? '',
    }))
  }

  const changeLocationCTSXCertificate = (dataLocation: SelectLocationValue) => {
    const { country, ...remain } = dataLocation;
    dispatch(setDataLandCTXDLocationCertificate(remain, {
      uuidData: uuidData,
      uuidSubType: uuidSubType,
      uuidItems: SubTypeItemsActive ?? '',
      uuidCTXDLand: data?.activeCTXDLand ?? '',
    }))
  }
  const getMessage = useNormalCollateralMessage();
  const openModalReal = () =>{
    setIsOpenModalReal(!isModalOpenReal)
  }
  const openModalGCN = () =>{
      setIsModalOpenGCN(!isModalOpenGCN)
  }
  return (
    <CardInside title="I. Thông tin chung của CTXD" fieldsetClass="px-4" classBody="h-full p-6" >
      <Grid container spacing={3}>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <SelectConstructionPermit
            label="1. Pháp lý CTXD "
            required
            onChange={(val) => {
              onChangedatCTXD(val, 'asset_legal')
              if (val !== "OTHER") {
                onChangedatCTXD(null, 'legal_CTXD_other')
              }
            }}
            value={dataCTXD?.asset_legal ?? ""}
            sx={SxSelectDisiable}
            disabled={disabledInput || ruleDisabled}
            message={ getMessage('asset_legal',{position:SubTypeItemsActive, type:'CTXD_GCN', gcnUuid:CTXDGcnQshUuidActive ?? '' })}
          />
        </Grid>
        <Grid item xl={9} lg={12} md={12} sm={12} xs={12} sx={{ opacity: '50%' }}>
          <Input
            label="2. Pháp lý CTXD khác"
            onDebounce={(val) => { onChangedatCTXD(val, 'legal_CTXD_other') }}
            value={dataCTXD?.legal_CTXD_other}
            disabled={(dataCTXD && dataCTXD.asset_legal === "OTHER" ? false : true) || ruleDisabled}
            placeholder='Nhập pháp lý CTXD khác'
            required={dataCTXD?.asset_legal === "OTHER" ? true : false}
            message={ getMessage('legal_CTXD_other',{position:SubTypeItemsActive, type:'CTXD_GCN', gcnUuid:CTXDGcnQshUuidActive ?? '' })}
          />
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
          sx={{
            "& .icon-copy": {
              zIndex: "1000",
              position: "absolute",
              cursor: "pointer"
            },
          }}
        >
          <SelectLocation
            col={3}
            before={
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}
                sx={{
                  display: 'flex',
                  flexFlow: 'row-reverse'
                }}
              >
                <Input
                  label="1. Địa chỉ thực tế nhà ở/CTXD"
                  format
                  onDebounce={(val) => { onChangedatCTXD(val, 'address') }}
                  value={dataCTXD?.address}
                  disabled={disabledInput || ruleDisabled}
                />
                <IconButton
                  sx={{
                    padding: 0
                  }}
                  className="icon-copy"
                  onClick={openModalReal}
                >
                  <IconCopy />
                </IconButton>
              </Grid>
            }
            label={[
              '2. Tỉnh/TP',
              '3. Quận/huyện',
              '4. Phường/xã'
            ]}
            required={[true, true, true]}

            onChange={changeLocationCTSX}
            value={{
              country: "VN",
              province: dataCTXD?.provice ?? "",
              district: dataCTXD?.district ?? "",
              ward: dataCTXD?.ward ?? ""
            }}
            disabled={disabledInput || ruleDisabled}
            message={[
              getMessage('province',{position:SubTypeItemsActive, type:'CTXD_GCN', gcnUuid:CTXDGcnQshUuidActive ?? '' ,pv:''}),
              getMessage('district',{position:SubTypeItemsActive, type:'CTXD_GCN', gcnUuid:CTXDGcnQshUuidActive ?? '',pv:'' }),
              getMessage('ward',{position:SubTypeItemsActive, type:'CTXD_GCN', gcnUuid:CTXDGcnQshUuidActive ?? '' ,pv:''})
            ]}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} 
          sx={{
            "& .icon-copy": {
              zIndex: "1000",
              position: "absolute",
              cursor: "pointer"
            },
          }}
        >
          <SelectLocation
            col={3}
            before={
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12} 
                  sx={{
                    display: 'flex',
                    flexFlow: 'row-reverse'
                  }}
              >
                <Input
                  label="5. Địa chỉ theo GCN"
                  format
                  onDebounce={(val) => { onChangedatCTXD(val, 'certificate_address') }}
                  value={dataCTXD?.certificate_address}
                  disabled={disabledInput || ruleDisabled}
                />
                 <IconButton
                  sx={{
                    padding: 0
                  }}
                  className="icon-copy"
                  onClick={openModalGCN}
                >
                  <IconCopy />
                </IconButton>
              </Grid>
            }
            label={[
              '6. Tỉnh/TP',
              '7. Quận/huyện',
              '8. Phường/xã'
            ]}
            required={[true, true, true]}
            onChange={changeLocationCTSXCertificate}
            value={{
              country: "VN",
              province: dataCTXD?.certificate_province ?? "",
              district: dataCTXD?.certificate_district ?? "",
              ward: dataCTXD?.certificate_ward ?? ""
            }}
            disabled={disabledInput || ruleDisabled}
            message={[
              getMessage('province',{position:SubTypeItemsActive, type:'CTXD_GCN', gcnUuid:CTXDGcnQshUuidActive ?? '' ,pv:'certificate'}),
              getMessage('district',{position:SubTypeItemsActive, type:'CTXD_GCN', gcnUuid:CTXDGcnQshUuidActive ?? '',pv:'certificate' }),
              getMessage('ward',{position:SubTypeItemsActive, type:'CTXD_GCN', gcnUuid:CTXDGcnQshUuidActive ?? '' ,pv:'certificate'})
            ]}
          />
        </Grid>
      </Grid>
      <ModalCollateralAddress open={isModalOpenReal} onClose={openModalReal} onSave={(data) => {
        onChangedatCTXD(data.apartment, "address")
        onChangedatCTXD(data.province, 'provice');
        onChangedatCTXD(data.district, 'district');
        onChangedatCTXD(data.ward, 'ward');
        openModalReal()
        notify('Copy địa chỉ thành công', 'success')
      }} />
      <ModalCollateralAddress open={isModalOpenGCN} onClose={openModalGCN} onSave={(data) => {
        onChangedatCTXD(data.apartment, 'certificate_address')
        onChangedatCTXD(data.province, 'certificate_province');
        onChangedatCTXD(data.district, 'certificate_district');
        onChangedatCTXD(data.ward, 'certificate_ward');
        openModalGCN()
        notify('Copy địa chỉ thành công', 'success')
      }} />
    </CardInside>
  )
}

export default InfoGeneral