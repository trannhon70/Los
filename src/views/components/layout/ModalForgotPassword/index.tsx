import {
  Dialog, IconButton
} from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";
import { modalInfoChangeHistory } from "./style";


export interface ModalRegisterStatusHistoryProps {
  id: string | number;
  openModal: boolean;
  handleCloseModal(): void;
  className?: string;
}

const ModalForgotPassword: React.FC<ModalRegisterStatusHistoryProps> = (
  props
) => {
  const { id, openModal, handleCloseModal } = props;
  const handleClose = () => {
    handleCloseModal();
  };


  return (
    <Dialog
      key={id}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openModal}
      sx={modalInfoChangeHistory}
    >
    <iframe title="Hướng dẫn lấy lại mật khẩu" width="100%" height="100%" style={{zIndex: '100000'}} src="https://bds-sf.minerva.vn/f/470d702442e64a8fa06d/"></iframe>
    <IconButton
      sx={{ marginLeft: "5px", position: 'absolute', right: 10, top: 10, zIndex: '100000'}}
      aria-label="warning"
      size={"small"}
      color={"primary"}
      onClick={handleClose}
    >
      <MdClose size={25} />
    </IconButton>
    </Dialog>
  );
};

export default ModalForgotPassword;
