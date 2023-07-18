import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FC } from "react";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import Select from "views/components/base/Select";
import TextArea from "views/components/base/TextArea";

const BasicDisbursement: FC = () => {
  return (
    <>
      <span
        style={{
          fontSize: "19px",
          fontWeight: "bold",
          color: "#353535",
          textTransform: "uppercase",
          // marginBottom: '6px',
        }}
      >
        A. THÔNG TIN CƠ BẢN
      </span>
      <Grid container spacing={3}>
        <Grid item xl={4} md={4} xs={12}>
          <Input
            label="1. Mục đích giải ngân"
            required
            disabled
            value="Vay món/từng lần"
          />
        </Grid>
        <Grid item xl={4} md={4} xs={12}>
          <Input
            label="2. Số tiền đề nghị giải ngân lần này (VND)"
            required
            disabled
            format
            value="500000000000"
          />
        </Grid>
        <Grid item xl={4} md={4} xs={12}></Grid>
        <Grid item xl={4} md={4} xs={12}>
          <Input
            label="3. Thời hạn vay trên khế ước nhận nợ (Tối đa)"
            required
            disabled
            value="6"
          />
        </Grid>
        <Grid item xl={4} md={4} xs={12}>
          <Select
            label="4. Thời hạn vay trên khế ước nhận nợ (Thực tế)"
            options={[]}
            required
            disabled
            value="6"
          />
        </Grid>
        <Grid item xl={4} md={4} xs={12}>
          <Typography variant="h6" className="text-14 mb-2">
            5. Thời hạn vay trên khế ước nhận nợ (Thực tế) (Không tròn tháng)
          </Typography>
          <Grid container spacing={3}>
            <Grid item xl={6} className="flex">
              <Typography
                variant="h6"
                className="text-14"
                sx={{
                  whiteSpace: "nowrap",
                  lineHeight: "36px",
                  marginRight: "6px",
                }}
              >
                Từ ngày
              </Typography>
              <InputDate />
            </Grid>
            <Grid item xl={6} className="flex relative">
              <Typography
                variant="h6"
                className="text-14"
                sx={{
                  whiteSpace: "nowrap",
                  lineHeight: "36px",
                  marginRight: "6px",

                  "&::before": {
                    content: "''",
                    width: "18px",
                    height: "1px",
                    position: "absolute",
                    top: "68%",
                    left: "2px",
                    backgroundColor: "#707070",
                  },
                }}
              >
                Đến hết ngày
              </Typography>
              <InputDate />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12}>
          <TextArea
            label="6. Hồ sơ kèm theo chứng từ vay vốn"
            required
            sx={{
              "& textarea": {
                height: "100px !important",
                overflowY: "scroll!important ",
                overflowX: "hidden!important",
                // marginBottom: "23px!important",
                border: "none",
                backgroundColor: "#f2f3f9",
                resize: "none",
                outline: 0,
                padding: "8px 12px",
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                fontSize: "var(--mscb-fontsize)",
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
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BasicDisbursement;
