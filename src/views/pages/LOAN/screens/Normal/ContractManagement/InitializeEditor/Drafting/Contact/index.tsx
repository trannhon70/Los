import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FC } from "react";
import Input from "views/components/base/Input";
import TextArea from "views/components/base/TextArea";
import CardInside from "views/components/layout/CardInside";

const Contact: FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xl={6} md={6} xs={12}>
      <CardInside
        title="I. Thông tin cơ bản"
        classBody="h-full p-6"
        sx={{ height: "calc(100% - 20px)" }}
        fieldsetClass="px-4"
        titleClass="px-2 text-16"
      >
        <Grid container spacing={3}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="1. Họ và tên nhân viên kinh doanh"
              required
              // sx={{
              //   "& input": {
              //     textTransform: "uppercase",
              //   },
              // }}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="2. Số điện thoại nhân viên kinh doanh"
              required
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="3. Họ và tên cấp kiểm soát"
              required
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="4. Số điện thoại cấp kiểm soát"
              required
            />
          </Grid>
        </Grid>
      </CardInside>
      </Grid>
      <Grid item xl={6} md={6} xs={12}>
        <Box sx={{ position: "relative" }}>
          <span style={{position: "absolute", right: 0}}>
            <i style={{fontSize: "12px", color: "#707070"}}>Cập nhật : </i>
            <i style={{fontSize: "12px", color: "#1825aa"}}>
              {" "}
              Nguyễn Văn Thanh - 9:30 - 20/05/2021
            </i>
          </span>
          <TextArea 
            label="1. Ghi chú" 
            sx={{
              "& textarea": {
                height: "200px !important",
                overflowY: "scroll!important ",
                overflowX: "hidden!important",
                border: 'none',
                backgroundColor: '#f2f3f9',
                resize: 'none',
                outline: 0,
                padding: '8px 12px',
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                fontSize: 'var(--mscb-fontsize)'
              },
              "& textarea::-webkit-scrollbar": {
                width: "5px",
                "border-radius": "50px",
              },

              "& textarea::-webkit-scrollbar-thumb": {
                background: "#d5d5d5",
                "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)",
              },
              "& textarea:focus": {
                outline: "none",
              }
            }} 
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Contact;
