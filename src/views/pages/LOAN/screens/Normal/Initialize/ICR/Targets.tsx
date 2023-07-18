import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from 'views/components/base/Input';
import Select from 'views/components/base/Select';
import CardInside from 'views/components/layout/CardInside';
import SelectMarriedStatus from 'views/components/widgets/SelectMarriedStatus';
import ButtonAttachFile from 'views/components/base/ButtonAttachFile';
import AttachmentModalServices from './AttachmentModalServices';
import { useSelector } from 'react-redux';
import { getLOANNormalStorageICRCountFile } from 'features/loan/normal/storage/icr/selector';

const ICRTargets: FC = () => {

  const [isOpen, setOpenAttachModal] = useState<boolean>(false);
  const attachment = useSelector(getLOANNormalStorageICRCountFile)
  

  return <Box>
    <Typography variant="h4" component="h4" className=" flex items-center ">
      <Box className='font-bold text-20 text-upper'>
        A. Bộ CHỈ TIÊU
      </Box>
      <Box className='ml-5'>

        <ButtonAttachFile
        attachment={attachment}
        onClick={() => setOpenAttachModal(true)}
        />
      </Box>
    </Typography>
   
    <CardInside 
      title="I. Thông tin chung"
      classBody="p-6" 
      fieldsetClass="px-4" 
      titleClass="px-2 text-16"  
    >
      <Box>
        <Grid container spacing={ 3 }>
          <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Select
              label="1. Năm sinh (Tuổi)"
              value="1995"
              disabled={true}
              options={[
                { value: "1995", label: '1995' },
                { value: "1996", label: '1996' },
                { value: "1997", label: '1997' },
                { value: "1998", label: '1998' },
              ]}
            />
          </Grid>
          <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Select
              label="2. Trình độ học vấn"
              value="1995"
              disabled={true}
              options={[
                { value: "1994", label: 'Trung học' },
                { value: "1995", label: 'Cao đẳng/Đại học' },
                { value: "1996", label: 'Cao học' },
                { value: "1997", label: 'Tiến sỹ' },
              ]}
            />
          </Grid>
          <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Input
              disabled={true}
              label="3. Số người phụ thuộc"
              value="2"
            />
          </Grid>
          <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
            <SelectMarriedStatus
              disabled={true}
              label="4. Tình trạng hôn nhân"
            />
          </Grid>
          <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Select
              label="5. Tình trạng sở hữu"
              disabled={true}
              value="1994"
              options={[
                { value: "1994", label: 'Ở nhà cơ quan' },
              ]}
            />
          </Grid>
          <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Select
              label="6. Thời gian ở địa chỉ hiện tại"
              disabled={true}
              value="1994"
              options={[
                { value: "1994", label: 'Khác (tự kinh doanh)' },
              ]}
            />
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Select
              label="7. Vị trí công việc"
              disabled={true}
              value="1994"
              options={[
                { value: "1994", label: 'Cán bộ quản lý điều hành tại các đơn vị hành chính sự nghiệp' },
              ]}
            />
          </Grid>
          <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Select
              label="8. Sử dụng dịch vụ thẻ tại SCB"
              disabled={true}
              value="1994"
              options={[
                { value: "1994", label: 'Sử dụng thẻ SCB + Thẻ các Ngân hàng khác' },
              ]}
            />
          </Grid>
          <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Select
              label="9. Nhận lương qua tài khoản"
              disabled={true}
              value="1994"
              options={[
                { value: "1994", label: 'Không' },
                { value: "1995", label: 'Có' },
              ]}
            />
          </Grid>
          <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Select
              label="10. Có QHTD với SCB và các NH khác ở thời điểm vay"
              disabled={true}
              value="1994"
              options={[
                { value: "1994", label: 'Trên 2 Ngân hàng' },
                { value: "1995", label: 'Chỉ 1 ngân hàng' },
                { value: "1996", label: 'Chỉ có tại SCB' },
                { value: "1997", label: 'Không' },
              ]}
            />
          </Grid>
          <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Select
              label="11. Uy tín trong quan hệ tín dụng (3 năm gần nhất)"
              disabled={true}
              value="1994"
              options={[
                { value: "1994", label: 'Chưa từng phát sinh nợ không đủ tiêu chuẩn' },
                { value: "1995", label: 'Có phát sinh nợ không đủ tiêu chuẩn' },
                { value: "1996", label: 'Có phát sinh nợ nhưng đủ tiêu chuẩn' },
              ]}
            />
          </Grid>
          <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Input
              label="12. Thu nhập sau thuế bình quân tháng (VND)"
              disabled={true}
              value="300.000.000"
            />
          </Grid>
          <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Input
              label="13. Chi tiêu hàng tháng (VND)"
              disabled={true}
              value="300.000.000"
            />
          </Grid>
        </Grid>
      </Box>
    </CardInside>
    {isOpen && (
        <AttachmentModalServices
          open={Boolean(isOpen)}
          onClose={() => setOpenAttachModal(false)}
        />
      )}
  </Box>

}

export default ICRTargets;