import { Grid } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import CardInside from 'views/components/layout/CardInside';
import Input from 'views/components/base/Input';
import SelectLocation, {
  SelectLocationValue,
} from 'views/components/widgets/SelectLocation';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCollateralPriceCertUuid,
  getLoanNormalSubTypeItemsActive,
  getLOANormalStoreColalteralLandCTXD,
  getLOANormalStoreColalteralLandCTXDData,
  getLOANormalStoreColalteralLandCTXDUuidActive,
  getLOANormalStoreDataItemActive,
  getTypeLand,
  ValidateCollateralRestStorage,
} from 'features/loan/normal/storage/collateralV2/selector';
import {
  addLandCTXD,
  clearFieldCTXDType,
  onChangeHorizonListLandCTXD,
  removeLandCTXD,
  setCollateralValidate,
  setDataLandCTXD,
  setDataLandCTXDLocation,
  setDataLandCTXDLocationCertificate,
} from 'features/loan/normal/storage/collateralV2/actions';
import {
  ICTXDLandData,
  IValueOnChangeCollateral,
} from 'types/models/loan/normal/storage/CollaretalV2';
import HorizontalList from 'views/components/layout/HorizontalList';
import { EActionMenu } from 'features/loan/normal/storage/collateralV2/case';
import {
  ObjectListMenuItem,
  ObjectListOption,
} from 'views/components/layout/ObjectList';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import { Box } from '@mui/system';
import useNotify from 'app/hooks/useNotify';
import { MdHomeWork } from 'react-icons/md';
import SelectConstructionPermit from 'views/components/widgets/SelectConstructionPermit';
import { SxSelectDisiable } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import { IconButton } from '@mui/material';
import IconCopy from 'views/components/layout/IconCopy';
import ModalCollateralAddress from 'views/pages/LOAN/widgets/ModalCollateralAddress';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import ButtonAttachFile from 'views/components/base/ButtonAttachFile';
import AttachmentCTXD from './AttachmentCTXD';
import * as _ from 'lodash';
import { getCountAttachment } from 'views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook';
export interface CTXDLandInformationGeneralProps {
  activeSubType?: string;
  uuIdData?: string;
}

// TODO: CTXD Thôn tin chung
const CTXDLandInformationGeneral: FunctionComponent<
  CTXDLandInformationGeneralProps
> = (props) => {
  const { activeSubType = '', uuIdData = '' } = props;
  const dispatch = useDispatch();
  const notify = useNotify();
  const ruleDisabled = useSelector(getRuleDisbled);
  const SubTypeItemsActive = useSelector(
    getLoanNormalSubTypeItemsActive(uuIdData, activeSubType)
  );
  const validRest = useSelector(ValidateCollateralRestStorage);
  const uuidActiveCTXDLand = useSelector(
    getLOANormalStoreColalteralLandCTXDUuidActive(
      uuIdData ?? '',
      activeSubType ?? '',
      SubTypeItemsActive ?? ''
    )
  );
  const data = useSelector(
    getLOANormalStoreColalteralLandCTXD(
      uuIdData ?? '',
      activeSubType ?? '',
      SubTypeItemsActive ?? ''
    )
  );

  const dataCTXD = useSelector(
    getLOANormalStoreColalteralLandCTXDData(
      uuIdData ?? '',
      activeSubType ?? '',
      SubTypeItemsActive ?? ''
    )
  );
  const price_cert_uuid = useSelector(getCollateralPriceCertUuid(uuIdData));
  const curentItem = useSelector(
    getLOANormalStoreDataItemActive(uuIdData, activeSubType)
  );
  const TypeLand = useSelector(getTypeLand(uuIdData, activeSubType, SubTypeItemsActive ?? ""))
  
  const [isDisiableInput, setIsDisiableInput] = useState<boolean>(false);
  const [isModalOpenReal, setIsOpenModalReal] = useState<boolean>(false);
  const [isModalOpenGCN, setIsModalOpenGCN] = useState<boolean>(false);
  const [deleteIdCTXDLandGeneral, setDeleteIdCTXDLandGeneral] =
    useState<ICTXDLandData | null>(null);
  const [openAttachModal, setOpenAttachModal] = useState<{
    uuid: string;
    open: boolean;
  }>({ open: false, uuid: '' });
  const activeCTXD =
    data?.dataCTXDLand?.findIndex(
      (c) => c.activeUUIDCTXDLand === data.activeCTXDLand
    ) ?? 0;

  const disabledAcceptown = (TypeLand === "CTXD_LAND" && dataCTXD?.asset_legal !=="ACCEPTOWN")
      
  // useEffect(()=>{
  //   if(disabledAcceptown){
  //     // dispatch(clearFieldCTXDType(null, {
  //     //   uuidData: uuIdData ?? '',
  //     //   uuidSubType: activeSubType ?? '',
  //     //   uuidItems: SubTypeItemsActive ?? '',
  //     //   uuidCTXDLand: data?.activeCTXDLand ?? '',
  //     // }))
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[disabledAcceptown])

  useEffect(() => {
    let isCheck = data ? (data?.dataCTXDLand?.length > 0 ? false : true) : true;
    if (isCheck !== isDisiableInput) {
      setIsDisiableInput(isCheck);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (uuidActiveCTXDLand?.length === 0 && !isDisiableInput) {
      setIsDisiableInput(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuidActiveCTXDLand]);

  const onChangedatCTXD = (
    value: IValueOnChangeCollateral,
    key: keyof ICTXDLandData,
    isSetAssetLegal?: boolean
  ) => {
    dispatch(
      setDataLandCTXD(value, {
        uuidData: uuIdData ?? '',
        uuidSubType: activeSubType ?? '',
        uuidItems: SubTypeItemsActive ?? '',
        uuidCTXDLand: data?.activeCTXDLand ?? '',
        key,
        isSetAssetLegal
      })
    );
  };

  const changeLocationCTSX = (dataLocation: SelectLocationValue) => {
    const { country, ...remain } = dataLocation;
    dispatch(
      setDataLandCTXDLocation(remain, {
        uuidData: uuIdData ?? '',
        uuidSubType: activeSubType ?? '',
        uuidItems: SubTypeItemsActive ?? '',
        uuidCTXDLand: data?.activeCTXDLand ?? '',
      })
    );
  };

  const changeLocationCTSXCertificate = (dataLocation: SelectLocationValue) => {
    const { country, ...remain } = dataLocation;
    dispatch(
      setDataLandCTXDLocationCertificate(remain, {
        uuidData: uuIdData ?? '',
        uuidSubType: activeSubType ?? '',
        uuidItems: SubTypeItemsActive ?? '',
        uuidCTXDLand: data?.activeCTXDLand ?? '',
      })
    );
  };

  const optionsData: ObjectListOption[] =
    data?.dataCTXDLand?.map((__, i) => ({
      value: i + 1,
      label: `CTXD trên đất ${i + 1}`,
      key: i + 1,
      circle: <MdHomeWork />,
    })) ?? [];
  console.log('optionData', optionsData);
  const onAddCTXDLand = () => {
    dispatch(
      addLandCTXD('', {
        uuidData: uuIdData ?? '',
        uuidSubType: activeSubType ?? '',
        uuidItems: SubTypeItemsActive ?? '',
      })
    );
  };

  const onChangeHorizonList = (current: number) => {
    const currentActive = data?.dataCTXDLand[current].activeUUIDCTXDLand;
    dispatch(
      onChangeHorizonListLandCTXD(currentActive ?? '', {
        uuidData: uuIdData ?? '',
        uuidSubType: activeSubType ?? '',
        uuidItems: SubTypeItemsActive ?? '',
      })
    );
  };

  /**
   * Action menu onject list CTXD Land general
   *
   */
  const onHandleClickMenuCTXDLandGeneral = (
    menu: ObjectListMenuItem,
    position: number
  ) => {
    let _CIXDLandgeneral = data?.dataCTXDLand?.find(
      (cl, index) => index === position
    );
    if (menu.value === EActionMenu.DELETE) {
      _CIXDLandgeneral && setDeleteIdCTXDLandGeneral(_CIXDLandgeneral);
    }
  };

  /**
   * Action menu close modal confirm delete CTXD Land general
   *
   */
  const onHandleCancelConfirmCTXDLandGeneral = () =>
    setDeleteIdCTXDLandGeneral(null);

  /**
   * Action menu success delete CTXD Land general
   *
   */
  const onHandleConfirmCTXDLandGeneral = () => {
    let _uuidDelete = deleteIdCTXDLandGeneral?.activeUUIDCTXDLand;

    if (!_uuidDelete) {
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    } else if (data && data.dataCTXDLand?.length > 1) {
      dispatch(
        removeLandCTXD(_uuidDelete, {
          uuidData: uuIdData ?? '',
          uuidSubType: activeSubType ?? '',
          uuidItems: SubTypeItemsActive ?? '',
          price_cert_uuid: price_cert_uuid ?? '',
          price_cert_asset_uuid: curentItem?.price_cert_asset_uuid ?? '',
          land_const_item_uuid:
            deleteIdCTXDLandGeneral?.land_const_item_uuid ?? '',
        })
      );
    } else {
      notify('Không thể xóa, Phải có ít nhất 1 CTXD trên đất', 'error');
    }
    // indexCTXDLand && notify(`Xóa CTXD trên đất ${indexCTXDLand + 1} thành công`, "success");
    onHandleCancelConfirmCTXDLandGeneral();
  };
  useEffect(() => {
    if (data?.dataCTXDLand) {
      dispatch(
        onChangeHorizonListLandCTXD(
          data?.dataCTXDLand[0]?.activeUUIDCTXDLand ?? '',
          {
            uuidData: uuIdData ?? '',
            uuidSubType: activeSubType ?? '',
            uuidItems: SubTypeItemsActive ?? '',
          }
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getMessage = useNormalCollateralMessage();
  const openModalReal = () => {
    setIsOpenModalReal(!isModalOpenReal);
  };
  const openModalGCN = () => {
    setIsModalOpenGCN(!isModalOpenGCN);
  };

  const handleAttach = () => {
    if (validRest.valid) {
      dispatch(setCollateralValidate({ valid: true }));
      setOpenAttachModal({ uuid: '', open: true });
    } else {
      dispatch(setCollateralValidate(validRest));
      notify(
        validRest.message
          ? validRest.message
          : 'Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại',
        'warning'
      );
    }
  };

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
              label: 'Xóa',
              value: EActionMenu.DELETE,
              isDanger: true,
            },
          ]}
          onClickMenu={onHandleClickMenuCTXDLandGeneral}
        />
      </Grid>
      {optionsData.length > 0 && (
        <ButtonAttachFile
          onClick={handleAttach}
          attachment={getCountAttachment(
            _.get(data, ['dataCTXDLand', activeCTXD, 'documents'], [])
          )}
        />
      )}
      <Grid item xl={12}>
        <CardInside
          title="I. Thông tin chung của CTXD"
          fieldsetClass="px-4"
          classBody="h-full p-6"
        >
          <Grid container spacing={3}>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <SelectConstructionPermit
                label="1. Pháp lý CTXD "
                required
                onChange={(val) => {
                  onChangedatCTXD(val, 'asset_legal', true);
                  if (val !== 'OTHER') {
                    onChangedatCTXD(null, 'legal_CTXD_other');
                  }
                }}
                value={dataCTXD?.asset_legal ?? ''}
                disabled={isDisiableInput || ruleDisabled}
                sx={SxSelectDisiable}
                message={getMessage('asset_legal', {
                  position: SubTypeItemsActive,
                  type: 'CTXD_LAND',
                  active:
                    data?.dataCTXDLand[activeCTXD]?.activeUUIDCTXDLand ?? '',
                })}
              />
            </Grid>
            <Grid item xl={9} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="2. Pháp lý CTXD khác"
                required={dataCTXD?.asset_legal === 'OTHER' ? true : false}
                onDebounce={(val) => {
                  onChangedatCTXD(val, 'legal_CTXD_other');
                }}
                value={dataCTXD?.legal_CTXD_other ?? ''}
                disabled={
                  (dataCTXD?.asset_legal === 'OTHER' ? false : true) ||
                  ruleDisabled
                }
                message={getMessage('legal_CTXD_other', {
                  position: SubTypeItemsActive,
                  type: 'CTXD_LAND',
                  active: data?.activeCTXDLand ?? '',
                })}
              />
            </Grid>

            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                '& .icon-copy': {
                  zIndex: '1000',
                  position: 'absolute',
                  cursor: 'pointer',
                },
              }}
            >
              <SelectLocation
                col={3}
                before={
                  <Grid
                    item
                    xl={3}
                    lg={3}
                    md={3}
                    sm={12}
                    xs={12}
                    sx={{
                      display: 'flex',
                      flexFlow: 'row-reverse',
                    }}
                  >
                    <Input
                      label="3. Địa chỉ thực tế nhà ở/CTXD"
                      format
                      // required
                      onDebounce={(val) => {
                        onChangedatCTXD(val, 'address');
                      }}
                      value={dataCTXD?.address ?? ''}
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
                label={['4. Tỉnh/TP', '5. Quận/huyện', '6. Phường/xã']}
                onChange={changeLocationCTSX}
                value={{
                  country: 'VN',
                  province: dataCTXD?.provice ?? '',
                  district: dataCTXD?.district ?? '',
                  ward: dataCTXD?.ward ?? '',
                }}
                disabled={isDisiableInput || ruleDisabled}
                required={[true, true, true]}
                message={[
                  getMessage('province', {
                    position: SubTypeItemsActive,
                    pv: '',
                    type: 'CTXD_LAND',
                  }),
                  getMessage('district', {
                    position: SubTypeItemsActive,
                    pv: '',
                    type: 'CTXD_LAND',
                  }),
                  getMessage('ward', {
                    position: SubTypeItemsActive,
                    pv: '',
                    type: 'CTXD_LAND',
                  }),
                ]}
              />
            </Grid>
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                '& .icon-copy': {
                  zIndex: '1000',
                  position: 'absolute',
                  cursor: 'pointer',
                },
              }}
            >
              <SelectLocation
                col={3}
                before={
                  <Grid
                    item
                    xl={3}
                    lg={3}
                    md={3}
                    sm={12}
                    xs={12}
                    sx={{
                      display: 'flex',
                      flexFlow: 'row-reverse',
                    }}
                  >
                    <Input
                      label="7. Địa chỉ theo GCN"
                      format
                      // required
                      onDebounce={(val) => {
                        onChangedatCTXD(val, 'certificate_address');
                      }}
                      value={dataCTXD?.certificate_address ?? ''}
                      disabled={isDisiableInput || ruleDisabled || disabledAcceptown}
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
                label={['8. Tỉnh/TP', '9. Quận/huyện', '10. Phường/xã']}
                onChange={changeLocationCTSXCertificate}
                value={{
                  country: 'VN',
                  province: dataCTXD?.certificate_province ?? '',
                  district: dataCTXD?.certificate_district ?? '',
                  ward: dataCTXD?.certificate_ward ?? '',
                }}
                disabled={isDisiableInput || ruleDisabled || disabledAcceptown}
                required={[true, true, true]}
                message={[
                  getMessage('province', {
                    position: SubTypeItemsActive,
                    pv: 'certificate',
                    type: 'CTXD_LAND',
                  }),
                  getMessage('district', {
                    position: SubTypeItemsActive,
                    pv: 'certificate',
                    type: 'CTXD_LAND',
                  }),
                  getMessage('ward', {
                    position: SubTypeItemsActive,
                    pv: 'certificate',
                    type: 'CTXD_LAND',
                  }),
                ]}
              />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>

      <ModalConfirm
        open={deleteIdCTXDLandGeneral !== null}
        onClose={onHandleCancelConfirmCTXDLandGeneral}
        onConfirm={onHandleConfirmCTXDLandGeneral}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa CTXD trên đất ?
        </Box>
      </ModalConfirm>
      <ModalCollateralAddress
        open={isModalOpenReal}
        onClose={openModalReal}
        onSave={(data) => {
          onChangedatCTXD(data.apartment, 'address');
          onChangedatCTXD(data.province, 'provice');
          onChangedatCTXD(data.district, 'district');
          onChangedatCTXD(data.ward, 'ward');
          openModalReal();
          notify('Copy địa chỉ thành công', 'success');
        }}
      />
      <ModalCollateralAddress
        open={isModalOpenGCN}
        onClose={openModalGCN}
        onSave={(data) => {
          onChangedatCTXD(data.apartment, 'certificate_address');
          onChangedatCTXD(data.province, 'certificate_province');
          onChangedatCTXD(data.district, 'certificate_district');
          onChangedatCTXD(data.ward, 'certificate_ward');
          openModalGCN();
          notify('Copy địa chỉ thành công', 'success');
        }}
      />
      {openAttachModal.open && (
        <AttachmentCTXD
          open={openAttachModal.open}
          onClose={() => setOpenAttachModal({ open: false, uuid: '' })}
          activeCTXDUUid={_.get(
            data,
            ['dataCTXDLand', activeCTXD, 'activeUUIDCTXDLand'],
            ''
          )}
          data={_.get(data, ['dataCTXDLand', activeCTXD, 'documents'], [])}
          onChange={(newDocs) => onChangedatCTXD(newDocs, 'documents')}
          masterData={{
            uuidData: uuIdData ?? '',
            uuidSubType: activeSubType ?? '',
            uuidItems: SubTypeItemsActive ?? '',
            uuidCTXDLand: data?.activeCTXDLand ?? '',
          }}
        />
      )}
    </Grid>
  );
};

export default CTXDLandInformationGeneral;
