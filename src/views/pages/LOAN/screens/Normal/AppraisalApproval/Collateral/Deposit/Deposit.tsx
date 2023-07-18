import { FC, Fragment, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import InfoReportCollaretalType from '../TableInfoReportCollaretalType';
import { ILOANNormalCollateralData, ISubtype } from 'types/models/loan/normal/storage/CollaretalV2';
import { Collapse, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { BiChevronDownCircle } from 'react-icons/bi';
import Input from 'views/components/base/Input';
import { formatNumber } from 'utils';
import useStorageCollateral from '../useStorageCollateral';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import { SxCollateralTabs, SxCollatertalCommon } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import CardInside from 'views/components/layout/CardInside';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from 'views/components/layout/TabPanel';
import LegalInfomationOwner from '../LegalInfomationOwner';
import SelectPaperType from 'views/components/widgets/SelectPaperType';
import SelectIssuer from 'views/components/widgets/SelectIssuer';
import AppraisalResult from '../AppraisalResult';
import { onChangeCollaretalRPROApproval } from 'features/loan/normal/storageApproval/collateral/actions';
import ButtonDetailSubItemAttachment from '../ButtonDetailSubItemAttachment';

export interface DepositProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
}

const Deposit: FC<DepositProps> = (props) => {
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
  } = useStorageCollateral("ALL",
    collateralData?.uuidActiveData ?? "",
    subType?.uuidActiveSubtype ?? "");


  const optionsData: IGroupListBase[] = SubTypeItems?.map((__, i) => ({
    value: i + 1,
    label: `Số dư tiền gửi ${i + 1}`,
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
              {<IconButton
                onClick={()=>{}}
              >
              </IconButton>}
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
                      className="group-list"
                      activeId={(SubTypeItems?.findIndex(d => d.activeUUID === SubTypeItemsActive) ?? 0) + 1}
                      onSelected={onSelectGroupList}
                      options={optionsData}
                      isDelete={false}
                      isValueMoney={true}
                      isAdd={true}
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
                              value={dataItems?.ratio?.toString() ?? ''}
                              type="number"
                              format
                              disabled={true}
                            />
                          </Grid>
                          <Grid item xl={3}>
                            <Input label="2. Giá trị hàng hóa (VNĐ)"
                              placeholder="Nhập giá trị quyền tài sản (VNĐ)"
                              value={dataItems?.value?.toString() ?? ''}
                              required
                              type="number"
                              format
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
                                {/* <ButtonAttachmentModalCollateral data={[]} /> */}
                                <ButtonDetailSubItemAttachment dataItems={dataItems} masterData={{ uuid: collateralData?.uuidActiveData ?? "", uuidActive: subType?.uuidActiveSubtype ?? "", collaretalType:'BALC' }} viewOnly={true} />
                                <CardInside
                                  title="I. Thông tin quyền tài sản"
                                  fieldsetClass="px-4"
                                  classBody="h-full p-6"
                                >
                                  <Grid container spacing={3}>
                                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                      <SelectPaperType
                                        label="1. Loại giấy tờ"
                                        required
                                        value={dataItems?.typeCollateral ?? ""}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="2. Số giấy tờ đăng ký"
                                        placeholder="Nhập số giấy tờ đăng ký"
                                        required
                                        value={dataItems?.license ?? ""}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                      {/* zepline select */}
                                      <Input
                                        label="3. Tình trạng tài sản"
                                        placeholder="Nhập tình trạng tài sản"
                                        required
                                        value={dataItems?.status ?? ""}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                                      <SelectIssuer
                                        label="4. Đơn vị phát hành"
                                        placeholder="Chọn đơn vị phát hành"
                                        required
                                        value={dataItems?.issuer ?? ""}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="5. Đơn vị phát hành khác"
                                        placeholder="Nhập đơn vị phát hành khác"
                                        value={dataItems?.other_issuer ?? ""}
                                        disabled={true}
                                      />
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                      <Input
                                        label="6. Mô tả tài sản"
                                        placeholder="Nhập mô tả tài sản"
                                        required
                                        value={dataItems?.description ?? ""}
                                        disabled={true}
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
    </Fragment >
  )
}

export default Deposit;