import { getDataDocumentWithKey } from "features/loan/normal/storage/selectors";
import React, { useEffect, useMemo, useState } from "react";
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
  saveCollaretalFile,
} from "features/loan/normal/storage/collateralV2/actions";
import useNotify from "app/hooks/useNotify";
import { getIsCollapseActive } from "features/loan/normal/storage/collateralV2/selector";
import useMasterData from "app/hooks/useMasterData";
type Props = {
  open?: boolean;
  onClose?: () => void;
  activeCTXDUUid?: string;
  data?: ILOANNormalDocument[];
  onChange?: (newData: ILOANNormalDocument[]) => void;
  masterData?: {
    uuid: string;
    uuidActive: string;
    collaretalType?:string;
  };
};
export default function AttachmentSubItemDetail({
  open = false,
  onClose = () => undefined,
  data = [],
  onChange = () => undefined,
  masterData = {
    uuid:'',
    uuidActive:'',
    collaretalType:'',
  },
}: Props) {
  const extraData = masterData;
  const dispatch = useDispatch();
  const notify = useNotify()
  const {EnvGlobal, register} = useMasterData()
    
  useEffect(() => {
    register('envGlobal')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const dataOptions = useSelector(
    getDataDocumentWithKey("TAI_SAN_BAO_DAM_LOAI_TS_KHAC_BDDS" + "_" + "LOAN")
  );
  const isCollapsedItem = useSelector(getIsCollapseActive)

  const { mappingDocumentCollateral, mappingOptions, useActionHelpers } = useDocumentCollateral();

  const [localData, setLocalData] = useState<ILOANNormalDocument[]>(data)

  useEffect(() => {
    if(data !== localData) {
      setLocalData(data)
    }
  },[data])

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
            type: "No-RealEstate",
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
            type: "No-RealEstate",
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
            type: "No-RealEstate",
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
      const isOverSize = dataFiles.every((i)=> {
        console.log(i.size,'sizeeeee')
        return i.size && i.size > size/1024
      })
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
          type: "No-RealEstate",
          extraData,
          isDelete: false
        })
      );
    },
  };
  
  // const action: IActionsDynamicModal = {
  //   add: {
  //     doc: ({ uuids, action_uuid }) => {
  //       const newData = actionHelpers.add.doc();
  //       onChange(newData);
  //     },
  //     file: ({ uuids, action_uuid }) => {
  //       const [AllPre, doc_uuid] = uuids;
  //       console.log("AllPre", AllPre);
  //       const newData = actionHelpers.add.file(doc_uuid);
  //       onChange(newData);
  //     },
  //   },
  //   remove: {
  //     all: () => {
  //       const newData = actionHelpers.remove.all();
  //       onChange(newData);
  //       dispatch(
  //         removeActionCollaretalDocument("", {
  //           type: "No-RealEstate",
  //           extraData,
  //         })
  //       );
  //     },
  //     doc: ({ uuids, action_uuid }) => {
  //       const [AllPre, doc_uuid] = uuids;
  //       console.log("AllPre", AllPre);
  //       const newData = actionHelpers.remove.doc(doc_uuid);
  //       onChange(newData);
  //       dispatch(
  //         removeActionCollaretalDocument(action_uuid, {
  //           type: "No-RealEstate",
  //           extraData,
  //         })
  //       );
  //     },
  //     file: ({ uuids, action_uuid }) => {
  //       const [AllPre, doc_uuid, file_uuid] = uuids;
  //       console.log("AllPre", AllPre);
  //       const newData = actionHelpers.remove.file(doc_uuid, file_uuid);
  //       onChange(newData);
  //       dispatch(
  //         removeActionCollaretalDocument(action_uuid, {
  //           type: "No-RealEstate",
  //           extraData,
  //         })
  //       );
  //     },
  //   },
  //   update: {
  //     doc: ({ uuids, action_uuid }, value, optionData) => {
  //       const [AllPre, doc_uuid] = uuids;
  //       console.log("AllPre", AllPre);
  //       const newData = actionHelpers.update.doc(
  //         doc_uuid,
  //         value ?? "",
  //         optionData
  //       );
  //       onChange(newData);
  //     },
  //     fileDesc: ({ uuids, action_uuid }, value) => {
  //       const [AllPre, doc_uuid, file_uuid] = uuids;
  //       console.log("AllPre", AllPre);
  //       const newData = actionHelpers.update.fileDesc(
  //         doc_uuid,
  //         file_uuid,
  //         value
  //       );
  //       onChange(newData);
  //     },
  //   },
  //   chooseFile: ({ uuids, action_uuid }, dataFiles) => {
  //     const [AllPre, doc_uuid, file_uuid] = uuids;
  //     console.log("AllPre", AllPre);
  //     const newData = actionHelpers.chooseFile(doc_uuid, file_uuid, dataFiles);
  //     const isOverSize = dataFiles.every((i)=> i.size && i.size > 5000)
  //     if(isOverSize){
  //       notify('Dung lượng file không được lớn hơn 5MB','error')
  //     }else{
  //       onChange(newData);
  //     }
  //   }, 
  //   onClose,
  //   onSave: () => {
  //     dispatch(
  //       saveCollaretalDocument(data, {
  //         type: "No-RealEstate",
  //         extraData,
  //       })
  //     );
  //   },
  // };
  return (
    <>
      <AttachmentDynamic
        open={open}
        dataDocs={mappingData}
        actions={action}
        docOptions={options ?? []}
      />
    </>
  );
}
