import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { FC } from "react";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import SelectLocation from "views/components/widgets/SelectLocation";

const Address: FC = () => {
  return (
    <CardInside
      title="IV. Thông tin địa chỉ"
      classBody="h-full p-6"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16"
    >
      <Box className="flex-column h-full justify-between">
        <Box>
          <SelectLocation
            sx={{
              "& .icon-copy": {
                zIndex: "1000",
                position: "absolute",
              },
            }}
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
                <Input label="1. Địa chỉ thường trú/KT3" required disabled />
              </Grid>
            }
            label={["2. Tỉnh/TP", "3. Quận/huyện", "4. Phường/xã"]}
            required={[true, true, true]}
            col={6}
            disabled
          />
          <Divider className="my-3" />
          <SelectLocation
            sx={{
              "& .icon-copy": {
                zIndex: "1000",
                position: "absolute",
              },
            }}
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
                <Input
                  label="1. Địa chỉ liên lạc/chỗ ở hiện tại"
                  required
                  disabled
                />
              </Grid>
            }
            label={["2. Tỉnh/TP", "3. Quận/huyện", "4. Phường/xã"]}
            required={[true, true, true]}
            col={6}
            disabled
          />
          <Divider className="my-3" />
          <Grid container spacing={3}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="1. Địa chỉ thường trú (thực tế)"
                value="125 Đường số 9, phường Linh Trung, quận Linh Đông, TP. Thủ Đức"
              />
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
      {/* <ModalAddress
        open={openModal}
        add={!!modalAdd}
        onClose={onClose}
        addresses={addresses}
        tool={true}
        country={'VN'}
        screen={SCREEN}
        // coppy={!!modalCoppy}
        coppyType={coppyType}
      /> */}
    </CardInside>
  );
};

export default Address;
