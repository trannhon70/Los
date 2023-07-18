import { FC, Fragment } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableSticky from 'views/components/layout/TableSticky';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Input from 'views/components/base/Input';
import useFinanceMetadata from 'app/hooks/useFinanceMetadata';
import Loading from 'views/components/base/Loading';
import Empty from 'views/components/layout/Empty';
import { generateUUID, intToRoman, formatNumber, formatNumberDecimal } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { getLOANNormalStorageLOANFinance } from 'features/loan/normal/storage/loan/selectors';
import { ILOANNormalStorageLOANFinanceMetadataValue } from 'types/models/loan/normal/storage/LOAN';
import { 
  setLOANNormalStorageLOANFinanceGroupValue, 
  // setLOANNormalStorageLOANFinanceTypeValue 
} from 'features/loan/normal/storage/loan/actions';
import useNormalLoanMessage from 'app/hooks/useNormalLoanMessage';

const DefinationLimited: FC = () => {

  const { FinanceMetadata } = useFinanceMetadata();
  const DL = FinanceMetadata.find(f => f.group_id === 4);

  const dispatch = useDispatch();
  const Finance = useSelector(getLOANNormalStorageLOANFinance);
  const getMessage = useNormalLoanMessage();

  const changeGroup = (group: number, field: keyof ILOANNormalStorageLOANFinanceMetadataValue) => (value: string) => {
    value && dispatch(setLOANNormalStorageLOANFinanceGroupValue(
      value === '' ? null : +value,
      { obj: 'D', group, field }
    ))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const changeType = (group: number, type: number, field: keyof ILOANNormalStorageLOANFinanceMetadataValue) => 
  //   (value: string) => {
  //     dispatch(setLOANNormalStorageLOANFinanceTypeValue(
  //       value === '' ? null : +value,
  //       { obj: 'D', group, type, field }
  //     ))
  //   }
  // doanh thu thuần
  const netRevenue = Finance.A.find(item => item.id=== 7)
  // Tổng chi phí
  const totalCost = Finance.A.find(item => item.id=== 8)
  // giá vốn hàng bán
  const sold = totalCost?.child.find(item => item.id=== 9)
    // chi phí quản lí
    const managementCosts = totalCost?.child.find(item => item.id=== 10)
      // chi phí lãi vay
  const interestExpenses = totalCost?.child.find(item => item.id=== 11)
    // chi phí khác
  const otherCosts = totalCost?.child.find(item => item.id=== 12)
    // tổng tài sản 
    const totalAssets = Finance.B.find(item=>item.id === 14)
    // Tiền mặt / Tiền gửi ngân hàng
    const cash_bankDeposits = totalAssets?.child.find(item=>item.id === 15)
    // Hàng tồn kho
    const inventory = totalAssets?.child.find(item=>item.id === 16)
    // Phải thu khách hàng
    const recievableCustomer = totalAssets?.child.find(item=>item.id === 17)
  // khấu hao tài sản
  const depreciation = Finance.D.find(item=>item.id === 25)
    // thuế
  const tax = Finance.D.find(item=>item.id === 26)
  // CHU KỲ VỐN LƯU ĐỘNG
  const capitalCycle = Finance.D.find(item=>item.id === 30)
  // Vốn tổ chức tài chính khác
  const financialInstitutions = Finance.D.find(item=>item.id === 36)
  // Phải trả người bán/mượn khác
  const payableToSellers_borrowers = Finance.D.find(item=>item.id === 37)
  // Tổng chi phí
  const countTotalCostT2 = () =>{
    return {
      t2:(sold?.data.T2 ?? 0) 
        + (managementCosts?.data.T2 ?? 0) 
        + (interestExpenses?.data.T2 ?? 0)
        + (otherCosts?.data.T2 ?? 0),
      t1:(sold?.data.T1 ?? 0) 
      + (managementCosts?.data.T1 ?? 0) 
      + (interestExpenses?.data.T1 ?? 0)
      + (otherCosts?.data.T1 ?? 0),
      t:(sold?.data.T ?? 0) 
      + (managementCosts?.data.T ?? 0) 
      + (interestExpenses?.data.T ?? 0)
      + (otherCosts?.data.T ?? 0),
      kh:(sold?.data.KH ?? 0) 
      + (managementCosts?.data.KH ?? 0) 
      + (interestExpenses?.data.KH ?? 0)
      + (otherCosts?.data.KH ?? 0),
      nvkd:(sold?.data.NVKD ?? 0) 
      + (managementCosts?.data.NVKD ?? 0) 
      + (interestExpenses?.data.NVKD ?? 0)
      + (otherCosts?.data.NVKD ?? 0),
  // const changeType = (group: number, type: number, field: keyof ILOANNormalStorageLOANFinanceMetadataValue) => 
  //   (value: string) => {
  //     dispatch(setLOANNormalStorageLOANFinanceTypeValue(
  //       value === '' ? null : +value,
  //       { obj: 'A', group, type, field }
  //     ))
  //   }

    }
  }

  const netProfit = {
    t2:((netRevenue?.data.T2 ?? 0) - (countTotalCostT2().t2)),
    t1:((netRevenue?.data.T1 ?? 0) - (countTotalCostT2().t1)),
    t:((netRevenue?.data.T ?? 0) - (countTotalCostT2().t)),
    kh:((netRevenue?.data.KH ?? 0) - (countTotalCostT2().kh)),
    nvkd:((netRevenue?.data.NVKD ?? 0) - (countTotalCostT2().nvkd))
  }
  const totalNeedCost = {
    t2: (netRevenue?.data.T2 ?? 0) - ((depreciation?.data.T2 ?? 0) + (tax?.data.T2 ?? 0) + (netProfit.t2)),
    t1: (netRevenue?.data.T1 ?? 0) - ((depreciation?.data.T1 ?? 0) + (tax?.data.T1 ?? 0) + (netProfit.t1)),
    t: (netRevenue?.data.T ?? 0) - ((depreciation?.data.T ?? 0) + (tax?.data.T ?? 0) + (netProfit.t)),
    kh: (netRevenue?.data.KH ?? 0) - ((depreciation?.data.KH ?? 0) + (tax?.data.KH ?? 0) + (netProfit.kh)),
    nvkd: (netRevenue?.data.NVKD ?? 0) - ((depreciation?.data.NVKD ?? 0) + (tax?.data.NVKD ?? 0) + (netProfit.nvkd)),
  }
  const totalAssetsTableD = {
    t2: (cash_bankDeposits?.data.T2 ?? 0) + (inventory?.data.T2 ?? 0) + (recievableCustomer?.data.T2 ?? 0),
    t1: (cash_bankDeposits?.data.T1 ?? 0) + (inventory?.data.T1 ?? 0) + (recievableCustomer?.data.T1 ?? 0),
    t: (cash_bankDeposits?.data.T ?? 0) + (inventory?.data.T ?? 0) + (recievableCustomer?.data.T ?? 0),
    kh: (cash_bankDeposits?.data.KH ?? 0) + (inventory?.data.KH ?? 0) + (recievableCustomer?.data.KH ?? 0),
    nvkd: (cash_bankDeposits?.data.NVKD ?? 0) + (inventory?.data.NVKD ?? 0) + (recievableCustomer?.data.NVKD ?? 0),
  }
    // Vòng quay vốn lưu động
  const WorkingCapitalTurnover = {
    t2: capitalCycle?.data.T2 !==0 ? 365/(capitalCycle?.data.T2??0): ((netRevenue?.data.T2 ?? 0) / totalAssetsTableD.t2),
    t1: capitalCycle?.data.T1 !==0 ? 365/(capitalCycle?.data.T1??0): ((netRevenue?.data.T1 ?? 0) / totalAssetsTableD.t1),
    t: capitalCycle?.data.T !==0 ? 365/(capitalCycle?.data.T??0): ((netRevenue?.data.T ?? 0) / totalAssetsTableD.t),
    kh: capitalCycle?.data.KH !==0 ? 365/(capitalCycle?.data.KH??0): ((netRevenue?.data.KH) ?? 0 / totalAssetsTableD.kh),
    nvkd: capitalCycle?.data.NVKD !==0 ? 365/(capitalCycle?.data.NVKD??0): ((netRevenue?.data.NVKD ?? 0) / totalAssetsTableD.nvkd),
  }
    // Nhu cầu vốn/Vòng quay Vốn lưu động
    const capitalNeed_capital_turnover ={
      t2: totalNeedCost.t2 / WorkingCapitalTurnover.t2,
      t1: totalNeedCost.t1 / WorkingCapitalTurnover.t1,
      t: totalNeedCost.t / WorkingCapitalTurnover.t,
      kh: totalNeedCost.kh / WorkingCapitalTurnover.kh,
      nvkd: totalNeedCost.nvkd / WorkingCapitalTurnover.nvkd,
  
    }
      // Vốn huy động khác  
  const otherCapital = {
    t2: (financialInstitutions?.data.T2 ?? 0) + (payableToSellers_borrowers?.data.T2 ?? 0),
    t1: (financialInstitutions?.data.T1 ?? 0) + (payableToSellers_borrowers?.data.T1 ?? 0),
    t: (financialInstitutions?.data.T ?? 0) + (payableToSellers_borrowers?.data.T ?? 0),
    kh: (financialInstitutions?.data.KH ?? 0) + (payableToSellers_borrowers?.data.KH ?? 0),
    nvkd: (financialInstitutions?.data.NVKD ?? 0) + (payableToSellers_borrowers?.data.NVKD ?? 0),
  }
      // Vốn tự có & Huy động khác
  const ownAndOtherCapital = {
    t2: (totalAssetsTableD.t2) + (otherCapital.t2),
    t1: (totalAssetsTableD.t1) + (otherCapital.t1 ),
    t: (totalAssetsTableD.t) + (otherCapital.t),
    kh: (totalAssetsTableD.kh) + (otherCapital.kh ),
    nvkd: (totalAssetsTableD.nvkd) + (otherCapital.nvkd),
  }
  const capital_turnover_scb = {
    t2: (capitalNeed_capital_turnover.t2) - (ownAndOtherCapital.t2 ),
    t1: (capitalNeed_capital_turnover.t1 ) - (ownAndOtherCapital.t1),
    t: (capitalNeed_capital_turnover.t) - (ownAndOtherCapital.t),
    kh: (capitalNeed_capital_turnover.kh) - (ownAndOtherCapital.kh),
    nvkd: (capitalNeed_capital_turnover.nvkd) - (ownAndOtherCapital.nvkd),
  }
  return <Box className="mscb-input-table mscb-input-right pt-6">
    <Typography 
      variant="h4" 
      component="h4" 
      className="font-bold text-upper mb-3" 
      sx={{
        fontSize: '19px'
      }}
    >
      { DL?.group_name }
    </Typography>
    {(() => {
      if (!DL) return <Loading />;
      if (!DL.metadata_group_childes.length){
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
          {DL?.metadata_group_childes.map((group, gi) => [
            <TableRow className="mscb-table-row-title" key={ generateUUID() }>
              <TableCell className="text-center">{ intToRoman(gi + 1) }</TableCell>
              <TableCell>{ group.metadata_type_name }</TableCell>
              <TableCell className="text-right">
                {
                  group.edit_flag ?
                  <Input 
                    value={ Finance.D.find(r => r.id === group.metadata_type_id)?.data.T2?.toString() ?? '' }
                    type="number"
                    disabedNegative
                    format
                    onDebounce={ changeGroup(group.metadata_type_id, 'T2') }
                  /> : 
                  <span className="text-danger font-medium">{(()=>{
                       
                    if(group.metadata_type_id === 24 && netRevenue?.data){
                      return  netRevenue.data.T2===0 ?'-':formatNumber(netRevenue.data.T2?.toString())
                    }
                    if(group.metadata_type_id === 27 ){
                      return netProfit.t2 === 0 ?'-':formatNumber(netProfit.t2.toString())
                    }
                    if(group.metadata_type_id === 28){
                      return totalNeedCost.t2===0?'-' : formatNumber(totalNeedCost.t2.toString())
                    }
                    if(group.metadata_type_id === 29){
                      return totalAssetsTableD.t2===0?'-' : formatNumber(totalAssetsTableD.t2.toString())
                    }
                    if(group.metadata_type_id === 31){
                      return WorkingCapitalTurnover.t2===Infinity ? '-' : formatNumberDecimal(WorkingCapitalTurnover.t2)
                    }
                    if(group.metadata_type_id === 32){
                      return capitalNeed_capital_turnover.t2===0 ? '-' : formatNumberDecimal(capitalNeed_capital_turnover.t2)
                    }
                    if(group.metadata_type_id === 33){
                      return ownAndOtherCapital.t2===0 ? '-' : formatNumber(ownAndOtherCapital.t2.toString())
                    }
                    if(group.metadata_type_id === 38){
                      return capital_turnover_scb.t2===0 ? '-' : formatNumberDecimal(capital_turnover_scb.t2)
                    }
                    return '-'
                  })()}</span>
                }
              </TableCell>
              <TableCell className="text-right">
                {
                  group.edit_flag ?
                  <Input 
                    value={ Finance.D.find(r => r.id === group.metadata_type_id)?.data.T1?.toString() ?? '' }
                    type="number"
                    disabedNegative
                    format
                    onDebounce={ changeGroup(group.metadata_type_id, 'T1') }
                  /> : 
                  <span className="text-danger font-medium">{(()=>{
                       
                    if(group.metadata_type_id === 24 && netRevenue?.data){
                      return  netRevenue.data.T1===0 ?'-':formatNumber(netRevenue.data.T1?.toString())
                    }
                    if(group.metadata_type_id === 27 ){
                      return netProfit.t1 === 0 ?'-':formatNumber(netProfit.t1.toString())
                    }
                    if(group.metadata_type_id === 28){
                      return totalNeedCost.t1===0?'-' : formatNumber(totalNeedCost.t1.toString())
                    }
                    if(group.metadata_type_id === 29){
                      return totalAssetsTableD.t1===0?'-' : formatNumber(totalAssetsTableD.t1.toString())
                    }
                    if(group.metadata_type_id === 31){
                      return WorkingCapitalTurnover.t1===Infinity ? '-' : formatNumberDecimal(WorkingCapitalTurnover.t1)
                    }
                    if(group.metadata_type_id === 32){
                      return capitalNeed_capital_turnover.t1===0 ? '-' : formatNumberDecimal(capitalNeed_capital_turnover.t1)
                    }
                    if(group.metadata_type_id === 33){
                      return ownAndOtherCapital.t1===0 ? '-' : formatNumber(ownAndOtherCapital.t1.toString())
                    }
                    if(group.metadata_type_id === 38){
                      return capital_turnover_scb.t1===0 ? '-' : formatNumberDecimal(capital_turnover_scb.t1)
                    }
                    return '-'
                  })()}</span>
                }
              </TableCell>
              <TableCell className="text-right text-normal">
                {
                  group.edit_flag ?
                  <Input 
                    value={ Finance.D.find(r => r.id === group.metadata_type_id)?.data.T?.toString() ?? '' }
                    type="number"
                    disabedNegative
                    format
                    onDebounce={ changeGroup(group.metadata_type_id, 'T') }
                    message={ getMessage('business/finance-analysis',`T${group.metadata_type_id}`) }
                  /> : 
                  <span className="text-danger font-medium">{(()=>{
                       
                    if(group.metadata_type_id === 24 && netRevenue?.data){
                      return  netRevenue.data.T===0 ?'-':formatNumber(netRevenue.data.T?.toString())
                    }
                    if(group.metadata_type_id === 27 ){
                      return netProfit.t === 0 ?'-':formatNumber(netProfit.t.toString())
                    }
                    if(group.metadata_type_id === 28){
                      return totalNeedCost.t===0?'-' : formatNumber(totalNeedCost.t.toString())
                    }
                    if(group.metadata_type_id === 29){
                      return totalAssetsTableD.t===0?'-' : formatNumber(totalAssetsTableD.t.toString())
                    }
                    if(group.metadata_type_id === 31){
                      return WorkingCapitalTurnover.t===Infinity ? '-' : formatNumberDecimal(WorkingCapitalTurnover.t)
                    }
                    if(group.metadata_type_id === 32){
                      return capitalNeed_capital_turnover.t===0 ? '-' : formatNumberDecimal(capitalNeed_capital_turnover.t)
                    }
                    if(group.metadata_type_id === 33){
                      return ownAndOtherCapital.t===0 ? '-' : formatNumber(ownAndOtherCapital.t.toString())
                    }
                    if(group.metadata_type_id === 38){
                      return capital_turnover_scb.t===0 ? '-' : formatNumberDecimal(capital_turnover_scb.t)
                    }
                    return '-'
                  })()}</span>
                }
              </TableCell>
              <TableCell className="text-right text-normal">
                {
                  group.edit_flag ?
                  <Input 
                    value={ Finance.D.find(r => r.id === group.metadata_type_id)?.data.KH?.toString() ?? '' }
                    type="number"
                    disabedNegative
                    format
                    onDebounce={ changeGroup(group.metadata_type_id, 'KH') }
                    message={ getMessage('business/finance-analysis',`KH${group.metadata_type_id}`) }
                    /> : 
                  <span className="text-danger font-medium">{(()=>{
                       
                    if(group.metadata_type_id === 24 && netRevenue?.data){
                      return  netRevenue.data.KH===0 ?'-':formatNumber(netRevenue.data.KH?.toString())
                    }
                    if(group.metadata_type_id === 27 ){
                      return netProfit.kh === 0 ?'-':formatNumber(netProfit.kh.toString())
                    }
                    if(group.metadata_type_id === 28){
                      return totalNeedCost.kh===0?'-' : formatNumber(totalNeedCost.kh.toString())
                    }
                    if(group.metadata_type_id === 29){
                      return totalAssetsTableD.kh===0?'-' : formatNumber(totalAssetsTableD.kh.toString())
                    }
                    if(group.metadata_type_id === 31){
                      return WorkingCapitalTurnover.kh===Infinity ? '-' : formatNumberDecimal(WorkingCapitalTurnover.kh)
                    }
                    if(group.metadata_type_id === 32){
                      return capitalNeed_capital_turnover.kh===0 ? '-' : formatNumberDecimal(capitalNeed_capital_turnover.kh)
                    }
                    if(group.metadata_type_id === 33){
                      return ownAndOtherCapital.kh===0 ? '-' : formatNumber(ownAndOtherCapital.kh.toString())
                    }
                    if(group.metadata_type_id === 38){
                      return capital_turnover_scb.kh===0 ? '-' : formatNumberDecimal(capital_turnover_scb.kh)
                    }
                    return '-'
                  })()}</span>
                }
              </TableCell>
              <TableCell className="text-right text-normal">
                {
                  group.edit_flag ?
                  <Input 
                    value={ Finance.D.find(r => r.id === group.metadata_type_id)?.data.NVKD?.toString() ?? '' }
                    type="number"
                    disabedNegative
                    format
                    onDebounce={ changeGroup(group.metadata_type_id, 'NVKD') }
                    message={ getMessage('business/finance-analysis',`NVKD${group.metadata_type_id}`) }
                    /> : 
                  <span className="text-danger font-medium">{(()=>{
                       
                    if(group.metadata_type_id === 24 && netRevenue?.data){
                      return  netRevenue.data.NVKD===0 ?'-':formatNumber(netRevenue.data.NVKD?.toString())
                    }
                    if(group.metadata_type_id === 27 ){
                      return netProfit.nvkd === 0 ?'-':formatNumber(netProfit.nvkd.toString())
                    }
                    if(group.metadata_type_id === 28){
                      return totalNeedCost.nvkd===0?'-' : formatNumber(totalNeedCost.nvkd.toString())
                    }
                    if(group.metadata_type_id === 29){
                      return totalAssetsTableD.nvkd===0?'-' : formatNumber(totalAssetsTableD.nvkd.toString())
                    }
                    if(group.metadata_type_id === 31){
                      return WorkingCapitalTurnover.nvkd===Infinity ? '-' : formatNumberDecimal(WorkingCapitalTurnover.nvkd)
                    }
                    if(group.metadata_type_id === 32){
                      return capitalNeed_capital_turnover.nvkd===0 ? '-' : formatNumberDecimal(capitalNeed_capital_turnover.nvkd)
                    }
                    if(group.metadata_type_id === 33){
                      return ownAndOtherCapital.nvkd===0 ? '-' : formatNumber(ownAndOtherCapital.nvkd.toString())
                    }
                    if(group.metadata_type_id === 38){
                      return capital_turnover_scb.nvkd===0 ? '-' : formatNumberDecimal(capital_turnover_scb.nvkd)
                    }
                    return '-'
                  })()}</span>
                }
              </TableCell>
            </TableRow>,
            ...group.metadata_type_childes?.map((type, ti) => (
              <Fragment>
                <TableRow key={ generateUUID() }>
                  <TableCell className="text-center">{ ti + 1 }</TableCell>
                  <TableCell className="font-medium">{ type.metadata_name }</TableCell>
                  <TableCell className="text-right">
                    {
                      type.edit_flag ?
                      <Input value="40.000.000" /> : 
                      <span className="text-danger font-medium">{(()=>{
                       
                        if(type.metadata_id === 34 && totalAssetsTableD){
                          return  totalAssetsTableD.t2===0 ?'-':formatNumber(totalAssetsTableD.t2?.toString())
                        }
                        if(type.metadata_id === 35 && otherCapital){
                          return  otherCapital.t2===0 ?'-':formatNumber(otherCapital.t2?.toString())
                        }
                        return '-'
                      })()}</span>
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    {
                      type.edit_flag ?
                      <Input value="40.000.000" /> : 
                      <span className="text-danger font-medium">{(()=>{
                       
                        if(type.metadata_id === 34 && totalAssetsTableD){
                          return  totalAssetsTableD.t1===0 ?'-':formatNumber(totalAssetsTableD.t1?.toString())
                        }
                        if(type.metadata_id === 35 && otherCapital){
                          return  otherCapital.t1===0 ?'-':formatNumber(otherCapital.t1?.toString())
                        }
                        return '-'
                      })()}</span>
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    {
                      type.edit_flag ?
                      <Input value="40.000.000" /> : 
                      <span className="text-danger font-medium">{(()=>{
                       
                        if(type.metadata_id === 34 && totalAssetsTableD){
                          return  totalAssetsTableD.t===0 ?'-':formatNumber(totalAssetsTableD.t?.toString())
                        }
                        if(type.metadata_id === 35 && otherCapital){
                          return  otherCapital.t===0 ?'-':formatNumber(otherCapital.t?.toString())
                        }
                        return '-'
                      })()}</span>
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    {
                      type.edit_flag ?
                      <Input value="40.000.000" /> : 
                      <span className="text-danger font-medium">{(()=>{
                       
                        if(type.metadata_id === 34 && totalAssetsTableD){
                          return  totalAssetsTableD.kh===0 ?'-':formatNumber(totalAssetsTableD.kh?.toString())
                        }
                        if(type.metadata_id === 35 && otherCapital){
                          return  otherCapital.kh===0 ?'-':formatNumber(otherCapital.kh?.toString())
                        }
                        return '-'
                      })()}</span>
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    {
                      type.edit_flag ?
                      <Input value="40.000.000" /> : 
                      <span className="text-danger font-medium">{(()=>{
                       
                        if(type.metadata_id === 34 && totalAssetsTableD){
                          return  totalAssetsTableD.nvkd===0 ?'-':formatNumber(totalAssetsTableD.nvkd?.toString())
                        }
                        if(type.metadata_id === 35 && otherCapital){
                          return  otherCapital.nvkd===0 ?'-':formatNumber(otherCapital.nvkd?.toString())
                        }
                        return '-'
                      })()}</span>
                    }
                  </TableCell>
                </TableRow>
                {
                  type.metadata_childes?.map((child, ci) => (
                    <TableRow key={ generateUUID() }>
                      <TableCell className="text-center">{ `${ ti + 1 }.${ ci + 1 }` }</TableCell>
                      <TableCell className="font-medium">{ child.metadata_child_name }</TableCell>
                      <TableCell className="text-right">
                        {
                          child.edit_flag ?
                          <Input
                            format 
                            type="number"
                            value={ Finance.D.find(r => r.id === child.metadata_child_id)?.data.T2?.toString() ?? undefined }
                            onDebounce={ changeGroup(child.metadata_child_id, 'T2') }
                            /> : 
                          <span className="text-danger font-medium">-</span>
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        {
                          child.edit_flag ?
                          <Input
                          format 
                            type="number"
                            value={ Finance.D.find(r => r.id === child.metadata_child_id)?.data.T1?.toString() ?? undefined }
                            onDebounce={ changeGroup(child.metadata_child_id, 'T1') }/> : 
                          <span className="text-danger font-medium">-</span>
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        {
                          child.edit_flag ?
                          <Input 
                            format
                            type="number"
                            value={ Finance.D.find(r => r.id === child.metadata_child_id)?.data.T?.toString() ?? undefined }                            
                            onDebounce={ changeGroup(child.metadata_child_id, 'T') } 
                            /> : 
                          <span className="text-danger font-medium">-</span>
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        {
                          child.edit_flag ?
                          <Input 
                          format
                          type="number"
                          value={ Finance.D.find(r => r.id === child.metadata_child_id)?.data.KH?.toString() ?? undefined }
                          onDebounce={ changeGroup(child.metadata_child_id, 'KH') }
                          /> : 
                          <span className="text-danger font-medium">-</span>
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        {
                          child.edit_flag ?
                          <Input 
                            format
                            type="number"
                            value={ Finance.D.find(r => r.id === child.metadata_child_id)?.data.NVKD?.toString() ?? undefined }
                            onDebounce={ changeGroup(child.metadata_child_id, 'NVKD') }
                            /> : 
                          <span className="text-danger font-medium">-</span>
                        }
                      </TableCell>
                    </TableRow>
                  ))
                }
              </Fragment>
            )) ?? []
          ])}
        </TableBody>
      </TableSticky>
    })()}
  </Box>

}

export default DefinationLimited;