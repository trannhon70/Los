import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import { getDataDocumentWithKey } from "features/loan/normal/storage/selectors";
import React, { Fragment, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ILOANNormalDocument } from "types/models/loan/normal/configs/Document";
import ButtonAttachFile from "views/components/base/ButtonAttachFile";
import AttachmentDynamic, {
  IActionsDynamicModal,
} from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic";
import { useDocumentCollateral } from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook";
export default function ButtonAttachmentModalCollateral({
  data = [],
  attachment = 0
}: {
  data: ILOANNormalDocument[];
  attachment?: number;
}) {

  const dataOptions = useSelector(
    getDataDocumentWithKey("TAI_SAN_BAO_DAM_THONG_TIN_CHUNG_THU" + "_" + "LOAN")
  );
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "TAI_SAN_BAO_DAM_THONG_TIN_CHUNG_THU",
        type_loan: "LOAN",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openAttachModal, setOpenAttachModal] = useState<boolean>(false);
  const { mappingDocumentCollateral, mappingOptions } = useDocumentCollateral();
  const options = mappingOptions(dataOptions);
  const mappingData = useMemo(() => {
    return mappingDocumentCollateral(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const actions: IActionsDynamicModal = {
    add: {
      doc: () => undefined,
      file: (doc_uuid) => undefined,
    },
    remove: {
      all: () => undefined,
      doc: (uuids) => undefined,
      file: (uuids) => undefined,
    },
    update: {
      doc: (uuids, value) => undefined,
      fileDesc: (uuids, value) => undefined,
    },
    chooseFile: () => undefined,
    onClose: () => setOpenAttachModal(false),
    onSave: () => undefined,
  };

  return (
    <Fragment>
      <ButtonAttachFile
        attachment={attachment}
        onClick={() => setOpenAttachModal(true)}
      />
      {openAttachModal && (
        <AttachmentDynamic
          open={openAttachModal}
          dataDocs={mappingData}
          docOptions={options}
          viewOnly={true}
          actions={actions}
        />
      )}
    </Fragment>
  );
}
