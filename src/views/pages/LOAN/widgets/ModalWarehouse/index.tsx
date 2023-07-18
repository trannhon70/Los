import AddIcon from '@mui/icons-material/Add';
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
import {
  forwardRef,
  ForwardRefRenderFunction,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import { BsPencil } from 'react-icons/bs';
import { IoTrashOutline } from 'react-icons/io5';
import { ILOANNormalStorageLegalValidate } from 'types/models/loan/normal/storage/Legal';
import { ILOANNormalStorageLOANLegalBusinessStore } from 'types/models/loan/normal/storage/LOAN';
import { diffArray, formatNumber } from 'utils';
import Input, { InputRef } from 'views/components/base/Input';
import Label from 'views/components/base/Label';
import Empty from 'views/components/layout/Empty';
import Modal from 'views/components/layout/Modal';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import TableSticky from 'views/components/layout/TableSticky';
import SelectLocation, {
  SelectLocationValue,
} from 'views/components/widgets/SelectLocation';
import { generateEmptyWarehouse } from 'views/pages/LOAN/utils';
import { ValidateWarehouseMessage } from 'views/pages/LOAN/utils/message';
import { LOANValidate } from '../../utils/validate';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { useSelector } from 'react-redux';

export interface ModalWarehouseRef {
  // validate():void
}
export interface ModalWarehouseProps {
  add?: boolean;
  open?: boolean;
  onClose?(): void;
  onSave?(uuid: string): void;
  onAdd?(address: ILOANNormalStorageLOANLegalBusinessStore): void;
  onUpdate?(address: ILOANNormalStorageLOANLegalBusinessStore): void;
  onDelete?(uuid: string): void;
  onChange?(): void;
  warehouses?: ILOANNormalStorageLOANLegalBusinessStore[];
  tool?: boolean;
  country?: string;
}

const ModalWarehouse: ForwardRefRenderFunction<
  ModalWarehouseRef,
  ModalWarehouseProps
> = (props, ref) => {
  const {
    open = false,
    add = false,
    onClose,
    onAdd,
    onSave,
    onUpdate,
    onDelete,
    onChange,
    warehouses = [],
    tool = true,
    country = '',
  } = props;

  const [CurrentCountry, setCurrentCountry] = useState<string>(country);
  const [CurrentWarehouse, setCurrentWarehouse] =
    useState<ILOANNormalStorageLOANLegalBusinessStore[]>(warehouses);
  const [NewWarehouse, setNewWarehouse] =
    useState<ILOANNormalStorageLOANLegalBusinessStore>(
      generateEmptyWarehouse()
    );
  const [DeleteId, setDeleteId] =
    useState<ILOANNormalStorageLOANLegalBusinessStore | null>(null);
  const [Message, setMessage] = useState<ILOANNormalStorageLegalValidate>({
    valid: true,
  });
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [isAdd, setIsAdd] = useState<boolean>(add);
  const [isEdit, setIsEdit] = useState(false);
  const { Province, District, Ward, register } = useMasterData();

  const ruleDisabled = useSelector(getRuleDisbled);

  const notify = useNotify();

  useEffect(() => {
    setCurrentCountry(country);
  }, [country]);

  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    add === isAdd || setIsAdd(add);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [add]);

  useEffect(() => {
    diffArray(warehouses, CurrentWarehouse) && setCurrentWarehouse(warehouses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehouses]);

  useEffect(() => {
    if (warehouses.find((ad) => ad.uuid === NewWarehouse.uuid) && !isEdit) {
      notify('Thêm kho hàng thành công', 'success');
      setNewWarehouse(generateEmptyWarehouse());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentWarehouse]);

  const changeArea = (value: string) =>
    setNewWarehouse({ ...NewWarehouse, area: value === '' ? null : +value });
  const changeApartment = (value: string) =>
    setNewWarehouse({ ...NewWarehouse, apartment: value });
  const changeLocation = (value: SelectLocationValue) => {
    const { country, ...remain } = value;
    setNewWarehouse({ ...NewWarehouse, ...remain });
  };
  const areaRef = useRef<InputRef>(null);
  const addressRef = useRef<InputRef>(null);

  const getMessage = (field: string) => {
    if (Message.valid || field !== Message.field) return '';
    const fieldMessage =
      ValidateWarehouseMessage[
        Message.field as keyof typeof ValidateWarehouseMessage
      ];
    const role = Message.role as string;
    return (
      (fieldMessage ? fieldMessage[role as keyof typeof fieldMessage] : '') ??
      ''
    );
  };

  useEffect(() => {
    if (isOpen) {
      for (let i = 0; i < CurrentWarehouse.length; i++) {
        register('district', CurrentWarehouse[i].province);
        register('ward', CurrentWarehouse[i].district);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentWarehouse, isOpen]);

  const clickButtonForm = () => {
    setMessage({ valid: true });
    const validate = LOANValidate.WarehouseModal.WareHouse(NewWarehouse);
    if (validate?.valid) {
      if (isEdit) {
        if (onUpdate) {
          onUpdate({ ...NewWarehouse });
          setIsEdit(false);
          setNewWarehouse(generateEmptyWarehouse());
        }
      } else {
        onAdd && onAdd(NewWarehouse);
      }
    } else {
      setMessage(validate);
    }
  };

  const clickPrimary = (ad: ILOANNormalStorageLOANLegalBusinessStore) => () =>
    !ad.primary && onSave && onSave(ad.uuid);

  const onClickEdit = (ad: ILOANNormalStorageLOANLegalBusinessStore) => () => {
    setIsEdit(true);
    setNewWarehouse(ad);
  };

  const onClickDelete =
    (ad: ILOANNormalStorageLOANLegalBusinessStore) => () => {
      if (ad.primary) {
        notify('Không thể xóa kho hàng chính', 'warning');
        return;
      }
      setDeleteId(ad);
    };

  const onCloseDelelte = () => setDeleteId(null);

  const onConfirmDelete = () => {
    onDelete && onDelete(DeleteId?.uuid as string);
    setDeleteId(null);
  };

  return (
    <Fragment>
      <Modal
        open={isOpen}
        onClose={onClose}
        isStatic
        sx={{
          '& .MuiPaper-root': {
            minWidth: '60%',
            position: 'relative',
            borderRadius: 0,
          },
        }}
      >
        <IconButton
          onClick={onClose}
          color="error"
          sx={{ position: 'absolute', right: '0.8rem', top: '0.5rem' }}
        >
          <CloseIcon />
        </IconButton>
        {(() => {
          if (!isAdd && !isEdit) return null;

          return (
            <Fragment>
              <Typography
                variant="h5"
                component="div"
                className="text-upper text-primary font-medium text-18 pb-3"
              >
                {isEdit ? 'Cập nhật' : 'Thêm'} địa chỉ kho hàng
              </Typography>
              <SelectLocation
                before={
                  <Fragment>
                    <Grid item xl={4}>
                      <Input
                        label="1. Diện tích (m&sup2;)"
                        type="number"
                        format
                        disabedNegative
                        value={(NewWarehouse.area ?? '').toString()}
                        onDebounce={changeArea}
                        ref={areaRef}
                        message={getMessage('area')}
                      />
                    </Grid>
                    <Grid item xl={4}>
                      <Input
                        label="2. Địa chỉ"
                        onDebounce={changeApartment}
                        value={NewWarehouse.apartment}
                        message={getMessage('address')}
                        ref={addressRef}
                      />
                    </Grid>
                  </Fragment>
                }
                after={
                  <Grid item xl={4}>
                    <Label className="block mb-2"> </Label>
                    <Button
                      variant="contained"
                      sx={{ borderRadius: 0 }}
                      onClick={clickButtonForm}
                    >
                      {isEdit ? 'Cập nhật' : 'Thêm mới'}
                    </Button>
                  </Grid>
                }
                value={{
                  country: CurrentCountry,
                  province: NewWarehouse.province,
                  district: NewWarehouse.district,
                  ward: NewWarehouse.ward,
                }}
                label={['3. Tỉnh/TP', '4. Quận/huyện', '5. Phường/xã']}
                message={[
                  getMessage('addressProvince'),
                  getMessage('addressDistrict'),
                  getMessage('addressWard'),
                ]}
                className="mb-6"
                onChange={changeLocation}
              />
            </Fragment>
          );
        })()}
        {(() => {
          if (!CurrentWarehouse.filter((i) => i.province !== '').length) {
            if (!isAdd) {
              return (
                <Empty sx={{ minHeight: '400px' }}>
                  <Box>Không có kho hàng nào để hiển thị.</Box>
                  <Box className="mt-3">
                    <Button
                      variant="outlined"
                      sx={{ borderRadius: 0, textTransform: 'revert' }}
                      startIcon={<AddIcon />}
                      onClick={onChange}
                      disabled={ruleDisabled}
                    >
                      Thêm kho hàng
                    </Button>
                  </Box>
                </Empty>
              );
            }
            return null;
          }

          return (
            <Box>
              <Typography
                variant="h5"
                component="div"
                className="text-upper text-primary font-medium text-18 pb-3"
              >
                Danh sách kho hàng
              </Typography>
              <TableSticky className="mscb-table mscb-table-border">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center' }}>STT</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      Diện tích (m&sup2;)
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Địa chỉ</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Tỉnh/TP</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      Quận/huyện
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      Phường/xã
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      Địa chỉ chính
                    </TableCell>
                    {tool && (
                      <TableCell sx={{ textAlign: 'center' }}>
                        Thao tác
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {CurrentWarehouse.filter(
                    (i) =>
                      i.province !== '' && i.district !== '' && i.ward !== ''
                  ).map((w, index) => {
                    return (
                      <TableRow key={w.uuid}>
                        <TableCell sx={{ textAlign: 'center' }}>
                          {index + 1}
                        </TableCell>
                        <TableCell
                          className="font-medium"
                          sx={{ textAlign: 'right' }}
                        >
                          {formatNumber((w.area ?? '').toString())}
                        </TableCell>
                        <TableCell className="font-medium">
                          {w.apartment}
                        </TableCell>
                        <TableCell className="font-medium">
                          {Province.find((i) => i.code === w.province)?.name}
                        </TableCell>
                        <TableCell className="font-medium">
                          {
                            District[w.province]?.data?.find(
                              (i) => i.code === w.district
                            )?.name
                          }
                        </TableCell>
                        <TableCell className="font-medium">
                          {
                            Ward[w.district]?.data?.find(
                              (i) => i.code === w.ward
                            )?.name
                          }
                        </TableCell>
                        <TableCell
                          sx={{ textAlign: 'center', p: '0!important' }}
                        >
                          <Radio
                            checkedIcon={
                              <CheckCircleIcon sx={{ fontSize: '16px' }} />
                            }
                            icon={<RadioButtonIcon sx={{ fontSize: '16px' }} />}
                            checked={w.primary}
                            onClick={clickPrimary(w)}
                          />
                        </TableCell>
                        {
                          !ruleDisabled ? (
                            tool && (
                              <TableCell
                                sx={{ textAlign: 'center', p: '0!important' }}
                              >
                                <IconButton
                                  color="primary"
                                  onClick={onClickEdit(w)}
                                  size="small"
                                >
                                  <BsPencil style={{ fontSize: '1.3rem' }} />
                                </IconButton>
                                <IconButton
                                  color={'primary'}
                                  disabled={w.primary}
                                  onClick={onClickDelete(w)}
                                  size="small"
                                >
                                  <IoTrashOutline
                                    style={{ fontSize: '1.5rem' }}
                                  />
                                </IconButton>
                              </TableCell>
                            )
                          ) : (
                            <TableCell
                              sx={{ textAlign: 'center', p: '0!important' }}
                            >
                              <IconButton
                                color="primary"
                                onClick={onClickEdit(w)}
                                size="small"
                                disabled={ruleDisabled}
                              >
                                <BsPencil style={{ fontSize: '1.3rem' }} />
                              </IconButton>
                              <IconButton
                                color={'primary'}
                                disabled={ruleDisabled}
                                onClick={onClickDelete(w)}
                                size="small"
                              >
                                <IoTrashOutline
                                  style={{ fontSize: '1.5rem' }}
                                />
                              </IconButton>
                            </TableCell>
                          )

                          // tool &&
                          // <TableCell sx={{ textAlign: 'center', p: '0!important'}}>
                          //   <IconButton color="primary" onClick={ onClickEdit(w) } size="small">
                          //     <BsPencil style={{fontSize: '1.3rem'}}/>
                          //   </IconButton>
                          //   <IconButton
                          //     color={ 'primary' }
                          //     disabled={ w.primary }
                          //     onClick={ onClickDelete(w) }
                          //     size="small"
                          //   >
                          //     <IoTrashOutline style={{fontSize: '1.5rem'}}/>
                          //   </IconButton>
                          // </TableCell>
                        }
                      </TableRow>
                    );
                  })}
                </TableBody>
              </TableSticky>
            </Box>
          );
        })()}
      </Modal>
      <ModalConfirm
        open={DeleteId !== null}
        onClose={onCloseDelelte}
        onConfirm={onConfirmDelete}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc muốn xoá địa chỉ?
        </Box>
      </ModalConfirm>
    </Fragment>
  );
};

export default forwardRef(ModalWarehouse);
