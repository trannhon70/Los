import { 
  ILOANNormalStorageIncomeAbility,
  ILOANNormalStorageIncomeAssetRentActive,
  ILOANNormalStorageIncomeCompanyActive, 
} from "types/models/loan/normal/storage/Income";
import { PhoneMobileVN } from "views/pages/LOAN/utils/phoneVN";
import { ILOANNormalStorageIncomePension, 
  ILOANNormalStorageIncomeStockActive, 
  ILOANNormalStorageIncomeDepositActive, 
  ILOANNormalStorageIncomeBusinessActive,
  ILOANNormalStorageIncomeOtherActive,
  ILOANNormalStorageIncomeSalaryActive,
  ILOANNormalStorageIncomeBalance
} from "types/models/loan/normal/storage/Income";

export const ValidateIncome = {
  common: {
    differentValue(value: number | null) {
      if(value && value < 0) {
        return { valid: false, field: 'differentValue', role: 'less_than_0' };
      }
      return { valid: true }
    },
    license(value: string){
      return { valid: !!value, field: 'license', role: 'empty' }; 
    },

    startDate(value: number | null){
      if (value === null){
        return { valid: false, field: 'startDate', role: 'empty' };
      }
      const getCurrent = (new Date()).getTime();
      if (Number(value) > getCurrent){
        return { valid: false, field: 'startDate', role: 'in_valid' };
      }

      if (isNaN(value)){
        return { valid: false, field: 'startDate', role: 'not_exist' };
      }

      return { valid: true, field: 'startDate', role: '' };
    },

    insurance(value: string){ 
      return { valid: !!value, field: 'insurance', role: 'empty' }; 
    },

    salary(value: number | null,  position?: string,  positionHorizontal?: string){
      if (value === null){
        return { valid: false, field: 'salary', role: 'empty' };
      }
      if (value === 0){
        return { valid: false, field: 'salary', role: 'in_valid' };
      }
  
      if (isNaN(value)){
        return { valid: false, field: 'salary', role: 'not_exist' };
      }

      return { valid: true, field: 'salary', role: '' };
    },

    // FREQ => Thường xuyên
    // INFREQ => Không thường xuyên
    frequency(value: string, position?: string,  positionHorizontal?: string){
      return { valid: !!value, field: 'frequency', role: 'empty', position: position, positionHorizontal: positionHorizontal }; 
    },

    // Thường xuyên
    incomeFromPer(value: number | null){
      if (value === null){
        return { valid: false, field: 'incomeFromPer', role: 'empty' };
      }
  
      if (isNaN(value)){
        return { valid: false, field: 'incomeFromPer', role: 'not_exist' };
      }

      return { valid: true, field: 'incomeFromPer', role: '' };
    },

    // Không thường xuyên
    incomeFromOcc(value: number | null){
      if (value === null){
        return { valid: false, field: 'income_from_occ', role: 'empty' };
      }
  
      if (isNaN(value)){
        return { valid: false, field: 'income_from_occ', role: 'not_exist' };
      }

      return { valid: true, field: 'income_from_occ', role: '' };
    },

    // Số năm nhận
    year(value: number | null, position?: string){
      if (value === null){
        return { valid: false, field: 'year', role: 'empty', position: position };
      }
      if (value < 2){
        return { valid: false, field: 'year', role: 'in_valid', position: position };
      }
      if(String(value)?.length > 2){
        return { valid: false, field: 'year', role: 'in_length', position: position };
      }
  
      if (isNaN(value)){
        return { valid: false, field: 'year', role: 'not_exist', position: position };
      }

      return { valid: true, field: 'year', role: '', position: position};
    },

    // Số lần nhận trong năm
    count(value: number | null, position?: string){
      if (value === null){
        return { valid: false, field: 'count', role: 'empty', position: position };
      }
      if(value < 1){
        return { valid: false, field: 'count', role: 'in_valid', position: position };
      }
      if(String(value)?.length > 2){
        return { valid: false, field: 'count', role: 'in_length', position: position };
      }
  
      if (isNaN(value)){
        return { valid: false, field: 'count', role: 'not_exist', position: position };
      }

      return { valid: true, field: 'count', role: '', position: ""};
    },

    // Thu nhập bình quân theo tháng (VND)
    profit(value: number | null, position?: string){
      if (value === null){
        return { valid: false, field: 'profit', role: 'empty', position: position };
      }
            
      if (value <= 0){
        return { valid: false, field: 'profit', role: 'in_valid', position: position };
      }
  
      if (isNaN(value)){
        return { valid: false, field: 'profit', role: 'not_exist', position: position };
      }

      return { valid: true, field: 'profit', role: '', position: ""};
    },

    // Loại hình doanh nghiệp
    type(value: string, position?: string){
      return { valid: !!value, field: 'type', role: 'empty', position: position }; 
    },

    // Tên doanh nghiệp
    name(value: string, position?: string){
      return { valid: !!value, field: 'name', role: 'empty', position: position }; 
    },

    // Mã số thuế
    tax(value: string, position?: string, isValid?: boolean){
      if (isValid){
        return { valid: false, field: 'tax', role: 'isValid', position: position }; 
      }

      return { valid: !!value, field: 'tax', role: 'empty', position: position }; 
    },

    // Số điện thoại liên lạc
    phone(value: string, position?: string, isValid?: boolean){
      if (!value)return { valid: false, field: 'phone', role: 'empty', position: position };

      if (!value.match(/^0\d{9}$/g)){
        return { valid: false, field: 'phone', role: 'invalid_format', position: position };
      }

      if (!~PhoneMobileVN.indexOf(value.substr(0, 3))){
        return { valid: false, field: 'phone', role: 'invalid_phone_vn', position: position };
      }

      if (isValid){
        return { valid: false, field: 'phone', role: 'invalid_exited', position: position };
      }
     
      return { valid: true, field: 'phone', role: '', position: ""};
    },

    // Ngày đăng ký hoạt động của Doanh nghiệp
    licenseDate(value: number | null, position?: string){
      if (value === null){
        return { valid: false, field: 'licenseDate', role: 'empty', position: position };
      }
      if (value){
        const getDateCurrent = (new Date()).getTime();
        if(Number(value) > getDateCurrent)
        return { valid: false, field: 'licenseDate', role: 'in_valid', position: position };
      }

      if (isNaN(value)){
        return { valid: false, field: 'licenseDate', role: 'not_exist', position: position };
      }

      return { valid: true, field: 'licenseDate', role: '', position: ""};
    },

    // Lợi nhuận bình quân theo tháng (VND)
    profitCompany(value: number | null, position?: string){
      if (value === null){
        return { valid: false, field: 'profit', role: 'empty', position: position };
      }
  
      if (isNaN(value)){
        return { valid: false, field: 'profit', role: 'not_exist', position: position };
      }

      return { valid: true, field: 'profit', role: '', position: ""};
    },

    // Loại tài sản cho thuê
    assetType(value: string, position?: string, positionHorizontal?: string){
      return { valid: !!value, field: 'assetType', role: 'empty', position: position, positionHorizontal: positionHorizontal}; 
    },

    // Địa chỉ liên hệ
    location(value: string, position?: string, positionHorizontal?: string){
      if(!value){
        return { valid: false, field: 'location', role: 'empty', position: position,  positionHorizontal: positionHorizontal };
      }
      return { valid: true, field: 'location', role: '', position: ""};
    },

    // Tỉnh/TP
    province(value: string, position?: string, positionHorizontal?: string){
      return { valid: !!value, field: 'province', role: 'empty', position: position, positionHorizontal: positionHorizontal }; 
    },

    // Quận/huyện
    district(value: string, position?: string, positionHorizontal?: string){
      return { valid: !!value, field: 'district', role: 'empty', position: position, positionHorizontal: positionHorizontal }; 
    },

    // Phường/xã
    ward(value: string, position?: string, positionHorizontal?: string){
      return { valid: !!value, field: 'ward', role: 'empty', position: position, positionHorizontal: positionHorizontal }; 
    },

    // Thuộc sở hữu và sử dụng
    ownedStatus(value: string, position?: string, positionHorizontal?: string){
      return { valid: !!value, field: 'owned_status', role: 'empty', position: position, positionHorizontal: positionHorizontal }; 
    },

    // Mô tả
    description(value: string, position?: string, positionHorizontal?: string){
      return { valid: !!value, field: 'description', role: 'empty', position: position, positionHorizontal: positionHorizontal }; 
    },

    price(value: number | null, position?: string, positionHorizontal?: string){
      if (value === null){
        return { valid: false, field: 'price', role: 'empty', position: position, positionHorizontal: positionHorizontal };
      }

      if (value <= 0){
        return { valid: false, field: 'price', role: 'in_valid', position: position, positionHorizontal: positionHorizontal  };
      }

      if (isNaN(value)){
        return { valid: false, field: 'price', role: 'not_exist', position: position };
      }

      return { valid: true, field: 'price', role: '', position: ""};
    },

    // Biển kiểm soát/đăng ký phương tiện
    registrationPlate(value: string, position?: string, positionHorizontal?: string){
      return { valid: !!value, field: 'registrationPlate', role: 'empty', position: position, positionHorizontal: positionHorizontal }; 
    },

    // Giấy chứng nhận / Mã tài sản cho thuê
    idAssetRent(value: string, position?: string, positionHorizontal?: string){
      return { valid: !!value, field: 'idAssetRent', role: 'empty', position: position, positionHorizontal: positionHorizontal }; 
    },

    currency(value: string, position?: string){
      return { valid: !!value, field: 'currency', role: 'empty', position: position }; 
    },

    account(value: string, position?: string){
      return { valid: !!value, field: 'account', role: 'empty', position: position }; 
    },

    balance(value: number | null, position?: string){
      if (value === null){
        return { valid: false, field: 'balance', role: 'empty', position: position };
      }
      if (isNaN(value)){
        return { valid: false, field: 'balance', role: 'not_exist', position: position };
      }
      return { valid: true, field: 'balance', role: '', position: position };
    },

    term(value: number | null, position?: string){
      if (value === null){
        return { valid: false, field: 'term', role: 'empty', position: position };
      }
      if (isNaN(value)){
        return { valid: false, field: 'term', role: 'not_exist', position: position };
      }
      return { valid: true, field: 'term', role: '', position: position };
    },

    workingTime(value: number | null, position?: string){
      if (value === null){
        return { valid: false, field: 'workingTime', role: 'empty', position: position };
      }
      if (isNaN(value)){
        return { valid: false, field: 'workingTime', role: 'not_exist', position: position };
      }
      if(Number(value) < 12){
        return { valid: false, field: 'workingTime', role: 'maximum', position: position };
      }
      return { valid: true, field: 'workingTime', role: '', position: position };
    },

    turnover(value: number | null, position?: string){
      if (value === null){
        return { valid: false, field: 'turnover', role: 'empty', position: position };
      }
      if (value <= 0){
        return { valid: false, field: 'turnover', role: 'in_valid', position: position };
      }
      if (isNaN(value)){
        return { valid: false, field: 'turnover', role: 'not_exist', position: position };
      }
      return { valid: true, field: 'turnover', role: '', position: position };
    },

    cost(value: number | null, position?: string){
      if (value === null){
        return { valid: false, field: 'cost', role: 'empty', position: position };
      }
      if (value <= 0){
        return { valid: false, field: 'cost', role: 'in_valid', position: position };
      }
      if (isNaN(value)){
        return { valid: false, field: 'cost', role: 'not_exist', position: position };
      }
      return { valid: true, field: 'cost', role: '', position: position };
    },

    areaActivity(value: string, position?: string){
      return { valid: !!value, field: 'areaActivity', role: 'empty', position: position };
    },

    companyName(value: string, position?: string){
      return { valid: !!value, field: 'companyName', role: 'empty', position: position };
    },

    career(value: string, position?: string){
      return { valid: !!value, field: 'career', role: 'empty', position: position };
    },

   

    startDateWork(value: number | null, position?: string){
      if (value === null){
        return { valid: false, field: 'startDateWork', role: 'empty', position: position };
      }
      const dates =  new Date().getTime();
      if (value > dates){
        return { valid: false, field: 'startDateWork', role: 'in_valid', position: position };
      }
      if (isNaN(value)){
        return { valid: false, field: 'startDateWork', role: 'not_exist', position: position };
      }
      return { valid: true, field: 'startDateWork', role: '', position: position };
    },

    contractType(value: string, position?: string){
      return { valid: !!value, field: 'contractType', role: 'empty', position: position };
    },

    yearExperience(value: number | null, position?: string){
      if (value === null){
        return { valid: false, field: 'yearExperience', role: 'empty', position: position };
      }
      if(value === 0){
        return { valid: false, field: 'yearExperience', role: 'in_valid', position: position };

      }
      return { valid: true, field: 'yearExperience', role: '', position: position };
    },

    receivedMethod(value: string, position?: string){
      return { valid: !!value, field: 'receivedMethod', role: 'empty', position: position };
    },

    // Thu nhập và các khoản trợ cấp
    income(value: number | null, position?: string){
      if (value === null){
        return { valid: false, field: 'income', role: 'empty', position: position };
      }
      if (isNaN(value)){
        return { valid: false, field: 'income', role: 'not_exist', position: position };
      }
      if (value <= 0){
        return { valid: false, field: 'income', role: 'in_valid', position: position };
      }
      return { valid: true, field: 'income', role: '', position: position };
    },

    companyCate(value: string, position?: string){
      return { valid: !!value, field: 'companyCate', role: 'empty', position: position };
    },

    note(value: string, position?: string){
      return { valid: !!value, field: 'note', role: 'empty', position: position };
    },

    frequencyYear(value: number | null, position?: string){
      if (value === null){
        return { valid: false, field: 'frequencyYear', role: 'empty', position: position };
      }
      if (isNaN(value)){
        return { valid: false, field: 'frequencyYear', role: 'not_exist', position: position };
      }
      return { valid: true, field: 'frequencyYear', role: '', position: position };
    },

    totalCost(value: number | null){
      if (value === null || value == 0){
        return { valid: false, field: 'totalCost', role: 'empty' };
      }

      if (isNaN(value)){
        return { valid: false, field: 'totalCost', role: 'not_exist' };
      }

      return { valid: true, field: 'totalCost', role: '' };
    },

    totalIncome(value: number | null){
      if (value === null || value == 0){
        return { valid: false, field: 'totalIncome', role: 'empty' };
      }

      if (isNaN(value)){
        return { valid: false, field: 'totalIncome', role: 'not_exist' };
      }

      return { valid: true, field: 'totalIncome', role: '' };
    },
    companyType(value: string, position?: string){
      return { valid: !!value, field: 'companyType', role: 'empty', position: position };
    },

    // Người đại diện hộ kinh doanh
    representative(value: string, position?: string){
      return { valid: !!value, field: 'representative', role: 'empty', position: position };
    },

    //  Đơn vị phát hành
    publishUnitid(value: string, position?: string){
      return { valid: !!value, field: 'publish_unit_id', role: 'empty', position: position };
    },

  },


  salary(data: ILOANNormalStorageIncomeSalaryActive){
    let isValid:{ valid: boolean, field: string, role: string,position?:string,positionHorizontal?:string} = { valid: true, field: '', role: '',position:'',positionHorizontal:''};
    // if(data?.data?.length===0) return isValid= { valid:false, field: 'salary', role: 'empty',position:data.activeSalary,positionHorizontal:' '}
    if(data?.data?.length > 0){
      data.data.forEach(
        (d) => {
          const vAreaActivity = ValidateIncome.common.areaActivity(d.areaActivity, d.uuid);
          if (!vAreaActivity.valid) return isValid = vAreaActivity;
   
          const vCompanyType = ValidateIncome.common.companyType(d.companyType, d.uuid);
          if (!vCompanyType.valid) return isValid = vCompanyType;
  
          const vCompanyName = ValidateIncome.common.companyName(d.companyName, d.uuid);
          if (!vCompanyName.valid) return isValid = vCompanyName;
  
          const vCareer = ValidateIncome.common.career(d.career, d.uuid);
          if (!vCareer.valid) return isValid = vCareer;
  
          const vYear = ValidateIncome.common.yearExperience(d.years, d.uuid);
          if (!vYear.valid) return isValid = vYear;
  
          const vStartDate = ValidateIncome.common.startDateWork(d.startDate, d.uuid);
          if (!vStartDate.valid) return isValid = vStartDate;
  
          const vContractType = ValidateIncome.common.contractType(d.contractType, d.uuid);
          if (!vContractType.valid) return isValid = vContractType;
  
          const vReceivedMethod = ValidateIncome.common.receivedMethod(d.receivedMethod, d.uuid);
          if (!vReceivedMethod.valid) return isValid = vReceivedMethod;
  
          const vFrequency = ValidateIncome.common.frequency(d.frequency, d.uuid);
          if (!vFrequency.valid) return isValid = vFrequency;
  
          const vIncome = ValidateIncome.common.income(d.salary, d.uuid);
          if (!vIncome.valid) return isValid = vIncome;
        }
      )
    }

    return isValid;
  },

  business(data: ILOANNormalStorageIncomeBusinessActive){
    let isValid:{ valid: boolean, field: string, role: string,position?:string,positionHorizontal?:string} = { valid: true, field: '', role: '',position:'',positionHorizontal:''};
    // if(data?.data?.length===0) return isValid= { valid:false, field: 'business', role: 'empty',position:data.activeBusiness,positionHorizontal:' '}
    if(data?.data?.length > 0){
      data.data.forEach(
      (d) => {
        const vRepresentative = ValidateIncome.common.representative(d.representative, d.uuid);
        if (!vRepresentative.valid) return isValid = vRepresentative;

        const vName = ValidateIncome.common.name(d.name, d.uuid);
        if (!vName.valid) return isValid = vName;

        const vWorkingTime = ValidateIncome.common.workingTime(d.workingTime, d.uuid);
        if (!vWorkingTime.valid) return isValid = vWorkingTime;

        const vFrequency = ValidateIncome.common.frequency(d.frequency, d.uuid);
        if (!vFrequency.valid) return isValid = vFrequency;

        const vTurnover = ValidateIncome.common.turnover(d.turnover, d.uuid);
        if (!vTurnover.valid) return isValid = vTurnover;

        const vCost = ValidateIncome.common.cost(d.cost, d.uuid);
        if (!vCost.valid) return isValid = vCost;
    })
  }
    return isValid;
  },

  persion(data: ILOANNormalStorageIncomePension){
    if(data?.uuid){
      const vLicense = ValidateIncome.common.license(data.license);
      if (!vLicense.valid) return vLicense;
  
      const vStartDate = ValidateIncome.common.startDate(data.startDate);
      if (!vStartDate?.valid) return vStartDate;
  
      const vInsurance = ValidateIncome.common.insurance(data.insurance);
      if (!vInsurance.valid) return vInsurance;
  
      const vSalary = ValidateIncome.common.salary(data.salary);
      if (!vSalary?.valid) return vSalary;
  
      const vFrequency = ValidateIncome.common.frequency(data.frequency);
      if (!vFrequency?.valid) return vFrequency;
  
      if(data.frequency === "FREQ"){
        return ValidateIncome.common.incomeFromPer(data.income_from_per);
      } else {
        return ValidateIncome.common.incomeFromOcc(data.income_from_occ);
      }
    }

    return { valid: true}
    
  },

  stock(data: ILOANNormalStorageIncomeStockActive){
    let isValid:{ valid: boolean, field: string, role: string,position?:string,positionHorizontal?:string} = { valid: true, field: '', role: '',position:'',positionHorizontal:''};
    // if(data?.data?.length===0) return isValid= { valid:false, field: 'stock', role: 'empty',position:data.activeStock,positionHorizontal:' '}
    if(data?.data?.length > 0){
      data.data.forEach(
        (d) => {
          const vYear = ValidateIncome.common.year(d.year, d.uuid);
          if (!vYear.valid) return isValid = vYear;
  
          const vCount = ValidateIncome.common.count(d.count, d.uuid);
          if (!vCount.valid) return isValid = vCount;
  
          const vFrequency = ValidateIncome.common.frequency(d.frequency, d.uuid);
          if (!vFrequency.valid) return isValid = vFrequency;
  
          const vProfit = ValidateIncome.common.profit(d.profit, d.uuid);
          if (!vProfit.valid) return isValid = vProfit;
        }
      )
    }
    return isValid;
  },

  // Validate form doanh nghiệp do khách hàng làm chủ
  company(data: ILOANNormalStorageIncomeCompanyActive){
    let isValid:{ valid: boolean, field: string, role: string,position?:string,positionHorizontal?:string} = { valid: true, field: '', role: '',position:'',positionHorizontal:''};
    // if(data?.data?.length===0) return isValid= { valid:false, field: 'company', role: 'empty',position:data.activeCompany,positionHorizontal:' '}
    if(data?.data?.length > 0){
    data.data.forEach(
      (d, index) => {
        const vType = ValidateIncome.common.type(d.type, d.uuid);
        if (!vType.valid) return isValid = vType;

        const vName = ValidateIncome.common.name(d.name, d.uuid);
        if (!vName.valid) return isValid = vName;

        // eslint-disable-next-line array-callback-return
        const listDataCheckTax = data.data.map((___, indexDct) => {
          if (indexDct !== index){
            return ___.tax
          }
        });
        const isCheckValidTax = listDataCheckTax.includes(d.tax);
        const vTax = ValidateIncome.common.tax(d.tax, d.uuid, isCheckValidTax);
        if (!vTax.valid) return isValid = vTax;

        
        // eslint-disable-next-line array-callback-return
        const listDataCheckExistedPhone = data.data.map((___, indexDct) => {
          if (indexDct !== index){
            return ___.phone
          }
        });
        const isCheckValidExistedPhone = listDataCheckExistedPhone.includes(d.phone);
        const vPhone = ValidateIncome.common.phone(d.phone, d.uuid, isCheckValidExistedPhone);
        if (!vPhone.valid) return isValid = vPhone;

        const vLicenseDate = ValidateIncome.common.licenseDate(d.licenseDate, d.uuid);
        if (!vLicenseDate.valid) return isValid = vLicenseDate;

        const vProfitCompany = ValidateIncome.common.profit(d.profit, d.uuid);
        if (!vProfitCompany.valid) return isValid = vProfitCompany;

        const vFrequency = ValidateIncome.common.frequency(d.frequency, d.uuid);
        if (!vFrequency?.valid) return isValid = vFrequency;
      }
    )
    }
    return isValid;
  },

  assetRent(data: ILOANNormalStorageIncomeAssetRentActive){
    let isValid:{ valid: boolean, field: string, role: string,position?:string,positionHorizontal?:string} = { valid: true, field: '', role: '',position:'',positionHorizontal:''};
    // if(data?.data?.length===0) return isValid= { valid:false, field: 'assetRent', role: 'empty',position:data.activeAssetRent,positionHorizontal:' '}
    if(data?.data?.length > 0){
      data.data.forEach(
        (d) => {
          const uuid = d.uuid;
  
          const vAssetType = ValidateIncome.common.assetType(d.assetType, uuid);
          if (!vAssetType.valid) return isValid = vAssetType;
  
          if(d.assetType === "REAL_ESTATE"){
            if(d?.assetDetailRealEstate?.data?.length===0) return isValid= { valid:false, field: 'assetDetailRealEstate', role: 'empty',position:uuid, positionHorizontal: ' '}
            d.assetDetailRealEstate.data.forEach(ret => {
              const retUuid = ret.uuid;
              const vLocation = ValidateIncome.common.location(ret.location, uuid, retUuid);
              if (!vLocation.valid) return isValid = vLocation;
  
              const vProvince = ValidateIncome.common.province(ret.province, uuid, retUuid);
              if (!vProvince.valid) return isValid = vProvince;
  
              const vDistrict = ValidateIncome.common.district(ret.district, uuid, retUuid);
              if (!vDistrict.valid) return isValid = vDistrict;
  
              const vWard = ValidateIncome.common.ward(ret.ward, uuid, retUuid);
              if (!vWard.valid) return isValid = vWard;
  
              const vFrequencyType = ValidateIncome.common.frequency(ret.frequency_type, uuid, retUuid);
              if (!vFrequencyType.valid) return isValid = vFrequencyType;
  
              const vPrice = ValidateIncome.common.price(ret.price, uuid, retUuid);
              if (!vPrice.valid) return isValid = vPrice;
            })
          }
          
          if (d.assetType === "TRANSPORT"){
            if(d?.assetDetailTransport?.data?.length===0) return isValid= { valid:false, field: 'assetDetailRealEstate', role: 'empty',position:uuid, positionHorizontal: ' '}
            d.assetDetailTransport.data.forEach(dt => {
              const dtUuid = dt.uuid;
              
              const vRegistrationPlate = ValidateIncome.common.registrationPlate(dt.registrationPlate, uuid, dtUuid);
              if (!vRegistrationPlate.valid) return isValid = vRegistrationPlate;
  
              const vFrequencyType = ValidateIncome.common.frequency(dt.frequency_type, uuid, dtUuid);
              if (!vFrequencyType.valid) return isValid = vFrequencyType;
  
              const vPrice = ValidateIncome.common.price(dt.price, uuid, dtUuid);
              if (!vPrice.valid) return isValid = vPrice;
            })
          }
  
          if (d.assetType === "OTHER"){
            if(d?.assetDetailOther?.data?.length===0) return isValid= { valid:false, field: 'assetDetailRealEstate', role: 'empty',position:uuid, positionHorizontal: ' '}
            d.assetDetailOther.data.forEach(d => {
              const doUuid = d.uuid;
              
              const vIAssetRent = ValidateIncome.common.idAssetRent(d.idAssetRent, uuid, doUuid);
              if (!vIAssetRent.valid) return isValid = vIAssetRent;
  
              const vFrequencyType = ValidateIncome.common.frequency(d.frequency_type, uuid, doUuid);
              if (!vFrequencyType.valid) return isValid = vFrequencyType;
  
              const vPrice = ValidateIncome.common.price(d.price, uuid, doUuid);
              if (!vPrice.valid) return isValid = vPrice;
            })
          }
        }
      )
    }
    

    return isValid;
  },

  deposit(data: ILOANNormalStorageIncomeDepositActive){
    let isValid:{ valid: boolean, field: string, role: string,position?:string,positionHorizontal?:string} = { valid: true, field: '', role: '',position:'',positionHorizontal:''};
    // if(data?.data?.length===0) return isValid= { valid:false, field: 'deposit', role: 'empty',position:data.activeDeposit,positionHorizontal:' '}
    if(data?.data?.length > 0){
    data.data.forEach(
      (d) => {

        const vPublishUnitid = ValidateIncome.common.publishUnitid(d.publish_unit_id,  d.uuid);
        if (!vPublishUnitid.valid) return isValid = vPublishUnitid;

        const vAccount = ValidateIncome.common.account(d.account,  d.uuid);
        if (!vAccount.valid) return isValid = vAccount;

        const vCurrency = ValidateIncome.common.currency(d.currency, d.uuid);
        if (!vCurrency.valid) return isValid = vCurrency;

        const vBalance = ValidateIncome.common.balance(d.balance, d.uuid);
        if (!vBalance.valid) return isValid = vBalance;

        const vTerm = ValidateIncome.common.term(d.term, d.uuid);
        if (!vTerm.valid) return isValid = vTerm;

        const vProfit = ValidateIncome.common.profit(d.profit, d.uuid);
        if (!vProfit.valid) return isValid = vProfit;

        const vFrequency = ValidateIncome.common.frequency(d.frequency, d.uuid);
        if (!vFrequency.valid) return isValid = vFrequency;

      }
    )
    }
    return isValid;
  },

  other(data: ILOANNormalStorageIncomeOtherActive){
    let isValid:{ valid: boolean, field: string, role: string,position?:string,positionHorizontal?:string} = { valid: true, field: '', role: '',position:'',positionHorizontal:''};
    // if(data?.data?.length===0) return isValid= { valid:false, field: 'other', role: 'empty',position:data.activeOther,positionHorizontal:' '}
    if(data?.data?.length > 0){
    data.data.forEach(
      (d) => {
        const vFrequencyYear = ValidateIncome.common.frequencyYear(d.frequencyYear, d.uuid);
        if (!vFrequencyYear.valid) return isValid = vFrequencyYear;

        const vPayMethod = ValidateIncome.common.receivedMethod(d.paymentMethod, d.uuid);
        if (!vPayMethod.valid) return isValid = vPayMethod;

        const vProfit = ValidateIncome.common.profit(d.profit, d.uuid);
        if (!vProfit.valid) return isValid = vProfit;

        const vNote = ValidateIncome.common.note(d.note, d.uuid);
        if (!vNote.valid) return isValid = vNote;

        const vFrequency = ValidateIncome.common.frequency(d.frequency, d.uuid);
        if (!vFrequency.valid) return isValid = vFrequency;
 
      }
    )
    }
    return isValid;
  },

  balance(data: ILOANNormalStorageIncomeBalance){

    const vDifferentValue = ValidateIncome.common.differentValue(data.differentValue);
    if (!vDifferentValue.valid) return vDifferentValue;

  },

  ability(data: ILOANNormalStorageIncomeAbility) {
    const vDifferentValue = ValidateIncome.common.differentValue(data.differentValue);
    if (!vDifferentValue.valid) return vDifferentValue;
  }

}
