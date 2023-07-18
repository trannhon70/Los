import {
    Draft,
    PayloadAction
} from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";
import { generateEmptyICRInfo, generateEmtyICR } from "./emtyData";
import {
  ILOANNormalChildfile,
  ILOANNormalDocumentGroup,
  ILOANNormalDocumentInfoList,
    ILOANNormalLOANUpload,
    ILOANNormalStorageICRData
    , ILOANNormalStorageICRDataBusinessCommon,
    ILOANNormalStorageICRDataResponse,
    ILOANNormalStorageICRDataState,
    ILOANNormalStorageICRDataUpdateRequest
} from "types/models/loan/normal/storage/ICR";
import { generateUUID, PREFIX_LOCAL } from "utils";

export const IRCCase = {
    // setLoanNormalCICBussinesCore: {
    //     reducer(state: Draft<ILOANNormalState>, action: PayloadAction<number, string, keyof ILOANNormalStorageICR>) {
    //         const declare = state.storage.icr[action.meta].declareActive;
    //         state.storage.icr[action.meta].data[declare].position = action.payload;
    //       },
    //       prepare(payload: number, meta: keyof ILOANNormalStorageICR) {
    //         return { payload, meta };
    //       }
    // },
    getInfoLoanNormalCIC(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
        state.storage.icr.data.id = action.payload;
    },

    updateLoanNormalCIC(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalStorageICRDataUpdateRequest>) {
        state.storage.icr.data.data.business_employee = action.payload.data.business_employee;
        state.storage.icr.data.data.approval_level = action.payload.data.approval_level;
        state.storage.icr.data.data.risk_management = action.payload.data.risk_management;
        state.storage.icr.data.data.document_info_list = action.payload.data.document_info_list?.map((docInfo) => {
          const currentList = state.storage.icr.data.data?.document_info_list?.find(e => e.document_id === docInfo.document_id)
          return {
            ...docInfo,
            uuid: currentList?.uuid ?? generateUUID(),
            document_group:
              docInfo?.document_group?.map((docG) => {
                const currentGroup = currentList?.document_group?.find(e => e.document_id === docG.document_id)
                return {
                ...docG,
                uuid: currentGroup?.uuid ?? generateUUID(),
                child_files: docG.child_files?.map((file)=>({
                  ...file,
                  file_upload:null
                })) ?? [],
              }}) ?? [],
          }}) ?? ([] as ILOANNormalDocumentInfoList[]);
    },
    // set data ux
    setLoanNormalBusinessEmpICRResult:{
        reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string| number, string, 
            {key:keyof ILOANNormalStorageICRDataBusinessCommon; gr:keyof ILOANNormalStorageICRData}>) {
                switch(action.meta.gr){
                    case 'business_employee':
                        state.storage.icr.data.data.business_employee = {
                            ...state.storage.icr.data.data.business_employee,[action.meta.key]:action.payload
                        }
                        break
                    case 'approval_level':
                        state.storage.icr.data.data.approval_level = {
                            ...state.storage.icr.data.data.approval_level,[action.meta.key]:action.payload
                        }
                        break
                    case 'risk_management':
                        state.storage.icr.data.data.risk_management = {
                            ...state.storage.icr.data.data.risk_management,[action.meta.key]:action.payload
                        }
                        break 
                }
        },
        prepare(payload: string | number, meta: {key:keyof ILOANNormalStorageICRDataBusinessCommon; gr:keyof ILOANNormalStorageICRData},) {
            return { payload, meta };
        }
    },
    // BussinesCore
    setLoanNormalCICBussinesCore(state: Draft<ILOANNormalState>, action: PayloadAction<number | string>) {
        state.storage.icr.validate.bussines_core = action.payload;
    },
    setLoanNormalCICBussinesRank(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
        state.storage.icr.validate.bussines_rank = action.payload;
    },
    setLoanNormalCICBussinesDate(state: Draft<ILOANNormalState>, action: PayloadAction<number | string>) {
        state.storage.icr.validate.bussines_date = action.payload;
    },

    // LevelOfApproval
    setLoanNormalCICLevelOfApprovalCore(state: Draft<ILOANNormalState>, action: PayloadAction<number | string>) {
        state.storage.icr.validate.level_of_approval_core = action.payload;
    },
    setLoanNormalCICLevelOfApprovalRank(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
        state.storage.icr.validate.level_of_approval_rank = action.payload;
    },
    setLoanNormalCICLevelOfApprovalDate(state: Draft<ILOANNormalState>, action: PayloadAction<number | string>) {
        state.storage.icr.validate.level_of_approval_date = action.payload;
    },

    // RiskManagement
    setLoanNormalCICRiskManagementCore(state: Draft<ILOANNormalState>, action: PayloadAction<number | string>) {
        state.storage.icr.validate.risk_management_core = action.payload;
    },
    setLoanNormalCICRiskManagementRank(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
        state.storage.icr.validate.risk_management_rank = action.payload;
    },
    setLoanNormalCICRiskManagementNote(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
        state.storage.icr.validate.risk_management_note = action.payload;
    },
    setLoanNormalCICRiskManagementDate(state: Draft<ILOANNormalState>, action: PayloadAction<number | string>) {
        state.storage.icr.validate.risk_management_date = action.payload;
    },
    saveLOANNormalICR(state:Draft<ILOANNormalState>,action:PayloadAction<string>){},
    updateDataLOANNormalICR(state:Draft<ILOANNormalState>,action:PayloadAction<ILOANNormalStorageICRDataResponse>){
        state.storage.icr.data.data = {
            ...state.storage.icr.data.data,
            approval_level: action.payload.approval_level,
            business_employee: action.payload.business_employee,
            risk_management: action.payload.risk_management,
            document_info_list: action?.payload?.document_info_list?.map((docInfo) => {
              const currentList = state.storage.icr.data.data?.document_info_list?.find(e => e.document_id === docInfo.document_id)
              return {
                ...docInfo,
                uuid: currentList?.uuid ?? generateUUID(),
                document_group:
                  docInfo?.document_group?.map((docG) => {
                    const currentGroup = currentList?.document_group?.find(e => e.document_id === docG.document_id)
                    return {
                    ...docG,
                    uuid: currentGroup?.uuid ?? generateUUID(),
                    child_files: docG.child_files?.map((file)=>({
                      ...file,
                      file_upload:null
                    })) ?? [],
                  }}) ?? [],
              }}) ?? ([] as ILOANNormalDocumentInfoList[]),
        }
        if(state.storage.full.data?.form){
            state.storage.full.data.form.internal_credit_rating.data = {
                ...state.storage.icr.data.data,
                approval_level: action.payload.approval_level,
                business_employee: action.payload.business_employee,
                risk_management: action.payload.risk_management,
                document_info_list: action.payload.document_info_list
            }
        }
    },
    clearNormalICRStorage(state:Draft<ILOANNormalState>){
        state.storage.icr.data.data.approval_level = generateEmtyICR()
        state.storage.icr.data.data.business_employee = generateEmtyICR()
        state.storage.icr.data.data.risk_management = generateEmtyICR()
        state.storage.icr.data.data.info = generateEmptyICRInfo()
    },
    ////// UPLOAD FILE
    mappingICRDataFileAlterUpload(state: Draft<ILOANNormalState>,action: PayloadAction<ILOANNormalDocumentInfoList[]>){
      state.storage.icr.data.data.document_info_list = action.payload
    },
  saveLOANNormalStorageICRModalAttachFile(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalLOANUpload>) {},
  mappingDataLOANNormalStorageICRModalAttachFile(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalChildfile[]>) {
    const docs = state.storage.icr.data.data.document_info_list;
    console.log("aaaaaaa",docs );
    console.log("filee", action.payload)
    if (docs){
      action.payload.forEach((fileRes)=>{
        if(!fileRes.custom_keys) return;
        const {parent_id = '', doc_id = '', local_id = '', description =''} = fileRes.custom_keys;
        const currentDoc = docs.find(it=>it.document_id === parent_id);
        if(!currentDoc) return;
        const currentDocGroup = currentDoc.document_group.find(it=>it.document_id === doc_id);
        if(!currentDocGroup) return;
        if(!currentDocGroup.child_files) return;
        const idx = currentDocGroup.child_files?.findIndex(it=>it.uuid === local_id);
        if(idx !== -1)  {
          const result:ILOANNormalChildfile = {
            ...currentDocGroup.child_files[idx],
            ...fileRes,
            description,
          }
          currentDocGroup.child_files[idx] = result;
        }
      })
    }
  },
   // Add new
   addNewLOANNormalStorageICRParentDoc(state: Draft<ILOANNormalState>) {
    const empty: ILOANNormalDocumentInfoList = {
      uuid: `${PREFIX_LOCAL}${generateUUID()}`,
      document_group: [],
      document_id: "",
      document_name: "",
    };
    const doc = state.storage.icr.data.data.document_info_list
      ? [...state.storage.icr.data.data.document_info_list]
      : [];
    doc.push(empty);
    state.storage.icr.data.data.document_info_list = doc;
  },
  setDataLOANNormalStorageICRParentDoc: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | null | number | undefined,
        string,
        {
          parentDoc_uuid: string;
          currentData: {
            label: string;
            value: string | null | number | undefined;
          };
        }
      >
    ) {
      const doc = state.storage.icr.data.data.document_info_list;
      if (!doc) return;
      state.storage.icr.data.data.document_info_list = doc.map(
        (parentDoc) => {
          if (parentDoc.uuid === action.meta.parentDoc_uuid) {
            const document_id = action.payload ?? "";
            const document_name = action?.meta?.currentData?.label ?? "";
            if (document_id && document_name) {
              return {
                ...parentDoc,
                document_id,
                document_name,
              };
            }
          }
          return parentDoc;
        }
      );
    },

    prepare(
      payload: string | null | number | undefined,
      meta: {
        parentDoc_uuid: string;
        currentData: {
          label: string;
          value: string | null | number | undefined;
        };
      }
    ) {
      return { payload, meta };
    },
  },
  // **********DOCUMENT GROUP ACTIONS******************
  addNewLOANNormalStorageICRDoc(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<{
      parentDoc_uuid: string;
    }>
  ) {
    const docInfos = state.storage.icr.data.data.document_info_list;

    state.storage.icr.data.data.document_info_list = docInfos.map(
      (docInfo) => {
        if (docInfo.uuid === action.payload.parentDoc_uuid) {
          const docGroups = docInfo.document_group
            ? [...docInfo.document_group]
            : [];
          const empty: ILOANNormalDocumentGroup = {
            uuid: `${PREFIX_LOCAL}${generateUUID()}`,
            child_files: [],
            document_id: "",
            document_name: "",
          };
          docGroups.push(empty);

          return { ...docInfo, document_group: docGroups };
        }
        return docInfo;
      }
    );
  },
  setDataLOANNormalStorageICRDoc: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | null | number | undefined,
        string,
        {
          parentDoc_uuid: string;
          doc_uuid: string;
          currentData: {
            label: string;
            value: string | null | number | undefined;
          };
        }
      >
    ) {
      const doc = state.storage.icr.data.data.document_info_list;
      if (!doc) return;
      state.storage.icr.data.data.document_info_list = doc.map(
        (parentDoc) => {
          if (parentDoc.uuid === action.meta.parentDoc_uuid) {
            return {
              ...parentDoc,
              document_group: parentDoc.document_group.map((docG) => {
                if (docG.uuid === action.meta.doc_uuid) {
                  const document_id = action.payload ?? "";
                  const document_name = action?.meta?.currentData?.label ?? "";
                  return {
                    ...docG,
                    document_id,
                    document_name,
                  };
                }
                return docG;
              }),
            };
          }
          return parentDoc;
        }
      );
    },

    prepare(
      payload: string | null | number | undefined,
      meta: {
        parentDoc_uuid: string;
        doc_uuid: string;
        currentData: {
          label: string;
          value: string | null | number | undefined;
        };
      }
    ) {
      return { payload, meta };
    },
  },
  // **********FILE ACTIONS******************
  addNewLOANNormalStorageICRFile(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<{
      parentDoc_uuid: string;
      doc_uuid: string;
    }>
  ) {
    const docInfos = state.storage.icr.data.data.document_info_list;

    state.storage.icr.data.data.document_info_list = docInfos.map(
      (docInfo) => {
        if (docInfo.uuid === action.payload.parentDoc_uuid) {
          return {
            ...docInfo,
            document_group: docInfo.document_group.map((docGr) => {
              if (docGr.uuid === action.payload.doc_uuid) {
                const childs = docGr.child_files ? [...docGr.child_files] : [];
                const empty: ILOANNormalChildfile = {
                  uuid: `${PREFIX_LOCAL}${generateUUID()}`,
                  content_type: null,
                  created_at: null,
                  created_by: "",
                  created_by_name: "",
                  updated_by: "",
                  updated_by_name: "",
                  file_upload: null,
                  name: null,
                  size: null,
                  type: null,
                  updated_at: null,
                  version: null,
                  description: null,
                };
                childs.push(empty);
                return { ...docGr, child_files: childs };
              }

              return docGr;
            }),
          };
        }
        return docInfo;
      }
    );
  },

  setDataLOANNormalStorageICRFile: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        ILOANNormalChildfile,
        string,
        {
          parentDoc_uuid: string;
          doc_uuid: string;
          file_uuid: string;
        }
      >
    ) {
      const doc = state.storage.icr.data.data.document_info_list;
      if (!doc) return;
      state.storage.icr.data.data.document_info_list = doc.map(
        (parentDoc) => {
          if (parentDoc.uuid === action.meta.parentDoc_uuid) {
            return {
              ...parentDoc,
              document_group: parentDoc.document_group.map((docG) => {
                if (docG.uuid === action.meta.doc_uuid) {
                  return {
                    ...docG,
                    child_files:
                      docG?.child_files?.map((file) => {
                        if (file.uuid === action.meta.file_uuid) {
                          return {
                            ...file,
                            ...action.payload,
                            uuid: file.uuid,
                          };
                        }
                        return file;
                      }) ?? [],
                  };
                }
                return docG;
              }),
            };
          }
          return parentDoc;
        }
      );
    },

    prepare(
      payload: ILOANNormalChildfile,
      meta: {
        parentDoc_uuid: string;
        doc_uuid: string;
        file_uuid: string;
      }
    ) {
      return { payload, meta };
    },
  },
  setDescriptionLOANNormalStorageICRFile: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          parentDoc_uuid: string;
          doc_uuid: string;
          file_uuid: string;
        }
      >
    ) {
      const doc = state.storage.icr.data.data.document_info_list;
      if (!doc) return;
      state.storage.icr.data.data.document_info_list = doc.map(
        (parentDoc) => {
          if (parentDoc.uuid === action.meta.parentDoc_uuid) {
            return {
              ...parentDoc,
              document_group: parentDoc.document_group.map((docG) => {
                if (docG.uuid === action.meta.doc_uuid) {
                  return {
                    ...docG,
                    child_files:
                      docG?.child_files?.map((file) => {
                        if (file.uuid === action.meta.file_uuid) {
                          return {
                            ...file,
                            description:action.payload,
                            uuid: file.uuid,
                          };
                        }
                        return file;
                      }) ?? [],
                  };
                }
                return docG;
              }),
            };
          }
          return parentDoc;
        }
      );
    },

    prepare(
      payload: string,
      meta: {
        parentDoc_uuid: string;
        doc_uuid: string;
        file_uuid: string;
      }
    ) {
      return { payload, meta };
    },
  },

  // ********** REMOVE ACTIONS **********
  // ALL
  removeAllLOANNormalStorageICRParentDoc(state: Draft<ILOANNormalState>) {
    state.storage.icr.data.data.document_info_list = [];
  },

  // PARENT_DOC
  removeLOANNormalStorageICRParentDoc(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    const docs = state.storage.icr.data.data.document_info_list;
    if (docs)
      state.storage.icr.data.data.document_info_list = docs.filter(
        (doc) => doc.uuid !== action.payload
      );
  },
  removeLOANNormalStorageICRDoc: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          parentDoc_uuid: string;
        }
      >
    ) {
      const docs = state.storage.icr.data.data.document_info_list;
      if (docs)
        state.storage.icr.data.data.document_info_list = docs.map(parentDoc => {
          if (parentDoc.uuid === action.meta.parentDoc_uuid) {
            return { ...parentDoc, document_group: parentDoc.document_group.filter(doc => doc.uuid !== action.payload) };
          }
          return parentDoc;
        });
    },

    prepare(
      payload: string,
      meta: {
        parentDoc_uuid: string;
      }
    ) {
      return { payload, meta };
    },
  },
  // FILE
  removeLOANNormalStorageICRFile: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          parentDoc_uuid: string;
          doc_uuid: string;
        }
      >
    ) {
      const docs = state.storage.icr.data.data.document_info_list;
      if (docs) {
        state.storage.icr.data.data.document_info_list = docs.map(
          (parentDoc) => {
            if (parentDoc.uuid === action.meta.parentDoc_uuid) {
              return {
                ...parentDoc,
                document_group:
                  parentDoc.document_group.map((doc) => {
                    if (doc.uuid === action.meta.doc_uuid) {
                      return {
                        ...doc,
                        child_files: (doc?.child_files ?? [])?.filter(
                          (file) => file.uuid !== action.payload
                        ),
                      };
                    }
                    return doc;
                  }) ?? [],
              };
            }

            return parentDoc;
          }
        );
      }
    },

    prepare(
      payload: string,
      meta: {
        parentDoc_uuid: string;
        doc_uuid: string;
      }
    ) {
      return { payload, meta };
    },
  },
}