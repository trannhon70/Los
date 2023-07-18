import { getListUsersCICApprovalData } from 'features/loan/normal/storageApproval/cic/handleData';
import { useMemo } from 'react';
import {
  ILOANNormalStorageCICDeclareData,
  ILOANNormalStorageCICDeclareDataDetail,
  ILOANNormalStorageCICDocumentList,
  ILOANNormalStorageCICState,
  ILOANNormalStorageIdentityData,
} from 'types/models/loan/normal/storage/CIC';
import { IGroupCICState } from 'types/models/loan/normal/storageApproval/CIC';

export interface ICICAttachmentDocument {
  person_uuid: string;
  identities: ICICAttachmentIdentity[];
}

export interface ICICAttachmentIdentity {
  identity_num: string;
  credits: ICICAttachmentCredit[];
  identity_type?: string;
}

export interface ICICAttachmentCredit {
  code: string;
  documents: ILOANNormalStorageCICDocumentList[];
}

export interface IUserCredits {
  // credit_code: string;
  // credit_uuid: string;
  code?: CreditType;
  documents: ILOANNormalStorageCICDocumentList[];
}
export interface IUserCICIdentity {
  identity_uuid: string;
  credits: IUserCredits[];
  identity_type: string;
  identity_code: string;
}

export interface IUserCICIdentityS2 {
  uuid: string;
  credits: IUserCredits[];
  identity_type: string;
  identity_code: string;
}
export interface IUserCICAttachModal {
  person_uuid: string;
  identities: IUserCICIdentity[];
}
export interface IUserCICAttachModalS2 {
  person_uuid: string;
  identities: IUserCICIdentityS2[];
}
export interface CreditType {
  code: string;
  uuid: string;
}

export const useS1ConvertCICAttachFile = (
  CICDataFull: ILOANNormalStorageCICState
) => {
  const listUsers: IUserCICAttachModal[] = useMemo(() => {
    const objectCIC: {
      [person_uuid: string]: {
        identities: {
          [identity_uuid: string]: {
            credits: CreditType[];
            identity_uuid: string;
            identity_type: string;
            identity_code: string;
          };
        };
        person_uuid: string;
        documents: ILOANNormalStorageCICDocumentList[];
      };
    } = {};
    const CICData = { other: CICDataFull.other, scb: CICDataFull.scb };
    // Object.values(CICData).forEach((organ) => {
    Object.keys(CICData.other.data).forEach((key) => {
      const declare = CICData.other.data[key];
      declare?.data?.forEach((person: ILOANNormalStorageCICDeclareData) => {
        if (!objectCIC[person.person_uuid]) {
          objectCIC[person.person_uuid] = {
            identities: {},
            person_uuid: person.person_uuid,
            documents: [],
          };
        }
        const object = objectCIC[person.person_uuid];
        object.documents = object.documents.concat([
          ...person.document_info_list,
        ]);

        person.data.forEach(
          (identity: ILOANNormalStorageCICDeclareDataDetail) => {
            if (!object.identities[identity.uuid]) {
              object.identities[identity.uuid] = {
                credits: [
                  {
                    code: 'NON_CREDIT',
                    uuid: 'NON_CREDIT',
                  },
                ],
                identity_uuid: identity.uuid,
                identity_type: identity.identity_type,
                identity_code: identity.identity_num,
              };
            }
            const identityObject = object.identities[identity.uuid];

            identity.credit.forEach(
              (credit: ILOANNormalStorageIdentityData) => {
                const exist = identityObject.credits.filter(
                  (uuid) => uuid.uuid
                );
                if (exist) {
                  identityObject.credits.push({
                    code: credit.code,
                    uuid: credit.uuid,
                  });
                }
              }
            );
          }
        );
      });
    });
    // });

    return Object.values(objectCIC).map((per) => {
      return {
        person_uuid: per.person_uuid,
        identities: Object.values(per.identities).map((identity) => {
          return {
            identity_uuid: identity.identity_uuid,
            identity_type: identity.identity_type,
            identity_code: identity.identity_code,
            credits: identity.credits.reverse().map((credit) => {
              return {
                code: credit,
                documents:
                  per.documents.filter(
                    (doc) =>
                      doc?.customKey?.credit &&
                      doc?.customKey?.identity &&
                      doc?.customKey?.credit === credit.uuid &&
                      doc?.customKey?.identity === identity.identity_uuid
                  ) ?? [],
              };
            }) as [],
          };
        }),
      };
    }) as IUserCICAttachModal[];
  }, [CICDataFull]);

  return {
    listUsers,
  };
};

// export const useS2ConvertCICAttachFile = (data: IGroupCICState[]) => {
//   const listUsers:IUserCICAttachModal[] = useMemo(() => {
//     return getListUsersCICApprovalData(data);
//   }, [data]);
//   return { listUsers }
// }
