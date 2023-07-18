import useNotify from "app/hooks/useNotify";
import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import { setCollaretalRPRO, setCollateralValidate } from "features/loan/normal/storage/collateralV2/actions";
import { ValidateCollateralRestStorage, ValidateCollateralStorage } from "features/loan/normal/storage/collateralV2/selector";
import React, { Fragment, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ISubItems, IValueOnChangeCollateral } from "types/models/loan/normal/storage/CollaretalV2";
import ButtonAttachFile from "views/components/base/ButtonAttachFile";
import { getCountAttachment } from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook";
import AttachmentSubItemDetail from "./AttachmentSubItemDetail";
type IProps =  {
  dataItems?:ISubItems;
  masterData?: {
    uuid: string;
    uuidActive: string;
    collaretalType?:string;
  };
}
export default function ButtonDetailSubItemAttachment({dataItems,masterData}:IProps) {
  const dispatch = useDispatch();
  const [openAttachModal,setOpenAttachModal] = useState<boolean>(false);
  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "TAI_SAN_BAO_DAM_LOAI_TS_KHAC_BDDS",
        type_loan: "LOAN",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const notify = useNotify()
  const valid = useSelector(ValidateCollateralStorage);
  const validRest = useSelector(ValidateCollateralRestStorage);
  
  if(!dataItems) return null;
  
  const onChangeDataDetails = (value: IValueOnChangeCollateral, key: keyof ISubItems) => {
    dispatch(setCollaretalRPRO(value, { uuid: masterData?.uuid ?? "", uuidActive: masterData?.uuidActive ?? "", key }))
  }

  const handleAttach = () => {
    if((masterData?.collaretalType === "REST" && validRest.valid) || (masterData?.collaretalType !== "REST" && valid?.valid)){
      dispatch(setCollateralValidate({valid : true}))
      setOpenAttachModal(true);
    }
    else{
      if(masterData?.collaretalType === "REST" && !validRest.valid){
        dispatch(setCollateralValidate(validRest))
        notify(validRest.message ? validRest.message : "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại", "warning")
      }
      else if(valid && masterData?.collaretalType !== "REST" && !valid?.valid){
        dispatch(setCollateralValidate(valid))
        notify(valid.message ? valid.message : "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại", "warning")
      }
    }
  }

  return (
    <Fragment>
      <ButtonAttachFile
        attachment={getCountAttachment(dataItems?.documents ?? [])}
        onClick={handleAttach}
      />
      {openAttachModal && (
        <AttachmentSubItemDetail
          open={openAttachModal}
          onClose={() => setOpenAttachModal(false)}
          data={dataItems?.documents ?? []}
          onChange={(newData) => onChangeDataDetails(newData, "documents")}
          masterData={masterData}
        />
      )}
    </Fragment>
  );
}
