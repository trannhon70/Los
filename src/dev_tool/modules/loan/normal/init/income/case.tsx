import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";
import { ILOANNormalStorageIncomeDeclare } from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import { generateUUID } from "utils";

export const DevToolIncomeCase = {
  autoFillAllIncome(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    const dataDeclare = ["borrower","marriage","coborrower","copayer"]
    for(let i=0;i<dataDeclare.length;i++){
      const person_uuid = state.storage.income.income[dataDeclare[i] as keyof ILOANNormalStorageIncomeDeclare].dataPosition.map(item=>item.uuidDeclare)

      state.storage.income.income.borrower.total_income = 3500000
      state.storage.income.income.borrower.total_occasional = 0
      state.storage.income.income.borrower.total_permanent = 3500000

      state.storage.income.income.marriage.total_income = 3500000
      state.storage.income.income.marriage.total_occasional = 0
      state.storage.income.income.marriage.total_permanent = 3500000

      state.storage.income.income.coborrower.total_income = 7000000
      state.storage.income.income.coborrower.total_occasional = 0
      state.storage.income.income.coborrower.total_permanent = 7000000

      state.storage.income.income.copayer.total_income = 7000000
      state.storage.income.income.copayer.total_occasional = 0
      state.storage.income.income.copayer.total_permanent = 7000000

      state.storage.income.income[dataDeclare[i] as keyof ILOANNormalStorageIncomeDeclare].dataPosition.forEach((item,idx) =>{
        if(item.uuidDeclare === person_uuid[idx]){
          item.salary = {
            ...item.salary,
            activeSalary: "5c2de077-87b9-cb61-0d3e-0b8244ea74e4",
            total_income_from_salary_source: 600000,
            permanent_income_amount: 600000,
            occasional_income_amount: 0,
            data:[
              {
                "uuid": "5c2de077-87b9-cb61-0d3e-0b8244ea74e4",
                "areaActivity": "STATEOWNED",
                "companyType": "2MLC",
                "companyName": "SCB",
                "companyCate": "Công ty TNHH hai thành viên trở lên SCB",
                "years": 2,
                "startDate": 1654058376000,
                "contractType": "TERM",
                "receivedMethod": "CASH",
                "frequency": "FREQ",
                "career": "A01170",
                "ratioIncome": 100,
                "salary": 100000,
                "incomeFromSalary": 100000,
                "documents": [
                  {
                    "document_id": 28,
                    "document_name": "Hợp đồng lao động",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 29,
                    "document_name": "Quyết định bổ nhiệm",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 30,
                    "document_name": "Sao kê/Xác nhận lương",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 31,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE",
                    "data_file": []
                  },
                  {
                    "document_id": 32,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "areaActivity": "STATEOWNED",
                "companyType": "2MLC",
                "companyName": "SCB",
                "companyCate": "Công ty TNHH hai thành viên trở lên SCB",
                "years": 2,
                "startDate": 1654058376000,
                "contractType": "TERM",
                "receivedMethod": "CASH",
                "frequency": "FREQ",
                "career": "A01170",
                "ratioIncome": 100,
                "salary": 100000,
                "incomeFromSalary": 100000,
                "documents": [
                  {
                    "document_id": 28,
                    "document_name": "Hợp đồng lao động",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 29,
                    "document_name": "Quyết định bổ nhiệm",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 30,
                    "document_name": "Sao kê/Xác nhận lương",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 31,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE",
                    "data_file": []
                  },
                  {
                    "document_id": 32,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "areaActivity": "STATEOWNED",
                "companyType": "2MLC",
                "companyName": "SCB",
                "companyCate": "Công ty TNHH hai thành viên trở lên SCB",
                "years": 2,
                "startDate": 1654058376000,
                "contractType": "TERM",
                "receivedMethod": "CASH",
                "frequency": "FREQ",
                "career": "A01170",
                "ratioIncome": 100,
                "salary": 100000,
                "incomeFromSalary": 100000,
                "documents": [
                  {
                    "document_id": 28,
                    "document_name": "Hợp đồng lao động",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 29,
                    "document_name": "Quyết định bổ nhiệm",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 30,
                    "document_name": "Sao kê/Xác nhận lương",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 31,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE",
                    "data_file": []
                  },
                  {
                    "document_id": 32,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "areaActivity": "STATEOWNED",
                "companyType": "2MLC",
                "companyName": "SCB",
                "companyCate": "Công ty TNHH hai thành viên trở lên SCB",
                "years": 2,
                "startDate": 1654058376000,
                "contractType": "TERM",
                "receivedMethod": "CASH",
                "frequency": "FREQ",
                "career": "A01170",
                "ratioIncome": 100,
                "salary": 100000,
                "incomeFromSalary": 100000,
                "documents": [
                  {
                    "document_id": 28,
                    "document_name": "Hợp đồng lao động",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 29,
                    "document_name": "Quyết định bổ nhiệm",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 30,
                    "document_name": "Sao kê/Xác nhận lương",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 31,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE",
                    "data_file": []
                  },
                  {
                    "document_id": 32,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "areaActivity": "STATEOWNED",
                "companyType": "2MLC",
                "companyName": "SCB",
                "companyCate": "Công ty TNHH hai thành viên trở lên SCB",
                "years": 2,
                "startDate": 1654058376000,
                "contractType": "TERM",
                "receivedMethod": "CASH",
                "frequency": "FREQ",
                "career": "A01170",
                "ratioIncome": 100,
                "salary": 100000,
                "incomeFromSalary": 100000,
                "documents": [
                  {
                    "document_id": 28,
                    "document_name": "Hợp đồng lao động",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 29,
                    "document_name": "Quyết định bổ nhiệm",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 30,
                    "document_name": "Sao kê/Xác nhận lương",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 31,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE",
                    "data_file": []
                  },
                  {
                    "document_id": 32,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "areaActivity": "STATEOWNED",
                "companyType": "2MLC",
                "companyName": "SCB",
                "companyCate": "Công ty TNHH hai thành viên trở lên SCB",
                "years": 2,
                "startDate": 1654058376000,
                "contractType": "TERM",
                "receivedMethod": "CASH",
                "frequency": "FREQ",
                "career": "A01170",
                "ratioIncome": 100,
                "salary": 100000,
                "incomeFromSalary": 100000,
                "documents": [
                  {
                    "document_id": 28,
                    "document_name": "Hợp đồng lao động",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 29,
                    "document_name": "Quyết định bổ nhiệm",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 30,
                    "document_name": "Sao kê/Xác nhận lương",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  },
                  {
                    "document_id": 31,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE",
                    "data_file": []
                  },
                  {
                    "document_id": 32,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT",
                    "data_file": []
                  }
                ]
              }
            ]
          }
          item.assetRent = {
            ...item.assetRent,
            "activeAssetRent": "LOCAL_d08ad306-8cf5-78b0-0ad1-217c8dcb4659",
            "total_income_from_property_rental": 300000,
            "permanent_income_amount": 300000,
            "occasional_income_amount": 0,
            data:[
              {
                "uuid": "LOCAL_939a7ac5-9d13-d751-2d0b-3427034a0005",
                "assetType": "REAL_ESTATE",
                "totalAmount": "",
                "assetDetailRealEstate": {
                  "data": [
                    {
                      "uuid": "LOCAL_e931f566-59sd07-d6fd-15f7-84656d677d4f",
                      "location": "927 Trần Hưng Đạo",
                      "province": "79",
                      "district": "774",
                      "ward": "27313",
                      "owned_status": "RELATIVES",
                      "description": "mô tả",
                      "frequency_type": "FREQ",
                      "income_ratio": null,
                      "price": 100000,
                      "income_from_real_estate": 100000,
                      "documents": [
                        {
                          "data_file": [],
                          "document_id": 33,
                          "document_name": "Pháp lý tài sản cho thuê",
                          "document_type": "DOCUMENT"
                        },
                        {
                          "data_file": [],
                          "document_id": 34,
                          "document_name": "Xác nhận thanh toán",
                          "document_type": "DOCUMENT"
                        },
                        {
                          "data_file": [],
                          "document_id": 35,
                          "document_name": "Sổ sách theo dõi",
                          "document_type": "DOCUMENT"
                        },
                        {
                          "data_file": [],
                          "document_id": 36,
                          "document_name": "Hình ảnh",
                          "document_type": "IMAGE"
                        },
                        {
                          "data_file": [],
                          "document_id": 37,
                          "document_name": "Chứng từ khác",
                          "document_type": "DOCUMENT"
                        }
                      ]
                    }
                  ],
                  "activeRealEstate": "LOCAL_e931sdf566-5907-d6fd-15f7-84656d677d4f",
                  "total_income_from_rental_real_estate": 100000,
                  "permanent_income_from_rental_real_estate": 100000,
                  "occasional_income_from_rental_real_estate": 0
                },
                "assetDetailOther": {
                  "data": [],
                  "activeOther": "",
                  "total_income_from_other": 0,
                  "permanent_income_from_other": 0,
                  "occasional_income_from_other": 0
                },
                "assetDetailTransport": {
                  "data": [],
                  "activeTransport": "",
                  "total_income_from_transport": 0,
                  "permanent_income_from_transport": 0,
                  "occasional_income_from_transport": 0
                }
              },
              {
                "uuid": "LOCAL_edesdbfac5-cfee-2basdd8-731c-15d393798534",
                "assetType": "TRANSPORT",
                "totalAmount": "",
                "assetDetailRealEstate": {
                  "data": [],
                  "activeRealEstate": "",
                  "total_income_from_rental_real_estate": 0,
                  "permanent_income_from_rental_real_estate": 0,
                  "occasional_income_from_rental_real_estate": 0
                },
                "assetDetailOther": {
                  "data": [],
                  "activeOther": "",
                  "total_income_from_other": 0,
                  "permanent_income_from_other": 0,
                  "occasional_income_from_other": 0
                },
                "assetDetailTransport": {
                  "data": [
                    {
                      "uuid": "LOCAL_e9dd9fasfe-1089-4fae-e96a-3df602f41ddc",
                      "registrationPlate": "59A 60828",
                      "owned_status": "OWNER",
                      "frequency_type": "FREQ",
                      "income_ratio": null,
                      "price": 100000,
                      "income_from_transport": 100000,
                      "documents": [
                        {
                          "data_file": [],
                          "document_id": 33,
                          "document_name": "Pháp lý tài sản cho thuê",
                          "document_type": "DOCUMENT"
                        },
                        {
                          "data_file": [],
                          "document_id": 34,
                          "document_name": "Xác nhận thanh toán",
                          "document_type": "DOCUMENT"
                        },
                        {
                          "data_file": [],
                          "document_id": 35,
                          "document_name": "Sổ sách theo dõi",
                          "document_type": "DOCUMENT"
                        },
                        {
                          "data_file": [],
                          "document_id": 36,
                          "document_name": "Hình ảnh",
                          "document_type": "IMAGE"
                        },
                        {
                          "data_file": [],
                          "document_id": 37,
                          "document_name": "Chứng từ khác",
                          "document_type": "DOCUMENT"
                        }
                      ]
                    }
                  ],
                  "activeTransport": "LOCAL_e9dd9ffe-1asd089-4fae-e96a-3df602f41ddc",
                  "total_income_from_transport": 100000,
                  "permanent_income_from_transport": 100000,
                  "occasional_income_from_transport": 0
                }
              },
              {
                "uuid": "LOCAL_d08ad306-8cf5-78b0-0ad1-217c238dcb4659",
                "assetType": "OTHER",
                "totalAmount": "",
                "assetDetailRealEstate": {
                  "data": [],
                  "activeRealEstate": "",
                  "total_income_from_rental_real_estate": 0,
                  "permanent_income_from_rental_real_estate": 0,
                  "occasional_income_from_rental_real_estate": 0
                },
                "assetDetailOther": {
                  "data": [
                    {
                      "uuid": "LOCAL_79ae5b7d-5a02fg-644d-8968-b13e5d8cb667",
                      "idAssetRent": "DIERK1745",
                      "owned_status": "OWNER",
                      "frequency_type": "FREQ",
                      "income_ratio": null,
                      "price": 100000,
                      "income_from_other": 100000,
                      "documents": [
                        {
                          "data_file": [],
                          "document_id": 33,
                          "document_name": "Pháp lý tài sản cho thuê",
                          "document_type": "DOCUMENT"
                        },
                        {
                          "data_file": [],
                          "document_id": 34,
                          "document_name": "Xác nhận thanh toán",
                          "document_type": "DOCUMENT"
                        },
                        {
                          "data_file": [],
                          "document_id": 35,
                          "document_name": "Sổ sách theo dõi",
                          "document_type": "DOCUMENT"
                        },
                        {
                          "data_file": [],
                          "document_id": 36,
                          "document_name": "Hình ảnh",
                          "document_type": "IMAGE"
                        },
                        {
                          "data_file": [],
                          "document_id": 37,
                          "document_name": "Chứng từ khác",
                          "document_type": "DOCUMENT"
                        }
                      ]
                    }
                  ],
                  "activeOther": "LOCAL_79ae5b7d-5a02-2143gf644d-8968-b13e5d8cb667",
                  "total_income_from_other": 100000,
                  "permanent_income_from_other": 100000,
                  "occasional_income_from_other": 0
                },
                "assetDetailTransport": {
                  "data": [],
                  "activeTransport": "",
                  "total_income_from_transport": 0,
                  "permanent_income_from_transport": 0,
                  "occasional_income_from_transport": 0
                }
              },
            ]
          }
          item.business = {
            ...item.business,
            "activeBusiness": "LOCAL_18f34c3c-db4c-9bf1-52d4-4ef2760b3968",
            "occasional_income_amount": 0,
            "permanent_income_amount": 500000,
            "total_income_from_business_activities": 500000,
            data:[
              {
                "uuid": "LOCAL_18f34c3c-db4c-9bf1-52d4-4ef2760b3968",
                "representative": "SELF",
                "name": "Hộ Kinh Doanh 1",
                "workingTime": 12,
                "frequency": "FREQ",
                "ratio": null,
                "turnover": 110000,
                "cost": 10000,
                "profit": 100000,
                "income_business_activities": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 38,
                    "document_name": "Pháp lý hộ kinh doanh/doanh nghiệp tư nhân",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 39,
                    "document_name": "Tổng hợp doanh thu, lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 40,
                    "document_name": "Đầu ra - Đầu vào",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 41,
                    "document_name": "Chứng từ thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 42,
                    "document_name": "Sổ sách bán hàng",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 43,
                    "document_name": "Bảng kê hàng tồn kho, doanh thu, chi phí",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 44,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 45,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 80,
                    "document_name": "Chứng nhận đủ điều kiện",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "representative": "SELF",
                "name": "Hộ Kinh Doanh 1",
                "workingTime": 12,
                "frequency": "FREQ",
                "ratio": null,
                "turnover": 110000,
                "cost": 10000,
                "profit": 100000,
                "income_business_activities": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 38,
                    "document_name": "Pháp lý hộ kinh doanh/doanh nghiệp tư nhân",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 39,
                    "document_name": "Tổng hợp doanh thu, lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 40,
                    "document_name": "Đầu ra - Đầu vào",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 41,
                    "document_name": "Chứng từ thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 42,
                    "document_name": "Sổ sách bán hàng",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 43,
                    "document_name": "Bảng kê hàng tồn kho, doanh thu, chi phí",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 44,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 45,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 80,
                    "document_name": "Chứng nhận đủ điều kiện",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "representative": "SELF",
                "name": "Hộ Kinh Doanh 1",
                "workingTime": 12,
                "frequency": "FREQ",
                "ratio": null,
                "turnover": 110000,
                "cost": 10000,
                "profit": 100000,
                "income_business_activities": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 38,
                    "document_name": "Pháp lý hộ kinh doanh/doanh nghiệp tư nhân",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 39,
                    "document_name": "Tổng hợp doanh thu, lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 40,
                    "document_name": "Đầu ra - Đầu vào",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 41,
                    "document_name": "Chứng từ thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 42,
                    "document_name": "Sổ sách bán hàng",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 43,
                    "document_name": "Bảng kê hàng tồn kho, doanh thu, chi phí",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 44,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 45,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 80,
                    "document_name": "Chứng nhận đủ điều kiện",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "representative": "SELF",
                "name": "Hộ Kinh Doanh 1",
                "workingTime": 12,
                "frequency": "FREQ",
                "ratio": null,
                "turnover": 110000,
                "cost": 10000,
                "profit": 100000,
                "income_business_activities": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 38,
                    "document_name": "Pháp lý hộ kinh doanh/doanh nghiệp tư nhân",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 39,
                    "document_name": "Tổng hợp doanh thu, lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 40,
                    "document_name": "Đầu ra - Đầu vào",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 41,
                    "document_name": "Chứng từ thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 42,
                    "document_name": "Sổ sách bán hàng",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 43,
                    "document_name": "Bảng kê hàng tồn kho, doanh thu, chi phí",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 44,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 45,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 80,
                    "document_name": "Chứng nhận đủ điều kiện",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "representative": "SELF",
                "name": "Hộ Kinh Doanh 1",
                "workingTime": 12,
                "frequency": "FREQ",
                "ratio": null,
                "turnover": 110000,
                "cost": 10000,
                "profit": 100000,
                "income_business_activities": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 38,
                    "document_name": "Pháp lý hộ kinh doanh/doanh nghiệp tư nhân",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 39,
                    "document_name": "Tổng hợp doanh thu, lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 40,
                    "document_name": "Đầu ra - Đầu vào",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 41,
                    "document_name": "Chứng từ thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 42,
                    "document_name": "Sổ sách bán hàng",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 43,
                    "document_name": "Bảng kê hàng tồn kho, doanh thu, chi phí",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 44,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 45,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 80,
                    "document_name": "Chứng nhận đủ điều kiện",
                    "document_type": "DOCUMENT"
                  }
                ]
              }
            ]
          }
          item.company = {
            ...item.company,
            "activeCompany": "LOCAL_32b889fa-f3fe-19de-bc73-0fce2b709c43",
            "occasional_income_amount": 0,
            "permanent_income_amount": 500000,
            "total_income_from_company": 500000,
            data:[
              {
                "uuid": "LOCAL_32b889fa-f3fe-19de-bc73-0fce2b709c43",
                "type": "2MLC",
                "name": "Doanh nghiệp 1",
                "tax": "709462181",
                "phone": "0909880001",
                "licenseDate": 1654065093000,
                "profit": 100000,
                "frequency": "FREQ",
                "income_ratio": null,
                "business_income_from_business_activities": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 46,
                    "document_name": "Pháp lý doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 48,
                    "document_name": "Biên bản họp/Nghị quyết doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 49,
                    "document_name": "Tờ khai thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 50,
                    "document_name": "Báo cáo tài chính",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 51,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 52,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "type": "2MLC",
                "name": "Doanh nghiệp 2",
                "tax": "709462182",
                "phone": "0909880007",
                "licenseDate": 1654065093000,
                "profit": 100000,
                "frequency": "FREQ",
                "income_ratio": null,
                "business_income_from_business_activities": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 46,
                    "document_name": "Pháp lý doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 48,
                    "document_name": "Biên bản họp/Nghị quyết doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 49,
                    "document_name": "Tờ khai thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 50,
                    "document_name": "Báo cáo tài chính",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 51,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 52,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "type": "2MLC",
                "name": "Doanh nghiệp 3",
                "tax": "709462183",
                "phone": "0909880006",
                "licenseDate": 1654065093000,
                "profit": 100000,
                "frequency": "FREQ",
                "income_ratio": null,
                "business_income_from_business_activities": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 46,
                    "document_name": "Pháp lý doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 48,
                    "document_name": "Biên bản họp/Nghị quyết doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 49,
                    "document_name": "Tờ khai thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 50,
                    "document_name": "Báo cáo tài chính",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 51,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 52,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "type": "2MLC",
                "name": "Doanh nghiệp 4",
                "tax": "709462184",
                "phone": "0909880008",
                "licenseDate": 1654065093000,
                "profit": 100000,
                "frequency": "FREQ",
                "income_ratio": null,
                "business_income_from_business_activities": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 46,
                    "document_name": "Pháp lý doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 48,
                    "document_name": "Biên bản họp/Nghị quyết doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 49,
                    "document_name": "Tờ khai thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 50,
                    "document_name": "Báo cáo tài chính",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 51,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 52,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "type": "2MLC",
                "name": "Doanh nghiệp 5",
                "tax": "709462185",
                "phone": "0909880003",
                "licenseDate": 1654065093000,
                "profit": 100000,
                "frequency": "FREQ",
                "income_ratio": null,
                "business_income_from_business_activities": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 46,
                    "document_name": "Pháp lý doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 48,
                    "document_name": "Biên bản họp/Nghị quyết doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 49,
                    "document_name": "Tờ khai thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 50,
                    "document_name": "Báo cáo tài chính",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 51,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 52,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
            ]
          }
          item.stock = {
            ...item.stock,
            "activeStock": "LOCAL_b7d71604-f769-1564-8384-1b10b6c8adcc",
            "occasional_income_amount": 0,
            "permanent_income_amount": 500000,
            "total_income_from_stocks": 500000,
            data:[
              {
                "uuid": "LOCAL_b7d71604-f769-1564-8384-1b10b6c8adcc",
                "year": 2,
                "count": 2,
                "frequency": "FREQ",
                "ratio": null,
                "profit": 100000,
                "income_from_stock": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 53,
                    "document_name": "Chứng từ quyền sở hữu cổ tức/lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 54,
                    "document_name": "Chứng từ chi  trả cổ tức/lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 55,
                    "document_name": "Pháp lý doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 57,
                    "document_name": "Biên bản họp/Nghị quyết doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 58,
                    "document_name": "Tờ khai thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 59,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 60,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 130,
                    "document_name": "Báo cáo tài chính",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "year": 2,
                "count": 2,
                "frequency": "FREQ",
                "ratio": null,
                "profit": 100000,
                "income_from_stock": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 53,
                    "document_name": "Chứng từ quyền sở hữu cổ tức/lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 54,
                    "document_name": "Chứng từ chi  trả cổ tức/lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 55,
                    "document_name": "Pháp lý doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 57,
                    "document_name": "Biên bản họp/Nghị quyết doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 58,
                    "document_name": "Tờ khai thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 59,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 60,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 130,
                    "document_name": "Báo cáo tài chính",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "year": 2,
                "count": 2,
                "frequency": "FREQ",
                "ratio": null,
                "profit": 100000,
                "income_from_stock": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 53,
                    "document_name": "Chứng từ quyền sở hữu cổ tức/lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 54,
                    "document_name": "Chứng từ chi  trả cổ tức/lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 55,
                    "document_name": "Pháp lý doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 57,
                    "document_name": "Biên bản họp/Nghị quyết doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 58,
                    "document_name": "Tờ khai thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 59,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 60,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 130,
                    "document_name": "Báo cáo tài chính",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "year": 2,
                "count": 2,
                "frequency": "FREQ",
                "ratio": null,
                "profit": 100000,
                "income_from_stock": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 53,
                    "document_name": "Chứng từ quyền sở hữu cổ tức/lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 54,
                    "document_name": "Chứng từ chi  trả cổ tức/lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 55,
                    "document_name": "Pháp lý doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 57,
                    "document_name": "Biên bản họp/Nghị quyết doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 58,
                    "document_name": "Tờ khai thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 59,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 60,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 130,
                    "document_name": "Báo cáo tài chính",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "year": 2,
                "count": 2,
                "frequency": "FREQ",
                "ratio": null,
                "profit": 100000,
                "income_from_stock": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 53,
                    "document_name": "Chứng từ quyền sở hữu cổ tức/lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 54,
                    "document_name": "Chứng từ chi  trả cổ tức/lợi nhuận",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 55,
                    "document_name": "Pháp lý doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 57,
                    "document_name": "Biên bản họp/Nghị quyết doanh nghiệp",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 58,
                    "document_name": "Tờ khai thuế",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 59,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 60,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 130,
                    "document_name": "Báo cáo tài chính",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
            ]
          }
          item.deposit = {
            ...item.deposit,
            "activeDeposit": "LOCAL_19bc04e7-6654-2ea4-0a08-d0edbce1d08d",
            "total_income_from_deposits": 500000,
            "occasional_income_amount": 0,
            "permanent_income_amount": 500000,
            data:[
              {
                "uuid": "LOCAL_19bc04e7-6654-2ea4-0a08-d0edbce1d08d",
                "unit": "",
                "publish_unit_id": "106",
                "accept_blocked_account": "ACCEPT",
                "account": "3049567839411",
                "currency": "VND",
                "balance": 100000,
                "blocked": "",
                "term": 12,
                "profit": 100000,
                "frequency": "FREQ",
                "income_ratio": null,
                "income_from_deposits": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 61,
                    "document_name": "Sổ/Giấy tờ có giá trị",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 62,
                    "document_name": "Chứng từ thanh toán",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 81,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 82,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "unit": "",
                "publish_unit_id": "106",
                "accept_blocked_account": "ACCEPT",
                "account": "30495672294",
                "currency": "VND",
                "balance": 100000,
                "blocked": "",
                "term": 12,
                "profit": 100000,
                "frequency": "FREQ",
                "income_ratio": null,
                "income_from_deposits": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 61,
                    "document_name": "Sổ/Giấy tờ có giá trị",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 62,
                    "document_name": "Chứng từ thanh toán",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 81,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 82,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "unit": "",
                "publish_unit_id": "106",
                "accept_blocked_account": "ACCEPT",
                "account": "3049235678394",
                "currency": "VND",
                "balance": 100000,
                "blocked": "",
                "term": 12,
                "profit": 100000,
                "frequency": "FREQ",
                "income_ratio": null,
                "income_from_deposits": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 61,
                    "document_name": "Sổ/Giấy tờ có giá trị",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 62,
                    "document_name": "Chứng từ thanh toán",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 81,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 82,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "unit": "",
                "publish_unit_id": "106",
                "accept_blocked_account": "ACCEPT",
                "account": "3049567812345394",
                "currency": "VND",
                "balance": 100000,
                "blocked": "",
                "term": 12,
                "profit": 100000,
                "frequency": "FREQ",
                "income_ratio": null,
                "income_from_deposits": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 61,
                    "document_name": "Sổ/Giấy tờ có giá trị",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 62,
                    "document_name": "Chứng từ thanh toán",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 81,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 82,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "unit": "",
                "publish_unit_id": "106",
                "accept_blocked_account": "ACCEPT",
                "account": "3049569978394",
                "currency": "VND",
                "balance": 100000,
                "blocked": "",
                "term": 12,
                "profit": 100000,
                "frequency": "FREQ",
                "income_ratio": null,
                "income_from_deposits": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 61,
                    "document_name": "Sổ/Giấy tờ có giá trị",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 62,
                    "document_name": "Chứng từ thanh toán",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 81,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  },
                  {
                    "data_file": [],
                    "document_id": 82,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  }
                ]
              },
            ]
          }
          item.pension = {
            ...item.pension,
            "uuid": "LOCAL_98c4585c-d254-9d90-343c-73d4b2396973",
            "startDate": 1654065156000,
            "license": "90049568643",
            "insurance": "59378ADJKE",
            "salary": 100000,
            "frequency": "FREQ",
            "income_ratio": null,
            "income_from_pension": 100000,
            "income_from_occ": 0,
            "income_from_per": 100000,
            "documents": [
              {
                "data_file": [],
                "document_id": 63,
                "document_name": "Quyết định nghỉ hưu",
                "document_type": "DOCUMENT"
              },
              {
                "data_file": [],
                "document_id": 64,
                "document_name": "Sổ nhận lương hưu",
                "document_type": "DOCUMENT"
              },
              {
                "data_file": [],
                "document_id": 65,
                "document_name": "Chứng từ thanh toán",
                "document_type": "DOCUMENT"
              },
              {
                "data_file": [],
                "document_id": 83,
                "document_name": "Hình ảnh",
                "document_type": "IMAGE"
              },
              {
                "data_file": [],
                "document_id": 84,
                "document_name": "Chứng từ khác",
                "document_type": "DOCUMENT"
              }
            ]
          }
          item.other = {
            ...item.other,
            "activeOther": "LOCAL_926b6c43-a124-8904-460c-56bd65d3c427",
            "data": [
              {
                "uuid": "LOCAL_926b6c43-a124-8904-460c-56bd65d3c427",
                "frequencyYear": 2,
                "paymentMethod": "CASH",
                "profit": 100000,
                "note": "mô tả",
                "frequency": "FREQ",
                "income_ratio": null,
                "income_from_other_source": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 66,
                    "document_name": "Giấy tờ nguồn gốc nguồn thu",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 67,
                    "document_name": "Giấy tờ nhận nguồn thu",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 68,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 69,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "frequencyYear": 2,
                "paymentMethod": "CASH",
                "profit": 100000,
                "note": "mô tả",
                "frequency": "FREQ",
                "income_ratio": null,
                "income_from_other_source": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 66,
                    "document_name": "Giấy tờ nguồn gốc nguồn thu",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 67,
                    "document_name": "Giấy tờ nhận nguồn thu",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 68,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 69,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "frequencyYear": 2,
                "paymentMethod": "CASH",
                "profit": 100000,
                "note": "mô tả",
                "frequency": "FREQ",
                "income_ratio": null,
                "income_from_other_source": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 66,
                    "document_name": "Giấy tờ nguồn gốc nguồn thu",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 67,
                    "document_name": "Giấy tờ nhận nguồn thu",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 68,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 69,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "frequencyYear": 2,
                "paymentMethod": "CASH",
                "profit": 100000,
                "note": "mô tả",
                "frequency": "FREQ",
                "income_ratio": null,
                "income_from_other_source": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 66,
                    "document_name": "Giấy tờ nguồn gốc nguồn thu",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 67,
                    "document_name": "Giấy tờ nhận nguồn thu",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 68,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 69,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  }
                ]
              },
              {
                "uuid": generateUUID(),
                "frequencyYear": 2,
                "paymentMethod": "CASH",
                "profit": 100000,
                "note": "mô tả",
                "frequency": "FREQ",
                "income_ratio": null,
                "income_from_other_source": 100000,
                "documents": [
                  {
                    "data_file": [],
                    "document_id": 66,
                    "document_name": "Giấy tờ nguồn gốc nguồn thu",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 67,
                    "document_name": "Giấy tờ nhận nguồn thu",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 68,
                    "document_name": "Chứng từ khác",
                    "document_type": "DOCUMENT"
                  },
                  {
                    "data_file": [],
                    "document_id": 69,
                    "document_name": "Hình ảnh",
                    "document_type": "IMAGE"
                  }
                ]
              }
            ],
            "total_income_from_other_sources": 500000,
            "occasional_income_amount": 0,
            "permanent_income_amount": 500000
          }
        }
      })
       
    }
  },
}