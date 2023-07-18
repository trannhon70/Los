import {
  Divider,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { FC } from "react";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import Radio from "views/components/base/Radio";
import Select from "views/components/base/Select";
import CardInside from "views/components/layout/CardInside";
import TableSticky from "views/components/layout/TableSticky";

const InterestRateDisbursement: FC = () => {
  return (
    <>
      <span
        style={{
          fontSize: "19px",
          fontWeight: "bold",
          color: "#353535",
          // marginBottom: '6px',
          textTransform: "uppercase",
        }}
      >
        C. thông tin lãi suất
      </span>
      <CardInside
        title="I. Lãi suất"
        classBody="h-full p-6"
        // sx={{ height: "calc(100% - 20px)" }}
        fieldsetClass="px-4"
        titleClass="px-2 text-16"
      >
        <Grid container spacing={3}>
          <Grid item xl={12}>
            <Typography variant="h6" className="text-14 mb-2">
              1. Loại lãi suất áp dụng
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{
                "& .MuiGrid-item": {
                  display: "flex",
                  alignItems: "center",
                  "& .MuiFormControl-root": {
                    "& .MuiFormGroup-root": {
                      "& .MuiFormControlLabel-root": {
                        "& .MuiTypography-root": {
                          whiteSpace: "nowrap",
                          fontSize: "13px",
                          color: "#353535",
                        },
                      },
                    },
                  },
                  "& h6": {
                    whiteSpace: "nowrap",
                    marginRight: "6px",
                  },
                  "& hr": {
                    height: "1px",
                    backgroundColor: "#707070",
                    width: "100%",
                  },
                },
              }}
            >
              <Grid item xl={1}>
                <Radio options={[{ label: "Theo gói", value: "1" }]} />
              </Grid>
              <Grid item xl={1}>
                <Divider />
              </Grid>
              <Grid item xl={2}>
                <Typography
                  variant="h6"
                  className="text-13 text-secondary font-normal"
                >
                  Gói lãi suất
                </Typography>
                <Select options={[]} />
              </Grid>
              <Grid item xl={1}>
                <Divider />
              </Grid>
              <Grid item xl={2}>
                <Typography
                  variant="h6"
                  className="text-13 text-secondary font-normal"
                >
                  Gói lãi suất
                </Typography>
                <Select options={[]} />
              </Grid>
              <Grid item xl={5}></Grid>
              <Grid item xl={1}>
                <Radio options={[{ label: "Ngoại lệ", value: "2" }]} />
              </Grid>
              <Grid item xl={1}>
                <Divider />
              </Grid>
              <Grid item xl={2}>
                <Typography
                  variant="h6"
                  className="text-13 text-secondary font-normal"
                >
                  Mã ngoại lệ
                </Typography>
                <Input value="LS001" />
              </Grid>
              <Grid item xl={1}>
                <Divider />
              </Grid>
              <Grid item xl={7}>
                <Typography
                  variant="h6"
                  className="text-13 text-secondary font-normal"
                >
                  Diến giải
                </Typography>
                <Input disabled value="Diễn giải mã ngoại lệ" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12}>
            <Divider />
          </Grid>
          <Grid item xl={6}>
            <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#1825aa",
                textTransform: "uppercase",
                marginLeft: "5px",
              }}
            >
              THÔNG TIN CƠ BẢN
            </span>
            <Grid container spacing={3}>
              <Grid item xl={6}>
                <Input label="1. Lãi suất cho vay (%/năm)" disabled value="6" />
              </Grid>
              <Grid item xl={6}>
                <Input
                  label="2. Thời gian được hưởng ưu đãi lãi suất (tháng)"
                  disabled
                  value="6"
                />
              </Grid>
              <Grid item xl={6}>
                <Input
                  label="3. Biên độ lãi suất sau thời gian ưu đãi (%/năm)"
                  disabled
                  value="6"
                />
              </Grid>
              <Grid item xl={6}>
                <Input
                  label="4. Lãi suất cơ sở"
                  disabled
                  value="Lãi suất tiền gửi 13 tháng"
                />
              </Grid>
              <Grid item xl={12}>
                <Select
                  options={[]}
                  label="5. Định kỳ điều chỉnh lãi suất"
                  disabled
                />
              </Grid>
              <Grid item xl={12}>
                <Typography variant="h6" className="text-14 mb-2">
                  6. Phí phạt trả nợ trước hạn
                </Typography>
                <TableSticky className="mscb-table mscb-table-border">
                  <TableHead>
                    <TableRow>
                      <TableCell className="text-center" width="3%">
                        STT
                      </TableCell>
                      <TableCell
                        className="text-center text-uppercase"
                        width="77%"
                      >
                        Phí phạt trả nợ trước hạn
                      </TableCell>
                      <TableCell
                        className="text-center text-uppercase"
                        width="20%"
                      >
                        phí phạt (%)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">1</TableCell>
                      <TableCell>Đến hết năm đầu tiên</TableCell>
                      <TableCell align="right">5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">1</TableCell>
                      <TableCell>Đến hết năm đầu tiên</TableCell>
                      <TableCell align="right">5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">1</TableCell>
                      <TableCell>Đến hết năm đầu tiên</TableCell>
                      <TableCell align="right">5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">1</TableCell>
                      <TableCell>Đến hết năm đầu tiên</TableCell>
                      <TableCell align="right">5</TableCell>
                    </TableRow>
                  </TableBody>
                </TableSticky>
              </Grid>
              <Divider color="#d5d5d5" orientation="vertical"/>
            </Grid>
          </Grid>
          <Grid item xl={6}>
            <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#1825aa",
                marginLeft: "5px",
                textTransform: "uppercase",
              }}
            >
              Lãi suất áp dụng
            </span>
            <Grid container spacing={3}>
              <Grid item xl={4}>
                <Input label="1. Lãi suất cho vay (%/năm)" value="10" />
              </Grid>
              <Grid item xl={8}>
                <Typography variant="h6" className="text-14 mb-2">
                  5. Thời hạn vay trên khế ước nhận nợ (Thực tế) (Không tròn
                  tháng)
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
              <Grid item xl={6}>
                <Input
                  label="3. Biên độ lãi suất sau thời gian ưu đãi (%)"
                  value="9"
                />
              </Grid>
              <Grid item xl={6}>
                <Input
                  label="4. Lãi suất cơ sở"
                  value="Lãi suất tiền gửi 13 tháng"
                />
              </Grid>
              <Grid item xl={6}>
                <Select options={[]} label="5. Định kỳ điều chỉnh lãi suất" />
              </Grid>
              <Grid item xl={12}>
                <Typography variant="h6" className="text-14 mb-2">
                  6. Phí phạt trả nợ trước hạn
                </Typography>
                <TableSticky className="mscb-table mscb-table-border">
                  <TableHead>
                    <TableRow>
                      <TableCell className="text-center" width="3%">
                        STT
                      </TableCell>
                      <TableCell
                        className="text-center text-uppercase"
                        width="77%"
                      >
                        Phí phạt trả nợ trước hạn
                      </TableCell>
                      <TableCell
                        className="text-center text-uppercase"
                        width="20%"
                      >
                        phí phạt (%)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">1</TableCell>
                      <TableCell>Đến hết năm đầu tiên</TableCell>
                      <TableCell align="right">
                        <Input
                          value="5"
                          sx={{
                            "& input": {
                              textAlign: "right",

                              height: "20px !important",
                              backdropFilter: "blur(30px)",
                              boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.16)",
                              backgroundColor: "rgba(94, 191, 255, 0.14)",
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">1</TableCell>
                      <TableCell>Đến hết năm đầu tiên</TableCell>
                      <TableCell align="right">
                        <Input
                          value="5"
                          sx={{
                            "& input": {
                              textAlign: "right",

                              height: "20px !important",
                              backdropFilter: "blur(30px)",
                              boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.16)",
                              backgroundColor: "rgba(94, 191, 255, 0.14)",
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">1</TableCell>
                      <TableCell>Đến hết năm đầu tiên</TableCell>
                      <TableCell align="right">
                        <Input
                          value="5"
                          sx={{
                            "& input": {
                              textAlign: "right",

                              height: "20px !important",
                              backdropFilter: "blur(30px)",
                              boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.16)",
                              backgroundColor: "rgba(94, 191, 255, 0.14)",
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">1</TableCell>
                      <TableCell>Đến hết năm đầu tiên</TableCell>
                      <TableCell align="right">
                        <Input
                          value="5"
                          sx={{
                            "& input": {
                              textAlign: "right",
                              height: "20px !important",
                              backdropFilter: "blur(30px)",
                              boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.16)",
                              backgroundColor: "rgba(94, 191, 255, 0.14)",
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </TableSticky>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardInside>
    </>
  );
};

export default InterestRateDisbursement;
