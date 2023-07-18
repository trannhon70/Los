import { ICollateralApartmentAsset, ICollateralLand, ICollateralLandAsset } from "types/models/loan/normal/storage/Collateral"


export const autofillCollaretalDetails = () =>({
  description: 'HIHI day la tai san bao dam cua minh ',
  market_name: ' bà chiểu',
  block: '1',
  floor: '2',
  brand_name: '3',
  start_date:1641288467000,
  end_date: 1652952471000,
  used_rest: 20,
  area: 120,
  price: 2000000,
  loan_rate: 12,
  collateral_land: {} as ICollateralLand,
  collateral_land_asset: {} as ICollateralLandAsset,
  collateral_apartment: {} as ICollateralApartmentAsset,
})

export const autofillcollateralLand = () => ({
  address: '146 vu tung',
  province_code: '89',
  district_code: '889',
  ward_code: '30463',
  land_number: '13',
  map_number: '4',
  area: 1220,
  real_area: 555,
  expiry_date: 20,
  land_source: 'kinh doanh',
  price: 1200000000
})
export const autofillcollateralLandAsset = () => ({
  address: '89 Tran hung dao',
  province_code: '89',
  district_code: '889',
  ward_code: '30499',
  building_area: 1200,
  certificate_area: 400,
  real_area: 22,
  expiry_date: 120,
  owner_type: 'Kinh doanh',
  price: 200000000
})
export const autofillcollateralApt = () => ({
  expiration_date: 36,
  address: '81 llandmark',
  province_code: '77',
  district_code: '752',
  ward_code: '26662',
  apartment_number: '5',
  block: '12a',
  floor: '12',
  contract_name: 'HD THUE can ho landmark ',
  contract_number: 'HD123154',
  contract_date: 1625736738000,
  area: 544,
  carpet_area: 5000,
  price: 20000000
})
export const autofillcollateralBasic = () => ({
  item_order: 1,
  item_name: 'Tài sản đảm bảo 1',
  code: '3432433',
  basic_info: {
    collateral_sub_type: 'LAND',
    certificate_number: 'MSB234',
    collateral_status: 'BUS',
    address: '07 vu tung',
    province_info: '89',
    district_info: '889',
    ward_info: '30484'
  }
})