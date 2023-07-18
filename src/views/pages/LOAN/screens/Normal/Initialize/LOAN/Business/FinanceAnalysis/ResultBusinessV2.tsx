import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import useFinanceMetadata from 'app/hooks/useFinanceMetadata';
import useNormalLoanMessage from 'app/hooks/useNormalLoanMessage';
import { setLOANNormalStorageLOANFinanceGroupValue } from 'features/loan/normal/storage/loan/actions';
import { getLOANNormalStorageLOANFinance } from 'features/loan/normal/storage/loan/selectors';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { ILOANNormalStorageLOANFinanceMetadataValue } from 'types/models/loan/normal/storage/LOAN';
import { formatNumber } from 'utils';
import Numberbox from 'views/components/base/Numberbox';
import TableSticky from 'views/components/layout/TableSticky';

const ResultBusinessV2: FC = () => {

  const dispatch = useDispatch();
  const Finance = useSelector(getLOANNormalStorageLOANFinance);
  const ruleDisabled = useSelector(getRuleDisbled)
  // const { FinanceMetadata } = useFinanceMetadata();
  const getMessage = useNormalLoanMessage();
  // const RB = FinanceMetadata?.find(f => f.group_id === 1);

  const changeGroup = (group: number, field: keyof ILOANNormalStorageLOANFinanceMetadataValue) => (value: string) => {
    dispatch(setLOANNormalStorageLOANFinanceGroupValue(
      value === '' ? null : +value,
      { obj: 'A', group, field }
    ))
  }

  // // giá vốn hàng bán
  // const sold = Finance.A?.find(item => item.id=== 9)
  //   // chi phí quản lí
  //   const managementCosts = Finance.A?.find(item => item.id=== 10)
  //     // chi phí lãi vay
  // const interestExpenses = Finance.A?.find(item => item.id=== 11)
  //   // chi phí khác
  // const otherCosts = Finance.A?.find(item => item.id=== 12)

  // const countTotalCostT2 = () =>{
  //   return {
  //     t2:(sold?.data.T2 ?? 0) 
  //       + (managementCosts?.data.T2 ?? 0) 
  //       + (interestExpenses?.data.T2 ?? 0)
  //       + (otherCosts?.data.T2 ?? 0),
  //     t1:(sold?.data.T1 ?? 0) 
  //     + (managementCosts?.data.T1 ?? 0) 
  //     + (interestExpenses?.data.T1 ?? 0)
  //     + (otherCosts?.data.T1 ?? 0),
  //     t:(sold?.data.T ?? 0) 
  //     + (managementCosts?.data.T ?? 0) 
  //     + (interestExpenses?.data.T ?? 0)
  //     + (otherCosts?.data.T ?? 0),
  //     kh:(sold?.data.KH ?? 0) 
  //     + (managementCosts?.data.KH ?? 0) 
  //     + (interestExpenses?.data.KH ?? 0)
  //     + (otherCosts?.data.KH ?? 0),
  //     nvkd:(sold?.data.NVKD ?? 0) 
  //     + (managementCosts?.data.NVKD ?? 0) 
  //     + (interestExpenses?.data.NVKD ?? 0)
  //     + (otherCosts?.data.NVKD ?? 0),

  //   }
  // }


  return <Box className="mscb-input-table mscb-input-right">
    <Typography 
      variant="h4" 
      component="h4" 
      className="font-bold text-upper mt-6 mb-3" 
      sx={{
        fontSize: '19px'
      }}
    >
      A. Bảng kết quả hoạt động kinh doanh
    </Typography>
    {(() => {
      // if (!RB) return <Loading />;
      // if (!RB.metadata_group_childes.length){
      //   return <Empty sx={{ height: '300px' }}>
      //     Không có dữ liệu để hiển thị
      //   </Empty>
      // }

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
          <TableRow className='mscb-table-row-title'>
            <TableCell align="center" className="">I</TableCell>
            <TableCell align="left">Doanh thu thuần</TableCell>
            <TableCell align="right"> 
              <Numberbox 
                comma
                integer
                format
                type="number"
                value={ (Finance.A?.find(r => r.id === 7)?.data.T2 ?? '').toString() }
                disabled={ ruleDisabled }
                onDebounce={ changeGroup(7,'T2') } 
              /> 
             </TableCell>
             <TableCell align="right"> 
              <Numberbox 
                comma
                integer 
                type="number"
                format
                value={ (Finance.A?.find(r => r.id === 7)?.data.T1 ?? '').toString() }
                disabled={ ruleDisabled }
                onDebounce={ changeGroup(7,'T1') } 
                /> 
             </TableCell> 
             <TableCell align="right" className="text-normal"> 
              <Numberbox 
                comma
                integer 
                type="number"
                format
                value={ (Finance.A?.find(r => r.id === 7)?.data.T ?? '').toString() }
                disabled={ ruleDisabled }
                onDebounce={ changeGroup(7,'T') } 
                message={ getMessage('business/finance-analysis', 'revenueT') }
                /> 
             </TableCell> 
             <TableCell align="right" className="text-normal"> 
              <Numberbox 
                comma
                integer 
                type="number"
                format
                value={ (Finance.A?.find(r => r.id === 7)?.data.KH ?? '').toString() }
                disabled={ ruleDisabled }
                onDebounce={ changeGroup(7,'KH') } 
                message={ getMessage('business/finance-analysis', 'revenueKH') }
                /> 
             </TableCell> 
             <TableCell align="right" className="text-normal"> 
              <Numberbox 
                comma
                integer 
                type="number"
                format
                value={ (Finance.A?.find(r => r.id === 7)?.data.NVKD ?? '').toString() }
                disabled={ ruleDisabled }
                onDebounce={ changeGroup(7,'NVKD') } 
                message={ getMessage('business/finance-analysis', 'revenueNVKD') }
                /> 
             </TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-title'>
            <TableCell align="center">II</TableCell>
            <TableCell align="left">Tổng chi phí</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.A?.find(r => r.id === 8)?.data.T2 ?? 0).toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.A?.find(r => r.id === 8)?.data.T1 ?? 0).toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.A?.find(r => r.id === 8)?.data.T ?? 0).toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.A?.find(r => r.id === 8)?.data.KH ?? 0).toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.A?.find(r => r.id === 8)?.data.NVKD ?? 0).toString())}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell align="center">1</TableCell>
            <TableCell align="left" className="font-medium">Giá vốn hàng bán</TableCell>
            <TableCell align="right">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 9)?.data.T2 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(9,'T2') } 
                  message={ getMessage('business/finance-analysis',`T29` ) }
                />  
            </TableCell>
            <TableCell align="right">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 9)?.data.T1 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(9,'T1') } 
                  message={ getMessage('business/finance-analysis',`T19` ) }
                />  
            </TableCell> 
            <TableCell align="right" className="text-normal">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 9)?.data.T ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(9,'T') } 
                  message={ getMessage('business/finance-analysis',`T9` ) }

                />  
            </TableCell> 
            <TableCell align="right" className="text-normal">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 9)?.data.KH ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(9,'KH') } 
                  message={ getMessage('business/finance-analysis',`KH9` ) }
                  />  
            </TableCell> 
            <TableCell align="right" className="text-normal">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 9)?.data.NVKD ?? '').toString() }
                  message={ getMessage('business/finance-analysis',`NVKD9` ) }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(9,'NVKD') } 
                  />  
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">2</TableCell>
            <TableCell align="left" className="font-medium">Chi phí quản lý</TableCell>
            <TableCell align="right">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 10)?.data.T2 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(10,'T2') } 
                  />  
            </TableCell>
            <TableCell align="right">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 10)?.data.T1 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(10,'T1') } 
                  />  
            </TableCell> 
            <TableCell align="right" className="text-normal">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 10)?.data.T ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(10,'T') } 
                  message={ getMessage('business/finance-analysis',`T10` ) }
                  />  
            </TableCell> 
            <TableCell align="right" className="text-normal">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 10)?.data.KH ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(10,'KH') } 
                  message={ getMessage('business/finance-analysis',`KH10` ) }
                  />  
            </TableCell> 
            <TableCell align="right" className="text-normal">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 10)?.data.NVKD ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(10,'NVKD') } 
                  message={ getMessage('business/finance-analysis',`NVKD10` ) }
                  />  
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">3</TableCell>
            <TableCell align="left" className="font-medium">Chi phí lãi vay</TableCell>
            <TableCell align="right">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 11)?.data.T2 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(11,'T2') } 
                  />  
            </TableCell>
            <TableCell align="right">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 11)?.data.T1 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(11,'T1') } 
                  />  
            </TableCell> 
            <TableCell align="right" className="text-normal">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 11)?.data.T ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(11,'T') } 
                  message={ getMessage('business/finance-analysis',`T11` ) }
                  />  
            </TableCell> 
            <TableCell align="right" className="text-normal">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 11)?.data.KH ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(11,'KH') } 
                  message={ getMessage('business/finance-analysis',`KH11` ) }
                  />  
            </TableCell> 
            <TableCell align="right" className="text-normal">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 11)?.data.NVKD ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(11,'NVKD') } 
                  message={ getMessage('business/finance-analysis',`NVKD11` ) }
                  />  
            </TableCell>
          </TableRow>
          <TableRow className="mscb-table-border ">
            <TableCell align="center">4</TableCell>
            <TableCell align="left" className="font-medium">Chi phí khác</TableCell>
            <TableCell align="right">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 12)?.data.T2 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(12,'T2') } 
                  />  
            </TableCell>
            <TableCell align="right">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 12)?.data.T1 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(12,'T1') } 
                  />  
            </TableCell> 
            <TableCell align="right" className="text-normal">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 12)?.data.T ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(12,'T') } 
                  message={ getMessage('business/finance-analysis',`T12` ) }
                  />  
            </TableCell> 
            <TableCell align="right" className="text-normal">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 12)?.data.KH ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(12,'KH') } 
                  message={ getMessage('business/finance-analysis',`KH12` ) }
                  />  
            </TableCell> 
            <TableCell align="right" className="text-normal">
              <Numberbox 
                comma
                integer 
                  type="number"
                  format
                  value={ (Finance.A?.find(r => r.id === 12)?.data.NVKD ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(12,'NVKD') } 
                  message={ getMessage('business/finance-analysis',`NVKD12` ) }
                  />  
            </TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-title'>
            <TableCell align="center">III</TableCell>
            <TableCell align="left">Lợi nhuân ròng</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.A?.find(r => r.id === 13)?.data.T2 ?? 0).toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.A?.find(r => r.id === 13)?.data.T1 ?? 0).toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.A?.find(r => r.id === 13)?.data.T ?? 0).toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.A?.find(r => r.id === 13)?.data.KH ?? 0).toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.A?.find(r => r.id === 13)?.data.NVKD ?? 0).toString())}</TableCell>
          </TableRow>
          
        </TableBody>
      </TableSticky>
    })()}
  </Box>
  
}

export default ResultBusinessV2;