import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { FC, Fragment, useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { updateDocumentTitle } from "utils";
import Input from "views/components/base/Input";
import Steps from "views/components/layout/Steps";
import { regSecurityMeasures, stageName } from "views/pages/LOAN/utils";
import Collateral from "./Collateral";
import NotarizedInfo from "./NotarizedInfo";
import ButtonBar from 'views/components/layout/ButtonBar';
import NotarizedReqForm from "./NotarizedReqForm";
import QualityEvalution from "./QualityEvalution";

const RegSecurityMeasures: FC = () => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const current = regSecurityMeasures.indexOf(params["*"].split("/")[0]);
  const currentStage = stageName.indexOf(params.stage);

  useEffect(() => {
    currentStage === 3 && updateDocumentTitle("Đăng ký biện pháp bảo đảm");
  });


  const beforeChange = (_: number, next: number) => {
    let tabNext = regSecurityMeasures[next];
    navigate(`/loan/normal/reg-security-measures/${params.id}/${tabNext}`);
  }
  return <Paper
    sx={{
      paddingBottom: '25px',
      width: "100%",
      borderRadius: 0,
      "& > .mscb-tabs": {
        "& > .MuiTabs-root": {
          "& > .MuiTabs-scroller": {
            "& > .MuiTabs-flexContainer": {
              borderBottom: "2px solid #d5d5d5",
            },
          },
        },
      },
    }}
    className="px-6"
  >
    <Box className='p-3 h-full'>
      <Typography className='pt-3 pb-3 text-upper font-medium'>Yêu cầu công chứng - phòng kinh doanh</Typography>
      <Box>
        <Grid container spacing={3}>
          <Grid item xl={3} sm={3} xs={12}
          >
            <Input label='1. Mã LOS (ID LOS)' disabled />
          </Grid>
          <Grid item xl={3} sm={3} xs={12}
            sx={{
              position: 'relative',
              '& .mscb-input::after': {
                content: "''",
                position: 'absolute',
                zIndex: 1,
                width: '25px',
                height: "1px",
                top: '70%',
                left: '0%',
                transform: ' translate(-100%, -50%)',
                backgroundColor: 'var(--mscb-black)!important'
              }
            }}
          >
            <Input label='2. Mã soạn thảo (ID ST)' disabled />
          </Grid>
          <Grid item xl={3} sm={3} xs={12} sx={{
            position: 'relative',
            '& .mscb-input::after': {
              content: "''",
              position: 'absolute',
              zIndex: 1,
              width: '25px',
              height: "1px",
              top: '70%',
              left: '0%',
              transform: ' translate(-100%, -50%)',
              backgroundColor: 'var(--mscb-black)!important'
            }
          }}
          >
            <Input label='3. Số HĐTC/Phụ lục HĐTC' required disabled />
          </Grid>
          <Grid item xl={3} sm={3} xs={12}
            sx={{
              alignSelf: 'flex-end',
              position: 'relative',
              '& .MuiButton-root::after': {
                content: "''",
                position: 'absolute',
                zIndex: 1,
                width: '25px',
                height: "1px",
                top: '50%',
                left: '0%',
                transform: ' translate(-100%, -50%)',
                backgroundColor: 'var(--mscb-black)!important'
              }
            }}>
            <Button
              variant="contained"
              className="text-13 rounded-0 font-medium btn-primary"
              sx={{ height: '36px', padding: '10px' }}
            >
              Tạo dữ liệu
            </Button>
          </Grid>
          <Grid item xl={3} sm={3} xs={12}>
            <Input label='3. Mã công chứng (ID CC)' disabled />
          </Grid>
          <Grid item xl={3} sm={3} xs={12}>
            <Input label='5. Mã đơn vị' disabled />
          </Grid>
          <Grid item xl={3} sm={3} xs={12}>
            <Input label='6. Tên đơn vị' disabled />
          </Grid>
          <Grid item xl={3} sm={3} xs={12}>
            <Input label='7. Đơn vị xử lý' disabled />
          </Grid>
        </Grid>
      </Box>
      <Fragment>
        <Steps
          current={!!~current ? current : 0}
          attachLabel="tập tin"
          className="my-6 flex-column flex-center "
          onChange={beforeChange}
          sx={{
            '& .mscb-step-text': {
              textTransform: 'uppercase',
              fontWeight: 700
            },
            '& .mscb-steps-panes': {
              width: '100%'
            }
          }}
          steps={[
            {
              node: "A",
              label: "thông tin về tài sản bảo đảm",
              hasSub: false,
              attachment: 20
            },
            {
              node: "B",
              label: "thông tin công chứng",
              attachment: 10,
              hasSub: false,
            },
            {
              node: "C",
              label: "Phiếu yêu cầu công chứng",
              hasSub: false,
            },
            {
              node: "D",
              label: "Đánh giá chất lượng dịch vụ",
              hasSub: false,
            },
          ]}
        >
          <Routes>
            <Route
              path="collateral-info"
              element={<Collateral />}
            />
          </Routes>
          <Routes>
            <Route
              path="notarized-info"
              element={<NotarizedInfo />}
            />
          </Routes>
          <Routes>
            <Route
              path="notarized-request-form"
              element={<NotarizedReqForm />}
            />
          </Routes>
          <Routes>
            <Route
              path="service-assess"
              element={<QualityEvalution />}
            />
          </Routes>
        </Steps>
        <Divider className="my-6" />
        <ButtonBar
        />
      </Fragment>

    </Box>

  </Paper>
}
export default RegSecurityMeasures;