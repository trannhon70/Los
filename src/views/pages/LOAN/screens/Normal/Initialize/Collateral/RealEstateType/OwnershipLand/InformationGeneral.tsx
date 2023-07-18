import { Grid } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import CardInside from 'views/components/layout/CardInside';
import Input from 'views/components/base/Input';
import SelectLocation, { SelectLocationValue } from 'views/components/widgets/SelectLocation';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoanNormalSubTypeItemsActive, getLOANormalStoreColalteralLandCTXD, getLOANormalStoreColalteralLandCTXDData, getLOANormalStoreColalteralLandCTXDUuidActive,
} from 'features/loan/normal/storage/collateralV2/selector';
import {
  addLandCTXD,
  onChangeHorizonListLandCTXD,
  removeLandCTXD,
  setDataLandCTXD,
  setDataLandCTXDLocation,
  setDataLandCTXDLocationCertificate,
} from 'features/loan/normal/storage/collateralV2/actions';
import {
  ICTXDLandData,
} from 'types/models/loan/normal/storage/CollaretalV2';
import HorizontalList from 'views/components/layout/HorizontalList';
import { EActionMenu } from 'features/loan/normal/storage/collateralV2/case';
import { ObjectListMenuItem, ObjectListOption } from 'views/components/layout/ObjectList';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import { Box } from '@mui/system';
import useNotify from 'app/hooks/useNotify';
import { MdHomeWork } from 'react-icons/md';
import SelectConstructionPermit from 'views/components/widgets/SelectConstructionPermit';
import { SxSelectDisiable } from '../../style';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import { IconButton } from '@mui/material';
import IconCopy from 'views/components/layout/IconCopy';
import ModalCollateralAddress from 'views/pages/LOAN/widgets/ModalCollateralAddress';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
export interface CTXDLandInformationGeneralProps {
  activeSubType?: string;
  uuIdData?: string;
}

// TODO: CTXD Thôn tin chung
const CTXDLandInformationGeneral: FunctionComponent<CTXDLandInformationGeneralProps> = (props) => {

  const { activeSubType = "", uuIdData = "" } = props
  const dispatch = useDispatch();
  const notify = useNotify();
  const ruleDisabled = useSelector(getRuleDisbled)
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive(uuIdData, activeSubType));
  const uuidActiveCTXDLand = useSelector(getLOANormalStoreColalteralLandCTXDUuidActive(
    uuIdData ?? '',
    activeSubType ?? '',
    SubTypeItemsActive ?? ''
  ));
  const data = useSelector(getLOANormalStoreColalteralLandCTXD(uuIdData ?? '', activeSubType ?? '', SubTypeItemsActive ?? ''))
  const dataCTXD = useSelector(getLOANormalStoreColalteralLandCTXDData(uuIdData ?? '',
    activeSubType ?? '',
    SubTypeItemsActive ?? ''))


  const [ isDisiableInput, setIsDisiableInput ] = useState<boolean>(false);
  const [isModalOpenReal,setIsOpenModalReal] = useState<boolean>(false)
  const [isModalOpenGCN,setIsModalOpenGCN] = useState<boolean>(false)
  const [ deleteIdCTXDLandGeneral, setDeleteIdCTXDLandGeneral] = useState<ICTXDLandData | null>(null);

  const activeCTXD = data?.dataCTXDLand?.findIndex(c => c.activeUUIDCTXDLand === data.activeCTXDLand) ?? 0;

  useEffect(() => {
    let isCheck = data ? (data?.dataCTXDLand?.length > 0 ? false : true) : true;
    if (isCheck !== isDisiableInput){
      setIsDisiableInput(isCheck);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (
      uuidActiveCTXDLand?.length === 0
      && !isDisiableInput
    ){
      setIsDisiableInput(true);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[uuidActiveCTXDLand])

  const onChangedatCTXD = (value: string | number | null, key: keyof ICTXDLandData) => {
    dispatch(setDataLandCTXD(value, {
      uuidData: uuIdData ?? '',
      uuidSubType: activeSubType ?? '',
      uuidItems: SubTypeItemsActive ?? '',
      uuidCTXDLand: data?.activeCTXDLand ?? '',
      key
    }))
  }

  const changeLocationCTSX = (dataLocation: SelectLocationValue) => {
    const { country, ...remain } = dataLocation;
    dispatch(setDataLandCTXDLocation(remain, {
      uuidData: uuIdData ?? '',
      uuidSubType: activeSubType ?? '',
      uuidItems: SubTypeItemsActive ?? '',
      uuidCTXDLand: data?.activeCTXDLand ?? '',
    }))
  }

  const changeLocationCTSXCertificate = (dataLocation: SelectLocationValue) => {
    const { country, ...remain } = dataLocation;
    dispatch(setDataLandCTXDLocationCertificate(remain, {
      uuidData: uuIdData ?? '',
      uuidSubType: activeSubType ?? '',
      uuidItems: SubTypeItemsActive ?? '',
      uuidCTXDLand: data?.activeCTXDLand ?? '',
    }))
  }

  const optionsData: ObjectListOption[] = data?.dataCTXDLand?.map((__, i) => ({
    value: i + 1,
    label: `CTXD trên đất ${i + 1}`,
    key: i + 1,
    circle: <MdHomeWork />
  })) ?? [];

  const onAddCTXDLand = () => {
    dispatch(addLandCTXD('', {
      uuidData: uuIdData ?? '',
      uuidSubType: activeSubType ?? '',
      uuidItems: SubTypeItemsActive ?? ''
    }));
  }

  const onChangeHorizonList = (current: number) => {
    const currentActive = data?.dataCTXDLand[current].activeUUIDCTXDLand
    dispatch(onChangeHorizonListLandCTXD(currentActive ?? '', {
      uuidData: uuIdData ?? '',
      uuidSubType: activeSubType ?? '',
      uuidItems: SubTypeItemsActive ?? ''
    }))
  }

  /**
   * Action menu onject list CTXD Land general
   *
   */
  const onHandleClickMenuCTXDLandGeneral = (menu: ObjectListMenuItem, position: number) => {
    let _CIXDLandgeneral = data?.dataCTXDLand?.find(
      ((cl, index) => index === position)
    );
    if(menu.value === EActionMenu.DELETE){
      _CIXDLandgeneral && setDeleteIdCTXDLandGeneral(_CIXDLandgeneral)
    }
  }

  /**
   * Action menu close modal confirm delete CTXD Land general
   *
   */
  const onHandleCancelConfirmCTXDLandGeneral = () => setDeleteIdCTXDLandGeneral(null);

  /**
   * Action menu success delete CTXD Land general
   *
   */
  const onHandleConfirmCTXDLandGeneral = () => {
    let _uuidDelete = deleteIdCTXDLandGeneral?.activeUUIDCTXDLand;

    if (!_uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }else{
      let indexCTXDLand = data?.dataCTXDLand?.findIndex(
        ((cl) => cl.activeUUIDCTXDLand === _uuidDelete)
      );

      dispatch(removeLandCTXD(_uuidDelete, {
        uuidData: uuIdData ?? '',
        uuidSubType: activeSubType ?? '',
        uuidItems: SubTypeItemsActive ?? '',
        price_cert_uuid: "", 
        price_cert_asset_uuid: "",
        land_const_item_uuid : "",
      }));

      indexCTXDLand && notify(`Xóa CTXD trên đất ${indexCTXDLand + 1} thành công`, 'success');
    }

    onHandleCancelConfirmCTXDLandGeneral();
  }
  useEffect(() =>{
    if(data?.dataCTXDLand){
      dispatch(onChangeHorizonListLandCTXD(data?.dataCTXDLand[0]?.activeUUIDCTXDLand ?? '', {
        uuidData: uuIdData ?? '',
        uuidSubType: activeSubType ?? '',
        uuidItems: SubTypeItemsActive ?? ''
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const getMessage = useNormalCollateralMessage()
  const openModalReal = () =>{
    setIsOpenModalReal(!isModalOpenReal)
  }
  const openModalGCN = () =>{
      setIsModalOpenGCN(!isModalOpenGCN)
  }
  return (
    <Grid container className="py-3">
      <Grid item xl={12} className="pb-3">
        <HorizontalList
          onAdd={onAddCTXDLand}
          enableAdd={!ruleDisabled}
          enableMenu={!ruleDisabled}
          current={activeCTXD}
          options={optionsData}
          onChange={onChangeHorizonList}
          menu={[
            {
              label: "Xóa",
              value: EActionMenu.DELETE,
              isDanger: true
            }
          ]}
          onClickMenu={onHandleClickMenuCTXDLandGeneral}
        />
      </Grid>

      <Grid item xl={12}>
        <CardInside title="I. Thông tin chung của CTXD" fieldsetClass="px-4" classBody="h-full p-6" >
          <Grid container spacing={3}>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <SelectConstructionPermit
                label="1. Pháp lý CTXD "
                required
                onChange={(val) => { onChangedatCTXD(val, 'asset_legal')
                  if(val !== "OTHER"){
                    onChangedatCTXD(null, 'legal_CTXD_other')
                  }
                }}
                value={dataCTXD?.asset_legal}
                disabled={isDisiableInput || ruleDisabled}
                sx={SxSelectDisiable}
                message={ getMessage('asset_legal',{position:SubTypeItemsActive, type:'CTXD_LAND', active: data?.dataCTXDLand[activeCTXD]?.activeUUIDCTXDLand ?? ''})}
              />
            </Grid>
            <Grid item xl={9} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="2. Pháp lý CTXD khác"
                required={dataCTXD?.asset_legal === "OTHER" ? true : false}
                onDebounce={(val) => { onChangedatCTXD(val, 'legal_CTXD_other') }}
                value={dataCTXD?.legal_CTXD_other}
                disabled={(dataCTXD?.asset_legal === "OTHER" ? false : true) || ruleDisabled}
                message={ getMessage('legal_CTXD_other',{position:SubTypeItemsActive, type:'CTXD_LAND', active: data?.activeCTXDLand ?? ''})}
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
                      label="3. Địa chỉ thực tế nhà ở/CTXD"
                      format
                      // required
                      onDebounce={(val) => { onChangedatCTXD(val, 'address') }}
                      value={dataCTXD?.address}
                      disabled={isDisiableInput || ruleDisabled}

                    />
                    <IconButton
                      sx={{ padding: 0 }}
                      className="icon-copy"
                      onClick={openModalReal}
                    >
                      <IconCopy />
                    </IconButton>
                  </Grid>
                }
                label={[
                  '4. Tỉnh/TP',
                  '5. Quận/huyện',
                  '6. Phường/xã'
                ]}
                onChange={changeLocationCTSX}
                value={{
                  country: "VN",
                  province: dataCTXD?.provice ?? "",
                  district: dataCTXD?.district ?? "",
                  ward: dataCTXD?.ward ?? ""
                }}
                disabled={isDisiableInput || ruleDisabled}
                required={[true,true,true]}
                message={[
                  getMessage('province',{position:SubTypeItemsActive,pv:'', type:'CTXD_LAND'}),
                  getMessage('district',{position:SubTypeItemsActive,pv:'', type:'CTXD_LAND'}),
                  getMessage('ward',{position:SubTypeItemsActive,pv:'', type:'CTXD_LAND'}),
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
                      label="7. Địa chỉ thực tế nhà ở/CTXD"
                      format
                      // required
                      onDebounce={(val) => { onChangedatCTXD(val, 'certificate_address') }}
                      value={dataCTXD?.certificate_address}
                      disabled={isDisiableInput || ruleDisabled}
                    />
                    <IconButton
                      sx={{ padding: 0 }}
                      className="icon-copy"
                      onClick={openModalGCN}
                    >
                      <IconCopy />
                    </IconButton>
                  </Grid>
                }
                label={[
                  '8. Tỉnh/TP',
                  '9. Quận/huyện',
                  '10. Phường/xã'
                ]}
                onChange={changeLocationCTSXCertificate}
                value={{
                  country: "VN",
                  province: dataCTXD?.certificate_province ?? "",
                  district: dataCTXD?.certificate_district ?? "",
                  ward: dataCTXD?.certificate_ward ?? ""
                }}
                disabled={isDisiableInput || ruleDisabled}
                required={[true,true,true]}
                message={[
                  getMessage('province',{position:SubTypeItemsActive,pv:'certificate', type:'CTXD_LAND'}),
                  getMessage('district',{position:SubTypeItemsActive,pv:'certificate', type:'CTXD_LAND'}),
                  getMessage('ward',{position:SubTypeItemsActive,pv:'certificate', type:'CTXD_LAND'}),
              ]}
              />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>

      <ModalConfirm open={ deleteIdCTXDLandGeneral !== null } onClose={ onHandleCancelConfirmCTXDLandGeneral } onConfirm={ onHandleConfirmCTXDLandGeneral }>
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa CTXD trên đất ?
        </Box>
      </ModalConfirm>
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
    </Grid>
  )
}

export default CTXDLandInformationGeneral;

