import { RootState } from "types";
import { ECorrdinator } from "./case";


export const getStoredCorrdinator = (state: RootState) => state.corrdinator;

export const corrdinatorFetched = 
  (state: RootState) => state.corrdinator.profile.fetched;

export const corrdinatorFetching = 
  (state: RootState) => state.corrdinator.profile.fetching;

export const getLOANCorrdinatorList = (documentType: string) => (state: RootState) =>{
  if(documentType === ECorrdinator.LOAN){
    return state.corrdinator.profile.LOAN.data;
  }
  else if (documentType === ECorrdinator.CREDIT){
    return state.corrdinator.profile.CREDIT.data;
  }
  else{
    return [];
  }
}

export const corrdinatorPage = (documentType: string) => (state: RootState) =>{
  if(documentType === ECorrdinator.LOAN){
    return state.corrdinator.profile.LOAN.page;
  }
  if (documentType === ECorrdinator.CREDIT){
    return state.corrdinator.profile.CREDIT.page;
  }
}

export const corrdinatorTotalPage= (documentType: string) => (state: RootState) =>{
  if(documentType === ECorrdinator.LOAN){
    return state.corrdinator.profile.LOAN.total_page;
  }
  if (documentType === ECorrdinator.CREDIT){
    return state.corrdinator.profile.CREDIT.total_page;
  }
}

export const corrdinatorLimit= (documentType: string) => (state: RootState) =>{
  if(documentType === ECorrdinator.LOAN){
    return state.corrdinator.profile.LOAN.limit;
  }
  if (documentType === ECorrdinator.CREDIT){
    return state.corrdinator.profile.CREDIT.limit;
  }
}

export const corrdinatorOrderBy= (documentType: string) => (state: RootState) =>{
  if(documentType === ECorrdinator.LOAN){
    return state.corrdinator.profile.LOAN?.order_by ?? "";
  }
  if (documentType === ECorrdinator.CREDIT){
    return state.corrdinator.profile.CREDIT?.order_by ?? "";
  }
}

export const corrdinatorCustomerName= (documentType: string) => (state: RootState) =>{
  if(documentType === ECorrdinator.LOAN){
    return state.corrdinator.profile.LOAN?.customer_name ?? "";
  } else if (documentType === ECorrdinator.CREDIT){
    return state.corrdinator.profile.CREDIT?.customer_name ?? "";
  }
  else {
    return "";
  }
}




