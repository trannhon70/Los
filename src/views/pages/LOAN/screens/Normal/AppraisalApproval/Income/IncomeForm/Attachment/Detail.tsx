import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { downloadMultiFileApproval } from 'features/loan/normal/storageApproval/income/action';
import { FC } from 'react';
import { FaFileExcel, FaFileImage, FaFilePdf, FaFileWord } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { DataFile } from 'types/models/loan/normal/storage/Income';
import { getDateFromTimestamp } from 'utils';
import Checkbox from 'views/components/base/Checkbox';

export interface AttachmentDetailProps {
  checked?:boolean;
  dataFile?: DataFile;
  onDeleteFile?(value: string): void;
  onChecked?:(value:boolean)=>void;
}

const AttachmentDetail: FC<AttachmentDetailProps> = props => {

  const {checked=false, dataFile, onDeleteFile,onChecked=()=>undefined } = props;
  const dispatch = useDispatch();

  const onHandDownloadFile = () => {
    const arr : any = dataFile?.uuid ? [`${dataFile?.content_type}<PREFIX>`+ dataFile?.uuid] : [];
    dispatch(downloadMultiFileApproval(arr));
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
      <Box className="pt-1 pr-2">
        <Box className="text-primary" style={{ whiteSpace:'pre-wrap', wordBreak: 'break-all'}}>
          {dataFile?.name }
        </Box>
        <Box>{`Cập nhật: ${dataFile?.updated_by}`}</Box>
        <Box sx={{ fontStyle: 'italic' }}>{getDateFromTimestamp( dataFile?.created_at ?? null)}</Box>
      </Box>
      <Box className="flex justify-between" sx={{ width: '35%' }}>
        <Box className="pt-2 ml-2 flex" sx={{ ml: '4px' }}>
          <span>{dataFile?.name?.split('.').pop() ?? ""}</span>
        </Box>
        <Box sx={{ mr: '-8px' }}>
           <IconButton sx={{ fontSize: '1.15rem' }} onClick={onHandDownloadFile}>
            <HiDownload style={{cursor: 'pointer'}}></HiDownload>
          </IconButton>
        </Box>
      </Box>
    </Box>
  </Box>

}

export default AttachmentDetail;