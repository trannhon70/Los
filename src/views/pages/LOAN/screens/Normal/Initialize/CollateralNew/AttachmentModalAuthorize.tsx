import useMasterData from 'app/hooks/useMasterData';
import useNotify from 'app/hooks/useNotify';
import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import {
  saveCollaretalFile
} from "features/loan/normal/storage/collateralV2/actions";
import { getDataDocumentWithKey } from "features/loan/normal/storage/selectors";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ILOANNormalDocument
} from "types/models/loan/normal/configs/Document";
import { IInfoAuthorize } from 'types/models/loan/normal/storage/CollaretalV2';
import { PREFIX_LOCAL } from "utils";
import AttachmentDynamic, {
  IActionsDynamicModal
} from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic";
import { useDocumentCollateral } from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook";

interface Props {
  open?: boolean;
  onClose?(): void;
  type_loan?: string;
  data?: ILOANNormalDocument[],
  extraData?: { uuidActiveData: string, uuidActiveSubtype: string, key: keyof IInfoAuthorize}
}
const AttachmentModalAuthorize = ({
  onClose = () => undefined,
  open = false,
  data = [],
  extraData,
  type_loan = "Loan",
}: Props) => {
  const dispatch = useDispatch();
  const notify = useNotify()
  const { EnvGlobal, register } = useMasterData()
    
  useEffect(() => {
    register('envGlobal')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const dataSelectFile = useSelector(
    getDataDocumentWithKey("TAI_SAN_BAO_DAM_PHAP_LY_UY_QUYEN" + "_" + type_loan)
  );
  
  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "TAI_SAN_BAO_DAM_PHAP_LY_UY_QUYEN",
        type_loan: type_loan,
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
  const options = mappingOptions(dataSelectFile);
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
            type: "Authorize",
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
            type: "Authorize",
            extraData,
            isDelete: true
          })
        );
      },
      file: ({ uuids, action_uuid }) => {
        const [AllPre, doc_uuid, file_uuid] = uuids;
        // console.log("AllPre", AllPre);
        const newData = actionHelpers.remove.file(doc_uuid, file_uuid);

        if(file_uuid.includes(PREFIX_LOCAL)){
          notify("Xóa thành công", "success")
          setLocalData(newData)
        }
        else{
          dispatch(
            saveCollaretalFile("REST", {
              listFile: newData,
              type: "Authorize",
              extraData,
              isDelete: true
            })
          );
        }
        
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
      const isOverSize = dataFiles.every((i)=> {
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
        saveCollaretalFile("REST", {
          listFile: localData,
          type: "Authorize",
          extraData,
          isDelete: false
        })
      );
      
    },
  };

  return (
    <AttachmentDynamic
      dataDocs={mappingData}
      docOptions={options ?? []}
      open={open}
      actions={action}
    />
  );
};

export default AttachmentModalAuthorize;
