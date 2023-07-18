import Button from '@mui/material/Button';
import clsx from 'clsx';
import { FC } from 'react';

export interface ButtonBarProps {
  className?: string;
  onExit?(): void;
  onBack?(): void;
  onSave?(): void;
  onContinue?(): void;
  onDelete?(): void;
  labelSave?:string;
  disableExit?: boolean;
  disableBack?: boolean;
  disableSave?: boolean;
  disableContinue?: boolean;
  disableDelete?: boolean;
  hideDelete?: boolean;
  titleApply?: string; // đệ trình
  isApply?: boolean; // check đệ trình
  isDelete?:boolean;
}

const ButtonBar: FC<ButtonBarProps> = props => {

  const {
    className,
    onExit,
    disableExit,
    onBack,
    disableBack,
    disableSave,
    onSave,
    disableContinue,
    onContinue,
    onDelete,
    disableDelete,
    hideDelete,
    titleApply,
    isApply,
    labelSave = "Lưu",
    isDelete = true,
  } = props;

  const onClickExit = () => {
    !disableExit && onExit && onExit();
  }

  const onClickBack = () => {
    !disableBack && onBack && onBack();
  }

  const onClickSave = () => {
    !disableSave && onSave && onSave();
  }

  const onClickContinue = () => {
    !disableContinue && onContinue && onContinue();
  }

  const onClickDelete = () => {
    !disableDelete && onDelete && onDelete();
  }



  return <div className={clsx('text-right', className)}>
    <Button
      variant="contained"
      className="ml-4 rounded-0 font-medium"
      disabled={disableExit}
      onClick={onClickExit}
      sx={{ minWidth: '100px', bgcolor: '#7d7d7d' }}
    >Thoát</Button>
    <Button
      variant="contained"
      className="ml-4 rounded-0 btn-black"
      disabled={disableBack}
      onClick={onClickBack}
      sx={{ minWidth: '100px' }}
    >Quay lại</Button>
    {isDelete && <Button
      variant="contained"
      className="ml-4 rounded-0"
      disabled={disableDelete}
      color="error"
      onClick={onClickDelete}
      sx={{ minWidth: '100px' }}
    >Xóa</Button>}
    <Button
      variant="contained"
      className="ml-4 rounded-0"
      color="success"
      onClick={onClickSave}
      disabled={disableSave}
      sx={{ minWidth: '100px' }}
    >{labelSave}</Button>
    {isApply ?
      <Button
        variant="contained"
        className="ml-4 rounded-0"
        color="success"
        onClick={onClickSave}
        disabled={disableSave}
        sx={{ minWidth: '100px' }}
      >{titleApply}</Button> : null}
    <Button
      disabled={disableContinue}
      variant="contained"
      className="ml-4 rounded-0"
      color="primary"
      onClick={onClickContinue}
      sx={{ minWidth: '100px' }}
    >Tiếp tục</Button>
  </div>
}

export default ButtonBar;