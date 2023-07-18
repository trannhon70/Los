import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";
import { ILandLegalInformationOwner, ILOANNormalCollateralData, ISubItems, ISubtype } from "types/models/loan/normal/storage/CollaretalV2";

export const DevToolCollateralCase = {

  autoFillAllCollateral(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.collateral_v2.carousel.push({
      "type": "REST",
      "name": "Bất động sản",
      "total": 1
    })

    const dataLegalBorrower = state.storage.full.data?.form.legal_info_form.data.borrower.basic_info

    state.storage.collateral_v2.data.push({
      "uuidActiveData": "1b269a7e-f532-5970-12f5-a085bf6e6067",
      "isSaved": true,
      "uuidActiveSubtype": "1976bf9a-bd1f-c656-ccbc-ee8903556260",
      "is_collapse_type": true,
      "type": "REST",
      "status": "RE_BUSINESS",
      "is_compactness": "Y",
      "valuation_id": "33",
      "valuation_date": 1654049779000,
      "valuation_unit_type": "APPRAISAL_BRANCH",
      "valuation_unit": "001 - SCB Cống Quỳnh",
      "valuation_center": "",
      "valuation_center_opinion": "",
      "independence_organization": "",
      "other_independence_organization": "",
      "purpose": "CREDIT",
      "other_purpose": "",
      "address": "927 Trần Hừng Đạo",
      "province": "89",
      "district": "893",
      "ward": "30667",
      "position_type": "TOWNHOUSE",
      "other_position_type": "",
      "lane_width": "1M_3M",
      "description": "mô tả tài sản",
      "collateral_value": 1200000,
      "max_percentage": 10,
      "documents": [],
      "sub_type": [
        {
          "is_collapse_sub_type": false,
          "uuidItemsActive": "5fb86c6d-c94b-75f8-6937-88df00b3c3a1",
          "uuidActiveSubtype": "1976bf9a-bd1f-c656-ccbc-ee8903556260",
          "id": "LAND",
          "child_sub_type": "HIRI",
          "items": [
            {
              "activeUUID": "5fb86c6d-c94b-75f8-6937-88df00b3c3a1",
              "type_land": "LAND",
              "departmentActiveUUID": "departmentActiveUUID",
              "maketActiveUuid": "maketActiveUuid",
              "current_value_item": 1200000,
              "value": 1200000,
              "collateral_value": 1200000,
              "collateral_code": "86a34f62-9b7f-499e-b7d2-5783a20078d2",
              "year": null,
              "vehicle_identification_number": "",
              "license_number": "",
              "engine_number": "",
              "license_plate": "",
              "departmentInfoActiveUUID": "001001001",
              "documents": [],
              "owner_wrapper": {

              } as unknown as ILandLegalInformationOwner,
              "activeUUIDCertificateUsePurposes": "activeUUIDCertificateUsePurposesdepartment",
              "department": {
                "department_wrapper": {
                  "is_exploited": "N",
                  "value_of_land": 1200000
                } as unknown,
                "department_info_land": {
                  "other_use_purpose": ""
                } as unknown,
                "department_owner": {
                  "active": 0,
                  "owner": []
                } as unknown,
              } as any,
              "market": {
                "maket_wrapper": {
                  "from_credit_extension": "",
                  "is_exploited": "N",
                  "credit_extension_secured": "",
                  "non_business_area": null,
                  "max_percentage": "",
                  "value_of_land": 1200000,
                  "description": "",
                  "has_land_asset": ""
                } as any,
                "maket_info": {
                  "market_name": "",
                  "market_code": "",
                  "location": "",
                  "sector": "",
                  "start_date": 0,
                  "end_date": 0,
                  "remaining": "",
                  "used_area": "",
                  "value_area": "",
                  "structure": ""
                },
                "market_owner": {
                  "active": 0,
                  "owner": []
                } as any
              } as any,
              "land": {  // cuc A
                "land_wrapper": {
                  "from_credit_extension": "Y",
                  "is_exploited": "Y",
                  "credit_extension_secured": "Y",
                  "non_business_area": null,
                  "max_percentage": "10",
                  "value_of_land": 100000,
                  "description": "thông tin nghĩa vụ",
                  "has_land_asset": "Y",
                  "has_certificated_land_asset": "Y"
                } as any,
                "land_legal_information_owner": {
                  "active": 0,
                  "owner_type": "SELF",
                  "owner": [
                    {
                      full_name: dataLegalBorrower?.full_name,
                      person_uuid: dataLegalBorrower?.uuid,
                      "authorized_persons": [],
                      "has_authorize": "N",
                      "active": 0,
                      "owner_uuid": "e740ef51-cd08-4a9d-8985-86af8c890749"
                    }
                  ]
                },
                "land_legal_infomation_asset": {
                  "asset_legal": "927 Long Xuyên",
                  "address": "927 Long Xuyên",
                  "province": "89",
                  "district": "894",
                  "ward": "30712",
                  "certificate_address": "347 Nguyễn Thái Học",
                  "certificate_province": "83",
                  "certificate_district": "836",
                  "certificate_ward": "29173",
                  "use_purposes": ["AGRI"],
                  "purpose_using_lane": [
                    "AGRI"
                  ],
                  "purpose_using_lane_other": "",
                  "activeUUIDCertificateUsePurposes": "4a97e616-48a1-3803-937d-838055bbd62b",
                  "land_asset_types": [
                    {
                      "activeUUIDCertificateUsePurposes": "ce5d77ca-1a34-40a5-95bb-f1e971777385",
                      "use_purpose": "AGRI",
                      "land_number": "33",
                      "map_number": "33",
                      "certificate_area": 531,
                      "real_area": 100,
                      "land_use_source": "LS_09",
                      "other_land_use_source": "",
                      "duration": "44",
                      "usage_form": "PRIVATE",
                      "other_usage_form": "",
                      "re_land_used_uuid": "ce5d77ca-1a34-40a5-95bb-f1e971777385"
                    }
                  ]
                } as any,
                "certificate_legal_info": {
                  "activeUUIDCertificate": "1c75c7e3-39b8-0320-16c1-495f984ea886",
                  "dataCertificate": [
                    {
                      "persons": [
                        {
                          full_name: dataLegalBorrower?.full_name,
                          person_uuid: dataLegalBorrower?.uuid,
                          "authorized_persons": [],
                          "has_authorize": "N",
                          "active": 0,
                          "owner_uuid": "e740ef51-cd08-4a9d-8985-86af8c890749"
                        }
                      ] as any,
                      "activeUUIDUserListLegal": "1cd657f0-81aa-4ff5-a615-e576becaa781",
                      "activeUUIDCertificateL": "1cd657f0-81aa-4ff5-a615-e576becaa781",
                      "typeUseLand": "ALL",
                      "typeGCN": "",
                      "numberGCNLegal": "492783673",
                      "numberGCN": "49375672",
                      "dateRange": 1654049701000,
                      "dateLocation": "Long An",
                      "documents": [],
                      "land_cert_uuid": "1cd657f0-81aa-4ff5-a615-e576becaa781",
                      land_const_item_cert_uuid: "nasdasdu"
                    }
                  ]
                }
              },
              "ctxd_land": {
                "activeCTXDLand": "activeCTXDLand",
                "dataCTXDLand": [
                  {
                    "activeUUIDCTXDLand": "activeCTXDLand",
                    "asset_legal": "ACCEPTOWN",
                    "legal_CTXD_other": "",
                    "address": "100",
                    "provice": "89",
                    "district": "886",
                    "ward": "30355",
                    "certificate_address": "500",
                    "certificate_province": "27",
                    "certificate_district": "262",
                    "certificate_ward": "09445",
                    "activeUUIDtypeCTXD": "activeUUIDtypeCTXD",
                    "documents": [],
                    "land_const_item_uuid": "7c601053-becd-4342-85ab-f98e3242432b",
                    "dataTypeCTXD": [
                      {
                        "activeTypeCTXD": "activeUUIDtypeCTXD",
                        "land_asset_type": "HOUSE",
                        "land_asset_type_other": "",
                        "certificate_building_area": "20",
                        "building_area": "10",
                        "certificate_cross_floor_area": "10",
                        "cross_floor_area": "10",
                        "certificate_used_area": "70",
                        "used_area": "80",
                        "ownership_duration": "90",
                        "owner_form": "100",
                        "certificate_structure": "110",
                        "structure": "120",
                        "certificate_rank": "130",
                        "certificate_floors": "140",
                        "floors": "150",
                        "duration_of_use": "160",
                        "land_const_item_detail_uuid": "b5c2315f-db9f-4c4f-b8f6-539151ce4e53"
                      }
                    ]
                  }
                ],
                "ctx_land_wrapper": {
                  "from_credit_extension": "Y",
                  "is_exploited": "Y",
                  "credit_extension_secured": "Y",
                  "non_business_area": 0,
                  "max_percentage": "10",
                  "value_of_land": 100000,
                  "description": "thông tin nghĩa vụ",
                  "has_land_asset": "",
                  "has_certificated_land_asset": "",
                  "land_const_uuid": "069ab655-d43e-4064-b8c2-0cb0ea12d97f"
                }
              },
              "ctxd_gcn_qsh": {
                "activeUuIdCtxdGcnQsh": "activeUuIdCtxdGcnQsh",
                "ctxd_gcn_qsh_data": [
                  {
                    "land_const_uuid": "15d4399a-8adc-4d9e-8fb4-afb84c04c5c4",
                    "uuIdCtxdGcnQsh": "activeUuIdCtxdGcnQsh",
                    "documents": [],
                    "land_legal_information_owner": {
                      "active": 0,
                      "owner_type": "SELF",
                      "owner": [
                        {
                          full_name: dataLegalBorrower?.full_name,
                          person_uuid: dataLegalBorrower?.uuid,
                          "authorized_persons": [],
                          "has_authorize": "N",
                          "active": 0,
                          "owner_uuid": "e740ef51-cd08-4a9d-8985-86af8c890749"
                        }
                      ] as any,
                    },
                    "certificate_legal_info": {
                      "activeUUIDCertificate": "b8467e67-ca56-0e49-67c1-29990c5aec14",
                      "dataCertificate": [
                        {
                          "persons": [
                            {
                              full_name: dataLegalBorrower?.full_name,
                              person_uuid: dataLegalBorrower?.uuid,
                            }
                          ],
                          "documents": [],
                          "activeUUIDUserListLegal": "a77a393c-1270-e20e-8ffc-2694c6a2d8da",
                          "activeUUIDCertificateL": "09bb3523-e534-7524-3c27-5c4df6a6b9f0",
                          "typeUseLand": "HOUSE_CERT",
                          "typeGCN": "",
                          "numberGCNLegal": "10",
                          "numberGCN": "22",
                          "dateRange": 1654049912000,
                          "dateLocation": "Long An",
                          "land_const_item_cert_uuid": "f9c3b2f1-1392-4b42-b7fd-3f027ef7d661"
                        }
                      ]
                    } as any,
                    "ctxd_gcn_qsh_land_info": {
                      "dataCTXDLand": {
                        "activeUUIDCTXDLand": "764cb74c-bacd-c16c-0894-37a55f4d69ee",
                        "asset_legal": "ACCEPTOWN",
                        "legal_CTXD_other": "",
                        "address": "600",
                        "provice": "06",
                        "district": "060",
                        "ward": "01870",
                        "certificate_address": "70",
                        "certificate_province": "77",
                        "certificate_district": "751",
                        "certificate_ward": "26623",
                        "activeUUIDtypeCTXD": "activeUUIDtypeCTXD",
                        "dataTypeCTXD": [
                          {
                            "activeTypeCTXD": "activeUUIDtypeCTXD",
                            "land_asset_type": "HOUSE",
                            "land_asset_type_other": "",
                            "certificate_building_area": "300",
                            "building_area": "400",
                            "certificate_cross_floor_area": "500",
                            "cross_floor_area": "600",
                            "certificate_used_area": "700",
                            "used_area": "800",
                            "ownership_duration": "900",
                            "owner_form": "1000",
                            "certificate_structure": "1100",
                            "structure": "1200",
                            "certificate_rank": "1300",
                            "certificate_floors": "1400",
                            "floors": "1500",
                            "duration_of_use": "1600",
                            "land_const_item_detail_uuid": "d3d0d99b-8f65-4673-8eb0-da1757c39c01"
                          }
                        ]
                      } as any,
                      "ctx_land_wrapper": {
                        "from_credit_extension": "Y",
                        "is_exploited": "Y",
                        "credit_extension_secured": "Y",
                        "non_business_area": null,
                        "max_percentage": "10",
                        "value_of_land": 1000000,
                        "description": "Thông tin nghĩa vụ đang đảm bảo",
                        "has_land_asset": "",
                        "has_certificated_land_asset": ""
                      } as any,
                      "activeCTXDLand": "98a3306c-5be9-c519-4bb5-b3431a705725"
                    }
                  }
                ]
              },
            }
          ] as unknown as ISubItems[]
        }
      ],
    }) as unknown as ILOANNormalCollateralData[]
  },
  autoFillCollateralDepartment(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.collateral_v2.carousel.push({
      "type": "REST",
      "name": "Bất động sản",
      "total": 1
    })
    const dataLegalBorrower = state.storage.full.data?.form.legal_info_form.data.borrower.basic_info
    state.storage.collateral_v2.data.push(
      {
        "uuidActiveData": "aabf9be1-e882-0d43-e5d3-4a96a70119dc",
        "isSaved": true,
        "uuidActiveSubtype": "ab44d36e-921a-af73-8bb2-60ac1709dd80",
        "is_collapse_type": false,
        "type": "REST",
        "status": "RE_BUSINESS",
        "is_compactness": "Y",
        "valuation_id": "666",
        "valuation_date": 1654048301000,
        "valuation_unit_type": "APPRAISAL_BRANCH",
        "valuation_unit": "001 - SCB Cống Quỳnh",
        "valuation_center": "",
        "valuation_center_opinion": "",
        "independence_organization": "",
        "other_independence_organization": "",
        "purpose": "APPRAISAL",
        "other_purpose": "",
        "address": "567",
        "province": "27",
        "district": "259",
        "ward": "09316",
        "position_type": "RESIDENTTIAL_STREET",
        "other_position_type": "",
        "lane_width": "1M_3M",
        "description": "mo ta tai san loai chung cu",
        "collateral_value": 1000000,
        "max_percentage": 10,
        "documents": [],
        "sub_type": [
          {
            "is_collapse_sub_type": false,
            "uuidItemsActive": "bda1d497-472d-399b-6576-3951fc37ec2d",
            "uuidActiveSubtype": "ab44d36e-921a-af73-8bb2-60ac1709dd80",
            "id": "APPA",
            "child_sub_type": "URRO",
            "items": [
              {
                "activeUUID": "bda1d497-472d-399b-6576-3951fc37ec2d",
                "type_land": "LAND",
                "departmentActiveUUID": "departmentActiveUUID",
                "maketActiveUuid": "maketActiveUuid",
                "current_value_item": 1000000,
                "ratio": 10,
                "value": 1000000,
                "collateral_value": 1000000,
                "collateral_code": "4fc4f269-ec70-4928-93b7-e473e8b63ab9",
                "year": null,
                "info_collatetal": "thông tin nghĩa vụ",
                "vehicle_identification_number": "",
                "license_number": "",
                "engine_number": "",
                "license_plate": "",
                "departmentInfoActiveUUID": "001001001",
                "has_certificate_maket": "Y",
                "documents": [],
                "credit_extension_secured": "Y",
                "owner_wrapper": {
                  "owner_type": "SELF",
                  "owner": [
                    {
                      full_name: dataLegalBorrower?.full_name,
                      person_uuid: dataLegalBorrower?.uuid,
                    }
                  ]
                } as any,
                "activeUUIDCertificateUsePurposes": "activeUUIDCertificateUsePurposesdepartment",
                "department": {
                  "department_wrapper": {
                    "from_credit_extension": "Y",
                    "is_exploited": "Y",
                    "credit_extension_secured": "Y",
                    "max_percentage": "10",
                    "value_of_land": 1000000,
                    "description": "thông tin nghĩa vụ",
                    "has_land_asset": "Y",
                    "has_certificated_land_asset": "Y"
                  },
                  "department_certificate_legal": [
                    {
                      "order": 1,
                      "persons": [
                        {
                          person_uuid: dataLegalBorrower?.uuid,
                          "apart_owner_cert_item_uuid": "b2db426b-8e31-4aa2-8e44-e54723c7982c"
                        }
                      ] as any,
                      "uuid_certificate_legal": "departmentActiveUUID",
                      "other_certificate_type": "ALL",
                      "other_certificate_type_other": "",
                      "certificate_code": "3",
                      "certificate_no": 4,
                      "issue_date": 1654653266000,
                      "place_of_issue": "5",
                      "contract_type": null,
                      "contract_number_type": "",
                      "contract_number": "",
                      "contract_date": 0,
                      "documents": [],
                      "apart_owner_cert_uuid": "a422af75-fe12-4709-b0db-d0c59711e60c"
                    }
                  ],
                  "department_info": [
                    {
                      "departmentInfoActiveUUID": "001001001",
                      "house_type": "loại 1",
                      "apartment_type": "NORMAL",
                      "other_apartment_type": "",
                      "apartment_number": "4",
                      "block": "5",
                      "floor": "6",
                      "start_date": 1654048393000,
                      "certificate_area": 9,
                      "real_area": 8,
                      "usage_form": "10",
                      "duration": "11",
                      "ownership_category": "12",
                      "apart_room_uuid": "43850a59-3ee7-4032-ac77-e7679bb4435b"
                    }
                  ],
                  "department_info_land": {
                    "address": "43",
                    "province": "89",
                    "district": "889",
                    "ward": "30496",
                    "certificate_address": "54",
                    "certificate_province": "95",
                    "certificate_district": "960",
                    "certificate_ward": "31981",
                    "use_purposes": [
                      "RESI"
                    ],
                    "other_use_purpose": "",
                    "purpose_using_lane": [
                      "RESI"
                    ],
                    "certificate_use_purposes": [
                      {
                        "activeUUIDCertificateUsePurposes": "activeUUIDCertificateUsePurposesdepartment",
                        "use_purpose": "AGRI",
                        "land_number": "2",
                        "map_number": "3",
                        "certificate_area": 4,
                        "real_area": 5,
                        "land_use_source": "LS_09",
                        "other_land_use_source": null,
                        "duration": "6",
                        "usage_form": "PUBLIC",
                        "other_usage_form": null
                      }
                    ]
                  },
                  "department_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "authorized_persons": [],
                        "has_authorize": "N",
                        "full_name": dataLegalBorrower?.full_name,
                        "active": 0,
                        "owner_uuid": "9a4c49ff-dcc5-4195-982e-78213bbe6aff",
                        person_uuid: dataLegalBorrower?.uuid,
                      }
                    ]
                  },
                  "project_name": "tên dự án nhà và chung cư",
                  "has_certificate": "Y"
                },
                "market": {
                  "maket_wrapper": {
                    "from_credit_extension": "Y",
                    "is_exploited": "Y",
                    "credit_extension_secured": "Y",
                    "non_business_area": "",
                    "max_percentage": "10",
                    "value_of_land": 1000000,
                    "description": "thông tin nghĩa vụ",
                    "has_land_asset": "",
                    "has_certificated_land_asset": "Y"
                  },
                  "maket_certificates": [
                    {
                      "order": 0,
                      "persons": [
                        {
                          person_uuid: dataLegalBorrower?.uuid,
                          "market_cert_item_uuid": ""
                        }
                      ],
                      "uuid_maket_certificate": "maketActiveUuid",
                      "person_uuid": "",
                      "certificate_name": "",
                      "certificate_code": "3",
                      "issue_date": 1654653266000,
                      "place_of_issue": "5",
                      "contract_name": "",
                      "contract_number": "",
                      "contract_code": "",
                      "contract_date": 0,
                      "contract_unit": "",
                      "documents": [],
                      "market_cert_uuid": ""
                    }
                  ],
                  "maket_info": {
                    "market_name": "",
                    "market_code": "",
                    "location": "",
                    "sector": "",
                    "start_date": 0,
                    "end_date": 0,
                    "remaining": "",
                    "used_area": "",
                    "value_area": "",
                    "structure": ""
                  },
                  "market_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        full_name: dataLegalBorrower?.full_name,
                        person_uuid: dataLegalBorrower?.uuid,
                        "authorized_persons": [],
                        "has_authorize": "N",
                        "active": 0,
                        "owner_uuid": "e740ef51-cd08-4a9d-8985-86af8c890749"
                      }
                    ]
                  }
                },
                "land": {
                  "land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": "",
                    "max_percentage": "",
                    "value_of_land": 0
                  },
                  "land_legal_information_owner": {
                    "active": 0,
                    "owner": []
                  },
                  "land_legal_infomation_asset": {
                    "asset_legal": "",
                    "address": "",
                    "province": "",
                    "district": "",
                    "ward": "",
                    "certificate_address": "",
                    "certificate_province": "",
                    "certificate_district": "",
                    "certificate_ward": "",
                    "purpose_using_lane_other": "",
                    "activeUUIDCertificateUsePurposes": "0c370f48-b6e1-318b-01ce-00c745f22c6a"
                  },
                  "certificate_legal_info": {
                    "activeUUIDCertificate": "c2f6abc0-dc58-9d37-a39d-0c8026b19d5d"
                  }
                },
                "ctxd_land": {
                  "activeCTXDLand": "activeCTXDLand",
                  "dataCTXDLand": [],
                  "ctx_land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": 0,
                    "max_percentage": "",
                    "value_of_land": "",
                    "description": "",
                    "has_land_asset": "",
                    "has_certificated_land_asset": "",
                  }
                },
                "ctxd_gcn_qsh": {
                  "activeUuIdCtxdGcnQsh": "activeUuIdCtxdGcnQsh",
                  "ctxd_gcn_qsh_data": []
                },
                "price_cert_asset_uuid": "3ee8724d-43da-4f57-b1bf-2ba8ce883d3b"
              }
            ]
          }
        ] as unknown as ISubtype[],
      },
    ) as unknown as ILOANNormalCollateralData[]
  },

  postCollateralsAutoFill(state: ILOANNormalState, action: PayloadAction<string>) { },


  autoFillCollateralMarket(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.collateral_v2.carousel.push({
      "type": "REST",
      "name": "Bất động sản",
      "total": 1
    })
    const dataLegalBorrower = state.storage.full.data?.form.legal_info_form.data.borrower.basic_info
    state.storage.collateral_v2.data.push(
      {
        "uuidActiveData": "92f16772-80c2-8117-e306-57fdaae91ac7",
        "isSaved": true,
        "uuidActiveSubtype": "35ba4666-95a6-518c-8e32-6047b23f7983",
        "is_collapse_type": false,
        "type": "REST",
        "status": "RE_BUSINESS",
        "is_compactness": "Y",
        "valuation_id": "69568476094",
        "valuation_date": 1654049661000,
        "valuation_unit_type": "APPRAISAL_BRANCH",
        "valuation_unit": "001 - SCB Cống Quỳnh",
        "valuation_center": "",
        "valuation_center_opinion": "",
        "independence_organization": "",
        "other_independence_organization": "",
        "purpose": "CREDIT",
        "other_purpose": "",
        "address": "44",
        "province": "77",
        "district": "751",
        "ward": "26656",
        "position_type": "TOWNHOUSE",
        "other_position_type": "",
        "lane_width": "3M_5M",
        "description": "loai tài sản chợ",
        "collateral_value": 100000,
        "max_percentage": 10,
        "documents": [],
        "sub_type": [
          {
            "is_collapse_sub_type": false,
            "uuidItemsActive": "758d1de2-d75b-566d-5e42-8e4f1da34423",
            "uuidActiveSubtype": "35ba4666-95a6-518c-8e32-6047b23f7983",
            "id": "MARK",
            "child_sub_type": "MRMA",
            "items": [
              {
                "activeUUID": "758d1de2-d75b-566d-5e42-8e4f1da34423",
                "type_land": "LAND",
                "departmentActiveUUID": "departmentActiveUUID",
                "maketActiveUuid": "maketActiveUuid",
                "current_value_item": 100000,
                "ratio": 10,
                "value": 100000,
                "collateral_value": 100000,
                "collateral_code": "208e79b4-9f36-44f4-a25a-bacbfa62ae62",
                "year": null,
                "info_collatetal": "thông tin nghĩa vụ",
                "vehicle_identification_number": "",
                "license_number": "",
                "engine_number": "",
                "license_plate": "",
                "departmentInfoActiveUUID": "001001001",
                "has_certificate_maket": "Y",
                "documents": [],
                "credit_extension_secured": "Y",
                "owner_wrapper": {
                  "owner_type": "SELF",
                  "owner": [
                    {
                      full_name: dataLegalBorrower?.full_name,
                      person_uuid: dataLegalBorrower?.uuid,
                    }
                  ]
                },
                "activeUUIDCertificateUsePurposes": "activeUUIDCertificateUsePurposesdepartment",
                "department": {
                  "department_wrapper": {
                    "from_credit_extension": "Y",
                    "is_exploited": "Y",
                    "credit_extension_secured": "Y",
                    "max_percentage": "10",
                    "value_of_land": 100000,
                    "description": "thông tin nghĩa vụ",
                    "has_land_asset": "Y",
                    "has_certificated_land_asset": "Y"
                  },
                  "department_certificate_legal": [
                    {
                      "order": 1,
                      "persons": [
                        {
                          full_name: dataLegalBorrower?.full_name,
                          person_uuid: dataLegalBorrower?.uuid,
                        }
                      ],
                      "uuid_certificate_legal": "departmentActiveUUID",
                      "certificate_code": "23432",
                      "issue_date": 1654049732000,
                      "place_of_issue": "Củ Chi",
                      "contract_date": 1654049748000,
                      "documents": [],
                      "apart_owner_cert_uuid": ""
                    }
                  ],
                  "department_info_land": {
                    "other_use_purpose": "",
                    "purpose_using_lane_other": ""
                  },
                  "department_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "authorized_persons": [],
                        "has_authorize": "N",
                        "active": 0,
                        "owner_uuid": "06882796-9f31-44d9-811f-500bc3f84a2b",
                        full_name: dataLegalBorrower?.full_name,
                        person_uuid: dataLegalBorrower?.uuid,
                      }
                    ]
                  },
                  "has_certificate": "Y"
                },
                "market": {
                  "maket_wrapper": {
                    "from_credit_extension": "Y",
                    "is_exploited": "Y",
                    "credit_extension_secured": "Y",
                    "non_business_area": null,
                    "max_percentage": "10",
                    "value_of_land": 100000,
                    "description": "thông tin nghĩa vụ",
                    "has_land_asset": "",
                    "has_certificated_land_asset": "Y"
                  },
                  "maket_certificates": [
                    {
                      "order": 0,
                      "persons": [
                        {
                          person_uuid: dataLegalBorrower?.uuid,
                        }
                      ],
                      "uuid_maket_certificate": "maketActiveUuid",
                      "certificate_name": "Huỳnh Lâm Hào",
                      "certificate_code": "23432",
                      "issue_date": 1654049732000,
                      "place_of_issue": "Củ Chi",
                      "contract_name": "tên hợp đồng",
                      "contract_number": "",
                      "contract_code": "3453654",
                      "contract_date": 1654049748000,
                      "contract_unit": "1234",
                      "documents": [],
                      "market_cert_uuid": "421ed925-cfb5-4367-96d4-22ff9284aad7"
                    }
                  ],
                  "maket_info": {
                    "market_name": "Chợ Củ Chi",
                    "market_code": "59308562",
                    "location": "Củ Chi",
                    "sector": "Bán Đất",
                    "start_date": 1654049775000,
                    "end_date": 1656555377000,
                    "remaining": "123",
                    "used_area": "333",
                    "value_area": "44",
                    "structure": "22"
                  },
                  "market_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        full_name: dataLegalBorrower?.full_name,
                        person_uuid: dataLegalBorrower?.uuid,
                        "authorized_persons": [],
                        "has_authorize": "N",
                        "active": 0,
                        "owner_uuid": "e740ef51-cd08-4a9d-8985-86af8c890749"
                      }
                    ]
                  }
                },
                "land": {
                  "land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": "",
                    "max_percentage": "",
                    "value_of_land": 0
                  },
                  "land_legal_information_owner": {
                    "active": 0,
                    "owner": []
                  },
                  "land_legal_infomation_asset": {
                    "asset_legal": "",
                    "address": "",
                    "province": "",
                    "district": "",
                    "ward": "",
                    "certificate_address": "",
                    "certificate_province": "",
                    "certificate_district": "",
                    "certificate_ward": "",
                    "purpose_using_lane_other": "",
                    "activeUUIDCertificateUsePurposes": "activeUUIDCertificateUsePurposes"
                  },
                  "certificate_legal_info": {
                    "activeUUIDCertificate": "4f438512-2455-03e5-0408-5f17f02553f1"
                  }
                },
                "ctxd_land": {
                  "activeCTXDLand": "activeCTXDLand",
                  "dataCTXDLand": [],
                  "ctx_land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": 0,
                    "max_percentage": "",
                    "value_of_land": null,
                    "description": "",
                    "has_land_asset": "",
                    "has_certificated_land_asset": ""
                  }
                },
                "ctxd_gcn_qsh": {
                  "activeUuIdCtxdGcnQsh": "activeUuIdCtxdGcnQsh",
                  "ctxd_gcn_qsh_data": []
                },
              }
            ] as unknown as ISubItems[]
          }
        ] as unknown as ISubtype[],
      },
    ) as unknown as ILOANNormalCollateralData[]
  },
  autoFillCollateralMEST(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.collateral_v2.carousel.push({
      "name": "Phương tiện vận tải",
      "type": "MEST",
      "total": 1
    })
    const dataLegalBorrower = state.storage.full.data?.form.legal_info_form.data.borrower.basic_info
    state.storage.collateral_v2.data.push(
      {
        "uuidActiveData": "92f16772-80c2-8117-e306-57fdaae91ac7",
        "isSaved": true,
        "uuidActiveSubtype": "35ba4666-95a6-518c-8e32-6047b23f7983",
        "is_collapse_type": false,
        "type": "MEST",
        "status": "RE_BUSINESS",
        "is_compactness": "Y",
        "valuation_id": "69568476094",
        "valuation_date": 1654049661000,
        "valuation_unit_type": "APPRAISAL_BRANCH",
        "valuation_unit": "001 - SCB Cống Quỳnh",
        "valuation_center": "",
        "valuation_center_opinion": "",
        "independence_organization": "",
        "other_independence_organization": "",
        "purpose": "CREDIT",
        "other_purpose": "",
        "address": "44",
        "province": "77",
        "district": "751",
        "ward": "26656",
        "position_type": "TOWNHOUSE",
        "other_position_type": "",
        "lane_width": "3M_5M",
        "description": "loai tài sản",
        "collateral_value": 100000,
        "max_percentage": 10,
        "documents": [],
        "sub_type": [
          {
            "is_collapse_sub_type": false,
            "uuidItemsActive": "758d1de2-d75b-566d-5e42-8e4f1da34423",
            "uuidActiveSubtype": "35ba4666-95a6-518c-8e32-6047b23f7983",
            "id": "TRVE",
            "child_sub_type": "MRMA",
            "items": [
              {
                "activeUUID": "0cb8758b-bf44-e87b-290e-9e8039a58698",
                "type_land": "LAND",
                "departmentActiveUUID": "departmentActiveUUID",
                "maketActiveUuid": "maketActiveUuid",
                "current_value_item": 100000,
                "ratio": 10,
                "value": 100000,
                "license": "57483534",
                "status": "OLD",
                "status_flag": {
                  "id": "OLD",
                  "name": null,
                  "other_value_flag": null
                },
                "description": "mo ta tai san",
                "collateral_value": 100000,
                "collateral_code": "36b84b46-a74b-4231-b21e-0cf69789ab60",
                "branch": "KIA",
                "model": "FJEWIFF",
                "year": null,
                "info_collatetal": "thông tin nghĩa vụ",
                "number_register": "57483534",
                "CLCL": 232323,
                "production": {
                  "id": "JP",
                  "name": null,
                  "other_value_flag": null
                },
                "origin_of_production": "JP",
                "other_origin_of_production": null,
                "vehicle_identification_number": "33343265",
                "license_number": "33343265",
                "engine_number": "2343654345",
                "license_plate": "23452",
                "departmentInfoActiveUUID": "001001001",
                "documents": [],
                "transportation_sub_type": "Ôtô con",
                "other_transportation_sub_type": null,
                "legal_document_types": [
                  {
                    "id": "CERT",
                    "name": null,
                    "other_value_flag": null,
                    "documents": [
                      {
                        "id": "CERT_1",
                        "name": null,
                        "other_value_flag": "N"
                      }
                    ],
                    "other_document": ""
                  },
                  {
                    "id": "DECL",
                    "name": null,
                    "other_value_flag": null,
                    "documents": [
                      {
                        "id": "DECL_1",
                        "name": null,
                        "other_value_flag": "N"
                      }
                    ],
                    "other_document": ""
                  }
                ],
                "credit_extension_secured": "Y",
                "owner_wrapper": {
                  "owner_type": "SELF",
                  "owner": [
                    {
                      "full_name": dataLegalBorrower?.full_name,
                      "person_uuid": dataLegalBorrower?.uuid,
                      "owner_uuid": "ac241a21-aa56-46d9-bb3f-b8e13d2aed63"
                    }
                  ]
                },
                "activeUUIDCertificateUsePurposes": "activeUUIDCertificateUsePurposesdepartment",
                "department": {
                  "department_wrapper": {
                    "is_exploited": "N",
                    "credit_extension_secured": "Y",
                    "max_percentage": "10",
                    "value_of_land": 100000,
                    "description": "thông tin nghĩa vụ"
                  },
                  "department_info_land": {
                    "other_use_purpose": ""
                  },
                  "department_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "authorized_persons": [],
                        "full_name": dataLegalBorrower?.full_name,
                        "person_uuid": dataLegalBorrower?.uuid,
                        "active": 0,
                        "owner_uuid": "ac241a21-aa56-46d9-bb3f-b8e13d2aed63"
                      }
                    ]
                  }
                },
                "market": {
                  "maket_wrapper": {
                    "from_credit_extension": "",
                    "is_exploited": "N",
                    "credit_extension_secured": "Y",
                    "non_business_area": "",
                    "max_percentage": "10",
                    "value_of_land": 100000,
                    "description": "thông tin nghĩa vụ",
                    "has_land_asset": ""
                  },
                  "maket_info": {
                    "market_name": "",
                    "market_code": "",
                    "location": "",
                    "sector": "",
                    "start_date": 0,
                    "end_date": 0,
                    "remaining": "",
                    "used_area": "",
                    "value_area": "",
                    "structure": ""
                  },
                  "market_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "full_name": dataLegalBorrower?.full_name,
                        "person_uuid": dataLegalBorrower?.uuid,
                        "authorized_persons": [],
                        "active": 0,
                        "owner_uuid": "ac241a21-aa56-46d9-bb3f-b8e13d2aed63"
                      }
                    ]
                  }
                },
                "land": {
                  "land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": "",
                    "max_percentage": "",
                    "value_of_land": 0
                  },
                  "land_legal_information_owner": {
                    "active": 0,
                    "owner": []
                  },
                  "land_legal_infomation_asset": {
                    "asset_legal": "",
                    "address": "",
                    "province": "",
                    "district": "",
                    "ward": "",
                    "certificate_address": "",
                    "certificate_province": "",
                    "certificate_district": "",
                    "certificate_ward": "",
                    "purpose_using_lane_other": "",
                    "activeUUIDCertificateUsePurposes": "a9de9e65-c130-f2f4-25d9-b87374b05c75"
                  },
                  "certificate_legal_info": {
                    "activeUUIDCertificate": "55576108-e9b2-8135-fc9e-ef6a68a98715"
                  }
                },
                "ctxd_land": {
                  "activeCTXDLand": "activeCTXDLand",
                  "dataCTXDLand": [],
                  "ctx_land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": 0,
                    "max_percentage": "",
                    "value_of_land": "",
                    "description": "",
                    "has_land_asset": "",
                    "has_certificated_land_asset": ""
                  }
                },
                "ctxd_gcn_qsh": {
                  "activeUuIdCtxdGcnQsh": "activeUuIdCtxdGcnQsh",
                  "ctxd_gcn_qsh_data": []
                },
                "price_cert_asset_uuid": "32fa35de-249c-4c8b-bdf3-f9c6646a5871"
              }
            ]
          }
        ] as unknown as ISubtype[],
      },
    ) as unknown as ILOANNormalCollateralData[]
  },

  autoFillCollateralMachine(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.collateral_v2.carousel.push({
      "type": "DEVI",
      "name": "MMTB; Dây chuyền sản xuất",
      "total": 1
    })
    const dataLegalBorrower = state.storage.full.data?.form.legal_info_form.data.borrower.basic_info
    state.storage.collateral_v2.data.push(
      {
        "uuidActiveData": "92f16772-80c2-8117-e306-57fdaae91ac7",
        "isSaved": true,
        "uuidActiveSubtype": "35ba4666-95a6-518c-8e32-6047b23f7983",
        "is_collapse_type": false,
        "type": "DEVI",
        "status": "RE_BUSINESS",
        "is_compactness": "Y",
        "valuation_id": "69568476094",
        "valuation_date": 1654049661000,
        "valuation_unit_type": "APPRAISAL_BRANCH",
        "valuation_unit": "001 - SCB Cống Quỳnh",
        "valuation_center": "",
        "valuation_center_opinion": "",
        "independence_organization": "",
        "other_independence_organization": "",
        "purpose": "CREDIT",
        "other_purpose": "",
        "address": "44",
        "province": "77",
        "district": "751",
        "ward": "26656",
        "position_type": "TOWNHOUSE",
        "other_position_type": "",
        "lane_width": "3M_5M",
        "description": "loai tài sản",
        "collateral_value": 100000,
        "max_percentage": 10,
        "documents": [],
        "sub_type": [
          {
            "is_collapse_sub_type": false,
            "uuidItemsActive": "ff663474-0d82-44ed-5c26-7fe6ad7caed8",
            "uuidActiveSubtype": "6a4d7c69-0d1d-3d97-5b29-01e6111f62bc",
            "id": "DEVI",
            "child_sub_type": "MRMA",
            "items": [
              {
                "activeUUID": "ff663474-0d82-44ed-5c26-7fe6ad7caed8",
                "type_land": "LAND",
                "departmentActiveUUID": "departmentActiveUUID",
                "maketActiveUuid": "maketActiveUuid",
                "current_value_item": 200000,
                "ratio": 20,
                "value": 200000,
                "typeCollateral": "loai tai san",
                "license": "giấy tờ đăng ký",
                "status": "EXIST",
                "status_flag": {
                  "id": "EXIST",
                  "name": null,
                  "other_value_flag": null
                },
                "description": "mô tả tài sản",
                "collateral_value": 200000,
                "collateral_code": "ab7a115f-9e99-488f-a03f-59ac87f4333a",
                "count": 4,
                "branch": "MADTE",
                "model": "LDOWMN",
                "year": 2020,
                "info_collatetal": "thông tin nghia vu",
                "quantity": 5,
                "number_register": "giấy tờ đăng ký",
                "CLCL": 423,
                "production": "nơi sản xuất",
                "vehicle_identification_number": "",
                "license_number": "",
                "engine_number": "",
                "license_plate": "",
                "departmentInfoActiveUUID": "001001001",
                "documents": [],
                "credit_extension_secured": "Y",
                "owner_wrapper": {
                  "owner_type": "SELF",
                  "owner": [
                    {
                      full_name: dataLegalBorrower?.full_name,
                      person_uuid: dataLegalBorrower?.uuid,
                      "owner_uuid": "73b9ce9c-d529-498b-9797-d0f246f4e95f"
                    }
                  ]
                },
                "activeUUIDCertificateUsePurposes": "activeUUIDCertificateUsePurposesdepartment",
                "department": {
                  "department_wrapper": {
                    "is_exploited": "N",
                    "credit_extension_secured": "Y",
                    "max_percentage": "10",
                    "value_of_land": 100000,
                    "description": "thông tin nghĩa vụ"
                  },
                  "department_info_land": {
                    "other_use_purpose": ""
                  },
                  "department_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "authorized_persons": [],
                        full_name: dataLegalBorrower?.full_name,
                        person_uuid: dataLegalBorrower?.uuid,
                        "active": 0,
                        "owner_uuid": "ac241a21-aa56-46d9-bb3f-b8e13d2aed63"
                      }
                    ]
                  }
                },
                "market": {
                  "maket_wrapper": {
                    "from_credit_extension": "",
                    "is_exploited": "N",
                    "credit_extension_secured": "Y",
                    "non_business_area": "",
                    "max_percentage": "10",
                    "value_of_land": 100000,
                    "description": "thông tin nghĩa vụ",
                    "has_land_asset": ""
                  },
                  "maket_info": {
                    "market_name": "",
                    "market_code": "",
                    "location": "",
                    "sector": "",
                    "start_date": 0,
                    "end_date": 0,
                    "remaining": "",
                    "used_area": "",
                    "value_area": "",
                    "structure": ""
                  },
                  "market_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "full_name": dataLegalBorrower?.full_name,
                        "person_uuid": dataLegalBorrower?.uuid,
                        "authorized_persons": [],
                        "active": 0,
                        "owner_uuid": "ac241a21-aa56-46d9-bb3f-b8e13d2aed63"
                      }
                    ]
                  }
                },
                "land": {
                  "land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": "",
                    "max_percentage": "",
                    "value_of_land": 0
                  },
                  "land_legal_information_owner": {
                    "active": 0,
                    "owner": []
                  },
                  "land_legal_infomation_asset": {
                    "asset_legal": "",
                    "address": "",
                    "province": "",
                    "district": "",
                    "ward": "",
                    "certificate_address": "",
                    "certificate_province": "",
                    "certificate_district": "",
                    "certificate_ward": "",
                    "purpose_using_lane_other": "",
                    "activeUUIDCertificateUsePurposes": "a9de9e65-c130-f2f4-25d9-b87374b05c75"
                  },
                  "certificate_legal_info": {
                    "activeUUIDCertificate": "55576108-e9b2-8135-fc9e-ef6a68a98715"
                  }
                },
                "ctxd_land": {
                  "activeCTXDLand": "activeCTXDLand",
                  "dataCTXDLand": [],
                  "ctx_land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": 0,
                    "max_percentage": "",
                    "value_of_land": "",
                    "description": "",
                    "has_land_asset": "",
                    "has_certificated_land_asset": ""
                  }
                },
                "ctxd_gcn_qsh": {
                  "activeUuIdCtxdGcnQsh": "activeUuIdCtxdGcnQsh",
                  "ctxd_gcn_qsh_data": []
                },
                "price_cert_asset_uuid": "32fa35de-249c-4c8b-bdf3-f9c6646a5871"
              }
            ]
          }
        ] as unknown as ISubtype[],
      },
    ) as unknown as ILOANNormalCollateralData[]
  },

  autoFillCollateralGoods(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.collateral_v2.carousel.push({
      "type": "GODS",
      "name": "Vật tư hàng hóa",
      "total": 1
    })
    const dataLegalBorrower = state.storage.full.data?.form.legal_info_form.data.borrower.basic_info
    state.storage.collateral_v2.data.push(
      {
        "uuidActiveData": "607724e5-0024-67a5-a37d-a6a9124f6fd3",
        "isSaved": true,
        "uuidActiveSubtype": "f87adedb-bc69-bbdf-abd2-8d889a43fd00",
        "is_collapse_type": false,
        "type": "GODS",
        "status": "RE_BUSINESS",
        "is_compactness": "Y",
        "valuation_id": "69568476094",
        "valuation_date": 1654049661000,
        "valuation_unit_type": "APPRAISAL_BRANCH",
        "valuation_unit": "001 - SCB Cống Quỳnh",
        "valuation_center": "",
        "valuation_center_opinion": "",
        "independence_organization": "",
        "other_independence_organization": "",
        "purpose": "CREDIT",
        "other_purpose": "",
        "address": "44",
        "province": "77",
        "district": "751",
        "ward": "26656",
        "position_type": "TOWNHOUSE",
        "other_position_type": "",
        "lane_width": "3M_5M",
        "description": "loai tài sản",
        "collateral_value": 100000,
        "max_percentage": 50,
        "documents": [],
        "sub_type": [
          {
            "is_collapse_sub_type": false,
            "uuidItemsActive": "2bf56e01-6385-9328-54c4-6738ac3fa762",
            "uuidActiveSubtype": "f87adedb-bc69-bbdf-abd2-8d889a43fd00",
            "id": "GODS",
            "child_sub_type": "MRMA",
            "items": [
              {
                "activeUUID": "ff663474-0d82-44ed-5c26-7fe6ad7caed8",
                "type_land": "LAND",
                "departmentActiveUUID": "departmentActiveUUID",
                "maketActiveUuid": "maketActiveUuid",
                "current_value_item": 100000,
                "ratio": 50,
                "value": 100000,
                "typeCollateral": "loại 1",
                "license": "231253426585",
                "status": "OLD",
                "status_flag": {
                  "id": "EXIST",
                  "name": null,
                  "other_value_flag": null
                },
                "description": "mô tả tài sản",
                "collateral_value": 100000,
                "collateral_code": "ab7a115f-9e99-488f-a03f-59ac87f4333a",
                "count": 4,
                "branch": "MADTE",
                "model": "LDOWMN",
                "year": 2020,
                "info_collatetal": "thông tin nghia vu",
                "quantity": 5,
                "number_register": "giấy tờ đăng ký",
                "CLCL": 423,
                "production": "nơi sản xuất",
                "vehicle_identification_number": "",
                "license_number": "",
                "engine_number": "",
                "license_plate": "",
                "departmentInfoActiveUUID": "001001001",
                "documents": [],
                "credit_extension_secured": "Y",
                "owner_wrapper": {
                  "owner_type": "SELF",
                  "owner": [
                    {
                      full_name: dataLegalBorrower?.full_name,
                      person_uuid: dataLegalBorrower?.uuid,
                      "owner_uuid": "73b9ce9c-d529-498b-9797-d0f246f4e95f"
                    }
                  ]
                },
                "activeUUIDCertificateUsePurposes": "activeUUIDCertificateUsePurposesdepartment",
                "department": {
                  "department_wrapper": {
                    "is_exploited": "N",
                    "credit_extension_secured": "Y",
                    "max_percentage": "10",
                    "value_of_land": 100000,
                    "description": "thông tin nghĩa vụ"
                  },
                  "department_info_land": {
                    "other_use_purpose": ""
                  },
                  "department_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "authorized_persons": [],
                        full_name: dataLegalBorrower?.full_name,
                        person_uuid: dataLegalBorrower?.uuid,
                        "active": 0,
                        "owner_uuid": "ac241a21-aa56-46d9-bb3f-b8e13d2aed63"
                      }
                    ]
                  }
                },
                "market": {
                  "maket_wrapper": {
                    "from_credit_extension": "",
                    "is_exploited": "N",
                    "credit_extension_secured": "Y",
                    "non_business_area": "",
                    "max_percentage": "10",
                    "value_of_land": 100000,
                    "description": "thông tin nghĩa vụ",
                    "has_land_asset": ""
                  },
                  "maket_info": {
                    "market_name": "",
                    "market_code": "",
                    "location": "",
                    "sector": "",
                    "start_date": 0,
                    "end_date": 0,
                    "remaining": "",
                    "used_area": "",
                    "value_area": "",
                    "structure": ""
                  },
                  "market_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "full_name": dataLegalBorrower?.full_name,
                        "person_uuid": dataLegalBorrower?.uuid,
                        "authorized_persons": [],
                        "active": 0,
                        "owner_uuid": "ac241a21-aa56-46d9-bb3f-b8e13d2aed63"
                      }
                    ]
                  }
                },
                "land": {
                  "land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": "",
                    "max_percentage": "",
                    "value_of_land": 0
                  },
                  "land_legal_information_owner": {
                    "active": 0,
                    "owner": []
                  },
                  "land_legal_infomation_asset": {
                    "asset_legal": "",
                    "address": "",
                    "province": "",
                    "district": "",
                    "ward": "",
                    "certificate_address": "",
                    "certificate_province": "",
                    "certificate_district": "",
                    "certificate_ward": "",
                    "purpose_using_lane_other": "",
                    "activeUUIDCertificateUsePurposes": "a9de9e65-c130-f2f4-25d9-b87374b05c75"
                  },
                  "certificate_legal_info": {
                    "activeUUIDCertificate": "55576108-e9b2-8135-fc9e-ef6a68a98715"
                  }
                },
                "ctxd_land": {
                  "activeCTXDLand": "activeCTXDLand",
                  "dataCTXDLand": [],
                  "ctx_land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": 0,
                    "max_percentage": "",
                    "value_of_land": "",
                    "description": "",
                    "has_land_asset": "",
                    "has_certificated_land_asset": ""
                  }
                },
                "ctxd_gcn_qsh": {
                  "activeUuIdCtxdGcnQsh": "activeUuIdCtxdGcnQsh",
                  "ctxd_gcn_qsh_data": []
                },
                "price_cert_asset_uuid": "32fa35de-249c-4c8b-bdf3-f9c6646a5871"
              }
            ]
          }
        ] as unknown as ISubtype[],
      },
    ) as unknown as ILOANNormalCollateralData[]
  },

  autoFillCollateralProd(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.collateral_v2.carousel.push({
      "type": "RPRO",
      "name": "Quyền tài sản",
      "total": 1
    })
    const dataLegalBorrower = state.storage.full.data?.form.legal_info_form.data.borrower.basic_info
    state.storage.collateral_v2.data.push(
      {
        "uuidActiveData": "eef7928a-4cf6-89b9-af63-5847697ca917",
        "isSaved": true,
        "uuidActiveSubtype": "013d050c-a152-f4b5-e646-adc09f9199fd",
        "is_collapse_type": false,
        "type": "RPRO",
        "status": "RE_BUSINESS",
        "is_compactness": "Y",
        "valuation_id": "69568476094",
        "valuation_date": 1654049661000,
        "valuation_unit_type": "APPRAISAL_BRANCH",
        "valuation_unit": "001 - SCB Cống Quỳnh",
        "valuation_center": "",
        "valuation_center_opinion": "",
        "independence_organization": "",
        "other_independence_organization": "",
        "purpose": "CREDIT",
        "other_purpose": "",
        "address": "44",
        "province": "77",
        "district": "751",
        "ward": "26656",
        "position_type": "TOWNHOUSE",
        "other_position_type": "",
        "lane_width": "3M_5M",
        "description": "loai tài sản",
        "collateral_value": 100000,
        "max_percentage": 50,
        "documents": [],
        "sub_type": [
          {
            "is_collapse_sub_type": false,
            "uuidItemsActive": "68a87a85-2958-c745-f578-df132a4f561b",
            "uuidActiveSubtype": "013d050c-a152-f4b5-e646-adc09f9199fd",
            "id": "RPRO",
            "child_sub_type": "MRMA",
            "items": [
              {
                "activeUUID": "68a87a85-2958-c745-f578-df132a4f561b",
                "type_land": "LAND",
                "departmentActiveUUID": "departmentActiveUUID",
                "maketActiveUuid": "maketActiveUuid",
                "current_value_item": 200000,
                "ratio": 10,
                "value": 200000,
                "typeCollateral": "loai 2",
                "license": "79850785",
                "status": "EXIST",
                "status_flag": {
                  "id": "EXIST",
                  "name": null,
                  "other_value_flag": null
                },
                "description": "mô tả tài sản",
                "collateral_value": 200000,
                "collateral_code": "be0adbe4-bcb3-4f81-b6c0-9212ba7c6d06",
                "year": null,
                "number_register": "79850785",
                "vehicle_identification_number": "",
                "license_number": "",
                "engine_number": "",
                "license_plate": "",
                "departmentInfoActiveUUID": "001001001",
                "documents": [],
                "owner_wrapper": {
                  "owner_type": "SELF",
                  "owner": [
                    {
                      full_name: dataLegalBorrower?.full_name,
                      person_uuid: dataLegalBorrower?.uuid,
                      "owner_uuid": "b374afc4-0d44-4080-beff-236652e8a4e2"
                    }
                  ]
                },
                "activeUUIDCertificateUsePurposes": "activeUUIDCertificateUsePurposesdepartment",
                "department": {
                  "department_wrapper": {
                    "is_exploited": "N",
                    "max_percentage": "10",
                    "value_of_land": 200000
                  },
                  "department_info_land": {
                    "other_use_purpose": ""
                  },
                  "department_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "authorized_persons": [],
                        full_name: dataLegalBorrower?.full_name,
                        person_uuid: dataLegalBorrower?.uuid,
                        "active": 0,
                        "owner_uuid": "b374afc4-0d44-4080-beff-236652e8a4e2"
                      }
                    ]
                  }
                },
                "market": {
                  "maket_wrapper": {
                    "from_credit_extension": "",
                    "is_exploited": "N",
                    "credit_extension_secured": "",
                    "non_business_area": "",
                    "max_percentage": "10",
                    "value_of_land": 200000,
                    "description": "",
                    "has_land_asset": ""
                  },
                  "maket_info": {
                    "market_name": "",
                    "market_code": "",
                    "location": "",
                    "sector": "",
                    "start_date": 0,
                    "end_date": 0,
                    "remaining": "",
                    "used_area": "",
                    "value_area": "",
                    "structure": ""
                  },
                  "market_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "full_name": "123",
                        "authorized_persons": [],
                        "person_uuid": "38112687-0ba4-4514-9a58-bc4442004029",
                        "active": 0,
                        "owner_uuid": "b374afc4-0d44-4080-beff-236652e8a4e2"
                      }
                    ]
                  }
                },
                "land": {
                  "land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": "",
                    "max_percentage": "",
                    "value_of_land": 0
                  },
                  "land_legal_information_owner": {
                    "active": 0,
                    "owner": []
                  },
                  "land_legal_infomation_asset": {
                    "asset_legal": "",
                    "address": "",
                    "province": "",
                    "district": "",
                    "ward": "",
                    "certificate_address": "",
                    "certificate_province": "",
                    "certificate_district": "",
                    "certificate_ward": "",
                    "purpose_using_lane_other": "",
                    "activeUUIDCertificateUsePurposes": "dd3188c4-62a2-7057-5bb9-84ba32b78eba"
                  },
                  "certificate_legal_info": {
                    "activeUUIDCertificate": "3c0cc147-ec88-3ead-c7e7-2830b46e9730"
                  }
                },
                "ctxd_land": {
                  "activeCTXDLand": "activeCTXDLand",
                  "dataCTXDLand": [],
                  "ctx_land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": 0,
                    "max_percentage": "",
                    "value_of_land": "",
                    "description": "",
                    "has_land_asset": "",
                    "has_certificated_land_asset": ""
                  }
                },
                "ctxd_gcn_qsh": {
                  "activeUuIdCtxdGcnQsh": "activeUuIdCtxdGcnQsh",
                  "ctxd_gcn_qsh_data": []
                },
              }
            ]
          }
        ] as unknown as ISubtype[],
      },
    ) as unknown as ILOANNormalCollateralData[]
  },

  autoFillCollateralStoc(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.collateral_v2.carousel.push({
      "type": "STOC",
      "name": "Chứng khoán",
      "total": 1
    })
    const dataLegalBorrower = state.storage.full.data?.form.legal_info_form.data.borrower.basic_info
    state.storage.collateral_v2.data.push(
      {
        "uuidActiveData": "eef7928a-4cf6-89b9-af63-5847697ca917",
        "isSaved": true,
        "uuidActiveSubtype": "4e5de0a8-6142-b3e1-acee-ef71934f40bc",
        "is_collapse_type": false,
        "type": "RPRO",
        "status": "RE_BUSINESS",
        "is_compactness": "Y",
        "valuation_id": "69568476094",
        "valuation_date": 1654049661000,
        "valuation_unit_type": "APPRAISAL_BRANCH",
        "valuation_unit": "001 - SCB Cống Quỳnh",
        "valuation_center": "",
        "valuation_center_opinion": "",
        "independence_organization": "",
        "other_independence_organization": "",
        "purpose": "CREDIT",
        "other_purpose": "",
        "address": "44",
        "province": "77",
        "district": "751",
        "ward": "26656",
        "position_type": "TOWNHOUSE",
        "other_position_type": "",
        "lane_width": "3M_5M",
        "description": "loai tài sản",
        "collateral_value": 10000,
        "max_percentage": 10,
        "documents": [],
       
        "sub_type": [
          {
            "is_collapse_sub_type": false,
            "uuidItemsActive": "26f4b0f7-2a49-0ce4-d335-7714a8ea6901",
            "uuidActiveSubtype": "4e5de0a8-6142-b3e1-acee-ef71934f40bc",
            "id": "STOC",
            "child_sub_type": "MRMA",
            "items": [
              {
                "activeUUID": "26f4b0f7-2a49-0ce4-d335-7714a8ea6901",
                "type_land": "LAND",
                "departmentActiveUUID": "departmentActiveUUID",
                "maketActiveUuid": "maketActiveUuid",
                "current_value_item": 10000,
                "ratio": 10,
                "value": 10000,
                "typeCollateral": "loai tai san",
                "license": "60596867849",
                "status": "NEW",
                "status_flag": "NEW",
                "description": "mô tả tài sản",
                "collateral_value": 10000,
                "collateral_code": "e9cd2dff-1888-489b-a0ae-b7eab3b81725",
                "year": null,
                "number_register": "60596867849",
                "vehicle_identification_number": "",
                "license_number": "",
                "engine_number": "",
                "license_plate": "",
                "departmentInfoActiveUUID": "001001001",
                "documents": [],
                "owner_wrapper": {
                  "owner_type": "SELF",
                  "owner": [
                    {
                      full_name: dataLegalBorrower?.full_name,
                      person_uuid: dataLegalBorrower?.uuid,
                      "owner_uuid": "40c8cc1b-4161-46ce-a4f3-2773fd9025b8"
                    }
                  ]
                },
                "activeUUIDCertificateUsePurposes": "activeUUIDCertificateUsePurposesdepartment",
                "department": {
                  "department_wrapper": {
                    "is_exploited": "N",
                    "max_percentage": "10",
                    "value_of_land": 10000
                  },
                  "department_info_land": {
                    "other_use_purpose": ""
                  },
                  "department_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "authorized_persons": [],
                        "full_name": "123",
                        "person_uuid": "38112687-0ba4-4514-9a58-bc4442004029",
                        "active": 0,
                        "owner_uuid": "40c8cc1b-4161-46ce-a4f3-2773fd9025b8"
                      }
                    ]
                  }
                },
                "market": {
                  "maket_wrapper": {
                    "from_credit_extension": "",
                    "is_exploited": "N",
                    "credit_extension_secured": "",
                    "non_business_area": "",
                    "max_percentage": "10",
                    "value_of_land": 10000,
                    "description": "",
                    "has_land_asset": ""
                  },
                  "maket_info": {
                    "market_name": "",
                    "market_code": "",
                    "location": "",
                    "sector": "",
                    "start_date": 0,
                    "end_date": 0,
                    "remaining": "",
                    "used_area": "",
                    "value_area": "",
                    "structure": ""
                  },
                  "market_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "full_name": "123",
                        "authorized_persons": [],
                        "person_uuid": "38112687-0ba4-4514-9a58-bc4442004029",
                        "active": 0,
                        "owner_uuid": "40c8cc1b-4161-46ce-a4f3-2773fd9025b8"
                      }
                    ]
                  }
                },
                "land": {
                  "land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": "",
                    "max_percentage": "",
                    "value_of_land": 0
                  },
                  "land_legal_information_owner": {
                    "active": 0,
                    "owner": []
                  },
                  "land_legal_infomation_asset": {
                    "asset_legal": "",
                    "address": "",
                    "province": "",
                    "district": "",
                    "ward": "",
                    "certificate_address": "",
                    "certificate_province": "",
                    "certificate_district": "",
                    "certificate_ward": "",
                    "purpose_using_lane_other": "",
                    "activeUUIDCertificateUsePurposes": "eeb7e549-8375-2690-4cf1-9d71da22d590"
                  },
                  "certificate_legal_info": {
                    "activeUUIDCertificate": "ca8c213e-2b62-9960-39a3-76342458f80f"
                  }
                },
                "ctxd_land": {
                  "activeCTXDLand": "activeCTXDLand",
                  "dataCTXDLand": [],
                  "ctx_land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": 0,
                    "max_percentage": "",
                    "value_of_land": "",
                    "description": "",
                    "has_land_asset": "",
                    "has_certificated_land_asset": ""
                  }
                },
                "ctxd_gcn_qsh": {
                  "activeUuIdCtxdGcnQsh": "activeUuIdCtxdGcnQsh",
                  "ctxd_gcn_qsh_data": []
                },
                "price_cert_asset_uuid": "5f82693d-5114-42a3-be0b-8c3ea648b575"
              }
            ]
          }
        ] as unknown as ISubtype[],
      },
    ) as unknown as ILOANNormalCollateralData[]
  },

  autoFillCollateralBalc(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.collateral_v2.carousel.push({
      "type": "BALC",
      "name": "Số dư TKTG, HTTG, GTCG",
      "total": 1
    })
    const dataLegalBorrower = state.storage.full.data?.form.legal_info_form.data.borrower.basic_info
    state.storage.collateral_v2.data.push(
      {
        "uuidActiveData": "eef7928a-4cf6-89b9-af63-5847697ca917",
        "isSaved": true,
        "uuidActiveSubtype": "4e5de0a8-6142-b3e1-acee-ef71934f40bc",
        "is_collapse_type": false,
        "type": "BALC",
        "status": "RE_BUSINESS",
        "is_compactness": "Y",
        "valuation_id": "69568476094",
        "valuation_date": 1654049661000,
        "valuation_unit_type": "APPRAISAL_BRANCH",
        "valuation_unit": "001 - SCB Cống Quỳnh",
        "valuation_center": "",
        "valuation_center_opinion": "",
        "independence_organization": "",
        "other_independence_organization": "",
        "purpose": "CREDIT",
        "other_purpose": "",
        "address": "44",
        "province": "77",
        "district": "751",
        "ward": "26656",
        "position_type": "TOWNHOUSE",
        "other_position_type": "",
        "lane_width": "3M_5M",
        "description": "loai tài sản",
        "collateral_value": 100000,
        "max_percentage": 10,
        "documents": [],
        "sub_type": [
          {
            "is_collapse_sub_type": false,
            "uuidItemsActive": "d5df9193-3621-8fe6-3b34-913478a9740c",
            "uuidActiveSubtype": "c58e7f9b-b0ae-d0c5-ba89-40dcfc79d398",
            "id": "BALC",
            "child_sub_type": "MRMA",
            "items": [
              {
                "activeUUID": "d5df9193-3621-8fe6-3b34-913478a9740c",
                "type_land": "LAND",
                "departmentActiveUUID": "departmentActiveUUID",
                "maketActiveUuid": "maketActiveUuid",
                "current_value_item": 100000,
                "ratio": 10,
                "value": 100000,
                "typeCollateral": "ACCOUNT_BALANCE",
                "license": "200",
                "status": "NEW",
                "status_flag": "NEW",
                "description": "tai san mo ta",
                "collateral_value": 100000,
                "collateral_code": "9c4d1db3-c0bf-4565-9fd3-2459a865883b",
                "year": null,
                "number_register": "200",
                "issuer": "106",
                "other_issuer": null,
                "vehicle_identification_number": "",
                "license_number": "",
                "engine_number": "",
                "license_plate": "",
                "departmentInfoActiveUUID": "001001001",
                "documents": [],
                "owner_wrapper": {
                  "owner_type": "SELF",
                  "owner": [
                    {
                      "full_name": dataLegalBorrower?.full_name,
                      "person_uuid": dataLegalBorrower?.uuid,
                      "owner_uuid": "0453b5ca-62f7-4219-bc77-0dea9f8b5944"
                    }
                  ]
                },
                "activeUUIDCertificateUsePurposes": "activeUUIDCertificateUsePurposesdepartment",
                "department": {
                  "department_wrapper": {
                    "is_exploited": "N",
                    "max_percentage": "10",
                    "value_of_land": 100000
                  },
                  "department_info_land": {
                    "other_use_purpose": ""
                  },
                  "department_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "authorized_persons": [],
                        "full_name": "123",
                        "person_uuid": "38112687-0ba4-4514-9a58-bc4442004029",
                        "active": 0,
                        "owner_uuid": "0453b5ca-62f7-4219-bc77-0dea9f8b5944"
                      }
                    ]
                  }
                },
                "market": {
                  "maket_wrapper": {
                    "from_credit_extension": "",
                    "is_exploited": "N",
                    "credit_extension_secured": "",
                    "non_business_area": "",
                    "max_percentage": "10",
                    "value_of_land": 100000,
                    "description": "",
                    "has_land_asset": ""
                  },
                  "maket_info": {
                    "market_name": "",
                    "market_code": "",
                    "location": "",
                    "sector": "",
                    "start_date": 0,
                    "end_date": 0,
                    "remaining": "",
                    "used_area": "",
                    "value_area": "",
                    "structure": ""
                  },
                  "market_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "full_name": "123",
                        "authorized_persons": [],
                        "person_uuid": "38112687-0ba4-4514-9a58-bc4442004029",
                        "active": 0,
                        "owner_uuid": "0453b5ca-62f7-4219-bc77-0dea9f8b5944"
                      }
                    ]
                  }
                },
                "land": {
                  "land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": "",
                    "max_percentage": "",
                    "value_of_land": 0
                  },
                  "land_legal_information_owner": {
                    "active": 0,
                    "owner": []
                  },
                  "land_legal_infomation_asset": {
                    "asset_legal": "",
                    "address": "",
                    "province": "",
                    "district": "",
                    "ward": "",
                    "certificate_address": "",
                    "certificate_province": "",
                    "certificate_district": "",
                    "certificate_ward": "",
                    "purpose_using_lane_other": "",
                    "activeUUIDCertificateUsePurposes": "5550dc35-cf50-cdca-dd5b-a0574a6e0c5d"
                  },
                  "certificate_legal_info": {
                    "activeUUIDCertificate": "df3b9335-f45e-1626-d1e5-229d86c164a1"
                  }
                },
                "ctxd_land": {
                  "activeCTXDLand": "activeCTXDLand",
                  "dataCTXDLand": [],
                  "ctx_land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": 0,
                    "max_percentage": "",
                    "value_of_land": "",
                    "description": "",
                    "has_land_asset": "",
                    "has_certificated_land_asset": ""
                  }
                },
                "ctxd_gcn_qsh": {
                  "activeUuIdCtxdGcnQsh": "activeUuIdCtxdGcnQsh",
                  "ctxd_gcn_qsh_data": []
                },
                "price_cert_asset_uuid": "ad43dace-707c-4bf4-8a9a-1791a4134ec7"
              }
            ]
          }
        ] as unknown as ISubtype[],
      },
    ) as unknown as ILOANNormalCollateralData[]
  },

  autoFillCollateralOther(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.collateral_v2.carousel.push({
      "type": "OTHE",
      "name": "Tài sản khác",
      "total": 1
    })
    const dataLegalBorrower = state.storage.full.data?.form.legal_info_form.data.borrower.basic_info
    state.storage.collateral_v2.data.push(
      {
        "uuidActiveData": "eef7928a-4cf6-89b9-afss63-5847697ca917",
        "isSaved": true,
        "uuidActiveSubtype": "4e5de0a8-6142-b3e1-acee-ef71934f40bc",
        "is_collapse_type": false,
        "type": "OTHE",
        "status": "RE_BUSINESS",
        "is_compactness": "Y",
        "valuation_id": "69568476094",
        "valuation_date": 1654049661000,
        "valuation_unit_type": "APPRAISAL_BRANCH",
        "valuation_unit": "001 - SCB Cống Quỳnh",
        "valuation_center": "",
        "valuation_center_opinion": "",
        "independence_organization": "",
        "other_independence_organization": "",
        "purpose": "CREDIT",
        "other_purpose": "",
        "address": "44",
        "province": "77",
        "district": "751",
        "ward": "26656",
        "position_type": "TOWNHOUSE",
        "other_position_type": "",
        "lane_width": "3M_5M",
        "description": "loai tài sản",
        "collateral_value": 200000,
        "max_percentage": 20,
        "documents": [],
       
        "sub_type": [
          {
            "is_collapse_sub_type": false,
            "uuidItemsActive": "26f4b0f7-2a49-0ce4-d335-7714a8ea6901",
            "uuidActiveSubtype": "4e5de0a8-6142-b3e1-acee-ef71934f40bc",
            "id": "STOC",
            "child_sub_type": "MRMA",
            "items": [
              {
                "activeUUID": "1bb56520-c0e8-54d3-4aee-bbc8cb34deab",
                "type_land": "LAND",
                "departmentActiveUUID": "departmentActiveUUID",
                "maketActiveUuid": "maketActiveUuid",
                "current_value_item": 200000,
                "ratio": 20,
                "value": 200000,
                "typeCollateral": "loai tai san",
                "license": "so giay to",
                "status": "OLD",
                "status_flag": "OLD",
                "description": "mô ta tai san",
                "collateral_value": 200000,
                "collateral_code": "93c7d4bb-3169-4d05-8808-75777ef28ba7",
                "year": null,
                "number_register": "so giay to",
                "vehicle_identification_number": "",
                "license_number": "",
                "engine_number": "",
                "license_plate": "",
                "departmentInfoActiveUUID": "001001001",
                "documents": [],
                "owner_wrapper": {
                  "owner_type": "SELF",
                  "owner": [
                    {
                      "full_name": dataLegalBorrower?.full_name,
                      "person_uuid": dataLegalBorrower?.uuid,
                      "owner_uuid": "cbd613ca-1895-44ad-8c35-9e4794853fd3"
                    }
                  ]
                },
                "activeUUIDCertificateUsePurposes": "activeUUIDCertificateUsePurposesdepartment",
                "department": {
                  "department_wrapper": {
                    "is_exploited": "N",
                    "max_percentage": "20",
                    "value_of_land": 200000
                  },
                  "department_info_land": {
                    "other_use_purpose": ""
                  },
                  "department_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "authorized_persons": [],
                        "full_name": "123",
                        "person_uuid": "38112687-0ba4-4514-9a58-bc4442004029",
                        "active": 0,
                        "owner_uuid": "cbd613ca-1895-44ad-8c35-9e4794853fd3"
                      }
                    ]
                  }
                },
                "market": {
                  "maket_wrapper": {
                    "from_credit_extension": "",
                    "is_exploited": "N",
                    "credit_extension_secured": "",
                    "non_business_area": "",
                    "max_percentage": "20",
                    "value_of_land": 200000,
                    "description": "",
                    "has_land_asset": ""
                  },
                  "maket_info": {
                    "market_name": "",
                    "market_code": "",
                    "location": "",
                    "sector": "",
                    "start_date": 0,
                    "end_date": 0,
                    "remaining": "",
                    "used_area": "",
                    "value_area": "",
                    "structure": ""
                  },
                  "market_owner": {
                    "active": 0,
                    "owner_type": "SELF",
                    "owner": [
                      {
                        "full_name": "123",
                        "authorized_persons": [],
                        "person_uuid": "38112687-0ba4-4514-9a58-bc4442004029",
                        "active": 0,
                        "owner_uuid": "cbd613ca-1895-44ad-8c35-9e4794853fd3"
                      }
                    ]
                  }
                },
                "land": {
                  "land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": "",
                    "max_percentage": "",
                    "value_of_land": 0
                  },
                  "land_legal_information_owner": {
                    "active": 0,
                    "owner": []
                  },
                  "land_legal_infomation_asset": {
                    "asset_legal": "",
                    "address": "",
                    "province": "",
                    "district": "",
                    "ward": "",
                    "certificate_address": "",
                    "certificate_province": "",
                    "certificate_district": "",
                    "certificate_ward": "",
                    "purpose_using_lane_other": "",
                    "activeUUIDCertificateUsePurposes": "f3dc0992-a2be-fa0e-b73f-f39b60019586"
                  },
                  "certificate_legal_info": {
                    "activeUUIDCertificate": "40cb9a85-3a3b-b592-44b7-b23614c6b868"
                  }
                },
                "ctxd_land": {
                  "activeCTXDLand": "activeCTXDLand",
                  "dataCTXDLand": [],
                  "ctx_land_wrapper": {
                    "from_credit_extension": "N",
                    "is_exploited": "N",
                    "credit_extension_secured": "N",
                    "non_business_area": 0,
                    "max_percentage": "",
                    "value_of_land": "",
                    "description": "",
                    "has_land_asset": "",
                    "has_certificated_land_asset": ""
                  }
                },
                "ctxd_gcn_qsh": {
                  "activeUuIdCtxdGcnQsh": "activeUuIdCtxdGcnQsh",
                  "ctxd_gcn_qsh_data": []
                },
                "price_cert_asset_uuid": "de8304ef-91da-40fc-97fe-2d7227730599"
              }
            ]
          }
        ] as unknown as ISubtype[],
      },
    ) as unknown as ILOANNormalCollateralData[]
  },

}