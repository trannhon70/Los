import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FC } from "react";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";

const Identity: FC = () => {
  return (
    <CardInside
      title="III. Giấy tờ định danh"
      classBody="h-full p-6"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16"
    >
      <Box className="flex-column h-full justify-between">
        <Box>
          <Grid container spacing={3}>
            <Grid item xl={8} lg={6} md={12} sm={12} xs={12}>
              <Input label="1. Số CMND/CCCD/Hộ chiếu" disabled required />
            </Grid>
            <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
              <InputDate label="2. Ngày cấp" disabled required />
            </Grid>
          </Grid>
          <Grid container spacing={3} className="mt-0">
            <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
              <InputDate label="3. Ngày hết hạn" disabled required />
            </Grid>
            <Grid item xl={8} lg={6} md={12} sm={12} xs={12}>
              <Input label="4. Nơi cấp" disabled required />
            </Grid>
          </Grid>
        </Box>
        <Box className="pt-6 text-right">
          <Button
            variant="contained"
            sx={{
              borderRadius: 0,
              textTransform: "revert",
              boxShadow: "unset",
            }}
          >
            Danh sách
          </Button>
        </Box>
      </Box>
      {/* <ModalIdentity
        open={openModal}
        add={!!modalAdd}
        identities={identities}
        onClose={onClose}
        screen={SCREEN}
      /> */}
    </CardInside>
  );
};

export default Identity;
