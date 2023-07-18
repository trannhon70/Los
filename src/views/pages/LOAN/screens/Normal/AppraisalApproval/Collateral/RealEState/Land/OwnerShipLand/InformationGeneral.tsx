import { Grid } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import CardInside from 'views/components/layout/CardInside';
import Input from 'views/components/base/Input';
import SelectLocation from 'views/components/widgets/SelectLocation';
import { useDispatch, useSelector } from 'react-redux';
import {
  onChangeHorizonListLandCTXDApproval
} from 'features/loan/normal/storageApproval/collateral/actions';
import HorizontalList from 'views/components/layout/HorizontalList';
import {  ObjectListOption } from 'views/components/layout/ObjectList';
import { MdHomeWork } from 'react-icons/md';
import SelectConstructionPermit from 'views/components/widgets/SelectConstructionPermit';
import { SxSelectDisiable } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import { IconButton } from '@mui/material';
import IconCopy from 'views/components/layout/IconCopy';
import { 
  getLoanNormalSubTypeItemsActiveApproval,
  getLOANormalStoreColalteralLandCTXDApproval,
  getLOANormalStoreColalteralLandCTXDDataApproval
 } from 'features/loan/normal/storageApproval/collateral/selector';
import ButtonAttachFile from 'views/components/base/ButtonAttachFile';
import { getCountAttachment } from 'views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook';
import * as _ from 'lodash'
import AttachmentCTXD from './AttachmentCTXD';
import { ICTXDLandData, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import { setDataLandCTXD } from 'features/loan/normal/storage/collateralV2/actions';
export interface CTXDLandInformationGeneralProps {
  activeSubType?: string;
  uuIdData?: string;
}

// TODO: CTXD Thôn tin chung
const CTXDLandInformationGeneral: FunctionComponent<CTXDLandInformationGeneralProps> = (props) => {

  const { activeSubType = "", uuIdData = "" } = props
  const dispatch = useDispatch();

  const [openAttachModal, setOpenAttachModal] = useState<{
    uuid: string;
    open: boolean;
  }>({ open: false, uuid: "" });
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActiveApproval(uuIdData, activeSubType));
  const data = useSelector(getLOANormalStoreColalteralLandCTXDApproval(uuIdData ?? '', activeSubType ?? '', SubTypeItemsActive ?? ''))
  const dataCTXD = useSelector(getLOANormalStoreColalteralLandCTXDDataApproval(uuIdData ?? '',
    activeSubType ?? '',
    SubTypeItemsActive ?? ''))    
  
    console.log('dataCTXDs2',dataCTXD);
    console.log('datas2',data);
    
    
  useEffect(() =>{
    if(data?.dataCTXDLand){
      dispatch(onChangeHorizonListLandCTXDApproval(data?.dataCTXDLand[0]?.activeUUIDCTXDLand ?? '', {
        uuidData: uuIdData ?? '',
        uuidSubType: activeSubType ?? '',
        uuidItems: SubTypeItemsActive ?? ''
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const activeCTXD =
  data?.dataCTXDLand?.findIndex(
    (c) => c.activeUUIDCTXDLand === data.activeCTXDLand
  ) ?? 0;

  const optionsData: ObjectListOption[] = data?.dataCTXDLand?.map((__, i) => ({
    value: i + 1,
    label: `CTXD trên đất ${i + 1}`,
    key: i + 1,
    circle: <MdHomeWork />
  })) ?? [];
  const onChangedatCTXD = (
    value: IValueOnChangeCollateral,
    key: keyof ICTXDLandData
  ) => {
    dispatch(
      setDataLandCTXD(value, {
        uuidData: uuIdData ?? "",
        uuidSubType: activeSubType ?? "",
        uuidItems: SubTypeItemsActive ?? "",
        uuidCTXDLand: data?.activeCTXDLand ?? "",
        key,
      })
    );
  };
  
  const onChangeHorizonList = (current: number) => {
    const currentActive = data?.dataCTXDLand[current].activeUUIDCTXDLand
    dispatch(onChangeHorizonListLandCTXDApproval(currentActive ?? '', {
      uuidData: uuIdData ?? '',
      uuidSubType: activeSubType ?? '',
      uuidItems: SubTypeItemsActive ?? ''
    }))
  }

  return (
    <Grid container className="py-3">
      <Grid item xl={12} className="pb-3">
        <HorizontalList
          enableAdd={false}
          enableMenu={false}
          current={activeCTXD}
          options={optionsData}
          onChange={onChangeHorizonList}
        />
      </Grid>
      {optionsData.length> 0 && <ButtonAttachFile
        onClick={() => setOpenAttachModal({ uuid: "", open: true })}
        attachment={getCountAttachment(_.get(data,['dataCTXDLand',activeCTXD,'documents'],[]))}
      />}

      <Grid item xl={12}>
        <CardInside title="I. Thông tin chung của CTXD" fieldsetClass="px-4" classBody="h-full p-6" >
          <Grid container spacing={3}>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <SelectConstructionPermit
                label="1. Pháp lý CTXD "
                required
                value={dataCTXD?.asset_legal}
                disabled
                sx={SxSelectDisiable}
              />
            </Grid>
            <Grid item xl={9} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="2. Pháp lý CTXD khác"
                required={dataCTXD?.asset_legal === "OTHER" ? true : false}
                value={dataCTXD?.legal_CTXD_other}
                disabled
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
                      value={dataCTXD?.address}
                      disabled

                    />
                    <IconButton
                      sx={{ padding: 0 }}
                      className="icon-copy"
                      disabled
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
                value={{
                  country: "VN",
                  province: dataCTXD?.provice ?? "",
                  district: dataCTXD?.district ?? "",
                  ward: dataCTXD?.ward ?? ""
                }}
                disabled
                required={[true,true,true]}
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
                      value={dataCTXD?.certificate_address}
                      disabled
                    />
                    <IconButton
                      sx={{ padding: 0 }}
                      className="icon-copy"
                      disabled
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
                value={{
                  country: "VN",
                  province: dataCTXD?.certificate_province ?? "",
                  district: dataCTXD?.certificate_district ?? "",
                  ward: dataCTXD?.certificate_ward ?? ""
                }}
                disabled
                required={[true,true,true]}
              />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
      {openAttachModal.open && (
        <AttachmentCTXD
          open={openAttachModal.open}
          onClose={() => setOpenAttachModal({ open: false, uuid: "" })}
          activeCTXDUUid={_.get(data,['dataCTXDLand',activeCTXD,'activeUUIDCTXDLand'],'')}
          data={_.get(data,['dataCTXDLand',activeCTXD,'documents'],[])}
          onChange={(newDocs)=>onChangedatCTXD(newDocs,'documents')}
          masterData={{
            uuidData: uuIdData ?? "",
            uuidSubType: activeSubType ?? "",
            uuidItems: SubTypeItemsActive ?? "",
            uuidCTXDLand: data?.activeCTXDLand ?? "",
          }}
          viewOnly
        />
      )}
    </Grid>
  )
}

export default CTXDLandInformationGeneral;

