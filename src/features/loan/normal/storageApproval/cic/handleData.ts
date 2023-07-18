import { useMemo } from "react";
import { ILOANNormalStorageCICDocumentList, ILOANNormalStorageCICDocumentListDetail } from "types/models/loan/normal/storage/CIC";
import { ICICDocumentInfoAPI, IGroupCICState, ILOANNormalApprovalStorageCICState, IPersonCICInfo } from "types/models/loan/normal/storageApproval/CIC";
import { generateUUID } from "utils";
import {  CreditType, IUserCICAttachModal, IUserCICIdentity,  IUserCredits } from "views/pages/LOAN/widgets/AttachmentCICAll/hook";
export const mappingDocumentCIC = (docs: ICICDocumentInfoAPI[]) => {
    return docs?.map(doc => {
        let credit = '';
        let identity = '';
        let identity_type = '';
        
        const documentList = doc.document_list?.map(docl => {
            const result: ILOANNormalStorageCICDocumentListDetail = {
                uuid: generateUUID(),
                document_name: docl.document_name,
                document_code: docl.document_id,
                display_order: docl.display_order,
                document_child_files: docl?.document_child_files?.map((docc, index) => {
                    credit = docc?.custom_keys?.credit ?? '';
                    identity = docc?.custom_keys?.identity ?? '';
                    identity_type = docc?.custom_keys?.identity_type ?? '';
                    return {
                        uuid: docc.uuid,
                        name: docc.name,
                        content_type: docc.content_type,
                        display_order: docc.display_order,
                        created_by: docc.created_by,
                        created_by_name: docc.created_by_name,
                        updated_by: docc.updated_by,
                        updated_by_name: docc.updated_by_name,
                        created_at: (docc.created_at ?? 0) * 1000,
                        updated_at: (docc.updated_at ?? 0) * 1000,
                        description: docc.description ?? docc.custom_keys?.description ?? "",
                        file_id: index,
                        file_upload: '',
                        custom_keys: docc.custom_keys
                    }
                }),
                document_child_list: [],
                document_id: docl.document_id.toString() ?? '',
            };
            return result;
        });
        const result: ILOANNormalStorageCICDocumentList = {
            uuid: generateUUID(),
            document_type_code: doc.document_type_code,
            // document_type_id: document_type_id,
            display_order: doc.display_order,
            document_list: documentList ?? [],
            customKey: { credit, identity, identity_type }
        };
        return result;
    });
}

export const getListUsersCICApprovalData = (data: IGroupCICState[]) => {
    const declares: IUserCICAttachModal[] = [];
    data?.forEach(declare => {
        declare?.data?.forEach(person => {
            const currentPerson = declares?.find(it => {
            return it.person_uuid === person.detail.person_uuid});
            if (!currentPerson) {
                const result:IUserCICAttachModal = {
                    person_uuid: person.detail.person_uuid,
                    identities: person.detail.cic_information?.map(iden => {
                        const result:IUserCICIdentity = {
                            identity_uuid: iden?.uuid ?? '',
                            identity_type: iden?.cic_information_name ?? '',
                            identity_code: iden?.cic_information_code ?? '',
                            credits: iden?.cic_information_detail?.cic_credit?.institution?.map(cre => {
                                const result:IUserCredits = {
                                  code: {
                                    code: cre.institution_code ?? "",
                                    uuid: cre.uuid ??''
                                  },
                                  // credit_code: cre.institution_id,
                                  // credit_uuid: cre.uuid ??'',
                                  documents: person?.documentList?.filter(doc => doc?.customKey?.identity === iden?.uuid && doc.customKey.credit === cre.uuid /* || doc?.customKey?.credit === cre.institution_code */) as ILOANNormalStorageCICDocumentList[]
                                };
                                return result;
                            })
                        };
                        return result;
                    })
                }
                declares.push(result);
            }
        })
    });
    return declares?.map(d=>({
      ...d,
      identities:d?.identities?.map(iden=>({
          ...iden,
          credits:iden?.credits?.reverse(),
      }))
  }));
}
export const useS2ConvertCICAttach =
 (CICDataFullL: ILOANNormalApprovalStorageCICState) => {
   const listUsers: IUserCICAttachModal[] = useMemo(() => {
    const objectCIC: {
      [person_uuid: string]: {
        identities: Array<{
            credits: CreditType[];
            identity_uuid: string;
            identity_type: string;
            identity_code: string;
        }>;
        person_uuid: string;
        documents: ILOANNormalStorageCICDocumentList[];
      };
    } = {};

    const CICData = {
      main:  CICDataFullL.main,
      additional: CICDataFullL.additional,
    }
    let b ={};
    
    Object.values(CICData).map((organ) => {
      Object.keys(organ?.data).forEach((key) => {
        const declare = organ?.data[key];
        declare?.data?.forEach((person) => {
          // const object = objectCIC[person?.detail?.person_uuid]
            const identityObj = person?.detail?.cic_information?.map(
              (identity : IPersonCICInfo) => {
                const result:IUserCICIdentity = {
                  identity_uuid: identity?.uuid ?? '',
                  identity_type: identity?.cic_information_name ?? '',
                  identity_code: identity?.cic_information_code ?? '',
                  credits: identity?.cic_information_detail?.cic_credit?.institution?.map(cre => {
                      const result:IUserCredits = {
                        code: {
                          code: cre.institution_code ?? "",
                          uuid: cre.uuid ??''
                        },
                        documents: person?.documentList?.filter(doc => doc?.customKey?.identity === identity?.uuid /* || doc?.customKey?.credit === cre.institution_code */) as ILOANNormalStorageCICDocumentList[]
                      };
                      return result;
                  })
                };
                return result;
              }
            )

            b = {
              ...b,
              person_uuid: person?.detail?.person_uuid,
              documents: person?.documentList,
              identities: identityObj,
            }
            // console.log("b", b)
             return b;
          }
         
          //  object.documents = object?.documents?.concat([...person?.documentList]);
          //   person?.detail?.cic_information?.forEach(
          //   (identity : IPersonCICInfo) => {
          //     const result:IUserCICIdentity = {
          //       identity_num: identity?.uuid ?? '',
          //       identity_type: identity?.cic_information_name ?? '',
          //       identity_code: identity?.cic_information_code ?? '',
          //       credits: identity?.cic_information_detail?.cic_credit?.institution?.map(cre => {
          //           const result:IUserCredits = {
          //               code: cre.institution_code ??'',
          //               documents: person?.documentList?.filter(doc => doc?.customKey?.identity === identity?.uuid /* || doc?.customKey?.credit === cre.institution_code */) as ILOANNormalStorageCICDocumentList[]
          //           };
          //           return result;
          //       })
          //   };
          //   return result;
          //   }
          // )
        )
      })
    })
    // return {
    //   person_uuid : b
    // }


    return Object.values(objectCIC).map((per) => {
      return {
      person_uuid: per.person_uuid,
      identities: Object.values(per.identities).map((identity) => {
        return {
          identity_uuid: identity?.identity_uuid,
          identity_type: identity?.identity_type,
          identity_code: identity?.identity_code,
          credits: identity?.credits?.reverse().map((credit) => {
            return {
              code: credit,
              document: per?.documents.filter((doc) =>
                doc?.customKey?.credit &&
                doc?.customKey.identity &&
                doc?.customKey.credit === credit.uuid &&
                doc?.customKey.identity === identity.identity_uuid
              ) ?? [],
            };
          }) as [],
        }
      }),
      }
    }) as IUserCICAttachModal[];

}, [CICDataFullL])
return {
    listUsers,
  };
}