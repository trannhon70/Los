import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import Button from "@mui/material/Button";
import TextArea from "views/components/base/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { timestampToDate } from "utils/date";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
} from "@mui/material";
import { IApprovalLevel, IResultInternalCreditRating } from "types/models/loan/normal/storageApproval/InternalCreditRating";
import { setApprovalICR } from "features/loan/normal/storageApproval/icr/actions";
import { getStorageApprovalICR } from "features/loan/normal/storageApproval/icr/selector";

const ICRResults: FC = () => {
  const dispatch = useDispatch();

  const data = useSelector(getStorageApprovalICR);


  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const changeData = (value: string| number,name: keyof IApprovalLevel,gr: keyof IResultInternalCreditRating) => {
    dispatch(setApprovalICR(value,{key:name,gr}))
  };

  const open = Boolean(anchorEl);
  const checkRuleDisabled = () =>{

  }

  const MapListUser = data?.risk_management?.person_updated?.person_info?.map((u) => {
    return (
      <>
        <ListItem sx={{ borderBottom: "solid 1px #d8d8d8" }}>
          <ListItemAvatar>
            <Avatar >{u.full_name.substring(0, 1)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{
              "& span": {
                fontSize: "14px",
                color: "#353535",
                fontWeight: "500",
              },
              "& p": {
                fontSize: "12px",
                fontStyle: "italic",
                color: "#707070",
                opacity: ".5",
              },
            }}
            primary={u.full_name}
            secondary={u.position}
          />
        </ListItem>
      </>
    );
  });

  return (
    <Box className="mt-6">
      <Box component="div" className="flex items-center">
        <Typography variant="h4" className="font-bold text-20 text-upper">
          B. KẾT QUẢ XẾP HẠNG TÍN DỤNG
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          className="ml-6"
          sx={{
            borderRadius: 0,
            boxShadow: "0 3px 6px 0 rgba(24, 37, 170, 0.2)",
          }}
        >
          Xếp hạng tín dụng
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <CardInside
            title="I. Tại nhân viên kinh doanh"
            classBody="h-full p-6"
            sx={{ height: "calc(100% - 20px)" }}
            fieldsetClass="px-4"
            titleClass="px-2"
          >
            <Box>
              <Grid container spacing={3}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input
                    label="1. Tổng điểm"
                    disabled
                    placeholder="Nhập điểm"
                    type="number"
                    value={data?.business_employee?.score?.toString() ?? ''}
                    onDebounce={(val) =>{
                      changeData(val,'score','business_employee')
                    }}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input 
                      label="2. Hạng" 
                      disabled placeholder="Nhập hạng" 
                      value={data?.business_employee.ranking ?? ''} 
                      onDebounce={(val) =>{
                        changeData(val,'ranking','business_employee')
                      }}
                  />
                </Grid>
              </Grid>
            </Box>
            {data?.business_employee?.approval_date ? (
              <Box className="text-right mt-6">
                <em className="text-small">Thời gian cập nhật: </em>
                <em className="text-primary text-small">
                  {timestampToDate(+data.business_employee.approval_date)}
                </em>
              </Box>
            ) : null}
          </CardInside>
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <CardInside
            title="II. Tại cấp phê duyệt"
            classBody="h-full p-6"
            sx={{ height: "calc(100% - 20px)" }}
            fieldsetClass="px-4"
            titleClass="px-2"
          >
            <Box>
              <Grid container spacing={3}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input
                    label="1. Tổng điểm"
                    disabled
                    value={data?.approval_level?.score?.toString() ?? ''}
                    onDebounce={(val) =>{
                      changeData(val,'score','approval_level')
                    }}
                    placeholder="Nhập điểm"
                    type="number"
                    sx={{
                      "& input": {
                        WebkitTextFillColor: "red !important",
                        fontWeight: "500",
                      },
                    }}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input
                    label="2. Hạng"
                    disabled
                    className="text-danger"
                    placeholder="Nhập hạng"
                    value={data?.approval_level?.ranking ?? ''}
                    onDebounce={(val) =>{
                      changeData(val,'ranking','approval_level')
                    }}
                    sx={{
                      "& input": {
                        "-webkit-text-fill-color": "red !important",
                        fontWeight: "500",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            {data?.approval_level?.approval_date ? (
              <Box className="text-right mt-6">
                <em className="text-small">Thời gian cập nhật: </em>
                <em className="text-primary text-small">
                  {timestampToDate(+data.approval_level.approval_date)}
                </em>
              </Box>
            ) : null}
          </CardInside>
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <CardInside
            title="III. Quản lý rủi ro"
            classBody="h-full px-6 pt-6 pb-0"
            sx={{ height: "calc(100% - 20px)" }}
            fieldsetClass="px-4"
            titleClass="px-2"
          >
            <Box>
              <Grid container spacing={3}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input
                    label="1. Tổng điểm"
                    disabled
                    placeholder="Nhập điểm"
                    value={data?.risk_management?.score?.toString() ?? ''}
                    onDebounce={(val) =>{
                      changeData(val,'score','risk_management')
                    }}
                    sx={{
                      "& input": {
                        WebkitTextFillColor: "red !important",
                        fontWeight: "500",
                      },
                    }}
                    type="number"
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input
                    label="2. Hạng"
                    placeholder="Nhập hạng"
                    disabled
                    value={data?.risk_management?.ranking ?? ''}
                    onDebounce={(val) =>{
                      changeData(val,'ranking','risk_management')
                    }}
                    sx={{
                      "& input": {
                        WebkitTextFillColor: "red !important",
                        fontWeight: "500",
                      },
                    }}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextArea
                    className="extra-textarea"
                    label={
                      <Box className="flex justify-between">
                        <span>3. Ghi chú</span>
                        {data?.risk_management?.approval_date ? (
                          <span>
                            <em className="text-small">Cập nhật: </em>
                            <em
                              className="text-primary text-small mscb-pointer"
                              style={{ textDecoration: "underline" }}
                              onMouseEnter={handlePopoverOpen}
                              onMouseLeave={handlePopoverClose}
                            >
                             {data?.risk_management?.person_updated?.person_info?.length} người
                            </em>
                            <em className="text-primary text-small"> - </em>
                            <em className="text-primary text-small">
                              {timestampToDate(
                                +data?.risk_management?.approval_date
                              )}
                            </em>
                          </span>
                        ) : null}
                      </Box>
                    }
                    placeholder="Nhập ghi chứ"
                    sx={{
                      "&.extra-textarea": {
                        "& label": {
                          display: "flex",
                          "&>div": {
                            width: "100%",
                            "& em": { fontWeight: 400 },
                          },
                        },
                        "& textarea": {
                          mb: "0!important",
                        },
                      },
                    }}
                    value={data?.risk_management?.description ?? ""}
                    disabled
                  />
                </Grid>
              </Grid>
            </Box>
            <Box className="text-right mt-6"></Box>
          </CardInside>
        </Grid>
      </Grid>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
          "& .MuiPaper-root": {
            "& ul.MuiList-root": {
              padding: "16px !important",
              "& li.MuiListItem-root": {
                padding: "unset !important",
                "&:last-child": {
                  borderBottom: "unset !important",
                },
              },
            },
          },
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {MapListUser}
        </List>
      </Popover>
    </Box>
  );
};

export default ICRResults;
