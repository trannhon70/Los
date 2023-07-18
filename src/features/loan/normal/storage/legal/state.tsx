import { ILOANNormalStorageLegalState } from 'types/models/loan/normal/storage/Legal';
import { generateLoanLegalUser } from './generateEmptyLegal';

export const legalState: ILOANNormalStorageLegalState = {
  validate: {
    valid: true,
  },
  data: {
    BORROWER: {
      uuidActiveLocal: '',
      listContactPersonUUID: [],
      info: [
        {
          uuidActiveLocal: '',
          declare: ['RELATED'],
          basic: {
            person_uuid: '',
            fullname: '',
            customerType: '',
            birthday: null,
            placeOfBirth: '',
            gender: '',
            national: 'VN',
            marriageStatus: '',
            ownerProperty: '',
            under18: null,
            over18: null,
            telephone: '',
            mobile: '',
            email: '',
            education: '',
            ecomonic: '',
            relationship: '',
            tax: '',
            cif: '',
          },
          other: {
            fatca: '',
            career: '',
            income3Month: '',
            note: '',
          },
          identity: [],
          address: {
            resident: '',
            location: '',
            address: [],
          },
          uuidActiveFile: '',
          document_info_list: [],
        },
      ],
    },
    MARRIAGE: {
      uuidActiveLocal: '',
      listContactPersonUUID: [],
      info: [generateLoanLegalUser()],
    },
    CO_BRW: {
      uuidActiveLocal: '',
      listContactPersonUUID: [],
      info: [],
    },
    CO_PAYER: {
      uuidActiveLocal: '',
      listContactPersonUUID: [],
      info: [],
    },
    LAW_RLT: {
      uuidActiveLocal: '',
      listContactPersonUUID: [],
      info: [],
    },
    RELATED: {
      uuidActiveLocal: '',
      listContactPersonUUID: [],
      info: [],
    },
    OTHER: {
      uuidActiveLocal: '',
      listContactPersonUUID: [],
      info: [],
    },
  },
  blacklist: null,
};
export const coborrowsDelete: string[] = [];
