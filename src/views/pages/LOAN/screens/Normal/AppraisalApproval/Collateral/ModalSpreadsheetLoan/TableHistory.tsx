import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { setEditLogs } from 'features/loan/normal/storageApproval/collateral/actions';
import { getAllDataHistoryLog, getAllDataSpreadSheet } from 'features/loan/normal/storageApproval/collateral/selector';
import { FunctionComponent } from 'react';
import { BsPencil } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { APP_DATE_FORMAT } from 'utils/constants';
import { timestampToDate } from 'utils/date';
import Empty from 'views/components/layout/Empty';
import TableSticky from 'views/components/layout/TableSticky';
import { SxActiveRow, SxRow } from './style';

const TableHistory: FunctionComponent = () => {

  const dispatch = useDispatch()

  const editData = (uuid : string) => {
    dispatch(setEditLogs("", { uuid }))
  }
  const spreedSheet = useSelector(getAllDataSpreadSheet)
  const dataLogs = useSelector(getAllDataHistoryLog)

  return (
    <>
      <Typography variant="h5" component="div" className="text-upper text-secondary font-medium text-18 pb-3">
        LỊCH SỬ BẢN TÍNH
      </Typography>
      <Grid container >
        <Grid item xl={12} md={12} xs={12} >
          <TableContainer className="mt-2">
            <TableSticky
              sx={{ maxHeight: 350 }}
              className="mscb-table mscb-table-border"
            >
              <TableHead >
                <TableRow>
                  <TableCell width="50px" align="center">STT</TableCell>
                  <TableCell align="left">TÊN BẢN TÍNH LTV</TableCell>
                  <TableCell align="left">NGƯỜI CẬP NHẬT</TableCell>
                  <TableCell align="left">THỜI GIAN CẬP NHẬT</TableCell>
                  <TableCell align="center">THAO TÁC</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  dataLogs?.length > 0 ?
                    dataLogs?.map((log, idx) => {
                      const isActive = log.uuid === spreedSheet.uuid;
                      return <TableRow key={log.uuid} sx={isActive ? SxActiveRow : SxRow}>
                        <TableCell width="50px" className="font-medium" align="center">{idx + 1}</TableCell>
                        <TableCell align="left" className="font-medium">
                          {/* {log.title} */}
                          Bảng tính LVT {idx + 1}
                        </TableCell>
                        <TableCell align="left" className="font-medium">
                          {log.updated_by_fullname}
                        </TableCell>
                        <TableCell align="left" className="font-medium">
                          {timestampToDate(log.updated_at ?? 0, 'HH:mm ' + APP_DATE_FORMAT)}
                        </TableCell>
                        <TableCell align="center" className="font-medium">
                          <IconButton
                            color='primary'
                            size="small"
                            onClick={() => editData(log.uuid)}
                            disabled={log.uuid === spreedSheet.uuid}
                          >
                            <BsPencil fontSize='1.1rem' color={isActive ? 'var(--mscb-secondary)' : "var(--mscb-primary)" }/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    })
                    : <TableRow>
                    <TableCell colSpan={6}>
                      <Empty>Không có dữ liệu</Empty>
                    </TableCell>
                  </TableRow>

                }
              </TableBody>
            </TableSticky>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  )
}

export default TableHistory;