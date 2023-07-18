import { Box, Button, Divider, IconButton } from "@mui/material"
import Grid from "@mui/material/Grid"
import { FC, Fragment, useState } from "react"
import { VscSearch } from "react-icons/vsc"
import { Route, Routes, useNavigate, useParams } from "react-router"
import { ILOANURLParams } from "types/models/loan"
import Input from "views/components/base/Input"
import Steps from "views/components/layout/Steps"
import { createDisbursementStep, stageName } from "views/pages/LOAN/utils"
import Collateral from "./Collateral"
import BaseInfo from "./BaseInfo"
import DisbursementInfo from "./DisbursementInfo"
import DisCondEvaluate from "./DisCondEvaluate"
import LegalInfo from "./LegalInfo"
import ReportDoc from "./ReportDoc"

const InitializeDisbursement: FC = () => {
  const navigate = useNavigate();
  const params = useParams() as ILOANURLParams;

  const [openModal, setOpenModal] = useState(false);

  const organName = params["*"].split("/")[0];
  const declare = params["*"].split("/")[1];

  const current = createDisbursementStep.indexOf(organName);
  //['base-info', 'legal-info', 'assets-info','disbursement-info','disbursement-condition-evaluate','report-doc'];

  const beforeChange = (_: number, next: number) => {
    const organ = createDisbursementStep[next];
    navigate(
      `/loan/normal/${stageName[4]}/${params.id}/initialize-disbursement/${organ}`
    );
    switch (organ) {
      case 'base-info':
        navigate(
          `/loan/normal/${stageName[4]}/${params.id}/initialize-disbursement/${organ}`
        );
        break;
      case 'legal-info':
        navigate(
          `/loan/normal/${stageName[4]}/${params.id}/initialize-disbursement/${organ}/borrower`
        );
        break;
      case 'disbursement-info':
        navigate(
          `/loan/normal/${stageName[4]}/${params.id}/initialize-disbursement/${organ}/info`
        );
        break;
      // case 'base-info':

      //   break;
      // case 'base-info':

      //   break;
      // case 'base-info':

      //   break;

      default:
        break;
    }

    return true;
  };

  return <Fragment>
    <Box className='p-3 h-full'>
      <Box>
        <Grid container spacing={3}>
          <Grid item xl={2} sm={2} xs={12}
          >
            <Input
              label='1. Mã BKRV/TTCVCT'
              suffix={
                <Box
                  className="flex tbl-ipt-toolbar"
                  sx={{
                    height: '36px',
                    fontSize: '0.5rem',

                    '& .MuiSvgIcon-root': {
                      '&.done': { color: 'var(--mscb-primary)!important' },
                      '&.cancel': { color: 'var(--mscb-primary)!important' }
                    }
                  }}
                >
                  <IconButton
                    className="done-wrapper"
                    color="primary"
                  >
                    <VscSearch fontSize='1.25rem' />
                  </IconButton>
                </Box>
              }

            />
          </Grid>
          <Grid item xl={1} sm={1} xs={12}
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
          <Grid item xl={2} sm={2} xs={12}
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
            <Input label='2. Mã LOS (ID LOS)' disabled />
          </Grid>
          <Grid item xl={2} sm={2} xs={12} sx={{
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
            <Input label='3. Mã đơn vị' disabled />
          </Grid>
          <Grid item xl={2} sm={2} xs={12} sx={{
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
            <Input label='4. Số thỏa thuận cấp tín dụng' disabled />
          </Grid>
          <Grid item xl={2} sm={2} xs={12} sx={{
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
            <Input label='5. Mã giải ngân (ID GN)' disabled />
          </Grid>

        </Grid>
      </Box>
    </Box>
    <Steps
      className="my-6 mscb-loan-normal-init-editor"
      current={!!~current ? current : 0}
      onChange={beforeChange}
      sx={{
        "&.mscb-loan-normal-init-editor": {
          "&>.MuiTabs-root": {
            "& .MuiTabs-flexContainer ": {
              justifyContent: "center",
            },
            "& .mscb-step-label": {
              textTransform: "uppercase",
              fontWeight: "bold",
            },
          },
        },
      }}
      steps={[
        {
          node: "A",
          label: "thông tin căn cứ",

        },
        {
          node: "B",
          label: "Thông tin pháp lý",
          hasSub: true,
        },
        {
          node: "C",
          label: "thông tin tài sản",
          hasSub: false,
        },
        {
          node: "D",
          label: "Thông tin hồ sơ giải ngân",
          hasSub: true,
        },
        {
          node: "E",
          label: "Đánh giá điều kiện giải ngân",
          hasSub: false,
        },
        {
          node: "F",
          label: "tờ trình",
          hasSub: false,
        },
      ]}
    >
      <Routes>
        <Route path=":organ/*" element={<BaseInfo />} />
      </Routes>
      <Routes>
        <Route path=":organ/*" element={<LegalInfo />} />
      </Routes>
      <Routes>
        <Route path=":organ/*" element={<Collateral />} />
      </Routes>
      <Routes>
        <Route path=":organ/*" element={<DisbursementInfo />} />
      </Routes>
      <Routes>
        <Route path=":organ/*" element={<DisCondEvaluate />} />
      </Routes>
      <Routes>
        <Route path=":organ/*" element={<ReportDoc />} />
      </Routes>
    </Steps>
    <Divider className="my-6" />
    <Box className='pb-6 text-upper flex justify-end'>
      <Button sx={{ minWidth: '100px' }} className='rounded-0 mr-4 btn-success text-white' >LƯU</Button>
      <Button sx={{ minWidth: '100px' }} className='rounded-0 mr-4 btn-danger text-white' >TRẢ/HỦY</Button>
      <Button sx={{ minWidth: '100px', backgroundColor: '#f26b04' }} className='rounded-0 mr-4 text-white' > bổ sung/Điều chỉnh</Button>
      <Button sx={{ minWidth: '100px' }} className='rounded-0 mr-4 btn-pink text-white' >XUẤT FILE</Button>
      <Button sx={{ minWidth: '100px' }} className='rounded-0 mr-4 btn-info text-white' >duyệt</Button>
      <Button sx={{ minWidth: '100px' }} className='rounded-0 btn-primary text-white'>tiếp tục</Button>
    </Box>
  </Fragment>
}
export default InitializeDisbursement