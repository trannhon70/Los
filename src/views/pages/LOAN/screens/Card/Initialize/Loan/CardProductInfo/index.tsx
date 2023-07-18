import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { SelectOption } from 'views/components/base/Select';
import OptionList from 'views/components/layout/OptionList';
import clsx from "clsx";
import CheckIcon from '@mui/icons-material/Check';
import EastIcon from '@mui/icons-material/East';
import CardLoanProductStyle from './style';
import Input from 'views/components/base/Input';
import Checkbox from 'views/components/base/Checkbox';
import SelectReleaseType from 'views/components/widgets/SelectReleaseType';
import SelectProductLOANPurpose from 'views/components/widgets/SelectProductLOANPurpose';

const data = [
  {
    id: 1,
    code: '1',
    name: 'Sản phẩm một',
  },
  {
    id: 2,
    code: '2',
    name: 'Sản phẩm hai',
  },
  {
    id: 3,
    code: '3',
    name: 'Sản phẩm ba',
  },
  {
    id: 4,
    code: '4',
    name: 'Sản phẩm bốn',
  }
];

const CardProductInfo: FC = () => {

  const classes = CardLoanProductStyle();

  const disabled = false;

  const CardLoanProductClass = clsx(classes.root);

  const options: SelectOption[] = data.map(item => ({ value: item.code, label: item.name }));

  return (
    <Grid container columnSpacing="20" rowSpacing="20" className={`${CardLoanProductClass} pt-5 mt-0`}>
      <Grid item xl={8} className={`left-product`}>
        <Typography component="h3" className="text-primary text-15 font-medium mb-2 text-upercase w-full">
            A. Lựa chọn loại hình sản phẩm vay
        </Typography>
        <Grid className='flex-row'>
          <Grid className={'grouplist-box'}>
            <Typography component="h3" className="text-primary text-14 font-medium mb-2 text-upercase w-full">
              I. Nhóm sản phẩm <span className="text-danger">*</span>
            </Typography>
            <OptionList
              value="product1"
              checkIcon={ <></> }
              checkedIcon={ <CheckIcon /> }
              options={[
                { value: 'product1', label: '1. Bất động sản' },
                { value: 'product2', label: '2. Ô tô' },
                { value: 'product3', label: '3. Sản xuất kinh doanh' },
                { value: 'product4', label: '4. Tiêu dùng' },
                { value: 'product5', label: '5. Thấu chi' },
                { value: 'product6', label: '6. Thẻ tín dụng' },
              ]}
            />
          </Grid>
          <div className={ clsx(classes.arrow, 'flex-center') }>
            <EastIcon fontSize="large" />
          </div>
          <Grid className={'grouplist-box'}>
            <Typography component="h3" className="text-primary text-14 font-medium mb-2 text-upercase w-full">
              II. Sản phẩm / Chương trình <span className="text-danger">*</span>
            </Typography>
            <OptionList
              value="product1"
              checkIcon={ <></> }
              checkedIcon={ <CheckIcon /> }
              options={[
                { value: 'product1', label: '1. Gói Sản phẩm Cho vay tiêu dùng không TSBĐ' },
                { value: 'product2', label: '2. Payroll - Plus' },
                { value: 'product3', label: '3. CBNV Công ty con/Công ty ty liên kết' },
                { value: 'product4', label: '4. Phát hành thẻ qua kênh đối tác' },
                { value: 'product5', label: '5. Cán bộ nhân viên SCB' },
                { value: 'product6', label: '6. Gói Sản phẩm Cho vay tiêu dùng có TSBĐ' },
              ]}
            />
          </Grid>
          <div className={ clsx(classes.arrow, 'flex-center') }>
            <EastIcon fontSize="large" />
          </div>
          <Grid className={'grouplist-box'}>
            <Typography component="h3" className="text-primary text-14 font-medium mb-2 text-upercase w-full">
              III. Chi tiết sản phẩm <span className="text-danger">*</span>
            </Typography>
            <OptionList
              value="product1"
              checkIcon={ <></> }
              checkedIcon={ <CheckIcon /> }
              options={[
                { value: 'product1', label: '1. Payroll - Plus Nhóm A' },
                { value: 'product2', label: '2. Payroll - Plus Nhóm B' },
                { value: 'product3', label: '3. Payroll - Plus Nhóm C' },
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} xl={4} className='pl-0 pt-0 right-product'>
        <Typography component="h3" className="text-primary text-15 mb-2 font-medium text-upercase w-full">
          B. Thông tin vay
        </Typography>
        <Grid container rowSpacing="20" columnSpacing="20">
          <Grid item xl={6} md={6} xs={6} className={`${classes.inputLabel} label-product ${disabled ? 'disabled' : null}`}>
            <SelectReleaseType
              label="1. Loại phát hành"
              required
            />
          </Grid>
          <Grid item xl={6} md={6} xs={6} className={`${classes.inputLabel} label-product ${disabled ? 'disabled' : null}`}>
            <SelectProductLOANPurpose
              label="2. Mục đích vay theo sản phẩm"
            />
          </Grid>
          <Grid item xl={12} md={12} xs={12} className={`${classes.inputLabel} label-product ${disabled ? 'disabled' : null}`}>
            <Input
              label="3. Giấy đề nghị số"
              required
            />
          </Grid>
          <Grid item xl={12} md={12} xs={12} className={`${classes.checkboxLabel} label-product ${disabled ? 'disabled' : null}`}>
            <Checkbox
							label="4. Nhu cầu của khách hàng"
              className={`checkbox-card-holder text-13`}
              options={[
                  { label: "Phát hành mới/Mở thêm thẻ mới", value: "1" },
                  { label: "Thay đổi hạn mức thẻ hiện tại/Thay đổi hình thức đảm bảo thẻ", value: "2" }
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CardProductInfo;