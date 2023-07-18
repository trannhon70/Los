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
import { ILOANNormalCollateralV2StateFullInfoLegalOwners } from "types/models/loan/normal/storage/CollaretalV2";
import SelectLocation from "views/components/widgets/SelectLocation";

export interface IModalOwnerInfoProps {
  open?: boolean;
  onClose?(): void;
  infoUser?: ILOANNormalCollateralV2StateFullInfoLegalOwners[] ;
  position?: number;
  typeInfo?:string
}

const ModalOwnerInfo: FunctionComponent<IModalOwnerInfoProps> = (props) => {

  const { open = false, onClose, infoUser, position,typeInfo } = props;

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
        {
          typeInfo === "owner" ? "THÔNG TIN NGƯỜI SỞ HỮU" : "THÔNG TIN NGƯỜI ĐƯỢC ỦY QUYỀN"
        } 
      </Typography>


      <div className="flex">
        <Avatar sx={{ width: '4.25rem', height: "4.25rem", borderWidth: '2px', borderStyle: 'solid' }} className="bd-warning">
          {/* { user?.full_name.substr(0, 1).toUpperCase() } */} V
        </Avatar>
        <div className="ml-3">
          <div className="text-warning text-upper font-medium text-16">{(() => {
                    if (position === undefined) return '';
                    if (infoUser === undefined) return '';
                    return infoUser[position]?.full_name ?? ''
                  })()}[{
                    (()=>{
                      if( position !== undefined && infoUser!== undefined && infoUser[position]?.gender === "NAM" ){
                        return (
                          <i className="fas fa-male"/>
                        )
                      }else {
                        return (
                        <i className="fas fa-female" />
                        )
                      }
                    })()
                  }]</div>
          <div>
            <i className="tio-email text-14 text-primary" />
            <span className="ml-2 text-14">{(() => {
                    if (position === undefined) return '';
                    if (infoUser === undefined) return '';
                    return infoUser[position]?.mail ?? ''
                  })()}</span>
          </div>
          <div>
            <i className="fas fa-phone-alt text-14 text-primary" />
            <span className="ml-2 text-14">{(() => {
                    if (position === undefined) return '';
                    if (infoUser === undefined) return '';
                    return infoUser[position]?.mobile_num ?? ''
                  })()}</span>
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
                  value={(() => {
                    if (position === undefined) return '';
                    if (infoUser === undefined) return '';
                    return infoUser[position]?.full_name ?? ''
                  })()}
                
                />
              </Grid>

              <Grid item xl={6} md={6} xs={12}>
                <InputDate
                  label="2. Ngày sinh"
                  required
                  disabled
                  value={(() => {
                    if (position === undefined) return null;
                    if (infoUser === undefined) return null;
                    return (infoUser[position]?.date_of_birth * 1000) ?? null
                  })()}
                />
              </Grid>

              <Grid item xl={6} md={6} xs={12}>
                <Input
                  label="3. Giới tính"
                  required
                  disabled
                  value={(() => {
                    if (position === undefined) return '';
                    if (infoUser === undefined) return '';
                    return infoUser[position]?.gender ?? ''
                  })()}
                />
              </Grid>

              <Grid item xl={6} md={6} xs={12}>
                <Input
                  label="4. Số điện thoại bàn"
                  required
                  disabled
                  value={(() => {
                    if (position === undefined) return '';
                    if (infoUser === undefined) return '';
                    return infoUser[position]?.telephone_num ?? ''
                  })()}
                
                />
              </Grid>

              <Grid item xl={6} md={6} xs={12}>
                <Input
                  label="5. Số điện thoại di động"
                  required
                  disabled
                  value={(() => {
                    if (position === undefined) return '';
                    if (infoUser === undefined) return '';
                    return infoUser[position]?.mobile_num ?? ''
                  })()}
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
                  value={(() => {
                    if (position === undefined) return '';
                    if (infoUser === undefined) return '';
                    return infoUser[position]?.identity_num ?? ''
                  })()}
                />
              </Grid>

              <Grid item xl={6} md={6} xs={12}>
                <InputDate
                  label="2. Ngày cấp"
                  required
                  disabled
                  value={(() => {
                    if (position === undefined) return null;
                    if (infoUser === undefined) return null;
                    return (infoUser[position]?.issued_date * 1000 ?? null)
                  })()}
                />
              </Grid>

              <Grid item xl={6} md={6} xs={12}>
                <InputDate
                  label="3. Ngày hết hạn"
                  required
                  disabled
                  value={(() => {
                    if (position === undefined) return null;
                    if (infoUser === undefined) return null;
                    return infoUser[position]?.expired_date * 1000 ?? null
                  })()}
                />
              </Grid>

              <Grid item xl={12} md={12} xs={12}>
                <Input
                  label="4. Nơi cấp"
                  required
                  disabled
                  value={(() => {
                    if (position === undefined) return '';
                    if (infoUser === undefined) return '';
                    return infoUser[position]?.place_of_issue ?? ''
                  })()}
                />
              </Grid>
            </Grid>
          </CardInside>
        </Grid>

        <Grid item xs={12}>
          <CardInside title="III. Thông tin địa chỉ" className="text-16" sx={SxCardInline}>
            <Grid container columnSpacing="20" rowSpacing="20" className="pl-4 pb-5">
              <Grid item xl={12} md={12} xs={12} >
              <SelectLocation
                  sx={{
                    "& .icon-copy": {
                      zIndex: "1000",
                      position: "absolute",
                    },
                  }}
                  before={
                    <Grid
                      item xl={3} lg={3} md={12} sm={12} xs={12}
                      sx={{
                        display: 'flex',
                        flexFlow: 'row-reverse'
                      }}
                    >
                      <Input
                        label="1. Địa chỉ thường trú"
                        value={(() => {
                          if (position === undefined) return '';
                          if (infoUser === undefined) return '';
                          return infoUser[position]?.addressPermanent ?? ''
                        })()}
                        required
                        disabled
                        
                      />
                    </Grid>
                  }
                  label={["2. Tỉnh/TP", "3. Quận/huyện", "4. Phường/xã"]}
                  required={[true, true, true]}
                  disabled
                  col={3}
                  value={{
                    country: 'VN',
                    province:(() => {
                      if (position === undefined) return '';
                      if (infoUser === undefined) return '';
                      return infoUser[position]?.provincePermanent ?? ''
                    })() ,
                    district: (() => {
                      if (position === undefined) return '';
                      if (infoUser === undefined) return '';
                      return infoUser[position]?.disctrictPermanent ?? ''
                    })() ,
                    ward: (() => {
                      if (position === undefined) return '';
                      if (infoUser === undefined) return '';
                      return infoUser[position]?.wardPermanent ?? ''
                    })() ,
                  }}
                />
              </Grid>
              <Grid item xl={12} md={12} xs={12}>
                <Divider />
              </Grid>
              <Grid item xl={12} md={12} xs={12} >
                <SelectLocation
                  sx={{
                    "& .icon-copy": {
                      zIndex: "1000",
                      position: "absolute",
                    },
                  }}
                  before={
                    <Grid
                      item xl={3} lg={3} md={12} sm={12} xs={12}
                      sx={{
                        display: 'flex',
                        flexFlow: 'row-reverse'
                      }}
                    >
                      <Input
                        label="1. Địa chỉ liên hệ"
                        value={(() => {
                          if (position === undefined) return '';
                          if (infoUser === undefined) return '';
                          return infoUser[position]?.addressContact ?? ''
                        })()}
                        required
                        disabled
                        
                      />
                    </Grid>
                  }
                  label={["2. Tỉnh/TP", "3. Quận/huyện", "4. Phường/xã"]}
                  required={[true, true, true]}
                  disabled
                  col={3}
                  value={{
                    country: 'VN',
                    province:(() => {
                      if (position === undefined) return '';
                      if (infoUser === undefined) return '';
                      return infoUser[position]?.provinceContact ?? ''
                    })() ,
                    district: (() => {
                      if (position === undefined) return '';
                      if (infoUser === undefined) return '';
                      return infoUser[position]?.disctrictContact ?? ''
                    })() ,
                    ward: (() => {
                      if (position === undefined) return '';
                      if (infoUser === undefined) return '';
                      return infoUser[position]?.wardContact ?? ''
                    })() ,
                  }}
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