import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { downloadMultiFile } from 'features/loan/normal/storage/income/action';
import { FC } from 'react';
import { FaFileExcel, FaFileImage, FaFilePdf, FaFileWord } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { DataFile } from 'types/models/loan/normal/storage/Income';
import { getDateFromTimestamp } from 'utils';
import Checkbox from 'views/components/base/Checkbox';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { timestampToDate } from 'utils/date';

export interface AttachmentDetailProps {
  checked?:boolean;
  dataFile?: DataFile;
  onDeleteFile?(value: string): void;
  onChecked?:(value:boolean)=>void;
}

const AttachmentDetail: FC<AttachmentDetailProps> = props => {
  const ruleDisabled = useSelector(getRuleDisbled)
  const {checked=false, dataFile, onDeleteFile,onChecked=()=>undefined } = props;
  const dispatch = useDispatch();
  const onHandleDeleteFile = () => {
    if(dataFile && onDeleteFile){
      onDeleteFile(dataFile.uuid)
    }
  }

  const onHandDownloadFile = () => {
    const arr : any = dataFile?.uuid ? [dataFile?.uuid] : [];
    dispatch(downloadMultiFile(arr));
  }
return <Box className="flex mscb-attachment-detail" sx={{ flex: 1 }}>
    <Checkbox
      checked={checked}
      onChecked={onChecked}
    ></Checkbox>
    <Box
      className="pt-1"
      sx={{
        width: '2rem',
        height: '2rem',
        '& svg': {
          color: 'var(--mscb-primary)'
        }
      }}>
      {
        dataFile?.name?.split('.').pop()?.toUpperCase() === 'XLSX' ?
        <FaFileExcel size="30px" color="#19ae5f" /> :
        dataFile?.name?.split('.').pop()?.toUpperCase() === 'DOCX' ?
        <FaFileWord size="30px" color="#209cee" /> :
        dataFile?.name?.split('.').pop()?.toUpperCase() === 'PDF' ?
        <FaFilePdf size="30px" color="#e04e4e" /> : <FaFileImage size="30px" color="#19ae5f" />
      }
    </Box>
    <Box
      className="flex justify-between ml-3 pb-3 mb-3 w-full mscb-attachment-detail-info"
      sx={{
        borderBottom: '1px solid #d8d8d8'
      }}
    >
      <Box className="pt-1">
        <Box className="text-primary" style={{ whiteSpace:'pre-wrap', wordBreak: 'break-all'}}>
          {dataFile?.name }
        </Box>
        <Box>{`Cập nhật: ${dataFile?.updated_by_name ? dataFile?.updated_by_name : dataFile?.created_by_name}`}</Box>
        <Box sx={{ fontStyle: 'italic' }}>{timestampToDate(dataFile?.updated_at ?? 0, "HH:mm - DD/MM/YYYY")  }</Box>
      </Box>
      {!ruleDisabled ? (
        <Box className="flex" sx={{ minWidth: '150px' }}>
          <Box className="pt-1 ml-2 flex justify-between pr-4" sx={{ width: 'calc(100% - 36px)' }}>
            <span className='text-primary'>{dataFile?.name?.split('.').pop() ?? ""}</span>
            <HiDownload className='mt-1' style={{cursor: 'pointer'}} onClick={onHandDownloadFile}></HiDownload>
          </Box>
          <Box sx={{ mr: '-8px' }}>
            <IconButton  onClick={onHandleDeleteFile}>
              {ruleDisabled ? null : <IoTrashOutline style={{ fontSize: '1rem' }} /> }
            </IconButton>
          </Box>
        </Box>) : (
        <Box className="pt-2 ml-2 flex justify-between" sx={{ ml: '4px' }}>
          <span>{dataFile?.name?.split('.').pop() ?? ""}</span>
          <HiDownload style={{cursor: 'pointer'}} onClick={onHandDownloadFile}></HiDownload>
        </Box>
      )
    }
    </Box>
  </Box>

}

export default AttachmentDetail;