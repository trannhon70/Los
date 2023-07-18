import { FC } from 'react';
import { RiFileCopy2Line } from 'react-icons/ri'
import clsx from 'clsx';
import iconStyle from './style';

export interface IconCopyProps{
  className?: string;
  onClick?(): void;
}

const IconCopy: FC<IconCopyProps> = props => {

  const { className, onClick } = props;
  const classes = iconStyle();

  return <span className={ clsx(classes.IconCopy, 'flex-center', className) } onClick={ onClick }>
    <RiFileCopy2Line color="var(--mscb-danger)"size="15px"/>
  </span>

}

export default IconCopy;