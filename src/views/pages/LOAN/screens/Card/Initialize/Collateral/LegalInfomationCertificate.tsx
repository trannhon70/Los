import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { EActionMenu } from "features/loan/normal/storage/collateralV2/case";
import { FC, useState } from "react";
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { ICertificateLegalInfoData, ICertificateLegalInfoDataUserList } from "types/models/loan/normal/storage/CollaretalV2";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";
import ModalConfirm from "views/components/layout/ModalConfirm";
import ObjectList, {
  ObjectListMenuItem,
  ObjectListOption
} from "views/components/layout/ObjectList";
import collateralStyle, { SxObjectListUser, SxOnjectListLandAssets } from "./style";

const LegalInfomationCertificate: FC = () => {

  const classes = collateralStyle();

  const [deleteIdCer, setDeleteIdCer] = useState<ICertificateLegalInfoData | null>(null);
  const [deleteIdUser, setDeleteIdUser] = useState<ICertificateLegalInfoDataUserList | null>(null);
  const [isDisiableInput, setIsDisiableInput] = useState<boolean>(false);

  const onAddCre = () => {
  };
  /**
   * option data opject certifiCate
   *
   */
  const optionsCer: ObjectListOption[] = [{
    label: `Giấy chứng nhận 1`,
    circle: <BsFillFileEarmarkFill />,
  },
  {
    label: `Giấy chứng nhận 2`,
    circle: <BsFillFileEarmarkFill />,
  }]
  const onChangeCre = (current: number) => {
  };

  /**
   * Action add new user list
   */
  const onAddCreUseListLegal = () => { }

  /**
  * Action menu close modal confirm delete certifiCate
  *
  */
  const onHandleCancelConfirmCer = () => setDeleteIdCer(null);

  /**
   * Action menu onject list certifiCate
   *
   */
  const onHandleClickMenuCer = (menu: ObjectListMenuItem, position: number) => {

  }

  /**
   * Action menu success delete certifiCate
   *
   */
  const onHandleConfirmCer = () => {
  }

  /**
   * option data opject list user list
   *
   */
  const optionsCerUseListLegal: ObjectListOption[] = [{
    label: `USER 1`,
    circle: <PersonOutlineIcon />,
  }]

  const onChangeCreUseListLegal = (current: number) => {
  };

  /**
   * Action menu onject list certifiCate
   *
   */
  const onClickMenuUserLegal = (menu: ObjectListMenuItem, position: number) => {
  }

  /**
   * Action menu close modal confirm delete user
   *
   */
  const onHandleCancelConfirmUser = () => setDeleteIdUser(null);

  /**
   * Action menu success delete user
   *
   */
  const onHandleConfirmUser = () => {
  }

  return (
    <Grid container spacing={3} className="pt-6">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.objectList}>
        <ObjectList
          enableAdd={true}
          enableMenu
          menu={[
            {
              value: EActionMenu.DELETE,
              label: "Xóa",
            }
          ]}
          onClickMenu={onHandleClickMenuCer}
          labelLength="Số lượng GCN: &nbsp;"
          onAdd={onAddCre}
          onChange={onChangeCre}
          current={0}
          options={optionsCer}
          sx={SxOnjectListLandAssets}
        />
      </Grid>

      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <CardInside
          title="I. Thông tin giấy chứng nhận"
          sx={{
            "& legend": {
              fontSize: "16px",
            },
          }}
        >
          <Grid container spacing={3} className="pl-4 pb-4">
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <ObjectList
                enableAdd={true}
                enableMenu
                menu={[
                  {
                    value: EActionMenu.DELETE,
                    label: "Xóa",
                  }
                ]}
                onClickMenu={onClickMenuUserLegal}
                onAdd={onAddCreUseListLegal}
                onChange={onChangeCreUseListLegal}
                labelLength="Người sở hữu: &nbsp;"
                current={0}
                options={optionsCerUseListLegal}
                sx={SxObjectListUser}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                label="1. Loại GCN quyền sử dụng đất"
                disabled={isDisiableInput}
                required
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                label="2. Loại GCN quyền sử dụng đất khác"
                disabled={isDisiableInput}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="3. Số GCN/giấy tờ pháp lý"
                required
                disabled={isDisiableInput}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="4. Số vào sổ cấp GCN"
                disabled={isDisiableInput}
                required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="5. Ngày cấp"
                disabled={isDisiableInput}
                required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="6. Nơi cấp"
                disabled={isDisiableInput}
                required
              />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>

      <ModalConfirm open={deleteIdCer !== null} onClose={onHandleCancelConfirmCer} onConfirm={onHandleConfirmCer}>
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa giấy chứng nhận?
        </Box>
      </ModalConfirm>

      <ModalConfirm open={deleteIdUser !== null} onClose={onHandleCancelConfirmUser} onConfirm={onHandleConfirmUser}>
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa người sở hữu ?
        </Box>
      </ModalConfirm>

    </Grid>
  );
};

export default LegalInfomationCertificate;
