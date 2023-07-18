import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import { getDataDocumentWithKey } from "features/loan/normal/storage/selectors";
import React, { useLayoutEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ILOANNormalDocument } from "types/models/loan/normal/configs/Document";
import * as _ from "lodash";
import AttachmentDynamic, {
  IActionsDynamicModal,
} from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic";
import { useDocumentCollateral } from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook";
import {
  removeActionCollaretalDocument,
  saveCollaretalDocument,
} from "features/loan/normal/storage/collateralV2/actions";
type Props = {
  open?: boolean;
  onClose?: () => void;
  activeCTXDUUid?: string;
  data?: ILOANNormalDocument[];
  onChange?: (newData: ILOANNormalDocument[]) => void;
  masterData?: {
    uuid: string,
    uuidActive: string,
  };
};
export default function AttachmentCTXDGCN({
  open = false,
  onClose = () => undefined,
  activeCTXDUUid = "",
  data = [],
  onChange = () => undefined,
  masterData = {
    uuid: "",
    uuidActive: "",
  },
}: Props) {
  const extraData = {...masterData,collaretalType :"REST"};
  const dispatch = useDispatch();
  const dataOptions = useSelector(
    getDataDocumentWithKey("TAI_SAN_BAO_DAM_PHAP_LY_CTXD_GCN_RIENG" + "_" + "LOAN")
  );
  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "TAI_SAN_BAO_DAM_PHAP_LY_CTXD_GCN_RIENG",
        type_loan: "LOAN",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { mappingDocumentCollateral, mappingOptions, useActionHelpers } =
    useDocumentCollateral();

  const mappingData = useMemo(() => mappingDocumentCollateral(data), [data]);
  const actionHelpers = useActionHelpers(data);
  const options = mappingOptions(dataOptions);

  const action: IActionsDynamicModal = {
    add: {
      doc: ({ uuids, action_uuid }) => {
        const newData = actionHelpers.add.doc();
        onChange(newData);
      },
      file: ({ uuids, action_uuid }) => {
        const [AllPre, doc_uuid] = uuids;
        console.log("AllPre", AllPre);
        const newData = actionHelpers.add.file(doc_uuid);
        onChange(newData);
      },
    },
    remove: {
      all: () => {
        const newData = actionHelpers.remove.all();
        onChange(newData);
        dispatch(
          removeActionCollaretalDocument("", {
            type: "LandCTXDGCN",
            extraData,
          })
        );
      },
      doc: ({ uuids, action_uuid }) => {
        const [AllPre, doc_uuid] = uuids;
        console.log("AllPre", AllPre);
        const newData = actionHelpers.remove.doc(doc_uuid);
        onChange(newData);
        dispatch(
          removeActionCollaretalDocument(action_uuid, {
            type: "LandCTXDGCN",
            extraData,
          })
        );
      },
      file: ({ uuids, action_uuid }) => {
        const [AllPre, doc_uuid, file_uuid] = uuids;
        console.log("AllPre", AllPre);
        const newData = actionHelpers.remove.file(doc_uuid, file_uuid);
        onChange(newData);
        dispatch(
          removeActionCollaretalDocument(action_uuid, {
            type: "LandCTXDGCN",
            extraData,
          })
        );
      },
    },
    update: {
      doc: ({ uuids, action_uuid }, value, optionData) => {
        const [AllPre, doc_uuid] = uuids;
        console.log("AllPre", AllPre);
        const newData = actionHelpers.update.doc(
          doc_uuid,
          value ?? "",
          optionData
        );
        onChange(newData);
      },
      fileDesc: ({ uuids, action_uuid }, value) => {
        const [AllPre, doc_uuid, file_uuid] = uuids;
        console.log("AllPre", AllPre);
        const newData = actionHelpers.update.fileDesc(
          doc_uuid,
          file_uuid,
          value
        );
        onChange(newData);
      },
    },
    chooseFile: ({ uuids, action_uuid }, dataFiles) => {
      const [AllPre, doc_uuid, file_uuid] = uuids;
      console.log("AllPre", AllPre);
      const newData = actionHelpers.chooseFile(doc_uuid, file_uuid, dataFiles);
      onChange(newData);
    },
    onClose,
    onSave: () => {
      dispatch(
        saveCollaretalDocument(data, {
          type: "LandCTXDGCN",
          extraData,
        })
      );
    },
  };
  return (
    <>
      <AttachmentDynamic
        open={open}
        dataDocs={mappingData}
        actions={action}
        docOptions={options}
      />
    </>
  );
}
