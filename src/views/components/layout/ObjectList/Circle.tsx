import { FC } from 'react';
import clsx from 'clsx';
import Avatar from '@mui/material/Avatar';

export interface ObjectListCircleProps{
  bgPrimary?: boolean;
  enableUser?: boolean;
}

const ObjectListCircle: FC<ObjectListCircleProps> = props => {

  const { bgPrimary, children, enableUser } = props;

  return <Avatar 
    className={ clsx("object-list-circle", { 'bg-primary': bgPrimary }) }
  >{ children !== undefined ? children : enableUser ? undefined : '' }</Avatar>

}

export default ObjectListCircle;