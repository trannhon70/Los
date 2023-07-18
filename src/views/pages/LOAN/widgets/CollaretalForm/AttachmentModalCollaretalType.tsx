import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import { getDataDocumentWithKey } from "features/loan/normal/storage/selectors";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ILOANNormalDocument } from "types/models/loan/normal/configs/Document";
import AttachmentDynamic, {
  IActionsDynamicModal,
} from "../AttachmentCommon/AttachmentDynamic";
// import * as _ from "lodash";
import {
  removeActionCollaretalDocument,
  saveCollaretalDocument,
  saveCollaretalFile,
} from "features/loan/normal/storage/collateralV2/actions";
import { useDocumentCollateral } from "../AttachmentCommon/AttachmentDynamic/hook";
import useNotify from "app/hooks/useNotify";
import { getIsCollapseActive } from "features/loan/normal/storage/collateralV2/selector";
import useMasterData from "app/hooks/useMasterData";
type Props = {
  open?: boolean;
  onClose?: () => void;
  data?: ILOANNormalDocument[];
  onChange?: (newData: ILOANNormalDocument[]) => void;
  uuidActiveData?: string;
  collaretalType?:string;
};
export default function AttachmentModalCollaretalType({
  open = false,
  onClose = () => undefined,
  data = [],
  onChange = () => undefined,
  uuidActiveData = "",
  collaretalType ='',
}: Props) {
  const extraData = { uuidActiveData, collaretalType };
  const dispatch = useDispatch();
  const notify = useNotify()
  const { EnvGlobal, register } = useMasterData()
    
  useEffect(() => {
    register('envGlobal')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const isCollapsedItem = useSelector(getIsCollapseActive);
  const dataOptions = useSelector(
    // eslint-disable-next-line no-useless-concat
    getDataDocumentWithKey("TAI_SAN_BAO_DAM_THONG_TIN_CHUNG_THU" + "_" + "LOAN")
  );
  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "TAI_SAN_BAO_DAM_THONG_TIN_CHUNG_THU",
        type_loan: "LOAN",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { mappingDocumentCollateral, mappingOptions, useActionHelpers } = useDocumentCollateral();
 
  const [localData, setLocalData] = useState<ILOANNormalDocument[]>(data)
  
  useEffect(() => {
    if(data !== localData) {
      setLocalData(data)
    }
  },[data])

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const newData = actionHelpers.add.file(doc_uuid);
        setLocalData(newData)
      },
    },
    remove: {
      all: () => {
        const newData = actionHelpers.remove.all();
        dispatch(
          saveCollaretalFile(isCollapsedItem?.type ?? "", {
            listFile: newData,
            type: "CollaretalType",
            extraData,
            isDelete: true
          })
        );
      },
      doc: ({ uuids, action_uuid }) => {
        const newData = actionHelpers.remove.doc(action_uuid);
        dispatch(
          saveCollaretalFile(isCollapsedItem?.type ?? "", {
            listFile: newData,
            type: "CollaretalType",
            extraData,
            isDelete: true
          })
        );
      },
      file: ({ uuids, action_uuid }) => {
        const [AllPre, doc_uuid, file_uuid] = uuids;
        const newData = actionHelpers.remove.file(doc_uuid, file_uuid);
        dispatch(
          saveCollaretalFile(isCollapsedItem?.type ?? "", {
            listFile: newData,
            type: "CollaretalType",
            extraData,
            isDelete: true
          })
        );
      },
    },
    update: {
      doc: ({ uuids, action_uuid }, value, optionData) => {
        const [AllPre, doc_uuid] = uuids;
        const newData = actionHelpers.update.doc(
          doc_uuid,
          value ?? "",
          optionData
        );
        setLocalData(newData)
      },
      fileDesc: ({ uuids, action_uuid }, value) => {
        const [AllPre, doc_uuid, file_uuid] = uuids;
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
        saveCollaretalFile(isCollapsedItem?.type ?? "", {
          listFile: localData,
          type: "CollaretalType",
          extraData,
          isDelete: false
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
