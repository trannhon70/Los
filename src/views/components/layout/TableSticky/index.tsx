import { ElementType, FC } from 'react';
import { Table, TableContainer, Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export interface TableStickyProps{
  className?: string;
  sx?: SxProps<Theme>;
  div?: boolean;
}

const TableSticky: FC<TableStickyProps> = props => {

  const { children, className, sx, div } = props;

  return <TableContainer 
    sx={ sx } 
    className={ className } 
    component={ (div ? 'div' : undefined) as ElementType<any> }
  >
    <Table stickyHeader>
      { children }
    </Table>
  </TableContainer>

}

export default TableSticky;