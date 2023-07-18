import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";


export const DevToolCICInitCase = {
  autoFillAllCIC(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    const dataDeclare = ["borrower","marriage","co-brw","co-payer","law-rlt","other"]
    for(let i=0;i<dataDeclare.length;i++){
      const person_uuid = state.storage.cic.other.data[dataDeclare[i]].data.map(item=>item.person_uuid)
      state.storage.cic.other.data[dataDeclare[i]].data.forEach((item,idx)=>{
        if(item.person_uuid === person_uuid[idx]){
          const listIndentity = item.data.map(q=>q.identity_num)
          item.data.forEach((it,idxdt)=>{
            if(it.identity_num === listIndentity[idxdt]){
              it.credit.push({
                  "uuid": "65cf981e-7cbd-4cc3-a492-758468b68f44",
                  "uuidRemote": "",
                  "code": action.payload,
                  "id": 82,
                  "detail": {
                    "loan": {
                      "date": 1654071055000,
                      "active": "SHORT",
                      "list": [
                        {
                          "code": "SHORT",
                          "amount": 1000,
                          "expired": 12,
                          "balance": 1000,
                          "uuid": "dceed7e2-0a20-42da-b3be-c8942bdab021",
                          "amountCIC": 1000,
                          "balanceCIC": 1000,
                          "note": null   
                        },
                        {
                          "code": "MEDIUM",
                          "amount": null,
                          "expired": null,
                          "balance": null,
                          "uuid": null,
                          "amountCIC": null,
                          "balanceCIC": null,
                          "note": null   
                        },
                        {
                          "code": "LONG",
                          "amount": null,
                          "expired": null,
                          "balance": null,
                          "uuid": null,
                          "amountCIC": null,
                          "balanceCIC": null,
                          "note": null   
                        },
                        {
                          "code": "OTHER",
                          "amount": null,
                          "expired": null,
                          "balance": null,
                          "uuid": null,
                          "amountCIC": null,
                          "balanceCIC": null,
                          "note": null   
                        }
                      ],
                      "last_update": null,
                      "total_amount": 1000
                    },
                    "card": {
                      "date": 1654071063000,
                      "active": "97732902-0c1c-4e0e-9b09-1bbfe7797a3b",
                      "list": [
                        {
                          "uuid": "97732902-0c1c-4e0e-9b09-1bbfe7797a3b",
                          "uuidRemote": "",
                          "limited": 100,
                          "balance": 100,
                          "limitedCIC": 100,
                          "balanceCIC": 100,
                          "note": null   
                        }
                      ],
                      "last_update": null,
                      "total_amount": 100
                    },
                    "collateral": {
                      "date": 1654071070000,
                      "active": "d29ee02c-d75b-4d52-9729-73ac87b6d210",
                      "list": [
                        {
                          "code": "DEVI",
                          "uuid": "7873629f-d67a-475c-bf7e-527cfd6c66e5",
                          "value": 1000
                        },
                        {
                          "code": "GODS",
                          "uuid": "d29ee02c-d75b-4d52-9729-73ac87b6d210",
                          "value": 1000
                        }
                      ],
                      "last_update": null,
                      "total_amount": 2000
                    }
                },
              })
              it.debtGroup = "NORM"
              it.totalLoan= 1100
              it.totalCollateral = 2000
              it.activeCredit= "65cf981e-7cbd-4cc3-a492-758468b68f44"
              it.credit_score_info = {
                ...it.credit_score_info,
                risk_info:{
                  score_value: 500,
                  score_rank : "07",
                  publish_date : 1654071087000,
                  evaluation : "100",
                  customer_segment : [ "S01","S02"],
                }
              }
            }
          })
        }
      })
    }
  },

  autoFillAllCICSCB(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    const dataDeclare = ["borrower","marriage","co-brw","co-payer","law-rlt","other"]
    for(let i=0;i<dataDeclare.length;i++){
      const person_uuid = state.storage.cic.scb.data[dataDeclare[i]].data.map(item=>item.person_uuid)
      state.storage.cic.scb.data[dataDeclare[i]].data.forEach((item,idx)=>{
        if(item.person_uuid === person_uuid[idx]){
          const listIndentity = item.data.map(q=>q.identity_num)
          item.data.forEach((it,idxdt)=>{
            if(it.identity_num === listIndentity[idxdt]){
              it.credit.push({
                  "id": 106,
                  "uuid": "8904d5ab-b19c-4981-bdb3-3e4e5efe1478",
                  "uuidRemote": "",
                  "code": "79334001",
                  "detail": {
                    "card": {
                      "date": 1654053674000,
                      last_update:null,
                      "active": "453b9552-a141-41ab-b791-6cead0119f22",
                      "list": [
                        {
                          "uuid": "453b9552-a141-41ab-b791-6cead0119f22",
                          "uuidRemote": "",
                          "limited": 1000,
                          "balance": 1000,
                          "limitedCIC": 100,
                          "balanceCIC": 100,
                          "note": null   
                        }
                      ],
                      "total_amount": 1000
                    },
                    "loan": {
                      "date": 1654053650000,
                      last_update:null,
                      "active": "SHORT",
                      "list": [
                        {
                          "expired": 12,
                          "amount": 12,
                          "balance": 12,
                          "code": "SHORT",
                          "uuid": "a64f9b67-c460-4673-96f0-04c24de3aba4",
                          "amountCIC": 12,
                          "balanceCIC": 12,
                          "note": null   
                        },
                        {
                          "expired": 24,
                          "amount": 24,
                          "balance": 24,
                          "code": "MEDIUM",
                          "uuid": "2e6e3807-5224-4799-a5c0-2724d73daadb",
                          "amountCIC": 12,
                          "balanceCIC": 12,
                          "note": null   
                        },
                        {
                          "expired": 36,
                          "amount": 36,
                          "balance": 36,
                          "code": "LONG",
                          "uuid": "8fe7d28a-dc8e-491a-8b1a-cb281da4b846",
                          "amountCIC": 12,
                          "balanceCIC": 12,
                          "note": null   
                        },
                        {
                          "expired": 48,
                          "amount": 48,
                          "balance": 48,
                          "code": "OTHER",
                          "uuid": "0719c7d2-3eee-41a8-92c4-f3c5dc95d8c4",
                          "amountCIC": 12,
                          "balanceCIC": 12,
                          "note": null   
                        }
                      ],
                      "total_amount": 120
                    },
                    "collateral": {
                      "date": 1654053708000,
                      last_update:null,
                      "active": "20d3379f-3d35-4b89-b174-b02fee22b285",
                      "list": [
                        {
                          "code": "REST",
                          "uuid": "20d3379f-3d35-4b89-b174-b02fee22b285",
                          "value": 1000
                        }
                      ],
                      "total_amount": 1000
                    }
                }
              })
              it.debtGroup = "NORM"
              it.totalLoan= 1120
              it.totalCollateral = 1000
              it.activeCredit= "8904d5ab-b19c-4981-bdb3-3e4e5efe1478"
              it.credit_score_info = {
                ...it.credit_score_info,
                risk_info:{
                  score_value: 500,
                  score_rank : "07",
                  publish_date : 1654071087000,
                  evaluation : "100",
                  customer_segment : [ "S01","S02"],
                }
              }
            }
          })
        }
      })
    }
  },

}