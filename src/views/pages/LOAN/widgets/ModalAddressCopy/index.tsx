import CloseIcon from '@mui/icons-material/Close';
import { Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useMasterData from 'app/hooks/useMasterData';
import useNotify from 'app/hooks/useNotify';
import { FC, Fragment, useEffect, useState } from 'react';
import {
  ILOANNormalStorageAddress
} from 'types/models/loan/normal/storage/Legal';
import { diffArray } from 'utils';
import Modal from 'views/components/layout/Modal';
import useStorage from '../../screens/Normal/Initialize/Legal/useStorage';
import ListDataCopyAddress from './ListDataCopyAddress';
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { useSelector } from 'react-redux';


export interface ModalAddressProps{
  add?: boolean;
  open?: boolean;
  onClose?(): void;
  onSave?(data: any): void;
  onUpdate?(address: ILOANNormalStorageAddress): void;
  addresses?: ILOANNormalStorageAddress[];
  tool?: boolean;
  country?: string;
  screen?: string;
  coppy?: boolean;
  coppyType?: string | null;
}

const ModalAddressCopy: FC<ModalAddressProps> = props => {

  const {
    open = false,
    onClose,
    onSave,
    addresses = [],
    screen = '',
    coppy = false,
    coppyType = null
  } = props;
  const notify = useNotify();
  const { allAddress } = useStorage(screen);
  const { register } = useMasterData();
  const [ valueActive, setValueActive ] = useState<any>();
  const [ isOpen, setIsOpen ] = useState<boolean>(open);
  const [ isCoppy ] = useState<boolean>(coppy);
  const [ typeAddress, setTypeAddress ] = useState<string | null>(coppyType);
  const [ CurrentAddresses, setCurrentAddresses ] = useState<ILOANNormalStorageAddress[]>(addresses);
  const ruleDisabled = useSelector(getRuleDisbled)

  useEffect(() => {
    open === isOpen || setIsOpen(open);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ open ]);


  useEffect(() => {
    if (coppyType !== typeAddress){
      setTypeAddress(coppyType);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ coppyType ])

  useEffect(() => {
    if(isCoppy){
      setCurrentAddresses(allAddress.length > 0 ? allAddress.filter(data => data.type === typeAddress) : []);
    }else{
      diffArray(addresses, CurrentAddresses) && setCurrentAddresses(addresses);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ addresses, isCoppy, typeAddress ]);

  useEffect(() => {
    if(isOpen){
      for(let i = 0; i < CurrentAddresses.length; i++){
        register("district", CurrentAddresses[i].province)
        register("ward", CurrentAddresses[i].district)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentAddresses, isOpen])

  const onCloseBtn = () => {
    onClose && onClose();
  }


  const MappingListAddress: Record<string, ILOANNormalStorageAddress[]> = {};

  if (isCoppy){
    CurrentAddresses.forEach(address => {
      if (!MappingListAddress[address.type]){
        MappingListAddress[address.type] = [ address ];
      }
      else{
        MappingListAddress[address.type].push(address);
      }
    });
  }
  else{
    CurrentAddresses.forEach(address => {
      if (!MappingListAddress[address.type]){
        MappingListAddress[address.type] = [ address ];
      }
      else{
        MappingListAddress[address.type].push(address);
      }
    });
  }

  const handleSaveBtn = () => {
    if (valueActive) {
      onSave && onSave(valueActive);
      notify('Copy địa chỉ thành công', 'success')
    } else {
      notify('Chưa chọn địa chỉ', 'warning')
    }
  }

  const onHandleChangePrimary = (val: any) => {
    setValueActive(val);
  }

  return <Fragment>
    <Modal
      open={ isOpen }
      onClose={ onClose }
      isStatic
      sx={{
        '& .MuiPaper-root': {
          minWidth: '60%',
          position: 'relative' ,
          borderRadius: 0
        }
      }}
      footer={
        <Box className="pt-2 pb-2 pr-4">
          <Button
            variant="contained"
            color="error"
            className={`mr-3`}
            style={{ borderRadius: 'unset', width: '99px' }}
            onClick={onClose}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={ruleDisabled}
            style={{ borderRadius: 'unset', width: '99px' }}
            onClick={handleSaveBtn}
          >
            COPY
          </Button>
        </Box>
      }
    >
      <IconButton 
        onClick={ onCloseBtn } 
        color="error" 
        sx={{ position: 'absolute', right: '0.8rem', top: '0.5rem' }}
      >
        <CloseIcon />
      </IconButton>
        <Fragment>
          <ListDataCopyAddress
            dataAdress={CurrentAddresses}
            onChanePrimary={(value: any) => onHandleChangePrimary(value)}
            isOpen={isOpen}
          />
        </Fragment>
    </Modal>
  </Fragment>
}

export default ModalAddressCopy;