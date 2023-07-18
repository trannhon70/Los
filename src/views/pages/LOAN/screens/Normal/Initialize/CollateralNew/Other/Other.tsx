import { Box, Collapse, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import useNotify from 'app/hooks/useNotify';
import {
  addCollaretalRPRO, deleleteSubtypeItem,
  deleteAllCollateral,
  deleteCollateralItem,
  onChangeCollaretalProperty,
  onChangeCollaretalRPRO,
  postCollaterals,
  setCollaretalRPRO,
  updateCollaterals
} from 'features/loan/normal/storage/collateralV2/actions';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, SyntheticEvent, useState, useEffect } from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';
// import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { ILOANNormalCollateralData, ISubItems, ISubtype, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import { formatNumber } from 'utils';
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import TabPanel from 'views/components/layout/TabPanel';
import { SxCollateralTabs, SxCollatertalCommon } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import InfoReportCollaretalType from 'views/pages/LOAN/widgets/CollaretalForm/TableInfoReportCollaretalType';
import ButtonDetailSubItemAttachment from '../ButtonDetailSubItemAttachment';
import LegalInformationOwner from '../LegalInformationOwner';
import useStorageCollateral from '../useStorageCollateral';
import { getCollateralIgnore, getIsCollapseActive } from 'features/loan/normal/storage/collateralV2/selector';
import { METADATA_CONSTANT } from 'utils/constants';
import { getLOANNormalConfigMetadataConstant } from 'features/loan/normal/configs/metadata/selector';
import { useTranslation } from 'react-i18next';
import useBackdrop from 'app/hooks/useBackdrop';

export interface OtherProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
}

const Other: FC<OtherProps> = (props) => {
  const { showBackdrop } = useBackdrop();
  const dispatch = useDispatch();
  const  { t } = useTranslation()
  const { collateralData, subType } = props;
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [CurrentTab, setCurrentTab] = useState(0);
  const ruleDisabled = useSelector(getRuleDisbled)
  const dataIgnore = useSelector(getCollateralIgnore);
  const metadataConstant = useSelector(getLOANNormalConfigMetadataConstant)
  const isCollapsedItem = useSelector(getIsCollapseActive);

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
    dataItems,
  } = useStorageCollateral("ALL",
    collateralData?.uuidActiveData ?? "",
    subType?.uuidActiveSubtype ?? "");

  const onHandleChangeKey = (value: IValueOnChangeCollateral, key: keyof ILOANNormalCollateralData) => {
    collateralData && dispatch(onChangeCollaretalProperty(value, { key: key, uuid: collateralData.uuidActiveData }));
  }
  const [deleteOther, setDeleteOther] = useState<ISubItems | null>(null);


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
    label: `Tài sản khác ${i + 1}`,
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
            <TableCell width={'20%'}>
              <Typography sx={SxCollatertalCommon}>Tài sản khác</Typography>
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
              {/* { (!subType?.id || ruleDisabled )  ? null : <IconButton
                onClick={onHandleDeleteSubType}
              >
                <IoTrashOutline style={{fontSize: '1.5rem'}}/>
              </IconButton>} */}
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

          <TableRow>
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
                    border: 'none', 
                    display: 'flex', 
                    '& .MuiList-root': {
                      overflow: 'scroll'
                    },
                    "& .group-list":{
                      "& .MuiList-padding":{
                        width:"270px"
                      }
                    }
                  }}>
                    <GroupListBase 
                      labelAdd='Thêm tài sản khác'
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
                      <Grid item xl={3}>
                        <Input label="2. Giá trị tài sản khác (VNĐ)"
                          placeholder="Nhập giá trị tài sản khác (VNĐ)"
                          onDebounce={(val) => onChangeDataDetails(+val, 'value')}
                          value={dataItems?.value?.toString() ?? ''}
                          required
                          type="number"
                          format
                          message={
                            getMessage('value', { position: dataItems?.activeUUID ?? '' }) && `${getMessage('value', { position: dataItems?.activeUUID ?? '' })} tài sản khác`
                          }
                          disabled={ ruleDisabled }
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
                          <ButtonDetailSubItemAttachment dataItems={dataItems} masterData={{ uuid: collateralData?.uuidActiveData ?? "", uuidActive: subType?.uuidActiveSubtype ?? "", collaretalType:'OTHE' }}  />
                            <CardInside title="I. Thông tin tài sản khác" fieldsetClass="px-4" classBody="h-full p-6" >
                              <Grid container spacing={3}>
                                <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                  <Input
                                    label="1. Loại tài sản"
                                    required
                                    value={(dataItems?.typeCollateral ?? '')}
                                    onDebounce={(val) => onChangeDataDetails(val, 'typeCollateral')}
                                    message={getMessage('typeCollateral', { position: dataItems?.activeUUID ?? '' })}
                                    disabled={ ruleDisabled }
                                  />
                                </Grid>
                                <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                  <Input
                                    label="2. Số giấy tờ đăng ký"
                                    required
                                    value={(dataItems?.license ?? '')}
                                    onDebounce={(val) => onChangeDataDetails(val, 'license')}
                                    message={getMessage('license', { position: dataItems?.activeUUID ?? '' })}
                                    disabled={ ruleDisabled }
                                  />
                                </Grid>
                                <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                  <Input
                                  maxlength={100}
                                    label="3. Tình trạng tài sản"
                                    placeholder='Nhập tình trạng tài sản'
                                    required
                                    value={(dataItems?.status ?? '')}
                                    onDebounce={(val) => onChangeDataDetails(val, 'status')}
                                    message={getMessage('status', { position: dataItems?.activeUUID ?? '' })}
                                    disabled={ ruleDisabled }
                                  />
                                </Grid>
                              </Grid>
                              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className='mt-5'>
                                <Input
                                  label="4. Mô tả tài sản"
                                  required
                                  value={(dataItems?.description ?? '')}
                                  onDebounce={(val) => onChangeDataDetails(val, 'description')}
                                  message={getMessage('description', { position: dataItems?.activeUUID ?? '' })}
                                  disabled={ ruleDisabled }
                                />
                              </Grid>
                            </CardInside>
                          </TabPanel>
                        </SwipeableViews>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ModalConfirm
        open={deleteOther !== null}
        onClose={onHandleCancelConfirmOther}
        onConfirm={onHandleConfirmCer}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa tài sản khác
        </Box>
      </ModalConfirm>
    </Fragment>
  )
}

export default Other;