import { FC } from 'react';
import Button from '@mui/material/Button';

export interface TabButtonProps{
  onSave?(): void;
  onContinue?(): void;
  className?: string;
}

const TabButton: FC<TabButtonProps> = props => {

  const { onSave, onContinue, className } = props;

  const onClickSave = () => {
    onSave && onSave();
  }

  const onClickContinue = () => {
    onContinue && onContinue();
  }

  return <div className={`${className} text-right border-top-1 pt-5`}>
    <Button variant="contained" className="ml-4 rounded-0 btn-gray">Thoát</Button>
    <Button variant="contained" className="ml-4 rounded-0" color="secondary">Quay lại</Button>
    <Button variant="contained" className="ml-4 rounded-0" color="success" onClick={ onClickSave }>Lưu</Button>
    <Button variant="contained" className="ml-4 rounded-0" color="primary" onClick={ onClickContinue }>Tiếp tục</Button>
  </div>

}

export default TabButton;