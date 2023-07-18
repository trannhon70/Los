import { Collapse, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { onChangeCollaretalRPROApproval } from 'features/loan/normal/storageApproval/collateral/actions';
import { FC, Fragment, SyntheticEvent, useRef, useState } from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { ILOANNormalCollateralData, ISubtype } from 'types/models/loan/normal/storage/CollaretalV2';
import { formatNumber } from 'utils';
import Input from 'views/components/base/Input';
import Radio, { RadioRef } from 'views/components/base/Radio';
import TextArea from 'views/components/base/TextArea';
import CardInside from 'views/components/layout/CardInside';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import TabPanel from 'views/components/layout/TabPanel';
import SelectLocation from 'views/components/widgets/SelectLocation';
import SelectRightPropertyStatus from 'views/components/widgets/SelectRightPropertyStatus';
import { SxCollateralTabs, SxCollatertalCommon } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import InfoReportCollaretalType from '../TableInfoReportCollaretalType';
import AppraisalResult from '../AppraisalResult';
import LegalInfomationOwner from '../LegalInfomationOwner';
import useStorageCollateral from '../useStorageCollateral';
import ButtonDetailSubItemAttachment from '../ButtonDetailSubItemAttachment';
import SelectMachineType from 'views/components/widgets/SelectMachineType';
import { SxSelectCollateralType } from '../style';

export interface MachineProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
}

const Machine: FC<MachineProps> = (props) => {
  const dispatch = useDispatch();
  const { collateralData, subType } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [CurrentTab, setCurrentTab] = useState(0);
  const radioRef = useRef<RadioRef>(null)

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
  const {
    getDataCollateral,
    TotalValueTransportType,
    SubTypeItems,
    SubTypeItemsActive,
    dataItems,
    SubTypeId
  } = useStorageCollateral("ALL",
    collateralData?.uuidActiveData ?? "",
    subType?.uuidActiveSubtype ?? "");

  const optionsData: IGroupListBase[] = SubTypeItems?.map((__, i) => ({
    value: i + 1,
    label: `MMTB ${i + 1}`,
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
          <InfoReportCollaretalType
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
                    required={[true, true]}
                    disabled={true}
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
                    disabled={true}
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
            <SelectMachineType
                className="colla-type"
                sx={SxSelectCollateralType}
                // onChange={onChangeSubTypeMachine}
                value={SubTypeId ?? ""}
                disabled
            />
              {/* <Typography sx={SxCollatertalCommon}>Máy móc thiết bị</Typography> */}
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
              {true ? null : <IconButton>
                <IoTrashOutline style={{fontSize: '1.5rem'}}/>
              </IconButton>
              }
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
                      overflow: 'scroll',

                    },
                    "& .group-list": {
                      "& .MuiList-padding": {
                        width: "270px"
                      }
                    }
                  }}>
                    <GroupListBase labelAdd='Thêm máy móc'
                      className="group-list"
                      activeId={(SubTypeItems?.findIndex(d => d.activeUUID === SubTypeItemsActive) ?? 0) + 1}
                      onSelected={onSelectGroupList}
                      options={optionsData}
                      isDelete={!true}
                      isAdd={true}
                      isValueMoney={true}
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
                          value={dataItems?.ratio?.toString() ?? ''}
                          type="number"
                          format
                          disabled={true}
                        />
                      </Grid>
                      <Grid item xl={4}>
                        <Radio label="2. TS hiện đang đảm bảo cho nghĩa vụ CTD"
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
                          variant="checkbox"
                          required />
                      </Grid>
                      <Grid item xl={5}>
                        <Input label="3. Giá trị máy móc thiết bị (VNĐ)"
                          type="number"
                          format
                          value={dataItems?.value?.toString() ?? ''}
                          required
                          disabled={true}
                        />
                      </Grid>
                      <Grid item xl={12}>
                        <TextArea label="4. Thông tin nghĩa vụ đang đảm bảo "
                          placeholder='Nhập thông tin nghĩa vụ '
                          value={dataItems?.info_collatetal ?? ''}
                          required
                          disabled={true}
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
                            <LegalInfomationOwner
                              isFormLegalInfo={false}
                              activeSubType={subType?.uuidActiveSubtype ?? ""}
                              uuIdData={collateralData?.uuidActiveData ?? ''}
                            />
                          </TabPanel>
                          <TabPanel padding={false} value={CurrentTab} index={1}>
                            <Grid container spacing={3}>
                              <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                              <ButtonDetailSubItemAttachment dataItems={dataItems} masterData={{ uuid: collateralData?.uuidActiveData ?? "", uuidActive: subType?.uuidActiveSubtype ?? "", collaretalType:'MEST' }} viewOnly={true}  />
                                <CardInside title="Thông tin cơ bản" fieldsetClass="px-4" classBody="h-full p-6" >
                                  <Grid container spacing={3}>
                                    <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="1. Loại tài sản"
                                        placeholder='Nhập loại tài sản'
                                        required
                                        value={dataItems?.typeCollateral}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="2. Số lượng từng loại"
                                        placeholder='Nhập số lượng từng loại'
                                        required
                                        value={formatNumber(dataItems?.count?.toString()) ?? ''}
                                        type="number"
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="3. Năm sản xuất"
                                        placeholder='Nhập năm sản xuất'
                                        required
                                        value={dataItems?.year?.toString()}
                                        type="number"
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="4. Nhãn hiệu"
                                        placeholder='Nhập nhãn hiệu'
                                        required
                                        value={dataItems?.branch ?? ''}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="5. Model (số loại)"
                                        placeholder='Nhập model (số loại)'
                                        required
                                        value={dataItems?.model?.toString() ?? ''}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="6. Nơi sản xuất/lắp ráp"
                                        placeholder='Nhập nơi sản xuất/lắp ráp'
                                        required
                                        value={dataItems?.production?.toString() ?? ''}
                                        disabled={true}
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
                                        value={dataItems?.CLCL?.toString() ?? ''}
                                        type="number"
                                        format
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="2. Số giấy tờ đăng ký"
                                        placeholder='Nhập số giấy giờ đăng ký'
                                        value={dataItems?.number_register?.toString() ?? ''}
                                        disabled={true}

                                      />
                                    </Grid>
                                    <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                      <SelectRightPropertyStatus
                                        label="3. Tình trạng tài sản"
                                        placeHolder="Chọn tình trạng tài sản"
                                        value={dataItems?.status?.toString() ?? ''}
                                        typeProperty="MMTB"
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="4. Mô tả tài sản"
                                        placeholder='Nhập mô tả tài sản'
                                        value={dataItems?.description?.toString() ?? ''}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="5. Số lượng (chiếc)"
                                        placeholder='Nhập số lượng (chiếc)'
                                        required
                                        value={dataItems?.quantity?.toString() ?? ''}
                                        type="number"
                                        format
                                        disabled={true}
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
        </TableBody>
      </Table>
      {/* <AppraisalResult uuidData={collateralData?.uuidActiveData ?? ""} /> */}
    </Fragment>
  )
}

export default Machine;