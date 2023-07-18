  import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";

import {
  CoTotalCostDeclare, DataFile, Document, IApprovalIncomeAbility, IApprovalIncomeBalance, ILOANNormalStorageIncomeAbility, ILOANNormalStorageIncomeAssetRent, ILOANNormalStorageIncomeAssetRentDetailOther,
  ILOANNormalStorageIncomeAssetRentDetailRealEstate,
  ILOANNormalStorageIncomeAssetRentDetailTransport,
  ILOANNormalStorageIncomeBusiness,
  ILOANNormalStorageIncomeCompany,
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary,
  ILOANNormalStorageIncomeDeposit,
  ILOANNormalStorageIncomeOther,
  ILOANNormalStorageIncomePension,
  ILOANNormalStorageIncomeSalary,
  ILOANNormalStorageIncomeStock,
  ILOANNormalStorageIncomeValidate, ISourceIncomeForm, IUploadDocument, LoanInfo, TotalCost,
  TotalCostDeclare
} from "types/models/loan/normal/storageApproval/SourceIncomeForm";

import * as _ from 'lodash';
import { IIncomeSourceData } from "types/models/loan/normal/storage";
import * as IncomeType from "types/models/loan/normal/storage/Income";
import { ILOANNormalStorageAddress } from "types/models/loan/normal/storage/Legal";
import { checkIncludePrefix, PREFIX_UPDATE } from "utils";
import { cicRouterNormal2 } from "views/pages/LOAN/utils";
import { autofillAssrentOtherApproval, autofillAssrentRealApproval, autofillAssrentTransportApproval, autofillBussinessApproval, autofillCompanyApproval, autofillDepositApproval, autofillOtherApproval, autofillPensionApproval, autofillSalaryApproval, autofillStockApproval } from "./autofill";
import {
  generateIncomeEmptyBusiness,
  generateIncomeEmptyCompany,
  generateIncomeEmptyDeposit,
  generateIncomeEmptyOther,
  generateIncomeEmptyPension,
  generateIncomeEmptySalary,
  generateIncomeEmptyStock
} from "./generateIncomeEmpty";
import {
  calculateWithFrequency, getPersonIncomeDataData, getTotalIncomeNVTTD, handleDataAssentRent,
  handleDataBusiness,
  handleDataCompany, handleDataDeposit,
  handleDataOther, handleDataSalary, handleDataStock, handleTotalNVTTD
} from './handleData';

export enum EActionMenu {
  DELETE = "delete",
}

export const incomeCase = {
  ///////////////////////////////////////
  /////////////DECLARE///////////////////
  //////////////////////////////////////

  setIncomeApprovalValidate(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalStorageIncomeValidate>){
    const dataPosition:ILOANNormalStorageIncomeDeclareSalary[] = _.get(state,['storage','income','income',action.payload.declare as keyof ILOANNormalStorageIncomeDeclare,'dataPosition'],[]);
    const activePos:string =_.get(state,['storage','income','income',action.payload.declare as keyof ILOANNormalStorageIncomeDeclare,'activePosition'],'');
    const currentPos = dataPosition.find(pos => pos.uuidDeclare === activePos);
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
    state.storageApproval.income.validate = action.payload;
  },

  setIncomeApprovalDeclareActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        { declare: keyof ILOANNormalStorageIncomeDeclare }
      >
    ) {
      state.storageApproval.income.declareActive = action.payload;
    },
    prepare(
      payload: string,
      meta: { declare: keyof ILOANNormalStorageIncomeDeclare }
    ) {
      return { payload, meta };
    },
  },

  setIncomeApprovalDeclarePositionActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        { declare: keyof ILOANNormalStorageIncomeDeclare }
      >
    ) {
      state.storageApproval.income.income[action.meta.declare].activePosition =
        action.payload;
    },
    prepare(
      payload: string,
      meta: { declare: keyof ILOANNormalStorageIncomeDeclare }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceApprovalActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        { declare: keyof ILOANNormalStorageIncomeDeclare }
      >
    ) {
      const activePos =
        state.storageApproval.income.income[action.meta.declare].activePosition;
        state.storageApproval.income.activeINCOME = action.payload;
      state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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


 
  ///////////////////////////////////////
  /////////////SALARY///////////////////
  //////////////////////////////////////

  setIncomeSourceApprovalSalaryActive: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item.uuidDeclare === activePos) {
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

  setIncomeSourceApprovalSalaryData: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeSal = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.salary
        .activeSalary;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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

  setIncomeSourceApprovalSalaryDataTitleCompany: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeSal = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.salary
        .activeSalary;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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

  setIncomeSourceApprovalSalaryDataTotal: {  // field 15
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeSal = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.salary
        .activeSalary;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              // const previousTotal =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_income ?? 0) -
              //   (item.salary.total_income_from_salary_source ?? 0);
              // const previousTotalOCC =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_occasional ?? 0) -
              //   (item.salary.occasional_income_amount ?? 0);
              // const previousTotalPER =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_permanent ?? 0) -
              //   (item.salary.permanent_income_amount ?? 0);

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
            //   const {occasional_income_amount,permanent_income_amount} = handleDataSalary(item);  
            //   item.salary.occasional_income_amount = occasional_income_amount;
            //   item.salary.permanent_income_amount = permanent_income_amount;
            //   item.salary.total_income_from_salary_source = occasional_income_amount + permanent_income_amount;
            //   state.storageApproval.income.income[
            //     action.meta.declare
            //   ].total_income =
            //     previousTotal + item.salary.total_income_from_salary_source;
            //   state.storageApproval.income.income[
            //     action.meta.declare
            //   ].total_occasional =
            //     previousTotalOCC + item.salary.occasional_income_amount;
  
            //   state.storageApproval.income.income[
            //     action.meta.declare
            //   ].total_permanent =
            //     previousTotalPER + item.salary.permanent_income_amount;
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

  setTotalInComeNVTTD: { // field 17 sal 13
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare;
          // incomeType: keyof ILOANNormalStorageIncomeDeclareSalary;
          // key: string;
        }
      >
    ) {
      const activePos = state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeSal = state.storageApproval.income.income[ action.meta.declare].dataPosition.find((item) => item.uuidDeclare === activePos)?.salary.activeSalary;
      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos ) {
              switch (item.activeIncomeSource as string) {
                case "salary":{ 
                  const activeSalary = _.get(item,'salary.activeSalary','');
                  const currentList  =_.get(item,'salary.data',[]);
                  _.set(item,'salary.data',currentList.map((sal: ILOANNormalStorageIncomeSalary) => {
                    if(sal.uuid === activeSalary) return {...sal , income_according_to_staff_rating: action.payload};
                    return sal;
                  }));

                  // this code onchange per and occ data salary 
                  const {permanent_income_amount_nvtd,occasional_income_amount_nvtd} = handleDataSalary(item);  
                  item.salary.occasional_income_amount = occasional_income_amount_nvtd;   
                  item.salary.permanent_income_amount = permanent_income_amount_nvtd;
                  item.salary.total_income_from_salary_source = occasional_income_amount_nvtd + permanent_income_amount_nvtd
                  const total_Salary = handleTotalNVTTD(item);

                  const previousTotal = (state.storageApproval.income.income[action.meta.declare].total_income_NVTTD ?? 0) - (item.salary.total_income_from_salary_NVTTD?? 0);
                  item.salary.total_income_from_salary_NVTTD = total_Salary.total_income_amount_all;
                  state.storageApproval.income.income[action.meta.declare].total_income_NVTTD = previousTotal + (item.salary.total_income_from_salary_NVTTD ?? 0);
               
                  break;
                }
                case "assetRent": {
                  const activeAssetRent =  _.get(item,'assetRent.activeAssetRent','');
                  
                  const currentListAssetRent  = _.get(item,'assetRent.data',[]);
                  _.set(item,'assetRent.data', currentListAssetRent.map((sal: ILOANNormalStorageIncomeAssetRent) => {
                    if(activeAssetRent === sal.uuid) { 
                      switch (sal.assetType) {
                        case 'REAL_ESTATE': {
                          const active_REAL_ESTATE  = _.get(sal,'assetDetailRealEstate.activeRealEstate','');
                          const list_REAL_ESTATE  = _.get(sal,'assetDetailRealEstate.data', []);
                          _.set(sal, "assetDetailRealEstate.data", list_REAL_ESTATE
                          .map((x: ILOANNormalStorageIncomeAssetRentDetailRealEstate) => (x.uuid === active_REAL_ESTATE ? 
                            {...x, income_according_to_staff_rating: action.payload } : x)))
                          const handleDataAss = handleDataAssentRent(item)
                          const data_real = handleDataAss.data.find(item=>item.uuid === activeAssetRent)?.realEstate
                          const previousTotal = (state.storageApproval.income.income[action.meta.declare].total_income_NVTTD ?? 0) - (item.assetRent.total_income_from_assentRent_NVTTD?? 0);
                          sal.assetDetailRealEstate.total_income_from_rental_real_estate = data_real?.total_realEstate_NVTTD ?? 0
                          sal.assetDetailRealEstate.occasional_income_from_rental_real_estate = data_real?.realEstate_occ_nvtd ?? 0
                          sal.assetDetailRealEstate.permanent_income_from_rental_real_estate = data_real?.realEstate_per_nvtd ?? 0
                          item.assetRent.permanent_income_amount = handleDataAss.permanent_income_amount
                          item.assetRent.occasional_income_amount =handleDataAss.occasional_income_amount
                          state.storageApproval.income.income[action.meta.declare].total_income_NVTTD = previousTotal + (item.assetRent.total_income_from_assentRent_NVTTD ?? 0);
                          break;
                        }
                          
                        case 'TRANSPORT': {
                          const active_TRANSPORT= _.get(sal, 'assetDetailTransport.activeTransport', '');
                          const list_TRANSPORT = _.get(sal, 'assetDetailTransport.data',[]);
                        
                          _.set(sal,"assetDetailTransport.data", list_TRANSPORT
                          .map((x: ILOANNormalStorageIncomeAssetRentDetailTransport) => (x.uuid === active_TRANSPORT ?
                          {...x, income_according_to_staff_rating: action.payload}: x)))
                          const handleDataAss = handleDataAssentRent(item)
                          const data_transport = handleDataAss.data.find(item=>item.uuid === activeAssetRent)?.detailTransport
                          const previousTotal = (state.storageApproval.income.income[action.meta.declare].total_income_NVTTD ?? 0) - (item.assetRent.total_income_from_assentRent_NVTTD?? 0);
                          sal.assetDetailTransport.total_income_from_transport = data_transport?.total_transport_NVTTD ?? 0
                          sal.assetDetailTransport.occasional_income_from_transport = data_transport?.detailTransport_occ_nvtd ?? 0
                          sal.assetDetailTransport.permanent_income_from_transport = data_transport?.detailTransport_per_nvtd ?? 0
                          item.assetRent.permanent_income_amount = handleDataAss.permanent_income_amount
                          item.assetRent.occasional_income_amount =handleDataAss.occasional_income_amount
                          state.storageApproval.income.income[action.meta.declare].total_income_NVTTD = previousTotal + (item.assetRent.total_income_from_assentRent_NVTTD ?? 0);
                          break;
                        }
  
                        case 'OTHER': {
                          const active_ORTHER = _.get(sal, 'assetDetailOther.activeOther', '');
                          const list_ORTHER = _.get(sal,'assetDetailOther.data', []);
                          _.set(sal,'assetDetailOther.data', list_ORTHER
                          .map((x: ILOANNormalStorageIncomeAssetRentDetailOther) => (x.uuid === active_ORTHER ?
                             {...x, income_according_to_staff_rating: action.payload}: x)))
                          const handleDataAss = handleDataAssentRent(item)
                          const data_other = handleDataAss.data.find(item=>item.uuid === activeAssetRent)?.detailOther
                          const previousTotal = (state.storageApproval.income.income[action.meta.declare].total_income_NVTTD ?? 0) - (item.assetRent.total_income_from_assentRent_NVTTD?? 0);
                          sal.assetDetailOther.total_income_from_other = data_other?.total_other_NVTTD ?? 0
                          sal.assetDetailOther.occasional_income_from_other = data_other?.detailOther_occ_nvtd ?? 0
                          sal.assetDetailOther.permanent_income_from_other = data_other?.detailOther_per_nvtd ?? 0
                          item.assetRent.permanent_income_amount = handleDataAss.permanent_income_amount
                          item.assetRent.occasional_income_amount =handleDataAss.occasional_income_amount
                          state.storageApproval.income.income[action.meta.declare].total_income_NVTTD = previousTotal + (item.assetRent.total_income_from_assentRent_NVTTD ?? 0);

                          
                          break;
                        }
                        
                        default:
                          break;
                      }
                    }
                    return sal;
                  }));

                  const totalDataAssent = handleTotalNVTTD(item);

                  const previousTotal_AssetRent = (state.storageApproval.income.income[action.meta.declare].total_income_NVTTD ?? 0) - (item.assetRent.total_income_from_assentRent_NVTTD?? 0);
                 
                  item.assetRent.total_income_from_assentRent_NVTTD = totalDataAssent.total_income_amount_all;

                  state.storageApproval.income.income[action.meta.declare].total_income_NVTTD = previousTotal_AssetRent + item.assetRent.total_income_from_assentRent_NVTTD;
                  
                  break;
                }
                case "business": {
                  const activeBusiness = _.get(item,"business.activeBusiness", "");
                  const businessData = _.get(item,"business.data", []);
                  _.set(item,"business.data", businessData.map((x: ILOANNormalStorageIncomeBusiness) => ( x.uuid === activeBusiness ? {...x, income_according_to_staff_rating : action.payload} : x)));
                 
                  const {permanent_income_amount_nvtd,occasional_income_amount_nvtd} = handleDataBusiness(item);  
                  item.business.occasional_income_amount = occasional_income_amount_nvtd;   
                  item.business.permanent_income_amount = permanent_income_amount_nvtd;
                  item.business.total_income_from_business_activities = occasional_income_amount_nvtd + permanent_income_amount_nvtd


                  const {total_income_amount_all} = handleTotalNVTTD(item);

                  const previousTotal_business = (state.storageApproval.income.income[action.meta.declare].total_income_NVTTD ?? 0) - (item.business.total_income_from_business_NVTTD ?? 0);
                  item.business.total_income_from_business_NVTTD = total_income_amount_all;
                  state.storageApproval.income.income[action.meta.declare].total_income_NVTTD = previousTotal_business + item.business.total_income_from_business_NVTTD;
          
                  break;
                }
                case "company": {
                  const activeCompany = _.get(item, "company.activeCompany", '');
                  const dataCompany = _.get(item,"company.data",[]);
                  _.set(item, "company.data",dataCompany.map((x: ILOANNormalStorageIncomeCompany) => (activeCompany === x.uuid ? {...x, income_according_to_staff_rating: action.payload} : x)));
                  const {permanent_income_amount_nvtd,occasional_income_amount_nvtd} = handleDataCompany(item);  
                  item.company.occasional_income_amount = occasional_income_amount_nvtd;   
                  item.company.permanent_income_amount = permanent_income_amount_nvtd;
                  item.company.total_income_from_company_NVTTD = occasional_income_amount_nvtd + permanent_income_amount_nvtd

                  const {total_income_amount_all} = handleTotalNVTTD(item);

                  
                  const previousTotal = (state.storageApproval.income.income[action.meta.declare].total_income_NVTTD ?? 0) - (item.company.total_income_from_company_NVTTD?? 0);
                  item.company.total_income_from_company = total_income_amount_all;
                  state.storageApproval.income.income[action.meta.declare].total_income_NVTTD = previousTotal + item.company.total_income_from_company_NVTTD;
          
                  break;
                }
                case "stock": {

                  const activeStock = _.get(item, "stock.activeStock", '');
                  const stockData = _.get(item, "stock.data", []);
                  _.set(item, "stock.data", stockData.map((x: ILOANNormalStorageIncomeStock) => (x.uuid === activeStock ? {...x, income_according_to_staff_rating: action.payload}: x)));
                  const {permanent_income_amount_nvtd,occasional_income_amount_nvtd} = handleDataStock(item);  
                  item.stock.occasional_income_amount = occasional_income_amount_nvtd;   
                  item.stock.permanent_income_amount = permanent_income_amount_nvtd;
                  item.stock.total_income_from_stocks_NVTTD = occasional_income_amount_nvtd + permanent_income_amount_nvtd
                  const {total_income_amount_all} = handleTotalNVTTD(item);

                  const previousTotal5 = (state.storageApproval.income.income[action.meta.declare].total_income_NVTTD ?? 0) - (item.stock.total_income_from_stocks_NVTTD?? 0);
                  item.stock.total_income_from_stocks = total_income_amount_all;
                  state.storageApproval.income.income[action.meta.declare].total_income_NVTTD = previousTotal5 + item.stock.total_income_from_stocks_NVTTD;
                  break;
          
                }
                case "deposit": {
                  const activeDeposit = _.get(item, "deposit.activeDeposit", '');
                  const depositData = _.get(item, "deposit.data", []);
                  _.set(item, "deposit.data", depositData.map((x: ILOANNormalStorageIncomeDeposit) => ( activeDeposit === x.uuid ? {...x, income_according_to_staff_rating: action.payload} : x)))
                  const {permanent_income_amount_nvtd,occasional_income_amount_nvtd} = handleDataDeposit(item);  
                  item.deposit.occasional_income_amount = occasional_income_amount_nvtd;   
                  item.deposit.permanent_income_amount = permanent_income_amount_nvtd;
                  item.deposit.total_income_from_deposits_NVTTD = occasional_income_amount_nvtd + permanent_income_amount_nvtd
                  const {total_income_amount_all} = handleTotalNVTTD(item);
                  const previousTotal6 = (state.storageApproval.income.income[action.meta.declare].total_income_NVTTD ?? 0) - (item.deposit.total_income_from_deposits_NVTTD?? 0);
                  item.deposit.total_income_from_deposits = total_income_amount_all;
                  state.storageApproval.income.income[action.meta.declare].total_income_NVTTD = previousTotal6 + item.deposit.total_income_from_deposits_NVTTD;
                  break;
                }
                case "pension": {
                  const {total_income_amount_all} = handleTotalNVTTD(item);
                  const previousTotal7 = (state.storageApproval.income.income[action.meta.declare].total_income_NVTTD ?? 0) - (item.pension.income_according_to_staff_rating?? 0);
                  // _.set(item, "pension.income_according_to_staff_rating", action.payload);
                  item.pension.income_according_to_staff_rating = action.payload;
                  item.pension.income_from_pension = action.payload;
                  if(item.pension.frequency ===  "FREQ"){
                    item.pension.income_from_per = action.payload
                    item.pension.income_from_occ = 0
                  }
                  else {
                    item.pension.income_from_per = 0
                    item.pension.income_from_occ = action.payload;
                  }
                  
                  state.storageApproval.income.income[action.meta.declare].total_income_NVTTD  = previousTotal7 +  (item.pension.income_according_to_staff_rating?? 0);
                  break;
                }
                case "other": {
                  const activePension = _.get(item, "other.activeOther");
                  const otherData = _.get(item, "other.data", []);
                  _.set(item, "other.data", otherData.map((x: ILOANNormalStorageIncomeOther) => (activePension === x.uuid ? {...x, income_according_to_staff_rating: action.payload} : x)))
                  const {permanent_income_amount_nvtd,occasional_income_amount_nvtd} = handleDataOther(item);  
                  item.other.occasional_income_amount = occasional_income_amount_nvtd;   
                  item.other.permanent_income_amount = permanent_income_amount_nvtd;
                  item.other.total_income_from_others_NVTTD = occasional_income_amount_nvtd + permanent_income_amount_nvtd

                 
                  const {total_income_amount_all} = handleTotalNVTTD(item);
                  const previousTotal8 = (state.storageApproval.income.income[action.meta.declare].total_income_NVTTD ?? 0) - (item.other.total_income_from_others_NVTTD?? 0 );
                  item.other.total_income_from_other_sources   = total_income_amount_all;
                  state.storageApproval.income.income[action.meta.declare].total_income_NVTTD = previousTotal8 + item.other.total_income_from_others_NVTTD;
                  break;
                }
                default:
                  break;
              }
             
              // this code append Prefix Local when on change
              const activeSalary = item.salary?.data?.find(sal => sal.uuid === activeSal);
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
      payload: number | null,
      meta: {
        declare: keyof ILOANNormalStorageIncomeDeclare;
        // key: string;
        // incomeType:  keyof ILOANNormalStorageIncomeDeclareSalary;
      }
    ) {
      return { payload, meta };
    },
  },


  setIncomeSourceApprovalSalaryChangeFREQ: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeSal = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.salary
        .activeSalary;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
            const previousTotal =
              (state.storageApproval.income.income[action.meta.declare]
                .total_income ?? 0) -
              (item.salary.total_income_from_salary_source ?? 0);
            const previousTotalOCC =
              (state.storageApproval.income.income[action.meta.declare]
                .total_occasional ?? 0) -
              (item.salary.occasional_income_amount ?? 0);
            const previousTotalPER =
              (state.storageApproval.income.income[action.meta.declare]
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

              const {
                // occasional_income_amount,
                // permanent_income_amount,
                occasional_income_amount_nvtd,
                permanent_income_amount_nvtd
              } = handleDataSalary(item);
              item.salary.occasional_income_amount = occasional_income_amount_nvtd;
              item.salary.permanent_income_amount = permanent_income_amount_nvtd;
              item.salary.total_income_from_salary_source = permanent_income_amount_nvtd + permanent_income_amount_nvtd;

              state.storageApproval.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.salary.total_income_from_salary_source;
  
              state.storageApproval.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.salary.occasional_income_amount;
  
              state.storageApproval.income.income[
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

  setIncomeSourceApprovalAssetRentActive: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;

      state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
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

  setIncomeSourceApprovalAssetRentType: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
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


  /////////////ASSET-RENT-REAL////////////////

  setIncomeSourceApprovalAssetRentRealEState: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeAssetRent = state.storageApproval.income.income[action.meta.declare].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent.activeAssetRent;
      state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item.uuidDeclare === activePos) {
            item.assetRent.data = item.assetRent.data.map((item) => {
              if (item.uuid === activeAssetRent) {
                item.assetDetailRealEstate.activeRealEstate = action.payload;
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

  setIncomeSourceApprovalAssetRentRealEStateData: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeRealEstate = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailRealEstate.activeRealEstate;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storageApproval.income.income[action.meta.declare]
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
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.realEstate_per_nvtd);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.realEstate_occ_nvtd);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.total_realEstate_NVTTD);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.detailTransport_per_nvtd);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.detailTransport_occ_nvtd);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.total_transport_NVTTD);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.detailOther_per_nvtd);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.detailOther_occ_nvtd);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.total_other_NVTTD);
                }
              });
              item.assetRent.occasional_income_amount = occasional_income_amount;
              item.assetRent.permanent_income_amount = permanent_income_amount;
              item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;

              state.storageApproval.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storageApproval.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storageApproval.income.income[
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

  setIncomeSourceApprovalAssetRentRealEStateDataTotal: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeRealEstate = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailRealEstate.activeRealEstate;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              // const previousTotal =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_income ?? 0) -
              //   (item.assetRent.total_income_from_property_rental ?? 0);
              // const previousTotalOCC =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_occasional ?? 0) -
              //   (item.assetRent.occasional_income_amount ?? 0);
              // const previousTotalPER =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_permanent ?? 0) -
              //   (item.assetRent.permanent_income_amount ?? 0);
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
                  // _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                  // _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                  // _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                  // // calculate Transport    
                  // _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                  // _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                  // _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                  // //   // calculate Other
                  // _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                  // _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                  // _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                }
              });
              // this code append prefix local on change
              const activeAss =item.assetRent.data.find(as=>as.uuid === activeAssetRent);
              if(activeAss && !checkIncludePrefix(activeAss.uuid)){
                const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
                activeAss.uuid = refactorUuid;
                item.assetRent.activeAssetRent = refactorUuid;
              };
              // item.assetRent.occasional_income_amount = occasional_income_amount;
              // item.assetRent.permanent_income_amount = permanent_income_amount;
              // item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;
              
              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_income =
              //   previousTotal + item.assetRent.total_income_from_property_rental;

              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_occasional =
              //   previousTotalOCC + item.assetRent.occasional_income_amount;

              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_permanent =
              //   previousTotalPER + item.assetRent.permanent_income_amount;
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

  setIncomeSourceApprovalAssetRentRealEStateDataFREQ: {
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
      const activePos =state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[action.meta.declare].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent.activeAssetRent;

      const activeRealEstate = state.storageApproval.income.income[action.meta.declare].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailRealEstate.activeRealEstate;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal = (state.storageApproval.income.income[action.meta.declare].total_income ?? 0) - (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =(state.storageApproval.income.income[action.meta.declare].total_occasional ?? 0) - (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =(state.storageApproval.income.income[action.meta.declare].total_permanent ?? 0) -(item.assetRent.permanent_income_amount ?? 0);
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
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.realEstate_per_nvtd);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.realEstate_occ_nvtd);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.realEstate_per_nvtd + realEstate.realEstate_occ_nvtd);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.detailTransport_per_nvtd);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.detailTransport_occ_nvtd);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.detailTransport_per_nvtd + detailTransport.detailTransport_occ_nvtd);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.detailOther_per_nvtd);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.detailOther_occ_nvtd);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.detailOther_per_nvtd + detailOther.detailOther_occ_nvtd);
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
              
              state.storageApproval.income.income[action.meta.declare].total_income = previousTotal + item.assetRent.total_income_from_property_rental;

              state.storageApproval.income.income[action.meta.declare].total_occasional = previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storageApproval.income.income[action.meta.declare].total_permanent = previousTotalPER + item.assetRent.permanent_income_amount;
            
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

  setIncomeSourceApprovalAssetRentRealEStateDataLocation: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeRealEstate = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailRealEstate.activeRealEstate;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
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

  setIncomeSourceApprovalAssetRentRealEStateDataOwned: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeRealEstate = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailRealEstate.activeRealEstate;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
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

  setIncomeSourceApprovalAssetRentTransport: {
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
      const activePos = state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeAssetRent = state.storageApproval.income.income[action.meta.declare].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent.activeAssetRent;
      state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
        (item) => {
          if (item.uuidDeclare === activePos) {
            item.assetRent.data = item.assetRent.data.map((item) => {
              if (item.uuid === activeAssetRent) {
                item.assetDetailTransport.activeTransport = action.payload;
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

  setIncomeSourceApprovalAssetRentTransportData: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeTransport = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailTransport.activeTransport;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storageApproval.income.income[action.meta.declare]
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
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.realEstate_per_nvtd);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.realEstate_occ_nvtd);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.total_realEstate_NVTTD);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.detailTransport_per_nvtd);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.detailTransport_occ_nvtd);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.total_transport_NVTTD);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.detailOther_per_nvtd);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.detailOther_occ_nvtd);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.total_other_NVTTD);
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
              
              state.storageApproval.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storageApproval.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storageApproval.income.income[
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

  setIncomeSourceApprovalAssetRentTransportDataOwned: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeTransport = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailTransport.activeTransport;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
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

  setIncomeSourceApprovalAssetRentTransportDataTotal: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeTransport = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailTransport.activeTransport;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              // const previousTotal =(state.storageApproval.income.income[action.meta.declare].total_income ?? 0) - (item.assetRent.total_income_from_property_rental ?? 0);
              // const previousTotalOCC =(state.storageApproval.income.income[action.meta.declare].total_occasional ?? 0) - (item.assetRent.occasional_income_amount ?? 0);
              // const previousTotalPER =(state.storageApproval.income.income[action.meta.declare].total_permanent ?? 0) - (item.assetRent.permanent_income_amount ?? 0);
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
                  // _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                  // _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                  // _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                  // // calculate Transport    
                  // _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                  // _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                  // _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                  // //   // calculate Other
                  // _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                  // _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                  // _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                }
              });

              // this code append prefix local on change
              const activeAss =item.assetRent.data.find(as=>as.uuid === activeAssetRent);
              if(activeAss && !checkIncludePrefix(activeAss.uuid)){
                const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
                activeAss.uuid = refactorUuid;
                item.assetRent.activeAssetRent = refactorUuid;
              };

              // item.assetRent.occasional_income_amount = occasional_income_amount;
              // item.assetRent.permanent_income_amount = permanent_income_amount;
              // item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;
              
              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_income =
              //   previousTotal + item.assetRent.total_income_from_property_rental;

              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_occasional =
              //   previousTotalOCC + item.assetRent.occasional_income_amount;

              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_permanent =
              //   previousTotalPER + item.assetRent.permanent_income_amount;
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

  setIncomeSourceApprovalAssetRentTransportDataFREQ: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeTransport = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailTransport.activeTransport;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storageApproval.income.income[action.meta.declare]
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
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.realEstate_per_nvtd);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.realEstate_occ_nvtd);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.realEstate_per_nvtd + realEstate.realEstate_occ_nvtd);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.detailTransport_per_nvtd);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.detailTransport_occ_nvtd);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.detailTransport_per_nvtd + detailTransport.detailTransport_occ_nvtd);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.detailOther_per_nvtd);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.detailOther_occ_nvtd);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.detailOther_per_nvtd + detailOther.detailOther_occ_nvtd);
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
              
              state.storageApproval.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storageApproval.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storageApproval.income.income[
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

  setIncomeSourceApprovalAssetRentOther: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;
      state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
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

  setIncomeSourceApprovalAssetRentOtherData: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeOther = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailOther.activeOther;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storageApproval.income.income[action.meta.declare]
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
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.realEstate_per_nvtd);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.realEstate_occ_nvtd);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.total_realEstate_NVTTD);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.detailTransport_per_nvtd);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.detailTransport_occ_nvtd);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.total_transport_NVTTD);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.detailOther_per_nvtd);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.detailOther_occ_nvtd);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.total_other_NVTTD);
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
              
              state.storageApproval.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storageApproval.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storageApproval.income.income[
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

  setIncomeSourceApprovalAssetRentOtherDataOwned: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeOther = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailOther.activeOther;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
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

  setIncomeSourceApprovalAssetRentOtherDataTotal: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeOther = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailOther.activeOther;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              // const previousTotal =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_income ?? 0) -
              //   (item.assetRent.total_income_from_property_rental ?? 0);
              // const previousTotalOCC =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_occasional ?? 0) -
              //   (item.assetRent.occasional_income_amount ?? 0);
              // const previousTotalPER =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_permanent ?? 0) -
              //   (item.assetRent.permanent_income_amount ?? 0);
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
                  // _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.permanent);
                  // _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.occasional);
                  // _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.permanent + realEstate.occasional);    

                  // // calculate Transport    
                  // _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.permanent);
                  // _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.occasional);
                  // _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.permanent + detailTransport.occasional);

                  // //   // calculate Other
                  // _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.permanent);
                  // _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.occasional);
                  // _.set(current,'assetDetailOther.total_income_from_other',detailOther.permanent + detailOther.occasional);
                }
              });

              // this code append prefix local on change
              const activeAss =item.assetRent.data.find(as=>as.uuid === activeAssetRent);
              if(activeAss && !checkIncludePrefix(activeAss.uuid)){
                const refactorUuid= `${PREFIX_UPDATE}${activeAss.uuid}`;
                activeAss.uuid = refactorUuid;
                item.assetRent.activeAssetRent = refactorUuid;
              };

              // item.assetRent.occasional_income_amount = occasional_income_amount;
              // item.assetRent.permanent_income_amount = permanent_income_amount;
              // item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;
              
              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_income =
              //   previousTotal + item.assetRent.total_income_from_property_rental;

              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_occasional =
              //   previousTotalOCC + item.assetRent.occasional_income_amount;

              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_permanent =
              //   previousTotalPER + item.assetRent.permanent_income_amount;
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

  setIncomeSourceApprovalAssetRentOtherDataFREQ: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeOther = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailOther.activeOther;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.assetRent.total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.assetRent.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storageApproval.income.income[action.meta.declare]
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
                  _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.realEstate_per_nvtd);
                  _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.realEstate_occ_nvtd);
                  _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.realEstate_per_nvtd + realEstate.realEstate_occ_nvtd);    

                  // calculate Transport    
                  _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.detailTransport_per_nvtd);
                  _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.detailTransport_occ_nvtd);
                  _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.detailTransport_per_nvtd + detailTransport.detailTransport_occ_nvtd);

                  //   // calculate Other
                  _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.detailOther_per_nvtd);
                  _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.detailOther_occ_nvtd);
                  _.set(current,'assetDetailOther.total_income_from_other',detailOther.detailOther_per_nvtd + detailOther.detailOther_occ_nvtd);
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

              state.storageApproval.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.assetRent.total_income_from_property_rental;

              state.storageApproval.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.assetRent.occasional_income_amount;

              state.storageApproval.income.income[
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

  setIncomeSourceApprovalBussinessActive: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
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

  setIncomeSourceApprovalBussinessData: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeBus = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.business
        .activeBusiness;
      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.business.data = item.business.data.map((bus) => {
                if (bus.uuid === activeBus) {
                  if(action.meta.key === 'representative'){
                    switch (action.meta.declare) {
                      case 'borrower':{
                        if(action.payload === 'SELF'){
                          const borrower = state.storageApproval.full.data?.form?.source_income_form?.income?.borrower;
                          bus.name =borrower?.customer_name ?? '';
                        }else if(action.payload === 'MARRIAGE'){
                          const marriage = state.storageApproval.full.data?.form?.source_income_form?.income?.marriage;
                          bus.name =marriage?.customer_name ?? '';
                        }    
                        break;
                      }
                      case 'marriage':{
                        if(action.payload === 'SELF'){
                          const marriage = state.storageApproval.full.data?.form?.source_income_form?.income?.marriage;
                          bus.name =marriage?.customer_name ?? '';
                        }else if(action.payload === 'MARRIAGE'){
                          const borrower = state.storageApproval.full.data?.form?.source_income_form?.income?.borrower;
                          bus.name =borrower?.customer_name ?? '';
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

  setIncomeSourceApprovalBusinessDataTurnover: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeBus = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.business
        .activeBusiness;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              // const previousTotal =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_income ?? 0) -
              //   (item.business.total_income_from_business_activities ?? 0);
              // const previousTotalOCC =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_occasional ?? 0) -
              //   (item.business.occasional_income_amount ?? 0);
              // const previousTotalPER =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_permanent ?? 0) -
              //   (item.business.permanent_income_amount ?? 0); 

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

              // const {occasional_income_amount,permanent_income_amount} = handleDataBusiness(item);
              // item.business.occasional_income_amount = occasional_income_amount;
              // item.business.permanent_income_amount = permanent_income_amount;
              // item.business.total_income_from_business_activities = occasional_income_amount + permanent_income_amount;
              
              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_income =
              //   previousTotal + item.business.total_income_from_business_activities;
  
              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_occasional =
              //   previousTotalOCC + item.business.occasional_income_amount;
  
              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_permanent =
              //   previousTotalPER +  item.business.permanent_income_amount;
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
  setIncomeSourceApprovalBusinessDataCost: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeBus = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.business
        .activeBusiness;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.business.total_income_from_business_activities ?? 0);
              const previousTotalOCC =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.business.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storageApproval.income.income[action.meta.declare]
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
              
              state.storageApproval.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.business.total_income_from_business_activities;
  
              state.storageApproval.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.business.occasional_income_amount;
  
              state.storageApproval.income.income[
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

  setIncomeSourceApprovalBusinessChangeFREQ: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeBus = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.business
        .activeBusiness;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.business.total_income_from_business_activities ?? 0);
              const previousTotalOCC =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.business.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.business.permanent_income_amount ?? 0); 
              item.business.data = item.business.data.map((bus) => {
                if (bus.uuid === activeBus) {
                  bus.frequency = action.payload;
                  bus.ratio = calculateWithFrequency(bus.frequency,100);
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

              const {occasional_income_amount_nvtd,permanent_income_amount_nvtd} = handleDataBusiness(item);
              item.business.occasional_income_amount = occasional_income_amount_nvtd;
              item.business.permanent_income_amount = permanent_income_amount_nvtd;
              item.business.total_income_from_business_activities = occasional_income_amount_nvtd + permanent_income_amount_nvtd;
              
              state.storageApproval.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.business.total_income_from_business_activities;
  
              state.storageApproval.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.business.occasional_income_amount;
  
              state.storageApproval.income.income[
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

  setIncomeSourceApprovalCompanyActive: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
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

  setIncomeSourceApprovalCompanyData: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeBus = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.company
        .activeCompany;
      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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

  setIncomeSourceApprovalCompanyDataTotal: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeCompany = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.company
        .activeCompany;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
            //   const previousTotal =
            //   (state.storageApproval.income.income[action.meta.declare]
            //     .total_income ?? 0) -
            //   (item.company.total_income_from_company ?? 0);
            //  const previousTotalOCC =
            //     (state.storageApproval.income.income[action.meta.declare]
            //       .total_occasional ?? 0) -
            //     (item.company.occasional_income_amount ?? 0);
            //   const previousTotalPER =
            //     (state.storageApproval.income.income[action.meta.declare]
            //       .total_permanent ?? 0) -
            //     (item.company.permanent_income_amount ?? 0);

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

              // const {occasional_income_amount,permanent_income_amount} = handleDataCompany(item);
              // item.company.occasional_income_amount = occasional_income_amount;
              // item.company.permanent_income_amount = permanent_income_amount;
              // item.company.total_income_from_company = occasional_income_amount + permanent_income_amount;

              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_income =
              //   previousTotal + item.company.total_income_from_company;
  
              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_occasional =
              //   previousTotalOCC + item.company.occasional_income_amount;
  
              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_permanent =
              //   previousTotalPER +  item.company.permanent_income_amount;
              
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

  setIncomeSourceApprovalCompanyChangeFREQ: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeCompany = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.company
        .activeCompany;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.company.total_income_from_company ?? 0);
              const previousTotalOCC =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.company.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_permanent ?? 0) -
                (item.company.permanent_income_amount ?? 0);

              item.company.data = item.company.data.map((sal) => {
                if (sal.uuid === activeCompany) {
                  sal.frequency = action.payload;
                  sal.income_ratio = calculateWithFrequency(sal.frequency,100);
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

              const {occasional_income_amount_nvtd,permanent_income_amount_nvtd} = handleDataCompany(item);
              item.company.occasional_income_amount = occasional_income_amount_nvtd;
              item.company.permanent_income_amount = permanent_income_amount_nvtd;
              item.company.total_income_from_company = occasional_income_amount_nvtd + permanent_income_amount_nvtd;

              state.storageApproval.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.company.total_income_from_company;
  
              state.storageApproval.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.company.occasional_income_amount;
  
              state.storageApproval.income.income[
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

  setIncomeSourceApprovalStockActive: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
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

  setIncomeSourceApprovalStockData: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeSto = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.stock
        .activeStock;
      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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

  setIncomeSourceApprovalStockDataTotal: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeStock = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.stock
        .activeStock;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              // const previousTotal =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_income ?? 0) -
              //   (item.stock.total_income_from_stocks ?? 0);
              // const previousTotalOCC =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_occasional ?? 0) -
              //   (item.stock.occasional_income_amount ?? 0);
              // const previousTotalPER =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_permanent ?? 0) -
              //   (item.stock.permanent_income_amount ?? 0);
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

              // const {occasional_income_amount,permanent_income_amount} = handleDataStock(item);
              // item.stock.total_income_from_stocks = occasional_income_amount+permanent_income_amount;
              // item.stock.occasional_income_amount = occasional_income_amount;
              // item.stock.permanent_income_amount = permanent_income_amount;

              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_income =
              //   previousTotal + item.stock.total_income_from_stocks;

              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_occasional =
              //   previousTotalOCC + item.stock.occasional_income_amount;
              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_permanent =
              //   previousTotalPER + item.stock.permanent_income_amount;  
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

  setIncomeSourceApprovalStockChangeFREQ: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeSto = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.stock
        .activeStock;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.stock.total_income_from_stocks ?? 0);
              const previousTotalOCC =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.stock.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storageApproval.income.income[action.meta.declare]
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

              const {occasional_income_amount_nvtd,permanent_income_amount_nvtd} = handleDataStock(item);
              item.stock.total_income_from_stocks = occasional_income_amount_nvtd+permanent_income_amount_nvtd;
              item.stock.occasional_income_amount = occasional_income_amount_nvtd;
              item.stock.permanent_income_amount = permanent_income_amount_nvtd;

              state.storageApproval.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.stock.total_income_from_stocks;

              state.storageApproval.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.stock.occasional_income_amount;
              state.storageApproval.income.income[
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

  setIncomeSourceApprovalDepositActive: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
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

  setIncomeSourceApprovalDepositData: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeDe = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.deposit
        .activeDeposit;
      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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

  setIncomeSourceApprovalDepositDataTotal: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeDeposit = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.deposit
        .activeDeposit;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              // const previousTotal =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_income ?? 0) -
              //   (item.deposit.total_income_from_deposits ?? 0);
              // const previousTotalOCC =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_occasional ?? 0) -
              //   (item.deposit.occasional_income_amount ?? 0);
              // const previousTotalPER =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_permanent ?? 0) -
              //   (item.deposit.permanent_income_amount ?? 0);

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
              
              // const {occasional_income_amount,permanent_income_amount} = handleDataDeposit(item);
              // item.deposit.total_income_from_deposits = occasional_income_amount + permanent_income_amount;
              // item.deposit.occasional_income_amount = occasional_income_amount;
              // item.deposit.permanent_income_amount = permanent_income_amount;

              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_income =
              //   previousTotal + item.deposit.total_income_from_deposits;

              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_occasional =
              //   previousTotalOCC + item.deposit.occasional_income_amount;
              
              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_permanent =
              //   previousTotalPER + item.deposit.permanent_income_amount;
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

  setIncomeSourceApprovalDepositChangeFREQ: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeDeposit = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.deposit
        .activeDeposit;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.deposit.total_income_from_deposits ?? 0);
              const previousTotalOCC =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.deposit.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storageApproval.income.income[action.meta.declare]
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

              const {occasional_income_amount_nvtd,permanent_income_amount_nvtd} = handleDataDeposit(item);
              item.deposit.total_income_from_deposits = occasional_income_amount_nvtd + permanent_income_amount_nvtd;
              item.deposit.occasional_income_amount = occasional_income_amount_nvtd;
              item.deposit.permanent_income_amount = permanent_income_amount_nvtd;

              state.storageApproval.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.deposit.total_income_from_deposits;

              state.storageApproval.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.deposit.occasional_income_amount;
              
              state.storageApproval.income.income[
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

  setIncomeSourceApprovalPensionData: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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

  setIncomeSourceApprovalPensionDataTotal: {
    reducer(state: Draft<ILOANNormalState>,
      action: PayloadAction<number | null, string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare,
        }>) {
      const activePos = state.storageApproval.income.income[action.meta.declare].activePosition;
      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(item => {
          if (item.uuidDeclare === activePos) {

            item.pension.salary = action.payload;

            // const total = (state.storageApproval.income.income[action.meta.declare].total_income ?? 0) - (item.pension.income_from_pension ?? 0);

            // const totalOCC = (state.storageApproval.income.income[action.meta.declare].total_occasional ?? 0) - (item.pension.income_from_occ ?? 0);

            // const totalPER = (state.storageApproval.income.income[action.meta.declare].total_permanent ?? 0) - (item.pension.income_from_per ?? 0);

            // if (item.pension.frequency === 'FREQ'){
            //   item.pension.income_from_occ = 0
            //   item.pension.income_from_per = item.pension.salary
            // }else{
            //   item.pension.income_from_per=0
            //   item.pension.income_from_occ = (item.pension.salary ?? 0) * 0.3
            // } 
 
            // this code apend prefix when on change
            // if(!checkIncludePrefix(item.pension.uuid)){
            //   item.pension.uuid = `${PREFIX_UPDATE}${item.pension.uuid}`;
            // }              

            // item.pension.income_from_pension = (item.pension.income_from_per ?? 0) + (item.pension.income_from_occ ?? 0)

            // state.storageApproval.income.income[action.meta.declare].total_income = total + item.pension.income_from_pension ;

            // state.storageApproval.income.income[action.meta.declare].total_occasional = totalOCC + (item.pension.income_from_occ ?? 0);

            // state.storageApproval.income.income[action.meta.declare].total_permanent = totalPER + (item.pension.income_from_per ?? 0);
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

  setIncomeSourceApprovalPensionDataFREQ: {
    reducer(state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare,
        }>) {
      const activePos = state.storageApproval.income.income[action.meta.declare].activePosition;
      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(item => {
          if (item.uuidDeclare === activePos) {
            item.pension.frequency = action.payload
            const total = (state.storageApproval.income.income[action.meta.declare].total_income ?? 0) - (item.pension.income_from_pension ?? 0);
            const totalOCC = (state.storageApproval.income.income[action.meta.declare].total_occasional ?? 0) - (item.pension.income_from_occ ?? 0);
            const totalPER = (state.storageApproval.income.income[action.meta.declare].total_permanent ?? 0) - (item.pension.income_from_per ?? 0);
            if (item.pension.frequency === 'FREQ'){
              item.pension.income_from_occ = 0
              item.pension.income_from_per = item.pension.income_according_to_staff_rating
            }else 
            {
              item.pension.income_from_per = 0
              item.pension.income_from_occ = item.pension.income_according_to_staff_rating
            } 
            
            // this code apend prefix when on change
            if(!checkIncludePrefix(item.pension.uuid)){
              item.pension.uuid = `${PREFIX_UPDATE}${item.pension.uuid}`;
            }

            item.pension.income_from_pension = (item.pension.income_from_per ?? 0) + (item.pension.income_from_occ ?? 0)

            state.storageApproval.income.income[action.meta.declare].total_income = total + item.pension.income_from_pension ;

            state.storageApproval.income.income[action.meta.declare].total_occasional = totalOCC + (item.pension.income_from_occ ?? 0);

            state.storageApproval.income.income[action.meta.declare].total_permanent = totalPER + (item.pension.income_from_per ?? 0);

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

  setIncomeSourceApprovalOtherActive: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
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

  setIncomeSourceApprovalOtherData: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeDe = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.other
        .activeOther;
      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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

  ///
  

  setIncomeSourceApprovalOtherDataTotal: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeOther = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.other
        .activeOther;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              // const previousTotal =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_income ?? 0) -
              //   (item.other.total_income_from_other_sources ?? 0);
              // const previousTotalOCC =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_occasional ?? 0) -
              //   (item.other.occasional_income_amount ?? 0);
              // const previousTotalPER =
              //   (state.storageApproval.income.income[action.meta.declare]
              //     .total_permanent ?? 0) -
              //   (item.other.permanent_income_amount ?? 0);

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
              

              // const {occasional_income_amount,permanent_income_amount} = handleDataOther(item);
              // item.other.total_income_from_other_sources = occasional_income_amount+permanent_income_amount;
              // item.other.occasional_income_amount = occasional_income_amount;
              // item.other.permanent_income_amount = permanent_income_amount;

              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_income =
              //   previousTotal + item.other.total_income_from_other_sources;

              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_occasional =
              //   previousTotalOCC + item.other.occasional_income_amount;

              // state.storageApproval.income.income[
              //   action.meta.declare
              // ].total_permanent =
              //   previousTotalPER + item.other.permanent_income_amount;
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

  setIncomeSourceApprovalOtherChangeFREQ: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeOther = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.other
        .activeOther;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              const previousTotal =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_income ?? 0) -
                (item.other.total_income_from_other_sources ?? 0);
              const previousTotalOCC =
                (state.storageApproval.income.income[action.meta.declare]
                  .total_occasional ?? 0) -
                (item.other.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storageApproval.income.income[action.meta.declare]
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
              
              const {occasional_income_amount_nvtd,permanent_income_amount_nvtd} = handleDataOther(item);
              item.other.total_income_from_other_sources = occasional_income_amount_nvtd+permanent_income_amount_nvtd;
              item.other.occasional_income_amount = occasional_income_amount_nvtd;
              item.other.permanent_income_amount = permanent_income_amount_nvtd;

              state.storageApproval.income.income[
                action.meta.declare
              ].total_income =
                previousTotal + item.other.total_income_from_other_sources;

              state.storageApproval.income.income[
                action.meta.declare
              ].total_occasional =
                previousTotalOCC + item.other.occasional_income_amount;

              state.storageApproval.income.income[
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
  saveINCOMEApproval(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {},

  setActiveINCOMEApproval:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string
      >
    ) { 
        state.storageApproval.income['activeINCOME']=action.payload;
    },
    prepare(
      payload: string
    ) {
      return { payload };
    },
  },
  clearDataINCOMEApproval:{
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
        const declareActive = state.storageApproval.income.declareActive as keyof ILOANNormalStorageIncomeDeclare;
        const activePos = state.storageApproval.income.income[declareActive].activePosition;
        state.storageApproval.income.income[declareActive].dataPosition?.map(
        (item) => {
          if (item?.uuidDeclare === activePos) {
            switch (item.activeIncomeSource as keyof ILOANNormalStorageIncomeDeclareSalary) {
              case 'salary':{
                const previousTotal =
                  (state.storageApproval.income.income[declareActive]
                    .total_income ?? 0) -
                  (item.salary.total_income_from_salary_source ?? 0);

                const previousTotalOCC =
                  (state.storageApproval.income.income[declareActive]
                    .total_occasional ?? 0) -
                  (item.salary.occasional_income_amount ?? 0);

                const previousTotalPER =
                  (state.storageApproval.income.income[declareActive]
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


                state.storageApproval.income.income[declareActive].total_income =
                previousTotal + item.salary.total_income_from_salary_source;
                state.storageApproval.income.income[declareActive]
                  .total_permanent=previousTotalPER + permanent_income_amount;
                state.storageApproval.income.income[declareActive].total_occasional=previousTotalOCC + occasional_income_amount;
                break;
              }
              case "assetRent":{
              const previousTotal =
                (state.storageApproval.income.income[declareActive]
                  .total_income ?? 0) -
                (item['assetRent'].total_income_from_property_rental ?? 0);
              const previousTotalOCC =
                (state.storageApproval.income.income[declareActive]
                  .total_occasional ?? 0) -
                (item['assetRent'].occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storageApproval.income.income[declareActive]
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
                    _.set(current,'assetDetailRealEstate.permanent_income_from_rental_real_estate', realEstate.realEstate_per_nvtd);
                    _.set(current,'assetDetailRealEstate.occasional_income_from_rental_real_estate',realEstate.realEstate_occ_nvtd);
                    _.set(current,'assetDetailRealEstate.total_income_from_rental_real_estate',realEstate.total_realEstate_NVTTD);    
  
                    // calculate Transport    
                    _.set(current,'assetDetailTransport.permanent_income_from_transport',detailTransport.detailTransport_per_nvtd);
                    _.set(current,'assetDetailTransport.occasional_income_from_transport',detailTransport.detailTransport_occ_nvtd);
                    _.set(current,'assetDetailTransport.total_income_from_transport',detailTransport.total_transport_NVTTD);
  
                    //   // calculate Other
                    _.set(current,'assetDetailOther.permanent_income_from_other',detailOther.detailOther_per_nvtd);
                    _.set(current,'assetDetailOther.occasional_income_from_other',detailOther.detailOther_occ_nvtd);
                    _.set(current,'assetDetailOther.total_income_from_other',detailOther.total_other_NVTTD);
                  }
                });
                item.assetRent.occasional_income_amount = occasional_income_amount;
                item.assetRent.permanent_income_amount = permanent_income_amount;
                item.assetRent.total_income_from_property_rental=+occasional_income_amount + permanent_income_amount;
  
                state.storageApproval.income.income[
                  declareActive
                ].total_income =
                  previousTotal + item.assetRent.total_income_from_property_rental;
  
                state.storageApproval.income.income[
                  declareActive
                ].total_occasional =
                  previousTotalOCC + item.assetRent.occasional_income_amount;
  
                state.storageApproval.income.income[
                  declareActive
                ].total_permanent =
                  previousTotalPER + item.assetRent.permanent_income_amount;

                break;
              }
              case "business": {
                const previousTotal =
                  (state.storageApproval.income.income[declareActive]
                    .total_income ?? 0) -
                  (item.business.total_income_from_business_activities ?? 0);
                const previousTotalOCC =
                  (state.storageApproval.income.income[declareActive]
                    .total_occasional ?? 0) -
                  (item.business.occasional_income_amount ?? 0);
                const previousTotalPER =
                  (state.storageApproval.income.income[declareActive]
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
                
                state.storageApproval.income.income[
                  declareActive
                ].total_income =
                  previousTotal + item.business.total_income_from_business_activities;
    
                state.storageApproval.income.income[
                  declareActive
                ].total_occasional =
                  previousTotalOCC + item.business.occasional_income_amount;
    
                state.storageApproval.income.income[
                  declareActive
                ].total_permanent =
                  previousTotalPER +  item.business.permanent_income_amount;
                 break;
              }
              case "company": {
                const previousTotal =
                  (state.storageApproval.income.income[declareActive]
                    .total_income ?? 0) -
                  (item.company.total_income_from_company ?? 0);
                const previousTotalOCC =
                  (state.storageApproval.income.income[declareActive]
                    .total_occasional ?? 0) -
                  (item.company.occasional_income_amount ?? 0);
                const previousTotalPER =
                  (state.storageApproval.income.income[declareActive]
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

                state.storageApproval.income.income[
                  declareActive
                ].total_income =
                  previousTotal + item.company.total_income_from_company;
    
                state.storageApproval.income.income[
                  declareActive
                ].total_occasional =
                  previousTotalOCC + item.company.occasional_income_amount;
    
                state.storageApproval.income.income[
                  declareActive
                ].total_permanent =
                  previousTotalPER +  item.company.permanent_income_amount;
                break;
            }
              case "stock": {
                const previousTotal =
                (state.storageApproval.income.income[declareActive]
                  .total_income ?? 0) -
                (item.stock.total_income_from_stocks ?? 0);
              const previousTotalOCC =
                (state.storageApproval.income.income[declareActive]
                  .total_occasional ?? 0) -
                (item.stock.occasional_income_amount ?? 0);
              const previousTotalPER =
                (state.storageApproval.income.income[declareActive]
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

                state.storageApproval.income.income[
                  declareActive
                ].total_income =
                  previousTotal + item.stock.total_income_from_stocks;

                state.storageApproval.income.income[
                  declareActive
                ].total_occasional =
                  previousTotalOCC + item.stock.occasional_income_amount;
                state.storageApproval.income.income[
                  declareActive
                ].total_permanent =
                  previousTotalPER + item.stock.permanent_income_amount;
                break;
            }
              case "deposit": {
                const previousTotal =
                  (state.storageApproval.income.income[declareActive]
                    .total_income ?? 0) -
                  (item.deposit.total_income_from_deposits ?? 0);
                const previousTotalOCC =
                  (state.storageApproval.income.income[declareActive]
                    .total_occasional ?? 0) -
                  (item.deposit.occasional_income_amount ?? 0);
                const previousTotalPER =
                  (state.storageApproval.income.income[declareActive]
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

                state.storageApproval.income.income[
                  declareActive
                ].total_income =
                  previousTotal + item.deposit.total_income_from_deposits;

                state.storageApproval.income.income[
                  declareActive
                ].total_occasional =
                  previousTotalOCC + item.deposit.occasional_income_amount;
                
                state.storageApproval.income.income[
                  declareActive
                ].total_permanent =
                  previousTotalPER + item.deposit.permanent_income_amount;
                break;
              }
              case "pension": {
                const previousTotal =
                  (state.storageApproval.income.income[declareActive]
                    .total_income ?? 0) -
                  (item.pension.income_from_pension ?? 0);
                const previousTotalOCC =
                  (state.storageApproval.income.income[declareActive]
                    .total_occasional ?? 0) -
                  (item.pension.income_from_occ ?? 0);
                const previousTotalPER =
                  (state.storageApproval.income.income[declareActive]
                    .total_permanent ?? 0) -
                  (item.pension.income_from_per ?? 0);

                item['pension']={...generateIncomeEmptyPension(),documents: item['pension'].documents,uuid:item['pension'].uuid};

                state.storageApproval.income.income[
                  declareActive
                ].total_income =
                  previousTotal + (item.pension.income_from_pension ?? 0);

                state.storageApproval.income.income[
                  declareActive
                ].total_occasional =
                  previousTotalOCC + (item.pension.income_from_occ ?? 0);

                state.storageApproval.income.income[
                  declareActive
                ].total_permanent =
                  previousTotalPER + (item.pension.income_from_per ?? 0);

                break;
              }
              case "other": {
                const previousTotal =
                  (state.storageApproval.income.income[declareActive]
                    .total_income ?? 0) -
                  (item.other.total_income_from_other_sources ?? 0);
                const previousTotalOCC =
                  (state.storageApproval.income.income[declareActive]
                    .total_occasional ?? 0) -
                  (item.other.occasional_income_amount ?? 0);
                const previousTotalPER =
                  (state.storageApproval.income.income[declareActive]
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

                state.storageApproval.income.income[
                  declareActive
                ].total_income =
                  previousTotal + item.other.total_income_from_other_sources;

                state.storageApproval.income.income[
                  declareActive
                ].total_occasional =
                  previousTotalOCC + item.other.occasional_income_amount;

                state.storageApproval.income.income[
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
      // else if (incomeMainName === 'balance'){
      //   state.storageApproval.income.balance.familyCost = 0;
      //   state.storageApproval.income.balance.otherCost = 0;
      //   state.storageApproval.income.balance.interestPayment = 0;
      //   state.storageApproval.income.balance.totalCost = 0;
      //   state.storageApproval.income.balance.differentValue = state.storageApproval.income.balance.totalIncome
      // }
      // case ability 
      // else{
      //   state.storageApproval.income.ability.gurantee = '';
      //   state.storageApproval.income.ability.comment = '';
      // }

      
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

  updateOtherCostByStaff(state:Draft<ILOANNormalState>,action:PayloadAction<number>){
    const totalCost = state.storageApproval.income.balance.financial_situation_of_customer.total_cost 
    if(state.storageApproval.income.balance.financial_situation_of_customer.total_cost !== null ){
      
      state.storageApproval.income.balance.financial_situation_of_customer.total_cost.other_cost_by_staff = action.payload
  
      state.storageApproval.income.balance.financial_situation_of_customer.total_cost.value_by_staff = (totalCost?.borrower?.value_by_staff ?? 0) 
        + (totalCost?.co_borrower?.value_by_staff ?? 0) + (totalCost?.marriage?.value_by_staff ?? 0) + (totalCost?.other_cost_by_staff ?? 0) 
    }
    
  },

  setIncomeSourceApprovalBalanceData: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null | string,
        string,
        {
          key: keyof IApprovalIncomeBalance;
        }
      >
    ) {
      if(action.meta.key ==='evaluate')
      state.storageApproval.income.balance.evaluate = String(action.payload);
    },
    prepare(
      payload: number | null | string,
      meta: {
        key: keyof IApprovalIncomeBalance;
      }
    ) {
      return { payload, meta };
    },
  },
  setIncomeSourceApprovalBalanceDataOtherCostDeclare:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          declare: keyof TotalCost;
          customer_uuid:string;
        }
      >
    ) {
      if(!state?.storageApproval?.income?.balance?.financial_situation_of_customer?.total_cost) return;
      const declare  = state.storageApproval.income.balance.financial_situation_of_customer.total_cost[action.meta.declare];
      if(!declare) return;
      const calcOtherTotalCost = (item: TotalCostDeclare):number=>{
        const otherCost = _.get(item,'other_cost.value_by_staff',0);
        const total_loan_repayment_costs_staff  =_.get(item,'loan_repayment_costs.value_by_staff',0);
        return  otherCost + total_loan_repayment_costs_staff;
      }
      switch(action.meta.declare){
        case 'borrower':{
          const item  = declare as TotalCostDeclare;
          if(item.customer_uuid === action.meta.customer_uuid){
            item.other_cost.value_by_staff = action.payload ?? 0;
            item.value_by_staff = calcOtherTotalCost(item);
          }
          break;
        }
        case 'marriage':{
          const item  = declare as TotalCostDeclare;
          if(item.customer_uuid === action.meta.customer_uuid){
            item.other_cost.value_by_staff = action.payload ?? 0;
            item.value_by_staff = calcOtherTotalCost(item);
          }
          break;
        }
        case 'co_borrower':{
          const item  = declare as CoTotalCostDeclare;
          item.customer_info = item.customer_info.map(cus=>{
            if(cus.customer_uuid === action.meta.customer_uuid){
              const item = {...cus,other_cost:{...cus.other_cost, value_by_staff:action.payload ?? 0}};
              item.value_by_staff = calcOtherTotalCost(item);
              return item;
            }
            return cus;
          })
          item.value_by_staff = item.customer_info.map(it=>it.value_by_staff).reduce((a,b)=>(a??0)+(b??0),0);
          break;
        }
        // case 'co_payer':{
        //   const item  = declare as CoTotalCostDeclare;
        //   item.customer_info = item.customer_info.map(cus=>{
        //     if(cus.customer_uuid === action.meta.customer_uuid){
        //       const item = ({...cus,other_cost:{...cus.other_cost, value_by_staff:action.payload ?? 0}});
        //       item.value_by_staff = calcOtherTotalCost(item);
        //       return item;
        //     }
        //     return cus;
        //   })
        //   item.value_by_staff = item.customer_info.map(it=>it.value_by_staff).reduce((a,b)=>(a??0)+(b??0),0);
        //   break;
        // }
      }
      const {borrower=null,co_borrower = null ,marriage = null} = _.get(state.storageApproval,'income.balance.financial_situation_of_customer.total_cost',null);
      state.storageApproval.income.balance.financial_situation_of_customer.total_cost.value_by_staff = 
      _.get(borrower,'value_by_staff',0)+
        _.get(marriage,'value_by_staff',0) + 
        _.get(co_borrower,'value_by_staff',0)


    },
    prepare(
      payload: number | null,
      meta: {
        declare: keyof TotalCost;
        customer_uuid:string;
      }
    ) {
      return { payload, meta };
    },
  },
  /////////////////////////////
  /////////Ability////////////
  ////////////////////////////
  
  // setIncomeSourceApprovalAbilityData: {
  //   reducer(
  //     state: Draft<ILOANNormalState>,
  //     action: PayloadAction<
  //     ILOANNormalStorageIncomeAbility[keyof ILOANNormalStorageIncomeAbility], 
  //     string,
  //     keyof ILOANNormalStorageIncomeAbility
  //     >
  //     ){
  //      state.storageApproval.income.ability = {
  //       ...state.storageApproval.income.ability,
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

  setIncomeSourceApprovalAbilityData: {
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
      // if(action.meta.key==='comment' || action.meta.key==='gurantee'){
      //   state.storageApproval.income.ability[action.meta.key] = action.payload;
      // }
      
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

  setIncomeSourceApprovalAbilityEvaluate: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          key: keyof IApprovalIncomeAbility;
        }
      >
    ) {
      if(action.meta.key === 'evaluate'){
        state.storageApproval.income.ability.evaluate = action.payload;
      }
    },
    prepare(
      payload: string,
      meta: {
        key: keyof IApprovalIncomeAbility;
      }
    ) {
      return { payload, meta };
    },
  },

  setIncomeSourceApprovalDataAbilityLoanInfo: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          key: keyof LoanInfo;
        }
      >
    ) {
      // state.storageApproval.income.ability.ability_to_repay_of_customer.loan_info[action.meta.key].value = Number(action.payload);
    },
    prepare(
      payload: string,
      meta: {
        key: keyof LoanInfo;
      }
    ) {
      return { payload, meta };
    },
  },

  /////////////////////////////
  /////////auto fill salary////////////
  ////////////////////////////
  autofillSalaryApproval: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeSal = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.salary
        .activeSalary;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.salary.data = item.salary.data.map((sal) => {
                if (sal.uuid === activeSal) {
                  sal = {
                    ...autofillSalaryApproval,
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

  autofillAssrentRealApproval: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.assetRent
        .activeAssetRent;

      const activeRealEstate = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition
        .find((item) => item.uuidDeclare === activePos)
        ?.assetRent.data.find((i) => i.uuid === activeAssetRent)
        ?.assetDetailRealEstate.activeRealEstate;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.assetRent.data = item.assetRent.data.map((item) => {
                if (item.uuid === activeAssetRent) {
                  item.assetDetailRealEstate.data =
                    item.assetDetailRealEstate.data.map((real) => {
                      if (real.uuid === activeRealEstate) {
                        real = {
                          ...autofillAssrentRealApproval,
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

  autofillAssrentTransportApproval: {
    reducer(state: Draft<ILOANNormalState>,
      action: PayloadAction<string | number | null, string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare,
        }>) {
      const activePos = state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[action.meta.declare].dataPosition
        .find(item => item.uuidDeclare === activePos)?.assetRent.activeAssetRent;

      const activeTransport = state.storageApproval.income.income[action.meta.declare].dataPosition
        .find(item => item.uuidDeclare === activePos)?.assetRent.data
        .find(i => i.uuid === activeAssetRent)?.assetDetailTransport.activeTransport;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(item => {
          if (item.uuidDeclare === activePos) {
            item.assetRent.data = item.assetRent.data.map(item => {
              if (item.uuid === activeAssetRent) {
                item.assetDetailTransport.data = item.assetDetailTransport.data.map(trans => {
                  if (trans.uuid === activeTransport) {
                    trans = {
                      ...autofillAssrentTransportApproval,
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

  autofillAssrentOtherApproval: {
    reducer(state: Draft<ILOANNormalState>,
      action: PayloadAction<string | number | null, string,
        {
          declare: keyof ILOANNormalStorageIncomeDeclare,
        }>) {
      const activePos = state.storageApproval.income.income[action.meta.declare].activePosition;

      const activeAssetRent = state.storageApproval.income.income[action.meta.declare].dataPosition
        .find(item => item.uuidDeclare === activePos)?.assetRent.activeAssetRent;

      const activeTransport = state.storageApproval.income.income[action.meta.declare].dataPosition
        .find(item => item.uuidDeclare === activePos)?.assetRent.data
        .find(i => i.uuid === activeAssetRent)?.assetDetailOther.activeOther;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(item => {
          if (item.uuidDeclare === activePos) {
            item.assetRent.data = item.assetRent.data.map(item => {
              if (item.uuid === activeAssetRent) {
                item.assetDetailOther.data = item.assetDetailOther.data.map(trans => {
                  if (trans.uuid === activeTransport) {
                    trans = {
                      ...autofillAssrentOtherApproval,
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
  autofillBussinessApproval: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeBus = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.business
        .activeBusiness;
      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.business.data = item.business.data.map((bus) => {
                if (bus.uuid === activeBus) {
                  bus = {
                    ...autofillBussinessApproval,
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
  autofillCompanyApproval: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeBus = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.company
        .activeCompany;
      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.company.data = item.company.data.map((bus) => {
                if (bus.uuid === activeBus) {
                  bus = {
                    ...autofillCompanyApproval,
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
  autofillStockApproval: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeStock = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.stock
        .activeStock;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.stock.data = item.stock.data.map((sal) => {
                if (sal.uuid === activeStock) {
                  sal = {
                    ...autofillStockApproval,
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
  autofillDepositApproval: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeDe = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.deposit
        .activeDeposit;
      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.deposit.data = item.deposit.data.map((st) => {
                if (st.uuid === activeDe) {
                  st = {
                    ...autofillDepositApproval,
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
  /////////////autofillPensionApproval////////////
  //////////////////////////////////////

  autofillPensionApproval: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.pension = {
                ...autofillPensionApproval,
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
  /////////////autofillOtherApproval/////////////
  //////////////////////////////////////

  autofillOtherApproval: {
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
        state.storageApproval.income.income[action.meta.declare].activePosition;
      const activeOther = state.storageApproval.income.income[
        action.meta.declare
      ].dataPosition.find((item) => item.uuidDeclare === activePos)?.other
        .activeOther;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
          (item) => {
            if (item.uuidDeclare === activePos) {
              item.other.data = item.other.data.map((sal) => {
                if (sal.uuid === activeOther) {
                  sal = {
                    ...autofillOtherApproval,
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

  updateAPIStorageGetIncomeApproval: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<ISourceIncomeForm, string, string>
    ) {
      const config = state.configs
      const dataBor = action?.payload?.income?.borrower;
      const dataMar = action?.payload?.income?.marriage;
      const dataCob = action?.payload?.income?.co_borrower;
      const dataCop = action?.payload?.income?.co_payer;

      const dataBalance = action?.payload?.balance;
      const dataAbility = action?.payload?.ability_to_repay; 
      const result ={
        ...state.storageApproval.income,
        income:{
          ...state?.storageApproval?.income?.income,
          borrower:{
            ...state.storageApproval.income.income.borrower,
            total_income: dataBor?.total_income,
            total_income_NVTTD: getTotalIncomeNVTTD(dataBor, config),
            dataPosition: [
              {
                uuidDeclare: dataBor?.customer_uuid,
                activeIncomeSource: "salary",
               ...getPersonIncomeDataData(dataBor, config),
              }
            ] as unknown as ILOANNormalStorageIncomeDeclareSalary[]
          },
          marriage:{
            ...state?.storageApproval?.income?.income?.marriage,
            total_income:  dataMar?.total_income,
            total_income_NVTTD: getTotalIncomeNVTTD(dataMar, config),
            total_occasional: dataMar?.total_income * 0.3,
            total_permanent: dataMar?.total_income,
            // activePosition:dataMar?.customer_type,
            dataPosition:[
              {
                uuidDeclare: dataMar?.customer_uuid,
                activeIncomeSource: "salary",
                ...getPersonIncomeDataData(dataMar, config),
              }
            ]  as unknown as ILOANNormalStorageIncomeDeclareSalary[]
          },
          coborrower: {
            ...state?.storageApproval?.income?.income?.coborrower,
            total_income:  dataCob?.total_income,
            total_income_NVTTD: (dataCob?.customer_info??[]).map((it) => getTotalIncomeNVTTD(it, config)).reduce((prev, curr) => (prev?? 0 )+ (curr?? 0), 0),
            total_occasional: dataCob?.total_income * 0.3,
            total_permanent: dataCob?.total_income,
            // activePosition:dataMar?.customer_type,
            dataPosition:(dataCob?.customer_info??[]).map((dataCob) => {
              return {
                uuidDeclare: dataCob?.customer_uuid,
                activeIncomeSource: "salary",
                ...getPersonIncomeDataData(dataCob, config)
              }
            })   as unknown as ILOANNormalStorageIncomeDeclareSalary[]
          },
          copayer:{
            ...state?.storageApproval?.income?.income?.copayer,
            total_income:  dataCop?.total_income,
            total_income_NVTTD: (dataCop?.customer_info ?? [])?.map((it) => getTotalIncomeNVTTD(it, config)).reduce((prev, curr) => (prev?? 0 )+ (curr?? 0), 0),
            total_occasional: dataCop?.total_income * 0.3,
            total_permanent: dataCop?.total_income,
            activePosition: dataCop?.customer_info?.length > 0 ? dataCop?.customer_info[0]?.uuid : "-",
            dataPosition:(dataCop?.customer_info ?? [])?.map((dataCop, idx) =>{
              return {
                uuidDeclare: dataCop?.customer_uuid,
                activeIncomeSource: "salary",
                ...getPersonIncomeDataData(dataCop, config)
              }
            }) as unknown as ILOANNormalStorageIncomeDeclareSalary[]
          }
        },
        balance:dataBalance,
        ability:dataAbility,
      };
      state.storageApproval.income = result;
    },
    prepare(payload: ISourceIncomeForm, meta: string) {
      return { payload, meta };
    },
  },
  updateDataIncomeBalanceAbilityApproval: {
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
      // state.storageApproval.income.balance.totalIncome = _.get(balanceData,'total_income.value',0);
      // state.storageApproval.income.balance.permanentIncomeAmount = _.get(balanceData,'permanent_income_amount.value',0);
      // state.storageApproval.income.balance.occasionalIncomeAmount = _.get(balanceData,'occasional_income_amount.value', 0);
      // state.storageApproval.income.balance.totalCost = _.get(balanceData,'total_cost.value',0);
      // state.storageApproval.income.balance.differentValue = _.get(balanceData,'different_value.value',0);
      // state.storageApproval.income.balance.familyCost = _.get(balanceData,'cost_detail.family_cost.value',0);
      // state.storageApproval.income.balance.interestPayment = _.get(balanceData,'cost_detail.interest_payment_expenses.value',0);
      // state.storageApproval.income.balance.otherCost = _.get(balanceData,'cost_detail.other_cost.value',0);

      /**
       *  mapping data Ability
      */
      //  state.storageApproval.income.ability.totalIncome = _.get(abilityToRepayData,'total_income.value',0);
      //  state.storageApproval.income.ability.totalCost = _.get(abilityToRepayData,'total_cost.value',0);
      //  state.storageApproval.income.ability.differentValue = _.get(abilityToRepayData,'net_profit.value',0);
      //  state.storageApproval.income.ability.loanAmount = _.get(abilityToRepayData,'detail.loan_amount.value',0);
      //  state.storageApproval.income.ability.gracePeriod = _.get(abilityToRepayData,'detail.grace_period.value',0);
      //  state.storageApproval.income.ability.lendingRate = _.get(abilityToRepayData,'detail.lending_rate.value',0);
      //  state.storageApproval.income.ability.costValueMax = _.get(abilityToRepayData,'detail.cost_value_max.value',0);
      //  state.storageApproval.income.ability.PNI_value = _.get(abilityToRepayData,'detail.pni_value.value',0);
      //  state.storageApproval.income.ability.DTI_value = _.get(abilityToRepayData,'detail.dti_value.value',0);
      //  state.storageApproval.income.ability.gurantee = _.get(abilityToRepayData,'detail.comment_ability_to_repay.code','');
      //  state.storageApproval.income.ability.comment = _.get(abilityToRepayData,'detail.comment', '');

    },
    prepare(payload: IIncomeSourceData, meta: string) {
      return { payload, meta };
    },
  },

  uploadFileMultiDocumentApproval(state: Draft<ILOANNormalState>, action: PayloadAction<IUploadDocument>){},

  downloadMultiFileApproval(state: Draft<ILOANNormalState>, action: PayloadAction<Document[]>){},
  downloadMultiAllFileApproval(state: Draft<ILOANNormalState>, action: PayloadAction<Document[]>){},



  setDocumentToDeclareTypeApproval: {
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

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition?.map(
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

  setDocumentAllDeclareTypeApproval: {
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
      const activePos = state.storageApproval.income.income[action.meta.declare].activePosition;

      state.storageApproval.income.income[action.meta.declare].dataPosition =
        state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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

  setIncomeSourceApprovalDocumentData: {
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
      const activePos = state.storageApproval.income.income[action.meta.declare].activePosition;


      switch(action.meta.activeType){
        case "salary":
          const activeSal = state.storageApproval.income.income[
            action.meta.declare
          ].dataPosition.find((item) => item.uuidDeclare === activePos)?.salary?.activeSalary;
      
          state.storageApproval.income.income[action.meta.declare].dataPosition =
            state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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
            state.storageApproval.income.income[action.meta.declare].dataPosition = state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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
            const activeBus = state.storageApproval.income.income[
              action.meta.declare
            ].dataPosition.find((item) => item.uuidDeclare === activePos)?.business?.activeBusiness;
        
            state.storageApproval.income.income[action.meta.declare].dataPosition =
              state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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
              const activeCom = state.storageApproval.income.income[
                action.meta.declare
              ].dataPosition.find((item) => item.uuidDeclare === activePos)?.company?.activeCompany;
              state.storageApproval.income.income[action.meta.declare].dataPosition =
                state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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
                const activeSto = state.storageApproval.income.income[
                  action.meta.declare
                ].dataPosition.find((item) => item.uuidDeclare === activePos)?.stock?.activeStock;
                state.storageApproval.income.income[action.meta.declare].dataPosition =
                  state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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
                  const activeDepo = state.storageApproval.income.income[
                    action.meta.declare
                  ].dataPosition.find((item) => item.uuidDeclare === activePos)?.deposit?.activeDeposit;
                  state.storageApproval.income.income[action.meta.declare].dataPosition =
                    state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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
                    state.storageApproval.income.income[action.meta.declare].dataPosition =
                      state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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
                  const activeOther = state.storageApproval.income.income[
                    action.meta.declare
                  ].dataPosition.find((item) => item.uuidDeclare === activePos)?.other?.activeOther;
                  state.storageApproval.income.income[action.meta.declare].dataPosition =
                    state.storageApproval.income.income[action.meta.declare].dataPosition.map(
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

  mapUploadDocumentDataApproval: {
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
      const activePos = state.storageApproval.income.income[action.meta.declare].activePosition;

      switch(action.meta.activeType){
        case "salary":
          state.storageApproval.income.income[action.meta.declare].dataPosition =
            state.storageApproval.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.salary.data = item.salary.data.map((sal) => {
                    if (sal.uuid === action.meta.activeAssigDocument) {
                      sal.documents = sal.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = [
                            ...dc.data_file.filter(df => df.is_update), 
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
          state.storageApproval.income.income[action.meta.declare].dataPosition =
            state.storageApproval.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.assetRent.data = item.assetRent.data.map((bu) => {
                    if (bu.uuid === action.meta.activeAssigDocument) {
                     
                      if(action.meta.assetType === "TRANSPORT"){
                        bu.assetDetailTransport.data = bu.assetDetailTransport.data.map(res => {
                          if(res.uuid === action.meta.activeAssigDocument){
                            res.documents = res.documents.map(doc => {
                              doc.data_file = [
                                ...doc.data_file.filter(df => df.is_update), 
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
                                ...doc.data_file.filter(df => df.is_update), 
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
                                ...doc.data_file.filter(df => df.is_update), 
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
          state.storageApproval.income.income[action.meta.declare].dataPosition =
            state.storageApproval.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.business.data = item.business.data.map((bu) => {
                    if (bu.uuid === action.meta.activeAssigDocument) {
                      bu.documents = bu.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = [
                            ...dc.data_file.filter(df => df.is_update), 
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
          state.storageApproval.income.income[action.meta.declare].dataPosition =
            state.storageApproval.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.company.data = item.company.data.map((com) => {
                    if (com.uuid === action.meta.activeAssigDocument) {
                      com.documents = com.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = [
                            ...dc.data_file.filter(df => df.is_update), 
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
          state.storageApproval.income.income[action.meta.declare].dataPosition =
            state.storageApproval.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.stock.data = item.stock.data.map((sto) => {
                    if (sto.uuid === action.meta.activeAssigDocument) {
                      sto.documents = sto.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = [
                            ...dc.data_file.filter(df => df.is_update), 
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
          state.storageApproval.income.income[action.meta.declare].dataPosition =
            state.storageApproval.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.deposit.data = item.deposit.data.map((dep) => {
                    if (dep.uuid === action.meta.activeAssigDocument) {
                      dep.documents = dep.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = [
                            ...dc.data_file.filter(df => df.is_update), 
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
          state.storageApproval.income.income[action.meta.declare].dataPosition =
            state.storageApproval.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.pension.documents = item.pension.documents.map(dc => {
                    if (dc.document_id === action.meta.document_id){
                      dc.data_file = [
                        ...dc.data_file.filter(df => df.is_update), 
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
          state.storageApproval.income.income[action.meta.declare].dataPosition =
            state.storageApproval.income.income[action.meta.declare].dataPosition.map(
              (item) => {
                if (item.uuidDeclare === activePos) {
                  item.other.data = item.other.data.map((ot) => {
                    if (ot.uuid === action.meta.activeAssigDocument) {
                      ot.documents = ot.documents.map(dc => {
                        if (dc.document_id === action.meta.document_id){
                          dc.data_file = [
                            ...dc.data_file.filter(df => df.is_update), 
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
 

  syncDataIncomeApprovalAfterSave:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {data: any}
      >
    ) {
      state.storageApproval.income.validate.valid = true;
      const declareActive = state.storageApproval.income.declareActive as keyof ILOANNormalStorageIncomeDeclare;
      const declareActivePerson = state.storageApproval.income.income[declareActive];
      const activePositionItem = declareActivePerson.dataPosition.find(item=>item.uuidDeclare==declareActivePerson.activePosition);

      if(activePositionItem){
        switch(action.payload){
          case 'salary':{
            const resData:IncomeType.ISalaryRes = action.meta.data;
            resData?.salaries?.map(sal=>{
              const current = activePositionItem?.salary?.data?.find(item=>item.uuid.includes(sal.uuid));
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
            let idx = activePositionItem.business.data.findIndex(it=>activePositionItem.business?.activeBusiness?.includes(it.uuid));
            if(idx!==-1){
              activePositionItem.business.activeBusiness = activePositionItem?.business?.data[idx]?.uuid;
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
            let idx = activePositionItem.assetRent.data.findIndex(it=>activePositionItem.assetRent?.activeAssetRent?.includes(it.uuid));
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
            let idx = activePositionItem.company.data.findIndex(it=>activePositionItem.company?.activeCompany?.includes(it.uuid));
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
            let idx = activePositionItem.stock.data.findIndex(it=>activePositionItem.stock?.activeStock?.includes(it.uuid));
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
            let idx = activePositionItem.deposit.data.findIndex(it=>activePositionItem.deposit?.activeDeposit?.includes(it.uuid));
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
            activePositionItem.pension.uuid=resData.uuid;
            break;
          }
          case 'other':{
            const resData:IncomeType.IOtherIncomeRes = action.meta.data;
            resData?.income_other?.map((ot)=>{
              const current = activePositionItem.other.data.find(item=>item.uuid.includes(ot.uuid));
              if(current) current.uuid = ot.uuid;
            });
            let idx = activePositionItem.other.data.findIndex(it=>activePositionItem.other?.activeOther?.includes(it.uuid));
            if(idx!==-1){
              activePositionItem.other.activeOther= activePositionItem.other?.data[idx]?.uuid;
            }else{
              const length = activePositionItem.other.data?.length;
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
  updateBusinessCostDetail: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string, {
        declare: string,
        customer_uuid: string,
        cost_uuid: string
      }
      >
    ) {
      

      switch (action.meta.declare) {
        case "borrower":
          if(state.storageApproval?.income?.balance?.financial_situation_of_customer.total_cost?.borrower?.loan_repayment_costs?.detail){
            state.storageApproval.income.balance.financial_situation_of_customer.total_cost.borrower.loan_repayment_costs.detail 
              = state.storageApproval.income.balance.financial_situation_of_customer.total_cost?.borrower?.loan_repayment_costs.detail.map(detail => {
              if(detail.uuid === action.meta.cost_uuid){
                return {
                  ...detail,
                  value_by_business_household: Number(action.payload)
                }
              }
              else return {...detail}
            })
            state.storageApproval.income.balance.financial_situation_of_customer.total_cost.borrower.loan_repayment_costs.value_by_business_household =  state.storageApproval.income.balance.financial_situation_of_customer.total_cost.borrower.loan_repayment_costs.detail.reduce((prev, next) => {
              return prev + (next?.value_by_business_household ?? 0)
            },0 )
            state.storageApproval.income.balance.financial_situation_of_customer.total_cost.borrower.value_by_business_household = state.storageApproval.income.balance.financial_situation_of_customer.total_cost.borrower.loan_repayment_costs.value_by_business_household 
            
          }
          
          break;
        case "marriage":
          if(state.storageApproval?.income?.balance?.financial_situation_of_customer.total_cost?.marriage?.loan_repayment_costs?.detail){
            state.storageApproval.income.balance.financial_situation_of_customer.total_cost.marriage.loan_repayment_costs.detail 
              = state.storageApproval.income.balance.financial_situation_of_customer.total_cost?.marriage?.loan_repayment_costs.detail.map(detail => {
              if(detail.uuid === action.meta.cost_uuid){
                return {
                  ...detail,
                  value_by_business_household: Number(action.payload)
                }
              }
              else return {...detail}
            })
            state.storageApproval.income.balance.financial_situation_of_customer.total_cost.marriage.loan_repayment_costs.value_by_business_household =  state.storageApproval.income.balance.financial_situation_of_customer.total_cost.marriage.loan_repayment_costs.detail.reduce((prev, next) => {
              return prev + (next?.value_by_business_household ?? 0)
            },0 )
            state.storageApproval.income.balance.financial_situation_of_customer.total_cost.marriage.value_by_business_household = state.storageApproval.income.balance.financial_situation_of_customer.total_cost.marriage.loan_repayment_costs.value_by_business_household 
            
          }
          break;
        case "co_borrower":
          if(state.storageApproval?.income?.balance?.financial_situation_of_customer.total_cost?.co_borrower?.customer_info){
            state.storageApproval.income.balance.financial_situation_of_customer.total_cost.co_borrower.customer_info 
              = state.storageApproval.income.balance.financial_situation_of_customer.total_cost?.co_borrower?.customer_info?.map(customer => {
                if(customer.customer_uuid === action.meta.customer_uuid){
                  return {
                    ...customer,
                    loan_repayment_costs: {
                      ...customer.loan_repayment_costs,
                      detail: customer.loan_repayment_costs.detail.map(detail => {
                        if(detail.uuid === action.meta.cost_uuid){
                          return {
                            ...detail,
                            value_by_business_household: Number(action.payload)
                          }
                        }
                        else return {...detail}})
                    }
                  }
                } else return {...customer}
              })
              
              state.storageApproval.income.balance.financial_situation_of_customer.total_cost.co_borrower.customer_info 
              = state.storageApproval.income.balance.financial_situation_of_customer.total_cost?.co_borrower?.customer_info?.map(customer => {
                if(customer.customer_uuid === action.meta.customer_uuid){
                  return {
                    ...customer,
                    loan_repayment_costs: {
                      ...customer.loan_repayment_costs,
                      value_by_business_household: customer.loan_repayment_costs.detail.reduce((prev, next) => {
                        return prev + (next?.value_by_business_household  ?? 0)
                      },0)
                    }
                  }
                } else return {...customer}
              })

            state.storageApproval.income.balance.financial_situation_of_customer.total_cost.co_borrower.customer_info = 
              state.storageApproval.income.balance.financial_situation_of_customer.total_cost.co_borrower.customer_info.map(customer => ({
                ...customer,
                value_by_business_household: customer.loan_repayment_costs.value_by_business_household
              }))

            state.storageApproval.income.balance.financial_situation_of_customer.total_cost.co_borrower.value_by_business_household = 
              state.storageApproval.income.balance.financial_situation_of_customer.total_cost.co_borrower.customer_info.reduce((prev, next) => {
                return prev + (next?.value_by_business_household ?? 0)
              },0)
            
          }
        break;
        // case "co_payer":
        //   if(state.storageApproval?.income?.balance?.financial_situation_of_customer.total_cost?.co_payer?.customer_info){
        //     state.storageApproval.income.balance.financial_situation_of_customer.total_cost.co_payer.customer_info 
        //       = state.storageApproval.income.balance.financial_situation_of_customer.total_cost?.co_payer?.customer_info?.map(customer => {
        //         if(customer.customer_uuid === action.meta.customer_uuid){
        //           return {
        //             ...customer,
        //             loan_repayment_costs: {
        //               ...customer.loan_repayment_costs,
        //               detail: customer.loan_repayment_costs.detail.map(detail => {
        //                 if(detail.uuid === action.meta.cost_uuid){
        //                   return {
        //                     ...detail,
        //                     value_by_business_household: Number(action.payload)
        //                   }
        //                 }
        //                 else return {...detail}})
        //             }
        //           }
        //         } else return {...customer}
        //       })
              
        //       state.storageApproval.income.balance.financial_situation_of_customer.total_cost.co_payer.customer_info 
        //       = state.storageApproval.income.balance.financial_situation_of_customer.total_cost?.co_payer?.customer_info?.map(customer => {
        //         if(customer.customer_uuid === action.meta.customer_uuid){
        //           return {
        //             ...customer,
        //             loan_repayment_costs: {
        //               ...customer.loan_repayment_costs,
        //               value_by_business_household: customer.loan_repayment_costs.detail.reduce((prev, next) => {
        //                 return prev + (next?.value_by_business_household  ?? 0)
        //               },0)
        //             }
        //           }
        //         } else return {...customer}
        //       })

        //     state.storageApproval.income.balance.financial_situation_of_customer.total_cost.co_payer.customer_info = 
        //       state.storageApproval.income.balance.financial_situation_of_customer.total_cost.co_payer.customer_info.map(customer => ({
        //         ...customer,
        //         value_by_business_household: customer.loan_repayment_costs.value_by_business_household
        //       }))

        //     state.storageApproval.income.balance.financial_situation_of_customer.total_cost.co_payer.value_by_business_household = 
        //       state.storageApproval.income.balance.financial_situation_of_customer.total_cost.co_payer.customer_info.reduce((prev, next) => {
        //         return prev + (next?.value_by_business_household ?? 0)
        //       },0)
            
        //   }
        // break;
        default:
          break;
      }
      
      if(state.storageApproval.income.balance.financial_situation_of_customer.total_cost?.value_by_business_household){
        const totalCost = state.storageApproval.income.balance.financial_situation_of_customer.total_cost
        state.storageApproval.income.balance.financial_situation_of_customer.total_cost.value_by_business_household 
        = (totalCost?.borrower?.value_by_business_household ?? 0) + (totalCost?.marriage?.value_by_business_household ?? 0) + (totalCost?.co_borrower?.value_by_business_household ?? 0) + (totalCost?.other_cost_by_business_household ?? 0)
      }
      
    },
    prepare(
      payload: string,
      meta: {  declare: string,
        customer_uuid: string,
        cost_uuid: string }
    ) {
      return { payload, meta };
    },
  },
};

