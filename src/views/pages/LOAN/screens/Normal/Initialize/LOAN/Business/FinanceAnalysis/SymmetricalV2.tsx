import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {
  setLOANNormalStorageLOANFinanceGroupValue
} from 'features/loan/normal/storage/loan/actions';
import { getLOANNormalStorageLOANFinance } from 'features/loan/normal/storage/loan/selectors';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalStorageLOANFinanceMetadataValue } from 'types/models/loan/normal/storage/LOAN';
import { formatNumber } from 'utils';
// import useFinanceMetadata from 'app/hooks/useFinanceMetadata';
import useNormalLoanMessage from 'app/hooks/useNormalLoanMessage';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import Numberbox from 'views/components/base/Numberbox';
import TableSticky from 'views/components/layout/TableSticky';

const SymmetricalV2: FC = () => {

  const dispatch = useDispatch();
  const Finance = useSelector(getLOANNormalStorageLOANFinance);
  const ruleDisabled = useSelector(getRuleDisbled)
  const getMessage = useNormalLoanMessage();
  // const { FinanceMetadata } = useFinanceMetadata();
  // const Sym = FinanceMetadata.find(f => f.group_id === 2);

  const changeGroup = (group: number, field: keyof ILOANNormalStorageLOANFinanceMetadataValue) => (value: string) => {
    dispatch(setLOANNormalStorageLOANFinanceGroupValue(
      value === '' ? null : +value,
      { obj: 'B', group, field }
    ))
  }


  // // Tiền mặt / Tiền gửi ngân hàng
  // const cash_bankDeposits = Finance.B?.find(item=>item.id === 15)
  // // Hàng tồn kho
  // const inventory = Finance.B?.find(item=>item.id === 16)
  // // Phải thu khách hàng
  // const recievableCustomer = Finance.B?.find(item=>item.id === 17)
  // // Tài sản cố định
  // const aseet = Finance.B?.find(item=>item.id === 18)
  // //Tong tai sản
  // const toltalAsset = {
  //   T2:((cash_bankDeposits?.data.T2 ?? 0) + (inventory?.data.T2 ?? 0) + (recievableCustomer?.data.T2 ?? 0) + (aseet?.data.T2 ?? 0)),
  //   T1:((cash_bankDeposits?.data.T1 ?? 0) + (inventory?.data.T1 ?? 0) + (recievableCustomer?.data.T1 ?? 0) + (aseet?.data.T1 ?? 0)),
  //   T:((cash_bankDeposits?.data.T ?? 0) + (inventory?.data.T ?? 0) + (recievableCustomer?.data.T ?? 0) + (aseet?.data.T ?? 0)),
  //   KH:((cash_bankDeposits?.data.KH ?? 0) + (inventory?.data.KH ?? 0) + (recievableCustomer?.data.KH ?? 0) + (aseet?.data.KH ?? 0)),
  //   NVKD:((cash_bankDeposits?.data.NVKD ?? 0) + (inventory?.data.NVKD ?? 0) + (recievableCustomer?.data.NVKD ?? 0) + (aseet?.data.NVKD ?? 0)),
  // }

  //   // Phải trả khách hàng
  //   const returnCus = Finance.B?.find(item=>item.id === 20)
  //   // Vay ngân hàng
  //   const loanBank = Finance.B?.find(item=>item.id === 21)
  //   // Vay khác
  //   const loanOther = Finance.B?.find(item=>item.id === 22)
  //   // Vốn chủ sở hữu
  //   const capitolOwn = Finance.B?.find(item=>item.id === 23)
  //   //Tong nguồn vốn
  //   const toltalCapital = {
  //     T2:((returnCus?.data.T2 ?? 0) + (loanBank?.data.T2 ?? 0) + (loanOther?.data.T2 ?? 0) + (capitolOwn?.data.T2 ?? 0)),
  //     T1:((returnCus?.data.T1 ?? 0) + (loanBank?.data.T1 ?? 0) + (loanOther?.data.T1 ?? 0) + (capitolOwn?.data.T1 ?? 0)),
  //     T:((returnCus?.data.T ?? 0) + (loanBank?.data.T ?? 0) + (loanOther?.data.T ?? 0) + (capitolOwn?.data.T ?? 0)),
  //     KH:((returnCus?.data.KH ?? 0) + (loanBank?.data.KH ?? 0) + (loanOther?.data.KH ?? 0) + (capitolOwn?.data.KH ?? 0)),
  //     NVKD:((returnCus?.data.NVKD ?? 0) + (loanBank?.data.NVKD ?? 0) + (loanOther?.data.NVKD ?? 0) + (capitolOwn?.data.NVKD ?? 0)),
  //   }
  

  return <Box className="mscb-input-table mscb-input-right">
    <Typography 
      variant="h4" 
      component="h4" 
      className="font-bold text-upper mt-6 mb-3" 
      sx={{
        fontSize: '19px'
      }}
    >
      B. Bảng cân đối tài sản - nguồn vốn
    </Typography>
    {(() => {
      // if (!Sym) return <Loading />;
      // if (!Sym.metadata_group_childes.length){
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
            <TableCell align="center">I</TableCell>
            <TableCell align="left">Tổng tài sản</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.B?.find(r => r.id === 14)?.data.T2 ?? '0').toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.B?.find(r => r.id === 14)?.data.T1 ?? '0').toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.B?.find(r => r.id === 14)?.data.T ?? '0').toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.B?.find(r => r.id === 14)?.data.KH ?? '0').toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.B?.find(r => r.id === 14)?.data.NVKD ?? '0').toString())}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell align="center">1</TableCell>
            <TableCell align="left" className="font-medium">Tiền mặt / Tiền gửi ngân hàng</TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                type="number"
                format
                value={ (Finance.B?.find(r => r.id === 15)?.data.T2 ?? '').toString() }
                disabled={ ruleDisabled }
                onDebounce={ changeGroup(15,'T2') } 
                />  
            </TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 15)?.data.T1 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(15,'T1') } 
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 15)?.data.T ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(15,'T') } 
                  message={ getMessage('business/finance-analysis', 'T15') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 15)?.data.KH ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(15,'KH') } 
                  message={ getMessage('business/finance-analysis', 'KH15') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 15)?.data.NVKD ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(15,'NVKD') }
                  message={ getMessage('business/finance-analysis', 'NVKD15') } 
                  />  
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">2</TableCell>
            <TableCell align="left" className="font-medium">Hàng tồn kho</TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 16)?.data.T2 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(16,'T2') } 
                  />  
            </TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 16)?.data.T1 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(16,'T1') } 
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 16)?.data.T ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(16,'T') } 
                  message={ getMessage('business/finance-analysis', 'T16') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 16)?.data.KH ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(16,'KH') } 
                  message={ getMessage('business/finance-analysis', 'KH16') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 16)?.data.NVKD ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(16,'NVKD') } 
                  message={ getMessage('business/finance-analysis', 'NVKD16') }
                  />  
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">3</TableCell>
            <TableCell align="left" className="font-medium">Phải thu khách hàng</TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 17)?.data.T2 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(17,'T2') } 
                  />  
            </TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 17)?.data.T1 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(17,'T1') } 
                />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 17)?.data.T ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(17,'T') } 
                  message={ getMessage('business/finance-analysis', 'T17') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 17)?.data.KH ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(17,'KH') } 
                  message={ getMessage('business/finance-analysis', 'KH17') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 17)?.data.NVKD ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(17,'NVKD') } 
                  message={ getMessage('business/finance-analysis', 'NVKD17') }
                  />  
            </TableCell>
          </TableRow>
          <TableRow className="mscb-table-border ">
            <TableCell align="center">4</TableCell>
            <TableCell align="left" className="font-medium">Tài sản cố định</TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 18)?.data.T2 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(18,'T2') } 
                  />  
            </TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 18)?.data.T1 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(18,'T1') } 
                />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 18)?.data.T ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(18,'T') } 
                  message={ getMessage('business/finance-analysis', 'T18') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 18)?.data.KH ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(18,'KH') } 
                  message={ getMessage('business/finance-analysis', 'T18') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 18)?.data.NVKD ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(18,'NVKD') } 
                  message={ getMessage('business/finance-analysis', 'T18') }
                  />  
            </TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-title'>
            <TableCell align="center">II</TableCell>
            <TableCell align="left">Nguồn vốn</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.B?.find(r => r.id === 19)?.data.T2 ?? '0').toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.B?.find(r => r.id === 19)?.data.T1 ?? '0').toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.B?.find(r => r.id === 19)?.data.T ?? '0').toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.B?.find(r => r.id === 19)?.data.KH ?? '0').toString())}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{formatNumber((Finance.B?.find(r => r.id === 19)?.data.NVKD ?? '0').toString())}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell align="center">1</TableCell>
            <TableCell align="left" className="font-medium">Phải trả khách hàng</TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 20)?.data.T2 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(20,'T2') } 
                  />  
            </TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 20)?.data.T1 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(20,'T1') } 
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 20)?.data.T ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(20,'T') } 
                  message={ getMessage('business/finance-analysis', 'T20') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 20)?.data.KH ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(20,'KH') } 
                  message={ getMessage('business/finance-analysis', 'KH20') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 20)?.data.NVKD ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(20,'NVKD') } 
                  message={ getMessage('business/finance-analysis', 'NVKD20') }
                  />  
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">2</TableCell>
            <TableCell align="left" className="font-medium">Vay ngân hàng</TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 21)?.data.T2 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(21,'T2') } 
                  />  
            </TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 21)?.data.T1 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(21,'T1') } 
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 21)?.data.T ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(21,'T') } 
                  message={ getMessage('business/finance-analysis', 'T21') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 21)?.data.KH ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(21,'KH') } 
                  message={ getMessage('business/finance-analysis', 'KH21') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 21)?.data.NVKD ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(21,'NVKD') } 
                  message={ getMessage('business/finance-analysis', 'NVKD21') }
                  />  
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">3</TableCell>
            <TableCell align="left" className="font-medium">Vay khác</TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 22)?.data.T2 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(22,'T2') } 
                  />  
            </TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 22)?.data.T1 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(22,'T1') } 
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 22)?.data.T ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(22,'T') } 
                  message={ getMessage('business/finance-analysis', 'T22') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 22)?.data.KH ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(22,'KH') } 
                  message={ getMessage('business/finance-analysis', 'KH22') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 22)?.data.NVKD ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(22,'NVKD') } 
                  message={ getMessage('business/finance-analysis', 'NVKD22') }
                  />  
            </TableCell>
          </TableRow>
          <TableRow className="mscb-table-border ">
            <TableCell align="center">4</TableCell>
            <TableCell align="left" className="font-medium">Vốn chủ sở hữu</TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 23)?.data.T2 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(23,'T2') } 
                  />  
            </TableCell>
            <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 23)?.data.T1 ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(23,'T1') } 
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 23)?.data.T ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(23,'T') } 
                  message={ getMessage('business/finance-analysis', 'T23') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 23)?.data.KH ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(23,'KH') } 
                  message={ getMessage('business/finance-analysis', 'KH23') }
                  />  
            </TableCell> <TableCell align="right">
              <Numberbox
                integer
                comma 
                  type="number"
                  format
                  value={ (Finance.B?.find(r => r.id === 23)?.data.NVKD ?? '').toString() }
                  disabled={ ruleDisabled }
                  onDebounce={ changeGroup(23,'NVKD') } 
                  message={ getMessage('business/finance-analysis', 'NVKD23') }
                  />  
            </TableCell>
          </TableRow>
        </TableBody>
      </TableSticky>
    })()}
  </Box>
  
}

export default SymmetricalV2;