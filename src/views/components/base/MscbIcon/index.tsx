import { FC } from 'react';
import clsx from 'clsx';

export interface MscbIconProps{
  icon: string;
  size?: 'lg' | 'xl';
  className?: string;
}

export interface MscbIconComponent extends FC<MscbIconProps>{}

const MscbIcon: MscbIconComponent = props => {

  const { className, icon, size } = props;

  let prefix = '';
  const arrIcon = icon.split('-');

  switch(arrIcon[0]){
    case 'tio':
      prefix = 'tio-';
      break;
  }

  return <i className={ clsx(icon, { [`${ prefix }${ size }`]: !!size }, className) } />

}

export default MscbIcon;
