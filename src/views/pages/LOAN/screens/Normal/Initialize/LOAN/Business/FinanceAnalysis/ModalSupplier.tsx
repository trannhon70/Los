import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMasterData from 'app/hooks/useMasterData';
import useNotify from 'app/hooks/useNotify';
import { FC, Fragment, useEffect, useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { IoTrashOutline } from 'react-icons/io5';
import { ILOANNormalStorageLegalValidate } from 'types/models/loan/normal/storage/Legal';
import { ILOANNormalStorageLOANInOutInfo } from 'types/models/loan/normal/storage/LOAN';
import { diffArray } from 'utils';
import Input from 'views/components/base/Input';
import Empty from 'views/components/layout/Empty';
import Modal from 'views/components/layout/Modal';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import TableSticky from 'views/components/layout/TableSticky';
import MethodReceivingSalaryCheck from 'views/components/widgets/MethodReceivingSalaryCheck';
import PaymentMethodCheck from 'views/components/widgets/PaymentMethodCheck';
import { generateEmptyInOutInfo } from 'views/pages/LOAN/utils';
import { ValidateMessage } from 'views/pages/LOAN/utils/message';
import { LOANValidate } from 'views/pages/LOAN/utils/validate';

export interface ModalSupplierProps{
  label?: string;
  open?: boolean;
  onClose?(): void;
  onSave?(uuid: string): void;
  onAdd?(Data: ILOANNormalStorageLOANInOutInfo): void;
  onUpdate?(Data: ILOANNormalStorageLOANInOutInfo): void;
  onDelete?(uuid: string): void;
  onChange?(): void;
  data?: ILOANNormalStorageLOANInOutInfo[];
  tool?: boolean;
}

const ModalSupplier: FC<ModalSupplierProps> = props => {

  const { 
    open = false, 
    onClose, 
    onAdd, 
    onSave,
    onUpdate,
    onDelete,
    data = [], 
    tool = true,
    label
  } = props;

  const [ CurrentData, setCurrentData ] = useState<ILOANNormalStorageLOANInOutInfo[]>(data);
  const [ NewData, setNewData ] = useState<ILOANNormalStorageLOANInOutInfo>(generateEmptyInOutInfo());
  const [ DeleteId, setDeleteId ] = useState<ILOANNormalStorageLOANInOutInfo | null>(null);
  const [ Message, setMessage ] = useState<ILOANNormalStorageLegalValidate>({ valid: true });
  const [ isOpen, setIsOpen ] = useState<boolean>(open);
  const [ isEdit, setIsEdit ] = useState(false);
  const { PaymentMethod, MethodReceiveSalary } = useMasterData();

  const [ isDisiableInput, setIsDisiableInput ] = useState<boolean>(true);

  const notify = useNotify();

  useEffect(() => {
    open === isOpen || setIsOpen(open);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ open ]);

  useEffect(() => {
    diffArray(data, CurrentData) && setCurrentData(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ data ]);

  useEffect(() => {
    if (CurrentData.find(id => id.uuid === NewData.uuid) && !isEdit){
      // notify(`Thêm ${ label } thành công`, 'success');
      setNewData(generateEmptyInOutInfo());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentData ]);

  const changeInfo = (value: string) => setNewData({ ...NewData, info: value });
  const changePayment = (value: string) =>  setNewData({ ...NewData, payment: value });
  const changeMethod = (value: string) => setNewData({ ...NewData, method: value });


  const getMessage = (field: string) => {
    if (Message.valid || field !== Message.field) return '';
    const fieldMessage = ValidateMessage[Message.field as keyof typeof ValidateMessage];
    const role = Message.role as string;
    return (fieldMessage ? fieldMessage[role as keyof typeof fieldMessage] : '') ?? '';
  }

  const clickButtonForm = () => {
    setIsDisiableInput(false);

    const validate = LOANValidate.common.inAndOut.info(NewData.info);
    setMessage({ valid: true });
    
    if (validate.valid) {
      if (isEdit) {
        if (onUpdate) {
          onUpdate({ ...NewData });
          setIsEdit(false);
          setNewData(generateEmptyInOutInfo());
        }
      }
      else {
        onAdd && onAdd(NewData);
      }
      setIsDisiableInput(true);
    }
    else if(!isDisiableInput) {
      setMessage(validate);

    }

  }

  const clickPrimary = (id: ILOANNormalStorageLOANInOutInfo) => () => !id.primary && onSave && onSave(id.uuid);

  const onClickEdit = (id: ILOANNormalStorageLOANInOutInfo) => () => {
    setIsDisiableInput(false);
    setIsEdit(true);
    setNewData(id);
  }

  const onClickDelete = (id: ILOANNormalStorageLOANInOutInfo) => () => {
    if (id.primary){
      notify(`Không thể xóa ${ label } chính`, 'error');
      return;
    }

    setDeleteId(id);
  }

  const onCloseDelelte = () => setDeleteId(null);

  const onConfirmDelete = () => {
    onDelete && onDelete(DeleteId?.uuid as string);
    setDeleteId(null);
  }

  
  const onCloseBtn = async () => {
    setIsEdit(false);
    setIsDisiableInput(true);
    onClose && onClose();
   
  }

  return <Fragment>
    <Modal 
      open={ isOpen } 
      onClose={ onCloseBtn } 
      isStatic 
      sx={{ 
        '& .MuiPaper-root': { 
          minWidth: '60%',
          position: 'relative' ,
          borderRadius: 0
        } 
      }}
    >
      <IconButton onClick={ onCloseBtn } color="error" sx={{ position: 'absolute', right: '0.8rem', top: '0.5rem' }}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h5" component="div" className="text-upper text-primary font-medium text-18 pb-3">
        { isEdit? 'Cập nhật' : 'Thêm mới' } { label }
      </Typography>
      <Grid container spacing={ 3 }>
        <Grid item xl={ 6 }>
          <Input 
            label={ `1. Thông tin ${ label }` } 
            onChange={ changeInfo }
            value={ NewData.info }
            message={ getMessage('info') ? getMessage('info')+ " " + label : '' }
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={ 3 }>
          <PaymentMethodCheck
            label="2. Hình thức thanh toán"
            value={ NewData.payment }
            onChange={ changePayment }
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={ 3 }>
          <MethodReceivingSalaryCheck
            label="3. Phương thức thanh toán"
            value={ NewData.method }
            onChange={ changeMethod }
            disabled={isDisiableInput}
          />
        </Grid>
      </Grid>
      <Grid container spacing={ 3 } className="mt-0 mb-6">
        <Grid item xl={ 12 }>
          <Button 
            variant="contained" 
            sx={{ borderRadius: 0 }}
            onClick={ clickButtonForm }
          >
            { isEdit? 'Cập nhật' : 'Thêm mới' }
          </Button>
        </Grid>
      </Grid>
      {(() => {
        if (!CurrentData.filter(i=>i.info !=="").length){
          return <Empty sx={{ minHeight: '250px' }}>
            <Box>Không có { label } nào để hiển thị.</Box>
          </Empty>
        }

        return <Box>
          <Typography variant="h5" component="div" className="text-upper text-primary font-medium text-18 pb-3">
            Danh sách { label }
          </Typography>
          <TableSticky className="mscb-table mscb-table-border">
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }}>STT</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Thông tin { label }</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Hình thức TT</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Phương thức TT</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Đối tác chính</TableCell>
                { tool && <TableCell sx={{ textAlign: 'center' }}>Thao tác</TableCell> }
              </TableRow>
            </TableHead>
            <TableBody>
              {CurrentData.filter(i=>i.info !=="").map((id, index) => (
                <TableRow key={ id.uuid }>
                  <TableCell sx={{ textAlign: 'center' }}>{ index + 1 }</TableCell>
                  <TableCell>{ id.info }</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {PaymentMethod.find(p => p.id === id.payment)?.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {MethodReceiveSalary.find(m => m.id === id.method)?.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', p: '0!important' }}>
                    <Radio 
                      checkedIcon={ <CheckCircleIcon sx={{ fontSize: '20px' }} /> }
                      icon={ <RadioButtonIcon sx={{ fontSize: '20px' }} /> }
                      checked={ id.primary }
                      onClick={ clickPrimary(id) }
                    />
                  </TableCell>
                  {
                    tool &&
                    <TableCell sx={{ textAlign: 'center', p: '0!important'}}>
                      <IconButton color="primary" onClick={ onClickEdit(id) } size="small">
                        <BsPencil fontSize={'1.3rem'} />
                      </IconButton>
                      <IconButton 
                        color={ id.primary ? 'secondary' : 'primary' } 
                        disabled={ id.primary }
                        onClick={ onClickDelete(id) }
                        size="small"
                      >
                        <IoTrashOutline style={{fontSize: '1.5rem'}}/>
                      </IconButton>
                    </TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </TableSticky>
        </Box>
      })()}
    </Modal>
    <ModalConfirm open={ DeleteId !== null } onClose={ onCloseDelelte } onConfirm={ onConfirmDelete }>
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc muốn xoá { label }?
      </Box>
    </ModalConfirm>
  </Fragment>
}

export default ModalSupplier;