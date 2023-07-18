import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import {
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";
import { splitAvatarLink } from "utils";
import useStorage from "../../useStorage";
import ModalReviewImage from "../ModalReviewImage";
import { root } from "./style";


const BasicStaffInformation = () => {
  const [showReviewImageModalAvatar, setReviewImageModalAvatar] = useState<boolean>(false)
  const [imageToShowAvatar, setImageToShowAvatar] = useState<string>("");

  const { basicInfo } = useStorage();
  
  const onResetReviewImageModal = (e: any) => {
    setImageToShowAvatar(e.target.src)
    setReviewImageModalAvatar(true);
  }
  
  const onCloseReviewImageModal = () => {
    setReviewImageModalAvatar(false)
  }

  return (
      <Box margin={"10px 2px 10px 10px"} >
      <Grid container spacing={1} sx={root}>
        <Grid item xl={1}  md={2}>
          <Avatar 
            alt="avatar" 
            src={splitAvatarLink(basicInfo.avatar ?? '-')}
            className="avatar" 
            onClick={(e) => onResetReviewImageModal(e)}
          />
        </Grid>
        <Grid item xl={11}  md={10}>
          <Grid className="full-name color-primary">
            <span className="flex items-center">
              
              {basicInfo.full_name ?? '-'}
              {/* {"["}
              {basicStaffInfo.data?.gender !== "" ? (
                basicStaffInfo.data?.gender === "Nữ" ? (
                  <FaFemale />
                ) : (
                  <FaMale />
                )
              ) : (
                "-"
              )}
              {"]"} */}
            </span>
          </Grid>
          <Grid item xl={12} md={12} xs={12} alignItems="flex-end">
            <MdEmail className="icon color-primary" size={14} />
            <span className="emailAddress">
            {basicInfo.user_name !== "-" ? `${basicInfo.user_name}@scb.com.vn` : "-"}
            </span>
          </Grid>
          <Grid item xl={12} md={12} xs={12}>
            <MdPhone className="icon color-primary" size={14} />
            <span className="telephone">
            mobile_number
            </span>
          </Grid>
          <Grid item xl={12} md={12} xs={12} className="staffid">
            <span>Mã số nhân viên: </span>
            <span>
            {basicInfo.user_id}
            </span>
          </Grid>
        </Grid>
        <Grid item xl={12}>
          <Divider variant="fullWidth" />
          <Grid marginTop={"10px"} container spacing={2}>
            {/* Đơn vị coog tác */}
            <Grid item xl={3} md={6}>
              <Box alignItems={"center"} display={"flex"}>
                <Box
                  className="flex-center"
                  sx={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(80, 161, 255, 0.1)",
                  }}
                >
                  <FaMapMarkerAlt color="var(--mscb-primary)" />
                </Box>
                <Box marginLeft={"8px"}>
                  <Typography fontSize={14} component={"p"}>
                    Đơn vị công tác
                  </Typography>
                  <Typography
                    fontSize={14}
                    fontWeight={"bold"}
                    className="text-primary"
                    component={"p"}
                  >
                   {basicInfo.branch_address}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Chức danh */}

            <Grid item xl={3}  md={6}>
              <Box alignItems={"center"} display={"flex"}>
                <Box
                  className="flex-center"
                  sx={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(80, 161, 255, 0.1)",
                  }}
                >
                  <FaBuilding color="var(--mscb-primary)" />
                </Box>
                <Box marginLeft={"8px"}>
                  <Typography fontSize={14} component={"p"}>
                    Chức danh
                  </Typography>
                  <Typography
                    fontSize={14}
                    fontWeight={"bold"}
                    className="text-primary"
                    component={"p"}
                  >
                    {basicInfo.hrm_position_name}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Cap quan li tt */}
            <Grid item xl={3}  md={6}>
              <Box alignItems={"center"} display={"flex"}>
                <Box
                  className="flex-center"
                  sx={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(80, 161, 255, 0.1)",
                  }}
                >
                  <FaCalendarAlt color="var(--mscb-primary)" />
                </Box>
                <Box marginLeft={"8px"}>
                  <Typography fontSize={14} component={"p"}>
                    Cấp quản lý trực tiếp
                  </Typography>
                  <Typography
                    fontSize={14}
                    fontWeight={"bold"}
                    className="text-primary"
                    component={"p"}
                  >
                    manager
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={3}  md={6}>
              <Box alignItems={"center"} display={"flex"}>
                <Box
                  className="flex-center"
                  sx={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(80, 161, 255, 0.1)",
                  }}
                >
                  <RiPhoneFill color="var(--mscb-primary)" />
                </Box>
                <Box marginLeft={"8px"}>
                  <Typography fontSize={14} component={"p"}>
                    Số điện thoại nội bộ
                  </Typography>
                  <Typography
                    fontSize={14}
                    fontWeight={"bold"}
                    className="text-primary"
                    component={"p"}
                  >
                    (+28) {basicInfo.branch_phone}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ModalReviewImage imageToShow={imageToShowAvatar} openModal={showReviewImageModalAvatar} handleCloseModal={onCloseReviewImageModal} />
      </Box>
   
  );
};
export default BasicStaffInformation;
