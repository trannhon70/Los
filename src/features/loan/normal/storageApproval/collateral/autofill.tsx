import { ILOANNormalCollateralData } from "types/models/loan/normal/storage/CollaretalV2"
import { generateUUID } from "utils"


export const autofillMARKETTTT = () => ({
    "uuidActiveData":"asdasdasd",
    "isSaved": true,
    "uuidActiveSubtype": "b3a0dd42-4db6-47ad-78cf-26113cc40584",
    "is_collapse_type": false,
    "type": "REST",
    "status": "RE_BUSINESS",
    "is_compactness": "Y",
    "valuation_id": "mt123123",
    "valuation_date": 1648016012000,
    "valuation_unit_type": "APPRAISAL_BRANCH",
    "valuation_unit": "001 - Cống quỳnh",
    "valuation_center": "",
    "valuation_center_opinion": null,
    "independence_organization": "",
    "other_independence_organization": null,
    "purpose": "CREDIT",
    "other_purpose": null,
    "address": "",
    "province": "89",
    "district": "886",
    "ward": "30337",
    "position_type": "TOWNHOUSE",
    "other_position_type": null,
    "lane_width": "LT_1M",
    "description": "HCM",
    "collateral_value": 22222,
    "max_percentage": 10,
    "sub_type": [
      {
        "is_collapse_sub_type": false,
        "uuidItemsActive": "subItemActiveUUID",
        "uuidActiveSubtype": "b3a0dd42-4db6-47ad-78cf-26113cc40584",
        "id": "APPA",
        "child_sub_type": "URRO",
        "items": [
          {
            "activeUUID": "subItemActiveUUID",
            "type_land": "LAND",
            "departmentActiveUUID": "departmentActiveUUID",
            "maketActiveUuid": "maketActiveUuid",
            "current_value_item": 10000,
            "ratio": 10,
            "value": 10000,
            "collateral_value": 10000,
            "collateral_code": "d6a83e07-729c-4dd3-a759-ff994f83d915",
            "year": null,
            "info_collatetal": "test",
            "vehicle_identification_number": "",
            "license_number": "",
            "engine_number": "",
            "license_plate": "",
            "departmentInfoActiveUUID": "001001001",
            "has_certificate_maket": "Y",
            "credit_extension_secured": "Y",
            "owner_wrapper": {
              "owner_type": "SELF",
              "owner": [
              ]
            },
            "activeUUIDCertificateUsePurposes": "activeUUIDCertificateUsePurposesdepartment",
            "department": {
              "department_wrapper": {
                "from_credit_extension": "Y",
                "is_exploited": "Y",
                "credit_extension_secured": "Y",
                "max_percentage": "10",
                "value_of_land": 10000,
                "description": "test",
                "has_land_asset": "Y",
                "has_certificated_land_asset": "Y"
              },
              "department_certificate_legal": [
                {
                  "order": 1,
                  "persons": [
                   
                  ],
                  "uuid_certificate_legal": "departmentActiveUUID",
                  "other_certificate_type": "LAND_CERT",
                  "other_certificate_type_other": null,
                  "certificate_code": "123213",
                  "certificate_no": "123213",
                  "issue_date": 1648016086000,
                  "place_of_issue": "123213",
                  "contract_type": null,
                  "contract_number_type": null,
                  "contract_number": null,
                  "contract_date": 0
                }
              ],
              "department_info": [
                {
                  "departmentInfoActiveUUID": "001001001",
                  "house_type": "test",
                  "apartment_type": "SHOPHOUSE",
                  "other_apartment_type": null,
                  "apartment_number": "123",
                  "block": "123",
                  "floor": "123",
                  "start_date": 1648016104000,
                  "certificate_area": 12321,
                  "real_area": 12321,
                  "usage_form": null,
                  "duration": null,
                  "ownership_category": null
                }
              ],
              "department_info_land": {
                "address": "12312",
                "province": "89",
                "district": "886",
                "ward": "30341",
                "certificate_address": "12321",
                "certificate_province": "60",
                "certificate_district": "601",
                "certificate_ward": "23266",
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
                    "land_number": null,
                    "map_number": null,
                    "certificate_area": 123,
                    "real_area": 123,
                    "land_use_source": "LS_04",
                    "other_land_use_source": null,
                    "duration": "123213",
                    "usage_form": "PUBLIC",
                    "other_usage_form": null
                  }
                ]
              },
              "department_owner": {
                "active": 0,
                "owner_type": "SELF",
                "owner": [
                  
                ]
              },
              "project_name": "test",
              "has_certificate": "Y"
            },
            "market": {
              "maket_wrapper": {
                "from_credit_extension": "Y",
                "is_exploited": "Y",
                "credit_extension_secured": "Y",
                "non_business_area": "",
                "max_percentage": "10",
                "value_of_land": 10000,
                "description": "test",
                "has_land_asset": "",
                "has_certificated_land_asset": "Y"
              },
              "maket_certificates": [
                {
                  "order": 0,
                  "persons": [
                  
                  ],
                  "uuid_maket_certificate": "maketActiveUuid",
                  "person_uuid": "",
                  "certificate_name": "",
                  "certificate_code": "123213",
                  "issue_date": 1648016086000,
                  "place_of_issue": "123213",
                  "contract_name": "",
                  "contract_number": "",
                  "contract_code": "",
                  "contract_date": 0,
                  "contract_unit": ""
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
                "activeUUIDCertificateUsePurposes": "616fd1f5-002d-f8cf-9aab-2406f2a79484"
              },
              "certificate_legal_info": {
                "activeUUIDCertificate": "343ea4fc-e0cd-99fd-737a-d268482b07c1"
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
            }
          },
        ]
      }
    ],
    "price_cert_uuid": ""
})


export const autofillLANDDDDDD = () =>({
  "uuidActiveData":"40734666-e193-1d73-2d45-50ce7e48cd65",
  "isSaved":false,
  "uuidActiveSubtype":"30a563dd-9625-f311-98c6-3cdb048a569b",
  "is_collapse_type":true,
  "type":"REST",
  "status":"RE_NOT_BUSINESS",
  "is_compactness":"Y",
  "valuation_id":"234",
  "valuation_date":1646923214000,
  "valuation_unit_type":"APPRAISAL_BRANCH",
  "valuation_unit":"001 - Cống quỳnh",
  "valuation_center":"",
  "valuation_center_opinion":null,
  "independence_organization":"",
  "other_independence_organization":null,
  "purpose":"DEBT",
  "other_purpose":null,
  "address":"123",
  "province":"74",
  "district":"720",
  "ward":"25780",
  "position_type":"RESIDENTTIAL_STREET",
  "other_position_type":null,
  "lane_width":"1M_3M",
  "description":"23",
  "collateral_value":10000,
  "max_percentage":23,
  "sub_type":[
     {
        "is_collapse_sub_type":false,
        "uuidItemsActive":"subItemActiveUUID",
        "uuidActiveSubtype":"30a563dd-9625-f311-98c6-3cdb048a569b",
        "id":"LAND",
        "child_sub_type":"BRIN",
        "items":[
           {
              "activeUUID":"subItemActiveUUID",
              "type_land":"LAND",
              "departmentActiveUUID":"departmentActiveUUID",
              "maketActiveUuid":"maketActiveUuid",
              "current_value_item":10000,
              "value":10000,
              "collateral_value":10000,
              "collateral_code":"83f67488-d30c-439e-87b1-7cc244e30873",
              "year":null,
              "vehicle_identification_number":"",
              "license_number":"",
              "engine_number":"",
              "license_plate":"",
              "departmentInfoActiveUUID":"001001001",
              "owner_wrapper":{
                 "owner":[
                    
                 ]
              },
              "activeUUIDCertificateUsePurposes":"activeUUIDCertificateUsePurposesdepartment",
              "department":{
                 "department_wrapper":{
                    "value_of_land":10000
                 },
                 "department_info_land":{
                    "other_use_purpose":""
                 },
                 "department_owner":{
                    "active":0,
                    "owner":[
                       
                    ]
                 }
              },
              "market":{
                 "maket_wrapper":{
                    "from_credit_extension":"",
                    "is_exploited":"",
                    "credit_extension_secured":"",
                    "non_business_area":"",
                    "max_percentage":"",
                    "value_of_land":10000,
                    "description":"",
                    "has_land_asset":""
                 },
                 "maket_info":{
                    "market_name":"",
                    "market_code":"",
                    "location":"",
                    "sector":"",
                    "start_date":0,
                    "end_date":0,
                    "remaining":"",
                    "used_area":"",
                    "value_area":"",
                    "structure":""
                 },
                 "market_owner":{
                    "active":0,
                    "owner":[
                       
                    ]
                 }
              },
              "land":{
                 "land_wrapper":{
                    "from_credit_extension":"Y",
                    "is_exploited":"Y",
                    "credit_extension_secured":"Y",
                    "non_business_area":"",
                    "max_percentage":"10",
                    "value_of_land":10000,
                    "description":"123",
                    "has_land_asset":"N",
                    "has_certificated_land_asset":"N"
                 },
                 "land_legal_information_owner":{
                    "active":0,
                    "owner_type":"SELF",
                    "owner":[
                      
                    ]
                 },
                 "land_legal_infomation_asset":{
                    "asset_legal":"123",
                    "address":"123",
                    "province":"74",
                    "district":"722",
                    "ward":"25864",
                    "certificate_address":"333",
                    "certificate_province":"06",
                    "certificate_district":"063",
                    "certificate_ward":"01999",
                    "use_purposes":[
                       "PROD"
                    ],
                    "purpose_using_lane":[
                       "PROD"
                    ],
                    "purpose_using_lane_other":"",
                    "activeUUIDCertificateUsePurposes":"45ccde20-5390-b2b0-0aab-0df9a3382844",
                    "land_asset_types":[
                       {
                          "activeUUIDCertificateUsePurposes":"02edcd28-3a8a-4f3b-9055-d373dd2878ce",
                          "use_purpose":"RESI",
                          "land_number":"22",
                          "map_number":"22",
                          "certificate_area":22,
                          "real_area":22,
                          "land_use_source":"LS_10",
                          "other_land_use_source":"",
                          "duration":"22",
                          "usage_form":"OTHER",
                          "other_usage_form":"222"
                       }
                    ]
                 },
                 "certificate_legal_info":{
                    "activeUUIDCertificate":"05b4b29b-7efc-9b59-0fb7-0b479c06eee8",
                    "dataCertificate":[
                       {
                          "persons":[
                         
                          ],
                          "activeUUIDUserListLegal":"15d2cc59-8b66-4a13-bc12-b9aa929129b2",
                          "activeUUIDCertificateL":"15d2cc59-8b66-4a13-bc12-b9aa929129b2",
                          "typeUseLand":"LAND_CERT",
                          "typeGCN":null,
                          "numberGCNLegal":"123",
                          "numberGCN":"123",
                          "dateRange":1646232049000,
                          "dateLocation":"123"
                       }
                    ]
                 }
              },
              "ctxd_land":{
                 "activeCTXDLand":"activeCTXDLand",
                 "dataCTXDLand":[
                    
                 ],
                 "ctx_land_wrapper":{
                    "from_credit_extension":"N",
                    "is_exploited":"N",
                    "credit_extension_secured":"N",
                    "non_business_area":0,
                    "max_percentage":"",
                    "value_of_land":"",
                    "description":"",
                    "has_land_asset":"",
                    "has_certificated_land_asset":""
                 }
              },
              "ctxd_gcn_qsh":{
                 "activeUuIdCtxdGcnQsh":"activeUuIdCtxdGcnQsh",
                 "ctxd_gcn_qsh_data":[
                    
                 ]
              }
           }
        ]
     }
  ],
  "price_cert_uuid":""
})

export const autofillDEPARTTTTTTTT = () =>({
  "uuidActiveData":"a0afbb1f-0f79-d442-4075-3deb11a21edb",
  "isSaved":true,
  "uuidActiveSubtype":"54820770-b406-c863-920b-1fe174d3beb3",
  "is_collapse_type":true,
  "type":"REST",
  "status":"RE_NOT_BUSINESS",
  "is_compactness":"Y",
  "valuation_id":"123",
  "valuation_date":1646404057000,
  "valuation_unit_type":"APPRAISAL_BRANCH",
  "valuation_unit":"001 - Cống quỳnh",
  "valuation_center":"",
  "valuation_center_opinion":null,
  "independence_organization":"",
  "other_independence_organization":null,
  "purpose":"APPRAISAL",
  "other_purpose":null,
  "address":"2323",
  "province":"06",
  "district":"060",
  "ward":"01861",
  "position_type":"SUB_ALLEY",
  "other_position_type":null,
  "lane_width":"12M_20M",
  "description":"2222",
  "collateral_value":11111111,
  "max_percentage":22,
  "sub_type":[
     {
        "is_collapse_sub_type":false,
        "uuidItemsActive":"subItemActiveUUID",
        "uuidActiveSubtype":"54820770-b406-c863-920b-1fe174d3beb3",
        "id":"MARK",
        "child_sub_type":"MRMA",
        "items":[
           {
              "activeUUID":"subItemActiveUUID",
              "type_land":"LAND",
              "departmentActiveUUID":"departmentActiveUUID",
              "maketActiveUuid":"maketActiveUuid",
              "current_value_item":11111111,
              "ratio":10,
              "value":11111111,
              "collateral_value":11111111,
              "collateral_code":"2b57192f-d76a-4720-816b-33bdcae5ed0e",
              "year":null,
              "info_collatetal":"123123",
              "vehicle_identification_number":"",
              "license_number":"",
              "engine_number":"",
              "license_plate":"",
              "departmentInfoActiveUUID":"001001001",
              "has_certificate_maket":"N",
              "credit_extension_secured":"Y",
              "owner_wrapper":{
                 "owner_type":"SELF",
                 "owner":[
                 
                 ]
              },
              "activeUUIDCertificateUsePurposes":"activeUUIDCertificateUsePurposesdepartment",
              "department":{
                 "department_wrapper":{
                    "from_credit_extension":"Y",
                    "is_exploited":"Y",
                    "credit_extension_secured":"Y",
                    "max_percentage":"10",
                    "value_of_land":11111111,
                    "description":"123123",
                    "has_land_asset":"N",
                    "has_certificated_land_asset":"N"
                 },
                 "department_certificate_legal":[
                    {
                       "order":1,
                       "persons":[
                         
                       ],
                       "uuid_certificate_legal":"departmentActiveUUID",
                       "certificate_code":null,
                       "issue_date":0,
                       "place_of_issue":null,
                       "contract_date":1646836090000
                    }
                 ],
                 "department_info_land":{
                    "other_use_purpose":""
                 },
                 "department_owner":{
                    "active":0,
                    "owner_type":"SELF",
                    "owner":[
                   
                    ]
                 },
                 "has_certificate":"N"
              },
              "market":{
                 "maket_wrapper":{
                    "from_credit_extension":"Y",
                    "is_exploited":"Y",
                    "credit_extension_secured":"Y",
                    "non_business_area":"",
                    "max_percentage":"10",
                    "value_of_land":11111111,
                    "description":"123123",
                    "has_land_asset":"",
                    "has_certificated_land_asset":"N"
                 },
                 "maket_certificates":[
                    {
                       "order":0,
                       "persons":[
                         
                       ],
                       "uuid_maket_certificate":"maketActiveUuid",
                       "person_uuid":"",
                       "certificate_name":"",
                       "certificate_code":"",
                       "issue_date":0,
                       "place_of_issue":"",
                       "contract_name":"123",
                       "contract_number":"",
                       "contract_code":"123",
                       "contract_date":1646836090000,
                       "contract_unit":"123"
                    }
                 ],
                 "maket_info":{
                    "market_name":"123",
                    "market_code":"123",
                    "location":"123",
                    "sector":"123",
                    "start_date":1647354496000,
                    "end_date":1647354497000,
                    "remaining":"123",
                    "used_area":"123",
                    "value_area":"123",
                    "structure":"123"
                 },
                 "market_owner":{
                    "active":0,
                    "owner_type":"SELF",
                    "owner":[
                    
                    ]
                 }
              },
              "land":{
                 "land_wrapper":{
                    "from_credit_extension":"N",
                    "is_exploited":"N",
                    "credit_extension_secured":"N",
                    "non_business_area":"",
                    "max_percentage":"",
                    "value_of_land":0
                 },
                 "land_legal_information_owner":{
                    "active":0,
                    "owner":[
                       
                    ]
                 },
                 "land_legal_infomation_asset":{
                    "asset_legal":"",
                    "address":"",
                    "province":"",
                    "district":"",
                    "ward":"",
                    "certificate_address":"",
                    "certificate_province":"",
                    "certificate_district":"",
                    "certificate_ward":"",
                    "purpose_using_lane_other":"",
                    "activeUUIDCertificateUsePurposes":"0ba734b9-a23e-a41c-3b63-c019f4dd17d9"
                 },
                 "certificate_legal_info":{
                    "activeUUIDCertificate":"43ef358b-77f1-1404-9611-3d8d5481adcf"
                 }
              },
              "ctxd_land":{
                 "activeCTXDLand":"activeCTXDLand",
                 "dataCTXDLand":[
                    
                 ],
                 "ctx_land_wrapper":{
                    "from_credit_extension":"N",
                    "is_exploited":"N",
                    "credit_extension_secured":"N",
                    "non_business_area":0,
                    "max_percentage":"",
                    "value_of_land":"",
                    "description":"",
                    "has_land_asset":"",
                    "has_certificated_land_asset":""
                 }
              },
              "ctxd_gcn_qsh":{
                 "activeUuIdCtxdGcnQsh":"activeUuIdCtxdGcnQsh",
                 "ctxd_gcn_qsh_data":[
                    
                 ]
              }
           }
        ]
     }
  ],
  "price_cert_uuid":""
})

export const autoFillBDS = {
  "activeType": "ALL",
  "carousel": [
    {
      "name": "Bất động sản",
      "type": "REST",
      "total": 1
    }
  ],
  "uuidActiveData": "54772cf8-d41d-3005-ebc1-f829dd55052d",
  "data": [
    {
      "carousel": [],
      "uuidActiveData": "54772cf8-d41d-3005-ebc1-f829dd55052d",
      "is_collapse_type": true,
      "type": "REST",
      "status": "RE_MIXED",
      "is_compactness": "Y",
      "valuation_id": "111",
      "valuation_date": 1644378749000,
      "valuation_unit_type": "APPRAISAL_BRANCH",
      "valuation_unit": "222",
      "valuation_center": "",
      "valuation_center_opinion": "",
      "independence_organization": "",
      "other_independence_organization": "",
      "purpose": "CREDIT",
      "other_purpose": "",
      "address": "211",
      "province": "95",
      "district": "960",
      "ward": "31978",
      "position_type": "RESIDENTTIAL_STREET",
      "other_position_type": "",
      "lane_width": "LT_1M",
      "description": "222",
      "collateral_value": 42,
      "max_percentage": "2",
      "uuidActiveSubtype": "9d71ba90-8700-8495-bb6d-b5c3de1cb838",
      "sub_type": [
        {
          "uuidActiveSubtype": "9d71ba90-8700-8495-bb6d-b5c3de1cb838",
          "is_collapse_sub_type": true,
          "id": "LAND",
          "uuidItemsActive": "eb10db8b-62a1-3fa1-9a7f-f3b9473c2757",
          "items": [
            {
              "activeUUID": "eb10db8b-62a1-3fa1-9a7f-f3b9473c2757",
              "departmentActiveUUID": "",
              "maketActiveUuid": "",
              "activeUUIDCertificateUsePurposes": "",
              "departmentInfoActiveUUID": "",
              "type_land": "CTXD_GCN",
              "ratio": null,
              "value": null,
              "typeCollateral": "",
              "license": "",
              "status": "",
              "status_flag": null,
              "description": "22",
              "collateral_value": null,
              "collateral_code": "",
              "issuer": "",
              "other_issuer": "",
              "from_credit_extension": "Y",
              "is_exploited": "Y",
              "credit_extension_secured": "Y",
              "non_business_area": "22",
              "max_percentage": "22",
              "has_land_asset": "",
              "value_of_land": 22,
              "has_certificated_land_asset": "",
              "has_certificate_maket": "",
              "land": {
                "land_wrapper": {
                  "from_credit_extension": "Y",
                  "is_exploited": "Y",
                  "credit_extension_secured": "Y",
                  "non_business_area": "22",
                  "max_percentage": "22",
                  "value_of_land": 22,
                  "description": "22",
                  "has_land_asset": "Y",
                  "has_certificated_land_asset": "Y"
                },
                "land_legal_information_owner": {
                  "ower_wrapper": "",
                  "owner": []
                },
                "land_legal_infomation_asset": {
                  "asset_legal": "",
                  "address": "123",
                  "province": "77",
                  "district": "752",
                  "ward": "26662",
                  "certificate_address": "223",
                  "certificate_province": "06",
                  "certificate_district": "061",
                  "certificate_ward": "01927",
                  "purpose_using_lane": [
                    "RESI",
                    "TRSE"
                  ],
                  "purpose_using_lane_other": "",
                  "activeUUIDCertificateUsePurposes": "a83846b0-6c8f-4b91-d3ea-abae0ee5bed5",
                  "land_asset_types": [
                    {
                      "activeUUIDCertificateUsePurposes": "a83846b0-6c8f-4b91-d3ea-abae0ee5bed5",
                      "use_purpose": "AGRI",
                      "land_number": "123",
                      "map_number": "123",
                      "certificate_area": "123",
                      "real_area": "123",
                      "land_use_source": "LS_07",
                      "other_land_use_source": "",
                      "duration": "222",
                      "usage_form": "PUBLIC",
                      "other_usage_form": ""
                    }
                  ]
                },
                "certificate_legal_info": {
                  "dataCertificate": [
                    {
                      "userListDataLegal": [],
                      "activeUUIDUserListLegal": "",
                      "activeUUIDCertificateL": "92c6f113-55a7-44c8-0154-c27322671dc9",
                      "typeUseLand": "ALL",
                      "typeGCN": "",
                      "numberGCNLegal": "222228",
                      "numberGCN": "22",
                      "dateRange": 1644916949000,
                      "dateLocation": "123"
                    }
                  ],
                  "activeUUIDCertificate": "92c6f113-55a7-44c8-0154-c27322671dc9"
                }
              },
              "ctxd_land": {
                "dataCTXDLand": [
                  {
                    "activeUUIDCTXDLand": "88e27b1a-7063-c492-b200-4492bc246689",
                    "asset_legal": "OTHER",
                    "legal_CTXD_other": "123",
                    "address": "123",
                    "provice": "77",
                    "district": "751",
                    "ward": "26632",
                    "certificate_address": "222",
                    "certificate_province": "06",
                    "certificate_district": "063",
                    "certificate_ward": "01972",
                    "activeUUIDtypeCTXD": "54b4c231-152e-6871-8e40-25d789322772",
                    "dataTypeCTXD": [
                      {
                        "activeTypeCTXD": "54b4c231-152e-6871-8e40-25d789322772",
                        "land_asset_type": "OTHER",
                        "land_asset_type_other": "222",
                        "certificate_building_area": "123",
                        "building_area": "123",
                        "certificate_cross_floor_area": "123",
                        "cross_floor_area": "123",
                        "certificate_used_area": "123",
                        "used_area": "123",
                        "ownership_duration": "123",
                        "owner_form": "123",
                        "certificate_structure": "123",
                        "structure": "123",
                        "certificate_rank": "123",
                        "certificate_floors": "123",
                        "floors": "123",
                        "duration_of_use": "123"
                      }
                    ]
                  }
                ],
                "activeCTXDLand": "88e27b1a-7063-c492-b200-4492bc246689",
                "ctx_land_wrapper": {
                  "from_credit_extension": "Y",
                  "is_exploited": "Y",
                  "credit_extension_secured": "N",
                  "non_business_area": "10",
                  "max_percentage": "10",
                  "value_of_land": 10,
                  "description": "10",
                  "has_land_asset": "",
                  "has_certificated_land_asset": ""
                }
              },
              "ctxd_gcn_qsh": {
                "activeUuIdCtxdGcnQsh": "6203f1e0-713c-b130-fd39-84ad6369eefb",
                "ctxd_gcn_qsh_data": [
                  {
                    "uuIdCtxdGcnQsh": "6203f1e0-713c-b130-fd39-84ad6369eefb",
                    "land_legal_information_owner": {
                      "ower_wrapper": "",
                      "owner": []
                    },
                    "certificate_legal_info": {
                      "dataCertificate": [
                        {
                          "userListDataLegal": [],
                          "activeUUIDUserListLegal": "",
                          "activeUUIDCertificateL": "f25da6b9-8deb-325b-4d7b-d4a5b2c6f837",
                          "typeUseLand": "HOUSE_CERT",
                          "typeGCN": "",
                          "numberGCNLegal": "123",
                          "numberGCN": "123",
                          "dateRange": 1644917013000,
                          "dateLocation": "123"
                        }
                      ],
                      "activeUUIDCertificate": "f25da6b9-8deb-325b-4d7b-d4a5b2c6f837"
                    },
                    "ctxd_gcn_qsh_land_info": {
                      "dataCTXDLand": {
                        "activeUUIDCTXDLand": "",
                        "asset_legal": "OTHER",
                        "legal_CTXD_other": "123",
                        "address": "123",
                        "provice": "89",
                        "district": "886",
                        "ward": "30337",
                        "certificate_address": "123",
                        "certificate_province": "89",
                        "certificate_district": "886",
                        "certificate_ward": "30337",
                        "activeUUIDtypeCTXD": "e2f5f628-b88a-f658-579b-db23aba584f3",
                        "dataTypeCTXD": [
                          {
                            "activeTypeCTXD": "e2f5f628-b88a-f658-579b-db23aba584f3",
                            "land_asset_type": "OTHER",
                            "land_asset_type_other": "3333",
                            "certificate_building_area": "222",
                            "building_area": "3232",
                            "certificate_cross_floor_area": "222",
                            "cross_floor_area": "222",
                            "certificate_used_area": "222",
                            "used_area": "123",
                            "ownership_duration": "123",
                            "owner_form": "123",
                            "certificate_structure": "123",
                            "structure": "123",
                            "certificate_rank": "123",
                            "certificate_floors": "123123",
                            "floors": "123",
                            "duration_of_use": "123"
                          }
                        ]
                      },
                      "ctx_land_wrapper": {
                        "from_credit_extension": "Y",
                        "is_exploited": "Y",
                        "credit_extension_secured": "Y",
                        "non_business_area": "222",
                        "max_percentage": "22",
                        "value_of_land": 10,
                        "description": "123",
                        "has_land_asset": "",
                        "has_certificated_land_asset": ""
                      },
                      "activeCTXDLand": ""
                    }
                  }
                ]
              },
              "current_value_item": 42
            }
          ]
        }
      ]
    }
  ] as unknown
}


//// auto type chung cu 


export const autofillDepartment = {
  "activeType":"ALL",
  "uuidActiveData":"d6f01bb0-4fe8-00bc-3c57-7f84d9ac9e38",
  "carousel":[
     {
        "name":"Bất động sản",
        "type":"REST",
        "total":1
     }
  ],
  "data":[
     {
        "carousel":[
           
        ],
        "uuidActiveData":"d6f01bb0-4fe8-00bc-3c57-7f84d9ac9e38",
        "is_collapse_type":true,
        "type":"REST",
        "status":"RE_MIXED",
        "is_compactness":"Y",
        "valuation_id":"3333",
        "valuation_date":1644825187000,
        "valuation_unit_type":"APPRAISAL_BRANCH",
        "valuation_unit":"33",
        "valuation_center":"",
        "valuation_center_opinion":"",
        "independence_organization":"",
        "other_independence_organization":"",
        "purpose":"CREDIT",
        "other_purpose":"",
        "address":"3",
        "province":"27",
        "district":"256",
        "ward":"09178",
        "position_type":"RESIDENTTIAL_STREET",
        "other_position_type":"",
        "lane_width":"1M_3M",
        "description":"3333",
        "collateral_value":5555,
        "max_percentage":"3",
        "uuidActiveSubtype":"d0aa1f90-b320-11b2-0d9f-e876aa921166",
        "sub_type":[
           {
              "uuidActiveSubtype":"d0aa1f90-b320-11b2-0d9f-e876aa921166",
              "is_collapse_sub_type":true,
              "id":"APPA",
              "child_sub_type":"FURO",
              "items":[
                 {
                    "activeUUID":"1ef75802-5357-0099-4a25-f9d6c6138efb",
                    "departmentActiveUUID":"6a300c97-7a26-e852-b793-63b8c8f6424a",
                    "maketActiveUuid":"",
                    "activeUUIDCertificateUsePurposes":"ffbdb3c2-e8e1-8292-f0fe-a4d8c0b118c6",
                    "current_value_item":5555,
                    "departmentInfoActiveUUID":"676aaa46-e34b-03c1-3162-afdd497005bf",
                    "type_land":"",
                    "ratio":null,
                    "value":null,
                    "typeCollateral":"",
                    "license":"",
                    "status":"",
                    "status_flag":null,
                    "description":"",
                    "collateral_value":null,
                    "collateral_code":"",
                    "issuer":"",
                    "other_issuer":"",
                    "from_credit_extension":"",
                    "is_exploited":"",
                    "credit_extension_secured":"",
                    "non_business_area":"",
                    "max_percentage":"",
                    "has_land_asset":"",
                    "value_of_land":null,
                    "has_certificated_land_asset":"",
                    "has_certificate_maket":"",
                    "land":{
                       "land_wrapper":{
                          "from_credit_extension":"",
                          "is_exploited":"",
                          "credit_extension_secured":"",
                          "non_business_area":"",
                          "max_percentage":"",
                          "value_of_land":null,
                          "description":"",
                          "has_land_asset":"",
                          "has_certificated_land_asset":""
                       },
                       "land_legal_information_owner":{
                          "active":0,
                          "owner_type":"",
                          "owner":[
                             
                          ]
                       },
                       "land_legal_infomation_asset":{
                          "asset_legal":"",
                          "address":"",
                          "province":"",
                          "district":"",
                          "ward":"",
                          "certificate_address":"",
                          "certificate_province":"",
                          "certificate_district":"",
                          "certificate_ward":"",
                          "purpose_using_lane":[
                             
                          ],
                          "purpose_using_lane_other":"",
                          "land_asset_types":[
                             
                          ],
                          "activeUUIDCertificateUsePurposes":""
                       },
                       "certificate_legal_info":{
                          "dataCertificate":[
                             
                          ],
                          "activeUUIDCertificate":""
                       }
                    },
                    "market":{
                       "maket_wrapper":{
                          "from_credit_extension":"",
                          "is_exploited":"",
                          "credit_extension_secured":"",
                          "non_business_area":"",
                          "max_percentage":"",
                          "value_of_land":null,
                          "description":"",
                          "has_land_asset":"",
                          "has_certificated_land_asset":""
                       },
                       "market_owner":{
                          "active":0,
                          "owner_type":"",
                          "owner":[
                             
                          ]
                       },
                       "maket_certificates":[
                          
                       ],
                       "maket_info":{
                          "market_name":"",
                          "market_code":"",
                          "location":"",
                          "sector":"",
                          "start_date":null,
                          "end_date":null,
                          "remaining":null,
                          "used_area":null,
                          "value_area":null,
                          "structure":""
                       }
                    },
                    "ctxd_land":{
                       "dataCTXDLand":[
                          
                       ],
                       "ctx_land_wrapper":{
                          "from_credit_extension":"",
                          "is_exploited":"",
                          "credit_extension_secured":"",
                          "non_business_area":"",
                          "max_percentage":"",
                          "value_of_land":null,
                          "description":"",
                          "has_land_asset":"",
                          "has_certificated_land_asset":""
                       },
                       "activeCTXDLand":""
                    },
                    "ctxd_gcn_qsh":{
                       "activeUuIdCtxdGcnQsh":"",
                       "ctxd_gcn_qsh_data":[
                          
                       ]
                    },
                    "count":null,
                    "year":null,
                    "model":"",
                    "production":"",
                    "CLCL":"",
                    "number_register":"",
                    "quantity":null,
                    "info_collatetal":"",
                    "branch":"",
                    "department":{
                       "has_certificate":"Y",
                       "project_name":"3333",
                       "department_wrapper":{
                          "from_credit_extension":"Y",
                          "is_exploited":"Y",
                          "credit_extension_secured":"Y",
                          "non_business_area":"3",
                          "max_percentage":"4",
                          "value_of_land":5555,
                          "description":"333",
                          "has_land_asset":"",
                          "has_certificated_land_asset":""
                       },
                       "department_certificate_legal":[
                          {
                             "order":null,
                             "persons":[
                                
                             ],
                             "uuid_certificate_legal":"6a300c97-7a26-e852-b793-63b8c8f6424a",
                             "other_certificate_type":"LAND_CERT",
                             "other_certificate_type_other":"",
                             "certificate_code":"333",
                             "certificate_no":"444",
                             "issue_date":1644911619000,
                             "place_of_issue":"3333",
                             "contract_number_type":"444",
                             "contract_number":"5555",
                             "contract_date":"6666"
                          }
                       ],
                       "department_info":[
                          {
                             "departmentInfoActiveUUID":"676aaa46-e34b-03c1-3162-afdd497005bf",
                             "house_type":"3",
                             "apartment_type":"OFFICETEL",
                             "other_apartment_type":"",
                             "apartment_number":"3",
                             "block":"4",
                             "floor":"5",
                             "start_date":1645430038000,
                             "certificate_area":"4",
                             "real_area":"3",
                             "usage_form":"5",
                             "duration":"6",
                             "ownership_category":"7"
                          }
                       ],
                       "department_info_land":{
                          "address":"120.000",
                          "province":"74",
                          "district":"720",
                          "ward":"25801",
                          "certificate_address":"33",
                          "certificate_province":"74",
                          "certificate_district":"722",
                          "certificate_ward":"25870",
                          "use_purposes":[
                             "RESI"
                          ],
                          "other_use_purpose":"",
                          "certificate_use_purposes":[
                             {
                                "activeUUIDCertificateUsePurposes":"ffbdb3c2-e8e1-8292-f0fe-a4d8c0b118c6",
                                "use_purpose":"3",
                                "land_number":"3",
                                "map_number":"4",
                                "certificate_area":"5",
                                "real_area":"6",
                                "land_use_source":"LS_07",
                                "other_land_use_source":"",
                                "duration":"3",
                                "usage_form":"4",
                                "other_usage_form":"5"
                             }
                          ]
                       }
                    }
                 }
              ],
              "uuidItemsActive":"1ef75802-5357-0099-4a25-f9d6c6138efb"
           }
        ]
     }
  ] as unknown
}

export const autofillRestMarket = {
    "activeType": "ALL",
    "uuidActiveData": "cd795964-395b-d763-ce08-eebf6001a209",
    "carousel": [
      {
        "name": "Bất động sản",
        "type": "REST",
        "total": 1
      }
    ],
    "data": [
      {
        "carousel": [],
        "uuidActiveData": "cd795964-395b-d763-ce08-eebf6001a209",
        "is_collapse_type": true,
        "type": "REST",
        "status": "RE_MIXED",
        "is_compactness": "Y",
        "valuation_id": "123",
        "valuation_date": 1644825350000,
        "valuation_unit_type": "APPRAISAL_BRANCH",
        "valuation_unit": "123",
        "valuation_center": "",
        "valuation_center_opinion": "",
        "independence_organization": "",
        "other_independence_organization": "",
        "purpose": "CREDIT",
        "other_purpose": "",
        "address": "123",
        "province": "77",
        "district": "752",
        "ward": "26662",
        "position_type": "MAIN_ALLEY",
        "other_position_type": "",
        "lane_width": "GT_20M",
        "description": "123",
        "collateral_value": 1000,
        "max_percentage": "12",
        "uuidActiveSubtype": "fe804d63-98eb-cc5f-4026-7a436eaf83ee",
        "sub_type": [
          {
            "uuidActiveSubtype": "fe804d63-98eb-cc5f-4026-7a436eaf83ee",
            "is_collapse_sub_type": true,
            "id": "MARK",
            "items": [
              {
                "activeUUID": "ad130dd6-6949-b611-90dc-82c2cbcfbf1b",
                "departmentActiveUUID": "",
                "maketActiveUuid": "e7da45ce-a3d0-0f5c-5baf-997d18d635e9",
                "activeUUIDCertificateUsePurposes": "",
                "departmentInfoActiveUUID": "",
                "type_land": "",
                "ratio": null,
                "value": null,
                "typeCollateral": "",
                "license": "",
                "status": "",
                "status_flag": null,
                "description": "",
                "collateral_value": null,
                "collateral_code": "",
                "issuer": "",
                "other_issuer": "",
                "from_credit_extension": "",
                "is_exploited": "",
                "credit_extension_secured": "",
                "non_business_area": "",
                "max_percentage": "",
                "has_land_asset": "",
                "value_of_land": null,
                "has_certificated_land_asset": "",
                "has_certificate_maket": "",
                "land": {
                  "land_wrapper": {
                    "from_credit_extension": "",
                    "is_exploited": "",
                    "credit_extension_secured": "",
                    "non_business_area": "",
                    "max_percentage": "",
                    "value_of_land": null,
                    "description": "",
                    "has_land_asset": "",
                    "has_certificated_land_asset": ""
                  },
                  "land_legal_information_owner": {
                    "ower_wrapper": "",
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
                    "purpose_using_lane": [],
                    "purpose_using_lane_other": "",
                    "land_asset_types": [],
                    "activeUUIDCertificateUsePurposes": ""
                  },
                  "certificate_legal_info": {
                    "dataCertificate": [],
                    "activeUUIDCertificate": ""
                  }
                },
                "maket": {
                  "maket_wrapper": {
                    "from_credit_extension": "Y",
                    "is_exploited": "Y",
                    "credit_extension_secured": "Y",
                    "non_business_area": "12",
                    "max_percentage": "12",
                    "value_of_land": 1000,
                    "description": "12",
                    "has_land_asset": "",
                    "has_certificated_land_asset": ""
                  },
                  "maket_certificates": [
                    {
                      "order": null,
                      "persons": [],
                      "uuid_maket_certificate": "e7da45ce-a3d0-0f5c-5baf-997d18d635e9",
                      "person_uuid": "",
                      "certificate_name": "12",
                      "certificate_code": "12",
                      "issue_date": 1643702184000,
                      "place_of_issue": "12",
                      "contract_name": "12",
                      "contract_number": null,
                      "contract_code": "12",
                      "contract_date": 1644652590000,
                      "contract_unit": "12"
                    }
                  ],
                  "maket_info": {
                    "market_name": "12",
                    "market_code": "12",
                    "location": "12",
                    "sector": "111111112",
                    "start_date": 1643702202000,
                    "end_date": 1643961404000,
                    "remaining": "123",
                    "used_area": "12",
                    "value_area": "12",
                    "structure": "12"
                  }
                },
                "ctxd_land": {
                  "dataCTXDLand": [],
                  "ctx_land_wrapper": {
                    "from_credit_extension": "",
                    "is_exploited": "",
                    "credit_extension_secured": "",
                    "non_business_area": "",
                    "max_percentage": "",
                    "value_of_land": null,
                    "description": "",
                    "has_land_asset": "",
                    "has_certificated_land_asset": ""
                  },
                  "activeCTXDLand": ""
                },
                "ctxd_gcn_qsh": {
                  "activeUuIdCtxdGcnQsh": "",
                  "ctxd_gcn_qsh_data": []
                },
                "count": null,
                "year": null,
                "model": "",
                "production": "",
                "CLCL": "",
                "number_register": "",
                "quantity": null,
                "info_collatetal": "",
                "branch": "",
                "department": {
                  "department_wrapper": {
                    "from_credit_extension": "",
                    "is_exploited": "",
                    "credit_extension_secured": "",
                    "non_business_area": "",
                    "max_percentage": "",
                    "value_of_land": null,
                    "description": "",
                    "has_land_asset": "",
                    "has_certificated_land_asset": ""
                  },
                  "department_certificate_legal": [],
                  "department_info": [],
                  "department_info_land": {
                    "address": "",
                    "province": "",
                    "district": "",
                    "ward": "",
                    "certificate_address": "",
                    "certificate_province": "",
                    "certificate_district": "",
                    "certificate_ward": "",
                    "use_purposes": "",
                    "other_use_purpose": "",
                    "certificate_use_purposes": []
                  }
                }
              }
            ],
            "uuidItemsActive": "ad130dd6-6949-b611-90dc-82c2cbcfbf1b"
          }
        ]
      }
    ]  as unknown
}

 