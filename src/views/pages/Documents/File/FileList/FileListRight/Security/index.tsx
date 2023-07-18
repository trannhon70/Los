import { Avatar, Box, Grid, IconButton } from "@mui/material";
import { FC } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Checkbox from 'views/components/base/Checkbox';
import Select from "views/components/base/Select";
import { SxSecurity } from "./style";

import { BsPencil } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";

const Security: FC = () => {
    return <Box sx={SxSecurity}>
        <Box>
            <Select
                options={[
                    { label: 'Nguyễn Minh Sơn', value: '1' },
                    { label: 'Nguyễn Văn A', value: '2' },
                ]}
                label={<Box>Thêm người dùng</Box>}
            />
        </Box>
        <Box className="CheckBox">
            <Checkbox
                label={
                    <Grid container className="CheckBox_label" >
                        <Grid item xs={10}>Thiết lập quyền cho người dùng</Grid>
                        <Grid item xs={2} className="flex" sx={{ color: '#1a9b06', cursor: 'pointer', alignItems: 'center' }}><AiOutlineCheckCircle style={{ marginRight: '5px' }} />Lưu</Grid>
                    </Grid>
                }
                options={[
                    { value: '1', label: 'Đọc' },
                    { value: '2', label: 'Ghi' },
                    { value: '3', label: 'Bảo mật' },
                    { value: '4', label: 'Xóa' },
                ]}
                sx={{
                    flexDirection: 'column',

                    color: "var(--mscb-disable)",
                    "& .MuiFormControlLabel-label.Mui-disabled": {
                        color: "var(--mscb-disable) !important"
                    }

                }}
            />
        </Box>
        <Box className="pt-4">
            <Box className="text_DS" >
                Danh sách người dùng hiện tại
            </Box>
            <Grid container className="pt-4" sx={{ borderBottom: '1px solid #d5d5d5' }} >
                <Grid item xs={2}>
                    <Avatar alt="Remy Sharp" sx={{ width: '42px', height: '42px' }} />
                </Grid>
                <Grid item xs={10}>
                    <Grid container >
                        <Grid item xs={9}>
                            <Box className="text-16 text-primary">Lê Ngọc Dũng</Box>
                            <Box className="text-14" sx={{color: '#707070', fontStyle: 'italic' }}>Trưởng phòng kinh doanh</Box>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton className="icon">
                                <BsPencil   />
                            </IconButton>
                            <IconButton className="icon">
                                <IoTrashOutline   />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Checkbox
                            options={[
                                { value: '1', label: 'Đọc', checked: true },
                                { value: '2', label: 'Ghi', checked: true },
                                { value: '3', label: 'Bảo mật', checked: true },
                                { value: '4', label: 'Xóa' },
                            ]}
                            sx={{
                                flexDirection: 'column',

                                color: "var(--mscb-disable)",
                                "& .MuiFormControlLabel-label.Mui-disabled": {
                                    color: "var(--mscb-disable) !important"
                                },
                                "& .MuiFormControlLabel-root": {
                                    marginRight: '10px',
                                },
                            }}
                        />
                    </Grid>
                </Grid>

            </Grid>
        </Box>
    </Box>
}

export default Security;