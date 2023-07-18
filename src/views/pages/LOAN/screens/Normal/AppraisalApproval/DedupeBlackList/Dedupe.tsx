import { Box, Button, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { checkDedupe } from "features/loan/normal/storageApproval/dedupe/actions";
import { getStorageDedupeList } from "features/loan/normal/storageApproval/dedupe/selector";
import { FC, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { intToRoman } from "utils";
import { timestampToDate } from "utils/date";
import Empty from "views/components/layout/Empty";
import TableSticky from "views/components/layout/TableSticky";
import { SxHeaderRow, SxTable } from "./style";

const Dedupe: FC = () => {
  const dispatch = useDispatch()
  const getDataDedupe = useSelector(getStorageDedupeList)?.dedupe_table
  
  const getDataDedupeList = getDataDedupe?.dedupe_rows

  const handleCheckDedupe = () => {
    dispatch(checkDedupe())
  }

  return <Fragment >
    <Box className='py-3 flex justify-between items-center text-secondary'>
      <Box sx={{ display: 'inline-block' }}>
        <Typography className='font-bold text-18 text-upper' >Danh sách Dedupe</Typography>
      </Box>
      <Box className="flex items-center">
        {
          !!getDataDedupe?.last_update_date && <Fragment>
            <p className="text-12"> 
              <em style={{color : '#707070'}}>Ngày kiểm tra cuối cùng:&nbsp;
                <span className="text-primary">{timestampToDate(getDataDedupe?.last_update_date ?? 0, 'HH:mm - DD/MM/YYYY')}</span>
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
          onClick={handleCheckDedupe}
        >Kiểm tra Dedupe</Button>  
      </Box>
    </Box>
    {
      !!getDataDedupeList && getDataDedupeList.length > 0 ? <Box className="mscb-input-table mscb-input-right">
      <TableSticky className="mscb-table mscb-table-border" sx={SxTable}>
        <TableHead>
          <TableRow className='mscb-table-row-title'>
            <TableCell sx={{ width: "3%" }} align="center">STT</TableCell>
            <TableCell sx={{ width: "10%" }} align="center">MÃ HỒ SƠ</TableCell>
            <TableCell sx={{ width: "10%" }} align="center">TÊN KHÁCH HÀNG</TableCell>
            <TableCell sx={{ width: "10%" }} align="center">SỐ GIẤY TỜ ĐỊNH DANH</TableCell>
            <TableCell sx={{ width: "8%" }} align="center">CIF</TableCell>
            <TableCell sx={{ width: "10%" }} align="center">SẢN PHẨM</TableCell>
            <TableCell sx={{ width: "10%" }} align="center">TRẠNG THÁI HỒ SƠ</TableCell>
            <TableCell sx={{ width: "10%" }} align="center">NGÀY KHỞI TẠO</TableCell>
            <TableCell sx={{ width: "13%" }} align="center">NỘI DUNG CẢNH BÁO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { 
            getDataDedupeList?.map((row, idx) => (
              <Fragment key={row.name}>
                <TableRow className='mscb-table-row-label' sx={SxHeaderRow}>
                  <TableCell align="center">{intToRoman(idx + 1)}</TableCell>
                  <TableCell align="left" colSpan={8} >{`${row.customer_type?.toUpperCase()} - ${row.name}`}</TableCell>
                </TableRow>
                {
                  row.dedupe_contents?.length > 0 ? row.dedupe_contents?.map((content, index) => {
                    const docURL = `/loan/normal/init/${ content.los_uuid ?? "-" }/product`
                    return <TableRow key={content.identity_num}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="left">
                        <Link to={ docURL } className="font-medium text-primary">
                          { content.los_id }
                        </Link>
                      </TableCell>
                      <TableCell align="left">{content.name}</TableCell>
                      <TableCell align="left">{content.identity_num}</TableCell>
                      <TableCell align="left">{content.cif}</TableCell>
                      <TableCell align="left">{content.product_name}</TableCell>
                      <TableCell align="center">{content.profile_status}</TableCell>
                      <TableCell align="center">{content.created_at ? timestampToDate(content.created_at, 'HH:mm - DD/MM/YYYY') : null}</TableCell>
                      <TableCell align="left">{content.warning_content}</TableCell>
                    </TableRow>
                  }) : <TableRow>
                    <TableCell align="center" colSpan={9} >Không tìm thấy thông tin trong hệ thống Dedupe</TableCell>
                  </TableRow>
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
export default Dedupe;