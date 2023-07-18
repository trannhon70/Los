import { clearNormalData, fetchDataGuideState } from 'features/loan/normal';
import { fetchConfigMetadataConstant, fetchConfigValidateDateType, fetchLOANNormalData } from 'features/loan/normal/configs/actions';
import {
  existLOANNormalData,
  getLOANNormalLOSId,
  getLOANNormalLOSuuid
} from 'features/loan/normal/storage/selectors';
import { ETypeButtonBarRole } from 'features/loan/normal/storageControl/case';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';

const useNormalData = () => {

  const dispatch = useDispatch();
  const params = useParams() as ILOANURLParams;
  
  const existData = useSelector(existLOANNormalData);
  const id = useSelector(getLOANNormalLOSuuid);
  const los_id = useSelector(getLOANNormalLOSId);

  useEffect(() => {
    if (params.id !== '-' && params.id !== id){
      
      dispatch(clearNormalData())
      dispatch(fetchLOANNormalData(params.id ?? ''));
    }
    if(params['*'] === "product" && los_id){
      dispatch(fetchDataGuideState({los_id , position:ETypeButtonBarRole.PRODUCT_GROUP}))
    }
    dispatch(fetchConfigValidateDateType())
    // lấy metadata constant
    dispatch(fetchConfigMetadataConstant({
      COLLATERAL_LTV_MAX:{},
      DOCUMENT_GROUP_TYPE:{},
      NGHE_NGHIEP: {},
      MA_NGANH_NGHE: {},
      CONST_POLICY_GROUP: {},
      CONST_POLICY_GROUP_DETAIL: {},
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params.id, id]);

  return { existData, id };
}

export default useNormalData;