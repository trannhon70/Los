import { FC } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import clsx from 'clsx';
import imgEmpty from 'assets/images/empty.svg';
import emptyStyle from './style';
import Box from '@mui/material/Box';

export interface EmptyProps{
  className?: string;
  sx?: SxProps<Theme>;
}

const Empty: FC<EmptyProps> = props => {

  const classes = emptyStyle();
  const { children, className, sx } = props;
  const cls = clsx(classes.root, className, 'wh-full flex-center flex-column text-center');

  return <Box className={ cls } sx={ sx }>
    <img src={ imgEmpty } alt="Empty" />
    { children }
  </Box>

}

export default Empty;