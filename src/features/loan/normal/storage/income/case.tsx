  import { Draft, PayloadAction } from "@reduxjs/toolkit";
import * as _ from 'lodash';
import { ILOANNormalState } from "types/models/loan/normal";
import { IIncomeSourceData } from "types/models/loan/normal/storage";
import * as IncomeType from "types/models/loan/normal/storage/Income";
import {
  DataFile, Document, IIncomeAssrentRentGet, IIncomeBussinessHouseHoldGet, IIncomeCompanyGet,
  IIncomeData, IIncomeDepositGet, IIncomeDetailsPension, IIncomeOtherGet, IIncomeSalaryGet, IIncomeStockGet, ILOANNormalStorageIncomeAbility,
  ILOANNormalStorageIncomeAssetRentDetailOther,
  ILOANNormalStorageIncomeAssetRentDetailRealEstate,
  ILOANNormalStorageIncomeAssetRentDetailTransport,
  ILOANNormalStorageIncomeBalance,
  ILOANNormalStorageIncomeBusiness,
  ILOANNormalStorageIncomeCompany,
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary,
  ILOANNormalStorageIncomeDeposit,
  ILOANNormalStorageIncomeOther,
  ILOANNormalStorageIncomePension,
  ILOANNormalStorageIncomeSalary,
  ILOANNormalStorageIncomeStock,
  ILOANNormalStorageIncomeValidate, IUploadDocument
} from "types/models/loan/normal/storage/Income";
import { ILOANNormalStorageAddress } from "types/models/loan/normal/storage/Legal";
import { checkIncludePrefix, formatRoundNumber, generateUUID, pathKeyStore, PREFIX_UPDATE } from "utils";
import { cicRouterNormal2, incomeSource } from "views/pages/LOAN/utils";
import { getFinanceAnalysis } from "../legal/selectors";
import { autofillAssrentOther, autofillAssrentReal, autofillAssrentTransport, autofillBussiness, autofillCompany, autofillDeposit, autofillOther, autofillPension, autofillSalary, autofillStock } from "./autofill";
import {
  generateEmptyPosition, generateIncomeEmptyAssetType,
  generateIncomeEmptyAssrentTransport,
  generateIncomeEmptyAssrentTypeOther,
  generateIncomeEmptyAssrentTypeRealAssetRent,
  generateIncomeEmptyBusiness,
  generateIncomeEmptyCompany,
  generateIncomeEmptyDeposit,
  generateIncomeEmptyOther,
  generateIncomeEmptyPension,
  generateIncomeEmptySalary,
  generateIncomeEmptyStock, generateInitialIncomeState
} from "./generateIncomeEmpty";
import {
  calculateWithFrequency,
  handleDataAssentRent, handleDataBusiness,
  handleDataCompany, handleDataDeposit,
  handleDataOther, handleDataSalary, handleDataStock
} from './handleData';

export enum EActionMenu {
  DELETE = "delete",
}

export const incomeCase = {
  ///////////////////////////////////////
  /////////////DECLARE///////////////////
  //////////////////////////////////////

  setIncomeValidate(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalStorageIncomeValidate>){
    const dataPosition:ILOANNormalStorageIncomeDeclareSalary[] = _.get(state,['storage','income','income',action.payload?.declare as keyof ILOANNormalStorageIncomeDeclare,'dataPosition'],[]);
    const activePos:string =_.get(state,['storage','income','income',action.payload?.declare as keyof ILOANNormalStorageIncomeDeclare,'activePosition'],'');
    const currentPos = dataPosition?.find(pos => pos.uuidDeclare === activePos);
    if(currentPos){
      // declarePosition: "salary"
      // field: "income"
     // position: "UPDATE_078303a9-5887-a7fb-04bc-82636ff01c4c"
      const incomePosition = _.get(action,'payload.declarePosition','');
      const incomeUuid = _.get(action,'payload.position','');
      switch (incomePosition) {
        case 'salary':{
          currentPos.salary.activeSalary = incomeUuid;
          break;
        }
        case 'assetRent':{
          const positionHorizontal = _.get(action,'payload.positionHorizontal','');
          currentPos.assetRent.activeAssetRent = incomeUuid;
          const activeAssetRent = currentPos.assetRent.data.find(it=>it.uuid === incomeUuid);
          if(activeAssetRent){
            switch (activeAssetRent.assetType) {
              case 'REAL_ESTATE':{
                activeAssetRent.assetDetailRealEstate.activeRealEstate = positionHorizontal;
                break;
              }
              case 'TRANSPORT':{
                activeAssetRent.assetDetailTransport.activeTransport = positionHorizontal;
                break;
              }
              case 'OTHER':{
                activeAssetRent.assetDetailOther.activeOther = positionHorizontal;
                break;
              }
              default:
                break;
            }
          }
          break;
        }
        case 'business':{
          currentPos.business.activeBusiness = incomeUuid;
          break;
        }
        case 'company':{
          currentPos.company.activeCompany = incomeUuid;
          break;
        }
        case 'stock':{
          currentPos.stock.activeStock = incomeUuid;
          break;
        }
        case 'deposit':{
          currentPos.deposit.activeDeposit = incomeUuid;
          break;
        }
        case 'other':{
          currentPos.other.activeOther = incomeUuid;
          break;
        }
        default:
          break;
      }
      
    }
    state.storage.income.validate = action.payload;
  },

  setIncomeDeclareActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        { declare: keyof ILOANNormalStorageIncomeDeclare }
      >
    ) {
      state.storage.income.declareActive = action.payload;
    },
    prepare(
      payload: string,
      meta: { declare: keyof ILOANNormalStorageIncomeDeclare }
    ) {
      return { payload, meta };
    },
  },

  setIncomeDeclarePositionActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        { declare: keyof ILOANNormalStorageIncomeDeclare }
      >
    ) {
      state.storage.income.income[action.meta.declare].activePosition =
        action.payload;
    },
    prepare(
      payload: string,
      meta: { declare: keyof ILOANNormalStorageIncomeDeclare }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        { declare: keyof ILOANNormalStorageIncomeDeclare }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
        state.storage.income.activeINCOME = action.payload;
      state.storage.income.income[action.meta.declare].dataPosition.map(
        (item) => {
          if (item?.uuidDeclare === activePos) {
            item.activeIncomeSource = action.payload;
          }
          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: { declare: keyof ILOANNormalStorageIncomeDeclare }
    ) {
      return { payload, meta };
    },
  },

  assignLegalDataToIncome: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare ,
          incomeDocument: Document[]
        }
      >
    ) {
      // const dataLegalOther =
      //   state.storage.legal.data[action.meta.declare]?.info;
      const activePos = state.storage.income.income[action.meta.declare].activePosition;

      if (action.meta.declare !== "borrower" && action.meta.declare !== "marriage") {
        const nameField = action.meta.declare === "coborrower" ? "co_brw" : "co_payer";
        const dataLegalOther = state.storage.full?.data?.form?.legal_info_form?.data[nameField].map((cb) => cb?.basic_info?.uuid) ?? []
        const lengthUser = dataLegalOther?.length ?? 0;
        const dataPositionLenght = state.storage.income.income[action.meta.declare].dataPosition.length;

        const isCheckValidLegal: boolean = lengthUser !== dataPositionLenght ? true : false;
        state.storage.income.income[action.meta.declare].activePosition = action.payload;



        if(isCheckValidLegal){
          for (let i = 0; i < lengthUser; i++ ){
            const uuidPerion = state.storage.income.income[action.meta.declare].dataPosition.find(d => d.uuidDeclare === dataLegalOther[i]);

            if(!uuidPerion){
              const dataPos: ILOANNormalStorageIncomeDeclareSalary[] = [];
              dataPos.push({
                uuidDeclare: dataLegalOther[i],
                activeIncomeSource: "",
                salary: {
                  data: [],
                  activeSalary: "",
                  total_income_from_salary_source: 0,
                  permanent_income_amount: 0,
                  occasional_income_amount: 0,
                },
                assetRent: {
                  data: [],
                  activeAssetRent: "",
                  total_income_from_property_rental: 0,
                  permanent_income_amount: 0,
                  occasional_income_amount: 0,
                },
                business: {
                  data: [],
                  activeBusiness: "",
                  total_income_from_business_activities: 0,
                  permanent_income_amount: 0,
                  occasional_income_amount: 0,
                },
                company: {
                  data: [],
                  activeCompany: "",
                  occasional_income_amount: 0,
                  permanent_income_amount: 0,
                  total_income_from_company: 0,
                },
                stock: {
                  data: [],
                  activeStock: "",
                  occasional_income_amount: 0,
                  permanent_income_amount: 0,
                  total_income_from_stocks: 0,
                },
                deposit: {
                  data: [],
                  activeDeposit: "",
                  occasional_income_amount: 0,
                  permanent_income_amount: 0,
                  total_income_from_deposits: 0,
                },
                other: {
                  data: [],
                  activeOther: "",
                  occasional_income_amount: 0,
                  permanent_income_amount: 0,
                  total_income_from_other_sources: 0,
                },
                pension: {
                  ...generateIncomeEmptyPension(),
                  documents:action.meta.incomeDocument 
                },
              })

              // console.log("dataPos", dataPos)
              state.storage.income.income[action.meta.declare].dataPosition = [
                ...state.storage.income.income[action.meta.declare].dataPosition,
                ...dataPos
              ];
            }
          }
        }
      }

      if (action.meta.declare === "borrower" || action.meta.declare === "marriage") {
        state.storage.income.income[action.meta.declare].dataPosition.length > 0 ||
          state.storage.income.income[action.meta.declare].dataPosition.push({
            uuidDeclare: activePos,
            activeIncomeSource: "",
            salary: {
              data: [],
              activeSalary: "",
              total_income_from_salary_source: 0,
              permanent_income_amount: 0,
              occasional_income_amount: 0,
            },
            assetRent: {
              data: [],
              activeAssetRent: "",
              total_income_from_property_rental: 0,
              permanent_income_amount: 0,
              occasional_income_amount: 0,
            },
            business: {
              data: [],
              activeBusiness: "",
              total_income_from_business_activities: 0,
              permanent_income_amount: 0,
              occasional_income_amount: 0,
            },
            company: {
              data: [],
              activeCompany: "",
              occasional_income_amount: 0,
              permanent_income_amount: 0,
              total_income_from_company: 0,
            },
            stock: {
              data: [],
              activeStock: "",
              occasional_income_amount: 0,
              permanent_income_amount: 0,
              total_income_from_stocks: 0,
            },
            deposit: {
              data: [],
              activeDeposit: "",
              occasional_income_amount: 0,
              permanent_income_amount: 0,
              total_income_from_deposits: 0,
            },
            other: {
              data: [],
              activeOther: "",
              occasional_income_amount: 0,
              permanent_income_amount: 0,
              total_income_from_other_sources: 0,
            },
            pension: {
              ...generateIncomeEmptyPension(),
              documents:action.meta.incomeDocument
            },
          });
      }
    },
    prepare(
      payload: string,
      meta: {
         declare: keyof ILOANNormalStorageIncomeDeclare, 
        incomeDocument: Document[]
      }
    ) {
      return { payload, meta };
    },
  },

  addIncomeSourceType: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          incomeSource: keyof ILOANNormalStorageIncomeDeclareSalary;
          incomeDocument?: Document[];
        }
      >
    ) {
      const positionDeclare = state.storage.income.income[action.meta.declare].activePosition ?? "";
      const incomeSourceTypeActive = state.storage.income.income[action.meta.declare].dataPosition
      ?.find((item) => item.uuidDeclare === positionDeclare)?.activeIncomeSource;

      const documentType = state.configs.documentType[pathKeyStore({document_group_type: "NGUON_THU", type_loan: "Loan"})];

      state.storage.income.income[action.meta.declare].dataPosition.map(
        (item) => {
          if (item.uuidDeclare === positionDeclare) {
            switch (incomeSourceTypeActive) {
              case "salary":
                const salaryActive = `LOCAL_${generateUUID()}`;
                item.salary.activeSalary = salaryActive;
                item.salary.data.push({
                  ...generateIncomeEmptySalary(),
                  documents: action.meta?.incomeDocument ?? [], 
                  uuid: salaryActive,
                });
                break;
              case "assetRent":
                const assetRentActive = `LOCAL_${generateUUID()}`;
                item.assetRent.activeAssetRent = assetRentActive;
                item.assetRent.data.push({
                  ...generateIncomeEmptyAssetType(),
                  uuid: assetRentActive,
                });
                break;
              case "business":
                const businessActive = `LOCAL_${generateUUID()}`;
                item.business.activeBusiness = businessActive;
                if(action.meta.declare === 'borrower'){
                  const length = item.business.data.length;
                  if(length === 0){
                    const result = { 
                      uuid: businessActive,
                      representative: '',
                      name: '',
                      workingTime: null,
                      frequency: "FREQ",
                      ratio: null,
                      turnover: null,
                      cost: null,
                      profit: null,
                      income_business_activities: null,
                      documents:action.meta?.incomeDocument ?? [],
                    };
                    const financialAnalysis = getFinanceAnalysis(state);
                    if(financialAnalysis){
                      const T_id = 3;
                      const net_revenue = _.get(financialAnalysis.net_revenue?.find(i=>i.timeline_assign_info.id === T_id),'timeline_assign_value',0)??0;
                      const net_profit = _.get(financialAnalysis.net_profit?.find(i=>i.timeline_assign_info.id === T_id),'timeline_assign_value',0)??0;
                      const total_cost = _.get(financialAnalysis.total_cost?.find(i=>i.timeline_assign_info.id === T_id),'timeline_assign_value',0)??0;

                      _.set(result,'turnover',formatRoundNumber(net_revenue / 12));
                      _.set(result,'cost',formatRoundNumber(total_cost / 12));
                      const profix = (result.turnover??0) - (result.cost ?? 0);
                      _.set(result,'profit',profix);
                      _.set(result,'income_business_activities',calculateWithFrequency(result.frequency,profix));
                    }
                    const previousTotal =
                      (state.storage.income.income[action.meta.declare]
                        .total_income ?? 0) -
                      (item.business.total_income_from_business_activities ?? 0);
                    const previousTotalOCC =
                      (state.storage.income.income[action.meta.declare]
                        .total_occasional ?? 0) -
                      (item.business.occasional_income_amount ?? 0);
                    const previousTotalPER =
                      (state.storage.income.income[action.meta.declare]
                        .total_permanent ?? 0) -
                      (item.business.permanent_income_amount ?? 0); 

                    item.business.data.push(result);
                    const {occasional_income_amount,permanent_income_amount} = handleDataBusiness(item);
                    console.log('occasional_income_amount', occasional_income_amount);
                    console.log('permanent_income_amount', permanent_income_amount);
                    item.business.occasional_income_amount = occasional_income_amount;
                    item.business.permanent_income_amount = permanent_income_amount;
                    item.business.total_income_from_business_activities = occasional_income_amount + permanent_income_amount;
                    state.storage.income.income[
                      action.meta.declare
                    ].total_income =
                      previousTotal + item.business.total_income_from_business_activities;
        
                    state.storage.income.income[
                      action.meta.declare
                    ].total_occasional =
                      previousTotalOCC + item.business.occasional_income_amount;
        
                    state.storage.income.income[
                      action.meta.declare
                    ].total_permanent =
                      previousTotalPER +  item.business.permanent_income_amount;
                  }else {
                    item.business.data.push({
                      ...generateIncomeEmptyBusiness(),
                      documents: action.meta?.incomeDocument ?? [], 
                      uuid: businessActive,
                    });
                  }
                }else{
                  item.business.data.push({
                    ...generateIncomeEmptyBusiness(),
                    documents: action.meta?.incomeDocument ?? [],
                    uuid: businessActive,
                  });
                }
                break;
              case "company":
                const companyActive = `LOCAL_${generateUUID()}`;
                item.company.activeCompany = companyActive;
                item.company.data.push({
                  ...generateIncomeEmptyCompany(),
                  documents: action.meta?.incomeDocument ?? [], 
                  uuid: companyActive,
                });
                break;
              case "stock":
                const stockActive = `LOCAL_${generateUUID()}`;
                item.stock.activeStock = stockActive;
                item.stock.data.push({
                  ...generateIncomeEmptyStock(),
                  documents: action.meta?.incomeDocument ?? [], 
                  uuid: stockActive,
                });
                break;
              case "deposit":
                const depositActive = `LOCAL_${generateUUID()}`;
                item.deposit.activeDeposit = depositActive;
                item.deposit.data.push({
                  ...generateIncomeEmptyDeposit(),
                  documents: action.meta?.incomeDocument ?? [], 
                  uuid: depositActive,
                });
                break;
              case "pension":{ 
                const data = {
                  uuid:`LOCAL_${generateUUID()}`,
                  license:"",
                  startDate:null,
                  insurance:"",
                  salary:null,
                  frequency:"",
                  income_ratio:null,
                  income_from_pension:null,
                  income_from_occ:null,
                  income_from_per:null,
                  documents: action.meta?.incomeDocument ?? [],
                };
                item.pension={...item.pension,...data};
                break;
              }
              case "other":
                const otherActive = `LOCAL_${generateUUID()}`;
                item.other.activeOther = otherActive;
                item.other.data.push({
                  ...generateIncomeEmptyOther(),
                  documents: action.meta?.incomeDocument ?? [], 
                  uuid: otherActive,
                });
                break;
            }
          }
          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        incomeSource: keyof ILOANNormalStorageIncomeDeclareSalary;
        incomeDocument?: Document[];
      }
    ) {
      return { payload, meta };
    },
  },
  deleteIncomeSourceType: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          incomeSource: keyof ILOANNormalStorageIncomeDeclareSalary;
          position: number;
        }
      >
    ) {
      const positionDeclare = state.storage.income.income[action.meta.declare].activePosition ?? "";
      const incomeSourceTypeActive = state.storage.income.income[action.meta.declare].dataPosition.find((item) => item.uuidDeclare === positionDeclare)?.activeIncomeSource;
      console.log("incomeSourceTypeActive", incomeSourceTypeActive);
      state.storage.income.income[action.meta.declare].dataPosition.map(
        (item, index) => {
          if (item.uuidDeclare === positionDeclare) {
            switch (incomeSourceTypeActive) {
              case "salary":
                const salaryAcive = generateUUID();
                console.log("action.meta", action.meta);
                const index = action.meta.position;
                item.salary.activeSalary = salaryAcive;
                item.salary.data.splice(index, 1);
                //set active after delete
                item.salary.activeSalary = item.salary.data[item.salary.data.length-1].uuid;
                break;
              case "assetRent":
                const assetRentActive = generateUUID();
                item.assetRent.activeAssetRent = assetRentActive;
                item.assetRent.data.push({
                  ...generateIncomeEmptyAssetType(),
                  uuid: assetRentActive,
                });
                break;
              case "business":
                const businessActive = generateUUID();
                item.business.activeBusiness = businessActive;
                item.business.data.push({
                  ...generateIncomeEmptyBusiness(),
                  uuid: businessActive,
                });
                break;
              case "company":
                const companyActive = generateUUID();
                item.company.activeCompany = companyActive;
                item.company.data.push({
                  ...generateIncomeEmptyCompany(),
                  uuid: companyActive,
                });
                break;
              case "stock":
                const stockActive = generateUUID();
                item.stock.activeStock = stockActive;
                item.stock.data.push({
                  ...generateIncomeEmptyStock(),
                  uuid: stockActive,
                });
                break;
              case "deposit":
                const depositActive = generateUUID();
                item.deposit.activeDeposit = depositActive;
                item.deposit.data.push({
                  ...generateIncomeEmptyDeposit(),
                  uuid: depositActive,
                });
                break;
              case "other":
                const otherActive = generateUUID();
                item.other.activeOther = otherActive;
                item.other.data.push({
                  ...generateIncomeEmptyOther(),
                  uuid: otherActive,
                });
                break;
            }
          }
          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        incomeSource: keyof ILOANNormalStorageIncomeDeclareSalary;
        position: number;
      }
    ) {
      return { payload, meta };
    },
  },


  removeIncomeSourceType: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          incomeSource: keyof ILOANNormalStorageIncomeDeclareSalary;
          type?: string;
        }
      >
    ) {
      const positionDeclare = state.storage.income.income[action.meta.declare].activePosition ?? "";
      const incomeSourceTypeActive = state.storage.income.income[action.meta.declare].dataPosition
      ?.find((item) => item.uuidDeclare === positionDeclare)?.activeIncomeSource;
      state.storage.income.income[action.meta.declare].dataPosition.map(
        (item) => {
          if (item.uuidDeclare === positionDeclare) {
            switch (incomeSourceTypeActive) {
              case "salary":{
                const previousTotal =
                  (state.storage.income.income[action.meta.declare]
                    .total_income ?? 0) -
                  (item.salary.total_income_from_salary_source ?? 0);
                const previousTotalOCC =
                  (state.storage.income.income[action.meta.declare]
                    .total_occasional ?? 0) -
                  (item.salary.occasional_income_amount ?? 0);
                const previousTotalPER =
                  (state.storage.income.income[action.meta.declare]
                    .total_permanent ?? 0) -
                  (item.salary.permanent_income_amount ?? 0);

                item.salary.cacheData = [...item.salary.data];
                item.salary.data = item.salary.data.filter(d => d.uuid !== action.payload);

                const {occasional_income_amount,permanent_income_amount} = handleDataSalary(item);
                item.salary.occasional_income_amount = occasional_income_amount;
                item.salary.permanent_income_amount = permanent_income_amount;
                item.salary.total_income_from_salary_source = occasional_income_amount + permanent_income_amount;
                state.storage.income.income[
                  action.meta.declare
                ].total_income =
                  previousTotal + item.salary.total_income_from_salary_source;
    
                state.storage.income.income[
                  action.meta.declare
                ].total_occasional =
                  previousTotalOCC + item.salary.occasional_income_amount;
    
                state.storage.income.income[
                  action.meta.declare
                ].total_permanent =
                  previousTotalPER + item.salary.permanent_income_amount;

                let idx = item.salary.data.findIndex(it=>item.salary?.activeSalary?.includes(it?.uuid));
                if(idx!==-1){
                  item.salary.activeSalary = item.salary.data[idx].uuid ?? '';
                }else{
                  const length = item.salary.data?.length;
                  item.salary.activeSalary = item.salary.data[length-1]?.uuid||'';
                }
                break;
              }
              case "assetRent":{
                item.assetRent.cacheData = [...item.assetRent.data];
                item.assetRent.data = item.assetRent.data.filter(d => d.uuid !== action.payload);
                const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.assetRent.permanent_income_amount ?? 0);
                const {data,occasional_income_amount,permanent_income_amount} = handleDataAssentRent(item);
                data.forEach((asset)=>{
                  let current = item.assetRent.data.find(it=>it.uuid === asset.uuid);
                  if(current){
                    const {detailOther,detailTransport,realEstate} = asset;
                    // calculate RealEstate
                    _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                    _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                    _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                    // calculate Transport    
                    _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                    _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                    _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                    //   // calculate Other
                    _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                    _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                    _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                  }
                });
                item.assetRent.occasional_income_amount = occasional_income_amount;
                item.assetRent.permanent_income_amount = permanent_income_amount;
                item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;

                state.storage.income.income[
                  action.meta.declare
                ].total_income =
                  previousTotal + item.assetRent.total_income_from_property_rental;
  
                state.storage.income.income[
                  action.meta.declare
                ].total_occasional =
                  previousTotalOCC + item.assetRent.occasional_income_amount;
  
                state.storage.income.income[
                  action.meta.declare
                ].total_permanent =
                  previousTotalPER + item.assetRent.permanent_income_amount;

                  let idx = item.assetRent.data.findIndex(it=>item.assetRent?.activeAssetRent?.includes(it?.uuid));
                  if(idx!==-1){
                    item.assetRent.activeAssetRent = item?.assetRent?.data[idx]?.uuid ?? '';
                  }else{
                    const length = item.assetRent.data?.length; 
                    item.assetRent.activeAssetRent = item.assetRent.data[length-1]?.uuid||'';
                  }
                break;
              }
              case "business":{
                const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.business.total_income_from_business_activities ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.business.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.business.permanent_income_amount ?? 0); 

                item.business.cacheData=[...item.business.data];
                item.business.data = item.business.data.filter(d => d.uuid !== action.payload);

                let idx = item.business.data.findIndex(it=>item.business?.activeBusiness?.includes(it?.uuid));
                if(idx!==-1){
                  item.business.activeBusiness = item?.business?.data[idx]?.uuid ?? '';
                }else{
                  const length = item.business.data?.length;
                  item.business.activeBusiness = item.business.data[length-1]?.uuid||'';
                }

                const {occasional_income_amount,permanent_income_amount} = handleDataBusiness(item);
                item.business.occasional_income_amount = occasional_income_amount;
                item.business.permanent_income_amount = permanent_income_amount;
                item.business.total_income_from_business_activities = occasional_income_amount + permanent_income_amount;
                
                state.storage.income.income[
                  action.meta.declare
                ].total_income =
                  previousTotal + item.business.total_income_from_business_activities;
    
                state.storage.income.income[
                  action.meta.declare
                ].total_occasional =
                  previousTotalOCC + item.business.occasional_income_amount;
    
                state.storage.income.income[
                  action.meta.declare
                ].total_permanent =
                  previousTotalPER +  item.business.permanent_income_amount;
                break;
              }
              case "company":{
                const previousTotal =
                  (state.storage.income.income[action.meta.declare]
                    .total_income ?? 0) -
                  (item.company.total_income_from_company ?? 0);
                const previousTotalOCC =
                  (state.storage.income.income[action.meta.declare]
                    .total_occasional ?? 0) -
                  (item.company.occasional_income_amount ?? 0);
                const previousTotalPER =
                  (state.storage.income.income[action.meta.declare]
                    .total_permanent ?? 0) -
                  (item.company.permanent_income_amount ?? 0);
                
                item.company.cacheData=[...item.company.data];
                item.company.data = item.company.data.filter( d=> d.uuid !== action.payload);
               
                let idx = item.company.data.findIndex(it=>item.company?.activeCompany?.includes(it?.uuid));
                if(idx!==-1){
                  item.company.activeCompany = item?.company?.data[idx]?.uuid ?? '';
                }else{
                  const length =item.company.data?.length;
                  item.company.activeCompany = item.company.data[length-1]?.uuid||'';
                }

                const {occasional_income_amount,permanent_income_amount} = handleDataCompany(item);
                item.company.occasional_income_amount = occasional_income_amount;
                item.company.permanent_income_amount = permanent_income_amount;
                item.company.total_income_from_company = occasional_income_amount + permanent_income_amount;

                state.storage.income.income[
                  action.meta.declare
                ].total_income =
                  previousTotal + item.company.total_income_from_company;
    
                state.storage.income.income[
                  action.meta.declare
                ].total_occasional =
                  previousTotalOCC + item.company.occasional_income_amount;
    
                state.storage.income.income[
                  action.meta.declare
                ].total_permanent =
                  previousTotalPER +  item.company.permanent_income_amount;

                break;
              }
              case "stock":{
                const previousTotal =
                  (state.storage.income.income[action.meta.declare]
                    .total_income ?? 0) -
                  (item.stock.total_income_from_stocks ?? 0);
                const previousTotalOCC =
                  (state.storage.income.income[action.meta.declare]
                    .total_occasional ?? 0) -
                  (item.stock.occasional_income_amount ?? 0);
                const previousTotalPER =
                  (state.storage.income.income[action.meta.declare]
                    .total_permanent ?? 0) -
                  (item.stock.permanent_income_amount ?? 0);

                item.stock.cacheData=[...item.stock.data];
                item.stock.data = item.stock.data.filter( d => d.uuid !== action.payload);

                let idx = item.stock.data.findIndex(it=>item.stock?.activeStock?.includes(it?.uuid));
                if(idx!==-1){
                  item.stock.activeStock = item?.stock?.data[idx]?.uuid ??'';
                }else{
                  const length =item.stock.data?.length;
                  item.stock.activeStock = item.stock.data[length-1]?.uuid||'';
                }

                const {occasional_income_amount,permanent_income_amount} = handleDataStock(item);
                item.stock.total_income_from_stocks = occasional_income_amount+permanent_income_amount;
                item.stock.occasional_income_amount = occasional_income_amount;
                item.stock.permanent_income_amount = permanent_income_amount;

                state.storage.income.income[
                  action.meta.declare
                ].total_income =
                  previousTotal + item.stock.total_income_from_stocks;

                state.storage.income.income[
                  action.meta.declare
                ].total_occasional =
                  previousTotalOCC + item.stock.occasional_income_amount;
                state.storage.income.income[
                  action.meta.declare
                ].total_permanent =
                  previousTotalPER + item.stock.permanent_income_amount;  
                
                break;
              }
              case 'pension':{
                const previousTotal =
                  (state.storage.income.income[action.meta.declare]
                    .total_income ?? 0) -
                  (item.pension.income_from_pension ?? 0);
                const previousTotalOCC =
                  (state.storage.income.income[action.meta.declare]
                    .total_occasional ?? 0) -
                  (item.pension.income_from_occ ?? 0);
                const previousTotalPER =
                  (state.storage.income.income[action.meta.declare]
                    .total_permanent ?? 0) -
                  (item.pension.income_from_per ?? 0);
                
                const data = {
                  uuid:"",
                  license:"",
                  startDate:null,
                  insurance:"",
                  salary:null,
                  frequency:"",
                  income_ratio:null,
                  income_from_pension:null,
                  income_from_occ:null,
                  income_from_per:null,
                };
                item.pension.cacheData ={...item.pension};
                item.pension={...item.pension,...data};
                state.storage.income.income[
                  action.meta.declare
                ].total_income =
                  previousTotal + (item.pension.income_from_pension ?? 0);

                state.storage.income.income[
                  action.meta.declare
                ].total_occasional =
                  previousTotalOCC +  (item.pension.income_from_occ ?? 0);
                state.storage.income.income[
                  action.meta.declare
                ].total_permanent =
                  previousTotalPER + (item.pension.income_from_per ?? 0);  
                break;
              }
              case "deposit":{
                const previousTotal =
                  (state.storage.income.income[action.meta.declare]
                    .total_income ?? 0) -
                  (item.deposit.total_income_from_deposits ?? 0);
                const previousTotalOCC =
                  (state.storage.income.income[action.meta.declare]
                    .total_occasional ?? 0) -
                  (item.deposit.occasional_income_amount ?? 0);
                const previousTotalPER =
                  (state.storage.income.income[action.meta.declare]
                    .total_permanent ?? 0) -
                  (item.deposit.permanent_income_amount ?? 0);

                item.deposit.cacheData=[...item.deposit.data];
                item.deposit.data = item.deposit.data.filter(d => d.uuid !== action.payload);
                
                const dataDeposit = handleDataDeposit(item);
                item.deposit.total_income_from_deposits = dataDeposit.occasional_income_amount + dataDeposit.permanent_income_amount;
                item.deposit.occasional_income_amount = dataDeposit.occasional_income_amount;
                item.deposit.permanent_income_amount = dataDeposit.permanent_income_amount;

                state.storage.income.income[
                  action.meta.declare
                ].total_income =
                  previousTotal + item.deposit.total_income_from_deposits;

                state.storage.income.income[
                  action.meta.declare
                ].total_occasional =
                  previousTotalOCC + item.deposit.occasional_income_amount;
                
                state.storage.income.income[
                  action.meta.declare
                ].total_permanent =
                  previousTotalPER + item.deposit.permanent_income_amount;

                let idx = item.deposit.data.findIndex(it=>item.deposit?.activeDeposit?.includes(it?.uuid));
                if(idx!==-1){
                  item.deposit.activeDeposit = item?.deposit?.data[idx]?.uuid ?? '';
                }else{
                  const length =item.deposit.data?.length;
                  item.deposit.activeDeposit = item.deposit.data[length-1]?.uuid||'';
                }
                break;
              }
              case "other":{
                const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.other.total_income_from_other_sources ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.other.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.other.permanent_income_amount ?? 0);

                item.other.cacheData=[...item.other.data];
                item.other.data = item.other.data.filter(d => d.uuid !== action.payload);

                const dataOther = handleDataOther(item);
                item.other.total_income_from_other_sources = dataOther.permanent_income_amount + dataOther.occasional_income_amount;
                item.other.occasional_income_amount = dataOther.occasional_income_amount;
                item.other.permanent_income_amount = dataOther.permanent_income_amount;

                state.storage.income.income[
                  action.meta.declare
                ].total_income =
                  previousTotal + item.other.total_income_from_other_sources;

                state.storage.income.income[
                  action.meta.declare
                ].total_occasional =
                  previousTotalOCC + item.other.occasional_income_amount;

                state.storage.income.income[
                  action.meta.declare
                ].total_permanent =
                  previousTotalPER + item.other.permanent_income_amount;

                let idx = item.other.data.findIndex(it=>item.other?.activeOther?.includes(it?.uuid));
                if(idx!==-1){
                  item.other.activeOther = item?.other?.data[idx]?.uuid ?? '';
                }else{
                  const length = item.other.data?.length;
                  item.other.activeOther = item.other.data[length-1]?.uuid||'';
                }
                break;
              }
            }
          }
          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        incomeSource: keyof ILOANNormalStorageIncomeDeclareSalary;
        type?:string;
      }
    ) {
      return { payload, meta };
    },
  },

  ///////////////////////////////////////
  /////////////SALARY///////////////////
  //////////////////////////////////////

  setIncomeSourceSalaryActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      state.storage.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item?.uuidDeclare === activePos) {
            item.salary.activeSalary = action.payload;
          }

          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceSalaryData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null | Array<any>,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          key: keyof ILOANNormalStorageIncomeSalary;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeSal = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.salary
        .activeSalary;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.salary.data = item.salary.data.map((sal) => {
                if (sal.uuid === activeSal) {
                  return {
                    ...sal,
                    [action.meta.key]: action.payload,
                  };
                }
                return { ...sal };
              });
              // this code append Prefix Local when on change
              const activeSalary = item.salary.data.find(sal => sal.uuid === activeSal);
              if(activeSalary && !checkIncludePrefix(activeSalary.uuid)){
                const refactorUuid = `${PREFIX_UPDATE}${activeSalary?.uuid}`;
                activeSalary.uuid = refactorUuid;
                item.salary.activeSalary = refactorUuid;
              }
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null | Array<any>,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        key: keyof ILOANNormalStorageIncomeSalary;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceSalaryDataTitleCompany: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          full_name: string;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeSal = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.salary
        .activeSalary;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.salary.data = item.salary.data.map((sal) => {
                if (sal.uuid === activeSal) {
                  sal.companyName = action.payload;
                  sal.companyCate = action.meta.full_name;
                  return {
                    ...sal,
                  };
                }
                return { ...sal };
              });
              // this code append Prefix Local when on change
              const activeSalary = item.salary.data.find(sal => sal.uuid === activeSal);
              if(activeSalary && !checkIncludePrefix(activeSalary?.uuid)){
                const refactorUuid = `${PREFIX_UPDATE}${activeSalary?.uuid}`;
                activeSalary.uuid = refactorUuid;
                item.salary.activeSalary = refactorUuid;
              }
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        full_name: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceSalaryDataTotal: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeSal = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.salary
        .activeSalary;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.salary.total_income_from_salary_source ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.salary.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.salary.permanent_income_amount ?? 0);

              item.salary.data = item.salary.data.map((sal) => {
                if (sal.uuid === activeSal) {
                  sal.salary = action.payload;
                  sal.incomeFromSalary = calculateWithFrequency(sal.frequency,sal.salary);
                }
                return { ...sal };
              });

              // this code append Prefix Local when on change
              const activeSalary = item.salary.data.find(sal => sal.uuid === activeSal);
              if(activeSalary && !checkIncludePrefix(activeSalary?.uuid)){
                const refactorUuid = `${PREFIX_UPDATE}${activeSalary?.uuid}`;
                activeSalary.uuid = refactorUuid;
                item.salary.activeSalary = refactorUuid;
              }

              const {occasional_income_amount,permanent_income_amount} = handleDataSalary(item);  
              item.salary.occasional_income_amount = occasional_income_amount;
              item.salary.permanent_income_amount = permanent_income_amount;
              item.salary.total_income_from_salary_source = occasional_income_amount + permanent_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.salary.total_income_from_salary_source;
  
              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.salary.occasional_income_amount;
  
              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.salary.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceSalaryChangeFREQ: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeSal = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.salary
        .activeSalary;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
            const previousTotal =
              (state.storage.income.income[action.meta.declare]
                .total_income ?? 0) -
              (item.salary.total_income_from_salary_source ?? 0);
            const previousTotalOCC =
              (state.storage.income.income[action.meta.declare]
                .total_occasional ?? 0) -
              (item.salary.occasional_income_amount ?? 0);
            const previousTotalPER =
              (state.storage.income.income[action.meta.declare]
                .total_permanent ?? 0) -
              (item.salary.permanent_income_amount ?? 0);
              item.salary.data = item.salary.data.map((sal) => {
                if (sal.uuid === activeSal) {
                  sal.frequency = action.payload;
                  sal.incomeFromSalary =calculateWithFrequency(action.payload,sal.salary);
                }
                return { ...sal };
              });

              // this code append Prefix Local when on change
              const activeSalary = item.salary.data.find(sal => sal.uuid === activeSal);
              if(activeSalary && !checkIncludePrefix(activeSalary?.uuid)){
                const refactorUuid = `${PREFIX_UPDATE}${activeSalary?.uuid}`;
                activeSalary.uuid = refactorUuid;
                item.salary.activeSalary = refactorUuid;
              }

              const {occasional_income_amount,permanent_income_amount} = handleDataSalary(item);
              item.salary.occasional_income_amount = occasional_income_amount;
              item.salary.permanent_income_amount = permanent_income_amount;
              item.salary.total_income_from_salary_source = occasional_income_amount + permanent_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.salary.total_income_from_salary_source;
  
              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.salary.occasional_income_amount;
  
              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.salary.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  ///////////////////////////////////////
  /////////////ASSET-RENT////////////////
  ///////////////////////////////////////

  setIncomeSourceAssetRentActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      state.storage.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item.uuidDeclare === activePos) {
            item.assetRent.activeAssetRent = action.payload;
          }

          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceAssetRentType: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      state.storage.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item.uuidDeclare === activePos) {
            item.assetRent.data = item.assetRent.data.map((item) => {
              if (item.uuid === activeAssetRent) {
                item.assetType = action.payload;
                item.assetDetailOther.data = []
                item.assetDetailRealEstate.data = []
                item.assetDetailTransport.data = []
                item.assetDetailOther.total_income_from_other = 0
                item.assetDetailOther.occasional_income_from_other = 0
                item.assetDetailOther.permanent_income_from_other = 0
                item.assetDetailRealEstate.total_income_from_rental_real_estate = 0
                item.assetDetailRealEstate.occasional_income_from_rental_real_estate = 0
                item.assetDetailRealEstate.permanent_income_from_rental_real_estate = 0
                item.assetDetailTransport.total_income_from_transport = 0
                item.assetDetailTransport.occasional_income_from_transport = 0
                item.assetDetailTransport.permanent_income_from_transport = 0
              }
              return { ...item };
            });
          }

          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  addIncomeSourceAssetRentType: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const documentType = state.configs.documentType.NGUON_THU_Loan;
      const child_list = documentType?.data?.find(d => d.id === 21)?.child_list ?? [];

      const incomeDocument: Document[] = child_list?.map(cl => ({
        data_file: [],
        document_id: Number(cl.id),
        document_name: cl.name.toString(),
        document_type: cl.type.toString()
      }))

      state.storage.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item.uuidDeclare === activePos) {
            item.assetRent.data = item.assetRent.data.map((item) => {
              if (item.uuid === activeAssetRent) {
                if (action.payload === "REAL_ESTATE") {

                  const activeReal = `LOCAL_${generateUUID()}`;
                  item.assetDetailRealEstate.activeRealEstate = activeReal;
                  item.assetDetailRealEstate.data.push({
                    ...generateIncomeEmptyAssrentTypeRealAssetRent(),
                    uuid: activeReal,
                    documents: incomeDocument
                  });
                }
                if (action.payload === "TRANSPORT") {
                  const activeTransport =  `LOCAL_${generateUUID()}`;
                  item.assetDetailTransport.activeTransport = activeTransport;
                  item.assetDetailTransport.data.push({
                    ...generateIncomeEmptyAssrentTransport(),
                    uuid: activeTransport,
                    documents: incomeDocument
                  });
                }
                if (action.payload === "OTHER") {
                  const activeOther =  `LOCAL_${generateUUID()}`;
                  item.assetDetailOther.activeOther = activeOther;
                  item.assetDetailOther.data.push({
                    ...generateIncomeEmptyAssrentTypeOther(),
                    uuid: activeOther,
                    documents: incomeDocument
                  });
                }
              }
              return { ...item };
            });
            // this code append prefix local on change
            const activeAss =item.assetRent.data.find(as=>as.uuid === activeAssetRent);
            if(activeAss && !checkIncludePrefix(activeAss.uuid)){
              const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
              activeAss.uuid = refactorUuid;
              item.assetRent.activeAssetRent = refactorUuid;
            };  
          }

          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  removeIncomeSourceAssetRentType: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          activeAssetRent: string;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      state.storage.income.income[action.meta.declare].dataPosition?.map(
        (decla) => {
          if (decla.uuidDeclare === activePos) {
            decla.assetRent.cacheData=JSON.parse(JSON.stringify(decla.assetRent.data));
            const previousTotal =
              (state.storage.income.income[action.meta.declare]
                .total_income ?? 0) -
              (decla.assetRent.total_income_from_property_rental ?? 0);
            const previousTotalOCC =
              (state.storage.income.income[action.meta.declare]
                .total_occasional ?? 0) -
              (decla.assetRent.occasional_income_amount ?? 0);
            const previousTotalPER =
              (state.storage.income.income[action.meta.declare]
                .total_permanent ?? 0) -
              (decla.assetRent.permanent_income_amount ?? 0);
            
            decla.assetRent.data = decla.assetRent.data.map((item) => {
              if (item.uuid === activeAssetRent) {
                if (action.meta.activeAssetRent === "REAL_ESTATE") {
                  item.assetDetailRealEstate.data = item.assetDetailRealEstate.data.filter(d => d.uuid !== action.payload) ?? [];
                  const length =item.assetDetailRealEstate.data.length;
                  if(length>0){
                    item.assetDetailRealEstate.activeRealEstate = item.assetDetailRealEstate.data[length-1]?.uuid||'';
                  }
                }
                if (action.meta.activeAssetRent === "TRANSPORT") {
                item.assetDetailTransport.data = item.assetDetailTransport.data.filter(d => d.uuid !== action.payload)  ?? [];
                const length =item.assetDetailTransport.data.length;
                  if(length>0){
                    item.assetDetailTransport.activeTransport = item.assetDetailTransport.data[length-1]?.uuid||'';
                  }
                }
                if (action.meta.activeAssetRent === "OTHER") {
                  item.assetDetailOther.data = item.assetDetailOther.data.filter(d => d.uuid !== action.payload)  ?? [];
                  const length =item.assetDetailOther.data.length;
                  if(length>0){
                    item.assetDetailOther.activeOther = item.assetDetailOther.data[length-1]?.uuid||'';
                  }
                }
              }
              return { ...item };
            });

            const idx = decla.assetRent.data.findIndex(it=>it.uuid===activeAssetRent);
            if(idx!==-1){
              switch (action.meta.activeAssetRent){
                case "REAL_ESTATE":{
                  if(decla.assetRent.data[idx].assetDetailRealEstate.data.length === 0){
                    decla.assetRent.data[idx].assetType='';
                    decla.assetRent.data[idx].assetDetailRealEstate.activeRealEstate ='';
                  }
                  break;
                }
                case "TRANSPORT":{
                  if(decla.assetRent.data[idx].assetDetailTransport.data.length === 0){
                    decla.assetRent.data[idx].assetType='';
                    decla.assetRent.data[idx].assetDetailTransport.activeTransport ='';
                  }
                  break;
                }
                case "OTHER":{
                  if(decla.assetRent.data[idx].assetDetailOther.data.length === 0){
                    decla.assetRent.data[idx].assetType='';
                    decla.assetRent.data[idx].assetDetailOther.activeOther ='';
                  }
                  break;
                }
                default :break;
              }
            }
            // const length  = decla.assetRent?.data?.length;
            // decla.assetRent.activeAssetRent =length > 0 ? decla.assetRent?.data[length - 1].uuid:'';
             
            const {data,occasional_income_amount,permanent_income_amount} = handleDataAssentRent(decla);
            data.forEach((asset)=>{
              let current = decla.assetRent.data.find(it=>it.uuid === asset.uuid);
              if(current){
                const {detailOther,detailTransport,realEstate} = asset;
                // calculate RealEstate
                _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                // calculate Transport    
                _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                //   // calculate Other
                _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
              }
            });
            decla.assetRent.occasional_income_amount = occasional_income_amount;
            decla.assetRent.permanent_income_amount = permanent_income_amount;
            decla.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;

            state.storage.income.income[
              action.meta.declare
            ].total_income =
              previousTotal + decla.assetRent.total_income_from_property_rental;

            state.storage.income.income[
              action.meta.declare
            ].total_occasional =
              previousTotalOCC + decla.assetRent.occasional_income_amount;

            state.storage.income.income[
              action.meta.declare
            ].total_permanent =
              previousTotalPER + decla.assetRent.permanent_income_amount;
          }
          return { ...decla };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        activeAssetRent: string;
      }
    ) {
      return { payload, meta };
    },
  },

  /////////////ASSET-RENT-REAL////////////////

  setIncomeSourceAssetRentRealEState: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;
      state.storage.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item.uuidDeclare === activePos) {
            const previousTotal =
              (state.storage.income.income[action.meta.declare]
                .total_income ?? 0) -
              (item.assetRent.total_income_from_property_rental ?? 0);
            const previousTotalOCC =
              (state.storage.income.income[action.meta.declare]
                .total_occasional ?? 0) -
              (item.assetRent.occasional_income_amount ?? 0);
            const previousTotalPER =
              (state.storage.income.income[action.meta.declare]
                .total_permanent ?? 0) -
              (item.assetRent.permanent_income_amount ?? 0);
            item.assetRent.data = item.assetRent.data.map((item) => {
              if (item.uuid === activeAssetRent) {
                item.assetDetailRealEstate.activeRealEstate = action.payload;
              }
              return { ...item };
            });
            const {data,occasional_income_amount,permanent_income_amount} = handleDataAssentRent(item);
            data.forEach((asset)=>{
              let current = item.assetRent.data.find(it=>it.uuid === asset.uuid);
              if(current){
                const {detailOther,detailTransport,realEstate} = asset;
                // calculate RealEstate
                _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                // calculate Transport    
                _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                //   // calculate Other
                _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
              }
            });
            item.assetRent.occasional_income_amount = occasional_income_amount;
            item.assetRent.permanent_income_amount = permanent_income_amount;
            item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;
            
            state.storage.income.income[
              action.meta.declare
            ].total_income =
              previousTotal + item.assetRent.total_income_from_property_rental;

            state.storage.income.income[
              action.meta.declare
            ].total_occasional =
              previousTotalOCC + item.assetRent.occasional_income_amount;

            state.storage.income.income[
              action.meta.declare
            ].total_permanent =
              previousTotalPER + item.assetRent.permanent_income_amount;
          }
          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceAssetRentRealEStateData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          key: keyof ILOANNormalStorageIncomeAssetRentDetailRealEstate;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeRealEstate = state.storage.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailRealEstate.activeRealEstate;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.assetRent.permanent_income_amount ?? 0);
              item.assetRent.data = item.assetRent.data.map((item) => {
                if (item.uuid === activeAssetRent) {
                  item.assetDetailRealEstate.data =
                    item.assetDetailRealEstate.data.map((real) => {
                      if (real.uuid === activeRealEstate) {
                        return {
                          ...real,
                          [action.meta.key]: action.payload,
                        };
                      }
                      return { ...real };
                    });
                }
                return { ...item };
              });
              
              // this code append prefix local on change
              const activeAss =item.assetRent.data.find(as=>as.uuid === activeAssetRent);
              if(activeAss && !checkIncludePrefix(activeAss.uuid)){
                const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
                activeAss.uuid = refactorUuid;
                item.assetRent.activeAssetRent = refactorUuid;
              };

              const {data,occasional_income_amount,permanent_income_amount} = handleDataAssentRent(item);
              data.forEach((asset)=>{
                let current = item.assetRent.data.find(it=>it.uuid === asset.uuid);
                if(current){
                  const {detailOther,detailTransport,realEstate} = asset;
                  // calculate RealEstate
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                }
              });
              item.assetRent.occasional_income_amount = occasional_income_amount;
              item.assetRent.permanent_income_amount = permanent_income_amount;
              item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.assetRent.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        key: keyof ILOANNormalStorageIncomeAssetRentDetailRealEstate;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceAssetRentRealEStateDataTotal: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeRealEstate = state.storage.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailRealEstate.activeRealEstate;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.assetRent.permanent_income_amount ?? 0);
              item.assetRent.data = item.assetRent.data.map((ass) => {
                if (ass.uuid === activeAssetRent) {
                  ass.assetDetailRealEstate.data = ass.assetDetailRealEstate.data.map((real) => {
                      if (real.uuid === activeRealEstate) {
                        real.price = action.payload;
                        real.income_from_real_estate = real.frequency_type === "FREQ" ? action.payload : (action.payload ?? 0) * 0.3;
                      }
                      return { ...real };
                    });
                }
                return { ...ass };
              });
              const {data,occasional_income_amount,permanent_income_amount} = handleDataAssentRent(item);
              data.forEach((asset)=>{
                let current = item.assetRent.data.find(it=>it.uuid === asset.uuid);
                if(current){
                  const {detailOther,detailTransport,realEstate} = asset;
                  // calculate RealEstate
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                }
              });
              // this code append prefix local on change
              const activeAss =item.assetRent.data.find(as=>as.uuid === activeAssetRent);
              if(activeAss && !checkIncludePrefix(activeAss.uuid)){
                const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
                activeAss.uuid = refactorUuid;
                item.assetRent.activeAssetRent = refactorUuid;
              };
              item.assetRent.occasional_income_amount = occasional_income_amount;
              item.assetRent.permanent_income_amount = permanent_income_amount;
              item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;
              
              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.assetRent.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceAssetRentRealEStateDataFREQ: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeRealEstate = state.storage.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailRealEstate.activeRealEstate;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.assetRent.permanent_income_amount ?? 0);
              item.assetRent.data = item.assetRent.data.map((ass) => {
                if (ass.uuid === activeAssetRent) {
                  ass.assetDetailRealEstate.data =
                    ass.assetDetailRealEstate.data.map((real) => {
                      if (real.uuid === activeRealEstate) {
                        real.frequency_type = action.payload;
                        real.income_from_real_estate = action.payload === "FREQ"? (real.price ?? 0) :(real.price ?? 0) * 0.3;
                        return {
                          ...real,
                        };
                      }
                      return { ...real };
                    });
                }
                return { ...ass };
              });

              const {data,occasional_income_amount,permanent_income_amount} = handleDataAssentRent(item);
              data.forEach((asset)=>{
                let current = item.assetRent.data.find(it=>it.uuid === asset.uuid);
                if(current){
                  const {detailOther,detailTransport,realEstate} = asset;
                  // calculate RealEstate
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                }
              });

              // this code append prefix local on change
              const activeAss =item.assetRent.data.find(as=>as.uuid === activeAssetRent);
              if(activeAss && !checkIncludePrefix(activeAss.uuid)){
                const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
                activeAss.uuid = refactorUuid;
                item.assetRent.activeAssetRent = refactorUuid;
              };

              item.assetRent.occasional_income_amount = occasional_income_amount;
              item.assetRent.permanent_income_amount = permanent_income_amount;
              item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;
              
              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.assetRent.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceAssetRentRealEStateDataLocation: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        Pick<ILOANNormalStorageAddress, "province" | "district" | "ward">,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeRealEstate = state.storage.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailRealEstate.activeRealEstate;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.assetRent.data = item.assetRent.data.map((item) => {
                if (item.uuid === activeAssetRent) {
                  item.assetDetailRealEstate.data =
                    item.assetDetailRealEstate.data.map((real) => {
                      if (real.uuid === activeRealEstate) {
                        return {
                          ...real,
                          province: action.payload.province,
                          district: action.payload.district,
                          ward: action.payload.ward,
                        };
                      }
                      return { ...real };
                    });
                }
                return { ...item };
              });
              
              // this code append prefix local on change
              const activeAss =item.assetRent.data.find(as=>as.uuid === activeAssetRent);
              if(activeAss && !checkIncludePrefix(activeAss.uuid)){
                const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
                activeAss.uuid = refactorUuid;
                item.assetRent.activeAssetRent = refactorUuid;
              };
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: Pick<
        ILOANNormalStorageAddress,
        "province" | "district" | "ward"
      >,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceAssetRentRealEStateDataOwned: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeRealEstate = state.storage.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailRealEstate.activeRealEstate;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.assetRent.data = item.assetRent.data.map((item) => {
                if (item.uuid === activeAssetRent) {
                  item.assetDetailRealEstate.data =
                    item.assetDetailRealEstate.data.map((real) => {
                      if (real.uuid === activeRealEstate) {
                        real.owned_status = action.payload;
                        return {
                          ...real,
                        };
                      }
                      return { ...real };
                    });
                }
                return { ...item };
              });
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  /////////////ASSET-TRANSPORT////////////////

  setIncomeSourceAssetRentTransport: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;
      state.storage.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item.uuidDeclare === activePos) {
            const previousTotal =
              (state.storage.income.income[action.meta.declare]
                .total_income ?? 0) -
              (item.assetRent.total_income_from_property_rental ?? 0);
            const previousTotalOCC =
              (state.storage.income.income[action.meta.declare]
                .total_occasional ?? 0) -
              (item.assetRent.occasional_income_amount ?? 0);
            const previousTotalPER =
              (state.storage.income.income[action.meta.declare]
                .total_permanent ?? 0) -
              (item.assetRent.permanent_income_amount ?? 0);
            item.assetRent.data = item.assetRent.data.map((item) => {
              if (item.uuid === activeAssetRent) {
                item.assetDetailTransport.activeTransport = action.payload;
              }
              return { ...item };
            });
            const {data,occasional_income_amount,permanent_income_amount} = handleDataAssentRent(item);
              data.forEach((asset)=>{
                let current = item.assetRent.data.find(it=>it.uuid === asset.uuid);
                if(current){
                  const {detailOther,detailTransport,realEstate} = asset;
                  // calculate RealEstate
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                }
              });
              item.assetRent.occasional_income_amount = occasional_income_amount;
              item.assetRent.permanent_income_amount = permanent_income_amount;
              item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;
              
              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.assetRent.permanent_income_amount;
          }
          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceAssetRentTransportData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          key: keyof ILOANNormalStorageIncomeAssetRentDetailTransport;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeTransport = state.storage.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailTransport.activeTransport;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.assetRent.permanent_income_amount ?? 0);
              item.assetRent.data = item.assetRent.data.map((item) => {
                if (item.uuid === activeAssetRent) {
                  item.assetDetailTransport.data =
                    item.assetDetailTransport.data.map((trans) => {
                      if (trans.uuid === activeTransport) {
                        return {
                          ...trans,
                          [action.meta.key]: action.payload,
                        };
                      }
                      return { ...trans };
                    });
                }
                return { ...item };
              });

              const {data,occasional_income_amount,permanent_income_amount} = handleDataAssentRent(item);
              data.forEach((asset)=>{
                let current = item.assetRent.data.find(it=>it.uuid === asset.uuid);
                if(current){
                  const {detailOther,detailTransport,realEstate} = asset;
                  // calculate RealEstate
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                }
              });

              // this code append prefix local on change
              const activeAss =item.assetRent.data.find(as=>as.uuid === activeAssetRent);
              if(activeAss && !checkIncludePrefix(activeAss.uuid)){
                const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
                activeAss.uuid = refactorUuid;
                item.assetRent.activeAssetRent = refactorUuid;
              };

              item.assetRent.occasional_income_amount = occasional_income_amount;
              item.assetRent.permanent_income_amount = permanent_income_amount;
              item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;
              
              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.assetRent.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        key: keyof ILOANNormalStorageIncomeAssetRentDetailTransport;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceAssetRentTransportDataOwned: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeTransport = state.storage.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailTransport.activeTransport;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.assetRent.data = item.assetRent.data.map((item) => {
                if (item.uuid === activeAssetRent) {
                  item.assetDetailTransport.data =
                    item.assetDetailTransport.data.map((trans) => {
                      if (trans.uuid === activeTransport) {
                        trans.owned_status = action.payload;
                        return {
                          ...trans,
                        };
                      }
                      return { ...trans };
                    });
                }
                return { ...item };
              });
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceAssetRentTransportDataTotal: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeTransport = state.storage.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailTransport.activeTransport;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.assetRent.permanent_income_amount ?? 0);
              item.assetRent.data = item.assetRent.data.map((ass) => {
                if (ass.uuid === activeAssetRent) {
                  ass.assetDetailTransport.data =
                    ass.assetDetailTransport.data.map((trans) => {
                      if (trans.uuid === activeTransport) {
                        trans.price = action.payload;
                        trans.income_from_transport =trans.frequency_type === "FREQ"?(action.payload):(action.payload??0)*0.3;
                      }
                      return { ...trans };
                    });
                }
                return { ...ass };
              });
              const {data,occasional_income_amount,permanent_income_amount} = handleDataAssentRent(item);
              data.forEach((asset)=>{
                let current = item.assetRent.data.find(it=>it.uuid === asset.uuid);
                if(current){
                  const {detailOther,detailTransport,realEstate} = asset;
                  // calculate RealEstate
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                }
              });

              // this code append prefix local on change
              const activeAss =item.assetRent.data.find(as=>as.uuid === activeAssetRent);
              if(activeAss && !checkIncludePrefix(activeAss.uuid)){
                const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
                activeAss.uuid = refactorUuid;
                item.assetRent.activeAssetRent = refactorUuid;
              };

              item.assetRent.occasional_income_amount = occasional_income_amount;
              item.assetRent.permanent_income_amount = permanent_income_amount;
              item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;
              
              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.assetRent.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceAssetRentTransportDataFREQ: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeTransport = state.storage.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailTransport.activeTransport;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.assetRent.permanent_income_amount ?? 0);

              item.assetRent.data = item.assetRent.data.map((ass) => {
                if (ass.uuid === activeAssetRent) {
                  ass.assetDetailTransport.data =
                    ass.assetDetailTransport.data.map((trans) => {
                      if (trans.uuid === activeTransport) {
                        trans.frequency_type = action.payload;
                        trans.income_from_transport = action.payload === "FREQ"?(trans.price ?? 0):(trans.price ?? 0)*0.3;
                      }
                      return { ...trans };
                    });
                }
                return { ...ass };
              });

              const {data,occasional_income_amount,permanent_income_amount} = handleDataAssentRent(item);
              data.forEach((asset)=>{
                let current = item.assetRent.data.find(it=>it.uuid === asset.uuid);
                if(current){
                  const {detailOther,detailTransport,realEstate} = asset;
                  // calculate RealEstate
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                }
              });

              // this code append prefix local on change
              const activeAss =item.assetRent.data.find(as=>as.uuid === activeAssetRent);
              if(activeAss && !checkIncludePrefix(activeAss.uuid)){
                const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
                activeAss.uuid = refactorUuid;
                item.assetRent.activeAssetRent = refactorUuid;
              };

              item.assetRent.occasional_income_amount = occasional_income_amount;
              item.assetRent.permanent_income_amount = permanent_income_amount;
              item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;
              
              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.assetRent.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  /////////////ASSET-OTHER////////////////

  setIncomeSourceAssetRentOther: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;
      state.storage.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item.uuidDeclare === activePos) {
            item.assetRent.data = item.assetRent.data.map((item) => {
              if (item.uuid === activeAssetRent) {
                item.assetDetailOther.activeOther = action.payload;
              }
              return { ...item };
            });
          }
          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceAssetRentOtherData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          key: keyof ILOANNormalStorageIncomeAssetRentDetailOther;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeOther = state.storage.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailOther.activeOther;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.assetRent.permanent_income_amount ?? 0);
              item.assetRent.data = item.assetRent.data.map((item) => {
                if (item.uuid === activeAssetRent) {
                  item.assetDetailOther.data = item.assetDetailOther.data.map(
                    (trans) => {
                      if (trans.uuid === activeOther) {
                        return {
                          ...trans,
                          [action.meta.key]: action.payload,
                        };
                      }
                      return { ...trans };
                    }
                  );
                }
                return { ...item };
              });
              const {data,occasional_income_amount,permanent_income_amount} = handleDataAssentRent(item);
              data.forEach((asset)=>{
                let current = item.assetRent.data.find(it=>it.uuid === asset.uuid);
                if(current){
                  const {detailOther,detailTransport,realEstate} = asset;
                  // calculate RealEstate
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                }
              });

              // this code append prefix local on change
              const activeAss =item.assetRent.data.find(as=>as.uuid === activeAssetRent);
              if(activeAss && !checkIncludePrefix(activeAss.uuid)){
                const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
                activeAss.uuid = refactorUuid;
                item.assetRent.activeAssetRent = refactorUuid;
              };

              item.assetRent.occasional_income_amount = occasional_income_amount;
              item.assetRent.permanent_income_amount = permanent_income_amount;
              item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;
              
              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.assetRent.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        key: keyof ILOANNormalStorageIncomeAssetRentDetailOther;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceAssetRentOtherDataOwned: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeOther = state.storage.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailOther.activeOther;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.assetRent.data = item.assetRent.data.map((item) => {
                if (item.uuid === activeAssetRent) {
                  item.assetDetailTransport.data =
                    item.assetDetailTransport.data.map((ot) => {
                      if (ot.uuid === activeOther) {
                        ot.owned_status = action.payload;
                        return {
                          ...ot,
                        };
                      }
                      return { ...ot };
                    });
                }
                return { ...item };
              });
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceAssetRentOtherDataTotal: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeOther = state.storage.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailOther.activeOther;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.assetRent.permanent_income_amount ?? 0);
              item.assetRent.data = item.assetRent.data.map((ass) => {
                if (ass.uuid === activeAssetRent) {
                  ass.assetDetailOther.data = ass.assetDetailOther.data.map(
                    (trans) => {
                      if (trans.uuid === activeOther) {
                        trans.price = action.payload;
                        trans.income_from_other =  trans.frequency_type=== "FREQ"?(trans.price??0):(trans.price??0)*0.3;
                      }
                      return { ...trans };
                    }
                  );
                }
                return { ...ass };
              });
              const {data,occasional_income_amount,permanent_income_amount} = handleDataAssentRent(item);
              data.forEach((asset)=>{
                let current = item.assetRent.data.find(it=>it.uuid === asset.uuid);
                if(current){
                  const {detailOther,detailTransport,realEstate} = asset;
                  // calculate RealEstate
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                }
              });

              // this code append prefix local on change
              const activeAss =item.assetRent.data.find(as=>as.uuid === activeAssetRent);
              if(activeAss && !checkIncludePrefix(activeAss.uuid)){
                const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
                activeAss.uuid = refactorUuid;
                item.assetRent.activeAssetRent = refactorUuid;
              };

              item.assetRent.occasional_income_amount = occasional_income_amount;
              item.assetRent.permanent_income_amount = permanent_income_amount;
              item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;
              
              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.assetRent.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceAssetRentOtherDataFREQ: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeOther = state.storage.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailOther.activeOther;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.assetRent.permanent_income_amount ?? 0);
              item.assetRent.data = item.assetRent.data.map((ass) => {
                if (ass.uuid === activeAssetRent) {
                  ass.assetDetailOther.data = ass.assetDetailOther.data.map(
                    (trans) => {
                      if (trans.uuid === activeOther) {
                        trans.frequency_type = action.payload;
                        trans.income_from_other=action.payload === "FREQ"?(trans.price??0):(trans.price??0)*0.3;
                      }
                      return { ...trans };
                    }
                  );
                }
                return { ...ass };
              });
              const {data,occasional_income_amount,permanent_income_amount} = handleDataAssentRent(item);
              data.forEach((asset)=>{
                let current = item.assetRent.data.find(it=>it.uuid === asset.uuid);
                if(current){
                  const {detailOther,detailTransport,realEstate} = asset;
                  // calculate RealEstate
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                }
              });

              // this code append prefix local on change
              const activeAss =item.assetRent.data.find(as=>as.uuid === activeAssetRent);
              if(activeAss && !checkIncludePrefix(activeAss.uuid)){
                const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
                activeAss.uuid = refactorUuid;
                item.assetRent.activeAssetRent = refactorUuid;
              };

              item.assetRent.occasional_income_amount = occasional_income_amount;
              item.assetRent.permanent_income_amount = permanent_income_amount;
              item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.assetRent.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  ///////////////////////////////////////
  /////////////BUSSNIESS///////////////////
  //////////////////////////////////////

  setIncomeSourceBussinessActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      state.storage.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item.uuidDeclare === activePos) {
            item.business.activeBusiness = action.payload;
          }

          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceBussinessData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null | Array<Document>,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          key: keyof ILOANNormalStorageIncomeBusiness;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeBus = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.business
        .activeBusiness;
      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.business.data = item.business.data.map((bus) => {
                if (bus.uuid === activeBus) {
                  if(action.meta.key === 'representative'){
                    switch (action.meta.declare) {
                      case 'borrower':{
                        if(action.payload === 'SELF'){
                          const borrower = state.storage.full.data?.form.legal_info_form.data.borrower;
                          bus.name =borrower?.basic_info.full_name ?? '';
                        }else if(action.payload === 'MARRIAGE'){
                          const marriage = state.storage.full.data?.form.legal_info_form.data.marriage;
                          bus.name =marriage?.basic_info.full_name ?? '';
                        }    
                        break;
                      }
                      case 'marriage':{
                        if(action.payload === 'SELF'){
                          const marriage = state.storage.full.data?.form.legal_info_form.data.marriage;
                          bus.name =marriage?.basic_info.full_name ?? '';
                        }else if(action.payload === 'MARRIAGE'){
                          const borrower = state.storage.full.data?.form.legal_info_form.data.borrower;
                          bus.name =borrower?.basic_info.full_name ?? '';
                        }    
                        break;
                      }
                      case 'coborrower':{
                        break;
                      }
                      case 'copayer':{
                        break;
                      }
                      default:
                        break;
                    }
                    
                  }
                  return {
                    ...bus,
                    [action.meta.key]: action.payload,
                  };
                }
                return { ...bus };
              });

              // this code append prefix local when on change
              const activeBusiness = item.business.data.find(bus=>bus.uuid === activeBus);
              if(activeBusiness && !checkIncludePrefix(activeBusiness.uuid)){
                const refactorUuid = `${PREFIX_UPDATE}${activeBusiness.uuid}`;
                activeBusiness.uuid = refactorUuid;
                item.business.activeBusiness = refactorUuid;
              }
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null | Array<Document>,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        key: keyof ILOANNormalStorageIncomeBusiness;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceBusinessDataTurnover: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeBus = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.business
        .activeBusiness;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.business.total_income_from_business_activities ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.business.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.business.permanent_income_amount ?? 0); 

              item.business.data = item.business.data.map((bus) => {
                if (bus.uuid === activeBus) {
                  bus.turnover = action.payload;
                  bus.profit = (bus.turnover??0) - (bus.cost??0);
                  bus.income_business_activities = calculateWithFrequency(bus.frequency,bus.profit);
                }
                return { ...bus };
              });

               // this code append prefix local when on change
               const activeBusiness = item.business.data.find(bus=>bus.uuid === activeBus);
               if(activeBusiness && !checkIncludePrefix(activeBusiness.uuid)){
                 const refactorUuid = `${PREFIX_UPDATE}${activeBusiness.uuid}`;
                 activeBusiness.uuid = refactorUuid;
                 item.business.activeBusiness = refactorUuid;
               }

              const {occasional_income_amount,permanent_income_amount} = handleDataBusiness(item);
              item.business.occasional_income_amount = occasional_income_amount;
              item.business.permanent_income_amount = permanent_income_amount;
              item.business.total_income_from_business_activities = occasional_income_amount + permanent_income_amount;
              
              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.business.total_income_from_business_activities;
  
              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.business.occasional_income_amount;
  
              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER +  item.business.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },
  setIncomeSourceBusinessDataCost: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeBus = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.business
        .activeBusiness;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.business.total_income_from_business_activities ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.business.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.business.permanent_income_amount ?? 0);
              
              item.business.data = item.business.data.map((bus) => {
                if (bus.uuid === activeBus) {
                  bus.cost = action.payload;
                  bus.profit = (bus.turnover ?? 0) - (bus.cost ?? 0);
                  bus.income_business_activities = calculateWithFrequency(bus.frequency,bus.profit);
                }
                return { ...bus };
              });

              // this code append prefix local when on change
              const activeBusiness = item.business.data.find(bus=>bus.uuid === activeBus);
              if(activeBusiness && !checkIncludePrefix(activeBusiness.uuid)){
                const refactorUuid = `${PREFIX_UPDATE}${activeBusiness.uuid}`;
                activeBusiness.uuid = refactorUuid;
                item.business.activeBusiness = refactorUuid;
              }

              const {occasional_income_amount,permanent_income_amount} = handleDataBusiness(item);
              item.business.occasional_income_amount = occasional_income_amount;
              item.business.permanent_income_amount = permanent_income_amount;
              item.business.total_income_from_business_activities = occasional_income_amount + permanent_income_amount;
              
              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.business.total_income_from_business_activities;
  
              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.business.occasional_income_amount;
  
              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER +  item.business.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceBusinessChangeFREQ: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeBus = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.business
        .activeBusiness;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.business.total_income_from_business_activities ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.business.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.business.permanent_income_amount ?? 0); 
              item.business.data = item.business.data.map((bus) => {
                if (bus.uuid === activeBus) {
                  bus.frequency = action.payload;
                  bus.income_business_activities =  calculateWithFrequency(action.payload,bus.profit);
                }
                return { ...bus };
              });

              // this code append prefix local when on change
              const activeBusiness = item.business.data.find(bus=>bus.uuid === activeBus);
              if(activeBusiness && !checkIncludePrefix(activeBusiness.uuid)){
                const refactorUuid = `${PREFIX_UPDATE}${activeBusiness.uuid}`;
                activeBusiness.uuid = refactorUuid;
                item.business.activeBusiness = refactorUuid;
              }

              const {occasional_income_amount,permanent_income_amount} = handleDataBusiness(item);
              item.business.occasional_income_amount = occasional_income_amount;
              item.business.permanent_income_amount = permanent_income_amount;
              item.business.total_income_from_business_activities = occasional_income_amount + permanent_income_amount;
              
              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.business.total_income_from_business_activities;
  
              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.business.occasional_income_amount;
  
              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER +  item.business.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  ///////////////////////////////////////
  /////////////COMPANY///////////////////
  //////////////////////////////////////

  setIncomeSourceCompanyActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      state.storage.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item.uuidDeclare === activePos) {
            item.company.activeCompany = action.payload;
          }

          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceCompanyData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null | Array<Document>,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          key: keyof ILOANNormalStorageIncomeCompany;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeBus = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.company
        .activeCompany;
      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.company.data = item.company.data.map((bus) => {
                if (bus.uuid === activeBus) {
                  return {
                    ...bus,
                    [action.meta.key]: action.payload,
                  };
                }
                return { ...bus };
              });
              // this code append prefix local when on change
              const activeCompany = item.company.data.find(co=>co.uuid === activeBus);
              if(activeCompany && !checkIncludePrefix(activeCompany.uuid)){
                const refactorUuid = `${PREFIX_UPDATE}${activeCompany.uuid}`;
                activeCompany.uuid = refactorUuid; 
                item.company.activeCompany = refactorUuid;
              }
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null | Array<Document>,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        key: keyof ILOANNormalStorageIncomeCompany;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceCompanyDataTotal: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeCompany = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.company
        .activeCompany;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
              (state.storage.income.income[action.meta.declare]
                .total_income ?? 0) -
              (item.company.total_income_from_company ?? 0);
             const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.company.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.company.permanent_income_amount ?? 0);

              item.company.data = item.company.data.map((sal) => {
                if (sal.uuid === activeCompany) {
                  sal.profit = action.payload;
                  sal.business_income_from_business_activities = calculateWithFrequency(sal.frequency,sal.profit);
                }
                return { ...sal };
              });

               // this code append prefix local when on change
               const activeCo = item.company.data.find(co=>co.uuid === activeCompany);
               if(activeCo && !checkIncludePrefix(activeCo.uuid)){
                 const refactorUuid = `${PREFIX_UPDATE}${activeCo.uuid}`;
                 activeCo.uuid = refactorUuid; 
                 item.company.activeCompany = refactorUuid;
               }

              const {occasional_income_amount,permanent_income_amount} = handleDataCompany(item);
              item.company.occasional_income_amount = occasional_income_amount;
              item.company.permanent_income_amount = permanent_income_amount;
              item.company.total_income_from_company = occasional_income_amount + permanent_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.company.total_income_from_company;
  
              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.company.occasional_income_amount;
  
              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER +  item.company.permanent_income_amount;
              
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceCompanyChangeFREQ: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeCompany = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.company
        .activeCompany;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.company.total_income_from_company ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.company.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.company.permanent_income_amount ?? 0);

              item.company.data = item.company.data.map((sal) => {
                if (sal.uuid === activeCompany) {
                  sal.frequency = action.payload;
                  sal.business_income_from_business_activities = calculateWithFrequency(sal.frequency,sal.profit);
                }
                return { ...sal };
              });
              
               // this code append prefix local when on change
               const activeCo = item.company.data.find(co=>co.uuid === activeCompany);
               if(activeCo && !checkIncludePrefix(activeCo.uuid)){
                 const refactorUuid = `${PREFIX_UPDATE}${activeCo.uuid}`;
                 activeCo.uuid = refactorUuid; 
                 item.company.activeCompany = refactorUuid;
               }

              const {occasional_income_amount,permanent_income_amount} = handleDataCompany(item);
              item.company.occasional_income_amount = occasional_income_amount;
              item.company.permanent_income_amount = permanent_income_amount;
              item.company.total_income_from_company = occasional_income_amount + permanent_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.company.total_income_from_company;
  
              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.company.occasional_income_amount;
  
              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER +  item.company.permanent_income_amount;

            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  ///////////////////////////////////////
  /////////////Stock///////////////////
  //////////////////////////////////////

  setIncomeSourceStockActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      state.storage.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item.uuidDeclare === activePos) {
            item.stock.activeStock = action.payload;
          }

          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceStockData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null | Array<Document>,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          key: keyof ILOANNormalStorageIncomeStock;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeSto = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.stock
        .activeStock;
      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.stock.data = item.stock.data.map((st) => {
                if (st.uuid === activeSto) {
                  return {
                    ...st,
                    [action.meta.key]: action.payload,
                  };
                }
                return { ...st };
              });

              // this code append prefix local on change
              const activeStock = item.stock.data.find(it=>it.uuid === activeSto);
              if(activeStock && !checkIncludePrefix(activeStock.uuid)){
                const refactorUUid = `${PREFIX_UPDATE}${activeStock.uuid}`;
                activeStock.uuid = refactorUUid;
                item.stock.activeStock = refactorUUid;
              }
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null | Array<Document>,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        key: keyof ILOANNormalStorageIncomeStock;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceStockDataTotal: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeStock = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.stock
        .activeStock;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.stock.total_income_from_stocks ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.stock.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.stock.permanent_income_amount ?? 0);
              item.stock.data = item.stock.data.map((sal) => {
                if (sal.uuid === activeStock) {
                  sal.profit = action.payload;
                  sal.income_from_stock = calculateWithFrequency(sal.frequency,sal.profit);
                }
                return { ...sal };
              });

               // this code append prefix local on change
              const activeSto = item.stock.data.find(it=>it.uuid === activeStock);
              if(activeSto && !checkIncludePrefix(activeSto.uuid)){
                const refactorUUid = `${PREFIX_UPDATE}${activeSto.uuid}`;
                activeSto.uuid = refactorUUid;
                item.stock.activeStock = refactorUUid;
              }

              const {occasional_income_amount,permanent_income_amount} = handleDataStock(item);
              item.stock.total_income_from_stocks = occasional_income_amount+permanent_income_amount;
              item.stock.occasional_income_amount = occasional_income_amount;
              item.stock.permanent_income_amount = permanent_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.stock.total_income_from_stocks;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.stock.occasional_income_amount;
              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.stock.permanent_income_amount;  
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceStockChangeFREQ: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeSto = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.stock
        .activeStock;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.stock.total_income_from_stocks ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.stock.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.stock.permanent_income_amount ?? 0);

              item.stock.data = item.stock.data.map((sal) => {
                if (sal.uuid === activeSto) {
                  sal.frequency = action.payload;
                  sal.income_from_stock = calculateWithFrequency(sal.frequency,sal.profit);
                }
                return { ...sal };
              });

              // this code append prefix local on change
              const activeStock = item.stock.data.find(it=>it.uuid === activeSto);
              if(activeStock && !checkIncludePrefix(activeStock.uuid)){
                const refactorUUid = `${PREFIX_UPDATE}${activeStock.uuid}`;
                activeStock.uuid = refactorUUid;
                item.stock.activeStock = refactorUUid;
              }

              const {occasional_income_amount,permanent_income_amount} = handleDataStock(item);
              item.stock.total_income_from_stocks = occasional_income_amount+permanent_income_amount;
              item.stock.occasional_income_amount = occasional_income_amount;
              item.stock.permanent_income_amount = permanent_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.stock.total_income_from_stocks;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.stock.occasional_income_amount;
              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.stock.permanent_income_amount;  
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  ///////////////////////////////////////
  /////////////DEPOSIT///////////////////
  //////////////////////////////////////

  setIncomeSourceDepositActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      state.storage.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item.uuidDeclare === activePos) {
            item.deposit.activeDeposit = action.payload;
          }

          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceDepositData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null | Array<Document>,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          key: keyof ILOANNormalStorageIncomeDeposit;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeDe = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.deposit
        .activeDeposit;
      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            
            if (item.uuidDeclare === activePos) {
              item.deposit.data = item.deposit.data.map((st) => {
                if (st.uuid === activeDe) {
                  return {
                    ...st,
                    [action.meta.key]: action.payload,
                  };
                }
                return { ...st };
              });

              // this code append prefix local when on change
              const activeDeposit = item.deposit.data.find(it=>it.uuid === activeDe);
              if(activeDeposit && !checkIncludePrefix(activeDeposit.uuid)){
                const refactorUuid = `${PREFIX_UPDATE}${activeDeposit.uuid}`;
                activeDeposit.uuid = refactorUuid;
                item.deposit.activeDeposit = refactorUuid;
              }

            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null | Array<Document>,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        key: keyof ILOANNormalStorageIncomeDeposit;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceDepositDataTotal: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeDeposit = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.deposit
        .activeDeposit;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.deposit.total_income_from_deposits ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.deposit.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.deposit.permanent_income_amount ?? 0);

              item.deposit.data = item.deposit.data.map((sal) => {
                if (sal.uuid === activeDeposit) {
                  sal.profit = action.payload;
                  sal.income_from_deposits = calculateWithFrequency(sal.frequency,sal.profit);
                }
                return { ...sal };
              });
              
              // this code append prefix local when on change
              const activeDe = item.deposit.data.find(it=>it.uuid === activeDeposit);
              if(activeDe && !checkIncludePrefix(activeDe.uuid)){
                const refactorUuid = `${PREFIX_UPDATE}${activeDe.uuid}`;
                activeDe.uuid = refactorUuid;
                item.deposit.activeDeposit = refactorUuid;
              }
              
              const {occasional_income_amount,permanent_income_amount} = handleDataDeposit(item);
              item.deposit.total_income_from_deposits = occasional_income_amount + permanent_income_amount;
              item.deposit.occasional_income_amount = occasional_income_amount;
              item.deposit.permanent_income_amount = permanent_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.deposit.total_income_from_deposits;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.deposit.occasional_income_amount;
              
              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.deposit.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceDepositChangeFREQ: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeDeposit = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.deposit
        .activeDeposit;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.deposit.total_income_from_deposits ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.deposit.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.deposit.permanent_income_amount ?? 0);
              
              item.deposit.data = item.deposit.data.map((sal) => {
                if (sal.uuid === activeDeposit) {
                  sal.frequency = action.payload;
                  sal.income_from_deposits = calculateWithFrequency(sal.frequency,sal.profit);
                }
                return { ...sal };
              });

              // this code append prefix local when on change
              const activeDe = item.deposit.data.find(it=>it.uuid === activeDeposit);
              if(activeDe && !checkIncludePrefix(activeDe.uuid)){
                const refactorUuid = `${PREFIX_UPDATE}${activeDe.uuid}`;
                activeDe.uuid = refactorUuid;
                item.deposit.activeDeposit = refactorUuid;
              }

              const {occasional_income_amount,permanent_income_amount} = handleDataDeposit(item);
              item.deposit.total_income_from_deposits = occasional_income_amount + permanent_income_amount;
              item.deposit.occasional_income_amount = occasional_income_amount;
              item.deposit.permanent_income_amount = permanent_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.deposit.total_income_from_deposits;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.deposit.occasional_income_amount;
              
              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.deposit.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  ///////////////////////////////////////
  /////////////Pension///////////////////
  //////////////////////////////////////

  setIncomeSourcePensionData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null | Array<any>,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          key: keyof ILOANNormalStorageIncomePension;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.pension = {
                ...item.pension,
                [action.meta.key]: action.payload,
              };
              
              // this code apend prefix when on change
              if(!checkIncludePrefix(item.pension.uuid)){
                item.pension.uuid = `${PREFIX_UPDATE}${item.pension.uuid}`;
              }

            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null | Array<any>,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        key: keyof ILOANNormalStorageIncomePension;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourcePensionDataTotal: {
    reducer(state: Draft<ILOANNormalState>,
      action: PayloadAction<number | null, string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare,
        }>) {
      const activePos = state.storage.income.income[action.meta.declare].activePosition;
      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(item => {
          if (item.uuidDeclare === activePos) {

            item.pension.salary = action.payload;

            const total = (state.storage.income.income[action.meta.declare].total_income ?? 0) - (item.pension.income_from_pension ?? 0);

            const totalOCC = (state.storage.income.income[action.meta.declare].total_occasional ?? 0) - (item.pension.income_from_occ ?? 0);

            const totalPER = (state.storage.income.income[action.meta.declare].total_permanent ?? 0) - (item.pension.income_from_per ?? 0);

            if (item.pension.frequency === 'FREQ'){
              item.pension.income_from_occ = 0
              item.pension.income_from_per = item.pension.salary
            }else{
              item.pension.income_from_per=0
              item.pension.income_from_occ = (item.pension.salary ?? 0) * 0.3
            } 
 
            // this code apend prefix when on change
            if(!checkIncludePrefix(item.pension.uuid)){
              item.pension.uuid = `${PREFIX_UPDATE}${item.pension.uuid}`;
            }              

            item.pension.income_from_pension = (item.pension.income_from_per ?? 0) + (item.pension.income_from_occ ?? 0)

            state.storage.income.income[action.meta.declare].total_income = total + item.pension.income_from_pension ;

            state.storage.income.income[action.meta.declare].total_occasional = totalOCC + (item.pension.income_from_occ ?? 0);

            state.storage.income.income[action.meta.declare].total_permanent = totalPER + (item.pension.income_from_per ?? 0);
          }
          return { ...item }
        })
    },
    prepare(payload: number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare,
      }) {
      return { payload, meta };
    }
  },

  setIncomeSourcePensionDataFREQ: {
    reducer(state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare,
        }>) {
      const activePos = state.storage.income.income[action.meta.declare].activePosition;
      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(item => {
          if (item.uuidDeclare === activePos) {
            item.pension.frequency = action.payload
            const total = (state.storage.income.income[action.meta.declare].total_income ?? 0) - (item.pension.income_from_pension ?? 0);
            const totalOCC = (state.storage.income.income[action.meta.declare].total_occasional ?? 0) - (item.pension.income_from_occ ?? 0);
            const totalPER = (state.storage.income.income[action.meta.declare].total_permanent ?? 0) - (item.pension.income_from_per ?? 0);
            if (item.pension.frequency === 'FREQ'){
              item.pension.income_from_occ = 0
              item.pension.income_from_per = item.pension.salary
            }else 
            {
              item.pension.income_from_per=0
              item.pension.income_from_occ = (item.pension.salary ?? 0) * 0.3
            } 
            
            // this code apend prefix when on change
            if(!checkIncludePrefix(item.pension.uuid)){
              item.pension.uuid = `${PREFIX_UPDATE}${item.pension.uuid}`;
            }

            item.pension.income_from_pension = (item.pension.income_from_per ?? 0) + (item.pension.income_from_occ ?? 0)

            state.storage.income.income[action.meta.declare].total_income = total + item.pension.income_from_pension ;

            state.storage.income.income[action.meta.declare].total_occasional = totalOCC + (item.pension.income_from_occ ?? 0);

            state.storage.income.income[action.meta.declare].total_permanent = totalPER + (item.pension.income_from_per ?? 0);

          }
          return { ...item }
        })
    },
    prepare(payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare,
      }) {
      return { payload, meta };
    }
  },


  ///////////////////////////////////////
  /////////////Other///////////////////
  //////////////////////////////////////

  setIncomeSourceOtherActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      state.storage.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item.uuidDeclare === activePos) {
            item.other.activeOther = action.payload;
          }

          return { ...item };
        }
      );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceOtherData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null | Array<Document>,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          key: keyof ILOANNormalStorageIncomeOther;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeDe = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.other
        .activeOther;
      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.other.data = item.other.data.map((st) => {
                if (st.uuid === activeDe) {
                  return {
                    ...st,
                    [action.meta.key]: action.payload,
                  };
                }
                return { ...st };
              });

              // this code append prefix local on change
              const activeOther = item.other.data.find(it=>it.uuid === activeDe);
              if(activeOther && !checkIncludePrefix(activeOther.uuid)){
                const refactorUUid = `${PREFIX_UPDATE}${activeOther.uuid}`;
                activeOther.uuid = refactorUUid;
                item.other.activeOther = refactorUUid;
              }

            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null | Array<Document>,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        key: keyof ILOANNormalStorageIncomeOther;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceOtherDataTotal: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeOther = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.other
        .activeOther;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.other.total_income_from_other_sources ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.other.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.other.permanent_income_amount ?? 0);

              item.other.data = item.other.data.map((sal) => {
                if (sal.uuid === activeOther) {
                  sal.profit = action.payload;
                  sal.income_from_other_source = calculateWithFrequency(sal.frequency,sal.profit);
                }
                return { ...sal };
              });

              // this code append prefix local on change
              const activeOt = item.other.data.find(it=>it.uuid === activeOther);
              if(activeOt && !checkIncludePrefix(activeOt.uuid)){
                const refactorUUid = `${PREFIX_UPDATE}${activeOt.uuid}`;
                activeOt.uuid = refactorUUid;
                item.other.activeOther = refactorUUid;
              }
              

              const {occasional_income_amount,permanent_income_amount} = handleDataOther(item);
              item.other.total_income_from_other_sources = occasional_income_amount+permanent_income_amount;
              item.other.occasional_income_amount = occasional_income_amount;
              item.other.permanent_income_amount = permanent_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.other.total_income_from_other_sources;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.other.occasional_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.other.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceOtherChangeFREQ: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeOther = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.other
        .activeOther;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storage.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.other.total_income_from_other_sources ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.other.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.other.permanent_income_amount ?? 0);

              item.other.data = item.other.data.map((sal) => {
                if (sal.uuid === activeOther) {
                  sal.frequency = action.payload;
                  sal.income_from_other_source = calculateWithFrequency(sal.frequency,sal.profit);
                }
                return { ...sal };
              });
              
              // this code append prefix local on change
              const activeOt = item.other.data.find(it=>it.uuid === activeOther);
              if(activeOt && !checkIncludePrefix(activeOt.uuid)){
                const refactorUUid = `${PREFIX_UPDATE}${activeOt.uuid}`;
                activeOt.uuid = refactorUUid;
                item.other.activeOther = refactorUUid;
              }
              
              const {occasional_income_amount,permanent_income_amount} = handleDataOther(item);
              item.other.total_income_from_other_sources = occasional_income_amount+permanent_income_amount;
              item.other.occasional_income_amount = occasional_income_amount;
              item.other.permanent_income_amount = permanent_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.other.total_income_from_other_sources;

              state.storage.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.other.occasional_income_amount;

              state.storage.income.income[
                action.meta.declare
              ].total_permanent =
                previousTotalPER + item.other.permanent_income_amount;
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },
  saveINCOME(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {},
  saveBeforeNextActionTabBalanceAbilityINCOME:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          los_uuid: string;
        }
      >
    ) {},
    prepare(
      payload: string,
      meta: {
        los_uuid: string;
      }
    ) {
      return { payload, meta };
    },
  },
  revertDataIncomeRemove:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        { incomeMain:string,}
      >
    ) {
      // keyof ILOANNormalStorageIncomeState
      const incomeMainName:string= action.meta.incomeMain;
      // case income
      if(incomeSource.indexOf(incomeMainName) !== -1){
        const declareActive = state.storage.income.declareActive as keyof ILOANNormalStorageIncomeDeclare;
        const activePos = state.storage.income.income[declareActive].activePosition;
        if(state.storage.income.income[declareActive]){
          state.storage.income.income[declareActive].dataPosition?.map(
          (item) => {
            if (item?.uuidDeclare === activePos) {
              const totalIncome = state.storage.income.income[declareActive].total_income??0;
              const total_permanent = state.storage.income.income[declareActive].total_permanent??0;
              const total_occasional = state.storage.income.income[declareActive].total_occasional??0;
              switch (item.activeIncomeSource as keyof ILOANNormalStorageIncomeDeclareSalary) {
                case 'salary':{
                  if(item['salary'].cacheData){
                    const previousTotal =
                      totalIncome -
                      (item.salary.total_income_from_salary_source ?? 0);
                    const previousTotalOCC =
                      total_occasional -
                      (item.salary.occasional_income_amount ?? 0);
                    const previousTotalPER =
                        total_permanent -
                      (item.salary.permanent_income_amount ?? 0); 

                    item['salary'].data=[...(item['salary'].cacheData??[])];
                    const dataSalary = handleDataSalary(item);
                    item['salary'].permanent_income_amount = dataSalary.permanent_income_amount;
                    item['salary'].occasional_income_amount = dataSalary.occasional_income_amount;
                    
                    item['salary'].total_income_from_salary_source = dataSalary.permanent_income_amount + dataSalary.occasional_income_amount;

                    state.storage.income.income[declareActive].total_income =previousTotal + item['salary'].total_income_from_salary_source;
                    state.storage.income.income[declareActive].total_occasional =previousTotalOCC + item['salary'].occasional_income_amount;
                    state.storage.income.income[declareActive].total_permanent =previousTotalPER + item['salary'].permanent_income_amount;

                    const length =item['salary'].cacheData.length;
                    let idxActive = item['salary'].cacheData.findIndex(t=>t.uuid==item['salary'].activeSalary);
                    if(idxActive==-1)
                    item['salary'].activeSalary=length>0?item['salary'].cacheData[length-1].uuid:'-';
                  }
                  break;
                }
                case "assetRent":{
                  if(item['assetRent'].cacheData){
                    item['assetRent'].data=[...(item['assetRent'].cacheData??[])];
                    const length = item['assetRent'].cacheData.length;
                    let idxActive = item['assetRent'].cacheData.findIndex(t=>t.uuid==item['assetRent'].activeAssetRent);
                    if(idxActive==-1)
                      item['assetRent'].activeAssetRent=length>0?item['assetRent'].cacheData[length-1].uuid:'-';
                    }
                  break;
                }
                case "business": {
                  if(item['business'].cacheData){
                    const previousTotal =
                      totalIncome -
                      (item.business.total_income_from_business_activities ?? 0);
                    const previousTotalOCC =
                      total_occasional -
                      (item.business.occasional_income_amount ?? 0);
                    const previousTotalPER =
                        total_permanent -
                      (item.business.permanent_income_amount ?? 0); 

                    item['business'].data=[...(item['business'].cacheData??[])];

                    const dataBusiness = handleDataBusiness(item);
                    item['business'].permanent_income_amount = dataBusiness.permanent_income_amount;
                    item['business'].occasional_income_amount = dataBusiness.occasional_income_amount;

                    item['business'].total_income_from_business_activities = dataBusiness.permanent_income_amount + dataBusiness.occasional_income_amount;

                    state.storage.income.income[declareActive].total_income =
                    previousTotal + item['business'].total_income_from_business_activities;
                    state.storage.income.income[declareActive].total_occasional = previousTotalOCC + item['business'].occasional_income_amount;
                    state.storage.income.income[declareActive].total_permanent = previousTotalPER + item['business'].permanent_income_amount;

                    const length =item['business'].cacheData.length;
                    let idxActive = item['business'].cacheData.findIndex(t=>t.uuid==item['business'].activeBusiness);
                    if(idxActive==-1)
                    item['business'].activeBusiness=length>0?item['business'].cacheData[length-1].uuid:'-';
                  }
                  break;
                }
                case "company": {
                  if(item['company'].cacheData){
                    const previousTotal =
                      totalIncome -
                      (item.company.total_income_from_company ?? 0);
                    const previousTotalOCC =
                      total_occasional -
                      (item.company.occasional_income_amount ?? 0);
                    const previousTotalPER =
                        total_permanent -
                      (item.company.permanent_income_amount ?? 0); 

                    item['company'].data=[...(item['company'].cacheData??[])];

                    const dataCompany = handleDataCompany(item);
                    item['company'].occasional_income_amount=dataCompany.occasional_income_amount;
                    item['company'].permanent_income_amount=dataCompany.permanent_income_amount;
                    
                    item['company'].total_income_from_company = dataCompany.occasional_income_amount + dataCompany.permanent_income_amount;
                    
                    state.storage.income.income[declareActive].total_income = previousTotal + item['company'].total_income_from_company;
                    state.storage.income.income[declareActive].total_occasional = previousTotalOCC + item['company'].occasional_income_amount;
                    state.storage.income.income[declareActive].total_permanent = previousTotalPER + item['company'].permanent_income_amount;

                    const length =item['company'].cacheData.length;
                    let idxActive = item['company'].cacheData.findIndex(t=>t.uuid==item['company'].activeCompany);
                    if(idxActive==-1)
                    item['company'].activeCompany=length>0?item['company'].cacheData[length-1].uuid:'-';
                  }
                  break;
                }
                case "stock": {
                  if(item['stock'].cacheData){
                    const previousTotal =
                      totalIncome -
                      (item.stock.total_income_from_stocks ?? 0);
                    const previousTotalOCC =
                      total_occasional -
                      (item.stock.occasional_income_amount ?? 0);
                    const previousTotalPER =
                        total_permanent -
                      (item.stock.permanent_income_amount ?? 0); 

                    item['stock'].data=[...(item['stock'].cacheData??[])];

                    const dataStock = handleDataStock(item);
                    item['stock'].occasional_income_amount=dataStock.occasional_income_amount;
                    item['stock'].permanent_income_amount=dataStock.permanent_income_amount;
                    item['stock'].total_income_from_stocks=dataStock.occasional_income_amount + dataStock.permanent_income_amount;

                    state.storage.income.income[
                      declareActive
                    ].total_income =
                      previousTotal + item['stock'].total_income_from_stocks;

                    state.storage.income.income[
                      declareActive
                    ].total_occasional =
                      previousTotalOCC + item['stock'].occasional_income_amount;

                    state.storage.income.income[
                      declareActive
                    ].total_permanent =
                      previousTotalPER + item['stock'].permanent_income_amount;

                    const length =item['stock'].cacheData.length;
                    let idxActive = item['stock'].cacheData.findIndex(t=>t.uuid==item['stock'].activeStock);
                    if(idxActive==-1)
                    item['stock'].activeStock=length>0?item['stock'].cacheData[length-1].uuid:'-';
                  }
                  break;
                }
                case "deposit": {
                  if(item['deposit'].cacheData){
                    const previousTotal =
                      totalIncome -
                      (item['deposit'].total_income_from_deposits ?? 0);
                    const previousTotalOCC =
                      total_occasional -
                      (item['deposit'].occasional_income_amount ?? 0);
                    const previousTotalPER =
                        total_permanent -
                      (item['deposit'].permanent_income_amount ?? 0); 

                    item['deposit'].data=[...(item['deposit'].cacheData??[])];
                    const dataDeposit = handleDataDeposit(item);
                    item['deposit'].total_income_from_deposits = dataDeposit.occasional_income_amount + dataDeposit.permanent_income_amount;
                    item['deposit'].occasional_income_amount = dataDeposit.occasional_income_amount;
                    item['deposit'].permanent_income_amount = dataDeposit.permanent_income_amount;

                    state.storage.income.income[
                     declareActive
                    ].total_income =
                      previousTotal + item['deposit'].total_income_from_deposits;

                    state.storage.income.income[
                     declareActive
                    ].total_occasional =
                      previousTotalOCC + item['deposit'].occasional_income_amount;
                    
                    state.storage.income.income[
                     declareActive
                    ].total_permanent =
                      previousTotalPER + item['deposit'].permanent_income_amount;

                    const length =item['deposit'].cacheData.length;
                    let idxActive = item['deposit'].cacheData.findIndex(t=>t.uuid==item['deposit'].activeDeposit);
                    if(idxActive==-1)
                    item['deposit'].activeDeposit=length>0?item['deposit'].cacheData[length-1].uuid:'-';
                  }
                  break;
                }
                case "pension":{
                  if(item['pension'].cacheData){
                    const previousTotal =
                      totalIncome -
                      (item.pension.income_from_pension ?? 0);
                    const previousTotalOCC =
                      total_occasional -
                      (item.pension.income_from_occ ?? 0);
                    const previousTotalPER =
                        total_permanent -
                      (item.pension.income_from_per ?? 0); 
                    item['pension'] = {...item['pension'].cacheData};

                    state.storage.income.income[declareActive].total_income =previousTotal + (item.pension.income_from_pension ?? 0);
                    state.storage.income.income[declareActive].total_occasional =previousTotalOCC + (item.pension.income_from_occ ?? 0);
                    state.storage.income.income[declareActive].total_permanent =previousTotalPER + (item.pension.income_from_per ?? 0);
                  }
                  break;
                }
                case "other": {
                  if(item['other'].cacheData){
                    const previousTotal =
                      totalIncome -
                      (item['other'].total_income_from_other_sources ?? 0);
                    const previousTotalOCC =
                      total_occasional -
                      (item['other'].occasional_income_amount ?? 0);
                    const previousTotalPER =
                        total_permanent -
                      (item['other'].permanent_income_amount ?? 0);

                    item['other'].data=[...(item['other'].cacheData??[])];
                    const dataOther = handleDataOther(item);
                    item['other'].total_income_from_other_sources = dataOther.occasional_income_amount + dataOther.permanent_income_amount;
                    item['other'].occasional_income_amount = dataOther.occasional_income_amount;
                    item['other'].permanent_income_amount = dataOther.permanent_income_amount;

                    state.storage.income.income[
                      declareActive
                     ].total_income =
                       previousTotal + item['other'].total_income_from_other_sources;
                    state.storage.income.income[
                      declareActive
                      ].total_occasional =
                        previousTotalOCC + item['other'].occasional_income_amount;
                    
                    state.storage.income.income[
                      declareActive
                      ].total_permanent =
                        previousTotalPER + item['other'].permanent_income_amount;

                    const length =item['other'].cacheData.length;
                    let idxActive = item['other'].cacheData.findIndex(t=>t.uuid==item['other'].activeOther);
                    if(idxActive==-1)
                    item['other'].activeOther=length>0?item['other'].cacheData[length-1].uuid:'-';
                  }
                  break;
                }
                default:
                  break;
              };
            }
            return { ...item };
          }
          ); 
        }
      }
    },
    prepare(
      payload: number | null,
      meta: {
        incomeMain:string,
      }
    ) {
      return { payload, meta };
    },
  },
  setActiveINCOME:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string
      >
    ) { 
        state.storage.income['activeINCOME']=action.payload;
    },
    prepare(
      payload: string
    ) {
      return { payload };
    },
  },
  clearDataINCOME:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        { incomeMain:string,}
      >
    ) {
      // keyof ILOANNormalStorageIncomeState
      const incomeMainName:string= action.meta.incomeMain;
      // case income
      if(cicRouterNormal2.indexOf(incomeMainName) !== -1){
        const declareActive = state.storage.income.declareActive as keyof ILOANNormalStorageIncomeDeclare;
        const activePos = state.storage.income.income[declareActive].activePosition;
        state.storage.income.income[declareActive].dataPosition?.map(
        (item) => {
          if (item?.uuidDeclare === activePos) {
            switch (item.activeIncomeSource as keyof ILOANNormalStorageIncomeDeclareSalary) {
              case 'salary':{
                const previousTotal =
                  (state.storage.income.income[declareActive]
                    .total_income ?? 0) -
                  (item.salary.total_income_from_salary_source ?? 0);

                const previousTotalOCC =
                  (state.storage.income.income[declareActive]
                    .total_occasional ?? 0) -
                  (item.salary.occasional_income_amount ?? 0);

                const previousTotalPER =
                  (state.storage.income.income[declareActive]
                    .total_permanent ?? 0) -
                  (item.salary.permanent_income_amount ?? 0);

                item['salary'].data=item['salary'].data.map((sal)=>{
                  if(item['salary'].activeSalary === sal.uuid){
                    const emptyData = generateIncomeEmptySalary();
                    return {...sal,...emptyData,document:sal.documents,uuid:sal.uuid};
                  }
                  return sal;
                });

                const {occasional_income_amount,permanent_income_amount} = handleDataSalary(item);  
                
                item.salary.permanent_income_amount = permanent_income_amount;
                item.salary.occasional_income_amount = occasional_income_amount;
                item.salary.total_income_from_salary_source =occasional_income_amount+permanent_income_amount;


                state.storage.income.income[declareActive].total_income =
                previousTotal + item.salary.total_income_from_salary_source;
                state.storage.income.income[declareActive]
                  .total_permanent=previousTotalPER + permanent_income_amount;
                state.storage.income.income[declareActive].total_occasional=previousTotalOCC + occasional_income_amount;
                break;
              }
              case "assetRent":{
              const previousTotal =
                (state.storage.income.income[declareActive]
                  .total_income ?? 0) -
                (item['assetRent'].total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[declareActive]
                  .total_occasional ?? 0) -
                (item['assetRent'].occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[declareActive]
                  .total_permanent ?? 0) -
                (item['assetRent'].permanent_income_amount ?? 0);

                item['assetRent'].data=item['assetRent'].data.map((sal)=>{
                  if(sal.uuid === item['assetRent'].activeAssetRent){
                    switch(sal.assetType){
                      case "REAL_ESTATE":{
                        const {activeRealEstate ='',data =[]} = sal.assetDetailRealEstate;
                        const realActive = data.find(real=>real.uuid === activeRealEstate);
                        if(realActive){
                          realActive.location = '';
                          realActive.province = '';
                          realActive.district = '';
                          realActive.ward = '';
                          realActive.description = '';
                          realActive.frequency_type = '';
                          realActive.price = null;
                          realActive.income_from_real_estate = null;
                        }
                        break;
                      }case"TRANSPORT":{
                        const {activeTransport='',data =[]} = sal.assetDetailTransport;
                        const transportActive = data.find(trans=>trans.uuid === activeTransport);
                        if(transportActive){
                          transportActive.registrationPlate = '';
                          transportActive.frequency_type = '';
                          transportActive.price = null;
                          transportActive.income_from_transport=null;
                        }
                        break;
                      } case "OTHER":{
                        const {activeOther = '', data = []} = sal.assetDetailOther;
                        const otherActive = data.find(other=>other.uuid === activeOther);
                        if(otherActive){
                          otherActive.idAssetRent = '';
                          otherActive.frequency_type = '';
                          otherActive.price = null;
                          otherActive.income_from_other= null;
                        }
                        break;
                      } default:break;
                    }

                  }
                  return sal;
                });
                const {data,occasional_income_amount,permanent_income_amount} = handleDataAssentRent(item);
                data.forEach((asset)=>{
                  let current = item.assetRent.data.find(it=>it.uuid === asset.uuid);
                  if(current){
                    const {detailOther,detailTransport,realEstate} = asset;
                    // calculate RealEstate
                    _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                    _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                    _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    
  
                    // calculate Transport    
                    _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                    _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                    _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);
  
                    //   // calculate Other
                    _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                    _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                    _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                  }
                });
                item.assetRent.occasional_income_amount = occasional_income_amount;
                item.assetRent.permanent_income_amount = permanent_income_amount;
                item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;
  
                state.storage.income.income[
                  declareActive
                ].total_income =
                  previousTotal + item.assetRent.total_income_from_property_rental;
  
                state.storage.income.income[
                  declareActive
                ].total_occasional =
                  previousTotalOCC + item.assetRent.occasional_income_amount;
  
                state.storage.income.income[
                  declareActive
                ].total_permanent =
                  previousTotalPER + item.assetRent.permanent_income_amount;

                break;
              }
              case "business": {
                const previousTotal =
                  (state.storage.income.income[declareActive]
                    .total_income ?? 0) -
                  (item.business.total_income_from_business_activities ?? 0);
                const previousTotalOCC =
                  (state.storage.income.income[declareActive]
                    .total_occasional ?? 0) -
                  (item.business.occasional_income_amount ?? 0);
                const previousTotalPER =
                  (state.storage.income.income[declareActive]
                    .total_permanent ?? 0) -
                  (item.business.permanent_income_amount ?? 0); 
                  
                item['business'].data=item['business'].data.map((sal)=>{
                  if(item['business'].activeBusiness === sal.uuid){
                    return {...sal,...generateIncomeEmptyBusiness(), documents:sal.documents, uuid:sal.uuid}
                  }
                  return sal;
                });
                const {occasional_income_amount,permanent_income_amount} = handleDataBusiness(item);
                item.business.occasional_income_amount = occasional_income_amount;
                item.business.permanent_income_amount = permanent_income_amount;
                item.business.total_income_from_business_activities = occasional_income_amount + permanent_income_amount;
                
                state.storage.income.income[
                  declareActive
                ].total_income =
                  previousTotal + item.business.total_income_from_business_activities;
    
                state.storage.income.income[
                  declareActive
                ].total_occasional =
                  previousTotalOCC + item.business.occasional_income_amount;
    
                state.storage.income.income[
                  declareActive
                ].total_permanent =
                  previousTotalPER +  item.business.permanent_income_amount;
                 break;
              }
              case "company": {
                const previousTotal =
                  (state.storage.income.income[declareActive]
                    .total_income ?? 0) -
                  (item.company.total_income_from_company ?? 0);
                const previousTotalOCC =
                  (state.storage.income.income[declareActive]
                    .total_occasional ?? 0) -
                  (item.company.occasional_income_amount ?? 0);
                const previousTotalPER =
                  (state.storage.income.income[declareActive]
                    .total_permanent ?? 0) -
                  (item.company.permanent_income_amount ?? 0);

                item['company'].data=item['company'].data.map((sal)=>{
                  if(item['company'].activeCompany === sal.uuid){
                    return {...sal,...generateIncomeEmptyCompany(),documents:sal.documents, uuid:sal.uuid}
                  }
                  return sal;
                });
                const {occasional_income_amount,permanent_income_amount} = handleDataCompany(item);
                item.company.occasional_income_amount = occasional_income_amount;
                item.company.permanent_income_amount = permanent_income_amount;
                item.company.total_income_from_company = occasional_income_amount + permanent_income_amount;

                state.storage.income.income[
                  declareActive
                ].total_income =
                  previousTotal + item.company.total_income_from_company;
    
                state.storage.income.income[
                  declareActive
                ].total_occasional =
                  previousTotalOCC + item.company.occasional_income_amount;
    
                state.storage.income.income[
                  declareActive
                ].total_permanent =
                  previousTotalPER +  item.company.permanent_income_amount;
                break;
            }
              case "stock": {
                const previousTotal =
                (state.storage.income.income[declareActive]
                  .total_income ?? 0) -
                (item.stock.total_income_from_stocks ?? 0);
              const previousTotalOCC =
                (state.storage.income.income[declareActive]
                  .total_occasional ?? 0) -
                (item.stock.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storage.income.income[declareActive]
                  .total_permanent ?? 0) -
                (item.stock.permanent_income_amount ?? 0);

                item['stock'].data=item['stock'].data.map((sal)=>{
                  if(item['stock'].activeStock === sal.uuid){
                    return {...sal,...generateIncomeEmptyStock(),documents:sal.documents, uuid:sal.uuid}
                  }
                  return sal;
                });

                const {occasional_income_amount,permanent_income_amount} = handleDataStock(item);
                item.stock.total_income_from_stocks = occasional_income_amount+permanent_income_amount;
                item.stock.occasional_income_amount = occasional_income_amount;
                item.stock.permanent_income_amount = permanent_income_amount;

                state.storage.income.income[
                  declareActive
                ].total_income =
                  previousTotal + item.stock.total_income_from_stocks;

                state.storage.income.income[
                  declareActive
                ].total_occasional =
                  previousTotalOCC + item.stock.occasional_income_amount;
                state.storage.income.income[
                  declareActive
                ].total_permanent =
                  previousTotalPER + item.stock.permanent_income_amount;
                break;
            }
              case "deposit": {
                const previousTotal =
                  (state.storage.income.income[declareActive]
                    .total_income ?? 0) -
                  (item.deposit.total_income_from_deposits ?? 0);
                const previousTotalOCC =
                  (state.storage.income.income[declareActive]
                    .total_occasional ?? 0) -
                  (item.deposit.occasional_income_amount ?? 0);
                const previousTotalPER =
                  (state.storage.income.income[declareActive]
                    .total_permanent ?? 0) -
                  (item.deposit.permanent_income_amount ?? 0);

                item['deposit'].data=item['deposit'].data.map((sal)=>{
                  if(item['deposit'].activeDeposit === sal.uuid){
                    return {...sal,...generateIncomeEmptyDeposit(),publish_unit_id: '',documents:sal.documents, uuid:sal.uuid}
                  }
                  return sal;
                });
                
                const {occasional_income_amount,permanent_income_amount} = handleDataDeposit(item);
                item.deposit.total_income_from_deposits = occasional_income_amount + permanent_income_amount;
                item.deposit.occasional_income_amount = occasional_income_amount;
                item.deposit.permanent_income_amount = permanent_income_amount;

                state.storage.income.income[
                  declareActive
                ].total_income =
                  previousTotal + item.deposit.total_income_from_deposits;

                state.storage.income.income[
                  declareActive
                ].total_occasional =
                  previousTotalOCC + item.deposit.occasional_income_amount;
                
                state.storage.income.income[
                  declareActive
                ].total_permanent =
                  previousTotalPER + item.deposit.permanent_income_amount;
                break;
              }
              case "pension": {
                const previousTotal =
                  (state.storage.income.income[declareActive]
                    .total_income ?? 0) -
                  (item.pension.income_from_pension ?? 0);
                const previousTotalOCC =
                  (state.storage.income.income[declareActive]
                    .total_occasional ?? 0) -
                  (item.pension.income_from_occ ?? 0);
                const previousTotalPER =
                  (state.storage.income.income[declareActive]
                    .total_permanent ?? 0) -
                  (item.pension.income_from_per ?? 0);

                item['pension']={...generateIncomeEmptyPension(),documents: item['pension'].documents,uuid:item['pension'].uuid};

                state.storage.income.income[
                  declareActive
                ].total_income =
                  previousTotal + (item.pension.income_from_pension ?? 0);

                state.storage.income.income[
                  declareActive
                ].total_occasional =
                  previousTotalOCC + (item.pension.income_from_occ ?? 0);

                state.storage.income.income[
                  declareActive
                ].total_permanent =
                  previousTotalPER + (item.pension.income_from_per ?? 0);

                break;
              }
              case "other": {
                const previousTotal =
                  (state.storage.income.income[declareActive]
                    .total_income ?? 0) -
                  (item.other.total_income_from_other_sources ?? 0);
                const previousTotalOCC =
                  (state.storage.income.income[declareActive]
                    .total_occasional ?? 0) -
                  (item.other.occasional_income_amount ?? 0);
                const previousTotalPER =
                  (state.storage.income.income[declareActive]
                    .total_permanent ?? 0) -
                  (item.other.permanent_income_amount ?? 0);


                item['other'].data=item['other'].data.map((sal)=>{
                  if(item['other'].activeOther === sal.uuid){
                    return {...sal,...generateIncomeEmptyOther(),documents:sal.documents, uuid:sal.uuid}
                  }
                  return sal;
                }); 

                const {occasional_income_amount,permanent_income_amount} = handleDataOther(item);
                item.other.total_income_from_other_sources = occasional_income_amount+permanent_income_amount;
                item.other.occasional_income_amount = occasional_income_amount;
                item.other.permanent_income_amount = permanent_income_amount;

                state.storage.income.income[
                  declareActive
                ].total_income =
                  previousTotal + item.other.total_income_from_other_sources;

                state.storage.income.income[
                  declareActive
                ].total_occasional =
                  previousTotalOCC + item.other.occasional_income_amount;

                state.storage.income.income[
                  declareActive
                ].total_permanent =
                  previousTotalPER + item.other.permanent_income_amount;

                break;
              }
              default:
                break;
            };
          }
          return { ...item };
        }
      );
        
        
      }
      // case balance 
      else if (incomeMainName === 'balance'){
        state.storage.income.balance.familyCost.value = 0;
        state.storage.income.balance.familyCost.description = null;
        state.storage.income.balance.otherCost.value = 0;
        state.storage.income.balance.otherCost.description = null;
        state.storage.income.balance.interestPayment.value = 0;
        state.storage.income.balance.interestPayment.description = null;
        state.storage.income.balance.disbCost.value = 0;
        state.storage.income.balance.disbCost.description = null;

        state.storage.income.balance.totalCost = 0;
        state.storage.income.balance.differentValue = state.storage.income.balance.totalIncome
      }
      // case ability 
      else{
        state.storage.income.ability.gurantee = 'GURANTEE';
        state.storage.income.ability.comment = '';
      }

      
    },
    prepare(
      payload: number | null,
      meta: {
        incomeMain:string,
      }
    ) {
      return { payload, meta };
    },
  },



  /////////////////////////////
  /////////Balance////////////
  ////////////////////////////
  setIncomeSourceBalanceData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          key: keyof ILOANNormalStorageIncomeBalance;
        }
      >
    ) {
      if(action.meta.key === 'familyCost'||action.meta.key ==='interestPayment'||action.meta.key ==='otherCost'|| action.meta.key ==='disbCost') {
        state.storage.income.balance[action.meta.key].value = action.payload;
      }
      else {
        state.storage.income.balance[action.meta.key] = action.payload;
      }

      const family = state.storage.income.balance.familyCost.value ?? 0;
      const interest = state.storage.income.balance.interestPayment.value ?? 0;
      const other = state.storage.income.balance.otherCost.value ?? 0;
      const disb = state.storage.income.balance.disbCost.value ?? 0
      const totalIcome = state.storage.income.balance.totalIncome ?? 0;
      const total = family + interest + other + disb;
      state.storage.income.balance.differentValue = totalIcome - total;
      state.storage.income.balance.totalCost = total;
      // const totalBr =  state.storage.income.income.borrower.total_income ?? 0;
      // const totalMar =  state.storage.income.income.marriage.total_income ?? 0;
      // const totalCob =  state.storage.income.income.coborrower.total_income ?? 0;
      // const totalCop =  state.storage.income.income.copayer.total_income ?? 0;
      // state.storage.income.balance.different =  totalBr + totalMar + totalCob + totalCop - total
    },
    prepare(
      payload: number | null,
      meta: {
        key: keyof ILOANNormalStorageIncomeBalance;
      }
    ) {
      return { payload, meta };
    },
  },
  setIncomeSourceBalanceDataDesc: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          key: keyof IncomeType.ILOANNormalStorageIncomeBalance;
        }
      >
    ) {
      if(action.meta.key === 'familyCost'||action.meta.key ==='interestPayment'||action.meta.key ==='otherCost'|| action.meta.key ==='disbCost') {
        state.storage.income.balance[action.meta.key].description = action.payload;
      }
    },
    prepare(
      payload: string,
      meta: {
        key: keyof IncomeType.ILOANNormalStorageIncomeBalance;
      }
    ) {
      return { payload, meta };
    },
  },
  /////////////////////////////
  /////////Ability////////////
  ////////////////////////////
  
  // setIncomeSourceAbilityData: {
  //   reducer(
  //     state: Draft<ILOANNormalState>,
  //     action: PayloadAction<
  //     ILOANNormalStorageIncomeAbility[keyof ILOANNormalStorageIncomeAbility], 
  //     string,
  //     keyof ILOANNormalStorageIncomeAbility
  //     >
  //     ){
  //      state.storage.income.ability = {
  //       ...state.storage.income.ability,
  //       [action.meta]: action.payload
  //   }
  //   },
  //   prepare(
  //     payload: ILOANNormalStorageIncomeAbility[keyof ILOANNormalStorageIncomeAbility],
  //     meta: keyof ILOANNormalStorageIncomeAbility
  //   ) {
  //     return { payload, meta };
  //   },
  // },

  setIncomeSourceAbilityData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          key: keyof ILOANNormalStorageIncomeAbility;
        }
      >
    ) {
      if(action.meta.key==='comment' || action.meta.key==='gurantee'){
        state.storage.income.ability[action.meta.key] = action.payload;
      }
      
    },
    prepare(
      payload: string,
      meta: {
        key: keyof ILOANNormalStorageIncomeAbility;
      }
    ) {
      return { payload, meta };
    },
  },

  /////////////////////////////
  /////////auto fill salary////////////
  ////////////////////////////
  autofillSalary: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeSal = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.salary
        .activeSalary;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.salary.data = item.salary.data.map((sal) => {
                if (sal.uuid === activeSal) {
                  sal = {
                    ...autofillSalary,
                    uuid: activeSal,
                  };

                  return {
                    ...sal,
                  };
                }
                return { ...sal };
              });
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  autofillAssrentReal: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeRealEstate = state.storage.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailRealEstate.activeRealEstate;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.assetRent.data = item.assetRent.data.map((item) => {
                if (item.uuid === activeAssetRent) {
                  item.assetDetailRealEstate.data =
                    item.assetDetailRealEstate.data.map((real) => {
                      if (real.uuid === activeRealEstate) {
                        real = {
                          ...autofillAssrentReal,
                          uuid: activeRealEstate,
                        };
                        return {
                          ...real,
                        };
                      }
                      return { ...real };
                    });
                }
                return { ...item };
              });
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  autofillAssrentTransport: {
    reducer(state: Draft<ILOANNormalState>,
      action: PayloadAction<string | number | null, string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare,
        }>) {
      const activePos = state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[action.meta.declare].dataPosition
        .find(item => item.uuidDeclare === activePos)?.assetRent.activeAssetRent;

      const activeTransport = state.storage.income.income[action.meta.declare].dataPosition
        .find(item => item.uuidDeclare === activePos)?.assetRent.data
        .find(i => i.uuid === activeAssetRent)?.assetDetailTransport.activeTransport;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(item => {
          if (item.uuidDeclare === activePos) {
            item.assetRent.data = item.assetRent.data.map(item => {
              if (item.uuid === activeAssetRent) {
                item.assetDetailTransport.data = item.assetDetailTransport.data.map(trans => {
                  if (trans.uuid === activeTransport) {
                    trans = {
                      ...autofillAssrentTransport,
                      uuid: activeTransport
                    }
                    return {
                      ...trans,
                    }
                  }
                  return { ...trans }
                })
              }
              return { ...item }
            })
          }
          return { ...item }
        })
    },
    prepare(payload: string | number | null, meta: {
      declare: keyof ILOANNormalStorageIncomeDeclare,
    }) {
      return { payload, meta };
    }
  },

  autofillAssrentOther: {
    reducer(state: Draft<ILOANNormalState>,
      action: PayloadAction<string | number | null, string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare,
        }>) {
      const activePos = state.storage.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storage.income.income[action.meta.declare].dataPosition
        .find(item => item.uuidDeclare === activePos)?.assetRent.activeAssetRent;

      const activeTransport = state.storage.income.income[action.meta.declare].dataPosition
        .find(item => item.uuidDeclare === activePos)?.assetRent.data
        .find(i => i.uuid === activeAssetRent)?.assetDetailOther.activeOther;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(item => {
          if (item.uuidDeclare === activePos) {
            item.assetRent.data = item.assetRent.data.map(item => {
              if (item.uuid === activeAssetRent) {
                item.assetDetailOther.data = item.assetDetailOther.data.map(trans => {
                  if (trans.uuid === activeTransport) {
                    trans = {
                      ...autofillAssrentOther,
                      uuid: activeTransport
                    }
                  }
                  return { ...trans }
                })
              }
              return { ...item }
            })
          }
          return { ...item }
        })
    },
    prepare(payload: string | number | null, meta: {
      declare: keyof ILOANNormalStorageIncomeDeclare,
    }) {
      return { payload, meta };
    }
  },


  /////////////////////////////
  /////auto fill Bussiness/////
  ////////////////////////////
  autofillBussiness: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeBus = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.business
        .activeBusiness;
      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.business.data = item.business.data.map((bus) => {
                if (bus.uuid === activeBus) {
                  bus = {
                    ...autofillBussiness,
                    uuid: activeBus,
                  };
                }
                return { ...bus };
              });
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },
  /////////////////////////////
  /////auto fill Company///////
  ////////////////////////////
  autofillCompany: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeBus = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.company
        .activeCompany;
      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.company.data = item.company.data.map((bus) => {
                if (bus.uuid === activeBus) {
                  bus = {
                    ...autofillCompany,
                    uuid: activeBus,
                  };
                }
                return { ...bus };
              });
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },
  /////////////////////////////
  /////auto fill Stock////////
  ////////////////////////////
  autofillStock: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeStock = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.stock
        .activeStock;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.stock.data = item.stock.data.map((sal) => {
                if (sal.uuid === activeStock) {
                  sal = {
                    ...autofillStock,
                    uuid: activeStock,
                  };
                }

                return { ...sal };
              });
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },
  /////////////////////////////
  /////auto fill Deposit/////
  ////////////////////////////
  autofillDeposit: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeDe = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.deposit
        .activeDeposit;
      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.deposit.data = item.deposit.data.map((st) => {
                if (st.uuid === activeDe) {
                  st = {
                    ...autofillDeposit,
                    uuid: activeDe,
                  };
                }
                return { ...st };
              });
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  ///////////////////////////////////////
  /////////////autofillPension////////////
  //////////////////////////////////////

  autofillPension: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.pension = {
                ...autofillPension,
              };
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: string | number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },
  ///////////////////////////////////////
  /////////////autofillOther/////////////
  //////////////////////////////////////

  autofillOther: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos =
        state.storage.income.income[action.meta.declare].activePosition;
      const activeOther = state.storage.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.other
        .activeOther;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.other.data = item.other.data.map((sal) => {
                if (sal.uuid === activeOther) {
                  sal = {
                    ...autofillOther,
                    uuid: activeOther,
                  };
                }
                return { ...sal };
              });
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  updateApiGetIncome: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<IIncomeData, string, string>
    ) {
      const dataBor = action.payload.data.tabs.incomes.customer_main.borrower
      const dataMar = action.payload.data.tabs.incomes.customer_main.marriage
      const dataCob = action.payload.data.tabs.incomes.customer_main.co_borrower
      const dataCop = action.payload.data.tabs.incomes.customer_main.co_payer

      const dataBalance = action.payload.data.tabs.balance;
      const dataAbility= action.payload.data.tabs.ability_to_repay;
      const dataSalary = (dataSalaryAPI:IIncomeSalaryGet) =>{
        const result = {
          activeSalary:"",
          total_income_from_salary_source:dataSalaryAPI?.total_income_from_salary_source?.value,
          permanent_income_amount:dataSalaryAPI?.permanent_income_amount?.value,
          occasional_income_amount:dataSalaryAPI?.occasional_income_amount?.value,
          data:dataSalaryAPI?.salaries?.length > 0 ? dataSalaryAPI?.salaries?.map((sal,idx)=>{
            return{
              uuid: sal.uuid,
              areaActivity:sal?.company_info?.business_group?.id,
              companyType:sal?.company_info?.business_type?.id,
              companyName:sal?.company_info?.business_name,
              companyCate:sal?.company_info?.business_fullname,
              years:sal?.company_info?.work_experience?.value,  
              startDate:(sal?.company_info?.start_working ?? 0) * 1000,
              contractType:sal?.company_info?.contract_type?.id,
              receivedMethod:sal?.company_info?.method_payment?.id,
              frequency:sal?.company_info?.frequency_type.id,
              career:sal?.company_info?.business_field.id,
              ratioIncome:sal?.company_info?.income_ratio,
              salary:sal?.company_info?.salary?.value,
              incomeFromSalary:sal?.company_info?.income_from_salary?.value,
              documents:sal?.documents?.map(docs=>{
                return{
                  document_id:docs?.document_id,
                  document_name:docs.document_name,
                  document_type:docs?.document_type,
                  data_file:docs?.data_file?.map(dataFile=>{
                    return {
                      uuid: dataFile.uuid,
                      name: dataFile.name ,
                      content_type:dataFile.content_type ,
                      description: dataFile.description ,
                      display_order:dataFile.display_order ,
                      created_by:dataFile.created_by,
                      created_at:dataFile.created_at ,
                      updated_at:dataFile.updated_at ,
                      updated_by:dataFile.updated_by ,
                      created_by_name: dataFile.created_by_name,
                      updated_by_name: dataFile.updated_by_name,
                      custom_keys:dataFile.custom_keys ,
                    }
                  })
                }
              })
            }
          }) : []
        };
        const length =dataSalaryAPI?.salaries?.length;
        result.activeSalary = length > 0 ? dataSalaryAPI?.salaries[length -1].uuid:'';
        return result;
      }

      const dataBussiness = (dataBussAPI:IIncomeBussinessHouseHoldGet)=>{
        const result = {
          activeBusiness:"",
          total_income_from_business_activities:dataBussAPI?.total_income_from_business_activities?.value,
          permanent_income_amount:dataBussAPI?.permanent_income_amount?.value,
          occasional_income_amount:dataBussAPI?.occasional_income_amount?.value,
          data:dataBussAPI?.business_households?.length > 0  ? dataBussAPI?.business_households?.map((buss,idx)=>{
            return{
              uuid: buss.uuid,
              representative:buss?.business_household_info?.business_household_type?.id,
              name:buss?.business_household_info?.business_name,
              workingTime:buss?.business_household_info?.business_working_time.value,
              frequency:buss?.business_household_info?.frequency_type?.id,
              ratio:buss?.business_household_info?.income_ratio?.id,
              turnover:buss?.business_household_info?.gross_revenue?.value,
              cost:buss?.business_household_info?.cost?.value,
              profit:buss?.business_household_info?.profit?.value,
              income_business_activities:buss?.business_household_info?.income_from_household_business_activities.value,
              documents:buss?.documents?.map(docs=>{
                return{
                  document_id:docs?.document_id,
                  document_name:docs.document_name,
                  document_type:docs?.document_type,
                  data_file:docs?.data_file?.map(dataFile=>{
                    return {
                      uuid: dataFile.uuid,
                      name: dataFile.name ,
                      content_type:dataFile.content_type ,
                      description: dataFile.description ,
                      display_order:dataFile.display_order ,
                      created_by:dataFile.created_by,
                      created_at:dataFile.created_at ,
                      updated_at:dataFile.updated_at ,
                      updated_by:dataFile.updated_by ,
                      created_by_name: dataFile.created_by_name,
                      updated_by_name: dataFile.updated_by_name,
                      custom_keys:dataFile.custom_keys ,
                    }
                  })
                }
              })
            }
          }) : []
        }
        const length = dataBussAPI?.business_households.length;
        result.activeBusiness = length > 0 ? dataBussAPI?.business_households[length -1].uuid:'';
        return result;
      }

      const dataDeposit = (dataDepositAPI:IIncomeDepositGet) =>{
        const result = {
          activeDeposit:"",
          occasional_income_amount:dataDepositAPI?.occasional_income_amount?.value,
          permanent_income_amount:dataDepositAPI?.permanent_income_amount?.value,
          total_income_from_deposits:dataDepositAPI?.total_income_from_deposits?.value,
          data:dataDepositAPI?.source_income_deposits?.length > 0 ? dataDepositAPI?.source_income_deposits?.map((de,idx)=>{
            return{
              uuid: de.uuid,
              unit:"",
              publish_unit_id:de?.deposit_info?.publish_unit_id?.id,
              accept_blocked_account:de?.deposit_info?.accept_blocked_account?.code,
              account:de?.deposit_info?.account_number,
              currency:de?.deposit_info?.currency_type_id?.id,
              balance:de?.deposit_info?.balance?.value,
              blocked:de?.deposit_info,
              term:de?.deposit_info.term.id,
              profit:de?.deposit_info?.profit.value,
              frequency:de?.deposit_info?.frequency_type.id,
              income_ratio:de?.deposit_info?.income_ratio.id,
              income_from_deposits:de?.deposit_info?.income_from_deposits.value,
              documents:de?.documents?.map(docs=>{
                return{
                  document_id:docs?.document_id,
                  document_name:docs.document_name,
                  document_type:docs?.document_type,
                  data_file:docs?.data_file?.map(dataFile=>{
                    return {
                      uuid: dataFile.uuid,
                      name: dataFile.name ,
                      content_type:dataFile.content_type ,
                      description: dataFile.description ,
                      display_order:dataFile.display_order ,
                      created_by:dataFile.created_by,
                      created_at:dataFile.created_at ,
                      updated_at:dataFile.updated_at ,
                      updated_by:dataFile.updated_by ,
                      created_by_name: dataFile.created_by_name,
                      updated_by_name: dataFile.updated_by_name,
                      custom_keys:dataFile.custom_keys ,
                    }
                  })
                }
              })
            }
          }) : []
        };
        const length = dataDepositAPI?.source_income_deposits.length;
        result.activeDeposit = length > 0 ?dataDepositAPI?.source_income_deposits[length - 1].uuid : '';
        return result;
      }

      const dataOther = (dataOtherAPI :IIncomeOtherGet)=>{
        const result = {
          activeOther:"",
          occasional_income_amount:dataOtherAPI?.occasional_income_amount?.value,
          permanent_income_amount:dataOtherAPI?.permanent_income_amount?.value,
          total_income_from_other_sources:dataOtherAPI?.total_income_from_other_sources?.value,
          data:  dataOtherAPI?.income_other?.length > 0 ? dataOtherAPI?.income_other?.map((other,idx)=>{
            return{
              uuid: other.uuid,
              frequencyYear:other?.income_info?.frequency_year,
              paymentMethod:other?.income_info?.payment_method?.id,
              profit:other?.income_info?.profit?.value,
              note:other?.income_info?.note,
              frequency:other?.income_info?.frequency_type?.id,
              income_ratio:other?.income_info?.income_ratio,
              income_from_other_source:other?.income_info?.income_from_other_source?.value,
              documents:other?.documents?.map(docs=>{
                return{
                  document_id:docs?.document_id,
                  document_name:docs.document_name,
                  document_type:docs?.document_type,
                  data_file:docs?.data_file?.map(dataFile=>{
                    return {
                      uuid: dataFile.uuid,
                      name: dataFile.name ,
                      content_type:dataFile.content_type ,
                      description: dataFile.description ,
                      display_order:dataFile.display_order ,
                      created_by:dataFile.created_by,
                      created_at:dataFile.created_at ,
                      updated_at:dataFile.updated_at ,
                      updated_by:dataFile.updated_by ,
                      created_by_name: dataFile.created_by_name,
                      updated_by_name: dataFile.updated_by_name,
                      custom_keys:dataFile.custom_keys ,
                    }
                  })
                }
              })
            }
          }) : []
        };
        const length = dataOtherAPI?.income_other.length;
        result.activeOther=length>0? dataOtherAPI?.income_other[length - 1].uuid:'';
        return result;
      }

      const dataCompany = (dataCompanyAPI : IIncomeCompanyGet) =>{
        const result ={
          activeCompany: "",
          occasional_income_amount:dataCompanyAPI?.occasional_income_amount?.value ?? 0,
          permanent_income_amount: dataCompanyAPI?.permanent_income_amount?.value ?? 0 ,
          total_income_from_company: dataCompanyAPI?.total_income_from_company.value ?? 0,
          data: dataCompanyAPI?.companies?.length > 0 ? dataCompanyAPI?.companies?.map((co,idx)=>{
            return{
              uuid: co.uuid,
              type: co?.company_info.business_type_id.id,
              name:co?.company_info.business_name,
              tax:  co?.company_info.business_tax,
              phone: co?.company_info.business_phone, 
              licenseDate:  (co?.company_info.business_license_date ?? 0) * 1000,
              profit:  co?.company_info.profit.value,
              frequency: co?.company_info.frequency_type.id,
              income_ratio: co?.company_info.income_ratio.value,
              business_income_from_business_activities: co?.company_info?.business_income_from_business_activities?.value,
              documents:co?.documents?.map(docs=>{
                return{
                  document_id:docs?.document_id,
                  document_name:docs.document_name,
                  document_type:docs?.document_type,
                  data_file:docs?.data_file?.map(dataFile=>{
                    return {
                      uuid: dataFile.uuid,
                      name: dataFile.name ,
                      content_type:dataFile.content_type ,
                      description: dataFile.description ,
                      display_order:dataFile.display_order ,
                      created_by:dataFile.created_by,
                      created_at:dataFile.created_at ,
                      updated_at:dataFile.updated_at ,
                      updated_by:dataFile.updated_by ,
                      created_by_name: dataFile.created_by_name,
                      updated_by_name: dataFile.updated_by_name,
                      custom_keys:dataFile.custom_keys ,
                    }
                  })
                }
              })
            }
          }) : []
        };
        const length = dataCompanyAPI?.companies.length;
        result.activeCompany=length>0?dataCompanyAPI?.companies[length-1].uuid:'';
        return result;
      }

      const dataStock = (dataStockAPI : IIncomeStockGet) =>{
        const result = {
          activeStock: "",
          occasional_income_amount: dataStockAPI?.occasional_income_amount?.value ?? 0,
          permanent_income_amount: dataStockAPI?.permanent_income_amount?.value ?? 0,
          total_income_from_stocks: dataStockAPI?.total_income_from_stocks?.value ?? 0,
          data: dataStockAPI?.source_income_stocks?.length > 0 ? dataStockAPI?.source_income_stocks?.map((sto,idx)=>{
            return{
                uuid: sto.uuid,
                year: sto?.stock_info?.year?.id,
                count: sto?.stock_info?.count,
                frequency: sto?.stock_info?.frequency_type?.id,
                ratio: sto?.stock_info?.income_ratio?.id,
                profit: sto?.stock_info?.profit?.value,
                income_from_stock: sto?.stock_info?.income_from_stock?.value,
                documents:sto?.documents?.map(docs=>{
                  return{
                    document_id:docs?.document_id,
                    document_name:docs.document_name,
                    document_type:docs?.document_type,
                    data_file:docs?.data_file?.map(dataFile=>{
                      return {
                        uuid: dataFile.uuid,
                        name: dataFile.name ,
                        content_type:dataFile.content_type ,
                        description: dataFile.description ,
                        display_order:dataFile.display_order ,
                        created_by:dataFile.created_by,
                        created_at:dataFile.created_at ,
                        updated_at:dataFile.updated_at ,
                        updated_by:dataFile.updated_by ,
                        created_by_name: dataFile.created_by_name,
                      updated_by_name: dataFile.updated_by_name,
                        custom_keys:dataFile.custom_keys ,
                      }
                    })
                  }
                })
            }
          }) : []
        };
        const length = dataStockAPI?.source_income_stocks.length;
        result.activeStock = length>0?dataStockAPI?.source_income_stocks[length -1].uuid:'';
        return result;
      }

      const dataPension = (dataPensionAPI : IIncomeDetailsPension) =>{
        return{
          uuid:dataPensionAPI?.uuid??'',
          license: dataPensionAPI?.pension_info?.license_number,
          startDate: (dataPensionAPI?.pension_info?.start_date ??0 ) * 1000,
          insurance: dataPensionAPI?.pension_info?.insurance_number,
          salary: dataPensionAPI?.pension_info?.salary?.value,
          frequency: dataPensionAPI?.pension_info?.frequency_type?.id,
          income_ratio: dataPensionAPI?.pension_info?.income_ratio?.id,
          income_from_pension: dataPensionAPI?.total_income_from_pension?.value,
          income_from_occ: dataPensionAPI?.occasional_income_amount?.value,
          income_from_per: dataPensionAPI?.permanent_income_amount?.value,
          documents:dataPensionAPI?.documents?.map(docs=>{
            return{
              document_id:docs?.document_id,
              document_name:docs.document_name,
              document_type:docs?.document_type,
              data_file:docs?.data_file?.map(dataFile=>{
                return {
                  uuid: dataFile.uuid,
                  name: dataFile.name ,
                  content_type:dataFile.content_type ,
                  description: dataFile.description ,
                  display_order:dataFile.display_order ,
                  created_by:dataFile.created_by,
                  created_at:dataFile.created_at ,
                  updated_at:dataFile.updated_at ,
                  updated_by:dataFile.updated_by ,
                  created_by_name: dataFile.created_by_name,
                  updated_by_name: dataFile.updated_by_name,
                  custom_keys:dataFile.custom_keys ,
                }
              })
            }
          })
        }
      }
            
      const dataAssrent = (dataAssrentAPI:IIncomeAssrentRentGet) =>{
        const result = {
          activeAssetRent:"",
          total_income_from_property_rental: dataAssrentAPI?.total_income_from_property_rental?.value ?? 0,
          permanent_income_amount: dataAssrentAPI?.permanent_income_amount?.value ?? 0,
          occasional_income_amount: dataAssrentAPI?.occasional_income_amount?.value ?? 0,
          data:dataAssrentAPI?.rental_properties?.length > 0 ? dataAssrentAPI?.rental_properties?.map((ren,idx)=>{
            // case real
            const dataRealPer = ren?.rental_property_info?.real_estates
            ?.filter(real=>real.real_estate_info.frequency_type.id === "FREQ")
            ?.map(item2=>item2?.real_estate_info?.income_from_real_estate?.value)
            ?.reduce((a,b)=>(a??0)+(b??0),0) ?? 0;
            const dataRealOcc = ren?.rental_property_info?.real_estates
            ?.filter(real=>real.real_estate_info.frequency_type.id === "INFREQ")
            ?.map(item2=>item2?.real_estate_info?.income_from_real_estate?.value)
            ?.reduce((a,b)=>(a??0)+(b??0),0) ?? 0;


            const dataTransPer = ren?.rental_property_info?.asset_transportations
            ?.filter(real=>real.transportation_info.frequency_type.id === "FREQ")
            ?.map(item2=>item2?.transportation_info?.income_from_rental_vehicles?.value)
            ?.reduce((a,b)=>(a??0)+(b??0),0) ?? 0;
            const dataTranslOcc = ren?.rental_property_info?.asset_transportations
            ?.filter(real=>real.transportation_info.frequency_type.id === "INFREQ")
            ?.map(item2=>item2?.transportation_info?.income_from_rental_vehicles?.value)
            ?.reduce((a,b)=>(a??0)+(b??0),0) ?? 0;


            const dataOtherPer = ren?.rental_property_info?.other_assets
            ?.filter(real=>real.other_assets_info.frequency_type.id === "FREQ")
            ?.map(item2=>item2?.other_assets_info?.income_from_other_assets?.value)
            ?.reduce((a,b)=>(a??0)+(b??0),0) ?? 0;
            const dataOtherlOcc = ren?.rental_property_info?.other_assets
            ?.filter(real=>real.other_assets_info.frequency_type.id === "INFREQ")
            ?.map(item2=>item2?.other_assets_info?.income_from_other_assets?.value)
            ?.reduce((a,b)=>(a??0)+(b??0),0) ?? 0;

            const assetDetailRealEstate = {
              activeRealEstate:"",
              total_income_from_rental_real_estate:ren?.rental_property_info?.total_income_from_rental_real_estate?.value,
              permanent_income_from_rental_real_estate: dataRealPer,
              occasional_income_from_rental_real_estate: dataRealOcc,
              data:ren?.rental_property_info.real_estates?.length > 0 ? ren?.rental_property_info.real_estates?.map((re,idx)=>{
                return{
                  uuid:re.uuid,
                  location: re?.real_estate_info?.address,
                  province: re?.real_estate_info?.province_id?.province_code,
                  district: re?.real_estate_info?.district_id.district_code,
                  ward: re?.real_estate_info?.ward_id?.ward_code,
                  owned_status: re?.real_estate_info?.owned_status?.code,
                  description: re?.real_estate_info?.note,
                  frequency_type: re?.real_estate_info?.frequency_type?.id,
                  income_ratio: re?.real_estate_info?.income_ratio?.id,
                  price: re?.real_estate_info?.price?.value,
                  income_from_real_estate: re?.real_estate_info?.income_from_real_estate?.value,
                  documents:re?.documents?.map(docs=>{
                    return{
                      document_id:docs?.document_id,
                      document_name:docs.document_name,
                      document_type:docs?.document_type,
                      data_file:docs?.data_file?.map(dataFile=>{
                        return {
                          uuid: dataFile.uuid,
                          name: dataFile.name ,
                          content_type:dataFile.content_type ,
                          description: dataFile.description ,
                          display_order:dataFile.display_order ,
                          created_by:dataFile.created_by,
                          created_at:dataFile.created_at ,
                          updated_at:dataFile.updated_at ,
                          updated_by:dataFile.updated_by ,
                          created_by_name: dataFile.created_by_name,
                          updated_by_name: dataFile.updated_by_name,
                          custom_keys:dataFile.custom_keys ,
                        }
                      })
                    }
                  })
                }
              }) : []
            };
            if(assetDetailRealEstate?.data?.length > 0){
              assetDetailRealEstate.activeRealEstate= assetDetailRealEstate?.data[0]?.uuid ?? '';
            }

            const assetDetailOther = {
              activeOther: "",
              total_income_from_other: ren?.rental_property_info?.total_income_from_other_assets?.value,
              permanent_income_from_other:dataOtherPer,
              occasional_income_from_other:dataOtherlOcc,
              data:ren?.rental_property_info.other_assets?.length > 0 ?ren?.rental_property_info.other_assets?.map((oth,idx)=>{
                return{
                  uuid:oth.uuid,
                  idAssetRent:oth?.other_assets_info?.license,
                  owned_status:oth?.other_assets_info?.owned_status.code,
                  frequency_type:oth?.other_assets_info?.frequency_type?.id,
                  income_ratio:oth?.other_assets_info?.income_ratio?.id,
                  price:oth?.other_assets_info?.price.value,
                  income_from_other:oth?.other_assets_info?.income_from_other_assets.value ?? 0,
                  documents:oth?.documents?.map(docs=>{
                    return{
                      document_id:docs?.document_id,
                      document_name:docs.document_name,
                      document_type:docs?.document_type,
                      data_file:docs?.data_file?.map(dataFile=>{
                        return {
                          uuid: dataFile.uuid,
                          name: dataFile.name ,
                          content_type:dataFile.content_type ,
                          description: dataFile.description ,
                          display_order:dataFile.display_order ,
                          created_by:dataFile.created_by,
                          created_at:dataFile.created_at ,
                          updated_at:dataFile.updated_at ,
                          updated_by:dataFile.updated_by ,
                          created_by_name: dataFile.created_by_name,
                          updated_by_name: dataFile.updated_by_name,
                          custom_keys:dataFile.custom_keys ,
                        }
                      })
                    }
                  })
                }
              }) : []
            };
            if(assetDetailOther?.data?.length > 0){
              assetDetailOther.activeOther = assetDetailOther.data[0]?.uuid ?? '';
            }

            const assetDetailTransport = {
              activeTransport:"",
              total_income_from_transport:ren?.rental_property_info?.total_income_from_rental_vehicles?.value,
              permanent_income_from_transport: dataTransPer,
              occasional_income_from_transport:dataTranslOcc,
              data:ren?.rental_property_info?.asset_transportations?.length > 0 ? ren?.rental_property_info?.asset_transportations?.map((trans,idx)=>{
                return{
                  uuid:trans.uuid,
                  registrationPlate: trans?.transportation_info?.license_number,
                  owned_status: trans?.transportation_info?.owned_status?.code,
                  frequency_type: trans?.transportation_info?.frequency_type?.id,
                  income_ratio: trans?.transportation_info?.income_ratio?.id,
                  price: trans?.transportation_info?.price?.value,
                  income_from_transport: trans?.transportation_info?.income_from_rental_vehicles?.value ?? 0,
                  documents:trans?.documents?.map(docs=>{
                    return{
                      document_id:docs?.document_id,
                      document_name:docs.document_name,
                      document_type:docs?.document_type,
                      data_file:docs?.data_file?.map(dataFile=>{
                        return {
                          uuid: dataFile.uuid,
                          name: dataFile.name ,
                          content_type:dataFile.content_type ,
                          description: dataFile.description ,
                          display_order:dataFile.display_order ,
                          created_by:dataFile.created_by,
                          created_at:dataFile.created_at ,
                          updated_at:dataFile.updated_at ,
                          updated_by:dataFile.updated_by ,
                          created_by_name: dataFile.created_by_name,
                          updated_by_name: dataFile.updated_by_name,
                          custom_keys:dataFile.custom_keys ,
                        }
                      })
                    }
                  })
                }
              }) : []
            }
            if(assetDetailTransport?.data?.length > 0){
              assetDetailTransport.activeTransport = assetDetailTransport.data[0]?.uuid ?? '';
            }

            return{
              uuid:ren.uuid,
              assetType: ren?.rental_property_info?.asset_type?.id,
              totalAmount: "",
              assetDetailRealEstate:assetDetailRealEstate,
              assetDetailOther:assetDetailOther,
              assetDetailTransport:assetDetailTransport,
            }
          }) : []
        };
        const length = dataAssrentAPI?.rental_properties?.length;
        result.activeAssetRent= length>0? dataAssrentAPI?.rental_properties[length-1]?.uuid:'';
        return result;
      }
      const dataMappingBor= {
        salary:dataSalary(dataBor.incomes.salary),
        assetRent:dataAssrent(dataBor.incomes.asset_rent),
        business:dataBussiness(dataBor.incomes.business_household),
        company:dataCompany(dataBor.incomes.company),
        stock:dataStock(dataBor.incomes.stock),
        deposit:dataDeposit(dataBor.incomes.deposit),
        pension:dataPension(dataBor.incomes.pension),
        other:dataOther(dataBor.incomes.other_income),
      }
      const balance_permanentIncomeAmount=dataMappingBor.salary.permanent_income_amount+dataMappingBor.assetRent.permanent_income_amount+dataMappingBor.business.permanent_income_amount+dataMappingBor.company.permanent_income_amount+dataMappingBor.stock.permanent_income_amount+dataMappingBor.deposit.permanent_income_amount+dataMappingBor.pension.income_from_per+dataMappingBor.other.permanent_income_amount;
      const balance_occasionalIncomeAmount=dataMappingBor.salary.occasional_income_amount+dataMappingBor.assetRent.occasional_income_amount+dataMappingBor.business.occasional_income_amount+dataMappingBor.company.occasional_income_amount+dataMappingBor.stock.occasional_income_amount+dataMappingBor.deposit.occasional_income_amount+dataMappingBor.pension.income_from_occ+dataMappingBor.other.occasional_income_amount;
      const balance_totalIncome=balance_permanentIncomeAmount+balance_occasionalIncomeAmount;
      state.storage.income = {
        ...state.storage.income,
        income:{
          ...state.storage.income.income,
          borrower:{
            ...state.storage.income.income.borrower,
            total_income: dataBor?.total_income?.value,
            total_occasional: dataBor?.irregular_income,
            total_permanent: dataBor?.regular_income,
            activePosition:dataBor?.customer_type?.id,
            dataPosition:[
              {
                uuidDeclare:dataBor?.customer_type?.id,
                activeIncomeSource: "salary",
                salary:dataSalary(dataBor?.incomes.salary),
                assetRent:dataAssrent(dataBor?.incomes.asset_rent),
                business:dataBussiness(dataBor?.incomes.business_household),
                company:dataCompany(dataBor?.incomes.company),
                stock:dataStock(dataBor?.incomes.stock),
                deposit:dataDeposit(dataBor?.incomes.deposit),
                pension:dataPension(dataBor?.incomes.pension),
                other:dataOther(dataBor?.incomes.other_income),
              }
            ] as unknown as ILOANNormalStorageIncomeDeclareSalary[]
          },
          marriage:{
            ...state?.storage?.income?.income?.marriage,
            total_income: dataMar?.total_income?.value, // check
            total_occasional:dataMar?.total_income?.value * 0.3, // BE return
            total_permanent: dataMar?.total_income?.value , // BE return
            activePosition:dataMar?.customer_type?.id,
            dataPosition:[
              {
                uuidDeclare:dataMar?.customer_type?.id,
                activeIncomeSource: "salary",
                salary:dataSalary(dataMar?.incomes?.salary),
                assetRent:dataAssrent(dataMar?.incomes?.asset_rent),
                business:dataBussiness(dataMar?.incomes?.business_household),
                company:dataCompany(dataMar?.incomes?.company),
                stock:dataStock(dataMar?.incomes?.stock),
                deposit:dataDeposit(dataMar?.incomes?.deposit),
                pension:dataPension(dataMar?.incomes?.pension),
                other:dataOther(dataMar?.incomes?.other_income),
              }
            ] as unknown as ILOANNormalStorageIncomeDeclareSalary[]
          },
          coborrower:{
            ...state?.storage?.income?.income?.coborrower,
            total_income: dataCob?.total_income?.value, // check
            total_occasional:dataCob?.total_income?.value * 0.3, // BE return 
            total_permanent: dataCob?.total_income?.value, // BE return
            // activePosition:dataCob?.customer_type?.id,
            dataPosition:dataCob?.customers?.map((dataPos,idx)=>{
              return{
                uuidDeclare:dataPos?.customer_info?.id,
                activeIncomeSource: "salary",
                salary:dataSalary(dataPos.incomes?.salary),
                assetRent:dataAssrent(dataPos.incomes?.asset_rent),
                business:dataBussiness(dataPos.incomes?.business_household),
                company:dataCompany(dataPos.incomes?.company),
                stock:dataStock(dataPos.incomes?.stock),
                deposit:dataDeposit(dataPos.incomes?.deposit),
                pension:dataPension(dataPos.incomes?.pension),
                other:dataOther(dataPos.incomes?.other_income),
              }
            })  as unknown as ILOANNormalStorageIncomeDeclareSalary[]
          },
          copayer:{
            ...state.storage.income.income.copayer,
            total_income: dataCop?.total_income?.value, // check
            total_occasional:dataCop?.total_income?.value * 0.3, // BE return
            total_permanent: dataCop?.total_income?.value , // BE return
            // activePosition:dataCop?.customer_type?.id,
            dataPosition:dataCop?.customers?.map((dataPos,idx)=>{
              return{
                uuidDeclare:dataPos?.customer_info?.id,
                activeIncomeSource: "salary",
                salary:dataSalary(dataPos?.incomes?.salary),
                assetRent:dataAssrent(dataPos?.incomes?.asset_rent),
                business:dataBussiness(dataPos?.incomes?.business_household),
                company:dataCompany(dataPos?.incomes?.company),
                stock:dataStock(dataPos?.incomes?.stock),
                deposit:dataDeposit(dataPos?.incomes?.deposit),
                pension:dataPension(dataPos?.incomes?.pension),
                other:dataOther(dataPos?.incomes?.other_income),
              }
            })  as unknown as ILOANNormalStorageIncomeDeclareSalary[]
          }
        },
        balance:{
          ...state.storage.income.balance,
          totalCost: dataBalance?.total_cost?.value,
          familyCost: {
            ...state.storage.income.balance.familyCost,
            id: dataBalance?.cost_detail?.family_cost?.id,
            value: dataBalance?.cost_detail?.family_cost?.value,
            description: dataBalance?.cost_detail?.family_cost?.desc
          } ,
          interestPayment: {
            ...state.storage.income.balance.interestPayment,
            id: dataBalance?.cost_detail?.interest_payment_expenses?.id,
            value: dataBalance?.cost_detail?.interest_payment_expenses?.value,
            description: dataBalance?.cost_detail?.interest_payment_expenses?.desc
          } ,
          otherCost:{
            ...state.storage.income.balance.otherCost,
            id: dataBalance?.cost_detail?.other_cost?.id,
            value: dataBalance?.cost_detail?.other_cost?.value,
            description: dataBalance?.cost_detail?.other_cost?.desc
          } ,
          totalIncome: balance_totalIncome,
          disbCost:{
            ...state.storage.income.balance.disbCost,
            id: dataBalance?.cost_detail?.disb_cost?.id,
            value: dataBalance?.cost_detail?.disb_cost?.value,
            description: dataBalance?.cost_detail?.disb_cost?.desc
          } ,
          // permanentIncomeAmount: dataBalance?.permanent_income_amount?.value,
          permanentIncomeAmount:balance_permanentIncomeAmount,
          occasionalIncomeAmount: balance_occasionalIncomeAmount,
          differentValue:balance_totalIncome - dataBalance?.total_cost?.value
        },
        ability:{
          ...state.storage.income.ability,
          gurantee: 'GURANTEE',
          comment: '',
        }
        
      }
    },
    prepare(payload: IIncomeData, meta: string) {
      return { payload, meta };
    },
  },
  updateDataIncomeBalanceAbility: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<IIncomeSourceData, string, string
      >
    ) {
      const balanceData = action.payload.data.tabs.balance;
      const abilityToRepayData = action.payload.data.tabs.ability_to_repay;

      /**
       *  mapping data Balance
      */
      state.storage.income.balance.totalIncome = _.get(balanceData,'total_income.value',0);
      state.storage.income.balance.permanentIncomeAmount = _.get(balanceData,'permanent_income_amount.value',0);
      state.storage.income.balance.occasionalIncomeAmount = _.get(balanceData,'occasional_income_amount.value', 0);
      state.storage.income.balance.totalCost = _.get(balanceData,'total_cost.value',0);
      state.storage.income.balance.differentValue = _.get(balanceData,'different_value.value',0);

      state.storage.income.balance.familyCost.id = _.get(balanceData,'cost_detail.family_cost.id',"COST_LIVING");
      state.storage.income.balance.interestPayment.id = _.get(balanceData,'cost_detail.interest_payment_expenses.id',"COST_LOAN");
      state.storage.income.balance.otherCost.id = _.get(balanceData,'cost_detail.other_cost.id',"COST_OTHER");
      state.storage.income.balance.disbCost.id = _.get(balanceData,'cost_detail.disb_cost.id',"COST_DISB");

      state.storage.income.balance.familyCost.value = _.get(balanceData,'cost_detail.family_cost.value',0);
      state.storage.income.balance.interestPayment.value = _.get(balanceData,'cost_detail.interest_payment_expenses.value',0);
      state.storage.income.balance.otherCost.value = _.get(balanceData,'cost_detail.other_cost.value',0);
      state.storage.income.balance.disbCost.value = _.get(balanceData,'cost_detail.disb_cost.value',0);

      state.storage.income.balance.familyCost.description = _.get(balanceData,'cost_detail.family_cost.desc',null);
      state.storage.income.balance.interestPayment.description = _.get(balanceData,'cost_detail.interest_payment_expenses.desc',null);
      state.storage.income.balance.otherCost.description = _.get(balanceData,'cost_detail.other_cost.desc',null);
      state.storage.income.balance.disbCost.description = _.get(balanceData,'cost_detail.disb_cost.desc',null);


      /**
       *  mapping data Ability
      */
       state.storage.income.ability.totalIncome = _.get(abilityToRepayData,'total_income.value',0);
       state.storage.income.ability.totalCost = _.get(abilityToRepayData,'total_cost.value',0);
       state.storage.income.ability.differentValue = _.get(abilityToRepayData,'net_profit.value',0);
       state.storage.income.ability.loanAmount = _.get(abilityToRepayData,'detail.loan_amount.value',0);
       state.storage.income.ability.gracePeriod = _.get(abilityToRepayData,'detail.grace_period.value',0);
       state.storage.income.ability.lendingRate = _.get(abilityToRepayData,'detail.lending_rate.value',0);
       state.storage.income.ability.costValueMax = _.get(abilityToRepayData,'detail.cost_value_max.value',0);
       state.storage.income.ability.PNI_value = _.get(abilityToRepayData,'detail.pni_value.value',0);
       state.storage.income.ability.DTI_value = _.get(abilityToRepayData,'detail.dti_value.value',0);
       state.storage.income.ability.gurantee = _.get(abilityToRepayData,'detail.comment_ability_to_repay.code','GURANTEE');
       state.storage.income.ability.comment = _.get(abilityToRepayData,'detail.comment', '');

    },
    prepare(payload: IIncomeSourceData, meta: string) {
      return { payload, meta };
    },
  },

  uploadFileMultiDocument(state: Draft<ILOANNormalState>, action: PayloadAction<IUploadDocument>){},

  downloadMultiFile(state: Draft<ILOANNormalState>, action: PayloadAction<Document[]>){},
  downloadMultiAllFile(state: Draft<ILOANNormalState>, action: PayloadAction<Document[]>){},



  setDocumentToDeclareType: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        Document[],
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          activePosition: string;
          activeOther: string;
          incomeSource: string;
        }
      >
    ) {

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (action.meta.incomeSource === "salary"){
              item.salary.data = item.salary.data.map((sal) => {
                if (sal.documents?.length === 0) {
                  sal.documents = action.payload;
                }
                return { ...sal };
              });
            }

            if (action.meta.incomeSource === "assetRent"){
              item.assetRent.data = item.assetRent.data.map((ar) => {
                if (ar.assetDetailRealEstate.data.length > 0){
                  ar.assetDetailRealEstate.data = ar.assetDetailRealEstate.data.map(drs => {
                    if (!drs.documents || drs.documents.length === 0){
                      drs.documents = action.payload;
                    }
                    return {...drs}
                  })
                }

                if (ar.assetDetailTransport.data.length > 0){
                  ar.assetDetailTransport.data = ar.assetDetailTransport.data.map(adt => {
                    if (!adt.documents || adt.documents.length === 0){
                      adt.documents = action.payload;
                    }
                  
                    return {...adt}
                  })
                }

                if (ar.assetDetailOther.data.length > 0){
                  ar.assetDetailOther.data = ar.assetDetailOther.data.map(ado => {
                    if (!ado.documents || ado.documents.length === 0){
                      ado.documents = action.payload;
                    }
                    
                    return {...ado}
                  })
                }
                
                return {...ar}
              })
            }

            if (action.meta.incomeSource === "business"){
              item.business.data = item.business.data.map((sal) => {
                if (!sal.documents ||sal.documents?.length === 0) {
                  sal.documents = action.payload;
                }
                return { ...sal };
              });
            }

            if (action.meta.incomeSource === "company"){
              item.company.data = item.company.data.map((sal) => {
                if (!sal.documents || sal.documents?.length === 0) {
                  sal.documents = action.payload;
                }
                return { ...sal };
              });
            }

            if (action.meta.incomeSource === "stock"){
              item.stock.data = item.stock.data.map((sal) => {
                if (!sal.documents || sal.documents?.length === 0) {
                  sal.documents = action.payload;
                }
                return { ...sal };
              });
            }
            
            if (action.meta.incomeSource === "deposit"){
              item.deposit.data = item.deposit.data.map((sal) => {
                if (!sal.documents || sal.documents?.length === 0) {
                  sal.documents = action.payload;
                }
                return { ...sal };
              });
            }

            if (action.meta.incomeSource === "pension"){
              if (item.pension.documents?.length > 0){
                return {...item};
              }
              console.log("pension ================ action.payload", action.payload)

              item.pension.documents = action.payload;

              return {...item}
            }

            if (action.meta.incomeSource === "other"){
              item.other.data = item.other.data.map((sal) => {
                if (!sal.documents || sal.documents?.length === 0) {
                  sal.documents = action.payload;
                }
                return { ...sal };
              });
            }

            return { ...item };
          }
        );
    },
    prepare(
      payload: Document[],
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        activePosition: string;
        activeOther: string;
        incomeSource: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setDocumentAllDeclareType: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        Document[],
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
        }
      >
    ) {
      const activePos = state.storage.income.income[action.meta.declare].activePosition;

      state.storage.income.income[action.meta.declare].dataPosition =
        state.storage.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.other.data = item.other.data.map((sal) => {
                sal.documents = action.payload;
                return { 
                  ...sal
                };
              });
            }
            return { ...item };
          }
        );
    },
    prepare(
      payload: Document[],
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceDocumentData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        DataFile[],
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          document_id: number;
          activeType: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">;
        }
      >
    ) {
      const activePos = state.storage.income.income[action.meta.declare].activePosition;


      switch(action.meta.activeType){
        case "salary":
          const activeSal = state.storage.income.income[
            action.meta.declare
          ].dataPosition.find((item) => item.uuidDeclare === activePos)?.salary?.activeSalary;
      
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.salary.data = item.salary.data.map((sal) => {
                    if (sal.uuid === activeSal) {
                      sal.documents = sal.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = [...dc.data_file, ...action.payload]
                        }
                        return {...dc}
                      })
                    }
                    return { ...sal };
                  });
                  // this code append Prefix Local when on change
                  const activeSalary = item.salary.data.find(sal => sal.uuid === activeSal);
                  if(activeSalary && !checkIncludePrefix(activeSalary?.uuid)){
                    const refactorUuid = `${PREFIX_UPDATE}${activeSalary?.uuid}`;
                    activeSalary.uuid = refactorUuid;
                    item.salary.activeSalary = refactorUuid;
                  }
                }
                return { ...item };
              }
            );
          break;

          case "assetRent": 
            state.storage.income.income[action.meta.declare].dataPosition = state.storage.income.income[action.meta.declare].dataPosition.map(
              (dp) => {
                if (dp.uuidDeclare === activePos) {

                  const activeAssetRent = dp.assetRent.activeAssetRent;
                  dp.assetRent.data = dp.assetRent.data.map(
                    d => {
                      if (d.uuid === activeAssetRent){
                        const assetType = d.assetType;

                        if(assetType === "REAL_ESTATE"){
                          const activeRealEstate = d.assetDetailRealEstate.activeRealEstate;
                          d.assetDetailRealEstate.data.map(dre => {
                            if (dre.uuid === activeRealEstate){
                              dre.documents = dre.documents.map(
                                doc => {
                                  if (doc.document_id === action.meta.document_id){
                                    doc.data_file = [...doc.data_file, ...action.payload]
                                  }
                                  return {...doc}
                                }
                              )
                            }
                            return {...dre}
                          })
                        }

                        if(assetType === "TRANSPORT"){
                          const activeTransport = d.assetDetailTransport.activeTransport;
                          d.assetDetailTransport.data.map(dre => {
                            if (dre.uuid === activeTransport){
                              dre.documents = dre.documents.map(
                                doc => {
                                  if (doc.document_id === action.meta.document_id){
                                    doc.data_file = [...doc.data_file, ...action.payload]
                                  }
                                  return {...doc}
                                }
                              )
                            }
                            return {...dre}
                          })
                        }

                        if(assetType === "OTHER"){
                          const activeOther = d.assetDetailOther.activeOther;
                          d.assetDetailOther.data.map(dre => {
                            if (dre.uuid === activeOther){
                              dre.documents = dre.documents.map(
                                doc => {
                                  if (doc.document_id === action.meta.document_id){
                                    doc.data_file = [...doc.data_file, ...action.payload]
                                  }
                                  return {...doc}
                                }
                              )
                            }
                            return {...dre}
                          })
                        }
                      }
                      return {...d}
                    }
                  )
                  // this code append prefix local on change
                  const activeAss =dp.assetRent.data.find(as=>as.uuid === activeAssetRent);
                  if(activeAss && !checkIncludePrefix(activeAss.uuid)){
                    const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
                    activeAss.uuid = refactorUuid;
                    dp.assetRent.activeAssetRent = refactorUuid;
                  };
                }
                return { ...dp };
              }
            )
          break;  

          case "business":
            const activeBus = state.storage.income.income[
              action.meta.declare
            ].dataPosition.find((item) => item.uuidDeclare === activePos)?.business?.activeBusiness;
        
            state.storage.income.income[action.meta.declare].dataPosition =
              state.storage.income.income[action.meta.declare].dataPosition.map(
                (item) => {
                  if (item.uuidDeclare === activePos) {
                    item.business.data = item.business.data.map((bus) => {
                      if (bus.uuid === activeBus) {
                        bus.documents = bus.documents.map(dc => {
                          if (dc.document_id === action.meta.document_id){
                            dc.data_file = [...dc.data_file, ...action.payload]
                          }
                          return {...dc}
                        })
                      }
                      return { ...bus };
                    });
                    // this code append prefix local on change
                    const activeBusiness = item.business.data.find(it=>it.uuid === activeBus);
                    if(activeBusiness && !checkIncludePrefix(activeBusiness.uuid)){
                      const refactorUUid = `${PREFIX_UPDATE}${activeBusiness.uuid}`;
                      activeBusiness.uuid= refactorUUid;
                      item.business.activeBusiness = refactorUUid;
                    }
                  }
                  return { ...item };
                }
              );
            break;

            case "company":
              const activeCom = state.storage.income.income[
                action.meta.declare
              ].dataPosition.find((item) => item.uuidDeclare === activePos)?.company?.activeCompany;
              state.storage.income.income[action.meta.declare].dataPosition =
                state.storage.income.income[action.meta.declare].dataPosition.map(
                  (item) => {
                    if (item.uuidDeclare === activePos) {
                      item.company.data = item.company.data.map((bus) => {
                        if (bus.uuid === activeCom) {
                          bus.documents = bus.documents.map(dc => {
                            if (dc.document_id === action.meta.document_id){
                              dc.data_file = [...dc.data_file, ...action.payload]
                            }
                            return {...dc}
                          })
                        }
                        return { ...bus };
                      });
                      const activeCompany = item.company.data.find(it=>it.uuid === activeCom);
                      if(activeCompany && !checkIncludePrefix(activeCompany.uuid)){
                        const refactorUUid = `${PREFIX_UPDATE}${activeCompany.uuid}`;
                        activeCompany.uuid = refactorUUid;
                        item.company.activeCompany = refactorUUid;
                      }
                    }
                    return { ...item };
                  }
                );
              break;

              case "stock":
                const activeSto = state.storage.income.income[
                  action.meta.declare
                ].dataPosition.find((item) => item.uuidDeclare === activePos)?.stock?.activeStock;
                state.storage.income.income[action.meta.declare].dataPosition =
                  state.storage.income.income[action.meta.declare].dataPosition.map(
                    (item) => {
                      if (item.uuidDeclare === activePos) {
                        item.stock.data = item.stock.data.map((bus) => {
                          if (bus.uuid === activeSto) {
                            bus.documents = bus.documents.map(dc => {
                              if (dc.document_id === action.meta.document_id){
                                dc.data_file = [...dc.data_file, ...action.payload]
                              }
                              return {...dc}
                            })
                          }
                          return { ...bus };
                        });
                        const activeStock = item.stock.data.find(it=>it.uuid === activeSto);
                        if(activeStock && !checkIncludePrefix(activeStock.uuid)){
                          const refactorUUid = `${PREFIX_UPDATE}${activeStock.uuid}`;
                          activeStock.uuid = refactorUUid;
                          item.stock.activeStock = refactorUUid
                        }
                      }
                      return { ...item };
                    }
                  );
                break; 

                case "deposit":
                  const activeDepo = state.storage.income.income[
                    action.meta.declare
                  ].dataPosition.find((item) => item.uuidDeclare === activePos)?.deposit?.activeDeposit;
                  state.storage.income.income[action.meta.declare].dataPosition =
                    state.storage.income.income[action.meta.declare].dataPosition.map(
                      (item) => {
                        if (item.uuidDeclare === activePos) {
                          item.deposit.data = item.deposit.data.map((bus) => {
                            if (bus.uuid === activeDepo) {
                              bus.documents = bus.documents.map(dc => {
                                if (dc.document_id === action.meta.document_id){
                                  dc.data_file = [...dc.data_file, ...action.payload]
                                }
                                return {...dc}
                              })
                            }
                            return { ...bus };
                          });
                          const activeDeposit = item.deposit.data.find(it=>it.uuid === activeDepo);
                          if(activeDeposit && !checkIncludePrefix(activeDeposit.uuid)){
                            const refactorUUid = `${PREFIX_UPDATE}${activeDeposit.uuid}`;
                            activeDeposit.uuid = refactorUUid;
                            item.deposit.activeDeposit = refactorUUid;
                          }
                        }
                        return { ...item };
                      }
                    );
                  break; 

                  case "pension":
                    state.storage.income.income[action.meta.declare].dataPosition =
                      state.storage.income.income[action.meta.declare].dataPosition.map(
                        (item) => {
                          if (item.uuidDeclare === activePos) {
                            item.pension.documents = item.pension.documents?.map((item)=>{
                              if(item.document_id === action.meta.document_id){
                                item.data_file = [...item.data_file,...action.payload]
                              }
                              return {...item}
                            })
                            if(!checkIncludePrefix(item.pension.uuid)){
                              item.pension.uuid = `${PREFIX_UPDATE}${item.pension.uuid}`;
                            }
                          }
                          return { ...item };
                        }
                      );
                    break;
                  
                case "other":
                  const activeOther = state.storage.income.income[
                    action.meta.declare
                  ].dataPosition.find((item) => item.uuidDeclare === activePos)?.other?.activeOther;
                  state.storage.income.income[action.meta.declare].dataPosition =
                    state.storage.income.income[action.meta.declare].dataPosition.map(
                      (item) => {
                        if (item.uuidDeclare === activePos) {
                          item.other.data = item.other.data.map((bus) => {
                            if (bus.uuid === activeOther) {
                              bus.documents = bus.documents.map(dc => {
                                if (dc.document_id === action.meta.document_id){
                                  dc.data_file = [...dc.data_file, ...action.payload]
                                }
                                return {...dc}
                              })
                            }
                            return { ...bus };
                          });
                          const activeOr = item.other.data.find(it=>it.uuid === activeOther);
                          if(activeOr && !checkIncludePrefix(activeOr.uuid)){
                            const refactorUUid = `${PREFIX_UPDATE}${activeOr.uuid}`;
                            activeOr.uuid = refactorUUid;
                            item.other.activeOther = refactorUUid;
                          }
                        }
                        return { ...item };
                      }
                    );
                  break; 

        default:
          break;
      }
      
    },
    prepare(
      payload: DataFile[],
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        document_id: number;
        activeType: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">;
      }
    ) {
      return { payload, meta };
    },
  },

  mapUploadDocumentData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        DataFile[],
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          document_id: number;
          activeType: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">;
          assetType?: string;
          activeAssigDocument?: string;
        }
      >
    ) {
      const activePos = state.storage.income.income[action.meta.declare].activePosition;

      switch(action.meta.activeType){
        case "salary":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.salary.data = item.salary.data.map((sal) => {
                    if (sal.uuid === action.meta.activeAssigDocument) {
                      sal.documents = sal.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = [
                            ...dc.data_file, 
                            ...action.payload
                          ]
                        }
                        return {...dc}
                      })
                    }
                    return { ...sal };
                  });
                }
                return { ...item };
              }
            );
          break;

        case "assetRent":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.assetRent.data = item.assetRent.data.map((bu) => {
                    if (bu.uuid === action.meta.activeAssigDocument) {
                     
                      if(action.meta.assetType === "TRANSPORT"){
                        bu.assetDetailTransport.data = bu.assetDetailTransport.data.map(res => {
                          if(res.uuid === action.meta.activeAssigDocument){
                            res.documents = res.documents.map(doc => {
                              doc.data_file = [
                                ...doc.data_file, 
                                ...action.payload
                              ]
                              return {...doc}
                            })
                          }
                          return {...res}
                        })
                      }

                      if(action.meta.assetType === "OTHER"){
                        bu.assetDetailOther.data = bu.assetDetailOther.data.map(res => {
                          if(res.uuid === action.meta.activeAssigDocument){
                            res.documents = res.documents.map(doc => {
                              doc.data_file = [
                                ...doc.data_file, 
                                ...action.payload
                              ]
                              return {...doc}
                            })
                          }
                          return {...res}
                        })
                      }

                      if(action.meta.assetType === "REAL_ESTATE"){
                        bu.assetDetailRealEstate.data = bu.assetDetailRealEstate.data.map(res => {
                          if(res.uuid === action.meta.activeAssigDocument){
                            res.documents = res.documents.map(doc => {
                              doc.data_file = [
                                ...doc.data_file, 
                                ...action.payload
                              ]
                              return {...doc}
                            })
                          }
                          return {...res}
                        })
                      }
                    }
                    return { ...bu };
                  });
                }
                return { ...item };
              }
            );
          break;
        
        case "business":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.business.data = item.business.data.map((bu) => {
                    if (bu.uuid === action.meta.activeAssigDocument) {
                      bu.documents = bu.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = [
                            ...dc.data_file, 
                            ...action.payload
                          ]
                        }
                        return {...dc}
                      })
                    }
                    return { ...bu };
                  });
                }
                return { ...item };
              }
            );
          break;

        case "company":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.company.data = item.company.data.map((com) => {
                    if (com.uuid === action.meta.activeAssigDocument) {
                      com.documents = com.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = [
                            ...dc.data_file, 
                            ...action.payload
                          ]
                        }
                        return {...dc}
                      })
                    }
                    return { ...com };
                  });
                }
                return { ...item };
              }
            );
          break;

        case "stock":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.stock.data = item.stock.data.map((sto) => {
                    if (sto.uuid === action.meta.activeAssigDocument) {
                      sto.documents = sto.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = [
                            ...dc.data_file, 
                            ...action.payload
                          ]
                        }
                        return {...dc}
                      })
                    }
                    return { ...sto };
                  });
                }
                return { ...item };
              }
            );
          break;
        
        case "deposit":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.deposit.data = item.deposit.data.map((dep) => {
                    if (dep.uuid === action.meta.activeAssigDocument) {
                      dep.documents = dep.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = [
                            ...dc.data_file, 
                            ...action.payload
                          ]
                        }
                        return {...dc}
                      })
                    }
                    return { ...dep };
                  });
                }
                return { ...item };
              }
            );
          break;

        case "pension":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.pension.documents = item.pension.documents.map(dc => {
                    if (dc.document_id === action.meta.document_id){
                      dc.data_file = [
                        ...dc.data_file, 
                        ...action.payload
                      ]
                    }
                    return {...dc}
                  })
                }
                return { ...item };
              }
            );
          break;
        
        case "other":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.other.data = item.other.data.map((ot) => {
                    if (ot.uuid === action.meta.activeAssigDocument) {
                      ot.documents = ot.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = [
                            ...dc.data_file, 
                            ...action.payload
                          ]
                        }
                        return {...dc}
                      })
                    }
                    return { ...ot };
                  });
                }
                return { ...item };
              }
            );
          break;

        default:
          break;
      }
      
    },
    prepare(
      payload: DataFile[],
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        document_id: number;
        activeType: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">;
        assetType?: string
        activeAssigDocument?: string;
      }
    ) {
      return { payload, meta };
    },
  },

  mappingDataFileAlterUpload:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        DataFile[],
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          activeType: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">;
          assetType?: string;
          activeAssigDocument?: string;
        }
      >
    ) {
      const activePos = state.storage.income.income[action.meta.declare].activePosition;
      const itemPOS = state.storage.income.income[action.meta.declare].dataPosition.find(pos=>pos.uuidDeclare === activePos);
      if(itemPOS){
        switch(action.meta.activeType){
          case "salary":{
            const currentIncomeData = itemPOS.salary.data.find(sal=>sal.uuid === action.meta.activeAssigDocument);
            if(currentIncomeData){
              // currentIncomeData.documents
              action.payload.forEach(fileRespone=>{
                const customeKey = _.get(fileRespone,'custom_keys');
                if(!customeKey) return;
                const currentDoc = currentIncomeData.documents.find(doc=>String(doc.document_id) === String(customeKey.document_id));
                if(!currentDoc) return;
                const fileIndex  = currentDoc.data_file.findIndex(file => file.uuid === customeKey.local_id);
                if(fileIndex !== -1){
                  currentDoc.data_file[fileIndex] = {...fileRespone};
                }
              });
            }
            break;
          }
          case "assetRent":{
            const [activeAsset,idDetail] = (action.meta.activeAssigDocument ?? "")?.split("<CHILD>") ?? ['',''];
            if(activeAsset && idDetail){
              const currentIncomeData = itemPOS.assetRent.data.find(asset => asset.uuid === activeAsset);
              if(currentIncomeData){
                let currentDetail:(
                  ILOANNormalStorageIncomeAssetRentDetailRealEstate 
                  | ILOANNormalStorageIncomeAssetRentDetailTransport 
                  | ILOANNormalStorageIncomeAssetRentDetailOther 
                  | null 
                  | undefined 
                ) = null;
                switch(action.meta.assetType){
                  case "REAL_ESTATE":{
                    currentDetail = currentIncomeData.assetDetailRealEstate.data.find(real=>real.uuid === idDetail);
                    break;
                  }
                  case "TRANSPORT":{
                    currentDetail = currentIncomeData.assetDetailTransport.data.find(trans =>trans.uuid === idDetail);
                    break;
                  }
                  case "OTHER": {
                    currentDetail = currentIncomeData.assetDetailOther.data.find(other => other.uuid === idDetail);
                    break;
                  }
                  default: {
                    currentDetail = null;
                    break;
                  }
                }
                action.payload.forEach(fileRespone=>{
                  if(!currentDetail)return;
                  const customeKey = _.get(fileRespone,'custom_keys');
                  if(!customeKey) return;
                  const currentDoc = currentDetail.documents.find(doc=>String(doc.document_id) === String(customeKey.document_id));
                  if(!currentDoc) return;
                  const fileIndex  = currentDoc.data_file.findIndex(file => file.uuid === customeKey.local_id);
                  if(fileIndex !== -1){
                    currentDoc.data_file[fileIndex] = {...fileRespone};
                  }
                });
              }
            }
            // const currentIncomeData = itemPOS.salary.data.find(sal=>sal.uuid === action.meta.activeAssigDocument);
            break;
          }
          case "business":{
            const currentIncomeData = itemPOS.business.data.find(bus => bus.uuid === action.meta.activeAssigDocument);
            if(currentIncomeData){
              action.payload.forEach(fileRespone=>{
                const customeKey = _.get(fileRespone,'custom_keys');
                if(!customeKey) return;
                const currentDoc = currentIncomeData.documents.find(doc=>String(doc.document_id) === String(customeKey.document_id));
                if(!currentDoc) return;
                const fileIndex  = currentDoc.data_file.findIndex(file => file.uuid === customeKey.local_id);
                if(fileIndex !== -1){
                  currentDoc.data_file[fileIndex] = {...fileRespone};
                }
              });
            }
            break;
          }
          case "company":{
            const currentIncomeData = itemPOS.company.data.find(comp => comp.uuid === action.meta.activeAssigDocument);
            if(currentIncomeData){
              action.payload.forEach(fileRespone=>{
                const customeKey = _.get(fileRespone,'custom_keys');
                if(!customeKey) return;
                const currentDoc = currentIncomeData.documents.find(doc=>String(doc.document_id) === String(customeKey.document_id));
                if(!currentDoc) return;
                const fileIndex  = currentDoc.data_file.findIndex(file => file.uuid === customeKey.local_id);
                if(fileIndex !== -1){
                  currentDoc.data_file[fileIndex] = {...fileRespone};
                }
              });
            }
            break;
          }
          case "stock":{
            const currentIncomeData = itemPOS.stock.data.find(sto => sto.uuid === action.meta.activeAssigDocument);
            if(currentIncomeData){
              action.payload.forEach(fileRespone=>{
                const customeKey = _.get(fileRespone,'custom_keys');
                if(!customeKey) return;
                const currentDoc = currentIncomeData.documents.find(doc=>String(doc.document_id) === String(customeKey.document_id));
                if(!currentDoc) return;
                const fileIndex  = currentDoc.data_file.findIndex(file => file.uuid === customeKey.local_id);
                if(fileIndex !== -1){
                  currentDoc.data_file[fileIndex] = {...fileRespone};
                }
              });
            }
            break;
          }
          case "deposit":{
            const currentIncomeData = itemPOS.deposit.data.find(depo => depo.uuid === action.meta.activeAssigDocument);
            if(currentIncomeData){
              action.payload.forEach(fileRespone=>{
                const customeKey = _.get(fileRespone,'custom_keys');
                if(!customeKey) return;
                const currentDoc = currentIncomeData.documents.find(doc=>String(doc.document_id) === String(customeKey.document_id));
                if(!currentDoc) return;
                const fileIndex  = currentDoc.data_file.findIndex(file => file.uuid === customeKey.local_id);
                if(fileIndex !== -1){
                  currentDoc.data_file[fileIndex] = {...fileRespone};
                }
              });
            }
            break;
          }
          case "pension":{
            action.payload.forEach(fileRespone=>{
              const customeKey = _.get(fileRespone,'custom_keys');
              if(!customeKey) return;
              const currentDoc = itemPOS.pension.documents.find(doc=>String(doc.document_id) === String(customeKey.document_id));
              if(!currentDoc) return;
              const fileIndex  = currentDoc.data_file.findIndex(file => file.uuid === customeKey.local_id);
              if(fileIndex !== -1){
                currentDoc.data_file[fileIndex] = {...fileRespone};
              }
            });
            break;
          }
          case "other":{
            const currentIncomeData = itemPOS.other.data.find(oth => oth.uuid === action.meta.activeAssigDocument);
            if(currentIncomeData){
              action.payload.forEach(fileRespone=>{
                const customeKey = _.get(fileRespone,'custom_keys');
                if(!customeKey) return;
                const currentDoc = currentIncomeData.documents.find(doc=>String(doc.document_id) === String(customeKey.document_id));
                if(!currentDoc) return;
                const fileIndex  = currentDoc.data_file.findIndex(file => file.uuid === customeKey.local_id);
                if(fileIndex !== -1){
                  currentDoc.data_file[fileIndex] = {...fileRespone};
                }
              });
            }
            break;
          }
          default:
            break;
        }
      }
      
      
    },
    prepare(
      payload: DataFile[],
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        activeType: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">;
        assetType?: string
        activeAssigDocument?: string;
      }
    ) {
      return { payload, meta };
    },
  },
  removeFile: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          document_id: number;
          activeType: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">;
        }
      >
    ) {},
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        document_id: number;
        activeType: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">;
      }
    ) {
      return { payload, meta };
    },
  },
  removeLocalFile: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          document_id: number;
          activeType: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">;
        }
      >
    ) {
      const activePos = state.storage.income.income[action.meta.declare].activePosition;
      switch(action.meta.activeType){
        case "salary":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.salary.data = item.salary.data.map((sal) => {
                    if (sal.uuid === item.salary.activeSalary) {
                      sal.documents = sal.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = dc.data_file.filter(df => df.uuid !== action.payload)
                        }
                        return {...dc}
                      })
                    }
                    return { ...sal };
                  });
                }
                return { ...item };
              }
            );
          break;

        case "assetRent":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.assetRent.data = item.assetRent.data.map((bu) => {
                    const assetType = bu?.assetType;
                    if (bu.uuid === item.assetRent.activeAssetRent) {
                      if(assetType === "TRANSPORT"){
                        const activeTransport = bu.assetDetailTransport.activeTransport;

                        bu.assetDetailTransport.data = bu.assetDetailTransport.data.map(res => {
                          if(res.uuid === activeTransport){
                            res.documents = res.documents.map(doc => {
                              doc.data_file = doc.data_file.filter(df => df.uuid !== action.payload);

                              return {...doc}
                            })
                          }
                          return {...res}
                        })
                      }

                      if(assetType === "OTHER"){
                        const activeOther = bu.assetDetailOther.activeOther;
                        bu.assetDetailOther.data = bu.assetDetailOther.data.map(res => {
                          if(res.uuid === activeOther){
                            res.documents = res.documents.map(doc => {
                              doc.data_file = doc.data_file.filter(df => df.uuid !== action.payload);
                              return {...doc}
                            })
                          }
                          return {...res}
                        })
                      }

                      if(assetType === "REAL_ESTATE"){
                        const activeRealEstate = bu.assetDetailRealEstate.activeRealEstate; 
                        bu.assetDetailRealEstate.data = bu.assetDetailRealEstate.data.map(res => {
                          if(res.uuid === activeRealEstate){
                            res.documents = res.documents.map(doc => {
                              doc.data_file = doc.data_file.filter(df => df.uuid !== action.payload);
                              return {...doc}
                            })
                          }
                          return {...res}
                        })
                      }
                    }
                    return { ...bu };
                  });
                }
                return { ...item };
              }
            );
          break;
        
        case "business":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.business.data = item.business.data.map((bu) => {
                    if (bu.uuid === item.business.activeBusiness) {
                      bu.documents = bu.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = dc.data_file.filter(df => df.uuid !== action.payload);
                        }
                        return {...dc}
                      })
                    }
                    return { ...bu };
                  });
                }
                return { ...item };
              }
            );
          break;

        case "company":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.company.data = item.company.data.map((com) => {
                    if (com.uuid === item.company.activeCompany) {
                      com.documents = com.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = dc.data_file.filter(df => df.uuid !== action.payload);
                        }
                        return {...dc}
                      })
                    }
                    return { ...com };
                  });
                }
                return { ...item };
              }
            );
          break;

        case "stock":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.stock.data = item.stock.data.map((sto) => {
                    if (sto.uuid === item.stock.activeStock) {
                      sto.documents = sto.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = dc.data_file.filter(df => df.uuid !== action.payload);
                        }
                        return {...dc}
                      })
                    }
                    return { ...sto };
                  });
                }
                return { ...item };
              }
            );
          break;
        
        case "deposit":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.deposit.data = item.deposit.data.map((dep) => {
                    if (dep.uuid === item.deposit.activeDeposit) {
                      dep.documents = dep.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = dc.data_file.filter(df => df.uuid !== action.payload);
                        }
                        return {...dc}
                      })
                    }
                    return { ...dep };
                  });
                }
                return { ...item };
              }
            );
          break;

        case "pension":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.pension.documents = item.pension.documents.map(dc => {
                    if (dc.document_id === action.meta.document_id){
                      dc.data_file = dc.data_file.filter(df => df.uuid !== action.payload);
                    }
                    return {...dc}
                  })
                }
                return { ...item };
              }
            );
          break;
        
        case "other":
          state.storage.income.income[action.meta.declare].dataPosition =
            state.storage.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.other.data = item.other.data.map((ot) => {
                    if (ot.uuid === item.other.activeOther) {
                      ot.documents = ot.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = dc.data_file.filter(df => df.uuid !== action.payload);
                        }
                        return {...dc}
                      })
                    }
                    return { ...ot };
                  });
                }
                return { ...item };
              }
            );
          break;

        default:
          break;
      }
      
    },
    prepare(
      payload: string,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        document_id: number;
        activeType: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">;
      }
    ) {
      return { payload, meta };
    },
  },

  fetchDeclareIncomeDataWithLegal: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string,string,null>
    ) {
      const checkBorrower = () => {
        const borrower = state.storage.full.data?.form.legal_info_form.data.borrower;
        const borrower_uuid = borrower?.basic_info?.uuid ?? '';
        if(borrower_uuid){
          state.storage.income.income.borrower.activePosition = borrower_uuid;
          const position = generateEmptyPosition(borrower_uuid);
          if(state.storage.income.income.borrower.dataPosition[0]){
            const temp:ILOANNormalStorageIncomeDeclareSalary ={...position,...state.storage.income.income.borrower.dataPosition[0],uuidDeclare:position.uuidDeclare};
            state.storage.income.income.borrower.dataPosition[0]=JSON.parse(JSON.stringify(temp));
          }else{
            state.storage.income.income.borrower.dataPosition.push(position);
          };
        }
      };
      const checkMarriage = () => {
        const marriage = state.storage.full.data?.form.legal_info_form.data.marriage;
        const marriage_uuid = marriage?.basic_info?.uuid ?? '';
        if(marriage_uuid){ 
          state.storage.income.income.marriage.activePosition = marriage_uuid;
          const position = generateEmptyPosition(marriage_uuid);
          if(state.storage.income.income.marriage.dataPosition[0]){
            const temp:ILOANNormalStorageIncomeDeclareSalary ={...position,...state.storage.income.income.marriage.dataPosition[0],uuidDeclare:position.uuidDeclare};
            state.storage.income.income.marriage.dataPosition[0]=JSON.parse(JSON.stringify(temp));
          }else{
            state.storage.income.income.marriage.dataPosition.push(position);
          }
        }
      };

      const checkCoBorrower =() => {
        const coBorrowers = state.storage.full.data?.form?.legal_info_form?.data?.co_brw.map(item=>item.basic_info.uuid);
        if(coBorrowers && coBorrowers.length>0){
          // state.storage.income.income.coborrower.activePosition=action.payload || coBorrowers[0];
          const arr:ILOANNormalStorageIncomeDeclareSalary[]=[];
          coBorrowers.forEach((co_brw_uuid)=>{
            const uuid = co_brw_uuid ?? '';
            const idx = state.storage.income.income.coborrower.dataPosition.findIndex((it)=>it.uuidDeclare===uuid);
            const position = generateEmptyPosition(uuid);
            if(idx!==-1){
              const temp:ILOANNormalStorageIncomeDeclareSalary ={...position,...state.storage.income.income.coborrower.dataPosition[idx],uuidDeclare:position.uuidDeclare};
              arr.push(temp);
            }else{
              arr.push(position);
            }
          });
          state.storage.income.income.coborrower.dataPosition=arr;
        };
      };

      const checkCoPayer = () => {
        const coPayers = state.storage.full.data?.form?.legal_info_form?.data?.co_payer.map(item=>item.basic_info.uuid);
        if(coPayers && coPayers.length>0){
          // state.storage.income.income.copayer.activePosition=action.payload || coPayers[0];
          const arr:ILOANNormalStorageIncomeDeclareSalary[]=[];
          coPayers.forEach((co_payer_uuid)=>{
            const uuid = co_payer_uuid ?? '';
            const idx = state.storage.income.income.copayer.dataPosition.findIndex((it)=>it.uuidDeclare=== uuid);
            const position = generateEmptyPosition(uuid);
            if(idx!==-1){
              const temp:ILOANNormalStorageIncomeDeclareSalary ={...position,...state.storage.income.income.copayer.dataPosition[idx],uuidDeclare:position.uuidDeclare};
              arr.push(temp);
            }else{
              arr.push(position);
            }
          });
          state.storage.income.income.copayer.dataPosition=arr;
        }
      }

      switch (action.payload) {
        case 'borrower':{
          checkBorrower();
          break;
        }
        case 'marriage':{
          checkMarriage();
          break;
        }
        case 'co-borrower':{
          checkCoBorrower();
          break;
        }
        case 'co-payer':{
          checkCoPayer();
          break;
        }
        default:{
          checkBorrower();
          checkMarriage();
          checkCoBorrower();
          checkCoPayer();
          break;
        }
      }
    },
    prepare(
      payload: string,
      meta: null,
    ) {
      return { payload, meta };
    },
  },

  syncDataIncomeAfterSave:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {data: any}
      >
    ) {
      if(state.storage.income.validate) {
        state.storage.income.validate.valid = true;
      }
      const declareActive = state.storage.income.declareActive as keyof ILOANNormalStorageIncomeDeclare;
      const declareActivePerson = state.storage.income.income[declareActive];
      const activePositionItem = declareActivePerson.dataPosition.find(item=>item.uuidDeclare==declareActivePerson.activePosition);

      if(activePositionItem){
        switch(action.payload){
          case 'salary':{
            const resData:IncomeType.ISalaryRes = action.meta.data;
            resData?.salaries?.map(sal=>{
              const current = activePositionItem.salary.data.find(item=>item.uuid.includes(sal.uuid));
              if(current){
                current.uuid=sal.uuid;
              }
            });
            let idx = activePositionItem?.salary?.data?.findIndex(it=>activePositionItem.salary?.activeSalary?.includes(it.uuid));
            if(idx!==-1){
              activePositionItem.salary.activeSalary =   activePositionItem.salary?.data[idx]?.uuid;
            }else{
              const length = activePositionItem.salary.data?.length;
              activePositionItem.salary.activeSalary=length>0?activePositionItem.salary.data[length-1].uuid:'';
            }
            break;
          }
          case "business":{
            const resData:IncomeType.IBusinessRes = action.meta.data;
            resData?.business_households?.map((bus) => {
              const current = activePositionItem?.business?.data?.find(x => x.uuid.includes(bus.uuid));
              if(current){
                current.uuid = bus.uuid;
              }
             
            })
            let idx = activePositionItem?.business?.data?.findIndex(it=>activePositionItem.business?.activeBusiness?.includes(it.uuid));
            if(idx!==-1){
              activePositionItem.business.activeBusiness = activePositionItem.business?.data[idx]?.uuid;
            }else{
              const length = activePositionItem.business.data?.length;
              activePositionItem.business.activeBusiness = length>0? activePositionItem.business.data[length-1].uuid : '';
            }
            break;
          }
          case 'assetRent':{
            const resData:IncomeType.IAssetRentRes = action.meta.data;
            resData?.rental_properties?.map((ren) => {
              const current = activePositionItem?.assetRent?.data?.find(x => x.uuid.includes(ren.uuid));
              if(current){
                current.uuid = ren.uuid;
                const {real_estates = [],asset_transportations = [],other_assets = []} = ren.rental_property_info;
                switch(ren.rental_property_info.asset_type.id){
                  case "REAL_ESTATE":{
                    real_estates.forEach(real=>{
                      const currentRealEstate = current.assetDetailRealEstate.data.find(x =>x.uuid.includes(real.uuid));
                      if(current.assetDetailRealEstate.activeRealEstate.includes(real.uuid)){
                        current.assetDetailRealEstate.activeRealEstate = real.uuid;
                      }
                      if(currentRealEstate){
                        currentRealEstate.uuid = real.uuid;
                      }
                    })
                    break;
                  }
                  case "TRANSPORT":{
                    asset_transportations.forEach(trans=>{
                      const currentTransport = current.assetDetailTransport.data.find(x=>x.uuid.includes(trans.uuid));
                      if(current.assetDetailTransport.activeTransport.includes(trans.uuid)){
                        current.assetDetailTransport.activeTransport = trans.uuid;
                      }
                      if(currentTransport){
                        currentTransport.uuid = trans.uuid;
                      }
                    })
                    break;
                  }
                  case "OTHER":{
                    other_assets.forEach(other=>{
                      const currentOther = current.assetDetailOther.data.find(x=>x.uuid.includes(other.uuid));
                      if(current.assetDetailOther.activeOther.includes(other.uuid)){
                        current.assetDetailOther.activeOther = other.uuid;
                      }
                      if(currentOther){
                        currentOther.uuid = other.uuid;
                      }
                    })
                    break;
                  }
                  default:break;
                }
              }
            })
            let idx = activePositionItem?.assetRent?.data?.findIndex(it=>activePositionItem.assetRent?.activeAssetRent?.includes(it.uuid));
            if(idx!==-1){
              activePositionItem.assetRent.activeAssetRent= activePositionItem.assetRent?.data[idx]?.uuid;
            }else{
              const length = activePositionItem.assetRent.data?.length;
              activePositionItem.assetRent.activeAssetRent= length>0 ? activePositionItem.assetRent.data[length -1].uuid:'';
            }
            break;
          }
          case "company":{
            const resData:IncomeType.ICompanyRes = action.meta.data;
            resData?.companies?.map((com) => {
              const current = activePositionItem.company.data.find(item=>item.uuid.includes(com.uuid));
              if(current){
                current.uuid=com.uuid;
              }
            });
            let idx = activePositionItem?.company?.data?.findIndex(it=>activePositionItem.company?.activeCompany?.includes(it.uuid));
            if(idx!==-1){
              activePositionItem.company.activeCompany= activePositionItem.company?.data[idx]?.uuid;
            }else{
              const length = activePositionItem.company.data?.length;
              activePositionItem.company.activeCompany=length>0?activePositionItem.company.data[length-1].uuid:'';
            }
            break;
          }
          case 'stock':{
            const resData:IncomeType.IStockRes = action.meta.data;
            resData?.source_income_stocks?.map((stock) => {
              const current = activePositionItem.stock.data.find(item=>item.uuid.includes(stock.uuid))
              if(current) current.uuid = stock.uuid;
            });
            let idx = activePositionItem?.stock?.data?.findIndex(it=>activePositionItem.stock?.activeStock?.includes(it.uuid));
            if(idx!==-1){
              activePositionItem.stock.activeStock= activePositionItem.stock?.data[idx]?.uuid;
            }else{
              const length = activePositionItem.stock.data?.length;
              activePositionItem.stock.activeStock=length>0?activePositionItem.stock.data[length-1].uuid:'';
            }
            break;
          }
          case 'deposit':{
            const resData:IncomeType.IDepositRes = action.meta.data;
            resData?.source_income_deposits?.map((dep) => {
              const current = activePositionItem.deposit.data.find(item=>item.uuid.includes(dep.uuid));
              if(current) current.uuid = dep.uuid;
            });
            let idx = activePositionItem?.deposit?.data?.findIndex(it=>activePositionItem.deposit?.activeDeposit?.includes(it.uuid));
            if(idx!==-1){
              activePositionItem.deposit.activeDeposit= activePositionItem.deposit?.data[idx]?.uuid;
            }else{
              const length = activePositionItem.deposit.data?.length;
              activePositionItem.deposit.activeDeposit= length > 0 ? activePositionItem.deposit.data[length - 1].uuid:'';
            }
            break;
          }
          case 'pension':{
            const resData:IncomeType.IPensionRes = action.meta.data;
            activePositionItem.pension.uuid=resData?.uuid;
            break;
          }
          case 'other':{
            const resData:IncomeType.IOtherIncomeRes = action.meta.data;
            resData?.income_other?.map((ot)=>{
              const current = activePositionItem.other.data.find(item=>item.uuid.includes(ot.uuid));
              if(current) current.uuid = ot.uuid;
            });
            let idx = activePositionItem?.other?.data?.findIndex(it=>activePositionItem.other?.activeOther?.includes(it.uuid));
            if(idx!==-1){
              activePositionItem.other.activeOther= activePositionItem.other?.data[idx]?.uuid;
            }else{
              const length = activePositionItem?.other?.data?.length;
              activePositionItem.other.activeOther= length> 0 ? activePositionItem.other.data[length - 1].uuid: '';
            }
            break;
          }
          default:{
            break;
          }
        }
      }
    },
    prepare(
      payload: string,
      meta: {
        data:any,
      }
    ) {
      return { payload, meta };
    },
  },
  clearLOANNormalStorageIncome(state: Draft<ILOANNormalState>) {
    state.storage.income = generateInitialIncomeState()
  },

  handleContinueIncome:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string, string, {
      checkExistDataBeforeSave: boolean,
      delareData: {
        [key: string]: string[];
      },
      mainPath: string[],
      nextRuleDisabled: string[],
      current: number,
      current_MainIncome: string, 
      current_Income_declare: string,
      current_Income_source: string,
      checkDisabledUserList: boolean[]}>) {
    },
    prepare(payload: string, meta:{
      checkExistDataBeforeSave: boolean,
      delareData: {
        [key: string]: string[];
      },
      mainPath: string[],
      nextRuleDisabled: string[],
      current: number,
      current_MainIncome: string, 
      current_Income_declare: string,
      current_Income_source: string,
      checkDisabledUserList: boolean[]
    }){
      return { payload, meta };
    }
  },
};
