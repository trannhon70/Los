import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLOANNormalConfigFinanceMetadata } from "features/loan/normal/configs/finance-metadata/actions";
import { 
  getFetchedLOANNormalConfigFinanceMetadata, 
  getFetchingLOANNormalConfigFinanceMetadata, 
  getLOANNormalConfigFinanceMetadata 
} from "features/loan/normal/configs/finance-metadata/selectors";


const useFinanceMetadata = () => {

  const fetching = useSelector(getFetchingLOANNormalConfigFinanceMetadata);
  const fetched = useSelector(getFetchedLOANNormalConfigFinanceMetadata);
  const FinanceMetadata = useSelector(getLOANNormalConfigFinanceMetadata);
  const dispatch = useDispatch();

  useEffect(() => {
    !fetched && !fetching && dispatch(fetchLOANNormalConfigFinanceMetadata());
  });

  return { FinanceMetadata, fetched, fetching };

}

export default useFinanceMetadata;