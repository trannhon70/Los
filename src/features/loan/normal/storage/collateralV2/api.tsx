/* eslint-disable array-callback-return */
import { ILOANNormalCollateralV2State, ISubtype } from "types/models/loan/normal/storage/CollaretalV2";
import { IMasterData } from 'types/models/master-data';
import { formatPath } from "utils";
import { 
  API_LOAN_NORMAL_COLLATERAL_DELETE__CERTIFICATE_CERTIFICATES_LAND_ASSETS, 
  API_LOAN_NORMAL_COLLATERAL_DELETE_AUTH_PERSON_CERTIFICATED_LAND_ASSETS, 
  API_LOAN_NORMAL_COLLATERAL_DELETE_ITEM, 
  API_LOAN_NORMAL_COLLATERAL_DELETE_LAND_ASSETS_WRAPPER, 
  API_LOAN_NORMAL_COLLATERAL_DELETE_CERTIFICATED_LAND_ASSETS_WRAPPER,
  API_LOAN_NORMAL_COLLATERAL_DELETE_CERTIFICATED_OWNER_PERSON_LAND_ASSETS, 
  API_LOAN_NORMAL_COLLATERAL_IGNORE, API_LOAN_NORMAL_SAVE_COLLATERAL, 
  API_LOAN_NORMAL_UPDATE_DELETE_COLLATERAL, 
  API_LOAN_NORMAL_UPDATE_FETCH_LIST_COLLATERAL, 
  API_LOAN_NORMAL_COLLATERAL_DELETE_CTXD_LAND_ASSETS_WRAPPER,
  API_LOAN_NORMAL_COLLATERAL_DELETE_LAND_CERTIFICATE_PURPOSE,
  API_LOAN_NORMAL_COLLATERAL_DELETE_LAND_CERTIFICATE,
  API_LOAN_NORMAL_COLLATERAL_DELETE_AUTH_PERSON_LAND_ASSETS,
  API_LOAN_NORMAL_COLLATERAL_DELETE_OWNER_PERSON_LAND_ASSETS,
  API_LOAN_NORMAL_COLLATERAL_DELETE__CERTIFICATE_LAND_ASSETS_TYPE,
  API_LOAN_NORMAL_COLLATERAL_DELETE_APARTMENT_ROOM,
  API_LOAN_NORMAL_COLLATERAL_DELETE_APARTMENT_CERTIFICATE,
  API_LOAN_NORMAL_COLLATERAL_DELETE_MARKET_CERTIFICATE,
  API_LOAN_NORMAL_COLLATERAL_DELETE_CTXD_LAND_LAND_ASSETS_TYPE,
  API_LOAN_NORMAL_COLLATERAL_DELETE_APARTMENT_CERTIFICATE_OWNER_PERSON,
  API_LOAN_NORMAL_COLLATERAL_DELETE_OWNER_PERSON,
  API_LOAN_NORMAL_COLLATERAL_DELETE_MARKET_CERTIFICATE_OWNER_PERSON,
  API_LOAN_NORMAL_COLLATERAL_DELETE_CTXD_LAND_CERTIFICATE_OWNER_PERSON,
  API_LOAN_NORMAL_COLLATERAL_DELETE_LAND_CERTIFICATE_OWNER_PERSON,
  API_LOAN_NORMAL_COLLATERAL_DELETE_DEPARTMENT_CERTIFICATE_PURPOSE} from 'features/loan/normal/APIPaths';
import { apiPost, apiDelete, apiGet, apiPatch, apiPut } from "utils/api";
import { IResDocument, IResFile } from 'types/models/loan/normal/configs/Document';
import { ILOANNormalDocument } from "types/models/loan/normal/configs/Document";
import { ETypeLandName } from "./case";
const getDocument = (data: ILOANNormalDocument[]) => {
  if (!data) return [];
  return data.filter(doc => (doc?.child_files?.length ?? 0) > 0).map(doc => {
    const result: IResDocument = {
      child_files: doc?.child_files?.map((file, index) => {
        const result: IResFile = {
          content_type: file.content_type,
          created_at: file.created_at,
          created_by: file.created_by,
          created_by_name: file.created_by_name,
          updated_at: file.updated_at,
          updated_by: file.updated_by,
          updated_by_name: file.updated_by_name,
          description: file.description,
          display_order: index,
          file_id: index,
          name: file.name,
          uuid: file.uuid,
          custom_keys: file.custom_keys,
        };
        return result;
      }) ?? [],
      document_id: doc.document_id,
      document_name: doc.document_name,
    };
    return result;
  })
}
// ILOANNormalDocument
// save BDS
export const saveCollaterals = (storage: ILOANNormalCollateralV2State,
  full_data_legal: string,
  full_data_legal_marriage: string,
  los_uuid: string,
  master: IMasterData,
  type: string
) => {


  const { collateralType } = master
  const currentType = storage.data?.find(i => i.is_collapse_type === true)
  // 

  const checkEmpty = (value: string) => {
    if (value === "") {
      return null
    } else {
      return value
    }
  }
  const subTypeRealEstateLandAsset = (sub: ISubtype) => ({
    id: sub.id,
    child_id: sub.child_sub_type,
    items: sub?.items?.map((subItem, index) => ({
      order: index + 1,
      collateral_value: {
        id: "VND",
        value: Number(subItem?.current_value_item)
      },
      // đất
      land_wrapper: {
        from_credit_extension: {
          id: subItem?.land?.land_wrapper?.from_credit_extension
        },
        is_exploited: subItem?.land?.land_wrapper?.from_credit_extension === 'Y' ? {
          id: subItem?.land?.land_wrapper?.is_exploited
        } : null,
        credit_extension_secured: {
          id: subItem?.land?.land_wrapper?.credit_extension_secured
        },
        non_business_area: subItem?.land?.land_wrapper?.from_credit_extension === 'Y' && currentType?.status === 'RE_MIXED' ? {
          id: "PERCENT",
          value: Number(subItem?.land?.land_wrapper?.non_business_area ?? 0)
        } : null,
        // non_business_area: {
        //   id: "PERCENT",
        //   value: subItem?.land?.land_wrapper?.from_credit_extension === 'Y' && currentType?.status === 'RE_MIXED' ? Number(subItem?.land?.land_wrapper?.non_business_area ?? 0) : null
        // },
        max_percentage: {
          id: "PERCENT",
          value: Number(subItem?.land?.land_wrapper?.max_percentage)
        },
        collateral_value: {
          id: "VND",
          value: Number(subItem?.land?.land_wrapper?.value_of_land)
        },
        description: subItem?.land?.land_wrapper?.description ?? "",
        has_land_asset: {
          id: subItem?.land?.land_wrapper?.has_land_asset
        },
        has_certificated_land_asset: {
          id: subItem?.land?.land_wrapper?.has_certificated_land_asset
        },
        owner_wrapper: {
          owner_type: {
            id: subItem?.land?.land_legal_information_owner?.owner_type
          },
          owners: subItem?.land?.land_legal_information_owner?.owner?.map(ow => ({
            person_uuid: ow?.person_uuid,
            full_name: ow?.full_name,
            documents: [],
            has_authorize: {
              id: ow?.has_authorize
            },
            authorized_persons: ow?.authorized_persons?.map(au => ({
              person_uuid: au?.person_uuid,
              full_name: au?.full_name,
              documents: getDocument(au?.documents ?? []),
              owner_relationship: au?.owner_relationship,
              borrower_relationship: au?.borrower_relationship,
              authorize_contract: au?.authorize_contract
            }))
          })) ?? []
        },
        certificates: subItem.land?.certificate_legal_info?.dataCertificate?.map(i => (
          {
            documents: getDocument(i.documents),
            persons: i?.persons?.map(per => ({
              person_uuid: per?.person_uuid,
              documents: []
            })) ?? [],
            certificate_type: {
              id: i.typeUseLand
            },
            other_certificate_type: i?.typeGCN ? i?.typeGCN : null,
            certificate_code: i.numberGCNLegal,
            certificate_no: i.numberGCN,
            issue_date: i.dateRange ? i.dateRange / 1000 : null,
            place_of_issue: i.dateLocation
          }
        )),
        land: {
          address: checkEmpty(subItem.land.land_legal_infomation_asset.address),
          province: {
            id: subItem.land.land_legal_infomation_asset.province
          },
          district: {
            id: subItem.land.land_legal_infomation_asset.district
          },
          ward: {
            id: subItem.land.land_legal_infomation_asset.ward
          },
          certificate_address: checkEmpty(subItem.land.land_legal_infomation_asset.certificate_address),
          certificate_province: {
            id: subItem.land.land_legal_infomation_asset.certificate_province
          },
          certificate_district: {
            id: subItem.land.land_legal_infomation_asset.certificate_district
          },
          certificate_ward: {
            id: subItem.land.land_legal_infomation_asset.certificate_ward
          },
          use_purposes: subItem.land?.land_legal_infomation_asset?.purpose_using_lane?.map(i => (
            {
              id: i
            }
          )) ?? null,
          other_use_purpose: subItem.land.land_legal_infomation_asset.purpose_using_lane_other ? subItem.land.land_legal_infomation_asset.purpose_using_lane_other : null,
          certificate_use_purposes: subItem.land.land_legal_infomation_asset.land_asset_types?.map(i => (
            {
              use_purpose: i.use_purpose,
              land_number: checkEmpty(i.land_number?.toString() ?? ""), //check
              map_number: checkEmpty(i.map_number?.toString() ?? ""), //check
              certificate_area: i?.certificate_area,
              real_area: {
                id: "M2",
                value: Number(i.real_area)
              },
              land_use_source: {
                id: i.land_use_source
              },
              other_land_use_source: i.other_land_use_source !== "" ? i.other_land_use_source : null,
              duration: checkEmpty(i.duration),
              usage_form: {
                id: i.usage_form
              },
              other_usage_form: checkEmpty(i.other_usage_form)
            }
          ))
        },
      },
      // ctxh
      land_asset_wrapper: subItem?.land?.land_wrapper?.has_land_asset === 'Y' ?
        {
          from_credit_extension: {
            id: subItem.land.land_wrapper.from_credit_extension
          },
          is_exploited: subItem.land.land_wrapper.from_credit_extension === 'Y' ? {
            id: subItem.land.land_wrapper.is_exploited
          } : null,
          credit_extension_secured: {
            id: subItem.land.land_wrapper.credit_extension_secured
          },
          non_business_area: subItem.land.land_wrapper.from_credit_extension === 'Y' && currentType?.status === 'RE_MIXED' ? {
            id: "PERCENT",
            value: Number(subItem.land.land_wrapper?.non_business_area ?? 0)
          } : null,
          // non_business_area:{
          //   id: "PERCENT",
          //   value: subItem?.land?.land_wrapper?.from_credit_extension === 'Y' && currentType?.status === 'RE_MIXED' ? Number(subItem.land?.land_wrapper?.non_business_area ?? 0) : null
          // },
          max_percentage: {
            id: "PERCENT",
            value: Number(subItem.land.land_wrapper.max_percentage)
          },
          collateral_value: {
            id: "VND",
            value: Number(subItem.ctxd_land.ctx_land_wrapper.value_of_land) //check
          },
          description: subItem.land.land_wrapper?.description ?? "",
          land_assets: subItem.ctxd_land.dataCTXDLand.length <= 0 ? [] : subItem.ctxd_land.dataCTXDLand?.map(assets => (
            {
              order: 1,
              asset_legal: {
                id: assets.asset_legal
              },
              address: checkEmpty(assets.address),
              province: {
                id: assets.provice
              },
              district: {
                id: assets.district
              },
              ward: {
                id: assets.ward
              },
              certificate_address: checkEmpty(assets.certificate_address),
              certificate_province: {
                id: assets.certificate_province
              },
              certificate_district: {
                id: assets.certificate_district
              },
              certificate_ward: {
                id: assets.certificate_ward
              },
              other_asset_legal: assets.legal_CTXD_other ? assets.legal_CTXD_other :  null,
              documents: getDocument(assets?.documents ?? []),
              land_asset_types: assets.dataTypeCTXD.length <= 0 ? [] : assets.dataTypeCTXD?.map(type => (
                {
                  order: 1,
                  land_asset_type: {
                    id: type.land_asset_type
                  },
                  other_asset_type: type?.land_asset_type_other ? type.land_asset_type_other : null,
                  // non require
                  certificate_building_area:  checkEmpty(type.certificate_building_area),
                  building_area: type?.building_area !== "" ? {
                    id: "M2",
                    value: checkEmpty(type.building_area)
                  } : null,
                  certificate_cross_floor_area: checkEmpty(type.certificate_cross_floor_area),
                  cross_floor_area: type?.cross_floor_area !== "" ? {
                    id: "M2",
                    value: checkEmpty(type.cross_floor_area)
                  } : null,
                  certificate_used_area: checkEmpty(type.certificate_used_area),
                  used_area: type?.used_area !== "" ? {
                    id: "M2",
                    value: type.used_area
                  } : null,
                  ownership_duration: checkEmpty(type.ownership_duration),
                  owner_form: checkEmpty(type.owner_form),
                  certificate_structure: checkEmpty(type.certificate_structure),
                  structure: checkEmpty(type?.structure),
                  certificate_rank: checkEmpty(type.certificate_rank),
                  certificate_floors: checkEmpty(type.certificate_floors),
                  floors: checkEmpty(type.floors),
                  duration_of_use: checkEmpty(type.duration_of_use)
                }
              ))
            }
          ))
        } : null,
      // GCN
      certificated_land_asset_wrappers: subItem?.land?.land_wrapper?.has_certificated_land_asset === 'Y' ? subItem.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((gcn, indexGCN) => ({
        order: indexGCN,
        documents: getDocument(gcn?.documents ?? []),
        from_credit_extension: {
          id: gcn.ctxd_gcn_qsh_land_info.ctx_land_wrapper.from_credit_extension
        },
        is_exploited: gcn.ctxd_gcn_qsh_land_info.ctx_land_wrapper.from_credit_extension === 'Y' ? {
          id: gcn.ctxd_gcn_qsh_land_info.ctx_land_wrapper.is_exploited
        } : null,
        credit_extension_secured: {
          id: gcn.ctxd_gcn_qsh_land_info.ctx_land_wrapper.credit_extension_secured
        },
        non_business_area: gcn.ctxd_gcn_qsh_land_info.ctx_land_wrapper.from_credit_extension === 'Y' && currentType?.status === 'RE_MIXED' ? {
          id: "PERCENT",
          value: Number(gcn?.ctxd_gcn_qsh_land_info?.ctx_land_wrapper?.non_business_area ?? 0)
        } : null,
        // non_business_area:{
        //   id: "PERCENT",
        //   value: subItem?.land?.land_wrapper?.from_credit_extension === 'Y' && currentType?.status === 'RE_MIXED' ? Number(gcn.ctxd_gcn_qsh_land_info?.ctx_land_wrapper?.non_business_area ?? 0) : null
        // },
        max_percentage: {
          id: "PERCENT",
          value: gcn.ctxd_gcn_qsh_land_info.ctx_land_wrapper.max_percentage
        },
        collateral_value: {
          id: "VND",
          value: Number(gcn.ctxd_gcn_qsh_land_info.ctx_land_wrapper.value_of_land)
        },
        description: gcn?.ctxd_gcn_qsh_land_info?.ctx_land_wrapper?.description ?? "",
        owner_wrapper: {
          owner_type: {
            id: gcn?.land_legal_information_owner?.owner_type
          },
          owners: gcn?.land_legal_information_owner?.owner?.map(ow => ({
            person_uuid: ow?.person_uuid,
            full_name: ow?.full_name,
            documents: [],
            has_authorize: {
              id: ow?.has_authorize
            },
            authorized_persons: ow?.authorized_persons?.map(au => ({
              full_name: au?.full_name,
              person_uuid: au?.person_uuid,
              documents: getDocument(au?.documents ?? []),
              owner_relationship: au?.owner_relationship,
              borrower_relationship: au?.borrower_relationship,
              authorize_contract: au?.authorize_contract
            }))
          })) ?? []
        },
        certificates: gcn.certificate_legal_info.dataCertificate.map(gcnLegal => ({
          documents: getDocument(gcnLegal.documents),
          persons: gcnLegal?.persons?.map(per => ({
            full_name: per?.full_name,
            person_uuid: per?.person_uuid,
            documents: []
          })) ?? [],
          certificate_type: {
            id: gcnLegal?.typeUseLand
          },
          other_certificate_type: gcnLegal?.typeGCN ? gcnLegal?.typeGCN : null,
          certificate_code: gcnLegal?.numberGCNLegal,
          certificate_no: gcnLegal?.numberGCN,
          issue_date: gcnLegal?.dateRange ? (gcnLegal?.dateRange ?? 0) / 1000 : null,
          place_of_issue: gcnLegal?.dateLocation
        })),
        land_asset: {
          asset_legal: {
            id: 'OTHER'
          },
          other_asset_legal:"DEFAULT",
          // other_asset_legal: gcn.ctxd_gcn_qsh_land_info.dataCTXDLand.legal_CTXD_other ? gcn.ctxd_gcn_qsh_land_info.dataCTXDLand.legal_CTXD_other : null,
          address: checkEmpty(gcn.ctxd_gcn_qsh_land_info.dataCTXDLand.address),
          province: {
            id: gcn.ctxd_gcn_qsh_land_info.dataCTXDLand.provice
          },
          district: {
            id: gcn.ctxd_gcn_qsh_land_info.dataCTXDLand.district
          },
          ward: {
            id: gcn.ctxd_gcn_qsh_land_info.dataCTXDLand.ward
          },
          certificate_address: checkEmpty(gcn.ctxd_gcn_qsh_land_info.dataCTXDLand.certificate_address),
          certificate_province: {
            id: gcn.ctxd_gcn_qsh_land_info.dataCTXDLand.certificate_province
          },
          certificate_district: {
            id: gcn.ctxd_gcn_qsh_land_info.dataCTXDLand.certificate_district
          },
          certificate_ward: {
            id: gcn.ctxd_gcn_qsh_land_info.dataCTXDLand.certificate_ward
          },
          land_asset_types: gcn.ctxd_gcn_qsh_land_info.dataCTXDLand.dataTypeCTXD.map((type, typeIdx) => (
            {
              order: typeIdx,
              land_asset_type: {
                id: type.land_asset_type
              },
              other_asset_type: type?.land_asset_type_other ? type.land_asset_type_other : null,
              certificate_building_area: checkEmpty(type.certificate_building_area),
              building_area: type.building_area !== "" ? {
                id: "M2",
                value: checkEmpty(type.building_area)
              } : null,
              certificate_cross_floor_area: checkEmpty(type.certificate_cross_floor_area),
              cross_floor_area: type.cross_floor_area !== "" ? {
                id: "M2",
                value: checkEmpty(type.cross_floor_area)
              } : null,
              certificate_used_area: checkEmpty(type.certificate_used_area),
              used_area: type.used_area !== "" ? {
                id: "M2",
                value: checkEmpty(type.used_area)
              } : null,
              ownership_duration: checkEmpty(type.ownership_duration),
              owner_form: checkEmpty(type.owner_form),
              certificate_structure: checkEmpty(type.certificate_structure),
              structure: checkEmpty(type.structure),
              certificate_rank: checkEmpty(type.certificate_rank),
              certificate_floors: checkEmpty(type.certificate_floors),
              floors: checkEmpty(type.floors),
              duration_of_use: checkEmpty(type.duration_of_use)
            }
          ))
        }
      })) : null
    }))
  })
  // căn hộ
  const subTypeRealEstateLandApartment = (sub: ISubtype) => ({
    id: sub.id,
    child_id: sub.child_sub_type,
    items: sub.items?.map(subItem => ({
      order: 1,
      from_credit_extension: {
        id: subItem?.department?.department_wrapper?.from_credit_extension
      },
      is_exploited: subItem?.department?.department_wrapper?.from_credit_extension === 'Y' ? {
        id: subItem?.department?.department_wrapper?.is_exploited
      } : null,
      credit_extension_secured: {
        id: subItem?.department?.department_wrapper?.credit_extension_secured
      },
      non_business_area: subItem?.department?.department_wrapper?.from_credit_extension === 'Y' && currentType?.status === 'RE_MIXED' ? {
        id: "PERCENT",
        value: Number(subItem?.department?.department_wrapper?.non_business_area ?? 0)
      } : null,
      // non_business_area :{
      //   id: "PERCENT",
      //   value: subItem?.land?.land_wrapper?.from_credit_extension === 'Y' && currentType?.status === 'RE_MIXED' ? Number(subItem?.department?.department_wrapper?.non_business_area ?? 0) : null
      // },
      max_percentage: {
        id: "PERCENT",
        value: Number(subItem?.department?.department_wrapper?.max_percentage ?? 0)
      },
      collateral_value: {
        id: "VND",
        value: Number(subItem?.current_value_item)
      },
      description: subItem?.department?.department_wrapper?.description ?? "",
      has_certificate: {
        id: subItem?.department?.has_certificate
      },
      project_name: subItem?.department?.project_name,
      owner_wrapper: {   // check ux
        owner_type: {
          id: subItem?.department?.department_owner?.owner_type
        },
        owners: subItem?.department?.department_owner?.owner?.map(ow => ({
          full_name: ow?.full_name,
          person_uuid: ow?.person_uuid,
          documents: [],
          has_authorize: {
            id: ow?.has_authorize
          },
          authorized_persons: ow?.authorized_persons?.map(au => ({
            full_name: au?.full_name,
            person_uuid: au?.person_uuid,
            documents: getDocument(au?.documents ?? []),
            owner_relationship: au?.owner_relationship,
            borrower_relationship: au?.borrower_relationship,
            authorize_contract: au?.authorize_contract
          }))
        })) ?? []
      },

      certificates: subItem?.department?.department_certificate_legal?.map((cc, ii) => ({
        order: ii + 1,
        documents: getDocument(cc.documents ?? []),
        persons: cc?.persons?.map(per => ({
          full_name: per?.full_name,
          person_uuid: per?.person_uuid,
          documents: []
        })) ?? [],
        certificate_type: {
          id: subItem?.department?.has_certificate === 'Y' ? cc.other_certificate_type : null //1. Loại GCN
        },
        other_certificate_type: subItem?.department?.has_certificate === 'Y' ? (cc?.other_certificate_type_other ? cc?.other_certificate_type_other : null) : null, //2. Loại GCN khác
        certificate_code: subItem?.department?.has_certificate === 'Y' ? cc?.certificate_code : null,//3. Số GCN
        certificate_no: subItem?.department?.has_certificate === 'Y' ? cc?.certificate_no : null, // 4. Số vào sổ cấp GCN
        issue_date: subItem?.department?.has_certificate === 'Y' ? (cc?.issue_date ?? 0) / 1000 : null, //5. Ngày cấp
        place_of_issue: subItem?.department?.has_certificate === 'Y' ? cc?.place_of_issue : null, //6. Nơi cấp
        contract_type: subItem?.department?.has_certificate === 'N' ? cc?.contract_number_type !== "" ? cc?.contract_number_type : null : null, // 7. Loại hợp đồng
        contract_no: subItem?.department?.has_certificate === 'N' ? cc?.contract_number ? cc?.contract_number : null : null, // 8. Số hợp đồng
        contract_date: subItem?.department?.has_certificate === 'N' ? (cc?.contract_date ?? 0) / 1000 ?? null : null
      })),

      apartments: subItem.department.department_info?.map((dep, idx) => ({
        order: idx + 1,
        house_type: dep.house_type,
        apartment_type: { // loại can7 hộ check ux
          id: dep?.apartment_type
        },
        other_apartment_type: dep.other_apartment_type ? dep.other_apartment_type : null,
        apartment_number: dep.apartment_number,
        block: dep.block,
        floor: dep.floor,
        start_date: dep.start_date ? ((dep.start_date ?? 0) / 1000) : null,
        certificate_area: dep?.certificate_area,
        real_area: {
          id: "M2",
          value: Number(dep.real_area)
        },
        usage_from: dep?.usage_form ? dep.usage_form : null,
        duration: dep?.duration ? dep?.duration : null,
        ownership_category: dep?.ownership_category ? dep?.ownership_category : null
      })),

      land: {
        address: subItem?.department?.department_info_land?.address,
        province: {
          id: subItem?.department?.department_info_land?.province
        },
        district: {
          id: subItem?.department?.department_info_land?.district
        },
        ward: {
          id: subItem?.department?.department_info_land?.ward
        },
        certificate_address: subItem?.department?.department_info_land?.certificate_address,
        certificate_province: {
          id: subItem?.department?.department_info_land?.certificate_province,
        },
        certificate_district: {
          id: subItem?.department?.department_info_land?.certificate_district,
        },
        certificate_ward: {
          id: subItem?.department?.department_info_land?.certificate_ward,
        },
        use_purposes: subItem?.department?.department_info_land?.use_purposes?.map(iii => ({
          id: iii
        })),
        other_use_purpose: subItem?.department?.department_info_land?.other_use_purpose ? subItem?.department?.department_info_land?.other_use_purpose : null,
        certificate_use_purposes: subItem?.department?.department_info_land?.certificate_use_purposes?.map((cer, indexCer) => ({
          use_purpose: cer?.use_purpose,
          land_number: checkEmpty(cer?.land_number?.toString() ?? ""),
          map_number: checkEmpty(cer?.map_number),
          certificate_area: cer?.certificate_area ?? "",
          real_area: {
            id: "M2",
            value: Number(cer?.real_area),
          },
          land_use_source: {
            id: cer?.land_use_source
          },
          other_land_use_source: cer?.other_land_use_source ? cer?.other_land_use_source : null,
          duration: cer?.duration,
          usage_form: {
            id: cer?.usage_form
          },
          other_usage_form: cer.other_usage_form ? cer.other_usage_form : null, //check ux
        }))
      }
    }

    ))
  })

  // chợ
  const subTypeRealEstateMarket = (sub: ISubtype) => ({
    id: sub.id,
    child_id: sub.child_sub_type,
    items: sub.items.map((subItem, index) => ({
      order: 1,
      from_credit_extension: {
        id: subItem.market.maket_wrapper.from_credit_extension
      },
      is_exploited: subItem.market.maket_wrapper.from_credit_extension === 'Y' ? {
        id: subItem.market.maket_wrapper.is_exploited
      } : null,
      credit_extension_secured: {
        id: subItem.market.maket_wrapper.credit_extension_secured
      },
      max_percentage: {
        id: "PERCENT",
        value: Number(subItem?.market?.maket_wrapper?.max_percentage)
      },
      collateral_value: {
        id: "VND",
        value: Number(subItem?.market?.maket_wrapper?.value_of_land)
      },
      non_business_area: subItem.market.maket_wrapper.from_credit_extension === 'Y' && currentType?.status === 'RE_MIXED' ? {
        id: "PERCENT",
        value: Number(subItem?.market?.maket_wrapper?.non_business_area ?? 0)
      } : null,
      // non_business_area:{
      //   id: "PERCENT",
      //   value: subItem.market.maket_wrapper.from_credit_extension === 'Y' && currentType?.status === 'RE_MIXED' ? Number(subItem?.market?.maket_wrapper?.non_business_area ?? 0) : null
      // },
      description: subItem.market.maket_wrapper?.description ?? "",
      has_certificate: {
        id: subItem?.has_certificate_maket
      },
      owner_wrapper: {
        owner_type: {
          id: subItem?.market?.market_owner?.owner_type
        },
        owners: subItem?.market?.market_owner?.owner.map(ow => ({
          person_uuid: ow?.person_uuid,
          full_name: ow?.full_name,
          documents: [],
          has_authorize: {
            id: ow?.has_authorize
          },
          authorized_persons: ow?.authorized_persons.map(authPerson => ({
            full_name: authPerson?.full_name,
            person_uuid: authPerson?.person_uuid,
            documents: getDocument(authPerson?.documents ?? []),
            owner_relationship: authPerson?.owner_relationship,
            borrower_relationship: authPerson?.borrower_relationship,
            authorize_contract: authPerson?.authorize_contract
          }))
        })) ?? []
      },
      certificates: subItem.market?.maket_certificates?.map(i => ({
        order: 1,
        documents: getDocument(i.documents ?? []),
        persons: i?.persons?.map(per => ({
          full_name: per?.full_name,
          person_uuid: per?.person_uuid,
          documents: []
        })),
        certificate_name: subItem?.has_certificate_maket === 'Y' ? i.certificate_name : null,
        certificate_code: subItem?.has_certificate_maket === 'Y' ? i.certificate_code : null,
        issue_date: subItem?.has_certificate_maket === 'Y' ? i?.issue_date ? i.issue_date / 1000 : null : null,
        place_of_issue: subItem?.has_certificate_maket === 'Y' ? i.place_of_issue : null,
        contract_name: i.contract_name,
        contract_number: i.contract_number,
        contract_code: i.contract_code,
        contract_date: i.contract_date ? i.contract_date / 1000 : null,
        contract_unit: i.contract_unit

      })),

      market: {
        market_name: subItem.market.maket_info.market_name,
        market_code: subItem.market.maket_info.market_code,
        location: subItem.market.maket_info.location,
        sector: subItem.market.maket_info.sector,
        start_date: (subItem.market.maket_info.start_date === null ? null : subItem.market.maket_info.start_date / 1000),
        end_date: (subItem.market.maket_info.end_date === null ? null : subItem.market.maket_info.end_date / 1000),
        remaining: {
          "id": "MONTH",
          value: Number(subItem?.market?.maket_info?.remaining)
        },
        used_area: subItem?.market.maket_info?.used_area,
        value_area: {
          "id": "M2",
          value: Number(subItem?.market?.maket_info?.value_area)
        },
        structure: subItem.market.maket_info.structure
      }
    }

    ))
  })

  const dataIgnore = storage.ignore === "N" ? true : false

  const body = {  // BDS
    order: 1,
    los_uuid: los_uuid,
    collateral_type: {
      id: currentType?.type,
      name: collateralType.data.find(i => i.id === currentType?.type)?.name
    },
    status: {
      id: currentType?.status
    },
    is_compactness: {
      id: currentType?.is_compactness
    },
    valuation_id: dataIgnore ? null : currentType?.valuation_id,
    valuation_date: dataIgnore ? null : (currentType?.valuation_date ? currentType?.valuation_date / 1000 : null),
    valuation_unit_type: {
      id: dataIgnore ? null : currentType?.valuation_unit_type
    },
    valuation_unit: {
      id: dataIgnore ? null : currentType?.valuation_unit
    },
    valuation_center: {
      id: dataIgnore ? null : currentType?.valuation_center
    },
    valuation_center_opinion: dataIgnore ? null : (currentType?.valuation_center_opinion ? currentType?.valuation_center_opinion : null),
    independence_organization: {
      id: dataIgnore ? null : currentType?.independence_organization
    },
    other_independence_organization: dataIgnore ? null : currentType?.other_independence_organization ? currentType?.other_independence_organization : null,
    purpose: {
      id: dataIgnore ? null : currentType?.purpose
    },
    other_purpose: dataIgnore ? null : currentType?.other_purpose ? currentType?.other_purpose : null,
    address: checkEmpty(currentType?.address ?? ""),
    province: {
      id: dataIgnore ? null : currentType?.province
    },
    district: {
      id: dataIgnore ? null : currentType?.district
    },
    ward: {
      id: dataIgnore ? null : currentType?.ward
    },
    position_type: {
      id: dataIgnore ? null : currentType?.position_type
    },
    other_position_type: dataIgnore ? null : (currentType?.other_position_type ? currentType?.other_position_type : null),
    lane_width: {
      id: dataIgnore ? null : currentType?.lane_width
    },
    description: dataIgnore ? null : currentType?.description,
    collateral_value: {
      id: "VND",
      value: currentType?.collateral_value,
    },
    max_percentage: {
      id: 'PERCENT',
      value: currentType?.max_percentage ? Number(currentType?.max_percentage) : null
    },
    documents: getDocument(currentType?.documents ?? []),
    sub_types: currentType?.sub_type.map((item) => {
      switch (item.id) {
        case 'LAND':

          return subTypeRealEstateLandAsset(item)
        case 'APPA':
          return subTypeRealEstateLandApartment(item)
        case 'MARK':
          return subTypeRealEstateMarket(item)
      }
    })
  }

  if (currentType?.price_cert_uuid) {
    // call update
    return apiPut<unknown>(formatPath(API_LOAN_NORMAL_UPDATE_DELETE_COLLATERAL, los_uuid, currentType.price_cert_uuid ?? ''), body)
  }
  else {
    return apiPost<unknown>(formatPath(API_LOAN_NORMAL_SAVE_COLLATERAL, los_uuid), body);
  }

}

export const saveCollateralsGOODS = (storage: ILOANNormalCollateralV2State,
  full_data_legal: string,
  full_data_legal_marriage: string,
  los_uuid: string,
  master: IMasterData,
  type: string
) => {
  const currentType = storage.data.find(i => i.is_collapse_type === true)

  const { priceAppraisal, independentValuation, appraisalPurpose, collateralType } = master

  const dataIgnore = storage.ignore === "N" ? true : false

  const body = {  // 6 type nhỏ
    order: 1,
    los_uuid: los_uuid,
    collateral_type: {
      id: currentType?.type,
      name: collateralType.data.find(i => i.id === currentType?.type)?.name
    },
    status: {
      id: currentType?.status
    },
    is_compactness: {
      id: currentType?.is_compactness
    },
    valuation_center: {
      id: priceAppraisal.data.find(item => item.code === currentType?.valuation_center)?.code,
      value: currentType?.valuation_center
    }, // check
    valuation_center_opinion: currentType?.valuation_center_opinion ? currentType?.valuation_center_opinion : null,
    independence_organization: {
      id: independentValuation.data.find(item => item.code === currentType?.independence_organization)?.code
    },// check
    other_independence_organization: currentType?.other_independence_organization ? currentType?.other_independence_organization : null,
    valuation_id: dataIgnore ? null : currentType?.valuation_id,
    valuation_date: dataIgnore ? null : ((currentType?.valuation_date ?? 0) / 1000),
    valuation_unit_type: {
      id: dataIgnore ? null : currentType?.valuation_unit_type
    },
    valuation_unit: {
      id: dataIgnore ? null : currentType?.valuation_unit
    },
    purpose: {
      id: dataIgnore ? null : appraisalPurpose.data.find(item => item.code === currentType?.purpose)?.code
    },
    other_purpose: dataIgnore ? null : currentType?.other_purpose !== "" ? currentType?.other_purpose : null,
    address: currentType?.address,
    province: {
      id: currentType?.province
    },
    district: {
      id: currentType?.district
    },
    ward: {
      id: currentType?.ward
    },
    position_type: {
      id: currentType?.position_type
    },
    other_position_type: currentType?.other_position_type ? currentType?.other_position_type : null,
    lane_width: currentType?.lane_width,
    description: currentType?.description,
    collateral_value: {
      id: "VND",
      value: currentType?.sub_type?.map(g => g.items.map(i => i.value).reduce((a, b) => Number(a ?? 0) + Number(b ?? 0), 0) ?? 0).reduce((a, b) => Number(a ?? 0) + Number(b ?? 0), 0)
    },
    max_percentage: {
      id: 'PERCENT',
      value: currentType?.max_percentage ? Number(currentType?.max_percentage) : null
    },
    documents: getDocument(currentType?.documents ?? []),
    sub_types: currentType?.sub_type.map(sub => ({
      id: (currentType.type !== "MEST" && currentType.type !== "DEVI") ? currentType.type : sub.id, // check PTVT
      child_id: sub.child_sub_type,
      items: sub.items.map((subItem, idx) => ({
        order: idx + 1,
        max_percentage: {
          id: "PERCENT",
          value: Number(subItem?.ratio) ?? 0
        },
        collateral_value: {
          id: "VND",
          value: subItem.value
        },
        credit_extension_secured: {
          id: subItem?.credit_extension_secured
        },
        description: currentType?.type === 'MEST' || currentType?.type === 'DEVI' ? subItem?.info_collatetal ?? "" :  subItem?.info_collatetal,
        owner_wrapper: {
          owner_type: {
            id: subItem?.owner_wrapper?.owner_type
          },
          owners: subItem?.owner_wrapper?.owner?.map(ow => ({
            full_name: ow?.full_name,
            person_uuid: ow?.person_uuid,
            documents: []
          })) ?? []
        },
        detail: {
          name: subItem.typeCollateral,
          license_number: currentType.type === "DEVI" ? subItem.number_register :
            (subItem.license === "" ? subItem.number_register === "" ? null : subItem.number_register : subItem.license),
          status: currentType.type === 'BALC' || currentType.type === 'STOC' || currentType.type === 'OTHE' ? subItem.status : subItem.status === "" ? {
            
              "id":null,
              "name":null
              
          } :{
            id: subItem.status === "" ? null : subItem.status
          },
          description: subItem.description,
          balance_type: {
            id: subItem.typeCollateral
          },
          distributor: {
            id: subItem.issuer
          },
          other_distributor: subItem.other_issuer ? subItem.other_issuer : null,
          quantity_each_type: Number(subItem.count),
          manufacturing_date: subItem.year,
          brand: currentType.type !=="MEST" ? subItem?.branch ?? '' : subItem?.brand ?? '',
          other_brand: subItem?.other_brand ?? '',
          model: subItem.model,
          origin_of_production: currentType.type === 'DEVI' ? subItem?.production : {
            id: subItem.origin_of_production
          } ?? null,
          other_origin_of_production: subItem.other_origin_of_production ? subItem.other_origin_of_production : null,
          remain_quality: subItem.CLCL ? {
            id: 'PERCENT',
            value: subItem.CLCL
          } : null,
          quantity: Number(subItem.quantity),
          //// PTVT  ////
          documents: getDocument(subItem?.documents ?? []),
          transportation_sub_type: subItem.transportation_sub_type ?? null,
          other_transportation_sub_type: subItem.other_transportation_sub_type ? subItem.other_transportation_sub_type : null,
          legal_document_types: subItem?.legal_document_types?.filter(e => e.documents?.length > 0) ?? [],
          vehicle_identification_number: subItem?.vehicle_identification_number === "" ? null : subItem.vehicle_identification_number,
          engine_number: subItem.engine_number === "" ? null : subItem.engine_number,
          license_plate: subItem.license_plate === "" ? null : subItem.license_plate,

        }
      }))
    }
    ))
  }


  if (currentType?.price_cert_uuid) {
    // call update
    console.log('updateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    return apiPut<unknown>(formatPath(API_LOAN_NORMAL_UPDATE_DELETE_COLLATERAL, los_uuid, currentType.price_cert_uuid ?? ''), body)
  }
  else {
    console.log('postttttttttttttttttttttttt');
    return apiPost<unknown>(formatPath(API_LOAN_NORMAL_SAVE_COLLATERAL, los_uuid), body);
  }

}

export const saveCollateralIgnore = ( data: string, los_uuid: string) => {

  const ignoreData = data === "Y" ? "true" : "false"

  return apiPatch<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_IGNORE, los_uuid,ignoreData));
}

export interface IDeleteParams {
  cert_uuid?: string;
  uuid: string;
}
export const deleteCollaterals = (losuuid: string, uuid: string) => {
  return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_UPDATE_DELETE_COLLATERAL, losuuid, uuid));
}

export const handleFetchListCollateral = (losuuid: string) => {

  return apiGet<unknown>(formatPath(API_LOAN_NORMAL_UPDATE_FETCH_LIST_COLLATERAL, losuuid));
}

export const deleteCollateralsItem = (losuuid: string, price_cert_uuid: string, price_cert_asset_uuid : string) => {  // delete item
  return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_ITEM, losuuid, price_cert_uuid, price_cert_asset_uuid ));
}

export const deleteCertificatesLandAssets = (
  type: string, 
  losuuid: string, 
  price_cert_uuid: string, 
  price_cert_asset_uuid: string,
  land_const_uuid: string,
  land_const_item_cert_uuid: string,
  land_cert_uuid: string
) =>{
  switch(type){
    case ETypeLandName.CTXD_GCN:
      // Xóa giấy chứng trong CTXD có GCN QSH riêng
      return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE__CERTIFICATE_CERTIFICATES_LAND_ASSETS, losuuid, price_cert_uuid, price_cert_asset_uuid, land_const_uuid, land_const_item_cert_uuid))
    case ETypeLandName.LAND:
      // Xóa mục đích sửa dụng đất trong thông tin đất
      return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_LAND_CERTIFICATE, losuuid, price_cert_uuid, price_cert_asset_uuid,land_cert_uuid))
    }
}

// Xóa người được ủy quyền trong đối tượng sở hữu CTXD có GCN QSH riêng
export const deleteAuthPersonCertificatesLandAssets = (
  type: string,
  losuuid: string, 
  price_cert_uuid: string, 
  price_cert_asset_uuid: string,
  land_const_uuid: string,
  owner_uuid: string, 
  owner_auth_uuid : string ) =>{
  switch(type){
    case ETypeLandName.CTXD_GCN: 
      return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_AUTH_PERSON_CERTIFICATED_LAND_ASSETS, losuuid, price_cert_uuid, price_cert_asset_uuid, land_const_uuid, owner_uuid, owner_auth_uuid))
    case ETypeLandName.LAND: 
      return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_AUTH_PERSON_LAND_ASSETS, losuuid, price_cert_uuid, price_cert_asset_uuid, owner_uuid, owner_auth_uuid))

  }
}

// Xóa người sở hữu
export const deleteOwnerPersonCertificatesLandAssets = (
  type: string,
  losuuid: string, 
  price_cert_uuid: string, 
  price_cert_asset_uuid: string,
  land_const_uuid: string,
  owner_uuid: string ) =>{
 switch(type){
  case ETypeLandName.CTXD_GCN:
    return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_CERTIFICATED_OWNER_PERSON_LAND_ASSETS, losuuid, price_cert_uuid, price_cert_asset_uuid, land_const_uuid, owner_uuid))
  case ETypeLandName.LAND:
    return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_OWNER_PERSON_LAND_ASSETS, losuuid, price_cert_uuid, price_cert_asset_uuid, owner_uuid))
  default:
    return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_OWNER_PERSON, losuuid, price_cert_uuid, price_cert_asset_uuid, owner_uuid))
  }
}

// Xóa CTXD có GCN QSH riêng
export const deleteCertificateLandAssetsWrapper = (
  losuuid: string, 
  price_cert_uuid: string, 
  price_cert_asset_uuid: string,
  land_const_uuid: string ) =>{
  return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_CERTIFICATED_LAND_ASSETS_WRAPPER, losuuid, price_cert_uuid, price_cert_asset_uuid, land_const_uuid))
}

// Xóa CTXD trên đất trong danh sách thông tin pháp lý CTXD
export const deleteCTXDLandAssetsWrapper = (
  losuuid: string, 
  price_cert_uuid: string, 
  price_cert_asset_uuid: string,
  land_const_item_uuid : string ) =>{
  return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_CTXD_LAND_ASSETS_WRAPPER, losuuid, price_cert_uuid, price_cert_asset_uuid, land_const_item_uuid))
}

// Xóa đối tượng CTXD trên đất trong tài sản BDS
export const deleteLandAssetsWrapper = (
  losuuid: string, 
  price_cert_uuid: string, 
  price_cert_asset_uuid: string ) =>{
  return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_LAND_ASSETS_WRAPPER, losuuid, price_cert_uuid, price_cert_asset_uuid))
}

// Xóa mục đích sửa dụng đất trong thông tin đất
export const deleteLandCertificatePurpose= (
  losuuid: string, 
  price_cert_uuid: string, 
  price_cert_asset_uuid: string,
  re_land_used_uuid: string ) =>{
  return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_LAND_CERTIFICATE_PURPOSE, losuuid, price_cert_uuid, price_cert_asset_uuid,re_land_used_uuid))
}
// Xóa mục đích sửa dụng đất trong thông tin chung cư
export const deleteDepartmentCertificatePurpose= (
  losuuid: string, 
  price_cert_uuid: string, 
  price_cert_asset_uuid: string,
  apart_land_used_uuid: string ) =>{
  return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_DEPARTMENT_CERTIFICATE_PURPOSE, losuuid, price_cert_uuid, price_cert_asset_uuid,apart_land_used_uuid))
}


// Xóa loại CTXD trong Thông tin CTXD
export const deleteCTXDGCNLandAssetType = (
  type: string,
  losuuid: string, 
  price_cert_uuid: string, 
  price_cert_asset_uuid: string,
  land_const_uuid: string,
  land_const_item_uuid: string,
  land_const_item_detail_uuid: string) =>{
    switch(type){
      case ETypeLandName.CTXD_GCN:
        return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE__CERTIFICATE_LAND_ASSETS_TYPE, losuuid, price_cert_uuid, price_cert_asset_uuid, land_const_uuid, land_const_item_detail_uuid))
      case ETypeLandName.CTXD_LAND:
        return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_CTXD_LAND_LAND_ASSETS_TYPE, losuuid, price_cert_uuid, price_cert_asset_uuid, land_const_item_uuid, land_const_item_detail_uuid))
    }
}

// Xóa căn hộ trong Thông tin căn hộ
export const deleteApartmentRoom = (
  losuuid: string, 
  price_cert_uuid: string, 
  price_cert_asset_uuid: string,
  apart_room_uuid : string) =>{
    return apiDelete<unknown>(formatPath(
        API_LOAN_NORMAL_COLLATERAL_DELETE_APARTMENT_ROOM, 
        losuuid, price_cert_uuid, 
        price_cert_asset_uuid, 
        apart_room_uuid
      )
    )
}

// Xóa giấy chứng nhận trong Thông tin pháp lý giấy chứng nhận Chung Cư
export const deleteCertificatesApartment = (
  losuuid: string, 
  price_cert_uuid: string, 
  price_cert_asset_uuid: string,
  apart_owner_cert_uuid: string
) =>{
    return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_APARTMENT_CERTIFICATE, losuuid, price_cert_uuid, price_cert_asset_uuid,apart_owner_cert_uuid))
}

// Xóa người sở hữu trong Thông Tin Pháp Lý Giấy Chứng Nhận
export const deleteCertificatesOwnePersonApartment = (
  type: string,
  losuuid: string, 
  price_cert_uuid: string, 
  price_cert_asset_uuid: string,
  apart_owner_cert_uuid: string,
  apart_owner_cert_item_uuid: string,
  market_cert_uuid: string,
  market_cert_item_uuid: string,
  land_const_uuid: string,
  land_const_item_cert_uuid: string,
  land_const_item_cert_item_uuid: string,
  land_cert_uuid: string,
  re_land_cert_item_uuid: string,
) =>{
   switch(type){
    case 'apartment':
      return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_APARTMENT_CERTIFICATE_OWNER_PERSON, losuuid, price_cert_uuid, price_cert_asset_uuid,apart_owner_cert_uuid,apart_owner_cert_item_uuid))
    case 'market':
      return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_MARKET_CERTIFICATE_OWNER_PERSON, losuuid, price_cert_uuid, price_cert_asset_uuid,market_cert_uuid,market_cert_item_uuid))
    case 'CTXD_GCN':
      return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_CTXD_LAND_CERTIFICATE_OWNER_PERSON, losuuid, price_cert_uuid, price_cert_asset_uuid,land_const_uuid,land_const_item_cert_uuid,land_const_item_cert_item_uuid))
    case "LAND":
      return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_LAND_CERTIFICATE_OWNER_PERSON, losuuid, price_cert_uuid, price_cert_asset_uuid,land_cert_uuid,re_land_cert_item_uuid))
    }
}

// Xóa giấy chứng nhận trong Thông tin pháp lý giấy chứng nhận Chợ
export const deleteCertificatesMarket = (
  losuuid: string, 
  price_cert_uuid: string, 
  price_cert_asset_uuid: string,
  market_cert_uuid: string
) =>{
    return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_COLLATERAL_DELETE_MARKET_CERTIFICATE, losuuid, price_cert_uuid, price_cert_asset_uuid,market_cert_uuid))
}