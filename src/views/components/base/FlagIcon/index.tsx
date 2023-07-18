import { FC } from 'react';
import clsx from 'clsx';

export interface FlagIconProps{
  className?: string;
  code: string;
}

const FlagIcon: FC<FlagIconProps> = props => {

  const { className, code } = props;
  const iconClass = clsx('mscb-flag-icon flag-icon', 'flag-icon-' + code, className);

  return <span className={ iconClass } />

}

export default FlagIcon;