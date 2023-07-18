import React from "react";
import { Box, SxProps, Theme, Button } from "@mui/material";
import folder from "assets/images/folder.svg";
const SxAttach: SxProps<Theme> = {
  textTransform: "revert",
  fontSize: "13px",
  color: "#747792",
  fontWeight: "400",
  textDecoration: "underline",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 0,
  boxShadow: "0px 1px 10px 0px #888888",
  "& img": {
    mr: "6px",
  },
  '&:hover':{
    textDecoration: "underline",
  }
};
interface IProps {
  onClick?: () => void;
  attachment?: number;
  label?:string;
}
const ButtonAttachFile = ({
  onClick = () => undefined,
  attachment = 0,
  label='tập tin',
}: IProps) => {
  return (
    <Button sx={SxAttach} variant="outlined" onClick={onClick}>
      <img src={folder} alt="Attachment" />
      <Box component="span">{attachment} {label}</Box>
    </Button>
  );
};
export default ButtonAttachFile;
