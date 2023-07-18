import { FC, Fragment } from 'react';
import {
  ILOANNormalStorageAddress,
} from 'types/models/loan/normal/storage/Legal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'views/components/layout/Modal';

export interface ModalAddressProps {
  add?: boolean;
  open?: boolean;
  onClose?(): void;
  onSave?(): void;
  onUpdate?(address: ILOANNormalStorageAddress): void;
  addresses?: ILOANNormalStorageAddress[];
  tool?: boolean;
  country?: string;
  screen?: string;
  coppy?: boolean;
  coppyType?: string | null;
}

const ModalCopyAddress: FC<ModalAddressProps> = props => {

  const {
    onClose,

  } = props;


  return <Fragment>
    <Modal
      onClose={onClose}
      isStatic
    
    >
      <IconButton
        color="error"
        sx={{ position: 'absolute', right: '0.8rem', top: '0.5rem' }}
      >
        <CloseIcon />
      </IconButton>
      <Fragment>
      </Fragment>
    </Modal>
  </Fragment>
}

export default ModalCopyAddress;