import React, { Fragment, FC, ReactNode, useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "views/components/layout/Modal";

type ModalActionType = "close" | "save";
type IModalProps = {
  onClose: () => void;
  onSave: () => void;
  open: boolean;
  disabledActions?: ModalActionType[];
  rightElement?: ReactNode;
  viewOnly?:boolean;
};
export const MyAttachModal: FC<IModalProps> = ({
  children = null,
  open = false,
  onClose = () => undefined,
  onSave = () => undefined,
  disabledActions = [],
  rightElement = null,
  viewOnly=false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  return (
    <Fragment>
      <Modal
        open={open}
        onClose={onClose}
        isStatic
        sx={{
          "& .MuiPaper-root": {
            minWidth: "80%",
            position: "relative",
            borderRadius: 0,
            height: '60%',
          },

          "& .MuiDialogContent-root": {
            padding: "16px 24px",
            borderBottom: "unset !important",
          },

          "& .MuiDialogActions-root": {
            padding: "0px 24px 30px 24px",
          },
        }}
        footer={
          <Box>
            <Button
              id="Cancel"
              variant="contained"
              color="error"
              className={`mr-3`}
              style={{ borderRadius: "unset", width: "99px" }}
              onClick={onClose}
              disabled={disabledActions.includes("close")}
            >
              Hủy
            </Button>
            <Button
              id="Save"
              variant="contained"
              color="primary"
              style={{ borderRadius: "unset", width: "99px" }}
              disabled={viewOnly || disabledActions.includes("save")}
              onClick={onSave}
            >
              Lưu
            </Button>
          </Box>
        }
        header={
          <Box sx={{top: 0, position: 'sticky'}}>
            <Typography
              variant="h5"
              component="div"
              className="text-upper text-primary font-medium text-18 pb-3"
            >
              TÀI LIỆU ĐÍNH KÈM
            </Typography>
            <IconButton
              onClick={onClose}
              color="error"
              sx={{ position: "absolute", right: "0.5rem", top: "0.25rem", marginTop: '-12px' }}
            >
              <CloseIcon />
            </IconButton>
            <Box className="flex-center">
              <Box
                sx={{
                  width: "3%",
                  justifyContent: "flex-start",
                  fontWeight: "500",
                  fontSize: "18px",
                  color: "#353535",
                }}
              >
                STT
              </Box>
              <Box
                sx={{
                  width: "22%",
                  marginRight: "3%",
                  fontWeight: "500",
                  fontSize: "18px",
                  color: "#353535",
                  paddingLeft: "25px",
                }}
              >
                TÊN FILE
              </Box>
              <Box
                sx={{
                  width: "40%",
                  fontWeight: "500",
                  fontSize: "18px",
                  color: "#353535",
                }}
              >
                NỘI DUNG TÀI LIỆU
              </Box>
              <Box
                sx={{
                  width: "25%",
                  fontWeight: "500",
                  fontSize: "18px",
                  color: "#353535",
                }}
              >
                CẬP NHẬT BỞI
              </Box>
              <Box
                sx={{
                  width: "10%",
                  fontWeight: "500",
                  fontSize: "18px",
                  color: "#353535",
                  justifyContent: "flex-end",
                  display: "flex",
                }}
              >
                {rightElement}
              </Box>
            </Box>
          </Box>
        }
      > 
     
        {/* <Divider
          sx={{
            borderBottomWidth: "2px",
            margin: "10px 0px",
            borderColor: "#353535",
            position:'sticky',
            top: 0,
          }}
        /> */}
        {children}
      </Modal>
    </Fragment>
  );
};
