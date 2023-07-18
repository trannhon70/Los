import { FC } from "react";

import { Grid, IconButton } from "@mui/material";
import Box from '@mui/material/Box';
import { BsFileEarmarkBreak, BsShareFill, BsSquare } from "react-icons/bs";
import { FaDownload, FaLock } from "react-icons/fa";
import { MdDelete, MdZoomOutMap } from "react-icons/md";
import { TbArrowsLeftRight } from "react-icons/tb";
import { useNavigate, useParams } from "react-router";
import { FileDetailParams } from "views/pages/Documents/FileDetail";
import { SxInformation } from "./style";
export interface Iinformation{
    index?:string,
    name?:string,
    note?:string,
}
const Information: FC<Iinformation> = (props) => {
    const { name, note } = props;
    const navigate = useNavigate();
    const { id } = useParams() as FileDetailParams;
    
    return <Box sx={SxInformation}>
        <Box className="pdf"></Box>
        <IconButton className="icon_Zoom" onClick={() =>{navigate(`/documents/${id}/detail/1`)}}><MdZoomOutMap /></IconButton>
        <Grid container className="mt-3">
            <Grid item xs={11}>
                <IconButton className="icon"><FaDownload /></IconButton>
                <IconButton className="icon"><TbArrowsLeftRight /></IconButton>
                <IconButton className="icon"><BsShareFill /></IconButton>
                <IconButton className="icon"><FaLock /></IconButton>
                <IconButton className="icon"><BsFileEarmarkBreak /></IconButton>
            </Grid>
            <Grid item xs={1}>
                <IconButton className="icon"><MdDelete className="text-danger" /></IconButton>
            </Grid>
        </Grid>
        <Grid container className="mt-4">
            <Grid item xs={0.5} className="text_Color"><BsSquare style={{ fontSize: '7px' }} />  </Grid>
            <Grid item xs={3.5} className="text_Color">Tên</Grid>
            <Grid item xs={8} className="text_TL">{name}</Grid>
        </Grid>
        <Grid container className="mt-4">
            <Grid item xs={0.5} className="text_Color"><BsSquare style={{ fontSize: '7px' }} />  </Grid>
            <Grid item xs={3.5} className="text_Color">Phiên bản</Grid>
            <Grid item xs={8}>1.0</Grid>
        </Grid>
        <Grid container className="mt-4">
            <Grid item xs={0.5} className="text_Color"><BsSquare style={{ fontSize: '7px' }} />  </Grid>
            <Grid item xs={3.5} className="text_Color">Loại</Grid>
            <Grid item xs={8}>Word</Grid>
        </Grid>
        <Grid container className="mt-4">
            <Grid item xs={0.5} className="text_Color"><BsSquare style={{ fontSize: '7px' }} />  </Grid>
            <Grid item xs={3.5} className="text_Color">Kích thước</Grid>
            <Grid item xs={8}>5,5 MB</Grid>
        </Grid>
        <Grid container className="mt-4">
            <Grid item xs={0.5} className="text_Color"><BsSquare style={{ fontSize: '7px' }} />  </Grid>
            <Grid item xs={3.5} className="text_Color">Thư mục</Grid>
            <Grid item xs={8}>Khởi tạo hồ sơ</Grid>
        </Grid>
        <Grid container className="mt-4">
            <Grid item xs={0.5} className="text_Color"><BsSquare style={{ fontSize: '7px' }} />  </Grid>
            <Grid item xs={3.5} className="text_Color">Khởi tạo bởi</Grid>

            <Grid item xs={8}>
                <Box>Nguyễn Phúc</Box>
                <Box sx={{ fontSize: '12px', color: '#707070' }}>29/12/2020 08:40</Box>
            </Grid>
        </Grid>
        <Grid container className="mt-4">
            <Grid item xs={0.5} className="text_Color"><BsSquare style={{ fontSize: '7px' }} />  </Grid>
            <Grid item xs={3.5} className="text_Color">Cập nhật gần nhất</Grid>
            <Grid item xs={8} >
                <Box>Trần Bình Liên</Box>
                <Box sx={{ fontSize: '12px', color: '#707070' }}>29/12/2020 08:40</Box>
            </Grid>
        </Grid>
        <Grid container className="mt-4">
            <Grid item xs={0.5} className="text_Color"><BsSquare style={{ fontSize: '7px' }} />  </Grid>
            <Grid item xs={3.5} className="text_Color">Mô tả</Grid>
            <Grid item xs={8} >{note}</Grid>
        </Grid>
    </Box>
}

export default Information;