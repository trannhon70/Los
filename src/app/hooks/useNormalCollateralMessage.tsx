
import { getValidateLOANNormalStorageCollateral } from "features/loan/normal/storage/collateralV2/selector";
import { useSelector } from "react-redux";
import { ValidateCollateralMesssage } from "views/pages/LOAN/utils/message";

const useNormalCollateralMessage = () => {

  const validate = useSelector(getValidateLOANNormalStorageCollateral);
  

  return (field: string, options?: Record<string, string | number | boolean>) => {
    if (validate.valid || field !== validate.field) return '';

    const fieldMessage = ValidateCollateralMesssage[validate.field as keyof typeof ValidateCollateralMesssage];
    const role = validate.role as string;
    if (!fieldMessage || !fieldMessage[role as keyof typeof fieldMessage]) return '';

    const currentMessage = fieldMessage[role as keyof typeof fieldMessage];
    if (!options) return (currentMessage || validate.message) ?? '';
    // if(validate.percent) return (currentMessage || validate.message) + validate.percent ?? ''
    for (let x in options){
      if (validate[x as keyof typeof validate] !== options[x]){
        return '';
      }
    }

    return (currentMessage || validate.message) ?? '' ;
  }

}

export default useNormalCollateralMessage;