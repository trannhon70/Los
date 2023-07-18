import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { IId, IName, IPolicyId } from "types";
import { ILOANNormalState } from "types/models/loan/normal";
import { ILOANNormalStorageAnalysisState, ILOANNormalStorageControlApproval, ILOANNormalStorageExceptionDetail, ILOANNormalStorageOtherData, ILOANNormalStorageOtherValidate, ILOANNormalStorageRisksGroup, IOtherDocumentException, IOtherDocumentRisk } from "types/models/loan/normal/storage/Other";
import { IExceptionType, IPolicyDetail } from "types/models/master-data/state";
import { generateUUID } from "utils";
import { generateEmptyException, generateEmptyExceptionDetail, generateEmptyRisk } from "./generrateEmpty";

export const otherCase = {
  addException(state: Draft<ILOANNormalState>) {
    state.storage.other.exception.push(generateEmptyException())
  },
  setExceptionType: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<number, string, { uuid: string, dataExc: (IId & IName & IPolicyId)[], stt: number }>
    ) {
      const isExistd = state.storage.other.exception.find(exc =>
        exc.exceptionId === action.payload
      );
      if (isExistd) {
        const findIndex = state.storage.other.exception.findIndex(exc =>
          exc.exceptionId === action.payload
        )
        state.storage.other.exception[findIndex].detailList.push(generateEmptyExceptionDetail(action.payload));
        state.storage.other.exception.splice(action.meta.stt, 1);
      } else {
        const findIndexByUUID = state.storage.other.exception.findIndex(ex => ex.uuid === action.meta.uuid);
        const findExceptionTypeId = action.meta.dataExc.find(t => t.id.toString() === action.payload.toString())

        state.storage.other.exception[findIndexByUUID].exceptionName = findExceptionTypeId?.name as string;
        state.storage.other.exception[findIndexByUUID].exceptionId = action.payload;
      }
    },
    prepare(payload: number, meta: { uuid: string, dataExc: (IId & IName & IPolicyId)[], stt: number }) {
      return { payload, meta };
    }
  },
  addPolicyDetail(state: Draft<ILOANNormalState>, action: PayloadAction<{ exceptionId: number, stt: number }>) {
    // if(state.storage.other.exception.every(i=>i.exceptionId !== action.payload.exceptionId)){
    //   state.storage.other.exception[action.payload.stt]?.detailList?.push({
    //     ...generateEmptyExceptionDetail(action.payload.exceptionId),
    //     exceptionId: action.payload.exceptionId,
    //   })
    // }
    state.storage.other.exception[action.payload.stt]?.detailList?.push({
      ...generateEmptyExceptionDetail(action.payload.exceptionId),
      exceptionId: action.payload.exceptionId,
    })
  },
  setPolicyDetail: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string, { detail: ILOANNormalStorageExceptionDetail, stt: number, policyDetail: IPolicyDetail[] }>
    ) {
      const excData = action.meta.policyDetail.filter(x => x.code === action.payload);
      state.storage.other.exception = state.storage.other.exception.map(ex => {
        if (ex?.exceptionId === action.meta.detail?.exceptionId) {
          ex.detailList = ex.detailList.map(po => {
            if (po.uuid === action.meta.detail.uuid) {
              return {
                ...po,
                exceptionDetailId: Number(excData[0]?.id),
                exceptionDetailName: excData[0]?.name,
                exceptionDetailCode: excData[0]?.code,
                exceptionDetailDescription: excData[0]?.description
              }
            }
            return po;
          })
        }
        return ex;
      })
    },
    prepare(payload: string, meta: { detail: ILOANNormalStorageExceptionDetail, stt: number, policyDetail: IPolicyDetail[] }) {
      return { payload, meta };
    }
  },
  addNewRisk(state: Draft<ILOANNormalState>) {
    state.storage.other.analysis.risksGroup.push(generateEmptyRisk());
  },
  setRiskType: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string, { dataRiskType: ILOANNormalStorageRisksGroup }>
    ) {
      state.storage.other.analysis.risksGroup = state.storage.other.analysis.risksGroup.map(rs => {
        if (rs.uuid === action.meta.dataRiskType.uuid) {
          return {
            ...rs,
            riskInfo: action.payload
          }
        }
        return rs;
      })
    },
    prepare(payload: string, meta: { dataRiskType: ILOANNormalStorageRisksGroup }) {
      return { payload, meta };
    }
  },
  deleteRiskType(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    const idx = state.storage.other.analysis.risksGroup.findIndex(r => r.uuid === action.payload);
    state.storage.other.analysis.risksGroup.splice(idx, 1);
  },
  setMeasuresLimitRisk: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string, { uuid: string }>
    ) {
      const idx = state.storage.other.analysis.risksGroup.findIndex(r => r.uuid === action.meta.uuid);
      state.storage.other.analysis.risksGroup[idx].measuresLimitRisk = action.payload;
    },
    prepare(payload: string, meta: { uuid: string }) {
      return { payload, meta };
    }
  },
  setAcceptCredit(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.other.analysis.acceptCreditInfo = action.payload;
  },
  setReasonCredit(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.other.analysis.reasonCredit = action.payload;
  },

  setAcceptCreditControl(state: Draft<ILOANNormalState>, action: PayloadAction<{
    key: keyof Pick<ILOANNormalStorageAnalysisState, 'controlCredit' | 'approveCredit'>,
    keydata: keyof ILOANNormalStorageControlApproval,
    data: string
  }>) {
    state.storage.other.analysis[action.payload.key][action.payload.keydata] = action.payload.data
  },

  setRealityDescription: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string, { detail: ILOANNormalStorageExceptionDetail, stt: number }>
    ) {
      state.storage.other.exception = state.storage.other.exception.map(ex => {
        if (ex?.exceptionId === action.meta.detail?.exceptionId) {
          ex.detailList = ex.detailList.map(po => {
            if (po.uuid === action.meta.detail.uuid) {
              return {
                ...po,
                exceptionRealityDescription: action.payload
              }
            }
            return po;
          })
        }
        return ex;
      })
    },
    prepare(payload: string, meta: { detail: ILOANNormalStorageExceptionDetail, stt: number }) {
      return { payload, meta };
    }
  },
  deleteExceptionDetail(state: Draft<ILOANNormalState>, action: PayloadAction<{ uuid_list: string, uuid_item: string }>) {
    state.storage.other.exception.map((ex, id) => {
      // eslint-disable-next-line array-callback-return
      ex.detailList.map((de, idx) => {
        if (ex.detailList.length === 1 && de.uuid === action.payload.uuid_item) {
          state.storage.other.exception.splice(id, 1);
        } else {
          if (de.uuid === action.payload.uuid_item) {
            ex.detailList.splice(idx, 1)
          }
        }
      })
      return ex
    })
  },
  deleteException(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.other.exception.map((ex, idx) => {
      if (ex.uuid === action.payload) {
        state.storage.other.exception.splice(idx, 1);
        state.storage.full.data?.form?.other_profile?.data?.exception_list?.splice(idx, 1);
        if(state.storage.other.exception.length===0){
          state.storage.other.report = null
        }
      }
      return ex;
    })
  },
  deleteAllException(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.other.exception = []
    state.storage.other.report = null
  },

  saveOtherControl(state: Draft<ILOANNormalState>, action: PayloadAction<{ currentState: string, position: string, item: string }>) { },

  saveOther: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<number, string, string>) { },
    prepare(payload: number, meta: string) {
      return { payload, meta };
    }
  },
  setOtherValidate(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalStorageOtherValidate>) {
    state.storage.other.validate = action.payload;
  },
  updateAPIStorageOtherException: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalStorageOtherData, string, string>) {

      const data = action.payload;

      state.storage.other = {
        ...state.storage.other,
        exception: data.exception_list.map((ex) => {
          return {
            uuid: ex.uuid,
            uuidRemote: generateUUID(),
            exceptionId: ex.exception_type_id,
            exceptionName: ex.exception_type_name,
            detailList: ex.detail_info_list.map((de) => {
              return {
                uuid: de.uuid,
                uuidRemote: generateUUID(),
                exceptionId: ex.exception_type_id,
                exceptionDetailId: de.exception_detail_id,
                exceptionDetailCode: de.exception_detail_code,
                exceptionDetailName: de.exception_detail_name,
                exceptionDetailDescription: de.exception_detail_description,
                exceptionRealityDescription: de.exception_reality_description,
                displayOrder: de.display_order,
              }
            }) ?? [] as unknown as ILOANNormalStorageExceptionDetail[],
          }
        }),
        report: data.unit_exception_report
      }

    },
    prepare(payload: ILOANNormalStorageOtherData, meta: string) {
      return { payload, meta };
    }
  },
  updateAPIStorageOtherRisk: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<IOtherDocumentRisk, string, string>) {

      const data = action.payload;

      state.storage.other = {
        ...state.storage.other,
        analysis: {
          ...state.storage.other.analysis,
          uuid: generateUUID(),
          uuidRemote: generateUUID(),
          reasonCredit: data.reason_credit,
          acceptCreditInfo: data.accept_credit_info?.code ?? "Y",
          risksGroup: data.risks_group_list.map(rs => {
            return {
              uuid: rs.uuid,
              uuidRemote: generateUUID(),
              displayOrder: rs.display_order,
              riskInfo: rs.risk_type_info.code,
              measuresLimitRisk: rs.measures_limit_risk,
            }
          }),
          approveCredit: {
            acceptCreditInfo: data?.accept_credit_approval_level?.accept_credit_status ?? "Y",
            reasonCredit: data?.accept_credit_approval_level?.reason_credit
          },
          controlCredit: {
            acceptCreditInfo: data?.accept_credit_control_level?.accept_credit_status ?? "Y",
            reasonCredit: data?.accept_credit_control_level?.reason_credit
          }
        },
      }

    },
    prepare(payload: IOtherDocumentRisk, meta: string) {
      return { payload, meta };
    }
  },
  updateFullStorageOtherException(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalStorageOtherData>) {
    if (state.storage.full.data) {
      state.storage.full.data.form.other_profile.data.exception_list = action.payload.exception_list
      state.storage.full.data.form.other_profile.data.unit_exception_report = action.payload.unit_exception_report

    }
  },
  clearNormalOtherStorage(state: Draft<ILOANNormalState>) {
    state.storage.other.exception = []
    state.storage.other.analysis.risksGroup = []
    state.storage.other.analysis.reasonCredit = ""
    state.storage.other.analysis.acceptCreditInfo = "Y"
  },
  updateStorageOtherReport(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.other.report = action.payload
  },

}
