import Grid from "@mui/material/Grid";
import { FC, useEffect, useState } from "react";
import CardInside from "views/components/layout/CardInside";
import clsx from "clsx";
import addressInfoStyle from "./style";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import Input from "views/components/base/Input";
import IconCopy from "views/components/layout/IconCopy";
import SelectLocation from "views/components/widgets/SelectLocation";
import ModalAddress from "views/pages/LOAN/widgets/ModalAddress";

const AddressInfo: FC = () => {
  const classes = addressInfoStyle();

  const [openModal, setOpenModal] = useState(false);
  const [modalAdd, setModalAdd] = useState<boolean | null>(null);

  useEffect(() => {
    setOpenModal(modalAdd !== null);
  }, [modalAdd]);

  const clickList = () => {
    setModalAdd(false);
  };

  const clickAddAddress = () => {
    setModalAdd(true);
  };

  const onCloseModal = () => {
    setModalAdd(null);
  };

  const onChangeModal = () => setModalAdd(true);

  return (
    <CardInside title="III. Thông tin địa chỉ" className={clsx(classes.root)}>
      <div className="flex flex-column justify-between h-full">
        <div>
          <Grid
            container
            columnSpacing="20"
            rowSpacing="20"
            className={`h-full`}
          >
            <Grid item xl={12} md={12} xs={12} className={classes.inputLabel}>
              <SelectLocation
                before={
                  <Grid
                    item
                    xl={6}
                    lg={6}
                    md={12}
                    sm={12}
                    xs={12}
                    sx={{
                      display: "flex",
                      flexFlow: "row-reverse",
                    }}
                  >
                    <IconCopy className="icon-copy" />
                    <Input label="1. Địa chỉ thường trú" />
                  </Grid>
                }
                label={["2. Tỉnh/TP", "3. Quận/huyện", "4. Phường/xã"]}
                col={6}
              />
            </Grid>
            <Grid item xl={12} md={12} xs={12}>
              <Divider />
            </Grid>
            <Grid item xl={12} md={12} xs={12} className={classes.inputLabel}>
              <SelectLocation
                before={
                  <Grid
                    item
                    xl={6}
                    lg={6}
                    md={12}
                    sm={12}
                    xs={12}
                    sx={{
                      display: "flex",
                      flexFlow: "row-reverse",
                    }}
                  >
                    <IconCopy className="icon-copy" />
                    <Input label="1. Địa chỉ liên hệ" required />
                  </Grid>
                }
                label={["2. Tỉnh/TP", "3. Quận/huyện", "4. Phường/xã"]}
                required={[true, true, true]}
                col={6}
              />
            </Grid>
          </Grid>
        </div>
        <div className={`flex justify-end mt-5 ${classes.buttonList}`}>
          <Button
            onClick={clickList}
            variant="contained"
            style={{ textTransform: "none" }}
          >
            Danh sách
          </Button>
          <Button
            onClick={clickAddAddress}
            className={`ml-5`}
            style={{ textTransform: "none" }}
            variant="outlined"
            startIcon={<Add />}
          >
            Thêm địa chỉ
          </Button>
          <ModalAddress
            open={openModal}
            add={!!modalAdd}
            onClose={onCloseModal}
          />
        </div>
      </div>
    </CardInside>
  );
};

export default AddressInfo;
