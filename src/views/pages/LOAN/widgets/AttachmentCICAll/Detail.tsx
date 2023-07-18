import { FC } from 'react';
import { Box, Divider } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { ILOANNormalStorageCICDocumentChildFile } from 'types/models/loan/normal/storage/CIC';
import { timestampToDate } from 'utils/date';
import { APP_DATE_FORMAT } from 'utils/constants';
import { downloadSingleFile } from 'features/loan/normal/configs/actions';
import { useDispatch } from 'react-redux';

interface ChildFileProps {
  indexType: number;
  indexGroup: number;
  indexFile: number;
  data: ILOANNormalStorageCICDocumentChildFile;
  parentDocId?: string;
  docId?: string;
}

const Detail: FC<ChildFileProps> = ({
  indexFile,
  indexType,
  indexGroup,
  data,
  parentDocId = '',
  docId = '',
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <Box className="flex-center" sx={{ width: '100%' }}>
        <Box
          sx={{ width: '3%', fontSize: '14px', color: '#353535' }}
          className="flex justify-center"
        >
          {indexType + 1}.{indexFile + 1}
        </Box>
        <Box sx={{ width: '22%', marginRight: '3%', wordBreak: 'break-all' }}>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '25px',
            }}
          >
            <>
              <ImageIcon />
              <span
                style={{
                  marginLeft: '5px',
                  color: '#1825aa',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  dispatch(downloadSingleFile([data?.uuid]));
                }}
              >
                {data.name}
              </span>
            </>
          </Box>
        </Box>
        <Box
          sx={{
            width: '40%',
            fontSize: '14px',
            color: '#353535',
            fontWeight: '500',
          }}
        >
          {data?.description ?? ''}
        </Box>
        <Box sx={{ width: '25%' }}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <>
              <span
                style={{
                  fontSize: '14px',
                  color: '#353535',
                  fontWeight: '500',
                }}
              >
                {data?.created_by_name ?? ''}
              </span>
              <span style={{ color: '#808080', fontSize: '12px' }}>
                {timestampToDate(
                  data.created_at ?? 0,
                  'HH:mm ' + APP_DATE_FORMAT
                )}
              </span>
            </>
          </Box>
        </Box>
        <Box
          sx={{
            width: '10%',
            justifyContent: 'flex-end',
            display: 'flex',
          }}
        ></Box>
      </Box>
      <Divider
        sx={{
          borderBottomWidth: '2px',
          margin: '10px 0px',
          width: '97%',
          float: 'right',
          borderColor: '#c6c5d1',
        }}
      />
    </>
  );
};
export default Detail;
