import { Button, Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import InputDate from "views/components/base/InputDate";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import clsx from "clsx";
import identificationStyle from "./style";
import Add from "@mui/icons-material/Add";
import ModalIdentity from "views/pages/LOAN/widgets/ModalIdentity";

const IdentityInfo: FC = () => {
  const classes = identificationStyle();
  const identificationClass = clsx(classes.root);

  const [openModal, setOpenModal] = useState(false);
  const [modalAdd, setModalAdd] = useState<boolean | null>(null);

  useEffect(() => {
    setOpenModal(modalAdd !== null);
  }, [modalAdd]);
  const clickList = () => {
    setModalAdd(false);
  };

  const clickAddIdentity = () => {
    setModalAdd(true);
  };

  const onCloseModal = () => {
    setModalAdd(null);
  };

  const onChangeModal = () => setModalAdd(true);

  return (
    <>
      <CardInside
        title={`II. Giấy tờ định danh`}
        className={identificationClass}
      >
        <div className="flex flex-column justify-between h-full">
          <div>
            <Grid container columnSpacing="20" rowSpacing="20">
              <Grid item xl={7} md={7} xs={12}>
                <Input
                  label={`1. Số CMND/CCCD/Hộ chiếu`}
                  type="number"
                  required
                  timeout={300}
                />
              </Grid>
              <Grid item xl={5} md={5} xs={6}>
                <InputDate label={`2. Ngày cấp`} required={true} />
              </Grid>
              <Grid item xl={5} md={5} xs={6}>
                <InputDate label={`3. Ngày hết hạn`} required />
              </Grid>
              <Grid item xl={7} md={7} xs={12}>
                <Input
                  label={`4. Nơi cấp`}
                  type="text"
                  required
                  timeout={300}
                />
              </Grid>
            </Grid>
          </div>
          <div className={`flex justify-end mt-5 ${classes.buttonList}`}>
            <Button
              variant="contained"
              onClick={clickList}
              style={{ textTransform: "none" }}
            >
              Danh sách
            </Button>
            <Button
              variant="outlined"
              onClick={clickAddIdentity}
              style={{ textTransform: "none" }}
              className={`ml-5`}
              startIcon={<Add />}
            >
              Thêm giấy tờ định danh
            </Button>
            <ModalIdentity
              open={openModal}
              add={!!modalAdd}
              onClose={onCloseModal}
            />
          </div>
        </div>
      </CardInside>
    </>
  );
};
export default IdentityInfo;
