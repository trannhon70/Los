import Grid from "@mui/material/Grid";
import { FC } from "react";
import Input from "views/components/base/Input";
import Radio from "views/components/base/Radio";
import Select from "views/components/base/Select";
import CardInside from "views/components/layout/CardInside";
import ObjectList from "views/components/layout/ObjectList";

interface TransferMethodProps {
  type: string;
}

const TransferMethod: FC<TransferMethodProps> = (props) => {

  const { type } = props;

  return (
    <CardInside
      title={`${type === '3' ? "II" : "I"}. Thông tin chuyển khoản`}
      classBody="h-full p-6"
      fieldsetClass="px-4"
      titleClass="px-2 text-16"
    >
      <Grid container spacing={3}>
        <Grid item xl={12}>
          <ObjectList
            labelLength="Số lượng người thụ hưởng: "
            options={[
              {label: 'Trung nhân'},
              {label: 'Trung nhân'},
              {label: 'Trung nhân'},
            ]}
            sx={{
              '& .ObjectListLabel': {
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 0,
                paddingTop: 0,
            
                '& .object-list-label': {
                  fontSize: "14px",
                  fontStretch: 'normal',
                  fontStyle: 'normal',
                  color: 'var(--mscb-secondary)',
                  fontWeight: 'normal',
                  paddingLeft: 0,
                  textDecoration: 'underline',
                },
                '& .object-list-number': {
                  fontStretch: 'normal',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  mt: 0,
                  fontSize: 'var(--mscb-fontsize)',
                  color: 'var(--mscb-secondary)',
                  textDecoration: 'underline',
                  // lineHeight: '22px'
                },
              },
              
              '& .MuiTab-root': {
                textTransform: 'unset'
              },
              '& .object-list-box': {
                transition: 'all ease 0.3s',
                '& .object-list-box-name': {
                  textTransform: 'unset',
                  textDecoration: 'none'
                },
                '& .object-list-circle': {
                  color: '#707070'
                },
                '&.active,&:hover': {
                  '& .object-list-circle': {
                    border: '1px solid var(--mscb-primary)',
                    bgcolor: 'var(--mscb-primary)',
                    color: '#fff'
                  },
                  '& .object-list-box-name': {
                    color: 'var(--mscb-primary)'
                  }
                }
              }
            }}
            attachLabel="tập tin"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Select 
            label="1. Đối tượng bên thụ hưởng"
            required
            options={[]}
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="2. Nội dung thanh toán"
            required
            value="Thanh toán chuyển khoản"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="3. Số tiền thanh toán"
            required
            format
            value="200000000"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="4. Họ và tên người thụ hưởng"
            required
            value="Nguyễn Thùy Linh"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="5. Số tài khoản người thụ hưởng"
            required
            value="0564154812"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="6. Ngân hàng người thụ hưởng"
            required
            value="Nguyễn Thùy Linh"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Radio
            label="7. Giải ngân thông qua tài khoản tiết kiệm của KH"
            required
            options={[
              {label: 'Có', value: '1'},
              {label: 'Không', value: '2'}
            ]}
            sx={{
              '& .MuiFormGroup-root': {
                '& .MuiFormControlLabel-root': {
                  width: '48%'
                }
              }
            }}
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="8. Số tài khoản tiết kiệm của khách hàng"
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default TransferMethod;
