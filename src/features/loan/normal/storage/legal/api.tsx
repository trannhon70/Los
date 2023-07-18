import {
  API_LOAN_NORMAL_CHECK_LEGAL_BLACKLIST,
  API_LOAN_NORMAL_DELETE_COBORROWER_BY_UUID, API_LOAN_NORMAL_DELETE_CONTACT_BY_UUID, API_LOAN_NORMAL_DELETE_COPAYER_BY_UUID, API_LOAN_NORMAL_DELETE_CO_BORROWER,
  API_LOAN_NORMAL_DELETE_CO_PAYER, API_LOAN_NORMAL_DELETE_LAGALRELATED_BY_UUID, API_LOAN_NORMAL_DELETE_LAW_RLT, API_LOAN_NORMAL_DELETE_MARRIAGE, API_LOAN_NORMAL_DELETE_OTHER, API_LOAN_NORMAL_DELETE_OTHER_BY_UUID, API_LOAN_NORMAL_DELETE_RELATED, API_LOAN_NORMAL_GET_CIF_DATA, API_LOAN_NORMAL_GET_LEGAL_INFO,
  API_LOAN_NORMAL_SAVE_BORROWER, API_LOAN_NORMAL_SAVE_CO_BORROWER,
  API_LOAN_NORMAL_SAVE_CO_PAYER,
  API_LOAN_NORMAL_SAVE_LAW_RLT, API_LOAN_NORMAL_SAVE_MARRIAGE, API_LOAN_NORMAL_SAVE_OTHER, API_LOAN_NORMAL_SAVE_RELATED
} from 'features/loan/normal/APIPaths';
import { IMetadataTransModel } from 'types/models/loan/normal/configs/metadata';
import { ILOANNormalAlertBlackListData, ILOANNormalLegalBor, ILOANNormalStorageLegalFile, ILOANNormalStorageLegalState } from 'types/models/loan/normal/storage/Legal';
import { IMasterData } from 'types/models/master-data';
import { formatPath, PREFIX_LOCAL } from "utils";
import { apiDelete, apiGet, apiPost } from "utils/api";
import { ELegalTypeScreen } from './case';

const getDeclareDocument= (docData:ILOANNormalStorageLegalFile[])=>{
  if(!docData) return [];
  if(docData?.length=== 0) return [];

  return docData.filter(doc=>doc?.child_files?.length >0).map((docs, idx) => ({
    document_id: docs.document_id,
    document_name: docs.document_name,
    child_files: docs.child_files?.filter(child=>!child.uuid.includes(PREFIX_LOCAL)).map((child, idxChild) => ({
      file_id: idxChild + 1,
      uuid: child.uuid,
      name: child.name,
      display_order: idxChild + 1,
      description: child.description,
      content_type: child.content_type,
      created_by: child.created_by,
      created_by_name: child.created_by_name,
      updated_at: child.updated_at,
      updated_by: child.updated_by,
      updated_by_name: child.updated_by_name,
      created_at: child.created_at,
      custom_keys:child.custom_keys,
    })) ?? [],
  }));
}

export const saveLegalBorrowerAPI = (storeLegal: ILOANNormalStorageLegalState,
  los_uuid: string,
  master: IMasterData, 
  careerMetadata: IMetadataTransModel[]
  ) => {

  const {
    gender: { data: gender },
    // relationship: { data: rlsship },
    country: { data: country },
    cifIfType: { data: cif },
    addressType: { data: adrType },
    customerType: { data: customerType },
    marriedStatus: { data: marriedStatus },
    ownerProperty: { data: ownerProp },
    education: { data: edu },
    custClassififation: { data: cusClass },
    fatca: { data: fatca },
    averageIncome: { data: income },
    careers: { data: career },
    residentStatus: { data: residentStatus },
  } = master;

  const dataBORROWER = storeLegal.data.BORROWER.info[0]


  const body = {
    cif: dataBORROWER.cif,
    branch_info: {
      branch_code: "001",
      branch_name: "SCB Trần Hưng Đạo"
    },
    basic_info: {
      uuid: dataBORROWER.basic.person_uuid ? dataBORROWER.basic.person_uuid : null,
      id: "string",
      avatar: "cdn/hello.jpg",
      full_name: dataBORROWER.basic.fullname.toUpperCase(),
      customer_type_info: customerType.find(item => item.code === dataBORROWER.basic.customerType),
      date_of_birth: (dataBORROWER.basic.birthday ?? 0) / 1000,
      place_of_birth: dataBORROWER.basic.placeOfBirth,
      gender_info: gender.find(item => item.code === dataBORROWER.basic.gender),
      country_info: {
        country_code: country.find(item => item.code === dataBORROWER.basic.national)?.code,
        country_name: country.find(item => item.code === dataBORROWER.basic.national)?.name,
      },
      marital_status_info: marriedStatus.find(item => item.id === dataBORROWER.basic.marriageStatus),
      current_house_owner_status_info: ownerProp.find(item => item.id === dataBORROWER.basic.ownerProperty),
      dependent_person_over_18: dataBORROWER.basic.over18 === null ? 0 : dataBORROWER.basic.over18,
      dependent_person_under_18: dataBORROWER.basic.under18 === null ? 0 : dataBORROWER.basic.under18,
      telephone_num: dataBORROWER.basic.telephone ? dataBORROWER.basic.telephone : null,
      mobile_num: dataBORROWER.basic.mobile,
      email: dataBORROWER.basic.email.length > 0 ? dataBORROWER.basic.email : null,
      educational_status_info: edu.find(item => item.id === dataBORROWER.basic.education),
      economic_profession_info: cusClass.find(item => item.id === dataBORROWER.basic.ecomonic)
    },
    other_info: {
      fatca_info: {
        id: fatca.find(item => item.id === dataBORROWER.other.fatca)?.id,
        code: fatca.find(item => item.id === dataBORROWER.other.fatca)?.code,
        name: fatca.find(item => item.id === dataBORROWER.other.fatca)?.name,
      },
      average_income_3m_amount: {
        id: income.find(item => item.id === dataBORROWER.other.income3Month)?.id,
        code: income.find(item => item.id === dataBORROWER.other.income3Month)?.code,
        name: income.find(item => item.id === dataBORROWER.other.income3Month)?.name,
      },
      career_info: {
        id: careerMetadata.find(item => item.id === dataBORROWER.other.career)?.id,
        code: careerMetadata.find(item => item.id === dataBORROWER.other.career)?.id,
        name: careerMetadata.find(item => item.id === dataBORROWER.other.career)?.name,
      }
    },
    identity_info: dataBORROWER.identity.map((ide, index) => ({
      identity_type: cif.find(item => item.id === ide.type),
      identity_num: ide.num,
      issued_date: (ide.issuedDate ?? 0) / 1000,
      expired_date: !ide.expiredDate ? null : (ide.expiredDate ?? 0) / 1000,
      place_of_issue: ide.placeOfIssue,
      primary_flag: ide.primaryFlag,
      uuid: ide.uuid ? ide.uuid : null,
    })),
    address_info: dataBORROWER.address.address.map((ad, idx) => ({
      address_type: adrType.find(item => item.id === ad.type),
      address: ad.apartment,
      province_info: {
        province_code: ad.province,
      },
      district_info: {
        district_code: ad.district
      },
      ward_info: {
        ward_code: ad.ward
      },
      primary_flag: ad.primaryFlag,
      resident_status_info: residentStatus.find(item => item.code === dataBORROWER.address.resident),
      fcc_location: dataBORROWER.address.location,
    })),
    total_document_file: 0,
    document_info_list: getDeclareDocument(dataBORROWER.document_info_list),
  }

  return apiPost<unknown>(
    formatPath(API_LOAN_NORMAL_SAVE_BORROWER, los_uuid ? los_uuid : ""),
    body
  )
}

export const saveLegalMarriageAPI = (storeLegal: ILOANNormalStorageLegalState,
  los_uuid: string,
  master: IMasterData,
  declare: string) => {
  const {
    gender: { data: gender },
    country: { data: country },
    cifIfType: { data: cif },
    addressType: { data: adrType },
  } = master;
  const dataMARRIAGE = storeLegal.data.MARRIAGE.info[0]


  const body = {
    basic_info: {
      uuid: dataMARRIAGE.basic.person_uuid ? dataMARRIAGE.basic.person_uuid : null,
      id: "string",
      avatar: "cdn/hello.jpg",
      full_name: dataMARRIAGE.basic.fullname.toUpperCase(),
      date_of_birth: (dataMARRIAGE.basic.birthday ?? 0) / 1000,
      gender_info: gender.find(item => item.code === dataMARRIAGE.basic.gender),
      country_info: {
        country_code: country.find(item => item.code === dataMARRIAGE.basic.national)?.code,
        country_name: country.find(item => item.code === dataMARRIAGE.basic.national)?.name,
      },
      telephone_num: dataMARRIAGE.basic.telephone ? dataMARRIAGE.basic.telephone : null,
      mobile_num: dataMARRIAGE.basic.mobile,
      email: dataMARRIAGE.basic.email.length === 0 ? null : dataMARRIAGE.basic.email,
    },
    identity_info: dataMARRIAGE.identity.map((ide, index) => ({
      identity_type: cif.find(item => item.id === ide.type),
      identity_num: ide.num,
      issued_date: (ide.issuedDate ?? 0) / 1000,
      expired_date: !ide.expiredDate ? null : (ide.expiredDate ?? 0) / 1000,
      place_of_issue: ide.placeOfIssue,
      primary_flag: ide.primaryFlag,
      uuid: ide.uuid ? ide.uuid : null,
    })),
    address_info: dataMARRIAGE.address.address.map((ad, idx) => ({
      id: "string",
      address_type: adrType.find(item => item.id === ad.type),
      address: ad.apartment ?? null,
      province_info: {
        province_code: ad.province,
      },
      district_info: {
        district_code: ad.district
      },
      ward_info: {
        ward_code: ad.ward
      },
      primary_flag: ad.primaryFlag,
      fcc_location: ad.apartment,
    })),
    total_document_file: 0,
    document_info_list: getDeclareDocument(dataMARRIAGE.document_info_list)
  }
  return apiPost<unknown>(
    formatPath(API_LOAN_NORMAL_SAVE_MARRIAGE, los_uuid ? los_uuid : ''),
    body
  )
}

export const saveLegalCoBorrowerAPI = (storeLegal: ILOANNormalStorageLegalState,
  los_uuid: string,
  master: IMasterData) => {

  const {
    gender: { data: gender },
    relationship,
    country: { data: country },
    cifIfType: { data: cif },
    addressType: { data: adrType },
  } = master;

  const dataCoBorrower = storeLegal.data.CO_BRW.info
  const rlsship = relationship["N"]?.data ?? [];

  const body = dataCoBorrower.length > 0 ? dataCoBorrower?.map((da, idx) => ({
    basic_info: {
      uuid: da.basic.person_uuid ? da.basic.person_uuid : null,
      id: "string",
      avatar: "cdn/hello.jpg",
      full_name: da.basic.fullname.toUpperCase(),
      date_of_birth: (da.basic.birthday ?? 0) / 1000,
      gender_info: gender.find(item => item.code === da.basic.gender),
      country_info: {
        country_code: country.find(item => item.code === da.basic.national)?.code,
        country_name: country.find(item => item.code === da.basic.national)?.name,
      },
      telephone_num: da.basic.telephone ? da.basic.telephone : null,
      mobile_num: da.basic.mobile,
      email: da.basic.email.length === 0 ? null : da.basic.email,
      customer_family_relationship_info: rlsship?.find(item => item.code === da.basic.relationship),
    },
    identity_info: da.identity.map((ide, index) => ({
      identity_type: cif.find(item => item.id === ide.type),
      identity_num: ide.num,
      issued_date: (ide.issuedDate ?? 0) / 1000,
      expired_date: !ide.expiredDate ? null : (ide.expiredDate ?? 0) / 1000,
      place_of_issue: ide.placeOfIssue,
      primary_flag: ide.primaryFlag,
      uuid: ide.uuid ? ide.uuid : null,
    })),
    address_info: da.address.address.map((ad, idx) => ({
      id: "string",
      address_type: adrType.find(item => item.id === ad.type),
      address: ad.apartment,
      province_info: {
        province_code: ad.province,
      },
      district_info: {
        district_code: ad.district
      },
      ward_info: {
        ward_code: ad.ward
      },
      primary_flag: ad.primaryFlag,
    })),
    total_document_file: 0,
    document_info_list: getDeclareDocument(da.document_info_list)
  })) : []

  return apiPost<unknown>(
    formatPath(API_LOAN_NORMAL_SAVE_CO_BORROWER, los_uuid ? los_uuid : ''),
    body
  )
}

export const saveLegalCoPayerAPI = (storeLegal: ILOANNormalStorageLegalState,
  los_uuid: string,
  master: IMasterData) => {
  const {
    gender: { data: gender },
    relationship,
    country: { data: country },
    cifIfType: { data: cif },
    addressType: { data: adrType },
  } = master;

  const dataCoPayer = storeLegal.data.CO_PAYER.info;
  const rlsship = relationship["N"]?.data ?? [];

  const body = dataCoPayer.map((da, idx) => ({
    basic_info: {
      uuid: da.basic.person_uuid ? da.basic.person_uuid : null,
      id: "string",
      avatar: "cdn/hello.jpg",
      full_name: da.basic.fullname.toUpperCase(),
      date_of_birth: (da.basic.birthday ?? 0) / 1000,
      gender_info: gender.find(item => item.code === da.basic.gender),
      country_info: {
        country_code: country.find(item => item.code === da.basic.national)?.code,
        country_name: country.find(item => item.code === da.basic.national)?.name,
      },
      telephone_num: da.basic.telephone ? da.basic.telephone : null,
      mobile_num: da.basic.mobile,
      email: da.basic.email.length === 0 ? null : da.basic.email,
      customer_family_relationship_info: rlsship.find(item => item.code === da.basic.relationship),
    },
    identity_info: da.identity.map((ide, index) => ({
      identity_type: cif.find(item => item.id === ide.type),
      identity_num: ide.num,
      issued_date: (ide.issuedDate ?? 0) / 1000,
      expired_date: !ide.expiredDate ? null : (ide.expiredDate ?? 0) / 1000,
      place_of_issue: ide.placeOfIssue,
      primary_flag: ide.primaryFlag,
      uuid: ide.uuid ? ide.uuid : null,
    })),
    address_info: da.address.address.map((ad, idx) => ({
      id: "string",
      address_type: adrType.find(item => item.id === ad.type),
      address: ad.apartment,
      province_info: {
        province_code: ad.province,
      },
      district_info: {
        district_code: ad.district
      },
      ward_info: {
        ward_code: ad.ward
      },
      primary_flag: ad.primaryFlag,
    })),

    total_document_file: 0,
    document_info_list: getDeclareDocument(da.document_info_list),
  }))

  return apiPost<unknown>(
    formatPath(API_LOAN_NORMAL_SAVE_CO_PAYER, los_uuid ? los_uuid : ''),
    body
  )
}

export const saveLegalLegalRelatedAPI = (storeLegal: ILOANNormalStorageLegalState,
  los_uuid: string,
  master: IMasterData) => {
  const {
    relationship,
    country: { data: country },
    customerType: { data: customerType },
  } = master;

  const dataRelated = storeLegal.data.LAW_RLT.info;
  const rlsship = relationship["N"]?.data ?? [];

  const checkTypeTaxID = (val: string, type: string) => {
    if (type === "I") {
      return "CIF_ID_TYPE";
    }
    else
      if (val.length >= 9 && val.length <= 20) {
        return "TAX_ID";
      }

  }

  const body = dataRelated.map((da, idx) => {

    return {
      basic_info: {
        uuid: da.basic.person_uuid ? da.basic.person_uuid : null,
        id: "string",
        avatar: "cdn/hello.jpg",
        full_name: da.basic.fullname.toUpperCase(),
        country_info: {
          country_code: country.find(item => item.code === da.basic.national)?.code,
          country_name: country.find(item => item.code === da.basic.national)?.name,
        },
        customer_type_info: customerType.find(item => item.code === da.basic.customerType),
        mobile_num: da.basic.mobile.length === 0 ? null : da.basic.mobile,
        customer_family_relationship_info: rlsship.find(item => item.code === da.basic.relationship),
        cif_data: {
          cif_num: da.basic.cif.length === 0 ? null : da.basic.cif
        }
      },
      identity_info: {
        id: "string",
        identity_type: {
          id: checkTypeTaxID(da.identity[0].num, da.basic.customerType),
          code: checkTypeTaxID(da.identity[0].num, da.basic.customerType),
          name: checkTypeTaxID(da.identity[0].num, da.basic.customerType),
        },
        identity_num: da.identity[0].num,
        uuid: da.identity[0].uuid ? da.identity[0].uuid : null,
      },
      address_info: {
        id: "string",
        "address_type": {
          "id": "ADDRESS_TYPE",
          "code": "PERMANENT",
          "name": "Thường trú"
        },
        "address": da.address.address[0].apartment,
        province_info: {
          province_code: da.address.address[0].province
        },
        district_info: {
          district_code: da.address.address[0].district
        },
        ward_info: {
          ward_code: da.address.address[0].ward
        },
        "primary_flag": false
      },
      note: da.other.note,
      total_document_file: 0,
      document_info_list: getDeclareDocument(da.document_info_list)
    }
  }
  )

  return apiPost<unknown>(
    formatPath(API_LOAN_NORMAL_SAVE_LAW_RLT, los_uuid ? los_uuid : ''),
    body
  )
}

export const saveLegalContactAPI = (storeLegal: ILOANNormalStorageLegalState,  // nguoi lien quan
  los_uuid: string,
  master: IMasterData) => {
  const {
    relationship,
    customerType: { data: customerType },
  } = master;
  const dataContact = storeLegal.data.RELATED.info
  const listPeersion = storeLegal.data.RELATED.listContactPersonUUID;
  const rlsship = relationship["N"]?.data ?? [];

  const dataPerisonLos = listPeersion.length > 0 ? listPeersion.map(data => ({
    person_uuid: data
  })) : [];

  const body = {
    person_los: dataPerisonLos,
    other_person: dataContact?.map((da, idx) => ({
      basic_info: {
        uuid: da.basic.person_uuid ? da.basic.person_uuid : null,
        id: "string",
        avatar: "cdn/hello.jpg",
        full_name: da.basic.fullname.toUpperCase(),
        customer_type_info: customerType.find(item => item.code === da.basic.customerType),
        mobile_num: da.basic.mobile,
        email: da.basic.email.length === 0 ? null : da.basic.email,
        customer_family_relationship_info: rlsship.find(item => item.code === da.basic.relationship),
      },
      address_info: {
        id: "string",
        "address_type": {
          "id": "ADDRESS_TYPE",
          "code": "PERMANENT",
          "name": "Thường trú"
        },
        address: da.address.address[0].apartment,
        province_info: {
          province_code: da.address.address[0].province
        },
        district_info: {
          district_code: da.address.address[0].district
        },
        ward_info: {
          ward_code: da.address.address[0].ward
        },
        "primary_flag": false
      },
      "note": "string",
      total_document_file: 0,
      document_info_list: getDeclareDocument(da.document_info_list),
    }))
  }

  return apiPost<unknown>(
    formatPath(API_LOAN_NORMAL_SAVE_RELATED, los_uuid ? los_uuid : ''),
    body
  )
}

export const saveLegalOtherAPI = (storeLegal: ILOANNormalStorageLegalState,
  los_uuid: string,
  master: IMasterData) => {
  const {
    gender: { data: gender },
    relationship,
    country: { data: country },
    cifIfType: { data: cif },
    addressType: { data: adrType },
  } = master;

  const dataOther = storeLegal.data.OTHER.info
  const rlsship = relationship["Y"]?.data ?? [];

  const body = dataOther.map((da, idx) => ({
    basic_info: {
      uuid: da.basic.person_uuid ? da.basic.person_uuid : null,
      id: "string",
      avatar: "cdn/hello.jpg",
      full_name: da.basic.fullname.toUpperCase(),
      date_of_birth: (da.basic.birthday ?? 0) / 1000,
      gender_info: gender.find(item => item.code === da.basic.gender),
      country_info: {
        country_code: country.find(item => item.code === da.basic.national)?.code,
        country_name: country.find(item => item.code === da.basic.national)?.name,
      },
      telephone_num: da.basic.telephone ? da.basic.telephone : null,
      mobile_num: da.basic.mobile,
      email: da.basic.email.length === 0 ? null : da.basic.email,
      customer_family_relationship_info: rlsship?.find(item => item.code === da.basic.relationship),
    },
    identity_info: da.identity.map((ide, index) => ({
      identity_type: cif.find(item => item.id === ide.type),
      identity_num: ide.num,
      issued_date: (ide.issuedDate ?? 0) / 1000,
      expired_date: !ide.expiredDate ? null : (ide.expiredDate ?? 0) / 1000,
      place_of_issue: ide.placeOfIssue,
      primary_flag: ide.primaryFlag,
      uuid: ide.uuid ? ide.uuid : null,
    })),
    address_info: da.address.address.map((ad, idx) => ({
      id: "string",
      address_type: adrType.find(item => item.id === ad.type),
      address: ad.apartment,
      province_info: {
        province_code: ad.province,
      },
      district_info: {
        district_code: ad.district
      },
      ward_info: {
        ward_code: ad.ward
      },
      primary_flag: ad.primaryFlag,
    })),
    note: da.other?.note ?? "",
    total_document_file: 0,
    document_info_list: getDeclareDocument(da.document_info_list)
  }))

  return apiPost<unknown>(
    formatPath(API_LOAN_NORMAL_SAVE_OTHER, los_uuid ? los_uuid : ''),
    body
  )
}

export const deleteLOANNormalStoredLegaAPI = (los_uuid: string, declare_type: string) => {
  switch (declare_type) {
    case ELegalTypeScreen.MARRIAGE:
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_DELETE_MARRIAGE, los_uuid ? los_uuid : ''),
      )
    case ELegalTypeScreen.CO_BRW:
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_DELETE_CO_BORROWER, los_uuid ? los_uuid : ''),
      )
    case ELegalTypeScreen.CO_PAYER:
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_DELETE_CO_PAYER, los_uuid ? los_uuid : ''),
      )
    case ELegalTypeScreen.LAW_RLT:
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_DELETE_LAW_RLT, los_uuid ? los_uuid : ''),
      )
    case ELegalTypeScreen.REALTED:
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_DELETE_RELATED, los_uuid ? los_uuid : ''),
      )
    case ELegalTypeScreen.OTHER:
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_DELETE_OTHER, los_uuid ? los_uuid : ''),
      )
  }
}

export const deleteLOANNormalLegalUserListByUUID = (los_uuid: string, declare_type: string, person_uuid: string) => {
  switch (declare_type) {
    case ELegalTypeScreen.CO_BRW:
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_DELETE_COBORROWER_BY_UUID, los_uuid ? los_uuid : '', person_uuid ? person_uuid : ''),
      )
    case ELegalTypeScreen.CO_PAYER:
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_DELETE_COPAYER_BY_UUID, los_uuid ? los_uuid : '', person_uuid ? person_uuid : ''),
      )
    case ELegalTypeScreen.LAW_RLT:
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_DELETE_LAGALRELATED_BY_UUID, los_uuid ? los_uuid : '', person_uuid ? person_uuid : ''),
      )
    case ELegalTypeScreen.REALTED:
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_DELETE_CONTACT_BY_UUID, los_uuid ? los_uuid : '', person_uuid ? person_uuid : ''),
      )
    case ELegalTypeScreen.OTHER:
      return apiDelete<unknown>(
        formatPath(API_LOAN_NORMAL_DELETE_OTHER_BY_UUID, los_uuid ? los_uuid : '', person_uuid ? person_uuid : ''),
      )
  }
}

export const getLOANNormalStorageLegalDataAPI = (los_uuid: string) => {
  return apiGet<unknown>(formatPath(API_LOAN_NORMAL_GET_LEGAL_INFO, los_uuid));
}


export const saveLegalFile = (action: FormData) => {
  return apiPost<unknown>(formatPath("v2/configs/multi-upload/"), action, {
    "Content-Type": "multipart/form-data",
  });
};

export const downloadLegalFile = (listUuid: any) => {
  const queryParameters = new URLSearchParams(listUuid.map((x: string) => ['uuids', x]));
  return apiGet<unknown>(formatPath(`v2/configs/multi-download/?${queryParameters}`));
}

export const getCif = (cif: string) => {
  return apiGet<ILOANNormalLegalBor>(formatPath(API_LOAN_NORMAL_GET_CIF_DATA, cif));
};

export const checkBlacklistApi = (legalState: ILOANNormalStorageLegalState, screen : ELegalTypeScreen) => {
  let listIden = ""

  switch (screen) {
    case ELegalTypeScreen.BORROWER:
      listIden = legalState.data?.BORROWER?.info[0]?.identity?.map(e => e.num)?.join(",") ?? ""
      break;
    case ELegalTypeScreen.MARRIAGE:
      listIden = legalState.data?.MARRIAGE?.info[0]?.identity?.map(e => e.num)?.join(",") ?? ""
      break;
    case ELegalTypeScreen.CO_BRW:
      listIden = legalState.data.CO_BRW.info?.map(e => e.identity?.map(iden => iden.num).join(",") ?? "").join(",")
    break;
    case ELegalTypeScreen.CO_PAYER:
      listIden = legalState.data.CO_PAYER.info?.map(e => e.identity?.map(iden => iden.num).join(",") ?? "").join(",")
    break;
    case ELegalTypeScreen.OTHER:
      listIden = legalState.data.OTHER.info?.map(e => e.identity?.map(iden => iden.num).join(",") ?? "").join(",")
    break;
    default:
      break;
  }

  const query = `?indentity=${listIden}`
  return apiGet<ILOANNormalAlertBlackListData[]>(formatPath(API_LOAN_NORMAL_CHECK_LEGAL_BLACKLIST, query));
};
