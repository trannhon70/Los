import { Draft } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";
import { formatRoundNumber } from "utils";
import { TFinanceMetaGroup } from "./case";
import { EmptyMetadataValue, LIST_ID_TABLE_A, LIST_ID_TABLE_B, LIST_ID_TABLE_D } from "./emptyData";

export const updateFinanceAfterChangeInput = (state: Draft<ILOANNormalState>, meta: TFinanceMetaGroup) => {
  if(LIST_ID_TABLE_A.includes(meta.group)){
    updateTableA(state, meta)
  }

  if(LIST_ID_TABLE_B.includes(meta.group)){
    updateTableB(state, meta)
  }

  if(LIST_ID_TABLE_D.includes(meta.group)){
    updateTableD(state, meta)
  }

  if(meta.group === 17 || meta.group === 20){
    updateTableC(state, meta)
  }

  if([7,9,10,11,12,15,16,17].includes(meta.group)){
    updateTableD(state, meta)
  }

}

export const updateTableA = (state: Draft<ILOANNormalState>, meta: TFinanceMetaGroup) => {
  const data7 = state.storage.loan.finance.A?.find(e => e.id === 7)?.data ?? EmptyMetadataValue(); 
  const total_cost = [9,10,11,12].reduce((prev, curId) => {
    return (state.storage.loan.finance.A?.find(e => e.id === curId)?.data[meta.field] ?? 0) + prev
  },0)

  state.storage.loan.finance.A =
    state.storage.loan.finance.A.map((o) => {
      if (o.id === 8) {
        return {
          ...o,
          data: { ...o.data, [meta.field]: total_cost },
        };
      }
      else if(o.id === 13){
        return {
          ...o,
          data: { ...o.data, [meta.field]: (data7[meta.field] ?? 0) - total_cost},
        };
      }
      return { ...o };
    });
}

export const updateTableB = (state: Draft<ILOANNormalState>, meta: TFinanceMetaGroup) => {
  const total_collateral = [15,16,17,18].reduce((prev, curId) => {
    return (state.storage.loan.finance.B?.find(e => e.id === curId)?.data[meta.field] ?? 0) + prev
  },0)

  const total_source_capital = [20,21,22,23].reduce((prev, curId) => {
    return (state.storage.loan.finance.B?.find(e => e.id === curId)?.data[meta.field] ?? 0) + prev
  },0)
  
  state.storage.loan.finance.B =
    state.storage.loan.finance.B.map((o) => {
      if (o.id === 14) {
        return {
          ...o,
          data: { ...o.data, [meta.field]: total_collateral },
        };
      }
      else if(o.id === 19){
        return {
          ...o,
          data: { ...o.data, [meta.field]: total_source_capital },
        };
      }
      return { ...o };
    });
}

export const updateTableC = (state: Draft<ILOANNormalState>, meta: TFinanceMetaGroup) => {
  const supply = state.storage.loan.finance.B?.find(item => item.id === 20)
  const purchasing = state.storage.loan.finance.B?.find(item => item.id === 17)
  
  if(meta.group === 20) {
    state.storage.loan.finance.C = {
      ...state.storage.loan.finance.C,
      supplyData: {
        ...state.storage.loan.finance.C.supplyData,
        [meta.field]: formatRoundNumber((supply?.data[meta.field] ?? 0) / 12, 0)
      },
    }
  }
  if(meta.group === 17) {
    state.storage.loan.finance.C = {
      ...state.storage.loan.finance.C,
      purchasingData: {
        ...state.storage.loan.finance.C.purchasingData,
        [meta.field]: formatRoundNumber((purchasing?.data[meta.field] ?? 0) / 12, 0)
      }
    }
  }
}

export const updateTableD = (state: Draft<ILOANNormalState>, meta: TFinanceMetaGroup) => {
  const total_cost = state.storage.loan.finance.A?.find(item => item.id === 7)?.data[meta.field] ?? 0
  const net_profit = state.storage.loan.finance.A?.find(item => item.id === 13)?.data[meta.field] ?? 0

  const data15 = state.storage.loan.finance.B?.find(item => item.id === 15)?.data[meta.field] ?? 0
  const data16 = state.storage.loan.finance.B?.find(item => item.id === 16)?.data[meta.field] ?? 0
  const data17 = state.storage.loan.finance.B?.find(item => item.id === 17)?.data[meta.field] ?? 0

  const data25 = state.storage.loan.finance.D?.find(item => item.id === 25)?.data[meta.field] ?? 0
  const data26 = state.storage.loan.finance.D?.find(item => item.id === 26)?.data[meta.field] ?? 0
  const data30 = state.storage.loan.finance.D?.find(item => item.id === 30)?.data[meta.field] ?? 0
  const data36 = state.storage.loan.finance.D?.find(item => item.id === 36)?.data[meta.field] ?? 0
  const data37 = state.storage.loan.finance.D?.find(item => item.id === 37)?.data[meta.field] ?? 0

  const tcpct =  total_cost - (data25 + data26 + net_profit) 
  const ttsnh = data15 + data16 + data17
  const vqvld = data30 !== 0 ? formatRoundNumber(365/data30) : (ttsnh !== 0) ? formatRoundNumber(total_cost/ttsnh) : 0

  const ncvvqvld = vqvld !== 0 ? formatRoundNumber(tcpct/vqvld, 0) : 0

  const vhdk = data36 + data37

  state.storage.loan.finance.D =
    state.storage.loan.finance.D.map((o) => {
      if (o.id === 24) {
        return {
          ...o,
          data: { ...o.data, [meta.field]: total_cost },
        };
      }
      if(o.id === 27){
        return {
          ...o,
          data: { ...o.data, [meta.field]: net_profit },
        };
      }
      if(o.id === 28){
        return {
          ...o,
          data: { ...o.data, [meta.field]: tcpct },
        };
      }
      if(o.id === 29){
        return {
          ...o,
          data: { ...o.data, [meta.field]: ttsnh },
        };
      }
      if(o.id === 31){
        return {
          ...o,
          data: { ...o.data, [meta.field]: vqvld },
        };
      }
      if(o.id === 32){
        return {
          ...o,
          data: { ...o.data, [meta.field]: ncvvqvld },
        };
      }
      if(o.id === 33){
        return {
          ...o,
          data: { ...o.data, [meta.field]: ttsnh + vhdk},
        };
      }
      if(o.id === 34){
        return {
          ...o,
          data: { ...o.data, [meta.field]: ttsnh },
        };
      }
      if(o.id === 35){
        return {
          ...o,
          data: { ...o.data, [meta.field]: vhdk },
        };
      }
      if(o.id === 38){
        return {
          ...o,
          data: { ...o.data, [meta.field]: ncvvqvld - (ttsnh + vhdk) },
        };
      }
      return { ...o };
    });


}


