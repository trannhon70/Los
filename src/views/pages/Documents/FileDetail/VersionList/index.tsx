
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import { Box, Grid, IconButton, Popover, Radio, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { FC, Fragment, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsArrowLeftRight, BsFileEarmarkBreak, BsFillShareFill } from "react-icons/bs";
import { CgArrowsHAlt } from "react-icons/cg";
import { FaDownload, FaLink, FaLock } from "react-icons/fa";
import { IoChatbubblesSharp, IoSettingsSharp } from "react-icons/io5";
import { MdAccessTimeFilled, MdDelete, MdZoomOutMap } from "react-icons/md";
import TableSticky from "views/components/layout/TableSticky";
import { SxVersionList } from "./style";

interface IVersionList {
    id: number,
    version: string,
    updateName: string,
    updateTime: string,
    note: string,
    check :boolean,
}
const ListVersion = [
    { id: 1, version: 'Phiên bản', updateName: 'Nguyễn Anh Thư', updateTime: '09:10 - 10/05/2021', note: 'file vay tiêu dùng rất quan trọng cần lưu ý kỹ cập nhật thông tin', check:true },
    { id: 2, version: 'Phiên bản 1', updateName: 'Nguyễn Anh Thư', updateTime: '09:10 - 10/05/2021', note: 'file vay tiêu dùng rất quan trọng cần lưu ý kỹ cập nhật thông tin' , check:false},
    { id: 3, version: 'Phiên bản 2', updateName: 'Nguyễn Anh Thư', updateTime: '09:10 - 10/05/2021', note: 'file vay tiêu dùng rất quan trọng cần lưu ý kỹ cập nhật thông tin', check:true },
] as IVersionList[]

const VersionList: FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return <Fragment>
        <Typography textTransform="uppercase" fontWeight="bold" variant="h6" color="#353535">danh sách phiên bản</Typography>
        <Box component='div'>
            <TableSticky className='mscb-table'>
                <TableHead>
                    <TableRow>
                        <TableCell className="table-th text-16" align='left'>STT</TableCell>
                        <TableCell className="table-th text-16">PHIÊN BẢN</TableCell>
                        <TableCell className="table-th text-16" align="center"> PHIÊN BẢN CHÍNH</TableCell>
                        <TableCell className="table-th text-16" align='left'>CẬP NHẬT GẦN NHẤT</TableCell>
                        <TableCell className="table-th text-16" align='left'>GHI CHÚ</TableCell>
                        <TableCell className="table-th text-16" align='right'><IoSettingsSharp /></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        ListVersion.map((list, index) => (
                            <TableRow key={list.id}>
                                <TableCell className="table-th" align='left'>{list.id} </TableCell>
                                <TableCell className="table-th">{list.version} </TableCell>
                                <TableCell className="table-th" align="center">
                                    <Radio
                                        checkedIcon={<CheckCircleIcon sx={{ fontSize: '20px' }} />}
                                        icon={<RadioButtonIcon sx={{ fontSize: '20px' }} />}
                                        checked={list.check} />
                                </TableCell>
                                <TableCell className="table-th" align='left'>
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}>
                                        <Typography
                                            variant="caption"
                                            color="#353535"
                                            fontWeight={500}
                                            fontSize="14px"
                                        >
                                            {list.updateName}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="#808080"
                                            fontSize="12px"
                                        >
                                           {list.updateTime}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell className="table-th" align='left'>{list.note} </TableCell>
                                <TableCell className="table-th" align='right' sx={{ width: '10%', textAlign: 'end' }}>
                                    <IconButton>
                                        <AiFillStar style={{ fontSize: '16px', color: '#f1b513' }} />
                                    </IconButton>
                                    <IconButton aria-describedby={id} onClick={handleClick}>
                                        <BiDotsHorizontalRounded style={{ fontSize: '18px', color: '#707070', cursor: 'pointer' }} />
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TableSticky>
        </Box>
        <Popover
            sx={SxVersionList}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}

            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box className="border_bottom" >
                <Grid container className="pb-1" >
                    <Grid item xs={2} className="icon" ><MdZoomOutMap className="color_icon" /></Grid>
                    <Grid item xs={10} className="text">Mở</Grid>
                </Grid>
                <Grid container className="pb-1" >
                    <Grid item xs={2} className="icon"><IoChatbubblesSharp className="color_icon" /></Grid>
                    <Grid item xs={10} className="text">Comment</Grid>
                </Grid>
                <Grid container className="pb-1" >
                    <Grid item xs={2} className="icon"><BsFileEarmarkBreak className="color_icon" /></Grid>
                    <Grid item xs={10} className="text">In tài liệu</Grid>
                </Grid>
                <Box className="bottom"></Box>

                <Grid container className="pb-1" >
                    <Grid item xs={2} className="icon"><FaDownload className="color_icon" /></Grid>
                    <Grid item xs={10} className="text">Restore phiên bản này</Grid>
                </Grid>
                <Grid container className="pb-1" >
                    <Grid item xs={2} className="icon"><FaDownload className="color_icon" /></Grid>
                    <Grid item xs={10} className="text">Tải xuống</Grid>
                </Grid>
                <Grid container className="pb-1" >
                    <Grid item xs={2} className="icon"><BsFillShareFill className="color_icon" /></Grid>
                    <Grid item xs={10} className="text">Chia sẻ</Grid>
                </Grid>
                <Grid container className="pb-1" >
                    <Grid item xs={2} className="icon"><BsArrowLeftRight className="color_icon" /></Grid>
                    <Grid item xs={10} className="text">Thay thế</Grid>
                </Grid>
                <Grid container className="pb-1" >
                    <Grid item xs={2} className="icon"><FaLock className="color_icon" /></Grid>
                    <Grid item xs={10} className="text">Khóa tài liệu</Grid>
                </Grid>
                <Box className="bottom"></Box>

                <Grid container className="pb-1" >
                    <Grid item xs={2} className="icon"><FaLink className="color_icon" /></Grid>
                    <Grid item xs={10} className="text">Lấy link</Grid>
                </Grid>
                <Grid container className="pb-1" >
                    <Grid item xs={2} className="icon"><FaDownload className="color_icon" /></Grid>
                    <Grid item xs={10} className="text">Chuyển tài liệu</Grid>
                </Grid>
                <Grid container className="pb-1" >
                    <Grid item xs={2} className="icon"><CgArrowsHAlt className="color_icon" /></Grid>
                    <Grid item xs={10} className="text">Đổi tên</Grid>
                </Grid>
                <Grid container className="pb-1" >
                    <Grid item xs={2} className="icon"><AiFillStar className="color_icon" /></Grid>
                    <Grid item xs={10} className="text">Đánh dấu quan trọng </Grid>
                </Grid>
                <Grid container className="pb-1" >
                    <Grid item xs={2} className="icon"><MdAccessTimeFilled className="color_icon" /></Grid>
                    <Grid item xs={10} className="text">Hẹn giờ</Grid>
                </Grid>
                <Box className="bottom"></Box>

                <Grid container className="pb-1" >
                    <Grid item xs={2} className="icon"><MdDelete className="color_icon" /></Grid>
                    <Grid item xs={10} className="text">Xóa tài liệu</Grid>
                </Grid>
            </Box>
        </Popover>
    </Fragment>
};

export default VersionList;
