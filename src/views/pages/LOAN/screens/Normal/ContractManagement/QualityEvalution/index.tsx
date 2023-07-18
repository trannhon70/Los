import { FileUpload } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import { Box, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import { FC, Fragment, useRef, useState } from "react";
import TextArea from "views/components/base/TextArea";
import ButtonBar from "views/components/layout/ButtonBar";
import CardInside from "views/components/layout/CardInside";
import FormManageRating from "./Rating";

interface listFile {
  listFile: fileItem[];
}

interface fileItem {
  url: string;
}

const QualityEvalution: FC = () => {
  const inputChooseFileElement = useRef<HTMLInputElement>(null);
  const [listFile, setListFile] = useState<fileItem[]>([
    { url: "abc" },
    { url: "xyz" },
  ]);

  const onSave = () => {};

  const onContinue = () => {};

  const onBack = () => {};

  const onExit = () => {};

  const changeChooseFile = async (_event: any, data: string) => {
    console.log("fileeeeeeeeeeeeeeeeeeee", data);
  };

  const handleAddNewImage = () => {
    setListFile([...listFile, { url: "333" }]);
  };

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xl={6} md={6} xs={6}>
          <CardInside
            title="I. Thái độ làm việc của cán bộ nhân viên xử lý hồ sơ"
            classBody="h-full p-6"
            sx={{ height: "calc(100% - 20px)" }}
            fieldsetClass="px-4"
            titleClass="px-2 text-16"
          >
            <Grid container spacing={3}>
              <Grid item xl={12} xs={12} md={12}>
                <FormManageRating />
              </Grid>
              <Grid item xl={12} xs={12} md={12}>
                <TextArea
                  label="2. Nội dung đánh giá"
                  value="Thái độ làm việc của cán bộ nhân viên xử lý hồ sơ"
                  sx={{
                    "& textarea": {
                      height: "100px !important",
                      overflowY: "scroll!important ",
                      overflowX: "hidden!important",
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
          </CardInside>
        </Grid>
        <Grid item xl={6} md={6} xs={6}>
          <CardInside
            title="II. Mức độ hỗ trợ xử lý trong công việc"
            classBody="h-full p-6"
            sx={{ height: "calc(100% - 20px)" }}
            fieldsetClass="px-4"
            titleClass="px-2 text-16"
          >
            <Grid container spacing={3}>
              <Grid item xl={12} xs={12} md={12}>
                <FormManageRating />
              </Grid>
              <Grid item xl={12} xs={12} md={12}>
                <TextArea
                  label="2. Nội dung đánh giá"
                  value="Mức độ hỗ trợ xử lý trong công việc"
                  sx={{
                    "& textarea": {
                      height: "100px !important",
                      overflowY: "scroll!important ",
                      overflowX: "hidden!important",
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
              <Grid item xl={12} xs={12} md={12}>
                <Typography
                  variant="subtitle2"
                  color="black"
                  fontSize={14}
                  fontWeight={500}
                  marginRight={1}
                >
                  3. Hình ảnh
                </Typography>
                <Box
                  className="flex"
                  sx={{
                    height: "60px",
                    display: "flex",
                    overflow: "hidden",
                    "& .MuiTabs-flexContainer,& .MuiTabs-scroller": {
                      height: "100%",
                      borderColor: "transparent",
                    },
                    "& .MuiTab-root": {
                      padding: 0,
                      height: "100%",
                      width: "60px",
                      marginRight: "6px",
                      minWidth: "unset",
                    },
                    "& .MuiTabs-indicator,& .MuiTabScrollButton-root.Mui-disabled":
                      {
                        display: "none",
                      },
                    "& .MuiTabScrollButton-root": {
                      alignItems: "flex-start",
                      "& svg": {
                        marginTop: "17px",
                        fontSize: "28px",
                        color: "var(--mscb-primary)",
                      },
                    },
                  }}
                >
                  <Tabs
                    variant="scrollable"
                    // value={CurrentObject}
                    sx={{
                      zIndex: 10,
                    }}
                    indicatorColor="primary"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    // onChange={changeObject}
                  >
                    {listFile?.map((x, index) => {
                      return (
                        <Tab
                          key={index}
                          label={
                            <Box
                              sx={{
                                width: "60px",
                                height: "60px",
                                border: "dashed 1px #353535",
                              }}
                            >
                              <label className="flex-center h-full">
                                <FileUpload />
                                <input
                                  ref={inputChooseFileElement}
                                  type="file"
                                  className="hidden"
                                  onChange={(event) =>
                                    changeChooseFile(event, x.url)
                                  }
                                />
                              </label>
                            </Box>
                          }
                        />
                      );
                    })}
                  </Tabs>
                  <Box
                    sx={{
                      width: "60px",
                      height: "60px",
                      border: "dashed 1px #353535",
                    }}
                    onClick={handleAddNewImage}
                  >
                    <label
                      className="flex-center h-full"
                      style={{
                        width: "60px",
                        height: "60px",
                      }}
                    >
                      <Add />
                    </label>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardInside>
        </Grid>
        <Grid item xl={6} md={6} xs={6}>
          <CardInside
            title="III. Chất lượng/Kết quả xử lý công việc"
            classBody="h-full p-6"
            sx={{ height: "calc(100% - 20px)" }}
            fieldsetClass="px-4"
            titleClass="px-2 text-16"
          >
            <Grid container spacing={3}>
              <Grid item xl={12} xs={12} md={12}>
                <FormManageRating />
              </Grid>
              <Grid item xl={12} xs={12} md={12}>
                <TextArea
                  label="2. Nội dung đánh giá"
                  sx={{
                    "& textarea": {
                      height: "100px !important",
                      overflowY: "scroll!important ",
                      overflowX: "hidden!important",
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
          </CardInside>
        </Grid>
        <Grid item xl={6} md={6} xs={6}>
          <CardInside
            title="IV. Các vấn đề cần cải thiện"
            classBody="h-full p-6"
            sx={{ height: "calc(100% - 20px)" }}
            fieldsetClass="px-4"
            titleClass="px-2 text-16"
          >
            <Grid container spacing={3}>
              <Grid item xl={12} xs={12} md={12}>
                <FormManageRating />
              </Grid>
              <Grid item xl={12} xs={12} md={12}>
                <TextArea
                  label="2. Nội dung đánh giá"
                  sx={{
                    "& textarea": {
                      height: "100px !important",
                      overflowY: "scroll!important ",
                      overflowX: "hidden!important",
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
          </CardInside>
        </Grid>
      </Grid>
      <Divider className='my-6'/>
      <ButtonBar
        className="pb-6"
        onSave={onSave}
        onContinue={onContinue}
        onBack={onBack}
        onExit={onExit}
      />
    </Fragment>
  );
};

export default QualityEvalution;
