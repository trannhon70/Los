import { generateUUID } from "utils";
import * as IncomeType from "types/models/loan/normal/storageApproval/SourceIncomeForm";

export const generateIncomeEmptyDataPosition = () => ({
  activeIncomeSource: '',
  total_income: null,
  total_occasional: null,
  total_permanent: null,
  salary: {
    data: [],
    activeSalary: '',
    total_income_from_salary_source: null,
    permanent_income_amount: null,
    occasional_income_amount: null,
  },
  assetRent: {
    data: [],
    activeAssetRent: '',
    total_income_from_property_rental: null,
    permanent_income_amount: null,
    occasional_income_amount: null,
  },
  business: {
    data: [],
    activeBusiness: '',
    total_income_from_business_activities: null,
    permanent_income_amount: null,
    occasional_income_amount: null,
  },
  company: {
    data: [],
    activeCompany: '',
    occasional_income_amount: null,
    permanent_income_amount: null,
    total_income_from_company: null
  },
  stock: {
    data: [],
    activeStock: '',
    occasional_income_amount: null,
    permanent_income_amount: null,
    total_income_from_stocks: null
  },
  deposit: {
    data: [],
    activeDeposit: '',
    occasional_income_amount: null,
    permanent_income_amount: null,
    total_income_from_deposits: null,
  },
  other: {
    data: [],
    activeOther: '',
    occasional_income_amount: null,
    permanent_income_amount: null,
    total_income_from_other_sources: null,
  },
  pension: {
    ...generateIncomeEmptyPension()
  }
})

export const generateIncomeEmptySalary = () => ({
  uuid: generateUUID(),
  areaActivity: '',
  publish_unit_id: '',
  companyType: '',
  companyName: '',
  companyCate: '',
  years: null,
  startDate: null,
  contractType: '',
  receivedMethod: '',
  frequency: '',
  career: '',
  ratioIncome: null,
  salary: null,
  incomeFromSalary: null,
  document:[],
  phone:'',
  startWorking: null,
  tax: '',
  title: '',
  profit: null,
  description: '',
  workExperience: null,
  income_according_to_staff_rating: null

})

export const generateIncomeEmptyAssetType = () => ({
  uuid: '',
  assetType: '',
  totalAmount: '',
  assetDetailRealEstate: {
    data: [],
    activeRealEstate: '',
    total_income_from_rental_real_estate: null,
    permanent_income_from_rental_real_estate: null,
    occasional_income_from_rental_real_estate: null,
  },
  assetDetailOther: {
    data: [],
    activeOther: '',
    total_income_from_other: null,
    permanent_income_from_other: null,
    occasional_income_from_other: null,
  },
  assetDetailTransport: {
    data: [],
    activeTransport: '',
    total_income_from_transport: null,
    permanent_income_from_transport: null,
    occasional_income_from_transport: null,
  },
})

export const generateIncomeEmptyDetailRealEstate = () => ({
  data: [],
  activeRealEstate: '',
  total_income_from_rental_real_estate: null,
  permanent_income_from_rental_real_estate: null,
  occasional_income_from_rental_real_estate: null,
})

export const generateIncomeEmptyDetailOther = () => ({
  data: [],
  activeOther: '',
  total_income_from_other: null,
  permanent_income_from_other: null,
  occasional_income_from_other: null,
})

export const generateIncomeEmptyDetailTransport = () => ({
  data: [],
  activeTransport: '',
  total_income_from_transport: null,
  permanent_income_from_transport: null,
  occasional_income_from_transport: null,
})

export const generateIncomeEmptyBusiness = () => ({
  uuid: '',
  representative: '',
  name: '',
  workingTime: null,
  frequency: '',
  ratio: null,
  turnover: null,
  cost: null,
  profit: null,
  income_business_activities: null,
  income_according_to_staff_rating: null,
  documents:[],
})


export const generateIncomeEmptyCompany = () => ({
  uuid: '',
  type: '',
  name: '',
  tax: '',
  phone: '',
  licenseDate: null,
  profit: null,
  frequency: '',
  income_ratio: null,
  business_income_from_business_activities: null,
  income_according_to_staff_rating: null,
  documents: []
})

export const generateIncomeEmptyStock = () => ({
  uuid: '',
  year: null,
  count: null,
  frequency: '',
  ratio: null,
  profit: null,
  income_from_stock: null,
  documents: [],
  income_according_to_staff_rating: null,
  description: '',
  description_source: '',
})

export const generateIncomeEmptyDeposit = () => ({
  uuid: '',
  unit: '',
  publish_unit_id: '106',
  accept_blocked_account: 'ACCEPT',
  account: '',
  currency: 'VND',
  balance: null,
  blocked: '',
  term: null,
  profit: null,
  frequency: '',
  income_ratio: null,
  income_from_deposits: null,
  income_according_to_staff_rating: null,
  description: '',
  documents:[],
})

export const generateIncomeEmptyPension = () => ({
  uuid: '',
  license: '',
  startDate: null,
  insurance: '',
  salary: null,
  frequency: '',
  income_ratio: null,
  income_from_pension:null,
  income_from_occ: null,
  income_from_per: null,
  income_according_to_staff_rating: null,
  documents: []
})
export const generateIncomeEmptyOther = () => ({
  uuid: '',
  frequencyYear: null,
  paymentMethod: '',
  profit: null,
  note: '',
  frequency: '',
  income_ratio: null,
  income_from_other_source: null,
  documents: [],
  income_according_to_staff_rating: null,
  description: ''
})

export const generateIncomeEmptyAssrentTypeRealAssetRent = () => ({
  uuid: '',
  location: '',
  province: '',
  district: '',
  ward: '',
  owned_status: 'RELATIVES',
  description: '',
  frequency_type: '',
  income_ratio: null,
  price: null,
  income_from_real_estate: null,
  income_according_to_staff_rating: null,
  documents: [],
})

export const generateIncomeEmptyAssrentTypeOther = () => ({
  uuid: '',
  idAssetRent: '',
  owned_status: 'RELATIVES',
  frequency_type: '',
  income_ratio: null,
  price: null,
  income_from_other: null,
  income_according_to_staff_rating: null,
  documents: [],
})

export const generateIncomeEmptyAssrentTransport = () => ({
  uuid: '',
  registrationPlate: '',
  owned_status: 'RELATIVES',
  frequency_type: '',
  income_ratio: null,
  price: null,
  income_from_transport: null,
  income_according_to_staff_rating: null,
  documents: [],
})


export const generateEmptySalaryPosition=():IncomeType.ILOANNormalStorageIncomeSalaryActive=>(
  {
    activeSalary:'activeSalary',
    uuid: '',
    occasional_income_amount:0,
    permanent_income_amount:0,
    total_income_from_salary_source:0,
    total_income_from_salary_NVTTD: 0,
    data:[],          
  }
);
export const generateEmptyAssetRentPosition=():IncomeType.ILOANNormalStorageIncomeAssetRentActive=>(
  {
    activeAssetRent:'activeAssetRent',
    uuid: '',
    occasional_income_amount:0,
    permanent_income_amount:0,
    total_income_from_property_rental:0,
    total_income_from_assentRent_NVTTD: 0,
    data:[],          
  }
);

export const generateEmptyBusinessPosition=():IncomeType.ILOANNormalStorageIncomeBusinessActive=>(
  {
    activeBusiness:'activeBusiness',
    uuid:'',
    occasional_income_amount:0,
    permanent_income_amount:0,
    total_income_from_business_activities:0,
    total_income_from_business_NVTTD: 0,
    data:[],          
  }
);

export const generateEmptyCompanyPosition=():IncomeType.ILOANNormalStorageIncomeCompanyActive=>(
  {
    activeCompany:'activeCompany',
    uuid: '',
    occasional_income_amount:0,
    permanent_income_amount:0,
    total_income_from_company:0,
    total_income_from_company_NVTTD: 0,
    data:[],          
  }
);

export const generateEmptyStockPosition=():IncomeType.ILOANNormalStorageIncomeStockActive=>(
  {
    activeStock:'activeStock',
    uuid: '',
    occasional_income_amount:0,
    permanent_income_amount:0,
    total_income_from_stocks:0,
    total_income_from_stocks_NVTTD: 0,
    data:[],          
  }
);

export const generateEmptyDepositPosition=():IncomeType.ILOANNormalStorageIncomeDepositActive=>(
  {
    activeDeposit:'activeDeposit',
    uuid: '',
    occasional_income_amount:0,
    permanent_income_amount:0,
    total_income_from_deposits:0,
    total_income_from_deposits_NVTTD: 0,
    data:[],          
  }
);

export const generateEmptyPensionPosition=():IncomeType.ILOANNormalStorageIncomePension=>(
  {
    documents:[],
    frequency:'',
    income_from_occ:0,
    income_from_pension:0,
    income_from_per:0,
    income_ratio:0,
    insurance:'',
    license:'',
    salary:0,
    startDate:0,
    uuid:'',
    income_according_to_staff_rating: null,
  }
);

export const generateEmptyOtherPosition=():IncomeType.ILOANNormalStorageIncomeOtherActive=>(
  {
    activeOther:'activeOther',
    uuid: '',
    occasional_income_amount:0,
    permanent_income_amount:0,
    total_income_from_other_sources:0,
    total_income_from_others_NVTTD: 0,
    data:[],          
  }
);

export const generateEmptyPosition = (uuid:string):IncomeType.ILOANNormalStorageIncomeDeclareSalary=>(
  {
    uuidDeclare:uuid??'',
    salary:generateEmptySalaryPosition(),
    assetRent:generateEmptyAssetRentPosition(),
    business:generateEmptyBusinessPosition(),
    company:generateEmptyCompanyPosition(),
    stock:generateEmptyStockPosition(),
    deposit:generateEmptyDepositPosition(),
    pension:generateEmptyPensionPosition(),
    other:generateEmptyOtherPosition(),
  }
)