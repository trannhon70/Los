import { Button, Grid, IconButton, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/system";
import { FC, Fragment, useState } from "react";
import { VscSearch } from "react-icons/vsc";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import Input from "views/components/base/Input";
import Select from "views/components/base/Select";
import ButtonBar from "views/components/layout/ButtonBar";
import Steps from "views/components/layout/Steps";
import { initEditorOrganRouter, stageName } from "views/pages/LOAN/utils";
import Drafting from "./Drafting";
import FormComponent from "./FormComponent";
import Legal from "./Legal";
import ModalFindID from "./Modal/findID";

const InitializeEditor: FC = () => {
  const navigate = useNavigate();
  const params = useParams() as ILOANURLParams;

  const [openModal, setOpenModal] = useState(false);

  const organName = params["*"].split("/")[0]; // other/scb

  const declare = params["*"].split("/")[1]; //declare

  const current = initEditorOrganRouter.indexOf(organName);
  // ['legal', 'drafting', 'profile'];

  const beforeChange = (_: number, next: number) => {
    const organ = initEditorOrganRouter[next];
    if (organ === "legal") {
      navigate(
        `/loan/normal/${stageName[2]}/${params.id}/initialize-editor/legal/borrower`
      );
    } else if (organ === "drafting") {
      navigate(
        `/loan/normal/${stageName[2]}/${params.id}/initialize-editor/drafting/loan`
      );
    } else {
      navigate(
        `/loan/normal/${stageName[2]}/${params.id}/initialize-editor/profile`
      );
    }
    return true;
  };

  const onSave = () => { };

  const onContinue = () => { };

  const onBack = () => { };

  const onExit = () => { };

  const onClose = () => {
    setOpenModal(false);
  };

  const openModalFindID = () => {
    setOpenModal(true);
  };

  return (
    <Fragment>
      <Grid container spacing={10}>
        <Grid item xl={3} md={3} xs={3}>
          <Input
            label='1. Mã LOS (ID LOS)'
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
        <Grid
          item
          xl={3}
          md={3}
          xs={3}
          className="relative"
          sx={{
            "& .mscb-input::after": {
              content: "''",
              position: "absolute",
              zIndex: 1,
              width: "82px",
              height: "1px",
              top: "74%",
              left: "-82px",
              transform: "translate(0, -50%)",
              backgroundColor: "#353535",
            },
          }}
        >
          <Select options={[]} label="2. Yêu cầu soạn thảo" disabled />
        </Grid>
        <Grid item xl={6} md={6} xs={6}>
          <Grid container spacing={3} sx={{ position: "relative" }}>
            <Grid
              item
              xl={3}
              md={3}
              xs={3}
              className="flex items-center"
              sx={{
                "&::after": {
                  content: "''",
                  position: "absolute",
                  zIndex: 1,
                  width: "81px",
                  height: "1px",
                  top: "60%",
                  left: "-57px",
                  transform: "translate(0, -50%)",
                  backgroundColor: "#353535",
                },
                "&::before": {
                  content: "''",
                  position: "absolute",
                  zIndex: 1,
                  width: "60px",
                  height: "1px",
                  top: "60%",
                  left: "125px",
                  transform: "translate(0, -50%)",
                  backgroundColor: "#353535",
                },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  borderRadius: 0,
                  textTransform: "revert",
                  boxShadow: "unset",
                  zIndex: 99,
                }}
                onClick={openModalFindID}
              >
                Danh sách
              </Button>
            </Grid>
            <Grid item xl={9} md={9} xs={9} sx={{ position: "relative" }}>
              <Grid
                container
                spacing={3}
                sx={{
                  "&::after": {
                    content: "''",
                    position: "absolute",
                    width: "1px",
                    height: "50%",
                    top: "60%",
                    left: "0",
                    transform: "translate(0, -50%)",
                    backgroundColor: "#353535",
                  },
                }}
              >
                <Grid
                  item
                  xl={12}
                  className="flex items-center"
                  sx={{
                    "&::after": {
                      content: "''",
                      position: "absolute",
                      width: "4%",
                      height: "1px",
                      top: "35%",
                      left: "0",
                      transform: "translate(0, -50%)",
                      backgroundColor: "#353535",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    className="text-13 text-secondary font-normal"
                    sx={{ width: "200px" }}
                  >
                    3. Mã soạn thảo (ID ST)
                  </Typography>
                  <Input value="CC123456" />
                </Grid>
                <Grid
                  item
                  xl={12}
                  className="flex items-center"
                  sx={{
                    "&::after": {
                      content: "''",
                      position: "absolute",
                      width: "4%",
                      height: "1px",
                      top: "85%",
                      left: "0",
                      transform: "translate(0, -50%)",
                      backgroundColor: "#353535",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    className="text-13 text-secondary font-normal"
                    sx={{ width: "200px" }}
                  >
                    4. Mã đơn vị
                  </Typography>
                  <Input value="001 - Chi nhánh Trần Hưng Đạo" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
            label: "Thông tin pháp lý",
            hasSub: true,
          },
          {
            node: "B",
            label: "Thông tin đề nghị soạn thảo",
            hasSub: true,
          },
          {
            node: "C",
            label: "Tổng hợp hồ sơ",
            hasSub: false,
          },
        ]}
      >
        <Routes>
          <Route path=":organ/*" element={<Legal />} />
        </Routes>
        <Routes>
          <Route path=":organ/*" element={<Drafting />} />
        </Routes>
        <Routes>
          <Route path=":organ/*" element={<FormComponent />} />
        </Routes>
      </Steps>
      <Divider className="my-6" />
      <ButtonBar
        className="pb-6"
        onSave={onSave}
        onContinue={onContinue}
        onBack={onBack}
        onExit={onExit}
      />
      <ModalFindID open={openModal} onClose={onClose} />
    </Fragment>
  );
};

export default InitializeEditor;
