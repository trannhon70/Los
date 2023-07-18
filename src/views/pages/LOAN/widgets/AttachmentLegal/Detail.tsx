
import ImageIcon from "@mui/icons-material/Image";
import { Box, IconButton } from "@mui/material";
import { FC } from "react";
import { BsPencil } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";


const Detail: FC = (props) => {

  return (
    <Box className="flex-center">
      <Box
        sx={{ width: "3%", fontSize: "14px", color: "#353535" }}
        className="flex justify-center"
      >
        1.1
      </Box>
      <Box sx={{ width: "22%", marginRight: '3%', wordBreak: 'break-all' }}>
        <Box style={{ display: "flex", alignItems: "center", marginLeft: '25px'}}>
          <ImageIcon />
          <span style={{ marginLeft: "5px", color: '#1825aa', fontWeight: 'bold', fontSize: '14px' }}>
            hinh_chung_minh_mat_truoc.jpg
          </span>
        </Box>
      </Box>
      <Box sx={{ width: "40%", fontSize: "14px", color: '#353535', fontWeight: '500'}}>Hinh anh phap ly CMND</Box>
      <Box sx={{ width: "25%" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{fontSize: "14px", color: '#353535', fontWeight: '500'}}>Nguyen Tran Trung Quan</span>
          <span style={{ color: '#808080', fontSize: '12px' }}>09:11 10/12/2002</span>
        </Box>
      </Box>
      <Box
        sx={{
          width: "10%",
          justifyContent: "flex-end",
          display: "flex",
        }}
      >
        <IconButton>
          <BsPencil style={{ fontSize: "1.3rem" }} color="#1825aa"/>
        </IconButton>
        <IconButton>
          <IoTrashOutline style={{ fontSize: "1.5rem" }} color="#1825aa"/>
        </IconButton>
      </Box>
    </Box>
  );
};
export default Detail;
