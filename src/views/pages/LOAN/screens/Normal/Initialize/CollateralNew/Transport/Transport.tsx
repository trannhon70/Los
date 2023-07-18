import { Box, Collapse, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import useNotify from 'app/hooks/useNotify';
import {
  addCollaretalRPRO,
  deleleteSubtypeItem,
  deleteAllCollateral,
  deleteCollateralItem,
  onChangeCollaretalProperty,
  onChangeCollaretalRPRO,
  postCollaterals,
  setCheckboxTransportType,
  setCollaretalRPRO,
  setMachineLocation,
  setSubType,
  updateCollaterals
} from 'features/loan/normal/storage/collateralV2/actions';
import { EDetailsTransport } from 'features/loan/normal/storage/collateralV2/case';
import { getCollateralIgnore, getIsCollapseActive } from 'features/loan/normal/storage/collateralV2/selector';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, SyntheticEvent, useRef, useState } from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { ILOANNormalCollateralData, ISubItems, ISubtype, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import { formatNumber } from 'utils';
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import TabPanel from 'views/components/layout/TabPanel';
import SelectCountriesManufacture from 'views/components/widgets/SelectCountriesManufacture';
import SelectLocation, { SelectLocationValue } from 'views/components/widgets/SelectLocation';
import SelectorVehicleDetail from 'views/components/widgets/SelectorVehicleDetail';
import SelectVehicleStatus from 'views/components/widgets/SelectVehicleStatus';
import SelectVehicleType from 'views/components/widgets/SelectVehicleType';
import { SxCollateralTabs , SxSelectCollateralType } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import InfoReportCollaretalType from 'views/pages/LOAN/widgets/CollaretalForm/TableInfoReportCollaretalType';
import ButtonDetailSubItemAttachment from '../ButtonDetailSubItemAttachment';
import LegalInformationOwner from '../LegalInformationOwner';
import useStorageCollateral from '../useStorageCollateral';
import AssessmentTransportType from './Assessment';
import CheckBoxLegalDocs, { CheckBoxRef } from './CheckBoxLegalDocs';
import { useEffect } from 'react';
import SelectTransportBrand from 'views/components/widgets/SelectTransportBrand';
import { getLOANNormalConfigMetadataConstant } from 'features/loan/normal/configs/metadata/selector';
import { getLOANNormalConfigVehicleDetail } from 'features/loan/normal/configs/vehicle-detail/selectors';
import useMasterData from 'app/hooks/useMasterData';
import { METADATA_CONSTANT } from 'utils/constants';
import { useTranslation } from 'react-i18next';
import useBackdrop from 'app/hooks/useBackdrop';


export interface TransportProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
}

const Transport: FC<TransportProps> = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation() 
  const { collateralData, subType } = props;
  const ruleDisabled = useSelector(getRuleDisbled)
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [CurrentTab, setCurrentTab] = useState(0);
  const [stateActive, setStateActive] = useState<string>("");
  const dataIgnore = useSelector(getCollateralIgnore);
  const { VehicleType, register } = useMasterData();
    
  useEffect(() => {
    register('vehicleType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const changeTab = (e: SyntheticEvent, newValue: number) => {
    if (newValue !== CurrentTab) {
      setCurrentTab(newValue);
    }
    return false;
  };
  const [deleteOther, setDeleteOther] = useState<ISubItems | null>(null);
  const notify = useNotify();
  const handleTabPanel = (index: number) => {
    setCurrentTab(index);
  };
  const clickOpen = () => {
    if (subType?.id === "") {
      return notify("Vui lòng chọn loại PTVT", 'warning')
    }
    setIsOpen(!isOpen);
  }
  const getMessage = useNormalCollateralMessage();
  const checkboxRef = useRef<CheckBoxRef>(null);
  const metadataConstant = useSelector(getLOANNormalConfigMetadataConstant) 
  const vehicleDetail = useSelector(getLOANNormalConfigVehicleDetail)
  const {
    getDataCollateral,
    TotalValueTransportType,
    SubTypeId,
    SubTypeItems,
    SubTypeItemsActive,
    dataItems,
    dataLegalDocs,
  } = useStorageCollateral("ALL",
    collateralData?.uuidActiveData ?? "",
    subType?.uuidActiveSubtype ?? "");
  const handleChangeParent = () => {
      dispatch(
        setCheckboxTransportType("", {
          uuidActiveData: collateralData?.uuidActiveData ?? "",
          uuidActiveSubtype: subType?.uuidActiveSubtype ?? "",
          uuidActiveitems: SubTypeItemsActive ?? "",
          dataMeta: checkboxRef.current?.getValue() ?? [],
          parentId: undefined,
          otherFlag: "",
        })
      );
  };

  const handleChangeChild = (
    parentId: string,
    otherFlag: string,
    otherValue?: string | null
  ) => {
    dispatch(
      setCheckboxTransportType("", {
        uuidActiveData: collateralData?.uuidActiveData ?? "",
        uuidActiveSubtype: subType?.uuidActiveSubtype ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
        dataMeta: checkboxRef.current?.getValueChild() ?? [],
        parentId: parentId,
        otherFlag,
        otherValue,
      })
    );
  };

  const onHandleChangeKey = (value: IValueOnChangeCollateral, key: keyof ILOANNormalCollateralData) => {
    collateralData && dispatch(onChangeCollaretalProperty(value, { key: key, uuid: collateralData.uuidActiveData }));
  }
  const changeLocation = (data: SelectLocationValue) => {
    const { country, ...remain } = data;
    collateralData && dispatch(setMachineLocation(remain, { uuidData: collateralData.uuidActiveData }))
  }
  const onChangeSubTypeTransport = (value: string) => {
    dispatch(setSubType(value, { uuidSubType: subType?.uuidActiveSubtype ?? "", uuidData: collateralData?.uuidActiveData ?? "" }));
  }

  const { showBackdrop } = useBackdrop();
  const isCollapsedItem = useSelector(getIsCollapseActive);

  const onAdd = () => {
    if (isCollapsedItem) {
      showBackdrop(true);
      if (isCollapsedItem.isSaved && isCollapsedItem.price_cert_uuid) {
        dispatch(updateCollaterals({type: isCollapsedItem.type , addItem: true} ))
      }
      else {
        dispatch(postCollaterals({type:isCollapsedItem.type, addItem: true}))
      }
    }
    setCurrentTab(0)
  }
  const optionsData: IGroupListBase[] = SubTypeItems?.map((__, i) => ({
    value: i + 1,
    label: `PTVT ${i + 1}`,
    key: i + 1,
    valueMoney: `${formatNumber(__?.value?.toString() ?? "0")} VNĐ`
  })) ?? []
  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = SubTypeItems[current].activeUUID ?? ''
    dispatch(onChangeCollaretalRPRO(currentActive, { uuid: collateralData?.uuidActiveData ?? "", uuidActive: subType?.uuidActiveSubtype ?? "" }))
    setStateActive(currentActive)
    setCurrentTab(0)
  }

  const onChangeDataDetails = (value: IValueOnChangeCollateral, key: keyof ISubItems) => {
    dispatch(setCollaretalRPRO(value, { uuid: collateralData?.uuidActiveData ?? "", uuidActive: subType?.uuidActiveSubtype ?? "", key }))
  }
  const onHandleConfirmCer = () => {
    if(optionsData.length === 1 ){
      collateralData && dispatch(deleteAllCollateral({
        cert_uuid: collateralData.price_cert_uuid,
        uuid: collateralData.uuidActiveData
      },{key:"item"})) 
    }else if (collateralData?.uuidActiveData) {
      const dataPos = deleteOther?.activeUUID /// active local
      if (deleteOther?.price_cert_asset_uuid) {
        dispatch(deleteCollateralItem(
          dataPos ?? "",
          {
            price_cert_uuid: collateralData.price_cert_uuid ?? "",
            price_cert_asset_uuid: deleteOther?.price_cert_asset_uuid ?? "",
            uuidData: collateralData?.uuidActiveData ?? "",
            uuidSubType: subType?.uuidActiveSubtype ?? "",
          }
        ));
      } else {
        dispatch(
          deleleteSubtypeItem(dataPos ?? "", {
            uuidData: collateralData?.uuidActiveData ?? "",
            uuidSubType: subType?.uuidActiveSubtype ?? "",
          })
        );
      notify("Xóa thành công", "success")
      }
    }
    onHandleCancelConfirmOther();
  };
  const onHandleCancelConfirmOther = () => setDeleteOther(null);
  const onHandleClickMenuOther = (menu: IGroupListBase, position: number) => {
    let dataMenuCer = SubTypeItems?.find((cer, index) => index === position);
    setDeleteOther(dataMenuCer ?? null);
  };
  // const onHandleDeleteSubType = () => {
  //   let uuidData = collateralData?.uuidActiveData;
  //   let uuidSubType = subType?.uuidActiveSubtype;

  //   if (uuidData && uuidSubType) {
  //     dispatch(deleleteSubItem(uuidSubType, { uuidData: uuidData }));
  //     clickOpen()
  //   }
  // };
  useEffect(()=>{
    // set collateral value khi TotalValueTransportType  thay đổi
    onHandleChangeKey(TotalValueTransportType, 'collateral_value')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[TotalValueTransportType])

  const ortherBranchRule = (metadataConstant.data.TRANS_MODEL?.find(i => i.id === dataItems?.brand)?.other_flag !== true)
  return (
    <Fragment>
      <Table>
        <TableBody>
          <InfoReportCollaretalType
            collateralData={collateralData}
            onChangeValueCollateral={onHandleChangeKey}
          />
          <TableRow >
            <TableCell sx={{ border: 'none' }} width='3%'></TableCell>
            <TableCell
              className="text-upper text-primary font-medium pt-6"
              sx={{ border: 'none', display: "flex" }}
              width="100%"
            >
              <Typography color="#1825aa" fontWeight={500} fontSize={14}>
                ĐỊA CHỈ THẨM ĐỊNH
              </Typography>
            </TableCell>
            <TableCell className="px-0 py-6">
              <Grid container spacing={3}>
                <Grid item xl={9}>
                  <SelectLocation
                    col={4}
                    value={{
                      country: 'VN',
                      province: getDataCollateral?.province ?? '',
                      district: getDataCollateral?.district ?? '',
                      ward: getDataCollateral?.ward ?? ''
                    }}
                    label={[
                      '1. Tỉnh/TP',
                      '2. Quận/huyện',
                    ]}
                    onChange={changeLocation}
                    isWard={false}
                    message={[
                      getMessage('province', { position: collateralData?.uuidActiveData ?? '' }),
                      getMessage('district', { position: collateralData?.uuidActiveData ?? '' })
                    ]}
                    required={[true, true]}
                    disabled={ruleDisabled || dataIgnore}
                  />
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border: 'none' }} width='3%'></TableCell>
            <TableCell
              className="text-upper text-primary font-medium pt-6"
              sx={{ border: 'none', display: "flex" }}
              width="100%"
            >
              <Typography color="#1825aa" fontWeight={500} fontSize={14}>
                Tổng giá trị tsbđ

              </Typography>
            </TableCell>
            <TableCell className="px-0 py-6">
              <Grid container spacing={3}>
                <Grid item xl={3}>
                  <Input
                    label="1. Tổng giá trị định giá (VNĐ)"
                    sx={{
                      "& .Mui-disabled": {
                        color: "var(--mscb-danger)",
                        fontSize: "14px",
                        fontWeight: "500",
                        WebkitTextFillColor: "unset"
                      }
                    }}
                    disabled
                    required
                    value={formatNumber(TotalValueTransportType.toString() ?? "0")}
                  />
                </Grid>
                <Grid item xl={3}>
                  <Input
                    label="2. Tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)"
                    placeholder='Nhập tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)'
                    // required
                    type="number"
                    format
                    onDebounce={(val) => { onHandleChangeKey(val, 'max_percentage') }}
                    value={getDataCollateral?.max_percentage?.toString()}
                    message={t(getMessage('max_percentage',{position: collateralData?.uuidActiveData ?? ''}), { percent: metadataConstant?.data[METADATA_CONSTANT.COLLATERAL_LTV_MAX]?.find(i => i.id === getDataCollateral?.type)?.value ?? 100})}
                    disabled={ruleDisabled || dataIgnore}
                  />
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              align="center"
              width={"2%"}
              sx={{ verticalAlign: "top", fontSize: "16px", border: "none" }}
            >
              {/* {1} */}
            </TableCell>
            <TableCell sx={{
              "& .colla-type": {
                minWidth: "245px",
                maxWidth: '245px',
                '&.Mui-disabled': {
                  color: "#1825aa"
                }
              }
            }}>
              <SelectVehicleType
                className="colla-type"
                sx={SxSelectCollateralType}
                onChange={onChangeSubTypeTransport}
                value={SubTypeId ?? ""}
                disabled={ruleDisabled || !!SubTypeId}
              />
            </TableCell>
            <TableCell>
            </TableCell>
            <TableCell className="pl-4"></TableCell>
            <TableCell className="pl-4"></TableCell>
            <TableCell
              className="text-right pr-0 py-2"
              width="140px"
              sx={{ "& svg": { color: "var(--mscb-primary)" } }}
            >
              {/* {  (!subType?.id || ruleDisabled ) ? null : <IconButton
                onClick={onHandleDeleteSubType}
              >
                <IoTrashOutline style={{fontSize: '1.5rem'}}/>
              </IconButton>
              }  */}
              <IconButton sx={{
                '& svg': {
                  transition: 'all ease-in-out 0.3s',
                  ...(isOpen ? {} : { transform: 'rotate(-90deg)' })
                }
              }}
                onClick={clickOpen}
              >
                <BiChevronDownCircle style={{ fontSize: '1.5rem' }}/>
              </IconButton>
            </TableCell>
          </TableRow>
            {
              SubTypeId && <TableRow>
              <TableCell width='3%' sx={{ border: 'none' }}></TableCell>
              <TableCell colSpan={6} className="p-0" >
                <Collapse unmountOnExit={true} timeout={1000} in={isOpen} sx={{
                  border: 'none',
                  "& .MuiCollapse-wrapper": {
                    "& .MuiCollapse-wrapperInner": {
                      paddingLeft: "0"
                    }
                  }
                }}>
                  <TableRow>
                    <TableCell width='100%' sx={{
                      border: 'none', display: 'flex', width: '100%', '& .MuiList-root': {
                        overflow: 'scroll'
                      },
                      "& .group-list": {
                        "& .MuiList-padding": {
                          width: "270px"
                        }
                      }
                    }}>
                      <GroupListBase labelAdd='Thêm PTVT'
                        onAdd={onAdd}
                        className="group-list"
                        activeId={(SubTypeItems?.findIndex(d => d.activeUUID === SubTypeItemsActive) ?? 0) + 1}
                        onSelected={onSelectGroupList}
                        onDelete={onHandleClickMenuOther}
                        options={optionsData}
                        isDelete={ !ruleDisabled && !(SubTypeItems.length === 1)}
                        isValueMoney={true}
                        isAdd={ ruleDisabled || collateralData?.is_compactness === "N"}
  
                      />
                    </TableCell>
                    <TableCell width='100%' sx={{ border: 'none' }}>
                      <Grid container spacing={3} >
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <AssessmentTransportType
                            uuidData={collateralData?.uuidActiveData ?? ""}
                            uuidSubtype={subType?.uuidActiveSubtype ?? ""}
                          />
  
                          <Grid container className="mt-7">
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                              <Typography variant="h6" className='text-upper font-bold' gutterBottom component="div">
                                B. Thông tin pháp lý
                              </Typography>
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                              <Tabs
                                variant="scrollable"
                                value={CurrentTab}
                                indicatorColor="primary"
                                onChange={dataItems && changeTab}
                                scrollButtons="auto"
                                allowScrollButtonsMobile
                                sx={SxCollateralTabs}
                                
                              >
                                <Tab label="Thông tin pháp lý chủ sở hữu" />
                                <Tab label="Thông tin chi tiết" sx={{ borderLeft: "solid 1px #b5b5b5" }} />
                              </Tabs>
                              <SwipeableViews
                                disabled
                                index={CurrentTab}
                                onChangeIndex={handleTabPanel}
                              >
                                <TabPanel padding={false} value={CurrentTab} index={0}>
                                  <LegalInformationOwner
                                    activeSubType={subType?.uuidActiveSubtype ?? ""}
                                    uuIdData={collateralData?.uuidActiveData ?? ""}
                                    isFormLegalInfo={false}
                                  />
                                </TabPanel>
  
                                <TabPanel padding={false} value={CurrentTab} index={1}>
                                <ButtonDetailSubItemAttachment dataItems={dataItems} masterData={{ uuid: collateralData?.uuidActiveData ?? "", uuidActive: subType?.uuidActiveSubtype ?? "", collaretalType:'MEST' }}  />
                                  <CardInside title={`I. Thông tin ${VehicleType?.find(i => i.id === SubTypeId)?.name ?? ""}`} fieldsetClass="px-4" classBody="h-full p-6" >
                                    <Grid container spacing={3}>
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        {
                                          SubTypeId === EDetailsTransport.NRVE ?
                                            <Input
                                              label="1. Loại phương tiện"
                                              placeholder="Nhập loại phương tiện"
                                              required
                                              value={(dataItems?.transportation_sub_type ?? '')}
                                              onDebounce={(val) => {
                                                onChangeDataDetails(val, 'transportation_sub_type')
                                                onChangeDataDetails(null, 'brand')
                                                onChangeDataDetails(null, 'other_brand')
                                              }}
                                              message={getMessage('transportation_sub_type', { position: dataItems?.activeUUID ?? '' })}
                                              disabled={ruleDisabled}
                                            />
                                            :
                                            <SelectorVehicleDetail
                                              label="1. Loại phương tiện"
                                              placeholder="Chọn loại phương tiện"
                                              required
                                              value={(dataItems?.transportation_sub_type ?? '')}
                                              onChange={(val) => {
                                                onChangeDataDetails(val, 'transportation_sub_type')
                                                onChangeDataDetails(null, 'brand')
                                                onChangeDataDetails(null, 'other_brand')
                                                if ((val !== 'TRVE_OTHER' && val !=="SPVE_OTHER") && dataItems?.other_transportation_sub_type !== '') {
                                                  onChangeDataDetails(null, 'other_transportation_sub_type')
                                                }
                                              }}
                                              transportType={SubTypeId}
                                              message={getMessage('transportation_sub_type', { position: dataItems?.activeUUID ?? '' })}
                                              disabled={ruleDisabled}
                                            />
                                        }
                                      </Grid>
                                      {SubTypeId === EDetailsTransport.NRVE
                                        ?
                                        null
                                        :
                                        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                          <Input
                                            label="2. Chi tiết loại phương tiện khác"
                                            placeholder="Nhập chi tiết loại phương tiện khác"
                                            required={SubTypeId === EDetailsTransport.NRVE ? false : (vehicleDetail.data.find(i=>i.id === dataItems?.transportation_sub_type)?.other_value_flag === "Y" ? true : false)}
                                            value={(dataItems?.other_transportation_sub_type ?? '')}
                                            onDebounce={(val) => onChangeDataDetails(val, 'other_transportation_sub_type')}
                                            disabled={SubTypeId === EDetailsTransport.NRVE ? false : (vehicleDetail.data.find(i=>i.id === dataItems?.transportation_sub_type)?.other_value_flag === "Y" ? false : true) || ruleDisabled}
                                            message={getMessage('other_transportation_sub_type', { position: dataItems?.activeUUID ?? '' })}
  
                                          />
                                        </Grid>}

                                      {
                                        SubTypeId === EDetailsTransport.NRVE ?
                                          <Fragment>
                                            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                              <Input
                                                label="2. Nhãn hiệu"
                                                placeholder="Nhập nhãn hiệu"
                                                required={vehicleDetail.data.find(i => i.id === dataItems?.transportation_sub_type)?.other_value_flag !== "Y"}
                                                value={(dataItems?.brand ?? '')}
                                                onDebounce={(val) => {
                                                  onChangeDataDetails(val, 'brand')
                                                  onChangeDataDetails(null, 'other_brand')
                                                }}
                                                message={getMessage('branch', { position: dataItems?.activeUUID ?? '' })}
                                                disabled={ruleDisabled || vehicleDetail.data.find(i => i.id === dataItems?.transportation_sub_type)?.other_value_flag === "Y"}
                                              />
                                            </Grid>
                                            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                              <Input
                                                label="3. Model (số loại)"
                                                placeholder="Nhập model (số loại)"
                                                required
                                                value={(dataItems?.model ?? '')}
                                                onDebounce={(val) => onChangeDataDetails(val, 'model')}
                                                message={getMessage('model', { position: dataItems?.activeUUID ?? '' })}
                                                disabled={ruleDisabled}
                                              />
                                            </Grid>
                                            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                              <SelectCountriesManufacture
                                                label="4. Nơi sản xuất/lắp ráp"
                                                placeholder="Nhập nơi sản xuất/lắp ráp"
                                                required
                                                value={dataItems?.origin_of_production ?? ''}
                                                onChange={(val) => onChangeDataDetails(val, 'origin_of_production')}
                                                message={getMessage('origin_of_production', { position: dataItems?.activeUUID ?? '' })}
                                                disabled={ruleDisabled}
                                              />
                                            </Grid>
                                            <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                              <Input
                                                label="5. Nơi sản xuất/lắp ráp khác"
                                                placeholder="Nhập nơi sản xuất lắp ráp khác"
                                                required={dataItems?.origin_of_production === "OT" ? true : false}
                                                value={(dataItems?.other_origin_of_production ?? '')}
                                                onDebounce={(val) => onChangeDataDetails(val, 'other_origin_of_production')}
                                                disabled={dataItems?.origin_of_production === "OT" ? false : true || ruleDisabled}
                                                message={getMessage('other_origin_of_production', { position: dataItems?.activeUUID ?? '' })}
                                              />
                                            </Grid>
                                          </Fragment>
                                          : 
                                          <Fragment>
                                            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                              <SelectTransportBrand
                                                label="3. Nhãn hiệu"
                                                placeholder="Nhập nhãn hiệu"
                                                // required={vehicleDetail.data.find(i => i.id === dataItems?.transportation_sub_type)?.other_value_flag !== "Y"}
                                                required
                                                value={(dataItems?.brand ?? '')}
                                                onChange={(val) => {
                                                  onChangeDataDetails(val, 'brand')
                                                  onChangeDataDetails(null, 'other_brand')
                                                }}
                                                message={getMessage('branch', { position: dataItems?.activeUUID ?? '' })}
                                                // disabled={ruleDisabled || vehicleDetail.data.find(i => i.id === dataItems?.transportation_sub_type)?.other_value_flag === "Y"}
                                                disabled={ruleDisabled}
                                                trasportTypeParent={SubTypeId}
                                                transportTypeId={dataItems?.transportation_sub_type}
                                              />
                                            </Grid>
                                            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                              <Input
                                                label="4. Nhãn hiệu khác"
                                                placeholder="Nhập Nhãn hiệu khác"
                                                required={!ortherBranchRule}
                                                value={dataItems?.other_brand ?? ""}
                                                onDebounce={(val) => onChangeDataDetails(val, 'other_brand')}
                                                message={getMessage('other_brand', { position: dataItems?.activeUUID ?? '' })}
                                                disabled={ruleDisabled || ortherBranchRule}
                                              />
                                            </Grid>
                                            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="5. Model (số loại)"
                                          placeholder="Nhập model (số loại)"
                                          required
                                          value={(dataItems?.model ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'model')}
                                          message={getMessage('model', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ruleDisabled}
                                        />
                                      </Grid>
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <SelectCountriesManufacture
                                          label="6. Nơi sản xuất/lắp ráp"
                                          placeholder="Nhập nơi sản xuất/lắp ráp"
                                          required
                                          value={dataItems?.origin_of_production ?? ''}
                                          onChange={(val) => onChangeDataDetails(val, 'origin_of_production')}
                                          message={getMessage('origin_of_production', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ruleDisabled}
                                        />
                                      </Grid>
                                      <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="7. Nơi sản xuất/lắp ráp khác"
                                          placeholder="Nhập nơi sản xuất lắp ráp khác"
                                          required={dataItems?.origin_of_production === "OT" ? true : false}
                                          value={(dataItems?.other_origin_of_production ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'other_origin_of_production')}
                                          disabled={dataItems?.origin_of_production === "OT" ? false : true || ruleDisabled}
                                          message={getMessage('other_origin_of_production', { position: dataItems?.activeUUID ?? '' })}
  
                                        />
                                      </Grid>
                                          </Fragment>
                                            
                                        }
                                     

                                    </Grid>
  
                                  </CardInside>
                                  <CardInside title="II. Thông tin pháp lý" fieldsetClass="px-4" classBody="h-full p-6" >
                                    <Grid container spacing={3}>
                                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <CheckBoxLegalDocs valueDocs={dataLegalDocs}
                                          uuidActiveData={collateralData?.uuidActiveData ?? ""}
                                          uuidActiveItem={SubTypeItemsActive}
                                          ref={checkboxRef}
                                          handleChangeChild={handleChangeChild}
                                          handleChangeParent={handleChangeParent}
                                          uuidActiveSubType={subType?.uuidActiveSubtype ?? ""}
                                          message={getMessage('legal_document_types', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="2. Số giấy đăng ký/HSPL"
                                          placeholder="Nhập số giấy đăng ký/HSPL"
                                          // required
                                          value={(dataItems?.license ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'license')}
                                          message={getMessage('license', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ruleDisabled}
                                        />
                                      </Grid>
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <SelectVehicleStatus
                                          label="3. Tình trạng PTVT"
                                          placeholder="Chọn tình trạng PTVT"
                                          required
                                          value={(dataItems?.status ?? '')}
                                          onChange={(val) => onChangeDataDetails(val, 'status')}
                                          message={getMessage('status', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ruleDisabled}
                                        />
                                      </Grid>
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="4. Số khung"
                                          placeholder="Nhập số khung"
                                          // required
                                          value={(dataItems?.vehicle_identification_number ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'vehicle_identification_number')}
                                          message={getMessage('vehicle_identification_number', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ruleDisabled}
                                        />
                                      </Grid>
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="5. Số máy"
                                          placeholder="Nhập số máy"
                                          // required
                                          value={(dataItems?.engine_number ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'engine_number')}
                                          message={getMessage('engine_number', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ruleDisabled}
                                        />
                                      </Grid>
                                      <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="6. Biển số đăng ký"
                                          placeholder="Nhập biển số đăng ký"
                                          // required
                                          value={(dataItems?.license_plate ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'license_plate')}
                                          message={getMessage('license_plate', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ruleDisabled}
                                        />
                                      </Grid>
                                      <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="7. Mô tả tài sản"
                                          placeholder="Nhập mô tả tài sản"
                                          required
                                          value={(dataItems?.description ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'description')}
                                          message={getMessage('description', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ruleDisabled}
                                        />
                                      </Grid>
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="8. Chất lượng còn lại thẩm định"
                                          placeholder="Nhập chất lượng còn lại thẩm định"
                                          required
                                          type="number"
                                          format
                                          value={(dataItems?.CLCL?.toString() ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(val, 'CLCL')}
                                          message={getMessage('CLCL', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ruleDisabled}
                                        />
                                      </Grid>
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="9. Số lượng(chiếc)"
                                          placeholder="Nhập chất lượng còn lại thẩm định"
                                          required
                                          type="number"
                                          format
                                          maxlength={100}
                                          value={(dataItems?.quantity?.toString() ?? '')}
                                          onDebounce={(val) => onChangeDataDetails(+val, 'quantity')}
                                          message={getMessage('quantity', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ruleDisabled}
                                        />
                                      </Grid>
                                    </Grid>
                                  </CardInside>
                                </TabPanel>
                              </SwipeableViews>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </Collapse>
              </TableCell>
            </TableRow>
            }
          
        </TableBody>
      </Table>
      <ModalConfirm
        open={deleteOther !== null}
        onClose={onHandleCancelConfirmOther}
        onConfirm={onHandleConfirmCer}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa phương tiện vận tải
        </Box>
      </ModalConfirm>
    </Fragment>
  )
}
export default Transport;