import { Avatar, Box, Grid, IconButton } from "@mui/material";
import { FC } from "react";
import { IoIosSend } from "react-icons/io";
import Input from "views/components/base/Input";
import Scrollbar from "views/components/layout/Scrollbar";
import { Sxwork } from "./style";


const Work: FC = () => {
    return <Box sx={Sxwork}>
        <Scrollbar >
            <Box className="text_date">
                08/05/2021
            </Box>
            <Box className="mt-3 mb-3" >
                <Grid container >
                    <Grid item xs={2}>
                        <Avatar
                            alt="avatar"
                            sx={{ width: "42px", height: "42px" }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Box className="text-16 text-primary">Admin</Box>
                        <Box className="text-14" sx={{  color: '#707070', fontStyle: 'italic' }}>Tạo ngày 09:22 - 10/05/2021</Box>
                    </Grid>
                </Grid>

            </Box>
            <Box className="text_date">
                08/05/2021
            </Box>
            <Box className="mt-3 mb-3">
                <Grid container >
                    <Grid item xs={2}>
                        <Avatar
                            alt="avatar"
                            sx={{ width: "42px", height: "42px" }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Box className="text_Name" >Ngô Thị Cẩm Tiên</Box>
                        <Box className="text_Date" >Cập nhật ngày 09:22 - 10/05/2021</Box>
                    </Grid>
                </Grid>
                <Box className="comment">Đã comment</Box>
                <Box>"Cần xem lại tài liệu này nha <span style={{ color: '#1825aa' }}>@Xuan_Trang"</span></Box>
            </Box>
            <Box className="mt-3 mb-3">
                <Grid container >
                    <Grid item xs={2}>
                        <Avatar
                            alt="avatar"
                            sx={{ width: "42px", height: "42px" }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Box className="text_Name" >Nguyễn Xuân Trang</Box>
                        <Box className="text_Date">Cập nhật ngày 09:22 - 10/05/2021</Box>
                    </Grid>
                </Grid>
                <Box className="comment">Đã comment</Box>
                <Box>"Em đã nhận được thông tin nha chị <span style={{ color: '#1825aa' }}>@Cam_Tien</span>. Em sẽ gửi lại cho phòng ban phụ trách và check lại kỹ"</Box>
            </Box>
            <Box className="mt-3 mb-3">
                <Grid container >
                    <Grid item xs={2}>
                        <Avatar
                            alt="avatar"
                            sx={{ width: "42px", height: "42px" }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Box className="text_Name" >Nguyễn Xuân Trang</Box>
                        <Box className="text_Date">Cập nhật ngày 09:22 - 10/05/2021</Box>
                    </Grid>
                </Grid>
                <Box className="comment">Đã comment</Box>
                <Box>"Em đã nhận được thông tin nha chị <span style={{ color: '#1825aa' }}>@Cam_Tien</span>. Em sẽ gửi lại cho phòng ban phụ trách và check lại kỹ"</Box>
            </Box>
            <Box className="mt-3 mb-3">
                <Grid container >
                    <Grid item xs={2}>
                        <Avatar
                            alt="avatar"
                            sx={{ width: "42px", height: "42px" }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Box className="text_Name" >Nguyễn Xuân Trang</Box>
                        <Box className="text_Date">Cập nhật ngày 09:22 - 10/05/2021</Box>
                    </Grid>
                </Grid>
                <Box className="comment">Đã comment</Box>
                <Box>"Em đã nhận được thông tin nha chị <span style={{ color: '#1825aa' }}>@Cam_Tien</span>. Em sẽ gửi lại cho phòng ban phụ trách và check lại kỹ"</Box>
            </Box>

        </Scrollbar>
        <Box>
            <Input sx={{
                "& .MuiInput-input":{
                    backgroundColor:'#fff',
                    border:'1px solid #d5d5d5 !important ',
                    height:'37px',
                }
            }} suffix={<IconButton className="rounded-0" ><IoIosSend className="text-primary" /></IconButton>} />
        </Box>
    </Box>
}

export default Work;