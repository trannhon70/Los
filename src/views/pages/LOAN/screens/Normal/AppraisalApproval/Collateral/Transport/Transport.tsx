import { FC, Fragment, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import { ILOANNormalCollateralData, ISubItems, ISubtype, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import { Collapse, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { BiChevronDownCircle } from 'react-icons/bi';
import SelectLocation from 'views/components/widgets/SelectLocation';
import Input from 'views/components/base/Input';
import { formatNumber } from 'utils';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import useStorageCollateral from '../useStorageCollateral';
import SelectVehicleType from 'views/components/widgets/SelectVehicleType';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import { SxCollateralQSH, SxCollateralTabs } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from 'views/components/layout/TabPanel';
import CardInside from 'views/components/layout/CardInside';
import SelectorVehicleDetail from 'views/components/widgets/SelectorVehicleDetail';
import { EDetailsTransport } from 'features/loan/normal/storage/collateralV2/case';
import SelectCountriesManufacture from 'views/components/widgets/SelectCountriesManufacture';
import SelectVehicleStatus from 'views/components/widgets/SelectVehicleStatus';
import useNotify from 'app/hooks/useNotify';
import LegalInfomationOwner from '../LegalInfomationOwner';
import CheckBoxLegalDocs from './CheckBoxLegalDocs';
import AssessmentTransportType from './Assessment';
// import AppraisalResult from '../AppraisalResult';
import { onChangeCollaretalRPROApproval, setSubTypeApproval } from 'features/loan/normal/storageApproval/collateral/actions';
import TableInfoReportCollaretalType from '../TableInfoReportCollaretalType';
// import ButtonAttachmentModalCollateral from '../ButtonAttachmentModalCollateral';
import ButtonDetailSubItemAttachment from '../ButtonDetailSubItemAttachment';

// import { setCollaretalRPRO } from 'features/loan/normal/storage/collateralV2/actions';
import SelectTransportBrand from 'views/components/widgets/SelectTransportBrand';
export interface TransportProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
}

const Transport: FC<TransportProps> = (props) => {
  const dispatch = useDispatch();
  const { collateralData, subType } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [CurrentTab, setCurrentTab] = useState(0);
  const changeTab = (e: SyntheticEvent, newValue: number) => {
    if (newValue !== CurrentTab) {
      setCurrentTab(newValue);
    }
    return false;
  };
  const notify = useNotify();
  const handleTabPanel = (index: number) => {
    setCurrentTab(index);
  };
  const clickOpen = () => {
    if(subType?.id === ""){
      return notify("Vui lòng chọn loại PTVT",'warning')
    }
    setIsOpen(!isOpen);
  }
  const getMessage = useNormalCollateralMessage();
  const {
    getDataCollateral,
    TotalValueTransportType,
    SubTypeId,
    SubTypeItems,
    SubTypeItemsActive,
    dataItems,
    dataLegalDocs
  } = useStorageCollateral("ALL",
    collateralData?.uuidActiveData ?? "",
    subType?.uuidActiveSubtype ?? "");
 
  const onChangeSubTypeTransport = (value: string) => {
    dispatch(setSubTypeApproval(value, { uuidSubType: subType?.uuidActiveSubtype ?? "", uuidData: collateralData?.uuidActiveData ?? "" }));
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
    dispatch(onChangeCollaretalRPROApproval(currentActive, { uuid: collateralData?.uuidActiveData ?? "", uuidActive: subType?.uuidActiveSubtype ?? "" }))
  }

  
  
  return (
    <Fragment>
      <Table>
        <TableBody>
          <TableInfoReportCollaretalType
            collateralData={collateralData}
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
                    isWard={false}
                    message={[
                      getMessage('province', { position: collateralData?.uuidActiveData ?? '' }),
                      getMessage('district', { position: collateralData?.uuidActiveData ?? '' })
                    ]}
                    required={[true,true]}
                    disabled={ true }
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
                    required
                    type="number"
                    format
                    value={getDataCollateral?.max_percentage?.toString()}
                    disabled={ true }
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
            </TableCell>
            <TableCell sx={{
              "& .colla-type":{
                minWidth:"245px",
                maxWidth:'245px',
                '&.Mui-disabled': {
                  color: "#1825aa"
                }
              }
            }}>
              <SelectVehicleType
                className="colla-type"
                sx={SxCollateralQSH}
                disabled={true}
                onChange={onChangeSubTypeTransport}
                value={SubTypeId ?? ""}
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
              <IconButton sx={{
                '& svg': {
                  transition: 'all ease-in-out 0.3s',
                  ...(isOpen ? {} : { transform: 'rotate(180deg)' })
                }
              }}
                onClick={clickOpen}
              >
                <BiChevronDownCircle style={{ fontSize: '1rem' }} size="24px" />
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
                      className="group-list"
                      activeId={(SubTypeItems?.findIndex(d => d.activeUUID === SubTypeItemsActive) ?? 0) + 1}
                      onSelected={onSelectGroupList}
                      options={optionsData}
                      isDelete={ false }
                      isAdd={ true }
                      isValueMoney={true}
                      
                    />
                  </TableCell>
                  <TableCell width='100%' sx={{ border: 'none' }}>
                    <Grid container spacing={3} >
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <AssessmentTransportType
                          // uuidData={collateralData?.uuidActiveData ?? ""}
                          // uuidSubtype={subType?.uuidActiveSubtype ?? ""}
                          collateralData={collateralData}
                          subType={subType}
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
                                <LegalInfomationOwner
                                  activeSubType={subType?.uuidActiveSubtype ?? ""}
                                  uuIdData={collateralData?.uuidActiveData ?? ""}
                                  isFormLegalInfo={false}
                                />
                              </TabPanel>

                              <TabPanel padding={false} value={CurrentTab} index={1}>
                                {/* <ButtonAttachmentModalCollateral data={[]} /> */}
                                <ButtonDetailSubItemAttachment dataItems={dataItems} masterData={{ uuid: collateralData?.uuidActiveData ?? "", uuidActive: subType?.uuidActiveSubtype ?? "", collaretalType:'MEST' }}  />

                                <CardInside title="I. Thông tin quyền tài sản" fieldsetClass="px-4" classBody="h-full p-6" >
                                  <Grid container spacing={3}>
                                    <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                      {
                                        SubTypeId === EDetailsTransport.NRVE ?
                                          <Input
                                            label="1. Loại phương tiện"
                                            placeholder="Nhập loại phương tiện"
                                            required
                                            value={(dataItems?.transportation_sub_type ?? '')}
                                            disabled={ true }
                                          />
                                          :
                                          <SelectorVehicleDetail
                                            label="1. Loại phương tiện"
                                            placeholder="Chọn loại phương tiện"
                                            required
                                            value={(dataItems?.transportation_sub_type ?? '')}
                                            transportType={SubTypeId}
                                            disabled={ true }
                                          />
                                      }
                                    </Grid>
                                    {SubTypeId === EDetailsTransport.NRVE
                                      ?
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="2. Nhãn hiệu"
                                        placeholder="Nhập nhãn hiệu"
                                        required
                                        value={(dataItems?.branch ?? '')}
                                        disabled={ true }
                                      />
                                      </Grid>
                                      :
                                      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                        <Input
                                          label="2. Chi tiết loại phương tiện khác"
                                          placeholder="Nhập chi tiết loại phương tiện khác"
                                          required={SubTypeId === EDetailsTransport.NRVE ? false : (dataItems?.transportation_sub_type === "Khác" ? false : true)}
                                          value={(dataItems?.other_transportation_sub_type ?? '')}
                                          disabled={true}
                                        />
                                      </Grid>
                                    }
                                    <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                      {/* <Input
                                        label="3. Nhãn hiệu"
                                        placeholder="Nhập nhãn hiệu"
                                        required
                                        value={(dataItems?.branch ?? '')}
                                        disabled={ true }
                                      /> */}
                                       {SubTypeId === EDetailsTransport.NRVE
                                      ?
                                      <Input
                                        label="3. Model (số loại)"
                                        placeholder="Nhập model (số loại)"
                                        required
                                        value={(dataItems?.model ?? '')}
                                        disabled={ true }
                                      />:
                                      <SelectTransportBrand
                                        label="3. Nhãn hiệu"
                                        placeholder="Nhập nhãn hiệu"
                                        // required={vehicleDetail.data.find(i => i.id === dataItems?.transportation_sub_type)?.other_value_flag !== "Y"}
                                        required
                                        value={(dataItems?.branch ?? '')}
                                        // onChange={(val) => {
                                        //   onChangeDataDetails(val, 'brand')
                                        //   onChangeDataDetails(null, 'other_brand')
                                        // }}
                                        // message={getMessage('branch', { position: dataItems?.activeUUID ?? '' })}
                                        // disabled={ruleDisabled || vehicleDetail.data.find(i => i.id === dataItems?.transportation_sub_type)?.other_value_flag === "Y"}
                                        // disabled={ruleDisabled}
                                        disabled={ true }
                                        trasportTypeParent={SubTypeId}
                                        transportTypeId={dataItems?.transportation_sub_type}
                                      />
                                      
                                      } 
                                    </Grid>
                                    {SubTypeId === EDetailsTransport.NRVE ?
                                     <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                     <SelectCountriesManufacture
                                        label="4. Nơi sản xuất/lắp ráp"
                                        placeholder="Nhập nơi sản xuất/lắp ráp"
                                        required
                                        value={dataItems?.origin_of_production ?? ''}
                                        disabled={ true }
                                      />
                                    </Grid>
                                  : null 
                                  }

                                    <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                    {SubTypeId === EDetailsTransport.NRVE
                                      ? <Input
                                      label="5. Nơi sản xuất/lắp ráp khác"
                                      placeholder="Nhập nơi sản xuất lắp ráp khác"
                                      required={dataItems?.origin_of_production === "OT" ? true : false}
                                      value={(dataItems?.other_origin_of_production ?? '')}
                                      disabled={true}
                                    /> :
                                      <Input
                                        label="4. Nhãn hiệu khác"
                                        placeholder="Nhập nhãn hiệu khác"
                                        required
                                        value={(dataItems?.other_brand ?? '')}
                                        disabled={ true }
                                      />
                                    }
                                    </Grid>
                                    {SubTypeId === EDetailsTransport.NRVE ?
                                    null :
                                     <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                       <Input
                                         label="5. Model (số loại)"
                                         placeholder="Nhập model (số loại)"
                                         required
                                         value={(dataItems?.model ?? '')}
                                         disabled={ true }
                                       />
                                   </Grid>  }
                                    <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                    {SubTypeId === EDetailsTransport.NRVE ?
                                      null
                                      :
                                      <SelectCountriesManufacture
                                        label="6. Nơi sản xuất/lắp ráp"
                                        placeholder="Nhập nơi sản xuất/lắp ráp"
                                        required
                                        value={dataItems?.origin_of_production ?? ''}
                                        disabled={ true }
                                      />
                                    }
                                    </Grid>
                                   
                                    {SubTypeId === EDetailsTransport.NRVE ?
                                     null :
                                     <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="7. Nơi sản xuất/lắp ráp khác"
                                        placeholder="Nhập nơi sản xuất lắp ráp khác"
                                        required={dataItems?.origin_of_production === "OT" ? true : false}
                                        value={(dataItems?.other_origin_of_production ?? '')}
                                        disabled={true}
                                      />
                                      </Grid>
                                    }
                                    
                                  </Grid>

                                </CardInside>
                                <CardInside title="II. Thông tin pháp lý" fieldsetClass="px-4" classBody="h-full p-6" >
                                  <Grid container spacing={3}>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                      <CheckBoxLegalDocs valueDocs={dataLegalDocs}
                                        uuidActiveData={collateralData?.uuidActiveData ?? ""}
                                        uuidActiveItem={SubTypeItemsActive}
                                        uuidActiveSubType={subType?.uuidActiveSubtype ?? ""}
                                      />
                                    </Grid>
                                    <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="2. Số giấy đăng ký/HSPL"
                                        placeholder="Nhập số giấy đăng ký/HSPL"
                                        // required
                                        value={(dataItems?.license ?? '')}
                                        disabled={ true }
                                      />
                                    </Grid>
                                    <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                      <SelectVehicleStatus
                                        label="3. Tình trạng PTVT"
                                        placeholder="Chọn tình trạng PTVT"
                                        required
                                        value={(dataItems?.status ?? '')}
                                        disabled={ true }
                                      />
                                    </Grid>
                                    <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="4. Số khung"
                                        placeholder="Nhập số khung"
                                        // required
                                        value={(dataItems?.vehicle_identification_number ?? '')}
                                        disabled={ true }
                                      />
                                    </Grid>
                                    <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="5. Số máy"
                                        placeholder="Nhập số máy"
                                        // required
                                        value={(dataItems?.engine_number ?? '')}
                                        disabled={ true }
                                      />
                                    </Grid>
                                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="6. Biển số đăng ký"
                                        placeholder="Nhập biển số đăng ký"
                                        // required
                                        value={(dataItems?.license_plate ?? '')}
                                        disabled={ true }
                                      />
                                    </Grid>
                                    <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="7. Mô tả tài sản"
                                        placeholder="Nhập mô tả tài sản"
                                        required
                                        value={(dataItems?.description ?? '')}
                                        disabled={ true }
                                      />
                                    </Grid>
                                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="8. Chất lượng còn lại thẩm định"
                                        placeholder="Nhập chất lượng còn lại thẩm định"
                                        required
                                        type="number"
                                        format
                                        value={(dataItems?.CLCL?.toString() ?? '')}
                                        disabled={ true }
                                      />
                                    </Grid>
                                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="9. Số lượng(chiếc)"
                                        placeholder="Nhập số lượng(chiếc)"
                                        required
                                        type="number"
                                        format
                                        value={(dataItems?.quantity?.toString() ?? '')}
                                        disabled={ true }
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
      {/* <AppraisalResult uuidData={collateralData?.uuidActiveData ?? ""}/> */}
    </Fragment>
  )
}
export default Transport;