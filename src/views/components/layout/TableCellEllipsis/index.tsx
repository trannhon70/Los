import { FC } from 'react';
import { TableCell, TableCellProps } from '@mui/material';

import TextTooltip from './../../base/TextTooltip/index';


const TableCellEllipsis :FC<TableCellProps> = (props) => {
const { children } = props

  return <TableCell {...props} >
      <TextTooltip >
        {children}
      </TextTooltip>
  </TableCell>

}

export default TableCellEllipsis