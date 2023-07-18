import { FC } from 'react';
import clsx from 'clsx';
import Button from '@mui/material/Button';

export interface ButtonBarProps {
  className?: string;
  onExit?(): void;
  onBack?(): void;
  onSave?(): void;
  onContinue?(): void;
  disableExit?: boolean;
  disableBack?: boolean;
  disableSave?: boolean;
  disableContinue?: boolean;
  hideExit? :boolean,
  hideBack? :boolean,
  hideSave?: boolean,
  hideContinue?: boolean
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
    hideExit,
    hideBack,
    hideSave,
    hideContinue,
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

  return <div className={clsx('text-right', className)}>
   {!hideExit && <Button
      variant="contained"
      className="ml-4 rounded-0 font-medium"
      disabled={disableExit}
      onClick={onClickExit}
      sx={{ minWidth: '100px', bgcolor: '#7d7d7d' }}
    >Thoát</Button>}
    {!hideBack && <Button
      variant="contained"
      className="ml-4 rounded-0 btn-black"
      disabled={disableBack}
      onClick={onClickBack}
      sx={{ minWidth: '100px' }}
    >Quay lại</Button>}
    {!hideSave && <Button
      variant="contained"
      className="ml-4 rounded-0"
      color="success"
      onClick={onClickSave}
      disabled={disableSave}
      sx={{ minWidth: '100px' }}
    >Xử lí thẩm định</Button>}
    {!hideContinue && <Button
      disabled={disableContinue}
      variant="contained"
      className="ml-4 rounded-0"
      color="primary"
      onClick={onClickContinue}
      sx={{ minWidth: '100px' }}
    >Tiếp tục</Button>}
  </div>
}

export default ButtonBar;