import { Grid, Typography } from "@mui/material";
import React from "react";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";

const Contact: React.FC = () => {
  
  return (  
    <CardInside 
      title="Thông tin liên hệ"
      classBody="h-full pt-6 pr-4 pb-6 pl-4"
      fieldsetClass="px-4"
      className="mt-2" 
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: "-5px", mb: "-10px" }}>
            <Typography component="span" sx={{
              width: '7px',
              height: '7px',
              margin: '0 5px 1px 0',
              backgroundColor: 'var(--mscb-primary)',
              display: 'inline-block'
            }}></Typography>
            <Typography 
              component="span" 
              className='text-14' 
              sx={{
                color: "var(--mscb-primary)", 
                fontWeight: 500
              }}
            >
              NGUYÊN QUÁN
            </Typography>
        </Grid>
        <Grid item xl={3} lg={3} md={8} sm={12} xs={12}>
          <Input 
            label="1. Nguyên quán" 
            value={'-'} 
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="2. Quốc gia" 
            value={'-'} 
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="3. Tỉnh/TP" 
            value={'-'} 
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="4. Quận/huyện" 
            value={'-'} 
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="5. Phường/xã" 
            value={'-'} 
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: "-5px", mb: "-10px" }}>
            <Typography 
              component="span" 
              sx={{
                width: '7px',
                height: '7px',
                margin: '0 5px 1px 0',
                backgroundColor: 'var(--mscb-primary)',
                display: 'inline-block'
              }}
            ></Typography>
            <Typography component="span" className='text-14' sx={{color: "var(--mscb-primary)", fontWeight: 500}}>
             THƯỜNG TRÚ
            </Typography>
        </Grid>
        <Grid item xl={3} lg={3} md={8} sm={12} xs={12}>
          <Input 
            label="6. Địa chỉ thường trú"
            value={'-'}
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="7. Quốc gia"
            value={'-'}
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="8. Tỉnh/TP"
            value={ '-'}
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="9. Quận/huyện"
            value={'-'}
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="10. Phường/xã"
            value={'-'}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: "-5px", mb: "-10px" }}>
            <Typography component="span" sx={{
              width: '7px',
              height: '7px',
              margin: '0 5px 1px 0',
              backgroundColor: 'var(--mscb-primary)',
              display: 'inline-block'
            }}></Typography>
            <Typography component="span" className='text-14' sx={{color: "var(--mscb-primary)", fontWeight: 500}}>
              {`TẠM TRÚ`}
            </Typography>
        </Grid>
        <Grid item xl={3} lg={3} md={8} sm={12} xs={12}>
          <Input 
            label="11. Địa chỉ tạm trú" 
            value={'-'}  
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="12. Quốc gia" 
            value={'-'}  
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="13. Tỉnh/TP" 
            value={'-'}  
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="14. Quận/huyện" 
            value={'-'}  
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="15. Phường/xã" 
            value={'-'}  
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: "-5px", mb: "-10px" }}>
            <Typography component="span" sx={{
              width: '7px',
              height: '7px',
              margin: '0 5px 1px 0',
              backgroundColor: 'var(--mscb-primary)',
              display: 'inline-block'
            }}></Typography>
            <Typography component="span" className='text-14' sx={{color: "var(--mscb-primary)", fontWeight: 500}}>
              {`LIÊN LẠC`}
            </Typography>
        </Grid>
        <Grid item xl={3} lg={3} md={8} sm={12} xs={12}>
          <Input 
            label="16. Địa chỉ liên lạc"
            value={'-'}
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="17. Quốc gia"
            value={'-'}
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="18. Tỉnh/TP"
            value={'-'}
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="19. Quận/huyện"
            value={'-'}
          />
        </Grid>
        <Grid item xl={2.25} lg={2.25} md={4} sm={12}>
          <Input 
            label="20. Phường/xã"
            value={'-'}
          />
        </Grid>
      </Grid>
    </CardInside>
  )
}


export default Contact;