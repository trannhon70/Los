import { getIdentityLOANCardStoredFull, getIdentityLOANNormalStoredFull } from "features/loan/normal/storage/cic/selectors";
import { useSelector } from "react-redux";
import { ILOANNormalStorageIdentity } from "types/models/loan/normal/storage/Legal";


const useIdentityInfo = (isCard: boolean, type: string) => {

  const IdentityStoredFullNormal = useSelector(getIdentityLOANNormalStoredFull);

  const IdentityStoredFullCard = useSelector(getIdentityLOANCardStoredFull);
  let identity: ILOANNormalStorageIdentity[] = []
  let persion_uuid: string = "";
  let dataFull: any =[];

  let dataFill: any = [];


  if (!isCard){
    dataFill = IdentityStoredFullNormal;
  }
  else{
    dataFill = IdentityStoredFullCard;
  }

  switch(type){
    case "borrower":
      const idenBorrower: ILOANNormalStorageIdentity[] = dataFill?.borrower?.identity_info as ILOANNormalStorageIdentity[];
      persion_uuid = dataFill?.borrower?.basic_info?.uuid ?? "";
      return {identity: idenBorrower, persion_uuid};

    case "marriage":
      const idenMarriage: ILOANNormalStorageIdentity[] = dataFill?.marriage?.identity_info as ILOANNormalStorageIdentity[];
      persion_uuid = dataFill?.marriage?.basic_info?.uuid ?? "";
      return {identity: idenMarriage, persion_uuid};

    case "co-borrower":
      const full =  dataFill.co_brw;
      return {identity: [], persion_uuid: "", dataFull: full};

    case "co-payer":

      return {identity: [], persion_uuid: "", dataFull: dataFill?.co_payer};

    case "legal-related":

      return {identity: [], persion_uuid: "", dataFull: dataFill?.law_rlt};

    case "others":

      return {identity: [], persion_uuid: "", dataFull: dataFill?.others};

    default:
      return {identity, persion_uuid, dataFull};
  }
}

export default useIdentityInfo;