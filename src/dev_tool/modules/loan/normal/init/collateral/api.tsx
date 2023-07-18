import _ from "lodash";
import { ILOANNormalConfigState } from "types/models/loan/normal/configs";
import { ILOANNormalFullState } from "types/models/loan/normal/storage";
import { ILOANNormalStorageIncomeAssetRent, ILOANNormalStorageIncomeDeclare, ILOANNormalStorageIncomeState } from "types/models/loan/normal/storage/Income";
import { ILOANNormalStorageLegalState } from "types/models/loan/normal/storage/Legal";
import { ILOANNormalStorageLOANState } from "types/models/loan/normal/storage/LOAN";
import { IMasterData } from "types/models/master-data";
import { calcInputNumber, formatPath, getUuidRemovePrefix } from "utils";
import { apiGet, apiPost, apiDelete } from "utils/api";

export const saveINCOMESalary = ( 
  incomeStorage: ILOANNormalStorageIncomeState,
  loanStorage: ILOANNormalStorageLOANState,
  legalState: ILOANNormalStorageLegalState,
  fullState: ILOANNormalFullState,
  config: ILOANNormalConfigState,
  los_uuid: string,
  master: IMasterData,
  incomeType:string,
  per:string, // meta action
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare ; 
  let person_uuid: string = "";

  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }

  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }

  else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }

  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);

  const bodySalary = {
    income_type: {
      id: "SALARY",
      name: "Nguồn lương"
    },
    total_income_from_salary_source: {
      id: 1,
      name: "VNĐ",
      value: calcInputNumber(dataPersonUUID?.salary.total_income_from_salary_source ?? 0),
    },
    permanent_income_amount: {
      id: 5,
      name: "VNĐ",
      value: calcInputNumber(dataPersonUUID?.salary.permanent_income_amount ?? 0),
    },
    occasional_income_amount: {
      id: "6",
      name: "VNĐ",
      value: calcInputNumber(dataPersonUUID?.salary.occasional_income_amount ?? 0),
    },
    salaries:dataPersonUUID?.salary.data.map((sal,idx)=>({
        uuid:getUuidRemovePrefix(sal.uuid),
        name: `Nguồn lương ${idx +1}`,
        display_order:idx+1,
        company_info:{
          business_field:{
            id:sal.career,
            name: master.careers.data.find(item=>item.id===sal.career)?.name|| '',
          }, 
          business_fullname:((master.businessType[sal?.areaActivity ?? ""]?.data?.find(item=>item.code === sal?.companyType)?.name ?? "") + " " + sal?.companyName) ?? "",
          business_group:{
            id:sal.areaActivity,
            name: master.businessTypeSh.data.find(item=>item.id === sal.areaActivity)?.name || '',
          },
          business_name:sal?.companyName,
          business_type:{
            id:sal.companyType,
            name: master.businessType[sal.areaActivity ?? ""]?.data?.find(item=>item.id === sal.companyType)?.name ??  '',
          },
          contract_type:{
            id:sal.contractType,
            name:master.contractTerm.data.find(item=>item.id===sal.contractType)?.name|| ''
          },
          frequency_type:{
            id:sal.frequency,
            name:master.frequence.data.find(item=>item.id===sal.frequency)?.name|| ''
          },
          income_from_salary: {
            id: '14',
            name: "VNĐ",
            value: sal.frequency === "FREQ" ? calcInputNumber(sal.salary ?? 0) : calcInputNumber((sal.salary ?? 0) * 0.3)
          },
          income_ratio: {
            id: 1,
            name: "%",
            value: sal.frequency === "FREQ" ? 100 : 30.0
          },
          method_payment:{
            id:sal.receivedMethod,
            name:master.methodReceiveSalary.data.find(item=>item.id===sal.receivedMethod)?.name || '',
          },
          salary:{
            id: '14',
            name: "VNĐ",
            value: sal.salary
          },
          start_working:(sal.startDate ?? 0 )/1000,
          work_experience:{
            id: '14',
            name: "năm",
            value:sal.years || 0
          },
        },
        documents: sal.documents?.map((dos,idxDocs)=>{
          if(dos.data_file.length > 0){
            return{
            document_id: dos.document_id,
            document_name: dos.document_name,
            document_type: dos.document_type,
            data_file:dos.data_file?.map(dataF =>({
              content_type: dataF.content_type,
              created_at: dataF.created_at,
              created_by: dataF.created_by,
              custom_keys: dataF.custom_keys,
              description: dataF.description ?? null,
              display_order: dataF.display_order ?? null,
              name: dataF.name,
              updated_at: dataF.updated_at,
              updated_by: dataF.updated_by,
              uuid: dataF.uuid
            }))
          }
        }
       

        return dos
       })
        // documents:[]
      }))
  }
  if(bodySalary.salaries?.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-salary/:person_uuid", los_uuid, per)); // change api step 2
  }
  return apiPost<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-salary/:person_uuid", los_uuid, per), bodySalary);// change api step 2
};

export const saveINCOMEAssrentRent = (
  incomeStorage: ILOANNormalStorageIncomeState,
  loanStorage: ILOANNormalStorageLOANState,
  legalState: ILOANNormalStorageLegalState,
  fullState: ILOANNormalFullState,
  config: ILOANNormalConfigState,
  los_uuid: string,
  master: IMasterData,
  incomeType:string,
  per:string, // meta action
) => {


  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare ; // declare active 
  let person_uuid: string = "";
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }
  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }
  else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }

  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);
  const findLocation = (proviceCode?: string, districCode?: string, wardCode?: string) => {
    const prv = master.province.data.find(p => p.id === proviceCode);
    const dst = master.district[prv?.id as string]?.data.find(d => d.id === districCode);
    const wrd = master.ward[dst?.id as string]?.data.find(w => w.id === wardCode);
    return {
      province: proviceCode ? {province_code:prv?.id,province_name:prv?.name} : {},
      district: districCode ? {district_code:dst?.id,district_name:dst?.name} : {},
      ward: wardCode ? {ward_code:wrd?.id,ward_name:wrd?.name} : {}
    }
  }

  const getRentalData =(ren: ILOANNormalStorageIncomeAssetRent)=>{
    switch (ren.assetType){
      case 'REAL_ESTATE':{
        return (
          {
            asset_type: {
              id: "REAL_ESTATE",
              name: "Bất động sản"
            },
            total_income_from_rental_real_estate: {
              id:"VND",
              name:"VND",
              value: calcInputNumber(ren.assetDetailRealEstate.total_income_from_rental_real_estate ?? 0)
            },
            real_estates: ren.assetDetailRealEstate.data?.map((real,idx)=>{
              return ({
              uuid:getUuidRemovePrefix(real.uuid),
              display_order: idx + 1,
              name: `bất động sản ${idx+1}`,
              real_estate_info: {
                  address: real.location,
                  province_id: findLocation(real.province).province,
                  district_id: findLocation(real.province, real.district).district,
                  ward_id: findLocation(real.province, real.district, real.ward).ward,
                  owned_status: {
                      code: real.owned_status,
                      name: master.rentalOwnerProperty.data.find(item=>item.code ===real.owned_status)?.name
                  },
                  note: _.get(real,'description',null),
                  frequency_type: {
                    id: real.frequency_type,
                    name:real.frequency_type === "FREQ" ? "Thường xuyên" : "Không thường xuyên"
                  },
                  income_ratio: {
                    id: 1,
                    name: "%",
                    value: real.frequency_type === "FREQ" ? 100 : 30.0
                  },
                  price: {
                      id:"VND",
                      name: "VNĐ",
                      value: real.price
                  },
                  income_from_real_estate: {
                    id:"VND",
                    name: "VNĐ",
                    value: real.frequency_type === "FREQ" ? real.price : calcInputNumber((real.price ?? 0) * 0.3)
                  }
              },
              documents: real.documents?.map((dos,idxDocs)=>{
                if(dos.data_file.length > 0){
                  return{
                  document_id: dos.document_id,
                  document_name: dos.document_name,
                  document_type: dos.document_type,
                  data_file:dos.data_file?.map(dataF =>({
                    content_type: dataF.content_type,
                    created_at: dataF.created_at,
                    created_by: dataF.created_by,
                    custom_keys: dataF.custom_keys,
                    description: dataF.description ?? null,
                    display_order: dataF.display_order ?? null,
                    name: dataF.name,
                    updated_at: dataF.updated_at,
                    updated_by: dataF.updated_by,
                    uuid: dataF.uuid
                  }))
                }
              }
              return dos
              })
            })}),
          } 
        )
      }
      case 'TRANSPORT':{
        return ({
          asset_type: {
            id: "TRANSPORT",
            name: "Phương Tiện vận tải"
          },
          total_income_from_rental_vehicles: {
            id:"VND",
            name:"VND",
            value: calcInputNumber(ren.assetDetailTransport.total_income_from_transport ?? 0)
          },  
          asset_transportations:ren.assetDetailTransport.data.map((tran,idx)=>({
            uuid:getUuidRemovePrefix(tran.uuid),
            display_order: idx + 1,
            name: `Phương tiện vận tải ${idx +1}`,
            transportation_info: {
                license_number: tran.registrationPlate,
                owned_status: {
                  code: tran.owned_status,
                  name: master.rentalOwnerProperty.data.find(item=>item.code === tran.owned_status)?.name
                },
                frequency_type: {
                  id: tran.frequency_type,
                  name:tran.frequency_type === "FREQ" ? "Thường xuyên" : "Không thường xuyên"
                },
                income_ratio: {
                  id: 1,
                  name: "%",
                  value: tran.frequency_type === "FREQ" ? 100 : 30.0
                },
                price: {
                    id:"VND",
                    name:"VND",
                    value: tran.price,
                },
                income_from_rental_vehicles: {
                    id:"VND",
                    name:"VND",
                    value: tran.frequency_type === "FREQ" ? tran.price : calcInputNumber((tran.price ?? 0) * 0.3)
                }
            },
            documents: tran.documents?.map((dos,idxDocs)=>{
              if(dos.data_file.length > 0){
                return{
                document_id: dos.document_id,
                document_name: dos.document_name,
                data_file:dos.data_file?.map(dataF =>({
                  content_type: dataF.content_type,
                  created_at: dataF.created_at,
                  created_by: dataF.created_by,
                  custom_keys: dataF.custom_keys,
                  description: dataF.description ?? null,
                  display_order: dataF.display_order ?? null,
                  name: dataF.name,
                  updated_at: dataF.updated_at,
                  updated_by: dataF.updated_by,
                  uuid: dataF.uuid
                }))
              }
            }
            return dos
            })
          }))
        });
      }
      case 'OTHER':{
        return ({ 
          asset_type: {
            id: "OTHER",
            name: "Khác"
          },
          total_income_from_other_assets: {
            id:"12",
            name:"VND",
            value: calcInputNumber(ren.assetDetailOther.total_income_from_other ?? 0)
          },
          other_assets: ren.assetDetailOther.data.map((othe,idx)=>({
            uuid:getUuidRemovePrefix(othe.uuid),
            display_order: idx + 1,
            name: `tài sản ${idx +1}`,
            other_assets_info: {
              license: othe.idAssetRent,
              owned_status: {
                code: othe.owned_status,
                name: master.rentalOwnerProperty.data.find(item=>item.code === othe.owned_status)?.name
              },
              frequency_type: {
                id: othe.frequency_type,
                name:othe.frequency_type === "FREQ" ? "Thường xuyên" : "Không thường xuyên"
              },
              income_ratio: {
                  id: 1,
                  name: "%",
                  value: othe.frequency_type === "FREQ" ? 100 : 30.0
              },
              price: {
                  id:"VND",
                  name:"VND",
                  value: othe.price
              },
              income_from_other_assets: {
                  id:"VND",
                  name:"VND",
                  value: othe.frequency_type === "FREQ" ? othe.price : calcInputNumber((othe.price ?? 0) * 0.3)
              }
          },
            documents: othe.documents?.map((dos,idxDocs)=>{
              if(dos.data_file.length > 0){
                return{
                document_id: dos.document_id,
                document_name: dos.document_name,
                data_file:dos.data_file?.map(dataF =>({
                  content_type: dataF.content_type,
                  created_at: dataF.created_at,
                  created_by: dataF.created_by,
                  custom_keys: dataF.custom_keys,
                  description: dataF.description ?? null,
                  display_order: dataF.display_order ?? null,
                  name: dataF.name,
                  updated_at: dataF.updated_at,
                  updated_by: dataF.updated_by,
                  uuid: dataF.uuid
                }))
              }
            }
           return dos
          })
          }))
        });
      }
      default:{
        return ({ 
          asset_type: {
            id: "",
            name: ""
          },
          total_income_from_rental_real_estate: {
            id:"VND",
            name:"VND",
            value: 0
          },
          real_estates:[],
          total_income_from_rental_vehicles: {
            id:"VND",
            name:"VND",
            value: 0
          },  
          asset_transportations:[],
          total_income_from_other_assets: {
            id:"12",
            name:"VND",
            value:0,
          },
          other_assets: [],
          documents:[],
        });
      };
    }
  }
  const bodyAssrent = {
    income_type: {
      id: "ASSET_RENT",
      name: "Cho thuê tài sản"
    },
    total_income_from_property_rental: {
      id:12,
      name:"VND",
      value: calcInputNumber(dataPersonUUID?.assetRent.total_income_from_property_rental ?? 0)
    },
    permanent_income_amount: {
      id:"12",
      name:"VND",
      value: calcInputNumber(dataPersonUUID?.assetRent.permanent_income_amount ?? 0)
    },
    occasional_income_amount: {
        id:"12",
        name:"VND",
        value: calcInputNumber(dataPersonUUID?.assetRent.occasional_income_amount ?? 0)
    },
    rental_properties:dataPersonUUID?.assetRent.data?.map((ren,idx)=>{
      return{
        uuid:getUuidRemovePrefix(ren.uuid),
        display_order:idx +1,
        name:`tai san cho thue ${idx +1}`,
        rental_property_info:getRentalData(ren),
    }
    })
  }
  if(bodyAssrent.rental_properties?.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-asset-rent/:person_uuid", los_uuid,per));  
  }
  return apiPost<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-asset-rent/:person_uuid", los_uuid,per), bodyAssrent);
};

export const saveINCOMEBusiness = (
  incomeStorage: ILOANNormalStorageIncomeState,
  loanStorage: ILOANNormalStorageLOANState,
  legalState: ILOANNormalStorageLegalState,
  fullState: ILOANNormalFullState,
  config: ILOANNormalConfigState,
  los_uuid: string,
  master: IMasterData,
  incomeType:string,
  per:string, // meta action
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare ; 
  let person_uuid: string = "";

  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }

  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }

  else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }

  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);
  
  const bodyBusiness = {
    income_type: {
      id: "BUSINESS",
      name: "Hoạt động của hộ kinh doanh"
    },
    total_income_from_business_activities:{
      id:27,
      name:"VNĐ",
      value: calcInputNumber(dataPersonUUID?.business.total_income_from_business_activities ?? 0)
    },
    permanent_income_amount: {
      id: "28",
      name: "VNĐ",
      value: calcInputNumber(dataPersonUUID?.business.permanent_income_amount ?? 0)
    },
    occasional_income_amount: {
      id: "29",
      name: "VNĐ",
      value: calcInputNumber(dataPersonUUID?.business.occasional_income_amount ?? 0)
    },
    business_households: dataPersonUUID?.business?.data?.map((item, idx)=>({
        uuid:getUuidRemovePrefix(item.uuid),
        name: `Hộ kinh doanh ${idx+1}`,
        display_order: idx+1,
        business_household_info: {
          business_household_type: {
            id: master.businessRepresentation.data.find(i=>i.code === item.representative)?.id,
            name:master.businessRepresentation.data.find(i=>i.code === item.representative)?.name
          },
          business_name: item.name,
          business_working_time: {
            id: "41",
            name: "tháng",
            value: item.workingTime,
          },
          frequency_type: {
            id: item.frequency,
            name: item.frequency === "FREQ" ? "Thường xuyên" : "Không thường xuyên"
          },
          income_ratio: {
            id: 1,
            name: "%",
            value: item.frequency === "FREQ" ? 100 : 30.0
          },
          gross_revenue: {
            id: "43",
            name: "VNĐ",
            value: item.turnover 
          },
          cost: {
            id: "44",
            name: "VNĐ",
            value: item.cost 
          },
          profit: {
            id: "45",
            name: "VNĐ",
            value: item.frequency === "FREQ" ? ((item.turnover ?? 0)- ( item.cost ?? 0)) : calcInputNumber(((item.turnover ?? 0)- ( item.cost ?? 0))*0.3)
          },
          income_from_household_business_activities: {
            id: "46",
            name: "VNĐ",
            value: item.frequency === "FREQ" ? ((item.turnover ?? 0)- ( item.cost ?? 0)) : calcInputNumber(((item.turnover ?? 0)- ( item.cost ?? 0))*0.3)
          },
        },
        documents: item.documents?.map((dos,idxDocs)=>{
          if(dos.data_file.length > 0){
            return{
            document_id: dos.document_id,
            document_name: dos.document_name,
            document_type: dos.document_type,
            data_file:dos.data_file?.map(dataF =>({
              content_type: dataF.content_type,
              created_at: dataF.created_at,
              created_by: dataF.created_by,
              custom_keys: dataF.custom_keys,
              description: dataF.description ?? null,
              display_order: dataF.display_order ?? null,
              name: dataF.name,
              updated_at: dataF.updated_at,
              updated_by: dataF.updated_by,
              uuid: dataF.uuid
            }))
          }
        }
        return dos
        })
      }))
    }
    if(bodyBusiness.business_households?.length === 0){
      return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-business-household/:person_uuid", los_uuid,per));    
    }
  return apiPost<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-business-household/:person_uuid", los_uuid,per), bodyBusiness);
};

export const saveINCOMECompany = (
  incomeStorage: ILOANNormalStorageIncomeState,
  loanStorage: ILOANNormalStorageLOANState,
  legalState: ILOANNormalStorageLegalState,
  fullState: ILOANNormalFullState,
  config: ILOANNormalConfigState,
  los_uuid: string,
  master: IMasterData,
  incomeType:string,
  per:string
) => {


  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare; // declare active 
  let person_uuid: string = "";
  
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }
  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }
  else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }

  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);
  const bodyCompany = {
      income_type: {
          id: "COMPANY",
          name: "Doanh nghiệp do khách hàng làm chủ"
      },
      total_income_from_company: {
          id: 51,
          name: "VNĐ",
          value: dataPersonUUID?.company.total_income_from_company
      },
      permanent_income_amount: {
          id: 51,
          name: "VNĐ",
          value: dataPersonUUID?.company.permanent_income_amount
      },
      occasional_income_amount: {
          id: 51,
          name: "VNĐ",
          value: dataPersonUUID?.company.occasional_income_amount
      },
      companies: dataPersonUUID?.company.data.map((co,idx)=>({
        uuid:getUuidRemovePrefix(co.uuid),
        name: `Doanh nghiệp ${idx +1}`,
        display_order: idx +1,
        company_info:{
          business_type_id: {
            id: co.type,
            name: co.type
        },
        business_name:co.name,
        business_tax: co.tax,
        business_phone: co.phone,
        business_license_date: ((co.licenseDate??0) /1000),
        profit:{
          id: 51,
          name: "VNĐ",
          value: co.profit
        },
        frequency_type: {
          id: co.frequency,
          name:co.frequency === "FREQ" ? "Thường xuyên" : "Không thường xuyên"
        },
        income_ratio: {
          id: 1,
          name: "%",
          value: co.frequency === "FREQ" ? 100 : 30
        },
        business_income_from_business_activities: {
            id: 51,
            name: "VNĐ",
            value: co.frequency === "FREQ" ? co.profit : ((co.profit ?? 0) * 0.3)
          },
        },
        documents: co.documents?.map((dos,idxDocs)=>{
          if(dos.data_file.length > 0){
            return{
            document_id: dos.document_id,
            document_name: dos.document_name,
            document_type: dos.document_type,
            data_file:dos.data_file?.map(dataF =>({
              content_type: dataF.content_type,
              created_at: dataF.created_at,
              created_by: dataF.created_by,
              custom_keys: dataF.custom_keys,
              description: dataF.description ?? null,
              display_order: dataF.display_order ?? null,
              name: dataF.name,
              updated_at: dataF.updated_at,
              updated_by: dataF.updated_by,
              uuid: dataF.uuid
            }))
          }
        }
        return dos
        })
      }))
  }
  if(bodyCompany.companies?.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-company/:person_uuid", los_uuid,per));  
  }
  return apiPost<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-company/:person_uuid", los_uuid,per), bodyCompany);
};

export const saveINCOMEStock = (
  incomeStorage: ILOANNormalStorageIncomeState,
  loanStorage: ILOANNormalStorageLOANState,
  legalState: ILOANNormalStorageLegalState,
  fullState: ILOANNormalFullState,
  config: ILOANNormalConfigState,
  los_uuid: string,
  master: IMasterData,
  incomeType:string,
  per:string
) => {

  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare; // declare active 
  let person_uuid: string = "";
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }
  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }
  else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }

  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);
  
  const bodyStock = {
      income_type: {
        id: "STOCK",
        name: "Cổ tức/Lợi nhuận"
      },
      total_income_from_stocks: {
        id: 51,
        name: "VNĐ",
        value: dataPersonUUID?.stock.total_income_from_stocks
      },
      permanent_income_amount: {
        id: 51,
        name: "VNĐ",
        value: dataPersonUUID?.stock.permanent_income_amount
      },
      occasional_income_amount: {
        id: 51,
        name: "VNĐ",
        value: dataPersonUUID?.stock.occasional_income_amount
      },
      source_income_stocks: dataPersonUUID?.stock.data.map((sto,idx)=>({
        uuid:getUuidRemovePrefix(sto.uuid),
        name: `Cổ tức/Lợi nhuận ${idx +1}`,
        display_order: idx +1,
        stock_info: {
          year: {
            id: sto.year,
            name: "nam",
            value: sto.year
          },
          count: sto.count,
          frequency_type: {
            id: sto.frequency,
            name:sto.frequency === "FREQ" ? "Thường xuyên" : "Không thường xuyên"
          },
          income_ratio: {
            id: 1,
            name: "%",
            value: sto.frequency === "FREQ" ? 100 : 30.0
          },
          profit: {
            id: 51,
            name: "VNĐ",
            value: sto.profit
          },
          income_from_stock: {
            id: 51,
            name: "VNĐ",
            value: sto.frequency === "FREQ" ? sto.profit : ((sto.profit ?? 0) * 0.3)
          }
        },
        documents: sto.documents?.map((dos,idxDocs)=>{
          if(dos.data_file.length > 0){
            return{
            document_id: dos.document_id,
            document_name: dos.document_name,
            document_type: dos.document_type,
            data_file:dos.data_file?.map(dataF =>({
              content_type: dataF.content_type,
              created_at: dataF.created_at,
              created_by: dataF.created_by,
              custom_keys: dataF.custom_keys,
              description: dataF.description ?? null,
              display_order: dataF.display_order ?? null,
              name: dataF.name,
              updated_at: dataF.updated_at,
              updated_by: dataF.updated_by,
              uuid: dataF.uuid
            }))
          }
        }
        return dos
        })
      }))
  }
  if(bodyStock.source_income_stocks?.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-stock/:person_uuid", los_uuid,per));  
  }
  return apiPost<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-stock/:person_uuid", los_uuid,per), bodyStock);
};

export const saveINCOMEPension = (
  incomeStorage: ILOANNormalStorageIncomeState,
  loanStorage: ILOANNormalStorageLOANState,
  legalState: ILOANNormalStorageLegalState,
  fullState: ILOANNormalFullState,
  config: ILOANNormalConfigState,
  los_uuid: string,
  master: IMasterData,
  incomeType:string,
  per:string
) => {

  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare; // declare active 
  let person_uuid: string = "";
  
  // Check uuid persion screen
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }
  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }
  else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }

  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);
  
  const bodyPension = {
      uuid: getUuidRemovePrefix(dataPersonUUID?.pension.uuid),
      income_type: {
        id: "PENSION",
        name: "Lương hưu trí"
      },
      total_income_from_pension: {
        id: 51,
        name: "VNĐ",
        value: dataPersonUUID?.pension.income_from_pension
      },
      permanent_income_amount: {
        id: 51,
        name: "VNĐ",
        value:  dataPersonUUID?.pension.income_from_per
      },
      occasional_income_amount: {
        id: 51,
        name: "VNĐ",
        value: dataPersonUUID?.pension.income_from_occ
      },
      pension_info:{
        license_number:dataPersonUUID?.pension.license,
        start_date:(dataPersonUUID?.pension.startDate ?? 0) /1000,
        insurance_number: dataPersonUUID?.pension.insurance,
        salary: {
          id: 51,
          name: "VNĐ",
          value: dataPersonUUID?.pension.salary,
        },
        frequency_type: {
          id: dataPersonUUID?.pension.frequency,
          name:dataPersonUUID?.pension.frequency === "FREQ" ? "Thường xuyên" : "Không thường xuyên"
        },
        income_ratio: {
          id: 1,
          name: "%",
          value: dataPersonUUID?.pension.frequency === "FREQ" ? 100 : 30.0
        },
        income_from_pension: {
          id: 51,
          name: "VNĐ",
          value: dataPersonUUID?.pension.frequency === "FREQ" ? dataPersonUUID?.pension.salary : ((dataPersonUUID?.pension.salary ?? 0) * 0.3)
        },
      },
      documents: dataPersonUUID?.pension?.documents?.map((dos,idxDocs)=>{
        if(dos.data_file.length > 0){
          return{
            document_id: dos.document_id,
            document_name: dos.document_name,
            document_type: dos.document_type,
            data_file:dos.data_file?.map(dataF =>({
              content_type: dataF.content_type,
              created_at: dataF.created_at,
              created_by: dataF.created_by,
              custom_keys: dataF.custom_keys,
              description: dataF.description ?? null,
              display_order: dataF.display_order ?? null,
              name: dataF.name,
              updated_at: dataF.updated_at,
              updated_by: dataF.updated_by,
              uuid: dataF.uuid
            }))
        }
      }
      return dos
      })
  }

  return apiPost<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-pension/:person_uuid", los_uuid,per), bodyPension);
};

export const deleteINCOMEPension = (
  incomeStorage: ILOANNormalStorageIncomeState,
  loanStorage: ILOANNormalStorageLOANState,
  legalState: ILOANNormalStorageLegalState,
  fullState: ILOANNormalFullState,
  config: ILOANNormalConfigState,
  los_uuid: string,
  master: IMasterData,
  incomeType:string,
) => {

  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare; // declare active 
  let person_uuid: string = "";
  
  // Check uuid persion screen
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }
  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }
  else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }
  
  return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-pension/:person_uuid", los_uuid,person_uuid));
};

export const saveINCOMEDeposit = (
  incomeStorage: ILOANNormalStorageIncomeState,
  loanStorage: ILOANNormalStorageLOANState,
  legalState: ILOANNormalStorageLegalState,
  fullState: ILOANNormalFullState,
  config: ILOANNormalConfigState,
  los_uuid: string,
  master: IMasterData,
  incomeType:string,
  per:string
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare ; 
  let person_uuid: string = "";

  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }

  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }

  else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }

  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);
  
  const bodyDeposit= {
    income_type: {
      id: "DIR",
      name: "Lãi tiền gửi/Giấy tờ có giá trị"
    },
    total_income_from_deposits: {
      id: 51,
      name: "VNĐ",
      value: dataPersonUUID?.deposit?.total_income_from_deposits
    },
    permanent_income_amount: {
      id: "51",
      name: "VNĐ",
      value: dataPersonUUID?.deposit?.permanent_income_amount
    },
    occasional_income_amount: {
      id: "51",
      name: "VNĐ",
      value: dataPersonUUID?.deposit?.occasional_income_amount
    },
    source_income_deposits: dataPersonUUID?.deposit?.data.map((des, idx) => ({
        uuid:getUuidRemovePrefix(des.uuid),
        name: `Lãi tiền gửi/GTCG ${idx}`,
        display_order: idx+1,
        deposit_info: {
          publish_unit_id: {
            id: master.issuer.data.find(iss=>iss.id === des.publish_unit_id)?.id,
            name:  master.issuer.data.find(iss=>iss.id === des.publish_unit_id)?.name,
          },
          account_number: des.account,
          currency_type_id: {
            id: master.currencyType.data.find(iss=>iss.code === des.currency)?.id,
            name:  master.currencyType.data.find(iss=>iss.code === des.currency)?.name,
          },
          balance: {
            id: "51",
            name: "VNĐ",
            value: des.balance,
          },
          accept_blocked_account: {
            code:  master.acceptStatus.data.find(iss=>iss.code === des.accept_blocked_account)?.id,
            name: master.acceptStatus.data.find(iss=>iss.code === des.accept_blocked_account)?.name,
          },
          term: {
            id: des.term,
            name: "tháng",
            value: des.term
          },
          profit: {
            id: "51",
            name: "VNĐ",
            value: des.profit 
          },
          frequency_type: {
            id: des.frequency,
            name: des.frequency === "FREQ" ? "Thường xuyên" : "Không thường xuyên"
          },
          income_ratio: {
            id: 1,
            name: "%",
            value: des.frequency === "FREQ" ? 100 : 30
          },
          income_from_deposits: {
            id: "51",
            name: "VNĐ",
            value: des.frequency === "FREQ" ? des.profit : ((des.profit ?? 0) * 0.3)
          }
        },
        documents: des.documents?.map((dos,idxDocs)=>{
          if(dos.data_file.length > 0){
            return{
            document_id: dos.document_id,
            document_name: dos.document_name,
            document_type: dos.document_type,
            data_file:dos.data_file?.map(dataF =>({
              content_type: dataF.content_type,
              created_at: dataF.created_at,
              created_by: dataF.created_by,
              custom_keys: dataF.custom_keys,
              description: dataF.description ?? null,
              display_order: dataF.display_order ?? null,
              name: dataF.name,
              updated_at: dataF.updated_at,
              updated_by: dataF.updated_by,
              uuid: dataF.uuid
            }))
          }
        }
        return dos
        })
    }))
  }
  if(bodyDeposit.source_income_deposits?.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-deposit/:person_uuid", los_uuid,per));
  }
  return apiPost<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-deposit/:person_uuid", los_uuid,per), bodyDeposit);
};

export const saveINCOMEOther = (
  incomeStorage: ILOANNormalStorageIncomeState,
  loanStorage: ILOANNormalStorageLOANState,
  legalState: ILOANNormalStorageLegalState,
  fullState: ILOANNormalFullState,
  config: ILOANNormalConfigState,
  los_uuid: string,
  master: IMasterData,
  incomeType:string,
  per:string
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare ; 
  let person_uuid: string = "";

  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }

  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }

  else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }

  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);
  
  const bodyOther = {
    income_type: {
      id: "OTHERS",
      name: "Nguồn thu khác"
    },
    total_income_from_other_sources: {
      id: "51",
      name: "VNĐ",
      value: dataPersonUUID?.other?.total_income_from_other_sources
    },
    permanent_income_amount: {
      id: "51",
      name: "VNĐ",
      value: dataPersonUUID?.other?.permanent_income_amount
    },
    occasional_income_amount: {
      id: "51",
      name: "VNĐ",
      value: dataPersonUUID?.other?.occasional_income_amount
    },
    income_other: dataPersonUUID?.other.data.map((oth, idx)=>({
        uuid: getUuidRemovePrefix(oth.uuid),
        name: `Nguồn thu ${idx+1}`,
        display_order: idx+1,
        income_info: {
          frequency_year: oth.frequencyYear,
          payment_method: {
            id: master.methodReceiveSalary.data.find(iss=>iss.code === oth.paymentMethod)?.id,
            name:  master.methodReceiveSalary.data.find(iss=>iss.code === oth.paymentMethod)?.name,
          },
          profit: {
            id: "51",
            name: "VNĐ",
            value: oth.profit
          },
          note: oth.note,
          frequency_type: {
            id: oth.frequency,
            name: oth.frequency === "FREQ" ? "Thường xuyên" : "Không thường xuyên"
          },
          income_ratio: {
            id: 1,
            name: "%",
            value: oth.frequency === "FREQ" ? 100 : 30
          },
          income_from_other_source: {
            id: "51",
            name: "VNĐ",
            value: oth.frequency === "FREQ" ? oth.profit : ((oth.profit ?? 0) * 0.3)
          }
        },
        documents: oth.documents?.map((dos,idxDocs)=>{
          if(dos.data_file.length > 0){
            return{
            document_id: dos.document_id,
            document_name: dos.document_name,
            document_type: dos.document_type,
            data_file:dos.data_file?.map(dataF =>({
              content_type: dataF.content_type,
              created_at: dataF.created_at,
              created_by: dataF.created_by,
              custom_keys: dataF.custom_keys,
              description: dataF.description ?? null,
              display_order: dataF.display_order ?? null,
              name: dataF.name,
              updated_at: dataF.updated_at,
              updated_by: dataF.updated_by,
              uuid: dataF.uuid
            }))
          }
        }
        return dos
        })
      })
    )
  }
  if(bodyOther.income_other?.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-other/:person_uuid", los_uuid,per));  
  }
  return apiPost<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-other/:person_uuid", los_uuid,per), bodyOther);
};

export const saveINCOMEFile = ( action: FormData) => {
  
    return apiPost<unknown>(formatPath("v2/configs/multi-upload/"), action, {
      "Content-Type": "multipart/form-data",
    });
};

export const downloadINCOMEMultiFile = (listUuid: any) => {
  const queryParameters = new URLSearchParams(listUuid.map((x: string)=>['uuids',x]));
  return apiGet<unknown>(formatPath(`v2/configs/multi-download/?${queryParameters}`));
}

export const saveINCOMEAbility = ( 
  incomeStorage: ILOANNormalStorageIncomeState,
  loanStorage: ILOANNormalStorageLOANState,
  legalState: ILOANNormalStorageLegalState,
  fullState: ILOANNormalFullState,
  config: ILOANNormalConfigState,
  los_uuid: string,
  master: IMasterData,
  incomeType:string
) => {
  const { 
    gurantee, 
    comment, 
    totalIncome, 
    DTI_value,
    PNI_value,
    costValueMax,
    differentValue,
    gracePeriod,
    lendingRate,
    loanAmount,
    totalCost
  } = incomeStorage.ability;

  const bodyAbility = {
    ability_to_repay: {
      id: "107",
      name: "Khả năng trả nợ gốc lãi"
    },
    total_income: {
      id: "51",
      name: "VNĐ",
      value: calcInputNumber(totalIncome?? 0),
    },
    total_cost: {
      id: "51",
      name: "VNĐ",
      value: calcInputNumber(totalCost || 0),
    },
    net_profit: {
      id: "51",
      name: "VNĐ",
      value: calcInputNumber(differentValue?? 0)
    },
    detail: {
      loan_amount: {
        id: "51",
        name: "VNĐ",
        value: calcInputNumber(loanAmount ?? 0)
      },
      grace_period: {
        id: "236",
        name: "tháng",
        value: calcInputNumber(gracePeriod?? 0)
      },
      lending_rate: {
        id: "56",
        name: "%/năm",
        value: calcInputNumber(lendingRate ?? 0)
      },
      cost_value_max: {
        id: "51",
        name: "VNĐ",
        value: calcInputNumber(costValueMax ?? 0)
      },
      pni_value: {
        id: "555",
        name: "PNI",
        value: calcInputNumber(PNI_value ?? 0)
      },
      dti_value: {
        id: "666",
        name: "DTI",
        value: calcInputNumber(DTI_value ?? 0)
      },
      comment_ability_to_repay: gurantee?{
        code: gurantee,
        name: _.get(master.repayPrincipalInterest.data.find(item=>item.code === gurantee),'name',''),
      }:null,
      comment: comment
    }
  }
  
  return apiPost<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-ability-to-repay/", los_uuid), bodyAbility);
}

export const saveINCOMEBalance = ( 
  incomeStorage: ILOANNormalStorageIncomeState,
  loanStorage: ILOANNormalStorageLOANState,
  legalState: ILOANNormalStorageLegalState,
  fullState: ILOANNormalFullState,
  config: ILOANNormalConfigState,
  los_uuid: string,
  master: IMasterData,
  incomeType:string
) => {
  const balance = incomeStorage.balance; 
  const total_income=balance.totalIncome??0;
  const total_cost =balance.totalCost??0;
  const occasionalIncomeAmount = balance.occasionalIncomeAmount??0;
  const permanentIncomeAmount = balance.permanentIncomeAmount??0;
  const differentValue = balance.differentValue??0;

  const bodyBalance = {
    balance_cost_income: {
      id: "106",
      name: "CÂN ĐỐI THU NHẬP CHI PHÍ"
    },
    total_income: {
      id: 51,
      name: "VNĐ",
      value: total_income,
    },
    permanent_income_amount: {
      id: "51",
      name: "VNĐ",
      value: permanentIncomeAmount,
    },
    occasional_income_amount: {
      id: "51",
      name: "VNĐ",
      value: occasionalIncomeAmount,
    },
    total_cost: {
      id: "51",
      name: "VNĐ",
      value: total_cost,
    },
    different_value: {
      id: "51",
      name: "VNĐ",
      value: differentValue,
    },
    cost_detail: {
      interest_payment_expenses: {
        id: "COST_LOAN",
        name: "VNĐ",
        value: incomeStorage?.balance?.interestPayment ?? 0
      },
      family_cost: {
        id: "COST_LIVING",
        name: "VNĐ",
        value: incomeStorage?.balance?.familyCost ?? 0
      },
      other_cost: {
        id: "COST_OTHER",
        name: "VNĐ",
        value: incomeStorage?.balance?.otherCost ?? 0
      }
    }
  }

  return apiPost<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-balance/", los_uuid), bodyBalance);
}

export const deleteIncomeSalary = (
  incomeStorage: ILOANNormalStorageIncomeState,
  fullState: ILOANNormalFullState,
  los_uuid: string,
  uuid: string
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare;
  let person_uuid: string = '';
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  } else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  } else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }
  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(x => x.uuidDeclare === person_uuid);

  if(dataPersonUUID?.salary.data.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-salary/:person_uuid", los_uuid, person_uuid));
  }
  // return apiDelete<unknown>(`v2/normal-loan/${los_uuid}/source-income/income-salary-detail/${person_uuid}?uuid=${uuid}`);
  return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-salary-detail/:person_uuid??uuid=:uuid", los_uuid, person_uuid, getUuidRemovePrefix(uuid)));
}

export const deleteIncomeAssrentRent = (
  incomeStorage: ILOANNormalStorageIncomeState,
  fullState: ILOANNormalFullState,
  los_uuid: string,
  uuid: string,
  assetRentType: string
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare;
  let person_uuid: string = '';
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  } else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  } else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }
  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(x => x.uuidDeclare === person_uuid);

  if(assetRentType === 'typeDetail'){
    return apiDelete<unknown>(`v2/normal-loan/${los_uuid}/source-income/income-asset-rent-detail/${person_uuid}?asset_rent_detail_uuid=${uuid}`);
  }
  if(dataPersonUUID?.assetRent?.data?.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-asset-rent/:person_uuid", los_uuid,person_uuid));  
  }
  return apiDelete<unknown>(`v2/normal-loan/${los_uuid}/source-income/income-asset-rent-property/${person_uuid}?property_uuid=${getUuidRemovePrefix(uuid)}`);
}

export const deleteIncomeBusiness = (
  incomeStorage: ILOANNormalStorageIncomeState,
  fullState: ILOANNormalFullState,
  los_uuid: string,
  uuid: string
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare;
  let person_uuid: string = '';
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  } else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  } else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }
  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(x => x.uuidDeclare === person_uuid);

  if(dataPersonUUID?.business?.data.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-business-household/:person_uuid", los_uuid,person_uuid));    
  }
  return apiDelete<unknown>(`v2/normal-loan/${los_uuid}/source-income/income-business-household-detail/${person_uuid}?asset_rent_uuid=${getUuidRemovePrefix(uuid)}`);
}

export const deleteIncomeCompany = (
  incomeStorage: ILOANNormalStorageIncomeState,
  fullState: ILOANNormalFullState,
  los_uuid: string,
  uuid: string
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare;
  let person_uuid: string = '';
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  } else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  } else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }
  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(x => x.uuidDeclare === person_uuid);

  if(dataPersonUUID?.company.data?.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-company/:person_uuid", los_uuid,person_uuid));  
  }
  return apiDelete<unknown>(`v2/normal-loan/${los_uuid}/source-income/income-company-detail/${person_uuid}?asset_rent_uuid=${getUuidRemovePrefix(uuid)}`);
}

export const deleteIncomeStock = (
  incomeStorage: ILOANNormalStorageIncomeState,
  fullState: ILOANNormalFullState,
  los_uuid: string,
  uuid: string
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare;
  let person_uuid: string = '';
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  } else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  } else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }
  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(x => x.uuidDeclare === person_uuid);

  if(dataPersonUUID?.stock.data.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-stock/:person_uuid", los_uuid,person_uuid));  
  }
  return apiDelete<unknown>(`v2/normal-loan/${los_uuid}/source-income/income-stock-detail/${person_uuid}?asset_rent_uuid=${getUuidRemovePrefix(uuid)}`);
}

export const deleteIncomeDeposit = (
  incomeStorage: ILOANNormalStorageIncomeState,
  fullState: ILOANNormalFullState,
  los_uuid: string,
  uuid: string
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare;
  let person_uuid: string = '';
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  } else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  } else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }
  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(x => x.uuidDeclare === person_uuid);

  if(dataPersonUUID?.deposit?.data?.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-deposit/:person_uuid", los_uuid,person_uuid));
  }
  return apiDelete<unknown>(`v2/normal-loan/${los_uuid}/source-income/income-deposit-detail/${person_uuid}?asset_rent_uuid=${getUuidRemovePrefix(uuid)}`);
}

export const deleteINCOMEOther = (
  incomeStorage: ILOANNormalStorageIncomeState,
  fullState: ILOANNormalFullState,
  los_uuid: string,
  uuid: string
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare;
  let person_uuid: string = '';
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  } else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  } else {
    person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  }
  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(x => x.uuidDeclare === person_uuid);

  if(dataPersonUUID?.other?.data?.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_uuid/source-income/income-other/:person_uuid", los_uuid,person_uuid));  
  }
  return apiDelete<unknown>(`v2/normal-loan/${los_uuid}/source-income/income-other-detail/${person_uuid}?asset_rent_uuid=${getUuidRemovePrefix(uuid)}`);
}








