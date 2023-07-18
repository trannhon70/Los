import { Box, Collapse, Grid, Tab, Tabs, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import useNotify from "app/hooks/useNotify";
import {
  addCollaretalRPRO,
  deleleteSubtypeItem,
  onChangeCollaretalRPRO,
  setCollaretalRPRO
} from "features/loan/normal/storage/collateralV2/actions";
import {
  getLoanNormalSubTypeItems,
  getLoanNormalSubTypeItemsActive,
  getLoanNormalSubTypeItemsData, getValidateLOANNormalStorageCollateral
} from "features/loan/normal/storage/collateralV2/selector";
import { FC, Fragment, SyntheticEvent, useEffect, useState } from "react";
import { BiChevronDownCircle } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import {
  ILOANNormalCollateralData,
  ISubItems
} from "types/models/loan/normal/storage/CollaretalV2";
import { formatNumber } from "utils";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import Empty from "views/components/layout/Empty";
import GroupListBase, {
  IGroupListBase
} from "views/components/layout/GroupListBase";
import ModalConfirm from "views/components/layout/ModalConfirm";
import TabPanel from "views/components/layout/TabPanel";
import SelectIssuer from "views/components/widgets/SelectIssuer";
import SelectPaperType from "views/components/widgets/SelectPaperType";
import LegalInfomationOwner from "../LegalInfomationOwner";
import collateralStyle, { SxCollateralTabs, SxCollatertalCommon } from '../style';
export interface DetailsDeposityProps {
  open?: boolean;
  keyIndex: number;
  collateral?: ILOANNormalCollateralData;
  uuid: string;
}
const DetailsDeposit: FC<DetailsDeposityProps> = (props) => {
  const dispatch = useDispatch();

  const [openTable, setOpenTable] = useState(false);
  const [currIssuer, setCurrIssuer] = useState("");
  const getMessage = useNormalCollateralMessage();
  const toggleTable = () => setOpenTable(!openTable);
  const notify = useNotify();
  const { collateral, uuid } = props;
  const classes = collateralStyle();

  const data =
    useSelector(
      getLoanNormalSubTypeItems(collateral?.uuidActiveData ?? "", uuid ?? "")
    ) ?? [];
  const dataActiveItems = useSelector(
    getLoanNormalSubTypeItemsActive(
      collateral?.uuidActiveData ?? "",
      uuid ?? ""
    )
  );
  const valid = useSelector(getValidateLOANNormalStorageCollateral)
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

  const onAdd = () => {
    // dispatch(
    //   addCollaretalRPRO("", {
    //     uuid: collateral?.uuidActiveData ?? "",
    //     uuidActive: uuid,
    //   })
    // );
  };

  const onChangeDataDetails = (
    value: string | number | null,
    key: keyof ISubItems
  ) => {
    dispatch(
      setCollaretalRPRO(value, {
        uuid: collateral?.uuidActiveData ?? "",
        uuidActive: uuid,
        key,
      })
    );
  };

  const dataItems = useSelector(
    getLoanNormalSubTypeItemsData(
      collateral?.uuidActiveData ?? "",
      uuid ?? "",
      dataActiveItems ?? ""
    )
  );

  const [deleteDeposit, setDeleteDeposit] = useState<ISubItems | null>(null);
  const onHandleCancelConfirmDeposit = () => setDeleteDeposit(null);

  const onHandleClickMenuDeposit = (menu: IGroupListBase, position: number) => {
    let dataMenuCer = data?.find((cer, index) => index === position);
    setDeleteDeposit(dataMenuCer ?? null);
  };

  const onHandleConfirmCer = () => {
    if (collateral?.uuidActiveData && uuid) {
      const dataPos = deleteDeposit?.activeUUID
      dispatch(
        deleleteSubtypeItem(dataPos ?? "", {
          uuidData: collateral?.uuidActiveData ?? "",
          uuidSubType: uuid,
        })
      );
      notify("Xóa thành công", "success")
    }
    onHandleCancelConfirmDeposit();
  };

  const optionsData: IGroupListBase[] =
    data?.map((__, i) => ({
      value: i + 1,
      label: `Số dư tiền gửi ${i + 1}`,
      key: i + 1,
      valueMoney: formatNumber(__.value?.toString() ?? ""),
    })) ?? [];

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = data[current].activeUUID ?? "";
    dispatch(
      onChangeCollaretalRPRO(currentActive, {
        uuid: collateral?.uuidActiveData ?? "",
        uuidActive: uuid,
      })
    );
  };

  const optionsDataPos =
    (data?.findIndex((d) => d.activeUUID === dataActiveItems) ?? 0) + 1;

  // set item active khi validate
  useEffect(()=>{

    valid.valid === false && dispatch(onChangeCollaretalRPRO(valid.position as string, {uuid: collateral?.uuidActiveData ?? '',uuidActive: uuid,}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[valid])
  const elementInfomationLegal = () => {
    return (
      <>
        <Grid container>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              className='text-upper font-bold'
            >
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
              onDebounce={(val) =>
                onChangeDataDetails(val, "ratio")
              }
              value={dataItems?.ratio?.toString() ?? ""}
              type="number"
              format
              message={getMessage('ratio',{position:dataItems?.activeUUID?? '' })}
            />
          </Grid>
          <Grid item xl={3}>
            <Input
              label="2. Giá trị SDTG (VNĐ)"
              placeholder="Nhập giá trị quyền tài sản (VNĐ)"
              onDebounce={(val) =>
                onChangeDataDetails(+val, "value")
              }
              value={dataItems?.value?.toString() ?? ""}
              required
              type="number"
              format
              message={getMessage('value',{position:dataItems?.activeUUID?? '' })}
            />
          </Grid>
        </Grid>
        <Grid container className="mt-5">
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              className='text-upper font-bold'
            >
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
              <Tab label="Thông tin pháp lý giấy chứng nhận" sx={{ borderLeft: "solid 1px #b5b5b5"}}/>
            </Tabs>
            <SwipeableViews
              disabled
              index={CurrentTab}
              onChangeIndex={handleTabPanel}
            >
              <TabPanel padding={false} value={CurrentTab} index={0}>
                <LegalInfomationOwner 
                  isFormLegalInfo={false}
                  activeSubType={uuid}
                  uuIdData={collateral?.uuidActiveData ?? ''}
                />
              </TabPanel>

              <TabPanel padding={false} value={CurrentTab} index={1}>
              <CardInside
                  title="Thông tin quyền tài sản"
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
                        message={getMessage('typeCollateral',{position:dataItems?.activeUUID?? '' })}
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
                        message={getMessage('license',{position:dataItems?.activeUUID?? '' })}
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
                        message={getMessage('status',{position:dataItems?.activeUUID?? '' })}
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
                          setCurrIssuer(val);
                        }}
                        message={getMessage('issuer',{position:dataItems?.activeUUID?? '' })}
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
                        disabled={dataItems?.issuer !== "107"}
                        message={getMessage('other_issuer',{position:dataItems?.activeUUID?? '' })}
                      />
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Input
                        label="6. Mô tả tài sản"
                        placeholder="Nhập mô tả tài sản"
                        required
                        value={dataItems?.description ?? ""}
                        onDebounce={(val) =>
                          onChangeDataDetails(
                            val,
                            "description"
                          )
                        }
                        message={getMessage('description',{position:dataItems?.activeUUID?? '' })}
                      />
                    </Grid>
                  </Grid>
                </CardInside>
              </TabPanel>
            </SwipeableViews>
            {/* <Tabs
              tabs={[
                "Thông tin pháp lý chủ sở hữu",
                "Thông tin pháp lý giấy chứng nhận",
              ]}
              sx={SxCollateralTabsGoodType}
            >
              <div>
                <Grid container className='mt-5'>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Radio
                        label="Đối tượng sở hữu tài sản"
                        required
                        sx={SxRadio}
                        options={optionCollateralOwnerType}
                      />
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className='mt-5'>
                      <ObjectList
                        enableAdd={false}
                        enableMenu={true}
                        menu={[
                          {
                            label: "Chi tiết",
                            value: "1",
                          },
                        ]}
                        options={[
                          { label: "Nguyễn Anh Đào", circle: '' },
                        ]}
                        labelLength="Người sở hữu:"
                        current={0}
                        sx={SxObjectListUser}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <div>
                <CardInside
                  title="Thông tin quyền tài sản"
                  fieldsetClass="px-4"
                  classBody="h-full p-6"
                >
                  <Grid container spacing={3}>
                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                      <Input
                        label="1. Loại tài sản"
                        required
                        value={dataItems?.typeCollateral ?? ""}
                        onDebounce={(val) =>
                          onChangeDataDetails(
                            val,
                            "typeCollateral"
                          )
                        }
                      />
                    </Grid>
                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                      <Input
                        label="2. Số giấy tờ đăng ký"
                        required
                        value={dataItems?.license ?? ""}
                        onDebounce={(val) =>
                          onChangeDataDetails(val, "license")
                        }
                      />
                    </Grid>
                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                      <Input
                        label="3. Tình trạng tài sản"
                        required
                        value={dataItems?.status ?? ""}
                        onDebounce={(val) =>
                          onChangeDataDetails(val, "status")
                        }
                      />
                    </Grid>
                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                      <SelectIssuer
                        label="4. Đơn vị phát hành"
                        required
                        value={dataItems?.issuer ?? ""}
                        onChange={(val) => {
                          onChangeDataDetails(val, "issuer");
                          setCurrIssuer(val);
                        }}
                      />
                    </Grid>
                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                      <Input
                        label="5. Đơn vị phát hành khác"
                        value={dataItems?.other_issuer ?? ""}
                        onChange={(val) =>
                          onChangeDataDetails(
                            val,
                            "other_issuer"
                          )
                        }
                        disabled={currIssuer !== "OTHER"}
                      />
                    </Grid>
                    <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
                      <Input
                        label="6. Mô tả tài sản"
                        required
                        value={dataItems?.description ?? ""}
                        onDebounce={(val) =>
                          onChangeDataDetails(
                            val,
                            "description"
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </CardInside>
              </div>
            </Tabs> */}
          </Grid>
        </Grid>

      </>
    );
  };
  return (
    <Fragment>
      <TableRow>
        <TableCell width={'20%'}>
          <Typography sx={SxCollatertalCommon}>
            Số dư tiền gửi
          </Typography>
        </TableCell>
        <TableCell></TableCell>
        <TableCell className="pl-4"></TableCell>
        <TableCell
          className="text-right pr-0 py-2"
          width="140px"
          sx={{ "& svg": { color: "var(--mscb-primary)" } }}
        >
          <Box>
            <IconButton>
              <IoTrashOutline style={{ fontSize: "1.5rem" }} />
            </IconButton>
            <IconButton onClick={toggleTable}>
              <BiChevronDownCircle style={{ fontSize: "1.5rem" }} />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5} className="p-0" sx={{ border: "none" }}>
          <Collapse  sx={{
          '& .MuiCollapse-wrapper': {
            "& .MuiCollapse-wrapperInner": {
              paddingLeft: "0px !important"
            }
          }
        }} in={openTable} unmountOnExit>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Grid
                      container
                      // className="mt-5"
                      columnSpacing="20"
                      rowSpacing="20"
                    >
                      <Grid item xl={2} className={classes.groupListBase}>
                        <GroupListBase
                          labelAdd="Thêm số dư tiền gửi"
                          onAdd={onAdd}
                          activeId={optionsDataPos}
                          isValueMoney
                          isDelete
                          onDelete={onHandleClickMenuDeposit}
                          onSelected={onSelectGroupList}
                          options={optionsData}
                          className="group-list"
                        />
                      </Grid>
                      <Grid item xl={10}>
                        {data.length === 0 ? (
                          <Empty> Không có dữ liệu </Empty>
                        ) : (
                          elementInfomationLegal()
                        )}
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
      <ModalConfirm
        open={deleteDeposit !== null}
        onClose={onHandleCancelConfirmDeposit}
        onConfirm={onHandleConfirmCer}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa số dư tiền gửi
        </Box>
      </ModalConfirm>
    </Fragment>
  );
};

export default DetailsDeposit;
