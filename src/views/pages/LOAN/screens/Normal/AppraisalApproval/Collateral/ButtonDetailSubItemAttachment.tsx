import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import { setCollaretalRPRO } from "features/loan/normal/storage/collateralV2/actions";
import React, { Fragment, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
  viewOnly?: boolean;
}
export default function ButtonDetailSubItemAttachment({dataItems,masterData, viewOnly}:IProps) {
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

  if(!dataItems) return null;
  
  // const onChangeDataDetails = (value: IValueOnChangeCollateral, key: keyof ISubItems) => {
  //   dispatch(setCollaretalRPRO(value, { uuid: masterData?.uuid ?? "", uuidActive: masterData?.uuidActive ?? "", key }))
  // }
  
console.log("dataItems?.documents_LL", dataItems?.documents);
  return (
    <Fragment>
      <ButtonAttachFile
        attachment={getCountAttachment(dataItems?.documents ?? [])}
        onClick={() => setOpenAttachModal(true)}
      />
      {openAttachModal && (
        <AttachmentSubItemDetail
          open={openAttachModal}
          onClose={() => setOpenAttachModal(false)}
          data={dataItems?.documents ?? []}
          onChange={(newData) => {}}
          masterData={masterData}
          viewOnly={viewOnly}
        />
      )}
    </Fragment>
  );
}
