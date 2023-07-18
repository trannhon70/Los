import { Box, Collapse, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useBackdrop from 'app/hooks/useBackdrop';
import useMasterData from 'app/hooks/useMasterData';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import useNotify from 'app/hooks/useNotify';
import { getLOANNormalConfigMetadataConstant } from 'features/loan/normal/configs/metadata/selector';
import {
  deleleteSubtypeItem,
  deleteAllCollateral,
  deleteCollateralItem,
  onChangeCollaretalProperty,
  onChangeCollaretalRPRO,
  postCollaterals,
  setCollaretalRPRO,
  setMachineLocation,
  setSubType,
  updateCollaterals
} from 'features/loan/normal/storage/collateralV2/actions';
import { getCollateralIgnore, getIsCollapseActive } from 'features/loan/normal/storage/collateralV2/selector';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiChevronDownCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { ILOANNormalCollateralData, ISubItems, ISubtype, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import { formatNumber } from 'utils';
import { METADATA_CONSTANT } from 'utils/constants';
import Input from 'views/components/base/Input';
import Radio, { RadioRef } from 'views/components/base/Radio';
import TextArea from 'views/components/base/TextArea';
import CardInside from 'views/components/layout/CardInside';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import TabPanel from 'views/components/layout/TabPanel';
import SelectLocation, { SelectLocationValue } from 'views/components/widgets/SelectLocation';
import SelectMachineType from 'views/components/widgets/SelectMachineType';
import SelectRightPropertyStatus from 'views/components/widgets/SelectRightPropertyStatus';
import { SxCollateralTabs, SxSelectCollateralType } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import InfoReportCollaretalType from 'views/pages/LOAN/widgets/CollaretalForm/TableInfoReportCollaretalType';
import ButtonDetailSubItemAttachment from '../ButtonDetailSubItemAttachment';
import LegalInformationOwner from '../LegalInformationOwner';
import useStorageCollateral from '../useStorageCollateral';


export interface MachineProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
}

const Machine: FC<MachineProps> = (props) => {
  const { showBackdrop } = useBackdrop();
  const dispatch = useDispatch();
  const  { t } = useTranslation()
  const { collateralData, subType } = props;
  const ruleDisabled = useSelector(getRuleDisbled)
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [CurrentTab, setCurrentTab] = useState(0);
  const radioRef = useRef<RadioRef>(null)
  const [deleteMachine, setDeleteMachine] = useState<ISubItems | null>(null);
  const dataIgnore = useSelector(getCollateralIgnore);
  const metadataConstant = useSelector(getLOANNormalConfigMetadataConstant)
  const { MachineType, register } = useMasterData()
    
  useEffect(() => {
    register('machineType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const changeTab = (e: SyntheticEvent, newValue: number) => {
    if (newValue !== CurrentTab) {
      setCurrentTab(newValue);
    }
    return false;
  };

  const handleTabPanel = (index: number) => {
    setCurrentTab(index);
  };
  const clickOpen = () => {
    setIsOpen(!isOpen);
  }
  const getMessage = useNormalCollateralMessage();
  const {
    getDataCollateral,
    TotalValueTransportType,
    SubTypeItems,
    SubTypeItemsActive,
    SubTypeId,
    dataItems,
  } = useStorageCollateral("ALL",
    collateralData?.uuidActiveData ?? "",
    subType?.uuidActiveSubtype ?? "");
  const onHandleChangeKey = (value: IValueOnChangeCollateral, key: keyof ILOANNormalCollateralData) => {
    collateralData && dispatch(onChangeCollaretalProperty(value, { key: key, uuid: collateralData.uuidActiveData }));
  }
  const changeLocation = (data: SelectLocationValue) => {
    const { country, ...remain } = data;
    collateralData && dispatch(setMachineLocation(remain, { uuidData: collateralData.uuidActiveData }))
  }
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
    setCurrentTab(0);
  }
  const optionsData: IGroupListBase[] = SubTypeItems?.map((__, i) => ({
    value: i + 1,
    label: `MMTB ${i + 1}`,
    key: i + 1,
    valueMoney: `${formatNumber(__?.value?.toString() ?? "0")} VNĐ`
  })) ?? []
  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = SubTypeItems[current].activeUUID ?? ''
    dispatch(onChangeCollaretalRPRO(currentActive, { uuid: collateralData?.uuidActiveData ?? "", uuidActive: subType?.uuidActiveSubtype ?? "" }))
  }
  const notify = useNotify();
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
      const dataPos = deleteMachine?.activeUUID /// active local
      if (deleteMachine?.price_cert_asset_uuid) {
        dispatch(deleteCollateralItem(
          dataPos ?? "",
          {
            price_cert_uuid: collateralData.price_cert_uuid ?? "", 
            price_cert_asset_uuid: deleteMachine?.price_cert_asset_uuid ?? "",
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
    onHandleCancelConfirmMachine();
  };
  const onHandleCancelConfirmMachine = () => setDeleteMachine(null);
  const onHandleClickMenuMachine = (menu: IGroupListBase, position: number) => {
    let dataMenuCer = SubTypeItems?.find((cer, index) => index === position);
    setDeleteMachine(dataMenuCer ?? null);
  };

  const onChangeSubTypeMachine = (value: string) => {
    dispatch(setSubType(value, { uuidSubType: subType?.uuidActiveSubtype ?? "", uuidData: collateralData?.uuidActiveData ?? "" }));
  }

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
    return onHandleChangeKey(TotalValueTransportType, 'collateral_value')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[TotalValueTransportType])
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
                    required={[true,true]}
                    disabled={ ruleDisabled || dataIgnore}
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
                    disabled={ ruleDisabled || dataIgnore}
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
              {1}
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
              <SelectMachineType
                className="colla-type"
                sx={SxSelectCollateralType}
                onChange={onChangeSubTypeMachine}
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
              {/* {  (!subType?.id || ruleDisabled )  ? null : <IconButton
                  onClick={onHandleDeleteSubType}
                >
                  <IoTrashOutline style={{fontSize: '1.5rem'}}/>
                </IconButton>
              } */}
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
              !!SubTypeId && <TableRow>
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
                        overflow: 'scroll',
                       
                      },
                      "& .group-list": {
                        "& .MuiList-padding": {
                          width: "270px"
                        }
                      }
                    }}>
                      <GroupListBase labelAdd='Thêm máy móc'
                        onAdd={onAdd}
                        className="group-list"
                        activeId={(SubTypeItems?.findIndex(d => d.activeUUID === SubTypeItemsActive) ?? 0) + 1}
                        onSelected={onSelectGroupList}
                        onDelete={onHandleClickMenuMachine}
                        options={optionsData}
                        isDelete={ !ruleDisabled && !(SubTypeItems.length === 1)}
                        isValueMoney={true}
                        isAdd={ ruleDisabled || collateralData?.is_compactness === "N"}
                      />
                    </TableCell>
                    <TableCell width='100%' sx={{ border: 'none' }}>
                      <Grid container spacing={3} >
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Typography variant="h6" className='text-upper font-bold' gutterBottom component="div">
                            A. Thông tin định giá và thẩm định tài sản
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xl={3}>
                          <Input
                            label="1. Tỷ lệ cho vay tối đa theo quy định"
                            placeholder="Nhập tỷ lệ cho vay tối đa theo quy định"
                            required
                            onDebounce={(val) => onChangeDataDetails(val, 'ratio')}
                            value={dataItems?.ratio?.toString() ?? ''}
                            type="number"
                            format
                            message={getMessage('max_percentage_ratio', { position: dataItems?.activeUUID ?? ''})}
                            disabled={ ruleDisabled }
                          />
                        </Grid>
                        <Grid item xl={4}>
                          <Radio label="2. TS hiện đang đảm bảo cho nghĩa vụ CTD"
                            disabled={ ruleDisabled }
                            ref={radioRef}
                            options={[
                              {
                                label: "Đang đảm bảo",
                                value: "Y",
                                checked: dataItems?.credit_extension_secured === 'Y'
                              },
                              {
                                label: "Không",
                                value: "N",
                                checked: dataItems?.credit_extension_secured === 'N'
                              }
                            ]}
                            onChange={() => {
                              onChangeDataDetails(radioRef.current?.getValue().value ?? '', 'credit_extension_secured')
                              if(radioRef.current?.getValue().value === 'N'){
                                onChangeDataDetails(null, 'info_collatetal')
                              }
                            }}
                            variant="checkbox"
                            required />
                        </Grid>
                        <Grid item xl={5}>
                          <Input label={`3. Giá trị ${MachineType?.find(e => e.id === SubTypeId)?.name?.toLowerCase() ??  "máy móc thiết bị"} (VNĐ)`}
                            type="number"
                            format
                            onDebounce={(val) => onChangeDataDetails(+val, 'value')}
                            value={dataItems?.value?.toString() ?? ''}
                            required
                            message={getMessage('value_mmtb', { position: dataItems?.activeUUID ?? '' })}
                            disabled={ ruleDisabled }
                          />
                        </Grid>
                        <Grid item xl={12}>
                          <TextArea label="4. Thông tin nghĩa vụ đang đảm bảo "
                            placeholder='Nhập thông tin nghĩa vụ '
                            onDebounce={(val) => onChangeDataDetails(val, 'info_collatetal')}
                            value={dataItems?.info_collatetal ?? ''}
                            required= { dataItems?.credit_extension_secured === 'Y' }
                            message={getMessage('info_collatetal', { position: dataItems?.activeUUID ?? '' })}
                            disabled={ ruleDisabled || dataItems?.credit_extension_secured === 'N' }
                          />
                        </Grid>
                      </Grid>
                      <Grid container className="mt-5">
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
                            onChange={changeTab}
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            sx={SxCollateralTabs}
                          >
                            <Tab label="Thông tin pháp lý chủ sở hữu" />
                            <Tab label="Thông tin pháp lý giấy chứng nhận" sx={{ borderLeft: "solid 1px #b5b5b5" }} />
                          </Tabs>
                          <SwipeableViews
                            disabled
                            index={CurrentTab}
                            onChangeIndex={handleTabPanel}
                          >
                            <TabPanel padding={false} value={CurrentTab} index={0}>
                              <LegalInformationOwner
                                isFormLegalInfo={false}
                                activeSubType={subType?.uuidActiveSubtype ?? ""}
                                uuIdData={collateralData?.uuidActiveData ?? ''}
                              />
                            </TabPanel>
                            <TabPanel padding={false} value={CurrentTab} index={1}>
                            <ButtonDetailSubItemAttachment dataItems={dataItems} masterData={{ uuid: collateralData?.uuidActiveData ?? "", uuidActive: subType?.uuidActiveSubtype ?? "",collaretalType:'DEVI' }}  />
                              <Grid container spacing={3}>
                                <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                  <CardInside title="Thông tin cơ bản" fieldsetClass="px-4" classBody="h-full p-6" >
                                    <Grid container spacing={3}>
                                      <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="1. Loại tài sản"
                                          placeholder='Nhập loại tài sản'
                                          required
                                          onDebounce={(val) => onChangeDataDetails(val, 'typeCollateral')}
                                          value={dataItems?.typeCollateral}
                                          message={getMessage('typeCollateral', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ ruleDisabled }
                                        />
                                      </Grid>
                                      <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="2. Số lượng từng loại"
                                          placeholder='Nhập số lượng từng loại'
                                          required
                                          onDebounce={(val) => onChangeDataDetails(val, 'count')}
                                          value={formatNumber(dataItems?.count?.toString()) ?? ''}
                                          type="number"
                                          message={getMessage('count', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ ruleDisabled }
                                        />
                                      </Grid>
                                      <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="3. Năm sản xuất"
                                          placeholder='Nhập năm sản xuất'
                                          required
                                          onChange={(val) => onChangeDataDetails(val, 'year')}
                                          value={dataItems?.year?.toString()}
                                          type="number"
                                          message={getMessage('year', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ ruleDisabled }
                                        />
                                      </Grid>
                                      <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="4. Nhãn hiệu"
                                          placeholder='Nhập nhãn hiệu'
                                          required
                                          onDebounce={(val) => onChangeDataDetails(val, 'branch')}
                                          value={dataItems?.branch ?? ''}
                                          message={getMessage('branch', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ ruleDisabled }
                                        />
                                      </Grid>
                                      <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="5. Model (số loại)"
                                          placeholder='Nhập model (số loại)'
                                          required
                                          onDebounce={(val) => onChangeDataDetails(val, 'model')}
                                          value={dataItems?.model?.toString() ?? ''}
                                          message={getMessage('model', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ ruleDisabled }
                                        />
                                      </Grid>
                                      <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="6. Nơi sản xuất/lắp ráp"
                                          placeholder='Nhập nơi sản xuất/lắp ráp'
                                          required
                                          onDebounce={(val) => onChangeDataDetails(val, 'production')}
                                          value={dataItems?.production?.toString() ?? ''}
                                          message={getMessage('production', { position: dataItems?.activeUUID ?? '' })}
                                          disabled={ ruleDisabled }
                                        />
                                      </Grid>
                                    </Grid>
  
                                  </CardInside>
                                </Grid>
                                <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                  <CardInside title="Thông tin pháp lý" fieldsetClass="px-4" classBody="h-full p-6" >
                                    <Grid container spacing={3}>
                                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="1. CLCL thẩm định"
                                          placeholder='Nhập CLCL thẩm định'
                                          onDebounce={(val) => onChangeDataDetails(val, 'CLCL')}
                                          value={dataItems?.CLCL?.toString() ?? ''}
                                          type="number"
                                          format
                                          disabled={ ruleDisabled }
                                        />
                                      </Grid>
                                      <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="2. Số giấy tờ đăng ký"
                                          placeholder='Nhập số giấy giờ đăng ký'
                                          onDebounce={(val) => onChangeDataDetails(val, 'number_register')}
                                          value={dataItems?.number_register?.toString() ?? ''}
                                          disabled={ ruleDisabled }
                                          // message={getMessage('number_register', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                      <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                        <SelectRightPropertyStatus
                                          label="3. Tình trạng tài sản"
                                          placeHolder="Chọn tình trạng tài sản"
                                          onChange={(val) => onChangeDataDetails(val, 'status')}
                                          value={dataItems?.status?.toString() ?? ''}
                                          typeProperty="MMTB"
                                          disabled={ ruleDisabled }
                                          // message={getMessage('status', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                      <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="4. Mô tả tài sản"
                                          placeholder='Nhập mô tả tài sản'
                                          onDebounce={(val) => onChangeDataDetails(val, 'description')}
                                          value={dataItems?.description?.toString() ?? ''}
                                          disabled={ ruleDisabled }
                                          // message={getMessage('description', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                      <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="5. Số lượng (chiếc)"
                                          placeholder='Nhập số lượng (chiếc)'
                                          required
                                          onDebounce={(val) => onChangeDataDetails(+val, 'quantity')}
                                          value={dataItems?.quantity?.toString() ?? ''}
                                          type="number"
                                          format
                                          disabled={ ruleDisabled }
                                          message={getMessage('quantity', { position: dataItems?.activeUUID ?? '' })}
                                        />
                                      </Grid>
                                    </Grid>
                                  </CardInside>
                                </Grid>
                              </Grid>
                            </TabPanel>
                          </SwipeableViews>
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
        open={deleteMachine !== null}
        onClose={onHandleCancelConfirmMachine}
        onConfirm={onHandleConfirmCer}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa máy móc thiết bị
        </Box>
      </ModalConfirm>
    </Fragment>
  )
}

export default Machine;