import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  FormControlLabel,
  IconButton,
  styled,
  Switch,
  SwitchProps,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import { FC } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import BasicInfoTransport from "./BasicInfoTransport";
import DescribeInfoTransport from "./DescribeInfoTransport";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 1,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(19px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#069549",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 20,
    height: 20,
  },
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const CollateralTransport: FC = () => {
  return (
    <Box>
      <Box className="flex" sx={{ paddingTop: "10px", paddingBottom: "10px" }}>
        <Box component="div" width="3%" className="text-16 flex-center">
          <span
            style={{
              height: "100%",
              paddingBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            1
          </span>
        </Box>
        <Box
          sx={{ borderBottom: "solid 1px #d5d5d5", paddingBottom: "10px" }}
          className="flex"
          width="97%"
        >
          <Box
            component="div"
            width="15%"
            sx={{
              border: "solid 1px red",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              color: "#eb0029",
            }}
          >
            Tài sản bảo đảm 1
          </Box>
          <Box component="div" width="58%" className="flex" sx={{ marginLeft: '8px' }}>
            <Typography variant="h6" className="text-16 flex items-center">
              Thông tin:
            </Typography>
            <Box className="ml-5 flex items-center mscb-pointer">
              <span className="underline mr-1 text-primary font-bold text-16">
                Chính chủ
              </span>
              <AiOutlineUser fontSize="14px" />
            </Box>
            <Box className="ml-5 flex items-center mscb-pointer">
              <span className="underline mr-1 text-primary font-bold text-16">
                Đồng sở hữu
              </span>
              <MdOutlineEdit fontSize="14px" />
            </Box>
            <Box className="ml-5 flex items-center mscb-pointer">
              <span className="underline mr-1 text-primary font-bold text-16">
                Bên thứ ba
              </span>
              <MdOutlineEdit fontSize="14px" />
            </Box>
            <Box className="ml-5 flex items-center mscb-pointer">
              <span className="underline mr-1 text-primary font-bold text-16">
                Tài sản riêng của Vợ/Chồng
              </span>
              <MdOutlineEdit fontSize="14px" />
            </Box>
          </Box>
          <Box component="div" width="9%" className="flex-center">
            <FormControlLabel
              style={{ marginLeft: "-5px" }}
              labelPlacement="start"
              control={<IOSSwitch sx={{ m: 1 }} />}
              label="Thế chấp"
              sx={{
                "& .MuiTypography-root": {
                  fontWeight: 500,
                  fontSize: "var(--mscb-fontsize)",
                  color: "var(--mscb-secondary)",
                  letterSpacing: "0.00938em",
                },
              }}
            />
          </Box>
          <Box
            component="div"
            width="15%"
            className="flex-center mscb-pointer"
          >
            <span className="underline mr-1 text-primary font-bold text-16">
              Người được uỷ quyền
            </span>
            <MdOutlineEdit fontSize="14px" />
          </Box>
          <Box component="div" width="3%">
            <IconButton>
              <MoreHorizIcon
                style={{
                  fontSize: "24px",
                  color: "#1825aa",
                  fontWeight: "900",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          borderBottom: "solid 1px #d5d5d5",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <BasicInfoTransport />
        <DescribeInfoTransport />
      </Box>
    </Box>
  );
};

export default CollateralTransport;
