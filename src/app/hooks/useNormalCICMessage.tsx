import { getValidateLOANNormalStorageCIC } from "features/loan/normal/storage/cic/selectors";
import { useSelector } from "react-redux";
import { ValidateCICMesssage } from "views/pages/LOAN/utils/message";

const useNormalCICMessage = () => {

    const validate = useSelector(getValidateLOANNormalStorageCIC);

    return (field: string, options?: Record<string, string | number | boolean>) => {
      if (validate.valid || field !== validate.field || 
        options?.identity !== validate.identity || options?.credit !== validate.credit
        || options?.card !== validate.card || options?.loan !== validate.loan || options?.collateral !== validate.collateral
        ) return '';
  
      const fieldMessage = ValidateCICMesssage[validate.field as keyof typeof ValidateCICMesssage];
      const role = validate.role as string;
      if (!fieldMessage || !fieldMessage[role as keyof typeof fieldMessage]) return '';
  
      const currentMessage = fieldMessage[role as keyof typeof fieldMessage];
      if (!options) return (currentMessage || validate.message) ?? '';
  
      for (let x in options){
        if (validate[x as keyof typeof validate] !== options[x]){
          return '';
        }
      }
  
      return (currentMessage || validate.message) ?? '';
    }

}

export default useNormalCICMessage;