import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import { getDataDocumentWithKey } from "features/loan/normal/storage/selectors";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ILOANNormalDocument } from "types/models/loan/normal/configs/Document";
// import * as _ from "lodash";
import AttachmentDynamic, {
  IActionsDynamicModal,
} from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic";
import { useDocumentCollateral } from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook";
import {
  removeActionCollaretalDocument,
  saveCollaretalDocument,
  saveCollaretalFile,
} from "features/loan/normal/storage/collateralV2/actions";
import useNotify from "app/hooks/useNotify";
import useMasterData from "app/hooks/useMasterData";
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
  const notify = useNotify()
  const { EnvGlobal, register } = useMasterData()
    
  useEffect(() => {
    register('envGlobal')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
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

  const [localData, setLocalData] = useState<ILOANNormalDocument[]>(data)

  useEffect(() => {
    if(data !== localData) {
      setLocalData(data)
    }
  },[data])
  
  const { mappingDocumentCollateral, mappingOptions, useActionHelpers } = useDocumentCollateral();

  const mappingData = useMemo(() => mappingDocumentCollateral(localData), [localData]);
  const actionHelpers = useActionHelpers(localData);
  const options = mappingOptions(dataOptions);

  const action: IActionsDynamicModal = {
    add: {
      doc: ({ uuids, action_uuid }) => {
        const newData = actionHelpers.add.doc();
        setLocalData(newData)
      },
      file: ({ uuids, action_uuid }) => {
        const [AllPre, doc_uuid] = uuids;
        // console.log("AllPre", AllPre);
        const newData = actionHelpers.add.file(doc_uuid);
        setLocalData(newData)
      },
    },
    remove: {
      all: () => {
        const newData = actionHelpers.remove.all();
        dispatch(
          saveCollaretalFile("REST", {
            listFile: newData,
            type: "LandCTXDGCN",
            extraData,
            isDelete: true
          })
        );
        // dispatch(
        //   removeActionCollaretalDocument("", {
        //     type: "LandCTXDGCN",
        //     extraData,
        //   })
        // );
      },
      doc: ({ uuids, action_uuid }) => {
        const [AllPre, doc_uuid] = uuids;
        // console.log("AllPre", AllPre);
        const newData = actionHelpers.remove.doc(doc_uuid);
        dispatch(
          saveCollaretalFile("REST", {
            listFile: newData,
            type: "LandCTXDGCN",
            extraData,
            isDelete: true
          })
        );
        // onChange(newData);
        // dispatch(
        //   removeActionCollaretalDocument(action_uuid, {
        //     type: "LandCTXDGCN",
        //     extraData,
        //   })
        // );
      },
      file: ({ uuids, action_uuid }) => {
        const [AllPre, doc_uuid, file_uuid] = uuids;
        // console.log("AllPre", AllPre);
        const newData = actionHelpers.remove.file(doc_uuid, file_uuid);
        dispatch(
          saveCollaretalFile("REST", {
            listFile: newData,
            type: "LandCTXDGCN",
            extraData,
            isDelete: true
          })
        );
        // onChange(newData);
        // dispatch(
        //   removeActionCollaretalDocument(action_uuid, {
        //     type: "LandCTXDGCN",
        //     extraData,
        //   })
        // );
      },
    },
    update: {
      doc: ({ uuids, action_uuid }, value, optionData) => {
        const [AllPre, doc_uuid] = uuids;
        // console.log("AllPre", AllPre);
        const newData = actionHelpers.update.doc(
          doc_uuid,
          value ?? "",
          optionData
        );
        setLocalData(newData)
      },
      fileDesc: ({ uuids, action_uuid }, value) => {
        const [AllPre, doc_uuid, file_uuid] = uuids;
        // console.log("AllPre", AllPre);
        const newData = actionHelpers.update.fileDesc(
          doc_uuid,
          file_uuid,
          value
        );
        setLocalData(newData)
      },
    },
    chooseFile: ({ uuids, action_uuid }, dataFiles) => {
      const [AllPre, doc_uuid, file_uuid] = uuids;
      // console.log("AllPre", AllPre);
      const newData = actionHelpers.chooseFile(doc_uuid, file_uuid, dataFiles);
      const size  = Number(EnvGlobal.find(i => i.code === 'FILE_MAX_SIZE')?.value ?? 0)
      const isOverSize = dataFiles.every((i)=> i.size && i.size > size/1024)
      if(isOverSize){
        notify(`Dung lượng file không được lớn hơn ${size/1024/1024}MB`,'error')

      }else{
        setLocalData(newData)
      }
    },
    onClose,
    onSave: () => {
      dispatch(
        saveCollaretalFile("REST", {
          listFile: localData,
          type: "LandCTXDGCN",
          extraData,
          isDelete: false
        })
      );
      // dispatch(
      //   saveCollaretalDocument(data, {
      //     type: "LandCTXDGCN",
      //     extraData,
      //   })
      // );
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
