import CloseIcon from "@mui/icons-material/Close";
import { Divider, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useState } from "react";
import { ICICDocumentInfoAPI } from "types/models/loan/normal/storageApproval/CIC";
import Modal from "views/components/layout/Modal";
import DocumentInfo from "./DocumentInfo";

export interface ModalAttachmentModalApprovalCICProps {
  add?: boolean;
  open?: boolean;
  onClose?(): void;
  onSave?(uuid: string): void;
  onDelete?(): void;
  onAdd?(): void;
  onUpdate?(): void;
  attachData: ICICDocumentInfoAPI[]
}

const AttachmentModalApprovalCIC: FC<ModalAttachmentModalApprovalCICProps> = (props) => {
  const { open = false, onClose, attachData } = props;
  
  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      isStatic
      sx={{
        '& .MuiPaper-root': {
          minWidth: '80%',
          position: 'relative',
          borderRadius: 0,

          '& .MuiDialogContent-root': {
            padding: '16px 24px',
            borderBottom: 'unset !important',
          },

          '& .MuiDialogActions-root': {
            padding: '0px 24px 30px 24px',
          },
        },
      }}
    >
      <Box>
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
          sx={{ position: 'absolute', right: '0.8rem', top: '0.5rem' }}
        >
          <CloseIcon />
        </IconButton>
        <Box className="flex-center">
          <Box
            sx={{
              width: '3%',
              justifyContent: 'flex-start',
              fontWeight: '500',
              fontSize: '18px',
              color: '#353535',
            }}
          >
            STT
          </Box>
          <Box
            sx={{
              width: '22%',
              marginRight: '3%',
              fontWeight: '500',
              fontSize: '18px',
              color: '#353535',
              paddingLeft: '25px',
            }}
          >
            TÊN FILE
          </Box>
          <Box
            sx={{
              width: '40%',
              fontWeight: '500',
              fontSize: '18px',
              color: '#353535',
            }}
          >
            NỘI DUNG TÀI LIỆU
          </Box>
          <Box
            sx={{
              width: '25%',
              fontWeight: '500',
              fontSize: '18px',
              color: '#353535',
            }}
          >
            CẬP NHẬT BỞI
          </Box>
          <Box
            sx={{
              width: '10%',
              fontWeight: '500',
              fontSize: '18px',
              color: '#353535',
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          ></Box>
        </Box>
        <Divider
          sx={{
            borderBottomWidth: '2px',
            margin: '10px 0px',
            borderColor: '#353535',
          }}
        />
        {attachData?.map((documentInfo, docInfoIndex) => (
          <DocumentInfo 
            key={docInfoIndex}
            documentInfo={documentInfo}
            docInfoIndex={docInfoIndex}
          />
        ))}
      </Box>
    </Modal>
  );
};
export default AttachmentModalApprovalCIC;
