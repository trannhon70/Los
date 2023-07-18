import { FC, useState } from "react";
import { Box, Grid } from "@mui/material";
import AddressInfo from "./AddressInfo";
import BasicInfo from "./BasicInfo";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import contactInfoStyle from "./style";
import clsx from "clsx";
import ObjectList, { ObjectListMenuItem } from "views/components/layout/ObjectList";
import { useDispatch, useSelector } from "react-redux";
import { getLOANCardStorageLegalDeclareActiveRelated, getLOANCardStorageLegalDeclareRelated } from "features/loan/card/storage/legal/selectors";
import { addLOANCardStorageLegalRelated, deleteLegalDeclareRelated, setLOANCardStorageLegalDeclareActiveRelated } from "features/loan/card/storage/legal/action";
import { ILOANCardStorageLegalRelatedDeclareState } from "types/models/loan/card/storage/Legal";
import ModalConfirm from "views/components/layout/ModalConfirm";


const ContactInfo: FC = () => {


  const dispatch = useDispatch();
  const classes = contactInfoStyle();
  const RelatedInfo = useSelector(getLOANCardStorageLegalDeclareRelated());
  // const userList = useSelector(getLOANCardStorageLegalDeclareAllName);
  const _contact = RelatedInfo?.data.info;
  const active = useSelector(getLOANCardStorageLegalDeclareActiveRelated());
  const [DeleteDeclare, setDeleteDeclare] = useState<ILOANCardStorageLegalRelatedDeclareState | null>(null);

  const handleAddNewUser = () => {
    dispatch(addLOANCardStorageLegalRelated());
  }

  const onChangeActive = (current: number) => {
    dispatch(setLOANCardStorageLegalDeclareActiveRelated(current));
  }

  const onClickMenu = (menu: ObjectListMenuItem, position: number) => {
    if (menu.value === 'delete') {
      dispatch(deleteLegalDeclareRelated(_contact[position].uuid));
      return;
    }
    setDeleteDeclare(_contact[position]);
  }
  const onConfirmDelete = () => {
    dispatch(deleteLegalDeclareRelated(DeleteDeclare?.uuid ?? ''));
    setDeleteDeclare(null);
  }

  const onCloseDelete = () => setDeleteDeclare(null);

  return (
    <Grid
      container
      className={clsx(classes.root, "pt-5 mt-2")}
      rowSpacing="20"
      columnSpacing="20"
    >
      <Grid item xl={12} md={12} xs={12}>
        <Grid container columnSpacing="20" rowSpacing="20">
          <Grid item xl={2} md={3} xs={12}>
            <span style={{ color: "#eb0029" }}>
              Xin vui lòng chọn từ danh sách hoặc tạo người liên hệ mới
            </span>
          </Grid>
          <Grid item xl={4} md={6} xs={6}>
            <Autocomplete
              className="autocomplete__root"
              popupIcon={
                <KeyboardArrowDownOutlined
                  fontSize="small"
                  className={classes.icon}
                />
              }
              options={['asd','asd']}
              multiple
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xl={12} md={12} xs={12}>
            <ObjectList
              labelLength="Số lượng người liên hệ:"
              current={active === null  ? undefined : active}
              avatar
              options={
                _contact.map(con => ({
                  label: con.basic_info.full_name ||
                    <em className="text-secondary text-lower pr-1 font-normal">
                      [Chưa nhập tên]
                    </em>
                }))
              }
              className={`${classes.userListClass}  `}
              // enableMenu={false}
              onAdd={handleAddNewUser}
              onClickMenu={onClickMenu}
              onChange={onChangeActive}
              menu={[
                { value: 'delete', label: 'Xoá' },
              ]}
              
            />
          </Grid>
          <ModalConfirm open={DeleteDeclare !== null} onClose={onCloseDelete} onConfirm={onConfirmDelete}>
            <Box className="text-18 font-medium text-primary text-center">
              Bạn có chắc muốn xoá người liên hệ?
            </Box>
            <Box className="text-center">
              Các thông tin của {DeleteDeclare?.basic_info.full_name} sẽ mất hoàn toàn!
            </Box>
          </ModalConfirm>
        </Grid>
      </Grid>
      <Grid item xl={4} md={12} xs={12}>
        <BasicInfo />
      </Grid>
      <Grid item xl={4} md={12} xs={12}>
        <AddressInfo />
      </Grid>
      <Grid item xl={4}></Grid>
    </Grid>
  );
};

export default ContactInfo;
