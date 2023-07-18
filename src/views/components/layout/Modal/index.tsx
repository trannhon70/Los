import { FC, forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

export interface ModalProps {
  open?: boolean;
  onClose?(): void;
  isStatic?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  sx?: SxProps<Theme>;
  fullScreen?:boolean;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Modal: FC<ModalProps> = props => {

  const {
    open = false,
    onClose,
    isStatic,
    sx = {},
    header,
    footer,
    fullScreen,
    children
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(open);
  const contextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    isOpen && contextRef.current?.focus();
  }, [isOpen]);

  const closeModal = (_: {}, reason: "backdropClick" | "escapeKeyDown") => {
    console.log(reason)
    if (reason !== 'backdropClick' || !isStatic) {
      onClose && onClose();
    }
  }

  return <Dialog
    open={isOpen}
    TransitionComponent={Transition}
    keepMounted
    onClose={closeModal}
    fullScreen={fullScreen}
    sx={{
      '& .MuiPaper-root': {
        borderRadius: 0,
        maxWidth: '90vh'
      },
      ...sx
    }}
  >
    {!!header && <DialogTitle>{header}</DialogTitle>}
    <DialogContent dividers>
      <DialogContentText ref={contextRef} tabIndex={-1} component="div" sx={{ '&:focus': { outline: 'unset' } }}>
        {children}
      </DialogContentText>
    </DialogContent>
    {!!footer && <DialogActions>{footer}</DialogActions>}
  </Dialog>

}

export default Modal;