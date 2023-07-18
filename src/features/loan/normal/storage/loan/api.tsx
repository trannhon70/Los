import { ILOANNormalProduct } from 'types/models/loan/normal/configs/Product';
import {
  IBusinessResultList,
  ILOANNormalStorageLOANFinanceMetadataValue,
  ILOANNormalStorageLOANState,
  IResLOANNormalDocumentGroup,
  IResLOANNormalDocumentInfo,
  IResLOANNormalRESChildFile,
} from 'types/models/loan/normal/storage/LOAN';

import { IMasterData } from 'types/models/master-data';
import { formatFloorNumber, formatPath, formatRoundNumber } from 'utils';
import { apiDelete, apiPost } from 'utils/api';
import { API_BASE_URL_S1 } from 'utils/constants';
import {
  API_LOAN_NORMAL_SAVE_BUSSINESS_HOUSEHOULD,
  API_LOAN_NORMAL_SAVE_CAPITAL_NEED,
  API_LOAN_NORMAL_SAVE_FINANCE_ANALYSIS,
  API_LOAN_NORMAL_SAVE_LOAN_PRODUCT,
} from '../../APIPaths';

export interface ICost {
  t2: number;
  t1: number;
  t: number;
  kh: number;
  nvkd: number;
}
export const postLOAN = (
  storage: ILOANNormalStorageLOANState,
  master: IMasterData,
  product: ILOANNormalProduct,
  los_uuid: string,
  stepName: string
) => {
  //
  const total_scb_finance = () => {
    if (storage.needAndPlan.need === null) return '';
    if (storage.needAndPlan.ownCaptital === null) return '100';
    return formatFloorNumber(
      ((storage.needAndPlan.need - storage.needAndPlan.ownCaptital) * 100) /
        storage.needAndPlan.need
    );
  };
  // // // doanh thu thuần
  // const netRevenue = storage.finance.A.find(item => item.id === 7)
  // const valueNetRevenue: ILOANNormalStorageLOANFinanceMetadataValue = {
  //   T2: netRevenue?.data.T2 ?? 0,
  //   T1: netRevenue?.data.T1 ?? 0,
  //   T: netRevenue?.data.T ?? 0,
  //   KH: netRevenue?.data.KH ?? 0,
  //   NVKD: netRevenue?.data.NVKD ?? 0,
  // }
  // // Tổng chi phí
  // // const totalCost = storage.finance.A.find(item => item.id=== 8)
  // // Tổng chi phí
  // const countTotalCostT2 = (): ICost => {
  //   return {
  //     t2: (sold?.data.T2 ?? 0)
  //       + (managementCosts?.data.T2 ?? 0)
  //       + (interestExpenses?.data.T2 ?? 0)
  //       + (otherCosts?.data.T2 ?? 0),
  //     t1: (sold?.data.T1 ?? 0)
  //       + (managementCosts?.data.T1 ?? 0)
  //       + (interestExpenses?.data.T1 ?? 0)
  //       + (otherCosts?.data.T1 ?? 0),
  //     t: (sold?.data.T ?? 0)
  //       + (managementCosts?.data.T ?? 0)
  //       + (interestExpenses?.data.T ?? 0)
  //       + (otherCosts?.data.T ?? 0),
  //     kh: (sold?.data.KH ?? 0)
  //       + (managementCosts?.data.KH ?? 0)
  //       + (interestExpenses?.data.KH ?? 0)
  //       + (otherCosts?.data.KH ?? 0),
  //     nvkd: (sold?.data.NVKD ?? 0)
  //       + (managementCosts?.data.NVKD ?? 0)
  //       + (interestExpenses?.data.NVKD ?? 0)
  //       + (otherCosts?.data.NVKD ?? 0),

  //   }
  // }
  // // giá vốn hàng bán
  // const sold = storage.finance.A?.find(item => item.id === 9)
  // // chi phí quản lí
  // const managementCosts = storage.finance.A?.find(item => item.id === 10)
  // // chi phí lãi vay
  // const interestExpenses = storage.finance.A?.find(item => item.id === 11)
  // // chi phí khác
  // const otherCosts = storage.finance.A?.find(item => item.id === 12)
  // // lợi nhuận ròng
  // const netProfit: ICost = {
  //   t2: ((netRevenue?.data.T2 ?? 0) - (countTotalCostT2().t2 ?? 0)),
  //   t1: ((netRevenue?.data.T1 ?? 0) - (countTotalCostT2().t1 ?? 0)),
  //   t: ((netRevenue?.data.T ?? 0) - (countTotalCostT2().t ?? 0)),
  //   kh: ((netRevenue?.data.KH ?? 0) - (countTotalCostT2().kh ?? 0)),
  //   nvkd: ((netRevenue?.data.NVKD ?? 0) - (countTotalCostT2().nvkd ?? 0))
  // }
  // // tổng tài sản
  // // const totalAssets = storage.finance.B.find(item=>item.id === 14)
  // // Tiền mặt / Tiền gửi ngân hàng
  // const cash_bankDeposits = storage.finance.B?.find(item => item.id === 15)
  // // Hàng tồn kho
  // const inventory = storage.finance.B?.find(item => item.id === 16)
  // // Phải thu khách hàng
  // const recievableCustomer = storage.finance.B?.find(item => item.id === 17)
  // // Tài sản cố định
  // const fixedAssets = storage.finance.B?.find(item => item.id === 18)
  // const countTotalAssets: ICost = {
  //   t2: (cash_bankDeposits?.data.T2 ?? 0) + (inventory?.data.T2 ?? 0)
  //     + (recievableCustomer?.data.T2 ?? 0) + (fixedAssets?.data.T2 ?? 0),
  //   t1: (cash_bankDeposits?.data.T1 ?? 0) + (inventory?.data.T1 ?? 0)
  //     + (recievableCustomer?.data.T1 ?? 0) + (fixedAssets?.data.T1 ?? 0),
  //   t: (cash_bankDeposits?.data.T ?? 0) + (inventory?.data.T ?? 0)
  //     + (recievableCustomer?.data.T ?? 0) + (fixedAssets?.data.T ?? 0),
  //   kh: (cash_bankDeposits?.data.KH ?? 0) + (inventory?.data.KH ?? 0)
  //     + (recievableCustomer?.data.KH ?? 0) + (fixedAssets?.data.KH ?? 0),
  //   nvkd: (cash_bankDeposits?.data.NVKD ?? 0) + (inventory?.data.NVKD ?? 0)
  //     + (recievableCustomer?.data.NVKD ?? 0) + (fixedAssets?.data.NVKD ?? 0),
  // }
  // // Nguồn vốn
  // // const capital = storage.finance.B.find(item=>item.id === 19)
  // // Phải trả khách hàng
  // const payableCustomer = storage.finance.B?.find(item => item.id === 20)
  // // Vay ngân hàng
  // const bankLoan = storage.finance.B?.find(item => item.id === 21)
  // // Vay khác
  // const otherLoan = storage.finance.B?.find(item => item.id === 22)
  // // Vốn chủ sở hữu
  // const quity = storage.finance.B?.find(item => item.id === 23)
  // const countCapital: ICost = {
  //   t2: (payableCustomer?.data.T2 ?? 0) + (bankLoan?.data.T2 ?? 0)
  //     + (otherLoan?.data.T2 ?? 0) + (quity?.data.T2 ?? 0),
  //   t1: (payableCustomer?.data.T1 ?? 0) + (bankLoan?.data.T1 ?? 0)
  //     + (otherLoan?.data.T1 ?? 0) + (quity?.data.T1 ?? 0),
  //   t: (payableCustomer?.data.T ?? 0) + (bankLoan?.data.T ?? 0)
  //     + (otherLoan?.data.T ?? 0) + (quity?.data.T ?? 0),
  //   kh: (payableCustomer?.data.KH ?? 0) + (bankLoan?.data.KH ?? 0)
  //     + (otherLoan?.data.KH ?? 0) + (quity?.data.KH ?? 0),
  //   nvkd: (payableCustomer?.data.NVKD ?? 0) + (bankLoan?.data.NVKD ?? 0)
  //     + (otherLoan?.data.NVKD ?? 0) + (quity?.data.NVKD ?? 0),
  // }

  // // khấu hao tài sản
  // const depreciation = storage.finance.D.find(item => item.id === 25)
  // // thuế
  // const tax = storage.finance.D.find(item => item.id === 26)
  // // CHU KỲ VỐN LƯU ĐỘNG
  // const capitalCycle = storage.finance.D.find(item => item.id === 30)
  // // Vốn tổ chức tài chính khác
  // const financialInstitutions = storage.finance.D.find(item => item.id === 36)
  // // Phải trả người bán/mượn khác
  // const payableToSellers_borrowers = storage.finance.D.find(item => item.id === 37)

  // // tổng tài sản bảng D
  // const totalAssetsTableD: ICost = {
  //   t2: (cash_bankDeposits?.data.T2 ?? 0) + (inventory?.data.T2 ?? 0) + (recievableCustomer?.data.T2 ?? 0),
  //   t1: (cash_bankDeposits?.data.T1 ?? 0) + (inventory?.data.T1 ?? 0) + (recievableCustomer?.data.T1 ?? 0),
  //   t: (cash_bankDeposits?.data.T ?? 0) + (inventory?.data.T ?? 0) + (recievableCustomer?.data.T ?? 0),
  //   kh: (cash_bankDeposits?.data.KH ?? 0) + (inventory?.data.KH ?? 0) + (recievableCustomer?.data.KH ?? 0),
  //   nvkd: (cash_bankDeposits?.data.NVKD ?? 0) + (inventory?.data.NVKD ?? 0) + (recievableCustomer?.data.NVKD ?? 0),
  // }
  // // Tổng chi phí cần thiết
  // const totalNeedCost: ICost = {
  //   t2: (netRevenue?.data.T2 ?? 0) - ((depreciation?.data.T2 ?? 0) + (tax?.data.T2 ?? 0) + (netProfit.t2)),
  //   t1: (netRevenue?.data.T1 ?? 0) - ((depreciation?.data.T1 ?? 0) + (tax?.data.T1 ?? 0) + (netProfit.t1)),
  //   t: (netRevenue?.data.T ?? 0) - ((depreciation?.data.T ?? 0) + (tax?.data.T ?? 0) + (netProfit.t)),
  //   kh: (netRevenue?.data.KH ?? 0) - ((depreciation?.data.KH ?? 0) + (tax?.data.KH ?? 0) + (netProfit.kh)),
  //   nvkd: (netRevenue?.data.NVKD ?? 0) - ((depreciation?.data.NVKD ?? 0) + (tax?.data.NVKD ?? 0) + (netProfit.nvkd)),
  // }
  // // // Vòng quay vốn lưu động
  // // const WorkingCapitalTurnover: ICost = {
  // //   t2: capitalCycle?.data.T2 !== 0 ? 365 / (capitalCycle?.data.T2 ?? 0) : ((netRevenue?.data.T2 ?? 0) / totalAssetsTableD.t2),
  // //   t1: capitalCycle?.data.T1 !== 0 ? 365 / (capitalCycle?.data.T1 ?? 0) : ((netRevenue?.data.T1 ?? 0) / totalAssetsTableD.t1),
  // //   t: capitalCycle?.data.T !== 0 ? 365 / (capitalCycle?.data.T ?? 0) : ((netRevenue?.data.T ?? 0) / totalAssetsTableD.t),
  // //   kh: capitalCycle?.data.KH !== 0 ? 365 / (capitalCycle?.data.KH ?? 0) : ((netRevenue?.data.KH ?? 0) / totalAssetsTableD.kh),
  // //   nvkd: capitalCycle?.data.NVKD !== 0 ? 365 / (capitalCycle?.data.NVKD ?? 0) : ((netRevenue?.data.NVKD ?? 0) / totalAssetsTableD.nvkd),
  // // }
  // // // Nhu cầu vốn/Vòng quay Vốn lưu động
  // // const capitalNeed_capital_turnover: ICost = {
  // //   t2: totalNeedCost.t2 / WorkingCapitalTurnover.t2,
  // //   t1: totalNeedCost.t1 / WorkingCapitalTurnover.t1,
  // //   t: totalNeedCost.t / WorkingCapitalTurnover.t,
  // //   kh: totalNeedCost.kh / WorkingCapitalTurnover.kh,
  // //   nvkd: totalNeedCost.nvkd / WorkingCapitalTurnover.nvkd,
  // // }

  //   // Vòng quay vốn lưu động
  //   const WorkingCapitalTurnover = {
  //     t2: (() => {
  //       if (netRevenue?.data.T2 === null || totalAssetsTableD.t2 === 0 ) return 0;
  //       return capitalCycle?.data.T2 !== 0 ? formatRoundNumber(365 / (capitalCycle?.data.T2 ?? 0)) : formatRoundNumber((netRevenue?.data.T2 ?? 0) / totalAssetsTableD.t2);
  //     })(),
  //     t1: (() => {
  //       if (netRevenue?.data.T1 === null || totalAssetsTableD.t1 === 0 ) return 0;
  //       return capitalCycle?.data.T1 !== 0 ? formatRoundNumber(365 / (capitalCycle?.data.T1 ?? 0)) : formatRoundNumber((netRevenue?.data.T1 ?? 0) / totalAssetsTableD.t1);
  //     })(),
  //     t: (() => {
  //       if (netRevenue?.data.T === null || totalAssetsTableD.t === 0 ) return 0;
  //       return capitalCycle?.data.T !== 0 ? formatRoundNumber(365 / (capitalCycle?.data.T ?? 0)) : formatRoundNumber((netRevenue?.data.T ?? 0) / totalAssetsTableD.t);
  //     })(),
  //     kh: (() => {
  //       if (netRevenue?.data.KH === null || totalAssetsTableD.kh === 0 ) return 0;
  //       return capitalCycle?.data.KH !== 0 ? formatRoundNumber(365 / (capitalCycle?.data.KH ?? 0)) : formatRoundNumber((netRevenue?.data.KH ?? 0) / totalAssetsTableD.kh);
  //     })(),
  //     nvkd: (() => {
  //       if (netRevenue?.data.NVKD === null || totalAssetsTableD.nvkd === 0 ) return 0;
  //       return capitalCycle?.data.NVKD !== 0 ? formatRoundNumber(365 / (capitalCycle?.data.NVKD ?? 0)) : formatRoundNumber((netRevenue?.data.NVKD ?? 0) / totalAssetsTableD.nvkd);
  //     })()
  //   }

  // // Nhu cầu vốn/Vòng quay Vốn lưu động
  // const capitalNeed_capital_turnover = {
  //   t2: (WorkingCapitalTurnover.t2 === 0 || totalNeedCost.t2 === 0) ? 0 : formatRoundNumber(totalNeedCost.t2 / WorkingCapitalTurnover.t2),
  //   t1: (WorkingCapitalTurnover.t1 === 0 || totalNeedCost.t1 === 0 )? 0 : formatRoundNumber(totalNeedCost.t1 / WorkingCapitalTurnover.t1),
  //   t: WorkingCapitalTurnover.t === 0  || totalNeedCost.t === 0  ? 0 : formatRoundNumber(totalNeedCost.t / WorkingCapitalTurnover.t),
  //   kh: WorkingCapitalTurnover.kh === 0 || totalNeedCost.kh === 0  ? 0 : formatRoundNumber(totalNeedCost.kh / WorkingCapitalTurnover.kh),
  //   nvkd: WorkingCapitalTurnover.nvkd === 0 || totalNeedCost.nvkd === 0  ? 0 : formatRoundNumber(totalNeedCost.nvkd / WorkingCapitalTurnover.nvkd),

  // }

  // // Vốn huy động khác
  // const otherCapital: ICost = {
  //   t2: (financialInstitutions?.data.T2 ?? 0) + (payableToSellers_borrowers?.data.T2 ?? 0),
  //   t1: (financialInstitutions?.data.T1 ?? 0) + (payableToSellers_borrowers?.data.T1 ?? 0),
  //   t: (financialInstitutions?.data.T ?? 0) + (payableToSellers_borrowers?.data.T ?? 0),
  //   kh: (financialInstitutions?.data.KH ?? 0) + (payableToSellers_borrowers?.data.KH ?? 0),
  //   nvkd: (financialInstitutions?.data.NVKD ?? 0) + (payableToSellers_borrowers?.data.NVKD ?? 0),
  // }
  // // Vốn tự có & Huy động khác
  // const ownAndOtherCapital: ICost = {
  //   t2: (totalAssetsTableD.t2) + (otherCapital.t2),
  //   t1: (totalAssetsTableD.t1) + (otherCapital.t1),
  //   t: (totalAssetsTableD.t) + (otherCapital.t),
  //   kh: (totalAssetsTableD.kh) + (otherCapital.kh),
  //   nvkd: (totalAssetsTableD.nvkd) + (otherCapital.nvkd),
  // }
  // // Nhu cầu Vốn lưu động cần vay SCB
  // const capital_turnover_scb: ICost = {
  //   t2: (capitalNeed_capital_turnover.t2) - (ownAndOtherCapital.t2),
  //   t1: (capitalNeed_capital_turnover.t1) - (ownAndOtherCapital.t1),
  //   t: (capitalNeed_capital_turnover.t) - (ownAndOtherCapital.t),
  //   kh: (capitalNeed_capital_turnover.kh) - (ownAndOtherCapital.kh),
  //   nvkd: (capitalNeed_capital_turnover.nvkd) - (ownAndOtherCapital.nvkd),
  // }

  const findCurrency = () => {
    const ccy = master.currencyType.data.find(
      (i) => i.id === storage.needAndPlan.currency
    );
    return {
      currency_code: ccy?.id,
      currency_name: ccy?.name,
    };
  };
  // const findLocation = (proviceCode?: string, districCode?: string, wardCode?: string) => {
  //   const prv = master.province['VN']?.data.find(p => p.province_code === proviceCode);
  //   const dst = master.district[prv?.province_code as string]?.data.find(d => d.district_code === districCode);
  //   const wrd = master.ward[dst?.district_code as string]?.data.find(w => w.ward_code === wardCode);
  //   return {
  //     province: proviceCode ? prv : {},
  //     district: districCode ? dst : {},
  //     ward: wardCode ? wrd : {}
  //   }
  // }
  // const findMethod = (code: string, master: IMasterData) => {
  //   return master.paymentMethod.data.find(i => i.id === code)
  // }
  const findLocation = (
    proviceCode?: string,
    districCode?: string,
    wardCode?: string
  ) => {
    const prv = master.province.data.find((p) => p.id === proviceCode);
    const dst = master.district[prv?.id as string]?.data.find(
      (d) => d.id === districCode
    );
    const wrd = master.ward[dst?.id as string]?.data.find(
      (w) => w.id === wardCode
    );
    return {
      province: proviceCode
        ? { province_code: prv?.id, province_name: prv?.name }
        : {},
      district: districCode
        ? { district_code: dst?.id, district_name: dst?.name }
        : {},
      ward: wardCode ? { ward_code: wrd?.id, ward_name: wrd?.name } : {},
    };
  };
  // const findMethod=(code:string,master:IMasterData) =>{
  //   return master.paymentMethod.data.find(i =>i.code === code)
  // }

  const name = (id: number) => {
    switch (id) {
      case 7:
        return 'Doanh thu thuần';
      case 8:
        return 'Tổng chi phí';
      case 9:
        return 'Giá vốn hàng bán';
      case 10:
        return 'Chi phí quản lý';
      case 11:
        return 'Chi phí lãi vay';
      case 12:
        return 'Chi phí khác';
      case 13:
        return 'Lợi nhuận ròng';
      case 14:
        return 'Tổng tài sản';
      case 15:
        return 'Tiền mặt / Tiền gửi ngân hàng';
      case 16:
        return 'Hàng tồn kho';
      case 17:
        return 'Phải thu khách hàng';
      case 18:
        return 'Tài sản cố định';
      case 19:
        return 'Nguồn vốn';
      case 20:
        return 'Phải trả khách hàng';
      case 21:
        return 'Vay ngân hàng';
      case 22:
        return 'Vay khác';
      case 23:
        return 'Vốn chủ sở hữu';
      case 24:
        return 'Doanh thu thuần';
      case 25:
        return 'Khấu hao tài sản';
      case 26:
        return 'Thuế';
      case 27:
        return 'Lợi nhuận định mức';
      case 28:
        return 'Tổng chi phí cần thiết';
      case 29:
        return 'Tồng tài sản ngắn hạn';
      case 30:
        return 'Chu kỳ vốn lưu động';
      case 31:
        return 'Vòng quay vốn lưu động';
      case 32:
        return 'Nhu cầu vốn/Vòng quay Vốn lưu động';
      case 33:
        return 'Vốn tự có & Huy động khác';
      case 34:
        return 'Vốn lưu động tự có';
      case 35:
        return 'Vốn huy động khác';
      case 36:
        return 'Vốn tổ chức tài chính khác';
      case 37:
        return 'Phải trả người bán/mượn khác';
      case 38:
        return 'Nhu cầu Vốn lưu động cần vay SCB';
    }
  };

  // const value = (id: number, t: string) => {
  //   switch (id) {
  //     case 24:
  //       return valueNetRevenue[t as keyof ILOANNormalStorageLOANFinanceMetadataValue] ?? 0 ;
  //     case 27:
  //       return netProfit[t.toLowerCase() as keyof ICost] ?? 0;
  //     case 28:
  //       return totalNeedCost[t.toLowerCase() as keyof ICost] ?? 0;
  //     case 29:
  //       return totalAssetsTableD[t.toLowerCase() as keyof ICost] ?? 0;
  //     case 31:
  //       return WorkingCapitalTurnover[t.toLowerCase() as keyof ICost] ?? 0;
  //     case 32:
  //       return capitalNeed_capital_turnover[t.toLowerCase() as keyof ICost] ?? 0;
  //     case 33:
  //       return ownAndOtherCapital[t.toLowerCase() as keyof ICost] ?? 0;
  //     case 34:
  //       return totalAssetsTableD[t.toLowerCase() as keyof ICost] ?? 0;
  //     case 35:
  //       return otherCapital[t.toLowerCase() as keyof ICost] ?? 0;
  //     case 38:
  //       return capital_turnover_scb[t.toLowerCase() as keyof ICost] ?? 0;

  //   }
  // }

  const column = ['T-2', 'T-1', 'T', 'T+1', 'T+1'];

  const tableA = () => {
    let list: IBusinessResultList[] = [];
    storage.finance.A.forEach((a) => {
      list.push({
        finance_metadata_id: a.id,
        finance_metadata_name: name(a.id) ?? '',
        finance_metadata_item_info: ['T2', 'T1', 'T', 'KH', 'NVKD'].map(
          (t, index) => {
            return {
              timeline_assign_info: {
                id: index + 1,
                name: column[index],
              },
              timeline_assign_value:
                a.data[t as keyof ILOANNormalStorageLOANFinanceMetadataValue] ??
                0,
            };
          }
        ),
      });
    });
    // list.push({
    //   finance_metadata_id: 8,
    //   finance_metadata_name: name(8) ?? '',
    //   finance_metadata_item_info: ['T2', 'T1', 'T', 'KH', 'NVKD'].map((t, index) => {
    //     return {
    //       timeline_assign_info: {
    //         id: index + 1,
    //         name: column[index]
    //       },
    //       timeline_assign_value: countTotalCostT2()[t.toLowerCase() as keyof ICost] ?? 0
    //     }
    //   })
    // })
    // list.push({
    //   finance_metadata_id: 13,
    //   finance_metadata_name: name(13) ?? '',
    //   finance_metadata_item_info: ['T2', 'T1', 'T', 'KH', 'NVKD'].map((t, index) => {
    //     return {
    //       timeline_assign_info: {
    //         id: index + 1,
    //         name: column[index]
    //       },
    //       timeline_assign_value: netProfit[t.toLowerCase() as keyof ICost] ?? 0
    //     }
    //   })
    // })
    return list;
  };
  const tableB = () => {
    let list: IBusinessResultList[] = [];
    storage.finance.B.forEach((a) => {
      list.push({
        finance_metadata_id: a.id,
        finance_metadata_name: name(a.id) ?? '',
        finance_metadata_item_info: ['T2', 'T1', 'T', 'KH', 'NVKD'].map(
          (t, index) => {
            return {
              timeline_assign_info: {
                id: index + 1,
                name: column[index],
              },
              timeline_assign_value:
                a.data[t as keyof ILOANNormalStorageLOANFinanceMetadataValue] ??
                0,
            };
          }
        ),
      });
    });
    // list.push({
    //   finance_metadata_id: 14,
    //   finance_metadata_name: name(14) ?? '',
    //   finance_metadata_item_info: ['T2', 'T1', 'T', 'KH', 'NVKD'].map((t, index) => {
    //     return {
    //       timeline_assign_info: {
    //         id: index + 1,
    //         name: column[index]
    //       },
    //       timeline_assign_value: countTotalAssets[t.toLowerCase() as keyof ICost] ?? 0
    //     }
    //   })
    // })
    // list.push({
    //   finance_metadata_id: 19,
    //   finance_metadata_name: name(19) ?? '',
    //   finance_metadata_item_info: ['T2', 'T1', 'T', 'KH', 'NVKD'].map((t, index) => {
    //     return {
    //       timeline_assign_info: {
    //         id: index + 1,
    //         name: column[index]
    //       },
    //       timeline_assign_value: countCapital[t.toLowerCase() as keyof ICost] ?? 0
    //     }
    //   })
    // })
    return list;
  };
  // const valueD = [24, 27, 28, 29, 31, 32, 33, 34, 35, 38]
  const tableD = () => {
    let list: IBusinessResultList[] = [];
    storage.finance.D.forEach((a) => {
      list.push({
        finance_metadata_id: a.id,
        finance_metadata_name: name(a.id) ?? '',
        finance_metadata_item_info: ['T2', 'T1', 'T', 'KH', 'NVKD'].map(
          (t, index) => {
            return {
              timeline_assign_info: {
                id: index + 1,
                name: column[index],
              },
              timeline_assign_value:
                a.data[t as keyof ILOANNormalStorageLOANFinanceMetadataValue] ??
                0,
            };
          }
        ),
      });
    });
    // valueD.forEach(v => {
    //   list.push({
    //     finance_metadata_id: v,
    //     finance_metadata_name: name(v) ?? '',
    //     finance_metadata_item_info: ['T2', 'T1', 'T', 'KH', 'NVKD'].map((t, index) => {
    //       return {
    //         timeline_assign_info: {
    //           id: index + 1,
    //           name: column[index]
    //         },
    //         timeline_assign_value: value(v, t) ?? 0
    //       }
    //     }).filter(v => v.timeline_assign_value !== null)
    //   })
    // })
    return list;
  };

  const bodyPostStepA = {
    // loan_product_info: product ,
    // loan_program_info:{
    //      loan_term_info:{
    //       loan_term_type_id: 'PRODUCT_CATEGORY',
    //       loan_term_type_code: master.typeTermLoan.data.find(i => i.id === storage.product.loanType)?.id,
    //       loan_term_type_name: master.typeTermLoan.data.find(i => i.id === storage.product.loanType)?.name
    //     },
    //      loan_purpose_info: {
    //       product_purpose_id: 'MUC_DICH_VAY_THEO_SP',
    //       product_purpose_code: master.loanPurpose.data.find(i => i.id === storage.product.productPurpose)?.id,
    //       product_purpose_name: master.loanPurpose.data.find(i => i.id === storage.product.productPurpose)?.name
    //     },
    //      fcc_loan_purpose_info: {
    //       fcc_loan_purpose_id: 'MUC_DICH_VAY',
    //       fcc_loan_purpose_code: master.loanPurposeCore.data.find(i => i.id === storage.product.productPurpose)?.id,
    //       fcc_loan_purpose_name: master.loanPurposeCore.data.find(i => i.id === storage.product.productPurpose)?.name
    //     },
    //      actual_purpose_using_loan:storage.product.realPurpose
    // }
    loan_product_info: {
      category_info: {
        id: product.loan_product_category_info.product_category_id,
        code: product.loan_product_category_info.product_category_code,
        name: product.loan_product_category_info.product_category_name,
      },
      type_info: {
        id: product.loan_product_type_info.product_type_id,
        code: product.loan_product_type_info.product_type_code,
        name: product.loan_product_type_info.product_type_name,
      },
      detail_info: {
        id: product.loan_product_detail_info.product_detail_id,
        code: product.loan_product_detail_info.product_detail_code,
        name: product.loan_product_detail_info.product_detail_name,
      },
    },
    loan_program_info: {
      loan_term_info: {
        id: 'PRODUCT_CATEGORY',
        code: master.typeTermLoan.data.find(
          (i) => i.id === storage.product.loanType
        )?.id,
        name: master.typeTermLoan.data.find(
          (i) => i.id === storage.product.loanType
        )?.name,
      },
      loan_purpose_info: {
        id: 'MUC_DICH_VAY_THEO_SP',
        // code: 'BUSINESS',
        // name: 'Kinh Doanh'
        code: master.loanPurpose.data.find(
          (i) => i.id === storage.product.productPurpose
        )?.id,
        name: master.loanPurpose.data.find(
          (i) => i.id === storage.product.productPurpose
        )?.name,
      },
      fcc_loan_purpose_info: {
        id: 'MUC_DICH_VAY',
        code: master.loanPurposeCore.data.find(
          (i) => i.id === storage.product.corePurpose
        )?.id,
        name: master.loanPurposeCore.data.find(
          (i) => i.id === storage.product.corePurpose
        )?.name,
      },
      actual_purpose_using_loan: storage.product.realPurpose,
    },
  };

  const bodyPostStepB = {
    currency_info: findCurrency(),
    total_capital_requirements: storage.needAndPlan.need,
    owner_capital: storage.needAndPlan.ownCaptital,
    loan_amount: storage.needAndPlan.loanAmount,
    credit_granting_method_info: {
      id: 'LENDING_METHOD',
      code: master.lendingMethod.data.find(
        (i) => i.id === storage.needAndPlan.method
      )?.id,
      name: master.lendingMethod.data.find(
        (i) => i.id === storage.needAndPlan.method
      )?.name,
    },
    credit_request_period: storage.needAndPlan.expiredCredit,
    withdraw_month_term: storage.needAndPlan.expiredWithdraw,
    principal_grace_period: storage.needAndPlan.graceOrigin,
    scb_finance_percentage: storage.needAndPlan.scb_percentage,
    interest_rate: storage.needAndPlan.interestRate,
    interest_rate_adapt_period_info: {
      id: 'SCHEDULE_UNIT',
      code: master.loanInterestRate.data.find(
        (i) => i.id === storage.needAndPlan.periodAdjust
      )?.id,
      name: master.loanInterestRate.data.find(
        (i) => i.id === storage.needAndPlan.periodAdjust
      )?.name,
    },
    interest_rate_amplitude: storage.needAndPlan?.marginAdjust ?? 0,
    disbursement_method_info: {
      id: 'DISBURSEMENT',
      code: master.disbursement.data.find(
        (i) => i.id === storage.needAndPlan.disbursementMethod
      )?.id,
      name: master.disbursement.data.find(
        (i) => i.id === storage.needAndPlan.disbursementMethod
      )?.name,
    },
    principal_payment_method_info: {
      id: 'SCHEDULE_UNIT',
      code: master.schedule.data.find(
        (i) => i.id === storage.needAndPlan.repayOriginMethod
      )?.id,
      name: master.schedule.data.find(
        (i) => i.id === storage.needAndPlan.repayOriginMethod
      )?.name,
    },
    interest_payment_method_info: {
      id: 'SCHEDULE_UNIT',
      code: master.schedule.data.find(
        (i) => i.id === storage.needAndPlan.repayinterestMethod
      )?.id,
      name: master.schedule.data.find(
        (i) => i.id === storage.needAndPlan.repayinterestMethod
      )?.name,
    },
    principal_payment_period_amount: storage.needAndPlan.amountPaidEachPeriod,
    total_document_file: 1,
    document_info_list:
      storage?.needAndPlan?.document_info_list
        ?.filter(
          (parentDoc) =>
            !parentDoc.document_group.every(
              (doc) => (doc.child_files?.length ?? 0) === 0
            )
        )
        ?.map((parentDoc) => {
          const result: IResLOANNormalDocumentInfo = {
            document_id: parentDoc?.document_id ?? '',
            document_name: parentDoc?.document_name ?? '',
            document_group:
              parentDoc?.document_group
                ?.filter((doc) => (doc?.child_files?.length ?? 0) > 0)
                ?.map((doc) => {
                  const result: IResLOANNormalDocumentGroup = {
                    document_id: doc.document_id,
                    document_name: doc.document_name,
                    child_files:
                      doc.child_files?.map((file) => {
                        const result: IResLOANNormalRESChildFile = {
                          content_type: file?.content_type ?? null,
                          created_at: file?.created_at ?? 0,
                          created_by: file.created_by,
                          created_by_name: file.created_by_name,
                          updated_by: file.updated_by,
                          updated_by_name: file.updated_by_name,
                          name: file?.name ?? null,
                          size: file?.size ?? null,
                          type: file?.type ?? null,
                          updated_at: file?.updated_at ?? null,
                          uuid: file?.uuid ?? null,
                          version: file?.version ?? null,
                          custom_keys: file?.custom_keys ?? null,
                          description: file?.description ?? null,
                        };
                        return result;
                      }) ?? [],
                  };
                  return result;
                }) ?? [],
          };
          return result;
        }) ?? null,
    // document_info_list: [
    //   {
    //     document_id: 18,
    //     document_name: "GIẤY ĐỀ NGHỊ VAY VỐN",
    //     child_files: [
    //       {
    //         created_at: 1630886539,
    //         created_by: "LOS",
    //         updated_at: 1630886539,
    //         updated_by: "LOS",
    //         type: 2,
    //         uuid: "00d70c2a7f4449a3a36eacbdbebeee35",
    //         name: "00d70c2a7f4449a3a36eacbdbebeee35",
    //         content_type: "text/plain",
    //         size: 36176,
    //         version: 1,
    //       },
    //     ],
    //   },
    // ],
  };
  const warehouse = () => {
    if (!!storage.legalBusiness.stores.length) {
      return storage.legalBusiness.stores.map((item) => {
        if (
          item.apartment ||
          item.area ||
          item.province ||
          item.district ||
          item.ward
        ) {
          return {
            warehouse_area: item.area,
            address_info: {
              address: item.apartment,
              province_info: findLocation(item.province).province,
              district_info: findLocation(item.province, item.district)
                .district,
              ward_info: findLocation(item.province, item.district, item.ward)
                .ward,
            },
            primary_flag: item.primary,
          };
        } else {
          return {
            warehouse_area: storage.legalBusiness.area,
            address_info: {
              address: storage.legalBusiness.apartment.toString(),
              province_info: findLocation(storage.legalBusiness.province)
                .province,
              district_info: findLocation(
                storage.legalBusiness.province,
                storage.legalBusiness.district
              ).district,
              ward_info: findLocation(
                storage.legalBusiness.province,
                storage.legalBusiness.district,
                storage.legalBusiness.ward
              ).ward,
            },
            primary_flag: true,
          };
        }
      });
    } else {
      return [
        {
          warehouse_area: storage.legalBusiness.area,
          address_info: {
            address: storage.legalBusiness.apartment.toString(),
            province_info: findLocation(storage.legalBusiness.province)
              .province,
            district_info: findLocation(
              storage.legalBusiness.province,
              storage.legalBusiness.district
            ).district,
            ward_info: findLocation(
              storage.legalBusiness.province,
              storage.legalBusiness.district,
              storage.legalBusiness.ward
            ).ward,
          },
          primary_flag: true,
        },
      ];
    }
  };
  const bodyPostStepCI = {
    basic_info: {
      business_household_name: storage.legalBusiness.name,
      business_license_type_info: {
        id: 'BUSINESS_LICENSE_TYPE',
        code: master.businessLicenceType.data.find(
          (i) => i.code === storage.legalBusiness.type
        )?.code,
        name: master.businessLicenceType.data.find(
          (i) => i.code === storage.legalBusiness.type
        )?.name,
      },
      business_card_num: storage.legalBusiness.num,
      business_card_issue_date: storage.legalBusiness.issuedDate
        ? storage.legalBusiness.issuedDate / 1000
        : null,
      business_card_place_of_issue: storage.legalBusiness.placeOfIssued,
      business_working_year_num: storage.legalBusiness.numOfYear,
      business_main_info: {
        id: storage.legalBusiness.code,
        code: storage.legalBusiness.code,
        name: '',
      },
      business_actual: storage.legalBusiness.career,
    },
    business_info: {
      business_premises_area: storage.legalBusiness.area,
      owner_property_info: {
        id: 'OWNER_PROPERTY',
        code: master.ownerProperty.data.find(
          (i) => i.id === storage.legalBusiness.ownership
        )?.id,
        name: master.ownerProperty.data.find(
          (i) => i.id === storage.legalBusiness.ownership
        )?.name,
      },
      remaining_rental_period: storage.legalBusiness.remainLease,
      rental_cost: storage.legalBusiness.rentPrice,
      address_info: {
        address: storage.legalBusiness.apartment.toString(),
        province_info: findLocation(storage.legalBusiness.province).province,
        district_info: findLocation(
          storage.legalBusiness.province,
          storage.legalBusiness.district
        ).district,
        ward_info: findLocation(
          storage.legalBusiness.province,
          storage.legalBusiness.district,
          storage.legalBusiness.ward
        ).ward,
      },
    },
    warehouse_info: warehouse(),
  };
  // console.log(JSON.stringify(bodyPostStepCI),'bodyPostStepCI');

  const bodyPostStepCII = {
    // Table A
    business_result_list: tableA(),
    // Table B
    asset_balance_capital_list: tableB(),
    // Form C
    business_finance_cash_flow_info: {
      cash_flow_info: {
        input_info: {
          category_info: {
            id: 'CASHFLOW_TYPE',
            code: 'IMP',
            name: 'Đầu vào',
          },
          timeline_info: [
            {
              timeline_assign_info: {
                id: 1,
                name: 'T-2',
              },
              timeline_assign_value: storage.finance.C.supplyData.T2 ?? 0,
            },
            {
              timeline_assign_info: {
                id: 2,
                name: 'T-1',
              },
              timeline_assign_value: storage.finance.C.supplyData.T1 ?? 0,
            },
            {
              timeline_assign_info: {
                id: 3,
                name: 'T',
              },
              timeline_assign_value: storage.finance.C.supplyData.T ?? 0,
            },
            {
              timeline_assign_info: {
                id: 4,
                name: 'T+1',
              },
              timeline_assign_value: storage.finance.C.supplyData.KH ?? 0,
            },
            {
              timeline_assign_info: {
                id: 5,
                name: 'T+1',
              },
              timeline_assign_value: storage.finance.C.supplyData.NVKD ?? 0,
            },
          ],
          vendor_info:
            storage.finance.C.suppliers.map((sp) => {
              return {
                name: sp.info,
                exchange_method_info: {
                  id: 'PAYMENT',
                  code: master.paymentMethod.data.find(
                    (i) => i.code === sp.payment
                  )?.code,
                  name: master.paymentMethod.data.find(
                    (i) => i.code === sp.payment
                  )?.name,
                },
                payment_method_info: {
                  id: 'DISBURSEMENT',
                  code: master.methodReceiveSalary.data.find(
                    (i) => i.code === sp.method
                  )?.code,
                  name: master.methodReceiveSalary.data.find(
                    (i) => i.code === sp.method
                  )?.name,
                },
                primary_flag: sp.primary,
              };
            }) ?? [],
        },
        output_info: {
          category_info: {
            id: 'CASHFLOW_TYPE',
            code: 'EXP',
            name: 'Đầu ra',
          },
          timeline_info: [
            {
              timeline_assign_info: {
                id: 1,
                name: 'T-2',
              },
              timeline_assign_value: storage.finance.C.purchasingData.T2 ?? 0,
            },
            {
              timeline_assign_info: {
                id: 2,
                name: 'T-1',
              },
              timeline_assign_value: storage.finance.C.purchasingData.T1 ?? 0,
            },
            {
              timeline_assign_info: {
                id: 3,
                name: 'T',
              },
              timeline_assign_value: storage.finance.C.purchasingData.T ?? 0,
            },
            {
              timeline_assign_info: {
                id: 4,
                name: 'T+1',
              },
              timeline_assign_value: storage.finance.C.purchasingData.KH ?? 0,
            },
            {
              timeline_assign_info: {
                id: 5,
                name: 'T+1',
              },
              timeline_assign_value: storage.finance.C.purchasingData.NVKD ?? 0,
            },
          ],
          vendor_info:
            storage.finance.C.purchasingPartner.map((sp) => {
              return {
                name: sp.info,
                exchange_method_info: {
                  id: 'PAYMENT',
                  code: master.paymentMethod.data.find(
                    (i) => i.code === sp.payment
                  )?.code,
                  name: master.paymentMethod.data.find(
                    (i) => i.code === sp.payment
                  )?.name,
                },
                payment_method_info: {
                  id: 'DISBURSEMENT',
                  code: master.methodReceiveSalary.data.find(
                    (i) => i.code === sp.method
                  )?.code,
                  name: master.methodReceiveSalary.data.find(
                    (i) => i.code === sp.method
                  )?.name,
                },
                primary_flag: sp.primary,
              };
            }) ?? [],
        },
      },
      general_comment: storage.finance.C.note,
      general_offer: storage.finance.C.suggest,
    },

    //Table D
    credit_limit_info: tableD(),
    analysis_evaluate_info: {
      appraised_analysis_info: {
        id: 'ABLE_PAY_LABEL',
        code:
          master.ablePayLabel.data.find(
            (i) => i.code === storage.finance.E.loan_appraised_analysis_info
          )?.id ?? '',
        name:
          master.ablePayLabel.data.find(
            (i) => i.code === storage.finance.E.loan_appraised_analysis_info
          )?.name ?? '',
      },
      evaluate_info: {
        id: 'REMARK',
        code:
          master.remark.data.find(
            (i) => i.code === storage.finance.E.loan_evaluate_info
          )?.code ?? '',
        name:
          master.remark.data.find(
            (i) => i.code === storage.finance.E.loan_evaluate_info
          )?.name ?? '',
      },
      comment: storage.finance.E.loan_comment,
    },
  };
  switch (stepName) {
    case 'product':
      return apiPost<unknown>(
        formatPath(API_LOAN_NORMAL_SAVE_LOAN_PRODUCT, los_uuid),
        bodyPostStepA
      );
    case 'need-and-plan':
      return apiPost<unknown>(
        formatPath(API_LOAN_NORMAL_SAVE_CAPITAL_NEED, los_uuid),
        bodyPostStepB
      );
    case 'business/household-legal':
      return apiPost<unknown>(
        formatPath(API_LOAN_NORMAL_SAVE_BUSSINESS_HOUSEHOULD, los_uuid),
        bodyPostStepCI
      );
    case 'business/finance-analysis':
      console.log('postttt', bodyPostStepCII);
      return apiPost<unknown>(
        formatPath(API_LOAN_NORMAL_SAVE_FINANCE_ANALYSIS, los_uuid),
        bodyPostStepCII
      );
  }
};
export const deleteLOAN = (stepName: string, los_uuid: string) => {
  switch (stepName) {
    case 'product':
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_SAVE_LOAN_PRODUCT, los_uuid)
      );
    case 'need-and-plan':
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_SAVE_CAPITAL_NEED, los_uuid)
      );
    case 'business/household-legal':
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_SAVE_BUSSINESS_HOUSEHOULD, los_uuid)
      );
    case 'business/finance-analysis':
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_SAVE_FINANCE_ANALYSIS, los_uuid)
      );
  }
};

export const saveFileLOAN = (action: FormData) => {
  return apiPost<unknown>(
    formatPath(API_BASE_URL_S1 + '/configs/multi-upload/'),
    action,
    {
      // change step 2
      'Content-Type': 'multipart/form-data',
    }
  );
};
