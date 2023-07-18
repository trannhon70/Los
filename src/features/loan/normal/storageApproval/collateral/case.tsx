import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";
import {
  ICertificateLegalInfoDataUserList,
  ILandAssetType,
  ICTXDLandData,
  ILegalLandInformatioAsset,
  ILOANNormalCollateralData,
  ISubItems,
  ITypeCTXD,
  ICollateralFormGet,
  ISubtype,
  IMaketInfo,
  IPerson,
  IPersonCertificateLegal,
  IDepartmentInfo,
  IDepartmentInfoLand,
  ICertificateUsePurposes,
  ILandOwner,
  IDepartment,
  IInfoAuthorize,
  IMaketCertificates,
  ICountCarousel,
} from "types/models/loan/normal/storage/CollaretalV2";
import { ILOANNormalStorageAddress } from "types/models/loan/normal/storage/Legal";
import { formatRoundNumber, generateLOCALUUID, generateUUID } from "utils";
import { generaterNameCollateral } from "views/pages/LOAN/utils";
import {
  generateEmptyDatacertificateUsePurposes,
  generateEmptyDataCollateralSubTypeCTXD,
  generateEmptyDataCollateralSubTypeLandCTXD,
  generateEmptyDataCtxdGcnQshData,
  generateEmptyDataDepartmentInfo,
  generateEmptyDataMaketCertificates,
  generateSpreadSheet,
} from "./emptyData";
import { IDataCollateral,
  ILOANNormalApprovalAccept,
  ILoanNormalApprovalLogRows,
  ILoanNormalApprovalLVTLog,
  ILOANNormalApprovalSpreadSheet
} from "types/models/loan/normal/storageApproval/Collateral";
import { IApprovalValidate } from "types/models/loan/normal/storageApproval/LoanInfoForm";
import { ILOANNormalDocument, ILOANNormalFile, IResDocument } from "types/models/loan/normal/configs/Document";

export enum ETypeCollateral {
  ALL = "ALL",
  REST = "REST", // Bất động sản
  MEST = "MEST", // PTVT/Động sản
  DEVI = "DEVI", // MMTB; Dây truyền sản xuất
  GODS = "GODS", // Vật tư hàng hóa
  RPRO = "RPRO", // Quyền tài sản
  STOC = "STOC", // Chứng khoán
  BALC = "BALC", // Số dư TKTG, HTTG, GTCG
  OTHE = "OTHE", // Tài sản khác
}


export enum ESubtypeRest {
  LAND = "LAND", // Đất / nhà riêng lẻ
  APPA = "APPA", // Căn hộ chung cư
  MARK = "MARK", // Sạp chợ
}

export enum ETypeCollateralChildRestLand {
  INDU = "INDU", // QSDĐ là đất thuê KCN
  HIRI = "HIRI", // Nhà nhiều hộ, nhiều tầng
  REIN = "REIN", // QSDĐ là đất thuê ngoài KCN
  BRIN = "BRIN", // QSDĐ là đất có nguồn gốc vừa giao vừa thuê ngoài KCN
  OTHL = "OTHL", // Bất động sản khác
  PROJ = "PROJ" // Dự án
}

export enum ETypeCollateralChildRestAppa {
  URRO = "URRO", // Quyền sở hữu căn hộ chung cư
  NARO = "NARO", // Căn hộ chung cư đã hình thành nhưng chưa được cấp GCN
  FURO = "FURO" // Căn hộ hình thành trong tương lai
}

export enum ETypeCollateralChildRestMark {
  MRMA = "MRMA", // Sạp chợ/ Ô TTM
}

export enum ECheckType {
  CTXD_LAND = "CTXD_LAND",
  CTXD_GCN = "CTXD_GCN",
}

export enum ETypeLand {
  LAND = 0,
  CTXD_LAND = 1,
  CTXD_GCN = 2,
}

export enum ETypeLandName {
  LAND = "LAND",
  CTXD_LAND = "CTXD_LAND",
  CTXD_GCN = "CTXD_GCN",
}

export enum EActionMenu {
  DELETE = "delete",
}

export enum EDetailsTransport {
  TRVE = "TRVE",
  SPVE = "SPVE",
  NRVE = "NRVE"
}

export enum ETypeValidateCollateralApproval {
  COLLATEAL_DETAIL = "collateral_detail",
  SPREADSHEET = "spreadsheet"
}

export const CollateralApproveCaseV2 = {

  setCollateralApproveValidate(state: Draft<ILOANNormalState>, action: PayloadAction<IApprovalValidate>){
    state.storageApproval.collateral.validate = action.payload;
  },

  setCollapseTypeApproval(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string | undefined>
  ) {
    const uuidDataActive = action.payload;
    if (uuidDataActive) {
      state.storageApproval.collateral.data.map((d) => {
        if (d.uuidActiveData === uuidDataActive) {
          d.is_collapse_type = !d.is_collapse_type;
        } else {
          d.is_collapse_type = false;
        }
        return { ...d };
      });
    }
  },

  setCollapseSubTypeApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidSubTypeActive: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((d) => {
        if (d.uuidActiveData === action.payload) {
          d.is_collapse_type &&
            d.sub_type.map((st) => {
              if (st.uuidActiveSubtype === action.meta.uuidSubTypeActive) {
                st.is_collapse_sub_type = !st.is_collapse_sub_type;
              } else {
                st.is_collapse_sub_type = false;
              }
              return { ...st };
            });
        }
        return { ...d };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidSubTypeActive: string;
      }
    ) {
      return { payload, meta };
    },
  },


  setTypeCollateralApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string, { uuidData: string }>
    ) {
      let typeCollateral = action.payload;

      state.storageApproval.collateral.data.map((d) => {
        if (d.uuidActiveData === action.meta.uuidData) {
          d.type = action.payload;
          d.sub_type[0].id =
            (d.type === ETypeCollateral.REST || d.type === ETypeCollateral.MEST) ? "" : action.payload; //
          d.is_collapse_type = true;
        } else {
          d.is_collapse_type = false;
        }
        return { ...d };
      });

      let isValidCarousel = state.storageApproval.collateral.carousel?.find(
        (c) => c.type === typeCollateral
      );

      if (isValidCarousel) {
        state.storageApproval.collateral.carousel.map((c) => {
          if (c.type === typeCollateral) {
            c.total = c.total + 1;
          }
          return { ...c };
        });
      } else {
        state.storageApproval.collateral.carousel.push({
          name: generaterNameCollateral(typeCollateral),
          type: typeCollateral,
          total: 1,
        });
      }
    },
    prepare(payload: string, meta: { uuidData: string }) {
      return { payload, meta };
    },
  },

  setTypeLandApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number,
        string,
        { uuidData: string; uuIdSubType: string }
      >
    ) {
      state.storageApproval.collateral.data.map((d) => {
        if (d.uuidActiveData === action.meta.uuidData) {
          d.sub_type.map((st) => {
            const uuIdItemACtive = st?.uuidItemsActive ?? "";
            if (st.uuidActiveSubtype === action.meta.uuIdSubType) {

              st.items.map((i) => {
                if (i.activeUUID === uuIdItemACtive) {
                  if (action.payload === 0) {
                    return (i.type_land = ETypeLandName.LAND);
                  } else if (action.payload === 1) {
                    return (i.type_land = ETypeLandName.CTXD_LAND);
                  } else if (action.payload === 2) {
                    return (i.type_land = ETypeLandName.CTXD_GCN);
                  } else {
                    return (i.type_land = "");
                  }
                }
                return { ...i };
              });
            }
            return { ...st };
          });
        }
        return { ...d };
      });
    },
    prepare(payload: number, meta: { uuidData: string; uuIdSubType: string }) {
      return { payload, meta };
    },
  },

  // TODO: aciton => collateral_type
  setCollateralTypeActiveApproval(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    state.storageApproval.collateral.activeType = action.payload;
  },


  postCollateralsApproval(state: ILOANNormalState, action: PayloadAction<string>) { },
  postCollateralsApprovalLVT(state: ILOANNormalState, action: PayloadAction<string>) { },
  updateCollateralsApproval(state: ILOANNormalState, action: PayloadAction<string>) { },
  /////////quyen tai san /////////


  setCollaretalRPROApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        { uuid: string; uuidActive: string; key: keyof ISubItems }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data?.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuid) {
            col.sub_type = col.sub_type?.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuidActive) {
                const activeUUIDType = i.uuidItemsActive;
                i.items = i.items?.map((iq) => {
                  if (iq.activeUUID === activeUUIDType) {
                    /**
                     * Map theo loại đất
                     * TH1: CTXD có GCN QSH riêng
                     * TH2: Đất
                     * TH3: CTXD trên đất
                     */
                    if (iq.type_land === ETypeLandName.CTXD_GCN) {
                      let uuidActiveCtxdGcnQsh =
                        iq.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                      iq.ctxd_gcn_qsh.ctxd_gcn_qsh_data = iq.ctxd_gcn_qsh.ctxd_gcn_qsh_data?.map(
                        (cgqd) => {
                          if (cgqd.uuIdCtxdGcnQsh === uuidActiveCtxdGcnQsh) {
                            return {
                              ...cgqd,
                              [action.meta.key]: action.payload,
                            };
                          }
                          return { ...cgqd };
                        }
                      );
                    }
                    return {
                      ...iq,
                      [action.meta.key]: action.payload,
                    };
                  }
                  return { ...iq };
                });
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: string | number | null,
      meta: { uuid: string; uuidActive: string; key: keyof ISubItems }
    ) {
      return { payload, meta };
    },
  },


  setCollaretalCurrentValueItemApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        { uuid: string; uuidActive: string, uuidItemActive: string }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data?.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuid) {
            col.sub_type?.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuidActive) {
                i.items = i.items?.map((iq) => {
                  if (iq?.activeUUID === action.meta.uuidItemActive) {
                    iq.current_value_item = Number(action.payload)
                  }

                  return { ...iq };
                });
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: string | number | null,
      meta: { uuid: string; uuidActive: string, uuidItemActive: string }
    ) {
      return { payload, meta };
    },
  },

  onChangeCollaretalRPROApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        { uuid: string; uuidActive: string }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data?.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuid) {
            col.sub_type?.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuidActive) {
                i.uuidItemsActive = action.payload;
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(payload: string, meta: { uuid: string; uuidActive: string }) {
      return { payload, meta };
    },
  },

  setSubTypeApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number,
        string,
        {
          uuidSubType: string;
          uuidData: string;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data?.map(
        (d) => {
          if (d.uuidActiveData === action.meta.uuidData) {
            // d.sub_type[0].id = action.payload?.toString();
            // d.sub_type[0].is_collapse_sub_type = false;
            d.sub_type?.map((st) => {
              if (
                st.uuidActiveSubtype === action.meta.uuidSubType &&
                action.payload !== null
              ) {
                st.id = action.payload?.toString();
                st.is_collapse_sub_type = false;
              }
              return { ...st };
            });
          }

          return { ...d };
        }
      );
    },
    prepare(
      payload: string | number,
      meta: { uuidSubType: string; uuidData: string }
    ) {
      return { payload, meta };
    },
  },

  setChildSubTypeApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidSubType: string;
          uuidData: string;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data?.map(
        (d) => {
          if (d.uuidActiveData === action.meta.uuidData) {
            // d.sub_type[0].id = action.payload?.toString();
            // d.sub_type[0].is_collapse_sub_type = false;
            d.sub_type?.map((st) => {
              if (
                st.uuidActiveSubtype === action.meta.uuidSubType &&
                action.payload !== null
              ) {
                st.child_sub_type = action.payload;
              }
              return { ...st };
            });
          }

          return { ...d };
        }
      );
    },
    prepare(
      payload: string,
      meta: { uuidSubType: string; uuidData: string }
    ) {
      return { payload, meta };
    },
  },

  setActiveSubtypeItemApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        { uuidCollateral: string; uuidSubtype: string }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data?.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuidCollateral) {
            col.sub_type = col.sub_type?.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuidSubtype) {
                i.uuidItemsActive = action.payload;
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: string,
      meta: { uuidCollateral: string; uuidSubtype: string }
    ) {
      return { payload, meta };
    },
  },
  updateCollateralApprovalStorage(   // fetch full list collateral
    state: Draft<ILOANNormalState>,
    action: PayloadAction<IDataCollateral>
  ) {
    const payload = action.payload;
    let dataArr = payload.collaterals?.map(car => {
      return {
        type: car.collateral_type.id,
        name: car.collateral_type.name ?? "",
        total: 1
      }
    })

    //danh sách tổng của các loại
    const counts = {} as ICountCarousel
    dataArr.forEach((x) => {
      counts[x.type] = (Number(counts[x.type]) || 0) + 1;
    });

    const mappingDocument = (docs: IResDocument[]): ILOANNormalDocument[] => {
      
      if (!docs) return [];
      return docs.map(doc => {
        const result: ILOANNormalDocument = {
          uuid: generateUUID(),
          document_id: doc?.document_id,
          document_name: doc?.document_name,
          child_files: doc?.child_files?.map(resFile => {
            return ({ ...resFile, file_upload: '' });
          }) ?? [],
        }
        return result;
      })
    }

    const NewArr = dataArr.map((i) => {
      if (i.type === Object.keys(counts).find(o => o === i.type)) {
        i = { ...i, total: Number(counts[i.type]) }
      }
      return { ...i }
    })
    state.storageApproval.collateral.carousel = [...new Map(NewArr.map(item => [JSON.stringify(item), item])).values()]
    
    state.storageApproval.collateral.data = payload?.collaterals?.map((item, itemIndex) => {
      const dataActiveUUID = generateUUID();
      const SubtypeActiveUUID = generateUUID();
      state.storageApproval.collateral.uuidActiveData = dataActiveUUID;
      
      return {
        uuidActiveData: dataActiveUUID, //
        is_accept:item?.is_accept ?? true,
        reason:item?.reason,
        isSaved: true,
        uuidActiveSubtype: SubtypeActiveUUID,
        is_collapse_type: itemIndex === 0 ? true : false,
        type: item.collateral_type?.id,
        status: item?.status?.id,
        is_compactness: item.is_compactness?.id,
        valuation_id: item?.valuation_id,
        valuation_date: (item?.valuation_date) * 1000,
        valuation_unit_type: item.valuation_unit_type?.id,
        valuation_unit: item.valuation_unit?.id,
        valuation_center: item.valuation_center?.id,
        valuation_center_opinion: item.valuation_center_opinion,
        independence_organization: item.independence_organization?.id,
        other_independence_organization: item.other_independence_organization,
        purpose: item.purpose?.id,
        other_purpose: item.other_purpose,
        address: item?.address,
        province: item.province?.id,
        district: item.district?.id,
        ward: item.ward?.id,
        position_type: item.position_type?.id,
        other_position_type: item.other_position_type,
        lane_width: item.lane_width?.id,
        description: item.description,
        collateral_value: item.collateral_value.value,
        max_percentage: item.max_percentage?.value,
        documents: mappingDocument(item?.documents ?? []),
        sub_type: item.sub_types && item.sub_types?.map(i => {
          // const activeUUIDItem = generateUUID();

          return {
            is_collapse_sub_type: false,
            uuidItemsActive: i.items[0].price_cert_asset_uuid,
            uuidActiveSubtype: SubtypeActiveUUID,
            child_id: i.child_id,
            child_name: i.child_name,
            id: i.id,
            child_sub_type: i.child_id,
            items: i.items && i.items.map((itemSub, indexItem) => {
              return {
                activeUUID: itemSub.price_cert_asset_uuid,
                type_land: ETypeLandName.LAND,
                departmentActiveUUID: 'departmentActiveUUID',
                maketActiveUuid: 'maketActiveUuid',
                current_value_item: itemSub?.collateral_value?.value,
                ratio: itemSub?.max_percentage?.value,
                value: itemSub?.collateral_value?.value,
                typeCollateral: i.id === "BALC" ? itemSub?.detail.balance_type?.id : itemSub?.detail?.name,
                license: itemSub?.detail?.license_number,
                status: i?.id === 'BALC' || i?.id === 'STOC' || i?.id === 'OTHE' ? itemSub?.detail?.status as string : itemSub?.detail?.status?.id,
                status_flag: itemSub?.detail?.status,
                description: itemSub?.detail?.description,
                collateral_value: itemSub?.collateral_value?.value,
                collateral_code: itemSub?.collateral_code,
                count: itemSub?.detail?.quantity_each_type,
                branch: itemSub?.detail?.brand,
                model: itemSub?.detail?.model,
                year: Number(itemSub?.detail?.manufacturing_date),
                info_collatetal: itemSub?.description,
                quantity: itemSub?.detail?.quantity,
                number_register: itemSub?.detail?.license_number,
                issuer: itemSub?.detail?.distributor?.id,
                other_issuer: itemSub?.detail?.other_distributor,
                CLCL: itemSub?.detail?.remain_quality?.value,
                production: itemSub?.detail?.origin_of_production,
                origin_of_production: itemSub?.detail?.origin_of_production?.id,
                other_origin_of_production: itemSub?.detail?.other_origin_of_production,
                vehicle_identification_number: itemSub?.detail?.vehicle_identification_number ?? "",
                license_number: itemSub?.detail?.vehicle_identification_number ?? "",
                engine_number: itemSub?.detail?.engine_number ?? "",
                license_plate: itemSub?.detail?.license_plate ?? "",
                departmentInfoActiveUUID: '001001001',
                has_certificate_maket: itemSub?.has_certificate?.id,
                documents:mappingDocument(itemSub?.detail?.documents),
                transportation_sub_type: itemSub?.detail?.transportation_sub_type,
                other_transportation_sub_type: itemSub?.detail?.other_transportation_sub_type,
                legal_document_types: itemSub?.detail?.legal_document_types,
                credit_extension_secured: itemSub?.credit_extension_secured?.id,
                owner_wrapper: {
                  owner_type: itemSub?.owner_wrapper?.owner_type?.id,
                  owner: itemSub?.owner_wrapper?.owners?.map(ow => ({
                    full_name: ow?.full_name,
                    person_uuid: ow?.person_uuid,
                  })) ?? []
                },
                activeUUIDCertificateUsePurposes: "activeUUIDCertificateUsePurposesdepartment",
                department: {   // type chung cu 
                  department_wrapper: {
                    from_credit_extension: itemSub?.from_credit_extension?.id,
                    is_exploited: itemSub?.is_exploited?.id,
                    credit_extension_secured: itemSub?.credit_extension_secured?.id,
                    non_business_area: itemSub?.non_business_area?.value?.toString(),
                    max_percentage: itemSub?.max_percentage?.value?.toString(),
                    value_of_land: itemSub?.collateral_value?.value, // check ux or API
                    description: itemSub?.description,
                    has_land_asset: itemSub?.has_certificate?.id,// check ux or API
                    has_certificated_land_asset: itemSub?.has_certificate?.id,// check ux or API
                  },
                  department_certificate_legal: itemSub?.certificates?.map((cerr, idx) => ({
                    order: idx + 1,
                    persons: cerr?.persons?.map(per => ({
                      full_name: per?.full_name,
                      person_uuid: per?.person_uuid
                    })) ?? [], // check legal
                    uuid_certificate_legal: idx === 0 ? 'departmentActiveUUID' : generateUUID(),
                    other_certificate_type: cerr?.certificate_type?.id,  // check 
                    other_certificate_type_other: cerr?.other_certificate_type, // check
                    certificate_code: cerr?.certificate_code,
                    certificate_no: cerr?.certificate_no,
                    issue_date: (cerr?.issue_date ?? 0) * 1000,
                    place_of_issue: cerr?.place_of_issue,
                    contract_type: cerr?.contract_type,
                    contract_number_type: cerr?.contract_type,
                    contract_number: cerr?.contract_no,
                    contract_date: (cerr?.contract_date ?? 0) * 1000,
                    documents: mappingDocument(cerr?.documents),
                  })),
                  department_info: itemSub?.apartments?.map((depp, ii) => {
                    return {
                      departmentInfoActiveUUID: ii === 0 ? '001001001' : generateUUID(),
                      house_type: depp?.house_type,
                      apartment_type: depp?.apartment_type?.id,
                      other_apartment_type: depp?.other_apartment_type,
                      apartment_number: depp?.apartment_number,
                      block: depp?.block,
                      floor: depp?.floor,
                      start_date: (depp?.start_date ?? 0) * 1000,
                      certificate_area: depp?.certificate_area ?? "",
                      real_area: depp?.real_area.value,
                      usage_form: depp?.usage_from,
                      duration: depp?.duration,
                      ownership_category: depp?.ownership_category,
                    }
                  }),
                  department_info_land: {
                    address: itemSub?.land?.address,
                    province: itemSub?.land?.province?.id,
                    district: itemSub?.land?.district?.id,
                    ward: itemSub?.land?.ward?.id,
                    certificate_address: itemSub?.land?.certificate_address,
                    certificate_province: itemSub?.land?.certificate_province?.id,
                    certificate_district: itemSub?.land?.certificate_district?.id,
                    certificate_ward: itemSub?.land?.certificate_ward?.id,
                    use_purposes: itemSub?.land?.use_purposes?.map(us => us.id),
                    other_use_purpose: itemSub?.land?.other_use_purpose ?? "",
                    purpose_using_lane: itemSub?.land?.use_purposes?.map(us => us.id),
                    certificate_use_purposes: itemSub?.land?.certificate_use_purposes?.map((fi, index) => ({
                      activeUUIDCertificateUsePurposes: index === 0 ? 'activeUUIDCertificateUsePurposesdepartment' : generateUUID(),
                      use_purpose: fi?.use_purpose,
                      land_number: fi?.land_number,
                      map_number: fi?.map_number,
                      certificate_area: fi?.certificate_area ?? "",
                      real_area: fi?.real_area?.value,
                      land_use_source: fi?.land_use_source?.id,
                      other_land_use_source: fi?.other_land_use_source,
                      duration: fi?.duration,
                      usage_form: fi?.usage_form?.id,
                      other_usage_form: fi?.other_usage_form
                    })),
                  },
                  department_owner: {
                    active: indexItem,
                    owner_type: itemSub?.owner_wrapper?.owner_type?.id,
                    owner: itemSub?.owner_wrapper?.owners?.map((ow, owidx) => ({
                      authorized_persons: ow?.authorized_persons?.map(authPer => ({
                        person_uuid: authPer?.person_uuid,
                        owner_relationship: authPer?.owner_relationship,
                        borrower_relationship: authPer?.borrower_relationship,
                        authorize_contract: authPer?.authorize_contract
                      })) ?? [],
                      has_authorize: ow?.has_authorize?.id,
                      full_name: ow?.full_name,
                      person_uuid: ow?.person_uuid,
                      active: owidx,
                      owner_uuid: ow?.person_uuid
                    })) ?? []
                  },
                  project_name: itemSub?.project_name,
                  has_certificate: itemSub?.has_certificate?.id
                },
                market: {
                  maket_wrapper: {
                    from_credit_extension: itemSub?.from_credit_extension?.id ?? '',
                    is_exploited: itemSub?.is_exploited?.id ?? '',
                    credit_extension_secured: itemSub?.credit_extension_secured?.id ?? '',
                    non_business_area: itemSub?.non_business_area?.value.toString() ?? '',
                    max_percentage: itemSub?.max_percentage?.value?.toString() ?? '',
                    value_of_land: itemSub?.collateral_value?.value ?? 0,
                    description: itemSub?.description ?? '',
                    has_land_asset: '',
                    has_certificated_land_asset: itemSub?.has_certificate?.id
                  },
                  maket_certificates: itemSub?.certificates?.map((cer, indexCer) => {
                    return {
                      order: indexCer,
                      persons: cer?.persons?.map(per => ({
                        full_name: per?.full_name,
                        person_uuid: per?.person_uuid
                      })) ?? [],
                      uuid_maket_certificate: indexCer === 0 ? 'maketActiveUuid' : generateUUID(),
                      person_uuid: '',
                      certificate_name: cer.certificate_name ?? '',
                      certificate_code: cer?.certificate_code ?? '',
                      issue_date: (cer?.issue_date ?? 0) * 1000,
                      place_of_issue: cer.place_of_issue ?? '',
                      contract_name: cer.contract_name ?? '',
                      contract_number: cer.contract_no ?? '',
                      contract_code: cer.contract_code ?? '',
                      contract_date: (cer.contract_date ?? 0) * 1000,
                      contract_unit: cer.contract_unit ?? '',
                      documents: mappingDocument(cer.documents ?? [])
                    }
                  }),
                  maket_info: {
                    market_name: itemSub?.market?.market_name ?? '',
                    market_code: itemSub?.market?.market_code ?? '',
                    location: itemSub?.market?.location ?? '',
                    sector: itemSub?.market?.sector ?? '',
                    start_date: (itemSub?.market?.start_date ?? 0) * 1000,
                    end_date: (itemSub?.market?.end_date ?? 0) * 1000,
                    remaining: itemSub?.market?.remaining?.value?.toString() ?? '',
                    used_area: itemSub?.market?.used_area ?? '',
                    value_area: itemSub?.market?.value_area?.value?.toString() ?? '',
                    structure: itemSub?.market?.structure ?? '',
                  },
                  market_owner: {
                    active: 0,
                    owner_type: itemSub?.owner_wrapper?.owner_type?.id,
                    owner: itemSub?.owner_wrapper?.owners.map(ow => ({
                      full_name: ow?.full_name,
                      authorized_persons: ow?.authorized_persons?.map(authPer => ({
                        person_uuid: authPer?.person_uuid,
                        owner_relationship: authPer?.owner_relationship,
                        borrower_relationship: authPer?.borrower_relationship,
                        authorize_contract: authPer?.authorize_contract
                      })) ?? [],
                      has_authorize: ow?.has_authorize?.id,
                      person_uuid: ow?.person_uuid,
                      active: 0,
                      owner_uuid: ow?.person_uuid
                    })) ?? []
                  }
                  // ADD MARKET OWNER
                },
                land: {

                  land_wrapper: {  // cuc a 
                    from_credit_extension: itemSub?.land_wrapper?.from_credit_extension?.id ?? 'N',
                    is_exploited: itemSub?.land_wrapper?.is_exploited?.id ?? 'N',
                    credit_extension_secured: itemSub?.land_wrapper?.credit_extension_secured?.id ?? 'N',
                    non_business_area: itemSub?.land_wrapper?.non_business_area?.value?.toString() ?? '',
                    max_percentage: itemSub?.land_wrapper?.max_percentage?.value?.toString() ?? '',
                    value_of_land: itemSub?.land_wrapper?.collateral_value?.value ?? 0,
                    description: itemSub?.land_wrapper?.description,
                    has_land_asset: itemSub?.land_wrapper?.has_land_asset?.id,
                    has_certificated_land_asset: itemSub?.land_wrapper?.has_certificated_land_asset?.id
                  },

                  land_legal_information_owner: {  // thông tin phap ly chu so huu // chekc lai khi co legal // tab cua cuc a
                    active: 0,
                    owner_type: itemSub?.land_wrapper?.owner_wrapper?.owner_type?.id,
                    owner: itemSub?.land_wrapper?.owner_wrapper?.owners?.map(ow => ({
                      full_name: ow?.full_name,
                      authorized_persons: ow?.authorized_persons?.map(authPer => ({
                        person_uuid: authPer?.person_uuid,
                        owner_relationship: authPer?.owner_relationship,
                        borrower_relationship: authPer?.borrower_relationship,
                        authorize_contract: authPer?.authorize_contract
                      })) ?? [],
                      has_authorize: ow?.has_authorize?.id,
                      person_uuid: ow?.person_uuid,
                      active: 0,
                      owner_uuid: ow?.person_uuid
                    })) ?? []
                  },

                  land_legal_infomation_asset: { // thông tin dat // tab cua cuc a
                    asset_legal: itemSub?.land_wrapper?.land?.address ?? "",
                    address: itemSub?.land_wrapper?.land?.address ?? "",
                    province: itemSub?.land_wrapper?.land?.province?.id ?? "",
                    district: itemSub?.land_wrapper?.land?.district?.id ?? "",
                    ward: itemSub?.land_wrapper?.land?.ward?.id ?? "",
                    certificate_address: itemSub?.land_wrapper?.land?.certificate_address ?? "",
                    certificate_province: itemSub?.land_wrapper?.land?.certificate_province.id ?? "",
                    certificate_district: itemSub?.land_wrapper?.land?.certificate_district?.id ?? "",
                    certificate_ward: itemSub?.land_wrapper?.land?.certificate_ward?.id ?? "",
                    use_purposes: itemSub?.land_wrapper?.land?.use_purposes?.map(us => us.id),
                    purpose_using_lane: itemSub?.land_wrapper?.land?.use_purposes?.map(us => us.id),
                    purpose_using_lane_other: itemSub?.land_wrapper?.land?.other_use_purpose ?? "",
                    activeUUIDCertificateUsePurposes: generateUUID(),
                    land_asset_types: itemSub?.land_wrapper?.land?.certificate_use_purposes?.map(land => ({
                      activeUUIDCertificateUsePurposes: land?.re_land_used_uuid ?? "",
                      use_purpose: land?.use_purpose ?? "",
                      land_number: land?.land_number ?? "",
                      map_number: land?.map_number ?? "",
                      certificate_area: land?.certificate_area ?? "",
                      real_area: land?.real_area.value ?? "",
                      land_use_source: land?.land_use_source?.id ?? "",
                      other_land_use_source: land?.other_land_use_source ?? "",
                      duration: land?.duration ?? "",
                      usage_form: land?.usage_form.id ?? "",
                      other_usage_form: land?.other_usage_form ?? "",
                    }))
                  },

                  certificate_legal_info:{ // thong tin giay chung nhan  // tab cua cuc a
                    // Data active phần tử đầu tiên
                    activeUUIDCertificate: itemSub?.land_wrapper?.certificates[0].land_cert_uuid ?? "", 
                    dataCertificate:itemSub?.land_wrapper?.certificates?.map((cerLand,cerLandIndex)=>({
                      persons: cerLand?.persons?.map(per=>({
                        full_name: per?.full_name,
                        person_uuid: per?.person_uuid
                      }))??[],
                      activeUUIDUserListLegal: cerLand?.persons[0]?.person_uuid ?? "",
                      activeUUIDCertificateL:cerLandIndex === 0?  cerLand?.land_cert_uuid : "",
                      typeUseLand: cerLand?.certificate_type?.id ?? "",
                      typeGCN: cerLand?.other_certificate_type ? cerLand?.other_certificate_type : null,
                      numberGCNLegal: cerLand?.certificate_code ?? "",  // check BE
                      numberGCN: cerLand?.certificate_no ?? "", // check BE
                      dateRange: (cerLand?.issue_date ?? 0) * 1000,
                      dateLocation: cerLand?.place_of_issue ?? "",
                      documents: mappingDocument(cerLand.documents),
                    }))
                  },
                },
                ctxd_land: {  // cuc B 
                  activeCTXDLand: 'activeCTXDLand',  // check active
                  dataCTXDLand: itemSub?.land_asset_wrapper?.land_assets?.map((ctxd, ctxdIndex) => ({
                    activeUUIDCTXDLand: ctxdIndex === 0 ? 'activeCTXDLand' : generateUUID(), // check active
                    asset_legal: ctxd?.asset_legal?.id ?? "",
                    legal_CTXD_other: ctxd?.other_asset_legal ?? "",
                    address: ctxd?.address ?? "",
                    provice: ctxd?.province?.id ?? "",
                    district: ctxd?.district?.id ?? "",
                    ward: ctxd?.ward?.id ?? "",
                    certificate_address: ctxd?.certificate_address ?? "",
                    certificate_province: ctxd?.certificate_province?.id ?? "",
                    certificate_district: ctxd?.certificate_district?.id ?? "",
                    certificate_ward: ctxd?.certificate_ward?.id ?? "",
                    activeUUIDtypeCTXD: 'activeUUIDtypeCTXD', // check active
                    documents: mappingDocument(ctxd?.documents ?? []),
                    dataTypeCTXD: ctxd?.land_asset_types?.map((ctxdType, ctxdTypeIndex) => ({
                      activeTypeCTXD: ctxdTypeIndex === 0 ? 'activeUUIDtypeCTXD' : generateUUID(),// check active
                      land_asset_type: ctxdType?.land_asset_type?.id ?? "",
                      land_asset_type_other: ctxdType?.other_asset_type ?? "",
                      certificate_building_area: ctxdType?.certificate_building_area ?? "",
                      building_area: ctxdType?.building_area?.value?.toString() ?? "",
                      certificate_cross_floor_area: ctxdType?.certificate_cross_floor_area ?? "",
                      cross_floor_area: ctxdType?.cross_floor_area?.value?.toString() ?? "",
                      certificate_used_area: ctxdType?.certificate_used_area ?? "",
                      used_area: ctxdType?.used_area?.value?.toString() ?? "",
                      ownership_duration: ctxdType?.ownership_duration ?? "",
                      owner_form: ctxdType?.owner_form ?? "",
                      certificate_structure: ctxdType?.certificate_structure ?? "",
                      structure: ctxdType?.structure ?? "",
                      certificate_rank: ctxdType?.certificate_rank ?? "",
                      certificate_floors: ctxdType?.certificate_floors ?? "",
                      floors: ctxdType?.floors ?? "",
                      duration_of_use: ctxdType?.duration_of_use ?? "",
                    })) ?? []
                  })) ?? [],
                  ctx_land_wrapper: {  // A. THÔNG TIN ĐỊNH GIÁ VÀ THẨM ĐỊNH TÀI SẢN cuc B 
                    from_credit_extension: itemSub?.land_asset_wrapper?.from_credit_extension?.id ?? 'N',
                    is_exploited: itemSub?.land_asset_wrapper?.is_exploited?.id ?? 'N',
                    credit_extension_secured: itemSub?.land_asset_wrapper?.credit_extension_secured?.id ?? 'N',
                    non_business_area: itemSub?.land_asset_wrapper?.non_business_area?.value?.toString() ?? 0,
                    max_percentage: itemSub?.land_asset_wrapper?.max_percentage?.value?.toString() ?? "",
                    value_of_land: itemSub?.land_asset_wrapper?.collateral_value?.value ?? "",
                    description: itemSub?.land_asset_wrapper?.description ?? "",
                    has_land_asset: "",
                    has_certificated_land_asset: "",
                  }

                },
                ctxd_gcn_qsh: { // cuc C
                  activeUuIdCtxdGcnQsh: 'activeUuIdCtxdGcnQsh',
                  ctxd_gcn_qsh_data: itemSub?.certificated_land_asset_wrappers?.map((ctxd_gcn, ctxd_gcn_index) => ({
                    uuIdCtxdGcnQsh: ctxd_gcn_index === 0 ? 'activeUuIdCtxdGcnQsh' : generateUUID(),
                    documents: mappingDocument(ctxd_gcn?.documents ?? []),
                    land_legal_information_owner: {   // thong tin tab A 
                      active: 0,
                      owner_type: ctxd_gcn?.owner_wrapper?.owner_type?.id,
                      owner: ctxd_gcn?.owner_wrapper?.owners?.map((ow) => ({
                        authorized_persons: ow?.authorized_persons?.map(authPer => ({
                          person_uuid: authPer?.person_uuid,
                          owner_relationship: authPer?.owner_relationship,
                          borrower_relationship: authPer?.borrower_relationship,
                          authorize_contract: authPer?.authorize_contract
                        })) ?? [],
                        full_name: ow?.full_name,
                        has_authorize: ow?.has_authorize?.id,
                        person_uuid: ow?.person_uuid,
                        active: 0,
                        owner_uuid: ow?.person_uuid
                      }))
                    },

                    certificate_legal_info:{ // thong tin tab B
                      activeUUIDCertificate:ctxd_gcn?.certificates[0].land_const_item_cert_uuid,
                      dataCertificate:ctxd_gcn?.certificates?.map((cer,cerIndex)=>({
                        persons: cer?.persons?.map(per => ({
                          full_name: per?.full_name,
                          person_uuid: per?.person_uuid
                        })),
                        documents: mappingDocument(cer.documents),
                        activeUUIDUserListLegal: ctxd_gcn?.certificates[0].persons[0].person_uuid,
                        activeUUIDCertificateL:  cer.land_const_item_cert_uuid,
                        typeUseLand: cer?.certificate_type?.id ?? "",
                        typeGCN: cer?.other_certificate_type ?? "",
                        numberGCNLegal: cer?.certificate_code ?? "",
                        numberGCN: cer?.certificate_no ?? "",
                        dateRange: (cer?.issue_date ?? 0) * 1000,
                        dateLocation: cer?.place_of_issue ?? "",
                      }))
                    },

                    ctxd_gcn_qsh_land_info: {  // thong tin tab C

                      dataCTXDLand: {
                        activeUUIDCTXDLand: generateUUID(),
                        asset_legal: ctxd_gcn?.land_asset?.asset_legal?.id ?? "",
                        legal_CTXD_other: ctxd_gcn?.land_asset?.other_asset_legal ?? "",
                        address: ctxd_gcn?.land_asset?.address ?? "",
                        provice: ctxd_gcn?.land_asset?.province?.id ?? "",
                        district: ctxd_gcn?.land_asset?.district?.id ?? "",
                        ward: ctxd_gcn?.land_asset?.ward?.id ?? "",
                        certificate_address: ctxd_gcn?.land_asset?.certificate_address ?? "",
                        certificate_province: ctxd_gcn?.land_asset?.certificate_province?.id ?? "",
                        certificate_district: ctxd_gcn?.land_asset?.certificate_district?.id ?? "",
                        certificate_ward: ctxd_gcn?.land_asset?.certificate_ward?.id ?? "",
                        activeUUIDtypeCTXD: 'activeUUIDtypeCTXD',
                        dataTypeCTXD: ctxd_gcn?.land_asset?.land_asset_types?.map((typed, indexType) => ({
                          activeTypeCTXD: indexType === 0 ? 'activeUUIDtypeCTXD' : generateUUID(),
                          land_asset_type: typed?.land_asset_type?.id ?? "",
                          land_asset_type_other: typed?.other_asset_type ?? "",
                          certificate_building_area: typed?.certificate_building_area ?? "",
                          building_area: typed?.building_area?.value?.toString() ?? "",
                          certificate_cross_floor_area: typed?.certificate_cross_floor_area ?? "",
                          cross_floor_area: typed?.cross_floor_area?.value?.toString() ?? "",
                          certificate_used_area: typed?.certificate_used_area ?? "",
                          used_area: typed?.used_area?.value?.toString() ?? "",
                          ownership_duration: typed?.ownership_duration ?? "",
                          owner_form: typed?.owner_form ?? "",
                          certificate_structure: typed?.certificate_structure ?? "",
                          structure: typed?.structure ?? "",
                          certificate_rank: typed?.certificate_rank ?? "",
                          certificate_floors: typed?.certificate_floors ?? "",
                          floors: typed?.floors ?? "",
                          duration_of_use: typed?.duration_of_use ?? "",
                        })) ?? []
                      },
                      ctx_land_wrapper: {  // A. THÔNG TIN ĐỊNH GIÁ VÀ THẨM ĐỊNH TÀI SẢN  CHECK LAI UX 
                        from_credit_extension: ctxd_gcn?.from_credit_extension?.id ?? "",
                        is_exploited: ctxd_gcn?.is_exploited?.id ?? "",
                        credit_extension_secured: ctxd_gcn?.credit_extension_secured?.id ?? "",
                        non_business_area: ctxd_gcn?.non_business_area?.value?.toString() ?? "",
                        max_percentage: ctxd_gcn?.max_percentage?.value?.toString() ?? "",
                        value_of_land: ctxd_gcn?.collateral_value?.value ?? "",
                        description: ctxd_gcn?.description ?? "",
                        has_land_asset: "",
                        has_certificated_land_asset: "",
                      },
                      activeCTXDLand: generateUUID(),
                    }

                  })) ?? []
                }
              }
            }) as unknown as ISubItems[]
          }
        }) as ISubtype[],
        price_cert_uuid: item?.price_cert_uuid
      }
    }) as unknown as ILOANNormalCollateralData[]

    state.storageApproval.collateral.lvt_log = payload.ltv_logs?.map(lvt=>{
      return {
        title:lvt.title,
        is_activated:lvt.is_activated,
        updated_by_fullname: lvt.updated_by_fullname,
        updated_by:lvt.updated_by,
        updated_at:lvt.updated_at,
        uuid:lvt.uuid,
        rows:lvt.rows?.map(rows=>{
          return{
            coll_price_cert_uuid:rows.coll_price_cert_uuid,
            coll_price_cert_asset_uuid:rows.coll_price_cert_asset_uuid,
            loan_credit:rows.loan_credit,
            temp_calc_value:rows.temp_calc_value,
            max_ltv_value:rows.max_ltv_value,
            max_loan_credit:rows.max_loan_credit,
            safely_debit:rows.safely_debit,
            ltv_value:rows.ltv_value,
            uuid:rows.uuid,
          }
        }) as ILoanNormalApprovalLogRows[]
      }
    }) as ILoanNormalApprovalLVTLog[]

  },


  fetchDataUpdateAPIStorageCollateralTypeApproval: { // fetch obj collateral
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<ICollateralFormGet, string, string>
    ) {
      if (state.storage.full.data) {
        if (state.storage.full.data.form.collateral_form) {
          state.storage.full.data.form.collateral_form.data.collaterals = state.storage.full.data.form.collateral_form.data.collaterals.map(i => {
            if (i.price_cert_uuid === action.payload.price_cert_uuid) {
              i = action.payload
            }
            return { ...i }
          })
        }
      }

      const mappingDocument = (data: IResDocument[]) => {
        if (!data) return [];
        return data.map((doc: IResDocument) => {
          // 
          const result: ILOANNormalDocument = {
            uuid: generateUUID(),
            document_id: doc.document_id,
            document_name: doc.document_name,
            child_files: doc?.child_files?.map((file, index) => {
              const result: ILOANNormalFile = {
                content_type: file.content_type,
                created_at: file.created_at,
                created_by: file.created_by,
                created_by_name: file.created_by_name,
                updated_at: file.updated_at,
                updated_by: file.updated_by,
                updated_by_name: file.updated_by_name,      
                description: file.description,
                display_order: index + 1,
                file_id: index,
                name: file.name,
                uuid: file.uuid,
                custom_keys: file.custom_keys,
                file_upload: '',
              };
              return result;
            }) ?? []
          }
          return result;
        });
      };

      state.storageApproval.collateral.data = state.storageApproval.collateral.data?.map((item) => {
        if (item.uuidActiveData === action.meta && item.is_collapse_type === true) {
          const dataActiveUUID = generateUUID();
          const SubtypeActiveUUID = generateUUID();
          state.storageApproval.collateral.uuidActiveData = dataActiveUUID;
          return {
            carousel: [],
            is_accept:true,
            reason:"",
            uuidActiveData: dataActiveUUID, //
            isSaved: true,
            uuidActiveSubtype: SubtypeActiveUUID,
            is_collapse_type: true,
            type: action.payload?.collateral_type?.id,
            status: action.payload?.status?.id,
            is_compactness: action.payload?.is_compactness?.id,
            valuation_id: action.payload?.valuation_id,
            valuation_date: (action.payload?.valuation_date) * 1000,
            valuation_unit_type: action.payload?.valuation_unit_type?.id,
            valuation_unit: action.payload?.valuation_unit?.id,
            valuation_center: action.payload?.valuation_center?.id,
            valuation_center_opinion: action.payload?.valuation_center_opinion,
            independence_organization: action.payload?.independence_organization?.id,
            other_independence_organization: action.payload?.other_independence_organization,
            purpose: action.payload?.purpose?.id,
            other_purpose: action.payload?.other_purpose,
            address: action.payload?.address,
            province: action.payload?.province?.id,
            district: action.payload?.district?.id,
            ward: action.payload?.ward?.id,
            position_type: action.payload?.position_type?.id,
            other_position_type: action.payload?.other_position_type,
            lane_width: action.payload?.lane_width?.id,
            description: action.payload?.description,
            collateral_value: action.payload?.collateral_value.value,
            max_percentage: action.payload?.max_percentage?.value,
            document:  mappingDocument(action.payload.documents ?? []),
            sub_type: action.payload?.sub_types && action.payload?.sub_types?.map(i => {

              return {
                is_collapse_sub_type: false,
                uuidItemsActive: 'subItemActiveUUID',
                uuidActiveSubtype: SubtypeActiveUUID,
                id: i.id,
                child_id: i.child_id,
                child_name: i.child_name,
                child_sub_type: i.child_id,
                items: i.items && i.items.map((itemSub, indexItem) => {
                  return {
                    activeUUID: indexItem === 0 ? 'subItemActiveUUID' : generateUUID(),
                    type_land: item.sub_type[0].items.find(itx => itx.activeUUID === item.sub_type[0].uuidItemsActive)?.type_land,
                    departmentActiveUUID: 'departmentActiveUUID',
                    maketActiveUuid: 'maketActiveUuid',
                    current_value_item: itemSub?.collateral_value?.value,
                    ratio: itemSub?.max_percentage?.value,
                    value: itemSub?.collateral_value?.value,
                    typeCollateral: i.id === "BALC" ? itemSub?.detail.balance_type?.id : itemSub?.detail?.name,
                    license: itemSub?.detail?.license_number,
                    status: i?.id === 'BALC' || i?.id === 'STOC' || i?.id === 'OTHE' ? itemSub?.detail?.status as string : itemSub?.detail?.status?.id,
                    status_flag: itemSub?.detail?.status,
                    description: itemSub?.detail?.description,
                    collateral_value: itemSub?.collateral_value?.value,
                    collateral_code: itemSub?.collateral_code,
                    count: itemSub?.detail?.quantity_each_type,
                    branch: itemSub?.detail?.brand,
                    model: itemSub?.detail?.model,
                    year: Number(itemSub?.detail?.manufacturing_date),
                    info_collatetal: itemSub?.description,
                    quantity: itemSub?.detail?.quantity,
                    number_register: itemSub?.detail?.license_number,
                    issuer: itemSub?.detail?.distributor?.id,
                    other_issuer: itemSub?.detail?.other_distributor,
                    CLCL: itemSub?.detail?.remain_quality?.value,
                    production: itemSub?.detail?.origin_of_production,
                    origin_of_production: itemSub?.detail?.origin_of_production?.id,
                    other_origin_of_production: itemSub?.detail?.other_origin_of_production,
                    vehicle_identification_number: itemSub?.detail?.vehicle_identification_number ?? "",
                    license_number: itemSub?.detail?.vehicle_identification_number ?? "",
                    engine_number: itemSub?.detail?.engine_number ?? "",
                    license_plate: itemSub?.detail?.license_plate ?? "",
                    departmentInfoActiveUUID: '001001001',
                    has_certificate_maket: itemSub?.has_certificate?.id,
                    documents:mappingDocument(itemSub?.detail?.documents),
                    transportation_sub_type: itemSub?.detail?.transportation_sub_type,
                    other_transportation_sub_type: itemSub?.detail?.other_transportation_sub_type,
                    legal_document_types: itemSub?.detail?.legal_document_types,
                    credit_extension_secured: itemSub?.credit_extension_secured?.id,
                    owner_wrapper: {
                      owner_type: itemSub?.owner_wrapper?.owner_type?.id,
                      owner: itemSub?.owner_wrapper?.owners?.map(ow => ({
                        full_name: ow?.full_name,
                        person_uuid: ow?.person_uuid,
                      })) ?? []
                    },
                    activeUUIDCertificateUsePurposes: "activeUUIDCertificateUsePurposesdepartment",
                    department: {   // type chung cu 
                      department_wrapper: {
                        from_credit_extension: itemSub?.from_credit_extension?.id,
                        is_exploited: itemSub?.is_exploited?.id,
                        credit_extension_secured: itemSub?.credit_extension_secured?.id,
                        non_business_area: itemSub?.non_business_area?.value?.toString(),
                        max_percentage: itemSub?.max_percentage?.value?.toString(),
                        value_of_land: itemSub?.collateral_value?.value, // check ux or API
                        description: itemSub?.description,
                        has_land_asset: itemSub?.has_certificate?.id,// check ux or API
                        has_certificated_land_asset: itemSub?.has_certificate?.id,// check ux or API
                      },
                      department_certificate_legal: itemSub?.certificates?.map((cerr, idx) => ({
                        order: idx + 1,
                        persons: cerr?.persons?.map(per => ({
                          full_name: per?.full_name,
                          person_uuid: per?.person_uuid
                        })) ?? [], // check legal
                        uuid_certificate_legal: idx === 0 ? 'departmentActiveUUID' : generateUUID(),
                        other_certificate_type: cerr?.certificate_type?.id,  // check 
                        other_certificate_type_other: cerr?.other_certificate_type, // check
                        certificate_code: cerr?.certificate_code,
                        certificate_no: cerr?.certificate_no,
                        issue_date: (cerr?.issue_date ?? 0) * 1000,
                        place_of_issue: cerr?.place_of_issue,
                        contract_type: cerr?.contract_type,
                        contract_number_type: cerr?.contract_type,
                        contract_number: cerr?.contract_no,
                        contract_date: (cerr?.contract_date ?? 0) * 1000,
                        documents: mappingDocument(cerr.documents),
                      })),
                      department_info: itemSub?.apartments?.map((depp, ii) => {
                        return {
                          departmentInfoActiveUUID: ii === 0 ? '001001001' : generateUUID(),
                          house_type: depp?.house_type,
                          apartment_type: depp?.apartment_type?.id,
                          other_apartment_type: depp?.other_apartment_type,
                          apartment_number: depp?.apartment_number,
                          block: depp?.block,
                          floor: depp?.floor,
                          start_date: (depp?.start_date ?? 0) * 1000,
                          certificate_area: depp?.certificate_area ?? "",
                          real_area: depp?.real_area.value,
                          usage_form: depp?.usage_from,
                          duration: depp?.duration,
                          ownership_category: depp?.ownership_category,
                        }
                      }),
                      department_info_land: {
                        address: itemSub?.land?.address,
                        province: itemSub?.land?.province?.id,
                        district: itemSub?.land?.district?.id,
                        ward: itemSub?.land?.ward?.id,
                        certificate_address: itemSub?.land?.certificate_address,
                        certificate_province: itemSub?.land?.certificate_province?.id,
                        certificate_district: itemSub?.land?.certificate_district?.id,
                        certificate_ward: itemSub?.land?.certificate_ward?.id,
                        use_purposes: itemSub?.land?.use_purposes?.map(us => us.id),
                        other_use_purpose: itemSub?.land?.other_use_purpose ?? "",
                        purpose_using_lane: itemSub?.land?.use_purposes?.map(us => us.id),
                        purpose_using_lane_other: itemSub?.land_wrapper?.land?.other_use_purpose ?? "",
                        certificate_use_purposes: itemSub?.land?.certificate_use_purposes?.map((fi, index) => ({
                          activeUUIDCertificateUsePurposes: index === 0 ? 'activeUUIDCertificateUsePurposesdepartment' : generateUUID(),
                          use_purpose: fi?.use_purpose,
                          land_number: fi?.land_number,
                          map_number: fi?.map_number,
                          certificate_area: fi?.certificate_area ?? "",
                          real_area: fi?.real_area?.value,
                          land_use_source: fi?.land_use_source?.id,
                          other_land_use_source: fi?.other_land_use_source,
                          duration: fi?.duration,
                          usage_form: fi?.usage_form?.id,
                          other_usage_form: fi?.other_usage_form
                        })),
                      },
                      department_owner: {
                        active: indexItem,
                        owner_type: itemSub?.owner_wrapper?.owner_type?.id,
                        owner: itemSub?.owner_wrapper?.owners?.map((ow, owidx) => ({
                          authorized_persons: ow?.authorized_persons?.map(authPer => ({
                            person_uuid: authPer?.person_uuid,
                            owner_relationship: authPer?.owner_relationship,
                            borrower_relationship: authPer?.borrower_relationship,
                            authorize_contract: authPer?.authorize_contract
                          })) ?? [],
                          has_authorize: ow?.has_authorize?.id,
                          full_name: ow?.full_name,
                          person_uuid: ow?.person_uuid,
                          active: owidx,
                          owner_uuid: ow?.person_uuid
                        })) ?? []
                      },
                      project_name: itemSub?.project_name,
                      has_certificate: itemSub?.has_certificate?.id
                    },
                    market: {
                      maket_wrapper: {
                        from_credit_extension: itemSub?.from_credit_extension?.id ?? '',
                        is_exploited: itemSub?.is_exploited?.id ?? '',
                        credit_extension_secured: itemSub?.credit_extension_secured?.id ?? '',
                        non_business_area: itemSub?.non_business_area?.value.toString() ?? '',
                        max_percentage: itemSub?.max_percentage?.value?.toString() ?? '',
                        value_of_land: itemSub?.collateral_value?.value ?? 0,
                        description: itemSub?.description ?? '',
                        has_land_asset: '',
                        has_certificated_land_asset: itemSub?.has_certificate?.id
                      },
                      maket_certificates: itemSub?.certificates?.map((cer, indexCer) => {
                        return {
                          order: indexCer,
                          persons: cer?.persons?.map(per => ({
                            full_name: per?.full_name,
                            person_uuid: per?.person_uuid
                          })) ?? [],
                          uuid_maket_certificate: indexCer === 0 ? 'maketActiveUuid' : generateUUID(),
                          certificate_name: cer.certificate_name ?? '',
                          certificate_code: cer?.certificate_code ?? '',
                          issue_date: (cer?.issue_date ?? 0) * 1000,
                          place_of_issue: cer.place_of_issue ?? '',
                          contract_name: cer.contract_name ?? '',
                          contract_number: cer.contract_no ?? '',
                          contract_code: cer.contract_code ?? '',
                          contract_date: (cer.contract_date ?? 0) * 1000,
                          contract_unit: cer.contract_unit ?? ''
                        }
                      }),
                      maket_info: {
                        market_name: itemSub?.market?.market_name ?? '',
                        market_code: itemSub?.market?.market_code ?? '',
                        location: itemSub?.market?.location ?? '',
                        sector: itemSub?.market?.sector ?? '',
                        start_date: (itemSub?.market?.start_date ?? 0) * 1000,
                        end_date: (itemSub?.market?.end_date ?? 0) * 1000,
                        remaining: itemSub?.market?.remaining?.value?.toString() ?? '',
                        used_area: itemSub?.market?.used_area ?? '',
                        value_area: itemSub?.market?.value_area?.value?.toString() ?? '',
                        structure: itemSub?.market?.structure ?? '',
                      },
                      market_owner: {
                        active: 0,
                        owner_type: itemSub?.owner_wrapper?.owner_type?.id,
                        owner: itemSub?.owner_wrapper?.owners.map(ow => ({
                          full_name: ow?.full_name,
                          authorized_persons: ow?.authorized_persons?.map(authPer => ({
                            person_uuid: authPer?.person_uuid,
                            owner_relationship: authPer?.owner_relationship,
                            borrower_relationship: authPer?.borrower_relationship,
                            authorize_contract: authPer?.authorize_contract
                          })) ?? [],
                          has_authorize: ow?.has_authorize?.id,
                          person_uuid: ow?.person_uuid,
                          active: 0,
                          owner_uuid: ow?.person_uuid
                        })) ?? []
                      }
                      // ADD MARKET OWNER
                    },
                    land: {

                      land_wrapper: {  // cuc a 
                        from_credit_extension: itemSub?.land_wrapper?.from_credit_extension?.id ?? 'N',
                        is_exploited: itemSub?.land_wrapper?.is_exploited?.id ?? 'N',
                        credit_extension_secured: itemSub?.land_wrapper?.credit_extension_secured?.id ?? 'N',
                        non_business_area: itemSub?.land_wrapper?.non_business_area?.value?.toString() ?? '',
                        max_percentage: itemSub?.land_wrapper?.max_percentage?.value?.toString() ?? '',
                        value_of_land: itemSub?.land_wrapper?.collateral_value?.value ?? 0,
                        description: itemSub?.land_wrapper?.description,
                        has_land_asset: itemSub?.land_wrapper?.has_land_asset?.id,
                        has_certificated_land_asset: itemSub?.land_wrapper?.has_certificated_land_asset?.id
                      },

                      land_legal_information_owner: {  // thông tin phap ly chu so huu // chekc lai khi co legal // tab cua cuc a
                        active: 0,
                        owner_type: itemSub?.land_wrapper?.owner_wrapper?.owner_type?.id,
                        owner: itemSub?.land_wrapper?.owner_wrapper?.owners?.map(ow => ({
                          full_name: ow?.full_name,
                          authorized_persons: ow?.authorized_persons?.map(authPer => ({
                            person_uuid: authPer?.person_uuid,
                            owner_relationship: authPer?.owner_relationship,
                            borrower_relationship: authPer?.borrower_relationship,
                            authorize_contract: authPer?.authorize_contract
                          })) ?? [],
                          has_authorize: ow?.has_authorize?.id,
                          person_uuid: ow?.person_uuid,
                          active: 0,
                          owner_uuid: ow?.person_uuid
                        })) ?? []
                      },

                      land_legal_infomation_asset: { // thông tin dat // tab cua cuc a
                        asset_legal: itemSub?.land_wrapper?.land?.address ?? "",
                        address: itemSub?.land_wrapper?.land?.address ?? "",
                        province: itemSub?.land_wrapper?.land?.province?.id ?? "",
                        district: itemSub?.land_wrapper?.land?.district?.id ?? "",
                        ward: itemSub?.land_wrapper?.land?.ward?.id ?? "",
                        certificate_address: itemSub?.land_wrapper?.land?.certificate_address ?? "",
                        certificate_province: itemSub?.land_wrapper?.land?.certificate_province.id ?? "",
                        certificate_district: itemSub?.land_wrapper?.land?.certificate_district?.id ?? "",
                        certificate_ward: itemSub?.land_wrapper?.land?.certificate_ward?.id ?? "",
                        use_purposes: itemSub?.land_wrapper?.land.use_purposes?.map(us => us.id),
                        purpose_using_lane: itemSub?.land_wrapper?.land.use_purposes?.map(us => us.id),
                        purpose_using_lane_other: itemSub?.land_wrapper?.land?.other_use_purpose ?? "",
                        activeUUIDCertificateUsePurposes: 'activeUUIDCertificateUsePurposes',
                        land_asset_types: itemSub?.land_wrapper?.land?.certificate_use_purposes?.map((land, idx) => ({
                          activeUUIDCertificateUsePurposes: idx === 0 ? 'activeUUIDCertificateUsePurposes' : generateUUID(),
                          use_purpose: land?.use_purpose ?? "",
                          land_number: land?.land_number ?? "",
                          map_number: land?.map_number ?? "",
                          certificate_area: land?.certificate_area?? "",
                          real_area: land?.real_area.value ?? "",
                          land_use_source: land?.land_use_source?.id ?? "",
                          other_land_use_source: land?.other_land_use_source ?? "",
                          duration: land?.duration ?? "",
                          usage_form: land?.usage_form.id ?? "",
                          other_usage_form: land?.other_usage_form ?? "",
                        }))
                      },

                      certificate_legal_info: { // thong tin giay chung nhan  // tab cua cuc a
                        activeUUIDCertificate: generateUUID(),
                        dataCertificate: itemSub?.land_wrapper?.certificates?.map(cerLand => ({
                          persons: cerLand?.persons?.map(per => ({
                            full_name: per?.full_name,
                            person_uuid: per?.person_uuid
                          })) ?? [],
                          activeUUIDUserListLegal: cerLand?.land_cert_uuid ?? "",
                          activeUUIDCertificateL: cerLand?.land_cert_uuid ?? "",
                          typeUseLand: cerLand?.certificate_type?.id ?? "",
                          typeGCN: cerLand?.other_certificate_type ?? "",
                          numberGCNLegal: cerLand?.certificate_no ?? "",  // check BE
                          numberGCN: cerLand?.certificate_no ?? "", // check BE
                          dateRange: (cerLand?.issue_date ?? 0) * 1000,
                          dateLocation: cerLand?.place_of_issue ?? "",
                        }))
                      },

                    },

                    ctxd_land: {  // cuc B 
                      activeCTXDLand: 'activeCTXDLand',  // check active
                      dataCTXDLand: itemSub?.land_asset_wrapper?.land_assets?.map((ctxd, ctxdIndex) => ({
                        activeUUIDCTXDLand: ctxdIndex === 0 ? 'activeCTXDLand' : generateUUID(), // check active
                        asset_legal: ctxd?.asset_legal?.id ?? "",
                        legal_CTXD_other: ctxd?.other_asset_legal ?? "",
                        address: ctxd?.address ?? "",
                        provice: ctxd?.province?.id ?? "",
                        district: ctxd?.district?.id ?? "",
                        ward: ctxd?.ward?.id ?? "",
                        certificate_address: ctxd?.certificate_address ?? "",
                        certificate_province: ctxd?.certificate_province?.id ?? "",
                        certificate_district: ctxd?.certificate_district?.id ?? "",
                        certificate_ward: ctxd?.certificate_ward?.id ?? "",
                        activeUUIDtypeCTXD: 'activeUUIDtypeCTXD', // check active
                        dataTypeCTXD: ctxd?.land_asset_types?.map((ctxdType, ctxdTypeIndex) => ({
                          activeTypeCTXD: ctxdTypeIndex === 0 ? 'activeUUIDtypeCTXD' : generateUUID(),// check active
                          land_asset_type: ctxdType?.land_asset_type.id ?? "",
                          land_asset_type_other: ctxdType?.other_asset_type ?? "",
                          certificate_building_area: ctxdType?.certificate_building_area ?? "",
                          building_area: ctxdType?.building_area?.value?.toString() ?? "",
                          certificate_cross_floor_area: ctxdType?.certificate_cross_floor_area ?? "",
                          cross_floor_area: ctxdType?.cross_floor_area?.value?.toString() ?? "",
                          certificate_used_area: ctxdType?.certificate_used_area ?? "",
                          used_area: ctxdType?.used_area?.value?.toString() ?? "",
                          ownership_duration: ctxdType?.ownership_duration ?? "",
                          owner_form: ctxdType?.owner_form ?? "",
                          certificate_structure: ctxdType?.certificate_structure ?? "",
                          structure: ctxdType?.structure ?? "",
                          certificate_rank: ctxdType?.certificate_rank ?? "",
                          certificate_floors: ctxdType?.certificate_floors ?? "",
                          floors: ctxdType?.floors ?? "",
                          duration_of_use: ctxdType?.duration_of_use ?? "",
                        })) ?? []
                      })) ?? [],
                      ctx_land_wrapper: {  // A. THÔNG TIN ĐỊNH GIÁ VÀ THẨM ĐỊNH TÀI SẢN cuc B 
                        from_credit_extension: itemSub?.land_asset_wrapper?.from_credit_extension?.id ?? 'N',
                        is_exploited: itemSub?.land_asset_wrapper?.is_exploited?.id ?? 'N',
                        credit_extension_secured: itemSub?.land_asset_wrapper?.credit_extension_secured?.id ?? 'N',
                        non_business_area: itemSub?.land_asset_wrapper?.non_business_area?.value?.toString() ?? 0,
                        max_percentage: itemSub?.land_asset_wrapper?.max_percentage?.value?.toString() ?? "",
                        value_of_land: itemSub?.land_asset_wrapper?.collateral_value?.value ?? "",
                        description: itemSub?.land_asset_wrapper?.description ?? "",
                        has_land_asset: "",
                        has_certificated_land_asset: "",
                      }

                    },

                    ctxd_gcn_qsh: { // cuc C
                      activeUuIdCtxdGcnQsh: 'activeUuIdCtxdGcnQsh',
                      ctxd_gcn_qsh_data: itemSub?.certificated_land_asset_wrappers?.map((ctxd_gcn, ctxd_gcn_index) => ({
                        uuIdCtxdGcnQsh: ctxd_gcn_index === 0 ? 'activeUuIdCtxdGcnQsh' : generateUUID(),
                        land_legal_information_owner: {   // thong tin tab A 
                          active: 0,
                          owner_type: ctxd_gcn?.owner_wrapper?.owner_type?.id,
                          owner: ctxd_gcn?.owner_wrapper?.owners?.map((ow) => ({
                            full_name: ow?.full_name,
                            authorized_persons: ow?.authorized_persons?.map(authPer => ({
                              person_uuid: authPer?.person_uuid,
                              owner_relationship: authPer?.owner_relationship,
                              borrower_relationship: authPer?.borrower_relationship,
                              authorize_contract: authPer?.authorize_contract
                            })) ?? [],
                            has_authorize: ow?.has_authorize?.id,
                            person_uuid: ow?.person_uuid,
                            active: 0,
                            owner_uuid: ow?.person_uuid
                          }))
                        },

                        certificate_legal_info: { // thong tin tab B
                          activeUUIDCertificate: generateUUID(),
                          dataCertificate: ctxd_gcn?.certificates?.map(cer => ({
                            persons: cer?.persons?.map(per => ({
                              full_name: per?.full_name,
                              person_uuid: per?.person_uuid
                            })),
                            activeUUIDUserListLegal: generateUUID(),
                            activeUUIDCertificateL: generateUUID(),
                            typeUseLand: cer?.certificate_type?.id ?? "",
                            typeGCN: cer?.other_certificate_type ?? "",
                            numberGCNLegal: cer?.certificate_code ?? "",
                            numberGCN: cer?.certificate_no ?? "",
                            dateRange: (cer?.issue_date ?? 0) * 1000,
                            dateLocation: cer?.place_of_issue ?? "",
                          }))
                        },

                        ctxd_gcn_qsh_land_info: {  // thong tin tab C

                          dataCTXDLand: {
                            activeUUIDCTXDLand: generateUUID(),
                            asset_legal: ctxd_gcn?.land_asset?.asset_legal?.id ?? "",
                            legal_CTXD_other: ctxd_gcn?.land_asset?.other_asset_legal ?? "",
                            address: ctxd_gcn?.land_asset?.address ?? "",
                            provice: ctxd_gcn?.land_asset?.province?.id ?? "",
                            district: ctxd_gcn?.land_asset?.district?.id ?? "",
                            ward: ctxd_gcn?.land_asset?.ward?.id ?? "",
                            certificate_address: ctxd_gcn?.land_asset?.certificate_address ?? "",
                            certificate_province: ctxd_gcn?.land_asset?.certificate_province?.id ?? "",
                            certificate_district: ctxd_gcn?.land_asset?.certificate_district?.id ?? "",
                            certificate_ward: ctxd_gcn?.land_asset?.certificate_ward?.id ?? "",
                            activeUUIDtypeCTXD: 'activeUUIDtypeCTXD',
                            dataTypeCTXD: ctxd_gcn?.land_asset?.land_asset_types?.map((typed, indexType) => ({
                              activeTypeCTXD: indexType === 0 ? 'activeUUIDtypeCTXD' : generateUUID(),
                              land_asset_type: typed?.land_asset_type?.id ?? "",
                              land_asset_type_other: typed?.other_asset_type ?? "",
                              certificate_building_area: typed?.certificate_building_area ?? "",
                              building_area: typed?.building_area?.value?.toString() ?? "",
                              certificate_cross_floor_area: typed?.certificate_cross_floor_area?? "",
                              cross_floor_area: typed?.cross_floor_area?.value?.toString() ?? "",
                              certificate_used_area: typed?.certificate_used_area ?? "",
                              used_area: typed?.used_area?.value?.toString() ?? "",
                              ownership_duration: typed?.ownership_duration ?? "",
                              owner_form: typed?.owner_form ?? "",
                              certificate_structure: typed?.certificate_structure ?? "",
                              structure: typed?.structure ?? "",
                              certificate_rank: typed?.certificate_rank ?? "",
                              certificate_floors: typed?.certificate_floors ?? "",
                              floors: typed?.floors ?? "",
                              duration_of_use: typed?.duration_of_use ?? "",
                            })) ?? []
                          },
                          ctx_land_wrapper: {  // A. THÔNG TIN ĐỊNH GIÁ VÀ THẨM ĐỊNH TÀI SẢN  CHECK LAI UX 
                            from_credit_extension: ctxd_gcn?.from_credit_extension?.id ?? "",
                            is_exploited: ctxd_gcn?.is_exploited?.id ?? "",
                            credit_extension_secured: ctxd_gcn?.credit_extension_secured?.id ?? "",
                            non_business_area: ctxd_gcn?.non_business_area?.value?.toString() ?? "",
                            max_percentage: ctxd_gcn?.max_percentage?.value?.toString() ?? "",
                            value_of_land: ctxd_gcn?.collateral_value?.value ?? "",
                            description: ctxd_gcn?.description ?? "",
                            has_land_asset: "",
                            has_certificated_land_asset: "",
                          },
                          activeCTXDLand: generateUUID(),
                        }

                      })) ?? []
                    }
                  }
                }) as unknown as ISubItems[]
              }
            }) as ISubtype[],
            price_cert_uuid: action.payload?.price_cert_uuid
          } as ILOANNormalCollateralData;

        }
        return { ...item }
      })


    },
    prepare(
      payload: ICollateralFormGet,
      meta: string
    ) {
      return { payload, meta };
    },
  },


  setOnChangeCollaretalCertificateApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {
                let typeLand = it.type_land;

                if (it.activeUUID === action.meta.uuidActiveitems) {
                  if (typeLand === ETypeLandName.LAND) {
                    it.land.certificate_legal_info.activeUUIDCertificate =
                      action.payload;
                  } else {
                    let cgqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((cgqd) => {
                      if (cgqd.uuIdCtxdGcnQsh === cgqd_active) {
                        cgqd.certificate_legal_info.activeUUIDCertificate =
                          action.payload;
                      }
                      return { ...cgqd };
                    });
                  }
                }

                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
      }
    ) {
      return { payload, meta };
    },
  },

  addCollaretalCertificateUserListLegalApproval: {
    // use list legal
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
          uuidActiveCer: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {
                if (it.activeUUID === action.meta.uuidActiveitems) {
                  let typeLand = it.type_land;
                  const activeUseListLegal = generateUUID();

                  if (typeLand === ETypeLandName.LAND) {
                    it.land.certificate_legal_info.dataCertificate.map((cre) => {
                      if (cre.activeUUIDCertificateL === action.meta.uuidActiveCer) {
                        cre.activeUUIDUserListLegal = activeUseListLegal;

                      }
                      return { ...cre };
                    });
                  } else {
                    let cdqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((cdqd) => {
                      if (cdqd.uuIdCtxdGcnQsh === cdqd_active) {
                        cdqd.certificate_legal_info.dataCertificate.map((cre) => {
                          if (cre.activeUUIDCertificateL === action.meta.uuidActiveCer) {
                            cre.activeUUIDUserListLegal = activeUseListLegal;
                            // cre.userListDataLegal.push({
                            //   // ...generateEmptyDataCollateralCertificateUseListLegalDetails(),
                            //   // activeUUIDUserListLegal: activeUseListLegal,
                            // });
                          }
                          return { ...cre };
                        }
                        );
                      }
                      return { ...cdqd };
                    });
                  }
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
        uuidActiveCer: string;
      }
    ) {
      return { payload, meta };
    },
  },

  /**
   * Remove user legal
   * Action paylod -> uuid user active
   * 
   */
  removeCollaretalCertificateUserListLegalApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
          uuidActiveCer: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {
                if (it.activeUUID === action.meta.uuidActiveitems) {
                  let typeLand = it.type_land;

                  if (typeLand === ETypeLandName.LAND) {
                    it.land.certificate_legal_info.dataCertificate.map((cre) => {
                      if (cre.activeUUIDCertificateL === action.meta.uuidActiveCer) {
                        // cre.userListDataLegal = cre.userListDataLegal.filter(u =>
                        //   // u.activeUUIDUserListLegal !== action.payload
                        // );
                        cre.activeUUIDUserListLegal = ""
                      }
                      return { ...cre };
                    });
                  } else {
                    let cdqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((cdqd) => {
                      if (cdqd.uuIdCtxdGcnQsh === cdqd_active) {
                        cdqd.certificate_legal_info.dataCertificate.map(cre => {
                          if (cre.activeUUIDCertificateL === action.meta.uuidActiveCer) {
                            // cre.userListDataLegal = cre.userListDataLegal.filter(u =>
                            //   // u.activeUUIDUserListLegal !== action.payload
                            // );
                            cre.activeUUIDUserListLegal = ""
                          }
                          return { ...cre }
                        })
                      }
                      return { ...cdqd };
                    });
                  }
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
        uuidActiveCer: string;
      }
    ) {
      return { payload, meta };
    },
  },




  removeCollaretalCertificateApproval: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string, string,
      {
        uuidActiveData: string,
        uuidActiveSubtype: string,
        uuidActiveitems: string,
      }>) {
      state.storageApproval.collateral.data.map(col => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map(i => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map(it => {
                if (it.activeUUID === action.meta.uuidActiveitems) {
                  let typeLand = it.type_land;
                  // delete market certificates
                  if (typeLand === "MARK") {
                    it.market.maket_certificates = it.market.maket_certificates.filter(mar => mar.uuid_maket_certificate !== action.payload)
                    it.maketActiveUuid = it.market.maket_certificates[it.market.maket_certificates.length - 1]?.uuid_maket_certificate ?? ""
                  }
                  if (typeLand === ETypeLandName.LAND) {

                    it.land.certificate_legal_info.dataCertificate = it.land.certificate_legal_info.dataCertificate.filter(cre => cre.activeUUIDCertificateL !== action.payload)
                    const indexLength = it.land.certificate_legal_info.dataCertificate.length - 1
                    it.land.certificate_legal_info.activeUUIDCertificate = it.land.certificate_legal_info.dataCertificate[indexLength]?.activeUUIDCertificateL ?? "";
                  }
                  else {
                    let cdqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map(cdqd => {
                      if (cdqd.uuIdCtxdGcnQsh === cdqd_active) {
                        cdqd.certificate_legal_info.dataCertificate = cdqd.certificate_legal_info.dataCertificate.filter(cre => cre.activeUUIDCertificateL !== action.payload)
                        const indexLength = cdqd.certificate_legal_info.dataCertificate.length - 1
                        cdqd.certificate_legal_info.activeUUIDCertificate = cdqd.certificate_legal_info.dataCertificate[indexLength]?.activeUUIDCertificateL ?? "";
                      }
                      return { ...cdqd }
                    })
                  }

                }
                return { ...it }
              })
            }
            return { ...i }
          })
        }
        return { ...col }
      })
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string,
        uuidActiveSubtype: string,
        uuidActiveitems: string,
      }
    ) {
      return { payload, meta };
    },
  },
  removeCollaretalCertificateMarketApproval: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string, string,
      {
        uuidActiveData: string,
        uuidActiveSubtype: string,
        uuidActiveitems: string,
      }>) {
      state.storageApproval.collateral.data.map(col => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map(i => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map(it => {
                if (it.activeUUID === action.meta.uuidActiveitems) {
                  // delete market certificates
                  it.market.maket_certificates = it.market.maket_certificates.filter(mar => mar.uuid_maket_certificate !== action.payload)
                  it.maketActiveUuid = it.market.maket_certificates[it.market.maket_certificates.length - 1]?.uuid_maket_certificate ?? ""
                }
                return { ...it }
              })
            }
            return { ...i }
          })
        }
        return { ...col }
      })
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string,
        uuidActiveSubtype: string,
        uuidActiveitems: string,
      }
    ) {
      return { payload, meta };
    },
  },

  setOnChangeCollaretalCertificateUserListLegalApproval: {  // use list legal onchange
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string, string,
      {
        uuidActiveData: string,
        uuidActiveSubtype: string,
        uuidActiveitems: string,
        uuidActiveCer: string,
      }>) {
      state.storageApproval.collateral.data.map(col => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {
                let typeLand = it.type_land;
                if (it.activeUUID === action.meta.uuidActiveitems) {
                  if (typeLand === ETypeLandName.LAND) {
                    it.land.certificate_legal_info.dataCertificate.map((cre) => {
                      if (
                        cre.activeUUIDCertificateL === action.meta.uuidActiveCer
                      ) {
                        cre.activeUUIDUserListLegal = action.payload;
                      }
                      return { ...cre };
                    });
                  } else {
                    let cgqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((cgqd) => {
                      if (cgqd.uuIdCtxdGcnQsh === cgqd_active) {
                        cgqd.certificate_legal_info.dataCertificate.map(
                          (cre) => {
                            if (
                              cre.activeUUIDCertificateL ===
                              action.meta.uuidActiveCer
                            ) {
                              cre.activeUUIDUserListLegal = action.payload;
                            }
                            return { ...cre };
                          }
                        );
                      }
                      return { ...cgqd };
                    });
                  }
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
        uuidActiveCer: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setOnChangeCollaretalCertificateUserListLegalDataApproval: {
    // use list legal onchangeData
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
          uuidActiveCer: string;
          uuidActiceUseList: string;
          key: keyof ICertificateLegalInfoDataUserList;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuidActiveData) {
            col.sub_type = col.sub_type.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
                i.items = i.items?.map((it) => {
                  let typeLand = it.type_land;
                  if (it.activeUUID === action.meta.uuidActiveitems) {
                    if (typeLand === ETypeLandName.LAND) {
                      it.land.certificate_legal_info.dataCertificate = it.land.certificate_legal_info.dataCertificate?.map(dd => {

                        if (dd.activeUUIDCertificateL === action.meta.uuidActiveCer) {
                          return {
                            ...dd,
                            [action.meta.key]: action.payload
                          }
                        }
                        return { ...dd }
                      });
                    } else {
                      let cgqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;

                      it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((cgqd) => {

                        if (cgqd.uuIdCtxdGcnQsh === cgqd_active) {
                          const _activeUUIDCertificate = cgqd.certificate_legal_info.activeUUIDCertificate;
                          cgqd.certificate_legal_info.dataCertificate = cgqd.certificate_legal_info.dataCertificate.map(dc => {
                            if (dc.activeUUIDCertificateL === _activeUUIDCertificate) {
                              return {
                                ...dc,
                                [action.meta.key]: action.payload
                              }
                            }
                            return { ...dc }
                          })
                        }
                        return { ...cgqd };
                      });
                    }
                  }
                  return { ...it };
                });
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: string | number | null,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
        uuidActiveCer: string;
        uuidActiceUseList: string;
        key: keyof ICertificateLegalInfoDataUserList;
      }
    ) {
      return { payload, meta };
    },
  },

  setActiveUuidLandInformationAssetTypeApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuIdData: string;
          uuIdSubtype: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuIdData) {
          col.sub_type.map((i) => {
            let uuidItemActive = i.uuidItemsActive;

            if (i.uuidActiveSubtype === action.meta.uuIdSubtype) {
              i.items?.map((it) => {
                if (it.activeUUID === uuidItemActive) {
                  it.land.land_legal_infomation_asset.activeUUIDCertificateUsePurposes =
                    action.payload;
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuIdData: string;
        uuIdSubtype: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setLandInformationAssetTypeApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          uuIdData: string;
          uuIdSubtype: string;
          key: keyof ILandAssetType;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuIdData) {
            col.sub_type = col.sub_type.map((i) => {
              let uuidItemActive = i.uuidItemsActive;

              if (i.uuidActiveSubtype === action.meta.uuIdSubtype) {
                i.items = i.items?.map((it) => {
                  if (it.activeUUID === uuidItemActive) {
                    let uuidCertificateUsePurposes =
                      it.land.land_legal_infomation_asset.activeUUIDCertificateUsePurposes;

                    it.land.land_legal_infomation_asset.land_asset_types = it.land.land_legal_infomation_asset.land_asset_types.map(
                      (at) => {
                        if (at.activeUUIDCertificateUsePurposes === uuidCertificateUsePurposes) {
                          return {
                            ...at,
                            [action.meta.key]: action.payload,
                          };
                        }
                        return { ...at };
                      }
                    );
                  }
                  return { ...it };
                });
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: string | number | null,
      meta: {
        uuIdData: string;
        uuIdSubtype: string;
        key: keyof ILandAssetType;
      }
    ) {
      return { payload, meta };
    },
  },

  // Thông tin đẩt
  addLandInformationAssetApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        { uuidData: string; uuidSubType: string }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidSubType) {
              const activeUUID = i.uuidItemsActive;
              i.items.map((it) => {
                if (it.activeUUID === activeUUID) {
                  let uuId = generateUUID();
                  it.land.land_legal_infomation_asset.land_asset_types.push({
                    ...generateEmptyDatacertificateUsePurposes(),
                    activeUUIDCertificateUsePurposes: uuId,
                  });
                  it.land.land_legal_infomation_asset.activeUUIDCertificateUsePurposes = uuId;
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(payload: string, meta: { uuidData: string; uuidSubType: string }) {
      return { payload, meta };
    },
  },

  onChangeLandInformationAssetApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        { uuidData: string; uuidSubType: string }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidSubType) {
              const activeUUID = i.uuidItemsActive;
              i.items.map((it) => {
                if (it.activeUUID === activeUUID) {
                  it.land.land_legal_infomation_asset.activeUUIDCertificateUsePurposes = action.payload;
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(payload: string, meta: { uuidData: string; uuidSubType: string }) {
      return { payload, meta };
    },
  },

  /**
   * Action set data field info land asset
   * Action payload -> field names
   * 
   */
  setLandInformationAssetDataApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        { uuidData: string; uuidSubType: string, key: keyof ICertificateUsePurposes }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidSubType) {
              const activeUUID = i.uuidItemsActive;
              i.items.map((it) => {
                if (it.activeUUID === activeUUID) {
                  it.land.land_legal_infomation_asset.land_asset_types = it.land.land_legal_infomation_asset.land_asset_types.map(
                    (latd) => {
                      let uuidActiveLandAssetType = it.land.land_legal_infomation_asset.activeUUIDCertificateUsePurposes;
                      if (latd.activeUUIDCertificateUsePurposes === uuidActiveLandAssetType) {
                        return {
                          ...latd,
                          [action.meta.key]: action.payload,
                        }
                      }
                      return { ...latd }
                    }
                  );
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string | number | null,
      meta: {
        uuidData: string;
        uuidSubType: string;
        key: keyof ICertificateUsePurposes
      }) {
      return { payload, meta };
    },
  },

  /**
   *  Action remove land asset
   *  action payload -> uuid active land asset
   * 
   */
  removeLandInformationAssetApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        { uuidData: string; uuidSubType: string }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidSubType) {
              const activeUUID = i.uuidItemsActive;
              i.items.map((it) => {
                if (it.activeUUID === activeUUID) {

                  it.land.land_legal_infomation_asset.land_asset_types = it.land.land_legal_infomation_asset.land_asset_types.filter(lat =>
                    lat.activeUUIDCertificateUsePurposes !== action.payload
                  )
                  const index = it.land.land_legal_infomation_asset.land_asset_types.length - 1
                  it.land.land_legal_infomation_asset.activeUUIDCertificateUsePurposes = it.land.land_legal_infomation_asset.land_asset_types[index]?.activeUUIDCertificateUsePurposes ?? "";
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(payload: string, meta: { uuidData: string; uuidSubType: string }) {
      return { payload, meta };
    },
  },

  //////////CTXD trên đất ///////////
  addLandCTXDApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItems: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidSubType) {
              i.items.map((it) => {
                if (it.activeUUID === action.meta.uuidItems) {
                  const activeLandCTXD = generateUUID();
                  const typeLand = it.type_land;

                  if (typeLand === ETypeLandName.CTXD_LAND) {
                    it.ctxd_land.activeCTXDLand = activeLandCTXD;
                    it.ctxd_land.dataCTXDLand.push({
                      ...generateEmptyDataCollateralSubTypeLandCTXD(),
                      activeUUIDCTXDLand: activeLandCTXD,
                    });
                  }

                  if (typeLand === ETypeLandName.CTXD_GCN) {

                  }
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: { uuidData: string; uuidSubType: string; uuidItems: string }
    ) {
      return { payload, meta };
    },
  },

  removeLandCTXDApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItems: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidSubType) {

              i.items.map((it) => {
                if (it.activeUUID === action.meta.uuidItems) {
                  const typeLand = it.type_land;

                  if (typeLand === ETypeLandName.CTXD_LAND) {
                    it.ctxd_land.dataCTXDLand = it.ctxd_land.dataCTXDLand.filter(
                      (cl) => cl.activeUUIDCTXDLand !== action.payload
                    )
                    const index = it.ctxd_land.dataCTXDLand.length - 1
                    it.ctxd_land.activeCTXDLand = it.ctxd_land.dataCTXDLand[index]?.activeUUIDCTXDLand ?? "";
                  }

                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: { uuidData: string; uuidSubType: string; uuidItems: string }
    ) {
      return { payload, meta };
    },
  },

  onChangeHorizonListLandCTXDApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItems: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidSubType) {
              i.items.map((it) => {
                if (it.activeUUID === action.meta.uuidItems) {
                  let typeLand = it.type_land;

                  if (typeLand === ETypeLandName.CTXD_LAND) {
                    it.ctxd_land.activeCTXDLand = action.payload;
                  }

                  if (typeLand === ETypeLandName.CTXD_GCN) {
                    let cgqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((cgqd) => {
                      if (cgqd.uuIdCtxdGcnQsh === cgqd_active) {
                        cgqd.ctxd_gcn_qsh_land_info.activeCTXDLand = action.payload;
                      }
                      return { ...cgqd };
                    });
                  }
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: { uuidData: string; uuidSubType: string; uuidItems: string }
    ) {
      return { payload, meta };
    },
  },

  setDataLandCTXDApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItems: string;
          uuidCTXDLand: string;
          key: keyof ICTXDLandData;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuidData) {
            col.sub_type = col.sub_type.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuidSubType) {
                i.items = i.items.map((it) => {
                  if (it.activeUUID === action.meta.uuidItems) {
                    let typeLand = it.type_land;

                    if (typeLand === ETypeLandName.CTXD_LAND) {
                      it.ctxd_land.dataCTXDLand = it.ctxd_land.dataCTXDLand.map(
                        (ct) => {
                          if (
                            ct.activeUUIDCTXDLand === action.meta.uuidCTXDLand
                          ) {
                            return {
                              ...ct,
                              [action.meta.key]: action.payload,
                            };
                          }
                          return { ...ct };
                        }
                      );
                    }

                    if (typeLand === ETypeLandName.CTXD_GCN) {
                      let cgqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;

                      it.ctxd_gcn_qsh.ctxd_gcn_qsh_data = it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map(
                        (cgqd) => {
                          if (cgqd.uuIdCtxdGcnQsh === cgqd_active) {
                            cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand = {
                              ...cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand,
                              [action.meta.key]: action.payload,
                            }
                          }
                          return { ...cgqd };
                        }
                      );
                    }
                  }
                  return { ...it };
                });
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: string | number | null,
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItems: string;
        uuidCTXDLand: string;
        key: keyof ICTXDLandData;
      }
    ) {
      return { payload, meta };
    },
  },

  setDataLandCTXDLocationApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        Pick<ILOANNormalStorageAddress, "province" | "district" | "ward">,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItems: string;
          uuidCTXDLand: string;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuidData) {
            col.sub_type = col.sub_type.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuidSubType) {
                i.items = i.items.map((it) => {
                  if (it.activeUUID === action.meta.uuidItems) {
                    let typeLand = it.type_land;

                    if (typeLand === ETypeLandName.CTXD_LAND) {
                      it.ctxd_land.dataCTXDLand = it.ctxd_land.dataCTXDLand.map(
                        (ct) => {
                          if (
                            ct.activeUUIDCTXDLand === action.meta.uuidCTXDLand
                          ) {
                            ct = {
                              ...ct,
                              provice: action.payload.province,
                              district: action.payload.district,
                              ward: action.payload.ward,
                            };
                            return {
                              ...ct,
                            };
                          }
                          return { ...ct };
                        }
                      );
                    }

                    if (typeLand === ETypeLandName.CTXD_GCN) {
                      let cgqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;

                      it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((cgqd) => {
                        if (cgqd.uuIdCtxdGcnQsh === cgqd_active) {
                          cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.provice = action.payload.province;
                          cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.district = action.payload.district;
                          cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.ward = action.payload.ward;
                        }
                        return { ...cgqd };
                      });
                    }
                  }
                  return { ...it };
                });
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: Pick<
        ILOANNormalStorageAddress,
        "province" | "district" | "ward"
      >,
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItems: string;
        uuidCTXDLand: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setDataLandCTXDLocationCertificateApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        Pick<ILOANNormalStorageAddress, "province" | "district" | "ward">,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItems: string;
          uuidCTXDLand: string;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuidData) {
            col.sub_type = col.sub_type.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuidSubType) {
                i.items = i.items.map((it) => {
                  if (it.activeUUID === action.meta.uuidItems) {
                    let typeLand = it.type_land;

                    if (typeLand === ETypeLandName.CTXD_LAND) {
                      it.ctxd_land.dataCTXDLand = it.ctxd_land.dataCTXDLand.map(
                        (ct) => {
                          if (
                            ct.activeUUIDCTXDLand === action.meta.uuidCTXDLand
                          ) {
                            ct = {
                              ...ct,
                              certificate_province: action.payload.province,
                              certificate_district: action.payload.district,
                              certificate_ward: action.payload.ward,
                            };
                            return {
                              ...ct,
                            };
                          }
                          return { ...ct };
                        }
                      );
                    }

                    if (typeLand === ETypeLandName.CTXD_GCN) {
                      let cgqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;

                      it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((cgqd) => {
                        if (cgqd.uuIdCtxdGcnQsh === cgqd_active) {
                          cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.certificate_province = action.payload.province;
                          cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.certificate_district = action.payload.district;
                          cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.certificate_ward = action.payload.ward;
                        }
                        return { ...cgqd };
                      });
                    }
                  }
                  return { ...it };
                });
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: Pick<
        ILOANNormalStorageAddress,
        "province" | "district" | "ward"
      >,
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItems: string;
        uuidCTXDLand: string;
      }
    ) {
      return { payload, meta };
    },
  },

  //////////Loại CTXD trên đất ///////////
  addLandCTXDTypeApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItems: string;
          uuidCTXDLand: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidSubType) {
              i.items.map((it) => {
                if (it.activeUUID === action.meta.uuidItems) {
                  let typeLand = it.type_land;

                  if (typeLand === ETypeLandName.CTXD_LAND) {
                    it.ctxd_land.dataCTXDLand.map((ct) => {
                      if (ct.activeUUIDCTXDLand === action.meta.uuidCTXDLand) {
                        const activeTypeCTXD = generateUUID();
                        ct.activeUUIDtypeCTXD = activeTypeCTXD;
                        ct.dataTypeCTXD.push({
                          ...generateEmptyDataCollateralSubTypeCTXD(),
                          activeTypeCTXD: activeTypeCTXD,
                        });
                      }
                      return { ...ct };
                    });
                  }

                  if (typeLand === ETypeLandName.CTXD_GCN) {
                    let cgqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;

                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((cgqd) => {
                      if (cgqd.uuIdCtxdGcnQsh === cgqd_active) {
                        const activeTypeCTXD = generateUUID();

                        cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.activeUUIDtypeCTXD = activeTypeCTXD;
                        cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.dataTypeCTXD.push({
                          ...generateEmptyDataCollateralSubTypeCTXD(),
                          activeTypeCTXD: activeTypeCTXD,
                        });
                      }
                      return { ...cgqd };
                    });
                  }
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItems: string;
        uuidCTXDLand: string;
      }
    ) {
      return { payload, meta };
    },
  },

  /**
   *  Xóa loại công trình xây dựng
   * action payload => uuid delete
   * 
   */
  removeLandCTXDTypeApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItems: string;
          uuidCTXDLand: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidSubType) {
              i.items.map((it) => {
                if (it.activeUUID === action.meta.uuidItems) {
                  let typeLand = it.type_land;

                  if (typeLand === ETypeLandName.CTXD_LAND) {
                    it.ctxd_land.dataCTXDLand.map((ct) => {
                      if (ct.activeUUIDCTXDLand === action.meta.uuidCTXDLand) {
                        ct.dataTypeCTXD = ct.dataTypeCTXD.filter(t => t.activeTypeCTXD !== action.payload)
                        ct.activeUUIDtypeCTXD = ct.dataTypeCTXD[ct.dataTypeCTXD.length - 1]?.activeTypeCTXD ?? ""
                      }
                      return { ...ct };
                    });
                  }

                  if (typeLand === ETypeLandName.CTXD_GCN) {
                    let cgqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;

                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((cgqd) => {
                      if (cgqd.uuIdCtxdGcnQsh === cgqd_active) {
                        cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.dataTypeCTXD = cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.dataTypeCTXD.filter(
                          t => t.activeTypeCTXD !== action.payload
                        )
                        const index = cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.dataTypeCTXD.length - 1
                        cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.activeUUIDtypeCTXD = cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.dataTypeCTXD[index]?.activeTypeCTXD ?? ""
                      }
                      return { ...cgqd };
                    });
                  }
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItems: string;
        uuidCTXDLand: string;
      }
    ) {
      return { payload, meta };
    },
  },

  onChangeHorizonListLandCTXDTypeApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItems: string;
          uuidCTXDLand: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidSubType) {
              i.items.map((it) => {
                if (it.activeUUID === action.meta.uuidItems) {
                  let typeLand = it.type_land;

                  if (typeLand === ETypeLandName.CTXD_LAND) {
                    it.ctxd_land.dataCTXDLand.map((ctType) => {
                      if (
                        ctType.activeUUIDCTXDLand === action.meta.uuidCTXDLand
                      ) {
                        ctType.activeUUIDtypeCTXD = action.payload;
                      }
                      return { ...ctType };
                    });
                  }

                  // if (typeLand === ETypeLandName.CTXD_GCN) {
                  //   let cgqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;

                  //   it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((cgqd) => {
                  //     if (cgqd.uuIdCtxdGcnQsh === cgqd_active) {
                  //       cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.map((ctType) => {
                  //         if (
                  //           ctType.activeUUIDCTXDLand ===
                  //           action.meta.uuidCTXDLand
                  //         ) {
                  //           ctType.activeUUIDtypeCTXD = action.payload;
                  //         }
                  //         return { ...ctType };
                  //       });
                  //     }
                  //     return { ...cgqd };
                  //   });
                  // }
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItems: string;
        uuidCTXDLand: string;
      }
    ) {
      return { payload, meta };
    },
  },

  onChangeLandCTXDTypeApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItems: string;
          uuidCTXDLand: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidSubType) {
              i.items.map((it) => {
                if (it.activeUUID === action.meta.uuidItems) {
                  let typeLand = it.type_land;

                  if (typeLand === ETypeLandName.CTXD_LAND) {
                    it.ctxd_land.dataCTXDLand.map((ct) => {
                      ct.activeUUIDtypeCTXD = action.payload;
                      return { ...ct };
                    });
                  }

                  if (typeLand === ETypeLandName.CTXD_GCN) {
                    let cgqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;

                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((cgqd) => {
                      if (cgqd.uuIdCtxdGcnQsh === cgqd_active) {
                        cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.activeUUIDtypeCTXD = action.payload;
                      }
                      return { ...cgqd };
                    });
                  }
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItems: string;
        uuidCTXDLand: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setDataLandCTXDTypeApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItems: string;
          uuidCTXDLand: string;
          uuidCTXDLandType: string;
          key: keyof ITypeCTXD;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuidData) {
            col.sub_type = col.sub_type.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuidSubType) {
                i.items = i.items.map((it) => {
                  if (it.activeUUID === action.meta.uuidItems) {
                    let typeLand = it.type_land;

                    if (typeLand === ETypeLandName.CTXD_LAND) {
                      it.ctxd_land.dataCTXDLand = it.ctxd_land.dataCTXDLand.map(
                        (ct) => {
                          if (
                            ct.activeUUIDCTXDLand === action.meta.uuidCTXDLand
                          ) {
                            ct.dataTypeCTXD = ct.dataTypeCTXD.map((ctType) => {
                              if (
                                ctType.activeTypeCTXD ===
                                action.meta.uuidCTXDLandType
                              ) {
                                return {
                                  ...ctType,
                                  [action.meta.key]: action.payload,
                                };
                              }
                              return { ...ctType };
                            });
                          }
                          return { ...ct };
                        }
                      );
                    }

                    if (typeLand === ETypeLandName.CTXD_GCN) {
                      let cgqd_active = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;

                      it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((cgqd) => {
                        if (cgqd.uuIdCtxdGcnQsh === cgqd_active) {
                          cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.dataTypeCTXD = cgqd.ctxd_gcn_qsh_land_info.dataCTXDLand.dataTypeCTXD.map(
                            (ctType) => {
                              if (
                                ctType.activeTypeCTXD ===
                                action.meta.uuidCTXDLandType
                              ) {
                                return {
                                  ...ctType,
                                  [action.meta.key]: action.payload,
                                };
                              }
                              return { ...ctType };
                            }
                          );
                        }
                        return { ...cgqd };
                      });
                    }
                  }
                  return { ...it };
                });
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: string | number | null,
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItems: string;
        uuidCTXDLand: string;
        uuidCTXDLandType: string;
        key: keyof ITypeCTXD;
      }
    ) {
      return { payload, meta };
    },
  },

  /**
   * @todo: CTXD có GCN QSH riêng
   */
  addLandGcnQshApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidData: string;
          uuidSubType: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidSubType) {
              let uuidItemActive = i.uuidItemsActive;
              i.items.map((it) => {
                if (it.activeUUID === uuidItemActive) {
                  const uuId = generateUUID();
                  it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh = uuId;
                  it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.push({
                    ...generateEmptyDataCtxdGcnQshData(),
                    uuIdCtxdGcnQsh: uuId,
                  });
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(payload: string, meta: { uuidData: string; uuidSubType: string }) {
      return { payload, meta };
    },
  },

  deleteLandGcnQshApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidData: string;
          uuidSubType: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidSubType) {
              let uuidItemActive = i.uuidItemsActive;
              i.items.map((it) => {
                if (it.activeUUID === uuidItemActive) {
                  it.ctxd_gcn_qsh.ctxd_gcn_qsh_data = it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.filter(
                    gq => gq.uuIdCtxdGcnQsh !== action.payload
                  );
                  it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh =
                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data[it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.length - 1]?.uuIdCtxdGcnQsh ?? "";
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(payload: string, meta: { uuidData: string; uuidSubType: string }) {
      return { payload, meta };
    },
  },

  setUuidActiveLandGcnQshApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidData: string;
          uuidSubType: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidSubType) {
              let uuidItemActive = i.uuidItemsActive;
              i.items.map((it) => {
                if (it.activeUUID === uuidItemActive) {
                  it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh = action.payload;
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(payload: string, meta: { uuidData: string; uuidSubType: string }) {
      return { payload, meta };
    },
  },



  setMaketInfomationApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        { uuIdData: string; uuIdSubtype: string; key: keyof IMaketInfo }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data?.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuIdData) {
            col.sub_type?.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuIdSubtype) {
                const activeUUIDType = i.uuidItemsActive;
                i.items?.map((iq) => {
                  if (iq.activeUUID === activeUUIDType) {
                    return (iq.market.maket_info = {
                      ...iq.market.maket_info,
                      [action.meta.key]: action.payload,
                    });
                  }
                  return { ...iq };
                });
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: string | number | null,
      meta: { uuIdData: string; uuIdSubtype: string; key: keyof IMaketInfo }
    ) {
      return { payload, meta };
    },
  },

  setOnChangeCollaretalCertificateMaketApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {
                if (it.activeUUID === action.meta.uuidActiveitems) {
                  it.maketActiveUuid = action.payload;
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
      }
    ) {
      return { payload, meta };
    },
  },

  addCollaretalCertificateMaketApproval: {
    // use list legal
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {
                const activeUseListLegal = generateUUID();
                it.maketActiveUuid = activeUseListLegal;
                if (it.activeUUID === action.meta.uuidActiveitems) {
                  it.market.maket_certificates.push({
                    ...generateEmptyDataMaketCertificates(),
                    uuid_maket_certificate: activeUseListLegal,
                  });
                }


                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
      }
    ) {
      return { payload, meta };
    },
  },

  addCollaretalCertificateMaketPersionListLegalApproval: {
    // use list legal
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
          uuidActiveCer: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {
                if (it.activeUUID === action.meta.uuidActiveitems) {

                  it.market.maket_certificates.map((cre) => {
                    if (
                      cre.uuid_maket_certificate === action.meta.uuidActiveCer
                    ) {
                      // cre.uuid_active_persion = activePersion;
                      // cre.persons.push({
                      //   ...generateEmptyDataMaketCertificatePersion(),
                      //   person_uuid: activePersion,
                      // });
                    }
                    return { ...cre };
                  });
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
        uuidActiveCer: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setOnChangeCollaretalCertificateMaketPersionListLegalApproval: {
    // use list legal onchange
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
          uuidActiveCer: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {
                if (it.activeUUID === action.meta.uuidActiveitems) {
                  // it.maket.maket_certificates.map((mc) => {
                  //   if (
                  //     mc.uuid_maket_certificate === action.meta.uuidActiveCer
                  //   ) {
                  //     mc.uuid_active_persion = action.payload;
                  //   }
                  //   return { ...mc };
                  // });
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
        uuidActiveCer: string;
      }
    ) {
      return { payload, meta };
    },
  },

  // Maket persion
  setOnChangeCollaretalCertificateMaketPersionListLegalDataApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
          uuidActiveCer: string;
          key: keyof IMaketCertificates;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuidActiveData) {
            col.sub_type = col.sub_type.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
                i.items = i.items?.map((it) => {
                  if (it.activeUUID === action.meta.uuidActiveitems) {
                    it.market.maket_certificates = it.market.maket_certificates?.map((mc) => {
                      if (
                        mc.uuid_maket_certificate === action.meta.uuidActiveCer
                      ) {
                        return {
                          ...mc,
                          [action.meta.key]: action.payload
                        }
                      }
                      return { ...mc };
                    });
                  }
                  return { ...it };
                });
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: string | number | null,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
        uuidActiveCer: string;
        key: keyof IMaketCertificates;
      }
    ) {
      return { payload, meta };
    },
  },


  setCollaretalCertificateDepartmentApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
          key: keyof IDepartment
        }
      >
    ) {
      state.storageApproval.collateral.data?.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type?.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {
                if (it.activeUUID === action.meta.uuidActiveitems) {
                  it.department = {
                    ...it.department,
                    [action.meta.key]: action.payload
                  }
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
        key: keyof IDepartment
      }
    ) {
      return { payload, meta };
    },
  },

  setOnChangeCollaretalCertificateDepartmentApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {
                if (it.activeUUID === action.meta.uuidActiveitems) {
                  it.departmentActiveUUID = action.payload;
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
      }
    ) {
      return { payload, meta };
    },
  },

  addCollaretalCertificateDepartmentPersonListLegalApproval: {
    // use list legal
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
          uuidActiveCer: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {
                if (it.activeUUID === action.meta.uuidActiveitems) {

                  it.department.department_certificate_legal.map((cre) => {
                    if (
                      cre.uuid_certificate_legal === action.meta.uuidActiveCer
                    ) {
                      // cre.uuid_active_person = activePersion;
                      // cre.persons.push({
                      //   ...generateEmptyDataDepartmentCertificatesUserList(),
                      //   uuid_active_person: activePersion,
                      // });
                    }
                    return { ...cre };
                  });
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
        uuidActiveCer: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setOnChangeCollaretalCertificatDepartmentListLegalApproval: {
    // use list legal onchange
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
          uuidActiveCer: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {
                if (it.activeUUID === action.meta.uuidActiveitems) {
                  it.department.department_certificate_legal.map((mc) => {
                    if (
                      mc.uuid_certificate_legal === action.meta.uuidActiveCer
                    ) {
                      // mc.uuid_active_person = action.payload;
                    }
                    return { ...mc };
                  });
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
        uuidActiveCer: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setOnChangeCollaretalCertificateDepartmentListLegalDataApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
          uuidActiveCer: string;
          key: keyof IPersonCertificateLegal;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuidActiveData) {
            col.sub_type = col.sub_type?.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
                i.items = i.items?.map((it) => {
                  if (it.activeUUID === action.meta.uuidActiveitems) {
                    it.department.department_certificate_legal = it.department.department_certificate_legal.map(
                      de => {
                        if (de.uuid_certificate_legal === action.meta.uuidActiveCer) {
                          return {
                            ...de,
                            [action.meta.key]: action.payload
                          }
                        }
                        return { ...de }
                      }
                    );
                  }
                  return { ...it };
                });
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: string | number | null,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
        uuidActiveCer: string;
        key: keyof IPersonCertificateLegal;
      }
    ) {
      return { payload, meta };
    },
  },

  //// type BDS thong tin can ho
  addCollaretalDepartmentInfoApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {
                const activeUUID = generateUUID();
                it.departmentInfoActiveUUID = activeUUID;
                if (it.activeUUID === action.meta.uuidActiveitems) {
                  it.department.department_info.push({
                    ...generateEmptyDataDepartmentInfo(),
                    departmentInfoActiveUUID: activeUUID,
                  });
                }

                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
      }
    ) {
      return { payload, meta };
    },
  },


  removeCollaretalDepartmentInfoApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {

                if (it.activeUUID === action.meta.uuidActiveitems) {
                  it.department.department_info = it.department.department_info.filter(
                    di => di.departmentInfoActiveUUID !== action.payload
                  )
                  it.departmentInfoActiveUUID = it.department.department_info[it.department.department_info.length - 1]?.departmentInfoActiveUUID ?? "";
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setOnChangeCollaretalDepartmentInfoApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              i.items?.map((it) => {
                if (
                  it.departmentInfoActiveUUID === action.meta.uuidActiveitems
                ) {
                  it.departmentInfoActiveUUID = action.payload;
                }
                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setOnChangeCollaretalDepartmentInfoDataApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
          uuidActiveDepartment: string;
          key: keyof IDepartmentInfo;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuidActiveData) {
            col.sub_type = col.sub_type.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
                i.items = i.items.map((it) => {
                  if (it.activeUUID === action.meta.uuidActiveitems) {
                    it.department.department_info = it.department.department_info?.map((de) => {
                      if (
                        de.departmentInfoActiveUUID ===
                        action.meta.uuidActiveDepartment
                      ) {
                        return {
                          ...de,
                          [action.meta.key]: action.payload,
                        };
                      }
                      return { ...de };
                    });
                  }
                  return { ...it };
                });
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: string | number | null,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
        uuidActiveDepartment: string;
        key: keyof IDepartmentInfo;
      }
    ) {
      return { payload, meta };
    },
  },

  /// thong tin dat du an

  setLandInformationDataLocationApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        Pick<IDepartmentInfoLand, "province" | "district" | "ward">,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItem: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((d) => {
        if (d.uuidActiveData === action.meta.uuidData) {
          d.sub_type = d.sub_type.map((st) => {
            if (st.uuidActiveSubtype === action.meta.uuidSubType) {
              st.items = st.items.map((i) => {
                if (i.activeUUID === action.meta.uuidItem) {
                  i.department.department_info_land = {
                    ...i.department.department_info_land,
                    province: action.payload.province,
                    district: action.payload.district,
                    ward: action.payload.ward,
                  };
                }
                return { ...i };
              });
            }
            return { ...st };
          });
        }

        return { ...d };
      });
    },
    prepare(
      payload: Pick<IDepartmentInfoLand, "province" | "district" | "ward">,
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItem: string;
      }
    ) {
      return { payload, meta };
    },
  },
  setLandInformationDataLocationCertificateApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        Pick<ILegalLandInformatioAsset, "province" | "district" | "ward">,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItem: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((d) => {
        if (d.uuidActiveData === action.meta.uuidData) {
          d.sub_type = d.sub_type.map((st) => {
            if (st.uuidActiveSubtype === action.meta.uuidSubType) {
              st.items = st.items.map((i) => {
                if (i.activeUUID === action.meta.uuidItem) {
                  i.department.department_info_land = {
                    ...i.department.department_info_land,
                    certificate_province: action.payload.province,
                    certificate_district: action.payload.district,
                    certificate_ward: action.payload.ward,
                  };
                }
                return { ...i };
              });
            }
            return { ...st };
          });
        }

        return { ...d };
      });
    },
    prepare(
      payload: Pick<
        ILegalLandInformatioAsset,
        "province" | "district" | "ward"
      >,
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItem: string;
      }
    ) {
      return { payload, meta };
    },
  },
  setLandInformationDataApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null | string[] | number[],
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItem: string;
          key: keyof IDepartmentInfoLand;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (d) => {
          if (d.uuidActiveData === action.meta.uuidData) {
            d.sub_type = d.sub_type.map((st) => {
              if (st.uuidActiveSubtype === action.meta.uuidSubType) {
                st.items = st.items.map((i) => {
                  if (i.activeUUID === action.meta.uuidItem) {
                    i.department.department_info_land = {
                      ...i.department.department_info_land,
                      [action.meta.key]: action.payload,
                    };
                  }
                  return { ...i };
                });
              }
              return { ...st };
            });
          }
          return { ...d };
        }
      );
    },
    prepare(
      payload: string | number | null | string[] | number[],
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItem: string;
        key: keyof IDepartmentInfoLand;
      }
    ) {
      return { payload, meta };
    },
  },

  addLandCertificateInfoApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItem: string;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (d) => {
          if (d.uuidActiveData === action.meta.uuidData) {
            d.sub_type = d.sub_type.map((st) => {
              if (st.uuidActiveSubtype === action.meta.uuidSubType) {
                st.items = st.items.map((i) => {
                  if (i.activeUUID === action.meta.uuidItem) {
                    const activeUUID = generateUUID();
                    i.activeUUIDCertificateUsePurposes = activeUUID;
                    i.department.department_info_land.certificate_use_purposes.push({
                      ...generateEmptyDatacertificateUsePurposes(),
                      activeUUIDCertificateUsePurposes: activeUUID,
                    });
                  }
                  return { ...i };
                });
              }
              return { ...st };
            });
          }

          return { ...d };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItem: string;
      }
    ) {
      return { payload, meta };
    },
  },

  removeLandCertificateInfoUsePurposesApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItem: string;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (d) => {
          if (d.uuidActiveData === action.meta.uuidData) {
            d.sub_type = d.sub_type.map((st) => {
              if (st.uuidActiveSubtype === action.meta.uuidSubType) {
                st.items = st.items.map((i) => {
                  if (i.activeUUID === action.meta.uuidItem) {

                    i.department.department_info_land.certificate_use_purposes = i.department.department_info_land.certificate_use_purposes.filter(
                      cp => cp.activeUUIDCertificateUsePurposes !== action.payload
                    )
                    const index = i.department.department_info_land.certificate_use_purposes.length - 1
                    i.activeUUIDCertificateUsePurposes = i.department.department_info_land.certificate_use_purposes[index]?.activeUUIDCertificateUsePurposes ?? "";
                  }
                  return { ...i };
                });
              }
              return { ...st };
            });
          }

          return { ...d };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItem: string;
      }
    ) {
      return { payload, meta };
    },
  },

  onLandCertificateInfoApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItem: string;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (d) => {
          if (d.uuidActiveData === action.meta.uuidData) {
            d.sub_type = d.sub_type.map((st) => {
              if (st.uuidActiveSubtype === action.meta.uuidSubType) {
                st.items = st.items.map((i) => {
                  if (i.activeUUID === action.meta.uuidItem) {
                    i.activeUUIDCertificateUsePurposes = action.payload;
                  }
                  return { ...i };
                });
              }
              return { ...st };
            });
          }

          return { ...d };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItem: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setLandCertificateInfoDataApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          uuidData: string;
          uuidSubType: string;
          uuidItem: string;
          uuidCertificate: string;
          key: keyof ICertificateUsePurposes
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (d) => {
          if (d.uuidActiveData === action.meta.uuidData) {
            d.sub_type = d.sub_type.map((st) => {
              if (st.uuidActiveSubtype === action.meta.uuidSubType) {
                st.items = st.items.map((i) => {
                  if (i.activeUUID === action.meta.uuidItem) {
                    i.department.department_info_land.certificate_use_purposes = i.department.department_info_land.certificate_use_purposes.map(cre => {
                      if (cre.activeUUIDCertificateUsePurposes === action.meta.uuidCertificate) {
                        return {
                          ...cre,
                          [action.meta.key]: action.payload
                        }
                      }
                      return { ...cre }
                    })
                  }
                  return { ...i };
                });
              }
              return { ...st };
            });
          }

          return { ...d };
        }
      );
    },
    prepare(
      payload: string | number | null,
      meta: {
        uuidData: string;
        uuidSubType: string;
        uuidItem: string;
        uuidCertificate: string;
        key: keyof ICertificateUsePurposes
      }
    ) {
      return { payload, meta };
    },
  },





  ///////////////////////

  /// chọn đối tượng sở hữu tài sản
  setCollaretalOwnerTypeApproval: {

    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
          objdataLegal: ILandOwner[];
          typeOwner: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type?.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              const activeUUIDType = i.uuidItemsActive;

              i.items?.map((it) => {
                if (i.id === ESubtypeRest.MARK && it.activeUUID === activeUUIDType) {
                  let type = it.market.market_owner.owner_type;
                  it.market.market_owner.owner_type = action.payload;

                  if (type !== action.meta.typeOwner) {
                    it.market.market_owner.owner = action.meta.objdataLegal;

                  } else {
                    const listOwner = it.market.market_owner.owner;
                    const newOwner = action.meta.objdataLegal?.filter(({ person_uuid: id1 }) => !listOwner?.some(({ person_uuid: id2 }) => id2 === id1))
                    it.market.market_owner.owner = listOwner.concat(newOwner);
                  }
                }
                else if (i.id === ESubtypeRest.LAND && it.activeUUID === activeUUIDType) {
                  /**
                   * Map theo loại đất
                   * TH: Đất
                   */
                  if (it.type_land === ETypeLandName.LAND) {
                    let type = it.land.land_legal_information_owner.owner_type;
                    it.land.land_legal_information_owner.owner_type = action.payload;

                    if (type !== action.meta.typeOwner) {
                      it.land.land_legal_information_owner.owner = action.meta.objdataLegal;

                    } else {
                      const listOwner = it.land.land_legal_information_owner.owner;
                      const newOwner = action.meta.objdataLegal?.filter(({ person_uuid: id1 }) => !listOwner?.some(({ person_uuid: id2 }) => id2 === id1))
                      it.land.land_legal_information_owner.owner = listOwner.concat(newOwner);
                    }
                  }
                  /**
                   * Map theo loại đất
                   * TH: CTXD có GCN QSH riêng
                   */
                  if (it.type_land === ETypeLandName.CTXD_GCN) {
                    let uuidActiveCtxdGcnQsh = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data = it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map(
                      (cgqd) => {
                        if (cgqd.uuIdCtxdGcnQsh === uuidActiveCtxdGcnQsh) {
                          const type = cgqd.land_legal_information_owner.owner_type;
                          cgqd.land_legal_information_owner.owner_type = action.payload;

                          if (type !== action.meta.typeOwner) {
                            cgqd.land_legal_information_owner.owner = action.meta.objdataLegal
                          } else {
                            const listOwner = cgqd.land_legal_information_owner.owner;
                            const newOwner = action.meta.objdataLegal?.filter(({ person_uuid: id1 }) => !listOwner?.some(({ person_uuid: id2 }) => id2 === id1))
                            cgqd.land_legal_information_owner.owner = listOwner.concat(newOwner);
                          }

                        }
                        return { ...cgqd };
                      }
                    );
                  }
                } else if (i.id === ESubtypeRest.APPA && it.activeUUID === activeUUIDType) {
                  const type = it.department.department_owner.owner_type;
                  it.department.department_owner.owner_type = action.payload;

                  if (type !== action.meta.typeOwner) {
                    it.department.department_owner.owner = action.meta.objdataLegal
                  } else {
                    const listOwner = it.department.department_owner.owner;
                    const newOwner = action.meta.objdataLegal?.filter(({ person_uuid: id1 }) => !listOwner?.some(({ person_uuid: id2 }) => id2 === id1))
                    it.department.department_owner.owner = listOwner.concat(newOwner);
                  }
                } else if (it.activeUUID === activeUUIDType) {
                  const type = it.owner_wrapper.owner_type;
                  it.owner_wrapper.owner_type = action.payload;

                  if (type !== action.meta.typeOwner) {
                    it.owner_wrapper.owner = action.meta.objdataLegal
                  } else {
                    const listOwner = it.owner_wrapper.owner;
                    const newOwner = action.meta.objdataLegal?.filter(({ person_uuid: id1 }) => !listOwner?.some(({ person_uuid: id2 }) => id2 === id1))
                    it.owner_wrapper.owner = listOwner.concat(newOwner);
                  }
                }

                return { ...it };
              });

            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
        objdataLegal: ILandOwner[];
        typeOwner: string;
      }
    ) {
      return { payload, meta };
    },
  },


  /// set người sở hữu đang được chọn
  setOnChangeCollaretalActiveOwnerApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              const activeUUIDType = i.uuidItemsActive;
              i.items?.map((it) => {
                if (i.id === ESubtypeRest.MARK && it.activeUUID === activeUUIDType) {
                  it.market.market_owner.active = Number(action.payload);
                }
                else if (i.id === ESubtypeRest.LAND && it.activeUUID === activeUUIDType) {
                  /**
                   * Map theo loại đất
                   * TH: Đất
                   */
                  if (it.type_land === ETypeLandName.LAND) {
                    it.land.land_legal_information_owner.active = Number(action.payload);
                  }
                  /**
                   * Map theo loại đất
                   * TH: CTXD có GCN QSH riêng
                   */
                  if (it.type_land === ETypeLandName.CTXD_GCN) {
                    let uuidActiveCtxdGcnQsh = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data = it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map(
                      (cgqd) => {
                        if (cgqd.uuIdCtxdGcnQsh === uuidActiveCtxdGcnQsh) {
                          cgqd.land_legal_information_owner.active = Number(action.payload);
                        }
                        return { ...cgqd };
                      }
                    );
                  }
                } else if (i.id === ESubtypeRest.APPA && it.activeUUID === activeUUIDType) {
                  it.department.department_owner.active = Number(action.payload);
                }

                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
      }
    ) {
      return { payload, meta };
    },
  },

  ///// set có văn bản ủy quyền hay không

  setCollaretalInfoOwnerHasAuthorizeApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type?.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              const activeUUIDType = i.uuidItemsActive;
              i.items?.map((it) => {
                if (i.id === ESubtypeRest.MARK && it.activeUUID === activeUUIDType) {
                  if (it.market.market_owner.owner.length > 0) {
                    const activeMarket = it.market.market_owner.active;
                    it.market.market_owner.owner[activeMarket].has_authorize = action.payload
                    if (it.market.market_owner.owner[activeMarket].has_authorize === 'N') {
                      it.market.market_owner.owner[activeMarket].authorized_persons = []
                    }
                  }
                }
                else if (i.id === ESubtypeRest.LAND && it.activeUUID === activeUUIDType) {
                  /**
                   * Map theo loại đất
                   * TH: Đất
                   */
                  if (it.type_land === ETypeLandName.LAND) {
                    if (it.land.land_legal_information_owner.owner.length > 0) {
                      const activeLand = it.land.land_legal_information_owner.active;
                      it.land.land_legal_information_owner.owner[activeLand].has_authorize = action.payload
                      if (it.land.land_legal_information_owner.owner[activeLand].has_authorize === 'N') {
                        it.land.land_legal_information_owner.owner[activeLand].authorized_persons = []
                      }
                    }
                  }
                  /**
                   * Map theo loại đất
                   * TH: CTXD có GCN QSH riêng
                   */
                  if (it.type_land === ETypeLandName.CTXD_GCN) {
                    let uuidActiveCtxdGcnQsh = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data = it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map(
                      (cgqd) => {
                        if (cgqd.uuIdCtxdGcnQsh === uuidActiveCtxdGcnQsh) {
                          if (cgqd.land_legal_information_owner.owner.length > 0) {
                            const activeLand = cgqd.land_legal_information_owner.active;
                            cgqd.land_legal_information_owner.owner[activeLand].has_authorize = action.payload
                            if (cgqd.land_legal_information_owner.owner[activeLand].has_authorize === 'N') {
                              cgqd.land_legal_information_owner.owner[activeLand].authorized_persons = []
                            }
                          }
                        }
                        return { ...cgqd };
                      }
                    );
                  }
                } else if (i.id === ESubtypeRest.APPA && it.activeUUID === activeUUIDType) {
                  if (it.department.department_owner.owner.length > 0) {
                    const activeAPA = it.department.department_owner.active;
                    it.department.department_owner.owner[activeAPA].has_authorize = action.payload
                    if (it.department.department_owner.owner[activeAPA].has_authorize === 'N') {
                      it.department.department_owner.owner[activeAPA].authorized_persons = []
                    }
                  }

                }

                return { ...it };
              });

            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
      }
    ) {
      return { payload, meta };
    },
  },
  //// thêm người đồng sở hữu type đồng sở hữu
  setCollaretalOwnerModalApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          objdataLegal: ILandOwner[]

        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              const activeUUIDType = i.uuidItemsActive;

              i.items?.map((it) => {
                if (i.id === ESubtypeRest.MARK && it.activeUUID === activeUUIDType) {
                  it.market.market_owner.owner = action.meta.objdataLegal;
                }
                else if (i.id === ESubtypeRest.LAND && it.activeUUID === activeUUIDType) {
                  /**
                   * Map theo loại đất
                   * TH: Đất
                   */
                  if (it.type_land === ETypeLandName.LAND) {
                    it.land.land_legal_information_owner.owner = action.meta.objdataLegal;

                  }
                  /**
                   * Map theo loại đất
                   * TH: CTXD có GCN QSH riêng
                   */
                  if (it.type_land === ETypeLandName.CTXD_GCN) {
                    let uuidActiveCtxdGcnQsh = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data = it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map(
                      (cgqd) => {
                        if (cgqd.uuIdCtxdGcnQsh === uuidActiveCtxdGcnQsh) {
                          cgqd.land_legal_information_owner.owner = action.meta.objdataLegal
                        }
                        return { ...cgqd };
                      }
                    );
                  }
                } else if (i.id === ESubtypeRest.APPA && it.activeUUID === activeUUIDType) {
                  it.department.department_owner.owner = action.meta.objdataLegal

                } else if (it.activeUUID === activeUUIDType) {
                  it.owner_wrapper.owner = action.meta.objdataLegal
                }

                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        objdataLegal: ILandOwner[]
      }
    ) {
      return { payload, meta };
    },
  },

  /////// thêm người được ủy quyền
  setCollaretalHasAuthorApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          objdataLegal: IInfoAuthorize[];
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              const activeUUIDType = i.uuidItemsActive;

              i.items?.map((it) => {
                if (i.id === ESubtypeRest.MARK && it.activeUUID === activeUUIDType) {
                  const active = it.market.market_owner.active;
                  it.market.market_owner.owner[active].authorized_persons = action.meta.objdataLegal;
                }
                else if (i.id === ESubtypeRest.LAND && it.activeUUID === activeUUIDType) {
                  /**
                   * Map theo loại đất
                   * TH: Đất
                   */
                  if (it.type_land === ETypeLandName.LAND) {
                    const active = it.land.land_legal_information_owner.active;
                    it.land.land_legal_information_owner.owner[active].authorized_persons = action.meta.objdataLegal;
                  }
                  /**
                   * Map theo loại đất
                   * TH: CTXD có GCN QSH riêng
                   */
                  if (it.type_land === ETypeLandName.CTXD_GCN) {
                    let uuidActiveCtxdGcnQsh = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data = it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map(
                      (cgqd) => {
                        if (cgqd.uuIdCtxdGcnQsh === uuidActiveCtxdGcnQsh) {
                          const active = cgqd.land_legal_information_owner.active
                          cgqd.land_legal_information_owner.owner[active].authorized_persons = action.meta.objdataLegal;

                        }
                        return { ...cgqd };
                      }
                    );
                  }
                } else if (i.id === ESubtypeRest.APPA && it.activeUUID === activeUUIDType) {
                  const active = it.department.department_owner.active;
                  it.department.department_owner.owner[active].authorized_persons = action.meta.objdataLegal;

                }

                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        objdataLegal: IInfoAuthorize[];
      }
    ) {
      return { payload, meta };
    },
  },

  /// người ủy quyền được chọn
  setOnChangeCollaretalActiveHasAuthorApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              const activeUUIDType = i.uuidItemsActive;
              i.items?.map((it) => {
                if (i.id === ESubtypeRest.MARK && it.activeUUID === activeUUIDType) {
                  const active = it.market.market_owner.active;
                  it.market.market_owner.owner[active].active = Number(action.payload);
                }
                else if (i.id === ESubtypeRest.LAND && it.activeUUID === activeUUIDType) {
                  /**
                   * Map theo loại đất
                   * TH: Đất
                   */
                  if (it.type_land === ETypeLandName.LAND) {
                    const active = it.land.land_legal_information_owner.active;
                    it.land.land_legal_information_owner.owner[active].active = Number(action.payload);
                  }
                  /**
                 * Map theo loại đất
                 * TH: CTXD có GCN QSH riêng
                 */
                  if (it.type_land === ETypeLandName.CTXD_GCN) {
                    let uuidActiveCtxdGcnQsh = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data = it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map(
                      (cgqd) => {
                        if (cgqd.uuIdCtxdGcnQsh === uuidActiveCtxdGcnQsh) {
                          const active = cgqd.land_legal_information_owner.active
                          cgqd.land_legal_information_owner.owner[active].active = Number(action.payload);
                        }
                        return { ...cgqd };
                      }
                    );
                  }
                } else if (i.id === ESubtypeRest.APPA && it.activeUUID === activeUUIDType) {
                  /**
                   * Map theo chung cư
                   */
                  const active = it.department.department_owner.active;
                  it.department.department_owner.owner[active].active = Number(action.payload);
                }

                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
      }
    ) {
      return { payload, meta };
    },
  },
  /// set dữ liệu của người đượ ủy quyền
  setOnChangeCollaretalDetailHasAuthorApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          key: keyof IInfoAuthorize;
        }
      >
    ) {
      state.storageApproval.collateral.data.map((col) => {
        if (col.uuidActiveData === action.meta.uuidActiveData) {
          col.sub_type.map((i) => {
            if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
              const activeUUIDType = i.uuidItemsActive;
              i.items?.map((it) => {
                if (i.id === ESubtypeRest.MARK && it.activeUUID === activeUUIDType) {
                  const active = it.market.market_owner.active;
                  const activeHasAuthor = it.market.market_owner.owner[active].active;
                  it.market.market_owner.owner[active].authorized_persons[activeHasAuthor] = {
                    ...it.market.market_owner.owner[active].authorized_persons[activeHasAuthor],
                    [action.meta.key]: action.payload

                  };

                }
                else if (i.id === ESubtypeRest.LAND && it.activeUUID === activeUUIDType) {
                  /**
                   * Map theo loại đất
                   * TH: Đất
                   */
                  if (it.type_land === ETypeLandName.LAND) {
                    const active = it.land.land_legal_information_owner.active;
                    const activeHasAuthor = it.land.land_legal_information_owner.owner[active].active;
                    it.land.land_legal_information_owner.owner[active].authorized_persons[activeHasAuthor] = {
                      ...it.land.land_legal_information_owner.owner[active].authorized_persons[activeHasAuthor],
                      [action.meta.key]: action.payload

                    };
                  }
                  /**
                   * Map theo loại đất
                   * TH: CTXD có GCN QSH riêng
                   */
                  if (it.type_land === ETypeLandName.CTXD_GCN) {
                    let uuidActiveCtxdGcnQsh = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                    it.ctxd_gcn_qsh.ctxd_gcn_qsh_data = it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map(
                      (cgqd) => {
                        if (cgqd.uuIdCtxdGcnQsh === uuidActiveCtxdGcnQsh) {
                          const active = cgqd.land_legal_information_owner.active
                          const activeHasAuthor = cgqd.land_legal_information_owner.owner[active].active;
                          cgqd.land_legal_information_owner.owner[active].authorized_persons[activeHasAuthor] = {
                            ...cgqd.land_legal_information_owner.owner[active].authorized_persons[activeHasAuthor],
                            [action.meta.key]: action.payload

                          };
                        }
                        return { ...cgqd };
                      }
                    );
                  }
                } else if (i.id === ESubtypeRest.APPA && it.activeUUID === activeUUIDType) {
                  const active = it.department.department_owner.active;
                  const activeHasAuthor = it.department.department_owner.owner[active].active;
                  it.department.department_owner.owner[active].authorized_persons[activeHasAuthor] = {
                    ...it.department.department_owner.owner[active].authorized_persons[activeHasAuthor],
                    [action.meta.key]: action.payload

                  };

                }

                return { ...it };
              });
            }
            return { ...i };
          });
        }
        return { ...col };
      });
    },
    prepare(
      payload: string | number | null,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        key: keyof IInfoAuthorize;
      }
    ) {
      return { payload, meta };
    },
  },

  setCollaretalCertificatePersionApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
          uuidActiveCer: string;
          listPerson: IPerson[]
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuidActiveData) {
            col.sub_type = col.sub_type.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
                i.items = i.items?.map((it) => {
                  if (i.id === ESubtypeRest.MARK && it.activeUUID === action.meta.uuidActiveitems) {
                    it.market.maket_certificates = it.market.maket_certificates?.map((mc) => {
                      if (
                        mc.uuid_maket_certificate === action.meta.uuidActiveCer
                      ) {
                        return {
                          ...mc,
                          'persons': action.meta.listPerson
                        }
                      }
                      return { ...mc };
                    });
                  } else if (i.id === ESubtypeRest.LAND && it.activeUUID === action.meta.uuidActiveitems) {
                    if (it.type_land === ETypeLandName.LAND) {
                      it.land.certificate_legal_info.dataCertificate = it.land.certificate_legal_info.dataCertificate?.map((mc) => {
                        if (
                          mc.activeUUIDCertificateL === action.meta.uuidActiveCer
                        ) {
                          return {
                            ...mc,
                            'persons': action.meta.listPerson
                          }
                        }
                        return { ...mc };
                      });
                    }
                    if (it.type_land === ETypeLandName.CTXD_GCN) {
                      let uuidActiveCtxdGcnQsh = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                      it.ctxd_gcn_qsh.ctxd_gcn_qsh_data = it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map(
                        (cgqd) => {
                          if (cgqd.uuIdCtxdGcnQsh === uuidActiveCtxdGcnQsh) {
                            cgqd.certificate_legal_info.dataCertificate = cgqd.certificate_legal_info.dataCertificate?.map((mc) => {
                              if (
                                mc.activeUUIDCertificateL === action.meta.uuidActiveCer
                              ) {
                                return {
                                  ...mc,
                                  'persons': action.meta.listPerson
                                }
                              }
                              return { ...mc };
                            });
                          }
                          return { ...cgqd };
                        }
                      );

                    }
                  } else if (i.id === ESubtypeRest.APPA && it.activeUUID === action.meta.uuidActiveitems) {
                    it.department.department_certificate_legal = it.department.department_certificate_legal?.map((mc) => {
                      if (
                        mc.uuid_certificate_legal === action.meta.uuidActiveCer
                      ) {
                        return {
                          ...mc,
                          'persons': action.meta.listPerson
                        }
                      }
                      return { ...mc };
                    });
                  }
                  return { ...it };
                });
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: string | number | null,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
        uuidActiveCer: string;
        listPerson: IPerson[];
      }
    ) {
      return { payload, meta };
    },
  },

  clearStorageCollateral(state: Draft<ILOANNormalState>) {
    state.storage.collateral_v2.carousel = []
    state.storage.collateral_v2.data = []
    state.storage.collateral_v2.ignore = 'N'
    state.storage.collateral_v2.uuidActiveData = ''
    state.storage.collateral_v2.activeType = ETypeCollateral.ALL
    state.storage.collateral_v2.originData = []

    state.storageApproval.collateral.data = []
    state.storageApproval.collateral.activeType = "ALL"
    state.storageApproval.collateral.carousel = []
    state.storageApproval.collateral.uuidActiveData = ""
  },

  

  setCollaretalCertificateApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          uuidActiveData: string;
          uuidActiveSubtype: string;
          uuidActiveitems: string;
        }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data.map(
        (col) => {
          if (col.uuidActiveData === action.meta.uuidActiveData) {
            col.sub_type = col.sub_type.map((i) => {
              if (i.uuidActiveSubtype === action.meta.uuidActiveSubtype) {
                i.items = i.items?.map((it) => {
                  if (i.id === ESubtypeRest.MARK && it.activeUUID === action.meta.uuidActiveitems) {
                    it.market.maket_certificates = [];
                  } else if (i.id === ESubtypeRest.LAND && it.activeUUID === action.meta.uuidActiveitems) {
                    if (it.type_land === ETypeLandName.LAND) {
                      it.land.certificate_legal_info.dataCertificate = []
                    }
                    if (it.type_land === ETypeLandName.CTXD_GCN) {
                      let uuidActiveCtxdGcnQsh = it.ctxd_gcn_qsh.activeUuIdCtxdGcnQsh;
                      it.ctxd_gcn_qsh.ctxd_gcn_qsh_data = it.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map(
                        (cgqd) => {
                          if (cgqd.uuIdCtxdGcnQsh === uuidActiveCtxdGcnQsh) {
                            cgqd.certificate_legal_info.dataCertificate = []
                          }
                          return { ...cgqd };
                        }
                      );

                    }
                  } else if (i.id === ESubtypeRest.APPA && it.activeUUID === action.meta.uuidActiveitems) {
                    it.department.department_certificate_legal = []
                  }
                  return { ...it };
                });
              }
              return { ...i };
            });
          }
          return { ...col };
        }
      );
    },
    prepare(
      payload: string | number | null,
      meta: {
        uuidActiveData: string;
        uuidActiveSubtype: string;
        uuidActiveitems: string;
      }
    ) {
      return { payload, meta };
    },
  },
  addSpreadSheetCollateralApproval(state: Draft<ILOANNormalState>) {
    state.storageApproval.collateral.spreadSheet.rows.push({
      ...generateSpreadSheet(),
      uuid: generateLOCALUUID()
    })
  },
  deleteSpreadSheetCollateralApproval(state: Draft<ILOANNormalState>,action: PayloadAction<string>) {},

  deleteLOCALSpreadSheetCollateralApproval(state: Draft<ILOANNormalState>,action: PayloadAction<string>) {
    state.storageApproval.collateral.spreadSheet.rows = state.storageApproval.collateral.spreadSheet.rows
    .filter(item => item.uuid !== action.payload) 
    const currentLtvUUID = state.storageApproval.collateral.spreadSheet.uuid

    state.storageApproval.collateral.lvt_log =  state.storageApproval.collateral.lvt_log.map(ltv => {
      if(ltv.uuid === currentLtvUUID){
        return {
          ...ltv,
          rows: ltv.rows.filter(item => item.uuid !== action.payload) 
        }
      }
      else return {...ltv}
    }) 

  },

  clearSpreadSheet(state: Draft<ILOANNormalState>) {
    state.storageApproval.collateral.spreadSheet = {
      title: '',
      rows: [],
      is_activated: false,
      updated_by: '',
      updated_at: null,
      updated_by_fullname:  null,
      uuid: generateLOCALUUID(),
    }
  },
  onChangeSpreadSheetCollateralApproval:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string | number | null, string, { key: keyof ILoanNormalApprovalLogRows, uuid: string; }
      >
    ) {
      state.storageApproval.collateral.spreadSheet.rows = state.storageApproval.collateral.spreadSheet?.rows?.map((item,idx)=>{
        if(item.uuid === action.meta.uuid){
          return{
            ...item,
            [action.meta.key]:action.payload,
            coll_price_cert_asset_uuid: action.meta.key === "coll_price_cert_uuid" ? action.payload?.toString() ?? "" : item.coll_price_cert_asset_uuid
          }
        }
        return { ...item }
      })

      if(action.meta.key === 'temp_calc_value' || action.meta.key === "max_ltv_value") {
        state.storageApproval.collateral.spreadSheet.rows = state.storageApproval.collateral.spreadSheet?.rows?.map((item,idx)=>{
          if(item.uuid === action.meta.uuid){
            return{
              ...item,
              max_loan_credit: formatRoundNumber(((item.temp_calc_value ?? 0) * (item.max_ltv_value ?? 0))/ 100, 0)
            }
          }
          return { ...item }
        })
      }
      if(action.meta.key === 'temp_calc_value' || action.meta.key === "safely_debit") {
        state.storageApproval.collateral.spreadSheet.rows = state.storageApproval.collateral.spreadSheet?.rows?.map((item,idx)=>{
          if(item.uuid === action.meta.uuid){
            return{
              ...item,
              ltv_value: !!item.temp_calc_value && item.temp_calc_value !== 0 ? formatRoundNumber(((item.safely_debit ?? 0) / (item.temp_calc_value ?? 0)) * 100) : 0
            }
          }
          return { ...item }
        })
      }
    },
    prepare(
      payload: string | number | null,
      meta: {
        key: keyof ILoanNormalApprovalLogRows,
        uuid: string
      }
    ) {
      return { payload, meta };
    },
  },
  onChangeDataAccept:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string | number | null, string, { key: keyof ILOANNormalApprovalAccept, uuiddata: string; }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data?.map((item,idx)=>{
        if(item.uuidActiveData === action.meta.uuiddata){
          return{
            ...item,
            [action.meta.key]:action.payload
          }
        }
        return { ...item }
      })
    },
    prepare(
      payload: string | number | null,
      meta: {
        key: keyof ILOANNormalApprovalAccept,
        uuiddata: string
      }
    ) {
      return { payload, meta };
    },
  },

  onChangeDataAcceptCurrent:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<boolean, string, {  uuiddata: string; }
      >
    ) {
      state.storageApproval.collateral.data = state.storageApproval.collateral.data?.map((item,idx)=>{
        if(item.uuidActiveData === action.meta.uuiddata){
          item.is_accept = action.payload
        }
        return { ...item }
      })
    },
    prepare(
      payload: boolean,
      meta: {
        uuiddata: string
      }
    ) {
      return { payload, meta };
    },
  },

  setEditLogs:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string, {  uuid: string; }
      >
    ) {
      const dataLog = state.storageApproval.collateral?.lvt_log?.find(item => item.uuid ===  action.meta.uuid)
      if(dataLog){
        state.storageApproval.collateral.spreadSheet =  {
          ...dataLog,
        }
      }
      

    },
    prepare(
      payload: string,
      meta: {
        uuid: string
      }
    ) {
      return { payload, meta };
    },
  },
  updateDataLogs(state: Draft<ILOANNormalState>,action:PayloadAction<IDataCollateral>) {
    state.storageApproval.collateral.lvt_log = action.payload.logs
    state.storageApproval.collateral.spreadSheet = {
      title: '',
      rows: [],
      is_activated: false,
      updated_by: '',
      updated_at: null,
      updated_by_fullname:  null,
      uuid: generateLOCALUUID(),
    }
    //  state.storageApproval.collateral.lvt_log = action.payload.logs?.map(lvt=>{
    //   return {
    //     title:lvt.title,
    //     is_activated:lvt.is_activated,
    //     updated_by:lvt.updated_by,
    //     updated_at:lvt.updated_at,
    //     updated_by_fullname: lvt.updated_by_fullname,
    //     uuid:lvt.uuid,
    //     rows:lvt.rows?.map(rows=>{
    //       return{
    //         coll_price_cert_uuid:rows.coll_price_cert_uuid,
    //         coll_price_cert_asset_uuid:rows.coll_price_cert_asset_uuid,
    //         loan_credit:rows.loan_credit,
    //         temp_calc_value:rows.temp_calc_value,
    //         max_ltv_value:rows.max_ltv_value,
    //         max_loan_credit:rows.max_loan_credit,
    //         safely_debit:rows.safely_debit,
    //         ltv_value:rows.ltv_value,
    //         uuid:rows.uuid,
    //       }
    //     }) as ILoanNormalApprovalLogRows[]
    //   }
    // }) as ILoanNormalApprovalLVTLog[];
    // state.storageApproval.collateral.spreadSheet.updated_at = action.payload.current_ltv.updated_at;
    // state.storageApproval.collateral.spreadSheet.updated_by_fullname = action.payload.current_ltv.updated_by_fullname;

  },
  setUuidAttachmentLegalApproval(state: Draft<ILOANNormalState>,action:PayloadAction<string>){
    state.storageApproval.collateral.uuidLegalAttachmentModal = action.payload;
  }

};
