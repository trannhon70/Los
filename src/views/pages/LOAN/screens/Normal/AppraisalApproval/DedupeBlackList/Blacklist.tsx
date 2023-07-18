import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { checkBlackList } from "features/loan/normal/storageApproval/dedupe/actions";
import { getStorageDedupeList } from "features/loan/normal/storageApproval/dedupe/selector";
import { FC, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IBlackListInfo } from "types/models/loan/normal/storageApproval/DedupeBlackList";
import { intToRoman } from "utils";
import { timestampToDate } from "utils/date";
import Empty from "views/components/layout/Empty";
import TableSticky from "views/components/layout/TableSticky";
import { SxHeaderRow, SxTable } from "./style";

const Blacklist: FC = () => {
  const dispatch = useDispatch()

  const getDataBlackList = useSelector(getStorageDedupeList)?.black_list
  const blackListInfo = getDataBlackList?.black_list_info
  const handleCheckBlackList = () => {
    dispatch(checkBlackList())
  }
  const generateDeclareName = (declare: string) => {
    switch (declare) {
      case 'borrower':
        return 'KHÁCH HÀNG VAY';
      case 'marriage':
        return 'NGƯỜI HÔN PHỐI';
      case 'co_brw':
        return 'NGƯỜI ĐỒNG VAY';
      case 'co_payer':
        return 'NGƯỜI ĐỒNG TRẢ NỢ';
      case 'others':
        return 'ĐỐI TƯỢNG KHÁC';
        case 'law_rlt':
          return 'NGƯỜI LIÊN QUAN THEO QUY ĐỊNH CỦA PHÁP LUẬT';
      default:
        return "";
    }
  }

  return <Fragment >
    <Box className='py-3 flex justify-between items-center text-secondary'>
      <Box sx={{ display: 'inline-block' }}>
        <Typography className='font-bold text-18 text-upper' >Danh sách BlackList</Typography>
      </Box>
      <Box className="flex items-center">
        {
          !!getDataBlackList?.update_at && <Fragment>
            <p className="text-12"> 
              <em style={{color : '#707070'}}>Ngày kiểm tra cuối cùng:&nbsp;
                <span className="text-primary">{timestampToDate(getDataBlackList?.update_at ?? 0, 'HH:mm - DD/MM/YYYY')}</span>
              </em>
            </p>
            <Box sx={{
              width: 0,
              height: '18px',
              borderLeft: '2px solid #353535',
              display: 'unset',
              marginRight: '20px',
              marginLeft: '20px',

            }}/>
          </Fragment>
        }
        <Button 
          style={{ 
            border: 'solid 0.5px #eb0029',
            backgroundColor: '#fff',
            boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            borderRadius: 0
          }} 
          variant='outlined' 
          className='text-danger' 
          onClick={handleCheckBlackList}
        >Kiểm tra Blacklist</Button>  
      </Box>
    </Box>
    {
      getDataBlackList ? <Box className="mscb-input-table mscb-input-right">
      <TableSticky className="mscb-table mscb-table-border" sx={SxTable}>
        <TableHead>
          <TableRow className='mscb-table-row-title'>
            <TableCell sx={{ width: "3%" }} align="center">STT</TableCell>
            <TableCell sx={{ width: "15%" }} align="center">TÊN KHÁCH HÀNG</TableCell>
            <TableCell sx={{ width: "15%" }} align="center">SỐ GIẤY TỜ ĐỊNH DANH</TableCell>
            <TableCell sx={{ width: "10%" }} align="center">CIF</TableCell>
            <TableCell sx={{ width: "20%" }} align="center">CHUYÊN ĐỀ</TableCell>
            <TableCell sx={{ width: "22%" }} align="center">NỘI DUNG CÔNG VĂN</TableCell>
            <TableCell sx={{ width: "13%" }} align="center">NGÀY CẬP NHẬT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { 
            blackListInfo && Object.keys(blackListInfo)
            .filter(key => blackListInfo[key as keyof IBlackListInfo] !== null)
              .map((key, idx) => (
              <Fragment key={key}>
                <TableRow className='mscb-table-row-label' sx={SxHeaderRow}>
                  <TableCell align="center">{intToRoman(idx + 1)}</TableCell>
                  <TableCell align="left" colSpan={6} >{generateDeclareName(key)}</TableCell>
                </TableRow>
                {
                  blackListInfo[key as keyof IBlackListInfo]?.map((detail, index) => (
                    <TableRow key={detail.identity_num}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="left">{detail.name}</TableCell>
                      <TableCell align="left"  >{detail.identity_num}</TableCell>
                      {
                        detail.cif_num ? <Fragment>
                          <TableCell align="left">{detail.cif_num}</TableCell>
                          <TableCell align="left">{detail.job_content}</TableCell>
                          <TableCell align="left">{detail.reason}</TableCell>
                          <TableCell align="center">{detail.update_at ? timestampToDate(detail.update_at, 'HH:mm - DD/MM/YYYY') : null}</TableCell>
                        </Fragment> : <TableCell align="left" colSpan={4}>Không tìm thấy thông tin trong hệ thống Blacklist</TableCell>
                      }
                    </TableRow>
                  ))
                }
                </Fragment>
            ))
          }
        </TableBody>
      </TableSticky>
    </Box> : <Empty sx={{
              minHeight: 250,
              "& img": {
                width: "15%"
              },
              fontSize: '20px',
              fontWeight: 300,
              // fontStyle: 'italic',
            }}>
              Chưa có dữ liệu
            </Empty>
    }
  </Fragment>
}
export default Blacklist;