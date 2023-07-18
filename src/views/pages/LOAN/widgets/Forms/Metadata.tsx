import Box from "@mui/material/Box";
import { setCurrentKeywordFormsData } from "features/loan/normal/storage/forms/actions";
import {
  getLOANNormalFormsCurrentKeyword,
  getLOANNormalFormsListMetadata,
  isLoadDonePdfFileForms,
} from "features/loan/normal/storage/forms/selectors";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICurrentValue, IDateLogData } from "types/models/loan/normal/storage/Forms";
import Input from "views/components/base/Input";
import Loading from "views/components/base/Loading";
import CardOutside from "views/components/layout/CardOutside";
import Empty from "views/components/layout/Empty";
import MultiSelectGroupListBase, { IMultiSelectGroupListBase } from "views/components/layout/MultiSelectGroupListBase";
import FileInfo from "./FileInfo";
import FormsHistory from "./History";
interface FormsMetadataProp {
  existFileInfo?: boolean;
}
const FormsMetadata: FC<FormsMetadataProp> = (props) => {
  const { existFileInfo = false } = props;
  const dispatch = useDispatch();
  const listMetadata = useSelector(getLOANNormalFormsListMetadata);
  const currentKeyword = useSelector(getLOANNormalFormsCurrentKeyword);
  const isLoadDonePdf = useSelector(isLoadDonePdfFileForms);
  // const [metaData, setMetaData] = useState<IGroupList[]>([]);
  const [metaData, setMetaData] = useState<IMultiSelectGroupListBase[]>([]);
  const [dateLog, setDateLog] = useState<IDateLogData[]>([]);
  const [searchValue, setSearchValue] = useState<string>("")

  useEffect(() => {
    // let options = [] as IGroupList[];
    let options = [] as IMultiSelectGroupListBase[];
    if (listMetadata && listMetadata.length) {
      listMetadata.forEach((field, index) => {
        if (field.id) {
          const obj = {
            key: index + 1,
            value: field.id,
            label: field.label,
          };
          options.push(obj);
        }
      });
      setMetaData(options);
    }
  }, [listMetadata]);

  useEffect(() => {
    const existed = listMetadata?.find(
      (item) => item.key === Object.keys(currentKeyword)[Object.keys(currentKeyword).length - 1]
    )?.date_logs;
    existed && setDateLog(existed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentKeyword]);

  // const optionsDataPos = (listMetadata.findIndex((item) => item.id === currentKeyword.id) ?? 0) + 1;
  const optionsDataPos = Object.values(currentKeyword).map(id => (listMetadata.findIndex(item => item.id === id) ?? 0) + 1);

  const onChangeMetadata = (items: IMultiSelectGroupListBase[]) => {
    if (listMetadata) {
      const obj: ICurrentValue = {};
      items.forEach(i => {
        const existed = listMetadata.find(item => item.id === i.value);
        if (existed) {
          if (existed.currentCodeContract?.length) {
            if (Array.isArray(existed.currentCodeContract)) {
              obj[existed.currentCodeContract[0]] = Number(i.value);
            } else {
              obj[existed.currentCodeContract] = Number(i.value);
            }
          } else {
            obj[existed.key] = Number(i.value);
          }
        }
      })
      dispatch(setCurrentKeywordFormsData(obj))
    }
  };
  const metaDataOptionFilter = !searchValue?metaData: metaData.filter(data => data.label?.toUpperCase().includes(searchValue.toLocaleUpperCase()))

  return (
    <Box
      sx={{
        width: "298px",
        "& .mscb-outside-card":{
          minHeight: 420,
        },
        "& .mscb-outside-card-content": {
          padding: "0 !important",
          minHeight: 420,
          // "& .MuiList-root": {
          //   maxHeight: 510,
          // },
          // "& .metadataList":{
          //   maxHeight:510,
          // }
        },
        '& .mscb-outside-card-label': {
          // backgroundColor: 'var(--mscb-primary) !important',
          color: 'var(--mscb-primary) !important'
        },
      }}
    >
      <CardOutside label="Danh sách metadata">
      <Input placeholder="Tìm kiếm" onChange={setSearchValue}></Input>

        {
        // isLoadDonePdf ? (
          metaData.length > 0 ? 
            <MultiSelectGroupListBase
              idName='group-list-metadata'
              options={metaDataOptionFilter}
              onSelected={(items) => onChangeMetadata(items)}
              activeIds={optionsDataPos}
              className="metadataList"
            />
           : <Empty sx={{height: 350}}>Không có dữ liệu để hiển thị</Empty>
            // : <Box sx={{ height: "510px" }}>
            //     <Loading />
            //   </Box>
        }
      </CardOutside>
      { existFileInfo ? (
        <CardOutside
          className="mt-3 history-card-outside"
          label="Thông tin tài liệu"
        >
          <FileInfo logData={dateLog} />
        </CardOutside>
      ) : null}


      <CardOutside
        className="mt-3 history-card-outside"
        label="Lịch sử thay đổi"
      >
        <FormsHistory logData={dateLog} />
      </CardOutside>
    </Box>
  );
};

export default FormsMetadata;
