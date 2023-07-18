import {  getAllDataCollateralIgnore, getDataFullCollType, getLOANNormalCarousel, getLOANNormalCollapseSubTypeId, getLOANNormalCollapseType, getLOANNormalCollaretalType, getLOANNormalCollateralData, getLOANNormalStorageCollateralFull, getLoanNormalSubType, getLoanNormalSubTypeItems, getLoanNormalSubTypeItemsActive, getLoanNormalSubTypeItemsData, getLoanNormalSubTypeItemsLegalDocs, getLOANNormalTotalValueTransportType, getLOANormalStoreColalteralLandCTXDGcnQshCurrentIndex, getLOANormalStoreLegalOwnerLegalData, getToalCollateralValue, getTypeLand } from "features/loan/normal/storage/collateralV2/selector";
import { useSelector } from 'react-redux';


const useStorageCollateral = (type: string, uuidActiveData?: string, uuidActiveSubtype?: string) => {

  const LOANNormalCarousel = useSelector(getLOANNormalCarousel);
  const fullCollateral = useSelector(getLOANNormalStorageCollateralFull)
  const dataIgnore = useSelector(getAllDataCollateralIgnore);
  const dataCollateral = useSelector(getDataFullCollType)
  const LOANNormalToalCollateralValue = useSelector(getToalCollateralValue);
  const getdataType = useSelector(getLOANNormalCollaretalType);
  const CollapseType = useSelector(getLOANNormalCollapseType(uuidActiveData ?? ""));
  const LoanNormalSubType = useSelector(getLoanNormalSubType(uuidActiveData ?? ""));
  const SubTypeItems = useSelector(getLoanNormalSubTypeItems(uuidActiveData ?? " ", uuidActiveSubtype ?? "")) ?? [];
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive(uuidActiveData ?? "", uuidActiveSubtype ?? ""));
  const getDataCollateral = useSelector(getLOANNormalCollateralData());
  const TotalValueTransportType = useSelector(getLOANNormalTotalValueTransportType(uuidActiveData ?? ""));
  const SubTypeId = useSelector(getLOANNormalCollapseSubTypeId(uuidActiveData ?? "", uuidActiveSubtype ?? ""));
  const dataItems = useSelector(getLoanNormalSubTypeItemsData(uuidActiveData ?? "", uuidActiveSubtype ?? "", SubTypeItemsActive));
  const dataLegalDocs = useSelector(getLoanNormalSubTypeItemsLegalDocs(uuidActiveData ?? "",uuidActiveSubtype ?? "",SubTypeItemsActive)) ?? [];
  const TypeLand = useSelector(getTypeLand(uuidActiveData ?? '', uuidActiveSubtype ?? '', SubTypeItemsActive ?? ""));
  const infoOwner = useSelector(getLOANormalStoreLegalOwnerLegalData(uuidActiveData ?? "", uuidActiveSubtype ?? ""));
  const LandCTXDGcnQshCurrentIndex = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshCurrentIndex(uuidActiveData ?? "", uuidActiveSubtype ?? ""));
  return {
    fullCollateral: fullCollateral,
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
    dataIgnore:dataIgnore,
    infoOwner:infoOwner,
    LandCTXDGcnQshCurrentIndex:LandCTXDGcnQshCurrentIndex
  }

}

export default useStorageCollateral;