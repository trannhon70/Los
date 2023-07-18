import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { FC, Fragment } from 'react';
import { ILOANNormalStorageRisksGroup } from 'types/models/loan/normal/storage/Other';
import Input from 'views/components/base/Input';
import TextArea from 'views/components/base/TextArea';
import SelectRiskType from 'views/components/widgets/SelectRiskType';

export interface RiskItemProps {
  data: ILOANNormalStorageRisksGroup;
  stt: number;
}

const RiskItem: FC<RiskItemProps> = (props) => {

  const { data, stt } = props;

  return <Fragment>
    <TableRow sx={{
      // borderBottom: '1px solid rgba(224, 224, 224, 1) !important',
      '&:last-child': {
        '& td': {
          borderBottom: 'unset !important'
        }
      }
    }}>
      <TableCell width="185px" className="pl-0" sx={{
        verticalAlign: "top",
        "& .ellipsis": {
          'color': 'var(--mscb-secondary) !important',
        }

      }}>
        <SelectRiskType
          label="1. Loại rủi ro"
          value={data.riskInfo}
          disabled
        />
      </TableCell>
      <TableCell 
        className="pr-0" 
        sx={{
          '& textarea':{
            height: 'unset!important',
            // minHeight: '36px!important'
            }
          }}>
        <TextArea
          label="2. Biện pháp hạn chế rủi ro"
          value={data.measuresLimitRisk}
          disabled
        />
      </TableCell>
    </TableRow>
  </Fragment>
}

export default RiskItem;