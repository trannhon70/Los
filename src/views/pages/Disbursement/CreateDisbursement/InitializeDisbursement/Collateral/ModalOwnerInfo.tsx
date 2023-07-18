import { useState, useEffect, FunctionComponent } from "react";
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Modal from 'views/components/layout/Modal';
import CardInside from 'views/components/layout/CardInside';
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import { Divider } from "@mui/material";
import { SxCardInline } from "./style";

export interface IModalOwnerInfoProps {
  open?: boolean;
  onClose?(): void;
}

const ModalOwnerInfo: FunctionComponent<IModalOwnerInfoProps> = (props) => {

  const { open = false, onClose } = props;

  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = () => {
    onClose && onClose();
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      isStatic
      sx={{
        '& .MuiPaper-root': {
          minWidth: '60%',
          position: 'relative',
          borderRadius: 0
        }
      }}
    >
      <IconButton onClick={onClose} color="error" sx={{ position: 'absolute', right: '0.8rem', top: '0.5rem' }}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h5" component="div" className="text-upper text-primary font-medium text-18 pb-3">
        THÔNG TIN NGƯỜI SỞ HỮU
      </Typography>


      <div className="flex">
        <Avatar sx={{ width: '4.25rem', height: "4.25rem", borderWidth: '2px', borderStyle: 'solid' }} className="bd-warning">
          {/* { user?.full_name.substr(0, 1).toUpperCase() } */} V
        </Avatar>
        <div className="ml-3">
          <div className="text-warning text-upper font-medium text-16">NGUYỄN TRẦN PHONG VŨ [ <i className="fas fa-female" /> ]</div>
          <div>
            <i className="tio-email text-14 text-primary" />
            <span className="ml-2 text-14">nhuxuanlenguyen153@gmail.com</span>
          </div>
          <div>
            <i className="fas fa-phone-alt text-14 text-primary" />
            <span className="ml-2 text-14">0867855298</span>
          </div>
        </div>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <CardInside title="I. Thông tin cơ bản" className="text-16" sx={SxCardInline}>
            <Grid container columnSpacing="20" rowSpacing="20" className="pl-4 pb-5">
              <Grid item xl={12} md={12} xs={12}>
                <Input
                  label="1. Họ và tên CSH"
                  required
                  disabled
                  value="NGUYỄN TRẦN PHONG VŨ"
                />
              </Grid>

              <Grid item xl={6} md={6} xs={12}>
                <InputDate
                  label="2. Ngày sinh"
                  required
                  disabled
                />
              </Grid>

              <Grid item xl={6} md={6} xs={12}>
                <Input
                  label="3. Giới tính"
                  required
                  disabled
                  value="Nam"
                />
              </Grid>

              <Grid item xl={6} md={6} xs={12}>
                <Input
                  label="4. Số điện thoại bàn"
                  required
                  disabled
                />
              </Grid>

              <Grid item xl={6} md={6} xs={12}>
                <Input
                  label="5. Số điện thoại di động"
                  required
                  disabled
                />
              </Grid>
            </Grid>
          </CardInside>
        </Grid>

        <Grid item xs={6}>
          <CardInside title="II. Giấy tờ định danh" className="pl-4 pb-5" sx={SxCardInline}>
            <Grid container columnSpacing="20" rowSpacing="20">
              <Grid item xl={12} md={12} xs={12}>
                <Input
                  label="1. Số CMND/CCCD/Hộ chiếu"
                  required
                  disabled
                  value="079190254791"
                />
              </Grid>

              <Grid item xl={6} md={6} xs={12}>
                <InputDate
                  label="2. Ngày cấp"
                  required
                  disabled
                />
              </Grid>

              <Grid item xl={6} md={6} xs={12}>
                <InputDate
                  label="3. Ngày hết hạn"
                  required
                  disabled
                />
              </Grid>

              <Grid item xl={12} md={12} xs={12}>
                <Input
                  label="4. Nơi cấp"
                  required
                  disabled
                />
              </Grid>
            </Grid>
          </CardInside>
        </Grid>

        <Grid item xs={12}>
          <CardInside title="III. Thông tin địa chỉ" className="text-16" sx={SxCardInline}>
            <Grid container columnSpacing="20" rowSpacing="20" className="pl-4 pb-5">
              <Grid item xl={3} md={3} xs={12} >
                <Input
                  label="1. Địa chỉ thường trú"
                  required
                  disabled
                />
              </Grid>
              <Grid item xl={3} md={3} xs={12} >
                <Input
                  label="2. Tỉnh/TP"
                  required
                  disabled
                />
              </Grid>
              <Grid item xl={3} md={3} xs={12} >
                <Input
                  label="3. Quận/huyện"
                  required
                  disabled
                />
              </Grid>
              <Grid item xl={3} md={3} xs={12} >
                <Input
                  label="4. Phường/xã"
                  required
                  disabled
                />
              </Grid>
              <Grid item xl={12} md={12} xs={12}>
                <Divider />
              </Grid>
              <Grid item xl={3} md={3} xs={12} >
                <Input
                  label="1. Địa chỉ thường trú"
                  required
                  disabled
                />
              </Grid>
              <Grid item xl={3} md={3} xs={12} >
                <Input
                  label="2. Tỉnh/TP"
                  required
                  disabled
                />
              </Grid>
              <Grid item xl={3} md={3} xs={12} >
                <Input
                  label="3. Quận/huyện"
                  required
                  disabled
                />
              </Grid>
              <Grid item xl={3} md={3} xs={12} >
                <Input
                  label="4. Phường/xã"
                  required
                  disabled
                />
              </Grid>
            </Grid>
          </CardInside>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ModalOwnerInfo;