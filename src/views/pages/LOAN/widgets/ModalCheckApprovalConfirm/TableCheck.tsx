import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import clsx from 'clsx';
import { FC } from "react";
import { IStatePassPositon } from 'types/models/loan/normal/storageGuide';
import collapsibleTablePermissionStyle from './style';
import TableRowCheck from "./TableRowCheck";

export interface ModalApply {
  username: string | number;
  reason: string;
}

export interface ITableCheckProps {
  data: IStatePassPositon[];
}

const TableCheck: FC<ITableCheckProps> = props => {

  const { data } = props
  const classes = collapsibleTablePermissionStyle();

  return (
    <>
      <TableContainer  className={clsx(classes.root, "table-check-confirm mscb-table mscb-table-border mt-5")} >
        <Table aria-label="collapsible table">
          <TableHead >
            <TableRow >
              <TableCell sx={{color:"#1825aa !important"}} width="50%" align='center'>DANH MỤC</TableCell>
              <TableCell sx={{color:"#1825aa !important"}} width="25%" align='center'>ĐÃ PHÊ DUYỆT</TableCell>
              <TableCell sx={{color:"#1825aa !important"}} width="25%" align='center'>THỜI GIAN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data && data.map((item, index) => (
                <TableRowCheck key={item.code} row={item} />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default TableCheck;