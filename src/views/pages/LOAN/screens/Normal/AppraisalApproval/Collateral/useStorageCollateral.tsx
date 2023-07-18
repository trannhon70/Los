import useMasterData from "app/hooks/useMasterData";
import {  getAllDataSpreadSheet, getCountCollateralApproval, getDataFullCollType,
  getLOANNormalCarousel,
  getLOANNormalCollapseSubTypeId,
  getLOANNormalCollapseType,
  getLOANNormalCollaretalType,
  getLOANNormalCollateralData,
  getLoanNormalSubType,
  getLoanNormalSubTypeItems,
  getLoanNormalSubTypeItemsActiveApproval,
  getLoanNormalSubTypeItemsData,
  getLoanNormalSubTypeItemsLegalDocs,
  getLOANNormalTotalValueTransportType,
  getToalCollateralValue,
  getTypeLandApproval,
} from "features/loan/normal/storageApproval/collateral/selector";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { ILOANNormalCollateralTypeSpreadSheet } from "types/models/loan/normal/storageApproval/Collateral";


const useStorageCollateral = (type: string, uuidActiveData?: string, uuidActiveSubtype?: string) => {

  const LOANNormalCarousel = useSelector(getLOANNormalCarousel);
  const dataCollateral = useSelector(getDataFullCollType)
  const LOANNormalToalCollateralValue = useSelector(getToalCollateralValue);
  const getdataType = useSelector(getLOANNormalCollaretalType);
  const CollapseType = useSelector(getLOANNormalCollapseType(uuidActiveData ?? ""));
  const LoanNormalSubType = useSelector(getLoanNormalSubType(uuidActiveData ?? ""));
  const SubTypeItems = useSelector(getLoanNormalSubTypeItems(uuidActiveData ?? " ", uuidActiveSubtype ?? "")) ?? [];
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActiveApproval(uuidActiveData ?? "", uuidActiveSubtype ?? ""));
  const getDataCollateral = useSelector(getLOANNormalCollateralData());
  const TotalValueTransportType = useSelector(getLOANNormalTotalValueTransportType(uuidActiveData ?? ""));
  const SubTypeId = useSelector(getLOANNormalCollapseSubTypeId(uuidActiveData ?? "", uuidActiveSubtype ?? ""));
  const dataItems = useSelector(getLoanNormalSubTypeItemsData(uuidActiveData ?? "", uuidActiveSubtype ?? "", SubTypeItemsActive));
  const dataLegalDocs = useSelector(getLoanNormalSubTypeItemsLegalDocs(uuidActiveData ?? "",uuidActiveSubtype ?? "",SubTypeItemsActive)) ?? [];
  const TypeLand = useSelector(getTypeLandApproval(uuidActiveData ?? '', uuidActiveSubtype ?? '', SubTypeItemsActive ?? ""));
  const AllDataSpreadSheet = useSelector(getAllDataSpreadSheet);
  const { CollateralType,TypeRealEstate,VehicleType, MachineType , register} = useMasterData();
  const countCollateral = useSelector(getCountCollateralApproval)
  useEffect(() => {
    register('collateralType')
    register('typeRealEstate')
    register('vehicleType')
    register('machineType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getDataTypeSpreadSheet = () =>{
     let data:ILOANNormalCollateralTypeSpreadSheet[] = []
     dataCollateral.data?.map(coll=>{
       if(coll.type === "REST"){
         coll.sub_type.map(sub=>{
          data.push({
            type:coll.type,
            childType:sub.child_sub_type,
            nameType:CollateralType.find(item =>item.code === coll.type)?.name ?? "",
            nameChildType:TypeRealEstate.find(item =>item.type_real_estate_id === sub.id)?.list.find(i=>i.real_estate_code === sub.child_sub_type)?.real_estate_name ?? "",
            price_cert_uuid:coll.price_cert_uuid ?? ""
          })
         return { ...sub }
        })
       }
       else if(coll.type === "MEST"){
        coll.sub_type.map(sub=>{
          data.push({
            type:coll.type,
            childType:CollateralType.find(item =>item.code === coll.type)?.name ?? "",
            nameType:CollateralType.find(item =>item.code === coll.type)?.name ?? "",
            nameChildType:VehicleType.find(item =>item.code === sub.id)?.name ?? "",
            price_cert_uuid:coll.price_cert_uuid ?? ""
          })
          return { ...sub }
       })
      }  
      else if(coll.type === "DEVI"){
        coll.sub_type.map(sub=>{
          data.push({
            type:coll.type,
            childType:CollateralType.find(item =>item.code === coll.type)?.name ?? "",
            nameType:CollateralType.find(item =>item.code === coll.type)?.name ?? "",
            nameChildType:MachineType.find(item =>item.code === sub.id)?.name ?? "",
            price_cert_uuid:coll.price_cert_uuid ?? ""
          })
          return { ...sub }
       })
      } 
      else{
        data.push({
          type:coll.type,
          childType:CollateralType.find(item =>item.code === coll.type)?.name ?? "",
          nameType:CollateralType.find(item =>item.code === coll.type)?.name ?? "",
          nameChildType:CollateralType.find(item =>item.code === coll.type)?.name ?? "",
          price_cert_uuid:coll.price_cert_uuid ?? ""
        })
       }
       return {...coll}
     })
     return data
  } 

  return {
    dataCollateral:dataCollateral,
    LOANNormalCarousel:LOANNormalCarousel,
    LOANNormalToalCollateralValue:LOANNormalToalCollateralValue,
    getdataType: getdataType,
    CollapseType: CollapseType,
    LoanNormalSubType: LoanNormalSubType,
    SubTypeItems: SubTypeItems,
    SubTypeItemsActive: SubTypeItemsActive, 
    getDataCollateral: getDataCollateral,
    TotalValueTransportType: TotalValueTransportType,
    SubTypeId: SubTypeId,
    dataItems:dataItems,
    dataLegalDocs:dataLegalDocs,
    TypeLand: TypeLand,
    AllDataSpreadSheet:AllDataSpreadSheet,
    dataSelectSpreadSheet:getDataTypeSpreadSheet(),
    countCollateral:countCollateral
  }

}

export default useStorageCollateral;