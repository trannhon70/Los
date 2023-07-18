import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import {
  getLOANNormalLOSId,
  getLOANNormalLOSuuid
} from 'features/loan/normal/storage/selectors';
import { fetchLOANApprovalData } from 'features/loan/normal';
import { existLOANApprovalData } from 'features/loan/normal/storageApproval/selectors';
import { fetchApprovalSourceIncome } from 'features/loan/normal';

const useApprovalData = () => {

  const dispatch = useDispatch();
  const params = useParams() as ILOANURLParams;
  const existData = useSelector(existLOANApprovalData);

  const id = useSelector(getLOANNormalLOSuuid);
  const los_id = useSelector(getLOANNormalLOSId)

  // useEffect(() => {
  //   if (params.id !== '-' && !existData && params.id !== id) {
  //     //  params.stage === 'appraisal-approval' && dispatch(fetchLOANApprovalData({ los_id: los_id, los_uuid: params.id ?? "" }));
  //   }
  //   // if (params.id !== '-' && params.id !== id) {
  //   //   // dispatch(fetchLOANNormalData(params.id ?? ''));
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if( los_id && params.stage === 'appraisal-approval' && !existData){
      dispatch(fetchLOANApprovalData({ los_id: los_id, los_uuid: params.id ?? "" }))
       && dispatch(fetchApprovalSourceIncome(los_id))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [los_id, params.stage])

  return { existData, id };
}

export default useApprovalData;