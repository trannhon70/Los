import { Box, Collapse, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import useNotify from "app/hooks/useNotify";
import { addCollaretalRPRO, deleleteSubtypeItem, deleteAllCollateral, deleteCollateralItem, onChangeCollaretalProperty, onChangeCollaretalRPRO, postCollaterals, setCollaretalRPRO, updateCollaterals } from 'features/loan/normal/storage/collateralV2/actions';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, SyntheticEvent, useState,  useEffect } from 'react';
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
import SelectIssuer from 'views/components/widgets/SelectIssuer';
import SelectPaperType from 'views/components/widgets/SelectPaperType';
import { SxCollateralTabs, SxCollatertalCommon } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import InfoReportCollaretalType from 'views/pages/LOAN/widgets/CollaretalForm/TableInfoReportCollaretalType';
import ButtonDetailSubItemAttachment from '../ButtonDetailSubItemAttachment';
import LegalInformationOwner from '../LegalInformationOwner';
import useStorageCollateral from '../useStorageCollateral';
import { getCollateralIgnore, getIsCollapseActive } from 'features/loan/normal/storage/collateralV2/selector';
import { METADATA_CONSTANT } from 'utils/constants';
import { useTranslation } from 'react-i18next';
import { getLOANNormalConfigMetadataConstant } from 'features/loan/normal/configs/metadata/selector';
import useBackdrop from 'app/hooks/useBackdrop';

export interface DepositProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
}

const Deposit: FC<DepositProps> = (props) => {
  const dispatch = useDispatch();
  const { showBackdrop } = useBackdrop();
  const  { t } = useTranslation()
  const { collateralData, subType } = props;
  const ruleDisabled = useSelector(getRuleDisbled)
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [CurrentTab, setCurrentTab] = useState(0);
  const [deleteDeposit, setDeleteDeposit] = useState<ISubItems | null>(null);
  const dataIgnore = useSelector(getCollateralIgnore);
  const metadataConstant = useSelector(getLOANNormalConfigMetadataConstant)
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
  const isCollapsedItem = useSelector(getIsCollapseActive);

  const notify = useNotify();
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
    label: `Số dư tiền gửi ${i + 1}`,
    key: i + 1,
    valueMoney: `${formatNumber(__?.value?.toString() ?? "0")} VNĐ`
  })) ?? []

  const onHandleConfirmCer = () => {
    if(optionsData.length === 1 ){
      collateralData && dispatch(deleteAllCollateral({
        cert_uuid: collateralData.price_cert_uuid,
        uuid: collateralData.uuidActiveData
      },{key:"item"})) 
    }else if (collateralData?.uuidActiveData) {
      const dataPos = deleteDeposit?.activeUUID /// active local
      if (deleteDeposit?.price_cert_asset_uuid) {
        dispatch(deleteCollateralItem(
          dataPos ?? "",
          {
            price_cert_uuid: collateralData.price_cert_uuid ?? "", 
            price_cert_asset_uuid: deleteDeposit?.price_cert_asset_uuid ?? "",
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
    onHandleCancelConfirmDeposit();
  };

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = SubTypeItems[current].activeUUID ?? ''
    dispatch(onChangeCollaretalRPRO(currentActive, { uuid: collateralData?.uuidActiveData ?? "", uuidActive: subType?.uuidActiveSubtype ?? "" }))
  }
  const onHandleCancelConfirmDeposit = () => setDeleteDeposit(null);

  const onChangeDataDetails = (value: IValueOnChangeCollateral, key: keyof ISubItems) => {
    dispatch(setCollaretalRPRO(value, { uuid: collateralData?.uuidActiveData ?? "", uuidActive: subType?.uuidActiveSubtype ?? "", key }))
  }
  const onHandleClickMenuDeposit = (menu: IGroupListBase, position: number) => {
    let dataMenuCer = SubTypeItems?.find((cer, index) => index === position);
    setDeleteDeposit(dataMenuCer ?? null);

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
              width="230px"
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
              <Typography sx={SxCollatertalCommon}>Số dư tiền gửi</Typography>
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
                  <TableCell width='100%' 
                  sx={{
                    border: 'none', 
                    display: 'flex', 
                    width: '100%', 
                    '& .MuiList-root': {
                      overflow: 'scroll'
                    }, 
                    "& .group-list": {
                      "& .MuiList-padding": {
                        width: "270px"
                      }
                    }
                  }}>
                    <GroupListBase labelAdd='Thêm số dư'
                      onAdd={onAdd}
                      className="group-list"
                      activeId={(SubTypeItems?.findIndex(d => d.activeUUID === SubTypeItemsActive) ?? 0) + 1}
                      onSelected={onSelectGroupList}
                      onDelete={onHandleClickMenuDeposit}
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
                            <Input label="2. Giá trị số dư tiền gửi (VNĐ)"
                              placeholder="Nhập giá trị số dư tiền gửi (VNĐ)"
                              onDebounce={(val) => onChangeDataDetails(+val, 'value')}
                              value={dataItems?.value?.toString() ?? ''}
                              required
                              type="number"
                              format
                              message={
                                getMessage('value', { position: dataItems?.activeUUID ?? '' }) && `${getMessage('value', { position: dataItems?.activeUUID ?? '' })} số dư tiền gửi`
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
                              <ButtonDetailSubItemAttachment dataItems={dataItems} masterData={{ uuid: collateralData?.uuidActiveData ?? "", uuidActive: subType?.uuidActiveSubtype ?? "", collaretalType:'BALC' }}  />
                                <CardInside
                                  title="I. Thông tin số dư tiền gửi"
                                  fieldsetClass="px-4"
                                  classBody="h-full p-6"
                                >
                                  <Grid container spacing={3}>
                                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                      <SelectPaperType
                                        label="1. Loại giấy tờ"
                                        required
                                        value={dataItems?.typeCollateral ?? ""}
                                        onChange={(val) =>
                                          onChangeDataDetails(
                                            val,
                                            "typeCollateral"
                                          )
                                        }
                                        message={getMessage('typeCollateral', { position: dataItems?.activeUUID ?? '' })}
                                        disabled={ ruleDisabled }
                                      />
                                    </Grid>
                                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="2. Số giấy tờ đăng ký"
                                        placeholder="Nhập số giấy tờ đăng ký"
                                        required
                                        value={dataItems?.license ?? ""}
                                        onDebounce={(val) =>
                                          onChangeDataDetails(val, "license")
                                        }
                                        message={getMessage('license', { position: dataItems?.activeUUID ?? '' })}
                                        disabled={ ruleDisabled }
                                      />
                                    </Grid>
                                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                      {/* zepline select */}
                                      <Input
                                        label="3. Tình trạng tài sản"
                                        placeholder="Nhập tình trạng tài sản"
                                        required
                                        value={dataItems?.status ?? ""}
                                        onDebounce={(val) =>
                                          onChangeDataDetails(val, "status")
                                        }
                                        message={getMessage('status', { position: dataItems?.activeUUID ?? '' })}
                                        disabled={ ruleDisabled }
                                      />
                                    </Grid>
                                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                      <SelectIssuer
                                        label="4. Đơn vị phát hành"
                                        placeholder="Chọn đơn vị phát hành"
                                        required
                                        value={dataItems?.issuer ?? ""}
                                        onChange={(val) => {
                                          onChangeDataDetails(val, "issuer");
                                        }}
                                        message={getMessage('issuer', { position: dataItems?.activeUUID ?? '' })}
                                        disabled={ ruleDisabled }
                                      />
                                    </Grid>
                                    <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="5. Đơn vị phát hành khác"
                                        placeholder="Nhập đơn vị phát hành khác"
                                        value={dataItems?.other_issuer ?? ""}
                                        onDebounce={(val) =>
                                          onChangeDataDetails(
                                            val,
                                            "other_issuer"
                                          )
                                        }
                                        disabled={dataItems?.issuer !== "107" || ruleDisabled}
                                        message={getMessage('other_issuer', { position: dataItems?.activeUUID ?? '' })}
                                      />
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="6. Mô tả tài sản"
                                        placeholder="Nhập mô tả tài sản"
                                        required
                                        value={dataItems?.description ?? ""}
                                        onDebounce={(val) => onChangeDataDetails(val, "description")}
                                        message={getMessage('description', { position: dataItems?.activeUUID ?? '' })}
                                        disabled={ ruleDisabled }
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
        </TableBody>
      </Table>
      <ModalConfirm
        open={deleteDeposit !== null}
        onClose={onHandleCancelConfirmDeposit}
        onConfirm={onHandleConfirmCer}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa số dư tiền gửi
        </Box>
      </ModalConfirm>
    </Fragment >
  )
}

export default Deposit;