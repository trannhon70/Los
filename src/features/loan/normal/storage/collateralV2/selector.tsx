import { createSelector } from "@reduxjs/toolkit";
import { ICertificateLegalInfoData, IDepartmentCertificateLegal, ILOANNormalCollateralV2StateFullInfoLegalOwners, ILOANNormalCollateralV2StateModalTableCoOwners, IMaketCertificates } from "types/models/loan/normal/storage/CollaretalV2";
import { RootState } from "types/reducer";
import { ESubtypeRest, ETypeCollateral, ETypeLandName } from "./case";
import { CollateralValidate } from './validate';
import * as _ from 'lodash';
import { ILOANNormalDocument } from "types/models/loan/normal/configs/Document";
import store from "app/store";

export const getLOANNormalStorageCollateralFull =  (state: RootState) => {
  if(state.LOANNormal.storage.full.data 
    && state.LOANNormal.storage.full.data.form.collateral_form.data.collaterals.length > 0){
    return true
  }else if(state.LOANNormal.storage.collateral_v2.data.length > 0){
    for(let i of state.LOANNormal.storage.collateral_v2.data){
      if(i.price_cert_uuid){
        return true
      }      
    }
  }
  else{
    return false
  }
}
export const getAllDataCollateral =
  (state: RootState) => state.LOANNormal.storage.collateral_v2

export const getAllDataCollateralFull =
  (state: RootState) => state.LOANNormal.storage.full.data?.form.collateral_form.data.collaterals

export const getAllDataCollateralVo =
  (state: RootState) => state.LOANNormal.storage.collateral_v2.data[3]

export const getDataModalTableCoOwners = (state: RootState) => {
  const _legalInfoForm = state.LOANNormal.storage.full?.data?.form?.legal_info_form?.data;
  let CoOwners: ILOANNormalCollateralV2StateModalTableCoOwners[] = [];

  CoOwners.push({
    full_name: _legalInfoForm?.borrower?.basic_info?.full_name ?? "",
    identity_num: _legalInfoForm?.borrower?.identity_info?.find((ii: any) => ii.primary_flag === true)?.identity_num?.toString() ?? "",
    uuid: _legalInfoForm?.borrower?.basic_info?.uuid ?? "",
    mobile_num: _legalInfoForm?.borrower?.basic_info?.mobile_num ?? "",
    telephone_num: _legalInfoForm?.borrower?.basic_info?.telephone_num ?? ""
  })

  _legalInfoForm?.law_rlt?.map((lr: any) => {
    CoOwners.push({
      full_name: lr?.basic_info?.full_name ?? "",
      identity_num: lr?.identity_info?.identity_num?.toString() ?? "",
      uuid: lr?.basic_info?.uuid ?? "",
      mobile_num: lr?.basic_info?.mobile_num ?? "",
      telephone_num: lr?.basic_info?.telephone_num ?? ""
    })

    return null;
  })


  return CoOwners ?? [];
}


export const getToalCollateralValue = (state: RootState) => {
  let totalCollateralValue: number = 0;
  // let landToal: number = 0

  for (let i of state.LOANNormal.storage.collateral_v2.data) {
    totalCollateralValue += Number(i.collateral_value ?? 0)
  }


  // state.LOANNormal.storage.collateral_v2.data.map(d => {
  //   d.sub_type.forEach(st => {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     st.items.forEach(i => {
  //       return landToal += Number(i?.ctxd_land?.ctx_land_wrapper?.value_of_land ?? 0) + 
  //         Number(i?.land?.land_wrapper?.value_of_land ?? 0) + 
  //         Number(i?.ctxd_gcn_qsh?.ctxd_gcn_qsh_data?.map(
  //           gcn => gcn?.ctxd_gcn_qsh_land_info?.ctx_land_wrapper?.value_of_land ?? 0)
  //             .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0) + 
  //         Number(i?.market?.maket_wrapper?.value_of_land ?? 0) +
  //         Number(i?.department?.department_wrapper?.value_of_land ?? 0)
  //     })
  //   })
  //   return {...d}
  // })

  return totalCollateralValue;
}
export const getDataFullCollType = (state: RootState) => state.LOANNormal.storage.collateral_v2
export const getTypeActive = (state: RootState) => state.LOANNormal.storage.collateral_v2.activeType;
export const fetchedDataCollateral = (state: RootState) => state.LOANNormal.storage.collateral_v2;
export const getIsCollapseActive = (state: RootState) => state.LOANNormal.storage.collateral_v2.data.find(i => i.is_collapse_type === true)
export const getCountCollateralData = (state: RootState) => state.LOANNormal.storage.collateral_v2.data.length
export const getLOANNormalCarousel = (state: RootState) => state.LOANNormal.storage.collateral_v2.carousel;
export const getLOANNormalCarouselByType = (type: string) =>
  (state: RootState) => state.LOANNormal.storage.collateral_v2.carousel.find(i => i.type === type);
export const getLOANNormalCollaretalType = (state: RootState) => {

  const typeActive = state.LOANNormal.storage.collateral_v2.activeType;

  if (typeActive === ETypeCollateral?.ALL) {
    return state.LOANNormal.storage.collateral_v2.data
  } else {
    return state.LOANNormal.storage.collateral_v2.data.filter(d => d.type === typeActive)
  }
}
export const getAllDataCollateralIgnore =
  (state: RootState) => state.LOANNormal.storage.collateral_v2.ignore

export const getLOANNormalCollateralData = () => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data?.find(item => item.is_collapse_type === true);
}
export const getLOANNormalCollapse = () => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data
}
export const getLOANNormalCollapseByType = (type: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data.find(item => item.type === type)?.sub_type.filter(i => i.id.length > 0 && i.items.length > 0);
}
export const getLOANNormalCollapseByTypeV2 = (type: string) => (state: RootState) => {
  if (type === "ALL") {
    return state.LOANNormal.storage.collateral_v2.data
  } else return state.LOANNormal.storage.collateral_v2.data.filter(item => item.type === type);
}
export const getLOANNormalCollapseType = (uuidData: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidData)?.is_collapse_type;
}

export const getLoanNormalSubType = (uuidData: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidData)?.sub_type
}

export const getLoanNormalSubTypeByUUIDData = (typeActive: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === typeActive)?.sub_type
}

export const getLOANNormalCollapseSubType = (uuidData: string, uuidSubType: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data.find(item => item.uuidActiveData === uuidData)?.sub_type
    .find(st => st.uuidActiveSubtype === uuidSubType)?.is_collapse_sub_type;
}

export const getLOANNormalCollapseSubTypeId = (uuidData: string, uuidSubType: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data.find(item => item.uuidActiveData === uuidData)?.sub_type
    .find(st => st.uuidActiveSubtype === uuidSubType)?.id ?? "";
}

export const getLOANNormalCollateralIsCompactness = (uuidData: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidData)?.status ?? "";
}

///////////// fix state dataactive 
export const getLoanNormalSubTypeByDataActive = (uuidDataActive: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidDataActive)?.sub_type
}


export const getLoanNormalSubTypeItems = (uuidDataActive: string, itemsActive: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidDataActive)?.sub_type
    ?.find(item => item.uuidActiveSubtype === itemsActive)?.items
}
export const getLoanNormalSubTypeItemsLegalDocs = (uuidDataActive: string, itemsActive: string, activeUUID: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidDataActive)?.sub_type
    ?.find(item => item.uuidActiveSubtype === itemsActive)?.items?.find(le => le.activeUUID === activeUUID)?.legal_document_types
}

export const getLOANNormalStorageCollateralsSave = (state: RootState) => [
  state.LOANNormal.storage.collateral_v2,
  state.LOANNormal.storage.full.data?.form?.legal_info_form?.data?.borrower?.basic_info?.uuid as string ?? '',
  state.LOANNormal.storage.full.data?.form?.legal_info_form?.data?.marriage?.basic_info?.uuid as string ?? '',
  state.LOANNormal.storage.full.data?.form.los_info.los_uuid as string,
  state.masterData,
  // state.LOANNormal.storage.collateral_v2.uuidActiveData
];

export const getTypeCollaterals = (state: RootState) => state.LOANNormal.storage.collateral_v2.data

export const getIsCollapseSubtype = (uuidCollateral: string, uuidSubtype: string,) => (state: RootState) => {
  // eslint-disable-next-line array-callback-return
  return state.LOANNormal.storage.collateral_v2.data.filter(d => {
    if (d.uuidActiveData === uuidCollateral) {
      // eslint-disable-next-line array-callback-return
      d.sub_type.filter(st => {
        if (st.uuidActiveSubtype === uuidSubtype) {
          return st.is_collapse_sub_type
        }
      })
    }
  })
}
export const getLoanNormalSubTypeItemsActive = (uuidActiveData: string, itemsActive: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidActiveData)?.sub_type
    ?.find(item => item.uuidActiveSubtype === itemsActive)?.uuidItemsActive ?? ""
}

export const getLoanNormalCertificateActive = (uuidActiveData: string, subtypeActive: string, itemActive : string, type: string) => (state: RootState) => {
  const subtype = state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidActiveData)?.sub_type
  ?.find(item => item.uuidActiveSubtype === subtypeActive)
  const uuidCtxdGCNActive = subtype?.items?.find(item=>item.activeUUID === itemActive)
  if(type ==='LAND'){
    return state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidActiveData)?.sub_type
    ?.find(item => item.uuidActiveSubtype === subtypeActive)?.items?.find(item=>item.activeUUID === itemActive)?.land?.certificate_legal_info?.activeUUIDCertificate ?? "";
  }else if(type === "CTXD_GCN"){
    return uuidCtxdGCNActive?.ctxd_gcn_qsh.ctxd_gcn_qsh_data.find(o=>o.uuIdCtxdGcnQsh === uuidCtxdGCNActive?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh)?.certificate_legal_info?.activeUUIDCertificate ?? ""
  }else{
    if(subtype?.id === 'MARK'){
      return uuidCtxdGCNActive?.maketActiveUuid ?? ""
    }else{
      return uuidCtxdGCNActive?.departmentActiveUUID ?? ""
    }
  }
}

export const getLoanNormalSubTypeItemsData = (uuidActiveData: string, itemsActive: string, itemsUUID: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidActiveData)?.sub_type
    ?.find(item => item.uuidActiveSubtype === itemsActive)?.items?.find(ii => ii.activeUUID === itemsUUID)
}

export const getLoanNormalSubTypeItemID = (uuidActiveData: string, itemsActive: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidActiveData)?.sub_type
    ?.find(item => item.uuidActiveSubtype === itemsActive)
}

export const getTypeLand = (uuidActiveData: string, itemsActive: string, itemsUUID: string) => createSelector(
  getLoanNormalSubTypeItemsData(uuidActiveData, itemsActive, itemsUUID),
  (state) => {
    return state?.type_land ?? "";
  }
)

export const getLOANormalStoreColalteralLandAssessmentMaket = (uuidActiveData: string, itemsActive: string, itemsUUID: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidActiveData)?.sub_type
    ?.find(item => item.uuidActiveSubtype === itemsActive)?.items?.find(ii => ii.activeUUID === itemsUUID)
}

export const getLOANormalStoreColalteralLandAssessment = (uuidActiveData: string, itemsActive: string, itemsUUID: string, uuidActiveLandGcnQsh?: string) => (state: RootState) => {
  const dataSubtype = state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidActiveData)?.sub_type?.find(item => item.uuidActiveSubtype === itemsActive);
  const dataSubitem = dataSubtype?.items?.find(ii => ii.activeUUID === itemsUUID);
  if (dataSubtype?.id === ESubtypeRest.MARK) {
    /**
     * Loại sạp chợ
     * 
     */
    return dataSubitem?.market?.maket_wrapper;
  }
  if (dataSubtype?.id === ESubtypeRest.APPA) {
    /**
     * Loại căn hộ chung chư
     * 
     */
    return dataSubitem?.department.department_wrapper
  }
  if (dataSubtype?.id === ESubtypeRest.LAND) {
    let typeLand = dataSubitem?.type_land ?? "";

    if (typeLand === ETypeLandName.LAND) {
      return dataSubitem?.land.land_wrapper;
    }
    else if (typeLand === ETypeLandName.CTXD_LAND) {
      return { ...dataSubitem?.land.land_wrapper, value_of_land: dataSubitem?.ctxd_land.ctx_land_wrapper.value_of_land }
      // return dataSubitem?.ctxd_land.ctx_land_wrapper
    }
    if (typeLand === ETypeLandName.CTXD_GCN) {
      let active = dataSubitem?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh ?? "";
      return dataSubitem?.ctxd_gcn_qsh.ctxd_gcn_qsh_data?.find(i => i.uuIdCtxdGcnQsh === active)?.ctxd_gcn_qsh_land_info.ctx_land_wrapper;

    }
  }
}

export const getLOANormalStoreLandLegalItemActive = (uuidActiveData: string, subTypeActive: string) => (state: RootState) => {
  let itemActive = state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidActiveData)?.sub_type
    ?.find(st => st.uuidActiveSubtype === subTypeActive);

  return itemActive?.items?.find(i => i.activeUUID === itemActive?.uuidItemsActive)
}

export const getLOANormalStoreLandLegalInformationOwner = (uuidActiveData: string, subTypeActive: string) => createSelector(
  getLOANormalStoreLandLegalItemActive(uuidActiveData, subTypeActive),
  (state) => {
    let typeLand = state?.type_land ?? "";

    if (typeLand === ETypeLandName.LAND) {
      return state?.land.land_legal_information_owner;
    }

    if (typeLand === ETypeLandName.CTXD_GCN) {
      let active = state?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh ?? "";
      return state?.ctxd_gcn_qsh.ctxd_gcn_qsh_data.find(d => d.uuIdCtxdGcnQsh === active)?.land_legal_information_owner
    }
  }
)

//////bat dong san thong tin phap ly giay chung nhan ////
export const getLOANormalStoreDataItemActive = (uuidActiveData: string, subTypeActive: string) => (state: RootState) => {
  let itemActive = state.LOANNormal.storage.collateral_v2.data.find(item => item.uuidActiveData === uuidActiveData)?.sub_type
    ?.find(st => st.uuidActiveSubtype === subTypeActive);
  return state.LOANNormal.storage.collateral_v2.data.find(item => item.uuidActiveData === uuidActiveData)?.sub_type
    ?.find(st => st.uuidActiveSubtype === subTypeActive)?.items.find(i => i.activeUUID === itemActive?.uuidItemsActive)
}
export const getLOANormalStoreDataItemActiveApproval = (uuidActiveData: string, subTypeActive: string) => (state: RootState) => {
  let itemActive = state.LOANNormal.storageApproval.collateral.data.find(item => item.uuidActiveData === uuidActiveData)?.sub_type
    ?.find(st => st.uuidActiveSubtype === subTypeActive);
  return state.LOANNormal.storageApproval.collateral.data.find(item => item.uuidActiveData === uuidActiveData)?.sub_type
    ?.find(st => st.uuidActiveSubtype === subTypeActive)?.items.find(i => i.activeUUID === itemActive?.uuidItemsActive)
}

export const getLOANormalStoreLegalCertifiCate = (uuidActiveData: string, subTypeActive: string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    let typeLand = state?.type_land;
    if (typeLand === ETypeLandName.LAND) {
      return state?.land.certificate_legal_info;
    }
    else {
      let cgqd_active = state?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
      return state?.ctxd_gcn_qsh.ctxd_gcn_qsh_data.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.certificate_legal_info;
    }

  }
)
export const getCertifiCateLOANormalStoreLegalCertifiCateLand = (uuidActiveData: string, subTypeActive: string, uuidCertificate:string,itemDocType:string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    switch(itemDocType){
      case 'department':{
        const exist:IDepartmentCertificateLegal| undefined = state?.department?.department_certificate_legal?.find(item=>item.uuid_certificate_legal === uuidCertificate);
        return exist;
      }
      case 'market':{
        const exist:IMaketCertificates | undefined = state?.market?.maket_certificates?.find(item=>item.uuid_maket_certificate === uuidCertificate);
        return exist;
      }
      default:{
        const type_land = state?.type_land;
        const find = (item:ICertificateLegalInfoData)=>item.activeUUIDCertificateL === uuidCertificate;
        switch(type_land){
          case ETypeLandName.LAND:{
            const exist:ICertificateLegalInfoData | undefined = state?.land.certificate_legal_info.dataCertificate.find(find);
            return exist;
          }
          case ETypeLandName.CTXD_GCN:{
            let cgqd_uuid_active = _.get(state,'ctxd_gcn_qsh.activeUuIdCtxdGcnQsh','');
            const ctxd_gcn_qsh = state?.ctxd_gcn_qsh.ctxd_gcn_qsh_data.find(cgqd=>cgqd.uuIdCtxdGcnQsh === cgqd_uuid_active);
            const exist:ICertificateLegalInfoData | undefined = _.get(ctxd_gcn_qsh,'certificate_legal_info.dataCertificate',[]).find(find);
            return exist;
          }
          default: return undefined;
        }
      }
    }
    
  }
);
export const getCertifiCateLOANormalStoreLegalCertifiCateLandApproval = (uuidActiveData: string, subTypeActive: string, uuidCertificate:string,itemDocType:string) => createSelector(
  getLOANormalStoreDataItemActiveApproval(uuidActiveData, subTypeActive),
  (state) => {
    switch(itemDocType){
      case 'department':{
        const exist:IDepartmentCertificateLegal| undefined = state?.department?.department_certificate_legal?.find(item=>item.uuid_certificate_legal === uuidCertificate);
        return exist;
      }
      case 'market':{
        const exist:IMaketCertificates | undefined = state?.market?.maket_certificates?.find(item=>item.uuid_maket_certificate === uuidCertificate);
        return exist;
      }
      default:{
        const type_land = state?.type_land;
        const find = (item:ICertificateLegalInfoData)=>item.activeUUIDCertificateL === uuidCertificate;
        switch(type_land){
          case ETypeLandName.LAND:{
            const exist:ICertificateLegalInfoData | undefined = state?.land.certificate_legal_info.dataCertificate.find(find);
            return exist;
          }
          case ETypeLandName.CTXD_GCN:{
            let cgqd_uuid_active = _.get(state,'ctxd_gcn_qsh.activeUuIdCtxdGcnQsh','');
            const ctxd_gcn_qsh = state?.ctxd_gcn_qsh.ctxd_gcn_qsh_data.find(cgqd=>cgqd.uuIdCtxdGcnQsh === cgqd_uuid_active);
            const exist:ICertificateLegalInfoData | undefined = _.get(ctxd_gcn_qsh,'certificate_legal_info.dataCertificate',[]).find(find);
            return exist;
          }
          default: return undefined;
        }
      }
    }
    
  }
);
export const getDocumentLOANormalStoreLegalCertifiCateLand = (uuidActiveData: string, subTypeActive: string, uuidCertificate:string,itemDocType:string) => createSelector(
  getCertifiCateLOANormalStoreLegalCertifiCateLand(uuidActiveData, subTypeActive,uuidCertificate,itemDocType),
  (activeCertificate) => {
    if(!activeCertificate) return [] as ILOANNormalDocument[];
    return _.get(activeCertificate,'documents',[]);
  }
);
export const getDocumentLOANormalStoreLegalCertifiCateLandApproval = (uuidActiveData: string, subTypeActive: string, uuidCertificate:string,itemDocType:string) => createSelector(
  getCertifiCateLOANormalStoreLegalCertifiCateLandApproval(uuidActiveData, subTypeActive,uuidCertificate,itemDocType),
  (activeCertificate) => {

    if(!activeCertificate) return [] as ILOANNormalDocument[];
    return _.get(activeCertificate,'documents',[]);
  }
);
export const getLOANormalStoreLegalCertifiCateUseListLegal = (uuidActiveData: string, subTypeActive: string, activeUUIDCertificateL: string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    let typeLand = state?.type_land;
    if (typeLand === ETypeLandName.LAND) {
      return state?.land.certificate_legal_info.dataCertificate?.find(cc => cc.activeUUIDCertificateL === activeUUIDCertificateL)
    } else {
      let cgqd_active = state?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
      return state?.ctxd_gcn_qsh.ctxd_gcn_qsh_data.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.certificate_legal_info.dataCertificate?.find(cc => cc.activeUUIDCertificateL === activeUUIDCertificateL);
    }

  }
)

export const getLOANormalStoreLegalCertifiCateUseListLegalData = (uuidActiveData: string, subTypeActive: string, activeUUIDCertificateL: string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    let typeLand = state?.type_land;
    if (typeLand === ETypeLandName.LAND) {
      return state?.land.certificate_legal_info.dataCertificate?.find(cc => cc.activeUUIDCertificateL === activeUUIDCertificateL)
    } else {
      const cgqd_active = state?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
      const _certificate_legal_info = state?.ctxd_gcn_qsh.ctxd_gcn_qsh_data.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.certificate_legal_info;
      return _certificate_legal_info?.dataCertificate.find(dc => dc.activeUUIDCertificateL === _certificate_legal_info?.activeUUIDCertificate);
    }

  }
)

export const getLOANNormalActiveUUIDCertificate = (uuidActiveData: string, subTypeActive: string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    let typeLand = state?.type_land;
    if (typeLand === ETypeLandName.LAND) {
      return state?.land.certificate_legal_info?.activeUUIDCertificate;
    } else {
      const cgqd_active = state?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
      const _certificate_legal_info = state?.ctxd_gcn_qsh.ctxd_gcn_qsh_data.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.certificate_legal_info;
      return _certificate_legal_info?.activeUUIDCertificate;
    }
  }
)

export const getUuidItem = (uuIdData: string, uuIdSubType: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data.find(item => item.uuidActiveData === uuIdData)?.sub_type.find(st => st.uuidActiveSubtype === uuIdSubType);
}

export const getUuidItemActive = (uuIdData: string, uuIdSubType: string, uuidItemsActive: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data
    ?.find(item => item.uuidActiveData === uuIdData)?.sub_type
    ?.find(st => st.uuidActiveSubtype === uuIdSubType)?.items?.find(actiItems => actiItems.activeUUID === uuidItemsActive)
}


export const getLOANormalStoreColalteralLandCTXD = (uuidActiveData: string, subTypeActive: string, uuidItemsActive: string) => createSelector(
  getUuidItemActive(uuidActiveData, subTypeActive, uuidItemsActive),
  (state) => {
    let typeLand = state?.type_land;
    if (typeLand === ETypeLandName.CTXD_LAND) {
      return state?.ctxd_land;
    }

    // if (typeLand === ETypeLandName.CTXD_GCN){
    //   let cgqd_active = state?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh ?? '';
    //   return state?.ctxd_gcn_qsh.ctxd_gcn_qsh_data.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.ctxd_land_info;
    // }
  }
)


export const getLOANormalStoreColalteralLandCTXDData = (uuidActiveData: string,
  subTypeActive: string,
  uuidItemsActive: string) => createSelector(
    getUuidItemActive(uuidActiveData, subTypeActive, uuidItemsActive),
    (state) => {
      const uuidActiveCTXDLand = state?.ctxd_land.activeCTXDLand
      const typeLand = state?.type_land ?? "";

      if (typeLand === ETypeLandName.CTXD_LAND) {
        return state?.ctxd_land.dataCTXDLand?.find(ctxd => ctxd.activeUUIDCTXDLand === uuidActiveCTXDLand)
      }

      if (typeLand === ETypeLandName.CTXD_GCN) {
        let cgqd_active = state?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh ?? '';
        let ctxd_land_info_data = state?.ctxd_gcn_qsh.ctxd_gcn_qsh_data?.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.ctxd_gcn_qsh_land_info;

        return ctxd_land_info_data?.dataCTXDLand
      }
    }
  )

export const getLOANormalStoreColalteralLandCTXDUuidActive = (uuidActiveData: string,
  subTypeActive: string,
  uuidItemsActive: string) => createSelector(
    getUuidItemActive(uuidActiveData, subTypeActive, uuidItemsActive),
    (state) => {
      const typeLand = state?.type_land ?? "";

      if (typeLand === ETypeLandName.CTXD_LAND) {
        return state?.ctxd_land.activeCTXDLand
      }

      if (typeLand === ETypeLandName.CTXD_GCN) {
        let cgqd_active = state?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh ?? '';
        let ctxd_land_info_data = state?.ctxd_gcn_qsh.ctxd_gcn_qsh_data?.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.ctxd_gcn_qsh_land_info;

        return ctxd_land_info_data?.activeCTXDLand
      }
    }
  )

export const getLOANormalStoreColalteralLandAsset = (uuidActiveData: string, subTypeActive: string) => createSelector(   /// check type
  getUuidItem(uuidActiveData, subTypeActive),
  (state) => {
    let uuidItem = state?.uuidItemsActive ?? "";

    return state?.items.find(i => i.activeUUID === uuidItem)?.land.land_legal_infomation_asset
  }
)


export const getLOANormalStoreColalteralLandAssetType = (uuidActiveData: string, subTypeActive: string) => createSelector(/// check type
  getUuidItem(uuidActiveData, subTypeActive),
  getUuidItem(uuidActiveData, subTypeActive),
  (state) => {
    let uuidItem = state?.uuidItemsActive ?? "";

    return state?.items?.find(i => i.activeUUID === uuidItem)?.land.land_legal_infomation_asset
  }
)

export const getLOANormalStoreColalteralLandAssetTypeUsingLand = (uuidActiveData: string, subTypeActive: string) => createSelector(/// check type
  getUuidItem(uuidActiveData, subTypeActive),
  (state) => {
    let uuidItem = state?.uuidItemsActive ?? "";

    return state?.items?.find(i => i.activeUUID === uuidItem)?.land.land_legal_infomation_asset?.land_asset_types
  }
)

export const getLOANormalStoreColalteralLandAssetTypeUsingLandUuidActive = (uuidActiveData: string, subTypeActive: string) => createSelector(/// check type
  getUuidItem(uuidActiveData, subTypeActive),
  (state) => {
    let uuidItem = state?.uuidItemsActive ?? "";

    return state?.items.find(i => i.activeUUID === uuidItem)?.land.land_legal_infomation_asset?.activeUUIDCertificateUsePurposes;
  }
)
export const getLOANormalStoreColalteralLandAssetTypeUsingLandDataActive = (uuidActiveData: string, subTypeActive: string, uuidUsePurposes: string) => createSelector(
  getUuidItem(uuidActiveData, subTypeActive),
  (state) => {
    let uuidItem = state?.uuidItemsActive ?? "";

    return state?.items?.find(i => i.activeUUID === uuidItem)?.land.land_legal_infomation_asset?.land_asset_types?.find(lat => lat.activeUUIDCertificateUsePurposes === uuidUsePurposes);
  }
)

// CTXD có GCN QSH riêng
export const getLOANormalStoreColalteralLandCTXDGcnQsh = (uuidActiveData: string, subTypeActive: string) => createSelector(/// check type
  getUuidItem(uuidActiveData, subTypeActive),
  (state) => {
    let uuidItem = state?.uuidItemsActive ?? "";
    return state?.items?.find(i => i.activeUUID === uuidItem)?.ctxd_gcn_qsh
  }
)

export const getLOANormalStoreColalteralLandCTXDGcnQshData = (uuidActiveData: string, subTypeActive: string) => createSelector(/// check type
  getUuidItem(uuidActiveData, subTypeActive),
  (state) => {
    let uuidItem = state?.uuidItemsActive ?? "";
    return state?.items?.find(i => i.activeUUID === uuidItem)?.ctxd_gcn_qsh?.ctxd_gcn_qsh_data ?? [];
  }
)

export const getLOANormalStoreColalteralLandCTXDGcnQshUuidActive = (uuidActiveData: string, subTypeActive: string) => createSelector(/// check type
  getLOANormalStoreColalteralLandCTXDGcnQsh(uuidActiveData, subTypeActive),
  (state) => {
    return state?.activeUuIdCtxdGcnQsh
  }
)

export const getLOANormalStoreColalteralLandCTXDGcnQshDataActive = (uuidActiveData: string, subTypeActive: string, activeUuIdCtxdGcnQsh: string) => createSelector(/// check type
  getLOANormalStoreColalteralLandCTXDGcnQsh(uuidActiveData, subTypeActive),
  (state) => {
    return state?.ctxd_gcn_qsh_data.find(d => d.uuIdCtxdGcnQsh === activeUuIdCtxdGcnQsh);
  }
)

export const getLOANormalStoreColalteralLandCTXDGcnQshCurrentIndex = (uuidActiveData: string, subTypeActive: string) => createSelector(
  getLOANormalStoreColalteralLandCTXDGcnQsh(uuidActiveData, subTypeActive),
  (state) => {
    let uuidActive = state?.activeUuIdCtxdGcnQsh ?? "";
    return state?.ctxd_gcn_qsh_data?.findIndex(d => d.uuIdCtxdGcnQsh === uuidActive);
  }
)

export const getLOANormalStoreColalteralLandCTXDTypeData = (uuidActiveData: string,
  subTypeActive: string,
  uuidItemsActive: string) => createSelector(
    getUuidItemActive(uuidActiveData, subTypeActive, uuidItemsActive),
    (state) => {
      const typeLand = state?.type_land ?? "";
      const uuidActiveCTXDLand = state?.ctxd_land.activeCTXDLand

      if (typeLand === ETypeLandName.CTXD_LAND) {
        return state?.ctxd_land.dataCTXDLand?.find(ctxd => ctxd.activeUUIDCTXDLand === uuidActiveCTXDLand)?.dataTypeCTXD
      }

      if (typeLand === ETypeLandName.CTXD_GCN) {
        let cgqd_active = state?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh ?? '';
        let ctxd_land_info_data = state?.ctxd_gcn_qsh.ctxd_gcn_qsh_data?.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.ctxd_gcn_qsh_land_info;

        return ctxd_land_info_data?.dataCTXDLand?.dataTypeCTXD
      }
    }
  )

export const getLOANormalStoreColalteralLandCTXDTypeActive = (uuidActiveData: string,
  subTypeActive: string,
  uuidItemsActive: string) => createSelector(
    getUuidItemActive(uuidActiveData, subTypeActive, uuidItemsActive),
    (state) => {
      const typeLand = state?.type_land ?? "";
      const uuidActiveCTXDLand = state?.ctxd_land.activeCTXDLand

      if (typeLand === ETypeLandName.CTXD_LAND) {
        return state?.ctxd_land.dataCTXDLand?.find(ctxd => ctxd.activeUUIDCTXDLand === uuidActiveCTXDLand)?.activeUUIDtypeCTXD
      }

      if (typeLand === ETypeLandName.CTXD_GCN) {
        let cgqd_active = state?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh ?? '';
        let ctxd_land_info_data = state?.ctxd_gcn_qsh.ctxd_gcn_qsh_data?.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.ctxd_gcn_qsh_land_info;

        return ctxd_land_info_data?.dataCTXDLand?.activeUUIDtypeCTXD;
      }
    }
  )

export const getLOANormalStoreColalteralLandCTXDTypeDataDetails = (uuidActiveData: string,
  subTypeActive: string,
  uuidItemsActive: string,
  uuidCTXDLand: string) => createSelector(
    getUuidItemActive(uuidActiveData, subTypeActive, uuidItemsActive),
    (state) => {
      const uuidActiveCTXDLand = state?.ctxd_land.activeCTXDLand;
      const typeLand = state?.type_land ?? "";

      if (typeLand === ETypeLandName.CTXD_LAND) {
        return state?.ctxd_land.dataCTXDLand?.find(ctxd => ctxd.activeUUIDCTXDLand === uuidActiveCTXDLand)
          ?.dataTypeCTXD?.find(cc => cc.activeTypeCTXD === uuidCTXDLand)
      }

      if (typeLand === ETypeLandName.CTXD_GCN) {
        let cgqd_active = state?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh ?? '';
        let ctxd_land_info_data = state?.ctxd_gcn_qsh.ctxd_gcn_qsh_data?.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.ctxd_gcn_qsh_land_info;
        return ctxd_land_info_data?.dataCTXDLand?.dataTypeCTXD?.find(dt => dt.activeTypeCTXD === uuidCTXDLand);
      }
    }
  )
///
export const getLOANormalStoreInformationMaket = (uuidActiveData: string, subTypeActive: string) => createSelector(
  getLOANormalStoreLandLegalItemActive(uuidActiveData, subTypeActive),
  (state) => {
    return state?.market?.maket_info;
  }
)
export const getLOANormalStoreInformation = (uuidActiveData: string, subTypeActive: string) => createSelector(
  getLOANormalStoreLandLegalItemActive(uuidActiveData, subTypeActive),
  (state) => {
    return state;
  }
)
export const getLOANormalStoreLegalMaketCertificatesUuidActive = (uuidActiveData: string, subTypeActive: string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    return state?.maketActiveUuid ?? "";
  }
)

export const getLOANormalStoreLegalDepartment = (uuidActiveData: string, subTypeActive: string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    return state?.department
  }
)

export const getLOANormalStoreLegalDepartmentCertificatesUuidActive = (uuidActiveData: string, subTypeActive: string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    return state?.departmentActiveUUID ?? "";
  }
)


export const getLOANormalStoreLegalMaketCertificates = (uuidActiveData: string, subTypeActive: string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    return state?.market?.maket_certificates;
  }
)
export const getLOANormalStoreLegalDepartmentCertificates = (uuidActiveData: string, subTypeActive: string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    return state?.department.department_certificate_legal;
  }
)

export const getLOANormalStoreLegalCertifiCateMaketPersion = (uuidActiveData: string, subTypeActive: string, activeUUIDCertificateL: string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    return state?.market?.maket_certificates?.find(mc => mc.uuid_maket_certificate === activeUUIDCertificateL)?.persons;
  }
)
export const getLOANormalStoreLegalCertifiCateDepartmentPerson = (uuidActiveData: string, subTypeActive: string, activeUUIDCertificateL: string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    return state?.department.department_certificate_legal?.find(mc => mc.uuid_certificate_legal === activeUUIDCertificateL);
  }
)

export const getLOANormalStoreLegalCertifiCatePersionListLegalData = (
  uuidActiveData: string,
  subTypeActive: string,
  activeUUIDCertificateL: string
) => (state: RootState) => {

  const itemActive = state.LOANNormal.storage.collateral_v2.data.find(item => item.uuidActiveData === uuidActiveData)?.sub_type
    ?.find(st => st.uuidActiveSubtype === subTypeActive);

  if (itemActive?.id === ESubtypeRest.MARK) {
    const maketCertificates = itemActive?.items?.find(i => i.activeUUID === itemActive?.uuidItemsActive)?.market?.maket_certificates
      ?.find(mc => mc.uuid_maket_certificate === activeUUIDCertificateL)?.persons;

    return maketCertificates
  }
  if (itemActive?.id === ESubtypeRest.LAND) {
    const type = itemActive?.items?.find(i => i.activeUUID === itemActive?.uuidItemsActive)?.type_land
    if (type === ETypeLandName.LAND) {
      const Certificates = itemActive?.items?.find(i => i.activeUUID === itemActive?.uuidItemsActive)?.land?.certificate_legal_info.dataCertificate
        ?.find(mc => mc.activeUUIDCertificateL === activeUUIDCertificateL)?.persons;
      return Certificates
    }
    if (type === ETypeLandName.CTXD_GCN) {
      const active = itemActive?.items?.find(i => i.activeUUID === itemActive?.uuidItemsActive)?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh
      const Certificates = itemActive?.items
        ?.find(i => i.activeUUID === itemActive?.uuidItemsActive)?.ctxd_gcn_qsh?.ctxd_gcn_qsh_data
        ?.find(data => data.uuIdCtxdGcnQsh === active)?.certificate_legal_info.dataCertificate
        ?.find(mc => mc.activeUUIDCertificateL === activeUUIDCertificateL)?.persons;
      return Certificates
    }
  }
  if (itemActive?.id === ESubtypeRest.APPA) {
    const Certificates = itemActive?.items?.find(i => i.activeUUID === itemActive?.uuidItemsActive)?.department?.department_certificate_legal
      ?.find(mc => mc.uuid_certificate_legal === activeUUIDCertificateL)?.persons;
    return Certificates
  }

}

export const getLOANormalStoreLegalCertifiCateDepartmentPersionListLegalData = (  // department
  uuidActiveData: string,
  subTypeActive: string,
  activeUUIDCertificateL: string
) => (state: RootState) => {

  const itemActive = state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidActiveData)?.sub_type
    ?.find(st => st.uuidActiveSubtype === subTypeActive);

  const deparment = itemActive?.items?.find(i => i.activeUUID === itemActive?.uuidItemsActive)?.department.department_certificate_legal
    ?.find(mc => mc.uuid_certificate_legal === activeUUIDCertificateL);

  return deparment;
}

export const getLOANormalStoreLegalDepartmentInfo = (uuidActiveData: string, subTypeActive: string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    return state
  }
)

export const getLOANormalStoreLegalDepartmentInfoUuid = (uuidActiveData: string, subTypeActive: string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    return state?.departmentInfoActiveUUID ?? ""
  }
)


export const getLOANormalStoreLegalDepartmentInfoData = (uuidActiveData: string, subTypeActive: string, uuidActiveDepartment: string) => createSelector(
  getLOANormalStoreDataItemActive(uuidActiveData, subTypeActive),
  (state) => {
    return state?.department.department_info?.find(item => item.departmentInfoActiveUUID === uuidActiveDepartment)
  }
)
export const getLoanNormalSubTypeItemsDetails = (uuidDataActive: string, itemsActive: string, uuidItemActive: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidDataActive)?.sub_type
    ?.find(item => item.uuidActiveSubtype === itemsActive)?.items?.find(f => f.activeUUID === uuidItemActive)
}
export const getLoanNormalSubTypeItemsDetailsCertificate = (uuidDataActive: string, itemsActive: string, uuidItemActive: string, activeUUIDCertificateUsePurposes: string) => (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidDataActive)?.sub_type
    ?.find(item => item.uuidActiveSubtype === itemsActive)?.items?.find(f => f.activeUUID === uuidItemActive)?.department.department_info_land.certificate_use_purposes
    ?.find(cre => cre.activeUUIDCertificateUsePurposes === activeUUIDCertificateUsePurposes)
}


export const getLOANNormalRealEstateType = (uuidActiveData: string) => (state: RootState) => {

  const _collateralData = state.LOANNormal.storage.collateral_v2.data?.find(d => d.uuidActiveData === uuidActiveData);

  let total: number = 0;


  _collateralData?.sub_type?.map(st => {
    const subType = st?.id ?? "";
    total = st.items?.map(i => {
      if (subType === ESubtypeRest.LAND) {
        const landTotalValue = Number(i?.land?.land_wrapper?.value_of_land ?? 0) ?? 0;
        const ctxdLandTotalValue = Number(i?.ctxd_land?.ctx_land_wrapper?.value_of_land ?? 0) ?? 0;
        const ctxdGcnQshTotalValue = i?.ctxd_gcn_qsh?.ctxd_gcn_qsh_data?.map(
          gcn => gcn?.ctxd_gcn_qsh_land_info?.ctx_land_wrapper?.value_of_land ?? 0
        )?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

        return landTotalValue + (i?.land?.land_wrapper?.has_land_asset === 'Y' ? ctxdLandTotalValue : 0) + (i.land?.land_wrapper?.has_certificated_land_asset === 'Y' ? ctxdGcnQshTotalValue : 0 );
      }
      else if (subType === ESubtypeRest.MARK) {
        const maketTotalValue = i?.market?.maket_wrapper?.value_of_land ?? 0;
        return maketTotalValue;
      }
      else {
        const departmentTotalValue = i?.department?.department_wrapper?.value_of_land ?? 0;
        return departmentTotalValue;
      }

      // return landTotalValue + ctxdLandTotalValue + ctxdGcnQshTotalValue + maketTotalValue + departmentTotalValue;
    })?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);

    return null;
  })

  return Number(total ?? 0);
}


export const getLOANNormalTotalValueTransportType = (uuidActiveData: string) => (state: RootState) => {

  const _collateralData = state.LOANNormal.storage.collateral_v2.data?.find(d => d.uuidActiveData === uuidActiveData);

  let total: number = 0;


  _collateralData?.sub_type?.map(st => {
    total = st.items?.map(i => Number(i?.value ?? 0))?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
    return null;
  })

  return Number(total ?? 0);
}


export const getLOANNormalCollateralCurrentValue = (uuidActiveData: string) => (state: RootState) => {

  const _collateralData = state.LOANNormal.storage.collateral_v2.data?.find(d => d.uuidActiveData === uuidActiveData);

  return Number(_collateralData?.collateral_value ?? 0);
}

export const getLOANNormalCurrentValueItem = (uuidData: string, uuidSubType: string) => createSelector(
  getLoanNormalSubType(uuidData),
  (state) => {
    let currentValue: number = 0;

    const dataSubType = state?.find(st => st.uuidActiveSubtype === uuidSubType);
    const uuidActiveItem = dataSubType?.uuidItemsActive ?? "";
    const subTypeId = dataSubType?.id ?? "";

    dataSubType?.items.map(i => {
      if (i.activeUUID === uuidActiveItem) {
        if (subTypeId === ESubtypeRest.LAND) {
          currentValue += (i?.land?.land_wrapper?.has_land_asset ==='Y' ? Number(i?.ctxd_land?.ctx_land_wrapper?.value_of_land ?? 0) : 0) +
             Number(i?.land?.land_wrapper?.value_of_land ?? 0)
            + (i?.land?.land_wrapper?.has_certificated_land_asset === 'Y' ? i?.ctxd_gcn_qsh?.ctxd_gcn_qsh_data?.map(
              (gcn) => Number(gcn?.ctxd_gcn_qsh_land_info?.ctx_land_wrapper?.value_of_land ?? 0)
            )
              .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) : 0)
        }
        else if (subTypeId === ESubtypeRest.APPA) {
          currentValue += Number(i?.department?.department_wrapper?.value_of_land ?? 0)
        }
        else {
          currentValue += Number(i?.market?.maket_wrapper?.value_of_land ?? 0)
        }

      }
      return currentValue
    })

    return +currentValue;
  }
)


export const getLOANNormalValueItem = (uuidData: string, uuidSubType: string) => createSelector(
  getLoanNormalSubType(uuidData),
  (state) => {
    let currentValue: number = 0;

    const dataSubType = state?.find(st => st.uuidActiveSubtype === uuidSubType);
    const uuidActiveItem = dataSubType?.uuidItemsActive ?? "";

    dataSubType?.items?.map(i => {
      if (i.activeUUID === uuidActiveItem) {
        currentValue = Number(i.current_value_item ?? 0)
      }
      return null;
    })

    return +currentValue ?? 0;
  }
)
export const getLOANormalStoreLegalOwnerLegalData = (
  uuidActiveData: string,
  subTypeActive: string,
) => (state: RootState) => {
  const dataSubtype = state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidActiveData)?.sub_type?.find(item => item.uuidActiveSubtype === subTypeActive);

  if (dataSubtype?.id === ESubtypeRest.MARK) {
    const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
    const owner = item?.market?.market_owner
    return owner
  }
  else if (dataSubtype?.id === ESubtypeRest.LAND) {
    let typeLand = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)?.type_land ?? '';

    if (typeLand !== ETypeLandName.CTXD_GCN) {
      const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
      const owner = item?.land?.land_legal_information_owner
      return owner
    }
    if (typeLand === ETypeLandName.CTXD_GCN) {
      const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
      let cgqd_active = item?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh ?? '';
      let owner = item?.ctxd_gcn_qsh?.ctxd_gcn_qsh_data?.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.land_legal_information_owner;
      return owner;
    }
  }
  else if (dataSubtype?.id === ESubtypeRest.APPA) {
    const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
    const owner = item?.department?.department_owner
    return owner
  }
  else {
    return dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)?.owner_wrapper
  }

}

export const getLOANormalStoreLegalOwnerDetailLegalData = (
  uuidActiveData: string,
  subTypeActive: string,
) => (state: RootState) => {

  const dataSubtype = state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidActiveData)?.sub_type?.find(item => item.uuidActiveSubtype === subTypeActive);

  if (dataSubtype?.id === ESubtypeRest.MARK) {
    const active = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)?.market?.market_owner?.active ?? 0;
    const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
    const ownerDetail = item?.market?.market_owner?.owner[active]
    return ownerDetail
  }

  if (dataSubtype?.id === ESubtypeRest.LAND) {
    let typeLand = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)?.type_land ?? '';

    if (typeLand === ETypeLandName.LAND) {
      const active = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)?.land?.land_legal_information_owner?.active ?? 0;
      const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
      const ownerDetail = item?.land?.land_legal_information_owner?.owner[active]
      return ownerDetail
    }
    if (typeLand === ETypeLandName.CTXD_GCN) {
      const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
      let cgqd_active = item?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh ?? '';
      let ownerActive = item?.ctxd_gcn_qsh.ctxd_gcn_qsh_data?.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.land_legal_information_owner?.active ?? 0;
      let ownerDetail = item?.ctxd_gcn_qsh.ctxd_gcn_qsh_data?.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.land_legal_information_owner?.owner[ownerActive]
      return ownerDetail;
    }
  }
  if (dataSubtype?.id === ESubtypeRest.APPA) {
    const active = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)?.department?.department_owner?.active ?? 0;
    const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
    const ownerDetail = item?.department?.department_owner?.owner[active]
    return ownerDetail
  }
}

export const getLOANormalStoreLegalHasAuthorDetail = (
  uuidActiveData: string,
  subTypeActive: string,
) => (state: RootState) => {

  const dataSubtype = state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidActiveData)?.sub_type?.find(item => item.uuidActiveSubtype === subTypeActive);

  if (dataSubtype?.id === ESubtypeRest.MARK) {
    const active = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)?.market?.market_owner?.active ?? 0;
    const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive);
    const activeHasAuthor = item?.market?.market_owner?.owner[active]?.active ?? 0;
    const hasAuthor = item?.market?.market_owner?.owner[active]?.authorized_persons[activeHasAuthor];
    return hasAuthor
  }
  if (dataSubtype?.id === ESubtypeRest.LAND) {
    let typeLand = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)?.type_land ?? '';

    if (typeLand === ETypeLandName.LAND) {
      const active = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)?.land?.land_legal_information_owner?.active ?? 0;
      const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
      const activeHasAuthor = item?.land?.land_legal_information_owner?.owner[active]?.active ?? 0;
      const hasAuthor = item?.land?.land_legal_information_owner?.owner[active]?.authorized_persons[activeHasAuthor];
      return hasAuthor
    }
    if (typeLand === ETypeLandName.CTXD_GCN) {
      const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
      let cgqd_active = item?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh ?? '';
      let ownerActive = item?.ctxd_gcn_qsh.ctxd_gcn_qsh_data.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.land_legal_information_owner?.active ?? 0;
      let activeHasAuthor = item?.ctxd_gcn_qsh.ctxd_gcn_qsh_data.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.land_legal_information_owner?.owner[ownerActive]?.active ?? 0;
      let hasAuthor = item?.ctxd_gcn_qsh.ctxd_gcn_qsh_data.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.land_legal_information_owner?.owner[ownerActive]?.authorized_persons[activeHasAuthor];
      return hasAuthor;
    }
  }
  if (dataSubtype?.id === ESubtypeRest.APPA) {
    const active = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)?.department?.department_owner?.active ?? 0;
    const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
    const activeHasAuthor = item?.department?.department_owner?.owner[active]?.active ?? 0;
    const hasAuthor = item?.department?.department_owner?.owner[active]?.authorized_persons[activeHasAuthor];
    return hasAuthor
  }

}

export const getLOANormalStoreInfoLegalFromOwnerLegal = (
  uuidActiveData: string,
  subTypeActive: string,
) => (state: RootState) => {


  const dataSubtype = state.LOANNormal.storage.collateral_v2.data?.find(item => item.uuidActiveData === uuidActiveData)
    ?.sub_type?.find(item => item.uuidActiveSubtype === subTypeActive);

  if (dataSubtype?.id === ESubtypeRest.MARK) {
    const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
    const owner = item?.market?.market_owner.owner?.map(o => o.person_uuid)
    return owner

    // list.push(owner);
  }
  else if (dataSubtype?.id === ESubtypeRest.LAND) {
    let typeLand = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)?.type_land ?? '';

    if (typeLand === ETypeLandName.LAND) {
      const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
      const owner = item?.land?.land_legal_information_owner.owner?.map(o => o.person_uuid)
      return owner
    }
    if (typeLand === ETypeLandName.CTXD_GCN) {
      const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
      let cgqd_active = item?.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh ?? '';
      let owner = item?.ctxd_gcn_qsh?.ctxd_gcn_qsh_data?.find(cgqd => cgqd.uuIdCtxdGcnQsh === cgqd_active)?.land_legal_information_owner.owner?.map(o => o.person_uuid);
      return owner
    }
  }
  else if (dataSubtype?.id === ESubtypeRest.APPA) {
    const item = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)
    const owner = item?.department?.department_owner.owner?.map(o => o.person_uuid)
    return owner
  }
  else {
    const owner = dataSubtype?.items?.find(i => i.activeUUID === dataSubtype?.uuidItemsActive)?.owner_wrapper.owner?.map(o => o.person_uuid)
    return owner
  }

}

////getThông tin legal

export const getInfoAllUserLegal = (state: RootState) => {
  const _legalInfoForm = state.LOANNormal.storage.full?.data?.form?.legal_info_form?.data;
  let infoLegal: ILOANNormalCollateralV2StateFullInfoLegalOwners[] = [];

  infoLegal.push({
    full_name: _legalInfoForm?.borrower?.basic_info?.full_name ?? "",
    identity_num: _legalInfoForm?.borrower?.identity_info?.find((ii: any) => ii.primary_flag === true)?.identity_num?.toString() ?? "",
    uuid: _legalInfoForm?.borrower?.basic_info?.uuid ?? "",
    mobile_num: _legalInfoForm?.borrower?.basic_info?.mobile_num ?? "",
    telephone_num: _legalInfoForm?.borrower?.basic_info?.telephone_num ?? "",
    date_of_birth: _legalInfoForm?.borrower?.basic_info?.date_of_birth ?? 0,
    gender: _legalInfoForm?.borrower?.basic_info?.gender_info.name ?? "",
    mail: _legalInfoForm?.borrower?.basic_info?.email ?? "",
    issued_date: _legalInfoForm?.borrower?.identity_info?.find((ii: any) => ii.primary_flag === true)?.issued_date ?? 0,
    expired_date: _legalInfoForm?.borrower?.identity_info?.find((ii: any) => ii.primary_flag === true)?.expired_date ?? 0,
    place_of_issue: _legalInfoForm?.borrower?.identity_info?.find((ii: any) => ii.primary_flag === true)?.place_of_issue ?? "",
    addressPermanent: _legalInfoForm?.borrower?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.address ?? "",
    provincePermanent: _legalInfoForm?.borrower?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.province_info.province_code ?? "",
    disctrictPermanent: _legalInfoForm?.borrower?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.district_info.district_code ?? "",
    wardPermanent: _legalInfoForm?.borrower?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.ward_info.ward_code ?? "",
    addressContact: _legalInfoForm?.borrower?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.address ?? "",
    provinceContact: _legalInfoForm?.borrower?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.province_info.province_code ?? "",
    disctrictContact: _legalInfoForm?.borrower?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.district_info.district_code ?? "",
    wardContact: _legalInfoForm?.borrower?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.ward_info.ward_code ?? "",
    type: 'borrower'
  })

  _legalInfoForm?.marriage && infoLegal.push({
    full_name: _legalInfoForm?.marriage?.basic_info?.full_name ?? "",
    identity_num: _legalInfoForm?.marriage?.identity_info?.find((ii: any) => ii.primary_flag === true)?.identity_num?.toString() ?? "",
    uuid: _legalInfoForm?.marriage?.basic_info?.uuid ?? "",
    mobile_num: _legalInfoForm?.marriage?.basic_info?.mobile_num ?? "",
    telephone_num: _legalInfoForm?.marriage?.basic_info?.telephone_num ?? "",
    date_of_birth: _legalInfoForm?.marriage?.basic_info?.date_of_birth ?? 0,
    gender: _legalInfoForm?.marriage?.basic_info?.gender_info.name ?? "",
    mail: _legalInfoForm?.marriage?.basic_info?.email ?? "",
    issued_date: _legalInfoForm?.marriage?.identity_info?.find((ii: any) => ii.primary_flag === true)?.issued_date ?? 0,
    expired_date: _legalInfoForm?.marriage?.identity_info?.find((ii: any) => ii.primary_flag === true)?.expired_date ?? 0,
    place_of_issue: _legalInfoForm?.marriage?.identity_info?.find((ii: any) => ii.primary_flag === true)?.place_of_issue ?? "",
    addressPermanent: _legalInfoForm?.marriage?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.address ?? "",
    provincePermanent: _legalInfoForm?.marriage?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.province_info.province_code ?? "",
    disctrictPermanent: _legalInfoForm?.marriage?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.district_info.district_code ?? "",
    wardPermanent: _legalInfoForm?.marriage?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.ward_info.ward_code ?? "",
    addressContact: _legalInfoForm?.marriage?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.address ?? "",
    provinceContact: _legalInfoForm?.marriage?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.province_info.province_code ?? "",
    disctrictContact: _legalInfoForm?.marriage?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.district_info.district_code ?? "",
    wardContact: _legalInfoForm?.marriage?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.ward_info.ward_code ?? "",
    type: 'marriage'
  })

  _legalInfoForm?.co_brw?.map((cob: any) => {
    infoLegal.push({
      full_name: cob?.basic_info?.full_name ?? "",
      identity_num: cob?.identity_info?.find((id: any) => id.primary_flag).identity_num ?? "",
      uuid: cob?.basic_info?.uuid ?? "",
      mobile_num: cob?.basic_info?.mobile_num ?? "",
      telephone_num: cob?.basic_info?.telephone_num ?? "",
      date_of_birth: cob?.basic_info?.date_of_birth ?? null,
      gender: cob?.basic_info?.gender_info.name ?? "",
      mail: cob?.basic_info?.email ?? "",
      issued_date: cob?.identity_info?.find((ii: any) => ii.primary_flag === true)?.issued_date ?? null,
      expired_date: cob?.identity_info?.find((ii: any) => ii.primary_flag === true)?.expired_date ?? null,
      place_of_issue: cob?.identity_info?.find((ii: any) => ii.primary_flag === true)?.place_of_issue ?? null,
      addressPermanent: cob?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.address ?? "",
      provincePermanent: cob?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.province_info.province_code ?? "",
      disctrictPermanent: cob?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.district_info.district_code ?? "",
      wardPermanent: cob?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.ward_info.ward_code ?? "",
      addressContact: cob?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.address ?? "",
      provinceContact: cob?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.province_info.province_code ?? "",
      disctrictContact: cob?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.district_info.district_code ?? "",
      wardContact: cob?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.ward_info.ward_code ?? "",
      type: 'co_brw'
    })
    return null;

  })

  _legalInfoForm?.co_payer?.map((cop: any) => {
    infoLegal.push({
      full_name: cop?.basic_info?.full_name ?? "",
      identity_num: cop?.identity_info?.find((id: any) => id.primary_flag).identity_num ?? "",
      uuid: cop?.basic_info?.uuid ?? "",
      mobile_num: cop?.basic_info?.mobile_num ?? "",
      telephone_num: cop?.basic_info?.telephone_num ?? "",
      date_of_birth: cop?.basic_info?.date_of_birth ?? null,
      gender: cop?.basic_info?.gender_info.name ?? "",
      mail: cop?.basic_info?.email ?? "",
      issued_date: cop?.identity_info?.find((ii: any) => ii.primary_flag === true)?.issued_date ?? null,
      expired_date: cop?.identity_info?.find((ii: any) => ii.primary_flag === true)?.expired_date ?? null,
      place_of_issue: cop?.identity_info?.find((ii: any) => ii.primary_flag === true)?.place_of_issue ?? null,
      addressPermanent: cop?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.address ?? "",
      provincePermanent: cop?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.province_info.province_code ?? "",
      disctrictPermanent: cop?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.district_info.district_code ?? "",
      wardPermanent: cop?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.ward_info.ward_code ?? "",
      addressContact: cop?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.address ?? "",
      provinceContact: cop?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.province_info.province_code ?? "",
      disctrictContact: cop?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.district_info.district_code ?? "",
      wardContact: cop?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.ward_info.ward_code ?? "",
      type: 'co_payer'
    })
    return null;

  })

  _legalInfoForm?.law_rlt?.map((lr: any) => {
    infoLegal.push({
      full_name: lr?.basic_info?.full_name ?? "",
      identity_num: lr?.identity_info?.identity_num?.toString() ?? "",
      uuid: lr?.basic_info?.uuid ?? "",
      mobile_num: lr?.basic_info?.mobile_num ?? "",
      telephone_num: lr?.basic_info?.telephone_num ?? "",
      date_of_birth: lr?.basic_info?.date_of_birth ?? null,
      gender: "",
      mail: "",
      issued_date: lr?.identity_info?.issued_date ?? null,
      expired_date: lr?.identity_info?.expired_date ?? null,
      place_of_issue: lr?.identity_info?.place_of_issue ?? null,
      addressPermanent:  "",
      provincePermanent: "",
      disctrictPermanent:  "",
      wardPermanent:  "",
      addressContact:lr?.address_info?.address ?? "",
      provinceContact: lr?.address_info?.province_info.province_code ??  "",
      disctrictContact: lr?.address_info?.district_info.district_code ??"",
      wardContact:lr?.address_info?.ward_info.ward_code ?? "",
      type: 'law_rlt'
    })



    return null;
  })

  _legalInfoForm?.others?.map((oth: any) => {
    infoLegal.push({
      full_name: oth?.basic_info?.full_name ?? "",
      identity_num: oth?.identity_info?.find((id: any) => id.primary_flag).identity_num ?? "",
      uuid: oth?.basic_info?.uuid ?? "",
      mobile_num: oth?.basic_info?.mobile_num ?? "",
      telephone_num: oth?.basic_info?.telephone_num ?? "",
      date_of_birth: oth?.basic_info?.date_of_birth ?? null,
      gender: oth?.basic_info?.gender_info.name ?? "",
      mail: oth?.basic_info?.email ?? "",
      issued_date: oth?.identity_info?.find((id: any) => id.primary_flag).issued_date ?? null,
      expired_date: oth?.identity_info?.find((id: any) => id.primary_flag).expired_date ?? null,
      place_of_issue: oth?.identity_info?.find((id: any) => id.primary_flag).place_of_issue ?? null,
      addressPermanent: oth?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.address ?? "",
      provincePermanent: oth?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.province_info.province_code ?? "",
      disctrictPermanent: oth?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.district_info.district_code ?? "",
      wardPermanent: oth?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "PERMANENT" })?.ward_info.ward_code ?? "",
      addressContact: oth?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.address ?? "",
      provinceContact: oth?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.province_info.province_code ?? "",
      disctrictContact: oth?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.district_info.district_code ?? "",
      wardContact: oth?.address_info?.find((ii: any) => { return ii.primary_flag === true && ii.address_type.code === "TEMP" })?.ward_info.ward_code ?? "",
      type: 'others'
    })

    return null;
  })
  _legalInfoForm?.related?.other_person?.map((rel: any) => {
    infoLegal.push({
      full_name: rel?.basic_info?.full_name ?? "",
      identity_num: "",
      uuid: rel?.basic_info?.uuid ?? "",
      mobile_num: rel?.basic_info?.mobile_num ?? "",
      telephone_num: "",
      date_of_birth: rel?.basic_info?.date_of_birth ?? null,
      gender: "",
      mail: "",
      issued_date: rel?.identity_info?.issued_date ?? null,
      expired_date: rel?.identity_info?.expired_date ?? null,
      place_of_issue: rel?.identity_info?.place_of_issue ?? null,
      addressPermanent:  "",
      provincePermanent:  "",
      disctrictPermanent:  "",
      wardPermanent:  "",
      addressContact:rel?.address_info?.address ?? "",
      provinceContact: rel?.address_info?.province_info.province_code ??"",
      disctrictContact:rel?.address_info?.district_info.district_code ?? "",
      wardContact:rel?.address_info?.ward_info.ward_code ?? "",
      type: 'related'
    })
    return null;
  })
  return infoLegal ?? [];
}
// type nhỏ
export const ValidateCollateralStorage = (state: RootState) => {
  const collateralStorage = state.LOANNormal.storage.collateral_v2
  const activeCollateral = collateralStorage.data.find(i => i.is_collapse_type === true)
  const dataIgnore = state.LOANNormal.storage.collateral_v2.ignore
  const metadataConstant = state.LOANNormal.configs.metadataConstant.data
  return CollateralValidate.validateCollateralStorage(dataIgnore, metadataConstant, activeCollateral)
}
// validate bds
export const ValidateCollateralRestStorage = (state: RootState) => {
  const collateralStorage = state.LOANNormal.storage.collateral_v2
  const activeCollateral = collateralStorage.data.find(i => i.is_collapse_type === true)

  const dataIgnore = state.LOANNormal.storage.collateral_v2.ignore
  const metadataConstant = state.LOANNormal.configs.metadataConstant.data

  return CollateralValidate.validateCollateralRestStorage(dataIgnore, metadataConstant, activeCollateral)
  
}
export const getValidateLOANNormalStorageCollateral = (state: RootState) => {
  return state.LOANNormal.storage.collateral_v2.validate;
}

//// CertifiCateMaket

export const getLOANormalStoreLegalCertifiCateMaketPersionListLegalData = (
  uuidActiveData: string,
  subTypeActive: string,
  activeUUIDCertificateL: string
) => (state: RootState) => {

  const itemActive = state.LOANNormal.storage.collateral_v2.data.find(item => item.uuidActiveData === uuidActiveData)?.sub_type
    ?.find(st => st.uuidActiveSubtype === subTypeActive);

  const maketCertificates = itemActive?.items?.find(i => i.activeUUID === itemActive?.uuidItemsActive)?.market?.maket_certificates
    ?.find(mc => mc.uuid_maket_certificate === activeUUIDCertificateL);

  return maketCertificates
}
export const getAuthUserBranch = (state: RootState) => state.auth.user?.branch

export const getCollateralIgnore =
  (state: RootState) => {
    if (state.LOANNormal.storage.collateral_v2.ignore === "N") return true;
    return false
  }
export const getCollateralPriceCertUuid = (uuidData: string)=> (state: RootState) => state.LOANNormal.storage.collateral_v2.data.find(i => i.uuidActiveData === uuidData)?.price_cert_uuid

export const checkExistCollateralOwner = (price_cert_uuid: string) =>(state: RootState) =>{
  let rs = false
    const activeData = state.LOANNormal.storage.full.data?.form.collateral_form.data.collaterals.find(i => i.price_cert_uuid === price_cert_uuid)
   if(activeData?.sub_types[0].items){
    for(let i of activeData.sub_types[0].items){
      switch(activeData.collateral_type.id){
        case 'REST':
          if(i.land_wrapper?.owner_wrapper?.owners?.length > 0){
            return rs = true
          }
          for(let cer of i.certificated_land_asset_wrappers){
            if(cer?.owner_wrapper?.owners?.length > 0){
              return rs = true
            }
          }
          break
      }
    }
   }

  return rs
}

export const checkCollateralContinueRule = (state: RootState) => {
  const collateralData = state.LOANNormal.storage.collateral_v2.data
  const collateralDataFull = state.LOANNormal.storage.full.data?.form.collateral_form.data.collaterals
  const isIgnore = state.LOANNormal.storage.full.data?.form.collateral_form.is_collateral
  
  const collateralStorage = state.LOANNormal.storage.collateral_v2
  const dataIgnore = state.LOANNormal.storage.collateral_v2.ignore
  const metadataConstant = state.LOANNormal.configs.metadataConstant.data

  const validate = CollateralValidate.validateAllCollateral(collateralStorage.data, dataIgnore, metadataConstant)

  if(!validate.valid){
    return validate
  }

  if(isIgnore && collateralDataFull?.length === 0 && (collateralData?.length === 0 || collateralData?.every(col => !col.price_cert_uuid))){
    return {valid: false, position: '', message: 'Vui lòng khởi tạo Tài sản đảm bảo'}
  }

  return { valid: true }
}
export const getIsCollateralStoreFull = (state: RootState) => state.LOANNormal.storage.full.data?.form.collateral_form.is_collateral