import { Box, Collapse, Divider, Grid, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import useNotify from "app/hooks/useNotify";
import { FC, Fragment, useState } from "react";
import { BiChevronDownCircle } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import {
  ISubItems
} from "types/models/loan/normal/storage/CollaretalV2";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import GroupListBase, {
  IGroupListBase
} from "views/components/layout/GroupListBase";
import ModalConfirm from "views/components/layout/ModalConfirm";
import Tabs from "views/components/layout/Tabs";
import SelectIssuer from "views/components/widgets/SelectIssuer";
import collateralStyle, {
  SxCollateralTabs,
  SxCollatertalCommon
} from "../style";


const DetailsDeposit: FC = () => {


  const [openTable, setOpenTable] = useState(false);
  const [currIssuer, setCurrIssuer] = useState("");

  const toggleTable = () => setOpenTable(!openTable);
  const notify = useNotify();
  const classes = collateralStyle();

  const onAdd = () => {
  };

  const onChangeDataDetails = (
    value: string | number | null,
    key: keyof ISubItems
  ) => {
  };

  const [deleteDeposit, setDeleteDeposit] = useState<ISubItems | null>(null);
  const onHandleCancelConfirmDeposit = () => setDeleteDeposit(null);

  const onHandleClickMenuDeposit = (menu: IGroupListBase, position: number) => {
  };

  const onHandleConfirmCer = () => {
    notify("Xóa thành công", "success")
    onHandleCancelConfirmDeposit();
  };

  const optionsData: IGroupListBase[] = [
    {
      value: 1,
      label: `Số dư tiền gửi 1`,
      key: 1,
      valueMoney: 40000000
    },
    {
      value: 2,
      label: `Số dư tiền gửi 2`,
      key: 2,
      valueMoney: 40000000
    },
    {
      value: 3,
      label: `Số dư tiền gửi 3`,
      key: 3,
      valueMoney: 40000000
    },
    {
      value: 4,
      label: `Số dư tiền gửi 4`,
      key: 4,
      valueMoney: 40000000
    },
  ]
  const onSelectGroupList = (value: IGroupListBase) => {
  };

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <Typography sx={SxCollatertalCommon}>
            Số dư tiền gửi 1
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
          <Collapse in={openTable}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Grid
                      container
                      className="mt-5"
                      columnSpacing="20"
                      rowSpacing="20"
                    >
                      <Grid item xl={2} className={classes.groupListBase}>
                        <GroupListBase
                          labelAdd="Thêm số dư tiền gửi"
                          onAdd={onAdd}
                          activeId={0}
                          isValueMoney
                          isDelete
                          onDelete={onHandleClickMenuDeposit}
                          onSelected={onSelectGroupList}
                          options={optionsData}
                        />
                      </Grid>
                      <Grid item xl={10}>
                        <Grid container>
                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                            >
                              A. Thông tin định giá và thẩm định tài sản
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                          <Grid item xl={3}>
                            <Input
                              label="1. Tỷ lệ cho vay tối đa theo quy định"
                              required
                            />
                          </Grid>
                          <Grid item xl={3}>
                            <Input
                              label="2. Giá trị quyền tài sản (VNĐ)"
                              required
                            />
                          </Grid>
                        </Grid>
                        <Grid container className="mt-5">
                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                            >
                              B. Thông tin pháp lý
                            </Typography>
                          </Grid>
                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Tabs
                              tabs={[
                                "Thông tin pháp lý chủ sở hữu",
                                "Thông tin chi tiết",
                              ]}
                              sx={SxCollateralTabs}
                            >
                              <div>
                                <CardInside title="Thông tin tài sản">
                                  <Grid container>
                                    <Grid
                                      item
                                      xl={12}
                                      lg={12}
                                      md={12}
                                      sm={12}
                                      xs={12}
                                    ></Grid>
                                  </Grid>
                                </CardInside>
                              </div>
                              <div>
                                <Grid container spacing={3}>
                                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <CardInside
                                      title="I. Thông tin tài sản"
                                      fieldsetClass="px-4"
                                      classBody="h-full p-6"
                                    >
                                      <Grid container spacing={3}>
                                        <Grid
                                          item
                                          xl={3}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                          xs={12}
                                        >
                                          <Input
                                            label="1. Loại tài sản"
                                            required
                                          />
                                        </Grid>
                                        <Grid
                                          item
                                          xl={3}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                          xs={12}
                                        >
                                          <Input
                                            label="2. Số giấy tờ đăng ký"
                                            required
                                          />
                                        </Grid>
                                        <Grid
                                          item
                                          xl={3}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                          xs={12}
                                        >
                                          <Input
                                            label="3. Tình trạng tài sản"
                                            required
                                          />
                                        </Grid>
                                        <Grid
                                          item
                                          xl={3}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                          xs={12}
                                        ></Grid>
                                        <Grid
                                          item
                                          xl={3}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                          xs={12}
                                        >
                                          <SelectIssuer
                                            label="4. Đơn vị phát hành"
                                            required
                                          />
                                        </Grid>
                                        <Grid
                                          item
                                          xl={9}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                          xs={12}
                                        >
                                          <Input
                                            label="5. Đơn vị phát hành khác"
                                            disabled={currIssuer !== "OTHER"}
                                          />
                                        </Grid>
                                        <Grid
                                          item
                                          xl={12}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                          xs={12}
                                        >
                                          <Input
                                            label="6. Mô tả tài sản"
                                            required
                                          />
                                        </Grid>
                                      </Grid>
                                    </CardInside>
                                  </Grid>
                                </Grid>

                              </div>
                            </Tabs>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
      <Divider className="mt-5" />
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
