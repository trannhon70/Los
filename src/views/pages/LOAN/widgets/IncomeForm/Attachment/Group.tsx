import { FC, useState } from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';
import { GrDocumentUpload } from 'react-icons/gr';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Label from 'views/components/base/Label';
import AttachmentDetail from './Detail';
// import DownloadIcon from '@mui/icons-material/Download';
import Checkbox from 'views/components/base/Checkbox';
export interface AttachmentGroupProps {

}

const AttachmentGroup: FC<AttachmentGroupProps> = props => {

  // const [ ChoseFiles, setChoseFiles ] = useState<File[]>();
  const [openDetail, setOpenDetail] = useState(true);

  const clickCollapse = () => setOpenDetail(!openDetail);

  return <Box>
    <Box className="flex items-center justify-between" sx={{ mr: '-8px' }}>
      <Label bold><Checkbox>1. Pháp lý hộ kinh doanh/doanh nghiệp tư nhân</Checkbox></Label>
      <Box className="flex items-center">
        <Box
          className="flex items-center"
          sx={{
            cursor: 'pointer',
            fontSize: '13px',
            borderRight: '1px solid #d8d8d8',
            pr: '12px',
            color: '#747792',
            transition: 'all ease 0.3s',
            '&:hover': {
              color: 'var(--mscb-primary)'
            },
            '& svg': {
              color: 'var(--mscb-primary)'
            },
            '& span': {
              textDecoration: 'underline'
            }
          }}
        >
          <label className="flex items-center" >
            <GrDocumentUpload className="mr-1" />
            <span>Tải lên tập tin</span>
            <input type="file" multiple className="hidden" />
          </label>
        </Box>
        <IconButton
          sx={{
            '& svg': {
              transition: 'all ease 0.3s',
              ...(openDetail ? {} : { transform: 'rotate(-90deg)' }),
              fontSize: '24px',
              '&:hover': {
                color: 'var(--mscb-primary)'
              }
            }
          }}
          onClick={clickCollapse}
        >
          <BiChevronDownCircle />
        </IconButton>
      </Box>
    </Box>
    <Collapse in={openDetail}>
      <Box
        className="pl-5"
        sx={{
          '& .mscb-attachment-detail': {
            '&:last-child': {
              '& .mscb-attachment-detail-info': {
                borderBottom: 'none!important',
                pb: '0!important'
              }
            }
          }
        }}
      >
        <AttachmentDetail />
        <AttachmentDetail />
        <AttachmentDetail />
        <AttachmentDetail />
      </Box>
    </Collapse>
  </Box>

}

export default AttachmentGroup;