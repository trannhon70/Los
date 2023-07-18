import Add from "@mui/icons-material/Add";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import Input from "views/components/base/Input";
import Radio, { RadioOption } from "views/components/base/Radio";
import Select from "views/components/base/Select";
import TextArea from "views/components/base/TextArea";
import CardInside from "views/components/layout/CardInside";
import LimitRiskStyle from "./style";

const options: RadioOption[] = [
  { value: "yes", label: "Đồng ý cấp tín dụng và các ngoại lệ" },
  { value: "no", label: "Không đồng ý cấp tín dụng" },
];
const LimitRisk: FC = () => {
  const classes = LimitRiskStyle();

  const limitRiskTitleI = "Phân tích và biện pháp hạn chế rủi ro";
  const limitRiskTitleII = "Kiến nghị và đề xuất CTD";
  const labelReason = "1. Lí do";
  const labelAdd = "Thêm loại rủi ro";

  return (
    <>
      <Grid
        container
        columnSpacing="20"
        rowSpacing="20"
        className={`${classes.root} pt-5`}
      >
        <Grid item xl={6} md={12} xs={12}>
          <CardInside title={`I. ${limitRiskTitleI}`} className="card-inline">
            <Grid container columnSpacing="20" rowSpacing="20">
              <Grid item lg={4} md={4} xs={4}>
                <Select
                  className={classes.cardSelect}
                  label="1. Loại rủi ro"
                  options={[]}
                />
              </Grid>
              <Grid item lg={7} md={7} xs={7}>
                <Input
                  className={classes.cardInputDe}
                  label="2. Biện pháp hạn chế rủi ro"
                />
              </Grid>
              <Grid
                item
                lg={1}
                md={1}
                xs={1}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "25px",
                }}
              >
                <Box component="div" className={classes.cardbtn}>
                  <EditOutlined />
                </Box>
                <Box component="div" className={classes.cardbtn}>
                  <HiOutlineTrash />
                </Box>
              </Grid>
              <div className={classes.inlineBottom}></div>
              <Grid item lg={4} md={4} xs={4}>
                <Select label="1. Loại rủi ro" options={[]} />
              </Grid>
              <Grid item lg={7} md={7} xs={7}>
                <Input
                  className={classes.cardInputDe}
                  label="2. Biện pháp hạn chế rủi ro"
                />
              </Grid>
              <Grid
                item
                lg={1}
                md={1}
                xs={1}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "25px",
                }}
              >
                <Box component="div" className={classes.cardbtn}>
                  <EditOutlined />
                </Box>
                <Box component="div" className={classes.cardbtn}>
                  <HiOutlineTrash />
                </Box>
              </Grid>
              <Grid item lg={8} xs={12}></Grid>
              <Grid item lg={4} xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  className={classes.buttonAddRisk}
                  // onClick={handleAdd}
                  style={{ textTransform: "unset", marginTop: "-60px" }}
                >
                  <span className="span-btn">{`${labelAdd}`}</span>
                </Button>
              </Grid>
            </Grid>
          </CardInside>
        </Grid>
        <Grid item xl={6} md={12} xs={12}>
          <CardInside title={`II. ${limitRiskTitleII}`} className="card-inline">
            <Grid container columnSpacing="20" rowSpacing="20">
              <Grid item lg={12} xs={12}>
                <Radio variant="checkbox" options={options} />
              </Grid>
              <Grid item lg={12} xs={12}>
                <TextArea
                  label={labelReason}
                  className={`${classes.textArea}`}
                />
              </Grid>
            </Grid>
          </CardInside>
        </Grid>
      </Grid>
    </>
  );
};

export default LimitRisk;
