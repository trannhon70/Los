import { generateUUID } from "utils";

export const autofillSalary = {
    uuid: generateUUID(),
    areaActivity: "STATEOWNED",
    publish_unit_id: "",
    companyType: "2MLC",
    companyName: "Trường Hải",
    companyCate: "Công ty TNHH hai thành viên trở lên Trường Hải",
    years: 1641045344000,
    startDate: 1326030946000,
    contractType: "TERM",
    receivedMethod: "CASH",
    frequency: "FREQ",
    career: "G46326",
    ratioIncome: 100,
    salary: null,
    incomeFromSalary: null,
    documents:[],
}

export const autofillAssrentReal = {
    uuid: generateUUID(),
    location: "927 TRẦN HƯNG ĐẠO",
    province: "79",
    district: "774",
    ward: "27325",
    owned_status: "personal",
    description: "CHO THUE TAI SAN",
    frequency_type: "FREQ",
    income_ratio: 0,
    price: null,
    income_from_real_estate: null,
    documents:[],
}

export const autofillAssrentTransport = {
    uuid: generateUUID(),
    registrationPlate: "1111",
    owned_status: "personal",
    frequency_type: "FREQ",
    income_ratio: 0,
    price: null,
    income_from_transport: null,
    documents:[],
}

export const autofillAssrentOther = {
    uuid: generateUUID(),
    idAssetRent:"1",
    registrationPlate: "1111",
    owned_status: "personal",
    frequency_type: "FREQ",
    income_ratio: 0,
    price: null,
    income_from_other: null,
    documents:[],
}

export const autofillBussiness = {
    uuid: generateUUID(),
    representative: "",
    name: "Trường Hải",
    workingTime: 10,
    frequency: "FREQ",
    ratio: 100,
    turnover: null,
    cost: null,
    profit: null,
    income_business_activities: null,
    documents:[],
}
export const autofillCompany = {
    uuid: generateUUID(),
    type: "",
    name: "NGUỒN THU NHẬP",
    tax: "0909090909",
    phone: "0909090909",
    licenseDate: 1325502171000,
    profit: null,
    frequency: "FREQ",
    income_ratio: null,
    business_income_from_business_activities: null,
    documents: []
}
export const autofillStock = {
    uuid: generateUUID(),
    year: 1643195462000,
    count: 10,
    frequency: "FREQ",
    ratio: 100,
    profit: null,
    income_from_stock: null,
    documents: []
}
export const autofillDeposit = {
    uuid: generateUUID(),
    publish_unit_id: "",
    accept_blocked_account: "",
    unit: "",
    account: "11",
    currency: "CAD",
    balance: 10,
    blocked: "",
    term: 10,
    profit: null,
    frequency: "FREQ",
    income_ratio: 100,
    income_from_deposits: null,
    documents:[],
}
export const autofillPension = {
    uuid: generateUUID(),
    license: "1000",
    startDate: 1643195462000,
    insurance: "123",
    salary: null,
    frequency: "FREQ",
    income_ratio: null,
    income_from_pension: null,
    income_from_occ: null,
    income_from_per: null,
    documents:[],
}
export const autofillOther = {
    uuid: generateUUID(),
    frequencyYear: 12,
    paymentMethod: "CASH",
    profit: null,
    note: "test",
    frequency: "FREQ",
    income_ratio: null,
    income_from_other_source: null,
    documents: [],
}