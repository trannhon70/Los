import CloseIcon from "@mui/icons-material/Close";
import {
  Box, Button,
  Divider, Grid,
  IconButton, Typography
} from '@mui/material';
import { forwardRef, ForwardRefRenderFunction } from "react";
import { useDispatch } from 'react-redux';
import { IApplyLos } from 'types/models/loan/normal/storageControl';
import Select from 'views/components/base/Select';
import TextArea from 'views/components/base/TextArea';
import Modal from "views/components/layout/Modal";

export interface ModalApply {
  username: string | number;
  reason: string;
}

export interface IModalApprovalProps {
  open: boolean;
  onClose?: () => void;
  onSave?: () => void;
}

export interface IModalApprovalRef {
  getValue(): IApplyLos;
  validate(): boolean;
}
export interface ModalApprovalComponent extends ForwardRefRenderFunction<IModalApprovalRef, IModalApprovalProps> { }

const ModalUserGrand: ModalApprovalComponent = (props, ref) => {

  const { open, onClose, onSave } = props;
  const dispatch = useDispatch()

  const handleClose = () => {
    onClose && onClose();
  }

  const handleSave = () => {
    onSave && onSave()
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      isStatic
      sx={{
        "& .MuiPaper-root": {
          minWidth: "550px",
          position: "relative",
          borderRadius: 0,

          "& .MuiDialogContent-root": {
            padding: "16px 24px",
            borderBottom: "unset !important",
          },

          "& .MuiDialogActions-root": {
            padding: "0px 24px 30px 24px",
          },
        },
      }}
      footer={
        <Box>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            style={{ borderRadius: "unset" }}
          >
            TRÌNH HỒ SƠ
          </Button>
        </Box>
      }
    >
      <Box>
        <Typography
          variant="h5"
          component="div"
          className="text-upper text-primary font-medium text-18 pb-3"
        >
          ĐIỀU PHỐI THẨM ĐỊNH HỒ SƠ
        </Typography>
        <IconButton
          onClick={onClose}
          color="error"
          sx={{ position: "absolute", right: "0.8rem", top: "0.5rem" }}
        >
          <CloseIcon />
        </IconButton>
        <Box className="flex-center">
          <Grid container spacing={3} >
            <Grid item xl={12} md={12} xs={12}>
              <Select
                label={`1. Người thẩm định`}
                fullWidth
                required
                options={[]}
              />
            </Grid>

            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextArea
                label="2. Ghi chú"
                required
              />
            </Grid>
          </Grid>
        </Box>
        <Divider
          sx={{
            borderBottomWidth: "1px",
            margin: "10px 0px",
            borderColor: "#d5d5d5",
          }}
        />
      </Box>
    </Modal>
  )
}
export default forwardRef(ModalUserGrand);

