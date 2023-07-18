import { Box, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { FC, Fragment } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import TableSticky from "views/components/layout/TableSticky";


const HistoryList: FC = () => {

    return <Fragment>
        <Typography textTransform="uppercase" fontWeight="bold" variant="h6" color="#353535">lịch sử</Typography>
        <Box component='div'>
            <TableSticky className='mscb-table'>
                <TableHead>
                    <TableRow>
                        <TableCell className="table-th text-16" align='left'>STT</TableCell>
                        <TableCell className="table-th text-16">NỘI DUNG</TableCell>
                        <TableCell className="table-th text-16" align='left'>CẬP NHẬT GẦN NHẤT</TableCell>
                        <TableCell className="table-th text-16" align='left'>GHI CHÚ</TableCell>
                        <TableCell className="table-th text-16" align='right'><IoSettingsSharp /></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableCell className="table-th" align='left'>STT</TableCell>
                    <TableCell className="table-th">
                        <Typography
                            variant="caption"
                            color="var(--mscb-primary)"
                            fontSize="14px"
                            fontWeight={500}
                        >
                            Ngô Thị Cẩm Tiên đã xem tài liệu
                        </Typography>
                    </TableCell>

                    <TableCell className="table-th" align='left'>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <Typography
                                variant="caption"
                                color="#353535"
                                fontSize="14px"
                                fontWeight={500}
                            >
                                09:00 - 10/05/2021
                            </Typography>
                        </Box>
                    </TableCell>
                    <TableCell className="table-th" align='left'>file vay tiêu dùng rất quan trọng cần lưu ý kỹ cập nhật thông tin</TableCell>
                    <TableCell className="table-th" align='right' sx={{ width: '10%', textAlign: 'end' }}>
                        <AiFillStar style={{ fontSize: '16px', color: '#f1b513', marginRight: "10px" }} />
                        <BiDotsHorizontalRounded style={{ fontSize: '18px', color: '#707070' }} />
                    </TableCell>
                </TableBody>
            </TableSticky>
        </Box>
    </Fragment>
};

export default HistoryList;
