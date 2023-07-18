import { FC, Fragment } from 'react';
import { TableCell, TableRow, Skeleton } from '@mui/material';

export interface SkeletonRowProps {
  rowNumber: number,
  cellNumber: number,
  animation?: 'wave' | 'pulse',
}

const SkeletonRow: FC<SkeletonRowProps> = (props) => {
  const { rowNumber, cellNumber, animation = 'wave' } = props
  const row = Array(rowNumber).fill('')
  const cell = Array(cellNumber).fill('')

  return (<Fragment>
    {
      row.map((i,idx) => (<TableRow key={idx}>
        {
          cell.map((j,jdx) => (
            <TableCell key={jdx}>
              <Skeleton height="100%" animation={animation} width="100%" />
            </TableCell>
          ))
        }
      </TableRow>
      ))
    }
  </Fragment>)

}

export default SkeletonRow