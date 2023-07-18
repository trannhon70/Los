import Grid from "@mui/material/Grid";
import { FC } from "react";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import Select from "views/components/base/Select";
import CardInside from "views/components/layout/CardInside";
import ObjectList from "views/components/layout/ObjectList";

interface CashMethodProps {
  type: string;
}

const CashMethod: FC<CashMethodProps> = (props) => {

  const { type } = props;

  return (
    <CardInside
      title="I. Thông tin nhận tiền mặt"
      classBody="h-full p-6"
      // sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16"
    >
      <Grid container spacing={3}>
        <Grid item xl={12} md={12} xs={12}>
          <Select 
            label="1. Đối tượng bên nhận tiền"
            required 
            options={[]}
          />
        </Grid>
        <Grid item xl={6}>
          <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#1825aa",
              marginLeft: "5px",
              textTransform: "uppercase",
            }}
          >
            Thông tin bên nhận tiền
          </span>
          <ObjectList
            labelLength="Số lượng người nhận tiền: "
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
          <Grid container spacing={3}>
            <Grid item xl={4} md={4} xs={12}>
              <Input label="1. Nội dung thanh toán" required disabled value="Thanh toán chuyển khoản" />
            </Grid>
            <Grid item xl={4} md={4} xs={12}>
              <Input label="2. Số tiền thanh toán" required disabled value="200000000" format />
            </Grid>
            <Grid item xl={4} md={4} xs={12}>
              <Input label="3. Họ và tên người thụ hưởng" required disabled value="Nguyễn Thùy Linh" />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <Input label="4. Số CMND/CCCD" required disabled value="Nguyễn Thùy Linh" />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <InputDate label="5. Ngày cấp" required disabled />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <InputDate label="6. Ngày hết hạn" required disabled />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <Select options={[]} label="7. Nơi cấp" required disabled />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <Input label="8. Số hộ chiếu" disabled value="Nguyễn Thùy Linh" />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <InputDate label="9. Ngày cấp" disabled />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <InputDate label="10. Ngày hết hạn" disabled />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <Select options={[]} label="11. Nơi cấp" disabled />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={6}>
          <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#1825aa",
              marginLeft: "5px",
              textTransform: "uppercase",
            }}
          >
            Thông tin bên thụ hưởng
          </span>
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
          <Grid container spacing={3}>
            <Grid item xl={12} md={12} xs={12}>
              <Input label="3. Họ và tên người thụ hưởng" required disabled value="Nguyễn Thùy Linh" />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <Input label="4. Số CMND/CCCD" required disabled value="Nguyễn Thùy Linh" />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <InputDate label="5. Ngày cấp" required disabled />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <InputDate label="6. Ngày hết hạn" required disabled />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <Select options={[]} label="7. Nơi cấp" required disabled />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <Input label="8. Số hộ chiếu" disabled value="Nguyễn Thùy Linh" />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <InputDate label="9. Ngày cấp" disabled />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <InputDate label="10. Ngày hết hạn" disabled />
            </Grid>
            <Grid item xl={3} md={3} xs={12}>
              <Select options={[]} label="11. Nơi cấp" disabled />
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </CardInside>
  );
};

export default CashMethod;
