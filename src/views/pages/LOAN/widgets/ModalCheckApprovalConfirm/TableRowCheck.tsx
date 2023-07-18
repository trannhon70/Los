import { Collapse, IconButton, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { FC, useState } from "react";
import clsx from "clsx";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { IStatePassPositon } from 'types/models/loan/normal/storageGuide';
import { TiTick } from 'react-icons/ti';
import { FaMinus } from 'react-icons/fa';
import { APP_DATE_FORMAT } from 'utils/constants';
import { timestampToDate } from 'utils/date';
// import { TiTick } from 'react-icons'

export interface ModalApply {
  username: string | number;
  reason: string;
}

export interface ITableRowCheckProps {
  onClose?: () => void;
  onSave?: () => void;
  row: IStatePassPositon
  idx?: number | string;
}

export interface RenderTreeData {
  id: string;
  menu_id: string;
  idx: number | string;
  name: string;
  rank: string;
  is_active: number;
  date: string;
  status: boolean;
  children?: RenderTreeData[];
}


const TableRowCheck: FC<ITableRowCheckProps> = props => {

  const { row } = props
  const [open, setOpen] = useState(false);
  // console.log('open',open)
  return (
    <>
      {
        (() => {
          if (row.children?.length) {
            return (
              <>
                <TableRow className={clsx(`level${row.level}`, "childless")}>
                  <TableCell width="50%" align='left' className='justify-start' >
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />}
                    </IconButton>
                    {row.label}
                  </TableCell>
                  <TableCell className="checked-date" width="25%" >
                    {row.is_passed ? <TiTick size={"20px"} color="#00bf20" /> : <FaMinus size={"16px"} color="#eb0029" />}
                  </TableCell>
                  <TableCell align="center" className='date-modal' width="25%" >
                    {row.updated_at ? (timestampToDate(row.updated_at, 'HH:mm ' + APP_DATE_FORMAT)) : "-"}
                  </TableCell>
                </TableRow>

                <TableRow >
                  <TableCell
                    style={{
                      margin: 0,
                      padding: 0,
                      paddingBottom: 0,
                      paddingTop: 0,
                      borderBottom: 0,
                      width:"100%"
                    }}
                    colSpan={12}
                    component="div"
                  >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Table className="mscb-table mscb-table-border modal-level2">
                        <TableBody>
                          {row.children.map((item) => (
                            <TableRowCheck key={item.code} row={item} idx={""} />
                          ))}
                        </TableBody>
                      </Table>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            );
          }
          return (
            <>
              <TableRow className={clsx(`level${row.level}`, "childless")}>
                {/* <TableRow component="div"> */}
                <TableCell width="50%" align='left' className='justify-start'>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />} 
                  </IconButton>
                  {row.label}
                </TableCell>
                <TableCell align="center" className="checked-date" width="25%">
                  {row.is_passed ? <TiTick size={"20px"} color="#00bf20" /> : <FaMinus size={"16px"} color="#eb0029" />}
                </TableCell>
                <TableCell align="center" className='date-modal' width="25%">
                  {row.updated_at ? (timestampToDate(row.updated_at, 'HH:mm ' + APP_DATE_FORMAT)) : "-"}
                </TableCell>
              </TableRow>
            </>
          );
        })()
      }
    </>
  )
}
export default TableRowCheck;