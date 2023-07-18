import { ILOANNormalStorageIncomeDeclareSalary } from "types/models/loan/normal/storage/Income";
import { RootState } from "types/reducer"

export const getLOANNormalConfigDocumentType = (code: string) => (state: RootState) => {
    return state.LOANNormal.configs.documentType[code]
}
export const getFetchingLOANNormalConfigDocumentType =
  (state: RootState) => state.LOANNormal.configs.documentType.fetching;

export const getFetchedLOANNormalConfigDocumentType =
  (state: RootState) => state.LOANNormal.configs.documentType.fetched;


export const getCodeDocumentTypeChildListIncome = (key: string , incomeType: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource" >) => (state: RootState) => {
  let code: number | null = 0
  switch(incomeType as keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource" >){
    case "salary":
      code = 20;
      break;
    case "assetRent":
      code = 21;
      break;
    case "business":
      code = 22;
      break;
    case "company":
      code = 23;
      break;
    case "stock":
      code = 24;
      break;
    case "deposit":
      code = 25;
      break;
    case "pension":
      code = 26;
      break;
    case "other":
      code = 27;
      break;
    default:
      code = null;
      break;
  };

  return state.LOANNormal.configs.documentType[key]?.data?.find(d => d.id === code)?.child_list ?? []
}


export const getCodeDocumentTypeChildListCIC = (key: string , cicType: string) => (state: RootState) => {

  return state.LOANNormal.configs.documentType[key]?.data?.find(d => d.id === +cicType)?.child_list ?? []
}

export const getCodeDocumentTypeChildListCICV2 = (key: string , cicType: string) => (state: RootState) => {

  return state.LOANNormal.configs.documentType[key]?.data?.find(d => d.id?.toString() === cicType?.toString())?.child_list ?? []
}