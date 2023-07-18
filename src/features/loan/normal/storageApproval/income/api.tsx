import _ from "lodash";
import { ILOANNormalConfigState } from "types/models/loan/normal/configs";
import { ILOANApprovalFullState } from "types/models/loan/normal/storageApproval";
import { Document, ILOANNormalStorageIncomeAssetRent, ILOANNormalStorageIncomeDeclare, ILOANNormalStorageIncomeState, TotalCostDeclare } from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import { IMasterData } from "types/models/master-data";
import { calcInputNumber, formatPath, getUuidRemovePrefix } from "utils";
import { apiGet, apiPost, apiDelete } from "utils/api";
export const saveINCOMESalaryS2 = ( 
  incomeStorage: ILOANNormalStorageIncomeState,
  // loanStorage: ILOANNormalStorageLOANState,
  // legalState: ILOANNormalStorageLegalState,
  fullState: ILOANApprovalFullState,
  config: ILOANNormalConfigState,
  los_id: string,
  master: IMasterData,
  // incomeType:string
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare ; 

  let person_uuid: string = "";

  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }

  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }
  else if(declareActive === "borrower") {
    person_uuid = incomeStorage.income.borrower.activePosition
  }
  else {
    person_uuid = incomeStorage.income.marriage.activePosition
  }

  let dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find((item) => item.uuidDeclare === person_uuid)

const bodySalary = {
  uuid: dataPersonUUID?.salary.uuid,
  total_income_from_salary: dataPersonUUID?.salary.total_income_from_salary_NVTTD,
  permanent_income_amount: dataPersonUUID?.salary.permanent_income_amount,
  occasional_income_amount: dataPersonUUID?.salary.occasional_income_amount,
  salaries: dataPersonUUID?.salary.data.map((sal, index) => ({
      name: sal.name,
      display_order: index + 1,
      documents: sal.documents.map((doc, idx) =>  {
        if(doc.data_file.length > 0){
          return {
            document_id: doc.document_id,
            document_name: doc.document_name,
            data_file: doc.data_file?.map((dataF,idxDataF)=>({
              uuid: dataF.uuid,
              name: dataF.name,
              content_type: dataF.type,
              display_order: idxDataF + 1,
              created_by:'',
              created_at: (dataF?.create_at ?? 0)/1000,
              updated_at: (dataF?.create_at ?? 0)/1000,
              updated_by: '',
            }))
          }
        }
        else return doc
      }),
      uuid: sal.uuid,
      company_info: {
       business_type: sal.companyType,
       business_name: sal.companyName,
       business_fullname:sal.companyCate,
       business_group: sal.areaActivity,
       business_field: sal.career,
       tax: sal.tax,
       phone: sal.phone,
       title: sal.title,
       work_experience: sal.years,
       start_working: (sal.startDate?? 0)/1000,
       contract_type:sal.contractType,
       method_payment: sal.receivedMethod, 
       frequency_type: sal.frequency,
       income_ratio:  sal.frequency === "FREQ" ? 100 : 30,
       salary:  sal.salary,
       income_from_salary:  sal.incomeFromSalary,
       income_according_to_staff_rating:  sal.income_according_to_staff_rating,
       description: sal.description,
      }
    }))
}


  if(bodySalary.salaries?.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_id/source-income/income-salary/:person_uuid", los_id, person_uuid)); // change api step 2
  }
  return apiPost<unknown>(formatPath("s2/v2/approval/documents/:los_id/source-income/income-salaries/:person_uuid/", los_id, person_uuid), bodySalary);// change api step 2
};

export const saveINCOMEAssrentRentS2 = (
  incomeStorage: ILOANNormalStorageIncomeState,
  // loanStorage: ILOANNormalStorageLOANState,
  // legalState: ILOANNormalStorageLegalState,
  fullState: ILOANApprovalFullState,
  config: ILOANNormalConfigState,
  los_id: string,
  master: IMasterData,
  // incomeType:string
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare ; // declare active 
  let person_uuid: string = "";
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }
  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }
  else if(declareActive === "borrower") {
    person_uuid = incomeStorage.income.borrower.activePosition
  }
  else {
    person_uuid = incomeStorage.income.marriage.activePosition
  }
  // else {
  //   person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  // }

  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);
  const mappingDocuments = (docs:Document[])=>{
    if(!docs) return [];
    const resultData:{
      document_id: number;
      document_name: string;
      data_file: {
          uuid: any;
          name: any;
          content_type: any;
          display_order: number;
          created_by: any;
          created_at: number;
          updated_at: number;
          updated_by: any;
      }[]}[] = [];
      docs.forEach((dos,idxDocs)=>{
      if(dos.data_file.length>0){
        const result ={
          document_id: dos.document_id,
          document_name: dos.document_name,
          data_file:dos.data_file?.map((dataF,idxDataF)=>({
            uuid: dataF.uuid,
            name: dataF.name,
            content_type: dataF.type,
            display_order:idxDataF + 1,
            created_by: dataF.created_by,
            created_at: (dataF.create_at ?? 0)/1000,
            updated_at: (dataF.updated_at ?? 0)/1000,
            updated_by: dataF.updated_by,
          }))
        };
        resultData.push(result);
      }
      else return
    });
    return resultData;
  };

  const getRentalData =(ren: ILOANNormalStorageIncomeAssetRent)=>{
    switch (ren.assetType){
      case 'REAL_ESTATE':{
        return ({
          total_income_from_rental_real_estate: ren?.assetDetailRealEstate?.total_income_from_rental_real_estate ?? 0,
          asset_type: ren?.assetType,
          real_estates: ren?.assetDetailRealEstate?.data.map((item, idx)=>{
            return (
            {
              name: `Bất động sản ${idx+1}`,
              display_order: idx + 1,
              documents: mappingDocuments(item.documents),
              uuid: getUuidRemovePrefix(item.uuid),
              real_estate_info: {
                address: item.location,
                province_id: item.province,
                district_id: item.district,
                ward_id: item.ward,
                owned_status: item.owned_status,
                note: _.get(item,'description',null),
                frequency_type: item.frequency_type,
                income_ratio:  item.frequency_type === "FREQ" ? 100 : 30,
                price: item.price,
                income_from_real_estate: item.income_from_real_estate,
                income_according_to_staff_rating: item.income_according_to_staff_rating,
                description: item.description,
              }
            }
          )})
        })
      }
      case 'TRANSPORT':{
        return ({
          total_income_from_rental_vehicles: ren?.assetDetailTransport?.total_income_from_transport ?? 0,
          asset_type: ren?.assetType,
          asset_transportations: ren?.assetDetailTransport?.data.map((tran, idx)=>{
            return (
            {
              name: `Phương tiện vận tải ${idx + 1}`,
              display_order: idx + 1,
              documents: mappingDocuments(tran.documents),
              uuid: getUuidRemovePrefix(tran.uuid),
              transportation_info: {
                license_number: tran.registrationPlate,
                owned_status: tran.owned_status,
                frequency_type: tran.frequency_type,
                income_ratio: tran.frequency_type === "FREQ" ? 100 : 30.0,
                price: tran.price,
                income_from_rental_vehicles: tran.frequency_type === "FREQ" ? tran.price : calcInputNumber((tran.price ?? 0) * 0.3),
                income_according_to_staff_rating: tran.income_according_to_staff_rating,
                description:null,
              }
            }
          )})
        })
      }
      case 'OTHER':{
        return ({
          total_income_from_other_assets: ren?.assetDetailOther?.total_income_from_other ?? 0,
          asset_type: ren?.assetType,
          other_assets: ren?.assetDetailOther?.data.map((othe, idx)=>{
            return (
            {
              name: `Tài sản khác ${idx+1}`,
              display_order: idx + 1,
              documents: mappingDocuments(othe.documents),
              uuid: getUuidRemovePrefix(othe.uuid),
              other_assets_info: {
                license_number: othe.idAssetRent,
                owned_status: othe.owned_status,
                frequency_type: othe.frequency_type,
                income_ratio: othe.frequency_type === "FREQ" ? 100 : 30.0,
                price: othe.price,
                income_from_other_assets: othe.frequency_type === "FREQ" ? othe.price : calcInputNumber((othe.price ?? 0) * 0.3),
                income_according_to_staff_rating: othe.income_according_to_staff_rating,
                description:null,
              }
            }
          )})
        })
      }
    }
  }
  const bodyAssrent = {
    total_income_from_property_rental: calcInputNumber(dataPersonUUID?.assetRent?.total_income_from_assentRent_NVTTD ?? 0),
    permanent_income_amount: calcInputNumber(dataPersonUUID?.assetRent.permanent_income_amount ?? 0),
    occasional_income_amount: calcInputNumber(dataPersonUUID?.assetRent.occasional_income_amount ?? 0),
    uuid: dataPersonUUID?.assetRent?.uuid,
    rental_properties: dataPersonUUID?.assetRent.data?.map((ren,idx)=>{
      return{
        name: `Tài sản cho thuê ${idx +1}`,
        display_order: idx +1,
        uuid: ren?.uuid,
        rental_property_info: getRentalData(ren)
      }
    })
  }

  if(bodyAssrent.rental_properties?.length === 0){
    return apiDelete<unknown>(formatPath("v2/normal-loan/:los_id/source-income/income-asset-rent/:person_uuid", los_id,person_uuid));  
  }
  return apiPost<unknown>(formatPath("s2/v2/approval/documents/:los_id/source-income/income-asset-rent/:person_uuid/", los_id, person_uuid), bodyAssrent);
};

export const saveINCOMEBusinessS2 = (
  incomeStorage: ILOANNormalStorageIncomeState,
  // loanStorage: ILOANNormalStorageLOANState,
  // legalState: ILOANNormalStorageLegalState,
  fullState: ILOANApprovalFullState,
  config: ILOANNormalConfigState,
  los_id: string,
  master: IMasterData,
  // incomeType:string
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare ; 
  let person_uuid: string = "";

  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }
  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }
  else if(declareActive === "borrower") {
    person_uuid = incomeStorage.income.borrower.activePosition
  }
  else {
    person_uuid = incomeStorage.income.marriage.activePosition
  }
  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);
  const bodyBusiness = {
    uuid: dataPersonUUID?.business?.uuid,
    total_income_from_business_activities: calcInputNumber(dataPersonUUID?.business.total_income_from_business_activities ?? 0),
    permanent_income_amount: calcInputNumber(dataPersonUUID?.business.permanent_income_amount ?? 0),
    occasional_income_amount: calcInputNumber(dataPersonUUID?.business.occasional_income_amount ?? 0),
    business_households: dataPersonUUID?.business?.data?.map((item, idx)=>({
      uuid: getUuidRemovePrefix(item.uuid),
        name: item.name,
        display_order: idx + 1,
        documents: item.documents?.map((dos, idxDocs)=>{
          if(dos.data_file.length > 0){
            return{
            document_id: dos.document_id,
            document_name: dos.document_name,
            data_file:dos.data_file?.map((dataF,idxDataF)=>({
              uuid: dataF.uuid,
              name: dataF.name,
              content_type: dataF.type,
              display_order:idxDataF + 1,
              created_at: (dataF.create_at)/1000,
              created_by: dataF.created_by,
              updated_at: dataF.updated_at,
              updated_by: dataF.updated_by
            }))
            }
          } else return dos
        }),
        business_household_info: {
          business_household_type: item.representative,
          business_name: item.name,
          business_working_time: item.workingTime,
          frequency_type: item.frequency,
          income_ratio: item.ratio,
          gross_revenue: item.turnover,
          cost: item.cost,
          profit: item.profit,
          income_from_household_business_activities: item.income_business_activities,
          income_according_to_staff_rating: item.income_according_to_staff_rating,
          description: '',
        }
    }))
  }
    if(bodyBusiness.business_households?.length === 0){
      return apiDelete<unknown>(formatPath("v2/normal-loan/:los_id/source-income/income-business-household/:person_uuid", los_id,person_uuid));    
    }
    console.log("bodyBusinessbodyBusiness",bodyBusiness)
  return apiPost<unknown>(formatPath("s2/v2/approval/documents/:los_id/source-income/income-business-household/:person_uuid/", los_id,person_uuid), bodyBusiness);
};

export const saveINCOMECompanyS2 = (
  incomeStorage: ILOANNormalStorageIncomeState,
  // loanStorage: ILOANNormalStorageLOANState,
  // legalState: ILOANNormalStorageLegalState,
  fullState: ILOANApprovalFullState,
  config: ILOANNormalConfigState,
  los_id: string,
  master: IMasterData,
  // incomeType:string
) => {


  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare; // declare active 
  let person_uuid: string = "";
 
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }
  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }
  else if(declareActive === "borrower") {
    person_uuid = incomeStorage.income.borrower.activePosition
  }
  else {
    person_uuid = incomeStorage.income.marriage.activePosition
  }


  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);
  const bodyCompany = {
      uuid: dataPersonUUID?.company?.uuid,
      total_income_from_company: dataPersonUUID?.company?.total_income_from_company,
      permanent_income_amount: dataPersonUUID?.company?.permanent_income_amount,
      occasional_income_amount: dataPersonUUID?.company?.occasional_income_amount,
      companies: dataPersonUUID?.company?.data?.map((bus, index) => ({
        uuid: getUuidRemovePrefix(bus?.uuid),
        name: bus?.name,
        display_order: index + 1,
        documents: bus?.documents?.map((doc, idx) =>  {
          if(doc.data_file.length > 0){
            return {
              document_id: doc?.document_id,
              document_name: doc?.document_name,
              data_file: doc?.data_file?.map((dataF,idxDataF)=>({
                uuid: dataF?.uuid,
                name: dataF?.name,
                content_type: dataF?.type,
                display_order: idxDataF + 1,
                created_by: dataF?.created_by,
                created_at: (dataF?.create_at ?? 0)/1000,
                updated_at: (dataF?.create_at ?? 0)/1000,
                updated_by: dataF?.updated_by,
              }))
            }
          }
          else return doc
        }),
        company_info: {
          business_type_id: bus?.type,
          business_name: bus?.name,
          business_tax: bus?.tax,
          business_phone: bus?.phone,
          business_license_date: (bus?.licenseDate?? 0)/1000,
          profit: bus.profit,
          frequency_type: bus?.frequency,
          income_ratio: bus?.income_ratio,
          business_income_from_business_activities: bus.business_income_from_business_activities,
          income_according_to_staff_rating: bus?.income_according_to_staff_rating,
          description: ''
        }
    }))
  }
  return apiPost<unknown>(formatPath("s2/v2/approval/documents/:los_id/source-income/income-company/:person_uuid/", los_id,person_uuid), bodyCompany);
};

export const saveINCOMEStockS2 = (
  incomeStorage: ILOANNormalStorageIncomeState,
  // loanStorage: ILOANNormalStorageLOANState,
  // legalState: ILOANNormalStorageLegalState,
  fullState: ILOANApprovalFullState,
  config: ILOANNormalConfigState,
  los_id: string,
  master: IMasterData,
  // incomeType:string
) => {

  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare; // declare active 
  let person_uuid: string = "";
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }
  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }
  else if(declareActive === "borrower") {
    person_uuid = incomeStorage.income.borrower.activePosition
  }
  else {
    person_uuid = incomeStorage.income.marriage.activePosition
  }
  
  // else {
  //   person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  // }

  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);
  
  const bodyStock = {
    uuid:  dataPersonUUID?.stock.uuid,
    total_income_from_stocks: dataPersonUUID?.stock.total_income_from_stocks_NVTTD,
    permanent_income_amount: dataPersonUUID?.stock.permanent_income_amount,
    occasional_income_amount: dataPersonUUID?.stock.occasional_income_amount,
    source_income_stocks: dataPersonUUID?.stock.data.map((sto,idx)=>({
      uuid:getUuidRemovePrefix(sto.uuid),
      name: `Cổ tức/Lợi nhuận ${idx +1}`,
      display_order: idx +1,
      stock_info: {
        year: sto.year,
        count: sto.count,
        description_source: sto.description_source,
        frequency_type: sto.frequency,       
        income_ratio: sto.frequency === "FREQ" ? 100 : 30,    
        profit: sto.profit ?? 0,
        income_from_stock:  sto.frequency === "FREQ" ? sto.profit : ((sto.profit ?? 0) * 0.3),
        income_according_to_staff_rating: sto.income_according_to_staff_rating ?? 0,
        description: sto.description
      },
      documents: sto.documents?.map((dos,idxDocs)=>{
        if(dos.data_file.length > 0){
          return{
            document_id: dos.document_id,
            document_name: dos.document_name,
            data_file:dos.data_file?.map((dataF,idxDataF)=>({
              uuid: dataF.uuid,
              name: dataF.name,
              content_type: dataF.type,
              display_order:idxDataF + 1,
              created_by:'',
              created_at: (dataF?.create_at ?? 0)/1000,
              updated_at: (dataF?.create_at ?? 0)/1000,
              updated_by: '',
            }))
          }
        } else return dos
      })
    }))
  }
  return apiPost<unknown>(formatPath("s2/v2/approval/documents/:los_id/source-income/income-stock/:person_uuid/", los_id,person_uuid), bodyStock);
};

export const saveINCOMEPensionS2 = (
  incomeStorage: ILOANNormalStorageIncomeState,
  // loanStorage: ILOANNormalStorageLOANState,
  // legalState: ILOANNormalStorageLegalState,
  fullState: ILOANApprovalFullState,
  config: ILOANNormalConfigState,
  los_id: string,
  master: IMasterData,
  // incomeType:string
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
  else if(declareActive === "borrower") {
    person_uuid = incomeStorage.income.borrower.activePosition
  }
  else {
    person_uuid = incomeStorage.income.marriage.activePosition
  }

 
  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);
  
  const bodyPension = {
      uuid: getUuidRemovePrefix(dataPersonUUID?.pension.uuid),
      total_income_from_pension: dataPersonUUID?.pension.income_from_pension,
      permanent_income_amount:  dataPersonUUID?.pension.income_from_per,
      occasional_income_amount: dataPersonUUID?.pension.income_from_occ,
      pension_info:{
        license_number: dataPersonUUID?.pension.license,
        start_date:(dataPersonUUID?.pension.startDate ?? 0) /1000,
        insurance_number: dataPersonUUID?.pension.insurance,
        salary: dataPersonUUID?.pension.salary,
        frequency_type: dataPersonUUID?.pension.frequency,
        income_ratio: dataPersonUUID?.pension.frequency === "FREQ" ? 100 : 30.0,
        income_from_pension: dataPersonUUID?.pension.frequency === "FREQ" ? dataPersonUUID?.pension.salary : ((dataPersonUUID?.pension.salary ?? 0) * 0.3),
        income_according_to_staff_rating: dataPersonUUID?.pension?.income_according_to_staff_rating,
        description: ''
      },
      documents: dataPersonUUID?.pension?.documents?.map((dos,idxDocs)=>{
        if(dos.data_file.length > 0){
          return{
            document_id: dos.document_id,
            document_name: dos.document_name,
            // document_type: dos.document_type,
            data_file:dos.data_file?.map((dataF,idxDataF)=>({
              uuid: dataF.uuid,
              name: dataF.name,
              content_type: dataF.type,
              display_order:idxDataF + 1,
              created_by:'',
              created_at: (dataF?.create_at ?? 0)/1000,
              updated_at: (dataF?.create_at ?? 0)/1000,
              updated_by: '',
            }))
          }
        } else return dos
      })
  }

  return apiPost<unknown>(formatPath("s2/v2/approval/documents/:los_id/source-income/income-pension/:person_uuid/", los_id,person_uuid), bodyPension);
};

export const deleteINCOMEPensionS2 = (
  incomeStorage: ILOANNormalStorageIncomeState,
  // loanStorage: ILOANNormalStorageLOANState,
  // legalState: ILOANNormalStorageLegalState,
  fullState: ILOANApprovalFullState,
  config: ILOANNormalConfigState,
  los_id: string,
  master: IMasterData,
  // incomeType:string
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
  else if(declareActive === "borrower") {
    person_uuid = incomeStorage.income.borrower.activePosition
  }
  else {
    person_uuid = incomeStorage.income.marriage.activePosition
  }
  // else {
  //   person_uuid = fullState.data?.form.legal_info_form?.data[declareActive]?.basic_info?.uuid.toString() ?? "";
  // }
  
  return apiDelete<unknown>(formatPath("v2/normal-loan/:los_id/source-income/income-pension/:person_uuid", los_id,person_uuid));
};

export const saveINCOMEDepositS2 = (
  incomeStorage: ILOANNormalStorageIncomeState,
  // loanStorage: ILOANNormalStorageLOANState,
  // legalState: ILOANNormalStorageLegalState,
  fullState: ILOANApprovalFullState,
  config: ILOANNormalConfigState,
  los_id: string,
  master: IMasterData,
  // incomeType:string
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare ; 
  let person_uuid: string = "";
 
  // Check uuid persion screen
  if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }
  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }
  else if(declareActive === "borrower") {
    person_uuid = incomeStorage.income.borrower.activePosition
  }
  else {
    person_uuid = incomeStorage.income.marriage.activePosition
  }

  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);
  
  const bodyDeposit= {
    uuid: getUuidRemovePrefix(dataPersonUUID?.deposit.uuid),
    total_income_from_deposits: dataPersonUUID?.deposit.total_income_from_deposits,
    permanent_income_amount: dataPersonUUID?.deposit.permanent_income_amount,
    occasional_income_amount: dataPersonUUID?.deposit.occasional_income_amount,
    deposits: dataPersonUUID?.deposit?.data.map((des, idx) => ({
        uuid:getUuidRemovePrefix(des.uuid),
        name: `Lãi tiền gửi/GTCG ${idx}`,
        display_order: idx+1,
        deposit_info: {
          publish_unit_id: master.issuer.data.find(iss=>iss.id === des.publish_unit_id)?.id,
          account_number: des.account,
          currency_type_id: master.currencyType.data.find(iss=>iss.code === des.currency)?.id,
          balance:  des.balance,
          accept_blocked_account: master.acceptStatus.data.find(iss=>iss.code === des.accept_blocked_account)?.id,
          term: des.term,
          profit: des.profit ?? 0,
          frequency_type: des.frequency,
          income_ratio: des.frequency === "FREQ" ? 100 : 30,
          income_from_deposits: des.frequency === "FREQ" ? des.profit : ((des.profit ?? 0) * 0.3),
          income_according_to_staff_rating: des.income_according_to_staff_rating,
          description: des.description,
        },
        documents: des.documents?.map((dos,idxDocs)=>{
          if(dos.data_file.length > 0){
            return{
              document_id: dos.document_id,
              document_name: dos.document_name,
              data_file:dos.data_file?.map((dataF,idxDataF)=>({
                uuid: dataF.uuid,
                name: dataF.name,
                content_type: dataF.type,
                display_order:idxDataF + 1,
                created_by:'',
                created_at: (dataF?.create_at ?? 0)/1000,
                updated_at: (dataF?.create_at ?? 0)/1000,
                updated_by: '',
              }))
            }
          } else return dos
        })
    }))
  }
  return apiPost<unknown>(formatPath("s2/v2/approval/documents/:los_id/source-income/income-deposit/:person_uuid/", los_id,person_uuid), bodyDeposit);
};

export const saveINCOMEOtherS2 = (
  incomeStorage: ILOANNormalStorageIncomeState,
  // loanStorage: ILOANNormalStorageLOANState,
  // legalState: ILOANNormalStorageLegalState,
  fullState: ILOANApprovalFullState,
  config: ILOANNormalConfigState,
  los_id: string,
  master: IMasterData,
  // incomeType:string
) => {
  const declareActive = incomeStorage.declareActive as keyof ILOANNormalStorageIncomeDeclare ; 
  let person_uuid: string = "";

   // Check uuid persion screen
   if (declareActive === "coborrower"){
    person_uuid = incomeStorage.income.coborrower.activePosition
  }
  else if (declareActive === "copayer"){
    person_uuid = incomeStorage.income.copayer.activePosition
  }
  else if(declareActive === "borrower") {
    person_uuid = incomeStorage.income.borrower.activePosition
  }
  else {
    person_uuid = incomeStorage.income.marriage.activePosition
  }

  const dataPersonUUID = incomeStorage.income[declareActive].dataPosition.find(item=>item.uuidDeclare === person_uuid);
  
  const bodyOther = {

    uuid: dataPersonUUID?.other.uuid,
    total_income_from_other_sources: dataPersonUUID?.other?.total_income_from_other_sources,
    permanent_income_amount: dataPersonUUID?.other?.permanent_income_amount,
    occasional_income_amount: dataPersonUUID?.other?.occasional_income_amount,
    income_other: dataPersonUUID?.other.data.map((oth, idx)=>({
        uuid: getUuidRemovePrefix(oth.uuid),
        name: `Nguồn thu ${idx+1}`,
        display_order: idx+1,
        income_info: {
          frequency_year: oth.frequencyYear,
          payment_method: master.methodReceiveSalary.data.find(iss=>iss.code === oth.paymentMethod)?.id,
          profit: oth.profit,
          note: oth.note,
          frequency_type: oth.frequency,
          income_ratio:  oth.frequency === "FREQ" ? 100 : 30,
          income_from_other_source: oth.frequency === "FREQ" ? oth.profit : ((oth.profit ?? 0) * 0.3),
          income_according_to_staff_rating: oth.income_according_to_staff_rating,
          description: oth.description
        },
        documents: oth.documents?.map((dos,idxDocs)=>{
          if(dos.data_file.length > 0){
            return{
              document_id: dos.document_id,
              document_name: dos.document_name,
              data_file:dos.data_file?.map((dataF,idxDataF)=>({
                uuid: dataF.uuid,
                name: dataF.name,
                content_type: dataF.type,
                display_order:idxDataF + 1,
                created_by:'',
                created_at: (dataF?.create_at ?? 0)/1000,
                updated_at: (dataF?.create_at ?? 0)/1000,
                updated_by: '',

              }))
            }
          } else return dos
        })
      })
    )
  }
  return apiPost<unknown>(formatPath("s2/v2/approval/documents/:los_id/source-income/income-other/:person_uuid/", los_id,person_uuid), bodyOther);
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

export const saveINCOMEAbilityS2 = ( 
  incomeStorage: ILOANNormalStorageIncomeState,
  // loanStorage: ILOANNormalStorageLOANState,
  // legalState: ILOANNormalStorageLegalState,
  fullState: ILOANApprovalFullState,
  config: ILOANNormalConfigState,
  los_id: string,
  master: IMasterData,
  // incomeType:string
) => {
  const ability = incomeStorage.ability;
  const bodyAbility = {
    duration_loan: ability?.ability_to_repay_of_customer?.loan_info?.duration_loan?.value ?? 0,
    lscv_scb: ability?.ability_to_repay_of_customer?.loan_info?.lscv_scb?.value ?? 0,
    assess_solvency: ability?.evaluate ?? ''
  }

  return apiPost<unknown>(formatPath("s2/v2/approval/documents/:los_id/source-income/ability-to-repay/", los_id), bodyAbility);
}

export const saveINCOMEBalanceS2 = ( 
  incomeStorage: ILOANNormalStorageIncomeState,
  // loanStorage: ILOANNormalStorageLOANState,
  // legalState: ILOANNormalStorageLegalState,
  fullState: ILOANApprovalFullState,
  config: ILOANNormalConfigState,
  los_id: string,
  master: IMasterData,
  // incomeType:string
) => {
  const balance = incomeStorage.balance;
  const arr:{
      customer_uuid:string,
      cost_loan_payment: {uuid: string, value: number | null}[],
  }[] = [];
  const getTotalCostInfo = (data: TotalCostDeclare | null | undefined) => {
    if(!data) return;
    const result ={
      customer_uuid: data.customer_uuid ?? '',
      // cost_of_living: data.cost_of_living.total_income_staff ?? 0,
      // cost_of_living:0,
      cost_loan_payment: data.loan_repayment_costs?.detail?.map(e => ({
        uuid: e?.uuid ?? "",
        value: e.value_by_business_household 
      })) ?? [] ,
    };
    if(result.cost_loan_payment.length > 0){
      arr.push(result);
    }
  }
  getTotalCostInfo(balance?.financial_situation_of_customer?.total_cost?.borrower);
  getTotalCostInfo(balance?.financial_situation_of_customer?.total_cost?.marriage);
  (balance?.financial_situation_of_customer?.total_cost?.co_borrower?.customer_info ?? []).forEach(col=>{
    getTotalCostInfo(col);
  });
  // (balance?.financial_situation_of_customer?.total_cost?.co_payer?.customer_info ?? []).forEach(col=>{
  //   getTotalCostInfo(col);
  // });
  
  const bodyBalance = {
    evaluate: balance.evaluate ?? '',
    total_cost_info: arr,
    other_cost: balance.financial_situation_of_customer.total_cost?.other_cost_by_staff ?? 0
  }

  return apiPost<unknown>(formatPath("s2/v2/approval/documents/:los_id/source-income/balance/", los_id), bodyBalance);
}


