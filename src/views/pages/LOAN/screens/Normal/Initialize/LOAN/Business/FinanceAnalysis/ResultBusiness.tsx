import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useFinanceMetadata from 'app/hooks/useFinanceMetadata';
import Input from 'views/components/base/Input';
import TableSticky from 'views/components/layout/TableSticky';
import Loading from 'views/components/base/Loading';
import Empty from 'views/components/layout/Empty';
import { formatNumber, generateUUID, intToRoman } from 'utils';
import { setLOANNormalStorageLOANFinanceGroupValue, setLOANNormalStorageLOANFinanceTypeValue } from 'features/loan/normal/storage/loan/actions';
import { ILOANNormalStorageLOANFinanceMetadataValue } from 'types/models/loan/normal/storage/LOAN';
import { getLOANNormalStorageLOANFinance } from 'features/loan/normal/storage/loan/selectors';
import useNormalLoanMessage from 'app/hooks/useNormalLoanMessage';

const ResultBusiness: FC = () => {

  const dispatch = useDispatch();
  const Finance = useSelector(getLOANNormalStorageLOANFinance);
  const { FinanceMetadata } = useFinanceMetadata();
  const getMessage = useNormalLoanMessage();
  const RB = FinanceMetadata?.find(f => f.group_id === 1);

  const changeGroup = (group: number, field: keyof ILOANNormalStorageLOANFinanceMetadataValue) => (value: string) => {
    value && dispatch(setLOANNormalStorageLOANFinanceGroupValue(
      value === '' ? null : +value,
      { obj: 'A', group, field }
    ))
  }

  const changeType = (group: number, type: number, field: keyof ILOANNormalStorageLOANFinanceMetadataValue) => 
    (value: string) => {
      dispatch(setLOANNormalStorageLOANFinanceTypeValue(
        value === '' ? null : +value,
        { obj: 'A', group, type, field }
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
      { RB?.group_name }
    </Typography>
    {(() => {
      if (!RB) return <Loading />;
      if (!RB.metadata_group_childes.length){
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
          {RB.metadata_group_childes?.map((group, gi) => {
            return [
              <TableRow className="mscb-table-row-title" key={ generateUUID() }>
                <TableCell className="text-center">{ intToRoman(gi + 1) }</TableCell>
                <TableCell>{ group.metadata_type_name }</TableCell>
                <TableCell className="text-right">
                  {
                    group.edit_flag ?
                    <Input 
                      value={ Finance.A?.find(r => r.id === group.metadata_type_id)?.data.T2?.toString() ?? '' }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeGroup(group.metadata_type_id, 'T2') }
                    /> :
                    <span className="text-danger font-medium">
                      {(() => {
                        const valGroup7 = Finance.A?.find(r => r.id === 7);
                        const list = Finance.A.find(r => r.id === 8)?.child?.map(c => c.data.T2).filter(d => d !== null);
                        const sum8 = list?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);

                        if (group.metadata_type_id === 8){
                          return list?.length ? formatNumber(sum8?.toString()) : '-';
                        }

                        if (group.metadata_type_id === 13){
                          if (valGroup7?.data.T2 === undefined || valGroup7?.data.T2 === null) return '-';
                          if (!list?.length) return formatNumber((valGroup7?.data.T2 ?? '').toString());
                          return formatNumber((valGroup7.data.T2 - (sum8 ?? 0)).toString());
                        }

                        return '';
                      })()}
                    </span>
                  }
                </TableCell>
                <TableCell className="text-right">
                  {
                    group.edit_flag ?
                    <Input 
                      value={ (Finance.A?.find(r => r.id === group.metadata_type_id)?.data.T1 ?? '').toString() }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeGroup(group.metadata_type_id, 'T1') }
                    /> :
                    <span className="text-danger font-medium">
                      {(() => {
                        const valGroup7 = Finance.A?.find(r => r.id === 7);
                        const list = Finance.A?.find(r => r.id === 8)?.child?.map(c => c.data.T1).filter(d => d !== null);
                        const sum8 = list?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);

                        if (group.metadata_type_id === 8){
                          return list?.length ? formatNumber(sum8?.toString()) : '-';
                        }

                        if (group.metadata_type_id === 13){
                          if (valGroup7?.data.T1 === undefined || valGroup7?.data.T1 === null) return '-';
                          if (!list?.length) return formatNumber((valGroup7?.data.T1 ?? '').toString());
                          return formatNumber((valGroup7.data.T1 - (sum8 ?? 0)).toString());
                        }

                        return '';
                      })()}
                    </span>
                  }
                </TableCell>
                <TableCell className="text-right text-normal">
                  {
                    group.edit_flag ?
                    <Input 
                      value={ (Finance.A?.find(r => r.id === group.metadata_type_id)?.data.T ?? '').toString() }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeGroup(group.metadata_type_id, 'T') }
                      message={ getMessage('business/finance-analysis', 'revenueT') }
                    /> :
                    <span className="text-danger font-medium">
                      {(() => {
                        const valGroup7 = Finance.A?.find(r => r.id === 7);
                        const list = Finance.A?.find(r => r.id === 8)?.child?.map(c => c.data.T).filter(d => d !== null);
                        const sum8 = list?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);

                        if (group.metadata_type_id === 8){
                          return list?.length ? formatNumber(sum8?.toString()) : '-';
                        }

                        if (group.metadata_type_id === 13){
                          if (valGroup7?.data.T === undefined || valGroup7?.data.T === null) return '-';
                          if (!list?.length) return formatNumber((valGroup7?.data.T ?? '').toString());
                          return formatNumber((valGroup7.data.T - (sum8 ?? 0)).toString());
                        }

                        return '';
                      })()}
                    </span>
                  }
                </TableCell>
                <TableCell className="text-right text-normal ">
                  {
                    group.edit_flag ?
                    <Input 
                      value={ (Finance.A?.find(r => r.id === group.metadata_type_id)?.data.KH ?? '').toString() }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeGroup(group.metadata_type_id, 'KH') }
                      message={ getMessage('business/finance-analysis', 'revenueT1KH') }
                    /> :
                    <span className="text-danger font-medium">
                      {(() => {
                        const valGroup7 = Finance.A?.find(r => r.id === 7);
                        const list = Finance.A?.find(r => r.id === 8)?.child?.map(c => c.data.KH).filter(d => d !== null);
                        const sum8 = list?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);

                        if (group.metadata_type_id === 8){
                          return list?.length ? formatNumber(sum8?.toString()) : '-';
                        }

                        if (group.metadata_type_id === 13){
                          if (valGroup7?.data.KH === undefined || valGroup7?.data.KH === null) return '-';
                          if (!list?.length) return formatNumber((valGroup7?.data.KH ?? '').toString());
                          return formatNumber((valGroup7.data.KH - (sum8 ?? 0)).toString());
                        }

                        return '';
                      })()}
                    </span>
                  }
                </TableCell>
                <TableCell className="text-right">
                  {
                    group.edit_flag ?
                    <Input 
                      value={ (Finance.A?.find(r => r.id === group.metadata_type_id)?.data.NVKD ?? '').toString() }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeGroup(group.metadata_type_id, 'NVKD') }
                      message={ getMessage('business/finance-analysis', 'revenueT1NVKD') }
                    /> :
                    <span className="text-danger font-medium">
                      {(() => {
                        const valGroup7 = Finance.A?.find(r => r.id === 7);
                        const list = Finance.A?.find(r => r.id === 8)?.child?.map(c => c.data.NVKD).filter(d => d !== null);
                        const sum8 = list?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);

                        if (group.metadata_type_id === 8){
                          return list?.length ? formatNumber(sum8?.toString()) : '-';
                        }

                        if (group.metadata_type_id === 13){
                          if (valGroup7?.data.NVKD === undefined || valGroup7?.data.NVKD === null) return '-';
                          if (!list?.length) return formatNumber((valGroup7?.data.NVKD ?? '').toString());
                          return formatNumber((valGroup7.data.NVKD - (sum8 ?? 0)).toString());
                        }

                        return '';
                      })()}
                    </span>
                  }
                </TableCell>
              </TableRow>,
              ...group.metadata_type_childes?.map((type, ti) => (
                <TableRow key={ generateUUID() }>
                  <TableCell className="text-center">{ ti + 1 }</TableCell>
                  <TableCell className="font-medium">{ type.metadata_name }</TableCell>
                  <TableCell>
                    <Input 
                      value={
                        Finance.A
                        ?.find(g => g.id === group.metadata_type_id)?.child
                        ?.find(t => t.id === type.metadata_id)?.data.T2
                        ?.toString() ?? ''
                      }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeType(group.metadata_type_id, type.metadata_id, 'T2') }
                      
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={
                        Finance.A
                        ?.find(g => g.id === group.metadata_type_id)?.child
                        ?.find(t => t.id === type.metadata_id)?.data.T1
                        ?.toString() ?? ''
                      }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeType(group.metadata_type_id, type.metadata_id, 'T1') }
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={
                        Finance.A
                        ?.find(g => g.id === group.metadata_type_id)?.child
                        ?.find(t => t.id === type.metadata_id)?.data.T
                        ?.toString() ?? ''
                      }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeType(group.metadata_type_id, type.metadata_id, 'T') }
                      message={ getMessage('business/finance-analysis',`T${type.metadata_id}` ) }
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={
                        Finance.A
                        ?.find(g => g.id === group.metadata_type_id)?.child
                        ?.find(t => t.id === type.metadata_id)?.data.KH
                        ?.toString() ?? ''
                      }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeType(group.metadata_type_id, type.metadata_id, 'KH') }
                      message={ getMessage('business/finance-analysis',`KH${ type.metadata_id}` ) }
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={
                        Finance.A
                        ?.find(g => g.id === group.metadata_type_id)?.child
                        ?.find(t => t.id === type.metadata_id)?.data.NVKD
                        ?.toString() ?? ''
                      }
                      type="number"
                      disabedNegative
                      format
                      onDebounce={ changeType(group.metadata_type_id, type.metadata_id, 'NVKD') }
                      message={ getMessage('business/finance-analysis',`NVKD${ type.metadata_id}` ) }
                    />
                  </TableCell>
                </TableRow>
              )) ?? []
            ]
          })}
        </TableBody>
      </TableSticky>
    })()}
  </Box>
  
}

export default ResultBusiness;