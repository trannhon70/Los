import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import TableSticky from 'views/components/layout/TableSticky';
// import useFinanceMetadata from 'app/hooks/useFinanceMetadata';
import useNormalLoanMessage from 'app/hooks/useNormalLoanMessage';
import {
  setLOANNormalStorageLOANFinanceGroupValue
} from 'features/loan/normal/storage/loan/actions';
import { getLOANNormalStorageLOANFinance } from 'features/loan/normal/storage/loan/selectors';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalStorageLOANFinanceMetadataValue } from 'types/models/loan/normal/storage/LOAN';
import { formatNumber } from 'utils';
import Numberbox from 'views/components/base/Numberbox';

const DefinationLimitedV2: FC = () => {

  // const { FinanceMetadata } = useFinanceMetadata();
  // const DL = FinanceMetadata.find(f => f.group_id === 4);

  const dispatch = useDispatch();
  const Finance = useSelector(getLOANNormalStorageLOANFinance);
  const ruleDisabled = useSelector(getRuleDisbled)
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
  /// Bảng A
//   const netRevenue = Finance.A.find(item => item.id=== 7)
//   // Tổng chi phí
//   // giá vốn hàng bán
//   const sold = Finance.A?.find(item => item.id=== 9)
//     // chi phí quản lí
//     const managementCosts = Finance.A?.find(item => item.id=== 10)
//       // chi phí lãi vay
//   const interestExpenses = Finance.A?.find(item => item.id=== 11)
//     // chi phí khác
//   const otherCosts = Finance.A?.find(item => item.id=== 12)


//   // CHU KỲ VỐN LƯU ĐỘNG
//   const capitalCycle = Finance.D.find(item=>item.id === 30)

//   // Tổng chi phí
//   const countTotalCostT2 = () =>{
//     return {
//       t2:(sold?.data.T2 ?? 0) 
//         + (managementCosts?.data.T2 ?? 0) 
//         + (interestExpenses?.data.T2 ?? 0)
//         + (otherCosts?.data.T2 ?? 0),
//       t1:(sold?.data.T1 ?? 0) 
//       + (managementCosts?.data.T1 ?? 0) 
//       + (interestExpenses?.data.T1 ?? 0)
//       + (otherCosts?.data.T1 ?? 0),
//       t:(sold?.data.T ?? 0) 
//       + (managementCosts?.data.T ?? 0) 
//       + (interestExpenses?.data.T ?? 0)
//       + (otherCosts?.data.T ?? 0),
//       kh:(sold?.data.KH ?? 0) 
//       + (managementCosts?.data.KH ?? 0) 
//       + (interestExpenses?.data.KH ?? 0)
//       + (otherCosts?.data.KH ?? 0),
//       nvkd:(sold?.data.NVKD ?? 0) 
//       + (managementCosts?.data.NVKD ?? 0) 
//       + (interestExpenses?.data.NVKD ?? 0)
//       + (otherCosts?.data.NVKD ?? 0),

//     }
//   }
// // Lợi nhuận định mức
//   const netProfit = {
//     T2:((netRevenue?.data.T2 ?? 0) - (countTotalCostT2().t2)),
//     T1:((netRevenue?.data.T1 ?? 0) - (countTotalCostT2().t1)),
//     T:((netRevenue?.data.T ?? 0) - (countTotalCostT2().t)),
//     KH:((netRevenue?.data.KH ?? 0) - (countTotalCostT2().kh)),
//     NVKD:((netRevenue?.data.NVKD ?? 0) - (countTotalCostT2().nvkd))
//   }
//     //TỔNG CHI PHÍ CẦN THIẾT
//     // khấu hao tài sản
//     const depreciation = Finance.D.find(item=>item.id === 25)
//     // thuế
//   const tax = Finance.D.find(item=>item.id === 26)
//   const totalNeedCost = {
//     t2: (netRevenue?.data.T2 ?? 0) - ((depreciation?.data.T2 ?? 0) + (tax?.data.T2 ?? 0) + (netProfit.T2 ?? 0)),
//     t1: (netRevenue?.data.T1 ?? 0) - ((depreciation?.data.T1 ?? 0) + (tax?.data.T1 ?? 0) + (netProfit.T1 ?? 0)),
//     t: (netRevenue?.data.T ?? 0) - ((depreciation?.data.T ?? 0) + (tax?.data.T ?? 0) + (netProfit.T ?? 0)),
//     kh: (netRevenue?.data.KH ?? 0) - ((depreciation?.data.KH ?? 0) + (tax?.data.KH ?? 0) + (netProfit.KH ?? 0)),
//     nvkd: (netRevenue?.data.NVKD ?? 0) - ((depreciation?.data.NVKD ?? 0) + (tax?.data.NVKD ?? 0) + (netProfit.NVKD ?? 0)),
//   }

//   /////////Tổng tài sản ngắn hạn
//   // Tiền mặt / Tiền gửi ngân hàng
//   const cash_bankDeposits = Finance.B?.find(item => item.id === 15)
//   // Hàng tồn kho
//   const inventory = Finance.B?.find(item => item.id === 16)
//   // Phải thu khách hàng
//   const recievableCustomer = Finance.B?.find(item => item.id === 17)
//   // Tài sản cố định
//   // const aseet = Finance.B?.find(item => item.id === 18)
//   const toltalAsset = {
//     T2: ((cash_bankDeposits?.data.T2 ?? 0) + (inventory?.data.T2 ?? 0) + (recievableCustomer?.data.T2 ?? 0) ),
//     T1: ((cash_bankDeposits?.data.T1 ?? 0) + (inventory?.data.T1 ?? 0) + (recievableCustomer?.data.T1 ?? 0)),
//     T: ((cash_bankDeposits?.data.T ?? 0) + (inventory?.data.T ?? 0) + (recievableCustomer?.data.T ?? 0) ),
//     KH: ((cash_bankDeposits?.data.KH ?? 0) + (inventory?.data.KH ?? 0) + (recievableCustomer?.data.KH ?? 0) ),
//     NVKD: ((cash_bankDeposits?.data.NVKD ?? 0) + (inventory?.data.NVKD ?? 0) + (recievableCustomer?.data.NVKD ?? 0) ),
//   }

//   // // Vòng quay vốn lưu động
//   // const WorkingCapitalTurnover = {
//   //   t2: capitalCycle?.data.T2 !== 0 ? 365 / (capitalCycle?.data.T2 ?? 0) : ((netRevenue?.data.T2 ?? 0) / toltalAsset.T2),
//   //   t1: capitalCycle?.data.T1 !== 0 ? 365 / (capitalCycle?.data.T1 ?? 0) : ((netRevenue?.data.T1 ?? 0) / toltalAsset.T1),
//   //   t: capitalCycle?.data.T !== 0 ? 365 / (capitalCycle?.data.T ?? 0) : ((netRevenue?.data.T ?? 0) / toltalAsset.T),
//   //   kh: capitalCycle?.data.KH !== 0 ? 365 / (capitalCycle?.data.KH ?? 0) : ((netRevenue?.data.KH ?? 0)  / toltalAsset.KH),
//   //   nvkd: capitalCycle?.data.NVKD !== 0 ? 365 / (capitalCycle?.data.NVKD ?? 0) : ((netRevenue?.data.NVKD ?? 0) / toltalAsset.NVKD),
//   // }

//   // // Nhu cầu vốn/Vòng quay Vốn lưu động
//   // const capitalNeed_capital_turnover = {
//   //   t2: totalNeedCost.t2 / WorkingCapitalTurnover.t2,
//   //   t1: totalNeedCost.t1 / WorkingCapitalTurnover.t1,
//   //   t: totalNeedCost.t / WorkingCapitalTurnover.t,
//   //   kh: totalNeedCost.kh / WorkingCapitalTurnover.kh,
//   //   nvkd: totalNeedCost.nvkd / WorkingCapitalTurnover.nvkd,

//   // }

//   // Vòng quay vốn lưu động
//   const WorkingCapitalTurnover = {
//     t2: (() => {
//       if (netRevenue?.data.T2 === null || toltalAsset.T2 === 0 ) return 0;
//       return capitalCycle?.data.T2 !== 0 ? formatRoundNumber(365 / (capitalCycle?.data.T2 ?? 0)) : formatRoundNumber((netRevenue?.data.T2 ?? 0) / toltalAsset.T2);
//     })(),
//     t1: (() => {
//       if (netRevenue?.data.T1 === null || toltalAsset.T1 === 0 ) return 0;
//       return capitalCycle?.data.T1 !== 0 ? formatRoundNumber(365 / (capitalCycle?.data.T1 ?? 0)) : formatRoundNumber((netRevenue?.data.T1 ?? 0) / toltalAsset.T1);
//     })(),
//     t: (() => {
//       if (netRevenue?.data.T === null || toltalAsset.T === 0 ) return 0;
//       return capitalCycle?.data.T !== 0 ? formatRoundNumber(365 / (capitalCycle?.data.T ?? 0)) : formatRoundNumber((netRevenue?.data.T ?? 0) / toltalAsset.T);
//     })(),
//     kh: (() => {
//       if (netRevenue?.data.KH === null || toltalAsset.KH === 0 ) return 0;
//       return capitalCycle?.data.KH !== 0 ? formatRoundNumber(365 / (capitalCycle?.data.KH ?? 0)) : formatRoundNumber((netRevenue?.data.KH ?? 0) / toltalAsset.KH);
//     })(),
//     nvkd: (() => {
//       if (netRevenue?.data.NVKD === null || toltalAsset.NVKD === 0 ) return 0;
//       return capitalCycle?.data.NVKD !== 0 ? formatRoundNumber(365 / (capitalCycle?.data.NVKD ?? 0)) : formatRoundNumber((netRevenue?.data.NVKD ?? 0) / toltalAsset.NVKD);
//     })()
//   }

//   // Nhu cầu vốn/Vòng quay Vốn lưu động
//   const capitalNeed_capital_turnover = {
//     t2: (WorkingCapitalTurnover.t2 === 0 ? 0 : formatRoundNumber(totalNeedCost.t2 / WorkingCapitalTurnover.t2) ?? 0),
//     t1: (WorkingCapitalTurnover.t1 === 0 ? 0 : formatRoundNumber(totalNeedCost.t1 / WorkingCapitalTurnover.t1)?? 0),
//     t: (WorkingCapitalTurnover.t === 0 ? 0 : formatRoundNumber(totalNeedCost.t / WorkingCapitalTurnover.t)?? 0),
//     kh: (WorkingCapitalTurnover.kh === 0 ? 0 : formatRoundNumber(totalNeedCost.kh / WorkingCapitalTurnover.kh) ?? 0),
//     nvkd: (WorkingCapitalTurnover.nvkd === 0 ? 0 : formatRoundNumber(totalNeedCost.nvkd / WorkingCapitalTurnover.nvkd) ?? 0),

//   }

//   // Vốn tổ chức tài chính khác
//   const financialInstitutions = Finance.D.find(item=>item.id === 36)
//   // Phải trả người bán/mượn khác
//   const payableToSellers_borrowers = Finance.D.find(item=>item.id === 37)

//     //Vốn huy động khác (2) = (2.1) + (2.2)
//   const otherCapital = {
//     t2: (financialInstitutions?.data.T2 ?? 0) + (payableToSellers_borrowers?.data.T2 ?? 0),
//     t1: (financialInstitutions?.data.T1 ?? 0) + (payableToSellers_borrowers?.data.T1 ?? 0),
//     t: (financialInstitutions?.data.T ?? 0) + (payableToSellers_borrowers?.data.T ?? 0),
//     kh: (financialInstitutions?.data.KH ?? 0) + (payableToSellers_borrowers?.data.KH ?? 0),
//     nvkd: (financialInstitutions?.data.NVKD ?? 0) + (payableToSellers_borrowers?.data.NVKD ?? 0),
//   }

//   //Vốn tự có & Huy động khác (X) = (1) + (2)
//   const ownAndOtherCapital = {
//     t2: (toltalAsset.T2) + (otherCapital.t2),
//     t1: (toltalAsset.T1) + (otherCapital.t1 ),
//     t: (toltalAsset.T) + (otherCapital.t),
//     kh: (toltalAsset.KH) + (otherCapital.kh ),
//     nvkd: (toltalAsset.NVKD) + (otherCapital.nvkd),
//   }

//   ///- Nhu cầu vốn lưu động cần vay SCB
//   const capital_turnover_scb = {
//     t2: (capitalNeed_capital_turnover.t2) - (ownAndOtherCapital.t2 ),
//     t1: (capitalNeed_capital_turnover.t1 ) - (ownAndOtherCapital.t1),
//     t: (capitalNeed_capital_turnover.t) - (ownAndOtherCapital.t),
//     kh: (capitalNeed_capital_turnover.kh) - (ownAndOtherCapital.kh),
//     nvkd: (capitalNeed_capital_turnover.nvkd) - (ownAndOtherCapital.nvkd),
//   }

  const findDataTableD = (id: number, field: keyof ILOANNormalStorageLOANFinanceMetadataValue ) => {
    return formatNumber((Finance.D?.find(r => r.id === id)?.data[field] ?? '0').toString())
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
      D. Xác định Hạn mức cấp tín dụng bổ sung vốn lưu động/Nhu cầu vay vốn tại SCB (*)
    </Typography>
    {(() => {
      // if (!DL) return <Loading />;
      // if (!DL.metadata_group_childes.length){
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
            <TableCell align="left">DOANH THU THUẦN</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(24, 'T2')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(24, 'T1')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(24, 'T')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(24, 'KH')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(24, 'NVKD')}</TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-title'>
            <TableCell align="center">II</TableCell>
            <TableCell align="left" className="font-medium">KHẤU HAO TÀI SẢN</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 25)?.data.T2 ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(25, 'T2')}
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 25)?.data.T1 ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(25, 'T1')}
              />
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 25)?.data.T ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(25, 'T')}
                message={getMessage('business/finance-analysis', 'T25')}
                />  
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 25)?.data.KH ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(25, 'KH')}
                message={getMessage('business/finance-analysis', 'KH25')}
                />  
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 25)?.data.NVKD ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(25, 'NVKD')}
                message={getMessage('business/finance-analysis', 'NVKD25')}
              />  
            </TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-title'>
            <TableCell align="center">III</TableCell>
            <TableCell align="left" className="font-medium">THUẾ</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 26)?.data.T2 ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(26, 'T2')}
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 26)?.data.T1 ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(26, 'T1')}
                />  
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 26)?.data.T ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(26, 'T')}
                message={getMessage('business/finance-analysis', 'T26')}
                />  
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 26)?.data.KH ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(26, 'KH')}
                message={getMessage('business/finance-analysis', 'KH26')}
                />  
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 26)?.data.NVKD ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(26, 'NVKD')}
                message={getMessage('business/finance-analysis', 'NVKD26')}
                />  
            </TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-title'>
            <TableCell align="center">IV</TableCell>
            <TableCell align="left">LỢI NHUẬN ĐỊNH MỨC</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(27, 'T2')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(27, 'T1')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(27, 'T')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(27, 'KH')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(27, 'NVKD')}</TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-title'>
            <TableCell align="center">V</TableCell>
            <TableCell align="left">TỔNG CHI PHÍ CẦN THIẾT</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(28, 'T2')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(28, 'T1')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(28, 'T')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(28, 'KH')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(28, 'NVKD')}</TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-title'>
            <TableCell align="center">VI</TableCell>
            <TableCell align="left">TỒNG TÀI SẢN NGẮN HẠN</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(29, 'T2')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(29, 'T1')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(29, 'T')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(29, 'KH')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(29, 'NVKD')}</TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-title'>
            <TableCell align="center">VII</TableCell>
            <TableCell align="left" className="font-medium">CHU KỲ VỐN LƯU ĐỘNG</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 30)?.data.T2 ?? '0').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(30, 'T2')}
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 30)?.data.T1 ?? '0').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(30, 'T1')}
              />
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 30)?.data.T ?? '0').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(30, 'T')}
                message={getMessage('business/finance-analysis', 'T30')}
              />
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 30)?.data.KH ?? '0').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(30, 'KH')}
                message={getMessage('business/finance-analysis', 'KH30')}
              />
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 30)?.data.NVKD ?? '0').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(30, 'NVKD')}
                message={getMessage('business/finance-analysis', 'NVKD30')}
              />
            </TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-title'>
            <TableCell align="center">VIII</TableCell>
            <TableCell align="left">VÒNG QUAY VỐN LƯU ĐỘNG</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(31, 'T2')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(31, 'T1')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(31, 'T')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(31, 'KH')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(31, 'NVKD')}</TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-title'>
            <TableCell align="center">IX</TableCell>
            <TableCell align="left">NHU CẦU VỐN/VÒNG QUAY VỐN LƯU ĐỘNG</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(32, 'T2')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(32, 'T1')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(32, 'T')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(32, 'KH')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(32, 'NVKD')}</TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-title'>
            <TableCell align="center">X</TableCell>
            <TableCell align="left">Vốn tự có & Huy động khác (X) = (1) + (2)</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(33, 'T2')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(33, 'T1')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(33, 'T')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(33, 'KH')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(33, 'NVKD')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="font-medium">1</TableCell>
            <TableCell align="left" className="font-medium">Vốn lưu động tự có</TableCell>
            <TableCell align="right" className="text-danger pr-7 font-medium">{findDataTableD(34, 'T2')}</TableCell>
            <TableCell align="right" className="text-danger pr-7 font-medium">{findDataTableD(34, 'T1')}</TableCell>
            <TableCell align="right" className="text-danger pr-7 font-medium">{findDataTableD(34, 'T')}</TableCell>
            <TableCell align="right" className="text-danger pr-7 font-medium">{findDataTableD(34, 'KH')}</TableCell>
            <TableCell align="right" className="text-danger pr-7 font-medium">{findDataTableD(34, 'NVKD')}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell align="center" className="font-medium">2</TableCell>
            <TableCell align="left" className="font-medium">Vốn huy động khác (2) = (2.1) + (2.2)</TableCell>
            <TableCell align="right" className="text-danger pr-7 font-medium">{findDataTableD(35, 'T2')}</TableCell>
            <TableCell align="right" className="text-danger pr-7 font-medium">{findDataTableD(35, 'T1')}</TableCell>
            <TableCell align="right" className="text-danger pr-7 font-medium">{findDataTableD(35, 'T')}</TableCell>
            <TableCell align="right" className="text-danger pr-7 font-medium">{findDataTableD(35, 'KH')}</TableCell>
            <TableCell align="right" className="text-danger pr-7 font-medium">{findDataTableD(35, 'NVKD')}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell align="center">2.1</TableCell>
            <TableCell align="left" className="font-normal">Vốn tổ chức tài chính khác</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 36)?.data.T2 ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(36, 'T2')}
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 36)?.data.T1 ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(36, 'T1')}
              />
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 36)?.data.T ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(36, 'T')}
                message={getMessage('business/finance-analysis', 'T36')}
              />
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 36)?.data.KH ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(36, 'KH')}
                message={getMessage('business/finance-analysis', 'KH36')}
              />
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 36)?.data.NVKD ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(36, 'NVKD')}
                message={getMessage('business/finance-analysis', 'NVKD36')}
                />  
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell align="center">2.2</TableCell>
            <TableCell align="left" className="font-normal">Phải trả người bán/mượn khác</TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 37)?.data.T2 ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(37, 'T2')}
              />
            </TableCell>
            <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 37)?.data.T1 ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(37, 'T1')}
              />
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 37)?.data.T ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(37, 'T')}
                message={getMessage('business/finance-analysis', 'T37')}
              />
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 37)?.data.KH ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(37, 'KH')}
                message={getMessage('business/finance-analysis', 'KH37')}
              />
            </TableCell> <TableCell align="right" className="text-normal">
              <Numberbox
                integer
                comma
                type="number"
                format
                value={(Finance.D?.find(r => r.id === 37)?.data.NVKD ?? '').toString()}
                disabled={ ruleDisabled }
                onDebounce={changeGroup(37, 'NVKD')}
                message={getMessage('business/finance-analysis', 'NVKD37')}
              />
            </TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-title'>
            <TableCell align="center">XI</TableCell>
            <TableCell align="left">NHU CẦU VỐN LƯU ĐỘNG CẦN VAY SCB</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(38, 'T2')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(38, 'T1')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(38, 'T')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(38, 'KH')}</TableCell>
            <TableCell align="right" className="text-danger pr-7">{findDataTableD(38, 'NVKD')}</TableCell>
          </TableRow>
        </TableBody>
      </TableSticky>
    })()}
  </Box>

}

export default DefinationLimitedV2;