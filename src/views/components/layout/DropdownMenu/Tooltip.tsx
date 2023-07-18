import { FC, ReactNode } from 'react';
import Tooltip from '@mui/material/Tooltip';

export interface DropdownMenuTooltipProps{
  tooltip?: ReactNode;
}

const DropdownMenuTooltip: FC<DropdownMenuTooltipProps> = props => {

  const { children, tooltip } = props;

  if (!tooltip) return <>{ children }</>
  return <Tooltip title={ <>{ tooltip }</> }>
    <>{ children }</>
  </Tooltip>

}

export default DropdownMenuTooltip;