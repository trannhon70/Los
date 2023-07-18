import { FunctionComponent, useState, useEffect } from 'react';
import Modal from 'views/components/layout/Modal';
import Divider from "@mui/material/Divider";
import TableHistory from './TableHistory';
import TableSpreadsheet from './TableSpreadsheet';

export interface IModalTableCoOwnersProps {
  open?: boolean;
  onClose?(): void;
}

const ModalSpreadsheetLoan: FunctionComponent<IModalTableCoOwnersProps> = (props) => {
  const { open = true, onClose } = props;

  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = () => {
    onClose && onClose();
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      isStatic
      sx={{
        '& .MuiPaper-root': {
          minWidth: '75%',
          position: 'relative',
          borderRadius: 0
        },
        '& .MuiPaper-elevation':{
          maxHeight:'calc(100% - 10px)'
        }
      }}
    >
      <TableSpreadsheet onClose={handleClose}/>
      <Divider className="my-6" />
      <TableHistory />
    </Modal>
  )
}

export default ModalSpreadsheetLoan;