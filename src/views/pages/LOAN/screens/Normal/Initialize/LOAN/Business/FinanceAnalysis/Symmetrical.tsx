import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumber, generateUUID, intToRoman } from 'utils';
import { ILOANNormalStorageLOANFinanceMetadataValue } from 'types/models/loan/normal/storage/LOAN';
import { getLOANNormalStorageLOANFinance } from 'features/loan/normal/storage/loan/selectors';
import { 
  setLOANNormalStorageLOANFinanceGroupValue, 
  setLOANNormalStorageLOANFinanceTypeValue 
} from 'features/loan/normal/storage/loan/actions';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useFinanceMetadata from 'app/hooks/useFinanceMetadata';
import Input from 'views/components/base/Input';
import Loading from 'views/components/base/Loading';
import Empty from 'views/components/layout/Empty';
import TableSticky from 'views/components/layout/TableSticky';
import useNormalLoanMessage from 'app/hooks/useNormalLoanMessage';

const Symmetrical: FC = () => {

  const dispatch = useDispatch();
  const Finance = useSelector(getLOANNormalStorageLOANFinance);
  const getMessage = useNormalLoanMessage();
  const { FinanceMetadata } = useFinanceMetadata();
  const Sym = FinanceMetadata.find(f => f.group_id === 2);

  const changeGroup = (group: number, field: keyof ILOANNormalStorageLOANFinanceMetadataValue) => (value: string) => {
    value && dispatch(setLOANNormalStorageLOANFinanceGroupValue(
      value === '' ? null : +value,
      { obj: 'B', group, field }
    ))
  }

  const changeType = (group: number, type: number, field: keyof ILOANNormalStorageLOANFinanceMetadataValue) => 
    (value: string) => {
      dispatch(setLOANNormalStorageLOANFinanceTypeValue(
        value === '' ? null : +value,
        { obj: 'B', group, type, field }
      ))
    }

  return <Box className="mscb-input-table mscb-input-right">
    <Typography 
      variant="h4" 
      component="h4" 
      className="font-bold text-upper mt-6 mb-3" 
      sx={{
        fontSize: '19px'
      }}
    >
      { Sym?.group_name }
    </Typography>
    {(() => {
      if (!Sym) return <Loading />;
      if (!Sym.metadata_group_childes.length){
        return <Empty sx={{ height: '300px' }}>
          Không có dữ liệu để hiển thị
        </Empty>
      }

      return <TableSticky className="mscb-table mscb-table-border">
        <TableHead>
          <TableRow>
            <TableCell rowSpan={ 2 } className="text-center" width={ 60 }>STT</TableCell>
            <TableCell rowSpan={ 2 } className="text-center">Nội dung</TableCell>
            <TableCell rowSpan={ 2 } className="text-center" width={ 198 }>
              Kỳ T-2
              <span className="font-normal"> (VNĐ)</span>
            </TableCell>
            <TableCell rowSpan={ 2 } className="text-center" width={ 198 }>
              Kỳ T-1
              <span className="font-normal"> (VNĐ)</span>
            </TableCell>
            <TableCell rowSpan={ 2 } className="text-center" width={ 198 }>
              Kỳ T
              <span className="text-danger"> (*)</span>
              <span className="font-normal"> (VNĐ)</span>
            </TableCell>
            <TableCell colSpan={ 2 } className="text-center">
              Kỳ T+1
              <span className="text-danger"> (*)</span>
              <span className="font-normal"> (VNĐ)</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center" width={ 198 }>KH</TableCell>
            <TableCell className="text-center" width={ 198 }>NVKD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Sym?.metadata_group_childes.map((group, gi) => [
            <TableRow className="mscb-table-row-title" key={ generateUUID() }>
              <TableCell className="text-center">{ intToRoman(gi + 1) }</TableCell>
              <TableCell>{ group.metadata_type_name }</TableCell>
              <TableCell className="text-right">
                {
                  group.edit_flag ?
                  <Input 
                    value={ Finance.B.find(g => g.id === group.metadata_type_id)?.data.T2?.toString() ?? '' }
                    type="number"
                    disabedNegative
                    format
                    onDebounce={ changeGroup(group.metadata_type_id, 'T2') }
                  /> : 
                  <span className="text-danger font-medium">
                    {(() => {
                      const child = (Finance.B
                      .find(g => g.id === group.metadata_type_id)?.child
                      .map(t => t.data.T2)
                      .filter(c => c !== null) ?? []) as number[];
                      if (child.length){
                        return formatNumber(child.reduce((a, b) => a + b, 0).toString())
                      }
                      return '-';
                    })()}

                  </span>
                }
              </TableCell>
              <TableCell className="text-right">
                {
                  group.edit_flag ?
                  <Input 
                    value={ Finance.B.find(g => g.id === group.metadata_type_id)?.data.T1?.toString() ?? '' }
                    type="number"
                    disabedNegative
                    format
                    onDebounce={ changeGroup(group.metadata_type_id, 'T1') }
                  /> : 
                  <span className="text-danger font-medium">
                    {(() => {
                      const child = (Finance.B
                      .find(g => g.id === group.metadata_type_id)?.child
                      .map(t => t.data.T1)
                      .filter(c => c !== null) ?? []) as number[];
                      if (child.length){
                        return formatNumber(child.reduce((a, b) => a + b, 0).toString())
                      }
                      return '-';
                    })()}
                  </span>
                }
              </TableCell>
              <TableCell className="text-right">
                {
                  group.edit_flag ?
                  <Input 
                    value={ Finance.B.find(g => g.id === group.metadata_type_id)?.data.T?.toString() ?? '' }
                    type="number"
                    disabedNegative
                    format
                    onDebounce={ changeGroup(group.metadata_type_id, 'T') }
                  /> : 
                  <span className="text-danger font-medium">
                    {(() => {
                      const child = (Finance.B
                      .find(g => g.id === group.metadata_type_id)?.child
                      .map(t => t.data.T)
                      .filter(c => c !== null) ?? []) as number[];
                      if (child.length){
                        return formatNumber(child.reduce((a, b) => a + b, 0).toString())
                      }
                      return '-';
                    })()}
                  </span>
                }
              </TableCell>
              <TableCell className="text-right">
                {
                  group.edit_flag ?
                  <Input 
                    value={ Finance.B.find(g => g.id === group.metadata_type_id)?.data.KH?.toString() ?? '' }
                    type="number"
                    disabedNegative
                    format
                    onDebounce={ changeGroup(group.metadata_type_id, 'KH') }
                  /> : 
                  <span className="text-danger font-medium">
                    {(() => {
                      const child = (Finance.B
                      .find(g => g.id === group.metadata_type_id)?.child
                      .map(t => t.data.KH)
                      .filter(c => c !== null) ?? []) as number[];
                      if (child.length){
                        return formatNumber(child.reduce((a, b) => a + b, 0).toString())
                      }
                      return '-';
                    })()}
                  </span>
                }
              </TableCell>
              <TableCell className="text-right">
                {
                  group.edit_flag ?
                  <Input 
                    value={ Finance.B.find(g => g.id === group.metadata_type_id)?.data.NVKD?.toString() ?? '' }
                    type="number"
                    disabedNegative
                    format
                    onDebounce={ changeGroup(group.metadata_type_id, 'NVKD') }
                  /> : 
                  <span className="text-danger font-medium">
                    {(() => {
                      const child = (Finance.B
                      .find(g => g.id === group.metadata_type_id)?.child
                      .map(t => t.data.NVKD)
                      .filter(c => c !== null) ?? []) as number[];
                      if (child.length){
                        return formatNumber(child.reduce((a, b) => a + b, 0).toString())
                      }
                      return '-';
                    })()}
                  </span>
                }
              </TableCell>
            </TableRow>,
            ...group.metadata_type_childes?.map((type, ti) => (
              <TableRow key={ generateUUID() }>
                <TableCell className="text-center">{ ti + 1 }</TableCell>
                <TableCell className="font-medium">{ type.metadata_name }</TableCell>
                <TableCell className="text-right">
                  {
                    type.edit_flag ?
                    <Input 
                      value={ 
                        Finance.B
                        .find(g => g.id === group.metadata_type_id)?.child
                        .find(t => t.id === type.metadata_id)?.data.T2
                        ?.toString() ?? '' 
                      }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeType(group.metadata_type_id, type.metadata_id, 'T2') }

                    /> : 
                    <span className="text-danger font-medium">40.000.000</span>
                  }
                </TableCell>
                <TableCell className="text-right">
                  {
                    type.edit_flag ?
                    <Input 
                      value={ 
                        Finance.B
                        .find(g => g.id === group.metadata_type_id)?.child
                        .find(t => t.id === type.metadata_id)?.data.T1
                        ?.toString() ?? '' 
                      }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeType(group.metadata_type_id, type.metadata_id, 'T1') }
                      message={ getMessage('business/finance-analysis',`T1${group.metadata_type_id}` ) }

                    /> : 
                    <span className="text-danger font-medium">40.000.000</span>
                  }
                </TableCell>
                <TableCell className="text-right">
                  {
                    type.edit_flag ?
                    <Input 
                      value={ 
                        Finance.B
                        .find(g => g.id === group.metadata_type_id)?.child
                        .find(t => t.id === type.metadata_id)?.data.T
                        ?.toString() ?? '' 
                      }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeType(group.metadata_type_id, type.metadata_id, 'T') }
                      message={ getMessage('business/finance-analysis',`T${type.metadata_id}` ) }
                    /> : 
                    <span className="text-danger font-medium">40.000.000</span>
                  }
                </TableCell>
                <TableCell className="text-right">
                  {
                    type.edit_flag ?
                    <Input 
                      value={ 
                        Finance.B
                        .find(g => g.id === group.metadata_type_id)?.child
                        .find(t => t.id === type.metadata_id)?.data.KH
                        ?.toString() ?? '' 
                      }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeType(group.metadata_type_id, type.metadata_id, 'KH') }
                      message={ getMessage('business/finance-analysis',`KH${type.metadata_id}` ) }
                      /> : 
                    <span className="text-danger font-medium">40.000.000</span>
                  }
                </TableCell>
                <TableCell className="text-right">
                  {
                    type.edit_flag ?
                    <Input 
                      value={ 
                        Finance.B
                        .find(g => g.id === group.metadata_type_id)?.child
                        .find(t => t.id === type.metadata_id)?.data.NVKD
                        ?.toString() ?? '' 
                      }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeType(group.metadata_type_id, type.metadata_id, 'NVKD') }
                      message={ getMessage('business/finance-analysis',`NVKD${type.metadata_id}` ) }
                      /> : 
                    <span className="text-danger font-medium">40.000.000</span>
                  }
                </TableCell>
              </TableRow>
            )) ?? []
          ])}
        </TableBody>
      </TableSticky>
    })()}
  </Box>
  
}

export default Symmetrical;