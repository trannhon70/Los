import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { AiOutlineExclamation } from 'react-icons/ai';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SxBaseApp } from 'types/app';

export interface ModalAlertProps{
  message?: ReactNode;
  description?: ReactNode;
  onClose?(): void;
  buttonLabel?: ReactNode;
  open: boolean;
  sx?: SxBaseApp;
  className?: string;
}

const ModalAlert: FC<ModalAlertProps> = props => {

  const { message = '', description = '', open = false, onClose, sx, className, buttonLabel } = props;
  const [ isOpen, setOpen ] = useState<boolean>(open);
  const mounted = useRef(false);

  useEffect(() => {
    open === isOpen || setOpen(open);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ open ]);

  useEffect(() => {
    if (!isOpen && mounted.current){
      onClose && onClose();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isOpen ]);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    }
  })

  const clickButton = () => {
    onClose && onClose();
  }

  return <Modal 
    open={ isOpen } 
    sx={ sx } 
    className={ className }
  >
    <Box
      sx={{
        bgcolor: '#fff',
        m: 'calc(50vh - 160px) auto',
        width: '420px',
        outline: 0,
        p: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Avatar
        sx={{
          width: '100px',
          height: '100px',
          bgcolor: 'rgba(24, 37, 170, 0.1)'
        }}
      >
        <AiOutlineExclamation style={{ fontSize: '75px', color: 'var(--mscb-primary)' }} />
      </Avatar>
      {
        !!message &&
        <Box className="text-primary text-center" sx={{ fontWeight: 500, fontSize: '20px', mt: '16px' }}>
          { message }
        </Box>
      }
      {
        !!description &&
        <Box className="text-center" sx={{ fontSize: '14px', fontStyle: 'italic', mt: '4px' }}>
          { description }
        </Box>
      }
      <Box className="mt-6">
        <Button 
          className="success"
          variant="contained"
          size="large"
          onClick={ clickButton }
          sx={{ borderRadius: 0, fontSize: 14 }}
        >
          { buttonLabel ? buttonLabel : 'Đồng ý' }
        </Button>
      </Box>
    </Box>
  </Modal>

}

export default ModalAlert;