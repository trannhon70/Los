import { FC, Fragment } from 'react';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableClassificationInfo from './TableClassificationInfo';
import TableTotalValueAssets from './TableTotalValueAssets';
import TableInfoReportCollaretalType from '../CollaretalForm/TableInfoReportCollaretalType';

// TODO: Bất động sản
const RealEstateType: FC = () => {

  return (
    <Fragment>
      <Table>
        <TableBody>
          <TableInfoReportCollaretalType
          />
          <TableClassificationInfo
          />
          <TableTotalValueAssets
          />
        </TableBody>
      </Table >
    </Fragment>
  )
}

export default RealEstateType;