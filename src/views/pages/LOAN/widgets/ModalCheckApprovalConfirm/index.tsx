import CloseIcon from "@mui/icons-material/Close";
import {
  Box, Button, Grid,
  IconButton, Typography
} from '@mui/material';
import { getLOANNormalLOSId } from "features/loan/normal/storage/selectors";
import { getLegalBorrower, getPassPositionList } from "features/loan/normal/storageGuide/selector";
import { FC } from "react";
import { useSelector } from "react-redux";
import { APP_DATE_FORMAT } from "utils/constants";
import { timestampToDate } from "utils/date";
import Modal from "views/components/layout/Modal";
import { SxModalComfirm } from "./style";
import TableCheck from "./TableCheck";

export interface ModalApply {
  username: string | number;
  reason: string;
}

export interface IModalCheckApprovalConfirmProps {
  open: boolean;
  onClose?: () => void;
  onSave?: () => void;
  onIgnore?: () => void;
}

const ModalCheckApprovalConfirm: FC<IModalCheckApprovalConfirmProps> = props => {

  const { open, onClose, onIgnore } = props;

  const handleClose = () => onClose && onClose();
  const handleIgonre = () => onIgnore && onIgnore();
  const getDataPassPosition = useSelector(getPassPositionList);
  const getLosId = useSelector(getLOANNormalLOSId);
  const getLegalBorrowerName = useSelector(getLegalBorrower);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      isStatic
      sx={{
        "& .MuiPaper-root": {
          height: "900px",
          minWidth: "1200px",
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
        <Box className="pt-2 pb-2 pr-4">
          {/* <Button
            variant="contained"
            color="error"
            className={`mr-3`}
            style={{ borderRadius: 'unset', width: '200px' }}
            onClick={handleIgonre}
          >
            BỎ QUA VÀ TRÌNH
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: 'unset', width: '99px' }}
            onClick={handleClose}
          >
            ĐÓNG
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
          DANH MỤC HỒ SƠ CẦN PHÊ DUYỆT
        </Typography>
        <IconButton
          onClick={onClose}
          color="error"
          sx={{ position: "absolute", right: "0.8rem", top: "0.5rem" }}
        >
          <CloseIcon />
        </IconButton>
        <Box className="flex-center" >
          <Grid container spacing={3} >
            <Grid item xs={4}>
              <span style={{
                fontSize:"16px"
              }}>Tên khách hàng: <span style={{
                color: "#353535",
                fontWeight: 500,
                fontSize:"16px"
              }}>{getLegalBorrowerName ? getLegalBorrowerName?.toUpperCase() : null}</span> </span>
            </Grid>
            <Grid item xs={4}>
              <span style={{
                fontSize:"16px"
              }}>ID LOS: <span style={{
                color: "#353535",
                fontWeight: 500,
                fontSize:"16px"
              }}>{getLosId}</span> </span>
            </Grid>
            <Grid item xs={4}>
              <span style={{
                fontSize:"16px"
              }}>Ngày phê duyệt: <span style={{
                color: "#353535",
                fontWeight: 500
              }}> {(timestampToDate((getDataPassPosition?.updated_at ?? 0), 'HH:mm ' + APP_DATE_FORMAT))}</span> </span>
            </Grid>
          </Grid>
        </Box>
        <Box sx={SxModalComfirm} >
          <span className='text-16 corrdinator-status-chile'><span className='corrdinator-status-chile-success'>
          </span>  <span style={{
                fontSize:"16px"
              }} className="text-primary font-medium">Tổng số trang đã phê duyệt: </span>
            <span style={{
                color:"var(--mscb-danger)",
                fontWeight:500
              }}>{(getDataPassPosition?.passed_positions_count ?? 0)}</span>/<span style={{
                color:"var(--mscb-primary)",
                fontWeight:500
              }}>{(getDataPassPosition?.passed_positions_limit) ?? 0}</span>
          </span>
        </Box>
        <Box>
          <TableCheck data={getDataPassPosition?.passed_positions ?? []} />
        </Box>
      </Box>
    </Modal>
  )
}
export default ModalCheckApprovalConfirm;