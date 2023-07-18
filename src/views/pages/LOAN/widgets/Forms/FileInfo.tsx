import {
  Box
} from "@mui/material";
import { FC } from "react";
import { FaFileImage, FaFilePdf } from "react-icons/fa";
import { IDateLogData } from "types/models/loan/normal/storage/Forms";
import Input from "views/components/base/Input";
import TextArea from "views/components/base/TextArea";

export interface FileInfoProps {
  logData?: IDateLogData[];
}

const FileInfo: FC<FileInfoProps> = (props) => {
  const { logData } = props;

  return (
    <Box className='p-3' >
      <label className='font-medium'>Tên tài liệu</label>
      <Box className='flex-center mt-1 '>
        <Box className='flex-center' sx={{
          borderRadius: '50%', marginRight: '8px', width: '36px', height: '36px', backgroundColor: '#f2f3f9'
        }}>
          <FaFilePdf size="18px" color="#e04e4e" />
        </Box>
        <label className='text-primary font-medium'>Tài liệu khoản vay của các khoản
          vay.pdf</label>
      </Box>
      <Box className='flex-column pt-2'>
        <label className='font-medium'>Kích thước</label>
        <label>5Mb</label>

      </Box>
      <Box className='flex-column  pt-2'>
        <label className='font-medium'>Thư mục</label>
        <label>Khởi tạo CIF</label>
      </Box>
      <Box className='flex-column pt-2'>
        <label className='font-medium pb-2'>Mô tả</label>
        <TextArea value='Nội dung mô tả tại đây ...' />
      </Box>
    </Box>
  )
}

export default FileInfo;
