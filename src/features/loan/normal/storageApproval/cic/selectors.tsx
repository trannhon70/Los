import { RootState } from "types";
import {
  IAllObjectDocumentData,
  ICICSinglePersonDataAPI,
  ILOANNormalApprovalStorageCICState,
  IObjectCICState,
  IObjectCICStateData,
  IPersonCICStateData,
  IPersonDetail,
} from "types/models/loan/normal/storageApproval/CIC";
import { ValidateApprovalCIC } from "./validate";
import * as _ from "lodash";
import { IUserCICAttachModal } from "views/pages/LOAN/widgets/AttachmentCICAll/hook";
import { getListUsersCICApprovalData } from "./handleData";
export const getObjectTotalAmount = (state: RootState) => {
  return {
    main: state.LOANNormal.storageApproval.cic.main.totalAmount,
    additional: state.LOANNormal.storageApproval.cic.additional.totalAmount,
  };
};

export const getMainTotalAmount = (state: RootState) => {
  return {
    borrower:
      state.LOANNormal.storageApproval.cic.main.data["borrower"].totalAmount,
    marriage:
      state.LOANNormal.storageApproval.cic.main.data["marriage"].totalAmount,
    co_brw:
      state.LOANNormal.storageApproval.cic.main.data["co_brw"].totalAmount,
    co_payer:
      state.LOANNormal.storageApproval.cic.main.data["co_payer"].totalAmount,
  };
};

export const getAdditionalTotalAmount = (state: RootState) => {
  return {
    law_rlt:
      state.LOANNormal.storageApproval.cic.additional.data["law_rlt"]
        .totalAmount,
    others:
      state.LOANNormal.storageApproval.cic.additional.data["others"]
        .totalAmount,
  };
};

export const getObjectActive = (state: RootState) => {
  return state.LOANNormal.storageApproval.cic.activeObject;
};
export const getGroupActive = (state: RootState) => {
  const activeObjectKey = state.LOANNormal.storageApproval.cic
    .activeObject as keyof ILOANNormalApprovalStorageCICState;
  const activeGroup = state.LOANNormal.storageApproval.cic[
    activeObjectKey
  ] as IObjectCICState;

  return activeGroup.groupActive;
};

export const getActivePersonDetail = (state: RootState) => {
  const activeObjectKey = state.LOANNormal.storageApproval.cic
    .activeObject as keyof ILOANNormalApprovalStorageCICState;
  if (activeObjectKey === "summary") return null;
  const activeGroup = state.LOANNormal.storageApproval.cic[
    activeObjectKey
  ] as IObjectCICState;
  const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData;

  const activePerson = (
    state.LOANNormal.storageApproval.cic[activeObjectKey] as IObjectCICState
  )?.data[groupActiveKey]?.position;
  const activePersonIndex = (
    state.LOANNormal.storageApproval.cic[activeObjectKey] as IObjectCICState
  )?.data[groupActiveKey].data.findIndex(
    (per) => per.detail.person_uuid === activePerson
  );
  if (activePersonIndex !== -1) {
    return (
      state.LOANNormal.storageApproval.cic[activeObjectKey] as IObjectCICState
    )?.data[groupActiveKey]?.data[activePersonIndex]?.detail;
  } else return null;
};

export const getListPerson = (state: RootState) => {
  const activeObjectKey = state.LOANNormal.storageApproval.cic
    .activeObject as keyof ILOANNormalApprovalStorageCICState;
  if (activeObjectKey === "summary") {
    return [];
  } else {
    const activeGroup = state.LOANNormal.storageApproval.cic[
      activeObjectKey
    ] as IObjectCICState;
    const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData;
    return (
      (state.LOANNormal.storageApproval.cic[activeObjectKey] as IObjectCICState)
        ?.data[groupActiveKey]?.data ?? null
    );
  }
};

export const getPersonActivePosition = (state: RootState) => {
  const activeObjectKey = state.LOANNormal.storageApproval.cic
    .activeObject as keyof ILOANNormalApprovalStorageCICState;
  if (activeObjectKey === "summary") {
    return 0;
  } else {
    const activeGroup = state.LOANNormal.storageApproval.cic[
      activeObjectKey
    ] as IObjectCICState;
    const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData;
    const activePerson = (
      state.LOANNormal.storageApproval.cic[activeObjectKey] as IObjectCICState
    )?.data[groupActiveKey]?.position;
    return (
      state.LOANNormal.storageApproval.cic[activeObjectKey] as IObjectCICState
    )?.data[groupActiveKey]?.data.findIndex(
      (per) => per.detail.person_uuid === activePerson
    );
  }
};
export const getLOANNormalApprovalStorageCICAdditional = (state: RootState) => {
  return state.LOANNormal.storageApproval.cic.additional.data;
};
export const getLOANNormalApprovalStorageCICMain = (state: RootState) => {
  return state.LOANNormal.storageApproval.cic.main.data;
};
export const getLOANNormalApprovalStorageCICSave = (state: RootState) => [
  state.LOANNormal.storageApproval.cic,
  state.LOANNormal.storageApproval.full.data?.form.los_info.los_id as string,
];

export const getValidateLOANNormalApprovalStorageCIC = (state: RootState) => {
  return state.LOANNormal.storageApproval.cic.validate;
};

export const validateLOANNormalStorageCIC = (state: RootState) => {
  const activeObjectKey = state.LOANNormal.storageApproval.cic
    .activeObject as keyof ILOANNormalApprovalStorageCICState;
  if (activeObjectKey === "summary") return { valid: true };
  const activeGroup = state.LOANNormal.storageApproval.cic[
    activeObjectKey
  ] as IObjectCICState;
  const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData;

  const activePerson = (
    state.LOANNormal.storageApproval.cic[activeObjectKey] as IObjectCICState
  ).data[groupActiveKey]?.position;
  const activePersonIndex = (
    state.LOANNormal.storageApproval.cic[activeObjectKey] as IObjectCICState
  ).data[groupActiveKey].data.findIndex(
    (per) => per.detail.person_uuid === activePerson
  );

  const vPersonDetail = ValidateApprovalCIC.personDetailVal(
    (state.LOANNormal.storageApproval.cic[activeObjectKey] as IObjectCICState)
      .data[groupActiveKey]?.data[activePersonIndex]?.detail
  );

  if (!vPersonDetail.valid)
    return {
      ...vPersonDetail,
      position: activePerson,
      group: groupActiveKey,
      object: activeObjectKey,
    };

  return { valid: true };
};

export const getListPersonDetailInfo = (state: RootState) => {
  return state.LOANNormal.storageApproval.cic.summary.info;
};

export const getSummaryPersonActiveDetail = (state: RootState) => {
  const key = state.LOANNormal.storageApproval.cic.summary.groupActive;
  const activeUUID =
    state.LOANNormal.storageApproval.cic.summary.info[key]?.position;
  const position = state.LOANNormal.storageApproval.cic.summary.info[
    key
  ]?.data?.findIndex((e) => e.detail.person_uuid === activeUUID);

  return (
    state.LOANNormal.storageApproval.cic.summary.info[key]?.data[position] ??
    null
  );
};

export const getAttachFileData = (state: RootState) => {
  const countAttachFile = (object: IPersonCICStateData) => {
    let count = 0;
    object?.documentList?.forEach((list) => {
      list?.document_list?.forEach((docs) => {
        count += docs.document_child_files.length ?? 0;
      });
    });
    return count;
  };
  const extractDocumentData = (
    object: "main" | "additional",
    keys: string[]
  ) => {
    let data: IAllObjectDocumentData = {};
    keys.forEach((key) => {
      if (object === "main") {
        data[key] = state.LOANNormal.storageApproval.cic.main.data[
          key
        ].data.map((e) => ({
          uuid: e.detail.person_uuid,
          total: countAttachFile(e),
          data: e.documentList,
        }));
      } else {
        data[key] = state.LOANNormal.storageApproval.cic.additional.data[
          key
        ].data.map((e) => ({
          uuid: e.detail.person_uuid,
          total: countAttachFile(e),
          data: e.documentList,
        }));
      }
    });
    return data;
  };

  const mainGroupKey = ["borrower", "marriage", "co_brw", "co_payer"];
  const additionalGroupKey = ["law_rlt", "others"];

  return {
    ...extractDocumentData("main", mainGroupKey),
    ...extractDocumentData("additional", additionalGroupKey),
  };
};

export const getListMainDeclareCICDocumentData = (
  state: RootState
): IUserCICAttachModal[] => {
  const data: IObjectCICStateData = _.get(
    state,
    "LOANNormal.storageApproval.cic.main.data"
  );
  if (!data) return [];
  return getListUsersCICApprovalData(Object.values(data));
};

export const getListAdditionalDeclareCICDocumentData = (
  state: RootState
): IUserCICAttachModal[] => {
  const data: IObjectCICStateData = _.get(state,"LOANNormal.storageApproval.cic.additional.data");
  if (!data) return [];
  return getListUsersCICApprovalData(Object.values(data));
};

export const getListAllDeclareCICDocumentData = (
  state: RootState
): IUserCICAttachModal[] => {
  return [
    ...getListMainDeclareCICDocumentData(state),
    ...getListAdditionalDeclareCICDocumentData(state),
  ];
};

export const getCICFull = () => (state: RootState) => {
  const data = state.LOANNormal.storageApproval.cic
  return data;
}

export const getCurrentPersonDocumentListSoreFull = (state: RootState) => {
  const activeObjectKey = state.LOANNormal.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
  const activeGroup =  state.LOANNormal.storageApproval.cic[activeObjectKey] as IObjectCICState
  const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData
  const activePerson = (state.LOANNormal.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].position;

  if(activeObjectKey === "main") {
    switch (groupActiveKey) {
      case "borrower":
        return state.LOANNormal.storageApproval.full.data?.form?.cic_form?.main_search_objects?.borrower?.document_info_list ?? []
      case "marriage":
        return state.LOANNormal.storageApproval.full.data?.form?.cic_form?.main_search_objects?.marriage?.document_info_list ?? [];
      case "co_brw":
        return state.LOANNormal.storageApproval.full.data?.form?.cic_form?.main_search_objects?.co_brw?.person_data?.find(per => per.person_detail.person_uuid === activePerson)?.document_info_list ?? []
      case "co_payer":
        return state.LOANNormal.storageApproval.full.data?.form.cic_form.main_search_objects?.co_payer?.person_data?.find(per => per.person_detail.person_uuid === activePerson)?.document_info_list ?? []
      default:
        return [];
    }
  }
  else if(activeObjectKey === "additional"){
    switch (groupActiveKey) {
      case "law_rlt":
        return state.LOANNormal.storageApproval.full.data?.form?.cic_form?.additional_lookup_objects?.law_rlt?.person_data?.find(per => per.person_detail.person_uuid === activePerson)?.document_info_list ?? []
      case "others":
        return state.LOANNormal.storageApproval.full.data?.form.cic_form.additional_lookup_objects?.others?.person_data?.find(per => per.person_detail.person_uuid === activePerson)?.document_info_list ?? []
      default:
        return [];
    }
  }
  else return []
}

// export const getExistDataCICCheck = (state: RootState) => {

//   const checkListComplete = (data?: ICICSinglePersonDataAPI[]) => {
//     if(data){
//       return data.some(person => person.person_detail.cic_information.length > 0)
//     }
//     return false
//   }
//   const checkComplete = (data?: IPersonDetail) => {
//     if(data){
//       return data.cic_information.length > 0
//     }
//     return false
//   }

//   return {
//     main: {
//       borrower: checkComplete(state.LOANNormal.storageApproval.full.data?.form?.cic_form?.main_search_objects.borrower?.person_detail),
//       marriage: checkComplete(state.LOANNormal.storageApproval.full.data?.form?.cic_form?.main_search_objects.marriage?.person_detail),
//       co_brw: checkListComplete(state.LOANNormal.storageApproval.full.data?.form?.cic_form?.main_search_objects?.co_brw?.person_data),
//       co_payer: checkListComplete(state.LOANNormal.storageApproval.full.data?.form?.cic_form?.main_search_objects?.co_payer?.person_data),
//     },
//     additional: {
//       law_rlt: checkListComplete(state.LOANNormal.storageApproval.full.data?.form?.cic_form?.additional_lookup_objects?.law_rlt?.person_data),
//       other: checkListComplete(state.LOANNormal.storageApproval.full.data?.form?.cic_form?.additional_lookup_objects?.others?.person_data),
//     },
//   }

// }