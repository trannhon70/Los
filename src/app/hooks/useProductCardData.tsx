import { fetchDataFullProductCardDone, setDataLOSUUID } from 'features/loan/card/storage/products/action';
import { getLOANCardLOSuuid } from 'features/loan/card/storage/products/selector';
import { existLOANCardProductData, fetchingLOANCardData } from 'features/loan/card/storage/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';

const useProductCardData = () => {

  const dispatch = useDispatch();
  const params = useParams() as unknown as ILOANURLParams;
  const fetching = useSelector(fetchingLOANCardData);
  const existData = useSelector(existLOANCardProductData);
  const id = useSelector(getLOANCardLOSuuid);

  useEffect(() => {
    if (params.id !== '-' && !fetching) {
      dispatch(fetchDataFullProductCardDone(params.id));
      dispatch(setDataLOSUUID(params.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { existData, id };
}

export default useProductCardData;